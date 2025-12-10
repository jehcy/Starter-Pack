# VibeCN Brand Designer Reference

Complete reference for building consistent, theme-aware UI components with the VibeCN design system.

## Table of Contents

1. [CSS Variable Token Map](#css-variable-token-map)
2. [Tailwind Utility Mapping](#tailwind-utility-mapping)
3. [Component Patterns](#component-patterns)
4. [Advanced Layouts](#advanced-layouts)
5. [Animation & Transitions](#animation--transitions)
6. [Accessibility Guidelines](#accessibility-guidelines)
7. [Performance Optimization](#performance-optimization)

---

## CSS Variable Token Map

### Color Tokens

All color tokens support light mode (`:root`) and dark mode (`.dark`).

**Background & Foreground:**
```css
--background          → bg-background
--foreground          → text-foreground
--card                → bg-card
--card-foreground     → text-card-foreground
--popover             → bg-popover
--popover-foreground  → text-popover-foreground
```

**Brand Colors:**
```css
--primary             → bg-primary, text-primary, border-primary
--primary-foreground  → text-primary-foreground
--secondary           → bg-secondary, text-secondary
--secondary-foreground → text-secondary-foreground
--accent              → bg-accent, text-accent
--accent-foreground   → text-accent-foreground
```

**State Colors:**
```css
--muted               → bg-muted, text-muted
--muted-foreground    → text-muted-foreground
--destructive         → bg-destructive, text-destructive
--destructive-foreground → text-destructive-foreground
```

**UI Element Colors:**
```css
--border              → border-border
--input               → border-input, bg-input
--ring                → ring-ring (focus states)
```

### Typography Tokens

**Font Families:**
```css
--font-sans           → font-sans (Inter)
--font-mono           → font-mono (JetBrains Mono)
--font-heading        → font-heading (Inter)
```

**Font Sizes (Theme Controlled - DO NOT OVERRIDE):**
```css
--text-h1             → Applied automatically to <h1>
--text-h2             → Applied automatically to <h2>
--text-h3             → Applied automatically to <h3>
--text-h4             → Applied automatically to <h4>
--text-p              → Applied automatically to <p>
--text-small          → Applied to small text
```

**Line Heights (Theme Controlled - DO NOT OVERRIDE):**
```css
--line-height-h1      → Applied automatically to <h1>
--line-height-h2      → Applied automatically to <h2>
--line-height-h3      → Applied automatically to <h3>
--line-height-body    → Applied to body text
```

**Letter Spacing:**
```css
--letter-spacing-tight    → Applied to headings
--letter-spacing-normal   → Default
--letter-spacing-wide     → Applied to uppercase text
```

### Spacing Tokens

```css
--spacing-xs: 0.25rem   → p-1, m-1, gap-1, space-y-1
--spacing-sm: 0.5rem    → p-2, m-2, gap-2, space-y-2
--spacing-md: 1rem      → p-4, m-4, gap-4, space-y-4
--spacing-lg: 1.5rem    → p-6, m-6, gap-6, space-y-6
--spacing-xl: 2rem      → p-8, m-8, gap-8, space-y-8
--spacing-2xl: 3rem     → p-12, m-12, gap-12, space-y-12
```

### Border Radius Tokens

```css
--radius-sm: 0.25rem    → rounded-sm
--radius-md: 0.375rem   → rounded-md
--radius-lg: 0.5rem     → rounded-lg
--radius-xl: 0.75rem    → rounded-xl
--radius-2xl: 1rem      → rounded-2xl
--radius-full: 9999px   → rounded-full
--radius: 0.5rem        → rounded (default)
```

### Max-Width Tokens

```css
--width-xs: 20rem       → max-w-xs
--width-sm: 24rem       → max-w-sm
--width-md: 28rem       → max-w-md
--width-lg: 32rem       → max-w-lg
--width-xl: 36rem       → max-w-xl
--width-2xl: 42rem      → max-w-2xl
--width-3xl: 48rem      → max-w-3xl
--width-4xl: 56rem      → max-w-4xl
--width-5xl: 64rem      → max-w-5xl
--width-6xl: 72rem      → max-w-6xl
--width-7xl: 80rem      → max-w-7xl
--width-full: 100%      → max-w-full
--width-none: none      → max-w-none
```

### Shadow Tokens

```css
--shadow-sm             → shadow-sm
--shadow-md             → shadow-md (or shadow)
--shadow-lg             → shadow-lg
--shadow-xl             → shadow-xl
--shadow-2xl            → shadow-2xl
```

---

## Tailwind Utility Mapping

### Spacing Quick Reference

| Tailwind | Token Value | Use Case |
|----------|-------------|----------|
| `p-1`, `m-1`, `gap-1` | 0.25rem | Tight spacing, icon gaps |
| `p-2`, `m-2`, `gap-2` | 0.5rem | Small element spacing |
| `p-4`, `m-4`, `gap-4` | 1rem | Default spacing, list items |
| `p-6`, `m-6`, `gap-6` | 1.5rem | Card padding, section spacing |
| `p-8`, `m-8`, `gap-8` | 2rem | Generous spacing |
| `p-12`, `m-12`, `gap-12` | 3rem | Section padding, hero spacing |

### Responsive Breakpoints

```tsx
// Mobile-first approach
className="text-center md:text-left"

// Breakpoints:
// sm: 640px  → sm:
// md: 768px  → md:
// lg: 1024px → lg:
// xl: 1280px → xl:
// 2xl: 1536px → 2xl:
```

### Common Utility Combinations

**Centering:**
```tsx
// Center horizontally
<div className="mx-auto max-w-4xl">

// Center content
<div className="flex items-center justify-center">

// Center text
<div className="text-center">
```

**Flexbox Patterns:**
```tsx
// Horizontal stack with gap
<div className="flex gap-4">

// Vertical stack with gap
<div className="flex flex-col gap-6">

// Space between items
<div className="flex justify-between items-center">

// Center items
<div className="flex items-center justify-center gap-2">
```

**Grid Patterns:**
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

// Asymmetric grid
<div className="grid md:grid-cols-3 gap-6">
  <div className="md:col-span-2">Main content</div>
  <div>Sidebar</div>
</div>
```

---

## Component Patterns

### Hero Sections

**Full-width hero with centered content:**
```tsx
<section className="relative py-24 md:py-32 overflow-hidden">
  <div className="container-wide">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      {/* Optional badge */}
      <Badge variant="secondary" className="text-sm">
        New Feature Launch
      </Badge>

      {/* Hero heading - NO size classes */}
      <h1 className="font-bold">
        Build faster with VibeCN
      </h1>

      {/* Hero description */}
      <p className="text-xl text-muted-foreground">
        The Next.js starter kit with everything you need to ship fast
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="rounded-[5rem]">
          Get Started Free
        </Button>
        <Button size="lg" variant="outline" className="rounded-[5rem]">
          View Demo
        </Button>
      </div>
    </div>
  </div>

  {/* Optional background decoration */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
</section>
```

**Hero with image:**
```tsx
<section className="py-24">
  <div className="container-wide">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="font-bold">
          Your product tagline
        </h1>
        <p className="text-xl text-muted-foreground">
          Compelling description of your product
        </p>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl">
        <img
          src="/assets/hero-image.jpg"
          alt="Product screenshot"
          className="w-full h-auto"
        />
      </div>
    </div>
  </div>
</section>
```

### Feature Sections

**Icon grid:**
```tsx
<section className="py-24 bg-muted/50">
  <div className="container-wide">
    <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
      <h2 className="font-bold">
        Powerful Features
      </h2>
      <p className="text-lg text-muted-foreground">
        Everything you need to build modern web applications
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => (
        <Card key={feature.id} className="p-6 space-y-4 border-border">
          {/* Icon container */}
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>

          {/* Feature title - NO size classes */}
          <h3 className="font-bold">
            {feature.title}
          </h3>

          {/* Feature description */}
          <p className="text-muted-foreground">
            {feature.description}
          </p>

          {/* Optional link */}
          <Button variant="link" className="p-0 h-auto">
            Learn more →
          </Button>
        </Card>
      ))}
    </div>
  </div>
</section>
```

**Alternating layout:**
```tsx
<section className="py-24">
  <div className="container-wide space-y-24">
    {features.map((feature, index) => (
      <div
        key={feature.id}
        className={cn(
          "grid lg:grid-cols-2 gap-12 items-center",
          index % 2 === 1 && "lg:grid-flow-dense"
        )}
      >
        <div className={cn("space-y-6", index % 2 === 1 && "lg:col-start-2")}>
          <Badge variant="secondary">{feature.category}</Badge>
          <h2 className="font-bold">{feature.title}</h2>
          <p className="text-lg text-muted-foreground">
            {feature.description}
          </p>
          <Button>Learn More</Button>
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-auto"
          />
        </div>
      </div>
    ))}
  </div>
</section>
```

### Pricing Sections

**Pricing cards:**
```tsx
<section className="py-24">
  <div className="container-wide">
    <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
      <h2 className="font-bold">Simple, Transparent Pricing</h2>
      <p className="text-lg text-muted-foreground">
        Choose the plan that works for you
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "p-8 space-y-6 relative",
            plan.featured && "border-primary shadow-xl scale-105"
          )}
        >
          {/* Featured badge */}
          {plan.featured && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              Most Popular
            </Badge>
          )}

          <div className="space-y-2">
            <h3 className="font-bold">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {plan.description}
            </p>
          </div>

          <Separator />

          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            className="w-full rounded-[5rem]"
            variant={plan.featured ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### Testimonial Sections

**Testimonial grid:**
```tsx
<section className="py-24 bg-muted/50">
  <div className="container-wide">
    <h2 className="font-bold text-center mb-12">
      Loved by thousands
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="p-6 space-y-4">
          {/* Quote */}
          <p className="text-muted-foreground italic">
            "{testimonial.quote}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### CTA Sections

**Simple CTA:**
```tsx
<section className="py-24 bg-primary text-primary-foreground">
  <div className="container-wide">
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <h2 className="font-bold">
        Ready to get started?
      </h2>
      <p className="text-lg opacity-90">
        Join thousands of developers building with VibeCN
      </p>
      <Button size="lg" variant="secondary" className="rounded-[5rem]">
        Start Building Today
      </Button>
    </div>
  </div>
</section>
```

**CTA with form:**
```tsx
<section className="py-24 border-t border-border">
  <div className="container-wide">
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <h2 className="font-bold">
        Stay in the loop
      </h2>
      <p className="text-lg text-muted-foreground">
        Get updates on new features and releases
      </p>

      <form className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1"
        />
        <Button type="submit" size="lg" className="rounded-[5rem]">
          Subscribe
        </Button>
      </form>

      <p className="text-xs text-muted-foreground">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  </div>
</section>
```

---

## Advanced Layouts

### Dashboard Layouts

**Dashboard grid:**
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {/* Stat cards */}
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Total Revenue</p>
        <p className="text-2xl font-bold">$45,231</p>
      </div>
      <DollarSign className="h-8 w-8 text-muted-foreground" />
    </div>
    <p className="text-xs text-muted-foreground mt-4">
      +20.1% from last month
    </p>
  </Card>

  {/* Large chart - spans 2 columns */}
  <Card className="md:col-span-2 p-6">
    <h3 className="font-bold mb-4">Revenue Chart</h3>
    {/* Chart component */}
  </Card>

  {/* Activity feed - spans 2 rows */}
  <Card className="md:row-span-2 p-6">
    <h3 className="font-bold mb-4">Recent Activity</h3>
    {/* Activity list */}
  </Card>
</div>
```

### Sidebar Layouts

**App layout with sidebar:**
```tsx
<div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 border-r border-border bg-card">
    <div className="p-6">
      <h2 className="font-bold">Navigation</h2>
    </div>
    {/* Nav items */}
  </aside>

  {/* Main content */}
  <main className="flex-1 p-8">
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page content */}
    </div>
  </main>
</div>
```

---

## Animation & Transitions

### Hover Effects

```tsx
// Card hover
<Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">

// Button hover (automatic via shadcn)
<Button>Hover me</Button>

// Scale on hover
<div className="transition-transform hover:scale-105">

// Opacity on hover
<div className="transition-opacity hover:opacity-80">
```

### Smooth Transitions

```tsx
// All properties
<div className="transition-all duration-300">

// Specific properties
<div className="transition-colors duration-200">
<div className="transition-transform duration-300 ease-in-out">
<div className="transition-shadow duration-200">
```

---

## Accessibility Guidelines

### Semantic HTML

```tsx
// ✅ Use semantic elements
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>

// ✅ Proper heading hierarchy
<h1> → <h2> → <h3> (don't skip levels)

// ✅ Lists for navigation
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

### ARIA Labels

```tsx
// Icons without text
<button aria-label="Close menu">
  <X className="h-4 w-4" />
</button>

// Images
<img src="logo.svg" alt="Company logo" />

// Loading states
<div aria-live="polite" aria-busy="true">
  Loading...
</div>
```

### Keyboard Navigation

```tsx
// Ensure interactive elements are focusable
<button>, <a href="...">, <input>

// Focus states (automatic via shadcn)
// All shadcn components have focus-visible:ring-2

// Skip to content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Color Contrast

- All color tokens in `globals.css` are designed for WCAG AA compliance
- Test with browser DevTools or contrast checker
- Ensure `text-muted-foreground` has sufficient contrast on backgrounds

---

## Performance Optimization

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/assets/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority // For above-the-fold images
  className="rounded-xl"
/>

// Lazy load below-the-fold images
<Image
  src="/assets/feature.jpg"
  alt="Feature"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false
})
```

### Bundle Size

- Shadcn components are tree-shakeable (only import what you use)
- Avoid importing entire icon libraries:
  ```tsx
  // ✅ Good
  import { ChevronRight } from 'lucide-react'

  // ❌ Bad
  import * as Icons from 'lucide-react'
  ```

---

## Quick Reference Table

| Element | Allowed Classes | Forbidden Classes |
|---------|----------------|-------------------|
| `<h1>`, `<h2>`, `<h3>` | `font-bold`, `text-primary`, `mb-6` | `text-4xl`, `leading-tight`, `tracking-tight` |
| `<p>` | `text-lg`, `text-muted-foreground`, `mb-4` | `max-w-xl`, `max-w-prose` |
| Containers | `max-w-4xl`, `mx-auto`, `px-4` | `max-w-screen-lg` |
| Spacing | `p-6`, `gap-4`, `space-y-8` | `p-[23px]`, arbitrary values |
| Radius | `rounded-xl`, `rounded-[5rem]` (buttons) | Non-standard values |

