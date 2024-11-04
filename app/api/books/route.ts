import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

interface CustomBook {
  title?: string;
  link?: string;
  content?: string;
  author?: string;
  user_read_at?: string;
  book_published?: string;
}

const parser = new Parser<CustomBook>({
  customFields: {
    item: [['author_name', 'author'], 'user_read_at', 'book_published'],
  },
});

export async function GET() {
  try {
    const feed = await parser.parseURL(
      'https://www.goodreads.com/review/list_rss/89626431?key=Ejk2W2RVCXJvlfGrIcEpK6Yk4o_3eHZsxByi9i7GODkPQy4v&shelf=read'
    );

    const books = feed.items
      .map((item) => {
        // Clean up the title by removing CDATA and other artifacts
        const title = item.title?.replace(/\[\[CDATA\[(.*?)\]\]>.*$/, '$1').trim() || '';

        // Extract author name from the content if available
        const authorMatch = item.content?.match(/by\s+([^<]+)/) || [];
        const author = authorMatch[1] || item.author || 'Unknown Author';

        return {
          title,
          link: item.link || '',
          author: author.trim(),
          dateRead: item.user_read_at || '',
          pubDate: item.book_published || '',
        };
      })
      .sort((a, b) => {
        const dateA = a.dateRead ? new Date(a.dateRead).getTime() : 0;
        const dateB = b.dateRead ? new Date(b.dateRead).getTime() : 0;
        return dateB - dateA; // Sort in descending order (most recent first)
      });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json([], { status: 500 });
  }
}
