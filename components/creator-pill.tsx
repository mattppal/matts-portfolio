'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export function CreatorPill() {
  return (
    <motion.div
      className="mb-l flex w-full justify-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Badge
        variant="secondary"
        className="flex items-center gap-2xs px-xs py-2xs text-base shadow-lg transition-shadow hover:shadow-xl"
      >
        <span>the technical marketer behind</span>
        <Image
          src="/replit.svg"
          alt="Replit"
          width={16}
          height={16}
          className="dark:brightness-0 dark:invert"
        />
        <span className="font-semibold">replit</span>
      </Badge>
    </motion.div>
  );
}
