import { ProjectsGrid } from '@/components/projects-grid';
import { ScrollReveal } from '@/components/scroll-reveal';
import { projects } from '@/data/projects';
import { Folders } from 'lucide-react';

export default function ProjectsPage() {
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
                <Folders
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Projects
                </p>
              </div>
              <h1 className="font-heading text-3xl leading-tight sm:text-4xl">
                All Projects
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
                Explore the full list of my projects, from competition, college,
                and personal projects.
              </p>
            </div>
            <div data-scroll-reveal-item>
              <ProjectsGrid
                projects={projects}
                className="md:grid-cols-2 xl:grid-cols-3"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
