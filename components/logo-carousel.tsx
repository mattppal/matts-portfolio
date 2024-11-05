'use client';

import { ImageCarousel } from '@/components/ui/carousel';

export function LogoCarousel() {
  return (
    <div className="relative w-full py-4 sm:py-6 md:py-8 lg:py-10">
      {/* Left fade overlay - hidden on mobile */}
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />

      <ImageCarousel
        fetchUrl="/api/logos"
        dataKey="logos"
        options={{
          type: 'loop',
          drag: true,
          perPage: 5,
          gap: '.5rem',
          arrows: false,
          pagination: false,
          autoScroll: {
            speed: 0.25,
            pauseOnHover: true,
          },
          breakpoints: {
            3840: {
              perPage: 12,
              gap: '2rem',
            },
            2560: {
              perPage: 10,
              gap: '1.5rem',
            },
            1920: {
              perPage: 8,
              gap: '1rem',
            },
            1536: {
              perPage: 7,
              gap: '1rem',
            },
            1024: {
              perPage: 4,
              gap: '1rem',
            },
            640: {
              perPage: 3,
              gap: '.5rem',
            },
          },
        }}
        itemClassName="h-12 px-4"
        imageClassName="w-auto h-8 opacity-70 transition-opacity hover:opacity-100 dark:brightness-[100] dark:contrast-[0] dark:invert brightness-0"
        priority={true}
      />

      {/* Right fade overlay - hidden on mobile */}
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
