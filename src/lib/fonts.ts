/**
 * Font configuration and utilities for dynamic Google Fonts loading
 */

export interface FontOption {
  name: string;
  googleName: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  style?: string;
}

/**
 * Available Google Fonts organized by category
 */
export const AVAILABLE_FONTS = {
  sans: [
    { name: 'Inter', googleName: 'Inter', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Roboto', googleName: 'Roboto', category: 'sans-serif' as const, style: 'neo-grotesque' },
    { name: 'Poppins', googleName: 'Poppins', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Open Sans', googleName: 'Open+Sans', category: 'sans-serif' as const, style: 'humanist' },
    { name: 'Lato', googleName: 'Lato', category: 'sans-serif' as const, style: 'humanist' },
    { name: 'Montserrat', googleName: 'Montserrat', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Nunito', googleName: 'Nunito', category: 'sans-serif' as const, style: 'rounded' },
    { name: 'Raleway', googleName: 'Raleway', category: 'sans-serif' as const, style: 'elegant' },
    { name: 'Sora', googleName: 'Sora', category: 'sans-serif' as const, style: 'modern' },
    { name: 'Space Grotesk', googleName: 'Space+Grotesk', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'DM Sans', googleName: 'DM+Sans', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Plus Jakarta Sans', googleName: 'Plus+Jakarta+Sans', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Outfit', googleName: 'Outfit', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Manrope', googleName: 'Manrope', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Work Sans', googleName: 'Work+Sans', category: 'sans-serif' as const, style: 'grotesque' },
    { name: 'Figtree', googleName: 'Figtree', category: 'sans-serif' as const, style: 'humanist' },
    { name: 'Geist', googleName: 'Geist', category: 'sans-serif' as const, style: 'geometric' },
  ],

  mono: [
    { name: 'JetBrains Mono', googleName: 'JetBrains+Mono', category: 'monospace' as const },
    { name: 'Fira Code', googleName: 'Fira+Code', category: 'monospace' as const },
    { name: 'Source Code Pro', googleName: 'Source+Code+Pro', category: 'monospace' as const },
    { name: 'IBM Plex Mono', googleName: 'IBM+Plex+Mono', category: 'monospace' as const },
    { name: 'Roboto Mono', googleName: 'Roboto+Mono', category: 'monospace' as const },
    { name: 'Ubuntu Mono', googleName: 'Ubuntu+Mono', category: 'monospace' as const },
    { name: 'Space Mono', googleName: 'Space+Mono', category: 'monospace' as const },
    { name: 'Geist Mono', googleName: 'Geist+Mono', category: 'monospace' as const },
  ],

  heading: [
    { name: 'Inter', googleName: 'Inter', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Playfair Display', googleName: 'Playfair+Display', category: 'serif' as const, style: 'elegant' },
    { name: 'Merriweather', googleName: 'Merriweather', category: 'serif' as const, style: 'readable' },
    { name: 'Lora', googleName: 'Lora', category: 'serif' as const, style: 'elegant' },
    { name: 'Poppins', googleName: 'Poppins', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Montserrat', googleName: 'Montserrat', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Sora', googleName: 'Sora', category: 'sans-serif' as const, style: 'modern' },
    { name: 'Space Grotesk', googleName: 'Space+Grotesk', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'DM Sans', googleName: 'DM+Sans', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Outfit', googleName: 'Outfit', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Manrope', googleName: 'Manrope', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Plus Jakarta Sans', googleName: 'Plus+Jakarta+Sans', category: 'sans-serif' as const, style: 'geometric' },
    { name: 'Bricolage Grotesque', googleName: 'Bricolage+Grotesque', category: 'display' as const, style: 'quirky' },
    { name: 'Cabinet Grotesk', googleName: 'Cabinet+Grotesk', category: 'sans-serif' as const, style: 'geometric' },
  ],
};

/**
 * Mapping of common paid fonts to their free Google Font alternatives
 * Used when scraping websites that use proprietary fonts
 */
export const PAID_FONT_ALTERNATIVES: Record<string, string> = {
  // Apple System Fonts
  'SF Pro': 'Inter',
  'SF Pro Display': 'Inter',
  'SF Pro Text': 'Inter',
  'San Francisco': 'Inter',
  '-apple-system': 'Inter',
  'BlinkMacSystemFont': 'Inter',

  // Classic Fonts
  'Helvetica': 'Inter',
  'Helvetica Neue': 'Inter',
  'Arial': 'Roboto',
  'Verdana': 'Open Sans',
  'Tahoma': 'Open Sans',
  'Trebuchet MS': 'Open Sans',

  // Premium Sans-Serif
  'Proxima Nova': 'Montserrat',
  'Gotham': 'Montserrat',
  'Avenir': 'Nunito',
  'Avenir Next': 'Nunito',
  'Futura': 'Poppins',
  'Brandon Text': 'Raleway',
  'Brandon Grotesque': 'Raleway',
  'Circular': 'DM Sans',
  'Circular Std': 'DM Sans',
  'Graphik': 'Work Sans',
  'Averta': 'Outfit',
  'TT Commons': 'Manrope',

  // Serif Fonts
  'Georgia': 'Merriweather',
  'Times': 'Lora',
  'Times New Roman': 'Lora',
  'Freight Text': 'Merriweather',
  'Tiempos Text': 'Playfair Display',

  // Monospace
  'Monaco': 'JetBrains Mono',
  'Menlo': 'JetBrains Mono',
  'Consolas': 'Fira Code',
  'Courier': 'Source Code Pro',
  'Courier New': 'Source Code Pro',
};

/**
 * Get the Google Fonts API URL for loading specified fonts
 * @param fontNames - Array of font names to load
 * @returns Google Fonts API URL
 */
export function getGoogleFontsUrl(fontNames: string[]): string {
  if (fontNames.length === 0) return '';

  // Build font families param with weights
  const families = fontNames
    .map((name) => {
      // Find the font in our available fonts to get the proper Google Font name
      const allFonts = [
        ...AVAILABLE_FONTS.sans,
        ...AVAILABLE_FONTS.mono,
        ...AVAILABLE_FONTS.heading,
      ];

      const font = allFonts.find((f) => f.name === name);
      const googleName = font?.googleName || name.replace(/\s+/g, '+');

      // Load common weights: 400, 500, 600, 700
      return `${googleName}:wght@400;500;600;700`;
    })
    .join('&family=');

  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}

/**
 * Check if a font name is a Google Font that we support
 * @param fontName - Font name to check
 * @returns true if the font is a supported Google Font
 */
export function isGoogleFont(fontName: string): boolean {
  const allFonts = [
    ...AVAILABLE_FONTS.sans,
    ...AVAILABLE_FONTS.mono,
    ...AVAILABLE_FONTS.heading,
  ];

  return allFonts.some((f) => f.name === fontName);
}

/**
 * Extract font names from a font-family string
 * Example: "Inter, system-ui, sans-serif" → ["Inter"]
 * @param fontFamily - CSS font-family value
 * @returns Array of font names (excluding generic families)
 */
export function extractFontName(fontFamily: string): string | null {
  if (!fontFamily) return null;

  // Split by comma and get the first font (before fallbacks)
  const fonts = fontFamily.split(',').map((f) => f.trim().replace(/['"]/g, ''));

  // Filter out generic font families
  const genericFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', '-apple-system', 'BlinkMacSystemFont'];

  for (const font of fonts) {
    if (!genericFamilies.includes(font)) {
      return font;
    }
  }

  return null;
}

/**
 * Get the free alternative for a paid/proprietary font
 * @param fontName - Font name to check
 * @returns Alternative font name, or the original if no alternative exists
 */
export function getFontAlternative(fontName: string): string {
  return PAID_FONT_ALTERNATIVES[fontName] || fontName;
}

/**
 * Get all available font names for a category
 * @param category - Font category ('sans', 'mono', 'heading')
 * @returns Array of font names
 */
export function getAvailableFontNames(category: 'sans' | 'mono' | 'heading'): string[] {
  return AVAILABLE_FONTS[category].map((f) => f.name);
}
