'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
  }
};

const positionMap = {
  top: '-top-1/3',
  center: 'top-1/4',
  bottom: 'top-1/2',
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function GradientBlur({
  className,
  intensity = 'medium',
  position = 'top',
}: GradientBlurProps) {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '-30%' : '-50%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.1 : 1.2]);

  const blurIntensity = isMobile ? blurMap.mobile[intensity] : blurMap.default[intensity];

  return (
    <div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}>
      {/* Primary circle */}
      <motion.div
        style={{ y, scale }}
        className={cn(
          'absolute',
          isMobile ? 'left-[20%]' : 'left-[35%]',
          positionMap[position],
          isMobile ? 'h-[600px] w-[600px]' : 'h-[1000px] w-[1000px]',
          'transform-gpu'
        )}
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
          y: useTransform(y, value => `${-parseFloat(value as string)}%`),
          scale: useTransform(scale, value => value * (isMobile ? 0.98 : 0.95))
        }}
        className={cn(
          'absolute',
          isMobile ? 'right-[20%]' : 'right-[35%]',
          positionMap[position],
          isMobile ? 'h-[500px] w-[500px]' : 'h-[900px] w-[900px]',
          'transform-gpu'
        )}
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

      {/* Accent circle - desktop only */}
      {!isMobile && (
        <motion.div
          style={{ 
            y: useTransform(y, value => `${-parseFloat(value as string) * 1.1}%`),
            scale: useTransform(scale, value => value * 0.85)
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
      )}
    </div>
  );
}
