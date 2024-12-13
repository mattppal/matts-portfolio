'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { Card } from '@/components/ui/card';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function HeroCarousel() {
  const ref = useRef(null);
  const heroImages = Object.values(assets['hero-carousel']);

  const shuffledImages = useMemo(() => {
    const shuffled = shuffleArray(heroImages);
    return [...shuffled, ...shuffled, ...shuffled];
  }, [heroImages]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['5%', '-45%']);

  return (
    <div className="carousel-mask-container relative z-10 mt-3xl pb-l">
      <div className="carousel-mask">
        <motion.div ref={ref} className="flex gap-4 py-2" style={{ x: xTransform }}>
          {shuffledImages.map((image, index) => (
            <motion.div key={`${image}-${index}`} className="w-[260px] flex-shrink-0 sm:w-[320px]">
              <Card className="group overflow-hidden transition-all duration-300 hover:border-primary/50">
                <Image
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  width={480}
                  height={270}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
