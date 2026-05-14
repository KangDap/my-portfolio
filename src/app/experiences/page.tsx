import { ExperiencesTab } from '@/components/experiences-tab';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Briefcase } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <main className="flex flex-col">
      <ScrollReveal revealOnLoad>
        <section
          data-scroll-reveal
          data-scroll-reveal-group
          className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20"
        >
          <div className="flex flex-col gap-12">
            <div data-scroll-reveal-item className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Briefcase
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Experiences
                </p>
              </div>
              <h1 className="font-heading text-3xl leading-tight sm:text-4xl">
                Full Experiences
              </h1>
            </div>
            <div data-scroll-reveal-item>
              <ExperiencesTab />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
