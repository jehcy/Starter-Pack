'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CreditCard,
  ExternalLink,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const { user: currentUser } = useAuth();
  const { profile, isLoading, refreshToken, signOut } = useUserProfile();

  const isOwner = currentUser?.id === userId;

  // State for actions
  const [isCancelling, setIsCancelling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Helper to get status badge
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

  // Helper to get initials from display name
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Cancel subscription handler
  const handleCancelSubscription = async () => {
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
          refreshToken,
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

  // Delete account handler
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      toast.success('Account deleted successfully');
      signOut();
      router.push('/');
    } catch (error) {
      toast.error('Failed to delete account', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container-wide py-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Not found or not authorized
  if (!profile || !isOwner) {
    return (
      <div className="container-wide py-12">
        <div className="text-center space-y-4">
          <h1 className="font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to view this page.
          </p>
          <Button asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="font-bold">Account</h1>
        <p className="text-muted-foreground">Manage your account settings and subscription</p>
      </div>

      {/* Main Content */}
      <div className="space-y-6 max-w-3xl">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatarUrl || undefined} />
                <AvatarFallback className="text-xl">
                  {getInitials(profile.displayName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h2 className="font-bold">{profile.displayName || 'Anonymous'}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={profile.userType === 'admin' ? 'default' : 'secondary'}>
                    {profile.userType}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Section - Owner Only */}
        {isOwner && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing
              </CardTitle>
              <CardDescription>Manage your subscription and payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge()}
              </div>

              {/* Plan Info - Paid Users */}
              {profile.userType === 'paid' || profile.userType === 'admin' ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Pro ($7/month)
                    </span>
                  </div>
                  {profile.currentPeriodEnd && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {profile.cancelAtPeriodEnd ? 'Access until' : 'Next billing date'}
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(profile.currentPeriodEnd).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {profile.subscribedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member since</span>
                      <span className="text-sm font-medium">
                        {new Date(profile.subscribedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Manage Payment on PayPal */}
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href="https://www.paypal.com/myaccount/autopay"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Manage Payment on PayPal
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  {/* Cancel Subscription */}
                  {profile.subscriptionStatus === 'active' &&
                    !profile.cancelAtPeriodEnd &&
                    profile.userType !== 'admin' && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleCancelSubscription}
                        disabled={isCancelling}
                      >
                        {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
                      </Button>
                    )}

                  {/* Cancellation Notice */}
                  {profile.cancelAtPeriodEnd && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-amber-900 dark:text-amber-200">
                        Your subscription is cancelled and will end on{' '}
                        {new Date(profile.currentPeriodEnd!).toLocaleDateString()}. You can
                        continue using Pro features until then.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Free Plan Message */}
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
        )}

        {/* Danger Zone - Owner Only */}
        {isOwner && profile.userType !== 'admin' && (
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                <div>
                  <h4 className="font-semibold">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data.
                  </p>
                </div>
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove all your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
