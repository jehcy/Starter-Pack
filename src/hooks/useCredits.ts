'use client';

import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';

interface CreditStatus {
  tier: 'free' | 'starter' | 'pro';
  freeCreditsRemaining: number;
  purchasedCredits: number;
  totalCredits: number | 'unlimited';
  isUnlimited: boolean;
  monthlyUsage?: number;
  abuseWarning?: string;
}

interface UseCreditsReturn {
  tier: 'free' | 'starter' | 'pro' | null;
  creditsRemaining: number;
  maxCredits: number;
  creditsUsed: number;
  isUnlimited: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for fetching user's credit status
 *
 * Returns actual credit information from the backend:
 * - Free users: 1 credit total
 * - Starter users: 4 credits (1 free + 3 purchased)
 * - Pro users: Unlimited
 */
export function useCredits(): UseCreditsReturn {
  const { refreshToken, isLoading: profileLoading } = useUserProfile();
  const [creditStatus, setCreditStatus] = useState<CreditStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (!refreshToken) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/credits/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch credit status');
      }

      const data = await response.json();
      setCreditStatus(data);
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError(err instanceof Error ? err.message : 'Failed to load credits');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!profileLoading) {
      fetchCredits();
    }
  }, [refreshToken, profileLoading]);

  // Calculate derived values
  const isUnlimited = creditStatus?.isUnlimited ?? false;
  const totalCredits = creditStatus?.totalCredits ?? 0;
  const maxCredits = isUnlimited
    ? Infinity
    : (typeof totalCredits === 'number' ? totalCredits : 0);

  const creditsRemaining = isUnlimited
    ? Infinity
    : (creditStatus?.freeCreditsRemaining ?? 0) + (creditStatus?.purchasedCredits ?? 0);

  const creditsUsed = isUnlimited
    ? 0
    : Math.max(0, maxCredits - creditsRemaining);

  return {
    tier: creditStatus?.tier ?? null,
    creditsRemaining,
    maxCredits,
    creditsUsed,
    isUnlimited,
    isLoading: profileLoading || isLoading,
    error,
    refetch: fetchCredits,
  };
}
