import { GitHubActivitiesCalendar } from '@/components/landing-page/github-activities-calendar';
import { FaGithub } from 'react-icons/fa';

export function GitHubActivitiesSection() {
  return (
    <section
      id="github-activities"
      className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-16"
    >
      <div data-scroll-reveal-group className="flex flex-col gap-6">
        <div data-scroll-reveal-item className="flex items-center gap-2">
          <FaGithub
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            GitHub Activities
          </p>
        </div>
        <div data-scroll-reveal-item>
          <GitHubActivitiesCalendar />
        </div>
      </div>
    </section>
  );
}
