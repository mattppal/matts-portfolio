'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { assets } from '../../config/assets';
import Link from 'next/link';
import { FaXTwitter, FaYoutube, FaRocket, FaHouse, FaPen, FaLinkedin } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { ModeToggle } from './mode-toggle';

interface SocialLink {
  title: string;
  description?: string;
  href: string;
  icon: IconType;
}

const links: SocialLink[] = [
  {
    title: 'Home',
    description: 'Check out my work and projects',
    href: '/',
    icon: FaHouse,
  },
  {
    title: 'Work with Matt',
    description: 'Need devrel? Need technical marketing? Click here.',
    href: 'https://yourdevrel.com',
    icon: FaRocket,
  },
  {
    title: 'Blog',
    description: 'Weekly thoughts on building and life.',
    href: 'https://blog.mattpalmer.io',
    icon: FaPen,
  },
  {
    title: 'X',
    description: 'Follow me for updates',
    href: 'https://x.com/mattppal',
    icon: FaXTwitter,
  },
  {
    title: 'YouTube',
    description: 'Watch my content',
    href: 'https://youtube.com/@mattpalmer',
    icon: FaYoutube,
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    href: 'https://linkedin.com/in/mattppal',
    icon: FaLinkedin,
  },
];

export function LinkTree() {
  return (
    <>
      <ModeToggle />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <Image
          src={assets.headshot}
          alt="Profile picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-primary/50 object-cover transition-colors duration-300 hover:border-primary"
          priority
        />
        <h1 className="text-2xl font-bold">Matt Palmer</h1>
        <p className="max-w-[500px] text-center text-muted-foreground">
          Building great products and making complex tools simple
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 w-full space-y-4"
      >
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.href === '/' ? undefined : '_blank'}
            rel={link.href === '/' ? undefined : 'noopener noreferrer'}
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <link.icon className="h-6 w-6" />
                <div>
                  <CardTitle className="text-xl">{link.title}</CardTitle>
                  {link.description && <CardDescription>{link.description}</CardDescription>}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </motion.div>
    </>
  );
}
