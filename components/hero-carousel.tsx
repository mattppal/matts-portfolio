'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
    // For mobile, we'll only show first 4 images
    const mobileImages = shuffled.slice(0, 4);
    // For desktop carousel, we'll still use the triple-repeated array
    return {
      mobile: mobileImages,
      desktop: [...shuffled, ...shuffled, ...shuffled],
    };
  }, [heroImages]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['5%', '-45%']);

  return (
    <div className="relative z-10 mt-3xl pb-l">
      {/* Mobile Layout */}
      <div className="grid grid-cols-2 gap-2xs px-s md:hidden">
        {shuffledImages.mobile.map((image, index) => (
          <Card
            key={`mobile-${image}-${index}`}
            className="group overflow-hidden transition-all duration-300 hover:border-primary/50"
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              width={480}
              height={270}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority={index < 2}
            />
          </Card>
        ))}
      </div>

      {/* Desktop Carousel */}
      <div className="carousel-mask-container hidden md:block">
        <div className="carousel-mask">
          <motion.div ref={ref} className="flex gap-4 py-2" style={{ x: xTransform }}>
            {shuffledImages.desktop.map((image, index) => (
              <motion.div key={`desktop-${image}-${index}`} className="w-[320px] flex-shrink-0">
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
    </div>
  );
}
