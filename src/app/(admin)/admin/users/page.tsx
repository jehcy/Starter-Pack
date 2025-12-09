'use client';

import { useState } from 'react';
import { db, tx } from '@/lib/instantdb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/cards/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserType } from '@/lib/instantdb';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = db.useQuery({ userProfiles: {} });

  const profiles = data?.userProfiles ?? [];

  // Filter by search
  const filteredProfiles = profiles.filter(
    (p) =>
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserTypeChange = (profileId: string, newType: UserType) => {
    db.transact(
      tx.userProfiles[profileId].update({
        userType: newType,
        updatedAt: Date.now(),
      })
    );
    toast.success('User type updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users ({filteredProfiles.length})</CardTitle>
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">Loading users...</p>
          ) : filteredProfiles.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No users found.</p>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left text-sm font-medium">Email</th>
                    <th className="p-3 text-left text-sm font-medium">Display Name</th>
                    <th className="p-3 text-left text-sm font-medium">User Type</th>
                    <th className="p-3 text-left text-sm font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map((profile) => (
                    <tr key={profile.id} className="border-b">
                      <td className="p-3 text-sm">{profile.email}</td>
                      <td className="p-3 text-sm">{profile.displayName ?? '-'}</td>
                      <td className="p-3">
                        <Select
                          value={profile.userType}
                          onValueChange={(value: UserType) => handleUserTypeChange(profile.id, value)}
                        >
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
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
        </CardContent>
      </Card>
    </div>
  );
}
