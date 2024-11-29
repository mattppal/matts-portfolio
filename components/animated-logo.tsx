import { motion } from 'framer-motion';

export function AnimatedLogo() {
  return (
    <motion.div
      className="inline-block cursor-pointer text-2xl"
      whileHover={{
        rotate: [0, -20, 20, -10, 10, 0],
        scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }}
    >
      🤙
    </motion.div>
  );
}
