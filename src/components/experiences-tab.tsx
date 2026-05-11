'use client';

import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/primitives/animate/tabs';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

type TabKey = 'works' | 'organization' | 'education';

type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  skills: string[];
  media?: number;
  logoSrc?: string;
  logoAlt?: string;
};

const workItems: ExperienceItem[] = [
  {
    role: 'Research Assistant',
    organization: 'AI Lab - Dept. Computer Science FMIPA Unpad',
    period: 'March 2026 - Present',
    location: 'Jatinangor, Sumedang Regency · Hybrid',
    highlights: [
      'Create SLR (Systematic Literature Review) related on Neuroscience fields.',
    ],
    skills: ['Neuroscience', 'Literature Review'],
    media: 3,
    logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
    logoAlt: 'AI Lab logo',
  },
  {
    role: 'Machine Learning Engineer',
    organization: 'Pusat Inovasi Pengajaran & Pembelajaran (PIPP) Unpad',
    period: 'August 2025 - December 2025',
    location: 'Jatinangor, Sumedang Regency · Hybrid',
    highlights: [
      'Developed survey methodologies for Electroencephalography (EEG) data collection to improve learning video quality.',
      'Built a web-based survey data collection platform integrated with the Muse S Athena EEG Headband.',
      'Evaluated and compared 3 machine learning models (SVM, Random Forest, XGBoost) based on performance metrics to select the most efficient model.',
    ],
    skills: ['Python', 'Machine Learning', 'EEG', 'Neuroscience'],
    logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
    logoAlt: 'PIPP is affiliated with Unpad.',
  },
  {
    role: 'Teaching Assistant',
    organization: 'Dept. Computer Science FMIPA Unpad',
    period: 'February 2025 - December 2025',
    location: 'Jatinangor, Sumedang Regency · Hybrid',
    highlights: [
      'Delivered weekly lab sessions for over 80 undergraduate students across three courses: Object-Oriented Programming, Web Programming, and Computer Organization & Architecture.',
      'Evaluated and gave feedback on 10+ assignments throughout the semester, resulting in 92% passing rate.',
    ],
    skills: [
      'Teaching',
      'Computer Architecture',
      'Assembly',
      'OOP',
      'Java',
      'NetBeans',
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'Laravel',
    ],
    logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
    logoAlt: 'Teaching assistant for Computer Science FMIPA Unpad.',
  },
];

const orgItems: ExperienceItem[] = [
  {
    role: 'Frontend Developer',
    organization: 'TEDxPadjadjaran University 2026',
    period: 'March 2026 - Present',
    location: 'Jatinangor, Sumedang · Hybrid',
    highlights: [
      'Implement website design from UI/UX designer, ensuring smooth & clean view.',
      'Integrating backend logic for website functionality.',
    ],
    skills: ['Frontend', 'Next.js', 'Communication'],
    media: 2,
    logoSrc: '/assets/experiences-tab/org/TEDx Logo.jpeg',
    logoAlt: 'AI Lab logo',
  },
  {
    role: 'Staff of Information Technology Development Department',
    organization: 'Himatif FMIPA Unpad',
    period: 'February 2024 - Dec 2025',
    location: 'Jatinangor, Sumedang · Hybrid',
    highlights: [
      'Facilitating training sessions and IT-related competition preparation for 100+ participants.',
      'Designed a structured 6-session mentoring syllabus for mentors across three competition tracks, outlining learning objectives, materials, and preparation strategies.',
      'Contributed to the success of teams advancing to national and international competition finals, with three teams qualifying as finalists.',
    ],
    skills: ['Program Management', 'Communication'],
    media: 2,
    logoSrc: '/assets/experiences-tab/org/logohimatif.png',
    logoAlt: 'AI Lab logo',
  },
  {
    role: 'Manager of IT Competition',
    organization: 'IFEST Unpad',
    period: 'June 2025 - October 2025',
    location: 'Jatinangor, Sumedang · Hybrid',
    highlights: [
      'Concepted 4 competitions including Competitive Programming, Data Analysis Competition, Essay Competition, and Hackathon.',
      'Managed 400+ participants across competition from 40+ universities and high schools nationwide.',
      'Led execution of Hackathon Day attended by 15 Hackathon finalist teams, ensuring smooth technical and operational delivery.',
    ],
    skills: ['Program Management', 'Communication'],
    media: 2,
    logoSrc: '/assets/experiences-tab/org/Logo IFEST 2025.png',
    logoAlt: 'IFEST 2025',
  },
  {
    role: 'Staff of IT Competition',
    organization: 'IFEST Unpad',
    period: 'June 2024 - October 2024',
    location: 'Jatinangor, Sumedang · Hybrid',
    highlights: [
      'Designed and developed 20+ problem sets for Informatics Competition, equivalent to OSN Informatics for high school students.',
      'Managed participant registration and administrative processes for the competition, resulting in total of 30+ participant registered.',
      'Coordinated and supervised competition execution across all stages, including preliminary rounds, finals, and awarding ceremony.',
    ],
    skills: ['Program Management', 'Communication'],
    media: 2,
    logoSrc: '/assets/experiences-tab/org/Logo_IFest_2024.png',
    logoAlt: 'IFEST 2024',
  },
];

