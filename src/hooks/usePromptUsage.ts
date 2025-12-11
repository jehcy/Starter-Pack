'use client';

import { useMemo } from 'react';
import { db, tx, id } from '@/lib/instantdb';
import { useUserProfile } from './useUserProfile';
import type { PromptUsage } from '@/lib/instantdb';

interface UsePromptUsageReturn {
  promptsUsed: number;
  promptsRemaining: number;
  maxPrompts: number;
  isUnlimited: boolean;
  canUsePrompt: boolean;
  recordPromptUsage: () => Promise<void>;
  isLoading: boolean;
  currentPeriod: { start: number; end: number } | null;
}

/**
 * Hook for tracking and managing prompt usage
 *
 * Free users: 3 prompts per month
 * Paid users: Unlimited prompts
 */
export function usePromptUsage(): UsePromptUsageReturn {
  const { user, isPaid, isAdmin, isLoading: profileLoading } = useUserProfile();

  // Calculate current billing period (calendar month)
  const currentPeriod = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
    return { start, end };
  }, []);

  // Query current period's usage
  const { data, isLoading: usageLoading } = db.useQuery(
    user
      ? {
          promptUsages: {
            $: {
              where: {
                userId: user.id,
                periodStart: currentPeriod.start,
              },
            },
          },
        }
      : null
  );

  const usage = (data?.promptUsages?.[0] as PromptUsage | undefined) ?? null;
  const promptsUsed = usage?.promptCount ?? 0;
  const isUnlimited = isPaid || isAdmin;
  const maxPrompts = isUnlimited ? Infinity : 3;
  const promptsRemaining = isUnlimited ? Infinity : Math.max(0, maxPrompts - promptsUsed);
  const canUsePrompt = isUnlimited || promptsRemaining > 0;

  /**
   * Record a prompt usage
   * Should be called after a successful AI theme generation
   */
  const recordPromptUsage = async () => {
    if (!user) throw new Error('User not authenticated');

    if (usage) {
      // Update existing record
      await db.transact(
        tx.promptUsages[usage.id].update({
          promptCount: usage.promptCount + 1,
          lastPromptAt: Date.now(),
          updatedAt: Date.now(),
        })
      );
    } else {
      // Create new record for this period
      const newId = id();
      await db.transact(
        tx.promptUsages[newId].update({
          userId: user.id,
          periodStart: currentPeriod.start,
          periodEnd: currentPeriod.end,
          promptCount: 1,
          lastPromptAt: Date.now(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      );
    }
  };

  return {
    promptsUsed,
    promptsRemaining,
    maxPrompts,
    isUnlimited,
    canUsePrompt,
    recordPromptUsage,
    isLoading: profileLoading || usageLoading,
    currentPeriod,
  };
}
