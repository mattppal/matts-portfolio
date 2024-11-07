import { Metadata } from 'next';

const siteConfig = {
  title: 'Matt Palmer',
  description: 'Developer, creator, and technologist building beautiful digital experiences.',
  author: 'Matt Palmer',
  siteUrl: 'https://mattpalmer.io',
  //   socialImage: '/og-image.jpg', // You'll need to create this
  keywords: [
    'software engineer',
    'web developer',
    'full stack developer',
    'data engineer',
    'AI solutions',
    'portfolio',
    'freelance developer',
  ],
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    // images: [{
    //   url: siteConfig.socialImage,
    //   width: 1200,
    //   height: 630,
    //   alt: siteConfig.title
    // }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    // images: [siteConfig.socialImage],
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
