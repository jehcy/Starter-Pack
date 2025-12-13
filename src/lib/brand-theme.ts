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

export interface SemanticColorTokens {
  // Backgrounds (60%)
  bgPrimary: string;
  bgSecondary: string;
  bgAccent: string;
  // Cards (30%)
  cardPrimary: string;
  cardSecondary: string;
  cardAccent: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  // Button Fill
  buttonFillPrimary: string;
  buttonFillPrimaryForeground: string;
  buttonFillSecondary: string;
  buttonFillSecondaryForeground: string;
  buttonFillAccent: string;
  buttonFillAccentForeground: string;
  // Button Outline
  buttonOutlinePrimary: string;
  buttonOutlinePrimaryForeground: string;
  buttonOutlineSecondary: string;
  buttonOutlineSecondaryForeground: string;
  buttonOutlineAccent: string;
  buttonOutlineAccentForeground: string;
  // Button Text
  buttonTextPrimary: string;
  buttonTextSecondary: string;
  buttonTextAccent: string;
}

export interface ResponsiveSpacingValue {
  desktop: string; // lg+ (1024px and up)
  tablet: string; // md (768px - 1023px)
  mobile: string; // below 768px
}

export interface SpacingTokens {
  // Scale tokens
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  // Responsive directional tokens
  px: ResponsiveSpacingValue; // horizontal padding for containers
  py: ResponsiveSpacingValue; // vertical padding for sections
  spaceX: ResponsiveSpacingValue; // horizontal gap between elements
  spaceY: ResponsiveSpacingValue; // vertical gap between elements
  p: ResponsiveSpacingValue; // global div padding
}

