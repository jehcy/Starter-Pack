'use client';

import dynamic from 'next/dynamic';
import type { BrandTheme } from '@/lib/brand-theme';

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
  return (
    <div className="min-h-screen bg-background">
      <ThemePage initialTheme={initialTheme} />
    </div>
  );
}

