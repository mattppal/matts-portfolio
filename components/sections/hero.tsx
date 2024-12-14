'use client';

import { motion } from 'motion/react';
import { assets } from '@/config/assets';
import Image from 'next/image';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 px-4 text-center"
    >
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
          className="aspect-square w-[clamp(8rem,20vw,16rem)] rounded-full border-4 border-primary/50 object-cover transition-colors duration-300 hover:border-primary"
          priority
        />
      </motion.div>
      <motion.h1 className="text-4xl font-bold md:text-6xl">
        <motion.span
          animate={{
            rotate: [0, -20, 20, -20, 20, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="inline-block"
        >
          👋
        </motion.span>{' '}
        Hi, I&apos;m Matt
      </motion.h1>
      <motion.p
        className="max-w-[min(320px,90vw)] text-lg text-muted-foreground sm:max-w-2xl sm:text-xl md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        I build great products and make complex tools simple.
      </motion.p>
    </motion.div>
  );
}
