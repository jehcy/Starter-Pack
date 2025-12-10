'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? 'border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <div className="w-2/3 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold transition-transform group-hover:scale-105">
              V
            </div>
            <span className="text-xl font-bold">VibeCN</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" className="rounded-full" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="rounded-full hover:translate-y-[-2px] transition-transform" asChild>
              <Link href="/theme">Try it Now!</Link>
            </Button>
          </div>
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 hover:bg-muted rounded-lg" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                      V
                    </div>
                    <span className="text-xl font-bold">VibeCN</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4 hover:bg-muted rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Button variant="ghost" className="rounded-full justify-start" asChild>
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="rounded-full justify-start" asChild>
                    <Link href="/theme" onClick={() => setMobileOpen(false)}>Try it Now!</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