export interface RadiusTokens {
  global: string;   // Master control - base radius for all elements
  card: string;     // Cards, dialogs, containers
  button: string;   // Buttons
  input: string;    // Inputs, selects, textareas
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

export interface BrandAsset {
  id: string;
  url: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  uploadedAt: number;
  alt?: string;
}

export interface VideoAsset extends BrandAsset {
  type: 'upload' | 'embed';
  embedUrl?: string;
  duration?: number;
}

export interface BrandAssets {
  logo: BrandAsset | null;
  logoDark: BrandAsset | null;
  favicon: BrandAsset | null;
  ogImage: BrandAsset | null;
  heroImages: BrandAsset[];
  productImages: BrandAsset[];
  videos: VideoAsset[];
}

export const DEFAULT_BRAND_ASSETS: BrandAssets = {
  logo: null,
  logoDark: null,
  favicon: null,
  ogImage: null,
  heroImages: [],
  productImages: [],
  videos: [],
};

export interface BrandTheme {
  name: string;
  colors: {
    light: ColorTokens;
    dark: ColorTokens;
  };
  semanticColors: {
    light: SemanticColorTokens;
    dark: SemanticColorTokens;
  };
  spacing: SpacingTokens;
  radius: RadiusTokens;
  fonts: FontTokens;
  typographySizes: TypographySizeTokens;
  typographyStyles: TypographyStyleTokens;
  buttons: ButtonTokens;
  assets: BrandAssets;
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

export const DEFAULT_SEMANTIC_LIGHT_COLORS: SemanticColorTokens = {
  // Backgrounds (60%)
  bgPrimary: '#ffffff',
  bgSecondary: '#f8fafc',
  bgAccent: '#f1f5f9',
  // Cards (30%)
  cardPrimary: '#ffffff',
  cardSecondary: '#f8fafc',
  cardAccent: '#e2e8f0',
  // Text
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textAccent: '#64748b',
  // Button Fill
  buttonFillPrimary: '#2563eb',
  buttonFillPrimaryForeground: '#ffffff',
  buttonFillSecondary: '#64748b',
  buttonFillSecondaryForeground: '#ffffff',
  buttonFillAccent: '#f59e0b',
  buttonFillAccentForeground: '#000000',
  // Button Outline
  buttonOutlinePrimary: '#2563eb',
  buttonOutlinePrimaryForeground: '#2563eb',
  buttonOutlineSecondary: '#64748b',
  buttonOutlineSecondaryForeground: '#64748b',
  buttonOutlineAccent: '#f59e0b',
  buttonOutlineAccentForeground: '#f59e0b',
  // Button Text
  buttonTextPrimary: '#2563eb',
  buttonTextSecondary: '#64748b',
  buttonTextAccent: '#f59e0b',
};

export const DEFAULT_SEMANTIC_DARK_COLORS: SemanticColorTokens = {
  // Backgrounds (60%)
  bgPrimary: '#0f172a',
  bgSecondary: '#1e293b',
  bgAccent: '#334155',
  // Cards (30%)
  cardPrimary: '#1e293b',
  cardSecondary: '#334155',
  cardAccent: '#475569',
  // Text
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textAccent: '#94a3b8',
  // Button Fill
  buttonFillPrimary: '#3b82f6',
  buttonFillPrimaryForeground: '#ffffff',
  buttonFillSecondary: '#94a3b8',
  buttonFillSecondaryForeground: '#0f172a',
  buttonFillAccent: '#fbbf24',
  buttonFillAccentForeground: '#000000',
  // Button Outline
  buttonOutlinePrimary: '#3b82f6',
  buttonOutlinePrimaryForeground: '#3b82f6',
  buttonOutlineSecondary: '#94a3b8',
  buttonOutlineSecondaryForeground: '#94a3b8',
  buttonOutlineAccent: '#fbbf24',
  buttonOutlineAccentForeground: '#fbbf24',
  // Button Text
  buttonTextPrimary: '#3b82f6',
  buttonTextSecondary: '#94a3b8',
  buttonTextAccent: '#fbbf24',
};

export const DEFAULT_SPACING: SpacingTokens = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  // Responsive directional defaults
  px: { desktop: '1.5rem', tablet: '1rem', mobile: '0.75rem' },
  py: { desktop: '6rem', tablet: '4rem', mobile: '3rem' },
  spaceX: { desktop: '1rem', tablet: '0.75rem', mobile: '0.5rem' },
  spaceY: { desktop: '1.5rem', tablet: '1rem', mobile: '0.75rem' },
  p: { desktop: '1.5rem', tablet: '1rem', mobile: '0.75rem' },
};

export const DEFAULT_RADIUS: RadiusTokens = {
  global: '0.5rem',
  card: '0.75rem',
  button: '0.5rem',
  input: '0.5rem',
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
    semanticColors: {
      light: { ...DEFAULT_SEMANTIC_LIGHT_COLORS },
      dark: { ...DEFAULT_SEMANTIC_DARK_COLORS },
    },
    spacing: { ...DEFAULT_SPACING },
    radius: { ...DEFAULT_RADIUS },
    fonts: { ...DEFAULT_FONTS },
    typographySizes: { ...DEFAULT_TYPOGRAPHY_SIZES },
    typographyStyles: { ...DEFAULT_TYPOGRAPHY_STYLES },
    buttons: { ...DEFAULT_BUTTONS },
    assets: { ...DEFAULT_BRAND_ASSETS },
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
  --radius: ${theme.radius.global};
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
 * Semantic color key to CSS variable name mapping
 */
const SEMANTIC_COLOR_TO_CSS_VAR: Record<keyof SemanticColorTokens, string> = {
  // Backgrounds
  bgPrimary: 'bg-primary',
  bgSecondary: 'bg-secondary',
  bgAccent: 'bg-accent',
  // Cards
  cardPrimary: 'card-primary',
  cardSecondary: 'card-secondary',
  cardAccent: 'card-accent',
  // Text
  textPrimary: 'text-primary',
  textSecondary: 'text-secondary',
  textAccent: 'text-accent',
  // Button Fill
  buttonFillPrimary: 'btn-fill-primary',
  buttonFillPrimaryForeground: 'btn-fill-primary-foreground',
  buttonFillSecondary: 'btn-fill-secondary',
  buttonFillSecondaryForeground: 'btn-fill-secondary-foreground',
  buttonFillAccent: 'btn-fill-accent',
  buttonFillAccentForeground: 'btn-fill-accent-foreground',
  // Button Outline
  buttonOutlinePrimary: 'btn-outline-primary',
  buttonOutlinePrimaryForeground: 'btn-outline-primary-foreground',
  buttonOutlineSecondary: 'btn-outline-secondary',
  buttonOutlineSecondaryForeground: 'btn-outline-secondary-foreground',
  buttonOutlineAccent: 'btn-outline-accent',
  buttonOutlineAccentForeground: 'btn-outline-accent-foreground',
  // Button Text
  buttonTextPrimary: 'btn-text-primary',
  buttonTextSecondary: 'btn-text-secondary',
  buttonTextAccent: 'btn-text-accent',
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

  // Generate semantic color variables (light)
  const semanticLightVars = Object.entries(theme.semanticColors.light)
    .map(([key, value]) => {
      const cssVar = SEMANTIC_COLOR_TO_CSS_VAR[key as keyof SemanticColorTokens];
      return `  --${cssVar}: ${value};`;
    })
    .join('\n');

  // Generate semantic color variables (dark)
  const semanticDarkVars = Object.entries(theme.semanticColors.dark)
    .map(([key, value]) => {
      const cssVar = SEMANTIC_COLOR_TO_CSS_VAR[key as keyof SemanticColorTokens];
      return `  --${cssVar}: ${value};`;
    })
    .join('\n');

  // Generate spacing variables
  const spacingVars = Object.entries(theme.spacing)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      // Handle responsive values (use desktop as default for globals.css)
      const cssValue = typeof value === 'string' ? value : value.desktop;
      return `  --spacing-${cssKey}: ${cssValue};`;
    })
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

