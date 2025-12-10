import { Card, CardContent, CardHeader, CardTitle } from '@/components/cards/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CTA } from '@/components/cta';
import { Zap, Code2, Palette, Database, Lock, Sliders, Smartphone, Check } from 'lucide-react';

export const metadata = {
  title: 'Features | VibeCN',
  description: 'Explore the powerful features of our AI-optimized SaaS starter template',
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-full border border-border bg-muted px-4 py-2 mb-6">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider">Features</span>
            </div>
            <h1 className="font-bold">
              Engineered for{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AI-Assisted Development
              </span>
            </h1>
            <p className="mx-auto mt-6 text-xl text-muted-foreground leading-relaxed">
              Every architectural decision optimized for vibe coding. Faster comprehension, fewer tokens, better results.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            <LargeFeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="AI-Optimized Architecture"
              description="Flat directory structures, explicit file naming, and comprehensive design guide. AI assistants generate consistent UI without chasing design decisions."
              features={['Brand.md guide', 'Explicit exports', 'Flat structure', 'Type inference']}
              accentColor="border-chart-1"
            />
            <LargeFeatureCard
              icon={<Code2 className="h-8 w-8" />}
              title="Token-Efficient Patterns"
              description="Predictable component APIs, consistent styling patterns, and self-documenting code. Get more done before hitting context limits."
              features={['Consistent APIs', 'Design tokens', 'JSDoc comments', 'Minimal abstractions']}
              accentColor="border-chart-2"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border/40 bg-muted/30 py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold">Built with the Best Tools</h2>
            <p className="mt-4 text-muted-foreground">
              A carefully curated tech stack for maximum productivity
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Palette className="h-6 w-6" />}
              title="Tailwind CSS"
              description="Design tokens as CSS variables. AI tools generate consistent styles without color mismatches."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="shadcn/ui"
              description="Composable components with explicit props. AI assistants scaffold new UI predictably."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="InstantDB"
              description="Type-safe real-time queries. Pre-configured schema patterns for rapid feature development."
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6" />}
              title="Auth Ready"
              description="OAuth with Google/GitHub pre-wired. Skip the boilerplate, ship the feature."
            />
            <FeatureCard
              icon={<Sliders className="h-6 w-6" />}
              title="Theme Editor"
              description="Visual customization with instant preview. Design tokens AI tools can reference."
            />
            <FeatureCard
              icon={<Smartphone className="h-6 w-6" />}
              title="Responsive"
              description="Mobile-first layouts with consistent breakpoints. Predictable responsive patterns."
            />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-block rounded-full border border-border bg-muted px-4 py-2 mb-6">
                <span className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">Performance</span>
              </div>
              <h2 className="font-bold">Optimized for Comprehension</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every architectural decision optimized for AI assistants to understand and extend your codebase efficiently.
              </p>
              <ul className="mt-8 space-y-4">
                <PerformanceItem
                  title="70% fewer tokens"
                  description="Flat structures and explicit exports reduce context overhead"
                />
                <PerformanceItem
                  title="Instant AI onboarding"
                  description="Brand.md provides complete design system guidance in one file"
                />
                <PerformanceItem
                  title="Predictable patterns"
                  description="Consistent conventions AI tools recognize and extend"
                />
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
                <div className="h-full w-full rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Code2 className="h-16 w-16 text-primary mx-auto" />
                    <p className="font-mono text-sm text-muted-foreground">AI-First Architecture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
}

interface LargeFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  accentColor: string;
}

function LargeFeatureCard({ icon, title, description, features, accentColor }: LargeFeatureCardProps) {
  return (
    <Card className={`relative overflow-hidden border-l-4 ${accentColor} bg-card/50 backdrop-blur p-8 hover:translate-y-[-4px] transition-all`}>
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:translate-y-[-4px] hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

interface PerformanceItemProps {
  title: string;
  description: string;
}

function PerformanceItem({ title, description }: PerformanceItemProps) {
  return (
    <li className="flex gap-4">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
