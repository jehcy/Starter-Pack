'use client';

import * as React from 'react';
import { db, id, tx, type Project } from '@/lib/instantdb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { Input } from '@/components/ui/input';

/**
 * Example component demonstrating InstantDB usage
 *
 * This component shows how to:
 * - Query data with useQuery
 * - Create new entities with transact
 * - Delete entities
 *
 * Note: This will only work when NEXT_PUBLIC_INSTANTDB_APP_ID is configured.
 */
export function ProjectsList() {
  const [newProjectName, setNewProjectName] = React.useState('');

  // Query all projects from InstantDB
  const query = db.useQuery({
    projects: {},
  });

  // Create a new project
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    const projectId = id();
    await db.transact(
      tx.projects[projectId].update({
        name: newProjectName.trim(),
        description: null,
        status: 'draft',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ownerId: 'demo-user', // Replace with actual user ID
      })
    );

    setNewProjectName('');
  };

  // Delete a project
  const handleDeleteProject = async (projectId: string) => {
    await db.transact(tx.projects[projectId].delete());
  };

  if (query.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Loading your projects...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (query.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription className="text-destructive">
            Error loading projects. Make sure NEXT_PUBLIC_INSTANTDB_APP_ID is configured.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Type assertion for projects - in production, define schema in InstantDB dashboard
  const projects = (query.data?.projects ?? []) as Project[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          {projects.length === 0
            ? 'No projects yet. Create your first one!'
            : `You have ${projects.length} project${projects.length === 1 ? '' : 's'}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Create new project form */}
        <div className="flex gap-2">
          <Input
            placeholder="New project name..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateProject();
            }}
          />
          <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
            Create
          </Button>
        </div>

        {/* Project list */}
        {projects.length > 0 && (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Status: {project.status} &middot; Created:{' '}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
