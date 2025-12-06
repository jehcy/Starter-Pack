import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-2/3 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="text-xl font-bold">SaaS Starter</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/docs">Docs</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" className="rounded-full" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="rounded-full" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-muted rounded-lg">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-full hover:bg-muted"
    >
      {children}
    </Link>
  );
}
