'use client';

import { Calendar, Code, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { useState } from 'react';
import { VideoModal } from './video-modal';

export type Project = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  videoId?: string;
  liveUrl?: string;
  githubUrl?: string;
  badges?: string[];
  category?: 'event' | 'code' | 'content';
};

interface ProjectCardProps {
  project: Project;
}

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  projects: Project[];
}

interface ProjectGridProps {
  projects: Project[];
  showCategories?: boolean;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  className?: string;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (project.videoId) {
      e.preventDefault();
      setVideoOpen(true);
    }
  };

  const cardContent = (
    <Card className="h-full overflow-hidden bg-card transition-all hover:bg-accent">
      <CardHeader className="p-0">
        {project.videoId ? (
          <div className="relative aspect-video w-full">
            <Image
              src={
                project.imageUrl ||
                `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`
              }
              alt={project.imageAlt || project.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 p-3">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : project.imageUrl ? (
          <div className="relative aspect-video w-full">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt || project.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  );

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={project.videoId || ''}
      >
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target={project.videoId ? undefined : '_blank'}
            rel={project.videoId ? undefined : 'noopener noreferrer'}
            onClick={handleClick}
            className="block cursor-pointer"
          >
            {cardContent}
          </a>
        ) : (
          cardContent
        )}
      </VideoModal>
    </motion.div>
  );
}

function CategorySection({ title, icon, projects }: CategorySectionProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="grid gap-4">
        {projects.map((project: Project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectGrid({
  projects,
  showCategories = false,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  className = '',
}: ProjectGridProps) {
  if (showCategories) {
    const eventProjects = projects.filter((p) => p.category === 'event');
    const codeProjects = projects.filter((p) => p.category === 'code');
    const contentProjects = projects.filter((p) => p.category === 'content');

    return (
      <div className={`grid gap-8 md:grid-cols-3 ${className}`}>
        <CategorySection
          title="Events"
          icon={<Calendar className="h-5 w-5" />}
          projects={eventProjects}
        />
        <CategorySection title="Code" icon={<Code className="h-5 w-5" />} projects={codeProjects} />
        <CategorySection
          title="Content"
          icon={<Film className="h-5 w-5" />}
          projects={contentProjects}
        />
      </div>
    );
  }

  const getGridClass = () => {
    if (typeof columns === 'number') {
      return `grid gap-8 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`;
    }
    return `grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
  };

  return (
    <div className={`${getGridClass()} ${className}`}>
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
