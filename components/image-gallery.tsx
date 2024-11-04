"use client"

import { Carousel } from "@/components/ui/carousel"
import Image from "next/image"

export function ImageGallery() {
    return (
        <Carousel
            fetchUrl="/api/gallery"
            dataKey="images"
            itemClassName="w-64 aspect-[4/3] rounded-lg border bg-muted/40 overflow-hidden"
            imageClassName="object-cover transition-opacity duration-300"
            shuffle={true}
            gap={6}
            duration={30}
            ImageComponent={({ src, alt }) => (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={true}
                    className="object-cover transition-opacity duration-300"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                        `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="g" gradientTransform="rotate(90)">
                                    <stop offset="0%" stop-color="#333" stop-opacity="0.2" />
                                    <stop offset="100%" stop-color="#222" stop-opacity="0.3" />
                                </linearGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#g)" />
                        </svg>`
                    ).toString('base64')}`}
                />
            )}
        />
    )
} 