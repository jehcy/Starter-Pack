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
      console.error('No token in callback');
      return NextResponse.redirect(new URL('/pricing?purchase=error', request.url));
    }

    console.log('[Credits Callback] Order ID:', token, 'PayerID:', payerId);

    // Get PayPal access token
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const mode = process.env.PAYPAL_MODE || 'sandbox';
    const baseUrl = mode === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    const { access_token } = await tokenResponse.json();

    // Capture the order
    const captureResponse = await fetch(`${baseUrl}/v2/checkout/orders/${token}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!captureResponse.ok) {
      const error = await captureResponse.text();
      console.error('[Credits Callback] Capture failed:', error);
      return NextResponse.redirect(new URL('/pricing?purchase=error', request.url));
    }

    const captureData = await captureResponse.json();
    console.log('[Credits Callback] ===== CAPTURE SUCCESSFUL =====');
    console.log('[Credits Callback] Order ID:', captureData.id);
    console.log('[Credits Callback] Full response:', JSON.stringify(captureData, null, 2));

    // Extract userId from custom_id
    const userId = captureData.purchase_units?.[0]?.custom_id;
    console.log('[Credits Callback] Extracted userId:', userId);

    // Extract amount - try BOTH possible locations
    const directAmount = captureData.purchase_units?.[0]?.amount?.value;
    const capture = captureData.purchase_units?.[0]?.payments?.captures?.[0];
    const captureAmount = capture?.amount?.value;

    console.log('[Credits Callback] Direct amount path:', directAmount);
    console.log('[Credits Callback] Capture amount path:', captureAmount);

    const amount = captureAmount || directAmount;
    console.log('[Credits Callback] Final amount:', amount);

    if (!userId) {
      console.error('[Credits Callback] ❌ No userId found in order');
      return NextResponse.redirect(new URL('/pricing?purchase=error', request.url));
    }

    // Add credits if it's a $3 purchase
    if (amount === '3.00') {
      console.log(`[Credits Callback] ✅ Adding 3 credits to user ${userId}`);

      try {
        await addPurchasedCredits(userId, 3);
        console.log('[Credits Callback] ✅ Credits added successfully!');

        // Redirect to pricing with success message
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
    console.error('[Credits Callback] Error:', error);
    return NextResponse.redirect(new URL('/pricing?purchase=error', request.url));
  }
}
