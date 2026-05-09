import { ExperiencesTab } from '@/components/experiences-tab';
import { HeroSection } from '@/components/hero-section';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="experiences" className="mx-auto w-full max-w-6xl px-6 pb-20">
        <ExperiencesTab />
      </section>
    </main>
  );
}
