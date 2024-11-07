'use client';

import { motion } from 'framer-motion';
import { assets } from '@/config/assets';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="section-padding relative flex w-full flex-col justify-center">
      <div className="container mx-auto flex flex-col items-center gap-2 text-center sm:gap-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Image
            src={assets.headshot}
            alt="Profile picture"
            width={192}
            height={192}
            className="h-32 w-32 rounded-full object-cover sm:h-48 sm:w-48 md:h-64 md:w-64"
            priority
          />
        </motion.div>
        <motion.h1
          className="text-2xl font-bold sm:text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          👋 Hi, I&apos;m Matt
        </motion.h1>
        <motion.p
          className="max-w-[320px] text-lg text-muted-foreground sm:max-w-2xl sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Developer, creator, and technologist building beautiful digital experiences.
        </motion.p>
      </div>
    </section>
  );
}
