'use client';

import { motion } from 'motion/react';
import { ProjectCarousel } from '@/components/project-carousel';
import { projects } from '@/config/projects';
import { useMemo } from 'react';
import { type Project } from '@/components/project-grid';

export function ProjectsSection() {
  const [firstHalf, secondHalf] = useMemo(() => {
    // Create a shuffled copy of the projects array
    const shuffled = [...projects].sort(() => Math.random() - 0.5);

    // Split the shuffled array into two roughly equal parts
    const midpoint = Math.ceil(shuffled.length / 2);
    return [shuffled.slice(0, midpoint), shuffled.slice(midpoint)];
  }, []);

  return (
    <section className="section-padding" id="projects">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-0 mb-xl space-y-4"
      >
        <ProjectCarousel projects={firstHalf} />
        <ProjectCarousel projects={secondHalf} reverse={true} />
      </motion.div>
    </section>
  );
}
