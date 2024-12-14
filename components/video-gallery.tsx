'use client';

import React, { useState, useRef } from 'react';
import { useSprings, animated, to as interpolate, SpringValue } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { assets } from '@/config/assets';
import { Card, CardContent } from '@/components/ui/card';

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

interface SpringProps {
  x: SpringValue<number>;
  y: SpringValue<number>;
  rot: SpringValue<number>;
  scale: SpringValue<number>;
}

interface DragProps {
  args: [number];
  down: boolean;
  movement: [number, number];
  direction: [number, number];
  velocity: number;
}

// Helper functions for spring animations
const to = (i: number) => ({
  x: 0,
  y: i * -2,
  scale: 1,
  rot: -5 + Math.random() * 10,
  delay: i * 50,
});

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(10deg) rotateY(${r / 15}deg) rotateZ(${r}deg) scale(${s})`;

export function VideoGallery() {
  const [gone] = useState(() => new Set<number>());
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const [props, api] = useSprings<SpringProps>(videos.length, (i: number) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }: DragProps) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        gone.add(index);
        const nextIndex = (index + 1) % videos.length;
        const nextVideo = videoRefs.current[nextIndex];
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(console.error);
        }
      }

      api.start((i: number) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.05 : 1;

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === videos.length) {
        setTimeout(() => {
          gone.clear();
          api.start((i: number) => to(i));
        }, 600);
      }
    }
  );

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[400px] px-4 py-8">
      <div className="absolute inset-0 flex items-center justify-center">
        {props.map(({ x, y, rot, scale }: SpringProps, i: number) => (
          <animated.div
            key={`${videos[i].id}-${i}`}
            className="absolute h-full w-full"
            style={{ x, y }}
          >
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
              className="h-full w-full touch-none"
            >
              <Card className="h-full w-full overflow-hidden shadow-lg">
                <CardContent className="relative h-full p-0">
                  {loadingStates[i] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <div className="text-sm text-muted-foreground">Loading...</div>
                    </div>
                  )}
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={videos[i].thumbnail}
                    className="h-full w-full overflow-hidden object-cover"
                    muted
                    playsInline
                    autoPlay={i === 0}
                    onLoadStart={() => setLoadingStates((prev) => ({ ...prev, [i]: true }))}
                    onLoadedData={() => setLoadingStates((prev) => ({ ...prev, [i]: false }))}
                    onError={() => {
                      console.error(`Error playing video: ${videos[i].title}`);
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">{videos[i].title}</h3>
                  </div>
                </CardContent>
              </Card>
            </animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
