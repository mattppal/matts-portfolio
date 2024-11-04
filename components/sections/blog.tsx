"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Suspense, useEffect, useState } from "react"

interface BlogPost {
    title: string
    link: string
    snippet?: string
    date: Date | null
}

function BlogSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
            ))}
        </div>
    )
}

function BlogList({ posts }: { posts: BlogPost[] }) {
    if (!posts || posts.length === 0) {
        return <div className="text-center text-muted-foreground">No posts available</div>
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <Link
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-b pb-6 last:border-0"
                >
                    <article className="flex items-center justify-between gap-2">
                        <div className="space-y-1">
                            <h3 className="text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
                                {post.title}
                            </h3>
                            {post.date && (
                                <time className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                </time>
                            )}
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </article>
                </Link>
            ))}
        </div>
    )
}

export function BlogSection() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/blog')
                const data = await response.json()
                setPosts(data)
            } catch (error) {
                console.error('Error fetching blog posts:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <section id="writing" className="py-20 min-h-screen">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-2xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.5 } }
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Latest Writing</h2>
                    <Suspense fallback={<BlogSkeleton />}>
                        {isLoading ? (
                            <BlogSkeleton />
                        ) : (
                            <BlogList posts={posts} />
                        )}
                    </Suspense>
                </motion.div>
            </div>
        </section>
    )
} 