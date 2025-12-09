'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Manage application settings and configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general application settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="app-name">Application Name</Label>
            <Input id="app-name" placeholder="VibeCN" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" placeholder="support@example.com" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="max-projects">Max Projects per User</Label>
            <Input id="max-projects" type="number" placeholder="10" />
          </div>

          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>Enable or disable features for all users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme Editor</p>
              <p className="text-sm text-muted-foreground">Allow users to access the theme editor</p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Features</p>
              <p className="text-sm text-muted-foreground">Allow users to export themes</p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Public Sharing</p>
              <p className="text-sm text-muted-foreground">Allow users to share themes publicly</p>
            </div>
            <Button variant="outline" size="sm">
              Disabled
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
