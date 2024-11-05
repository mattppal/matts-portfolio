'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VideoGallery } from '@/components/video-gallery';

const skills = [
  'TypeScript',
  'Tailwind CSS',
  'Python',
  'SQL',
  'Premier Pro',
  'After Effects',
  'Figma',
];

const passions = ['Weightlifting', 'Reading', 'Writing', 'Fitness'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          className="mx-auto max-w-4xl space-y-8 sm:space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-center text-2xl font-bold sm:text-3xl md:text-4xl"
            variants={itemVariants}
          >
            About Me
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
                <p className="text-base leading-relaxed sm:text-lg">
                  Former data professional turned product marketer, I spend my time thinking about
                  how to communicate complex technology.
                </p>
                <p className="text-base leading-relaxed sm:text-lg">
                  That includes everything from demos & tutorial videos to product marketing assets,
                  blog posts, event planning, and more.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 text-center sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg font-semibold sm:text-xl">Technologies</h3>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg font-semibold sm:text-xl">Passions</h3>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {passions.map((passion) => (
                  <Badge
                    key={passion}
                    variant="secondary"
                    className="px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {passion}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            <VideoGallery />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
