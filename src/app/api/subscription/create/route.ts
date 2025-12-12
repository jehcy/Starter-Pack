import { NextResponse } from 'next/server';
import { createSubscription } from '@/lib/paypal';
import { headers } from 'next/headers';
import { init } from '@instantdb/admin';

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
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to subscribe.' },
        { status: 401 }
      );
    }

    // Verify the refresh token server-side to get authenticated user
    const authUser = await adminDb.auth.verifyToken(refreshToken);

    if (!authUser) {
      return NextResponse.json(
        { error: 'Invalid or expired session. Please sign in again.' },
        { status: 401 }
      );
    }

    // Use verified user ID from token instead of trusting client-sent userId
    const verifiedUserId = authUser.id;

    const headersList = await headers();
    const origin = headersList.get('origin') || 'http://localhost:3000';
    const returnUrl = `${origin}/dashboard/settings?subscription=success`;
    const cancelUrl = `${origin}/pricing?subscription=cancelled`;

    const subscription = await createSubscription(verifiedUserId, returnUrl, cancelUrl);

    // Find the approval URL
    const approvalLink = subscription.links?.find((link: { rel: string }) => link.rel === 'approve');

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl: approvalLink?.href,
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
