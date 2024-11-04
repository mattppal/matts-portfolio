'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Video {
  src: string;
  title: string;
}

const videos: Video[] = [
  {
    src: '/lifts/dead.mp4',
    title: '405lb Deadlift',
  },
  {
    src: '/lifts/squat.mp4',
    title: '275lb Bench Press',
  },
  {
    src: '/lifts/bench.mp4',
    title: '315lb Squat',
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
      className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg overflow-hidden"
    >
      {videos.map((video, index) => (
        <motion.div
          key={video.src}
          className="relative rounded-lg overflow-hidden bg-black"
          style={{ aspectRatio: '9/16' }}
          animate={{
            opacity: currentIndex === index ? 1 : 0.5,
            scale: currentIndex === index ? 1 : 0.95,
          }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            src={video.src}
            className="w-full h-full object-cover"
            muted
            playsInline
            onEnded={playNextVideo}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
