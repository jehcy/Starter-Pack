'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Infinity } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CreditStatus {
  tier: 'free' | 'starter' | 'pro';
  freeCreditsRemaining: number;
  purchasedCredits: number;
  totalPurchasedCredits: number | null;
  totalCredits: number | 'unlimited';
  isUnlimited: boolean;
  monthlyUsage?: number;
  abuseWarning?: string;
}

interface CreditDisplayProps {
  onClick?: () => void;
}

export function CreditDisplay({ onClick }: CreditDisplayProps = {}) {
  const { refreshToken, isAuthenticated } = useUserProfile();
  const [credits, setCredits] = useState<CreditStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !refreshToken) {
      setLoading(false);
      return;
    }

    fetchCredits();
  }, [isAuthenticated, refreshToken]);

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/credits/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setCredits(data);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Credit status API error:', response.status, errorData);
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh credits when user returns to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        fetchCredits();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthenticated]);

  if (!isAuthenticated || loading) {
    return null;
  }

  if (!credits) {
    return null;
  }

  const getColorClass = () => {
    if (credits.isUnlimited) return 'text-primary';
    if (typeof credits.totalCredits === 'number') {
      if (credits.totalCredits === 0) return 'text-destructive';
      if (credits.totalCredits <= 1) return 'text-yellow-500';
      return 'text-primary';
    }
    return 'text-primary';
  };

  const getTooltipContent = () => {
    if (credits.isUnlimited) {
      return (
        <div className="space-y-1">
          <p className="font-semibold">Pro Plan - Unlimited</p>
          {credits.monthlyUsage !== undefined && (
            <p className="text-xs text-muted-foreground">
              {credits.monthlyUsage} generations this month
            </p>
          )}
          {credits.abuseWarning && (
            <p className="text-xs text-yellow-500">{credits.abuseWarning}</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <p className="font-semibold">AI Credits</p>
        {credits.freeCreditsRemaining > 0 && (
          <p className="text-xs">Free: {credits.freeCreditsRemaining}</p>
        )}
        {credits.purchasedCredits > 0 && (
          <p className="text-xs">Purchased: {credits.purchasedCredits}</p>
        )}
        {credits.totalPurchasedCredits !== null && credits.totalPurchasedCredits > 0 && (
          <p className="text-xs text-muted-foreground">
            Total purchased: {credits.totalPurchasedCredits}
          </p>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 cursor-pointer" onClick={onClick}>
            <Sparkles className="h-4 w-4" />
            <span className={getColorClass()}>
              {credits.isUnlimited ? (
                <>
                  <Infinity className="inline h-4 w-4" />
                </>
              ) : (
                <>{credits.totalCredits} {typeof credits.totalCredits === 'number' && credits.totalCredits === 1 ? 'credit' : 'credits'}</>
              )}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {getTooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
