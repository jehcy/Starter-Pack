'use client';

import { db } from '@/lib/instantdb';

/**
 * Client-side auth hook using InstantDB authentication
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useAuth } from '@/hooks/useAuth';
 *
 * export function ProfileButton() {
 *   const { user, isLoading, signOut } = useAuth();
 *
 *   if (isLoading) return <Skeleton />;
 *   if (!user) return <SignInButton />;
 *
 *   return <button onClick={signOut}>Sign Out</button>;
 * }
 * ```
 */

export interface User {
  id: string;
  email: string | null;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: { message: string } | undefined;
  signOut: () => void;
}

export function useAuth(): UseAuthReturn {
  const { isLoading, user, error } = db.useAuth();

  return {
    user: user ? { id: user.id, email: user.email ?? null } : null,
    isLoading,
    isAuthenticated: !!user,
    error,
    signOut: () => db.auth.signOut(),
  };
}
