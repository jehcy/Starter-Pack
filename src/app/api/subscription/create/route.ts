import { NextResponse } from 'next/server';
import { createSubscription } from '@/lib/paypal';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Verify authentication via InstantDB cookie
    const headersList = await headers();
    const cookies = headersList.get('cookie') || '';
    const hasInstantDBAuth = cookies.includes('instantdb-');

    if (!hasInstantDBAuth) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const origin = headersList.get('origin') || 'http://localhost:3000';
    const returnUrl = `${origin}/dashboard/settings?subscription=success`;
    const cancelUrl = `${origin}/pricing?subscription=cancelled`;

    const subscription = await createSubscription(userId, returnUrl, cancelUrl);

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
