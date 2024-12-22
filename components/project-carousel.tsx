'use client';

import { type Project } from '@/components/project-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo, useCallback, useRef, type FC, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { VideoModal } from './video-modal';

interface ProjectCarouselProps {
  projects: Project[];
  reverse?: boolean;
}

// Client-side only wrapper component
const ClientOnly: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export const ProjectCarousel: FC<ProjectCarouselProps> = ({ projects, reverse = false }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleVideoClick = useCallback((id: string) => {
    setVideoId(id);
  }, []);

  const mobileProjects = useMemo(() => {
    return projects.slice(0, 5);
  }, [projects]);

  const videoModalProps = useMemo(
    () => ({
      isOpen: !!videoId,
      videoId: videoId || '',
      onClose: () => setVideoId(null),
    }),
    [videoId]
  );

  // Project Card Component
  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full flex-shrink-0 sm:w-[320px]"
    >
      {project.videoId ? (
        <button onClick={() => handleVideoClick(project.videoId!)} className="block h-full w-full">
          <Card className="h-full transition-all duration-300 hover:border-primary/50">
            <CardContent className="p-3">
              <div className="group relative mb-4 aspect-video overflow-hidden rounded-md">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    width={480}
                    height={270}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                  <div className="rounded-full border-2 border-white/80 p-2 transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-[1px] text-white/90" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <CardHeader className="p-0">
                <CardTitle className="mb-2 text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              {project.badges && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </button>
      ) : (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <Card className="h-full transition-all duration-300 hover:border-primary/50">
            <CardContent className="p-3">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    width={480}
                    height={270}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="mb-2 text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              {project.badges && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </a>
      )}
    </motion.div>
  );

  const content = (
    <>
      {/* Mobile Layout */}
      <div className="block space-y-4 px-s md:hidden">
        {mobileProjects.map((project, index) => (
          <ProjectCard key={`${project.title}-mobile-${index}`} project={project} index={index} />
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="carousel-mask">
          <motion.div
            ref={ref}
            className="flex gap-4 py-2"
            style={{
              x: useTransform(
                useScroll({
                  target: ref,
                  offset: ['start end', 'end start'],
                  layoutEffect: false,
                }).scrollYProgress,
                [0, 1],
                reverse ? ['15%', '-35%'] : ['-35%', '15%']
              ),
            }}
          >
            {[...projects, ...projects, ...projects].map((project, index) => (
              <ProjectCard
                key={`${project.title}-desktop-${index}`}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <VideoModal {...videoModalProps} />
    </>
  );

  return <ClientOnly>{content}</ClientOnly>;
};
