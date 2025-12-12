import { Suspense } from 'react';
import { getDefaultTheme } from '@/lib/brand-theme';
import { ThemePageWrapper } from './ThemePageWrapper';

export const metadata = {
  title: 'Theme Editor',
  description: 'Configure your brand design tokens and generate brand.md',
};

export default function ThemeEditorPage() {
  const defaultTheme = getDefaultTheme();

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ThemePageWrapper initialTheme={defaultTheme} />
    </Suspense>
  );
}
