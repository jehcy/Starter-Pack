/**
 * Project Generator - Creates a downloadable starter project ZIP
 * with the user's customized theme from the theme editor.
 */

import JSZip from 'jszip';
import type { BrandTheme } from '@/lib/brand-theme';
import { generateGlobalsCss } from '@/lib/brand-theme';

// Font name mapping for next/font/google imports
const GOOGLE_FONT_MAP: Record<string, string> = {
  'Inter': 'Inter',
  'Poppins': 'Poppins',
  'Roboto': 'Roboto',
  'Open Sans': 'Open_Sans',
  'Lato': 'Lato',
  'Montserrat': 'Montserrat',
  'Source Sans Pro': 'Source_Sans_3',
  'Raleway': 'Raleway',
  'Nunito': 'Nunito',
  'Playfair Display': 'Playfair_Display',
  'Merriweather': 'Merriweather',
  'JetBrains Mono': 'JetBrains_Mono',
  'Fira Code': 'Fira_Code',
  'Source Code Pro': 'Source_Code_Pro',
  'IBM Plex Mono': 'IBM_Plex_Mono',
  'Space Mono': 'Space_Mono',
  'DM Sans': 'DM_Sans',
  'Work Sans': 'Work_Sans',
  'Outfit': 'Outfit',
  'Plus Jakarta Sans': 'Plus_Jakarta_Sans',
  'Space Grotesk': 'Space_Grotesk',
  'Sora': 'Sora',
  'Manrope': 'Manrope',
  'Lexend': 'Lexend',
};

/**
 * Extract the primary font name from a font-family string
 */
