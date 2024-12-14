'use client';
import { Suspense } from 'react';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { BlogSection } from '@/components/sections/blog';
import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsletterSubscription } from '@/components/newsletter-subscription';
import { HeroCarousel } from '@/components/hero-carousel';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      className="flex min-h-screen flex-col items-center justify-between"
    >
      <motion.div
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="w-full max-w-[100vw] overflow-hidden">
          <HeroCarousel />
        </div>
      </motion.div>

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
      <motion.div
        className="max-w-[min(320px,90vw)] text-lg text-muted-foreground sm:max-w-2xl sm:text-xl md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <NewsletterSubscription />
      </motion.div>
      <motion.div
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <ProjectsSection />
        <About />
        <BlogSection />
        <ContactSection />
      </motion.div>
    </motion.main>
  );
}
