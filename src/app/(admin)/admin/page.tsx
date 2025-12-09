'use client';

import { db } from '@/lib/instantdb';
import { Card, CardContent } from '@/components/cards/card';
import { Users, UserCheck, Shield, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  // Query all user profiles for stats
  const { data, isLoading } = db.useQuery({ userProfiles: {} });

  const profiles = data?.userProfiles ?? [];
  const totalUsers = profiles.length;
  const adminUsers = profiles.filter((p) => p.userType === 'admin').length;
  const paidUsers = profiles.filter((p) => p.userType === 'paid').length;
  const freeUsers = profiles.filter((p) => p.userType === 'free').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your application.</p>
      </div>

      {/* Stats Grid */}
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
        <StatCard
          title="Admins"
          value={isLoading ? '...' : String(adminUsers)}
          icon={<Shield className="h-5 w-5" />}
        />
      </div>

      {/* Recent Users */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">Recent Users</h2>
          <div className="space-y-2">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading users...</p>
            ) : profiles.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users yet.</p>
            ) : (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left text-sm font-medium">Email</th>
                      <th className="p-3 text-left text-sm font-medium">Type</th>
                      <th className="p-3 text-left text-sm font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.slice(0, 10).map((profile) => (
                      <tr key={profile.id} className="border-b">
                        <td className="p-3 text-sm">{profile.email}</td>
                        <td className="p-3 text-sm">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              profile.userType === 'admin'
                                ? 'bg-destructive/10 text-destructive'
                                : profile.userType === 'paid'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {profile.userType}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
