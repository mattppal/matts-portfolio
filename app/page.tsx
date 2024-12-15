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
import { motion, AnimatePresence } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen flex-col items-center justify-between"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[100vw] overflow-hidden"
        >
          <HeroCarousel />
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
          {...fadeInUp}
          className="max-w-[min(320px,90vw)] text-lg text-muted-foreground sm:max-w-2xl sm:text-xl md:text-2xl"
        >
          <NewsletterSubscription />
        </motion.div>

        <motion.div variants={stagger} initial="initial" animate="animate" className="w-full">
          <motion.div {...fadeInUp}>
            <ProjectsSection />
          </motion.div>
          <motion.div {...fadeInUp}>
            <About />
          </motion.div>
          <motion.div {...fadeInUp}>
            <BlogSection />
          </motion.div>
          <motion.div {...fadeInUp}>
            <ContactSection />
          </motion.div>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
