'use client';

import { useCallback, useEffect } from 'react';
import { db, tx, id } from '@/lib/instantdb';
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
      db.transact(
        tx.userProfiles[profileId].update({
          userId: user.id,
          email: user.email ?? '',
          displayName: user.email?.split('@')[0] ?? null,
          avatarUrl: null,
          userType: 'free',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      );
    }
  }, [user, profile, profileLoading]);

  return {
    user,
    profile,
    isLoading: authLoading || profileLoading,
    isAuthenticated,
    isAdmin: profile?.userType === 'admin',
    isPaid: profile?.userType === 'paid' || profile?.userType === 'admin',
    userType: profile?.userType ?? null,
    signOut,
    error,
  };
}
