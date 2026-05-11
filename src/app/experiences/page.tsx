import { ExperiencesTab } from '@/components/experiences-tab';
import { Navbar } from '@/components/navbar';

export default function ExperiencePage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Experience
            </p>
            <h1 className="font-heading text-3xl leading-tight sm:text-4xl">
              Full Experience
            </h1>
          </div>
          <ExperiencesTab />
        </div>
      </section>
    </main>
  );
}
