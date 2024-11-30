'use client';

import { motion, useScroll, useTransform, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientBlurProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  position?: 'top' | 'center' | 'bottom';
  animate?: boolean;
}

const intensityMap = {
  subtle: {
    primary: 'bg-primary/5',
    secondary: 'bg-primary/3',
    blur: 'blur-2xl',
  },
  medium: {
    primary: 'bg-primary/10',
    secondary: 'bg-primary/5',
    blur: 'blur-3xl',
  },
  strong: {
    primary: 'bg-primary/15',
    secondary: 'bg-primary/10',
    blur: 'blur-[100px]',
  },
};

const positionMap = {
  top: {
    primary: 'left-1/2 top-0',
    secondary: 'right-0 top-1/4',
  },
  center: {
    primary: 'left-1/2 top-1/2',
    secondary: 'right-1/4 top-1/2',
  },
  bottom: {
    primary: 'left-1/2 bottom-0',
    secondary: 'right-0 bottom-1/4',
  },
};

export function GradientBlur({
  className,
  intensity = 'medium',
  position = 'top',
  animate = true,
}: GradientBlurProps) {
  const { scrollYProgress } = useScroll();
  const intensityStyles = intensityMap[intensity];
  const positionStyles = positionMap[position];

  // Create smooth parallax effects based on scroll
  const primaryY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const primaryX = useTransform(scrollYProgress, [0, 1], ['-50%', '-45%']);
  const secondaryY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const secondaryX = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const Wrapper = animate ? motion.div : 'div';
  const Element = animate ? motion.div : 'div';

  const primaryStyle: HTMLMotionProps<"div">["style"] = {
    y: primaryY,
    x: primaryX,
    scale: scaleValue,
  };

  const secondaryStyle: HTMLMotionProps<"div">["style"] = {
    y: secondaryY,
    x: secondaryX,
    scale: scaleValue,
  };

  return (
    <Wrapper
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      <Element
        variants={item}
        style={primaryStyle}
        className={cn(
          'absolute h-[800px] w-[800px] rounded-full',
          intensityStyles.primary,
          intensityStyles.blur,
          positionStyles.primary
        )}
      />
      <Element
        variants={item}
        style={secondaryStyle}
        className={cn(
          'absolute h-[600px] w-[600px] rounded-full',
          intensityStyles.secondary,
          intensityStyles.blur,
          positionStyles.secondary
        )}
      />
    </Wrapper>
  );
} 