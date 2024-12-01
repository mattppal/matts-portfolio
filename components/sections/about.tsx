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
      <div className="px-s container mx-auto">
        <motion.div
          className="space-y-l mx-auto max-w-4xl"
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
              <CardContent className="space-y-m pt-m">
                <p className="text-base leading-relaxed sm:text-lg">
                  Former data professional turned product marketer, I spend my time thinking about
                  how to communicate complex technology.
                </p>
                <p className="text-base leading-relaxed sm:text-lg">
                  That includes everything from demos & tutorial videos to product marketing assets,
                  blog posts, event planning, and more.
                </p>

                <p className="text-base leading-relaxed sm:text-lg">
                  In my free time, I express my creativity through coding, writing, photography, and
                  videography. I&apos;m extremely passionate about fitness, weightlifting, & all
                  things outdoors.
                </p>

                <p className="text-base leading-relaxed sm:text-lg">
                  I live in San Francisco, California.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-l text-center">
            <div className="space-y-m">
              <h3 className="text-lg font-semibold sm:text-xl">Technologies</h3>
              <div className="gap-2xs sm:gap-xs flex flex-wrap justify-center">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="gap-2xs px-2xs py-2xs btn-scale sm:px-s sm:py-xs bg-background text-xs transition-all hover:bg-primary/10 hover:text-primary sm:text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-m">
              <h3 className="text-lg font-semibold sm:text-xl">Passions</h3>
              <div className="gap-2xs sm:gap-xs flex flex-wrap justify-center">
                {passions.map((passion) => (
                  <Badge
                    key={passion}
                    variant="secondary"
                    className="px-2xs py-3xs btn-scale sm:px-s sm:py-xs bg-background text-xs transition-all hover:bg-primary/10 hover:text-primary sm:text-sm"
                  >
                    {passion}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-l">
            <VideoGallery />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
