'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface GradientBlurProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  position?: 'top' | 'center' | 'bottom';
}

const intensityMap = {
  subtle: 'opacity-[0.03]',
  medium: 'opacity-[0.045]',
  strong: 'opacity-[0.06]',
};

const blurMap = {
  default: {
    subtle: 'blur-[50px]',
    medium: 'blur-[75px]',
    strong: 'blur-[100px]',
  },
  mobile: {
    subtle: 'blur-[30px]',
    medium: 'blur-[40px]',
    strong: 'blur-[50px]',
  },
};

const positionMap = {
  top: '-top-1/3',
  center: 'top-1/4',
  bottom: 'top-1/2',
};

export function GradientBlur({
  className,
  intensity = 'medium',
  position = 'top',
}: GradientBlurProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  // Always create transforms, but use different values based on isMobile
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const secondaryY = useTransform(y, (value) => `${-parseFloat(value as string)}%`);
  const secondaryScale = useTransform(scale, (value) => value * 0.95);
  const accentY = useTransform(y, (value) => `${-parseFloat(value as string) * 1.1}%`);
  const accentScale = useTransform(scale, (value) => value * 0.85);

  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    updateMobileState();

    window.addEventListener('resize', updateMobileState);
    return () => window.removeEventListener('resize', updateMobileState);
  }, []);

  const blurIntensity = isMobile ? blurMap.mobile[intensity] : blurMap.default[intensity];

  return (
    <div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}>
      {/* Primary circle */}
      <motion.div
        style={{
          y,
          scale,
          left: isMobile ? '20%' : '35%',
          width: isMobile ? '600px' : '1000px',
          height: isMobile ? '600px' : '1000px',
        }}
        className={cn('absolute', positionMap[position], 'transform-gpu')}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-primary mix-blend-normal',
            intensityMap[intensity],
            blurIntensity
          )}
        />
      </motion.div>

      {/* Secondary circle */}
      <motion.div
        style={{
          y: secondaryY,
          scale: secondaryScale,
          right: isMobile ? '20%' : '35%',
          width: isMobile ? '500px' : '900px',
          height: isMobile ? '500px' : '900px',
        }}
        className={cn('absolute', positionMap[position], 'transform-gpu')}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-secondary mix-blend-normal',
            intensityMap[intensity],
            blurIntensity
          )}
        />
      </motion.div>

      {/* Accent circle - always render but hide on mobile */}
      <motion.div
        style={{
          y: accentY,
          scale: accentScale,
          opacity: isMobile ? 0 : 1,
          pointerEvents: isMobile ? 'none' : 'auto',
        }}
        className={cn(
          'absolute left-[45%]',
          positionMap[position],
          'h-[800px] w-[800px]',
          'transform-gpu'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-accent mix-blend-normal',
            intensityMap[intensity],
            blurIntensity
          )}
        />
      </motion.div>
    </div>
  );
}
