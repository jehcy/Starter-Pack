import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export function Footer() {
  return (
    <footer className="relative border-t-4 border-primary bg-muted/30 bg-grid-pattern">
      <div className="container-wide py-16 w-2/3 mx-auto">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column - spans 2 columns on lg+ */}
          <div className="lg:col-span-1 sm:col-span-2">
            <Logo href="/" size="md" showText />
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A Next.js starter template engineered for AI-assisted development. Ship faster with optimized architecture and token-efficient patterns.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href="https://twitter.com" label="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://github.com" label="GitHub">
                <Github className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://discord.com" label="Discord">
                <MessageCircle className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold font-mono text-sm uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold font-mono text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold font-mono text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
              <FooterLink href="/licenses">Licenses</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VibeCN. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:translate-y-[-2px]"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:translate-x-1 inline-block"
      >
        {children}
      </Link>
    </li>
  );
}
