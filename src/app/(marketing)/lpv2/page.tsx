'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function LandingPageV2() {
  return (
    <>
      {/* Hero Section - Bold Typography Focus */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
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

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Floating Tag */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-card/80 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
                <span className="text-sm font-medium tracking-wide">Introducing v2.0</span>
              </div>

              {/* Main Headline - Using brand h1 size */}
              <h1 className="font-bold tracking-tight">
                <span className="block text-foreground">Build</span>
                <span className="block bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
                  Different
                </span>
              </h1>
            

              <p className="text-xl text-muted-foreground leading-relaxed" style={{ maxWidth: '36rem' }}>
                Stop settling for generic templates. Create distinctive digital experiences 
                that capture attention and convert visitors into loyal customers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full btn-brand" asChild>
                  <Link href="/sign-up">
                    Start Free Trial
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-10 text-lg rounded-full group"
                  asChild
                >
                  <Link href="/docs">
                    <PlayIcon className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                    Watch Demo
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
                  <span className="font-semibold text-foreground">2,847+</span>
                  <span className="text-muted-foreground"> creators building with us</span>
                </div>
              </div>
            </div>

            {/* Hero Visual - Interactive Card Stack */}
            <div className="relative hidden lg:block">
              <HeroVisual />
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
                    <h3 className="text-2xl font-bold">Lightning Fast Performance</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Built on Next.js 14 with React Server Components, automatic code splitting, 
                      and edge runtime support. Your users get sub-second load times, every time.
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
                <h3 className="text-2xl font-bold mt-6">Design System</h3>
                <p className="text-muted-foreground leading-relaxed mt-4 flex-1">
                  A complete design system with customizable tokens for colors, typography, 
                  spacing, and components. Make it uniquely yours.
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
              title="Enterprise Security"
              description="SOC 2 compliant with end-to-end encryption, RBAC, and audit logs."
            />
            <FeatureCard
              icon={<CodeIcon className="h-6 w-6" />}
              iconBg="bg-chart-4/10 group-hover:bg-chart-4"
              iconColor="text-chart-4 group-hover:text-white"
              title="Developer Experience"
              description="TypeScript-first with full IDE support, hot reloading, and instant previews."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-32 bg-muted/30 border-y border-border/40">
        <div className="container-wide">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-chart-2/10 text-chart-2 text-sm font-semibold tracking-wider uppercase mb-6">
              Testimonials
            </span>
            <h2 className="font-bold tracking-tight">
              Loved by developers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TestimonialCard
              quote="This starter pack saved us weeks of development time. The code quality is exceptional."
              author="Sarah Chen"
              role="CTO at TechFlow"
              gradient="from-primary/20 to-chart-2/20"
            />
            <TestimonialCard
              quote="Finally, a template that doesn't look like every other SaaS landing page. The design system is incredible."
              author="Marcus Johnson"
              role="Founder at Kreative"
              gradient="from-chart-1/20 to-chart-4/20"
            />
            <TestimonialCard
              quote="The performance out of the box is insane. We hit 100 on Lighthouse without any optimization."
              author="Elena Rodriguez"
              role="Lead Developer at Nexus"
              gradient="from-chart-2/20 to-chart-5/20"
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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              tier="Starter"
              price="Free"
              description="Perfect for side projects"
              features={['Up to 3 projects', 'Basic components', 'Community support', 'MIT License']}
            />
            <PricingCard
              tier="Pro"
              price="$49"
              period="/month"
              description="For growing teams"
              features={['Unlimited projects', 'Premium components', 'Priority support', 'Advanced analytics', 'Custom domains']}
              highlighted
            />
            <PricingCard
              tier="Enterprise"
              price="Custom"
              description="For large organizations"
              features={['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Custom integrations', 'On-premise option']}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary/80">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-chart-2/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative px-8 py-20 md:px-16 md:py-28 text-center">
              <h2 className="font-bold tracking-tight text-primary-foreground mb-6">
                Ready to build
                <br />
                something amazing?
              </h2>
              <p className="text-xl text-primary-foreground/80 mx-auto mb-10">
                Join thousands of developers shipping faster with our starter pack. 
                Your next big idea deserves the best foundation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-14 px-10 text-lg rounded-full btn-brand"
                  asChild
                >
                  <Link href="/sign-up">
                    Get Started Now
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-10 text-lg rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/docs">Read the Docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: 'Dashboard', color: 'from-primary/20 to-primary/5' },
    { title: 'Analytics', color: 'from-chart-2/20 to-chart-2/5' },
    { title: 'Settings', color: 'from-chart-1/20 to-chart-1/5' },
  ];

  return (
    <div className="relative w-full h-[500px]">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`absolute inset-0 rounded-2xl border border-border/50 bg-gradient-to-br ${card.color} backdrop-blur-sm transition-all duration-700 ease-out`}
          style={{
            transform: `
              translateY(${(index - activeCard + 3) % 3 * 20}px) 
              translateX(${(index - activeCard + 3) % 3 * 20}px)
              scale(${1 - ((index - activeCard + 3) % 3) * 0.05})
            `,
            zIndex: 3 - ((index - activeCard + 3) % 3),
            opacity: 1 - ((index - activeCard + 3) % 3) * 0.2,
          }}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-chart-1" />
              <div className="h-3 w-3 rounded-full bg-chart-3" />
              <div className="h-3 w-3 rounded-full bg-chart-2" />
            </div>
            <div className="text-lg font-semibold mb-4">{card.title}</div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-3 rounded-full bg-foreground/10" style={{ width: `${100 - i * 20}%` }} />
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-24 rounded-xl bg-foreground/5" />
              <div className="h-24 rounded-xl bg-foreground/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PerformanceChart() {
  const bars = [85, 92, 78, 96, 88, 95, 90];
  
  return (
    <div className="flex items-end gap-2 h-32">
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

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  gradient: string;
}

function TestimonialCard({ quote, author, role, gradient }: TestimonialCardProps) {
  return (
    <Card className={`border-border/50 bg-gradient-to-br ${gradient} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}>
      <CardContent className="p-8">
        <QuoteIcon className="h-8 w-8 text-foreground/20 mb-4" />
        <p className="text-foreground leading-relaxed mb-6">{quote}</p>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-foreground/10 flex items-center justify-center text-lg font-bold">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

function PricingCard({ tier, price, period, description, features, highlighted }: PricingCardProps) {
  return (
    <Card className={`relative overflow-hidden border-border/50 ${highlighted ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-card' : 'bg-card'} hover:border-primary/30 transition-all duration-300`}>
      {highlighted && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            Popular
          </span>
        </div>
      )}
      <CardContent className="p-8">
        <h3 className="text-xl font-bold">{tier}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
        <div className="mt-6 mb-8">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <CheckIcon className="h-5 w-5 text-chart-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full h-12 rounded-full ${highlighted ? '' : 'bg-foreground/10 hover:bg-foreground/20 text-foreground'}`}
          variant={highlighted ? 'default' : 'ghost'}
        >
          Get Started
        </Button>
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

