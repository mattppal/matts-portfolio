'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaXTwitter, FaYoutube, FaCalendar } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const socials = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/matt-palmer',
    alt: 'LinkedIn',
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/mattppal',
    alt: 'GitHub',
  },
  {
    name: 'X',
    icon: FaXTwitter,
    url: 'https://x.com/mattppal',
    alt: 'X',
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://youtube.com/@mattpalmer',
    alt: 'YouTube',
  },
  {
    name: 'Email',
    icon: MdEmail,
    url: 'mailto:hello@mattpalmer.io',
    alt: 'Email',
  },
  {
    name: 'Calendar',
    icon: FaCalendar,
    url: 'https://calendar.app.google/4Aoa3R1HKFPF48rU6',
    alt: 'Schedule a meeting',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
          variants={itemVariants}
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          variants={itemVariants}
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110 hover:opacity-70"
              >
                <Icon className="h-8 w-8" />
              </Link>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
