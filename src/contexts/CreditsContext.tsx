'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCredits as useCreditsHook } from '@/hooks/useCredits';

interface CreditsContextType {
  tier: 'free' | 'starter' | 'pro' | null;
  creditsRemaining: number;
  maxCredits: number;
  creditsUsed: number;
  isUnlimited: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const credits = useCreditsHook();

  return (
    <CreditsContext.Provider value={credits}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
}
