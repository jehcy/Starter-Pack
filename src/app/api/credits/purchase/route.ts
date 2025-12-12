import { NextResponse } from 'next/server';
import { init } from '@instantdb/admin';
import { createOrder } from '@/lib/paypal';

// Initialize InstantDB admin client for server-side auth verification
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

export async function POST(request: Request) {
  try {
    // Parse request body
    const { refreshToken, package: packageType } = await request.json();

    // Verify authentication via refresh token
    if (!refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify the refresh token server-side to get authenticated user
    const authUser = await adminDb.auth.verifyToken(refreshToken);

    if (!authUser) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    console.log('[Credits Purchase] ===== CREATING ORDER =====');
    console.log('[Credits Purchase] User ID:', authUser.id);
    console.log('[Credits Purchase] User email:', authUser.email);

    // Validate package type
    if (packageType !== 'starter') {
      return NextResponse.json({ error: 'Invalid package type' }, { status: 400 });
    }

    // Get base URL for return/cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const returnUrl = `${baseUrl}/api/credits/callback`; // Callback route captures payment
    const cancelUrl = `${baseUrl}/pricing?purchase=cancelled`;

    console.log('[Credits Purchase] Base URL:', baseUrl);
    console.log('[Credits Purchase] Return URL:', returnUrl);

    // Create PayPal order for $3 starter pack
    const order = await createOrder(
      authUser.id,
      '3.00',
      'VibeCN Starter Pack - 3 AI Credits',
      returnUrl,
      cancelUrl
    );

    console.log('[Credits Purchase] Order created:', order.id);
    console.log('[Credits Purchase] Full order response:', JSON.stringify(order, null, 2));

    // Find approval URL
    const approvalUrl = order.links.find((link) => link.rel === 'approve')?.href;

    if (!approvalUrl) {
      throw new Error('No approval URL found in PayPal response');
    }

    return NextResponse.json({
      orderId: order.id,
      approvalUrl,
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create purchase' },
      { status: 500 }
    );
  }
}
