'use client';

import { motion } from 'motion/react';
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
] as const;

const passions = ['Weightlifting', 'Reading', 'Writing', 'Fitness'] as const;

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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
              <CardContent className="space-y-6 pt-6">
                <p className="text-base leading-relaxed sm:text-lg">
                  I&apos;m a former data professional turned product marketer. I spend my time
                  thinking about how to communicate complex things simply.
                </p>
                <p className="text-base leading-relaxed sm:text-lg">
                  I <i>love</i> developer education and marketing. That includes everything from
                  demos & tutorial videos to product marketing assets, blog posts, event planning,
                  and more.
                </p>
                <p className="text-base leading-relaxed sm:text-lg">
                  In my free time, I express my creativity through coding, writing, photography, and
                  videography. I&apos;m extremely passionate about fitness, weightlifting, & all
                  things outdoors.
                </p>
                <p className="text-base leading-relaxed sm:text-lg">
                  I live in San Francisco, California, but I&apos;m from Asheville, North Carolina.
                  I&apos;ve lived in North Carolina, Pennsylvania, Virginia, Utah, & California. 🏄‍♂️
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8 text-center">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold sm:text-xl">Technologies</h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="btn-scale bg-background px-2 py-1 text-xs transition-all hover:bg-primary/10 hover:text-primary sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold sm:text-xl">Passions</h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {passions.map((passion) => (
                  <Badge
                    key={passion}
                    variant="secondary"
                    className="btn-scale bg-background px-2 py-1 text-xs transition-all hover:bg-primary/10 hover:text-primary sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {passion}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <VideoGallery />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
