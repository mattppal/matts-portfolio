'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlaySquare } from 'lucide-react';
import Image from 'next/image';
import { type Project } from '@/components/project-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoModal } from '@/components/video-modal';

interface ProjectCarouselProps {
  projects: Project[];
  reverse?: boolean;
}

export function ProjectCarousel({ projects, reverse = false }: ProjectCarouselProps) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const ref = useRef(null);

  const handleVideoClick = useCallback((id: string) => {
    setVideoId(id);
  }, []);

  const duplicatedProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);

  const videoModalProps = useMemo(
    () => ({
      isOpen: !!videoId,
      videoId: videoId || '',
      onClose: () => setVideoId(null),
    }),
    [videoId]
  );

  return (
    <>
      <div className="carousel-mask-container">
        <div className="carousel-mask">
          <motion.div
            ref={ref}
            className="flex gap-4 py-2"
            style={{
              x: useTransform(
                useScroll({
                  target: ref,
                  offset: ['start end', 'end start'],
                }).scrollYProgress,
                [0, 1],
                reverse ? ['5%', '-15%'] : ['-15%', '5%']
              ),
            }}
          >
            {duplicatedProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                className="w-[260px] flex-shrink-0 sm:w-[320px]"
              >
                {project.videoId ? (
                  <button
                    onClick={() => handleVideoClick(project.videoId!)}
                    className="block h-full w-full"
                  >
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
                              <PlaySquare className="h-6 w-6 text-white/90" strokeWidth={1.5} />
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
            ))}
          </motion.div>
        </div>
      </div>
      <VideoModal {...videoModalProps} />
    </>
  );
}
