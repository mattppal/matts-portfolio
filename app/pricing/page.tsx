'use client';

import { motion } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import {
  Clock,
  Pause,
  Zap,
  MessageSquare,
  Video,
  Code2,
  PlaySquare,
  Sparkles,
  Layout,
  CalendarDays,
  Camera,
  GraduationCap,
  DollarSign,
  Trophy,
  Users,
  TrendingUp,
  Target,
} from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { type Project } from '@/components/project-grid';
import { assets } from '@/config/assets';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { VideoModal } from '@/components/video-modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useScroll, useTransform } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function getNextMonth() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
  return months[nextMonth.getMonth()];
}

const projects: Project[] = [
  {
    title: 'Agent + Assistant Explainer',
    description:
      'A 1-minute explainer breaking down the difference between Replit Agent and Assistant.',
    liveUrl: 'https://youtu.be/rkB4PT5yuhw',
    videoId: 'rkB4PT5yuhw',
    imageUrl: 'https://i.ytimg.com/vi/rkB4PT5yuhw/maxresdefault.jpg',
    imageAlt: 'Agent + Assistant Explainer thumbnail',
  },
  {
    title: 'Assistant Launch',
    description: 'Replit Assistant launch video.',
    liveUrl: 'https://youtu.be/Do_lq8RZ9GU',
    videoId: 'Do_lq8RZ9GU',
    imageUrl: 'https://i.ytimg.com/vi/Do_lq8RZ9GU/maxresdefault.jpg',
    imageAlt: 'Agent + Assistant Explainer thumbnail',
  },
  {
    title: 'Replit + Y Combinator + a16z',
    description: "Replit's biggest event of 2024, hosted at Y Combinator in partnership with a16z.",
    liveUrl: 'https://x.com/mattppal/status/1844400953371333035',
    imageUrl: assets.projects.yc,
    imageAlt: 'Replit and Y Combinator event showcase',
    badges: ['Event', 'Partnership'],
  },
  {
    title: 'Deployments on Replit',
    description: 'Breaking down complex technical tools into simple, easy-to-follow videos.',
    videoId: 'sXP5d0k1atk',
    imageUrl: 'https://i.ytimg.com/vi/sXP5d0k1atk/maxresdefault.jpg',
    liveUrl: 'https://www.youtube.com/watch?v=sXP5d0k1atk',
  },
  {
    title: 'uv in 30 seconds',
    description: 'Short-form, entertaining content explaining a complex tool.',
    videoId: '5mbaca1xVJ4',
    imageUrl: 'https://i.ytimg.com/vi/5mbaca1xVJ4/maxresdefault.jpg',
    liveUrl: 'https://www.youtube.com/shorts/5mbaca1xVJ4',
  },
  {
    title: 'xAI Hackathon',
    description: 'Professional photography and color grading for the first ever hackathon at xAI.',
    imageUrl: assets.projects.xai,
    liveUrl: 'https://x.com/mattppal/status/1845583077692903884',
  },
  // {
  //   title: 'Understanding ETL',
  //   description:
  //     "100-page technical data engineering whitepaper, written in collaboration with O'Reilly Media for Databricks.",
  //   imageUrl: assets.projects.uetl,
  //   liveUrl: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/whitepapers/orm-uetl.pdf',
  // },
  // {
  //   title: 'X Receipts',
  //   description:
  //     'Generate a receipt from your X profile, built on the X API and deployed on Replit.',
  //   imageUrl: assets.projects['x-receipts'],
  //   liveUrl: 'https://x-receipts.replit.app',
  // },
  // ... other projects with their categories
];

type SetupCost = {
  name: string;
  amount: number;
};

type MonthlyCost = {
  name: string;
  amount: number;
  period: 'mo' | 'yr';
};

const setupCosts: SetupCost[] = [
  { name: 'Professional Camera Setup', amount: 3000 },
  { name: 'Lighting Equipment', amount: 1000 },
  { name: 'Audio Equipment', amount: 1000 },
];

