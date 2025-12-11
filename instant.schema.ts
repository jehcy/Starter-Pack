import { i } from '@instantdb/react';

/**
 * InstantDB Schema Definition
 *
 * This file defines the database schema for the application.
 * Run `npx instant-cli@latest push schema` to push changes to production.
 */

const _schema = i.schema({
  entities: {
    // Projects entity
    projects: i.entity({
      name: i.string(),
      description: i.string().optional(),
      createdAt: i.number(),
      updatedAt: i.number(),
      ownerId: i.string(),
      status: i.string(), // 'active' | 'archived' | 'draft'
    }),

    // Workspaces entity
    workspaces: i.entity({
      name: i.string(),
      slug: i.string().unique(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),

    // Workspace members entity
    workspaceMembers: i.entity({
      workspaceId: i.string(),
      userId: i.string(),
      role: i.string(), // 'owner' | 'admin' | 'member'
      joinedAt: i.number(),
    }),

    // User profiles entity
    userProfiles: i.entity({
      userId: i.string().unique(),
      email: i.string().unique(),
      displayName: i.string().optional(),
      avatarUrl: i.string().optional(),
      userType: i.string(), // 'free' | 'paid' | 'admin'
      createdAt: i.number(),
      updatedAt: i.number(),

      // Subscription fields
      paypalSubscriptionId: i.string().optional(),
      subscriptionStatus: i.string().optional(), // 'none' | 'active' | 'pending' | 'cancelled' | 'expired' | 'suspended'
      subscribedAt: i.number().optional(),
      currentPeriodStart: i.number().optional(),
      currentPeriodEnd: i.number().optional(),
      cancelledAt: i.number().optional(),
      cancelAtPeriodEnd: i.boolean().optional(),
    }),

    // Prompt usage tracking entity
    promptUsage: i.entity({
      userId: i.string().indexed(),
      periodStart: i.number().indexed(),
      periodEnd: i.number(),
      promptCount: i.number(),
      lastPromptAt: i.number(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),

    // Subscription events entity
    subscriptionEvents: i.entity({
      userId: i.string().indexed(),
      eventType: i.string(), // 'created' | 'activated' | 'cancelled' | 'renewed' | 'payment_failed' | 'expired'
      paypalSubscriptionId: i.string(),
      metadata: i.json(), // Event details
      createdAt: i.number().indexed(),
    }),
  },

  links: {
    // Project ownership relationship
    projectOwner: {
      forward: {
        on: 'projects',
        has: 'one',
        label: 'owner',
      },
      reverse: {
        on: 'userProfiles',
        has: 'many',
        label: 'ownedProjects',
      },
    },

    // Workspace membership relationship
    workspaceMembership: {
      forward: {
        on: 'workspaceMembers',
        has: 'one',
        label: 'workspace',
      },
      reverse: {
        on: 'workspaces',
        has: 'many',
        label: 'members',
      },
    },

    // Workspace member user relationship
    memberUser: {
      forward: {
        on: 'workspaceMembers',
        has: 'one',
        label: 'user',
      },
      reverse: {
        on: 'userProfiles',
        has: 'many',
        label: 'workspaceMemberships',
      },
    },

    // Prompt usage to user relationship
    promptUsageUser: {
      forward: {
        on: 'promptUsage',
        has: 'one',
        label: 'user',
      },
      reverse: {
        on: 'userProfiles',
        has: 'many',
        label: 'promptUsageRecords',
      },
    },

    // Subscription event to user relationship
    subscriptionEventUser: {
      forward: {
        on: 'subscriptionEvents',
        has: 'one',
        label: 'user',
      },
      reverse: {
        on: 'userProfiles',
        has: 'many',
        label: 'subscriptionEvents',
      },
    },
  },
});

export default _schema;

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
export interface AppSchema extends _AppSchema {}
