import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | SaaS Starter',
  description: 'Terms of Service for using our platform',
};

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="font-bold tracking-tight">Terms of Service</h1>
            <p className="mt-4 text-muted-foreground">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-12">
                <TermsSection number="01" title="Acceptance of Terms">
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using this service, you accept and agree to be bound by the terms
                    and provisions of this agreement. If you do not agree to abide by these terms, please
                    do not use this service.
                  </p>
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Important:</strong> These terms constitute a legally
                      binding agreement between you and our company.
                    </p>
                  </div>
                </TermsSection>

                <TermsSection number="02" title="Use License">
                  <p className="text-muted-foreground leading-relaxed">
                    Permission is granted to use this service for personal and commercial purposes in
                    accordance with your subscription plan. Under this license, you may not:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <TermsListItem>Modify or copy the underlying software</TermsListItem>
                    <TermsListItem>Attempt to decompile or reverse engineer any software</TermsListItem>
                    <TermsListItem>Remove any copyright or proprietary notations</TermsListItem>
                    <TermsListItem>Transfer your account to another person without consent</TermsListItem>
                    <TermsListItem>Use the service for any unlawful purpose</TermsListItem>
                  </ul>
                </TermsSection>

                <TermsSection number="03" title="Account Responsibilities">
                  <p className="text-muted-foreground leading-relaxed">
                    When you create an account with us, you must provide accurate and complete information.
                    You are responsible for:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <TermsListItem>Maintaining the security of your account</TermsListItem>
                    <TermsListItem>All activities that occur under your account</TermsListItem>
                    <TermsListItem>Notifying us immediately of any unauthorized access</TermsListItem>
                    <TermsListItem>Keeping your contact information up to date</TermsListItem>
                  </ul>
                </TermsSection>

                <TermsSection number="04" title="Payment Terms">
                  <p className="text-muted-foreground leading-relaxed">
                    For paid subscription plans, you agree to pay all applicable fees. Payment terms include:
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border/50 bg-card p-4">
                      <h4 className="font-medium">Billing Cycle</h4>
                      <p className="mt-1 text-muted-foreground">
                        Subscriptions are billed in advance on a monthly or annual basis.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-4">
                      <h4 className="font-medium">Refunds</h4>
                      <p className="mt-1 text-muted-foreground">
                        We offer a 30-day money-back guarantee for new subscriptions.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-4">
                      <h4 className="font-medium">Price Changes</h4>
                      <p className="mt-1 text-muted-foreground">
                        We will notify you 30 days before any price changes take effect.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-4">
                      <h4 className="font-medium">Cancellation</h4>
                      <p className="mt-1 text-muted-foreground">
                        You may cancel your subscription at any time from your account settings.
                      </p>
                    </div>
                  </div>
                </TermsSection>

                <TermsSection number="05" title="Disclaimer of Warranties">
                  <p className="text-muted-foreground leading-relaxed">
                    The service is provided on an "as is" and "as available" basis. We make no warranties,
                    expressed or implied, and hereby disclaim and negate all other warranties including,
                    without limitation:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <TermsListItem>Implied warranties of merchantability</TermsListItem>
                    <TermsListItem>Fitness for a particular purpose</TermsListItem>
                    <TermsListItem>Non-infringement of intellectual property</TermsListItem>
                    <TermsListItem>Accuracy, reliability, or completeness of content</TermsListItem>
                  </ul>
                </TermsSection>

                <TermsSection number="06" title="Limitation of Liability">
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall we or our suppliers be liable for any damages (including, without
                    limitation, damages for loss of data or profit, or due to business interruption)
                    arising out of the use or inability to use this service, even if we have been notified
                    of the possibility of such damages.
                  </p>
                </TermsSection>

                <TermsSection number="07" title="Intellectual Property">
                  <p className="text-muted-foreground leading-relaxed">
                    The service and its original content, features, and functionality are owned by us
                    and are protected by international copyright, trademark, patent, trade secret, and
                    other intellectual property laws.
                  </p>
                </TermsSection>

                <TermsSection number="08" title="Termination">
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice or liability,
                    for any reason, including breach of these Terms. Upon termination, your right to use
                    the service will cease immediately.
                  </p>
                </TermsSection>

                <TermsSection number="09" title="Governing Law">
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the
                    jurisdiction in which we operate, without regard to its conflict of law provisions.
                  </p>
                </TermsSection>

                <TermsSection number="10" title="Changes to Terms">
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify or replace these Terms at any time. If a revision is
                    material, we will provide at least 30 days notice before the new terms take effect.
                    What constitutes a material change will be determined at our sole discretion.
                  </p>
                </TermsSection>

                <TermsSection number="11" title="Contact Information">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 rounded-xl border border-border/50 bg-card p-6">
                    <p className="font-medium">Legal Team</p>
                    <a
                      href="mailto:legal@example.com"
                      className="text-primary hover:underline"
                    >
                      legal@example.com
                    </a>
                  </div>
                </TermsSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface TermsSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function TermsSection({ number, title, children }: TermsSectionProps) {
  return (
    <section className="relative pl-16">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {number}
      </div>
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TermsListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-muted-foreground">
      <svg className="mt-1.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      {children}
    </li>
  );
}
