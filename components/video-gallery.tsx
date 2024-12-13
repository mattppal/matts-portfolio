'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { assets } from '@/config/assets';
import { Card, CardContent } from '@/components/ui/card';
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: 'dead',
    title: 'Deadlift',
    thumbnail: assets.lifts.dead,
  },
  {
    id: 'bench',
    title: 'Bench Press',
    thumbnail: assets.lifts.bench,
  },
  {
    id: 'squat',
    title: 'Squat',
    thumbnail: assets.lifts.squat,
  },
];

export function VideoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
        firstVideo.play().catch((err) => console.log('Initial playback error:', err));
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

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ once: false, margin: '-20%' }}
      className="mx-auto grid w-full grid-cols-3 gap-xs overflow-hidden rounded-[var(--radius)]"
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
            className={`overflow-hidden transition-all duration-300 ${
              currentIndex === index ? 'border-primary/50' : 'border-border'
            }`}
          >
            <CardContent className="p-0">
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={video.thumbnail}
                className="h-full w-full object-cover"
                muted
                playsInline
                autoPlay
                preload="metadata"
                onEnded={playNextVideo}
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
