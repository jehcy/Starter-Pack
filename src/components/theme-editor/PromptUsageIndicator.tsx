'use client';

import { Sparkles, Infinity, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCredits } from '@/contexts/CreditsContext';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export function PromptUsageIndicator() {
  const {
    creditsUsed,
    creditsRemaining,
    maxCredits,
    isUnlimited,
    isLoading,
  } = useCredits();

  const canUsePrompt = isUnlimited || creditsRemaining > 0;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse text-muted-foreground" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (isUnlimited) {
    return (
      <div className="flex items-center gap-2 text-primary text-sm">
        <Infinity className="w-4 h-4" />
        <span className="font-medium">Unlimited prompts</span>
        <span className="text-muted-foreground text-xs">(Pro)</span>
      </div>
    );
  }

  const usagePercent = (creditsUsed / maxCredits) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${!canUsePrompt ? 'text-destructive' : 'text-primary'}`} />
          <span className={!canUsePrompt ? 'font-medium' : ''}>AI Credits</span>
        </div>
        <span className={canUsePrompt ? 'text-foreground' : 'text-destructive font-bold'}>
          {creditsUsed} / {maxCredits} used
        </span>
      </div>
      <Progress
        value={usagePercent}
        className={`h-2 ${!canUsePrompt ? 'bg-destructive/20' : ''}`}
      />
      {!canUsePrompt && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border-2 border-destructive/30 shadow-sm">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-destructive mb-1">
              No credits remaining
            </p>
            <p className="text-xs text-destructive/80">
              <Link href="/pricing" className="underline font-medium hover:text-destructive">
                Get more credits
              </Link>{' '}
              or upgrade to Pro for unlimited
            </p>
          </div>
        </div>
      )}
      {canUsePrompt && creditsRemaining <= 1 && creditsRemaining > 0 && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
          <p className="text-xs text-orange-600 dark:text-orange-500">
            Low on credits.{' '}
            <Link href="/pricing" className="underline font-medium hover:opacity-80">
              Get more
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
