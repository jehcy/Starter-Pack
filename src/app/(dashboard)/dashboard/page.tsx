'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useCredits } from '@/hooks/useCredits';
import Link from 'next/link';
import { Sparkles, Palette, Infinity } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { tier, creditsRemaining, isUnlimited } = useCredits();

  const displayName = profile?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {displayName}!</p>
      </div>

      {/* Account Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">
                {isUnlimited ? (
                  <span className="flex items-center gap-2">
                    <Infinity className="h-6 w-6" />
                    Unlimited
                  </span>
                ) : (
                  creditsRemaining
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {isUnlimited ? 'AI Credits' : creditsRemaining === 1 ? 'AI Credit' : 'AI Credits'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold capitalize">{tier || 'Free'}</p>
              <p className="text-sm text-muted-foreground">Current Plan</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Palette className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Saved Themes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Themes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            My Themes
            <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
          </CardTitle>
          <CardDescription>Your saved theme configurations will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Palette className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2">Theme Saving Coming Soon</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Soon you'll be able to save and manage your custom theme configurations. For now, you can create and export themes in the Theme Editor.
            </p>
            <Button asChild>
              <Link href="/theme">
                <Palette className="h-4 w-4 mr-2" />
                Open Theme Editor
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link
            href="/theme"
            className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Theme Editor</p>
              <p className="text-xs text-muted-foreground">Create and customize your theme</p>
            </div>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Settings</p>
              <p className="text-xs text-muted-foreground">Manage your account and billing</p>
            </div>
          </Link>
          {!profile?.userType || profile.userType === 'free' ? (
            <Link
              href="/pricing"
              className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Upgrade to Pro</p>
                <p className="text-xs text-muted-foreground">Get unlimited AI theme generation</p>
              </div>
            </Link>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
