'use client';

import * as React from 'react';

/**
 * Client-side auth hook
 *
 * This is a placeholder hook for client-side authentication state.
 * Replace with your actual auth provider's hook.
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
  email: string;
  name: string | null;
  image: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type UseAuthReturn = AuthState & AuthActions;

export function useAuth(): UseAuthReturn {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  React.useEffect(() => {
    async function checkSession() {
      // TODO: Implement actual session check
      // Example: fetch('/api/auth/session')
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }

    checkSession();
  }, []);

  const signIn = React.useCallback(async (_email: string, _password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    // TODO: Implement actual sign-in
    // Example: await signInWithCredentials(email, password);

    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  const signUp = React.useCallback(async (_email: string, _password: string, _name: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    // TODO: Implement actual sign-up
    // Example: await createUser({ email, password, name });

    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  const signOut = React.useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    // TODO: Implement actual sign-out
    // Example: await signOutSession();

    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}
