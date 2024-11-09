import { Metadata } from 'next';

export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  description: 'Developer, creator, and marketer building engaging technical experiences.',
  author: 'Matt Palmer',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  keywords: [
    'developer relations',
    'developer marketing',
    'software engineer',
    'data engineer',
    'ai',
    'artificial intelligence',
    'developer advocate',
  ],
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl || ''),
  title: {
    default: siteConfig.author,
    template: `%s | ${siteConfig.author}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.siteUrl,
    title: siteConfig.author,
    description: siteConfig.description,
    siteName: siteConfig.author,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.author)}&subtitle=${encodeURIComponent(
          siteConfig.description
        )}`,
        width: 1200,
        height: 630,
        alt: siteConfig.author,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.author,
    description: siteConfig.description,
    images: [
      `/api/og?title=${encodeURIComponent(siteConfig.author)}&subtitle=${encodeURIComponent(
        siteConfig.description
      )}`,
    ],
    creator: '@mattppal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};