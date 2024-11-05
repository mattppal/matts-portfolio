'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/config/assets';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const projects: Project[] = [
  {
    title: 'Replit + Y Combinator',
    description: "Replit's biggest event of 2024, hosted at Y Combinator in partnership with a16z.",
    technologies: ['event planning', 'speaking', 'photography'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://www.youtube.com/watch?v=vw727qcskUQ',
    imageUrl: assets.headshot,
    imageAlt: 'Replit and Y Combinator event showcase',
  },
  {
    title: 'xAI Hackathon',
    description:
      'The first hackathon at xAI, located in their new office at the historic Pioneer Building in Mission.',
    technologies: ['photography', 'videography', 'speaking'],
    imageUrl: assets.headshot,
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://x.com/mattppal/status/1845583077692903884',
  },
  // Add more projects here
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
            variants={itemVariants}
          >
            Featured Projects
          </motion.h2>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card className="flex h-full flex-col overflow-hidden">
                  {project.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.imageAlt || project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-secondary/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-4">
                    {project.liveUrl && (
                      <Button variant="secondary" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          See it in action
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="secondary" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
