'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { type Video } from '@/components/video-gallery';
import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaySquare } from 'lucide-react';
import Image from 'next/image';
import { VideoModal } from '@/components/video-modal';

interface VideoCarouselProps {
  videos: Video[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = useCallback((videoId: string) => {
    setSelectedVideo(videoId);
  }, []);

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {videos.map((video) => (
            <div key={video.id} className="embla__slide min-w-0 flex-[0_0_300px] px-2">
              <button onClick={() => handleVideoClick(video.id)} className="block h-full w-full">
                <Card className="h-full transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-3">
                    <div className="group relative mb-4 aspect-video overflow-hidden rounded-md">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={480}
                        height={270}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                        <div className="rounded-full border-2 border-white/80 p-2 transition-transform group-hover:scale-110">
                          <PlaySquare className="h-6 w-6 text-white/90" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-semibold">{video.title}</h3>
                  </CardContent>
                </Card>
              </button>
            </div>
          ))}
        </div>
      </div>
      <VideoModal
        isOpen={!!selectedVideo}
        videoId={selectedVideo || ''}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
