import { CurrentOccupationSection } from '@/components/current-occupation-section';
import { HeroSection } from '@/components/hero-section';
import { Navbar } from '@/components/navbar';
import { ProjectHighlightsSection } from '@/components/project-highlights-section';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <CurrentOccupationSection />
      <ProjectHighlightsSection />
    </main>
  );
}
