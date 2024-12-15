'use client';

import { NavBar } from '@/components/nav-bar';
import { usePathname } from 'next/navigation';

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLinksPage = pathname === '/links';

  return (
    <>
      {!isLinksPage && <NavBar />}
      {children}
    </>
  );
}
