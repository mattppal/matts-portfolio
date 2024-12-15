declare module 'react-stack-cards' {
  import { ReactNode } from 'react';

  interface StackCardProps {
    images: string[];
    width: number;
    height: number;
    direction?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
    duration?: number;
    children: ReactNode[];
  }

  export const StackCard: React.FC<StackCardProps>;
}
