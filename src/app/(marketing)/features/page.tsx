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
      <section className="relative overflow-hidden py-32 sm:py-40">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(var(--primary-rgb,_249_115_22),_0.15)_0%,_transparent_50%)] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(var(--primary-rgb,_249_115_22),_0.1)_0%,_transparent_50%)] animate-[pulse_10s_ease-in-out_infinite_2s]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59_130_246,_0.08)_0%,_transparent_50%)] animate-[pulse_12s_ease-in-out_infinite_4s]" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

          {/* Glowing Lines */}
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-[shimmer_4s_ease-in-out_infinite_1s]" />
        </div>

        <div className="container-wide">
          <div className="relative grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - Asymmetric Layout */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge with Glow */}
              <div className="inline-flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all" />
                  <div className="relative rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm px-5 py-2.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      Features
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Heading with Stagger Animation */}
              <div className="space-y-4">
                <h1 className="font-bold leading-[1.1] tracking-tight">
                  <span className="block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                    Engineered for
                  </span>
                  <span className="block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
                    <span className="relative inline-block">
                      <span className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] blur-2xl opacity-30" />
                      <span className="relative bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-clip-text text-transparent font-black">
                        AI-Assisted
                      </span>
                    </span>
                  </span>
                  <span className="block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
                    <span className="relative inline-block">
                      <span className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] blur-2xl opacity-30" />
                      <span className="relative bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-clip-text text-transparent font-black">
                        Development
                      </span>
                    </span>
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl opacity-0 animate-[fadeInUp_0.6s_ease-out_0.8s_forwards]">
                Every architectural decision optimized for{' '}
                <span className="text-foreground font-semibold">vibe coding</span>.
                Faster comprehension, fewer tokens, better results.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
                <div className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                    70%
                  </div>
                  <div className="text-sm text-muted-foreground">Fewer Tokens</div>
                </div>
                <div className="h-12 w-[1px] bg-border/50" />
                <div className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                    10x
                  </div>
                  <div className="text-sm text-muted-foreground">Faster Setup</div>
                </div>
                <div className="h-12 w-[1px] bg-border/50" />
                <div className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground">Type Safe</div>
                </div>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="lg:col-span-5 relative opacity-0 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]">
              {/* Floating Card Stack */}
              <div className="relative h-[400px]">
                {/* Background Cards - Stacked Effect */}
                <div className="absolute top-8 right-8 w-72 h-48 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm transform rotate-6 animate-[float_6s_ease-in-out_infinite]" />
                <div className="absolute top-4 right-4 w-72 h-48 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm transform rotate-3 animate-[float_6s_ease-in-out_infinite_2s]" />

                {/* Main Card */}
                <div className="absolute top-0 right-0 w-72 h-48 rounded-2xl border border-primary/40 bg-card/80 backdrop-blur-md p-6 shadow-2xl shadow-primary/10 animate-[float_6s_ease-in-out_infinite_1s] group hover:scale-105 transition-transform">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary to-orange-500 animate-[shimmer_2s_linear_infinite]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                      <div className="h-3 bg-muted rounded w-4/6" />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-orange-500" />
                      <div className="h-2 flex-1 bg-muted rounded" />
                    </div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-2xl -z-10" />
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-4 left-8 h-12 w-12 rounded-lg bg-card border border-primary/30 flex items-center justify-center shadow-lg animate-[float_4s_ease-in-out_infinite]">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute bottom-12 -left-4 h-12 w-12 rounded-lg bg-card border border-blue-500/30 flex items-center justify-center shadow-lg animate-[float_5s_ease-in-out_infinite_1s]">
                  <Database className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>
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
