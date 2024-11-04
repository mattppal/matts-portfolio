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
test;
function BookSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b pb-4">
          <div className="mb-2 h-6 w-3/4 rounded bg-muted"></div>
          <div className="mb-2 h-4 w-1/2 rounded bg-muted"></div>
          <div className="h-4 w-1/4 rounded bg-muted"></div>
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
              <h3 className="text-lg font-medium transition-colors group-hover:text-primary">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
              {book.dateRead && (
                <time className="block text-sm text-muted-foreground">
                  Read {formatDistanceToNow(new Date(book.dateRead), { addSuffix: true })}
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
    <main className="mt-8 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">Reading List</h1>
          <p className="mb-8 text-center text-muted-foreground">Books I&apos;ve read recently</p>
          <Suspense fallback={<BookSkeleton />}>
            {isLoading ? <BookSkeleton /> : <BookList books={books} />}
          </Suspense>
        </motion.div>
      </div>
    </main>
  );
}
