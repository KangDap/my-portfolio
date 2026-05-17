import { ProjectsGrid } from '@/components/projects/projects-grid';
import { getFeaturedProjects } from '@/data/projects';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function ProjectHighlightsSection() {
  const featuredProjects = getFeaturedProjects(2);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-16"
    >
      <div data-scroll-reveal-group className="flex flex-col gap-6">
        <div data-scroll-reveal-item className="flex items-center gap-2">
          <Sparkles
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Project Highlights
          </p>
        </div>
        <div data-scroll-reveal-item className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
              Selected work that showcases my passion.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
              List of projects I&apos;m most proud of.
            </p>
          </div>
        </div>
        <div data-scroll-reveal-item>
          <ProjectsGrid
            projects={featuredProjects}
            className="md:grid-cols-2"
          />
        </div>
        <Link
          href="/projects"
          data-scroll-reveal-item
          className="group inline-flex w-fit items-center gap-1 self-end pt-1"
        >
          <span className="inline-flex items-center gap-1">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
              See more projects
            </span>
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
