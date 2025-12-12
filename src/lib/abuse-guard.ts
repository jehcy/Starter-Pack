/**
 * Abuse Guard System for Pro Users
 *
 * Tracks and enforces soft limits on Pro users to prevent abuse
 * while maintaining the "unlimited" marketing promise.
 */

import { getPromptUsage } from './prompt-limits';

// Abuse tier thresholds
const ABUSE_TIERS = {
  normal: { max: 100, rateLimit: null },
  warning: { max: 150, rateLimit: null },
  limited: { max: 200, rateLimit: 5 }, // 5 prompts per hour
  flagged: { max: Infinity, rateLimit: 1 }, // 1 prompt per hour, manual review
} as const;

export type AbuseTier = keyof typeof ABUSE_TIERS;

export interface AbuseStatus {
  tier: AbuseTier;
  monthlyUsage: number;
  allowed: boolean;
  rateLimit: number | null;
  message?: string;
}

/**
 * Check abuse status for a Pro user
 */
export async function checkAbuseStatus(userId: string): Promise<AbuseStatus> {
  const usage = await getPromptUsage(userId);
  const monthlyUsage = usage?.promptCount ?? 0;

  // Normal usage (0-100 prompts)
  if (monthlyUsage < ABUSE_TIERS.normal.max) {
    return {
      tier: 'normal',
      monthlyUsage,
      allowed: true,
      rateLimit: null,
    };
  }

  // Warning tier (100-150 prompts)
  if (monthlyUsage < ABUSE_TIERS.warning.max) {
    return {
      tier: 'warning',
      monthlyUsage,
      allowed: true,
      rateLimit: null,
      message: "You're a power user! Keep creating amazing themes.",
    };
  }

  // Limited tier (150-200 prompts)
  if (monthlyUsage < ABUSE_TIERS.limited.max) {
    return {
      tier: 'limited',
      monthlyUsage,
      allowed: true,
      rateLimit: ABUSE_TIERS.limited.rateLimit,
      message: 'Rate limited to 5 generations per hour.',
    };
  }

  // Flagged tier (200+ prompts)
  return {
    tier: 'flagged',
    monthlyUsage,
    allowed: true,
    rateLimit: ABUSE_TIERS.flagged.rateLimit,
    message: 'Account flagged for review. Contact support if needed.',
  };
}

/**
 * Check if user should be rate limited
 * Returns the number of seconds to wait before next request, or 0 if allowed
 */
export async function checkRateLimit(
  userId: string,
  lastRequestTime?: number
): Promise<{
  allowed: boolean;
  retryAfter?: number; // Seconds to wait
  tier: AbuseTier;
}> {
  const status = await checkAbuseStatus(userId);

  // No rate limit
  if (!status.rateLimit) {
    return {
      allowed: true,
      tier: status.tier,
    };
  }

  // Check if enough time has passed since last request
  if (lastRequestTime) {
    const hourInMs = 60 * 60 * 1000;
    const timeSinceLastRequest = Date.now() - lastRequestTime;
    const minTimeBetweenRequests = hourInMs / status.rateLimit;

    if (timeSinceLastRequest < minTimeBetweenRequests) {
      const retryAfter = Math.ceil((minTimeBetweenRequests - timeSinceLastRequest) / 1000);
      return {
        allowed: false,
        retryAfter,
        tier: status.tier,
      };
    }
  }

  return {
    allowed: true,
    tier: status.tier,
  };
}

/**
 * Get friendly message for abuse tier
 */
export function getAbuseTierMessage(tier: AbuseTier, monthlyUsage: number): string {
  switch (tier) {
    case 'normal':
      return `You've used ${monthlyUsage} of your unlimited AI generations this month.`;
    case 'warning':
      return `You're a power user! You've generated ${monthlyUsage} themes this month. Keep creating!`;
    case 'limited':
      return `You've hit ${monthlyUsage} generations this month. Rate limited to 5 per hour to prevent abuse.`;
    case 'flagged':
      return `Your account has been flagged for review (${monthlyUsage} generations). Please contact support if you have questions.`;
  }
}
