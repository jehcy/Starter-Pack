'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Minus, Sparkles, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { CTA } from '@/components/cta';
import { Pricing } from '@/components/pricing';
import { toast } from 'sonner';

// Component that handles search params (needs to be wrapped in Suspense)
function PurchaseNotifications() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const purchase = searchParams.get('purchase');
    const credits = searchParams.get('credits');
    const reason = searchParams.get('reason');

    if (purchase === 'success') {
      toast.success('Purchase successful!', {
        description: `${credits || '3'} AI credits have been added to your account.`,
        duration: 5000,
      });
    } else if (purchase === 'cancelled') {
      toast.info('Purchase cancelled', {
        description: 'You can try again anytime.',
      });
    } else if (purchase === 'error') {
      const errorMessage = reason === 'unexpected_amount'
        ? 'Unexpected payment amount. Please contact support.'
        : reason === 'credit_addition_failed'
        ? 'Payment succeeded but credits could not be added. Please contact support.'
        : 'Something went wrong. Please try again or contact support.';

      toast.error('Purchase failed', {
        description: errorMessage,
      });
    }
  }, [searchParams]);

  return null;
}

function PricingHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

        {/* Animated orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-chart-1/20 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-chart-2/15 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '2s' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
             }}
        />
      </div>

      <div className="container-wide">
        <div className="mx-auto max-w-5xl">
          {/* Main content */}
          <div className={`text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide">Simple, Transparent Pricing</span>
            </div>

            {/* Main headline with gradient */}
            <h1 className="font-bold mb-6">
              <span className="block">
                Pay Once,
              </span>
              <span className="block relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] blur-2xl opacity-30" />
                <span className="relative bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-clip-text text-transparent font-black">
                  Build Forever
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              No subscriptions. No recurring fees. Buy credits once and they never expire.
              Start free with 1 AI credit—upgrade only when you need more.
            </p>

            {/* Trust indicators */}
            <div className={`flex flex-wrap items-center justify-center gap-8 mb-8 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:scale-105">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">Instant Access</div>
                  <div className="text-xs text-muted-foreground">No credit card needed</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:scale-105">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-1/10">
                  <Shield className="h-5 w-5 text-chart-1" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">30-Day Guarantee</div>
                  <div className="text-xs text-muted-foreground">Full money back</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:scale-105">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-2/10">
                  <Sparkles className="h-5 w-5 text-chart-2" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">Credits Never Expire</div>
                  <div className="text-xs text-muted-foreground">Use them anytime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

function PricingContent() {
  return (
    <>
      {/* Hero Section */}
      <PricingHero />

      {/* Pricing Cards */}
      <Pricing />

      {/* Comparison Table */}
      <section className="border-y border-border/40 bg-muted/30 py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold">Compare Plans</h2>
            <p className="mt-4 text-muted-foreground">Find the perfect plan for your needs</p>
          </div>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/50 bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold bg-primary/10 text-primary">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <ComparisonRow feature="Theme Editor" free="✓" starter="✓" pro="✓" />
                <ComparisonRow feature="Brand Setup" free="✓" starter="✓" pro="✓" />
                <ComparisonRow feature="Unlimited Downloads" free="✓" starter="✓" pro="✓" />
                <ComparisonRow feature="Save Projects" free="—" starter="✓" pro="✓" />
                <ComparisonRow
                  feature="AI Theme Generation"
                  free="1 credit"
                  starter="3 credits"
                  pro="Unlimited"
                />
                <ComparisonRow feature="Priority Support" free="—" starter="—" pro="✓" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <FaqItem
              question="Do I need a credit card to start?"
              answer="No credit card required. Sign up for free and get 1 AI credit to try the theme generator. Only pay when you need more credits."
            />
            <FaqItem
              question="Is this really free?"
              answer="Yes. The core VibeCN starter is MIT licensed. Clone it, modify it, ship it. Pro and Enterprise tiers offer additional components and support."
            />
            <FaqItem
              question="What's in Brand.md?"
              answer="A comprehensive brand design guide that helps AI assistants maintain consistency across your UI. Includes design tokens, component patterns, and styling conventions to ensure every AI-generated element matches your brand."
            />
            <FaqItem
              question="Does this work with other AI tools?"
              answer="Yes! Customize your design in the theme editor, then download your theme config and Brand.md file. These files work with any AI assistant - Cursor, GitHub Copilot, GPT, and more - ensuring consistent UI generation across all your AI tools."
            />
            <FaqItem
              question="Can I change plans later?"
              answer="Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference."
            />
            <FaqItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee on paid plans. If you're not satisfied, contact support for a full refund."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <Suspense fallback={null}>
        <PurchaseNotifications />
      </Suspense>
      <PricingContent />
    </>
  );
}


interface ComparisonRowProps {
  feature: string;
  free: string;
  starter: string;
  pro: string;
}

function ComparisonRow({ feature, free, starter, pro }: ComparisonRowProps) {
  const renderCell = (value: string, isPro = false) => {
    if (value === '✓') {
      return <Check className="h-5 w-5 mx-auto text-primary" />;
    }
    if (value === '—') {
      return <Minus className="h-5 w-5 mx-auto text-muted-foreground/30" />;
    }
    return <span className={isPro ? 'text-primary font-medium' : ''}>{value}</span>;
  };

  return (
    <tr className="hover:bg-muted/50 transition-colors">
      <td className="px-6 py-4 text-sm">{feature}</td>
      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{renderCell(free)}</td>
      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{renderCell(starter)}</td>
      <td className="px-6 py-4 text-center text-sm bg-primary/5">{renderCell(pro, true)}</td>
    </tr>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-border/50 border-l-4 border-l-chart-2 bg-card p-6 transition-all hover:border-primary/50 hover:translate-y-[-2px]">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-2 text-muted-foreground">{answer}</p>
    </div>
  );
}
