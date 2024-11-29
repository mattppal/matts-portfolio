'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Clock, Users, Pause, Image, Zap, Briefcase, MessageSquare } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

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

export default function PricingPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    notes: '',
  });
  const [isPro, setIsPro] = useState(false);
  const { toast } = useToast();

  const currentPriceValue = isPro ? 7995 : 4995;
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
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/10 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <motion.div className="mb-8 flex w-full justify-center">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 bg-primary/10 px-4 py-2 text-base text-primary shadow-lg transition-shadow hover:bg-primary/20 hover:shadow-xl"
          >
            <Clock className="h-4 w-4" />
            Slots available in {getNextMonth()}
          </Badge>
        </motion.div>
        <h1 className="mb-4 text-4xl font-bold">Membership</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {currentDescription} Pause or cancel anytime.
        </p>

        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isPro ? 'text-primary' : 'text-muted-foreground'}`}>
            Standard
          </span>
          <Switch
            checked={isPro}
            onCheckedChange={setIsPro}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-sm font-medium flex items-center gap-1 ${isPro ? 'text-primary' : 'text-muted-foreground'}`}>
            Pro <Zap className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <NumberFlowGroup>
            <div className="flex items-start relative">
              <span className="text-4xl font-bold absolute -left-6 top-[0.6em]">$</span>
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
              <span className="ml-2 text-xl text-muted-foreground self-start mt-4">/m</span>
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
          <ul className="grid gap-4 sm:grid-cols-2">
            <motion.li variants={item} className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>
                <NumberFlow 
                  value={isPro ? 2 : 1} 
                  className="font-medium tabular-nums"
                  continuous
                /> request{isPro ? 's' : ''} at a time
              </span>
            </motion.li>
            <motion.li variants={item} className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span>
                Average <NumberFlow value={48} className="font-medium tabular-nums" /> hour delivery
              </span>
            </motion.li>
            <motion.li variants={item} className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <span>Unlimited brands</span>
            </motion.li>
            <motion.li variants={item} className="flex items-center gap-3">
              <Image className="h-5 w-5 text-primary" />
              <span>Unlimited stock photos</span>
            </motion.li>
            <motion.li variants={item} className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span>Unlimited users</span>
            </motion.li>
            <motion.li variants={item} className="flex items-center gap-3">
              <Pause className="h-5 w-5 text-primary" />
              <span>Pause or cancel anytime</span>
            </motion.li>
          </ul>

          <motion.div className="mt-8">
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-scale" 
              size="lg" 
              onClick={scrollToForm}
            >
              Get started
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
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              Get started with{' '}
              <span className="text-primary inline-flex items-center gap-1">
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

          <Button 
            type="submit" 
            className="h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-scale"
          >
            Submit
          </Button>
        </form>
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
