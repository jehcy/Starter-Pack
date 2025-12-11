import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { cancelSubscription } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const cookies = headersList.get('cookie') || '';
    const hasInstantDBAuth = cookies.includes('instantdb-');

    if (!hasInstantDBAuth) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { subscriptionId, reason } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    const success = await cancelSubscription(
      subscriptionId,
      reason || 'User requested cancellation'
    );

    if (!success) {
      return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cancel error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to cancel' },
      { status: 500 }
    );
  }
}
