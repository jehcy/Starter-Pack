'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/instantdb';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent } from '@/components/cards/card';
import { Users, UserCheck, Shield, DollarSign, Zap, Calculator, User } from 'lucide-react';

// Claude Sonnet pricing (as of 2025)
const CLAUDE_PRICING = {
  inputPerMillion: 3.0, // $3 per million input tokens
  outputPerMillion: 15.0, // $15 per million output tokens
};

interface SystemUsage {
  totalPrompts: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  uniqueUsers: number;
}

interface TopUser {
  userId: string;
  promptCount: number;
  inputTokens: number;
  outputTokens: number;
  email?: string;
  userType?: string;
}

interface AdminUsage {
  promptCount: number;
  inputTokens: number;
  outputTokens: number;
}

export default function AdminDashboardPage() {
  const { refreshToken } = useUserProfile();
  const { data, isLoading } = db.useQuery({ userProfiles: {} });

  // State for API-fetched stats
  const [systemUsage, setSystemUsage] = useState<SystemUsage | null>(null);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [adminUsage, setAdminUsage] = useState<AdminUsage | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const profiles = data?.userProfiles ?? [];
  const totalUsers = profiles.length;
  const adminUsers = profiles.filter((p) => p.userType === 'admin').length;
  const paidUsers = profiles.filter((p) => p.userType === 'paid').length;
  const freeUsers = profiles.filter((p) => p.userType === 'free').length;

  // Fetch token usage stats from API
  useEffect(() => {
    if (refreshToken && !isLoading) {
      fetch('/api/admin/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSystemUsage(data.systemUsage);
          setAdminUsage(data.adminUsage);
          // Enrich top users with profile data
          const enrichedTopUsers = data.topUsers.map((u: TopUser) => {
            const profile = profiles.find((p) => p.userId === u.userId);
            return {
              ...u,
              email: profile?.email ?? 'Unknown',
              userType: profile?.userType ?? 'free',
            };
          });
          setTopUsers(enrichedTopUsers);
          setStatsLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch admin stats:', err);
          setStatsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, isLoading]);

  // Calculate API cost estimate
  const calculateCost = (inputTokens: number, outputTokens: number): string => {
    const inputCost = (inputTokens / 1_000_000) * CLAUDE_PRICING.inputPerMillion;
    const outputCost = (outputTokens / 1_000_000) * CLAUDE_PRICING.outputPerMillion;
    return (inputCost + outputCost).toFixed(2);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your application.</p>
      </div>

      {/* User Stats Grid - KEEP EXISTING */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={isLoading ? '...' : String(totalUsers)}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Free Users"
          value={isLoading ? '...' : String(freeUsers)}
          icon={<UserCheck className="h-5 w-5" />}
        />
        <StatCard
          title="Paid Users"
          value={isLoading ? '...' : String(paidUsers)}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard title="Admins" value={isLoading ? '...' : String(adminUsers)} icon={<Shield className="h-5 w-5" />} />
      </div>

      {/* Token Usage Section - NEW */}
      <div className="grid gap-4 sm:grid-cols-3">
        <UsageCard
          title="System-wide Usage"
          icon={<Zap className="h-5 w-5" />}
          isLoading={statsLoading}
          stats={[
            { label: 'Total Prompts', value: systemUsage?.totalPrompts ?? 0 },
            { label: 'Input Tokens', value: formatNumber(systemUsage?.totalInputTokens ?? 0) },
            { label: 'Output Tokens', value: formatNumber(systemUsage?.totalOutputTokens ?? 0) },
          ]}
        />
        <UsageCard
          title="API Cost Estimate"
          icon={<Calculator className="h-5 w-5" />}
          isLoading={statsLoading}
          stats={[
            {
              label: 'This Month',
              value: `$${calculateCost(systemUsage?.totalInputTokens ?? 0, systemUsage?.totalOutputTokens ?? 0)}`,
            },
            {
              label: 'Input Cost',
              value: `$${(((systemUsage?.totalInputTokens ?? 0) / 1_000_000) * CLAUDE_PRICING.inputPerMillion).toFixed(2)}`,
            },
            {
              label: 'Output Cost',
              value: `$${(((systemUsage?.totalOutputTokens ?? 0) / 1_000_000) * CLAUDE_PRICING.outputPerMillion).toFixed(2)}`,
            },
          ]}
        />
        <UsageCard
          title="Your Usage"
          icon={<User className="h-5 w-5" />}
          isLoading={statsLoading}
          stats={[
            { label: 'Your Prompts', value: adminUsage?.promptCount ?? 0 },
            { label: 'Input Tokens', value: formatNumber(adminUsage?.inputTokens ?? 0) },
            { label: 'Output Tokens', value: formatNumber(adminUsage?.outputTokens ?? 0) },
          ]}
        />
      </div>

      {/* Top 10 Users Table - REPLACE "Recent Users" */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">Top 10 Users by Usage (This Month)</h2>
          {statsLoading ? (
            <p className="text-sm text-muted-foreground">Loading usage data...</p>
          ) : topUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No usage data yet.</p>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left text-sm font-medium">#</th>
                    <th className="p-3 text-left text-sm font-medium">Email</th>
                    <th className="p-3 text-left text-sm font-medium">Type</th>
                    <th className="p-3 text-right text-sm font-medium">Prompts</th>
                    <th className="p-3 text-right text-sm font-medium">Input Tokens</th>
                    <th className="p-3 text-right text-sm font-medium">Output Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user, index) => (
                    <tr key={user.userId} className="border-b">
                      <td className="p-3 text-sm font-medium">{index + 1}</td>
                      <td className="p-3 text-sm">{user.email}</td>
                      <td className="p-3 text-sm">
                        <UserTypeBadge type={user.userType} />
                      </td>
                      <td className="p-3 text-sm text-right">{user.promptCount}</td>
                      <td className="p-3 text-sm text-right text-muted-foreground">{formatNumber(user.inputTokens)}</td>
                      <td className="p-3 text-sm text-right text-muted-foreground">{formatNumber(user.outputTokens)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper: Format large numbers with K/M suffix
function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

// StatCard component (existing)
function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// UsageCard component (NEW)
function UsageCard({
  title,
  icon,
  isLoading,
  stats,
}: {
  title: string;
  icon: React.ReactNode;
  isLoading: boolean;
  stats: Array<{ label: string; value: string | number }>;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// UserTypeBadge component (existing pattern)
function UserTypeBadge({ type }: { type?: string }) {
  const className =
    type === 'admin'
      ? 'bg-destructive/10 text-destructive'
      : type === 'paid'
        ? 'bg-primary/10 text-primary'
        : 'bg-muted text-muted-foreground';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {type ?? 'free'}
    </span>
  );
}
