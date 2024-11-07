import { baseMetadata } from './metadata';
import { Inter } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://mattpalmer.io" />
        <JsonLd />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
