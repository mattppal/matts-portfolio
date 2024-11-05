'use client';

import { ImageCarousel } from '@/components/ui/carousel';

export function ImageGallery() {
  return (
    <div className="relative w-full py-4">
      {/* Left fade overlay */}
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />

      <ImageCarousel
        fetchUrl="/api/gallery"
        dataKey="images"
        itemClassName="relative aspect-[4/3] max-h-[200px] rounded-lg bg-muted/40 overflow-hidden px-2"
        imageClassName="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        shuffle={true}
        options={{
          type: 'loop',
          drag: 'free',
          perPage: 5,
          gap: '1rem',
          arrows: false,
          pagination: false,
          autoScroll: {
            speed: 0.25,
            pauseOnHover: true,
          },
          breakpoints: {
            1920: {
              perPage: 7,
              gap: '1rem',
            },
            1536: {
              perPage: 6,
              gap: '1rem',
            },
            1024: {
              perPage: 4,
              gap: '1rem',
            },
            640: {
              perPage: 2,
              gap: '1rem',
            },
          },
        }}
        priority={true}
      />

      {/* Right fade overlay */}
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
    </div>
  );
}
