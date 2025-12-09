import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 px-6 py-24 sm:px-12 sm:py-32">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl animate-pulse [animation-delay:1s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary-foreground/5 blur-3xl animate-pulse [animation-delay:2s]" />
          </div>

          {/* Decorative icons */}
          <div className="absolute top-8 left-8 opacity-20 animate-bounce [animation-delay:0.5s]">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="absolute top-8 right-8 opacity-20 animate-bounce [animation-delay:1.5s]">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="absolute bottom-8 left-1/4 opacity-20 animate-bounce [animation-delay:1s]">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="absolute bottom-8 right-1/4 opacity-20 animate-bounce [animation-delay:2s]">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur-sm mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Start Building Today</span>
            </div>

            <h2 className="font-bold tracking-tight text-primary-foreground animate-fade-in [animation-delay:0.1s]">
              Ready to vibe code?
            </h2>

            <p className="mx-auto mt-6 text-xl text-primary-foreground/90 animate-fade-in [animation-delay:0.2s]">
              Save your style and let your AI assistant do the heavy lifting.
              <span className="block mt-2 font-semibold">No credit card required. No setup hassle.</span>
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in [animation-delay:0.3s]">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
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
                className="h-14 px-10 text-lg font-semibold border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-primary-foreground/70 animate-fade-in [animation-delay:0.4s]">
              Join thousands of developers already vibing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
