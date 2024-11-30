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
      className="rounded-full p-4 transition-colors hover:bg-primary/10"
      whileHover={{ scale: 1.05 }}
      aria-label={social.alt}
    >
      <Icon className="h-8 w-8 text-muted-foreground transition-colors hover:text-primary" />
    </motion.a>
  );
};

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold md:text-3xl">
            Get in touch
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-muted-foreground">
            Feel free to reach out through any of these channels
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            {socials.map((social) => (
              <SocialIcon key={social.name} social={social} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
