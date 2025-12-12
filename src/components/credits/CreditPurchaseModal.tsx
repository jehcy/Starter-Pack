'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Zap, Infinity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from 'sonner';

interface CreditPurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreditPurchaseModal({ open, onOpenChange }: CreditPurchaseModalProps) {
  const [loading, setLoading] = useState<'starter' | 'pro' | null>(null);
  const { refreshToken, isAuthenticated } = useUserProfile();
  const router = useRouter();

  const handlePurchaseStarter = async () => {
    if (!isAuthenticated) {
      router.push('/sign-in?redirect=/pricing');
      return;
    }

    setLoading('starter');
    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, package: 'starter' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create purchase');
      }

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    } catch (error) {
      toast.error('Failed to start purchase', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
      setLoading(null);
    }
  };

  const handleSubscribePro = async () => {
    if (!isAuthenticated) {
      router.push('/sign-in?redirect=/pricing');
      return;
    }

    setLoading('pro');
    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    } catch (error) {
      toast.error('Failed to start subscription', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            No Credits Remaining
          </DialogTitle>
          <DialogDescription>
            You've used all your AI theme generation credits. Purchase more credits or upgrade to Pro
            for unlimited generation.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Starter Pack Option */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Starter Pack
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  3 AI credits • One-time purchase • Never expires
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$3</div>
                <div className="text-xs text-muted-foreground">one-time</div>
              </div>
            </div>
            <Button
              onClick={handlePurchaseStarter}
              disabled={loading !== null}
              className="w-full"
              variant="outline"
            >
              {loading === 'starter' ? 'Loading...' : 'Buy 3 Credits'}
            </Button>
          </div>

          {/* Pro Plan Option */}
          <div className="rounded-lg border-2 border-primary p-4 space-y-3 relative overflow-hidden">
            <div className="absolute -right-10 top-4 rotate-45 bg-primary px-10 py-1 text-xs font-semibold text-primary-foreground">
              Best Value
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Infinity className="h-4 w-4 text-primary" />
                  Pro Plan
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Unlimited AI generation • Priority support
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$7</div>
                <div className="text-xs text-muted-foreground">/month</div>
              </div>
            </div>
            <Button
              onClick={handleSubscribePro}
              disabled={loading !== null}
              className="w-full"
            >
              {loading === 'pro' ? 'Loading...' : 'Subscribe to Pro'}
            </Button>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Secure payment powered by PayPal
        </div>
      </DialogContent>
    </Dialog>
  );
}
