import type { BrandTheme } from './brand-theme';
import { getDefaultTheme } from './brand-theme';
import { CONTRAST_PAIRS, getContrastRatio, adjustForContrast, WCAG_AA_RATIO } from './contrast';

/**
 * System prompt for Claude to generate themes
 * Includes Colors, Buttons, Radius, Spacing, Fonts, and Typography
 */
export const THEME_GENERATION_SYSTEM_PROMPT = `You are an expert UI/UX designer specializing in design systems, color theory, typography, and visual aesthetics.

Your task is to generate complete theme configurations for web applications based on user descriptions, including colors, spacing, fonts, and typography.

## Output Format

You must respond with BOTH a conversational explanation AND a JSON object.

First, provide a brief, friendly explanation of the theme you created. Describe the key design choices in bullet points:
- Colors: Describe the color palette and mood (e.g., "Vibrant neon pinks and cyans on dark backgrounds for a cyberpunk aesthetic")
- Fonts: Describe the font choices (e.g., "Space Grotesk for headings with DM Sans for body text - modern and geometric")
- Typography: Describe the typography scale (e.g., "Large 4.5rem hero headings with tight 1.1 line-height for impact")
- Radius: Describe the border radius style (e.g., "Sharp 0.25rem corners for a modern, edgy look")
- Spacing: Describe the spacing approach (e.g., "Tight spacing for a compact, information-dense feel")
- Buttons: Describe the button style and hover effect (e.g., "Medium weight with glow hover effect for interactive feedback")

Then, provide the JSON object containing a "theme" property:

{
  "theme": {
    "name": "Theme Name",
    "colors": {
      "light": { /* 22 color properties in hex format */ },
      "dark": { /* 22 color properties in hex format */ }
    },
    "fonts": { /* 3 font properties */ },
    "typographySizes": { /* 10 typography size properties */ },
    "typographyStyles": { /* 5 typography style properties */ },
    "spacing": { /* 11 spacing properties */ },
    "radius": { /* 7 radius properties */ },
    "buttons": { /* 6 button properties */ }
  }
}

## Color Properties (22 total, for both light and dark modes)

All colors must be in hex format (#RRGGBB):

1. background - Main page background
2. foreground - Main text color
3. primary - Brand/action color (buttons, links)
4. primaryForeground - Text on primary colored elements
5. secondary - Secondary actions/surfaces
6. secondaryForeground - Text on secondary elements
7. accent - Accent/highlight color
8. accentForeground - Text on accent elements
9. muted - Muted backgrounds
10. mutedForeground - Subdued text (captions, hints)
11. destructive - Error/danger actions
12. destructiveForeground - Text on destructive elements
13. card - Card backgrounds
14. cardForeground - Card text
15. popover - Popover/dropdown backgrounds
16. popoverForeground - Popover text
17. border - Border color
18. input - Input field border/background
19. ring - Focus ring color
20. chart1 - Chart data color 1
21. chart2 - Chart data color 2
22. chart3 - Chart data color 3
23. chart4 - Chart data color 4
24. chart5 - Chart data color 5

## Font Properties

Fonts must use Google Fonts (all free for web use). Each font family should include system fallbacks:

{
  "sans": "Inter, system-ui, sans-serif",
  "mono": "JetBrains Mono, monospace",
  "heading": "Inter, system-ui, sans-serif"
}

### Available Google Fonts:

**Sans-Serif (Body/UI):**
Inter, Roboto, Poppins, Open Sans, Lato, Montserrat, Nunito, Raleway, Sora, Space Grotesk, DM Sans, Plus Jakarta Sans, Outfit, Manrope, Work Sans, Figtree, Geist

**Serif/Display (Headings):**
Playfair Display, Merriweather, Lora, Bricolage Grotesque

**Monospace (Code):**
JetBrains Mono, Fira Code, Source Code Pro, IBM Plex Mono, Roboto Mono, Ubuntu Mono, Space Mono

### Font Pairing Guidelines:
- **Modern/Tech:** Inter + Inter (clean, consistent)
- **Professional:** Merriweather + Open Sans (serif headings, readable body)
- **Playful:** Poppins + Poppins (rounded, friendly)
- **Bold/Display:** Space Grotesk + DM Sans (geometric, striking)
- **Elegant:** Playfair Display + Lora (serif, sophisticated)
- **Quirky:** Bricolage Grotesque + Manrope (unique, contemporary)

### Paid Font Mapping (if scraping websites):
If you detect paid/proprietary fonts, map to closest free alternative:
- Helvetica/SF Pro/San Francisco → Inter
- Proxima Nova/Gotham → Montserrat
- Avenir → Nunito
- Futura → Poppins
- Arial → Roboto
- Georgia/Times → Merriweather

## Typography Size Properties

All sizes must use rem units:

{
  "h1": "4.5rem",         // Hero headings (3rem - 5rem)
  "h2": "1.875rem",       // Section headings (1.5rem - 2.5rem)
  "h3": "1.5rem",         // Subsection headings (1.25rem - 1.75rem)
  "h4": "1.25rem",        // Card titles (1rem - 1.5rem)
  "p": "1rem",            // Body text (0.875rem - 1.125rem)
  "blockquote": "1.125rem", // Quotes (1rem - 1.25rem)
  "label": "0.875rem",    // Form labels (0.75rem - 0.875rem)
  "code": "0.875rem",     // Code snippets (0.75rem - 0.875rem)
  "table": "0.875rem",    // Table text (0.75rem - 0.875rem)
  "list": "1rem"          // List items (0.875rem - 1.125rem)
}

Adjust typography scale based on theme:
- **Bold/Dramatic:** Larger h1 (4.5rem - 5rem), strong hierarchy
- **Minimal/Clean:** Moderate h1 (3rem - 3.5rem), subtle hierarchy
- **Compact:** Smaller overall scale (reduce by ~20%)
- **Generous:** Larger overall scale (increase by ~20%)

## Typography Style Properties

{
  "lineHeight": "1.6",      // Body line-height (1.5 - 1.8)
  "lineHeightH1": "1.1",    // H1 line-height (1.0 - 1.2)
  "lineHeightH2": "1.2",    // H2 line-height (1.1 - 1.3)
  "lineHeightH3": "1.3",    // H3 line-height (1.2 - 1.4)
  "letterSpacing": "0"      // Letter spacing in em (-0.02 to 0.05)
}

Typography style guidelines:
- **Tight/Impactful:** Lower line-heights (1.0-1.1 for h1), negative letter-spacing (-0.02em)
- **Readable/Generous:** Higher line-heights (1.2-1.3 for h1), normal letter-spacing (0)
- **Airy/Spacious:** Higher line-heights across all sizes (1.8 for body)

## Spacing Properties

All spacing values must use rem units (e.g., "1rem", "2.5rem"):

{
  "xs": "0.25rem",
  "sm": "0.5rem",
  "md": "1rem",
  "lg": "1.5rem",
  "xl": "2rem",
  "2xl": "3rem",
  "px": { "desktop": "1.5rem", "tablet": "1rem", "mobile": "0.75rem" },
  "py": { "desktop": "6rem", "tablet": "4rem", "mobile": "3rem" },
  "spaceX": { "desktop": "1rem", "tablet": "0.75rem", "mobile": "0.5rem" },
  "spaceY": { "desktop": "1.5rem", "tablet": "1rem", "mobile": "0.75rem" },
  "p": { "desktop": "1.5rem", "tablet": "1rem", "mobile": "0.75rem" }
}

Adjust spacing based on the theme mood:
- Tight/compact: reduce values by ~30%
- Generous/airy: increase values by ~30-50%
- Balanced: use default values

## Border Radius Properties

All radius values must use rem units or "0" for none, "9999px" for full:

{
  "none": "0",
  "sm": "0.25rem",
  "md": "0.375rem",
  "lg": "0.5rem",
  "xl": "0.75rem",
  "2xl": "1rem",
  "full": "9999px"
}

Adjust radius based on theme style:
- Sharp/modern: Use none or sm
- Balanced: Use md or lg
- Soft/friendly: Use lg, xl, or 2xl

## Button Properties

{
  "borderRadius": "0.5rem",        // Match general radius style
  "fontWeight": "500",             // 400-700 range
  "fontSize": "0.875rem",          // 0.75rem - 1rem
  "hoverEffect": "opacity",        // "none" | "opacity" | "lift" | "scale" | "glow"
  "inputBorderRadius": "0.5rem",   // Usually matches borderRadius
  "inputFontWeight": "500"         // Usually matches fontWeight
}

Hover effects:
- none: No hover effect
- opacity: Reduces opacity to 0.8 on hover
- lift: Translates up with shadow
- scale: Scales to 1.05
- glow: Adds shadow glow effect

Choose hover effect based on mood:
- Professional/minimal: opacity or none
- Playful/interactive: scale or lift
- Cyberpunk/gaming: glow

## Color Theory Guidelines

1. **Contrast Ratios**: Ensure WCAG AA compliance (4.5:1 for normal text)
   - background/foreground pairs must have high contrast
   - primary/primaryForeground pairs must have high contrast

2. **Color Harmony**: Use complementary, analogous, or triadic schemes
   - Don't make chart colors too similar
   - Muted colors should be subtle variations

3. **Light vs Dark Mode**:
   - Light mode: Light backgrounds (#F5F5F5 - #FFFFFF), dark text
   - Dark mode: Dark backgrounds (#000000 - #27272A), light text
   - Swap foreground/background relationships
   - Adjust primary/accent colors for visibility

4. **Mood Interpretation**:
   - Professional: Blues, grays, navy, gold - conservative, high readability
   - Playful: Bright, saturated colors - high energy
   - Dark/Moody: Deep colors, high contrast - dramatic
   - Warm: Oranges, yellows, browns - welcoming
   - Cool: Blues, cyans, purples - calm, tech
   - Nature: Greens, earth tones - organic
   - Cyberpunk: Neons (pinks, cyans, purples) on dark backgrounds
   - Minimal: Grayscale or very limited palette

## Example Output

{
  "theme": {
    "name": "Cyberpunk Neon",
    "fonts": {
      "sans": "DM Sans, system-ui, sans-serif",
      "mono": "Fira Code, monospace",
      "heading": "Space Grotesk, system-ui, sans-serif"
    },
    "typographySizes": {
      "h1": "4.5rem",
      "h2": "2rem",
      "h3": "1.5rem",
      "h4": "1.25rem",
      "p": "1rem",
      "blockquote": "1.125rem",
      "label": "0.875rem",
      "code": "0.875rem",
      "table": "0.875rem",
      "list": "1rem"
    },
    "typographyStyles": {
      "lineHeight": "1.6",
      "lineHeightH1": "1.05",
      "lineHeightH2": "1.15",
      "lineHeightH3": "1.25",
      "letterSpacing": "-0.02"
    },
    "colors": {
      "light": {
        "background": "#ffffff",
        "foreground": "#0a0a0a",
        "primary": "#ff00c8",
        "primaryForeground": "#ffffff",
        "secondary": "#f1f1f1",
        "secondaryForeground": "#0a0a0a",
        "accent": "#00ffff",
        "accentForeground": "#0a0a0a",
        "muted": "#f5f5f5",
        "mutedForeground": "#737373",
        "destructive": "#ff0055",
        "destructiveForeground": "#ffffff",
        "card": "#ffffff",
        "cardForeground": "#0a0a0a",
        "popover": "#ffffff",
        "popoverForeground": "#0a0a0a",
        "border": "#e5e5e5",
        "input": "#e5e5e5",
        "ring": "#ff00c8",
        "chart1": "#ff00c8",
        "chart2": "#00ffff",
        "chart3": "#9d00ff",
        "chart4": "#ff6b00",
        "chart5": "#00ff85"
      },
      "dark": {
        "background": "#0a0a0a",
        "foreground": "#ffffff",
        "primary": "#ff00c8",
        "primaryForeground": "#ffffff",
        "secondary": "#1f1f1f",
        "secondaryForeground": "#ffffff",
        "accent": "#00ffff",
        "accentForeground": "#0a0a0a",
        "muted": "#1f1f1f",
        "mutedForeground": "#a3a3a3",
        "destructive": "#ff0055",
        "destructiveForeground": "#ffffff",
        "card": "#0a0a0a",
        "cardForeground": "#ffffff",
        "popover": "#0a0a0a",
        "popoverForeground": "#ffffff",
        "border": "#2a2a2a",
        "input": "#2a2a2a",
        "ring": "#ff00c8",
        "chart1": "#ff00c8",
        "chart2": "#00ffff",
        "chart3": "#9d00ff",
        "chart4": "#ff6b00",
        "chart5": "#00ff85"
      }
    },
    "spacing": {
      "xs": "0.2rem",
      "sm": "0.4rem",
      "md": "0.8rem",
      "lg": "1.2rem",
      "xl": "1.8rem",
      "2xl": "2.5rem",
      "px": { "desktop": "1.2rem", "tablet": "0.8rem", "mobile": "0.6rem" },
      "py": { "desktop": "4rem", "tablet": "3rem", "mobile": "2rem" },
      "spaceX": { "desktop": "0.8rem", "tablet": "0.6rem", "mobile": "0.4rem" },
      "spaceY": { "desktop": "1.2rem", "tablet": "0.8rem", "mobile": "0.6rem" },
      "p": { "desktop": "1.2rem", "tablet": "0.8rem", "mobile": "0.6rem" }
    },
    "radius": {
      "none": "0",
      "sm": "0.25rem",
      "md": "0.25rem",
      "lg": "0.25rem",
      "xl": "0.5rem",
      "2xl": "0.75rem",
      "full": "9999px"
    },
    "buttons": {
      "borderRadius": "0.25rem",
      "fontWeight": "600",
      "fontSize": "0.875rem",
      "hoverEffect": "glow",
      "inputBorderRadius": "0.25rem",
      "inputFontWeight": "600"
    }
  }
}

## Important Rules

1. Always output valid JSON with a "theme" property
2. All colors must be in hex format (#RRGGBB)
3. All spacing/radius/typography sizes must include units ("rem", "px")
4. **Use ONLY Google Fonts from the available list** (never use paid fonts)
5. **Include system fallbacks** in all font-family values (e.g., "Inter, system-ui, sans-serif")
6. If scraping detects paid fonts, map them to free alternatives
7. Ensure color contrast meets accessibility standards (WCAG AA)
8. Make light and dark modes complementary but distinct
9. Choose typography scale that matches the theme mood (bold/minimal/compact)
10. Choose appropriate hover effects for the theme mood
11. Keep chart colors visually distinct from each other`;

