import { ExperienceCard } from '@/components/experience-card';
import { Button } from '@/components/ui/button';
import { getCurrentExperiences } from '@/data/experiences';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

export function CurrentOccupationSection() {
  const currentExperiences = getCurrentExperiences();

  if (currentExperiences.length === 0) {
    return null;
  }

  return (
    <section
      id="current-occupation"
      className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-16"
    >
      <div data-scroll-reveal-group className="flex flex-col gap-6">
        <div data-scroll-reveal-item className="flex items-center gap-2">
          <Briefcase
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Current Occupation
          </p>
        </div>
        <div
          data-scroll-reveal-item
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
              Things I&apos;m currently working on.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
              A list of work that keeps me busy.
            </p>
          </div>
          <Button variant="link">
            <Link href="/experiences">See more experiences</Link>
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
        <div className="grid gap-6">
          {currentExperiences.map((item) => (
            <div
              key={`${item.role}-${item.organization}`}
              data-scroll-reveal-item
            >
              <ExperienceCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
