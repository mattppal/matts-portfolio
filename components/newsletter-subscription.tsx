'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      setError('Email is required');
      setIsValid(false);
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address');
      setIsValid(false);
      return false;
    }
    setError('');
    setIsValid(true);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Handle subscription logic here
      console.log('Subscribing:', email);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-s py-s">
      <motion.div
        className="space-y-m text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-base text-muted-foreground md:text-lg">
          I also write weekly{' '}
          <a
            href="#writing"
            className="underline decoration-primary transition-colors hover:text-foreground"
          >
            thoughts
          </a>{' '}
          on building & marketing.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-xs">
          <div className="flex w-full flex-col gap-xs sm:flex-row">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`h-12 w-full text-base ${
                  error ? 'border-red-500 focus-visible:ring-red-500' : ''
                }`}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                required
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
              />
              {error && (
                <p id="email-error" className="mt-2xs text-left text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="default"
              className="h-12 w-full bg-[#392C72] px-m text-base text-white hover:bg-[#2D2359] sm:w-auto"
              disabled={!isValid}
            >
              Subscribe
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
