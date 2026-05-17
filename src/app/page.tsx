import { ContactCtaSection } from '@/components/landing-page/contact-cta-section';
import { CurrentOccupationSection } from '@/components/landing-page/current-occupation-section';
import { HeroSection } from '@/components/landing-page/hero-section';
import { ProjectHighlightsSection } from '@/components/landing-page/project-highlights-section';
import { ScrollReveal } from '@/components/providers/scroll-reveal';

export default function Home() {
  return (
    <main className="flex flex-col">
      <ScrollReveal revealOnLoad>
        <HeroSection />
        <CurrentOccupationSection />
        <ProjectHighlightsSection />
        <ContactCtaSection />
      </ScrollReveal>
    </main>
  );
}
