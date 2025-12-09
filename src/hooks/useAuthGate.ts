'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthGateModal } from '@/components/auth/auth-gate-modal';

interface UseAuthGateReturn {
  /**
   * Wraps an action with authentication check.
   * If user is not authenticated, shows auth gate modal instead of executing the action.
   */
  requireAuth: <T extends (...args: never[]) => void | Promise<void>>(
    action: T,
    featureName?: string
  ) => (...args: Parameters<T>) => void;

  /**
   * The modal component to render in your component tree
   */
  AuthGateModalComponent: React.ReactNode;

  /**
   * Direct access to authentication state
   */
  isAuthenticated: boolean;

  /**
   * Loading state from auth check
   */
  isLoading: boolean;
}

/**
 * Hook for gating actions behind authentication.
 * Shows a modal explaining benefits before redirecting to sign-in.
 *
 * @example
 * ```tsx
 * function DownloadButton() {
 *   const { requireAuth, AuthGateModalComponent } = useAuthGate();
 *
 *   const handleDownload = requireAuth(() => {
 *     // Download logic here
 *   }, 'download themes');
 *
 *   return (
 *     <>
 *       {AuthGateModalComponent}
 *       <button onClick={handleDownload}>Download</button>
 *     </>
 *   );
 * }
 * ```
 */
export function useAuthGate(): UseAuthGateReturn {
  const { isAuthenticated, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFeatureName, setCurrentFeatureName] = useState<string>('access this feature');

  const requireAuth = useCallback(
    <T extends (...args: never[]) => void | Promise<void>>(
      action: T,
      featureName?: string
    ): ((...args: Parameters<T>) => void) => {
      return (...args: Parameters<T>) => {
        // If user is authenticated, execute the action
        if (isAuthenticated) {
          action(...args);
          return;
        }

        // If still loading, don't show modal yet
        if (isLoading) {
          return;
        }

        // Show auth gate modal
        setCurrentFeatureName(featureName || 'access this feature');
        setIsModalOpen(true);
      };
    },
    [isAuthenticated, isLoading]
  );

  const AuthGateModalComponent = useMemo(
    () =>
      React.createElement(AuthGateModal, {
        open: isModalOpen,
        onOpenChange: setIsModalOpen,
        featureName: currentFeatureName,
      }),
    [isModalOpen, currentFeatureName]
  );

  return {
    requireAuth,
    AuthGateModalComponent,
    isAuthenticated,
    isLoading,
  };
}
