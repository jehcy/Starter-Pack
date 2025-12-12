'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Home, LogOut, Shield, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserProfile } from '@/hooks/useUserProfile';

export function UserMenuDropdown() {
  const router = useRouter();
  const { user, profile, isLoading, isAuthenticated, isAdmin, signOut } = useUserProfile();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  // Handle sign out with redirect to homepage
  const handleSignOut = async () => {
    setIsSigningOut(true);
    signOut();
    // Small delay to ensure sign out is processed
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  // Don't render anything while loading or signing out
  if (isLoading || isSigningOut) {
    return null;
  }

  // Not authenticated - don't show anything (completely hidden)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Get user initials
  const initials = user.email
    ? user.email.charAt(0).toUpperCase()
    : '?';

  const displayName = profile?.displayName ?? user.email?.split('@')[0] ?? 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full hover:bg-muted p-1 transition-colors">
          <Avatar className="h-8 w-8">
            {profile?.avatarUrl && (
              <AvatarImage src={profile.avatarUrl} alt={displayName} />
            )}
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/')}>
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(`/${user.id}/account`)}>
          <User className="mr-2 h-4 w-4" />
          My Account
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem onClick={() => router.push('/admin')}>
            <Shield className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
