import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Documentation | SaaS Starter',
  description: 'Learn how to use and customize the SaaS starter template',
};

export default function DocsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wider text-primary">Documentation</p>
            <h1 className="mt-2 font-bold tracking-tight">
              Everything you need
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                to get started
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-muted-foreground leading-relaxed">
              Comprehensive guides and references to help you build amazing applications.
            </p>
            <div className="mt-8 relative mx-auto max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full rounded-full border border-border/50 bg-card/50 py-4 pl-12 pr-4 text-sm backdrop-blur placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h2 className="font-bold">Quick Start</h2>
              <p className="mt-2 text-muted-foreground">Get up and running in less than 5 minutes</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs text-muted-foreground">Terminal</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <p className="text-muted-foreground"># Clone the repository</p>
                  <code className="text-primary">git clone https://github.com/your-repo/saas-starter.git</code>
                </div>
                <div>
                  <p className="text-muted-foreground"># Install dependencies</p>
                  <code className="text-primary">npm install</code>
                </div>
                <div>
                  <p className="text-muted-foreground"># Start the development server</p>
                  <code className="text-primary">npm run dev</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="border-y border-border/40 bg-muted/30 py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="font-bold tracking-tight">Explore the Docs</h2>
            <p className="mt-4 text-muted-foreground">
              Deep dive into every aspect of the starter template
            </p>
          </div>
          <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DocCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Getting Started"
              description="Learn the basics and set up your development environment."
              href="/docs"
              articles={5}
            />
            <DocCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              }
              title="Components"
              description="Explore the available UI components and how to use them."
              href="/docs"
              articles={12}
            />
            <DocCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              }
              title="Theming"
              description="Customize colors, fonts, and spacing with the theme editor."
              href="/theme"
              articles={4}
            />
            <DocCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              title="Authentication"
              description="Set up user authentication and protect your routes."
              href="/docs"
              articles={6}
            />
            <DocCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              }
              title="Database"
              description="Connect to InstantDB and manage your data."
              href="/docs"
              articles={8}
            />
            <DocCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              }
              title="Deployment"
              description="Deploy your app to Vercel, Render, or other platforms."
              href="/docs"
              articles={3}
            />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="font-semibold uppercase tracking-wider text-primary">API Reference</p>
                <h2 className="mt-2 font-bold tracking-tight">
                  Complete API documentation
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Detailed documentation for every API endpoint, with examples and code snippets in multiple languages.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">RESTful API endpoints</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">TypeScript types included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">Interactive playground</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button className="rounded-full" asChild>
                    <Link href="/docs">Explore API Docs</Link>
                  </Button>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
                <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-4 py-3">
                  <span className="text-xs font-mono text-muted-foreground">api/users.ts</span>
                </div>
                <div className="p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-muted-foreground">
{`// Get user by ID
export async function getUser(id: string) {
  const response = await fetch(
    \`/api/users/\${id}\`
  );
  return response.json();
}

// Update user
export async function updateUser(
  id: string,
  data: UserUpdate
) {
  const response = await fetch(
    \`/api/users/\${id}\`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    }
  );
  return response.json();
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-muted/30 px-6 py-16 sm:px-12 sm:py-20">
            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="font-bold tracking-tight">Need Help?</h2>
              <p className="mx-auto mt-4 max-w-4xl text-muted-foreground">
                Check out these resources or reach out to our community for support.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" variant="outline" className="h-12 px-6 rounded-full gap-2" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub Repository
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6 rounded-full gap-2" asChild>
                  <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discord Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface DocCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  articles: number;
}

function DocCard({ icon, title, description, href, articles }: DocCardProps) {
  return (
    <Link href={href}>
      <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
          <div className="mt-4 flex items-center gap-2 text-sm text-primary">
            <span>{articles} articles</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
