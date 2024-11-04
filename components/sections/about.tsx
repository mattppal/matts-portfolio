"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoGallery } from "@/components/video-gallery"

const skills = [
    "TypeScript",
    "Tailwind CSS", "Python", "SQL",
    "Premier Pro", "After Effects", "Figma"
]

const passions = [
    "Weightlifting", "Reading", "Writing", "Fitness"
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export function AboutSection() {
    return (
        <section id="about" className="py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto space-y-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center"
                        variants={itemVariants}
                    >
                        About Me
                    </motion.h2>

                    <motion.div variants={itemVariants}>
                        <Card>
                            <CardContent className="pt-6 space-y-6">
                                <p className="text-lg leading-relaxed">
                                    Former data professional turned product marketer, I spend my time thinking about how to communicate complex technology.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    That includes everything from demos & tutorial videos to product marketing assets, blog posts, event planning, and more.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="text-center space-y-8"
                    >
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Technologies</h3>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {skills.map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className="text-sm py-1 px-3"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Passions</h3>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {passions.map((passion) => (
                                    <Badge
                                        key={passion}
                                        variant="secondary"
                                        className="text-sm py-1 px-3"
                                    >
                                        {passion}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold text-center">Featured Videos</h3>
                        <VideoGallery />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}