'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface CardStackProps {
  children: ReactNode[];
  onSwipe?: () => void;
}

export function CardStack({ children, onSwipe }: CardStackProps) {
  return (
    <div className="relative h-full w-full">
      <AnimatePresence>
        {children.map((child, index) => (
          <motion.div
            key={index}
            className="absolute h-full w-full"
            initial={{ scale: 1 - index * 0.05, y: index * 15, zIndex: children.length - index }}
            animate={{ scale: 1 - index * 0.05, y: index * 15, zIndex: children.length - index }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.y) > 100) {
                onSwipe?.();
              }
            }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
