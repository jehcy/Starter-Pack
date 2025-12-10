# VibeCN Brand Designer Examples

Real-world examples of building theme-aware UI components with the VibeCN design system.

## Table of Contents

1. [Complete Landing Page](#complete-landing-page)
2. [SaaS Dashboard](#saas-dashboard)
3. [Blog Layout](#blog-layout)
4. [E-commerce Product Page](#e-commerce-product-page)
5. [Authentication Pages](#authentication-pages)
6. [Settings Page](#settings-page)

---

## Complete Landing Page

### Full Modern Landing Page

**File:** `src/app/(marketing)/page.tsx`

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Shield, Rocket } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built on Next.js 16 for maximum performance"
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Best practices baked in from day one"
    },
    {
      icon: Rocket,
      title: "Ship Faster",
      description: "Everything you need in one starter kit"
    }
  ]

  const pricing = [
    {
      name: "Starter",
      price: 0,
      description: "Perfect for side projects",
      features: [
        "5 projects",
        "Community support",
        "Basic analytics"
      ],
      cta: "Get Started",
      featured: false
    },
    {
      name: "Pro",
      price: 29,
      description: "For professional developers",
      features: [
        "Unlimited projects",
        "Priority support",
        "Advanced analytics",
        "Custom domains",
        "Team collaboration"
      ],
      cta: "Start Free Trial",
      featured: true
    },
    {
      name: "Enterprise",
      price: 99,
      description: "For growing teams",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations",
        "On-premise option"
      ],
      cta: "Contact Sales",
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              🎉 New v2.0 Released
            </Badge>

            <h1 className="font-bold">
              Ship your SaaS in days, not months
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The complete Next.js starter with authentication, payments,
              and everything you need to launch fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-[5rem]" asChild>
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-[5rem]" asChild>
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <h2 className="font-bold">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Built with modern tools and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-8 space-y-4 border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-bold">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <h2 className="font-bold">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 space-y-6 relative ${
                  plan.featured ? 'border-primary shadow-xl md:scale-105' : ''
                }`}
              >
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

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-bold">
              Ready to ship faster?
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
    </div>
  )
}
```

---

## SaaS Dashboard

### Projects Dashboard

**File:** `src/app/(dashboard)/dashboard/projects/page.tsx`

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Clock, CheckCircle2, AlertCircle } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Marketing Website",
      status: "active",
      lastUpdated: "2 hours ago",
      members: 3
    },
    {
      id: 2,
      name: "Mobile App",
      status: "draft",
      lastUpdated: "1 day ago",
      members: 5
    },
    {
      id: 3,
      name: "API Integration",
      status: "archived",
      lastUpdated: "1 week ago",
      members: 2
    }
  ]

  const statusConfig = {
    active: { icon: CheckCircle2, variant: "default", label: "Active" },
    draft: { icon: Clock, variant: "secondary", label: "Draft" },
    archived: { icon: AlertCircle, variant: "outline", label: "Archived" }
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage and organize your projects
          </p>
        </div>

        <Button className="rounded-[5rem]">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline">All</Button>
          <Button variant="outline">Active</Button>
          <Button variant="outline">Draft</Button>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const status = statusConfig[project.status]
          const StatusIcon = status.icon

          return (
            <Card
              key={project.id}
              className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold">
                  {project.name}
                </h3>
                <Badge variant={status.variant as any}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {status.label}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Last updated</span>
                  <span>{project.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team members</span>
                  <span>{project.members}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <Card className="p-12">
          <div className="max-w-md mx-auto text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-bold">No projects yet</h3>
            <p className="text-muted-foreground">
              Get started by creating your first project
            </p>
            <Button className="rounded-[5rem]">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
```

---

## Blog Layout

### Blog Post List

**File:** `src/app/(marketing)/blog/page.tsx`

```tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js 16",
      excerpt: "Learn how to build modern web applications with the latest version of Next.js",
      category: "Tutorial",
      date: "Dec 8, 2025",
      readTime: "5 min read",
      author: "Jane Doe",
      slug: "getting-started-nextjs-16"
    },
    {
      id: 2,
      title: "Building Real-time Features with InstantDB",
      excerpt: "Discover how to add real-time capabilities to your app without complex backend setup",
      category: "Guide",
      date: "Dec 5, 2025",
      readTime: "8 min read",
      author: "John Smith",
      slug: "realtime-features-instantdb"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 border-b border-border">
        <div className="container-wide max-w-4xl text-center space-y-4">
          <h1 className="font-bold">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights about modern web development
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container-wide max-w-4xl">
          <div className="space-y-12">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>

                    <h2 className="font-bold hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-muted-foreground">
                        By {post.author}
                      </span>
                      <Button variant="link" className="p-0 h-auto">
                        Read more
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-[5rem]">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## E-commerce Product Page

### Product Detail Page

**File:** `src/app/(marketing)/products/[slug]/page.tsx`

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Truck, Shield } from "lucide-react"

export default function ProductPage() {
  const product = {
    name: "Premium Starter Kit",
    price: 199,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Everything you need to build and launch your SaaS product",
    features: [
      "Next.js 16 App Router",
      "Authentication & authorization",
      "Payment integration",
      "Admin dashboard",
      "Email templates",
      "Dark mode support"
    ]
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product image */}
          <div className="space-y-4">
            <Card className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
              <img
                src="/assets/product.jpg"
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Card>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">New Release</Badge>
                {product.inStock ? (
                  <Badge>In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <h1 className="font-bold">{product.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${product.price}</span>
                <span className="text-muted-foreground line-through">$299</span>
                <Badge variant="destructive">33% OFF</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-bold">What's Included</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 rounded-[5rem]">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="rounded-[5rem]">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $100</p>
                  </div>
                </Card>

                <Card className="p-4 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">100% protected</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Authentication Pages

### Sign In Page (Already Exists)

**Enhanced version with better visual hierarchy:**

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>
            <h1 className="font-bold">Welcome back</h1>
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social sign in */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="rounded-[5rem]">
              Google
            </Button>
            <Button variant="outline" className="rounded-[5rem]">
              GitHub
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              Or continue with email
            </span>
          </div>

          {/* Email form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-[5rem]">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Settings Page

### User Settings

**File:** `src/app/(dashboard)/dashboard/settings/page.tsx`

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold">Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your profile details
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" className="rounded-[5rem]">
                  Cancel
                </Button>
                <Button className="rounded-[5rem]">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account security
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-[5rem]">
                    Update
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-[5rem]">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-destructive">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Irreversible actions
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" className="rounded-[5rem]">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                  Customize how the app looks
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4">
                      Light
                    </Button>
                    <Button variant="outline" className="h-auto py-4">
                      Dark
                    </Button>
                    <Button variant="outline" className="h-auto py-4">
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

---

## Key Takeaways

When building pages with VibeCN:

1. **Always read `globals.css` first** - Understand the user's theme
2. **Never override heading typography** - Let theme editor control sizes
3. **Never add max-width to paragraphs** - Control width at container level
4. **Use consistent spacing** - Stick to the defined scale (1, 2, 4, 6, 8, 12)
5. **Use semantic colors** - `text-muted-foreground`, `bg-primary`, etc.
6. **Responsive by default** - Mobile-first approach
7. **Shadcn components** - Leverage the component library
8. **Creative layouts** - Use grids, asymmetry, and whitespace

These examples work across all user themes because they respect the CSS variables in `globals.css`.
