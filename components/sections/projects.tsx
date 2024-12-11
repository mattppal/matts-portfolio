'use client';

import { motion } from 'framer-motion';
import { ProjectCarousel } from '@/components/project-carousel';
import { projects } from '@/config/projects';
import { useMemo } from 'react';
import { type Project } from '@/components/project-grid';

export function ProjectsSection() {
  const evenProjects = useMemo(() => projects.filter((_: Project, i: number) => i % 2 === 0), []);
  const oddProjects = useMemo(() => projects.filter((_: Project, i: number) => i % 2 === 1), []);

  return (
    <section className="w-full py-xl" id="projects">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-0 mb-xl space-y-4"
      >
        <div className="mb-m text-center md:mb-l">
          <h2 className="mb-s text-2xl font-bold md:text-3xl">Featured Projects</h2>
          <p className="text-muted-foreground">Recent work and collaborations</p>
        </div>

        <ProjectCarousel projects={evenProjects} />
        <ProjectCarousel projects={oddProjects} reverse={true} />
      </motion.div>
    </section>
  );
}
