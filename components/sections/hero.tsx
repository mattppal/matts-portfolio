'use client';

import { motion } from 'framer-motion';
import { assets } from '@/config/assets';
import Image from 'next/image';
import { siteConfig } from '@/app/metadata';

export function Hero() {
  return (
    <section className="section-padding relative flex w-full flex-col justify-center">
      <div className="container mx-auto flex flex-col items-center space-y-m text-center">
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
            className="aspect-square w-[clamp(8rem,20vw,16rem)] rounded-full object-cover"
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
          className="max-w-[min(320px,90vw)] text-lg text-muted-foreground sm:max-w-2xl sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {siteConfig.description}
        </motion.p>
      </div>
    </section>
  );
}
