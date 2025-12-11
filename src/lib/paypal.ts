/**
 * PayPal Subscriptions API Client
 *
 * This library provides utilities for interacting with PayPal's Subscriptions API
 * for managing recurring billing.
 */

interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  mode: 'sandbox' | 'live';
}

const config: PayPalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID!,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET!,
  mode: (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
};

const baseUrl =
  config.mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

/**
 * Get OAuth access token from PayPal
 */
export async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get PayPal access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Create a PayPal subscription
 */
export async function createSubscription(
  userId: string,
  returnUrl: string,
  cancelUrl: string
): Promise<{
  id: string;
  status: string;
  links: Array<{ href: string; rel: string; method: string }>;
}> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/v1/billing/subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan_id: process.env.PAYPAL_PLAN_ID,
      custom_id: userId, // Store user ID for webhook processing
      application_context: {
        brand_name: 'VibeCN',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create subscription: ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * Get subscription details from PayPal
 */
export async function getSubscriptionDetails(subscriptionId: string): Promise<{
  id: string;
  status: string;
  plan_id: string;
  billing_info?: {
    last_payment?: { time: string; amount: { value: string; currency_code: string } };
    next_billing_time?: string;
  };
}> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/v1/billing/subscriptions/${subscriptionId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get subscription details: ${error}`);
  }

  return response.json();
}

/**
 * Cancel a PayPal subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  reason: string
): Promise<boolean> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });

  return response.ok;
}

/**
 * Verify PayPal webhook signature
 * This ensures the webhook request actually came from PayPal
 */
export async function verifyWebhookSignature(
  webhookId: string,
  transmissionId: string,
  transmissionTime: string,
  certUrl: string,
  authAlgo: string,
  transmissionSig: string,
  webhookEvent: object
): Promise<boolean> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      webhook_id: webhookId,
      transmission_id: transmissionId,
      transmission_time: transmissionTime,
      cert_url: certUrl,
      auth_algo: authAlgo,
      transmission_sig: transmissionSig,
      webhook_event: webhookEvent,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.verification_status === 'SUCCESS';
}
