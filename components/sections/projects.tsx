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
import { ExternalLink, Github, Calendar, Code, Film } from 'lucide-react';
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

const events: Project[] = [
  {
    title: 'Replit + Y Combinator',
    description: "Replit's biggest event of 2024, hosted at Y Combinator in partnership with a16z.",
    technologies: ['event planning', 'speaking', 'photography'],
    liveUrl: 'https://www.youtube.com/watch?v=vw727qcskUQ',
    imageUrl: 'https://placehold.co/640x360',
    imageAlt: 'Replit and Y Combinator event showcase',
  },
  {
    title: 'xAI Hackathon',
    description:
      'The first hackathon at xAI, located in their new office at the historic Pioneer Building in Mission.',
    technologies: ['photography', 'videography', 'speaking'],
    imageUrl: 'https://placehold.co/640x360',
    liveUrl: 'https://x.com/mattppal/status/1845583077692903884',
  },
];

const codeProjects: Project[] = [
  {
    title: 'vid2gif',
    description: 'A simple web app that converts video files to animated GIFs.',
    technologies: ['Next.js', 'TypeScript', 'FFmpeg'],
    imageUrl: 'https://placehold.co/640x360',
    githubUrl: 'https://github.com/yourusername/vid2gif',
    liveUrl: 'https://vid2gif.replit.app/',
  },
  {
    title: "what's the wifi",
    description: 'QR code generator for sharing WiFi credentials easily.',
    technologies: ['React', 'QR Code', 'PWA'],
    imageUrl: 'https://placehold.co/640x360',
    githubUrl: 'https://github.com/yourusername/whats-the-wifi',
    liveUrl: 'https://whats-the-wifi.app',
  },
];

const content: Project[] = [
  {
    title: 'Replit YouTube Videos',
    description: 'Educational content and tutorials about coding and development.',
    technologies: ['video production', 'education', 'technical writing'],
    imageUrl: 'https://placehold.co/640x360',
    liveUrl: 'https://youtube.com/@replit',
  },
  {
    title: 'Technical Blog Posts',
    description: 'In-depth articles about software development and tech trends.',
    technologies: ['technical writing', 'documentation'],
    imageUrl: 'https://placehold.co/640x360',
    liveUrl: 'https://blog.example.com',
  },
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

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="flex h-full flex-col overflow-hidden">
    {project.imageUrl && (
      <div className="relative aspect-video w-full">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt || project.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
    )}
    <CardHeader className="md:p-4 md:pb-2">
      <CardTitle className="text-lg md:text-base">{project.title}</CardTitle>
      <CardDescription className="text-sm">{project.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow md:p-4 md:pb-2 md:pt-0"></CardContent>
    <CardFooter className="flex gap-2 md:p-4 md:pt-2">
      {project.liveUrl && (
        <Button variant="secondary" size="sm" asChild className="flex-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <ExternalLink size={14} />
            View
          </a>
        </Button>
      )}
      {project.githubUrl && (
        <Button variant="secondary" size="sm" asChild className="flex-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Github size={14} />
            Code
          </a>
        </Button>
      )}
    </CardFooter>
  </Card>
);

const CategorySection = ({
  title,
  icon,
  projects,
}: {
  title: string;
  icon: React.ReactNode;
  projects: Project[];
}) => (
  <div className="space-y-4 md:space-y-3">
    <h3 className="flex items-center gap-2 text-xl font-semibold md:text-lg">
      {icon}
      {title}
    </h3>
    <div className="grid gap-4 md:gap-3">
      {projects.map((project) => (
        <motion.div key={project.title} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  </div>
);

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
            className="mb-8 text-center text-3xl font-bold md:text-3xl"
            variants={itemVariants}
          >
            Featured Work
          </motion.h2>

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:gap-4">
            <CategorySection
              title="Events"
              icon={<Calendar className="h-5 w-5" />}
              projects={events}
            />
            <CategorySection
              title="Code"
              icon={<Code className="h-5 w-5" />}
              projects={codeProjects}
            />
            <CategorySection
              title="Content"
              icon={<Film className="h-5 w-5" />}
              projects={content}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
