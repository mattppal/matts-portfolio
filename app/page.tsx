import { Suspense } from 'react';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { BlogSection } from '@/components/sections/blog';
import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';
import { Skeleton } from '@/components/ui/skeleton';
import { CreatorPill } from '@/components/creator-pill';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { HeroCarousel } from '@/components/hero-carousel';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Suspense
        fallback={
          <div className="w-full">
            <Skeleton className="h-[300px] w-full" />
          </div>
        }
      >
        <div className="w-full max-w-[100vw] overflow-hidden">
          <HeroCarousel />
        </div>
      </Suspense>

      <Suspense
        fallback={
          <div className="space-y-m">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-6 w-[500px]" />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-4xl px-m">
            <Skeleton className="h-[200px]" />
          </div>
        }
      >
        <NewsletterSubscription />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ProjectsSection />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex gap-s py-m">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-32" />
            ))}
          </div>
        }
      ></Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <About />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <BlogSection />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
