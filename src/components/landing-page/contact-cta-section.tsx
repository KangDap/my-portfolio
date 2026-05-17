import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function ContactCtaSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-16"
    >
      <div data-scroll-reveal-group>
        <div
          data-scroll-reveal-item
          className="relative overflow-hidden rounded-3xl border border-border bg-muted/30 px-6 py-10 shadow-lg backdrop-blur sm:px-10"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
          <div data-scroll-reveal-item className="flex items-center gap-2">
            <Sparkles className="size-4 text-muted-foreground" aria-hidden />
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Work With Me
            </p>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div data-scroll-reveal-item className="flex flex-col gap-3">
              <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
                Interested in collaborating? Let&apos;s talk.
              </h2>
              <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
                If you want to build something thoughtful, clean, and fast,
                reach out and we&apos;ll discuss the next steps together.
              </p>
            </div>
            <div data-scroll-reveal-item className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/contacts">
                  Contact Me
                  <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
