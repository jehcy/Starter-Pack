"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Zap, Code2, Database } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function LandingPageV3() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { value: "10K", label: "Developers", delay: "0ms" },
    { value: "99%", label: "Uptime", delay: "100ms" },
    { value: "< 1s", label: "Load Time", delay: "200ms" },
  ]

  const features = [
    {
      icon: Zap,
      title: "LIGHTNING FAST",
      description: "Next.js 16 App Router. Zero config. Ship in minutes.",
      color: "bg-primary",
    },
    {
      icon: Code2,
      title: "MODERN STACK",
      description: "TypeScript. React 19. Tailwind. All the good stuff.",
      color: "bg-[#f7b928]",
    },
    {
      icon: Database,
      title: "REAL-TIME DB",
      description: "InstantDB integration. Live updates out of the box.",
      color: "bg-foreground",
    },
  ]

  const pricing = [
    {
      name: "STARTER",
      price: "$0",
      period: "forever",
      features: ["Complete setup", "All components", "Dark mode", "Community support"],
      cta: "START FREE",
      href: "/sign-up",
      highlighted: false,
    },
    {
      name: "PRO",
      price: "$49",
      period: "per month",
      features: ["Everything in Starter", "Priority support", "Advanced analytics", "Custom domains", "Team features", "Unlimited projects"],
      cta: "START TRIAL",
      href: "/sign-up",
      highlighted: true,
    },
    {
      name: "ENTERPRISE",
      price: "CUSTOM",
      period: "contact us",
      features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom integration", "On-premise option"],
      cta: "CONTACT SALES",
      href: "/sign-up",
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div
            className="text-[20rem] font-black tracking-tighter whitespace-nowrap"
            style={{
              transform: 'rotate(-12deg) scale(1.5)',
              fontFamily: 'Impact, "Arial Black", sans-serif',
            }}
          >
            SHIP SHIP SHIP
          </div>
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Small eyebrow */}
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="inline-block border-4 border-foreground px-4 py-2 bg-background">
                <span className="font-mono text-sm font-bold tracking-wider">
                  VIBECN v3.0 — REACT 19 READY
                </span>
              </div>
            </div>

            {/* Main headline - Asymmetric layout */}
            <div className="space-y-6">
              <div
                className={`transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <h1
                  className="font-black tracking-tighter leading-[0.85]"
                  style={{
                    fontFamily: 'Impact, "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                  }}
                >
                  SHIP YOUR
                </h1>
              </div>

              <div
                className={`flex items-center gap-8 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <h1
                  className="font-black tracking-tighter leading-[0.85] text-primary"
                  style={{
                    fontFamily: 'Impact, "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                  }}
                >
                  SAAS FAST
                </h1>
                <div className="hidden lg:block w-32 h-32 bg-[#f7b928] border-4 border-foreground transform rotate-12" />
              </div>

              <div
                className={`max-w-2xl transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="border-l-8 border-primary pl-6 py-2">
                  <p className="font-mono text-xl font-medium">
                    The complete Next.js starter. Authentication. Payments.
                    Real-time database. Everything. Launch in days, not months.
                  </p>
                </div>
              </div>

              <div
                className={`flex flex-wrap gap-4 pt-8 transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Button
                  size="lg"
                  className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(15,20,25,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,20,25,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-mono font-bold text-base h-14 px-8 rounded-none dark:shadow-[8px_8px_0px_0px_rgba(231,233,234,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(231,233,234,1)]"
                  asChild
                >
                  <Link href="/sign-up">
                    GET STARTED FREE
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-4 border-foreground bg-background shadow-[8px_8px_0px_0px_rgba(15,20,25,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,20,25,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-mono font-bold text-base h-14 px-8 rounded-none dark:shadow-[8px_8px_0px_0px_rgba(231,233,234,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(231,233,234,1)]"
                  asChild
                >
                  <Link href="/docs">VIEW DOCS</Link>
                </Button>
              </div>

              <div
                className={`pt-6 transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
                  ★★★★★ No credit card • Free forever starter
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-24 h-24 border-4 border-primary bg-primary/10 transform rotate-45 hidden xl:block" />
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-[#f7b928] border-4 border-foreground hidden xl:block" />
      </section>

      {/* Stats Bar - Full bleed */}
      <section className="relative border-y-8 border-foreground bg-primary text-primary-foreground py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${stat.delay} both`,
                }}
              >
                <div
                  className="text-7xl md:text-8xl font-black mb-4 tracking-tighter"
                  style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-lg font-bold uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Asymmetric Grid */}
      <section className="py-32 relative">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Section header */}
            <div className="space-y-4">
              <div className="inline-block border-4 border-foreground px-4 py-2 bg-background">
                <span className="font-mono text-sm font-bold tracking-wider">
                  FEATURES
                </span>
              </div>
              <h2
                className="font-black tracking-tighter leading-tight"
                style={{
                  fontFamily: 'Impact, "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                }}
              >
                EVERYTHING YOU NEED
              </h2>
            </div>

            {/* Feature cards - Stacked asymmetric */}
            <div className="space-y-8">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`border-4 border-foreground p-8 md:p-12 ${feature.color} ${
                    feature.color === "bg-foreground" ? "text-background" : "text-foreground"
                  } shadow-[12px_12px_0px_0px_rgba(15,20,25,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(15,20,25,0.1)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-300`}
                  style={{
                    marginLeft: i % 2 === 0 ? '0' : 'auto',
                    marginRight: i % 2 === 0 ? 'auto' : '0',
                    maxWidth: '75%',
                    animation: `slideInRight 0.6s ease-out ${i * 100}ms both`,
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-16 w-16" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-3">
                      <h3
                        className="font-black text-3xl tracking-tight"
                        style={{
                          fontFamily: 'Impact, "Arial Black", sans-serif',
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p className="font-mono text-lg font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Neo-brutalist Cards */}
      <section className="py-32 bg-muted/30 relative">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-block border-4 border-foreground px-4 py-2 bg-background">
                <span className="font-mono text-sm font-bold tracking-wider">
                  PRICING
                </span>
              </div>
              <h2
                className="font-black tracking-tighter leading-tight"
                style={{
                  fontFamily: 'Impact, "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                }}
              >
                SIMPLE. TRANSPARENT.
              </h2>
            </div>

            {/* Pricing cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {pricing.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`border-4 border-foreground p-8 bg-background space-y-6 ${
                    plan.highlighted
                      ? "shadow-[16px_16px_0px_0px_rgba(30,157,241,1)] md:scale-105 relative"
                      : "shadow-[12px_12px_0px_0px_rgba(15,20,25,0.1)]"
                  } hover:shadow-[8px_8px_0px_0px] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 100}ms both`,
                  }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="border-4 border-foreground px-4 py-1 bg-[#f7b928]">
                        <span className="font-mono text-xs font-bold">
                          POPULAR
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="font-mono text-sm font-bold tracking-wider">
                      {plan.name}
                    </div>
                    <div className="space-y-1">
                      <div
                        className="text-6xl font-black tracking-tighter"
                        style={{
                          fontFamily: 'Impact, "Arial Black", sans-serif',
                        }}
                      >
                        {plan.price}
                      </div>
                      <div className="font-mono text-sm text-muted-foreground uppercase">
                        {plan.period}
                      </div>
                    </div>
                  </div>

                  <div className="h-1 bg-foreground" />

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 items-start">
                        <Check className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="font-mono text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full border-4 border-foreground font-mono font-bold text-sm h-12 rounded-none ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-background hover:bg-muted"
                    } shadow-[4px_4px_0px_0px_rgba(15,20,25,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,20,25,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:shadow-[4px_4px_0px_0px_rgba(231,233,234,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(231,233,234,1)]`}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Bold & Direct */}
      <section className="relative border-y-8 border-foreground bg-foreground text-background py-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2
              className="font-black tracking-tighter leading-tight"
              style={{
                fontFamily: 'Impact, "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
              }}
            >
              READY TO SHIP?
            </h2>
            <p className="font-mono text-xl font-medium max-w-2xl mx-auto">
              Join 10,000+ developers building faster with VibeCN. Start your
              free trial today. No credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="border-4 border-background bg-[#f7b928] text-foreground hover:bg-[#f7b928]/90 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-mono font-bold text-base h-14 px-8 rounded-none"
                asChild
              >
                <Link href="/sign-up">
                  START FREE TRIAL
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-12 h-12 border-4 border-background" />
        <div className="absolute top-8 right-8 w-12 h-12 border-4 border-background" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-4 border-background" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-4 border-background" />
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