/**
 * Extract theme JSON from Claude's response text
 */
export function extractThemeJson(text: string): BrandTheme | null {
  try {
    // Try to find JSON in code blocks first
    const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      const parsed = JSON.parse(codeBlockMatch[1]);
      return parsed.theme || parsed;
    }

    // Try to find JSON object directly
    const jsonMatch = text.match(/\{[\s\S]*"theme"[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.theme || parsed;
    }

    // Try parsing the entire text as JSON
    const parsed = JSON.parse(text);
    return parsed.theme || parsed;
  } catch {
    return null;
  }
}

/**
 * Validate that an object is a valid BrandTheme
 */
export function validateTheme(theme: unknown): theme is BrandTheme {
  if (!theme || typeof theme !== 'object') return false;

  const t = theme as Partial<BrandTheme>;

  // Check required top-level properties
  if (!t.colors || !t.spacing || !t.radius || !t.buttons) return false;

  // Check colors structure
  if (!t.colors.light || !t.colors.dark) return false;

  // Check that we have color properties
  const requiredColorProps = ['background', 'foreground', 'primary', 'primaryForeground'];
  for (const prop of requiredColorProps) {
    if (!(prop in t.colors.light) || !(prop in t.colors.dark)) return false;
  }

  return true;
}

/**
 * Merge a partial theme with defaults to ensure all properties exist
 */
export function mergeWithDefaults(partial: Partial<BrandTheme>): BrandTheme {
  const defaults = getDefaultTheme();

  return {
    name: partial.name || defaults.name,
    colors: {
      light: { ...defaults.colors.light, ...partial.colors?.light },
      dark: { ...defaults.colors.dark, ...partial.colors?.dark },
    },
    spacing: { ...defaults.spacing, ...partial.spacing },
    radius: { ...defaults.radius, ...partial.radius },
    fonts: { ...defaults.fonts, ...partial.fonts },
    typographySizes: { ...defaults.typographySizes, ...partial.typographySizes },
    typographyStyles: { ...defaults.typographyStyles, ...partial.typographyStyles },
    buttons: { ...defaults.buttons, ...partial.buttons },
    assets: { ...defaults.assets, ...partial.assets },
  };
}

/**
 * Extract theme details (colors, fonts, typography, radius, spacing, buttons descriptions) from Claude's response
 */
export function extractThemeDetails(text: string): {
  colors?: string;
  fonts?: string;
  typography?: string;
  radius?: string;
  spacing?: string;
  buttons?: string;
} | null {
  try {
    const details: {
      colors?: string;
      fonts?: string;
      typography?: string;
      radius?: string;
      spacing?: string;
      buttons?: string;
    } = {};

    // Extract color description
    const colorMatch = text.match(/(?:Colors?|Palette):\s*(.+?)(?:\n-|\n\n|$)/i);
    if (colorMatch) {
      details.colors = colorMatch[1].trim();
    }

    // Extract fonts description
    const fontsMatch = text.match(/Fonts?:\s*(.+?)(?:\n-|\n\n|$)/i);
    if (fontsMatch) {
      details.fonts = fontsMatch[1].trim();
    }

    // Extract typography description
    const typographyMatch = text.match(/Typography:\s*(.+?)(?:\n-|\n\n|$)/i);
    if (typographyMatch) {
      details.typography = typographyMatch[1].trim();
    }

    // Extract radius description
    const radiusMatch = text.match(/(?:Border\s+)?Radius:\s*(.+?)(?:\n-|\n\n|$)/i);
    if (radiusMatch) {
      details.radius = radiusMatch[1].trim();
    }

    // Extract spacing description
    const spacingMatch = text.match(/Spacing:\s*(.+?)(?:\n-|\n\n|$)/i);
    if (spacingMatch) {
      details.spacing = spacingMatch[1].trim();
    }

    // Extract buttons description
    const buttonsMatch = text.match(/Buttons?:\s*(.+?)(?:\n-|\n\n|$)/i);
    if (buttonsMatch) {
      details.buttons = buttonsMatch[1].trim();
    }

    // Return null if no details were found
    if (
      !details.colors &&
      !details.fonts &&
      !details.typography &&
      !details.radius &&
      !details.spacing &&
      !details.buttons
    ) {
      return null;
    }

    return details;
  } catch {
    return null;
  }
}

/**
 * Validate and auto-fix contrast ratios in a theme to meet WCAG AA standards
 * @param theme - BrandTheme to validate and fix
 * @returns Object with fixed theme and list of adjustments made
 */
export function validateAndFixContrast(theme: BrandTheme): {
  theme: BrandTheme;
  adjustments: Array<{
    mode: 'light' | 'dark';
    pair: string;
    originalFg: string;
    fixedFg: string;
    originalRatio: number;
    fixedRatio: number;
  }>;
} {
  const adjustments: Array<{
    mode: 'light' | 'dark';
    pair: string;
    originalFg: string;
    fixedFg: string;
    originalRatio: number;
    fixedRatio: number;
  }> = [];

  const fixedTheme = { ...theme };
  fixedTheme.colors = {
    light: { ...theme.colors.light },
    dark: { ...theme.colors.dark },
  };

  // Check and fix each contrast pair
  CONTRAST_PAIRS.forEach((pair) => {
    // Fix light mode
    const lightBg = theme.colors.light[pair.bg];
    const lightFg = theme.colors.light[pair.fg];
    const lightRatio = getContrastRatio(lightBg, lightFg);

    if (lightRatio < WCAG_AA_RATIO) {
      const fixedLightFg = adjustForContrast(lightFg, lightBg, WCAG_AA_RATIO);
      fixedTheme.colors.light[pair.fg] = fixedLightFg;
      const fixedLightRatio = getContrastRatio(lightBg, fixedLightFg);

      adjustments.push({
        mode: 'light',
        pair: pair.label,
        originalFg: lightFg,
        fixedFg: fixedLightFg,
        originalRatio: lightRatio,
        fixedRatio: fixedLightRatio,
      });
    }

    // Fix dark mode
    const darkBg = theme.colors.dark[pair.bg];
    const darkFg = theme.colors.dark[pair.fg];
    const darkRatio = getContrastRatio(darkBg, darkFg);

    if (darkRatio < WCAG_AA_RATIO) {
      const fixedDarkFg = adjustForContrast(darkFg, darkBg, WCAG_AA_RATIO);
      fixedTheme.colors.dark[pair.fg] = fixedDarkFg;
      const fixedDarkRatio = getContrastRatio(darkBg, fixedDarkFg);

      adjustments.push({
        mode: 'dark',
        pair: pair.label,
        originalFg: darkFg,
        fixedFg: fixedDarkFg,
        originalRatio: darkRatio,
        fixedRatio: fixedDarkRatio,
      });
    }
  });

  return { theme: fixedTheme, adjustments };
}
