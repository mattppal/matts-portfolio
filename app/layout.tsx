import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Portfolio and blog showcasing my work and thoughts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
