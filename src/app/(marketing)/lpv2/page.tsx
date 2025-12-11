'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/cards/card';
import { useState, useEffect } from 'react';
import { CTA } from '@/components/cta';
import { PricingCardV2 } from '@/components/cards/pricing-card-v2';

export default function LandingPageV2() {
  return (
    <>
      {/* Hero Section - Bold Typography Focus */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12 md:py-20">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-chart-2/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              {/* Floating Tag */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
                <span className="text-sm font-medium tracking-wide">Optimized for AI</span>
              </div>

              {/* Main Headline - Using brand h1 size */}
              <h1 className="font-bold tracking-tight">
                <span className="block text-foreground">Build Fast with</span>
                <span className="block bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
                  Fewer Tokens
                </span>
              </h1>


              <p className="text-xl text-muted-foreground leading-relaxed">
                Token-optimized UI components designed for AI efficiency. Ship production-ready interfaces faster using clear, structured code that minimizes context and maximizes output quality.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full btn-brand" asChild>
                  <Link href="/sign-up">
                    Save your Style
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg rounded-full group"
                  asChild
                >
                  <Link href="/theme" target="_blank" rel="noopener noreferrer">
                    
                    Start Customizing
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-8 border-t border-border/50">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `hsl(${i * 60}, 60%, 85%)` }}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">Built by developers,</span>
                  <span className="text-muted-foreground"> for vibe coders</span>
                </div>
              </div>
            </div>

            {/* Hero Visual - Interactive Card Stack */}
            <div className="relative w-full flex items-center justify-center lg:justify-end">
              <div className="w-full h-auto">
                <HeroVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-border/40 bg-muted/20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 mx-12">
              {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Server Components', 'Edge Runtime', 'Vercel', 'shadcn/ui'].map((tech) => (
                <span 
                  key={`${idx}-${tech}`} 
                  className="text-lg font-medium text-muted-foreground/60 hover:text-foreground transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32">
        <div className="container-wide">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6">
              Features
            </span>
            <h2 className="font-bold tracking-tight mb-6">
              Everything you need,
              <br />
              <span className="text-muted-foreground">nothing you don't</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Feature Card */}
            <Card className="md:col-span-2 lg:col-span-2 group overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 hover:border-primary/30 transition-all duration-500">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <LightningIcon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold">AI-First Component Library</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Pre-built authentication pages, settings panels, and dashboard layouts that AI assistants understand instantly. From concept to production-ready UI in minutes, not hours.
                    </p>
                    <div className="flex gap-3 pt-4">
                      <MetricBadge label="LCP" value="< 1.2s" />
                      <MetricBadge label="FID" value="< 100ms" />
                      <MetricBadge label="CLS" value="< 0.1" />
                    </div>
                  </div>
                  <div className="w-full md:w-64 h-48 rounded-xl bg-gradient-to-br from-primary/5 to-chart-2/5 border border-border/50 flex items-center justify-center">
                    <PerformanceChart />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tall Feature Card */}
            <Card className="row-span-2 group overflow-hidden border-border/50 bg-gradient-to-b from-card to-card/50 hover:border-primary/30 transition-all duration-500">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="h-14 w-14 rounded-2xl bg-chart-1/10 flex items-center justify-center group-hover:bg-chart-1 group-hover:scale-110 transition-all duration-300">
                  <PaletteIcon className="h-7 w-7 text-chart-1 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mt-6">Visual Theme Editor</h3>
                <p className="text-muted-foreground leading-relaxed mt-4 flex-1">
                  Live theme customization with instant preview. Adjust colors, typography, spacing, and radius - all changes propagate through your entire application automatically.
                </p>
                <div className="mt-8 space-y-4">
                  <ColorPalettePreview />
                </div>
              </CardContent>
            </Card>

            {/* Standard Feature Cards */}
            <FeatureCard
              icon={<ShieldIcon className="h-6 w-6" />}
              iconBg="bg-chart-2/10 group-hover:bg-chart-2"
              iconColor="text-chart-2 group-hover:text-white"
              title="Polished UI Out of the Box"
              description="Glassmorphic effects, smooth animations, and refined interactions. Every component designed for modern SaaS applications."
            />
            <FeatureCard
              icon={<CodeIcon className="h-6 w-6" />}
              iconBg="bg-chart-4/10 group-hover:bg-chart-4"
              iconColor="text-chart-4 group-hover:text-white"
              title="Token-Optimized Structure"
              description="Flat file organization and clear naming conventions. AI reads your codebase efficiently, generating consistent, on-brand components every time."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32">
        <div className="container-wide">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-chart-4/10 text-chart-4 text-sm font-semibold tracking-wider uppercase mb-6">
              Pricing
            </span>
            <h2 className="font-bold tracking-tight mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground mx-auto">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCardV2
              tier="Free"
              price="$0"
              period="/month"
              description="Perfect for getting your design system ready before you start coding. Unlimited theme tweaks, brand setup, and React starter pack downloads. Sign in required to save and clone projects."
              buttonText="Start for free"
              buttonHref="/sign-up"
            />
            <PricingCardV2
              tier="Pro"
              price="$7"
              period="/month"
              description="For heavy Vibe coders who want automation and control. AI-generated themes from prompts and brand references. Upcoming MCP-powered config to plug VibeCN into your stack."
              buttonText="Pro plan coming soon"
              buttonDisabled
              comingSoon
            />
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
    <div className="relative w-full max-w-2xl min-h-[500px] mx-auto lg:mx-0">
      {screenshots.map((screenshot, index) => (
        <div
          key={screenshot.src}
          className="absolute top-1/2 left-1/2 w-full rounded-xl border border-border/50 backdrop-blur-sm transition-all duration-700 ease-out overflow-hidden shadow-2xl"
          style={{
            transform: `
              translate(-50%, -50%)
              translateY(${(index - activeCard + 3) % 3 * 15}px)
              translateX(${(index - activeCard + 3) % 3 * 15}px)
              scale(${1 - ((index - activeCard + 3) % 3) * 0.05})
            `,
            zIndex: 3 - ((index - activeCard + 3) % 3),
            opacity: 1 - ((index - activeCard + 3) % 3) * 0.3,
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
    <div className="flex items-end gap-2">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-4 rounded-t-sm bg-gradient-to-t from-primary to-chart-2 transition-all duration-300 hover:opacity-80"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function ColorPalettePreview() {
  const colors = [
    { name: 'Primary', class: 'bg-primary' },
    { name: 'Chart 1', class: 'bg-chart-1' },
    { name: 'Chart 2', class: 'bg-chart-2' },
    { name: 'Chart 3', class: 'bg-chart-3' },
    { name: 'Chart 4', class: 'bg-chart-4' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`h-8 w-8 rounded-lg ${color.class} ring-2 ring-offset-2 ring-offset-card ring-transparent hover:ring-foreground/20 transition-all cursor-pointer`}
            title={color.name}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-8 flex-1 rounded-lg bg-gradient-to-r from-primary via-chart-1 to-chart-2" />
      </div>
    </div>
  );
}

interface MetricBadgeProps {
  label: string;
  value: string;
}

function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <div className="px-3 py-1.5 rounded-full bg-chart-2/10 border border-chart-2/20">
      <span className="text-xs text-muted-foreground">{label}: </span>
      <span className="text-xs font-semibold text-chart-2">{value}</span>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, iconBg, iconColor, title, description }: FeatureCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 hover:border-primary/30 transition-all duration-500">
      <CardContent className="p-8">
        <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
          <span className={`${iconColor} transition-colors`}>{icon}</span>
        </div>
        <h3 className="text-xl font-bold mt-6">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mt-3">{description}</p>
      </CardContent>
    </Card>
  );
}



/* ============================================
   ICONS
   ============================================ */

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}


function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}



