import { ExperiencesTab } from '@/components/experiences/experiences-tab';
import { ScrollReveal } from '@/components/providers/scroll-reveal';
import { Briefcase } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'View roles, communities, and academic milestones that shaped my journey.',
};

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
                A look at the roles and milestones behind my journey.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
                From internships and organizations to academic work, here’s a
                view of the experiences that helped shape how I build, learn,
                and collaborate.
              </p>
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
