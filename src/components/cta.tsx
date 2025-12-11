import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl px-6 py-24 sm:px-12 sm:py-32">
          {/* Base Gradient - Primary, Secondary & Accent Brand Colors */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom right, var(--primary), var(--chart-2), var(--accent))'
            }}
          />

          {/* Dot Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Diagonal Grid Lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-white rotate-12 origin-top" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-white -rotate-12 origin-top" />
          </div>

          {/* Bended/Curved Grid Overlays */}
          <div className="absolute inset-0 opacity-15 overflow-hidden">
            {/* Curved horizontal lines with perspective */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-white/40 transform-gpu" style={{ transform: 'perspective(400px) rotateX(5deg)' }} />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30 transform-gpu" style={{ transform: 'perspective(500px) rotateX(-3deg)' }} />
            <div className="absolute top-3/4 left-0 right-0 h-px bg-white/40 transform-gpu" style={{ transform: 'perspective(400px) rotateX(5deg)' }} />

            {/* Curved vertical lines */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/40 transform-gpu" style={{ transform: 'perspective(600px) rotateY(-5deg)' }} />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30 transform-gpu" style={{ transform: 'perspective(500px) rotateY(4deg)' }} />
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/40 transform-gpu" style={{ transform: 'perspective(600px) rotateY(-5deg)' }} />
          </div>

          {/* Curved Arc Overlays */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 50 Q 200 30, 400 50 T 800 50"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 100 0 Q 100 150, 200 300 T 300 600"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 800 100 Q 600 200, 400 300"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="150" cy="150" r="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            <circle cx="650" cy="250" r="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          </svg>

          {/* Warped Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 50px,
                rgba(255,255,255,0.1) 50px,
                rgba(255,255,255,0.1) 51px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 50px,
                rgba(255,255,255,0.1) 50px,
                rgba(255,255,255,0.1) 51px
              )
            `,
            transform: 'perspective(800px) rotateX(2deg) rotateY(-1deg)',
            transformStyle: 'preserve-3d'
          }} />

          {/* Large Geometric Shapes - Scattered */}
          <div className="absolute -top-12 -left-12 w-32 h-32 border-4 border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/4 -right-8 w-24 h-24 bg-white/10 backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
          <div className="absolute bottom-20 right-1/4 w-16 h-16 border-4 border-white/20 rotate-45" />
          <div
            className="absolute -bottom-8 left-1/3 w-28 h-28 border-4 rounded-full opacity-30"
            style={{ borderColor: 'var(--primary)' }}
          />

          {/* Medium Geometric Accents */}
          <div className="absolute top-16 right-20 w-12 h-12 bg-white/15 rounded-lg rotate-12 animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-32 left-16 w-10 h-10 bg-white/10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />

          {/* Small Decorative Dots */}
          <div className="absolute top-24 left-12 w-3 h-3 bg-white/40 rounded-full" />
          <div className="absolute top-32 left-20 w-2 h-2 bg-white/30 rounded-full" />
          <div className="absolute bottom-24 right-24 w-3 h-3 bg-white/40 rounded-full" />
          <div className="absolute bottom-40 right-32 w-2 h-2 bg-white/30 rounded-full" />

          {/* Diagonal Accent Stripes */}
          <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 origin-top-right" />
          <div
            className="absolute bottom-0 left-0 w-48 h-1 -rotate-45 origin-bottom-left opacity-50"
            style={{
              background: 'linear-gradient(to right, transparent, var(--primary), transparent)'
            }}
          />

          {/* Floating Gradient Orbs for Depth */}
          <div
            className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] opacity-20"
            style={{ backgroundColor: 'var(--primary)' }}
          />
          <div
            className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite] opacity-25"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          {/* Mesh Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at top right, var(--primary) 0%, transparent 50%)'
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at bottom left, var(--accent) 0%, transparent 50%)'
            }}
          />

          {/* Corner Geometric Frames */}
          <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 border-white/25" />
          <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 border-white/25" />

          {/* Content */}
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/15 px-5 py-2.5 text-sm font-mono font-bold text-white backdrop-blur-md mb-8 shadow-lg">
              <Sparkles className="h-4 w-4 animate-[spin_3s_linear_infinite]" />
              <span className="tracking-wider">START BUILDING TODAY</span>
            </div>

            <h2 className="font-bold tracking-tight text-white drop-shadow-lg">
              Ready to vibe code?
            </h2>

            <p className="mx-auto mt-6 text-xl text-white/95 drop-shadow-md">
              Save your style and let your AI assistant do the heavy lifting.
              <span className="block mt-3 font-bold text-white">No credit card required. No setup hassle.</span>
            </p>

            <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="h-16 px-12 text-lg font-bold shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 group bg-white hover:bg-white/90 border-2 border-white/50"
                style={{ color: 'var(--primary)' }}
                asChild
              >
                <Link href="/theme" className="flex items-center gap-2">
                  Try It Now!
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 text-lg font-bold border-3 border-white/50 bg-white/15 text-white hover:bg-white hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-md [&:hover]:text-[color:var(--primary)]"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <p className="mt-10 text-sm text-white/90 font-mono tracking-wide drop-shadow-md">
              Join thousands of developers already vibing ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
