import { baseMetadata } from './metadata';
import { Inter } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GradientBlur } from '@/components/gradient-blur';
import { Footer } from '@/components/footer';
import { NavigationWrapper } from '@/components/navigation-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
        <JsonLd />
      </head>
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <GradientBlur intensity="strong" position="top" />
            <GradientBlur intensity="medium" position="center" />
            <NavigationWrapper>{children}</NavigationWrapper>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
