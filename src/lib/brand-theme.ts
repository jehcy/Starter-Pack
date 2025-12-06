/**
 * BrandTheme interface and utilities for the theme editor
 */

export interface ColorTokens {
  // Core shadcn/ui colors
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  border: string;
  input: string;
  ring: string;
  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface FontTokens {
  sans: string;
  mono: string;
  heading: string;
}

export interface TypographySizeTokens {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  p: string;
  blockquote: string;
  label: string;
  code: string;
  table: string;
  list: string;
}

export interface TypographyStyleTokens {
  lineHeight: string;
  lineHeightH1: string;
  lineHeightH2: string;
  lineHeightH3: string;
  letterSpacing: string;
}

export interface ButtonTokens {
  borderRadius: string;
  fontWeight: string;
  fontSize: string;
  hoverEffect: 'none' | 'opacity' | 'lift' | 'scale' | 'glow';
  // Input button specific styles
  inputBorderRadius: string;
  inputFontWeight: string;
}

export interface BrandTheme {
  name: string;
  colors: {
    light: ColorTokens;
    dark: ColorTokens;
  };
  spacing: SpacingTokens;
  radius: RadiusTokens;
  fonts: FontTokens;
  typographySizes: TypographySizeTokens;
  typographyStyles: TypographyStyleTokens;
  buttons: ButtonTokens;
}

export const DEFAULT_LIGHT_COLORS: ColorTokens = {
  background: '#ffffff',
  foreground: '#09090b',
  primary: '#18181b',
  primaryForeground: '#fafafa',
  secondary: '#f4f4f5',
  secondaryForeground: '#18181b',
  accent: '#f4f4f5',
  accentForeground: '#18181b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  destructive: '#ef4444',
  destructiveForeground: '#fafafa',
  card: '#ffffff',
  cardForeground: '#09090b',
  popover: '#ffffff',
  popoverForeground: '#09090b',
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#18181b',
  chart1: '#e76e50',
  chart2: '#2a9d90',
  chart3: '#274754',
  chart4: '#e8c468',
  chart5: '#f4a462',
};

export const DEFAULT_DARK_COLORS: ColorTokens = {
  background: '#09090b',
  foreground: '#fafafa',
  primary: '#fafafa',
  primaryForeground: '#18181b',
  secondary: '#27272a',
  secondaryForeground: '#fafafa',
  accent: '#27272a',
  accentForeground: '#fafafa',
  muted: '#27272a',
  mutedForeground: '#a1a1aa',
  destructive: '#7f1d1d',
  destructiveForeground: '#fafafa',
  card: '#09090b',
  cardForeground: '#fafafa',
  popover: '#09090b',
  popoverForeground: '#fafafa',
  border: '#27272a',
  input: '#27272a',
  ring: '#d4d4d8',
  chart1: '#2563eb',
  chart2: '#16a34a',
  chart3: '#eab308',
  chart4: '#a855f7',
  chart5: '#ec4899',
};

export const DEFAULT_SPACING: SpacingTokens = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const DEFAULT_RADIUS: RadiusTokens = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const DEFAULT_FONTS: FontTokens = {
  sans: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, Fira Code, monospace',
  heading: 'Inter, system-ui, -apple-system, sans-serif',
};

export const DEFAULT_TYPOGRAPHY_SIZES: TypographySizeTokens = {
  h1: '4.5rem',
  h2: '1.875rem',
  h3: '1.5rem',
  h4: '1.25rem',
  p: '1rem',
  blockquote: '1.125rem',
  label: '0.875rem',
  code: '0.875rem',
  table: '0.875rem',
  list: '1rem',
};

export const DEFAULT_TYPOGRAPHY_STYLES: TypographyStyleTokens = {
  lineHeight: '1.6',
  lineHeightH1: '1.1',
  lineHeightH2: '1.2',
  lineHeightH3: '1.3',
  letterSpacing: '0',
};

export const DEFAULT_BUTTONS: ButtonTokens = {
  borderRadius: '0.5rem',
  fontWeight: '500',
  fontSize: '0.875rem',
  hoverEffect: 'opacity',
  // Input button defaults
  inputBorderRadius: '0.5rem',
  inputFontWeight: '500',
};

export function getDefaultTheme(): BrandTheme {
  return {
    name: 'Default Theme',
    colors: {
      light: { ...DEFAULT_LIGHT_COLORS },
      dark: { ...DEFAULT_DARK_COLORS },
    },
    spacing: { ...DEFAULT_SPACING },
    radius: { ...DEFAULT_RADIUS },
    fonts: { ...DEFAULT_FONTS },
    typographySizes: { ...DEFAULT_TYPOGRAPHY_SIZES },
    typographyStyles: { ...DEFAULT_TYPOGRAPHY_STYLES },
    buttons: { ...DEFAULT_BUTTONS },
  };
}

/**
 * Convert hex color to HSL string for CSS variables
 */
export function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Convert HSL string back to hex
 */
export function hslToHex(hsl: string): string {
  const parts = hsl.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return '#000000';

  const h = parseFloat(parts[0]) / 360;
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate CSS variables string from theme (HSL format for dynamic CSS route)
 */
export function generateCssVariables(theme: BrandTheme): string {
  const lightVars = Object.entries(theme.colors.light)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  --${cssKey}: ${hexToHsl(value)};`;
    })
    .join('\n');

  const darkVars = Object.entries(theme.colors.dark)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  --${cssKey}: ${hexToHsl(value)};`;
    })
    .join('\n');

