'use client';

import { Calendar, Code, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Dialog, DialogContent, DialogTitle, DialogOverlay } from './ui/dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

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

function ProjectCard({ project }: ProjectCardProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if (project.videoId) {
      e.preventDefault();
      setVideoOpen(true);
    } else if (project.liveUrl || project.githubUrl) {
      const url = project.liveUrl || project.githubUrl;
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
    >
      <Card className="h-full overflow-hidden bg-card cursor-pointer">
        <CardHeader className="p-0">
          {project.videoId ? (
            <div className="relative aspect-video w-full">
              <Image
                src={project.imageUrl || `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
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
          <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.badges?.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogOverlay 
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
          onClick={() => setVideoOpen(false)}
        />
        <DialogContent 
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-[900px] translate-x-[-50%] translate-y-[-50%] border-none bg-transparent p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-hidden"
        >
          <DialogTitle className="sr-only">
            {project.title}
          </DialogTitle>
          <div className="aspect-video w-full overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );

  return content;
}

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  projects: Project[];
}

function CategorySection({ title, icon, projects }: CategorySectionProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

interface ProjectGridProps {
  projects: Project[];
  showCategories?: boolean;
  columns?: number;
  className?: string;
}

export function ProjectGrid({ projects, showCategories = false, columns = 2, className = '' }: ProjectGridProps) {
  if (showCategories) {
    const eventProjects = projects.filter(p => p.category === 'event');
    const codeProjects = projects.filter(p => p.category === 'code');
    const contentProjects = projects.filter(p => p.category === 'content');

    return (
      <div className={`grid gap-8 md:grid-cols-3 ${className}`}>
        <CategorySection title="Events" icon={<Calendar className="h-5 w-5" />} projects={eventProjects} />
        <CategorySection title="Code" icon={<Code className="h-5 w-5" />} projects={codeProjects} />
        <CategorySection title="Content" icon={<Film className="h-5 w-5" />} projects={contentProjects} />
      </div>
    );
  }

  return (
    <div className={`grid gap-8 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} ${className}`}>
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
} 