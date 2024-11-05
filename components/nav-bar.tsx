'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';

export function NavBar() {
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Projects
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Writing
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Contact
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/books">
              <span className="text-2xl">📚</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
