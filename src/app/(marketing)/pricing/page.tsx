import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
            <p className="font-semibold uppercase tracking-wider text-primary">Pricing</p>
            <h1 className="mt-2 font-bold">
              Simple, Transparent
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="mt-6 text-muted-foreground">
              Choose the plan that works best for you. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="pb-8">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium">Monthly</span>
            <div className="h-6 w-11 cursor-pointer rounded-full bg-primary/20 p-0.5">
              <div className="h-5 w-5 rounded-full bg-primary transition-transform" />
            </div>
            <span className="text-sm text-muted-foreground">
              Yearly <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$0"
              period="/month"
              description="Perfect for side projects and experiments"
              features={[
                { text: 'Up to 3 projects', included: true },
                { text: '1,000 API requests/month', included: true },
                { text: 'Community support', included: true },
                { text: 'Basic analytics', included: true },
                { text: 'Custom domains', included: false },
                { text: 'Team collaboration', included: false },
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard
              name="Pro"
              price="$29"
              period="/month"
              description="For growing teams and businesses"
              features={[
                { text: 'Unlimited projects', included: true },
                { text: '100,000 API requests/month', included: true },
                { text: 'Priority support', included: true },
                { text: 'Advanced analytics', included: true },
                { text: 'Custom domains', included: true },
                { text: 'Team collaboration', included: true },
              ]}
              buttonText="Start Free Trial"
              buttonVariant="default"
              highlighted
              badge="Most Popular"
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              period=""
              description="For large organizations with specific needs"
              features={[
                { text: 'Everything in Pro', included: true },
                { text: 'Unlimited API requests', included: true },
                { text: 'Dedicated support', included: true },
                { text: 'SLA guarantee', included: true },
                { text: 'Custom integrations', included: true },
                { text: 'On-premise option', included: true },
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
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
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Pro</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <ComparisonRow feature="Projects" starter="3" pro="Unlimited" enterprise="Unlimited" />
                <ComparisonRow feature="API Requests" starter="1K/mo" pro="100K/mo" enterprise="Unlimited" />
                <ComparisonRow feature="Team Members" starter="1" pro="10" enterprise="Unlimited" />
                <ComparisonRow feature="Storage" starter="1 GB" pro="100 GB" enterprise="Unlimited" />
                <ComparisonRow feature="Support" starter="Community" pro="Priority" enterprise="Dedicated" />
                <ComparisonRow feature="SLA" starter="—" pro="—" enterprise="99.99%" />
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
              question="Can I change plans later?"
              answer="Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers."
            />
            <FaqItem
              question="Is there a free trial?"
              answer="Yes, all paid plans come with a 14-day free trial. No credit card required to start."
            />
            <FaqItem
              question="What happens when I exceed my limits?"
              answer="We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional capacity as needed."
            />
            <FaqItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2230%22 height=%2230%22 viewBox=%220 0 30 30%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z%22 fill=%22rgba(255,255,255,0.07)%22/%3E%3C/svg%3E')] opacity-40" />
            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="font-bold text-primary-foreground">
                Still have questions?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Our team is here to help. Get in touch and we'll get back to you as soon as possible.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 text-base rounded-full"
                  asChild
                >
                  <Link href="mailto:support@example.com">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
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
}: PricingCardProps) {
  return (
    <Card className={`relative overflow-hidden ${highlighted ? 'border-primary shadow-xl scale-105 z-10' : 'border-border/50'}`}>
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
        <Button variant={buttonVariant} className="w-full h-12 rounded-full" asChild>
          <Link href="/sign-up">{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

interface ComparisonRowProps {
  feature: string;
  starter: string;
  pro: string;
  enterprise: string;
}

function ComparisonRow({ feature, starter, pro, enterprise }: ComparisonRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm">{feature}</td>
      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{starter}</td>
      <td className="px-6 py-4 text-center text-sm font-medium">{pro}</td>
      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{enterprise}</td>
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
