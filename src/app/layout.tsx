import { LenisProvider } from '@/components/providers/lenis-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeScript } from '@/components/providers/theme-script';
import { Footer } from '@/components/ui/footer';
import { Navbar } from '@/components/ui/navbar';
import { Pointer } from '@/components/ui/pointer';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

import './globals.css';

const displayFont = Poppins({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '500',
});

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dafa Ghani | Portfolio',
    template: '%s | Dafa Ghani',
  },
  description:
    'Aspiring Data Science, Machine Learning, AI, and Web Development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
          <Pointer />
        </ThemeProvider>
      </body>
    </html>
  );
}
