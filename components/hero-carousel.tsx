'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
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
  const heroImages = useMemo(() => Object.values(assets['hero-carousel']), []);
  const [shuffledImages, setShuffledImages] = useState({
    mobile: heroImages.slice(0, 4),
    desktop: [...heroImages, ...heroImages, ...heroImages],
  });

  useEffect(() => {
    const shuffled = shuffleArray(heroImages);
    const mobileImages = shuffled.slice(0, 4);
    setShuffledImages({
      mobile: mobileImages,
      desktop: [...shuffled, ...shuffled, ...shuffled],
    });
  }, []);

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
              priority={true}
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
                    priority={true}
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