const monthlyCosts: MonthlyCost[] = [
  { name: 'Senior DevRel Salary', amount: 12500, period: 'mo' },
  { name: 'Benefits', amount: 2500, period: 'mo' },
  { name: 'Overseas Video Editor', amount: 3000, period: 'mo' },
  { name: 'Editing Software', amount: 400, period: 'mo' },
  { name: 'Content Management Tools', amount: 200, period: 'mo' },
  { name: 'Design Software', amount: 100, period: 'mo' },
];

const calculateTotalSetup = (costs: SetupCost[]): number => {
  return costs.reduce((total, cost) => total + cost.amount, 0);
};

const calculateTotalMonthly = (costs: MonthlyCost[]): number => {
  return costs.reduce((total, cost) => {
    const monthlyAmount = cost.period === 'yr' ? cost.amount / 12 : cost.amount;
    return total + monthlyAmount;
  }, 0);
};

function CostBreakdown() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const totalSetup = calculateTotalSetup(setupCosts);
  const totalMonthly = calculateTotalMonthly(monthlyCosts);

  return (
    <div ref={ref} className="space-y-l">
      <div className="rounded-lg border border-border p-l">
        <h3 className="mb-m text-xl font-semibold">One-Time Setup Costs</h3>
        <div className="space-y-s">
          {setupCosts.map((cost) => (
            <div key={cost.name} className="flex items-center justify-between">
              <span>{cost.name}</span>
              <span className="font-mono">
                <NumberFlow
                  value={cost.amount}
                  prefix="$"
                  animated={isInView}
                  format={{ minimumFractionDigits: 0 }}
                  transformTiming={{ duration: 1000, easing: 'ease-out' }}
                  continuous
                />
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-s">
            <div className="flex items-center justify-between font-semibold">
              <span>Initial Investment</span>
              <span className="font-mono">
                <NumberFlow
                  value={totalSetup}
                  prefix="$"
                  animated={isInView}
                  format={{ minimumFractionDigits: 0 }}
                  transformTiming={{ duration: 1000, easing: 'ease-out' }}
                  continuous
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border p-l">
        <h3 className="mb-m text-xl font-semibold">Monthly Operating Costs</h3>
        <div className="space-y-s">
          {monthlyCosts.map((cost) => (
            <div key={cost.name} className="flex items-center justify-between">
              <span>{cost.name}</span>
              <span className="font-mono">
                <NumberFlow
                  value={cost.amount}
                  prefix="$"
                  suffix={`/${cost.period}`}
                  animated={isInView}
                  format={{ minimumFractionDigits: 0 }}
                  transformTiming={{ duration: 1000, easing: 'ease-out' }}
                  continuous
                />
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-s">
            <div className="flex items-center justify-between font-semibold">
              <span>Total Monthly Cost</span>
              <span className="font-mono">
                <NumberFlow
                  value={totalMonthly}
                  prefix="$"
                  suffix="/mo"
                  animated={isInView}
                  format={{ minimumFractionDigits: 0 }}
                  transformTiming={{ duration: 1000, easing: 'ease-out' }}
                  continuous
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-l">
        <h3 className="mb-m text-xl font-semibold text-primary">The Alternative: Work with Matt</h3>
        <div className="space-y-s">
          <div className="flex items-center justify-between">
            <span>All Equipment</span>
            <span className="font-mono">$0</span>
          </div>
          <div className="flex items-center justify-between">
            <span>All Software</span>
            <span className="font-mono">$0</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Video Editing</span>
            <span className="font-mono">$0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-xs">
              Event Planning & Coordination
              <Zap className="h-3.5 w-3.5 text-primary" />
            </span>
            <span className="font-mono">$0</span>
          </div>
          <div className="border-t border-primary/20 pt-s">
            <div className="flex items-center justify-between font-semibold">
              <span>Monthly Subscription</span>
              <span className="font-mono text-primary">
                Starting at{' '}
                <NumberFlow
                  value={3995}
                  prefix="$"
                  suffix="/mo"
                  animated={isInView}
                  format={{ minimumFractionDigits: 0 }}
                  transformTiming={{ duration: 1000, easing: 'ease-out' }}
                  continuous
                />
              </span>
            </div>
            <p className="mt-xs text-sm text-muted-foreground">
              No setup costs. No hidden fees. Pause or cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mx-auto mt-xl max-w-4xl md:mt-2xl"
      ref={ref}
    >
      <div className="mb-l text-center md:mb-xl">
        <h2 className="mb-s text-2xl font-bold md:text-3xl">Case Study: Replit</h2>
        <p className="text-muted-foreground">
          How strategic developer content transformed Replit&apos;s product launches
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-l grid grid-cols-1 gap-m sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center rounded-lg border border-border bg-card p-m text-center"
        >
          <Trophy className="mb-s h-8 w-8 text-primary" />
          <NumberFlow
            value={2800000}
            className="mb-xs text-2xl font-bold"
            suffix="+"
            animated={isInView}
            format={{ notation: 'compact', maximumFractionDigits: 1 }}
          />
          <p className="text-sm text-muted-foreground">Video impressions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center rounded-lg border border-border bg-card p-m text-center"
        >
          <Users className="mb-s h-8 w-8 text-primary" />
          <NumberFlow
            value={12500}
            className="mb-xs text-2xl font-bold"
            suffix="+"
            animated={isInView}
            format={{ notation: 'compact', maximumFractionDigits: 1 }}
          />
          <p className="text-sm text-muted-foreground">New developers reached</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center rounded-lg border border-border bg-card p-m text-center"
        >
          <TrendingUp className="mb-s h-8 w-8 text-primary" />
          <NumberFlow
            value={48}
            className="mb-xs text-2xl font-bold"
            suffix="%"
            animated={isInView}
          />
          <p className="text-sm text-muted-foreground">Increase in product adoption</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center rounded-lg border border-border bg-card p-m text-center"
        >
          <Target className="mb-s h-8 w-8 text-primary" />
          <NumberFlow
            value={92}
            className="mb-xs text-2xl font-bold"
            suffix="%"
            animated={isInView}
          />
          <p className="text-sm text-muted-foreground">Positive feedback rate</p>
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="mb-l space-y-m rounded-lg border border-border bg-card p-l">
        <div>
          <h3 className="mb-s text-xl font-semibold">The Challenge</h3>
          <p className="text-muted-foreground">
            Replit needed to effectively communicate complex AI tools to their developer community
            while maintaining high engagement and technical accuracy. The challenge was to break
            down sophisticated features like AI Agents and Assistants into digestible, actionable
            content.
          </p>
        </div>

        <div>
          <h3 className="mb-s text-xl font-semibold">The Solution</h3>
          <p className="text-muted-foreground">
            We developed a multi-format content strategy that included:
          </p>
          <ul className="mt-s space-y-xs text-muted-foreground">
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Short-form technical videos explaining key features
            </li>
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Interactive tutorials and documentation
            </li>
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Strategic product launch campaigns
            </li>
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Developer education workshops
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-s text-xl font-semibold">Key Outcomes</h3>
          <ul className="space-y-xs text-muted-foreground">
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Reached over 2.8M developers through targeted video content
            </li>
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              48% increase in product adoption following launch campaigns
            </li>
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              92% positive feedback on educational content
            </li>
            <li className="flex items-center gap-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Successfully launched 5+ major product features
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCarousel({
  projects,
  reverse = false,
}: {
  projects: Project[];
  reverse?: boolean;
}) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const ref = useRef(null);

  const handleVideoClick = useCallback((id: string) => {
    setVideoId(id);
  }, []);

  const duplicatedProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);

  const videoModalProps = useMemo(
    () => ({
      isOpen: !!videoId,
      videoId: videoId || '',
      onClose: () => setVideoId(null),
    }),
    [videoId]
  );

  return (
    <>
      <div className="relative mx-auto max-w-[100vw] overflow-hidden">
        {/* Stronger mask overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-background to-transparent" />

        <motion.div
          ref={ref}
          className="flex gap-4 py-2"
          style={{
            x: useTransform(
              useScroll({
                target: ref,
                offset: ['start end', 'end start'],
              }).scrollYProgress,
              [0, 1],
              reverse ? ['5%', '-15%'] : ['-15%', '5%']
            ),
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              className="w-[260px] flex-shrink-0 sm:w-[320px]"
            >
              {project.videoId ? (
                <button
                  onClick={() => handleVideoClick(project.videoId!)}
                  className="block h-full w-full"
                >
                  <Card className="h-full transition-all duration-300 hover:border-primary/50">
                    <CardContent className="p-3">
                      <div className="group relative mb-4 aspect-video overflow-hidden rounded-md">
                        {project.imageUrl && (
                          <Image
                            src={project.imageUrl}
                            alt={project.imageAlt || project.title}
                            width={480}
                            height={270}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                          <div className="rounded-full border-2 border-white/80 p-2 transition-transform group-hover:scale-110">
                            <PlaySquare className="h-6 w-6 text-white/90" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                      <CardHeader className="p-0">
                        <CardTitle className="mb-2 text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      {project.badges && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.badges.map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </button>
              ) : (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="h-full transition-all duration-300 hover:border-primary/50">
                    <CardContent className="p-3">
                      <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
                        {project.imageUrl && (
                          <Image
                            src={project.imageUrl}
                            alt={project.imageAlt || project.title}
                            width={480}
                            height={270}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        )}
                      </div>
                      <CardHeader className="p-0">
                        <CardTitle className="mb-2 text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      {project.badges && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.badges.map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <VideoModal {...videoModalProps} />
    </>
  );
}

export default function PricingPage() {
  // Add state for Pro toggle
  const [isPro, setIsPro] = useState(false);

  // Derive projects for each row
  const evenProjects = useMemo(() => projects.filter((_, i) => i % 2 === 0), []);
  const oddProjects = useMemo(() => projects.filter((_, i) => i % 2 === 1), []);

  // Derive pricing values
  const currentPriceValue = isPro ? 6995 : 3995;
  const currentDescription = isPro ? 'Double the requests.' : 'One request at a time.';

  return (
    <div className="container relative mx-auto mt-xl px-s py-l md:mt-2xl md:py-2xl">
      {/* Hero Section - Updated for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-xl max-w-4xl text-center md:mb-3xl"
      >
        <h1 className="mb-l text-4xl font-bold leading-[1.2] tracking-tight md:mb-xl md:text-6xl">
          Developer marketing, simplified.
        </h1>
        <p className="mb-l text-lg leading-relaxed text-muted-foreground md:mb-xl md:text-xl">
          From product launches to developer education, I help companies connect with developers
          through compelling content and strategic marketing.
        </p>

        {/* Explainer Icons - Updated grid for mobile */}
        <div className="mb-l grid grid-cols-1 gap-m sm:grid-cols-2 md:mb-xl md:grid-cols-4 md:gap-l">
          <div className="flex flex-col items-center text-center">
            <div className="mb-s flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-xs font-semibold">Monthly subscription</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe monthly and pause or cancel anytime. No long-term commitments.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-s flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-xs font-semibold">Unlimited requests</h3>
            <p className="text-sm text-muted-foreground">
              Submit as many requests as you need. We&apos;ll work on them one at a time.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-s flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-xs font-semibold">72 hour delivery</h3>
            <p className="text-sm text-muted-foreground">
              Most requests are completed within 72 hours. Complex projects may take longer.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-s flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-xs font-semibold">Incredible value</h3>
            <p className="text-sm text-muted-foreground">
              Typical DevRel costs run $10-20k/mo plus setup.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-s sm:flex-row">
          <button
            onClick={() =>
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-s py-xs text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            See plans
          </button>
          <button
            onClick={() =>
              document.getElementById('breakdown')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex w-full items-center justify-center rounded-lg border border-primary px-s py-xs text-lg font-medium text-primary transition-colors hover:bg-primary/10 sm:w-auto"
          >
            Compare costs
          </button>
        </div>
      </motion.div>

      {/* Projects Section - Updated spacing and layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mb-xl space-y-4 md:mb-3xl"
        id="showcase"
      >
        <div className="mb-m text-center md:mb-l">
          <h2 className="mb-s text-2xl font-bold md:text-3xl">See what you can accomplish</h2>
          <p className="text-muted-foreground">A showcase of previous work and collaborations</p>
        </div>

        <ProjectCarousel projects={evenProjects} />
        <ProjectCarousel projects={oddProjects} reverse={true} />
      </motion.div>

      {/* Cost Breakdown Section - Updated spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-xl max-w-3xl md:mb-3xl"
        id="breakdown"
      >
        <div className="mb-xl text-center">
          <h2 className="mb-s text-3xl font-bold">The cost breakdown</h2>
          <p className="text-muted-foreground">
            Here&apos;s what you&apos;d typically spend to build an in-house DevRel program
          </p>
        </div>
        <CostBreakdown />
      </motion.div>

      {/* Pricing Grid - Reduced gap and optimized columns */}
      <div
        id="pricing"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-m lg:grid-cols-7 lg:gap-l"
      >
        {/* Left Column - Takes 3 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full rounded-xl border border-primary/10 bg-card px-m pb-s pt-l lg:col-span-3"
        >
          <div className="flex flex-col items-center space-y-m text-center">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              Work with Matt 🤘
            </h1>

            {/* Toggle Switch - Updated styling */}
            <div>
              <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-muted p-1">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isPro}
                  onChange={() => setIsPro(!isPro)}
                />
                <span
                  className={`flex items-center rounded px-4 py-2 text-base font-medium transition-colors ${
                    !isPro
                      ? 'bg-background text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Standard
                </span>
                <span
                  className={`flex items-center gap-1 rounded px-4 py-2 text-base font-medium transition-colors ${
                    isPro
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Pro
                  <Zap className="h-4 w-4" />
                </span>
              </label>
            </div>

            <div className="space-y-s">
              <div className="flex items-baseline gap-xs">
                <span className="text-2xl font-semibold">$</span>
                <NumberFlow
                  value={currentPriceValue}
                  className="text-6xl font-bold tabular-nums tracking-tight"
                  format={{
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  transformTiming={{ duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  continuous
                />
                <span className="text-xl text-muted-foreground">/m</span>
              </div>
              <p className="text-lg text-muted-foreground">{currentDescription}</p>
            </div>

            <div className="flex w-full flex-col gap-s">
              <button
                onClick={() =>
                  window.open('https://calendar.app.google/4Aoa3R1HKFPF48rU6', '_blank')
                }
                className="group relative flex w-full items-center justify-between rounded-lg bg-primary p-s text-left text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <div>
                  <h3 className="text-lg font-semibold">Book a 15-min intro call</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Learn more about how I work and how I can help you
                  </p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary-foreground/30 transition-transform group-hover:translate-x-1">
                  <svg
                    className="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button
                onClick={() =>
                  document.getElementById('questions')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group relative flex w-full items-center justify-between rounded-lg border border-border bg-card p-s text-left transition-colors hover:bg-accent"
              >
                <div>
                  <h3 className="text-lg font-semibold">Learn more</h3>
                  <p className="text-sm text-muted-foreground">
                    Frequently asked questions and answers
                  </p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground/30 transition-transform group-hover:translate-x-1">
                  <svg
                    className="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Takes 4 columns for better text fit */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="rounded-xl border border-primary/10 bg-card p-l lg:col-span-4"
        >
          <div className="space-y-m md:space-y-l">
            <div className="flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between sm:gap-xs">
              <h3 className="order-last text-xl font-semibold sm:order-none">
                What&apos;s included
              </h3>
              <div className="order-first inline-flex items-center gap-xs whitespace-nowrap rounded-full bg-primary/10 px-s py-xs text-sm text-primary sm:order-none sm:text-base">
                <motion.div
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                Slots available in {getNextMonth()}
              </div>
            </div>

            {/* Request & Subscription Details */}
            <motion.div variants={item} className="space-y-s">
              <h4 className="text-sm font-medium text-muted-foreground">
                Request & Subscription Details
              </h4>
              <ul className="grid gap-s sm:grid-cols-2">
                <li className="flex items-center gap-s">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>
                    <NumberFlow
                      value={isPro ? 2 : 1}
                      className="font-medium tabular-nums"
                      continuous
                    />{' '}
                    request{isPro ? 's' : ''} at a time
                  </span>
                </li>
                <li className="flex items-center gap-s">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Average 72 hour delivery</span>
                </li>
                <li className="flex items-center gap-s">
                  <Pause className="h-5 w-5 text-primary" />
                  <span>Pause or cancel anytime</span>
                </li>
              </ul>
            </motion.div>

            {/* Product & Marketing */}
            <motion.div variants={item} className="space-y-s">
              <h4 className="text-sm font-medium text-muted-foreground">Product & Marketing</h4>
              <ul className="grid gap-s sm:grid-cols-2">
                <li className="flex items-center gap-s">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Product marketing & strategy</span>
                </li>
                <li className="flex items-center gap-s">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Animated product demos</span>
                </li>
                <li className="flex items-center gap-s">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Product GIFs & animations</span>
                </li>
                <li className="flex items-center gap-s">
                  <PlaySquare
                    className={`h-5 w-5 ${isPro ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <span className={!isPro ? 'text-muted-foreground' : ''}>
                    E2E product launch support{' '}
                    <Zap
                      className={`ml-2xs inline-block h-3.5 w-3.5 ${isPro ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Developer & Web */}
            <motion.div variants={item} className="space-y-s">
              <h4 className="text-sm font-medium text-muted-foreground">
                Developer & Web Services
              </h4>
              <ul className="grid gap-s sm:grid-cols-2">
                <li className="flex items-center gap-s">
                  <Code2 className="h-5 w-5 text-primary" />
                  <span>Full DevRel support</span>
                </li>
                <li className="flex items-center gap-s">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Custom talking-head videos</span>
                </li>
                <li className="flex items-center gap-s">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Interactive tutorials and projects</span>
                </li>
                <li className="flex items-center gap-s">
                  <Layout className="h-5 w-5 text-primary" />
                  <span>Responsive website design</span>
                </li>
              </ul>
            </motion.div>

            {/* Events & Media - Updated lightning icon */}
            <motion.div variants={item} className="space-y-s">
              <h4 className="text-sm font-medium text-muted-foreground">
                Events & Media{' '}
                <Zap
                  className={`ml-2xs inline-block h-3.5 w-3.5 ${isPro ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </h4>
              <ul className="grid gap-s sm:grid-cols-2">
                <li className="flex items-center gap-s">
                  <CalendarDays
                    className={`h-5 w-5 ${isPro ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <span className={!isPro ? 'text-muted-foreground' : ''}>
                    Event planning & coordination
                  </span>
                </li>
                <li className="flex items-center gap-s">
                  <Camera
                    className={`h-5 w-5 ${isPro ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <span className={!isPro ? 'text-muted-foreground' : ''}>
                    Professional photography
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Add the case study section here, before the FAQ */}
      <CaseStudy />

      {/* FAQ Section - Updated spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-xl max-w-3xl md:mt-2xl"
        id="questions"
      >
        <div className="mb-l text-center md:mb-xl">
          <h2 className="mb-s text-2xl font-bold md:text-3xl">Common questions</h2>
          <p className="text-muted-foreground">Everything you need to know about the membership.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-0" className="border-b-0">
            <AccordionTrigger className="py-s text-lg font-medium">
              What am I paying you for?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                If you&apos;ve ever worked with a technical product, you soon realized a large share
                of your users have no idea what your product is. This is a marketing and education
                issue.
              </p>
              <p>
                Matt is an experienced developer educator, who&apos;s worked with companies like
                Replit, LinkedIn, O&apos;Reilly Media, xAI, and many more to simplify complex
                experiences and foster amazing developer interactions.
              </p>
              <p>
                He&apos;s successfully executed multi-million impression campaigns from start to
                finish and helped many others achieve their awareness, engagement, and conversion
                goals.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              Why not hire a full-time DevRel or Product Marketer?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                A senior DevRel professional or technical marketing manager costs $150,000+
                annually, plus benefits. Beyond the cost, you might not have enough consistent work
                to justify a full-time hire.
              </p>

              <p>
                DevRel has an extremely steep learning curve and ramp-up{' '}
                <a href="#breakdown" className="text-primary hover:underline">
                  cost
                </a>
                . High quality video production alone requires $5,000+ in equipment and video
                editing skills, not to mention hundreds in annual SaaS subscriptions. Even
                outsourcing to an overseas video editor costs around $3,000/month.
              </p>

              <p>
                With a monthly subscription, you can scale up or down based on your product
                launches, content needs, and marketing campaigns - only paying for what you need,
                when you need it, while leveraging years of experience and professional equipment.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              What types of requests can I make?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                You can request anything from technical blog posts and documentation, to product
                launch videos, developer education content, API guides, technical social content,
                product launches, event planning, and more.
              </p>

              <p>Once subscribed, you can add as many requests to your queue as you&apos;d like.</p>
              <p>
                Note: Full event coordination and end-to-end product launch support are
                time-intensive services that are exclusively available in the Pro plan.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              How quickly will I receive my content?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                Most requests are completed within 72 hours. This includes items like blog posts,
                social content, or product demos.
              </p>

              <p>
                Larger projects like documentation overhauls or video series are broken down into
                manageable deliverables, with updates every 72 hours until completion.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              Who will be working on my requests?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                You&apos;ll work directly with me (Matt), a developer and content creator with
                experience at companies like Replit, LinkedIn, O&apos;Reilly Media, xAI, and more.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              How do you handle larger requests?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                Larger requests are broken down into manageable deliverables. This applies to
                product launches, event planning, documentation overhauls, video series, and more.
                You&apos;ll receive regular updates and deliverables every 72 hours until
                completion.
              </p>

              <p>
                This approach ensures you have visibility into progress and can provide feedback
                throughout the process, rather than waiting for one big delivery at the end.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              How does the pause feature work?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                Billing cycles are based on a 31-day period. If you pause after 21 days, you&apos;ll
                have 10 days of service remaining to use anytime.
              </p>

              <p>
                This is perfect for teams who might need intense support during product launches or
                conference seasons, but less support during development phases.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              What if I need revisions?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                Revisions are included in your subscription. We&apos;ll work together until the
                content perfectly matches your technical requirements and brand voice.
              </p>

              <p>
                Technical accuracy is especially important, so we&apos;ll ensure everything is
                thoroughly reviewed and tested.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border-b-0">
            <AccordionTrigger className="py-4 text-lg font-medium">
              What services aren&apos;t included?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-base">
              <p>
                While I cover most developer marketing and education needs, I don&apos;t provide:
                direct community management, 24/7 developer support, physical event staffing, or
                full-time developer advocacy.
              </p>

              <p>
                The focus is on creating high-quality content and materials that your team can use.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
}
