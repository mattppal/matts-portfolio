'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro' | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Thanks for your interest!',
      description: "We'll be in touch soon about the " + selectedPlan + ' plan.',
    });
    setFormData({ email: '', name: '', notes: '' });
    setSelectedPlan(null);
  };

  const scrollToForm = (plan: 'standard' | 'pro') => {
    setSelectedPlan(plan);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-24">
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
            Slots available in {getNextMonth()}
          </Badge>
        </motion.div>
        <h1 className="mb-4 text-4xl font-bold">Work with me</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          One request at a time. Pause or cancel anytime.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
      >
        {/* Standard Plan */}
        <motion.div
          variants={item}
          className="rounded-lg border p-8 transition-colors hover:border-primary/20"
        >
          <h3 className="mb-4 text-2xl font-bold">Standard</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">$4,995</span>
            <span className="text-muted-foreground">/m</span>
          </div>
          <p className="mb-8 text-muted-foreground">
            One request at a time. Pause or cancel anytime.
          </p>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-2">
              <span>✓</span> One request at a time
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span> Average 48 hour delivery
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span> Unlimited brands
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span> Unlimited stock photos
            </li>
          </ul>
          <Button className="w-full" size="lg" onClick={() => scrollToForm('standard')}>
            Get started
          </Button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          variants={item}
          className="rounded-lg border border-primary/20 bg-primary/5 p-8 transition-colors hover:bg-primary/10"
        >
          <h3 className="mb-4 text-2xl font-bold">Pro</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">$7,995</span>
            <span className="text-muted-foreground">/m</span>
          </div>
          <p className="mb-8 text-muted-foreground">
            Double the requests. Pause or cancel anytime.
          </p>
          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-2">
              <span>✓</span> Two requests at a time
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span> Average 48 hour delivery
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span> Unlimited brands
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span> Unlimited stock photos
            </li>
          </ul>
          <Button className="w-full" size="lg" onClick={() => scrollToForm('pro')}>
            Get started
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced Contact Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-24 max-w-xl rounded-lg border border-primary/20 bg-primary/5 p-8"
        id="contact-form"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold">
              {selectedPlan ? `Get started with ${selectedPlan} plan` : 'Get started'}
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

          <Button type="submit" className="h-12 w-full" variant="default">
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
            className="text-primary underline transition-colors hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
