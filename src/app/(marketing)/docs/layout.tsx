'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, Shield, Zap, Database, Palette, Rocket } from 'lucide-react';

interface DocsSidebarItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  items?: { title: string; href: string }[];
}

const sidebarItems: DocsSidebarItem[] = [
  {
    title: 'Theme Editor',
    href: '#overview',
    icon: <Palette className="h-4 w-4" />,
    items: [
      { title: 'Overview', href: '#overview' },
      { title: 'Getting Started', href: '#getting-started' },
    ],
  },
  {
    title: 'Colors',
    href: '#colors',
    icon: <Palette className="h-4 w-4" />,
    items: [],
  },
  {
    title: 'Spacing',
    href: '#spacing',
    icon: <Zap className="h-4 w-4" />,
    items: [],
  },
  {
    title: 'Radius',
    href: '#radius',
    icon: <Shield className="h-4 w-4" />,
    items: [],
  },
  {
    title: 'Typography',
    href: '#typography',
    icon: <BookOpen className="h-4 w-4" />,
    items: [],
  },
  {
    title: 'Buttons',
    href: '#buttons',
    icon: <Database className="h-4 w-4" />,
    items: [],
  },
  {
    title: 'Actions',
    href: '#actions',
    icon: <Rocket className="h-4 w-4" />,
    items: [],
  },
  {
    title: 'brand.md',
    href: '#brand-md',
    icon: <BookOpen className="h-4 w-4" />,
    items: [],
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="container-wide py-8">
      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-24 space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">Documentation</span>
            </div>
            {sidebarItems.map((section) => (
              <SidebarSection
                key={section.title}
                section={section}
                pathname={pathname}
              />
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile sidebar toggle - simplified for now */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Current Page</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarSection({
  section,
  pathname,
}: {
  section: DocsSidebarItem;
  pathname: string;
}) {
  return (
    <div className="space-y-1">
      <Link
        href={section.href}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
          'text-muted-foreground hover:text-foreground hover:bg-muted'
        )}
      >
        {section.icon}
        <span>{section.title}</span>
      </Link>
      {section.items && section.items.length > 0 && (
        <div className="ml-6 space-y-1 border-l border-border pl-3">
          {section.items.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-1.5 text-sm rounded-md transition-colors',
                  'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
