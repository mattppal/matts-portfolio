"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogoCarousel } from "@/components/logo-carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function HeroSection() {
    return (
        <section className="min-h-[calc(100vh-16rem)] flex flex-col justify-center">
            <div className="container mx-auto px-4 flex flex-col items-center text-center gap-8">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                >
                    <Avatar className="h-48 w-48">
                        <AvatarImage src="/headshot.jpg" alt="Profile picture" />
                        <AvatarFallback className="text-4xl">MP</AvatarFallback>
                    </Avatar>
                </motion.div>
                <motion.h1
                    className="text-4xl md:text-6xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    👋 Hi, I'm Matt
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Developer, creator, and technologist building beautiful digital experiences
                </motion.p>
                <p className="text-center text-muted-foreground">Trusted by content teams at</p>
                <LogoCarousel />
            </div>
        </section>
    )
} 