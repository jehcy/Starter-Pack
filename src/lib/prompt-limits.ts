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
export async function recordPromptUsage(userId: string): Promise<void> {
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

  const usage = await getPromptUsage(userId);

  if (usage) {
    // Update existing record
    await adminDb.transact(
      adminDb.tx.promptUsages[usage.id].update({
        promptCount: usage.promptCount + 1,
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
        lastPromptAt: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    );
  }
}

/**
 * Get user subscription status from request
 * Extracts user ID from InstantDB auth and checks their subscription status
 */
export async function getUserSubscriptionStatus(request: Request): Promise<{
  userId: string;
  isPaid: boolean;
  isAdmin: boolean;
}> {
  // Get userId from request body
  // The frontend should send this when making API calls
  const body = await request.clone().json();
  const userId = body.userId;

  if (!userId) {
    throw new Error('User ID not found in request. Please ensure you are signed in.');
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
      console.log('[getUserSubscriptionStatus] Creating default profile for user:', userId);

      const newProfileId = generateId();
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
