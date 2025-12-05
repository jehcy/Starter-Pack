import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
              <span className="text-muted-foreground">Now in public beta</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build your SaaS
              <br />
              <span className="text-muted-foreground">faster than ever</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A modern starter template with authentication, database integration, and beautiful UI
              components. Ship your product in days, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to launch
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built with modern tools and best practices
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Next.js 14"
              description="App Router, Server Components, and the latest React features."
            />
            <FeatureCard
              title="TypeScript"
              description="Full type safety across your entire codebase."
            />
            <FeatureCard
              title="Tailwind CSS"
              description="Utility-first CSS with dark mode and custom theming."
            />
            <FeatureCard
              title="shadcn/ui"
              description="Beautiful, accessible components you can customize."
            />
            <FeatureCard
              title="InstantDB"
              description="Real-time database with instant sync and offline support."
            />
            <FeatureCard
              title="Authentication"
              description="Secure auth flows with protected routes and sessions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your account and start building in minutes.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/sign-up">Start Building</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
