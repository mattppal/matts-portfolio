'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');

  return (
    <section className="section-padding">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mb-6 text-lg text-muted-foreground">
              Subscribe to my{' '}
              <a
                href="https://blog.mattpalmer.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                blog
              </a>{' '}
              or check out a{' '}
              <a href="#writing" className="underline hover:text-primary">
                post
              </a>{' '}
              first.
            </p>
            <form
              action="https://buttondown.com/api/emails/embed-subscribe/mattpalmer"
              method="post"
              target="popupwindow"
              onSubmit={(e) => {
                window.open('https://buttondown.com/mattpalmer', 'popupwindow');
              }}
              className="mx-auto w-full max-w-sm space-y-2"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  className="h-12 flex-1 text-lg"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  id="bd-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center text-lg"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
