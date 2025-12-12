import { NextRequest, NextResponse } from 'next/server';
import { addPurchasedCredits } from '@/lib/credits';

/**
 * PayPal Return Callback
 * Called when user completes payment and returns from PayPal
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token'); // PayPal order ID
    const payerId = searchParams.get('PayerID');

    if (!token) {
      console.error('[Credits Callback] No token in callback');
      return NextResponse.redirect(new URL('/pricing?purchase=error&reason=no_token', request.url));
    }

    console.log('[Credits Callback] ===== CALLBACK STARTED =====');
    console.log('[Credits Callback] Order ID:', token, 'PayerID:', payerId);

    // Get PayPal access token
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const mode = process.env.PAYPAL_MODE || 'sandbox';
    const baseUrl = mode === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    console.log('[Credits Callback] Getting access token...');
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error('[Credits Callback] Failed to get access token:', tokenError);
      throw new Error('Failed to get PayPal access token');
    }

    const { access_token } = await tokenResponse.json();
    console.log('[Credits Callback] ✅ Access token obtained');

    // First, get the order details to check its status
    console.log('[Credits Callback] Fetching order details...');
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders/${token}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!orderResponse.ok) {
      const orderError = await orderResponse.text();
      console.error('[Credits Callback] Failed to get order details:', orderError);
      return NextResponse.redirect(new URL('/pricing?purchase=error&reason=order_fetch_failed', request.url));
    }

    const orderData = await orderResponse.json();
    console.log('[Credits Callback] Order status:', orderData.status);
    console.log('[Credits Callback] Full order data:', JSON.stringify(orderData, null, 2));

    let finalData = orderData;

    // If order is not captured yet, capture it
    if (orderData.status === 'APPROVED') {
      console.log('[Credits Callback] Order is APPROVED, capturing...');
      const captureResponse = await fetch(`${baseUrl}/v2/checkout/orders/${token}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!captureResponse.ok) {
        const captureError = await captureResponse.text();
        console.error('[Credits Callback] Capture failed:', captureError);

        // Try to parse the error
        try {
          const errorJson = JSON.parse(captureError);
          console.error('[Credits Callback] Parsed error:', errorJson);

          // If already captured, that's actually OK - webhook handled it
          if (errorJson.name === 'UNPROCESSABLE_ENTITY' && errorJson.details?.[0]?.issue === 'ORDER_ALREADY_CAPTURED') {
            console.log('[Credits Callback] ℹ️ Order already captured (webhook handled it)');
            // Use the existing order data and let webhook handle credit addition
            return NextResponse.redirect(new URL('/pricing?purchase=success&credits=3', request.url));
          }
        } catch (parseError) {
          console.error('[Credits Callback] Could not parse error:', parseError);
        }

        return NextResponse.redirect(new URL('/pricing?purchase=error&reason=capture_failed', request.url));
      }

      finalData = await captureResponse.json();
      console.log('[Credits Callback] ✅ Capture successful');
    } else if (orderData.status === 'COMPLETED') {
      console.log('[Credits Callback] Order already COMPLETED (webhook likely handled it)');
      // Webhook has already processed this - just redirect to success
      return NextResponse.redirect(new URL('/pricing?purchase=success&credits=3', request.url));
    } else {
      console.warn('[Credits Callback] Unexpected order status:', orderData.status);
      return NextResponse.redirect(new URL('/pricing?purchase=error&reason=unexpected_status', request.url));
    }

    console.log('[Credits Callback] Final data:', JSON.stringify(finalData, null, 2));

    // Extract userId from custom_id
    const userId = finalData.purchase_units?.[0]?.custom_id;
    console.log('[Credits Callback] Extracted userId:', userId);

    // Extract amount - try BOTH possible locations
    const directAmount = finalData.purchase_units?.[0]?.amount?.value;
    const capture = finalData.purchase_units?.[0]?.payments?.captures?.[0];
    const captureAmount = capture?.amount?.value;

    console.log('[Credits Callback] Direct amount path:', directAmount);
    console.log('[Credits Callback] Capture amount path:', captureAmount);

    const amount = captureAmount || directAmount;
    console.log('[Credits Callback] Final amount:', amount);

    if (!userId) {
      console.error('[Credits Callback] ❌ No userId found in order');
      return NextResponse.redirect(new URL('/pricing?purchase=error&reason=no_user_id', request.url));
    }

    // Add credits if it's a $3 purchase
    if (amount === '3.00') {
      console.log(`[Credits Callback] ✅ Adding 3 credits to user ${userId} for order ${token}`);

      try {
        const result = await addPurchasedCredits(userId, 3, token);

        if (result.added) {
          console.log('[Credits Callback] ✅ Credits added successfully!');
        } else {
          console.log(`[Credits Callback] ℹ️ Credits not added: ${result.reason} (likely webhook handled it)`);
        }

        // Redirect to pricing with success message (even if credits were already added)
        return NextResponse.redirect(new URL('/pricing?purchase=success&credits=3', request.url));
      } catch (creditError) {
        console.error('[Credits Callback] ❌ Failed to add credits:', creditError);
        return NextResponse.redirect(new URL('/pricing?purchase=error&reason=credit_addition_failed', request.url));
      }
    }

    // If amount doesn't match expected value, log and redirect with error
    console.warn(`[Credits Callback] ⚠️ Unexpected amount: ${amount} (expected 3.00)`);
    return NextResponse.redirect(new URL('/pricing?purchase=error&reason=unexpected_amount', request.url));

  } catch (error) {
    console.error('[Credits Callback] ❌ Unexpected error:', error);
    console.error('[Credits Callback] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.redirect(new URL('/pricing?purchase=error&reason=exception', request.url));
  }
}
