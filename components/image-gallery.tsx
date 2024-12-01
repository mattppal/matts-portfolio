'use client';

import { ImageCarousel } from '@/components/ui/carousel';

export function ImageGallery() {
  return (
    <div className="relative w-full py-4">
      <ImageCarousel
        fetchUrl="/api/gallery"
        dataKey="images"
        itemClassName="relative aspect-[4/3] max-h-[200px] rounded-[var(--radius)] bg-muted/40 overflow-hidden px-2"
        imageClassName="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        shuffle={true}
        options={{
          type: 'loop',
          drag: true,
          perPage: 5,
          gap: '1rem',
          arrows: false,
          pagination: false,
          autoScroll: {
            speed: 0.25,
            pauseOnHover: true,
          },
          breakpoints: {
            3840: {
              perPage: 10,
              gap: '1rem',
            },
            2560: {
              perPage: 8,
              gap: '1rem',
            },
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
    </div>
  );
}