  const radiusVars = Object.entries(theme.radius)
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join('\n');

  return `:root {
${lightVars}
  --radius: ${theme.radius.lg};
${radiusVars}
}

.dark {
${darkVars}
}`;
}

/**
 * Color key to CSS variable name mapping
 */
const COLOR_TO_CSS_VAR: Record<keyof ColorTokens, string> = {
  background: 'background',
  foreground: 'foreground',
  primary: 'primary',
  primaryForeground: 'primary-foreground',
  secondary: 'secondary',
  secondaryForeground: 'secondary-foreground',
  accent: 'accent',
  accentForeground: 'accent-foreground',
  muted: 'muted',
  mutedForeground: 'muted-foreground',
  destructive: 'destructive',
  destructiveForeground: 'destructive-foreground',
  card: 'card',
  cardForeground: 'card-foreground',
  popover: 'popover',
  popoverForeground: 'popover-foreground',
  border: 'border',
  input: 'input',
  ring: 'ring',
  chart1: 'chart-1',
  chart2: 'chart-2',
  chart3: 'chart-3',
  chart4: 'chart-4',
  chart5: 'chart-5',
};

/**
 * Generate hover effect CSS based on the selected effect
 */
function generateHoverEffectVars(effect: string): { light: string; dark: string } {
  const effects: Record<string, { light: string; dark: string }> = {
    none: {
      light: `  --button-hover-opacity: 1;
  --button-hover-transform: none;
  --button-hover-shadow: none;`,
      dark: `  --button-hover-shadow: none;`,
    },
    opacity: {
      light: `  --button-hover-opacity: 0.8;
  --button-hover-transform: none;
  --button-hover-shadow: none;`,
      dark: `  --button-hover-shadow: none;`,
    },
    lift: {
      light: `  --button-hover-opacity: 1;
  --button-hover-transform: translateY(-2px);
  --button-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);`,
      dark: `  --button-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);`,
    },
    scale: {
      light: `  --button-hover-opacity: 1;
  --button-hover-transform: scale(1.05);
  --button-hover-shadow: none;`,
      dark: `  --button-hover-shadow: none;`,
    },
    glow: {
      light: `  --button-hover-opacity: 1;
  --button-hover-transform: none;
  --button-hover-shadow: 0 0 20px rgba(0, 0, 0, 0.25);`,
      dark: `  --button-hover-shadow: 0 0 20px rgba(255, 255, 255, 0.15);`,
    },
  };

  return effects[effect] || effects.opacity;
}

/**
 * Generate CSS for globals.css format (hex values, matching existing structure)
 * This is used to directly overwrite the :root and .dark blocks in globals.css
 */
