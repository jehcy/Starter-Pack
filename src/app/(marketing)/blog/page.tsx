import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Blog | SaaS Starter',
  description: 'Insights, tutorials, and updates from our team',
};

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wider text-primary">Blog</p>
            <h1 className="mt-2 font-bold">
              Insights & Updates
            </h1>
            <div className="mt-6">
              <p className="text-muted-foreground">
                Stay up to date with the latest news, tutorials, and insights from our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="pb-16">
        <div className="container-wide">
          <Card className="mx-auto max-w-4xl border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="font-bold">Subscribe to our newsletter</h3>
                <p className="mt-2 text-muted-foreground">
                  Get the latest posts delivered right to your inbox
                </p>
              </div>
              <form className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit" className="sm:w-auto">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8">
        <div className="container-wide">
          <div className="mb-8">
            <h2 className="font-bold">Featured Post</h2>
          </div>
          <FeaturedPost
            title="Building a Modern SaaS Application with Next.js 15"
            excerpt="Learn how to build a production-ready SaaS application using Next.js 15, TypeScript, and modern development practices. This comprehensive guide covers everything from setup to deployment."
            author="Sarah Johnson"
            date="December 1, 2025"
            readTime="12 min read"
            category="Tutorial"
            image="/api/placeholder/1200/600"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            <CategoryPill category="All" active />
            <CategoryPill category="Tutorials" />
            <CategoryPill category="Product Updates" />
            <CategoryPill category="Engineering" />
            <CategoryPill category="Design" />
            <CategoryPill category="Company News" />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogPost
              title="Introducing Our New Dashboard Design"
              excerpt="We've completely redesigned our dashboard to make it more intuitive and powerful. Here's what's new and why we made these changes."
              author="Michael Chen"
              date="November 28, 2025"
              readTime="5 min read"
              category="Product Updates"
              image="/api/placeholder/800/400"
            />
            <BlogPost
              title="10 Tips for Better API Performance"
              excerpt="Optimize your API calls and improve application performance with these proven strategies and best practices."
              author="Emily Rodriguez"
              date="November 25, 2025"
              readTime="8 min read"
              category="Engineering"
              image="/api/placeholder/800/400"
            />
            <BlogPost
              title="The Art of Component Design"
              excerpt="Creating reusable, accessible, and beautiful components requires careful planning. Learn our approach to component architecture."
              author="David Kim"
              date="November 22, 2025"
              readTime="6 min read"
              category="Design"
              image="/api/placeholder/800/400"
            />
            <BlogPost
              title="How We Scaled to 1 Million Users"
              excerpt="The technical challenges we faced and solutions we implemented while scaling our infrastructure to support millions of users."
              author="Sarah Johnson"
              date="November 18, 2025"
              readTime="10 min read"
              category="Engineering"
              image="/api/placeholder/800/400"
            />
            <BlogPost
              title="Building Accessible Forms"
              excerpt="A comprehensive guide to creating forms that work for everyone, including keyboard navigation and screen reader support."
              author="Alex Thompson"
              date="November 15, 2025"
              readTime="7 min read"
              category="Tutorials"
              image="/api/placeholder/800/400"
            />
            <BlogPost
              title="Our Journey to Carbon Neutrality"
              excerpt="Learn about our commitment to sustainability and the steps we're taking to reduce our environmental impact."
              author="Jennifer Lee"
              date="November 12, 2025"
              readTime="4 min read"
              category="Company News"
              image="/api/placeholder/800/400"
            />
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8">
        <div className="container-wide">
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2230%22 height=%2230%22 viewBox=%220 0 30 30%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z%22 fill=%22rgba(255,255,255,0.07)%22/%3E%3C/svg%3E')] opacity-40" />
            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="font-bold text-primary-foreground">
                Ready to get started?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Join thousands of teams already building with our platform.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8"
                  asChild
                >
                  <Link href="/sign-up">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

function FeaturedPost({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  image,
}: FeaturedPostProps) {
  return (
    <Link href="/blog/post-slug">
      <Card className="group overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden bg-muted lg:aspect-auto">
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {category}
              </span>
            </div>
            <h3 className="mt-4 font-bold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="mt-4 text-muted-foreground">
              {excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{author}</span>
              <span>•</span>
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

interface BlogPostProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

function BlogPost({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  image,
}: BlogPostProps) {
  return (
    <Link href="/blog/post-slug">
      <Card className="group h-full overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
        </div>
        <CardHeader>
          <div className="mb-2">
            <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              {category}
            </span>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="mt-2">
            {excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {readTime}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface CategoryPillProps {
  category: string;
  active?: boolean;
}

function CategoryPill({ category, active }: CategoryPillProps) {
  return (
    <button
      className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
      }`}
    >
      {category}
    </button>
  );
}
