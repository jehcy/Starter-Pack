import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SaaS Starter',
  description: 'Privacy Policy for using our platform',
};

export default function PrivacyPage() {
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
            <h1 className="font-bold tracking-tight">Privacy Policy</h1>
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
                <PolicySection number="01" title="Information We Collect">
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, such as when you create an
                    account, make a purchase, or contact us for support. This information may include:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <PolicyListItem>Name and email address</PolicyListItem>
                    <PolicyListItem>Payment information</PolicyListItem>
                    <PolicyListItem>Profile information you choose to provide</PolicyListItem>
                    <PolicyListItem>Communications you send to us</PolicyListItem>
                  </ul>
                </PolicySection>

                <PolicySection number="02" title="How We Use Your Information">
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <PolicyListItem>Process transactions and send related information</PolicyListItem>
                    <PolicyListItem>Send technical notices and support messages</PolicyListItem>
                    <PolicyListItem>Respond to your comments and questions</PolicyListItem>
                    <PolicyListItem>Communicate about products, services, and events</PolicyListItem>
                    <PolicyListItem>Monitor and analyze trends, usage, and activities</PolicyListItem>
                  </ul>
                </PolicySection>

                <PolicySection number="03" title="Information Sharing">
                  <p className="text-muted-foreground leading-relaxed">
                    We do not share your personal information with third parties except in the following
                    circumstances:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <PolicyListItem>With your explicit consent</PolicyListItem>
                    <PolicyListItem>To comply with legal obligations</PolicyListItem>
                    <PolicyListItem>To protect our rights and prevent fraud</PolicyListItem>
                    <PolicyListItem>With service providers who assist in our operations</PolicyListItem>
                  </ul>
                </PolicySection>

                <PolicySection number="04" title="Data Security">
                  <p className="text-muted-foreground leading-relaxed">
                    We take reasonable measures to help protect your personal information from loss,
                    theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use
                    industry-standard encryption and security protocols to safeguard your data.
                  </p>
                </PolicySection>

                <PolicySection number="05" title="Cookies & Tracking">
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar technologies to collect information about your browsing
                    activities and to personalize your experience. You can manage cookie preferences
                    through your browser settings.
                  </p>
                  <div className="mt-4 rounded-xl border border-border/50 bg-muted/30 p-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Note:</strong> Essential cookies are required for the
                      basic functionality of our service and cannot be disabled.
                    </p>
                  </div>
                </PolicySection>

                <PolicySection number="06" title="Your Rights">
                  <p className="text-muted-foreground leading-relaxed">
                    Depending on your location, you may have certain rights regarding your personal data:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <PolicyListItem>Access your personal information</PolicyListItem>
                    <PolicyListItem>Correct inaccurate data</PolicyListItem>
                    <PolicyListItem>Request deletion of your data</PolicyListItem>
                    <PolicyListItem>Object to processing of your data</PolicyListItem>
                    <PolicyListItem>Data portability</PolicyListItem>
                    <PolicyListItem>Withdraw consent at any time</PolicyListItem>
                  </ul>
                </PolicySection>

                <PolicySection number="07" title="Data Retention">
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services,
                    comply with legal obligations, resolve disputes, and enforce our agreements. When we
                    no longer need your data, we securely delete or anonymize it.
                  </p>
                </PolicySection>

                <PolicySection number="08" title="Changes to This Policy">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any
                    changes by posting the new policy on this page and updating the "Last updated" date.
                    We encourage you to review this policy periodically.
                  </p>
                </PolicySection>

                <PolicySection number="09" title="Contact Us">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please
                    contact us:
                  </p>
                  <div className="mt-4 rounded-xl border border-border/50 bg-card p-6">
                    <p className="font-medium">Privacy Team</p>
                    <a
                      href="mailto:privacy@example.com"
                      className="text-primary hover:underline"
                    >
                      privacy@example.com
                    </a>
                  </div>
                </PolicySection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface PolicySectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function PolicySection({ number, title, children }: PolicySectionProps) {
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

function PolicyListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-muted-foreground">
      <svg className="mt-1.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {children}
    </li>
  );
}
