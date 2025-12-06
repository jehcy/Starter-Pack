import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Features | SaaS Starter',
  description: 'Explore the powerful features of our SaaS starter template',
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wider text-primary">Features</p>
            <h1 className="mt-2 font-bold tracking-tight">
              Powerful Features for
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Modern Applications
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-muted-foreground leading-relaxed">
              Everything you need to build, launch, and scale your SaaS product with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            <LargeFeatureCard
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Next.js 14 App Router"
              description="Built on the latest Next.js with server components, streaming, and the new app directory structure. Experience blazing fast page loads and optimal SEO out of the box."
              features={['Server Components', 'Streaming SSR', 'File-based routing', 'API Routes']}
            />
            <LargeFeatureCard
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              title="TypeScript First"
              description="Full type safety across your entire codebase with strict TypeScript configuration. Catch errors early and enjoy superior developer experience with intelligent autocompletion."
              features={['Strict mode enabled', 'Type inference', 'IDE integration', 'Error prevention']}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border/40 bg-muted/30 py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold tracking-tight">
              Built with the best tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              A carefully curated tech stack for maximum productivity
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              }
              title="Tailwind CSS"
              description="Utility-first CSS framework with dark mode support and custom theming capabilities."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              }
              title="shadcn/ui Components"
              description="Beautiful, accessible, and customizable components built with Radix UI primitives."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              }
              title="InstantDB Integration"
              description="Real-time database with instant sync, offline support, and optimistic updates."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              title="Authentication Ready"
              description="Secure authentication flows with protected routes and session management."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              }
              title="Theme Editor"
              description="Built-in visual theme editor to customize colors, spacing, and typography."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              title="Responsive Design"
              description="Mobile-first approach with beautiful layouts on all screen sizes."
            />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-semibold uppercase tracking-wider text-primary">Performance</p>
              <h2 className="mt-2 font-bold tracking-tight">
                Optimized for speed
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Built with performance in mind from the ground up. Every component is optimized
                for the best possible user experience.
              </p>
              <ul className="mt-8 space-y-4">
                <PerformanceItem
                  title="100/100 Lighthouse Score"
                  description="Achieve perfect performance scores out of the box"
                />
                <PerformanceItem
                  title="Edge-ready deployment"
                  description="Deploy to the edge for ultra-low latency worldwide"
                />
                <PerformanceItem
                  title="Automatic code splitting"
                  description="Only load the JavaScript you need, when you need it"
                />
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
                <div className="h-full w-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-muted/30 px-6 py-16 sm:px-12 sm:py-20">
            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="font-bold tracking-tight">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-4 text-muted-foreground">
                Start building your next project with these powerful features.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="h-12 px-8 text-base rounded-full" asChild>
                  <Link href="/sign-up">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full" asChild>
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

interface LargeFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function LargeFeatureCard({ icon, title, description, features }: LargeFeatureCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur p-8">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
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
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
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
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
