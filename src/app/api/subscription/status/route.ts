import { NextResponse } from 'next/server';
import { getSubscriptionDetails } from '@/lib/paypal';
import { init } from '@instantdb/admin';

// Initialize InstantDB admin client for server-side auth verification
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

export async function POST(request: Request) {
  try {
    // Parse request body
    const { refreshToken, subscriptionId } = await request.json();

    // Verify authentication via refresh token
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the refresh token server-side to get authenticated user
    const authUser = await adminDb.auth.verifyToken(refreshToken);

    if (!authUser) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    const details = await getSubscriptionDetails(subscriptionId);

    return NextResponse.json({
      status: details.status,
      planId: details.plan_id,
      nextBillingTime: details.billing_info?.next_billing_time,
      lastPayment: details.billing_info?.last_payment,
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get status' },
      { status: 500 }
    );
  }
}
