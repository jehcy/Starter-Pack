'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/cards/card';

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-10 w-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h1 className="font-bold tracking-tight">Passwordless Authentication</h1>
        <p className="text-muted-foreground">
          We use secure OAuth authentication with Google and GitHub - no passwords to remember!
        </p>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-6 space-y-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-muted-foreground">
                Simply sign in with your Google or GitHub account. If you&apos;re having trouble
                accessing your OAuth provider account, please visit their support pages directly.
              </p>
            </div>
          </div>
          <Button asChild className="w-full h-12 rounded-xl">
            <Link href="/sign-in">Go to Sign In</Link>
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-muted-foreground">
        Need help?{' '}
        <Link href="/docs" className="font-medium text-primary hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
}
