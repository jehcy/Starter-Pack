'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/cards/card';
import { useState, useEffect } from 'react';
import { CTA } from '@/components/cta';
import { PricingCardV2 } from '@/components/cards/pricing-card-v2';
import { Zap, Palette, Shield, Code2, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden py-24">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Floating Tag */}
              <div className={`inline-block transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Optimized for AI
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <div className={`space-y-3 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <h1 className="font-bold">
                  Build Fast with <span className="text-primary">Fewer Tokens</span>
                </h1>
              </div>

              {/* Description with left accent */}
              <div className={`border-l-4 border-primary pl-6 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-xl text-muted-foreground">
                  Token-optimized UI components designed for AI efficiency. Ship production-ready interfaces faster using clear, structured code that minimizes context and maximizes output quality.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg font-semibold hover:translate-y-[-2px] transition-all group"
                  asChild
                >
                  <Link href="/sign-up">
                    Save Your Style
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg font-semibold hover:translate-y-[-2px] transition-all"
                  asChild
                >
                  <Link href="/theme">Start Customizing</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className={`pt-8 border-t border-border/40 transition-all duration-700 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `hsl(${i * 60}, 60%, 85%)` }}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-sm">
                    <span className="font-semibold text-foreground">Customize every color,</span>
                    <span className="text-muted-foreground"> code your vibe</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative w-full pl-0 sm:pl-6 md:pl-12 max-w-[400px] min-h-[auto] md:min-h-[auto] mx-auto lg:mx-0 flex items-center justify-center lg:justify-end">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-6 border-y-4 border-primary bg-primary/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 mx-12">
              {[
                'Next.js 16',
                'TypeScript',
                'Tailwind CSS',
                'React 19',
                'InstantDB',
                'shadcn/ui',
                'Edge Runtime',
              ].map((tech) => (
                <span
                  key={`${idx}-${tech}`}
                  className="font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container-wide">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block rounded-full border border-border bg-muted px-4 py-2 mb-6">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider">Features</span>
            </div>
            <h2 className="font-bold mb-6">
              Everything You Need, <span className="text-muted-foreground">Nothing You Don't</span>
            </h2>
          </div>

          {/* Feature Rows with alternating alignment */}
          <div className="max-w-5xl mx-auto space-y-24">
            {/* Feature 1 - AI-First Components */}
            <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-chart-1/20 border-l-4 border-chart-1">
                  <Zap className="h-7 w-7 text-chart-1" />
                </div>
                <div>
                  <h3 className="font-bold mb-4">AI-First Component Library</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Pre-built authentication pages, settings panels, and dashboard layouts that AI assistants understand instantly. From concept to production-ready UI in minutes, not hours.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <MetricBadge label="LCP" value="< 1.2s" />
                  <MetricBadge label="FID" value="< 100ms" />
                  <MetricBadge label="CLS" value="< 0.1" />
                </div>
              </div>
              <Card className="border-l-4 border-chart-1 hover:translate-y-[-4px] transition-all">
                <CardContent className="p-8">
                  <PerformanceChart />
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 - Visual Theme Editor */}
            <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Card className="border-l-4 border-chart-2 hover:translate-y-[-4px] transition-all md:order-first">
                <CardContent className="p-8">
                  <ColorPalettePreview />
                </CardContent>
              </Card>
              <div className="space-y-6 md:order-last">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-chart-2/20 border-l-4 border-chart-2">
                  <Palette className="h-7 w-7 text-chart-2" />
                </div>
                <div>
                  <h3 className="font-bold mb-4">Visual Theme Editor</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Live theme customization with instant preview. Adjust colors, typography, spacing, and radius - all changes propagate through your entire application automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 & 4 - Grid */}
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                iconColor="chart-3"
                title="Polished UI Out of the Box"
                description="Smooth animations, refined interactions, and attention to detail. Every component designed for modern SaaS applications with accessibility in mind."
              />
              <FeatureCard
                icon={<Code2 className="h-6 w-6" />}
                iconColor="chart-4"
                title="Token-Optimized Structure"
                description="Flat file organization and clear naming conventions. AI reads your codebase efficiently, generating consistent, on-brand components every time."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-20">
            <div className="inline-block rounded-full border border-border bg-background px-4 py-2 mb-6">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">Pricing</span>
            </div>
            <h2 className="font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:translate-y-[-4px] transition-all">
              <PricingCardV2
                tier="Free"
                price="$0"
                period="/month"
                description="Perfect for getting your design system ready before you start coding. Unlimited theme tweaks, brand setup, and React starter pack downloads."
                buttonText="Start for Free"
                buttonHref="/sign-up"
              />
            </Card>
            <Card className="border-primary border-2 hover:translate-y-[-4px] transition-all md:scale-105">
              <PricingCardV2
                tier="Pro"
                price="$7"
                period="/month"
                description="For heavy Vibe coders who want automation and control. AI-generated themes from prompts and brand references. MCP-powered config coming soon."
                buttonText="Pro plan coming soon"
                buttonDisabled
                comingSoon
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA />
    </>
  );
}

