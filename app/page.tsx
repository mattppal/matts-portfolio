import { Suspense } from 'react';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { BlogSection } from '@/components/sections/blog';
import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';
import { ImageGallery } from '@/components/image-gallery';
import { Skeleton } from '@/components/ui/skeleton';
import { LogoCarousel } from '@/components/logo-carousel';
import { CreatorPill } from '@/components/creator-pill';
import { NewsletterSubscription } from '@/components/newsletter-subscription';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-s">
      <div className="mt-xl">
        <CreatorPill />
      </div>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ImageGallery />
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
        <p className="text-center text-muted-foreground mt-m mb-s">Trusted by content teams at</p>
        <LogoCarousel />
      </Suspense>
      <Suspense
        fallback={
          <div className="w-full max-w-4xl mx-auto px-m">
            <Skeleton className="h-[200px]" />
          </div>
        }
      >
        <NewsletterSubscription />
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
        <ProjectsSection />
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
