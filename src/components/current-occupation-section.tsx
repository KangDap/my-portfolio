import { ExperienceCard } from '@/components/experience-card';
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
          className="flex flex-row items-end justify-between gap-4"
        >
          <div className="min-w-0 flex flex-col gap-2">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
              Things I&apos;m currently working on.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
              A list of work that keeps me busy.
            </p>
          </div>
          <Link
            href="/experiences"
            className="group shrink-0 inline-flex items-center gap-1"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
              More
            </span>
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </Link>
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