/* ============================================
   SUBCOMPONENTS
   ============================================ */

function HeroVisual() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const screenshots = [
    { src: '/assets/img/s1.jpeg', alt: 'Settings Interface' },
    { src: '/assets/img/s2.jpeg', alt: 'Dashboard View' },
    { src: '/assets/img/s3.jpeg', alt: 'Application UI' },
  ];

  return (
    <div className="relative w-full max-w-[500px] min-h-[400px] md:min-h-[500px]">
      {screenshots.map((screenshot, index) => (
        <div
          key={screenshot.src}
          className="absolute top-0 sm:top-[-50px] left-0 sm:left-[30px] w-full rounded-lg border border-border overflow-hidden shadow-lg transition-all duration-700 ease-out"
          style={{
            transform: `
              translateY(${((index - activeCard + 3) % 3) * 30}px)
              translateX(${((index - activeCard + 3) % 3) * 50}px)
              scale(${1 - ((index - activeCard + 3) % 3) * 0.05})
            `,
            zIndex: 3 - ((index - activeCard + 3) % 3),
            opacity: 1 - ((index - activeCard + 3) % 3) * 0.4,
          }}
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={1200}
            height={800}
            className="w-full h-auto"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}

function PerformanceChart() {
  const bars = [85, 92, 78, 96, 88, 95, 90];

  return (
    <div className="flex items-end justify-center gap-3 h-48">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-8 bg-gradient-to-t from-chart-1 to-chart-2 rounded-t transition-all duration-300 hover:opacity-80"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function ColorPalettePreview() {
  const colors = [
    { name: 'Primary', class: 'bg-primary', border: 'border-primary' },
    { name: 'Chart 1', class: 'bg-chart-1', border: 'border-chart-1' },
    { name: 'Chart 2', class: 'bg-chart-2', border: 'border-chart-2' },
    { name: 'Chart 3', class: 'bg-chart-3', border: 'border-chart-3' },
    { name: 'Chart 4', class: 'bg-chart-4', border: 'border-chart-4' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {colors.map((color) => (
          <div key={color.name} className="space-y-2">
            <div
              className={`h-16 w-full ${color.class} rounded-lg border ${color.border} hover:scale-105 transition-transform cursor-pointer`}
              title={color.name}
            />
            <p className="text-xs font-mono text-muted-foreground text-center">{color.name}</p>
          </div>
        ))}
      </div>
      <div className="h-4 w-full bg-gradient-to-r from-primary via-chart-1 via-chart-2 via-chart-3 to-chart-4 rounded-full" />
    </div>
  );
}

interface MetricBadgeProps {
  label: string;
  value: string;
}

function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted">
      <span className="font-mono text-xs text-muted-foreground">{label}:</span>
      <span className="font-mono text-xs font-bold text-primary">{value}</span>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, iconColor, title, description }: FeatureCardProps) {
  const colorMap: Record<string, string> = {
    'chart-3': 'bg-chart-3/20 border-chart-3',
    'chart-4': 'bg-chart-4/20 border-chart-4',
  };

  return (
    <Card className={`border-l-4 border-${iconColor} hover:translate-y-[-4px] transition-all`}>
      <CardContent className="p-8 space-y-4">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${colorMap[iconColor]}`}>
          <span className={`text-${iconColor}`}>{icon}</span>
        </div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
