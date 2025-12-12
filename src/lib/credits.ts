/**
 * Credits Management System (Server-side)
 *
 * Handles credit tracking for Free and Starter tiers.
 * Pro users have unlimited generation (tracked via PromptUsage for abuse guard).
 */

import { init, id as generateId } from '@instantdb/admin';
import type { UserCredits, CreditTransaction } from './instantdb';
import { getUserSubscriptionStatus, getPromptUsage } from './prompt-limits';

// Initialize admin client for server-side operations
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

/**
 * Get user's credit information
 */
async function getUserCreditsRecord(userId: string): Promise<UserCredits | null> {
  const { userCredits } = await adminDb.query({
    userCredits: {
      $: {
        where: {
          userId,
        },
      },
    },
  });

  return (userCredits?.[0] as UserCredits | undefined) ?? null;
}

/**
 * Initialize credits record for new user
 */
async function initializeUserCredits(userId: string): Promise<UserCredits> {
  const newId = generateId();
  const newCredits: Omit<UserCredits, 'id'> = {
    userId,
    freeCreditsUsed: false,
    purchasedCredits: 0,
    totalPurchasedCredits: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await adminDb.transact(adminDb.tx.userCredits[newId].update(newCredits));

  return {
    id: newId,
    ...newCredits,
  };
}

/**
 * Get user's credit status
 */
export async function getUserCredits(userId: string): Promise<{
  tier: 'free' | 'starter' | 'pro';
  freeCreditsRemaining: number;
  purchasedCredits: number;
  totalPurchasedCredits: number;
  isUnlimited: boolean;
  monthlyUsage?: number;
  abuseWarning?: string;
}> {
  // Check subscription status
  const { isPaid } = await getUserSubscriptionStatus(userId);

  // Pro users have unlimited access
  if (isPaid) {
    const usage = await getPromptUsage(userId);
    const monthlyUsage = usage?.promptCount ?? 0;

    let abuseWarning: string | undefined;
    if (monthlyUsage >= 100 && monthlyUsage < 150) {
      abuseWarning = "You're a power user! Keep creating amazing themes.";
    } else if (monthlyUsage >= 150) {
      abuseWarning = 'Rate limited to 5 generations per hour.';
    }

    return {
      tier: 'pro',
      freeCreditsRemaining: 0,
      purchasedCredits: 0,
      totalPurchasedCredits: 0,
      isUnlimited: true,
      monthlyUsage,
      abuseWarning,
    };
  }

  // Get or create credits record for free/starter users
  let creditsRecord = await getUserCreditsRecord(userId);
  if (!creditsRecord) {
    creditsRecord = await initializeUserCredits(userId);
  }

  const freeCreditsRemaining = creditsRecord.freeCreditsUsed ? 0 : 1;
  const totalCredits = freeCreditsRemaining + creditsRecord.purchasedCredits;

  return {
    tier: totalCredits > 1 ? 'starter' : 'free',
    freeCreditsRemaining,
    purchasedCredits: creditsRecord.purchasedCredits,
    totalPurchasedCredits: creditsRecord.totalPurchasedCredits ?? 0,
    isUnlimited: false,
  };
}

/**
 * Use a credit for theme generation
 */
export async function useCredit(userId: string): Promise<{
  success: boolean;
  creditsRemaining: number | 'unlimited';
  warning?: string;
  error?: string;
}> {
  // Check if pro user
  const { isPaid } = await getUserSubscriptionStatus(userId);

  if (isPaid) {
    // Pro users always succeed
    return {
      success: true,
      creditsRemaining: 'unlimited',
    };
  }

  // Get credits record
  let creditsRecord = await getUserCreditsRecord(userId);
  if (!creditsRecord) {
    creditsRecord = await initializeUserCredits(userId);
  }

  // Check if has credits
  const freeAvailable = !creditsRecord.freeCreditsUsed;
  const purchasedAvailable = creditsRecord.purchasedCredits > 0;

  if (!freeAvailable && !purchasedAvailable) {
    return {
      success: false,
      creditsRemaining: 0,
      error: 'No credits remaining',
    };
  }

  // Deduct credit (priority: free first, then purchased)
  if (freeAvailable) {
    // Use free credit
    await adminDb.transact(
      adminDb.tx.userCredits[creditsRecord.id].update({
        freeCreditsUsed: true,
        updatedAt: Date.now(),
      })
    );

    // Record transaction
    await recordCreditTransaction(userId, 'usage', -1, 'Used free credit');

    const remaining = creditsRecord.purchasedCredits;
    return {
      success: true,
      creditsRemaining: remaining,
    };
  } else {
    // Use purchased credit
    await adminDb.transact(
      adminDb.tx.userCredits[creditsRecord.id].update({
        purchasedCredits: creditsRecord.purchasedCredits - 1,
        updatedAt: Date.now(),
      })
    );

    // Record transaction
    await recordCreditTransaction(userId, 'usage', -1, 'Used purchased credit');

    const remaining = creditsRecord.purchasedCredits - 1;
    return {
      success: true,
      creditsRemaining: remaining,
    };
  }
}

/**
 * Add purchased credits to user's account
 */
export async function addPurchasedCredits(userId: string, amount: number): Promise<void> {
  let creditsRecord = await getUserCreditsRecord(userId);
  if (!creditsRecord) {
    creditsRecord = await initializeUserCredits(userId);
  }

  const newTotalPurchased = (creditsRecord.totalPurchasedCredits ?? 0) + amount;

  await adminDb.transact(
    adminDb.tx.userCredits[creditsRecord.id].update({
      purchasedCredits: creditsRecord.purchasedCredits + amount,
      totalPurchasedCredits: newTotalPurchased,
      updatedAt: Date.now(),
    })
  );

  // Record transaction
  await recordCreditTransaction(userId, 'purchase', amount, `Purchased ${amount} credits`);
}

/**
 * Check if user can generate a theme
 */
export async function canGenerate(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
  creditsRemaining: number | 'unlimited';
  rateLimit?: number;
}> {
  // Check subscription status
  const { isPaid } = await getUserSubscriptionStatus(userId);

  // Pro users: check abuse guard
  if (isPaid) {
    const usage = await getPromptUsage(userId);
    const monthlyUsage = usage?.promptCount ?? 0;

    if (monthlyUsage >= 200) {
      return {
        allowed: true, // Still allow, but rate limited
        creditsRemaining: 'unlimited',
        rateLimit: 1,
        reason: 'Account flagged for review. Contact support if needed.',
      };
    }

    if (monthlyUsage >= 150) {
      return {
        allowed: true,
        creditsRemaining: 'unlimited',
        rateLimit: 5,
        reason: 'Rate limited to 5 generations per hour.',
      };
    }

    return {
      allowed: true,
      creditsRemaining: 'unlimited',
    };
  }

  // Free/Starter users: check credits
  const creditsStatus = await getUserCredits(userId);
  const totalCredits = creditsStatus.freeCreditsRemaining + creditsStatus.purchasedCredits;

  if (totalCredits === 0) {
    return {
      allowed: false,
      creditsRemaining: 0,
      reason: 'No credits remaining. Upgrade to Pro for unlimited AI theme generation.',
    };
  }

  return {
    allowed: true,
    creditsRemaining: totalCredits,
  };
}

/**
 * Record a credit transaction
 */
async function recordCreditTransaction(
  userId: string,
  type: 'free' | 'purchase' | 'usage',
  amount: number,
  description: string
): Promise<void> {
  const transactionId = generateId();
  await adminDb.transact(
    adminDb.tx.creditTransactions[transactionId].update({
      userId,
      type,
      amount,
      description,
      createdAt: Date.now(),
    })
  );
}

/**
 * Get credit transaction history
 */
export async function getCreditTransactions(userId: string, limit: number = 50): Promise<CreditTransaction[]> {
  const { creditTransactions } = await adminDb.query({
    creditTransactions: {
      $: {
        where: {
          userId,
        },
      },
    },
  });

  const transactions = (creditTransactions || []) as CreditTransaction[];

  // Sort by createdAt descending and limit
  return transactions.sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
}
