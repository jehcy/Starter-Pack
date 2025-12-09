import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { CTA } from '@/components/cta';

export const metadata = {
  title: 'Pricing | SaaS Starter',
  description: 'Simple, transparent pricing for your SaaS needs',
};

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-bold">
              Simple pricing for Vibe coders
            </h1>
            <p className="mt-6 text-muted-foreground">
              Start free while we're in early access.
              Pro is coming soon for builders who want AI-generated themes and deeper config.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            <PricingCard
              name="Free"
              price="$0"
              period="/month"
              description="Perfect for getting your design system ready before you start coding. Unlimited theme tweaks, brand setup, and React starter pack downloads. Sign in required to save and clone projects."
              features={[]}
              buttonText="Start for free"
              buttonVariant="default"
            />
            <PricingCard
              name="Pro"
              price="$7"
              period="/month"
              description="For heavy Vibe coders who want automation and control. AI-generated themes from prompts and brand references. Upcoming MCP-powered config to plug VibeCN into your stack."
              features={[]}
              buttonText="Pro plan coming soon"
              buttonVariant="outline"
              badge="Coming soon"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-y border-border/40 bg-muted/30 py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold">
              Compare Plans
            </h2>
            <p className="mt-4 text-muted-foreground">
              Find the perfect plan for your needs
            </p>
          </div>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/50 bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <ComparisonRow feature="Theme Editor" free="✓" pro="✓" />
                <ComparisonRow feature="Brand Setup" free="✓" pro="✓" />
                <ComparisonRow feature="React Starter Pack" free="✓" pro="✓" />
                <ComparisonRow feature="Save Projects" free="Sign-in required" pro="✓" />
                <ComparisonRow feature="AI Theme Generation" free="—" pro="Coming soon" />
                <ComparisonRow feature="MCP Config" free="—" pro="Coming soon" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
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

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  highlighted?: boolean;
  badge?: string;
  disabled?: boolean;
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted,
  badge,
  disabled,
}: PricingCardProps) {
  return (
    <Card className={`relative overflow-hidden ${highlighted ? 'border-primary shadow-xl scale-105 z-10' : 'border-border/50'} ${disabled ? 'opacity-75' : ''}`}>
      {badge && (
        <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-semibold text-primary-foreground">
          {badge}
        </div>
      )}
      <CardHeader className="pb-8">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-6">
          <span className="text-5xl font-bold tracking-tight">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {features.length > 0 && (
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                {feature.included ? (
                  <svg className="h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 shrink-0 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className={feature.included ? '' : 'text-muted-foreground'}>{feature.text}</span>
              </li>
            ))}
          </ul>
        )}
        {disabled ? (
          <Button variant={buttonVariant} className="w-full h-12 rounded-full" disabled>
            {buttonText}
          </Button>
        ) : (
          <Button variant={buttonVariant} className="w-full h-12 rounded-full" asChild>
            <Link href="/sign-up">{buttonText}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface ComparisonRowProps {
  feature: string;
  free: string;
  pro: string;
}

function ComparisonRow({ feature, free, pro }: ComparisonRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm">{feature}</td>
      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{free}</td>
      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{pro}</td>
    </tr>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 transition-colors hover:border-primary/50">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-2 text-muted-foreground">{answer}</p>
    </div>
  );
}
