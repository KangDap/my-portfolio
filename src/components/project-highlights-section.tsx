import { ProjectsGrid } from '@/components/projects-grid';
import { Button } from '@/components/ui/button';
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
        <div
          data-scroll-reveal-item
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
              Selected work that showcases my passion.
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
              A curated set of projects I&apos;m most proud of.
            </p>
          </div>
          <Button variant="link">
            <Link href="/projects">See more projects</Link>
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
        <div data-scroll-reveal-item>
          <ProjectsGrid
            projects={featuredProjects}
            className="md:grid-cols-2"
          />
        </div>
      </div>
    </section>
  );
}