function extractFontName(fontString: string): string {
  return fontString.split(',')[0].trim().replace(/['"]/g, '');
}

/**
 * Get the next/font/google import name for a font
 */
function getGoogleFontImport(fontName: string): string | null {
  return GOOGLE_FONT_MAP[fontName] || null;
}

/**
 * Convert a string to a URL-safe slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'my-theme';
}

// ============================================
// Template Generators
// ============================================

function generatePackageJson(projectName: string): string {
  return JSON.stringify({
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    dependencies: {
      '@radix-ui/react-slot': '^1.2.4',
      'class-variance-authority': '^0.7.1',
      'clsx': '^2.1.1',
      'lucide-react': '^0.556.0',
      'next': '15.3.4',
      'next-themes': '^0.4.6',
      'react': '^19.0.0',
      'react-dom': '^19.0.0',
      'tailwind-merge': '^3.4.0',
    },
    devDependencies: {
      '@types/node': '^20',
      '@types/react': '^19',
      '@types/react-dom': '^19',
      'autoprefixer': '^10.4.20',
      'postcss': '^8.4.49',
      'tailwindcss': '^3.4.15',
      'typescript': '^5',
    },
  }, null, 2);
}

function generateTsConfig(): string {
  return JSON.stringify({
    compilerOptions: {
      target: 'ES2017',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'react-jsx',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }, null, 2);
}

function generateNextConfig(): string {
  return `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`;
}

function generatePostcssConfig(): string {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

function generateComponentsJson(): string {
  return JSON.stringify({
    $schema: 'https://ui.shadcn.com/schema.json',
    style: 'new-york',
    rsc: true,
    tsx: true,
    tailwind: {
      config: '',
      css: 'src/app/globals.css',
      baseColor: 'neutral',
      cssVariables: true,
      prefix: '',
    },
    iconLibrary: 'lucide',
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
      hooks: '@/hooks',
    },
  }, null, 2);
}

function generateGitignore(): string {
  return `# Dependencies
node_modules
.pnpm-store

# Next.js
.next
out
build

# Production
dist

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`;
}

function generateReadme(themeName: string): string {
  return `# ${themeName} Starter

A Next.js starter project with your custom theme from Theme Editor.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Theme Customization

Your theme is defined in \`src/app/globals.css\`. The CSS variables in \`:root\` and \`.dark\` control:

- **Colors**: background, foreground, primary, secondary, accent, muted, destructive
- **Typography**: font sizes for h1-h4, paragraphs, labels
- **Spacing**: xs, sm, md, lg, xl, 2xl
- **Border Radius**: none, sm, md, lg, xl, 2xl, full
- **Buttons**: radius, font-weight, hover effects

## Adding More Components

This project is set up for [shadcn/ui](https://ui.shadcn.com). Add components with:

\`\`\`bash
npx shadcn@latest add [component-name]
\`\`\`

## Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [Tailwind CSS 3](https://tailwindcss.com) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

## License

MIT
`;
}

function generateGlobalsCssTemplate(theme: BrandTheme): string {
  const { root, dark } = generateGlobalsCss(theme);

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  line-height: 1.6;
  letter-spacing: normal;
}

h4, h5, h6 {
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
}

h1, h2, h3 {
  letter-spacing: var(--letter-spacing);
}

${root}

${dark}

/* Container utilities */
.container-wide {
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 640px) {
  .container-wide {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .container-wide {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }

  h1 {
    font-size: var(--text-h1);
    line-height: var(--line-height-h1);
  }
  h2 {
    font-size: var(--text-h2);
    line-height: var(--line-height-h2);
  }
  h3 {
    font-size: var(--text-h3);
    line-height: var(--line-height-h3);
  }
  h4 {
    font-size: var(--text-h4);
  }
  p {
    font-size: var(--text-p);
  }
  blockquote {
    font-size: var(--text-blockquote);
  }
  label {
    font-size: var(--text-label);
  }
  code {
    font-size: var(--text-code);
  }
  table, th, td {
    font-size: var(--text-table);
  }
  ul, ol, li {
    font-size: var(--text-list);
  }
}

/* Brand Button Hover Effects */
.btn-brand:hover:not(:disabled) {
  opacity: var(--button-hover-opacity, 1);
  transform: var(--button-hover-transform, none);
  box-shadow: var(--button-hover-shadow, none);
}

input[type="button"],
input[type="submit"] {
  border-radius: var(--input-button-radius);
  font-weight: var(--input-button-font-weight);
}
`;
}

function generateLayout(theme: BrandTheme): string {
  const sansFont = extractFontName(theme.fonts.sans);
  const monoFont = extractFontName(theme.fonts.mono);
  const headingFont = extractFontName(theme.fonts.heading);

  const sansFontImport = getGoogleFontImport(sansFont);
  const monoFontImport = getGoogleFontImport(monoFont);
  const headingFontImport = headingFont !== sansFont ? getGoogleFontImport(headingFont) : null;

  // Build font imports
  const fontImports: string[] = [];
  const fontConfigs: string[] = [];
  const fontVariables: string[] = [];

  if (sansFontImport) {
    fontImports.push(sansFontImport);
    fontConfigs.push(`const ${sansFontImport.toLowerCase().replace(/_/g, '')} = ${sansFontImport}({
  variable: '--font-${sansFontImport.toLowerCase().replace(/_/g, '-')}',
  subsets: ['latin'],
  display: 'swap',
});`);
    fontVariables.push(`\${${sansFontImport.toLowerCase().replace(/_/g, '')}.variable}`);
  }

  if (monoFontImport && monoFontImport !== sansFontImport) {
    fontImports.push(monoFontImport);
    fontConfigs.push(`const ${monoFontImport.toLowerCase().replace(/_/g, '')} = ${monoFontImport}({
  variable: '--font-${monoFontImport.toLowerCase().replace(/_/g, '-')}',
  subsets: ['latin'],
  display: 'swap',
});`);
    fontVariables.push(`\${${monoFontImport.toLowerCase().replace(/_/g, '')}.variable}`);
  }

  if (headingFontImport && headingFontImport !== sansFontImport) {
    fontImports.push(headingFontImport);
    fontConfigs.push(`const ${headingFontImport.toLowerCase().replace(/_/g, '')} = ${headingFontImport}({
  variable: '--font-${headingFontImport.toLowerCase().replace(/_/g, '-')}',
  subsets: ['latin'],
  display: 'swap',
});`);
    fontVariables.push(`\${${headingFontImport.toLowerCase().replace(/_/g, '')}.variable}`);
  }

  const uniqueFontImports = [...new Set(fontImports)];
  const fontImportLine = uniqueFontImports.length > 0
    ? `import { ${uniqueFontImports.join(', ')} } from 'next/font/google';`
    : '';

  const fontConfigBlock = fontConfigs.join('\n\n');
  const fontVariablesString = fontVariables.length > 0 ? fontVariables.join(' ') : '';

  return `import type { Metadata } from 'next';
${fontImportLine}
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

${fontConfigBlock}

export const metadata: Metadata = {
  title: '${theme.name || 'My App'}',
  description: 'Built with Next.js and your custom theme',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`${fontVariablesString} antialiased\`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
`;
}

function generatePage(theme: BrandTheme): string {
  return `import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Moon, Sun, Palette, Type, Layers, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container-wide flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">${theme.name || 'My App'}</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container-wide py-24">
        <h1 className="font-bold text-foreground max-w-4xl">
          Your Custom Theme Starter
        </h1>
        <p className="mt-6 text-muted-foreground">
          This starter project includes your personalized design tokens from Theme Editor.
          Everything is ready for you to build something amazing.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Get Started</Button>
          <Button variant="secondary">Learn More</Button>
          <Button variant="outline">Documentation</Button>
          <Button variant="ghost">View Source</Button>
        </div>
      </section>

      {/* Color Palette */}
      <section className="container-wide py-16 border-t border-border">
        <div className="flex items-center gap-2 mb-8">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Color Palette</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-primary" />
            <p className="text-sm text-muted-foreground">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary" />
            <p className="text-sm text-muted-foreground">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-accent" />
            <p className="text-sm text-muted-foreground">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-muted" />
            <p className="text-sm text-muted-foreground">Muted</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-destructive" />
            <p className="text-sm text-muted-foreground">Destructive</p>
          </div>
        </div>

        {/* Chart Colors */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-4">Chart Colors</p>
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-md bg-chart-1" />
            <div className="h-10 w-10 rounded-md bg-chart-2" />
            <div className="h-10 w-10 rounded-md bg-chart-3" />
            <div className="h-10 w-10 rounded-md bg-chart-4" />
            <div className="h-10 w-10 rounded-md bg-chart-5" />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="container-wide py-16 border-t border-border">
        <div className="flex items-center gap-2 mb-8">
          <Type className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Typography</h2>
        </div>
        <div className="space-y-6 max-w-3xl">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Heading 1</p>
            <h1 className="font-bold text-foreground">The quick brown fox</h1>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Heading 2</p>
            <h2 className="font-semibold text-foreground">The quick brown fox jumps</h2>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Heading 3</p>
            <h3 className="font-semibold text-foreground">The quick brown fox jumps over</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Heading 4</p>
            <h4 className="font-medium text-foreground">The quick brown fox jumps over the lazy dog</h4>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Paragraph</p>
            <p className="text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Blockquote</p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              "Design is not just what it looks like and feels like. Design is how it works."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="container-wide py-16 border-t border-border">
        <div className="flex items-center gap-2 mb-8">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Cards</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick setup guide for your project</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Run npm install and npm run dev to start developing with your custom theme.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>Add more shadcn/ui components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use npx shadcn@latest add [component] to add more pre-styled components.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customization</CardTitle>
              <CardDescription>Tweak your design tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Edit globals.css to adjust colors, typography, spacing, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Button Variants */}
      <section className="container-wide py-16 border-t border-border">
        <h2 className="font-semibold text-foreground mb-8">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Sun className="h-4 w-4" /></Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container-wide py-8 text-center text-muted-foreground">
          <p>Built with your custom theme from Theme Editor</p>
        </div>
      </footer>
    </main>
  );
}
`;
}

function generateThemeProvider(): string {
  return `'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
}
`;
}

function generateThemeToggle(): string {
  return `'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
`;
}

function generateUtils(): string {
  return `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
}

function generateButton(): string {
  return `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn-brand inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs dark:bg-input/30 dark:border-input",
        secondary:
          "bg-secondary text-secondary-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  style,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{
        borderRadius: 'var(--button-radius)',
        fontWeight: 'var(--button-font-weight)',
        fontSize: 'var(--button-font-size)',
        ...style,
      }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
`;
}

function generateCard(): string {
  return `import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
`;
}

function generateNextEnvDts(): string {
  return `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
`;
}

export function generateBrandSkill(): string {
  return `# /brand - UI Designer Command

You are a UI designer specializing in creating consistent, brand-aligned interfaces using the project's design system.

## Core Principles

1. **Always use \`@/src/app/globals.css\`** - All styling must come from this file. Never add custom CSS or inline styles.
2. **Strictly follow shadcn spacing** - Use the spacing scale defined in \`globals.css\`:
   - \`--spacing-xs: 0.25rem\` (1)
   - \`--spacing-sm: 0.5rem\` (2)
   - \`--spacing-md: 1rem\` (4)
   - \`--spacing-lg: 1.5rem\` (6)
   - \`--spacing-xl: 2rem\` (8)
   - \`--spacing-2xl: 3rem\` (12)
3. **Maintain border radius consistency** - Use the radius scale from \`globals.css\`:
   - \`--radius-sm: 0.25rem\`
   - \`--radius-md: 0.375rem\`
   - \`--radius-lg: 0.5rem\`
   - \`--radius-xl: 0.75rem\`
   - \`--radius-2xl: 1rem\`
   - \`--radius-full: 9999px\`
   - Default \`--radius: 0.5rem\`
4. **NEVER override design system settings** - Do not use hardcoded classes that block customization:
   - ❌ NEVER use: \`text-4xl\`, \`text-5xl\`, \`text-6xl\`, etc. on headings (blocks font size customization)
   - ❌ NEVER use: \`leading-[0.9]\`, \`leading-tight\`, \`leading-relaxed\`, etc. on headings (blocks line-height customization)
   - ❌ NEVER use: \`tracking-tight\`, \`tracking-wide\`, etc. on headings (blocks letter-spacing customization)
   - ✅ ALWAYS let typography inherit from \`globals.css\` theme tokens
5. **NEVER add max-width classes to paragraphs** - Do not constrain paragraph widths:
   - ❌ NEVER use: \`max-w-xl\`, \`max-w-2xl\`, \`max-w-prose\`, etc. on \`<p>\` tags
   - ❌ NEVER use: Any \`max-w-*\` classes on paragraph elements
   - ✅ Let the parent container control layout and width
   - ✅ Use max-width on section containers or divs, not on individual paragraphs

## Workflow

### Before Creating/Building a New Page:

1. **Read \`@/src/app/globals.css\`** - Understand the available design tokens, colors, spacing, and radius values.
2. **Check existing components** - Look in \`@/src/components/\` for available shadcn components.
3. **Add missing components** - If a needed component doesn't exist, add it using \`npx shadcn@latest add [component-name]\` before using it.
4. **Apply styles from globals.css** - Use Tailwind classes that reference the CSS variables and design tokens defined in \`globals.css\`.

### When Adding New Styles:

If the user provides new design inspiration or a screenshot:

1. **First check \`@/src/app/globals.css\`** - Verify if the required styles already exist.
2. **If styles don't exist**:
   - Add them to \`@/src/app/globals.css\` following the existing pattern
   - Maintain consistency with existing border radius values (\`--radius-*\`)
   - Maintain consistency with existing spacing scale (\`--spacing-*\`)
   - Use the existing color token system (\`--color-*\`, \`--primary\`, \`--secondary\`, etc.)
3. **Never add inline styles** - All styles must be in \`globals.css\` and referenced via Tailwind classes.

## Design System Reference

### Colors (from globals.css)

**Base Color Tokens:**
- Use semantic color tokens: \`background\`, \`foreground\`, \`primary\`, \`secondary\`, \`accent\`, \`muted\`, \`destructive\`
- All colors support dark mode via \`.dark\` class
- Use Tailwind classes: \`bg-primary\`, \`text-foreground\`, \`border-border\`, etc.

**60-30-10 Semantic Color System:**
- **Backgrounds (60%):** \`bg-bg-primary\`, \`bg-bg-secondary\`, \`bg-bg-accent\`
- **Cards (30%):** \`bg-card-primary\`, \`bg-card-secondary\`, \`bg-card-accent\`
- **Text:** \`text-text-primary\`, \`text-text-secondary\`, \`text-text-accent\`
- **Button Fill:** \`bg-btn-fill-primary\`, \`bg-btn-fill-secondary\`, \`bg-btn-fill-accent\` (with \`-foreground\` variants)
- **Button Outline:** \`border-btn-outline-primary\`, \`text-btn-outline-primary-foreground\`, etc.
- **Button Text:** \`text-btn-text-primary\`, \`text-btn-text-secondary\`, \`text-btn-text-accent\`

Use semantic colors for granular control over different UI elements while maintaining design consistency.

### Typography
- Font: \`--font-sans\`, \`--font-mono\`, \`--font-heading\`
- Use Tailwind: \`font-sans\`, \`font-mono\`, \`font-heading\`
- Typography sizes are controlled by CSS variables in \`globals.css\`
  - H1 uses: \`var(--text-h1)\` for size and \`var(--line-height-h1)\` for line-height
  - H2 uses: \`var(--text-h2)\` for size and \`var(--line-height-h2)\` for line-height
  - H3 uses: \`var(--text-h3)\` for size and \`var(--line-height-h3)\` for line-height

### Spacing
- Use Tailwind spacing utilities: \`p-1\`, \`p-2\`, \`p-4\`, \`p-6\`, \`p-8\`, \`p-12\` (matching the spacing scale)
- For gaps: \`gap-1\`, \`gap-2\`, \`gap-4\`, \`gap-6\`, \`gap-8\`, \`gap-12\`
- For margins: \`m-1\`, \`m-2\`, \`m-4\`, \`m-6\`, \`m-8\`, \`m-12\`

### Border Radius
- Use Tailwind: \`rounded-sm\`, \`rounded-md\`, \`rounded-lg\`, \`rounded-xl\`, \`rounded-2xl\`, \`rounded-full\`

## Component Guidelines

### Shadcn Components
- Always use shadcn components from \`@/components/ui/\`
- Components are configured in \`components.json\` with style: "new-york"
- Components automatically use CSS variables from \`globals.css\`

### Component Structure
1. Import shadcn components from \`@/components/ui/[component-name]\`
2. Use Tailwind classes for layout and spacing
3. Reference design tokens from \`globals.css\` via Tailwind utilities
4. Never add \`style={{}}\` props or inline CSS

## Examples

### ✅ Correct Approach
\`\`\`tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function FeatureSection() {
  return (
    <section className="py-32">
      <div className="container-wide">
        {/* H2 inherits from design system - NO font-size or line-height classes */}
        <h2 className="font-bold mb-6">
          Section Title
        </h2>

        <Card className="p-6 space-y-4">
          <CardHeader className="p-0">
            {/* H3 inherits from design system - NO font-size or line-height classes */}
            <h3 className="font-bold">Feature Title</h3>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-muted-foreground">Description</p>
            <Button className="mt-4">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
\`\`\`

### ❌ Incorrect Approach
\`\`\`tsx
// DON'T use inline styles
<div style={{ padding: "24px", borderRadius: "8px" }}>

// DON'T add custom CSS classes
<div className="custom-feature-card">

// DON'T use arbitrary values that don't match the spacing scale
<div className="p-[23px]">

// ❌ DON'T override typography
<h1 className="text-6xl leading-tight">  // WRONG
<h2 className="text-4xl md:text-5xl">   // WRONG
<h3 className="text-2xl leading-relaxed"> // WRONG

// ❌ DON'T add max-width to paragraphs
<p className="max-w-xl text-muted-foreground">  // WRONG
<p className="max-w-prose">                     // WRONG

// ✅ DO let headings inherit from design system
<h1 className="font-bold">  // CORRECT
<h2 className="font-bold">  // CORRECT
<h3 className="font-bold">  // CORRECT

// ✅ DO control width at container level
<div className="max-w-2xl">
  <p className="text-muted-foreground">  // CORRECT
</div>
\`\`\`

## Checklist

Before finalizing any UI component or page:

- [ ] All styles reference \`globals.css\` design tokens
- [ ] Spacing uses the defined scale (1, 2, 4, 6, 8, 12)
- [ ] Border radius uses the defined scale
- [ ] No inline styles (\`style={{}}\`) are used
- [ ] No custom CSS classes are added
- [ ] Shadcn components are used when available
- [ ] Missing shadcn components are added before use
- [ ] Dark mode is considered (colors adapt automatically)
- [ ] Typography uses the brand fonts
- [ ] **NO hardcoded font sizes on H1, H2, H3** (e.g., no \`text-4xl\`, \`text-5xl\`, \`text-6xl\`)
- [ ] **NO hardcoded line-heights on headings** (e.g., no \`leading-tight\`, \`leading-[0.9]\`)
- [ ] **NO max-width classes on paragraph tags** (e.g., no \`max-w-xl\`, \`max-w-prose\`)

## When User Provides Design Inspiration

1. Analyze the design requirements
2. Check \`globals.css\` for existing styles that match
3. If new styles are needed:
   - Add them to \`globals.css\` maintaining:
     - Existing border radius scale
     - Existing spacing scale
     - Existing color token system
   - Document what was added and why
4. Implement the design using only classes from \`globals.css\`

Remember: Consistency is key. Every design decision should align with the existing design system in \`globals.css\`.
`;
}

// ============================================
// Main Export Function
// ============================================

export async function generateStarterProject(theme: BrandTheme): Promise<Blob> {
  const zip = new JSZip();
  const projectName = slugify(theme.name || 'my-theme');

  // Root files
  zip.file('package.json', generatePackageJson(projectName));
  zip.file('tsconfig.json', generateTsConfig());
  zip.file('next.config.ts', generateNextConfig());
  zip.file('postcss.config.mjs', generatePostcssConfig());
  zip.file('components.json', generateComponentsJson());
  zip.file('.gitignore', generateGitignore());
  zip.file('README.md', generateReadme(theme.name || 'My Theme'));
  zip.file('next-env.d.ts', generateNextEnvDts());

  // src/app
  zip.file('src/app/globals.css', generateGlobalsCssTemplate(theme));
  zip.file('src/app/layout.tsx', generateLayout(theme));
  zip.file('src/app/page.tsx', generatePage(theme));

  // src/components
  zip.file('src/components/theme-provider.tsx', generateThemeProvider());
  zip.file('src/components/theme-toggle.tsx', generateThemeToggle());

  // src/components/ui
  zip.file('src/components/ui/button.tsx', generateButton());
  zip.file('src/components/ui/card.tsx', generateCard());

  // src/lib
  zip.file('src/lib/utils.ts', generateUtils());

  // public
  zip.file('public/.gitkeep', '');

  // skills
  zip.file('skills/brand.md', generateBrandSkill());

  // Generate the ZIP blob
  return zip.generateAsync({ type: 'blob' });
}

export { slugify };
