'use client';

import { useMemo, useState } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Calendar,
  Mail,
  Settings,
  Bell,
  ChevronRight,
  Plus,
  FileText,
  Twitter,
  Github,
  Linkedin,
  Sun,
  Moon,
  Zap,
  Code,
  Palette,
  Database,
  Lock,
  Smartphone,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

import type { BrandTheme, ColorTokens } from '@/lib/brand-theme';

type PreviewPage = 'home' | 'features' | 'pricing' | 'dashboard' | 'lp';

interface ThemePreviewProps {
  theme: BrandTheme;
  mode: 'light' | 'dark';
  onModeChange?: (mode: 'light' | 'dark') => void;
  breakpoint?: 'desktop' | 'tablet' | 'mobile';
  onBreakpointChange?: (breakpoint: 'desktop' | 'tablet' | 'mobile') => void;
}

export function ThemePreview({ theme, mode, onModeChange, breakpoint = 'desktop', onBreakpointChange }: ThemePreviewProps) {
  const [currentPage, setCurrentPage] = useState<PreviewPage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const colors = mode === 'light' ? theme.colors.light : theme.colors.dark;

  // Breakpoint width mapping
  const containerWidth = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  }[breakpoint];

  // Generate CSS variables from theme
  const cssVariables = useMemo(() => {
    const vars: Record<string, string> = {};
    Object.entries(colors).forEach(([key, value]) => {
      const cssKey = `--preview-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      vars[cssKey] = value;
    });
    vars['--preview-radius'] = theme.radius.lg;
    vars['--preview-radius-sm'] = theme.radius.sm;
    vars['--preview-radius-md'] = theme.radius.md;
    vars['--preview-radius-xl'] = theme.radius.xl;
    return vars;
  }, [colors, theme.radius]);

  const navItems: { label: string; page: PreviewPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'LP', page: 'lp' },
    { label: 'Features', page: 'features' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Dashboard', page: 'dashboard' },
  ];

  const handleToggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    onModeChange?.(newMode);
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{
        ...cssVariables,
        color: colors.foreground,
        fontFamily: theme.fonts.sans,
        lineHeight: theme.typographyStyles.lineHeight,
        letterSpacing: `${theme.typographyStyles.letterSpacing}em`,
        overflow: 'hidden',
      } as React.CSSProperties}
    >
     

      {/* Responsive Container */}
      <div className="flex-1 flex justify-center overflow-hidden" style={{ backgroundColor: colors.muted + '20' }}>
        <div
          className="transition-all duration-300 ease-in-out overflow-auto"
          style={{
            width: containerWidth,
            maxWidth: '100%',
            height: '100%',
            border: `1px solid ${colors.border}`,
            boxShadow: breakpoint !== 'desktop' ? '0 0 0 9999px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          {/* Page Content */}
          <div
            className="min-h-full flex flex-col"
            style={{ backgroundColor: colors.background }}
          >

          <header
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <div
          className="w-full mx-auto flex items-center justify-between"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
            height: breakpoint === 'mobile' ? '56px' : '64px',
          }}
        >
          {/* Logo */}
          <div className="flex items-center" style={{ gap: breakpoint === 'mobile' ? '1rem' : '2rem' }}>
            {/* Hamburger Menu - Show on mobile and tablet */}
            {(breakpoint === 'mobile' || breakpoint === 'tablet') && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="transition-colors hover:opacity-80"
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  color: colors.foreground,
                  borderRadius: theme.radius.md,
                }}
                aria-label="Toggle menu"
              >
                <svg
                  className={breakpoint === 'mobile' ? 'size-5' : 'size-6'}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}

            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center font-bold"
                style={{
                  width: breakpoint === 'mobile' ? '28px' : '32px',
                  height: breakpoint === 'mobile' ? '28px' : '32px',
                  fontSize: breakpoint === 'mobile' ? '0.75rem' : '0.875rem',
                  backgroundColor: colors.primary,
                  color: colors.primaryForeground,
                  borderRadius: theme.radius.md,
                }}
              >
                V
              </div>
              {breakpoint !== 'mobile' && (
                <span className="font-semibold" style={{ color: colors.foreground, fontFamily: theme.fonts.heading }}>
                  VibeCN
                </span>
              )}
            </div>

            {/* Nav Items - Only show on desktop */}
            {breakpoint === 'desktop' && (
              <nav data-tour="preview-tabs" className="flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setCurrentPage(item.page)}
                    className="px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      color: currentPage === item.page ? colors.foreground : colors.mutedForeground,
                      backgroundColor: currentPage === item.page ? colors.muted : 'transparent',
                      borderRadius: theme.buttons.borderRadius,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center" style={{ gap: breakpoint === 'mobile' ? '0.25rem' : '0.5rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={handleToggleMode}
              className="transition-colors hover:opacity-80"
              style={{
                padding: breakpoint === 'mobile' ? '0.375rem' : '0.5rem',
                backgroundColor: 'transparent',
                color: colors.foreground,
                borderRadius: theme.radius.md,
              }}
              title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? <Moon className={breakpoint === 'mobile' ? 'size-3.5' : 'size-4'} /> : <Sun className={breakpoint === 'mobile' ? 'size-3.5' : 'size-4'} />}
            </button>
            {/* Bell icon - Hide on mobile */}
            {breakpoint !== 'mobile' && (
              <PreviewButton
                colors={colors}
                radius={theme.buttons.borderRadius}
                variant="ghost"
                fontWeight={theme.buttons.fontWeight}
                fontSize={theme.buttons.fontSize}
                hoverEffect={theme.buttons.hoverEffect}
                size={breakpoint === 'tablet' ? 'sm' : 'default'}
              >
                <Bell className="size-4" />
              </PreviewButton>
            )}
            <PreviewButton
              colors={colors}
              radius={theme.buttons.borderRadius}
              variant="default"
              fontWeight={theme.buttons.fontWeight}
              fontSize={breakpoint === 'mobile' ? '0.75rem' : theme.buttons.fontSize}
              hoverEffect={theme.buttons.hoverEffect}
              size={breakpoint === 'mobile' ? 'sm' : 'default'}
            >
              {breakpoint === 'mobile' ? 'Start' : 'Get Started'}
            </PreviewButton>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {(breakpoint === 'mobile' || breakpoint === 'tablet') && mobileMenuOpen && (
          <div
            className="border-t"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
            }}
          >
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-6 py-3 text-sm font-medium transition-colors border-b"
                  style={{
                    color: currentPage === item.page ? colors.primary : colors.foreground,
                    backgroundColor: currentPage === item.page ? `${colors.primary}10` : 'transparent',
                    borderColor: colors.border,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      
            {currentPage === 'home' && <HomePage theme={theme} colors={colors} breakpoint={breakpoint} />}
            {currentPage === 'lp' && <LPPage theme={theme} colors={colors} breakpoint={breakpoint} />}
            {currentPage === 'features' && <FeaturesPage theme={theme} colors={colors} breakpoint={breakpoint} />}
            {currentPage === 'pricing' && <PricingPage theme={theme} colors={colors} breakpoint={breakpoint} />}
            {currentPage === 'dashboard' && <DashboardPage theme={theme} colors={colors} breakpoint={breakpoint} />}
          </div>

          {/* Footer */}
          <PreviewFooter theme={theme} colors={colors} breakpoint={breakpoint} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Components
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  theme: BrandTheme;
  colors: ColorTokens;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
}

function HomePage({ theme, colors, breakpoint }: PageProps) {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at top, ${colors.primary}20, ${colors.background} 70%)`,
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <div 
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: `${colors.primary}10`,
                border: `1px solid ${colors.primary}30`,
                borderRadius: '9999px',
                color: colors.primary,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span 
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: colors.primary }}
                />
                <span 
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              </span>
              Optimized for AI
            </div>
            <h1
              className="font-bold tracking-tight"
              style={{
                fontFamily: theme.fonts.heading,
                color: colors.foreground,
                fontSize: theme.typographySizes.h1,
                lineHeight: theme.typographyStyles.lineHeightH1,
              }}
            >
              Build Fast with
              <span
                key={`home-gradient-${colors.primary}`}
                className="block mt-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Fewer Tokens
              </span>
            </h1>
            <p 
              className="mx-auto mt-8 max-w-4xl leading-relaxed"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Token-optimized UI components designed for AI efficiency. Ship production-ready interfaces faster using clear, structured code that minimizes context and maximizes output quality.
            </p>
            <div
              className="mt-10 flex items-center gap-4"
              style={{
                flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                justifyContent: 'center',
              }}
            >
              <PreviewButton 
                colors={colors} 
                radius={theme.buttons.borderRadius}
                variant="default"
                fontWeight={theme.buttons.fontWeight}
                fontSize={theme.buttons.fontSize}
                hoverEffect={theme.buttons.hoverEffect}
                size="lg"
              >
                Save your Style
                <ArrowRight className="ml-2 size-4" />
              </PreviewButton>
              <PreviewButton 
                colors={colors} 
                radius={theme.buttons.borderRadius}
                variant="outline"
                fontWeight={theme.buttons.fontWeight}
                fontSize={theme.buttons.fontSize}
                hoverEffect={theme.buttons.hoverEffect}
                size="lg"
              >
                Start Customizing
              </PreviewButton>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section
        className="border-y py-12"
        style={{
          backgroundColor: `${colors.muted}50`,
          borderColor: colors.border,
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <p 
            className="mb-8 text-center text-sm font-medium uppercase tracking-wider"
            style={{ color: colors.mutedForeground }}
          >
            Built by developers, for vibe coders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Server Components', 'Vercel', 'shadcn/ui'].map((name) => (
              <span 
                key={name} 
                className="text-lg font-semibold"
                style={{ color: colors.mutedForeground }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.primary }}
            >
              Features
            </p>
            <h2 
              className="mt-2 font-bold tracking-tight"
              style={{ 
                fontFamily: theme.fonts.heading, 
                color: colors.foreground,
                fontSize: theme.typographySizes.h2,
              }}
            >
              Everything you need to launch
            </h2>
            <p 
              className="mt-4"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Built with modern tools and best practices for production-ready applications
            </p>
          </div>
          <div
            className="mx-auto mt-16 grid max-w-5xl"
            style={{
              gap: theme.spacing.spaceY[breakpoint],
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            }}
          >
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Zap} title="AI-First Components" description="Pre-built pages and layouts AI assistants understand instantly." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Code} title="Token-Efficient" description="Flat structures and clear naming reduce context overhead." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Palette} title="Visual Theme Editor" description="Live customization with instant preview across your app." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Database} title="InstantDB Ready" description="Type-safe real-time queries with pre-configured schema." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Lock} title="Auth Pre-wired" description="OAuth with Google/GitHub ready out of the box." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Smartphone} title="Responsive Patterns" description="Mobile-first layouts with predictable breakpoints." />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="border-y py-16"
        style={{
          backgroundColor: `${colors.muted}50`,
          borderColor: colors.border,
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div
            className="grid"
            style={{
              gap: theme.spacing.spaceY[breakpoint],
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            }}
          >
            <StatItem colors={colors} value="70%" label="Fewer Tokens" />
            <StatItem colors={colors} value="Instant" label="AI Onboarding" />
            <StatItem colors={colors} value="100%" label="Type Safe" />
            <StatItem colors={colors} value="Real-time" label="Sync" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div
            className="relative overflow-hidden px-6 py-20 sm:px-12 sm:py-28"
            style={{
              backgroundColor: colors.primary,
              borderRadius: theme.radius.xl,
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primary}cc)`,
              }}
            />
            <div className="relative mx-auto text-center">
              <h2 
                className="font-bold tracking-tight"
                style={{ 
                  color: colors.primaryForeground,
                  fontFamily: theme.fonts.heading,
                  fontSize: theme.typographySizes.h2,
                }}
              >
                Ready to build differently?
              </h2>
              <p 
                className="mx-auto mt-4 max-w-4xl"
                style={{ 
                  color: `${colors.primaryForeground}cc`,
                  fontSize: theme.typographySizes.p,
                }}
              >
                Join developers building production-ready UIs with AI assistance. Start free today.
              </p>
              <div
                className="mt-8 flex items-center gap-4"
                style={{
                  flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                  justifyContent: 'center',
                }}
              >
                <PreviewButton 
                  colors={colors} 
                  radius={theme.buttons.borderRadius}
                  variant="secondary"
                  fontWeight={theme.buttons.fontWeight}
                  fontSize={theme.buttons.fontSize}
                  hoverEffect={theme.buttons.hoverEffect}
                  size="lg"
                >
                  Get Started Free
                </PreviewButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturesPage({ theme, colors , breakpoint }: PageProps) {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at top, ${colors.primary}20, ${colors.background} 70%)`,
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.primary }}
            >
              Features
            </p>
            <h1
              className="mt-2 font-bold tracking-tight"
              style={{
                fontFamily: theme.fonts.heading,
                color: colors.foreground,
                fontSize: theme.typographySizes.h1,
                lineHeight: theme.typographyStyles.lineHeightH1,
              }}
            >
              Engineered for
              <span
                key={`features-gradient-${colors.primary}`}
                className="block mt-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI-Assisted Development
              </span>
            </h1>
            <p 
              className="mx-auto mt-6 max-w-4xl leading-relaxed"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Every architectural decision optimized for vibe coding. Faster comprehension, fewer tokens, better results.
            </p>
          </div>
        </div>
      </section>

      {/* Large Feature Cards */}
      <section
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div
            className="grid"
            style={{
              gap: theme.spacing.spaceY[breakpoint],
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
            }}
          >
            <LargeFeatureCard
              theme={theme}
              colors={colors}
              breakpoint={breakpoint}
              icon={Zap}
              title="AI-Optimized Architecture"
              description="Flat directory structures, explicit file naming, and comprehensive design guide. AI assistants generate consistent UI without chasing design decisions."
              features={['Brand.md guide', 'Explicit exports', 'Flat structure', 'Type inference']}
            />
            <LargeFeatureCard
              theme={theme}
              colors={colors}
              breakpoint={breakpoint}
              icon={Code}
              title="Token-Efficient Patterns"
              description="Predictable component APIs, consistent styling patterns, and self-documenting code. Get more done before hitting context limits."
              features={['Consistent APIs', 'Design tokens', 'JSDoc comments', 'Minimal abstractions']}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        className="border-y"
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
          backgroundColor: `${colors.muted}30`,
          borderColor: colors.border,
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 
              className="font-bold tracking-tight"
              style={{ 
                fontFamily: theme.fonts.heading, 
                color: colors.foreground,
                fontSize: theme.typographySizes.h2,
              }}
            >
              Built with the best tools
            </h2>
            <p 
              className="mt-4"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              A carefully curated tech stack for maximum productivity
            </p>
          </div>
          <div
            className="grid"
            style={{
              gap: theme.spacing.spaceY[breakpoint],
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            }}
          >
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Palette} title="Tailwind CSS" description="Design tokens as CSS variables. AI tools generate consistent styles without color mismatches." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Database} title="shadcn/ui" description="Composable components with explicit props. AI assistants scaffold new UI predictably." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Database} title="InstantDB" description="Type-safe real-time queries. Pre-configured schema patterns for rapid feature development." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Lock} title="Auth Ready" description="OAuth with Google/GitHub pre-wired. Skip the boilerplate, ship the feature." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Settings} title="Theme Editor" description="Visual customization with instant preview. Design tokens AI tools can reference." />
            <FeatureCard theme={theme} colors={colors} breakpoint={breakpoint} icon={Smartphone} title="Responsive" description="Mobile-first layouts with consistent breakpoints. Predictable responsive patterns." />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div
            className="grid gap-12"
            style={{
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
              alignItems: 'center',
            }}
          >
            <div>
              <p 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: colors.primary }}
              >
                Performance
              </p>
              <h2 
                className="mt-2 font-bold tracking-tight"
                style={{ 
                  fontFamily: theme.fonts.heading, 
                  color: colors.foreground,
                  fontSize: theme.typographySizes.h2,
                }}
              >
                Optimized for Comprehension
              </h2>
              <p 
                className="mt-4 leading-relaxed"
                style={{ 
                  color: colors.mutedForeground,
                  fontSize: theme.typographySizes.p,
                }}
              >
                Every architectural decision optimized for AI assistants to understand and extend your codebase efficiently.
              </p>
              <ul className="mt-8 space-y-4">
                <PerformanceItem colors={colors} theme={theme} title="70% fewer tokens" description="Flat structures and explicit exports reduce context overhead" />
                <PerformanceItem colors={colors} theme={theme} title="Instant AI onboarding" description="Brand.md provides complete design system guidance in one file" />
                <PerformanceItem colors={colors} theme={theme} title="Predictable patterns" description="Consistent conventions AI tools recognize and extend" />
              </ul>
            </div>
            <div className="relative">
              <div 
                className="aspect-square p-8"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.primary}20, ${colors.primary}10, transparent)`,
                  borderRadius: theme.radius.xl,
                }}
              >
                <div 
                  className="h-full w-full"
                  style={{
                    border: `1px solid ${colors.border}`,
                    backgroundColor: `${colors.card}80`,
                    borderRadius: theme.radius.lg,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PricingPage({ theme, colors , breakpoint }: PageProps) {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24"
        style={{
          background: `radial-gradient(ellipse at top, ${colors.primary}20, ${colors.background} 70%)`,
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.primary }}
            >
              Pricing
            </p>
            <h1
              className="mt-2 font-bold tracking-tight"
              style={{
                fontFamily: theme.fonts.heading,
                color: colors.foreground,
                fontSize: theme.typographySizes.h1,
                lineHeight: theme.typographyStyles.lineHeightH1,
              }}
            >
              Simple pricing for
              <span
                key={`pricing-gradient-${colors.primary}`}
                className="block mt-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Vibe coders
              </span>
            </h1>
            <p 
              className="mx-auto mt-6 max-w-4xl leading-relaxed"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Start free while we're in early access. Pro is coming soon for builders who want AI-generated themes and deeper config.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div
            className="mx-auto grid max-w-4xl"
            style={{
              gap: theme.spacing.spaceY[breakpoint],
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
            }}
          >
            <PricingCard
              theme={theme}
              colors={colors}
              breakpoint={breakpoint}
              name="Free"
              price="$0"
              period="/month"
              description="Perfect for getting your design system ready before you start coding. Unlimited theme tweaks, brand setup, and React starter pack downloads. Sign in required to save and clone projects."
              features={[]}
              buttonText="Start for free"
              buttonVariant="outline"
            />
            <PricingCard
              theme={theme}
              colors={colors}
              breakpoint={breakpoint}
              name="Pro"
              price="$7"
              period="/month"
              description="For heavy Vibe coders who want automation and control. AI-generated themes from prompts and brand references. Upcoming MCP-powered config to plug VibeCN into your stack."
              features={[]}
              buttonText="Pro plan coming soon"
              buttonVariant="default"
              highlighted
              badge="Coming soon"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="border-y"
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
          backgroundColor: `${colors.muted}30`,
          borderColor: colors.border,
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 
              className="font-bold tracking-tight"
              style={{ 
                fontFamily: theme.fonts.heading, 
                color: colors.foreground,
                fontSize: theme.typographySizes.h2,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p 
              className="mt-4"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Everything you need to know about our pricing
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <FaqItem theme={theme} colors={colors} question="Is this really free?" answer="Yes. The core VibeCN starter is MIT licensed. Clone it, modify it, ship it. Pro and Enterprise tiers offer additional components and support." />
            <FaqItem theme={theme} colors={colors} question="What's in Brand.md?" answer="A comprehensive brand design guide that helps AI assistants maintain consistency across your UI. Includes design tokens, component patterns, and styling conventions to ensure every AI-generated element matches your brand." />
            <FaqItem theme={theme} colors={colors} question="Does this work with other AI tools?" answer="Yes! Customize your design in the theme editor, then download your theme config and Brand.md file. These files work with any AI assistant - Cursor, GitHub Copilot, GPT, and more - ensuring consistent UI generation across all your AI tools." />
            <FaqItem theme={theme} colors={colors} question="Can I change plans later?" answer="Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference." />
          </div>
        </div>
      </section>
    </>
  );
}

function DashboardPage({ theme, colors , breakpoint }: PageProps) {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div
          className="flex items-center"
          style={{
            flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: breakpoint === 'mobile' ? 'flex-start' : 'center',
            gap: breakpoint === 'mobile' ? '1rem' : '0',
          }}
        >
          <div>
            <h1
              className="font-bold"
              style={{
                color: colors.foreground,
                fontFamily: theme.fonts.heading,
                fontSize: theme.typographySizes.h2,
              }}
            >
              Dashboard
            </h1>
            <p style={{ color: colors.mutedForeground, fontSize: theme.typographySizes.p }}>
              Live preview of your theme tokens
            </p>
          </div>
          <div
            className="flex gap-2"
            style={{
              flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
              alignItems: breakpoint === 'mobile' ? 'stretch' : 'center',
              width: breakpoint === 'mobile' ? '100%' : 'auto',
            }}
          >
            <PreviewButton
              colors={colors}
              radius={theme.buttons.borderRadius}
              variant="outline"
              fontWeight={theme.buttons.fontWeight}
              fontSize={theme.buttons.fontSize}
              hoverEffect={theme.buttons.hoverEffect}
            >
              <FileText className="size-4 mr-1.5" />
              Export
            </PreviewButton>
            <PreviewButton
              colors={colors}
              radius={theme.buttons.borderRadius}
              variant="default"
              fontWeight={theme.buttons.fontWeight}
              fontSize={theme.buttons.fontSize}
              hoverEffect={theme.buttons.hoverEffect}
            >
              <Plus className="size-4 mr-1.5" />
              Create
            </PreviewButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          }}
        >
          <DashboardStatCard colors={colors} radius={theme.radius.xl} cardPadding={theme.spacing.p[breakpoint]} title="Total Revenue" value="$45,231.89" change="+20.1%" icon={DollarSign} />
          <DashboardStatCard colors={colors} radius={theme.radius.xl} cardPadding={theme.spacing.p[breakpoint]} title="Subscriptions" value="+2,350" change="+180.1%" icon={Users} />
          <DashboardStatCard colors={colors} radius={theme.radius.xl} cardPadding={theme.spacing.p[breakpoint]} title="Active Users" value="+12,234" change="+19%" icon={Activity} />
          <DashboardStatCard colors={colors} radius={theme.radius.xl} cardPadding={theme.spacing.p[breakpoint]} title="Growth" value="+573" change="+201" icon={TrendingUp} />
        </div>

        {/* Main Content Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: breakpoint === 'desktop' ? '2fr 1fr' : '1fr',
          }}
        >
          {/* Chart Card */}
          <div
            className="p-6"
            style={{
              backgroundColor: colors.card,
              borderRadius: theme.radius.xl,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>
                  Overview
                </h3>
                <p className="text-sm" style={{ color: colors.mutedForeground }}>
                  Revenue over time
                </p>
              </div>
              <div className="flex gap-1">
                <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="ghost" size="sm" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Week</PreviewButton>
                <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="secondary" size="sm" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Month</PreviewButton>
                <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="ghost" size="sm" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Year</PreviewButton>
              </div>
            </div>
            {/* Fake Chart */}
            <div className="h-48 flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all"
                  style={{
                    height: `${height}%`,
                    backgroundColor: colors.primary,
                    borderRadius: theme.radius.sm,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar Card */}
            <div
              className="p-4"
              style={{
                backgroundColor: colors.card,
                borderRadius: theme.radius.xl,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="size-4" style={{ color: colors.mutedForeground }} />
                <span className="font-medium text-sm" style={{ color: colors.cardForeground }}>
                  December 2025
                </span>
              </div>
              <MiniCalendar colors={colors} radius={theme.radius.md} />
            </div>

            {/* Quick Actions */}
            <div
              className="p-4"
              style={{
                backgroundColor: colors.card,
                borderRadius: theme.radius.xl,
                border: `1px solid ${colors.border}`,
              }}
            >
              <h4 className="font-medium text-sm mb-3" style={{ color: colors.cardForeground }}>
                Quick Actions
              </h4>
              <div className="space-y-2">
                <QuickActionItem colors={colors} radius={theme.buttons.borderRadius} icon={Mail} label="Send Report" />
                <QuickActionItem colors={colors} radius={theme.buttons.borderRadius} icon={Users} label="Invite Team" />
                <QuickActionItem colors={colors} radius={theme.buttons.borderRadius} icon={Settings} label="Settings" />
              </div>
            </div>
          </div>
        </div>

        {/* Button Variants Row */}
        <div
          className="p-6"
          style={{
            backgroundColor: colors.card,
            borderRadius: theme.radius.xl,
            border: `1px solid ${colors.border}`,
          }}
        >
          <h3 className="font-semibold mb-4" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>
            Button Variants
          </h3>
          <p className="text-sm mb-4" style={{ color: colors.mutedForeground }}>
            Hover over buttons to see the {theme.buttons.hoverEffect} effect
          </p>
          <div className="flex flex-wrap gap-3">
            <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="default" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Default</PreviewButton>
            <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="secondary" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Secondary</PreviewButton>
            <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="outline" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Outline</PreviewButton>
            <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="ghost" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Ghost</PreviewButton>
            <PreviewButton colors={colors} radius={theme.buttons.borderRadius} variant="destructive" fontWeight={theme.buttons.fontWeight} fontSize={theme.buttons.fontSize} hoverEffect={theme.buttons.hoverEffect}>Destructive</PreviewButton>
          </div>
        </div>

        {/* Form Card */}
        <div
          className="p-6"
          style={{
            backgroundColor: colors.card,
            borderRadius: theme.radius.xl,
            border: `1px solid ${colors.border}`,
          }}
        >
          <h3 className="font-semibold mb-4" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>
            Form Elements
          </h3>
          <div
            className="grid gap-4 max-w-4xl"
            style={{
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
            }}
          >
            <div>
              <label className="font-medium block mb-1.5" style={{ color: colors.foreground, fontSize: theme.typographySizes.label }}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 outline-none transition-colors"
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  borderRadius: theme.radius.md,
                  border: `1px solid ${colors.input}`,
                  fontSize: theme.typographySizes.p,
                }}
              />
            </div>
            <div>
              <label className="font-medium block mb-1.5" style={{ color: colors.foreground, fontSize: theme.typographySizes.label }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 outline-none transition-colors"
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  borderRadius: theme.radius.md,
                  border: `1px solid ${colors.input}`,
                  fontSize: theme.typographySizes.p,
                }}
              />
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div
          className="p-6"
          style={{
            backgroundColor: colors.card,
            borderRadius: theme.radius.xl,
            border: `1px solid ${colors.border}`,
          }}
        >
          <h3 className="font-semibold mb-4" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>
            Color Palette
          </h3>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: breakpoint === 'mobile' ? 'repeat(2, 1fr)' : breakpoint === 'tablet' ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
            }}
          >
            <ColorSwatch color={colors.primary} label="Primary" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.secondary} label="Secondary" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.accent} label="Accent" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.muted} label="Muted" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.destructive} label="Destructive" radius={theme.radius.md} foreground={colors.cardForeground} />
          </div>
          <div
            className="grid gap-4 mt-4"
            style={{
              gridTemplateColumns: breakpoint === 'mobile' ? 'repeat(2, 1fr)' : breakpoint === 'tablet' ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
            }}
          >
            <ColorSwatch color={colors.chart1} label="Chart 1" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.chart2} label="Chart 2" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.chart3} label="Chart 3" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.chart4} label="Chart 4" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.chart5} label="Chart 5" radius={theme.radius.md} foreground={colors.cardForeground} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LPPage({ theme, colors , breakpoint }: PageProps) {
  return (
    <>
      {/* Hero Section - Bold Typography */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at top right, ${colors.primary}15, ${colors.background} 60%), radial-gradient(ellipse at bottom left, ${colors.chart2}10, ${colors.background} 60%)`,
        }}
      >
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${colors.foreground} 1px, transparent 1px), linear-gradient(90deg, ${colors.foreground} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div
            className="grid gap-12 items-center"
            style={{
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
            }}
          >
            <div className="space-y-8">
              {/* Floating Tag */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2"
                style={{
                  backgroundColor: `${colors.card}80`,
                  border: `1px solid ${colors.primary}20`,
                  borderRadius: '9999px',
                }}
              >
                <span
                  className="flex h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.chart2 }}
                />
                <span className="text-sm font-medium" style={{ color: colors.foreground }}>
                  Optimized for AI
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className="font-bold tracking-tight"
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: theme.typographySizes.h1,
                  lineHeight: theme.typographyStyles.lineHeightH1,
                }}
              >
                <span style={{ color: colors.foreground }}>Build Fast with</span>
                <span
                  key={`lp-gradient-${colors.primary}-${colors.chart1}-${colors.chart2}`}
                  className="block mt-2"
                  style={{
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.chart1}, ${colors.chart2})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Fewer Tokens
                </span>
              </h1>

              <p
                className="leading-relaxed"
                style={{
                  color: colors.mutedForeground,
                  fontSize: '1.125rem',
                }}
              >
                Token-optimized UI components designed for AI efficiency. Ship production-ready interfaces faster using clear, structured code that minimizes context and maximizes output quality.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex gap-4 pt-4"
                style={{
                  flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                  alignItems: breakpoint === 'mobile' ? 'stretch' : 'flex-start',
                }}
              >
                <PreviewButton
                  colors={colors}
                  radius="9999px"
                  variant="default"
                  fontWeight={theme.buttons.fontWeight}
                  fontSize={theme.buttons.fontSize}
                  hoverEffect={theme.buttons.hoverEffect}
                  size="lg"
                >
                  Save your Style
                  <ArrowRight className="ml-2 size-5" />
                </PreviewButton>
                <PreviewButton
                  colors={colors}
                  radius="9999px"
                  variant="outline"
                  fontWeight={theme.buttons.fontWeight}
                  fontSize={theme.buttons.fontSize}
                  hoverEffect={theme.buttons.hoverEffect}
                  size="lg"
                >
                  Start Customizing
                </PreviewButton>
              </div>

              {/* Social Proof */}
              <div
                className="flex items-center gap-6 pt-8"
                style={{ borderTop: `1px solid ${colors.border}50` }}
              >
                <div className="flex -space-x-3">
                  {[colors.chart1, colors.chart2, colors.chart3, colors.chart4, colors.chart5].map((color, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: `${color}30`,
                        border: `2px solid ${colors.background}`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold" style={{ color: colors.foreground }}>Built by developers,</span>
                  <span style={{ color: colors.mutedForeground }}> for vibe coders</span>
                </div>
              </div>
            </div>

            {/* Hero Visual - Card Stack */}
            <div className="relative hidden lg:block h-[400px]">
              {[
                { title: 'Dashboard', offset: 0, color: colors.primary },
                { title: 'Analytics', offset: 1, color: colors.chart2 },
                { title: 'Settings', offset: 2, color: colors.chart1 },
              ].map((card, index) => (
                <div
                  key={card.title}
                  className="absolute inset-0"
                  style={{
                    transform: `translateY(${index * 20}px) translateX(${index * 20}px) scale(${1 - index * 0.05})`,
                    zIndex: 3 - index,
                    opacity: 1 - index * 0.2,
                    backgroundColor: `${card.color}10`,
                    border: `1px solid ${colors.border}50`,
                    borderRadius: theme.radius.xl,
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.chart1 }} />
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.chart3 }} />
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.chart2 }} />
                    </div>
                    <div className="text-lg font-semibold mb-4" style={{ color: colors.foreground }}>{card.title}</div>
                    <div className="space-y-3">
                      {[80, 60, 40].map((w, i) => (
                        <div key={i} className="h-3 rounded-full" style={{ width: `${w}%`, backgroundColor: `${colors.foreground}10` }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section
        className="py-8 overflow-hidden"
        style={{
          backgroundColor: `${colors.muted}20`,
          borderTop: `1px solid ${colors.border}40`,
          borderBottom: `1px solid ${colors.border}40`,
        }}
      >
        <div className="flex items-center gap-12 justify-center">
          {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Server Components', 'Edge Runtime', 'Vercel', 'shadcn/ui'].map((tech) => (
            <span
              key={tech}
              className="text-lg font-medium"
              style={{ color: `${colors.mutedForeground}60` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Features Bento Grid */}
      <section
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 text-sm font-semibold tracking-wider uppercase mb-6"
              style={{
                backgroundColor: `${colors.primary}10`,
                color: colors.primary,
                borderRadius: '9999px',
              }}
            >
              Features
            </span>
            <h2
              className="font-bold tracking-tight mb-6"
              style={{
                fontFamily: theme.fonts.heading,
                color: colors.foreground,
                fontSize: theme.typographySizes.h2,
              }}
            >
              Everything you need,
              <br />
              <span style={{ color: colors.mutedForeground }}>nothing you don't</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div
            className="grid"
            style={{
              gap: theme.spacing.spaceY[breakpoint],
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            }}
          >
            {/* Large Card */}
            <div
              className="p-8"
              style={{
                gridColumn: breakpoint === 'mobile' ? 'span 1' : 'span 2',
                backgroundColor: `${colors.card}80`,
                border: `1px solid ${colors.border}50`,
                borderRadius: theme.radius.xl,
              }}
            >
              <div
                className="flex gap-8"
                style={{
                  flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                }}
              >
                <div className="flex-1 space-y-4">
                  <div
                    className="h-14 w-14 flex items-center justify-center"
                    style={{
                      backgroundColor: `${colors.primary}15`,
                      borderRadius: theme.radius.lg,
                    }}
                  >
                    <Zap className="size-7" style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.cardForeground }}>
                    AI-First Component Library
                  </h3>
                  <p style={{ color: colors.mutedForeground }}>
                    Pre-built authentication pages, settings panels, and dashboard layouts that AI assistants understand instantly. From concept to production-ready UI in minutes, not hours.
                  </p>
                  <div className="flex gap-3 pt-4">
                    {[{ label: 'LCP', value: '< 1.2s' }, { label: 'FID', value: '< 100ms' }, { label: 'CLS', value: '< 0.1' }].map(m => (
                      <div
                        key={m.label}
                        className="px-3 py-1.5"
                        style={{
                          backgroundColor: `${colors.chart2}10`,
                          border: `1px solid ${colors.chart2}20`,
                          borderRadius: '9999px',
                        }}
                      >
                        <span className="text-xs" style={{ color: colors.mutedForeground }}>{m.label}: </span>
                        <span className="text-xs font-semibold" style={{ color: colors.chart2 }}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="w-48 h-32 flex items-end gap-2 p-4"
                  style={{
                    backgroundColor: `${colors.primary}05`,
                    border: `1px solid ${colors.border}50`,
                    borderRadius: theme.radius.lg,
                  }}
                >
                  {[85, 92, 78, 96, 88, 95, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(to top, ${colors.primary}, ${colors.chart2})`,
                        borderRadius: theme.radius.sm,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tall Card */}
            <div
              className="p-8"
              style={{
                gridRow: breakpoint === 'desktop' ? 'span 2' : 'span 1',
                backgroundColor: `${colors.card}80`,
                border: `1px solid ${colors.border}50`,
                borderRadius: theme.radius.xl,
              }}
            >
              <div
                className="h-14 w-14 flex items-center justify-center"
                style={{
                  backgroundColor: `${colors.chart1}15`,
                  borderRadius: theme.radius.lg,
                }}
              >
                <Palette className="size-7" style={{ color: colors.chart1 }} />
              </div>
              <h3 className="text-2xl font-bold mt-6" style={{ color: colors.cardForeground }}>
                Visual Theme Editor
              </h3>
              <p className="mt-4" style={{ color: colors.mutedForeground }}>
                Live theme customization with instant preview. Adjust colors, typography, spacing, and radius - all changes propagate through your entire application automatically.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex gap-2">
                  {[colors.primary, colors.chart1, colors.chart2, colors.chart3, colors.chart4].map((c, i) => (
                    <div
                      key={i}
                      className="h-8 w-8"
                      style={{ backgroundColor: c, borderRadius: theme.radius.md }}
                    />
                  ))}
                </div>
                <div
                  className="h-8 w-full"
                  style={{
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.chart1}, ${colors.chart2})`,
                    borderRadius: theme.radius.md,
                  }}
                />
              </div>
            </div>

            {/* Small Cards */}
            {[
              { icon: Lock, title: 'Polished UI Out of the Box', desc: 'Glassmorphic effects, smooth animations, and refined interactions. Every component designed for modern SaaS applications.', color: colors.chart2 },
              { icon: Code, title: 'Token-Optimized Structure', desc: 'Flat file organization and clear naming conventions. AI reads your codebase efficiently, generating consistent, on-brand components every time.', color: colors.chart4 },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8"
                style={{
                  backgroundColor: `${colors.card}80`,
                  border: `1px solid ${colors.border}50`,
                  borderRadius: theme.radius.xl,
                }}
              >
                <div
                  className="h-12 w-12 flex items-center justify-center"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderRadius: theme.radius.lg,
                  }}
                >
                  <item.icon className="size-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold mt-6" style={{ color: colors.cardForeground }}>{item.title}</h3>
                <p className="mt-3" style={{ color: colors.mutedForeground }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            paddingLeft: theme.spacing.px[breakpoint],
            paddingRight: theme.spacing.px[breakpoint],
          }}
        >
          <div
            className="relative overflow-hidden px-8 py-20"
            style={{
              backgroundColor: colors.primary,
              borderRadius: theme.radius.xl,
            }}
          >
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              style={{ backgroundColor: `${colors.primaryForeground}10` }}
            />
            <div
              className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              style={{ backgroundColor: `${colors.chart2}20` }}
            />

            <div className="relative text-center">
              <h2
                className="font-bold tracking-tight mb-6"
                style={{
                  color: colors.primaryForeground,
                  fontFamily: theme.fonts.heading,
                  fontSize: theme.typographySizes.h2,
                }}
              >
                Ready to build differently?
              </h2>
              <p
                className="mx-auto mb-10"
                style={{
                  color: `${colors.primaryForeground}cc`,
                  fontSize: theme.typographySizes.p,
                }}
              >
                Join developers building production-ready UIs with AI assistance. Start free today.
              </p>
              <div
                className="flex gap-4"
                style={{
                  flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                  justifyContent: 'center',
                  alignItems: breakpoint === 'mobile' ? 'stretch' : 'center',
                }}
              >
                <PreviewButton
                  colors={colors}
                  radius="9999px"
                  variant="secondary"
                  fontWeight={theme.buttons.fontWeight}
                  fontSize={theme.buttons.fontSize}
                  hoverEffect={theme.buttons.hoverEffect}
                  size="lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 size-5" />
                </PreviewButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Sub-components
// ─────────────────────────────────────────────────────────────────────────────

interface PreviewButtonProps {
  children: React.ReactNode;
  colors: ColorTokens;
  radius: string;
  variant: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  fontWeight?: string;
  fontSize?: string;
  hoverEffect?: string;
}

function PreviewButton({ 
  children, 
  colors, 
  radius, 
  variant, 
  size = 'default', 
  fontWeight = '500',
  fontSize = '0.875rem',
  hoverEffect = 'opacity',
}: PreviewButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: colors.primary,
      color: colors.primaryForeground,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.secondaryForeground,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.foreground,
      border: `1px solid ${colors.border}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.foreground,
    },
    destructive: {
      backgroundColor: colors.destructive,
      color: colors.destructiveForeground,
    },
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1',
    default: 'px-4 py-2',
    lg: 'px-6 py-3',
  };
  
  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'opacity':
        return 'hover:opacity-80';
      case 'lift':
        return 'hover:-translate-y-0.5 hover:shadow-lg';
      case 'scale':
        return 'hover:scale-105';
      case 'glow':
        return 'hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]';
      default:
        return '';
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 ${sizeClasses[size]} ${getHoverClasses()}`}
      style={{
        ...styles[variant],
        borderRadius: radius,
        fontWeight: fontWeight,
        fontSize: fontSize,
      }}
    >
      {children}
    </button>
  );
}

function PreviewFooter({ theme, colors , breakpoint }: PageProps) {
  return (
    <footer
      className="border-t mt-auto"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <div
        className="max-w-6xl mx-auto"
        style={{
          paddingLeft: theme.spacing.px[breakpoint],
          paddingRight: theme.spacing.px[breakpoint],
          paddingTop: theme.spacing.py[breakpoint],
          paddingBottom: theme.spacing.py[breakpoint],
        }}
      >
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: breakpoint === 'mobile' ? 'repeat(2, 1fr)' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          }}
        >
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="size-8 flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryForeground,
                  borderRadius: theme.radius.md,
                }}
              >
                V
              </div>
              <span className="font-semibold" style={{ color: colors.foreground, fontFamily: theme.fonts.heading }}>
                VibeCN
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: colors.mutedForeground }}>
              Token-optimized UI components designed for AI efficiency. Build production-ready interfaces faster.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 transition-colors hover:opacity-80" style={{ backgroundColor: colors.muted, borderRadius: theme.radius.md, color: colors.mutedForeground }}>
                <Twitter className="size-4" />
              </a>
              <a href="#" className="p-2 transition-colors hover:opacity-80" style={{ backgroundColor: colors.muted, borderRadius: theme.radius.md, color: colors.mutedForeground }}>
                <Github className="size-4" />
              </a>
              <a href="#" className="p-2 transition-colors hover:opacity-80" style={{ backgroundColor: colors.muted, borderRadius: theme.radius.md, color: colors.mutedForeground }}>
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: colors.foreground }}>Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Dashboard', 'Integrations', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: colors.foreground }}>Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Blog', 'Community', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: colors.foreground }}>Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-8 mt-8 flex items-center"
          style={{
            borderColor: colors.border,
            flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
            justifyContent: breakpoint === 'mobile' ? 'center' : 'space-between',
            gap: breakpoint === 'mobile' ? '1rem' : '0',
            textAlign: breakpoint === 'mobile' ? 'center' : 'left',
          }}
        >
          <p className="text-sm" style={{ color: colors.mutedForeground }}>© 2025 VibeCN. All rights reserved.</p>
          <div className="flex items-center" style={{ gap: breakpoint === 'mobile' ? '0.75rem' : '1rem' }}>
            <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>Privacy</a>
            <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>Terms</a>
            {breakpoint !== 'mobile' && (
              <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>Cookies</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature Components
// ─────────────────────────────────────────────────────────────────────────────

interface FeatureCardProps {
  theme: BrandTheme;
  colors: ColorTokens;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
}

function FeatureCard({ theme, colors, breakpoint, icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="transition-all hover:shadow-lg"
      style={{
        backgroundColor: `${colors.card}80`,
        border: `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
        padding: theme.spacing.p[breakpoint],
      }}
    >
      <div
        className="mb-4 inline-flex h-12 w-12 items-center justify-center"
        style={{
          backgroundColor: `${colors.primary}15`,
          color: colors.primary,
          borderRadius: theme.radius.lg,
        }}
      >
        <Icon className="size-6" />
      </div>
      <h3 className="font-semibold mb-2" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: colors.mutedForeground }}>
        {description}
      </p>
    </div>
  );
}

interface LargeFeatureCardProps {
  theme: BrandTheme;
  colors: ColorTokens;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  features: string[];
}

function LargeFeatureCard({ theme, colors, breakpoint, icon: Icon, title, description, features }: LargeFeatureCardProps) {
  return (
    <div
      style={{
        backgroundColor: `${colors.card}80`,
        border: `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
        padding: theme.spacing.p[breakpoint],
      }}
    >
      <div
        className="mb-6 inline-flex h-14 w-14 items-center justify-center"
        style={{
          backgroundColor: `${colors.primary}15`,
          color: colors.primary,
          borderRadius: theme.radius.lg,
        }}
      >
        <Icon className="size-8" />
      </div>
      <h3 className="font-bold mb-3" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>
        {title}
      </h3>
      <p className="leading-relaxed mb-6" style={{ color: colors.mutedForeground }}>
        {description}
      </p>
      <ul className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: colors.foreground }}>
            <Check className="size-4" style={{ color: colors.primary }} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StatItemProps {
  colors: ColorTokens;
  value: string;
  label: string;
}

function StatItem({ colors, value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold tracking-tight" style={{ color: colors.foreground }}>{value}</div>
      <div className="mt-1 text-sm" style={{ color: colors.mutedForeground }}>{label}</div>
    </div>
  );
}

interface PerformanceItemProps {
  colors: ColorTokens;
  theme: BrandTheme;
  title: string;
  description: string;
}

function PerformanceItem({ colors, theme, title, description }: PerformanceItemProps) {
  return (
    <li className="flex gap-4">
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${colors.primary}15` }}
      >
        <Check className="size-4" style={{ color: colors.primary }} />
      </div>
      <div>
        <h4 className="font-semibold" style={{ color: colors.foreground }}>{title}</h4>
        <p className="text-sm" style={{ color: colors.mutedForeground }}>{description}</p>
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pricing Components
// ─────────────────────────────────────────────────────────────────────────────

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  theme: BrandTheme;
  colors: ColorTokens;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  highlighted?: boolean;
  badge?: string;
}

function PricingCard({ theme, colors, breakpoint, name, price, period, description, features, buttonText, buttonVariant, highlighted, badge }: PricingCardProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: colors.card,
        border: highlighted ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
        transform: highlighted ? 'scale(1.05)' : 'none',
        boxShadow: highlighted ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
        padding: theme.spacing.p[breakpoint],
      }}
    >
      {badge && (
        <div
          className="absolute -right-12 top-6 rotate-45 px-12 py-1 text-xs font-semibold"
          style={{
            backgroundColor: colors.primary,
            color: colors.primaryForeground,
          }}
        >
          {badge}
        </div>
      )}
      <div className="mb-6">
        <h3 className="font-bold" style={{ color: colors.cardForeground, fontFamily: theme.fonts.heading, fontSize: theme.typographySizes.h3 }}>{name}</h3>
        <p className="text-sm mt-1" style={{ color: colors.mutedForeground }}>{description}</p>
        <div className="mt-4">
          <span className="text-5xl font-bold tracking-tight" style={{ color: colors.cardForeground }}>{price}</span>
          {period && <span style={{ color: colors.mutedForeground }}>{period}</span>}
        </div>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-sm">
            {feature.included ? (
              <Check className="size-5 shrink-0" style={{ color: colors.primary }} />
            ) : (
              <X className="size-5 shrink-0" style={{ color: `${colors.mutedForeground}50` }} />
            )}
            <span style={{ color: feature.included ? colors.foreground : colors.mutedForeground }}>{feature.text}</span>
          </li>
        ))}
      </ul>
      <PreviewButton
        colors={colors}
        radius={theme.buttons.borderRadius}
        variant={buttonVariant}
        fontWeight={theme.buttons.fontWeight}
        fontSize={theme.buttons.fontSize}
        hoverEffect={theme.buttons.hoverEffect}
      >
        {buttonText}
      </PreviewButton>
    </div>
  );
}

interface FaqItemProps {
  theme: BrandTheme;
  colors: ColorTokens;
  question: string;
  answer: string;
}

function FaqItem({ theme, colors, question, answer }: FaqItemProps) {
  return (
    <div
      className="p-6 transition-colors"
      style={{
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
      }}
    >
      <h3 className="font-semibold" style={{ color: colors.foreground, fontSize: theme.typographySizes.h4 }}>{question}</h3>
      <p className="mt-2 leading-relaxed" style={{ color: colors.mutedForeground, fontSize: theme.typographySizes.p }}>{answer}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard Components
// ─────────────────────────────────────────────────────────────────────────────

interface DashboardStatCardProps {
  colors: ColorTokens;
  radius: string;
  cardPadding: string;
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

function DashboardStatCard({ colors, radius, cardPadding, title, value, change, icon: Icon }: DashboardStatCardProps) {
  return (
    <div
      style={{
        backgroundColor: colors.card,
        borderRadius: radius,
        border: `1px solid ${colors.border}`,
        padding: cardPadding,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: colors.mutedForeground }}>{title}</span>
        <Icon className="size-4" style={{ color: colors.mutedForeground }} />
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold" style={{ color: colors.cardForeground }}>{value}</span>
        <span className="text-xs ml-2" style={{ color: colors.mutedForeground }}>{change} from last month</span>
      </div>
    </div>
  );
}

interface MiniCalendarProps {
  colors: ColorTokens;
  radius: string;
}

function MiniCalendar({ colors, radius }: MiniCalendarProps) {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, null, null, null, null],
  ];
  const today = 6;

  return (
    <div className="text-xs">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {days.map((day) => (
          <div key={day} className="text-center py-1" style={{ color: colors.mutedForeground }}>{day}</div>
        ))}
      </div>
      {dates.map((week, i) => (
        <div key={i} className="grid grid-cols-7 gap-1">
          {week.map((date, j) => (
            <div
              key={j}
              className="text-center py-1 transition-colors"
              style={{
                color: date === today ? colors.primaryForeground : date ? colors.foreground : 'transparent',
                backgroundColor: date === today ? colors.primary : 'transparent',
                borderRadius: radius,
              }}
            >
              {date || ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface QuickActionItemProps {
  colors: ColorTokens;
  radius: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
}

function QuickActionItem({ colors, radius, icon: Icon, label }: QuickActionItemProps) {
  return (
    <button
      className="w-full flex items-center justify-between p-2 transition-colors hover:opacity-80"
      style={{
        backgroundColor: colors.muted,
        borderRadius: radius,
      }}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4" style={{ color: colors.mutedForeground }} />
        <span className="text-sm" style={{ color: colors.foreground }}>{label}</span>
      </div>
      <ChevronRight className="size-4" style={{ color: colors.mutedForeground }} />
    </button>
  );
}

interface ColorSwatchProps {
  color: string;
  label: string;
  radius: string;
  foreground: string;
}

function ColorSwatch({ color, label, radius, foreground }: ColorSwatchProps) {
  return (
    <div>
      <div className="h-12 w-full mb-2" style={{ backgroundColor: color, borderRadius: radius }} />
      <p className="text-xs font-medium" style={{ color: foreground }}>{label}</p>
      <p className="text-xs font-mono" style={{ color: foreground, opacity: 0.6 }}>{color}</p>
    </div>
  );
}
