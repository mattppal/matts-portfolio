'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

interface BlogPost {
  title: string;
  link: string;
  snippet?: string;
  date: Date | null;
}

function BlogSkeleton() {
  return (
    <div className="grid gap-s md:grid-cols-2 md:gap-m">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b pb-s md:border-none">
          <div className="mb-xs h-6 w-3/4 rounded bg-muted"></div>
          <div className="h-4 w-1/4 rounded bg-muted"></div>
        </div>
      ))}
    </div>
  );
}

function BlogList({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-muted-foreground">No posts available</div>;
  }

  return (
    <div className="grid gap-s md:grid-cols-2 md:gap-m">
      {posts.map((post) => (
        <Link
          key={post.link}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border-b pb-s last:border-0 md:border-none"
        >
          <article className="flex items-center justify-between gap-xs">
            <div className="space-y-2xs">
              <h3 className="line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              {post.date && (
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                </time>
              )}
            </div>
            <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          </article>
        </Link>
      ))}
    </div>
  );
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section id="writing" className="section-padding">
      <div className="container mx-auto px-s">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <h2 className="mb-l text-center text-3xl font-bold md:text-4xl">Latest Writing</h2>
          <Suspense fallback={<BlogSkeleton />}>
            {isLoading ? <BlogSkeleton /> : <BlogList posts={posts} />}
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
