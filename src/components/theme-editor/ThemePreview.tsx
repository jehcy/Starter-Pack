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

type PreviewPage = 'home' | 'features' | 'pricing' | 'dashboard';

interface ThemePreviewProps {
  theme: BrandTheme;
  mode: 'light' | 'dark';
  onModeChange?: (mode: 'light' | 'dark') => void;
}

export function ThemePreview({ theme, mode, onModeChange }: ThemePreviewProps) {
  const [currentPage, setCurrentPage] = useState<PreviewPage>('home');
  const colors = mode === 'light' ? theme.colors.light : theme.colors.dark;

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
      className="h-full overflow-auto flex flex-col"
      style={{
        ...cssVariables,
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: theme.fonts.sans,
        lineHeight: theme.typographyStyles.lineHeight,
        letterSpacing: `${theme.typographyStyles.letterSpacing}em`,
      } as React.CSSProperties}
    >
      {/* Navigation Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div
                className="size-8 flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryForeground,
                  borderRadius: theme.radius.md,
                }}
              >
                S
              </div>
              <span className="font-semibold" style={{ color: colors.foreground, fontFamily: theme.fonts.heading }}>
                SaaS Starter
              </span>
            </div>
            
            {/* Nav Items */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setCurrentPage(item.page)}
                  className="px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    color: currentPage === item.page ? colors.foreground : colors.mutedForeground,
                    backgroundColor: currentPage === item.page ? colors.muted : 'transparent',
                    borderRadius: theme.radius.md,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={handleToggleMode}
              className="p-2 transition-colors hover:opacity-80"
              style={{
                backgroundColor: 'transparent',
                color: colors.foreground,
                borderRadius: theme.radius.md,
              }}
              title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>
            <PreviewButton colors={colors} radius={theme.radius.md} variant="ghost">
              <Bell className="size-4" />
            </PreviewButton>
            <PreviewButton colors={colors} radius={theme.radius.md} variant="default">
              Get Started
            </PreviewButton>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1">
        {currentPage === 'home' && <HomePage theme={theme} colors={colors} />}
        {currentPage === 'features' && <FeaturesPage theme={theme} colors={colors} />}
        {currentPage === 'pricing' && <PricingPage theme={theme} colors={colors} />}
        {currentPage === 'dashboard' && <DashboardPage theme={theme} colors={colors} />}
      </div>

      {/* Footer */}
      <PreviewFooter theme={theme} colors={colors} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Components
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  theme: BrandTheme;
  colors: ColorTokens;
}

