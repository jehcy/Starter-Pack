'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CreditCard, CheckCircle, XCircle, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function SubscriptionManager() {
  const { profile, isPaid, isLoading } = useUserProfile();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!profile?.paypalSubscriptionId) return;

    const confirmed = window.confirm(
      'Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.'
    );

    if (!confirmed) return;

    setIsCancelling(true);
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: profile.paypalSubscriptionId,
          reason: 'User requested cancellation',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      toast.success('Subscription cancelled', {
        description: 'You will have access until the end of your billing period.',
      });
    } catch (error) {
      toast.error('Failed to cancel subscription', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = () => {
    switch (profile?.subscriptionStatus) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" /> Suspended
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline">
            <XCircle className="w-3 h-3 mr-1" /> Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Subscription
          </CardTitle>
          <CardDescription>Manage your VibeCN Pro subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Subscription
        </CardTitle>
        <CardDescription>Manage your VibeCN Pro subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          {getStatusBadge()}
        </div>

        {isPaid && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-primary" />
                Pro ($7/month)
              </span>
            </div>
            {profile?.currentPeriodEnd && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {profile.cancelAtPeriodEnd ? 'Access until' : 'Next billing date'}
                </span>
                <span className="text-sm font-medium">
                  {new Date(profile.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            )}
            {profile?.subscribedAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member since</span>
                <span className="text-sm font-medium">
                  {new Date(profile.subscribedAt).toLocaleDateString()}
                </span>
              </div>
            )}
            {!profile?.cancelAtPeriodEnd && (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </Button>
            )}
            {profile?.cancelAtPeriodEnd && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-900 dark:text-amber-200">
                  Your subscription is cancelled and will end on{' '}
                  {new Date(profile.currentPeriodEnd!).toLocaleDateString()}. You can continue
                  using Pro features until then.
                </p>
              </div>
            )}
          </>
        )}

        {!isPaid && (
          <>
            <div className="p-3 rounded-lg bg-muted border">
              <p className="text-sm text-muted-foreground">
                You're currently on the free plan with 3 AI prompts per month.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/pricing">Upgrade to Pro</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
