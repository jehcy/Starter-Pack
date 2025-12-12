import { NextResponse } from 'next/server';
import { init } from '@instantdb/admin';
import { cancelSubscription } from '@/lib/paypal';

// Initialize InstantDB admin client for server-side auth verification
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

export async function POST(request: Request) {
  try {
    // Parse request body
    const { refreshToken } = await request.json();

    // Verify authentication via refresh token
    if (!refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify the refresh token server-side to get authenticated user
    const authUser = await adminDb.auth.verifyToken(refreshToken);

    if (!authUser) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // Get user's profile to check for active subscription
    const profileData = await adminDb.query({
      userProfiles: { $: { where: { userId: authUser.id } } },
    });

    const profile = profileData.userProfiles?.[0];

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Prevent admin account deletion
    if (profile.userType === 'admin') {
      return NextResponse.json({ error: 'Admin accounts cannot be deleted' }, { status: 403 });
    }

    // If active subscription, cancel it first
    if (
      profile.paypalSubscriptionId &&
      (profile.subscriptionStatus === 'active' || profile.subscriptionStatus === 'pending')
    ) {
      try {
        await cancelSubscription(profile.paypalSubscriptionId, 'Account deletion');
      } catch (error) {
        console.error('Failed to cancel subscription during account deletion:', error);
        // Continue with deletion even if cancellation fails
      }
    }

    // Delete related data - PromptUsage
    const promptUsageData = await adminDb.query({
      promptUsage: { $: { where: { userId: authUser.id } } },
    });

    if (promptUsageData.promptUsage) {
      for (const usage of promptUsageData.promptUsage) {
        await adminDb.transact(adminDb.tx.promptUsage[usage.id].delete());
      }
    }

    // Delete related data - SubscriptionEvents
    const subscriptionEventsData = await adminDb.query({
      subscriptionEvents: { $: { where: { userId: authUser.id } } },
    });

    if (subscriptionEventsData.subscriptionEvents) {
      for (const event of subscriptionEventsData.subscriptionEvents) {
        await adminDb.transact(adminDb.tx.subscriptionEvents[event.id].delete());
      }
    }

    // Delete user profile from InstantDB
    await adminDb.transact(adminDb.tx.userProfiles[profile.id].delete());

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete account' },
      { status: 500 }
    );
  }
}
