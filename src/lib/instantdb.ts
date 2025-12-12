import { init, id } from '@instantdb/react';

/**
 * InstantDB Entity Types
 *
 * Define your database entity types here.
 * These types provide type hints when working with data.
 */
export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: number;
  updatedAt: number;
  ownerId: string;
  status: 'active' | 'archived' | 'draft';
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  createdAt: number;
  updatedAt: number;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: number;
}

export type UserType = 'free' | 'paid' | 'admin';

export type SubscriptionStatus =
  | 'none'       // Never subscribed
  | 'active'     // Currently subscribed and paid
  | 'pending'    // Subscription created but payment pending
  | 'cancelled'  // User cancelled, still has access until period end
  | 'expired'    // Subscription ended
  | 'suspended'; // Payment failed

/**
 * Admin email addresses
 * Users with these emails will automatically receive admin privileges
 */
export const ADMIN_EMAILS = ['jehcy.adorna@gmail.com'];

export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  userType: UserType;
  createdAt: number;
  updatedAt: number;

  // Subscription fields
  paypalSubscriptionId: string | null;
  subscriptionStatus: SubscriptionStatus | null;
  subscribedAt: number | null;
  currentPeriodStart: number | null;
  currentPeriodEnd: number | null;
  cancelledAt: number | null;
  cancelAtPeriodEnd: boolean | null;
}

export interface PromptUsage {
  id: string;
  userId: string;
  periodStart: number;      // Unix timestamp for billing period start (month start)
  periodEnd: number;        // Unix timestamp for billing period end (month end)
  promptCount: number;      // Number of prompts used in this period
  inputTokens: number | null;      // Total input tokens for this period
  outputTokens: number | null;     // Total output tokens for this period
  lastPromptAt: number;     // Timestamp of last prompt
  createdAt: number;
  updatedAt: number;
}

export interface SubscriptionEvent {
  id: string;
  userId: string;
  eventType: 'created' | 'activated' | 'cancelled' | 'renewed' | 'payment_failed' | 'expired';
  paypalSubscriptionId: string;
  metadata: string;  // JSON string with event details
  createdAt: number;
}

/**
 * Initialize InstantDB client
 *
 * The APP_ID is read from environment variables.
 * Set NEXT_PUBLIC_INSTANTDB_APP_ID in your .env.local file.
 */
const APP_ID = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID;

if (!APP_ID && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn(
    '[InstantDB] NEXT_PUBLIC_INSTANTDB_APP_ID is not set. ' +
      'Database operations will not work until this is configured.'
  );
}

/**
 * InstantDB client instance
 *
 * Use this to interact with your InstantDB database.
 * Note: Full type safety requires defining a schema in your InstantDB dashboard.
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { db } from '@/lib/instantdb';
 *
 * export function ProjectList() {
 *   const { isLoading, error, data } = db.useQuery({
 *     projects: {}
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <ul>
 *       {data.projects.map((project) => (
 *         <li key={project.id}>{project.name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export const db = init({
  appId: APP_ID ?? 'placeholder-app-id',
});

/**
 * Transaction helper for database operations
 *
 * @example
 * ```tsx
 * import { db, tx, id } from '@/lib/instantdb';
 *
 * // Create a new project
 * const projectId = id();
 * db.transact(
 *   tx.projects[projectId].update({
 *     name: 'My Project',
 *     description: 'A new project',
 *     status: 'draft',
 *     createdAt: Date.now(),
 *     updatedAt: Date.now(),
 *     ownerId: userId,
 *   })
 * );
 * ```
 */
export const tx = db.tx;

/**
 * Generate a new ID for entities
 */
export { id };
