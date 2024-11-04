"use client"

import { Carousel } from "@/components/ui/carousel"

export function LogoCarousel() {
    return (
        <Carousel
            fetchUrl="/api/logos"
            dataKey="logos"
            itemClassName="w-32 h-12 bg-muted/40 overflow-hidden"
            imageClassName="object-contain opacity-70 transition-opacity hover:opacity-100 dark:brightness-[100] dark:contrast-[0] dark:invert brightness-0"
            shuffle={true}
            gap={16}
            duration={30}
        />
    )
} 