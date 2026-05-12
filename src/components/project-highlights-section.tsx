import { ProjectsGrid } from '@/components/projects-grid';
import { getFeaturedProjects } from '@/data/projects';
import { Sparkles } from 'lucide-react';

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
        <div data-scroll-reveal-item className="flex flex-col gap-2">
          <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
            Selected work that showcases my focus.
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
            A curated set of projects that highlight my product thinking,
            engineering, and visual polish.
          </p>
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
