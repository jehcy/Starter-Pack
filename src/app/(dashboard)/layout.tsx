import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/40 bg-muted/30">
        <div className="flex h-16 items-center border-b border-border/40 px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold">SaaS</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/projects" label="Projects" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </nav>
        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">User Name</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1" />
          <ModeToggle />
          <Button variant="ghost" size="sm">
            Sign Out
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  label: string;
}

function NavItem({ href, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {label}
    </Link>
  );
}
