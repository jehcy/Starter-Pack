import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header */}
      <header className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">SaaS</span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Simple footer */}
      <footer className="flex h-16 items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SaaS Starter
        </p>
      </footer>
    </div>
  );
}