  /* Semantic Colors - 60-30-10 Design System (Light Mode) */
${semanticLightVars}

  /* Brand Spacing */
${spacingVars}

  /* Brand Radius */
  --radius: ${theme.radius.global};
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

  /* Semantic Colors - 60-30-10 Design System (Dark Mode) */
${semanticDarkVars}

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
 * Load theme from localStorage with proper migration for missing properties
 */
export function loadThemeFromStorage(): BrandTheme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<BrandTheme>;

    // Merge with defaults to ensure all properties exist (handles schema updates)
    const defaultTheme = getDefaultTheme();
    return {
      name: parsed.name ?? defaultTheme.name,
      colors: {
        light: { ...defaultTheme.colors.light, ...parsed.colors?.light },
        dark: { ...defaultTheme.colors.dark, ...parsed.colors?.dark },
      },
      semanticColors: {
        light: { ...defaultTheme.semanticColors.light, ...parsed.semanticColors?.light },
        dark: { ...defaultTheme.semanticColors.dark, ...parsed.semanticColors?.dark },
      },
      spacing: { ...defaultTheme.spacing, ...parsed.spacing },
      radius: { ...defaultTheme.radius, ...parsed.radius },
      fonts: { ...defaultTheme.fonts, ...parsed.fonts },
      typographySizes: { ...defaultTheme.typographySizes, ...parsed.typographySizes },
      typographyStyles: { ...defaultTheme.typographyStyles, ...parsed.typographyStyles },
      buttons: { ...defaultTheme.buttons, ...parsed.buttons },
      assets: { ...defaultTheme.assets, ...parsed.assets },
    };
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

/**
 * Apply theme variables directly to the DOM for instant visual feedback
 * This applies the theme to the current page immediately without waiting for file writes
 */
export function applyThemeToDOM(theme: BrandTheme): void {
  if (typeof window === 'undefined') return;

  // Dynamically load Google Fonts if needed
  import('./font-loader').then(({ loadGoogleFonts }) => {
    loadGoogleFonts(theme.fonts);
  });

  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const colors = isDark ? theme.colors.dark : theme.colors.light;

  // Apply color variables
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = COLOR_TO_CSS_VAR[key as keyof ColorTokens];
    root.style.setProperty(`--${cssVar}`, value);
  });

  // Apply semantic color variables
  const semanticColors = isDark ? theme.semanticColors.dark : theme.semanticColors.light;
  Object.entries(semanticColors).forEach(([key, value]) => {
    const cssVar = SEMANTIC_COLOR_TO_CSS_VAR[key as keyof SemanticColorTokens];
    root.style.setProperty(`--${cssVar}`, value);
  });

  // Apply spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    // Handle responsive values (use desktop as default)
    const cssValue = typeof value === 'string' ? value : value.desktop;
    root.style.setProperty(`--spacing-${cssKey}`, cssValue);
  });

  // Apply radius variables
  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  // Apply font variables
  root.style.setProperty('--font-sans', theme.fonts.sans);
  root.style.setProperty('--font-mono', theme.fonts.mono);
  root.style.setProperty('--font-heading', theme.fonts.heading);

  // Apply typography size variables
  Object.entries(theme.typographySizes).forEach(([key, value]) => {
    root.style.setProperty(`--text-${key}`, value);
  });

  // Apply typography style variables
  root.style.setProperty('--line-height', theme.typographyStyles.lineHeight);
  root.style.setProperty('--line-height-h1', theme.typographyStyles.lineHeightH1);
  root.style.setProperty('--line-height-h2', theme.typographyStyles.lineHeightH2);
  root.style.setProperty('--line-height-h3', theme.typographyStyles.lineHeightH3);
  root.style.setProperty('--letter-spacing', `${theme.typographyStyles.letterSpacing}em`);

  // Apply button variables (use radius values from radius tokens)
  root.style.setProperty('--button-radius', theme.radius.button);
  root.style.setProperty('--button-font-weight', theme.buttons.fontWeight);
  root.style.setProperty('--button-font-size', theme.buttons.fontSize);
  root.style.setProperty('--button-hover-effect', theme.buttons.hoverEffect);
  root.style.setProperty('--input-button-radius', theme.radius.input);
  root.style.setProperty('--input-button-font-weight', theme.buttons.inputFontWeight);
}
