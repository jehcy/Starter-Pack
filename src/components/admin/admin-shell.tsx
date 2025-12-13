'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Users, Settings, LayoutDashboard } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const { user, isLoading, isAdmin, signOut } = useUserProfile();
  const router = useRouter();

  // Handle sign out with redirect to homepage
  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  // Redirect non-admin users
  React.useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isLoading, isAdmin, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render for non-admin
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/40 bg-card">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border/40 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size="md" />
            <span className="text-xl font-bold">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
          <NavItem href="/admin/users" icon={<Users className="h-5 w-5" />} label="Users" />
          <NavItem href="/admin/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
        </nav>

        {/* Back to App */}
        <div className="p-4 border-t border-border/40">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back to App</Link>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 px-6 backdrop-blur">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
          <ModeToggle />
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

// NavItem helper component
function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>{icon}</span>
      <span className="flex-1">{label}</span>
    </Link>
  );
}
