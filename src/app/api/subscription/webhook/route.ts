import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyWebhookSignature, getSubscriptionDetails } from '@/lib/paypal';
import { init, id as generateId } from '@instantdb/admin';

// Server-side InstantDB client for webhook processing
const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const body = await request.json();

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(
      process.env.PAYPAL_WEBHOOK_ID!,
      headersList.get('paypal-transmission-id') || '',
      headersList.get('paypal-transmission-time') || '',
      headersList.get('paypal-cert-url') || '',
      headersList.get('paypal-auth-algo') || '',
      headersList.get('paypal-transmission-sig') || '',
      body
    );

    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const eventType = body.event_type;
    const resource = body.resource;

    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleSubscriptionActivated(resource);
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
      case 'PAYMENT.SALE.COMPLETED':
        console.log('Payment completed:', resource.id);
        break;
      case 'PAYMENT.SALE.DENIED':
        console.log('Payment failed:', resource.id);
        break;
      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleSubscriptionActivated(resource: { id: string; custom_id: string }) {
  const userId = resource.custom_id;
  const subscriptionId = resource.id;

  // Get full subscription details
  const details = await getSubscriptionDetails(subscriptionId);

  // Update user profile
  const { userProfiles } = await db.query({
    userProfiles: { $: { where: { userId } } },
  });

  if (userProfiles?.[0]) {
    await db.transact(
      db.tx.userProfiles[userProfiles[0].id].update({
        userType: 'paid',
        paypalSubscriptionId: subscriptionId,
        subscriptionStatus: 'active',
        subscribedAt: Date.now(),
        currentPeriodStart: details.billing_info?.last_payment?.time
          ? new Date(details.billing_info.last_payment.time).getTime()
          : Date.now(),
        currentPeriodEnd: details.billing_info?.next_billing_time
          ? new Date(details.billing_info.next_billing_time).getTime()
          : null,
        cancelledAt: null,
        cancelAtPeriodEnd: false,
        updatedAt: Date.now(),
      })
    );

    // Log subscription event
    await db.transact(
      db.tx.subscriptionEvents[generateId()].update({
        userId,
        eventType: 'activated',
        paypalSubscriptionId: subscriptionId,
        metadata: JSON.stringify(details),
        createdAt: Date.now(),
      })
    );
  }
}

async function handleSubscriptionCancelled(resource: { id: string }) {
  const subscriptionId = resource.id;

  const { userProfiles } = await db.query({
    userProfiles: { $: { where: { paypalSubscriptionId: subscriptionId } } },
  });

  if (userProfiles?.[0]) {
    await db.transact(
      db.tx.userProfiles[userProfiles[0].id].update({
        subscriptionStatus: 'cancelled',
        cancelledAt: Date.now(),
        cancelAtPeriodEnd: true,
        updatedAt: Date.now(),
      })
    );

    await db.transact(
      db.tx.subscriptionEvents[generateId()].update({
        userId: userProfiles[0].userId,
        eventType: 'cancelled',
        paypalSubscriptionId: subscriptionId,
        metadata: JSON.stringify(resource),
        createdAt: Date.now(),
      })
    );
  }
}

async function handleSubscriptionSuspended(resource: { id: string }) {
  const subscriptionId = resource.id;

  const { userProfiles } = await db.query({
    userProfiles: { $: { where: { paypalSubscriptionId: subscriptionId } } },
  });

  if (userProfiles?.[0]) {
    await db.transact(
      db.tx.userProfiles[userProfiles[0].id].update({
        subscriptionStatus: 'suspended',
        userType: 'free', // Downgrade to free on suspension
        updatedAt: Date.now(),
      })
    );
  }
}

async function handleSubscriptionExpired(resource: { id: string }) {
  const subscriptionId = resource.id;

  const { userProfiles } = await db.query({
    userProfiles: { $: { where: { paypalSubscriptionId: subscriptionId } } },
  });

  if (userProfiles?.[0]) {
    await db.transact(
      db.tx.userProfiles[userProfiles[0].id].update({
        subscriptionStatus: 'expired',
        userType: 'free',
        updatedAt: Date.now(),
      })
    );

    await db.transact(
      db.tx.subscriptionEvents[generateId()].update({
        userId: userProfiles[0].userId,
        eventType: 'expired',
        paypalSubscriptionId: subscriptionId,
        metadata: JSON.stringify(resource),
        createdAt: Date.now(),
      })
    );
  }
}
