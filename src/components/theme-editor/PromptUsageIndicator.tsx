'use client';

import { Sparkles, Infinity, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { usePromptUsage } from '@/hooks/usePromptUsage';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export function PromptUsageIndicator() {
  const {
    promptsUsed,
    promptsRemaining,
    maxPrompts,
    isUnlimited,
    canUsePrompt,
    isLoading,
  } = usePromptUsage();

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

  const usagePercent = (promptsUsed / maxPrompts) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>AI Prompts</span>
        </div>
        <span className={canUsePrompt ? 'text-foreground' : 'text-destructive font-medium'}>
          {promptsUsed} / {maxPrompts} used
        </span>
      </div>
      <Progress value={usagePercent} className="h-2" />
      {!canUsePrompt && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-xs text-destructive">
            Free limit reached.{' '}
            <Link href="/pricing" className="underline font-medium hover:text-destructive/80">
              Upgrade to Pro
            </Link>{' '}
            for unlimited.
          </p>
        </div>
      )}
    </div>
  );
}
