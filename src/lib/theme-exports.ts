/**
 * Theme Export Generators
 * Functions for generating various export formats from BrandTheme
 */

import JSZip from 'jszip';
import type { BrandTheme } from '@/lib/brand-theme';
import { generateCssPreview } from '@/lib/brand-theme';

// ============================================
// 1. Tokens JSON Generator
// ============================================

export interface DesignTokens {
  $schema: string;
  name: string;
  colors: {
    light: Record<string, { value: string; type: string }>;
    dark: Record<string, { value: string; type: string }>;
  };
  spacing: Record<string, { value: string; type: string }>;
  radius: Record<string, { value: string; type: string }>;
  fonts: Record<string, { value: string; type: string }>;
  typography: {
    sizes: Record<string, { value: string; type: string }>;
    styles: Record<string, { value: string; type: string }>;
  };
  buttons: Record<string, { value: string; type: string }>;
}

export function generateTokensJson(theme: BrandTheme): string {
  const tokens: DesignTokens = {
    $schema: 'https://design-tokens.json-schema.org/',
    name: theme.name || 'VibeCN Theme',
    colors: {
      light: Object.fromEntries(
        Object.entries(theme.colors.light).map(([key, value]) => [
          key,
          { value, type: 'color' },
        ])
      ),
      dark: Object.fromEntries(
        Object.entries(theme.colors.dark).map(([key, value]) => [
          key,
          { value, type: 'color' },
        ])
      ),
    },
    spacing: Object.fromEntries(
      Object.entries(theme.spacing).flatMap(([key, value]) => {
        // Handle responsive values by expanding to desktop/tablet/mobile
        if (typeof value === 'object' && 'desktop' in value) {
          return [
            [`${key}-desktop`, { value: value.desktop, type: 'dimension' }],
            [`${key}-tablet`, { value: value.tablet, type: 'dimension' }],
            [`${key}-mobile`, { value: value.mobile, type: 'dimension' }],
          ];
        }
        // Handle simple string values
        return [[key, { value, type: 'dimension' }]];
      })
    ),
    radius: Object.fromEntries(
      Object.entries(theme.radius).map(([key, value]) => [
        key,
        { value, type: 'dimension' },
      ])
    ),
    fonts: Object.fromEntries(
      Object.entries(theme.fonts).map(([key, value]) => [
        key,
        { value, type: 'fontFamily' },
      ])
    ),
    typography: {
      sizes: Object.fromEntries(
        Object.entries(theme.typographySizes).map(([key, value]) => [
          key,
          { value, type: 'dimension' },
        ])
      ),
      styles: {
        lineHeight: {
          value: theme.typographyStyles.lineHeight,
          type: 'number',
        },
        lineHeightH1: {
          value: theme.typographyStyles.lineHeightH1,
          type: 'number',
        },
        lineHeightH2: {
          value: theme.typographyStyles.lineHeightH2,
          type: 'number',
        },
        lineHeightH3: {
          value: theme.typographyStyles.lineHeightH3,
          type: 'number',
        },
        letterSpacing: {
          value: `${theme.typographyStyles.letterSpacing}em`,
          type: 'dimension',
        },
      },
    },
    buttons: {
      borderRadius: { value: theme.buttons.borderRadius, type: 'dimension' },
      fontWeight: { value: theme.buttons.fontWeight, type: 'fontWeight' },
      fontSize: { value: theme.buttons.fontSize, type: 'dimension' },
      hoverEffect: { value: theme.buttons.hoverEffect, type: 'string' },
      inputBorderRadius: {
        value: theme.buttons.inputBorderRadius,
        type: 'dimension',
      },
      inputFontWeight: {
        value: theme.buttons.inputFontWeight,
        type: 'fontWeight',
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}

// ============================================
// 2. Tailwind Config Generator (v3)
// ============================================

export function generateTailwindV3Config(theme: BrandTheme): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        heading: ['var(--font-heading)'],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        // Directional spacing (responsive via CSS variables)
        px: 'var(--spacing-px)',
        py: 'var(--spacing-py)',
        'space-x': 'var(--spacing-space-x)',
        'space-y': 'var(--spacing-space-y)',
        // Global padding (responsive via CSS variables)
        p: 'var(--spacing-p)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        DEFAULT: 'var(--radius-lg)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      fontSize: {
        h1: 'var(--text-h1)',
        h2: 'var(--text-h2)',
        h3: 'var(--text-h3)',
        h4: 'var(--text-h4)',
        p: 'var(--text-p)',
        blockquote: 'var(--text-blockquote)',
        label: 'var(--text-label)',
        code: 'var(--text-code)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
`;
}

export function generateTailwindDirectives(theme: BrandTheme): string {
  return `/* Tailwind CSS Directives
 * Place this at the top of your globals.css file
 */
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
}

export async function generateTailwindConfigZip(
  theme: BrandTheme
): Promise<Blob> {
  const zip = new JSZip();

  // Add Tailwind v3 config
  zip.file('tailwind.config.js', generateTailwindV3Config(theme));

  // Add Tailwind CSS directives
  zip.file('tailwind-directives.css', generateTailwindDirectives(theme));

  // Add README
  zip.file(
    'README.md',
    `# Tailwind CSS v3 Configuration

This package includes Tailwind CSS v3 configuration files.

## Usage

1. Copy \`tailwind.config.js\` to your project root
2. Copy the Tailwind directives from \`tailwind-directives.css\` to the top of your \`globals.css\` file
3. Download the "globals.css" export option for the complete CSS variable definitions

## Files Included

- \`tailwind.config.js\` - Tailwind v3 configuration with theme extensions
- \`tailwind-directives.css\` - Basic Tailwind directives (@tailwind base, components, utilities)

## CSS Variables

The configuration expects CSS variables to be defined in your globals.css file.
Download the "globals.css" export option for the complete CSS variable definitions.
`
  );

  return zip.generateAsync({ type: 'blob' });
}

// ============================================
// 3. shadcn-UI Theme File Generator
// ============================================

export function generateShadcnThemeTs(theme: BrandTheme): string {
  return `/**
 * shadcn/ui Theme Configuration
 * Generated by VibeCN Theme Editor
 *
 * This file exports theme tokens for use with shadcn/ui components.
 * Import these values when you need programmatic access to your theme.
 */

export const theme = {
  name: '${theme.name || 'VibeCN Theme'}',

  colors: {
    light: {
      background: '${theme.colors.light.background}',
      foreground: '${theme.colors.light.foreground}',
      primary: '${theme.colors.light.primary}',
      primaryForeground: '${theme.colors.light.primaryForeground}',
      secondary: '${theme.colors.light.secondary}',
      secondaryForeground: '${theme.colors.light.secondaryForeground}',
      accent: '${theme.colors.light.accent}',
      accentForeground: '${theme.colors.light.accentForeground}',
      muted: '${theme.colors.light.muted}',
      mutedForeground: '${theme.colors.light.mutedForeground}',
      destructive: '${theme.colors.light.destructive}',
      destructiveForeground: '${theme.colors.light.destructiveForeground}',
      card: '${theme.colors.light.card}',
      cardForeground: '${theme.colors.light.cardForeground}',
      popover: '${theme.colors.light.popover}',
      popoverForeground: '${theme.colors.light.popoverForeground}',
      border: '${theme.colors.light.border}',
      input: '${theme.colors.light.input}',
      ring: '${theme.colors.light.ring}',
      chart1: '${theme.colors.light.chart1}',
      chart2: '${theme.colors.light.chart2}',
      chart3: '${theme.colors.light.chart3}',
      chart4: '${theme.colors.light.chart4}',
      chart5: '${theme.colors.light.chart5}',
    },
    dark: {
      background: '${theme.colors.dark.background}',
      foreground: '${theme.colors.dark.foreground}',
      primary: '${theme.colors.dark.primary}',
      primaryForeground: '${theme.colors.dark.primaryForeground}',
      secondary: '${theme.colors.dark.secondary}',
      secondaryForeground: '${theme.colors.dark.secondaryForeground}',
      accent: '${theme.colors.dark.accent}',
      accentForeground: '${theme.colors.dark.accentForeground}',
      muted: '${theme.colors.dark.muted}',
      mutedForeground: '${theme.colors.dark.mutedForeground}',
      destructive: '${theme.colors.dark.destructive}',
      destructiveForeground: '${theme.colors.dark.destructiveForeground}',
      card: '${theme.colors.dark.card}',
      cardForeground: '${theme.colors.dark.cardForeground}',
      popover: '${theme.colors.dark.popover}',
      popoverForeground: '${theme.colors.dark.popoverForeground}',
      border: '${theme.colors.dark.border}',
      input: '${theme.colors.dark.input}',
      ring: '${theme.colors.dark.ring}',
      chart1: '${theme.colors.dark.chart1}',
      chart2: '${theme.colors.dark.chart2}',
      chart3: '${theme.colors.dark.chart3}',
      chart4: '${theme.colors.dark.chart4}',
      chart5: '${theme.colors.dark.chart5}',
    },
  },

  spacing: {
    xs: '${theme.spacing.xs}',
    sm: '${theme.spacing.sm}',
    md: '${theme.spacing.md}',
    lg: '${theme.spacing.lg}',
    xl: '${theme.spacing.xl}',
    '2xl': '${theme.spacing['2xl']}',
    // Responsive directional spacing (desktop, tablet, mobile)
    px: {
      desktop: '${theme.spacing.px.desktop}',
      tablet: '${theme.spacing.px.tablet}',
      mobile: '${theme.spacing.px.mobile}',
    },
    py: {
      desktop: '${theme.spacing.py.desktop}',
      tablet: '${theme.spacing.py.tablet}',
      mobile: '${theme.spacing.py.mobile}',
    },
    spaceX: {
      desktop: '${theme.spacing.spaceX.desktop}',
      tablet: '${theme.spacing.spaceX.tablet}',
      mobile: '${theme.spacing.spaceX.mobile}',
    },
    spaceY: {
      desktop: '${theme.spacing.spaceY.desktop}',
      tablet: '${theme.spacing.spaceY.tablet}',
      mobile: '${theme.spacing.spaceY.mobile}',
    },
    // Responsive global padding (desktop, tablet, mobile)
    p: {
      desktop: '${theme.spacing.p.desktop}',
      tablet: '${theme.spacing.p.tablet}',
      mobile: '${theme.spacing.p.mobile}',
    },
  },

  radius: {
    none: '${theme.radius.none}',
    sm: '${theme.radius.sm}',
    md: '${theme.radius.md}',
    lg: '${theme.radius.lg}',
    xl: '${theme.radius.xl}',
    '2xl': '${theme.radius['2xl']}',
    full: '${theme.radius.full}',
  },

  fonts: {
    sans: '${theme.fonts.sans}',
    mono: '${theme.fonts.mono}',
    heading: '${theme.fonts.heading}',
  },

  typography: {
    sizes: {
      h1: '${theme.typographySizes.h1}',
      h2: '${theme.typographySizes.h2}',
      h3: '${theme.typographySizes.h3}',
      h4: '${theme.typographySizes.h4}',
      p: '${theme.typographySizes.p}',
      blockquote: '${theme.typographySizes.blockquote}',
      label: '${theme.typographySizes.label}',
      code: '${theme.typographySizes.code}',
      table: '${theme.typographySizes.table}',
      list: '${theme.typographySizes.list}',
    },
    styles: {
      lineHeight: '${theme.typographyStyles.lineHeight}',
      lineHeightH1: '${theme.typographyStyles.lineHeightH1}',
      lineHeightH2: '${theme.typographyStyles.lineHeightH2}',
      lineHeightH3: '${theme.typographyStyles.lineHeightH3}',
      letterSpacing: '${theme.typographyStyles.letterSpacing}',
    },
  },

  buttons: {
    borderRadius: '${theme.buttons.borderRadius}',
    fontWeight: '${theme.buttons.fontWeight}',
    fontSize: '${theme.buttons.fontSize}',
    hoverEffect: '${theme.buttons.hoverEffect}',
    inputBorderRadius: '${theme.buttons.inputBorderRadius}',
    inputFontWeight: '${theme.buttons.inputFontWeight}',
  },
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
export type ThemeRadius = typeof theme.radius;
`;
}

// ============================================
// 4. globals.css Generator (standalone)
// ============================================

export function generateGlobalsCssFile(theme: BrandTheme): string {
  return generateCssPreview(theme);
}

// ============================================
// 5. Brand Skill Markdown - Re-export
// ============================================

export { generateBrandSkill } from '@/lib/project-generator';

// ============================================
// 6. Vue.js CSS Variables Generator
// ============================================

export function generateVueCssVars(theme: BrandTheme): string {
  return `/* VibeCN Theme: ${theme.name || 'VibeCN Theme'}
 * Generated for Vue.js projects
 *
 * Usage:
 * 1. Import in main.js/ts: import './theme-vars.css'
 * 2. Use in components: var(--vibecn-primary)
 */

:root {
  /* ===== Colors - Light Mode ===== */
  --vibecn-background: ${theme.colors.light.background};
  --vibecn-foreground: ${theme.colors.light.foreground};
  --vibecn-primary: ${theme.colors.light.primary};
  --vibecn-primary-foreground: ${theme.colors.light.primaryForeground};
  --vibecn-secondary: ${theme.colors.light.secondary};
  --vibecn-secondary-foreground: ${theme.colors.light.secondaryForeground};
  --vibecn-accent: ${theme.colors.light.accent};
  --vibecn-accent-foreground: ${theme.colors.light.accentForeground};
  --vibecn-muted: ${theme.colors.light.muted};
  --vibecn-muted-foreground: ${theme.colors.light.mutedForeground};
  --vibecn-destructive: ${theme.colors.light.destructive};
  --vibecn-destructive-foreground: ${theme.colors.light.destructiveForeground};
  --vibecn-card: ${theme.colors.light.card};
  --vibecn-card-foreground: ${theme.colors.light.cardForeground};
  --vibecn-popover: ${theme.colors.light.popover};
  --vibecn-popover-foreground: ${theme.colors.light.popoverForeground};
  --vibecn-border: ${theme.colors.light.border};
  --vibecn-input: ${theme.colors.light.input};
  --vibecn-ring: ${theme.colors.light.ring};
  --vibecn-chart-1: ${theme.colors.light.chart1};
  --vibecn-chart-2: ${theme.colors.light.chart2};
  --vibecn-chart-3: ${theme.colors.light.chart3};
  --vibecn-chart-4: ${theme.colors.light.chart4};
  --vibecn-chart-5: ${theme.colors.light.chart5};

  /* ===== Spacing ===== */
  --vibecn-spacing-xs: ${theme.spacing.xs};
  --vibecn-spacing-sm: ${theme.spacing.sm};
  --vibecn-spacing-md: ${theme.spacing.md};
  --vibecn-spacing-lg: ${theme.spacing.lg};
  --vibecn-spacing-xl: ${theme.spacing.xl};
  --vibecn-spacing-2xl: ${theme.spacing['2xl']};

  /* Responsive Spacing (Desktop) */
  --vibecn-spacing-px: ${theme.spacing.px.desktop};
  --vibecn-spacing-py: ${theme.spacing.py.desktop};
  --vibecn-spacing-x: ${theme.spacing.spaceX.desktop};
  --vibecn-spacing-y: ${theme.spacing.spaceY.desktop};
  --vibecn-spacing-p: ${theme.spacing.p.desktop};

  /* ===== Border Radius ===== */
  --vibecn-radius-none: ${theme.radius.none};
  --vibecn-radius-sm: ${theme.radius.sm};
  --vibecn-radius-md: ${theme.radius.md};
  --vibecn-radius-lg: ${theme.radius.lg};
  --vibecn-radius-xl: ${theme.radius.xl};
  --vibecn-radius-2xl: ${theme.radius['2xl']};
  --vibecn-radius-full: ${theme.radius.full};

  /* ===== Typography Sizes ===== */
  --vibecn-text-h1: ${theme.typographySizes.h1};
  --vibecn-text-h2: ${theme.typographySizes.h2};
  --vibecn-text-h3: ${theme.typographySizes.h3};
  --vibecn-text-h4: ${theme.typographySizes.h4};
  --vibecn-text-p: ${theme.typographySizes.p};
  --vibecn-text-blockquote: ${theme.typographySizes.blockquote};
  --vibecn-text-label: ${theme.typographySizes.label};
  --vibecn-text-code: ${theme.typographySizes.code};
  --vibecn-text-table: ${theme.typographySizes.table};
  --vibecn-text-list: ${theme.typographySizes.list};

  /* ===== Typography Styles ===== */
  --vibecn-line-height: ${theme.typographyStyles.lineHeight};
  --vibecn-line-height-h1: ${theme.typographyStyles.lineHeightH1};
  --vibecn-line-height-h2: ${theme.typographyStyles.lineHeightH2};
  --vibecn-line-height-h3: ${theme.typographyStyles.lineHeightH3};
  --vibecn-letter-spacing: ${theme.typographyStyles.letterSpacing}em;

  /* ===== Fonts ===== */
  --vibecn-font-sans: ${theme.fonts.sans};
  --vibecn-font-mono: ${theme.fonts.mono};
  --vibecn-font-heading: ${theme.fonts.heading};

  /* ===== Buttons ===== */
  --vibecn-button-radius: ${theme.buttons.borderRadius};
  --vibecn-button-font-weight: ${theme.buttons.fontWeight};
  --vibecn-button-font-size: ${theme.buttons.fontSize};
  --vibecn-input-button-radius: ${theme.buttons.inputBorderRadius};
  --vibecn-input-button-font-weight: ${theme.buttons.inputFontWeight};
}

/* ===== Dark Mode ===== */
.dark,
[data-theme="dark"] {
  --vibecn-background: ${theme.colors.dark.background};
  --vibecn-foreground: ${theme.colors.dark.foreground};
  --vibecn-primary: ${theme.colors.dark.primary};
  --vibecn-primary-foreground: ${theme.colors.dark.primaryForeground};
  --vibecn-secondary: ${theme.colors.dark.secondary};
  --vibecn-secondary-foreground: ${theme.colors.dark.secondaryForeground};
  --vibecn-accent: ${theme.colors.dark.accent};
  --vibecn-accent-foreground: ${theme.colors.dark.accentForeground};
  --vibecn-muted: ${theme.colors.dark.muted};
  --vibecn-muted-foreground: ${theme.colors.dark.mutedForeground};
  --vibecn-destructive: ${theme.colors.dark.destructive};
  --vibecn-destructive-foreground: ${theme.colors.dark.destructiveForeground};
  --vibecn-card: ${theme.colors.dark.card};
  --vibecn-card-foreground: ${theme.colors.dark.cardForeground};
  --vibecn-popover: ${theme.colors.dark.popover};
  --vibecn-popover-foreground: ${theme.colors.dark.popoverForeground};
  --vibecn-border: ${theme.colors.dark.border};
  --vibecn-input: ${theme.colors.dark.input};
  --vibecn-ring: ${theme.colors.dark.ring};
  --vibecn-chart-1: ${theme.colors.dark.chart1};
  --vibecn-chart-2: ${theme.colors.dark.chart2};
  --vibecn-chart-3: ${theme.colors.dark.chart3};
  --vibecn-chart-4: ${theme.colors.dark.chart4};
  --vibecn-chart-5: ${theme.colors.dark.chart5};
}

/* ===== Responsive Spacing - Tablet ===== */
@media (max-width: 1023px) and (min-width: 768px) {
  :root {
    --vibecn-spacing-px: ${theme.spacing.px.tablet};
    --vibecn-spacing-py: ${theme.spacing.py.tablet};
    --vibecn-spacing-x: ${theme.spacing.spaceX.tablet};
    --vibecn-spacing-y: ${theme.spacing.spaceY.tablet};
    --vibecn-spacing-p: ${theme.spacing.p.tablet};
  }
}

/* ===== Responsive Spacing - Mobile ===== */
@media (max-width: 767px) {
  :root {
    --vibecn-spacing-px: ${theme.spacing.px.mobile};
    --vibecn-spacing-py: ${theme.spacing.py.mobile};
    --vibecn-spacing-x: ${theme.spacing.spaceX.mobile};
    --vibecn-spacing-y: ${theme.spacing.spaceY.mobile};
    --vibecn-spacing-p: ${theme.spacing.p.mobile};
  }
}
`;
}

// ============================================
// 7. Java Constants Class Generator
// ============================================

export function generateJavaConstants(theme: BrandTheme): string {
  return `/**
 * VibeCN Theme Constants: ${theme.name || 'VibeCN Theme'}
 * Generated by VibeCN Theme Editor
 *
 * Usage:
 *   String primaryColor = ThemeConstants.PRIMARY;
 *   String spacing = ThemeConstants.SPACING_MD;
 */
public final class ThemeConstants {

    private ThemeConstants() {
        // Prevent instantiation
    }

    // ========================================
    // Colors - Light Mode
    // ========================================

    public static final String BACKGROUND = "${theme.colors.light.background}";
    public static final String FOREGROUND = "${theme.colors.light.foreground}";
    public static final String PRIMARY = "${theme.colors.light.primary}";
    public static final String PRIMARY_FOREGROUND = "${theme.colors.light.primaryForeground}";
    public static final String SECONDARY = "${theme.colors.light.secondary}";
    public static final String SECONDARY_FOREGROUND = "${theme.colors.light.secondaryForeground}";
    public static final String ACCENT = "${theme.colors.light.accent}";
    public static final String ACCENT_FOREGROUND = "${theme.colors.light.accentForeground}";
    public static final String MUTED = "${theme.colors.light.muted}";
    public static final String MUTED_FOREGROUND = "${theme.colors.light.mutedForeground}";
    public static final String DESTRUCTIVE = "${theme.colors.light.destructive}";
    public static final String DESTRUCTIVE_FOREGROUND = "${theme.colors.light.destructiveForeground}";
    public static final String CARD = "${theme.colors.light.card}";
    public static final String CARD_FOREGROUND = "${theme.colors.light.cardForeground}";
    public static final String POPOVER = "${theme.colors.light.popover}";
    public static final String POPOVER_FOREGROUND = "${theme.colors.light.popoverForeground}";
    public static final String BORDER = "${theme.colors.light.border}";
    public static final String INPUT = "${theme.colors.light.input}";
    public static final String RING = "${theme.colors.light.ring}";
    public static final String CHART_1 = "${theme.colors.light.chart1}";
    public static final String CHART_2 = "${theme.colors.light.chart2}";
    public static final String CHART_3 = "${theme.colors.light.chart3}";
    public static final String CHART_4 = "${theme.colors.light.chart4}";
    public static final String CHART_5 = "${theme.colors.light.chart5}";

    // ========================================
    // Colors - Dark Mode
    // ========================================

    public static final String DARK_BACKGROUND = "${theme.colors.dark.background}";
    public static final String DARK_FOREGROUND = "${theme.colors.dark.foreground}";
    public static final String DARK_PRIMARY = "${theme.colors.dark.primary}";
    public static final String DARK_PRIMARY_FOREGROUND = "${theme.colors.dark.primaryForeground}";
    public static final String DARK_SECONDARY = "${theme.colors.dark.secondary}";
    public static final String DARK_SECONDARY_FOREGROUND = "${theme.colors.dark.secondaryForeground}";
    public static final String DARK_ACCENT = "${theme.colors.dark.accent}";
    public static final String DARK_ACCENT_FOREGROUND = "${theme.colors.dark.accentForeground}";
    public static final String DARK_MUTED = "${theme.colors.dark.muted}";
    public static final String DARK_MUTED_FOREGROUND = "${theme.colors.dark.mutedForeground}";
    public static final String DARK_DESTRUCTIVE = "${theme.colors.dark.destructive}";
    public static final String DARK_DESTRUCTIVE_FOREGROUND = "${theme.colors.dark.destructiveForeground}";
    public static final String DARK_CARD = "${theme.colors.dark.card}";
    public static final String DARK_CARD_FOREGROUND = "${theme.colors.dark.cardForeground}";
    public static final String DARK_POPOVER = "${theme.colors.dark.popover}";
    public static final String DARK_POPOVER_FOREGROUND = "${theme.colors.dark.popoverForeground}";
    public static final String DARK_BORDER = "${theme.colors.dark.border}";
    public static final String DARK_INPUT = "${theme.colors.dark.input}";
    public static final String DARK_RING = "${theme.colors.dark.ring}";
    public static final String DARK_CHART_1 = "${theme.colors.dark.chart1}";
    public static final String DARK_CHART_2 = "${theme.colors.dark.chart2}";
    public static final String DARK_CHART_3 = "${theme.colors.dark.chart3}";
    public static final String DARK_CHART_4 = "${theme.colors.dark.chart4}";
    public static final String DARK_CHART_5 = "${theme.colors.dark.chart5}";

    // ========================================
    // Spacing
    // ========================================

    public static final String SPACING_XS = "${theme.spacing.xs}";
    public static final String SPACING_SM = "${theme.spacing.sm}";
    public static final String SPACING_MD = "${theme.spacing.md}";
    public static final String SPACING_LG = "${theme.spacing.lg}";
    public static final String SPACING_XL = "${theme.spacing.xl}";
    public static final String SPACING_2XL = "${theme.spacing['2xl']}";

    // Responsive Spacing - Desktop
    public static final String SPACING_PX_DESKTOP = "${theme.spacing.px.desktop}";
    public static final String SPACING_PY_DESKTOP = "${theme.spacing.py.desktop}";
    public static final String SPACING_X_DESKTOP = "${theme.spacing.spaceX.desktop}";
    public static final String SPACING_Y_DESKTOP = "${theme.spacing.spaceY.desktop}";
    public static final String SPACING_P_DESKTOP = "${theme.spacing.p.desktop}";

    // Responsive Spacing - Tablet
    public static final String SPACING_PX_TABLET = "${theme.spacing.px.tablet}";
    public static final String SPACING_PY_TABLET = "${theme.spacing.py.tablet}";
    public static final String SPACING_X_TABLET = "${theme.spacing.spaceX.tablet}";
    public static final String SPACING_Y_TABLET = "${theme.spacing.spaceY.tablet}";
    public static final String SPACING_P_TABLET = "${theme.spacing.p.tablet}";

    // Responsive Spacing - Mobile
    public static final String SPACING_PX_MOBILE = "${theme.spacing.px.mobile}";
    public static final String SPACING_PY_MOBILE = "${theme.spacing.py.mobile}";
    public static final String SPACING_X_MOBILE = "${theme.spacing.spaceX.mobile}";
    public static final String SPACING_Y_MOBILE = "${theme.spacing.spaceY.mobile}";
    public static final String SPACING_P_MOBILE = "${theme.spacing.p.mobile}";

    // ========================================
    // Border Radius
    // ========================================

    public static final String RADIUS_NONE = "${theme.radius.none}";
    public static final String RADIUS_SM = "${theme.radius.sm}";
    public static final String RADIUS_MD = "${theme.radius.md}";
    public static final String RADIUS_LG = "${theme.radius.lg}";
    public static final String RADIUS_XL = "${theme.radius.xl}";
    public static final String RADIUS_2XL = "${theme.radius['2xl']}";
    public static final String RADIUS_FULL = "${theme.radius.full}";

    // ========================================
    // Typography Sizes
    // ========================================

    public static final String TEXT_H1 = "${theme.typographySizes.h1}";
    public static final String TEXT_H2 = "${theme.typographySizes.h2}";
    public static final String TEXT_H3 = "${theme.typographySizes.h3}";
    public static final String TEXT_H4 = "${theme.typographySizes.h4}";
    public static final String TEXT_P = "${theme.typographySizes.p}";
    public static final String TEXT_BLOCKQUOTE = "${theme.typographySizes.blockquote}";
    public static final String TEXT_LABEL = "${theme.typographySizes.label}";
    public static final String TEXT_CODE = "${theme.typographySizes.code}";
    public static final String TEXT_TABLE = "${theme.typographySizes.table}";
    public static final String TEXT_LIST = "${theme.typographySizes.list}";

    // ========================================
    // Typography Styles
    // ========================================

    public static final String LINE_HEIGHT = "${theme.typographyStyles.lineHeight}";
    public static final String LINE_HEIGHT_H1 = "${theme.typographyStyles.lineHeightH1}";
    public static final String LINE_HEIGHT_H2 = "${theme.typographyStyles.lineHeightH2}";
    public static final String LINE_HEIGHT_H3 = "${theme.typographyStyles.lineHeightH3}";
    public static final String LETTER_SPACING = "${theme.typographyStyles.letterSpacing}em";

    // ========================================
    // Fonts
    // ========================================

    public static final String FONT_SANS = "${theme.fonts.sans}";
    public static final String FONT_MONO = "${theme.fonts.mono}";
    public static final String FONT_HEADING = "${theme.fonts.heading}";

    // ========================================
    // Buttons
    // ========================================

    public static final String BUTTON_RADIUS = "${theme.buttons.borderRadius}";
    public static final String BUTTON_FONT_WEIGHT = "${theme.buttons.fontWeight}";
    public static final String BUTTON_FONT_SIZE = "${theme.buttons.fontSize}";
    public static final String BUTTON_HOVER_EFFECT = "${theme.buttons.hoverEffect}";
    public static final String INPUT_BUTTON_RADIUS = "${theme.buttons.inputBorderRadius}";
    public static final String INPUT_BUTTON_FONT_WEIGHT = "${theme.buttons.inputFontWeight}";
}
`;
}

// ============================================
// 8. Java Properties File Generator
// ============================================

export function generateJavaProperties(theme: BrandTheme): string {
  return `# VibeCN Theme: ${theme.name || 'VibeCN Theme'}
# Generated by VibeCN Theme Editor
#
# Usage in Spring Boot:
#   @Value("\${theme.colors.light.primary}")
#   private String primaryColor;

# ========================================
# Colors - Light Mode
# ========================================

theme.colors.light.background=${theme.colors.light.background}
theme.colors.light.foreground=${theme.colors.light.foreground}
theme.colors.light.primary=${theme.colors.light.primary}
theme.colors.light.primary-foreground=${theme.colors.light.primaryForeground}
theme.colors.light.secondary=${theme.colors.light.secondary}
theme.colors.light.secondary-foreground=${theme.colors.light.secondaryForeground}
theme.colors.light.accent=${theme.colors.light.accent}
theme.colors.light.accent-foreground=${theme.colors.light.accentForeground}
theme.colors.light.muted=${theme.colors.light.muted}
theme.colors.light.muted-foreground=${theme.colors.light.mutedForeground}
theme.colors.light.destructive=${theme.colors.light.destructive}
theme.colors.light.destructive-foreground=${theme.colors.light.destructiveForeground}
theme.colors.light.card=${theme.colors.light.card}
theme.colors.light.card-foreground=${theme.colors.light.cardForeground}
theme.colors.light.popover=${theme.colors.light.popover}
theme.colors.light.popover-foreground=${theme.colors.light.popoverForeground}
theme.colors.light.border=${theme.colors.light.border}
theme.colors.light.input=${theme.colors.light.input}
theme.colors.light.ring=${theme.colors.light.ring}
theme.colors.light.chart-1=${theme.colors.light.chart1}
theme.colors.light.chart-2=${theme.colors.light.chart2}
theme.colors.light.chart-3=${theme.colors.light.chart3}
theme.colors.light.chart-4=${theme.colors.light.chart4}
theme.colors.light.chart-5=${theme.colors.light.chart5}

# ========================================
# Colors - Dark Mode
# ========================================

theme.colors.dark.background=${theme.colors.dark.background}
theme.colors.dark.foreground=${theme.colors.dark.foreground}
theme.colors.dark.primary=${theme.colors.dark.primary}
theme.colors.dark.primary-foreground=${theme.colors.dark.primaryForeground}
theme.colors.dark.secondary=${theme.colors.dark.secondary}
theme.colors.dark.secondary-foreground=${theme.colors.dark.secondaryForeground}
theme.colors.dark.accent=${theme.colors.dark.accent}
theme.colors.dark.accent-foreground=${theme.colors.dark.accentForeground}
theme.colors.dark.muted=${theme.colors.dark.muted}
theme.colors.dark.muted-foreground=${theme.colors.dark.mutedForeground}
theme.colors.dark.destructive=${theme.colors.dark.destructive}
theme.colors.dark.destructive-foreground=${theme.colors.dark.destructiveForeground}
theme.colors.dark.card=${theme.colors.dark.card}
theme.colors.dark.card-foreground=${theme.colors.dark.cardForeground}
theme.colors.dark.popover=${theme.colors.dark.popover}
theme.colors.dark.popover-foreground=${theme.colors.dark.popoverForeground}
theme.colors.dark.border=${theme.colors.dark.border}
theme.colors.dark.input=${theme.colors.dark.input}
theme.colors.dark.ring=${theme.colors.dark.ring}
theme.colors.dark.chart-1=${theme.colors.dark.chart1}
theme.colors.dark.chart-2=${theme.colors.dark.chart2}
theme.colors.dark.chart-3=${theme.colors.dark.chart3}
theme.colors.dark.chart-4=${theme.colors.dark.chart4}
theme.colors.dark.chart-5=${theme.colors.dark.chart5}

# ========================================
# Spacing
# ========================================

theme.spacing.xs=${theme.spacing.xs}
theme.spacing.sm=${theme.spacing.sm}
theme.spacing.md=${theme.spacing.md}
theme.spacing.lg=${theme.spacing.lg}
theme.spacing.xl=${theme.spacing.xl}
theme.spacing.2xl=${theme.spacing['2xl']}

# Responsive Spacing - Desktop
theme.spacing.px.desktop=${theme.spacing.px.desktop}
theme.spacing.py.desktop=${theme.spacing.py.desktop}
theme.spacing.space-x.desktop=${theme.spacing.spaceX.desktop}
theme.spacing.space-y.desktop=${theme.spacing.spaceY.desktop}
theme.spacing.p.desktop=${theme.spacing.p.desktop}

# Responsive Spacing - Tablet
theme.spacing.px.tablet=${theme.spacing.px.tablet}
theme.spacing.py.tablet=${theme.spacing.py.tablet}
theme.spacing.space-x.tablet=${theme.spacing.spaceX.tablet}
theme.spacing.space-y.tablet=${theme.spacing.spaceY.tablet}
theme.spacing.p.tablet=${theme.spacing.p.tablet}

# Responsive Spacing - Mobile
theme.spacing.px.mobile=${theme.spacing.px.mobile}
theme.spacing.py.mobile=${theme.spacing.py.mobile}
theme.spacing.space-x.mobile=${theme.spacing.spaceX.mobile}
theme.spacing.space-y.mobile=${theme.spacing.spaceY.mobile}
theme.spacing.p.mobile=${theme.spacing.p.mobile}

# ========================================
# Border Radius
# ========================================

theme.radius.none=${theme.radius.none}
theme.radius.sm=${theme.radius.sm}
theme.radius.md=${theme.radius.md}
theme.radius.lg=${theme.radius.lg}
theme.radius.xl=${theme.radius.xl}
theme.radius.2xl=${theme.radius['2xl']}
theme.radius.full=${theme.radius.full}

# ========================================
# Typography Sizes
# ========================================

theme.typography.sizes.h1=${theme.typographySizes.h1}
theme.typography.sizes.h2=${theme.typographySizes.h2}
theme.typography.sizes.h3=${theme.typographySizes.h3}
theme.typography.sizes.h4=${theme.typographySizes.h4}
theme.typography.sizes.p=${theme.typographySizes.p}
theme.typography.sizes.blockquote=${theme.typographySizes.blockquote}
theme.typography.sizes.label=${theme.typographySizes.label}
theme.typography.sizes.code=${theme.typographySizes.code}
theme.typography.sizes.table=${theme.typographySizes.table}
theme.typography.sizes.list=${theme.typographySizes.list}

# ========================================
# Typography Styles
# ========================================

theme.typography.styles.line-height=${theme.typographyStyles.lineHeight}
theme.typography.styles.line-height-h1=${theme.typographyStyles.lineHeightH1}
theme.typography.styles.line-height-h2=${theme.typographyStyles.lineHeightH2}
theme.typography.styles.line-height-h3=${theme.typographyStyles.lineHeightH3}
theme.typography.styles.letter-spacing=${theme.typographyStyles.letterSpacing}em

# ========================================
# Fonts
# ========================================

theme.fonts.sans=${theme.fonts.sans}
theme.fonts.mono=${theme.fonts.mono}
theme.fonts.heading=${theme.fonts.heading}

# ========================================
# Buttons
# ========================================

theme.buttons.border-radius=${theme.buttons.borderRadius}
theme.buttons.font-weight=${theme.buttons.fontWeight}
theme.buttons.font-size=${theme.buttons.fontSize}
theme.buttons.hover-effect=${theme.buttons.hoverEffect}
theme.buttons.input-border-radius=${theme.buttons.inputBorderRadius}
theme.buttons.input-font-weight=${theme.buttons.inputFontWeight}
`;
}
