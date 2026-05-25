import { ScrollReveal } from '@/components/providers/scroll-reveal';
import Link from 'next/link';

export default function NotFound() {
  return (
    <ScrollReveal revealOnLoad>
      <div
        className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center"
        data-scroll-reveal-group
      >
        <div
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          data-scroll-reveal-item
        >
          <h1 className="text-3xl font-medium sm:border-r sm:border-border sm:pr-6 sm:text-4xl">
            404
          </h1>
          <h2 className="text-sm font-normal sm:text-base">
            This page could not be found.
          </h2>
        </div>
        <div className="mt-8" data-scroll-reveal-item>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
