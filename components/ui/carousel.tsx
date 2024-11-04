"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CarouselProps {
    fetchUrl: string
    dataKey: string
    itemClassName?: string
    imageClassName?: string
    shuffle?: boolean
    gap?: number
    duration?: number
    priority?: boolean
}

export function Carousel({
    fetchUrl,
    dataKey,
    itemClassName,
    imageClassName,
    shuffle = true,
    gap = 6,
    duration = 30,
    priority = false
}: CarouselProps) {
    const [items, setItems] = useState<string[]>([])

    // Generate SVG blur placeholder
    const blurSvg = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="g" gradientTransform="rotate(45)">
                    <stop offset="0%" stop-color="#333" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#222" stop-opacity="0.3" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
    `
    const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(blurSvg).toString('base64')}`

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(fetchUrl)
                const data = await response.json()
                if (data[dataKey]) {
                    const newItems = shuffle
                        ? [...data[dataKey]].sort(() => Math.random() - 0.5)
                        : data[dataKey]
                    setItems(newItems)
                }
            } catch (error) {
                console.error(`Failed to fetch ${dataKey}:`, error)
            }
        }

        fetchItems()
    }, [fetchUrl, dataKey, shuffle])

    if (items.length === 0) {
        return null
    }

    const duplicatedItems = [...items, ...items, ...items]

    return (
        <div className="relative w-full overflow-hidden sm:h-[auto] h-[70%] mt-4">
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
                className="flex scale-75 sm:scale-100"
                style={{ gap: `${gap * 4}px` }}
                animate={{
                    x: [`0%`, `-${100 / 3}%`]
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: duration,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedItems.map((src, index) => (
                    <div
                        key={`${src}-${index}`}
                        className={cn(
                            "relative flex-shrink-0",
                            "sm:transform-none",
                            itemClassName
                        )}
                    >
                        <Image
                            src={src}
                            alt={`Carousel item ${(index % items.length) + 1}`}
                            fill
                            priority={priority && index < items.length}
                            loading={priority ? "eager" : "lazy"}
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            className={cn(
                                "object-contain transition-opacity duration-500",
                                imageClassName
                            )}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={80}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}