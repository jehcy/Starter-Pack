import { NextRequest, NextResponse } from 'next/server';
import { addPurchasedCredits } from '@/lib/credits';

/**
 * Get PayPal Access Token for API calls
 */
async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || 'sandbox';

  const baseUrl = mode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Verify PayPal webhook signature
 * This ensures the webhook request actually came from PayPal
 */
async function verifyWebhookSignature(
  headers: Headers,
  body: string
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const mode = process.env.PAYPAL_MODE || 'sandbox';

  const baseUrl = mode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  const transmissionId = headers.get('paypal-transmission-id');
  const transmissionTime = headers.get('paypal-transmission-time');
  const certUrl = headers.get('paypal-cert-url');
  const authAlgo = headers.get('paypal-auth-algo');
  const transmissionSig = headers.get('paypal-transmission-sig');

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    console.error('Missing required PayPal headers');
    return false;
  }

  try {
    const accessToken = await getPayPalAccessToken();

    const verifyUrl = `${baseUrl}/v1/notifications/verify-webhook-signature`;

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        transmission_id: transmissionId,
        transmission_time: transmissionTime,
        cert_url: certUrl,
        auth_algo: authAlgo,
        transmission_sig: transmissionSig,
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    });

    const result = await response.json();
    return result.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

/**
 * Handle subscription created event
 */
async function handleSubscriptionCreated(resource: any) {
  console.log('Subscription created:', {
    subscriptionId: resource.id,
    planId: resource.plan_id,
    status: resource.status,
    subscriberEmail: resource.subscriber?.email_address,
    startTime: resource.start_time,
  });

  // TODO: Update user's subscription status in database
  // Example:
  // const subscriberId = resource.subscriber?.email_address;
  // await db.transact(tx.users[userId].update({
  //   subscriptionId: resource.id,
  //   subscriptionStatus: 'active',
  //   subscriptionPlanId: resource.plan_id,
  // }));
}

/**
 * Handle subscription activated event
 */
async function handleSubscriptionActivated(resource: any) {
  console.log('Subscription activated:', {
    subscriptionId: resource.id,
    status: resource.status,
  });

  // TODO: Activate user's premium features
}

/**
 * Handle subscription updated event
 */
async function handleSubscriptionUpdated(resource: any) {
  console.log('Subscription updated:', {
    subscriptionId: resource.id,
    status: resource.status,
  });

  // TODO: Update subscription details in database
}

/**
 * Handle subscription cancelled event
 */
async function handleSubscriptionCancelled(resource: any) {
  console.log('Subscription cancelled:', {
    subscriptionId: resource.id,
    status: resource.status,
  });

  // TODO: Update user's subscription status to cancelled
  // Typically you'd allow them to continue until the end of the billing period
}

/**
 * Handle subscription suspended event
 */
async function handleSubscriptionSuspended(resource: any) {
  console.log('Subscription suspended:', {
    subscriptionId: resource.id,
    status: resource.status,
  });

  // TODO: Suspend user's premium features
}

/**
 * Handle subscription expired event
 */
async function handleSubscriptionExpired(resource: any) {
  console.log('Subscription expired:', {
    subscriptionId: resource.id,
    status: resource.status,
  });

  // TODO: Revoke user's premium features
}

/**
 * Handle payment completed event
 */
async function handlePaymentCompleted(resource: any) {
  console.log('Payment completed:', {
    paymentId: resource.id,
    amount: resource.amount?.total,
    currency: resource.amount?.currency,
    status: resource.state,
  });

  // TODO: Record payment in database
}

/**
 * Handle payment failed event
 */
async function handlePaymentFailed(resource: any) {
  console.log('Payment failed:', {
    paymentId: resource.id,
    status: resource.state,
  });

  // TODO: Notify user about failed payment
  // TODO: Consider suspending subscription after multiple failures
}

/**
 * Handle order capture completed (one-time payments like starter pack)
 */
async function handleOrderCaptureCompleted(resource: any) {
  console.log('Order capture completed:', {
    orderId: resource.id,
    amount: resource.purchase_units?.[0]?.amount?.value,
    currency: resource.purchase_units?.[0]?.amount?.currency_code,
    status: resource.status,
  });

  // Get custom_id (userId) from purchase_units
  const userId = resource.purchase_units?.[0]?.custom_id;

  if (!userId) {
    console.error('No user ID found in order capture');
    return;
  }

  // Check if this is a starter pack purchase ($3)
  const amount = resource.purchase_units?.[0]?.amount?.value;
  if (amount === '3.00') {
    console.log(`Adding 3 credits to user ${userId}`);
    await addPurchasedCredits(userId, 3);
  } else {
    console.warn(`Unexpected order amount: ${amount}`);
  }
}

/**
 * PayPal Webhook Handler
 * Handles webhook events from PayPal for subscriptions and payments
 */
export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await req.text();
    const event = JSON.parse(body);

    // Log incoming webhook (useful for debugging)
    console.log('PayPal webhook received:', {
      eventType: event.event_type,
      id: event.id,
      resourceType: event.resource_type,
    });

    // Verify webhook signature in production
    if (process.env.PAYPAL_MODE === 'live') {
      const isValid = await verifyWebhookSignature(req.headers, body);

      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Handle different event types
    const { event_type, resource } = event;

    switch (event_type) {
      // Subscription Events
      case 'BILLING.SUBSCRIPTION.CREATED':
        await handleSubscriptionCreated(resource);
        break;

      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleSubscriptionActivated(resource);
        break;

      case 'BILLING.SUBSCRIPTION.UPDATED':
        await handleSubscriptionUpdated(resource);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleSubscriptionCancelled(resource);
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await handleSubscriptionSuspended(resource);
        break;

      case 'BILLING.SUBSCRIPTION.EXPIRED':
        await handleSubscriptionExpired(resource);
        break;

      // Payment Events
      case 'PAYMENT.SALE.COMPLETED':
        await handlePaymentCompleted(resource);
        break;

      case 'PAYMENT.SALE.REFUNDED':
        console.log('Payment refunded:', resource.id);
        break;

      case 'PAYMENT.SALE.REVERSED':
        console.log('Payment reversed:', resource.id);
        break;

      case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
        await handlePaymentFailed(resource);
        break;

      // One-time Payment Events (Starter Pack)
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handleOrderCaptureCompleted(resource);
        break;

      default:
        console.log('Unhandled event type:', event_type);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true, eventType: event_type });

  } catch (error) {
    console.error('PayPal webhook error:', error);

    // Return 500 so PayPal will retry
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
