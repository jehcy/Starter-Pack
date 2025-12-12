import { NextRequest, NextResponse } from 'next/server';
import { init } from '@instantdb/admin';
import { getSubscriptionDetails } from '@/lib/paypal';

// Initialize InstantDB admin client
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

/**
 * POST /api/subscription/activate
 *
 * Activates a subscription after user returns from PayPal.
 * This is needed because PayPal webhooks can't reach localhost during development.
 *
 * Body: { subscriptionId: string, refreshToken: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscriptionId, refreshToken } = body;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token required' }, { status: 401 });
    }

    // Verify user via refresh token
    const authUser = await adminDb.auth.verifyToken(refreshToken);
    if (!authUser) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }
    const verifiedUserId = authUser.id;

    // Verify subscription with PayPal
    const subscription = await getSubscriptionDetails(subscriptionId);

    if (!subscription || !['ACTIVE', 'APPROVED'].includes(subscription.status)) {
      return NextResponse.json(
        { error: 'Subscription not active', status: subscription?.status },
        { status: 400 }
      );
    }

    // Find user profile
    const { userProfiles } = await adminDb.query({
      userProfiles: {
        $: { where: { userId: verifiedUserId } },
      },
    });

    const profile = userProfiles?.[0];
    if (!profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Calculate billing period (1 month from now)
    const now = Date.now();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    // Update user profile to paid
    await adminDb.transact(
      adminDb.tx.userProfiles[profile.id].update({
        userType: 'paid',
        paypalSubscriptionId: subscriptionId,
        subscriptionStatus: 'active',
        subscribedAt: now,
        currentPeriodStart: now,
        currentPeriodEnd: oneMonthLater.getTime(),
        updatedAt: now,
      })
    );

    // Log subscription event
    const eventId = crypto.randomUUID();
    await adminDb.transact(
      adminDb.tx.subscriptionEvents[eventId].update({
        userId: verifiedUserId,
        eventType: 'activated',
        paypalSubscriptionId: subscriptionId,
        metadata: JSON.stringify({ activatedVia: 'return_url', status: subscription.status }),
        createdAt: now,
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Subscription activated successfully',
      userType: 'paid',
    });
  } catch (error) {
    console.error('Subscription activation error:', error);
    return NextResponse.json(
      { error: 'Failed to activate subscription' },
      { status: 500 }
    );
  }
}
