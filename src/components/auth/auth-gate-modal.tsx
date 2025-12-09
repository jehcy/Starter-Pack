'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
          <DialogDescription>
            Create a free account to {featureName} and unlock all features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
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

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSignIn}>Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
