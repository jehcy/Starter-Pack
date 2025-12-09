/**
 * Theme Editor Tour Configuration
 *
 * Manages the tooltip walkthrough for new users visiting the theme editor.
 * Uses driver.js for cross-browser compatible tour experience.
 */

import { type DriveStep } from 'driver.js';

/**
 * Local storage key for persisting tour completion state
 */
export const TOUR_STORAGE_KEY = 'vibecn-theme-editor-tour-completed';

/**
 * Check if tour has been completed
 */
export function hasTourBeenCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Mark tour as completed
 */
export function markTourCompleted(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  } catch {
    console.error('Failed to save tour completion state');
  }
}

/**
 * Reset tour completion state (for replaying)
 */
export function resetTourCompletion(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOUR_STORAGE_KEY);
  } catch {
    console.error('Failed to reset tour completion state');
  }
}

/**
 * Tour steps configuration for driver.js
 */
export const TOUR_STEPS: DriveStep[] = [
  {
    element: '[data-tour="preset-picker"]',
    popover: {
      title: 'Theme Presets',
      description: 'Start here: choose a preset theme or create your own from scratch.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="theme-name-input"]',
    popover: {
      title: 'Theme Name',
      description: 'Name your theme for easy identification when exporting.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="nav-colors"]',
    popover: {
      title: 'Navigation',
      description: 'Click different sections to customize colors, spacing, fonts, and more.',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '[data-tour="light-dark-toggle"]',
    popover: {
      title: 'Color Mode',
      description: 'Edit colors for light and dark modes separately.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: '[data-tour="primary-color"]',
    popover: {
      title: 'Primary Color',
      description: 'Primary color is used for buttons, links, and key highlights throughout your UI.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: '[data-tour="preview-area"]',
    popover: {
      title: 'Live Preview',
      description: 'See your changes live as you edit. The preview updates in real-time.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: '[data-tour="preview-tabs"]',
    popover: {
      title: 'Page Previews',
      description: 'Preview your theme on different page types: home, features, pricing, and dashboard.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="nav-fonts"]',
    popover: {
      title: 'Typography',
      description: 'Customize typography including fonts, sizes, and line heights.',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '[data-tour="nav-buttons"]',
    popover: {
      title: 'Button Styles',
      description: 'Style buttons with custom radius, weight, and hover effects.',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '[data-tour="apply-button"]',
    popover: {
      title: 'Apply Theme',
      description: "Apply your theme to the current project when you're ready.",
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="download-dropdown"]',
    popover: {
      title: 'Export Options',
      description: 'Export your theme in various formats: starter pack, Tailwind config, CSS, and more.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="css-preview-button"]',
    popover: {
      title: 'CSS Preview',
      description: 'View and copy the generated CSS variables for your theme.',
      side: 'bottom',
      align: 'start',
    },
  },
];
