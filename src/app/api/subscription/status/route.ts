import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getSubscriptionDetails } from '@/lib/paypal';

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const cookies = headersList.get('cookie') || '';
    const hasInstantDBAuth = cookies.includes('instantdb-');

    if (!hasInstantDBAuth) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('subscriptionId');

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
