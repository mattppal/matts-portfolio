'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

interface Book {
  title: string;
  link: string;
  author: string;
  dateRead: string;
  pubDate: string;
}

function BookSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b pb-4">
          <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}

function BookList({ books }: { books: Book[] }) {
  if (!books || books.length === 0) {
    return <div className="text-center text-muted-foreground">No books available</div>;
  }

  return (
    <div className="space-y-6">
      {books.map((book) => (
        <Link
          key={book.link}
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border-b pb-6 last:border-0"
        >
          <article className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
              {book.dateRead && (
                <time className="text-sm text-muted-foreground block">
                  Read {formatDistanceToNow(new Date(book.dateRead), { addSuffix: true })}
                </time>
              )}
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </article>
        </Link>
      ))}
    </div>
  );
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <main className="py-20 min-h-screen mt-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Reading List</h1>
          <p className="text-muted-foreground text-center mb-8">Books I&apos;ve read recently</p>
          <Suspense fallback={<BookSkeleton />}>
            {isLoading ? <BookSkeleton /> : <BookList books={books} />}
          </Suspense>
        </motion.div>
      </div>
    </main>
  );
}
