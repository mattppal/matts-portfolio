declare module 'react-card-stack-carousel' {
  import { ReactNode } from 'react';

  interface StackedCarouselProps {
    children: ReactNode[];
    height: number;
    autoplay?: boolean;
    onNext?: (index: number) => void;
    transitionDuration?: number;
    scaleFactor?: number;
    verticalOffset?: number;
  }

  export const StackedCarousel: React.FC<StackedCarouselProps>;
}
