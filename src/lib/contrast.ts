/**
 * Contrast Utilities for WCAG AA/AAA Compliance
 *
 * This module provides utilities for calculating and validating color contrast ratios
 * according to WCAG (Web Content Accessibility Guidelines) standards.
 *
 * WCAG Contrast Requirements:
 * - AAA: 7:1 or higher (enhanced accessibility)
 * - AA: 4.5:1 or higher (standard accessibility for normal text)
 * - AA-Large: 3:1 or higher (for large text 18pt+ or 14pt+ bold)
 * - Fail: Below 3:1
 */

import type { ColorTokens } from './brand-theme';

// WCAG Contrast Ratio Standards
export const WCAG_AAA_RATIO = 7;
export const WCAG_AA_RATIO = 4.5;
export const WCAG_AA_LARGE_RATIO = 3;

// Color pairs that should be checked for contrast
export const CONTRAST_PAIRS: Array<{
  bg: keyof ColorTokens;
  fg: keyof ColorTokens;
  label: string;
}> = [
  { bg: 'background', fg: 'foreground', label: 'Base' },
  { bg: 'primary', fg: 'primaryForeground', label: 'Primary' },
  { bg: 'secondary', fg: 'secondaryForeground', label: 'Secondary' },
  { bg: 'accent', fg: 'accentForeground', label: 'Accent' },
  { bg: 'muted', fg: 'mutedForeground', label: 'Muted' },
  { bg: 'destructive', fg: 'destructiveForeground', label: 'Destructive' },
  { bg: 'card', fg: 'cardForeground', label: 'Card' },
  { bg: 'popover', fg: 'popoverForeground', label: 'Popover' },
];

/**
 * Convert hex color to RGB
 * @param hex - Hex color string (#RRGGBB or #RGB)
 * @returns RGB object with r, g, b values (0-255)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');

  // Handle 3-digit hex
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }

  // Handle 6-digit hex
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Convert RGB to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string (#RRGGBB)
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculate relative luminance according to WCAG formula
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Relative luminance (0-1)
 */
export function getLuminance(r: number, g: number, b: number): number {
  // Convert to 0-1 range
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    // Apply sRGB gamma correction
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance using WCAG formula
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param hex1 - First color in hex format
 * @param hex2 - Second color in hex format
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  // Lighter color should be in numerator
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  // WCAG contrast ratio formula
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get WCAG compliance level for a contrast ratio
 * @param ratio - Contrast ratio (1-21)
 * @returns WCAG level: 'AAA', 'AA', 'AA-Large', or 'Fail'
 */
export function getContrastLevel(
  ratio: number
): 'AAA' | 'AA' | 'AA-Large' | 'Fail' {
  if (ratio >= WCAG_AAA_RATIO) return 'AAA';
  if (ratio >= WCAG_AA_RATIO) return 'AA';
  if (ratio >= WCAG_AA_LARGE_RATIO) return 'AA-Large';
  return 'Fail';
}

/**
 * Suggest whether to use black or white text on a background
 * @param backgroundHex - Background color in hex format
 * @returns '#000000' for black or '#ffffff' for white
 */
export function suggestForegroundColor(backgroundHex: string): string {
  const { r, g, b } = hexToRgb(backgroundHex);
  const luminance = getLuminance(r, g, b);

  // If background is dark (low luminance), use white text
  // If background is light (high luminance), use black text
  // Threshold at 0.5 is common
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Adjust a foreground color to meet target contrast ratio against background
 * @param foregroundHex - Foreground color in hex format
 * @param backgroundHex - Background color in hex format
 * @param targetRatio - Target contrast ratio (default: WCAG_AA_RATIO = 4.5)
 * @returns Adjusted foreground color in hex format
 */
export function adjustForContrast(
  foregroundHex: string,
  backgroundHex: string,
  targetRatio: number = WCAG_AA_RATIO
): string {
  // Get current contrast ratio
  const currentRatio = getContrastRatio(foregroundHex, backgroundHex);

  // If already meets target, return as is
  if (currentRatio >= targetRatio) {
    return foregroundHex;
  }

  const bgRgb = hexToRgb(backgroundHex);
  const fgRgb = hexToRgb(foregroundHex);
  const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  // Determine if we need to lighten or darken the foreground
  const shouldLighten = bgLuminance < 0.5;

  // Binary search for the right adjustment
  let low = 0;
  let high = 100;
  let bestColor = foregroundHex;
  let bestRatio = currentRatio;

  // Try up to 20 iterations to find good contrast
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const factor = shouldLighten ? mid / 100 : 1 - mid / 100;

    // Adjust RGB values toward white (lighten) or black (darken)
    const adjustedR = shouldLighten
      ? fgRgb.r + (255 - fgRgb.r) * factor
      : fgRgb.r * factor;
    const adjustedG = shouldLighten
      ? fgRgb.g + (255 - fgRgb.g) * factor
      : fgRgb.g * factor;
    const adjustedB = shouldLighten
      ? fgRgb.b + (255 - fgRgb.b) * factor
      : fgRgb.b * factor;

    const adjustedHex = rgbToHex(adjustedR, adjustedG, adjustedB);
    const ratio = getContrastRatio(adjustedHex, backgroundHex);

    if (ratio >= targetRatio) {
      bestColor = adjustedHex;
      bestRatio = ratio;
      high = mid;
    } else {
      low = mid;
    }

    // Close enough to target
    if (Math.abs(ratio - targetRatio) < 0.1) {
      break;
    }
  }

  // If we still couldn't meet target, use pure black or white
  if (bestRatio < targetRatio) {
    return suggestForegroundColor(backgroundHex);
  }

  return bestColor;
}

/**
 * Get a human-readable description of a contrast level
 * @param level - WCAG level: 'AAA', 'AA', 'AA-Large', or 'Fail'
 * @returns Description string
 */
export function getContrastLevelDescription(
  level: 'AAA' | 'AA' | 'AA-Large' | 'Fail'
): string {
  switch (level) {
    case 'AAA':
      return 'Enhanced accessibility (7:1+)';
    case 'AA':
      return 'Standard accessibility (4.5:1+)';
    case 'AA-Large':
      return 'Large text only (3:1+)';
    case 'Fail':
      return 'Insufficient contrast (<3:1)';
  }
}

/**
 * Get badge color for a contrast level
 * @param level - WCAG level: 'AAA', 'AA', 'AA-Large', or 'Fail'
 * @returns Tailwind color class
 */
export function getContrastBadgeColor(
  level: 'AAA' | 'AA' | 'AA-Large' | 'Fail'
): string {
  switch (level) {
    case 'AAA':
      return 'bg-green-500 text-white';
    case 'AA':
      return 'bg-blue-500 text-white';
    case 'AA-Large':
      return 'bg-yellow-500 text-black';
    case 'Fail':
      return 'bg-red-500 text-white';
  }
}
