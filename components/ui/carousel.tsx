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

    // Triple the items to ensure smooth infinite scrolling
    const duplicatedItems = [...items, ...items, ...items]

    return (
        <div className="relative w-full overflow-hidden sm:h-[auto] h-[70%]">
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
                onAnimationComplete={() => {
                    // Reset position when animation completes
                    const element = document.querySelector('.motion-div') as HTMLElement
                    if (element) {
                        element.style.transform = 'translateX(0%)'
                    }
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
                            loading={priority ? "lazy" : "eager"}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENBLzMzLy0zPVBCR0JHMy1LVEVZWVlBSVtTW2GBg2VYd2BJWWr/2wBDARUXFyAeIBohHB8hMSgmKVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            className={cn(
                                "object-contain",
                                imageClassName
                            )}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}