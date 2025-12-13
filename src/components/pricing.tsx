'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from 'sonner';

interface PricingFeature {
  text: string;
  included: boolean;
  comingSoon?: boolean;
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
  planType: 'free' | 'starter' | 'pro';
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
  planType,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isPaid, isAuthenticated, refreshToken } = useUserProfile();
  const router = useRouter();

  const handleClick = async () => {
    if (planType === 'free') {
      router.push('/sign-up');
      return;
    }

    // Starter or Pro plan - require auth
    if (!isAuthenticated) {
      router.push('/sign-in?redirect=/pricing');
      return;
    }

    setIsLoading(true);
    try {
      if (planType === 'starter') {
        // One-time purchase
        const response = await fetch('/api/credits/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken, package: 'starter' }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create purchase');
        }

        // Redirect to PayPal approval page
        if (data.approvalUrl) {
          window.location.href = data.approvalUrl;
        }
      } else {
        // Pro subscription
        if (isPaid) {
          toast.info('You already have an active subscription');
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/subscription/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id, refreshToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create subscription');
        }

        // Redirect to PayPal approval page
        if (data.approvalUrl) {
          window.location.href = data.approvalUrl;
        }
      }
    } catch (error) {
      toast.error('Failed to start purchase', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    if (planType === 'pro' && isPaid) return 'Current Plan';
    return buttonText;
  };

  const isDisabled = isLoading || (planType === 'pro' && isPaid);

  return (
    <Card
      className={`relative overflow-hidden transition-all hover:translate-y-[-4px] ${highlighted ? 'border-primary shadow-xl scale-105 z-10' : 'border-border/50 hover:border-primary/30'}`}
    >
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
                  <svg
                    className="h-5 w-5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 shrink-0 text-muted-foreground/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                <span className={feature.included ? '' : 'text-muted-foreground'}>
                  {feature.text}
                  {feature.comingSoon && (
                    <span className="ml-2 text-xs text-muted-foreground">(Coming soon)</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Button
          variant={buttonVariant}
          className="w-full h-12 rounded-full"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
}

export function Pricing() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-20">
          <div className="inline-block rounded-full border border-border bg-background px-4 py-2 mb-6">
            <span className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">Pricing</span>
          </div>
          <h2 className="font-bold mb-6">Simple pricing for Vibe coders</h2>
          <p className="text-xl text-muted-foreground">
            Try the AI theme generator with 1 free credit. Upgrade for more AI-powered theme generation.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <PricingCard
            name="Free"
            price="$0"
            period=""
            description="Try the AI theme generator with 1 free credit. Perfect for testing the platform."
            features={[
              { text: 'Full Theme Editor', included: true },
              { text: '1 AI Credit (one-time)', included: true },
              { text: 'Unlimited Downloads', included: true },
              { text: 'Brand Setup', included: true },
            ]}
            buttonText="Get Started Free"
            buttonVariant="outline"
            planType="free"
          />
          <PricingCard
            name="Starter"
            price="$3"
            period="one-time"
            description="Perfect for solo devs building 1-2 projects. Credits never expire."
            features={[
              { text: 'Everything in Free', included: true },
              { text: '3 AI Credits', included: true },
              { text: 'Credits Never Expire', included: true },
              { text: 'Save Projects', included: true },
            ]}
            buttonText="Get 3 Credits - $3"
            buttonVariant="default"
            planType="starter"
          />
          <PricingCard
            name="Pro"
            price="$7"
            period="/month"
            description="For agencies and freelancers with ongoing projects. Unlimited AI theme generation."
            features={[
              { text: 'Everything in Starter', included: true },
              { text: 'Unlimited AI Generation', included: true },
              { text: 'Priority Support', included: true },
            ]}
            buttonText="Go Unlimited"
            buttonVariant="default"
            highlighted
            badge="Popular"
            planType="pro"
          />
        </div>
      </div>
    </section>
  );
}
