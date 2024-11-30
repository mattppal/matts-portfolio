'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { Switch } from '@/components/ui/switch';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { ProjectGrid, type Project } from '@/components/project-grid';
import { assets } from '@/config/assets';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
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
    badges: ['Technical Writing', 'Education'],
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
  const { toast } = useToast();

  const currentPriceValue = isPro ? 6995 : 3995;
  const currentDescription = isPro ? 'Double the requests.' : 'One request at a time.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Thanks for your interest!',
      description: `We'll be in touch soon about the ${isPro ? 'Pro ⚡' : 'Standard'} plan.`,
    });
    setFormData({ email: '', name: '', notes: '' });
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container relative mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-16 flex max-w-[640px] flex-col items-center justify-center text-center"
      >
        <motion.div className="mb-8">
          <Badge
            variant="secondary"
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 text-base text-primary shadow-lg transition-shadow hover:bg-primary/20 hover:shadow-xl"
          >
            <Clock className="h-4 w-4" />
            Slots available in {getNextMonth()}
          </Badge>
        </motion.div>
        <div className="w-full space-y-4">
          <h1 className="text-4xl font-bold">Membership</h1>
          <p className="text-lg text-muted-foreground">
            {currentDescription} Pause or cancel anytime.
          </p>
        </div>
        <div className="relative mt-8 flex w-full justify-center">
          <span
            className={`absolute right-[calc(50%+40px)] text-sm font-medium ${!isPro ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Standard
          </span>
          <Switch
            checked={isPro}
            onCheckedChange={setIsPro}
            className="data-[state=checked]:bg-primary"
          />
          <span
            className={`absolute left-[calc(50%+40px)] inline-flex items-center gap-1 text-sm font-medium ${isPro ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Pro <Zap className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="mt-8 flex w-full items-center justify-center">
          <NumberFlowGroup>
            <div className="relative flex items-start">
              <span className="absolute -left-8 top-[0.6em] text-4xl font-bold">$</span>
              <NumberFlow
                value={currentPriceValue}
                className="text-6xl font-bold tabular-nums"
                format={{
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                transformTiming={{ duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                continuous
              />
              <span className="ml-2 mt-4 self-start text-xl text-muted-foreground">/m</span>
            </div>
          </NumberFlowGroup>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-2xl"
      >
        <div className="rounded-lg border border-primary/20 bg-background p-8 shadow-lg">
          <h3 className="mb-6 text-xl font-semibold">What&apos;s included</h3>

          {/* Request & Subscription Details */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">
              Request & Subscription Details
            </h4>
            <ul className="grid gap-4 sm:grid-cols-2">
              <motion.li variants={item} className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>
                  <NumberFlow
                    value={isPro ? 2 : 1}
                    className="font-medium tabular-nums"
                    continuous
                  />{' '}
                  request{isPro ? 's' : ''} at a time
                </span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>
                  Average{' '}
                  <NumberFlow value={isPro ? 48 : 72} className="font-medium tabular-nums" /> hour
                  delivery
                </span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <Pause className="h-5 w-5 text-primary" />
                <span>Pause or cancel anytime</span>
              </motion.li>
            </ul>
          </div>

          {/* Product & Marketing */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">Product & Marketing</h4>
            <ul className="grid gap-4 sm:grid-cols-2">
              <motion.li variants={item} className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Product marketing & strategy</span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <Video className="h-5 w-5 text-primary" />
                <span>Product launch videos</span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <PlaySquare className="h-5 w-5 text-primary" />
                <span>Animated product demos</span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Product GIFs & animations</span>
              </motion.li>
            </ul>
          </div>

          {/* Developer & Web */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">
              Developer & Web Services
            </h4>
            <ul className="grid gap-4 sm:grid-cols-2">
              <motion.li variants={item} className="flex items-center gap-3">
                <Code2 className="h-5 w-5 text-primary" />
                <span>Developer Relations consulting</span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span>Developer education assets</span>
              </motion.li>
              <motion.li variants={item} className="flex items-center gap-3">
                <Layout className="h-5 w-5 text-primary" />
                <span>Responsive website design</span>
              </motion.li>
            </ul>
          </div>

          {/* Events & Media */}
          {isPro && (
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                Events & Media <Zap className="ml-1 inline-block h-3.5 w-3.5 text-primary" />
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                <motion.li variants={item} className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>Event planning & coordination</span>
                </motion.li>
                <motion.li variants={item} className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Professional photography</span>
                </motion.li>
              </ul>
            </div>
          )}

          <motion.div className="mt-8 flex gap-4">
            <Button
              className="btn-scale flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              onClick={scrollToForm}
            >
              Get started
            </Button>
            <Button
              className="btn-scale flex-1 bg-background text-foreground hover:bg-accent"
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Learn more
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Contact Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-24 max-w-xl rounded-lg border border-primary/20 bg-background p-8 shadow-lg"
        id="contact-form"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-bold">
              Get started with{' '}
              <span className="inline-flex items-center gap-1 text-primary">
                {isPro ? 'Pro' : 'Standard'}
                {isPro && <Zap className="h-5 w-5" />}
              </span>
            </h3>
            <p className="text-muted-foreground">
              Fill out the form below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="notes"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Additional notes
              </label>
              <textarea
                id="notes"
                placeholder="Tell me a bit about your project..."
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="btn-scale h-12 flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              className="btn-scale h-12 flex-1 bg-background hover:bg-accent"
              onClick={() => window.open('https://calendar.app.google/4Aoa3R1HKFPF48rU6', '_blank')}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Book a call
              </span>
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Add Showcase Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-24 max-w-6xl"
        id="showcase"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Recent Work</h2>
          <p className="text-muted-foreground">
            A selection of recent projects and collaborations.
          </p>
        </div>

        <ProjectGrid projects={projects.slice(0, 6)} columns={3} className="mx-auto max-w-6xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground">
          Not sure which plan is right for you?{' '}
          <Link
            href="https://calendar.app.google/4Aoa3R1HKFPF48rU6"
            className="inline-flex items-center gap-2 text-primary underline transition-colors hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="h-4 w-4" />
            Book a call
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
