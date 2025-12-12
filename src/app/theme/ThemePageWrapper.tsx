'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import type { BrandTheme } from '@/lib/brand-theme';
import { loadThemeFromStorage } from '@/lib/brand-theme';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Dynamically import ThemePage with SSR disabled to prevent hydration mismatches
// caused by browser extensions (e.g., Dashlane) that modify form elements
const ThemePage = dynamic(
  () => import('@/components/theme-editor/themePage').then((mod) => mod.ThemePage),
  { ssr: false }
);

interface ThemePageWrapperProps {
  initialTheme: BrandTheme;
}

export function ThemePageWrapper({ initialTheme }: ThemePageWrapperProps) {
  const [theme, setTheme] = useState<BrandTheme | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Try to load from localStorage (production), fall back to default
    const stored = loadThemeFromStorage();
    setTheme(stored ?? initialTheme);
  }, [initialTheme]);

  // Handle purchase success notification
  useEffect(() => {
    const purchase = searchParams.get('purchase');
    const credits = searchParams.get('credits');

    if (purchase === 'success' && credits) {
      toast.success('🎉 Purchase Successful!', {
        description: `Congrats! You now have ${credits} AI credits to use. Start generating amazing themes!`,
        duration: 7000,
      });

      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('purchase');
      url.searchParams.delete('credits');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  // Show loading skeleton while hydrating
  if (!theme) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ThemePage initialTheme={theme} />
    </div>
  );
}