export function generateGlobalsCss(theme: BrandTheme): { root: string; dark: string } {
  const lightVars = Object.entries(theme.colors.light)
    .map(([key, value]) => {
      const cssVar = COLOR_TO_CSS_VAR[key as keyof ColorTokens];
      return `  --${cssVar}: ${value};`;
    })
    .join('\n');

  const darkVars = Object.entries(theme.colors.dark)
    .map(([key, value]) => {
      const cssVar = COLOR_TO_CSS_VAR[key as keyof ColorTokens];
      return `  --${cssVar}: ${value};`;
    })
    .join('\n');

  // Generate spacing variables
  const spacingVars = Object.entries(theme.spacing)
    .map(([key, value]) => `  --spacing-${key}: ${value};`)
    .join('\n');

  // Generate radius variables
  const radiusVars = Object.entries(theme.radius)
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join('\n');

  // Generate font variables
  const fontVars = [
    `  --font-sans: ${theme.fonts.sans};`,
    `  --font-mono: ${theme.fonts.mono};`,
    `  --font-heading: ${theme.fonts.heading};`,
  ].join('\n');

  // Generate typography size variables
  const typographySizeVars = Object.entries(theme.typographySizes)
    .map(([key, value]) => `  --text-${key}: ${value};`)
    .join('\n');

  // Generate typography style variables
  const typographyStyleVars = [
    `  --line-height: ${theme.typographyStyles.lineHeight};`,
    `  --line-height-h1: ${theme.typographyStyles.lineHeightH1};`,
    `  --line-height-h2: ${theme.typographyStyles.lineHeightH2};`,
    `  --line-height-h3: ${theme.typographyStyles.lineHeightH3};`,
    `  --letter-spacing: ${theme.typographyStyles.letterSpacing}em;`,
  ].join('\n');

  // Generate button variables
  const buttonVars = [
    `  --button-radius: ${theme.buttons.borderRadius};`,
    `  --button-font-weight: ${theme.buttons.fontWeight};`,
    `  --button-font-size: ${theme.buttons.fontSize};`,
    `  --button-hover-effect: ${theme.buttons.hoverEffect};`,
    `  --input-button-radius: ${theme.buttons.inputBorderRadius};`,
    `  --input-button-font-weight: ${theme.buttons.inputFontWeight};`,
  ].join('\n');

  // Generate hover effect variables
  const hoverEffectVars = generateHoverEffectVars(theme.buttons.hoverEffect);

  const rootBlock = `:root {
  /* Brand Light Mode Colors - from brand.md */
${lightVars}

  /* Brand Spacing */
${spacingVars}

  /* Brand Radius */
  --radius: ${theme.radius.lg};
${radiusVars}

  /* Brand Fonts */
${fontVars}

  /* Brand Typography Sizes */
${typographySizeVars}

  /* Brand Typography Styles */
${typographyStyleVars}

  /* Brand Buttons */
${buttonVars}

  /* Button Hover Effect */
${hoverEffectVars.light}
}`;

  const darkBlock = `.dark {
  /* Brand Dark Mode Colors - from brand.md */
${darkVars}

  /* Dark Mode Button Hover */
${hoverEffectVars.dark}
}`;

  return { root: rootBlock, dark: darkBlock };
}

/**
 * Generate the full CSS preview string for display in the modal
 */
export function generateCssPreview(theme: BrandTheme): string {
  const { root, dark } = generateGlobalsCss(theme);
  return `${root}\n\n${dark}`;
}

/**
 * Validate that a string is a valid hex color
 */
export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

/**
 * Local storage key for persisting theme
 */
export const THEME_STORAGE_KEY = 'starter-pack-brand-theme';

/**
 * Load theme from localStorage
 */
export function loadThemeFromStorage(): BrandTheme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as BrandTheme;
  } catch {
    return null;
  }
}

/**
 * Save theme to localStorage
 */
export function saveThemeToStorage(theme: BrandTheme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch {
    console.error('Failed to save theme to localStorage');
  }
}