function HomePage({ theme, colors }: PageProps) {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24"
        style={{
          background: `radial-gradient(ellipse at top, ${colors.primary}20, ${colors.background} 70%)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
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
              Now in public beta
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
              Build your SaaS
              <span 
                className="block mt-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                faster than ever
              </span>
            </h1>
            <p 
              className="mx-auto mt-8 max-w-4xl leading-relaxed"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              A modern starter template with authentication, database integration, and beautiful UI
              components. Ship your product in days, not months.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <PreviewButton 
                colors={colors} 
                radius={theme.buttons.borderRadius}
                variant="default"
                fontWeight={theme.buttons.fontWeight}
                fontSize={theme.buttons.fontSize}
                hoverEffect={theme.buttons.hoverEffect}
                size="lg"
              >
                Get Started Free
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
                View Documentation
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
        <div className="max-w-6xl mx-auto px-6">
          <p 
            className="mb-8 text-center text-sm font-medium uppercase tracking-wider"
            style={{ color: colors.mutedForeground }}
          >
            Trusted by developers worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {['Vercel', 'Next.js', 'Tailwind', 'Shadcn', 'TypeScript', 'React'].map((name) => (
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
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
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
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard theme={theme} colors={colors} icon={Zap} title="Next.js 14" description="App Router, Server Components, and the latest React features." />
            <FeatureCard theme={theme} colors={colors} icon={Code} title="TypeScript" description="Full type safety across your entire codebase." />
            <FeatureCard theme={theme} colors={colors} icon={Palette} title="Tailwind CSS" description="Utility-first CSS with dark mode support." />
            <FeatureCard theme={theme} colors={colors} icon={Database} title="InstantDB" description="Real-time database with instant sync." />
            <FeatureCard theme={theme} colors={colors} icon={Lock} title="Authentication" description="Secure auth flows with protected routes." />
            <FeatureCard theme={theme} colors={colors} icon={Smartphone} title="Responsive" description="Mobile-first design on all screen sizes." />
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StatItem colors={colors} value="10k+" label="Developers" />
            <StatItem colors={colors} value="50+" label="Components" />
            <StatItem colors={colors} value="99.9%" label="Uptime" />
            <StatItem colors={colors} value="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
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
                Ready to get started?
              </h2>
              <p 
                className="mx-auto mt-4 max-w-4xl"
                style={{ 
                  color: `${colors.primaryForeground}cc`,
                  fontSize: theme.typographySizes.p,
                }}
              >
                Create your account and start building in minutes. No credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <PreviewButton 
                  colors={colors} 
                  radius={theme.buttons.borderRadius}
                  variant="secondary"
                  fontWeight={theme.buttons.fontWeight}
                  fontSize={theme.buttons.fontSize}
                  hoverEffect={theme.buttons.hoverEffect}
                  size="lg"
                >
                  Start Building Today
                </PreviewButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturesPage({ theme, colors }: PageProps) {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24"
        style={{
          background: `radial-gradient(ellipse at top, ${colors.primary}20, ${colors.background} 70%)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
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
              Powerful Features for
              <span 
                className="block mt-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Modern Applications
              </span>
            </h1>
            <p 
              className="mx-auto mt-6 max-w-4xl leading-relaxed"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Everything you need to build, launch, and scale your SaaS product with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Large Feature Cards */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <LargeFeatureCard 
              theme={theme} 
              colors={colors} 
              icon={Zap} 
              title="Next.js 14 App Router"
              description="Built on the latest Next.js with server components, streaming, and the new app directory structure."
              features={['Server Components', 'Streaming SSR', 'File-based routing', 'API Routes']}
            />
            <LargeFeatureCard 
              theme={theme} 
              colors={colors} 
              icon={Code} 
              title="TypeScript First"
              description="Full type safety across your entire codebase with strict TypeScript configuration."
              features={['Strict mode enabled', 'Type inference', 'IDE integration', 'Error prevention']}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        className="border-y py-24"
        style={{
          backgroundColor: `${colors.muted}30`,
          borderColor: colors.border,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard theme={theme} colors={colors} icon={Palette} title="Tailwind CSS" description="Utility-first CSS framework with dark mode support and custom theming." />
            <FeatureCard theme={theme} colors={colors} icon={Database} title="shadcn/ui Components" description="Beautiful, accessible, and customizable components built with Radix UI." />
            <FeatureCard theme={theme} colors={colors} icon={Database} title="InstantDB Integration" description="Real-time database with instant sync, offline support, and optimistic updates." />
            <FeatureCard theme={theme} colors={colors} icon={Lock} title="Authentication Ready" description="Secure authentication flows with protected routes and session management." />
            <FeatureCard theme={theme} colors={colors} icon={Settings} title="Theme Editor" description="Built-in visual theme editor to customize colors, spacing, and typography." />
            <FeatureCard theme={theme} colors={colors} icon={Smartphone} title="Responsive Design" description="Mobile-first approach with beautiful layouts on all screen sizes." />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
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
                Optimized for speed
              </h2>
              <p 
                className="mt-4 leading-relaxed"
                style={{ 
                  color: colors.mutedForeground,
                  fontSize: theme.typographySizes.p,
                }}
              >
                Built with performance in mind from the ground up. Every component is optimized
                for the best possible user experience.
              </p>
              <ul className="mt-8 space-y-4">
                <PerformanceItem colors={colors} theme={theme} title="100/100 Lighthouse Score" description="Achieve perfect performance scores out of the box" />
                <PerformanceItem colors={colors} theme={theme} title="Edge-ready deployment" description="Deploy to the edge for ultra-low latency worldwide" />
                <PerformanceItem colors={colors} theme={theme} title="Automatic code splitting" description="Only load the JavaScript you need, when you need it" />
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

function PricingPage({ theme, colors }: PageProps) {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-24"
        style={{
          background: `radial-gradient(ellipse at top, ${colors.primary}20, ${colors.background} 70%)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
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
              Simple, Transparent
              <span 
                className="block mt-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Pricing
              </span>
            </h1>
            <p 
              className="mx-auto mt-6 max-w-4xl leading-relaxed"
              style={{ 
                color: colors.mutedForeground,
                fontSize: theme.typographySizes.p,
              }}
            >
              Choose the plan that works best for you. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            <PricingCard 
              theme={theme}
              colors={colors}
              name="Starter"
              price="$0"
              period="/month"
              description="Perfect for side projects"
              features={[
                { text: 'Up to 3 projects', included: true },
                { text: '1,000 API requests/month', included: true },
                { text: 'Community support', included: true },
                { text: 'Custom domains', included: false },
                { text: 'Team collaboration', included: false },
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard 
              theme={theme}
              colors={colors}
              name="Pro"
              price="$29"
              period="/month"
              description="For growing teams"
              features={[
                { text: 'Unlimited projects', included: true },
                { text: '100,000 API requests/month', included: true },
                { text: 'Priority support', included: true },
                { text: 'Custom domains', included: true },
                { text: 'Team collaboration', included: true },
              ]}
              buttonText="Start Free Trial"
              buttonVariant="default"
              highlighted
              badge="Most Popular"
            />
            <PricingCard 
              theme={theme}
              colors={colors}
              name="Enterprise"
              price="Custom"
              period=""
              description="For large organizations"
              features={[
                { text: 'Everything in Pro', included: true },
                { text: 'Unlimited API requests', included: true },
                { text: 'Dedicated support', included: true },
                { text: 'SLA guarantee', included: true },
                { text: 'Custom integrations', included: true },
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="border-y py-24"
        style={{
          backgroundColor: `${colors.muted}30`,
          borderColor: colors.border,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
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
            <FaqItem theme={theme} colors={colors} question="Can I change plans later?" answer="Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately." />
            <FaqItem theme={theme} colors={colors} question="What payment methods do you accept?" answer="We accept all major credit cards, PayPal, and bank transfers for enterprise customers." />
            <FaqItem theme={theme} colors={colors} question="Is there a free trial?" answer="Yes, all paid plans come with a 14-day free trial. No credit card required to start." />
            <FaqItem theme={theme} colors={colors} question="Do you offer refunds?" answer="Yes, we offer a 30-day money-back guarantee if you're not satisfied." />
          </div>
        </div>
      </section>
    </>
  );
}

function DashboardPage({ theme, colors }: PageProps) {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-2">
            <PreviewButton colors={colors} radius={theme.radius.md} variant="outline">
              <FileText className="size-4 mr-1.5" />
              Export
            </PreviewButton>
            <PreviewButton colors={colors} radius={theme.radius.md} variant="default">
              <Plus className="size-4 mr-1.5" />
              Create
            </PreviewButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <DashboardStatCard colors={colors} radius={theme.radius.xl} title="Total Revenue" value="$45,231.89" change="+20.1%" icon={DollarSign} />
          <DashboardStatCard colors={colors} radius={theme.radius.xl} title="Subscriptions" value="+2,350" change="+180.1%" icon={Users} />
          <DashboardStatCard colors={colors} radius={theme.radius.xl} title="Active Users" value="+12,234" change="+19%" icon={Activity} />
          <DashboardStatCard colors={colors} radius={theme.radius.xl} title="Growth" value="+573" change="+201" icon={TrendingUp} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Chart Card */}
          <div
            className="col-span-2 p-6"
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
                <PreviewButton colors={colors} radius={theme.radius.md} variant="ghost" size="sm">Week</PreviewButton>
                <PreviewButton colors={colors} radius={theme.radius.md} variant="secondary" size="sm">Month</PreviewButton>
                <PreviewButton colors={colors} radius={theme.radius.md} variant="ghost" size="sm">Year</PreviewButton>
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
                <QuickActionItem colors={colors} radius={theme.radius.md} icon={Mail} label="Send Report" />
                <QuickActionItem colors={colors} radius={theme.radius.md} icon={Users} label="Invite Team" />
                <QuickActionItem colors={colors} radius={theme.radius.md} icon={Settings} label="Settings" />
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
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
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
          <div className="grid grid-cols-5 gap-4">
            <ColorSwatch color={colors.primary} label="Primary" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.secondary} label="Secondary" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.accent} label="Accent" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.muted} label="Muted" radius={theme.radius.md} foreground={colors.cardForeground} />
            <ColorSwatch color={colors.destructive} label="Destructive" radius={theme.radius.md} foreground={colors.cardForeground} />
          </div>
          <div className="grid grid-cols-5 gap-4 mt-4">
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

function PreviewFooter({ theme, colors }: PageProps) {
  return (
    <footer
      className="border-t mt-auto"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8">
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
                S
              </div>
              <span className="font-semibold" style={{ color: colors.foreground, fontFamily: theme.fonts.heading }}>
                SaaS Starter
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: colors.mutedForeground }}>
              Build beautiful SaaS products faster with our modern starter kit.
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
        <div className="border-t pt-8 mt-8 flex items-center justify-between" style={{ borderColor: colors.border }}>
          <p className="text-sm" style={{ color: colors.mutedForeground }}>© 2025 SaaS Starter. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>Privacy</a>
            <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>Terms</a>
            <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.mutedForeground }}>Cookies</a>
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
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
}

function FeatureCard({ theme, colors, icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="p-6 transition-all hover:shadow-lg"
      style={{
        backgroundColor: `${colors.card}80`,
        border: `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
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
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  features: string[];
}

function LargeFeatureCard({ theme, colors, icon: Icon, title, description, features }: LargeFeatureCardProps) {
  return (
    <div
      className="p-8"
      style={{
        backgroundColor: `${colors.card}80`,
        border: `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
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

function PricingCard({ theme, colors, name, price, period, description, features, buttonText, buttonVariant, highlighted, badge }: PricingCardProps) {
  return (
    <div
      className="relative overflow-hidden p-6"
      style={{
        backgroundColor: colors.card,
        border: highlighted ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
        borderRadius: theme.radius.xl,
        transform: highlighted ? 'scale(1.05)' : 'none',
        boxShadow: highlighted ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
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
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

function DashboardStatCard({ colors, radius, title, value, change, icon: Icon }: DashboardStatCardProps) {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: colors.card,
        borderRadius: radius,
        border: `1px solid ${colors.border}`,
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
