"use client"

import { Carousel } from "@/components/ui/carousel"

export function ImageGallery() {
    return (
        <Carousel
            fetchUrl="/api/gallery"
            dataKey="images"
            itemClassName="w-64 aspect-[4/3] rounded-lg border bg-muted/40 overflow-hidden"
            imageClassName="object-cover"
            shuffle={true}
            gap={6}
            duration={30}
        />
    )
} 