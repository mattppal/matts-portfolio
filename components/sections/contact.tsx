'use client';

import { motion } from 'motion/react';
import { FaLinkedin, FaXTwitter, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa6';
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
  // {
  //   name: 'Email',
  //   icon: MdEmail,
  //   url: 'mailto:hello@mattpalmer.io',
  //   alt: 'Email',
  // },
  {
    name: 'TikTok',
    icon: FaTiktok,
    url: 'https://tiktok.com/@mattppal',
    alt: 'TikTok',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/mattppal',
    alt: 'Instagram',
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
      className="rounded-full p-3 transition-colors hover:bg-primary/10"
      whileHover={{ scale: 1.05 }}
      aria-label={social.alt}
    >
      <Icon className="h-8 w-8 text-muted-foreground transition-colors hover:text-primary" />
    </motion.a>
  );
};

export function ContactSection() {
  return (
    <div className="mx-auto py-4">
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
        {socials.map((social) => (
          <SocialIcon key={social.name} social={social} />
        ))}
      </motion.div>
    </div>
  );
}
