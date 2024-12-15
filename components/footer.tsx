'use client';

import { motion } from 'motion/react';

export function Footer() {
  return (
    <motion.footer
      className="py-6 text-center text-sm text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <p>made with ❤️ by matt</p>
    </motion.footer>
  );
}
