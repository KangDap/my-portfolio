'use client';

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/primitives/animate/tabs';
import { Badge } from '@/components/ui/badge';

type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  skills: string[];
  media?: number;
};

const workItems: ExperienceItem[] = [
  {
    role: 'Frontend Engineer',
    organization: 'Company Name',
    period: 'Jan 2024 - Present',
    location: 'Jakarta · Hybrid',
    highlights: [
      'Led component refactor to stabilize UI library and reduce regressions.',
      'Improved Lighthouse performance by optimizing bundle and image loading.',
      'Collaborated with design to ship a new onboarding flow in 2 sprints.',
    ],
    skills: ['React', 'TypeScript', 'Tailwind', 'Performance'],
    media: 3,
  },
  {
    role: 'Web Developer',
    organization: 'Agency Studio',
    period: 'Jul 2022 - Dec 2023',
    location: 'Remote',
    highlights: [
      'Built landing pages with clean information hierarchy and reusable sections.',
      'Delivered CMS integrations for marketing teams to self-serve content.',
    ],
    skills: ['Next.js', 'CMS', 'UI Systems'],
  },
];

const orgItems: ExperienceItem[] = [
  {
    role: 'Volunteer Web Team',
    organization: 'Community Event',
    period: '2023 - Present',
    location: 'Bandung · On-site',
    highlights: [
      'Designed a registration microsite to reduce onboarding friction.',
      'Created a live schedule dashboard for event organizers.',
    ],
    skills: ['Frontend', 'Communication', 'Event Ops'],
    media: 2,
  },
];

const educationItems: ExperienceItem[] = [
  {
    role: 'B.Sc. Informatics',
    organization: 'University Name',
    period: '2020 - 2024',
    location: 'Indonesia',
    highlights: [
      'Graduated with focus on data science and software engineering.',
      'Built capstone project combining web app and ML pipeline.',
    ],
    skills: ['Data Science', 'Machine Learning', 'Software Engineering'],
  },
];

function ExperienceCard({
  role,
  organization,
  period,
  location,
  highlights,
  skills,
  media,
}: ExperienceItem) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <header className="flex items-start gap-4">
        <div className="size-12 shrink-0 rounded-lg border border-border bg-muted/40" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">{role}</h3>
          <p className="text-base text-foreground/80">{organization}</p>
          <p className="text-sm text-muted-foreground">{period}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </header>

      <ul className="flex flex-col gap-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        {highlights.map((item) => (
          <li key={item} className="list-disc">
            {item}
          </li>
        ))}
      </ul>

      {media ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: media }).map((_, index) => (
            <div
              key={index}
              className="aspect-video w-24 rounded-md border border-border bg-muted/40 transition-transform duration-300 ease-out hover:scale-105"
            />
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Skills
        </span>
        {skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
    </article>
  );
}

export function ExperiencesTab() {
  return (
    <Tabs className="w-full">
      <TabsHighlight className="absolute inset-0 z-0 rounded-full bg-background/80">
        <TabsList className="inline-flex h-11 w-full max-w-2xl gap-2 rounded-full border border-border bg-muted/40 p-1">
          <TabsHighlightItem value="works" className="flex-1">
            <TabsTrigger value="works" className="h-full w-full px-4 text-sm">
              Works
            </TabsTrigger>
          </TabsHighlightItem>
          <TabsHighlightItem value="organization" className="flex-1">
            <TabsTrigger
              value="organization"
              className="h-full w-full px-4 text-sm"
            >
              Organization/Volunteer
            </TabsTrigger>
          </TabsHighlightItem>
          <TabsHighlightItem value="education" className="flex-1">
            <TabsTrigger
              value="education"
              className="h-full w-full px-4 text-sm"
            >
              Education
            </TabsTrigger>
          </TabsHighlightItem>
        </TabsList>
      </TabsHighlight>
      <TabsContents className="flex flex-col gap-6 border border-border bg-background/70 p-6">
        <TabsContent value="works" className="flex flex-col gap-6">
          {workItems.map((item) => (
            <ExperienceCard
              key={`${item.role}-${item.organization}`}
              {...item}
            />
          ))}
        </TabsContent>
        <TabsContent value="organization" className="flex flex-col gap-6">
          {orgItems.map((item) => (
            <ExperienceCard
              key={`${item.role}-${item.organization}`}
              {...item}
            />
          ))}
        </TabsContent>
        <TabsContent value="education" className="flex flex-col gap-6">
          {educationItems.map((item) => (
            <ExperienceCard
              key={`${item.role}-${item.organization}`}
              {...item}
            />
          ))}
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
