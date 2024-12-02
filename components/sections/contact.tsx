'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaXTwitter, FaYoutube, FaCalendar } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const socials = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/matt-palmer',
    alt: 'LinkedIn',
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

const SocialIcon = ({ social }: { social: (typeof socials)[number] }) => {
  const Icon = social.icon;
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full p-3 transition-colors hover:bg-primary/10 md:p-4"
      whileHover={{ scale: 1.05 }}
      aria-label={social.alt}
    >
      <Icon className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary md:h-8 md:w-8" />
    </motion.a>
  );
};

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl"
          >
            Get in touch
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mb-8 px-4 text-muted-foreground md:mb-10 md:px-0"
          >
            Feel free to reach out through any of these channels
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {socials.map((social) => (
              <SocialIcon key={social.name} social={social} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
