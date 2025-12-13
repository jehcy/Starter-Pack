import { NextResponse } from 'next/server';
import { init } from '@instantdb/admin';
import { getUserCredits } from '@/lib/credits';

// Initialize InstantDB admin client for server-side auth verification
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_INSTANTDB_APP_ID || !process.env.INSTANTDB_ADMIN_TOKEN) {
      console.error('[Credits API] Missing required environment variables:', {
        hasAppId: !!process.env.NEXT_PUBLIC_INSTANTDB_APP_ID,
        hasAdminToken: !!process.env.INSTANTDB_ADMIN_TOKEN,
      });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Parse request body
    const { refreshToken } = await request.json();

    // Verify authentication via refresh token
    if (!refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify the refresh token server-side to get authenticated user
    let authUser;
    try {
      authUser = await adminDb.auth.verifyToken(refreshToken);
    } catch (tokenError) {
      console.error('[Credits API] Token verification failed:', {
        error: tokenError,
        type: tokenError?.constructor?.name,
        message: tokenError instanceof Error ? tokenError.message : String(tokenError),
      });
      return NextResponse.json(
        { error: 'Session verification failed. Please sign in again.' },
        { status: 401 }
      );
    }

    if (!authUser) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // Get credit status
    const credits = await getUserCredits(authUser.id);

    return NextResponse.json({
      tier: credits.tier,
      freeCreditsRemaining: credits.freeCreditsRemaining,
      purchasedCredits: credits.purchasedCredits,
      totalPurchasedCredits: credits.totalPurchasedCredits,
      totalCredits: credits.isUnlimited
        ? 'unlimited'
        : credits.freeCreditsRemaining + credits.purchasedCredits,
      isUnlimited: credits.isUnlimited,
      monthlyUsage: credits.monthlyUsage,
      abuseWarning: credits.abuseWarning,
    });
  } catch (error) {
    console.error('[Credits API] Unexpected error:', {
      error,
      type: error?.constructor?.name,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get credit status' },
      { status: 500 }
    );
  }
}
