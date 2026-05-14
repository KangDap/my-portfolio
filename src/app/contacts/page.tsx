import { ContactDetailsSection } from '@/components/contact-details-section';
import { ContactFormCard } from '@/components/contact-form-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Contact } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts',
  description:
    "Whether you have a project idea, a collaboration offer, or a quick question, reach out and I'll respond as soon as possible.",
};

export default function ContactsPage() {
  return (
    <main className="flex flex-col">
      <ScrollReveal revealOnLoad>
        <section
          data-scroll-reveal
          data-scroll-reveal-group
          className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20"
        >
          <div className="flex flex-col gap-12">
            <div data-scroll-reveal-item className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Contact
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Contacts
                </p>
              </div>
              <h1 className="font-heading text-3xl leading-tight sm:text-4xl">
                Let&apos;s build something worth sharing.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
                Whether you have a project idea, a collaboration offer, or a
                quick question, reach out and I&apos;ll respond as soon as
                possible.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <ContactDetailsSection />
              <ContactFormCard />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
