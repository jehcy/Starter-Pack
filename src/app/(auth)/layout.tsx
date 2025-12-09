import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2230%22 height=%2230%22 viewBox=%220 0 30 30%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z%22 fill=%22rgba(255,255,255,0.07)%22/%3E%3C/svg%3E')] opacity-40" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 font-bold">
              S
            </div>
            <span className="text-2xl font-bold">SaaS Starter</span>
          </Link>
          
          <div className="space-y-6">
            <blockquote className="text-2xl font-medium leading-relaxed">
              "This starter template saved us months of development time. The authentication, 
              database integration, and UI components are exactly what we needed."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/20" />
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-primary-foreground/80">CTO at TechStartup</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Stat value="10k+" label="Developers" />
            <Stat value="50+" label="Components" />
            <Stat value="99.9%" label="Uptime" />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-6 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-2 lg:invisible">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="text-xl font-bold">SaaS</span>
          </Link>
          <p className="text-muted-foreground">
            Need help?{' '}
            <a href="mailto:support@example.com" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
        </header>

        {/* Form Container */}
        <main className="flex flex-1 items-center justify-center p-6 lg:p-12">
          <div className="w-full py-12">{children}</div>
        </main>

        {/* Footer */}
        <footer className="flex h-16 items-center justify-center px-6">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} SaaS Starter. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div>
      <p className="font-bold">{value}</p>
      <p className="text-primary-foreground/80">{label}</p>
    </div>
  );
}
