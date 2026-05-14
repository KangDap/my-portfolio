import { ContactCtaSection } from '@/components/contact-cta-section';
import { CurrentOccupationSection } from '@/components/current-occupation-section';
import { HeroSection } from '@/components/hero-section';
import { ProjectHighlightsSection } from '@/components/project-highlights-section';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function Home() {
  return (
    <main className="flex flex-col">
      <ScrollReveal revealOnLoad>
        <section id="home">
          <HeroSection />
        </section>
        <CurrentOccupationSection />
        <ProjectHighlightsSection />
        <ContactCtaSection />
      </ScrollReveal>
    </main>
  );
}
