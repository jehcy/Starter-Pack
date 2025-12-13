'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

export function ToasterWrapper() {
  const pathname = usePathname();
  const isThemePage = pathname?.startsWith('/theme');

  return <Toaster position={isThemePage ? 'bottom-left' : 'bottom-right'} />;
}
