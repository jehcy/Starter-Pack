'use client';

import { useCallback, useEffect } from 'react';
import { db, tx, id, ADMIN_EMAILS } from '@/lib/instantdb';
import { useAuth, User } from '@/hooks/useAuth';
import type { UserProfile, UserType } from '@/lib/instantdb';

interface UseUserProfileReturn {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPaid: boolean;
  userType: UserType | null;
  refreshToken: string | undefined;
  signOut: () => void;
  error: { message: string } | undefined;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user, isLoading: authLoading, isAuthenticated, signOut, error } = useAuth();

  // Query user profile from InstantDB
  const { data, isLoading: profileLoading } = db.useQuery(
    user ? { userProfiles: { $: { where: { userId: user.id } } } } : null
  );

  const profile = (data?.userProfiles?.[0] as UserProfile | undefined) ?? null;

  // Auto-create profile for new users
  useEffect(() => {
    if (user && !profileLoading && !profile) {
      const profileId = id();
      const isAdminEmail = ADMIN_EMAILS.includes(user.email ?? '');
      db.transact(
        tx.userProfiles[profileId].update({
          userId: user.id,
          email: user.email ?? '',
          displayName: user.email?.split('@')[0] ?? null,
          avatarUrl: null,
          userType: isAdminEmail ? 'admin' : 'free',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          // Subscription fields
          paypalSubscriptionId: null,
          subscriptionStatus: 'none',
          subscribedAt: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          cancelledAt: null,
          cancelAtPeriodEnd: false,
        })
      );
    }
  }, [user, profile, profileLoading]);

  // Auto-upgrade existing profiles to admin if email matches
  useEffect(() => {
    if (profile && user?.email && ADMIN_EMAILS.includes(user.email) && profile.userType !== 'admin') {
      db.transact(
        tx.userProfiles[profile.id].update({
          userType: 'admin',
          updatedAt: Date.now(),
        })
      );
    }
  }, [profile, user?.email]);

  return {
    user,
    profile,
    isLoading: authLoading || profileLoading,
    isAuthenticated,
    isAdmin: profile?.userType === 'admin',
    isPaid: profile?.userType === 'paid' || profile?.userType === 'admin',
    userType: profile?.userType ?? null,
    refreshToken: user?.refresh_token,
    signOut,
    error,
  };
}
