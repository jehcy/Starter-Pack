import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and organize your projects.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
          <Button className="rounded-xl gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStatCard value="12" label="Total Projects" />
        <MiniStatCard value="5" label="In Progress" />
        <MiniStatCard value="4" label="Completed" />
        <MiniStatCard value="3" label="Planning" />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          name="Website Redesign"
          description="Complete overhaul of the company website with modern design and improved UX"
          status="In Progress"
          statusColor="bg-blue-500/10 text-blue-500"
          progress={65}
          team={['JD', 'SC', 'MK']}
          dueDate="Dec 15, 2024"
        />
        <ProjectCard
          name="Mobile App"
          description="iOS and Android app development with React Native"
          status="Planning"
          statusColor="bg-yellow-500/10 text-yellow-500"
          progress={30}
          team={['JD', 'AL']}
          dueDate="Jan 20, 2025"
        />
        <ProjectCard
          name="API Integration"
          description="Third-party API integrations for payment and analytics"
          status="Completed"
          statusColor="bg-green-500/10 text-green-500"
          progress={100}
          team={['SC', 'MK', 'RB']}
          dueDate="Nov 30, 2024"
        />
        <ProjectCard
          name="Dashboard Analytics"
          description="Real-time analytics dashboard with customizable widgets"
          status="In Progress"
          statusColor="bg-blue-500/10 text-blue-500"
          progress={45}
          team={['JD', 'AL', 'SC']}
          dueDate="Dec 28, 2024"
        />
        <ProjectCard
          name="User Authentication"
          description="Implement OAuth2 and multi-factor authentication"
          status="In Progress"
          statusColor="bg-blue-500/10 text-blue-500"
          progress={80}
          team={['MK']}
          dueDate="Dec 10, 2024"
        />

        {/* Add New Project Card */}
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-semibold">Create New Project</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Start a new project from scratch
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MiniStatCardProps {
  value: string;
  label: string;
}

function MiniStatCard({ value, label }: MiniStatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

interface ProjectCardProps {
  name: string;
  description: string;
  status: string;
  statusColor: string;
  progress: number;
  team: string[];
  dueDate: string;
}

function ProjectCard({ name, description, status, statusColor, progress, team, dueDate }: ProjectCardProps) {
  return (
    <Link href="/dashboard/projects">
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
              {name.charAt(0)}
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}>
              {status}
            </span>
          </div>
          <CardTitle className="text-lg mt-4">{name}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {/* Team */}
            <div className="flex -space-x-2">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-gradient-to-br from-primary/80 to-primary text-xs font-medium text-primary-foreground"
                >
                  {member}
                </div>
              ))}
              {team.length > 3 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
                  +{team.length - 3}
                </div>
              )}
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueDate}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
