'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface AuthGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName?: string;
}

export function AuthGateModal({
  open,
  onOpenChange,
  featureName = 'access this feature',
}: AuthGateModalProps) {
  const router = useRouter();

  const handleSignIn = () => {
    onOpenChange(false);
    router.push('/sign-in?returnTo=/theme');
  };

  const benefits = [
    'Export your custom themes as starter projects',
    'Download design tokens, Tailwind configs, and CSS files',
    'Copy CSS to clipboard',
    'Save your themes and access them across devices',
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-3xl p-0">
        <div className="flex h-full flex-col items-center justify-center p-6">
          <div className="w-1/2 space-y-6">
            <SheetHeader>
              <SheetTitle>Sign in to continue</SheetTitle>
              <SheetDescription>
                Create a free account to {featureName} and unlock all features.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-3">
              <p className="text-sm font-medium">With a free account, you can:</p>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 mt-0.5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSignIn}>Sign In</Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
