'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface Image {
  url: string;
  alt: string;
}

export function ImageGallery() {
  const ref = useRef(null);
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        if (data.images) {
          setImages(data.images);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    }

    fetchImages();
  }, []);

  // Duplicate images for infinite effect
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="relative max-h-[200px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background" />
      <motion.div
        ref={ref}
        className="flex gap-4 py-2"
        style={{
          x: useTransform(
            useScroll({
              target: ref,
              offset: ['start end', 'end start'],
            }).scrollYProgress,
            [0, 1],
            ['-15%', '5%']
          ),
        }}
      >
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="embla__slide relative aspect-video max-h-[200px] w-[355px] flex-shrink-0 overflow-hidden rounded-lg border border-primary/10 bg-card transition-colors hover:border-primary/50 sm:w-[380px] md:w-[400px] lg:w-[420px]"
              >
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 355px, (max-width: 768px) 380px, (max-width: 1024px) 400px, 420px"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
