import type { InstantRules } from '@instantdb/react';

/**
 * InstantDB Permissions Configuration
 *
 * This file defines who can read and write data in your InstantDB database.
 * Run `npx instant-cli@latest push` to push changes to production.
 */

const rules = {
  // User profiles - users can read/write their own profile
  userProfiles: {
    allow: {
      read: 'true', // Everyone can read profiles (for display purposes)
      create: "auth.id != null && data.userId == auth.id", // Users can create their own profile
      update: "data.userId == auth.id", // Users can only update their own profile
      delete: "data.userId == auth.id", // Users can delete their own profile
    },
  },

  // Projects - users can read/write their own projects
  projects: {
    allow: {
      read: "data.ownerId == auth.id", // Users can only read their own projects
      create: "auth.id != null && data.ownerId == auth.id", // Authenticated users can create projects
      update: "data.ownerId == auth.id", // Users can only update their own projects
      delete: "data.ownerId == auth.id", // Users can only delete their own projects
    },
  },

  // Workspaces - members can access their workspaces
  workspaces: {
    allow: {
      read: 'true', // Allow reading for now (can restrict to members later)
      create: "auth.id != null", // Authenticated users can create workspaces
      update: 'true', // Allow updates for now (can restrict to admins later)
      delete: 'true', // Allow deletes for now (can restrict to owners later)
    },
  },

  // Workspace members
  workspaceMembers: {
    allow: {
      read: 'true', // Allow reading for now
      create: "auth.id != null", // Authenticated users can create memberships
      update: 'true', // Allow updates for now
      delete: 'true', // Allow deletes for now
    },
  },

  // Prompt usage - users can read their own usage
  promptUsages: {
    allow: {
      read: "data.userId == auth.id", // Users can only read their own prompt usage
      create: "auth.id != null && data.userId == auth.id", // System creates usage records
      update: "data.userId == auth.id", // Allow updates for the user's own records
      delete: "data.userId == auth.id", // Users can delete their own records
    },
  },

  // Subscription events - users can read their own events
  subscriptionEvents: {
    allow: {
      read: "data.userId == auth.id", // Users can only read their own subscription events
      create: "auth.id != null && data.userId == auth.id", // System creates events
      update: "data.userId == auth.id", // Allow updates for the user's own events
      delete: "data.userId == auth.id", // Users can delete their own events
    },
  },
} satisfies InstantRules;

export default rules;
