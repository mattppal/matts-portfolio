"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface Project {
    title: string
    description: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
    imageUrl?: string
}

const projects: Project[] = [
    {
        title: "Portfolio Website",
        description: "A modern portfolio website built with Next.js 15, Shadcn, and Framer Motion. Features smooth animations and a responsive design.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/yourusername/portfolio",
        liveUrl: "https://mattpalmer.io"
    },
    // Add more projects here
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-12 text-center"
                        variants={itemVariants}
                    >
                        Featured Projects
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {projects.map((project) => (
                            <motion.div key={project.title} variants={itemVariants}>
                                <Card className="h-full flex flex-col">
                                    {project.imageUrl && (
                                        <div className="relative h-48 w-full">
                                            {/* Add image component here if needed */}
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <Badge key={tech} variant="secondary">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="gap-4">
                                        {project.liveUrl && (
                                            <Button variant="outline" asChild>
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <ExternalLink size={16} />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button variant="outline" asChild>
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
    )
} 