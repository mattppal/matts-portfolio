declare module '@splidejs/splide' {
  export interface Options {
    type?: string;
    perPage?: number;
    perMove?: number;
    gap?: string | number;
    arrows?: boolean;
    pagination?: boolean;
    speed?: number;
    easing?: string;
    drag?: boolean;
    direction?: 'ltr' | 'rtl' | 'ttb';
    trimSpace?: boolean;
    focus?: number | 'center';
    autoplay?: boolean;
    interval?: number;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
    resetProgress?: boolean;
    lazyLoad?: boolean | 'nearby' | 'sequential';
    preloadPages?: number;
    keyboard?: boolean | 'focused' | 'global';
    wheel?: boolean;
    releaseWheel?: boolean;
    waitForTransition?: boolean;
    [key: string]: any;
  }
}

declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode } from 'react';
  import { Options } from '@splidejs/splide';

  export interface SplideProps {
    children?: ReactNode;
    options?: Options;
    className?: string;
    [key: string]: any;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
    className?: string;
    [key: string]: any;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}

declare module '@splidejs/splide-extension-auto-scroll' {
  import { Options } from '@splidejs/splide';

  export const AutoScroll: {
    new (Splide: any, options?: Options): any;
  };
}

declare module '@splidejs/splide/dist/css/splide.min.css' {
  const content: any;
  export default content;
}
