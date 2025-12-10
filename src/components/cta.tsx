import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-24 sm:px-12 sm:py-32">
          {/* Geometric accent - corner element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10" />

          {/* Diagonal line accent */}
          <div className="absolute top-0 right-0 w-0.5 h-full bg-primary-foreground/20 rotate-12 origin-top-right" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm font-mono font-semibold text-primary-foreground backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>START BUILDING TODAY</span>
            </div>

            <h2 className="font-bold tracking-tight text-primary-foreground">
              Ready to vibe code?
            </h2>

            <p className="mx-auto mt-6 text-xl text-primary-foreground/90">
              Save your style and let your AI assistant do the heavy lifting.
              <span className="block mt-2 font-semibold">No credit card required. No setup hassle.</span>
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 group"
                asChild
              >
                <Link href="/theme" className="flex items-center gap-2">
                  Try It Now!
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg font-semibold border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:translate-y-[-2px] transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-primary-foreground/70 font-mono">
              Join thousands of developers already vibing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
