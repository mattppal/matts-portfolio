import { getPosts } from "@/lib/blog"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProjectsSection } from "@/components/sections/projects"
import { BlogSection } from "@/components/sections/blog"
import { ContactSection } from "@/components/sections/contact"
import { NavBar } from "@/components/nav-bar"
import { CreatorPill } from "@/components/creator-pill"
import { ImageGallery } from "@/components/image-gallery"

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen">
      <NavBar />
      <CreatorPill />
      <div className="container mx-auto px-4">
        <ImageGallery />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection posts={posts} />
        <ContactSection />
      </div>
    </main>
  )
}
