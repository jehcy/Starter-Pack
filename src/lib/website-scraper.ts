/**
 * Website Scraper - Extract colors, fonts, typography, and design information from websites
 */

import { PAID_FONT_ALTERNATIVES, extractFontName, getFontAlternative } from './fonts';

export interface ScrapedColors {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
  accent?: string;
  allColors: string[]; // All unique colors found
}

export interface ScrapedButtonStyle {
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  padding?: string;
}

export interface ScrapedTypography {
  h1Size?: string;
  h2Size?: string;
  bodySize?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface ScrapedDesign {
  colors: ScrapedColors;
  buttons: ScrapedButtonStyle[];
  fonts: {
    primary?: string;
    headings?: string;
  };
  typography?: ScrapedTypography;
  rawHtml?: string; // Optional: include snippet for Claude analysis
}

/**
 * Extract hex color from various CSS color formats
 */
function normalizeColor(color: string): string | null {
  if (!color) return null;

  // Already hex format
  if (/^#[0-9A-F]{6}$/i.test(color)) {
    return color.toUpperCase();
  }

  // Short hex format (#RGB)
  if (/^#[0-9A-F]{3}$/i.test(color)) {
    const [, r, g, b] = color.match(/#(.)(.)(.)/)!;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  // RGB/RGBA format
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    const toHex = (n: string) => parseInt(n).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  return null;
}

/**
 * Extract all colors from CSS text or inline styles
 */
function extractColorsFromCSS(css: string): string[] {
  const colors = new Set<string>();

  // Find hex colors
  const hexMatches = css.match(/#[0-9A-F]{3,6}/gi) || [];
  hexMatches.forEach((color) => {
    const normalized = normalizeColor(color);
    if (normalized) colors.add(normalized);
  });

  // Find rgb/rgba colors
  const rgbMatches = css.match(/rgba?\([^)]+\)/gi) || [];
  rgbMatches.forEach((color) => {
    const normalized = normalizeColor(color);
    if (normalized) colors.add(normalized);
  });

  return Array.from(colors);
}

/**
 * Analyze colors to determine their likely roles (primary, secondary, etc.)
 */
function categorizeColors(colors: string[]): ScrapedColors {
  if (colors.length === 0) {
    return { allColors: [] };
  }

  // Sort by frequency if we had that data, for now just use position
  const result: ScrapedColors = {
    allColors: colors,
  };

  // Simple heuristics for categorization
  if (colors.length >= 1) result.primary = colors[0];
  if (colors.length >= 2) result.secondary = colors[1];
  if (colors.length >= 3) result.accent = colors[2];

  // Try to identify background and text colors by luminance
  const colorsByLuminance = colors.map((color) => ({
    color,
    luminance: getColorLuminance(color),
  }));

  colorsByLuminance.sort((a, b) => a.luminance - b.luminance);

  // Darkest is likely text, lightest is likely background
  if (colorsByLuminance.length > 0) {
    result.text = colorsByLuminance[0].color;
    result.background = colorsByLuminance[colorsByLuminance.length - 1].color;
  }

  return result;
}

/**
 * Calculate relative luminance of a color (0-1 scale)
 */
function getColorLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = ((rgb >> 16) & 0xff) / 255;
  const g = ((rgb >> 8) & 0xff) / 255;
  const b = (rgb & 0xff) / 255;

  // Apply gamma correction
  const rsrgb = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsrgb = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsrgb = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
}

/**
 * Extract typography information from CSS
 */
function extractTypography(html: string): ScrapedTypography {
  const typography: ScrapedTypography = {};

  // Extract font-size values
  const fontSizeMatches = html.match(/font-size:\s*([^;}"']+)/gi) || [];
  const sizes = fontSizeMatches
    .map((match) => {
      const sizeMatch = match.match(/font-size:\s*([^;}"']+)/i);
      return sizeMatch ? sizeMatch[1].trim() : null;
    })
    .filter(Boolean) as string[];

  // Convert sizes to rem if in pixels (assuming 16px = 1rem)
  const normalizedSizes = sizes.map((size) => {
    if (size.endsWith('px')) {
      const px = parseFloat(size);
      return `${(px / 16).toFixed(3)}rem`;
    }
    return size;
  });

  // Parse sizes and categorize (heuristic: large = headings, medium = body)
  const remSizes = normalizedSizes
    .filter((s) => s.endsWith('rem'))
    .map((s) => parseFloat(s))
    .sort((a, b) => b - a);

  if (remSizes.length > 0) {
    // Largest size is likely h1
    if (remSizes[0] >= 2) {
      typography.h1Size = `${remSizes[0].toFixed(3)}rem`;
    }

    // Find a medium-large size for h2
    const h2Candidate = remSizes.find((s) => s >= 1.5 && s < remSizes[0]);
    if (h2Candidate) {
      typography.h2Size = `${h2Candidate.toFixed(3)}rem`;
    }

    // Find body size (around 1rem)
    const bodyCandidate = remSizes.find((s) => s >= 0.875 && s <= 1.125);
    if (bodyCandidate) {
      typography.bodySize = `${bodyCandidate.toFixed(3)}rem`;
    }
  }

  // Extract line-height values
  const lineHeightMatches = html.match(/line-height:\s*([^;}"']+)/gi) || [];
  if (lineHeightMatches.length > 0 && lineHeightMatches[0]) {
    const lineHeightMatch = lineHeightMatches[0].match(/line-height:\s*([^;}"']+)/i);
    if (lineHeightMatch && lineHeightMatch[1]) {
      typography.lineHeight = lineHeightMatch[1].trim();
    }
  }

  // Extract letter-spacing values
  const letterSpacingMatches = html.match(/letter-spacing:\s*([^;}"']+)/gi) || [];
  if (letterSpacingMatches.length > 0 && letterSpacingMatches[0]) {
    const letterSpacingMatch = letterSpacingMatches[0].match(/letter-spacing:\s*([^;}"']+)/i);
    if (letterSpacingMatch && letterSpacingMatch[1]) {
      typography.letterSpacing = letterSpacingMatch[1].trim();
    }
  }

  return typography;
}

/**
 * Extract button styles from HTML elements
 */
function extractButtonStyles(html: string): ScrapedButtonStyle[] {
  const buttons: ScrapedButtonStyle[] = [];

  // This is a simplified extraction - in a real browser environment,
  // we'd use computed styles. For now, we extract inline styles and classes
  const buttonMatches = html.matchAll(/<button[^>]*style="([^"]*)"[^>]*>/gi);

  for (const match of buttonMatches) {
    const styleString = match[1];
    const style: ScrapedButtonStyle = {};

    const borderRadiusMatch = styleString.match(/border-radius:\s*([^;]+)/i);
    if (borderRadiusMatch) style.borderRadius = borderRadiusMatch[1].trim();

    const bgColorMatch = styleString.match(/background(?:-color)?:\s*([^;]+)/i);
    if (bgColorMatch) {
      const normalized = normalizeColor(bgColorMatch[1].trim());
      if (normalized) style.backgroundColor = normalized;
    }

    const colorMatch = styleString.match(/(?:^|;)\s*color:\s*([^;]+)/i);
    if (colorMatch) {
      const normalized = normalizeColor(colorMatch[1].trim());
      if (normalized) style.color = normalized;
    }

    const fontWeightMatch = styleString.match(/font-weight:\s*([^;]+)/i);
    if (fontWeightMatch) style.fontWeight = fontWeightMatch[1].trim();

    const fontSizeMatch = styleString.match(/font-size:\s*([^;]+)/i);
    if (fontSizeMatch) style.fontSize = fontSizeMatch[1].trim();

    const paddingMatch = styleString.match(/padding:\s*([^;]+)/i);
    if (paddingMatch) style.padding = paddingMatch[1].trim();

    if (Object.keys(style).length > 0) {
      buttons.push(style);
    }
  }

  return buttons;
}

/**
 * Scrape a website and extract design information
 */
export async function scrapeWebsiteDesign(url: string): Promise<ScrapedDesign> {
  try {
    // Validate URL
    const urlObj = new URL(url);
    if (!urlObj.protocol.startsWith('http')) {
      throw new Error('Invalid URL protocol. Only HTTP and HTTPS are supported.');
    }

    // Fetch the website HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }

    const html = await response.text();

    // Extract colors from HTML and inline styles
    const allColors = extractColorsFromCSS(html);

    // Try to extract external CSS (basic approach - just look for style tags)
    const styleMatches = html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    for (const match of styleMatches) {
      const cssColors = extractColorsFromCSS(match[1]);
      allColors.push(...cssColors);
    }

    // Remove duplicates
    const uniqueColors = Array.from(new Set(allColors));

    // Categorize colors
    const colors = categorizeColors(uniqueColors);

    // Extract button styles
    const buttons = extractButtonStyles(html);

    // Extract font families
    const fontMatches = html.match(/font-family:\s*([^;}"']+)/gi) || [];
    const fonts = fontMatches
      .map((match) => {
        const fontMatch = match.match(/font-family:\s*([^;}"']+)/i);
        return fontMatch ? fontMatch[1].trim() : null;
      })
      .filter(Boolean) as string[];

    const uniqueFonts = Array.from(new Set(fonts));

    // Extract typography information
    const typography = extractTypography(html);

    // Take a snippet of HTML for Claude to analyze (first 5000 chars)
    const rawHtml = html.slice(0, 5000);

    return {
      colors,
      buttons,
      fonts: {
        primary: uniqueFonts[0],
        headings: uniqueFonts[1] || uniqueFonts[0],
      },
      typography,
      rawHtml,
    };
  } catch (error) {
    console.error('Website scraping error:', error);
    throw new Error(
      `Failed to scrape website: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Format scraped design data for Claude's analysis
 */
export function formatScrapedDesignForPrompt(scraped: ScrapedDesign): string {
  let prompt = '## Scraped Website Design\n\n';

  // Colors section
  prompt += '### Colors Found:\n';
  if (scraped.colors.primary) {
    prompt += `- Primary: ${scraped.colors.primary}\n`;
  }
  if (scraped.colors.secondary) {
    prompt += `- Secondary: ${scraped.colors.secondary}\n`;
  }
  if (scraped.colors.accent) {
    prompt += `- Accent: ${scraped.colors.accent}\n`;
  }
  if (scraped.colors.background) {
    prompt += `- Background: ${scraped.colors.background}\n`;
  }
  if (scraped.colors.text) {
    prompt += `- Text: ${scraped.colors.text}\n`;
  }

  if (scraped.colors.allColors.length > 0) {
    prompt += `\nAll unique colors (${scraped.colors.allColors.length} total):\n`;
    prompt += scraped.colors.allColors.slice(0, 20).join(', ');
    if (scraped.colors.allColors.length > 20) {
      prompt += ` ... and ${scraped.colors.allColors.length - 20} more`;
    }
    prompt += '\n';
  }

  // Buttons section
  if (scraped.buttons.length > 0) {
    prompt += '\n### Button Styles Found:\n';
    scraped.buttons.slice(0, 5).forEach((btn, idx) => {
      prompt += `\nButton ${idx + 1}:\n`;
      if (btn.borderRadius) prompt += `  - Border Radius: ${btn.borderRadius}\n`;
      if (btn.backgroundColor) prompt += `  - Background: ${btn.backgroundColor}\n`;
      if (btn.color) prompt += `  - Text Color: ${btn.color}\n`;
      if (btn.fontWeight) prompt += `  - Font Weight: ${btn.fontWeight}\n`;
      if (btn.fontSize) prompt += `  - Font Size: ${btn.fontSize}\n`;
      if (btn.padding) prompt += `  - Padding: ${btn.padding}\n`;
    });
  }

  // Fonts section with mapping hints
  if (scraped.fonts.primary || scraped.fonts.headings) {
    prompt += '\n### Fonts Found:\n';

    if (scraped.fonts.primary) {
      const primaryFontName = extractFontName(scraped.fonts.primary);
      const alternative = primaryFontName ? getFontAlternative(primaryFontName) : null;

      prompt += `- Primary Font: ${scraped.fonts.primary}`;
      if (alternative && alternative !== primaryFontName) {
        prompt += ` → **Use "${alternative}"** (free alternative)`;
      }
      prompt += '\n';
    }

    if (scraped.fonts.headings && scraped.fonts.headings !== scraped.fonts.primary) {
      const headingFontName = extractFontName(scraped.fonts.headings);
      const alternative = headingFontName ? getFontAlternative(headingFontName) : null;

      prompt += `- Heading Font: ${scraped.fonts.headings}`;
      if (alternative && alternative !== headingFontName) {
        prompt += ` → **Use "${alternative}"** (free alternative)`;
      }
      prompt += '\n';
    }
  }

  // Typography section
  if (scraped.typography && Object.keys(scraped.typography).length > 0) {
    prompt += '\n### Typography Found:\n';
    if (scraped.typography.h1Size) {
      prompt += `- H1 Size: ${scraped.typography.h1Size}\n`;
    }
    if (scraped.typography.h2Size) {
      prompt += `- H2 Size: ${scraped.typography.h2Size}\n`;
    }
    if (scraped.typography.bodySize) {
      prompt += `- Body Size: ${scraped.typography.bodySize}\n`;
    }
    if (scraped.typography.lineHeight) {
      prompt += `- Line Height: ${scraped.typography.lineHeight}\n`;
    }
    if (scraped.typography.letterSpacing) {
      prompt += `- Letter Spacing: ${scraped.typography.letterSpacing}\n`;
    }
  }

  prompt +=
    '\n**Please analyze these scraped design elements and create a theme that matches or is inspired by this website.**';

  return prompt;
}
