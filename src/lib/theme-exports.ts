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
  return `/* Tailwind CSS v3 Directives
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
  zip.file('tailwind-directives.css', generateTailwindV4Theme(theme));

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
