'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
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
} from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { ProjectGrid, type Project } from '@/components/project-grid';
import { assets } from '@/config/assets';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
      'An explainer video breaking down the differences between AI agents and assistants.',
    liveUrl: 'https://www.youtube.com/watch?v=1a1-B4kIWpA',
    videoId: '1a1-B4kIWpA',
    imageUrl: 'https://i.ytimg.com/vi/1a1-B4kIWpA/maxresdefault.jpg',
    imageAlt: 'Agent + Assistant Explainer thumbnail',
  },
  {
    title: 'Replit + Y Combinator + a16z',
    description: "Replit's biggest event of 2024, hosted at Y Combinator in partnership with a16z.",
    liveUrl: 'https://www.youtube.com/watch?v=vw727qcskUQ',
    videoId: 'vw727qcskUQ',
    imageUrl: 'https://i.ytimg.com/vi/vw727qcskUQ/maxresdefault.jpg',
    imageAlt: 'Replit and Y Combinator event showcase',
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
  {
    title: 'Understanding ETL',
    description:
      "100-page technical data engineering whitepaper, written in collaboration with O'Reilly Media for Databricks.",
    imageUrl: assets.projects.uetl,
    liveUrl: 'https://zdntzuxuw3xqvcia.public.blob.vercel-storage.com/whitepapers/orm-uetl.pdf',
  },
  {
    title: 'X Receipts',
    description:
      'Generate a receipt from your X profile, built on the X API and deployed on Replit.',
    imageUrl: assets.projects['x-receipts'],
    liveUrl: 'https://x-receipts.replit.app',
  },
  // ... other projects with their categories
];

export default function PricingPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    notes: '',
  });
  const [isPro, setIsPro] = useState(false);

  const currentPriceValue = isPro ? 6995 : 3995;
  const currentDescription = isPro ? 'Double the requests.' : 'One request at a time.';

  return (
    <div className="container relative mx-auto px-4 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column - Membership Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="h-full rounded-xl border border-primary/10 bg-card p-8">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight">Work with Matt 🤘</h1>

              <div>
                <div className="relative flex w-[280px] items-center rounded-full bg-background/10 p-1">
                  <span
                    className={`absolute h-[calc(100%-8px)] rounded-full transition-all duration-200 ${
                      isPro
                        ? 'left-[calc(50%+4px)] w-[calc(50%-8px)] bg-primary'
                        : 'left-1 w-[calc(50%-8px)] bg-foreground/20'
                    }`}
                  />
                  <button
                    onClick={() => setIsPro(false)}
                    className={`relative z-10 flex-1 rounded-full px-6 py-2 text-base font-semibold transition-colors ${
                      !isPro ? 'text-background' : 'text-foreground'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setIsPro(true)}
                    className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-6 py-2 text-base font-semibold transition-colors ${
                      isPro ? 'text-background' : 'text-foreground'
                    }`}
                  >
                    Pro <Zap className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
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

              <div className="flex w-full flex-col gap-4">
                <button
                  onClick={() =>
                    window.open('https://calendar.app.google/4Aoa3R1HKFPF48rU6', '_blank')
                  }
                  className="group relative flex w-full items-center justify-between rounded-lg bg-primary p-6 text-left text-primary-foreground transition-colors hover:bg-primary/90"
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
                    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group relative flex w-full items-center justify-between rounded-lg border border-border bg-card p-6 text-left transition-colors hover:bg-accent"
                >
                  <div>
                    <h3 className="text-lg font-semibold">Sample projects</h3>
                    <p className="text-sm text-muted-foreground">
                      See my recent work and collaborations
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
          </div>
        </motion.div>

        {/* Right Column - What's Included */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="rounded-xl border border-primary/10 bg-card p-8"
        >
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">What&apos;s included</h3>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-base text-primary">
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
            <motion.div variants={item} className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Request & Subscription Details
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-center gap-3">
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
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Average 48 hour delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <Pause className="h-5 w-5 text-primary" />
                  <span>Pause or cancel anytime</span>
                </li>
              </ul>
            </motion.div>

            {/* Product & Marketing */}
            <motion.div variants={item} className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Product & Marketing</h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Product marketing & strategy</span>
                </li>
                <li className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Product launch videos</span>
                </li>
                <li className="flex items-center gap-3">
                  <PlaySquare className="h-5 w-5 text-primary" />
                  <span>Animated product demos</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Product GIFs & animations</span>
                </li>
              </ul>
            </motion.div>

            {/* Developer & Web */}
            <motion.div variants={item} className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Developer & Web Services
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <Code2 className="h-5 w-5 text-primary" />
                  <span>Developer Relations consulting</span>
                </li>
                <li className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Developer education assets</span>
                </li>
                <li className="flex items-center gap-3">
                  <Layout className="h-5 w-5 text-primary" />
                  <span>Responsive website design</span>
                </li>
              </ul>
            </motion.div>

            {/* Events & Media */}
            <motion.div
              variants={item}
              className={`space-y-4 ${!isPro ? 'opacity-40' : ''}`}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-sm font-medium text-muted-foreground">
                Events & Media <Zap className="ml-1 inline-block h-3.5 w-3.5 text-primary" />
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>Event planning & coordination</span>
                </li>
                <li className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Professional photography</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-24 max-w-6xl"
        id="showcase"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">See what you can accomplish</h2>
          <p className="text-muted-foreground">
            A showcase of Matt&apos;s previous work and collaborations
          </p>
        </div>

        <ProjectGrid projects={projects} columns={3} className="mx-auto max-w-6xl" />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-24 max-w-3xl"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Frequently asked questions</h2>
          <p className="text-muted-foreground">Everything you need to know about the membership.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the membership work?</AccordionTrigger>
            <AccordionContent>
              The membership is a monthly subscription that gives you access to my services. You can
              submit requests through a simple form, and I&apos;ll work on them one at a time (or
              two at a time with Pro). You can pause or cancel your membership at any time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What&apos;s your average turnaround time?</AccordionTrigger>
            <AccordionContent>
              Most requests are completed within 48 hours. However, more complex projects may take
              longer. I&apos;ll always communicate the timeline with you before starting the work.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What&apos;s included in the membership?</AccordionTrigger>
            <AccordionContent>
              The membership includes all services listed above: product marketing & strategy,
              product launch videos, animated product demos, developer relations consulting, website
              design, and more. Pro members also get access to event planning and professional
              photography services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I pause or cancel anytime?</AccordionTrigger>
            <AccordionContent>
              Yes, you can pause or cancel your membership at any time. There are no long-term
              commitments or contracts. You only pay for the months you need the service.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>What if I&apos;m not satisfied with the work?</AccordionTrigger>
            <AccordionContent>
              Your satisfaction is my top priority. If you&apos;re not happy with the work,
              I&apos;ll revise it until you&apos;re completely satisfied. If you&apos;re still not
              happy, I&apos;ll refund your last payment - no questions asked.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>How do I get started?</AccordionTrigger>
            <AccordionContent>
              Simply click the &apos;Get started&apos; button above and fill out the quick form.
              I&apos;ll get back to you within 24 hours to discuss your needs. Alternatively, you
              can book a 15-minute intro call to learn more about how I work.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
}
