'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AccountPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const userId = params.userId as string;

  useEffect(() => {
    // Only redirect if the user is viewing their own account
    if (user?.id === userId) {
      router.replace('/dashboard/settings');
    } else {
      // If not the owner, redirect to dashboard
      router.replace('/dashboard');
    }
  }, [user, userId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
