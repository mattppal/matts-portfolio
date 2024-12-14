'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { assets } from '@/config/assets';
import { Card, CardContent } from '@/components/ui/card';
import type { SyntheticEvent } from 'react';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: 'squat',
    title: 'Squat',
    thumbnail: assets.lifts.squat,
  },
  {
    id: 'bench',
    title: 'Bench Press',
    thumbnail: assets.lifts.bench,
  },

  {
    id: 'dead',
    title: 'Deadlift',
    thumbnail: assets.lifts.dead,
  },
];

export function VideoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoErrors, setVideoErrors] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const playNextVideo = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);

    // Play the next video after a short delay to ensure state update
    setTimeout(() => {
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo && isInView) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch((err) => console.log('Playback error:', err));
      }
    }, 100);
  };

  useEffect(() => {
    // Initialize video refs array
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    // Start playing the first video if in view
    if (isInView) {
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        firstVideo.play().catch((err) => {
          console.error('Initial playback error:', err);
          setVideoErrors((prev) => ({ ...prev, '0': err.message }));
        });
      }
    }

    return () => {
      // Cleanup: pause all videos
      videoRefs.current.forEach((video) => video?.pause());
    };
  }, [isInView]);

  // Pause videos when out of view
  useEffect(() => {
    if (!isInView) {
      videoRefs.current.forEach((video) => video?.pause());
    }
  }, [isInView]);

  // Add error handling for video loading
  const handleVideoError = (index: number, event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    console.error(`Error loading video ${index}:`, video.error);
    setVideoErrors((prev) => ({ ...prev, [index]: video.error?.message || 'Unknown error' }));
  };

  const handleVideoLoadStart = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
    console.log(`Video ${index} loading started`);
  };

  const handleVideoLoadedData = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
    console.log(`Video ${index} loaded successfully`);
  };

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ once: false, margin: '-20%' }}
      className="mx-auto grid w-full grid-cols-3 gap-2xs overflow-hidden rounded-[var(--radius)]"
    >
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className="relative w-full"
          style={{
            aspectRatio: '9/16',
            height: 'auto',
          }}
          animate={{
            opacity: currentIndex === index ? 1 : 0.5,
            scale: currentIndex === index ? 1 : 0.95,
          }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`relative overflow-hidden transition-all duration-300 ${
              currentIndex === index ? 'border-primary/50' : 'border-border'
            }`}
          >
            <CardContent className="relative p-0">
              {/* Loading indicator */}
              {loadingStates[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="text-sm text-muted-foreground">Loading...</div>
                </div>
              )}

              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={video.thumbnail}
                className="h-full w-full object-cover"
                muted
                playsInline
                autoPlay
                preload="auto"
                onLoadStart={() => handleVideoLoadStart(index)}
                onLoadedData={() => handleVideoLoadedData(index)}
                onError={(e) => handleVideoError(index, e)}
                onEnded={playNextVideo}
                poster={`/api/video-thumbnail?url=${encodeURIComponent(video.thumbnail)}`}
              />

              {/* Error message */}
              {videoErrors[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 p-2 text-center text-sm text-muted-foreground">
                  <div>
                    Failed to load video
                    <button
                      onClick={() => {
                        const videoEl = videoRefs.current[index];
                        if (videoEl) {
                          setVideoErrors((prev) => ({ ...prev, [index]: '' }));
                          videoEl.load();
                          videoEl.play().catch(console.error);
                        }
                      }}
                      className="ml-2 text-primary hover:underline"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
