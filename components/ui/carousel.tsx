'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import type { Options } from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

interface CarouselProps {
  fetchUrl: string;
  dataKey: string;
  itemClassName?: string;
  imageClassName?: string;
  shuffle?: boolean;
  priority?: boolean;
  options?: Options;
}

export function ImageCarousel({
  fetchUrl,
  dataKey,
  itemClassName,
  imageClassName,
  shuffle = true,
  priority = false,
  options,
}: CarouselProps) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        if (data[dataKey]) {
          const newItems = shuffle
            ? [...data[dataKey]].sort(() => Math.random() - 0.5)
            : data[dataKey];
          setItems(newItems);
        }
      } catch (error) {
        console.error(`Failed to fetch ${dataKey}:`, error);
      }
    };

    fetchItems();
  }, [fetchUrl, dataKey, shuffle]);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        }}
      >
        <Splide options={options} extensions={{ AutoScroll }}>
          {items.map((src, index) => (
            <SplideSlide key={`${src}-${index}`}>
              <div className={cn('flex items-center justify-center', itemClassName)}>
                <Image
                  src={src}
                  alt={`Carousel item ${(index % items.length) + 1}`}
                  width={120}
                  height={40}
                  priority={priority}
                  className={cn('object-contain', imageClassName)}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}
