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
      Object.entries(theme.spacing).map(([key, value]) => [
        key,
        { value, type: 'dimension' },
      ])
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
// 2. Tailwind Config Generator (v3 + v4 ZIP)
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

export function generateTailwindV4Theme(theme: BrandTheme): string {
  return `/* Tailwind CSS v4 Theme Configuration
 * Place this at the top of your globals.css file
 */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  /* Fonts */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-heading: var(--font-heading);

  /* Spacing */
  --spacing-xs: var(--spacing-xs);
  --spacing-sm: var(--spacing-sm);
  --spacing-md: var(--spacing-md);
  --spacing-lg: var(--spacing-lg);
  --spacing-xl: var(--spacing-xl);
  --spacing-2xl: var(--spacing-2xl);

  /* Radius */
  --radius-none: var(--radius-none);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-full: var(--radius-full);

  /* Typography Sizes */
  --text-h1: var(--text-h1);
  --text-h2: var(--text-h2);
  --text-h3: var(--text-h3);
  --text-h4: var(--text-h4);
  --text-p: var(--text-p);
  --text-blockquote: var(--text-blockquote);
  --text-label: var(--text-label);
  --text-code: var(--text-code);
  --text-table: var(--text-table);
  --text-list: var(--text-list);

  /* Typography Styles */
  --line-height: var(--line-height);
  --line-height-h1: var(--line-height-h1);
  --line-height-h2: var(--line-height-h2);
  --line-height-h3: var(--line-height-h3);
  --letter-spacing: var(--letter-spacing);

  /* Button tokens */
  --button-radius: var(--button-radius);
  --button-font-weight: var(--button-font-weight);
  --button-font-size: var(--button-font-size);
  --button-hover-effect: var(--button-hover-effect);
  --input-button-radius: var(--input-button-radius);
  --input-button-font-weight: var(--input-button-font-weight);
}
`;
}

export async function generateTailwindConfigZip(
  theme: BrandTheme
): Promise<Blob> {
  const zip = new JSZip();

  // Add Tailwind v3 config
  zip.file('tailwind.config.js', generateTailwindV3Config(theme));

  // Add Tailwind v4 theme CSS
  zip.file('tailwind-v4-theme.css', generateTailwindV4Theme(theme));

  // Add README
  zip.file(
    'README.md',
    `# Tailwind Configuration

This package includes Tailwind CSS configuration for both v3 and v4.

## Tailwind CSS v3

Use \`tailwind.config.js\` with your existing Tailwind v3 setup.

## Tailwind CSS v4

Copy the contents of \`tailwind-v4-theme.css\` to the top of your \`globals.css\` file.

## CSS Variables

Both configurations expect CSS variables to be defined in your globals.css file.
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
