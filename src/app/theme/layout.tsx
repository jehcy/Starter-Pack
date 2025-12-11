import { Toaster } from '@/components/ui/sonner';

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="bottom-center" />
    </>
  );
}
