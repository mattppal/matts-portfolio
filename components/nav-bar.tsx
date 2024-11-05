'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Writing', id: 'writing' },
  { name: 'Contact', id: 'contact' },
];

export function NavBar() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
          <Link href="/">🤙</Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex">
          {menuItems.map((item) => (
            <Button key={item.id} variant="ghost" onClick={() => handleScroll(item.id)}>
              {item.name}
            </Button>
          ))}
          <Button variant="ghost" asChild>
            <Link href="/books">
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
                  onClick={() => handleScroll(item.id)}
                  className="cursor-pointer justify-end py-1.5"
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="cursor-pointer justify-end py-1.5">
                <Link href="/books">
                  <span className="text-xl">📚</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </motion.header>
  );
}
