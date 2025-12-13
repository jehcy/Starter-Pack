'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useCredits } from '@/hooks/useCredits';
import { toast } from 'sonner';
import { Sparkles, Infinity, Zap, ExternalLink, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<'account' | 'billing'>('account');
  const [isSaving, setIsSaving] = React.useState(false);
  const [isActivating, setIsActivating] = React.useState(false);
  const [isCancelling, setIsCancelling] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { profile, refreshToken, isPaid, signOut } = useUserProfile();
  const { tier, creditsRemaining, isUnlimited, isLoading: creditsLoading } = useCredits();

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

  // Handle subscription success callback from PayPal
  React.useEffect(() => {
    const subscription = searchParams.get('subscription');
    const subscriptionId = searchParams.get('subscription_id');

    if (subscription === 'success' && subscriptionId && refreshToken && !isPaid && !isActivating) {
      activateSubscription(subscriptionId);
    }
  }, [searchParams, refreshToken, isPaid, isActivating]);

  async function activateSubscription(subscriptionId: string) {
    setIsActivating(true);
    try {
      const response = await fetch('/api/subscription/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId, refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Subscription activated! You now have Pro access.');
        // Clear URL params
        window.history.replaceState({}, '', '/dashboard/settings');
      } else {
        toast.error(data.error || 'Failed to activate subscription');
      }
    } catch {
      toast.error('Failed to activate subscription');
    } finally {
      setIsActivating(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  }

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      {/* Settings Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <SettingsTab active={activeTab === 'account'} onClick={() => setActiveTab('account')}>
          Account
        </SettingsTab>
        <SettingsTab active={activeTab === 'billing'} onClick={() => setActiveTab('billing')}>
          Billing
        </SettingsTab>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>View your account details and subscription status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile?.avatarUrl || undefined} />
                      <AvatarFallback className="text-xl">
                        {getInitials(profile?.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h2 className="font-bold">{profile?.displayName || 'Anonymous'}</h2>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                      <Badge variant={profile?.userType === 'admin' ? 'default' : 'secondary'}>
                        {profile?.userType || 'free'}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Subscription Status */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Subscription Status</span>
                      {getStatusBadge()}
                    </div>

                    {/* Plan Info - Paid Users */}
                    {(profile?.userType === 'paid' || profile?.userType === 'admin') && (
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

                        {/* Cancellation Notice */}
                        {profile?.cancelAtPeriodEnd && (
                          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                            <p className="text-xs text-amber-900 dark:text-amber-200">
                              Your subscription is cancelled and will end on{' '}
                              {new Date(profile.currentPeriodEnd!).toLocaleDateString()}. You can
                              continue using Pro features until then.
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Free Plan Message */}
                    {profile?.userType === 'free' && (
                      <div className="p-3 rounded-lg bg-muted border">
                        <p className="text-sm text-muted-foreground">
                          You're currently on the free plan. Upgrade to Pro for unlimited AI credits!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <Card>
            <CardHeader>
              <CardTitle>Credits & Billing</CardTitle>
              <CardDescription>Manage your AI generation credits and subscription.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Credit Balance */}
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Current Balance</h3>
                    </div>
                    {creditsLoading ? (
                      <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                    ) : (
                      <div className="text-right">
                        {isUnlimited ? (
                          <div className="flex items-center gap-1 text-primary">
                            <Infinity className="h-5 w-5" />
                            <span className="text-sm font-medium">Unlimited</span>
                          </div>
                        ) : (
                          <div>
                            <div className="text-2xl font-bold">{creditsRemaining}</div>
                            <div className="text-xs text-muted-foreground">
                              {creditsRemaining === 1 ? 'credit' : 'credits'}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Plan:</span>
                      <span className="font-medium capitalize">{tier || 'Free'}</span>
                    </div>
                    {tier === 'free' && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Free users get 1 credit to try AI theme generation. Upgrade to get more!
                      </p>
                    )}
                    {tier === 'starter' && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Starter pack credits never expire. Purchase more anytime!
                      </p>
                    )}
                    {tier === 'pro' && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Pro users get unlimited AI theme generation!
                      </p>
                    )}
                  </div>
                </div>

                {/* Subscription Status & Management */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {getStatusBadge()}
                  </div>

                  {/* Plan Info - Paid Users */}
                  {(profile?.userType === 'paid' || profile?.userType === 'admin') && (
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
                      {profile?.subscriptionStatus === 'active' &&
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
                      {profile?.cancelAtPeriodEnd && (
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
                          <p className="text-xs text-amber-900 dark:text-amber-200">
                            Your subscription is cancelled and will end on{' '}
                            {new Date(profile.currentPeriodEnd!).toLocaleDateString()}. You can
                            continue using Pro features until then.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Free Plan Actions */}
                  {!isPaid && (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => window.location.href = '/pricing'}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {tier === 'free' ? 'Buy Credits or Upgrade' : 'Buy More Credits'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            </Card>
          )}

          {/* Danger Zone - Show on Account tab only */}
          {activeTab === 'account' && profile?.userType !== 'admin' && (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions. Please proceed with caution.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data.
                    </p>
                  </div>
                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="rounded-xl">
                        Delete Account
                      </Button>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="text-sm font-medium">Pro</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member since</span>
                <span className="text-sm font-medium">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Themes</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <Separator />
              <Button variant="outline" className="w-full rounded-xl" size="sm">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ConnectedAccount
                name="Google"
                email="john@gmail.com"
                connected
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
              />
              <ConnectedAccount
                name="GitHub"
                email="johndoe"
                connected
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                }
              />
              <ConnectedAccount
                name="Twitter"
                connected={false}
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                }
              />
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Need help?</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check our documentation or contact support.
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-primary">
                    View Documentation →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface SettingsTabProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function SettingsTab({ children, active, onClick }: SettingsTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </button>
  );
}

interface ConnectedAccountProps {
  name: string;
  email?: string;
  connected: boolean;
  icon: React.ReactNode;
}

function ConnectedAccount({ name, email, connected, icon }: ConnectedAccountProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/50 p-3">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium">{name}</p>
          {email && <p className="text-xs text-muted-foreground">{email}</p>}
        </div>
      </div>
      <Button
        variant={connected ? 'outline' : 'default'}
        size="sm"
        className="rounded-lg text-xs"
      >
        {connected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  );
}
