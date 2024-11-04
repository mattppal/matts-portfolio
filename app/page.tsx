import { Suspense } from "react"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { BlogSection } from "@/components/sections/blog"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"
import { ImageGallery } from "@/components/image-gallery"
import { Skeleton } from "@/components/ui/skeleton"
import { NavBar } from "@/components/nav-bar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ImageGallery />
      </Suspense>
      <Suspense fallback={
        <div className="space-y-4">
          <Skeleton className="h-12 w-[300px]" />
          <Skeleton className="h-6 w-[500px]" />
        </div>
      }>
        <Hero />
      </Suspense>

      <Suspense fallback={
        <div className="flex gap-4 py-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-32" />
          ))}
        </div>
      }>
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <About />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <BlogSection />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ContactSection />
      </Suspense>
    </main>
  )
}
