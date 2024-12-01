'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { AnimatedLogo } from '@/components/animated-logo';
const menuItems = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Writing', id: 'writing' },
  { 
    name: 'Guestbook', 
    id: 'guestbook',
    href: 'https://guestbook.mattpalmer.io/',
    external: true 
  },
];

// Client component for navigation logic
function NavigationContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHomePage = pathname === '/';

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && isHomePage) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          scrollToSection(section);
        });
      }, 500);
    }
  }, [isHomePage, searchParams, scrollToSection]);

  useEffect(() => {
    if (pathname === '/books') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  const handleNavigation = (id: string, href?: string) => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (isHomePage) {
      scrollToSection(id);
    } else {
      router.push(`/?section=${id}`);
    }
  };

  return (
    <nav className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <motion.div 
          className="text-xl font-bold" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut",
            // This ensures the animation completes
            type: "tween",
            // Force the animation to finish even if hover ends
            repeatType: "finish"
          }}
        >
          <Link href="/" scroll={false}>
            <AnimatedLogo />
          </Link>
        </motion.div>
        {/* <motion.div whileHover={{ scale: 1.05 }} className="hidden sm:block">
          <Link href="/pricing">
            <Badge
              variant="secondary"
              className="flex items-center gap-2 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all hover:bg-primary/20 hover:shadow-md"
            >
              Work with me
            </Badge>
          </Link>
        </motion.div> */}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-4 md:flex">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => handleNavigation(item.id, item.href)}
            className="btn-scale"
          >
            {item.name}
          </Button>
        ))}
        <Button variant="ghost" asChild className="btn-scale">
          <Link href="/books" scroll={false}>
            <span className="text-2xl">📚</span>
          </Link>
        </Button>
        <ModeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-4 md:hidden">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => handleNavigation(item.id, item.href)}
                className="cursor-pointer justify-end py-1.5"
              >
                {item.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild className="cursor-pointer justify-end py-1.5">
              <Link href="/pricing">Work with me</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer justify-end py-1.5">
              <Link href="/books" scroll={false}>
                <span className="text-xl">📚</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

// Main NavBar component with Suspense boundary
export function NavBar() {
  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Suspense
        fallback={
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="text-xl font-bold">🤙</div>
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
          </div>
        }
      >
        <NavigationContent />
      </Suspense>
    </motion.header>
  );
}
