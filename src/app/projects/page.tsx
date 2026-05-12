import { Navbar } from '@/components/navbar';
import { ProjectsGrid } from '@/components/projects-grid';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Projects
            </p>
            <h1 className="font-heading text-3xl leading-tight sm:text-4xl">
              All Projects
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
              Explore the full list of projects, from research experiments to
              production-ready builds.
            </p>
          </div>
          <ProjectsGrid
            projects={projects}
            className="md:grid-cols-2 xl:grid-cols-3"
          />
        </div>
      </section>
    </main>
  );
}
