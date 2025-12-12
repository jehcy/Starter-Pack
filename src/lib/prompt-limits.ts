/**
 * Prompt Usage Tracking Utilities (Server-side)
 *
 * These utilities are used in API routes to track and enforce prompt limits.
 */

import { init, id as generateId } from '@instantdb/admin';
import type { PromptUsage } from './instantdb';

// Initialize admin client for server-side operations
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

/**
 * Get the current month's prompt usage for a user
 */
export async function getPromptUsage(userId: string): Promise<PromptUsage | null> {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const { promptUsages } = await adminDb.query({
    promptUsages: {
      $: {
        where: {
          userId,
          periodStart,
        },
      },
    },
  });

  return (promptUsages?.[0] as PromptUsage | undefined) ?? null;
}

/**
 * Record a prompt usage for a user
 * Creates a new record if one doesn't exist for the current month
 */
export async function recordPromptUsage(
  userId: string,
  inputTokens: number = 0,
  outputTokens: number = 0
): Promise<void> {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

  const usage = await getPromptUsage(userId);

  if (usage) {
    // Update existing record
    await adminDb.transact(
      adminDb.tx.promptUsages[usage.id].update({
        promptCount: usage.promptCount + 1,
        inputTokens: (usage.inputTokens ?? 0) + inputTokens,
        outputTokens: (usage.outputTokens ?? 0) + outputTokens,
        lastPromptAt: Date.now(),
        updatedAt: Date.now(),
      })
    );
  } else {
    // Create new record for this period
    const newId = generateId();
    await adminDb.transact(
      adminDb.tx.promptUsages[newId].update({
        userId,
        periodStart,
        periodEnd,
        promptCount: 1,
        inputTokens,
        outputTokens,
        lastPromptAt: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    );
  }
}

/**
 * Get user subscription status
 * Checks the user's subscription status from their profile
 */
export async function getUserSubscriptionStatus(userId: string | undefined): Promise<{
  userId: string;
  isPaid: boolean;
  isAdmin: boolean;
}> {
  if (!userId) {
    throw new Error('User ID not found. Please ensure you are signed in.');
  }

  try {
    // Query user profile
    const { userProfiles } = await adminDb.query({
      userProfiles: {
        $: {
          where: {
            userId,
          },
        },
      },
    });

    const profile = userProfiles?.[0];

    // If no profile exists, create a default free user profile
    if (!profile) {
      console.warn('[getUserSubscriptionStatus] Creating default profile for user:', userId);

      const newProfileId = generateId();
      try {
        await adminDb.transact(
          adminDb.tx.userProfiles[newProfileId].update({
            userId,
            email: '', // Will be updated when user provides email
            userType: 'free',
            subscriptionStatus: 'none',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
        );
      } catch (createError) {
        // Handle duplicate key error - profile might have been created by another request
        if (createError instanceof Error && createError.message?.includes('already exists')) {
          console.warn('[getUserSubscriptionStatus] Profile already exists for user:', userId);
          // Re-query to get the existing profile
          const { userProfiles: existingProfiles } = await adminDb.query({
            userProfiles: {
              $: {
                where: {
                  userId,
                },
              },
            },
          });

          const existingProfile = existingProfiles?.[0];
          if (existingProfile) {
            return {
              userId,
              isPaid: existingProfile.userType === 'paid' || existingProfile.userType === 'admin',
              isAdmin: existingProfile.userType === 'admin',
            };
          }
        }
        // If it's another error, rethrow it
        throw createError;
      }

      return {
        userId,
        isPaid: false,
        isAdmin: false,
      };
    }

    return {
      userId,
      isPaid: profile.userType === 'paid' || profile.userType === 'admin',
      isAdmin: profile.userType === 'admin',
    };
  } catch (error) {
    console.error('[getUserSubscriptionStatus] Error:', error);
    // If there's an error querying the profile, assume free user
    return {
      userId,
      isPaid: false,
      isAdmin: false,
    };
  }
}

/**
 * Get system-wide usage statistics for the current month
 */
export async function getSystemWideUsage(): Promise<{
  totalPrompts: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  uniqueUsers: number;
}> {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const { promptUsages } = await adminDb.query({
    promptUsages: {
      $: {
        where: {
          periodStart,
        },
      },
    },
  });

  const allUsages = (promptUsages || []) as PromptUsage[];

  return {
    totalPrompts: allUsages.reduce((sum, u) => sum + u.promptCount, 0),
    totalInputTokens: allUsages.reduce((sum, u) => sum + (u.inputTokens ?? 0), 0),
    totalOutputTokens: allUsages.reduce((sum, u) => sum + (u.outputTokens ?? 0), 0),
    uniqueUsers: new Set(allUsages.map((u) => u.userId)).size,
  };
}

/**
 * Get top users by prompt count for current month
 */
export async function getTopUsersByUsage(limit: number = 10): Promise<
  Array<{
    userId: string;
    promptCount: number;
    inputTokens: number;
    outputTokens: number;
  }>
> {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const { promptUsages } = await adminDb.query({
    promptUsages: {
      $: {
        where: {
          periodStart,
        },
      },
    },
  });

  const allUsages = (promptUsages || []) as PromptUsage[];

  // Aggregate usage by userId to handle potential duplicates
  const userUsageMap = new Map<string, {
    userId: string;
    promptCount: number;
    inputTokens: number;
    outputTokens: number;
  }>();

  allUsages.forEach((usage) => {
    const existing = userUsageMap.get(usage.userId);
    if (existing) {
      // Aggregate if duplicate userId found
      existing.promptCount += usage.promptCount;
      existing.inputTokens += usage.inputTokens ?? 0;
      existing.outputTokens += usage.outputTokens ?? 0;
    } else {
      userUsageMap.set(usage.userId, {
        userId: usage.userId,
        promptCount: usage.promptCount,
        inputTokens: usage.inputTokens ?? 0,
        outputTokens: usage.outputTokens ?? 0,
      });
    }
  });

  // Convert to array, sort by promptCount descending, and take top N
  return Array.from(userUsageMap.values())
    .sort((a, b) => b.promptCount - a.promptCount)
    .slice(0, limit);
}
