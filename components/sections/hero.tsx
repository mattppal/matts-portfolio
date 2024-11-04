'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { assets } from '@/config/assets';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-32rem)] flex-col justify-center">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center">
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
            className="h-48 w-48 rounded-full object-cover"
            priority
          />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          👋 Hi, I&apos;m Matt
        </motion.h1>
        <motion.p
          className="mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Developer, creator, and technologist building beautiful digital experiences
        </motion.p>
      </div>
    </section>
  );
}
