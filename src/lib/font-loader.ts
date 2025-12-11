/**
 * Dynamic Google Fonts loading utility
 * Loads fonts on-demand when a theme is applied
 */

import type { FontTokens } from './brand-theme';
import { extractFontName, isGoogleFont, getGoogleFontsUrl } from './fonts';

// Track which fonts have already been loaded to avoid duplicates
const loadedFonts = new Set<string>();

/**
 * Extract all unique font names from FontTokens
 * @param fonts - Font tokens from a theme
 * @returns Array of unique font names
 */
function extractFontNames(fonts: FontTokens): string[] {
  const fontNames: string[] = [];

  // Extract from sans
  const sansFont = extractFontName(fonts.sans);
  if (sansFont) fontNames.push(sansFont);

  // Extract from mono
  const monoFont = extractFontName(fonts.mono);
  if (monoFont) fontNames.push(monoFont);

  // Extract from heading
  const headingFont = extractFontName(fonts.heading);
  if (headingFont) fontNames.push(headingFont);

  // Return unique font names
  return Array.from(new Set(fontNames));
}

/**
 * Dynamically load Google Fonts for a theme
 * Injects a <link> tag into the document head to load fonts from Google Fonts API
 *
 * @param fonts - Font tokens from a theme
 * @returns void
 *
 * @example
 * ```ts
 * loadGoogleFonts({
 *   sans: 'Poppins, system-ui, sans-serif',
 *   mono: 'Fira Code, monospace',
 *   heading: 'Montserrat, system-ui, sans-serif'
 * });
 * ```
 */
export function loadGoogleFonts(fonts: FontTokens): void {
  if (typeof window === 'undefined') return;

  // Extract font names from font-family strings
  const fontNames = extractFontNames(fonts);

  // Filter to only Google Fonts (skip system fonts and already loaded fonts)
  const googleFonts = fontNames.filter((name) => {
    return isGoogleFont(name) && !loadedFonts.has(name);
  });

  // If no new fonts to load, return early
  if (googleFonts.length === 0) return;

  // Generate Google Fonts URL
  const fontsUrl = getGoogleFontsUrl(googleFonts);

  // Create and inject <link> tag
  const link = document.createElement('link');
  link.href = fontsUrl;
  link.rel = 'stylesheet';
  link.crossOrigin = 'anonymous';

  // Optional: Add loading detection
  link.onload = () => {
    // Mark fonts as loaded
    googleFonts.forEach((font) => loadedFonts.add(font));
  };

  link.onerror = () => {
    console.warn(`Failed to load Google Fonts: ${googleFonts.join(', ')}`);
  };

  // Append to head
  document.head.appendChild(link);
}

/**
 * Preload a specific Google Font (useful for performance optimization)
 * @param fontName - Name of the Google Font to preload
 */
export function preloadGoogleFont(fontName: string): void {
  if (typeof window === 'undefined') return;

  if (!isGoogleFont(fontName)) {
    console.warn(`${fontName} is not a supported Google Font`);
    return;
  }

  if (loadedFonts.has(fontName)) {
    return; // Already loaded
  }

  const fontsUrl = getGoogleFontsUrl([fontName]);

  // Create preload link
  const link = document.createElement('link');
  link.href = fontsUrl;
  link.rel = 'preload';
  link.as = 'style';
  link.onload = function () {
    // Convert to stylesheet once preloaded
    (this as HTMLLinkElement).rel = 'stylesheet';
    loadedFonts.add(fontName);
  };

  document.head.appendChild(link);
}

/**
 * Clear the loaded fonts cache
 * Useful for testing or when you want to force reload fonts
 */
export function clearLoadedFontsCache(): void {
  loadedFonts.clear();
}

/**
 * Get list of currently loaded fonts
 * @returns Array of loaded font names
 */
export function getLoadedFonts(): string[] {
  return Array.from(loadedFonts);
}