const educationItems: ExperienceItem[] = [
  {
    role: 'Universitas Padjadjaran',
    organization: "Bachelor's degree, Computer Science",
    period: 'August 2023 - August 2027',
    location: 'Sumedang, Indonesia',
    highlights: ['Grade: 3.92/4.00 (Update January 2026)'],
    skills: ['Data Science', 'Machine Learning', 'Software Engineering'],
    logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
    logoAlt: "Universitas Padjadjaran's logo.",
  },
];

const tabItems: Record<TabKey, ExperienceItem[]> = {
  works: workItems,
  organization: orgItems,
  education: educationItems,
};

const tabOrder: TabKey[] = ['works', 'organization', 'education'];

function renderExperienceItems(items: ExperienceItem[]) {
  return items.map((item) => (
    <ExperienceCard key={`${item.role}-${item.organization}`} {...item} />
  ));
}

function TabPanel({ tab }: { tab: TabKey }) {
  return (
    <div className="flex flex-col gap-6">
      {renderExperienceItems(tabItems[tab])}
    </div>
  );
}

function useAnimatedTabHeight(activeTab: TabKey) {
  const stageRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<Record<TabKey, HTMLDivElement | null>>({
    works: null,
    organization: null,
    education: null,
  });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number | null>(null);
  const [displayedTab, setDisplayedTab] = useState<TabKey>(activeTab);
  const [transition, setTransition] = useState<{
    from: TabKey;
    to: TabKey;
  } | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (activeTab === displayedTab) {
      return;
    }

    const fromEl = measureRefs.current[displayedTab];
    const toEl = measureRefs.current[activeTab];

    if (!fromEl || !toEl) {
      setDisplayedTab(activeTab);
      setTransition(null);
      return;
    }

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    timelineRef.current?.kill();

    const fromHeight = fromEl.scrollHeight || fromEl.clientHeight;
    const toHeight = toEl.scrollHeight || toEl.clientHeight;

    gsap.set(stage, {
      height: fromHeight,
      overflow: 'hidden',
    });

    setTransition({ from: displayedTab, to: activeTab });

    rafRef.current = requestAnimationFrame(() => {
      const outgoing = stage.querySelector<HTMLElement>(
        '[data-tab-layer="from"]',
      );
      const incoming = stage.querySelector<HTMLElement>(
        '[data-tab-layer="to"]',
      );

      if (!outgoing || !incoming) {
        setDisplayedTab(activeTab);
        setTransition(null);
        gsap.set(stage, { height: 'auto', overflow: 'visible' });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          setDisplayedTab(activeTab);
          setTransition(null);
          rafRef.current = requestAnimationFrame(() => {
            gsap.set(stage, { height: 'auto', overflow: 'visible' });
          });
        },
      });

      timelineRef.current = timeline;

      timeline.to(
        stage,
        {
          height: toHeight,
          duration: 0.42,
        },
        0,
      );

      timeline.to(
        outgoing,
        {
          opacity: 0,
          duration: 0.16,
          pointerEvents: 'none',
        },
        0,
      );

      timeline.fromTo(
        incoming,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.24,
          pointerEvents: 'auto',
        },
        0.12,
      );
    });

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [activeTab, displayedTab]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || transition) return;

    gsap.set(stage, { height: 'auto', overflow: 'visible' });
  }, [displayedTab, transition]);

  return {
    stageRef,
    measureRefs,
    displayedTab,
    transition,
  } as const;
}

function ExperienceCard({
  role,
  organization,
  period,
  location,
  highlights,
  skills,
  media,
  logoSrc,
  logoAlt,
}: ExperienceItem) {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-sm">
      <header className="flex items-start gap-4">
        <div className="size-12 shrink-0 rounded-lg border border-border bg-muted/40">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoAlt ?? organization}
              width={48}
              height={48}
              className="size-full object-contain p-1"
            />
          ) : null}
        </div>
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

function TabPanels({ activeTab }: { activeTab: TabKey }) {
  const { stageRef, measureRefs, displayedTab, transition } =
    useAnimatedTabHeight(activeTab);

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0"
      >
        {tabOrder.map((tab) => (
          <div
            key={tab}
            ref={(node) => {
              measureRefs.current[tab] = node;
            }}
            className="w-full"
          >
            <TabPanel tab={tab} />
          </div>
        ))}
      </div>

      <div ref={stageRef} className="relative w-full overflow-visible">
        {transition ? (
          <>
            <div
              data-tab-layer="from"
              className="relative w-full"
              style={{ opacity: 1 }}
            >
              <TabPanel tab={transition.from} />
            </div>
            <div
              data-tab-layer="to"
              className="absolute inset-0 w-full"
              style={{ opacity: 0 }}
            >
              <TabPanel tab={transition.to} />
            </div>
          </>
        ) : (
          <div className="relative w-full">
            <TabPanel tab={displayedTab} />
          </div>
        )}
      </div>
    </div>
  );
}

export function ExperiencesTab() {
  const [activeTab, setActiveTab] = useState<TabKey>('works');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Briefcase
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Experiences
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabKey)}
        className="w-full"
      >
        <TabsHighlight className="absolute inset-0 z-0 rounded-[10px] bg-background/80">
          <TabsList className="inline-flex h-11 w-full gap-2 rounded-[10px] border border-border bg-muted/40 p-1 mb-4">
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

        <div className="rounded-xl border border-border bg-background/70 p-6">
          <TabPanels activeTab={activeTab} />
        </div>
      </Tabs>
    </div>
  );
}
