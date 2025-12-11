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
  // Note: This is a simplified implementation
  // You'll need to properly extract the user ID from the InstantDB session cookie
  // For now, we'll extract it from the request body or headers

  const cookies = request.headers.get('cookie') || '';

  // Extract InstantDB user token (this is a simplified example)
  // In production, you'd need to verify the JWT token properly
  const instantdbMatch = cookies.match(/instantdb-([^;]+)/);

  if (!instantdbMatch) {
    throw new Error('Not authenticated');
  }

  // For this implementation, we'll require the userId to be passed in the request body
  // In production, you'd decode the InstantDB JWT token to get the user ID
  const body = await request.clone().json();
  const userId = body.userId;

  if (!userId) {
    throw new Error('User ID not found');
  }

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

  return {
    userId,
    isPaid: profile?.userType === 'paid' || profile?.userType === 'admin',
    isAdmin: profile?.userType === 'admin',
  };
}
