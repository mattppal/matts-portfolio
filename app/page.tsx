import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import HomePage from '@/components/home-page';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-12 w-[300px]" />
          <Skeleton className="h-6 w-[500px]" />
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}
