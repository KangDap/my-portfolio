'use client';

import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/primitives/animate/tabs';
import { ExperienceCard } from '@/components/experience-card';
import {
  type ExperienceCategory,
  type ExperienceItem,
  experienceCategoryOrder,
  experiencesByCategory,
} from '@/data/experiences';
import gsap from 'gsap';
import { BriefcaseBusiness, GraduationCap, Users } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

function renderExperienceItems(items: ExperienceItem[]) {
  return items.map((item) => (
    <ExperienceCard key={`${item.role}-${item.organization}`} {...item} />
  ));
}

function TabPanel({ tab }: { tab: ExperienceCategory }) {
  return (
    <div className="flex flex-col gap-6">
      {renderExperienceItems(experiencesByCategory[tab])}
    </div>
  );
}

function useAnimatedTabHeight(activeTab: ExperienceCategory) {
  const stageRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<Record<ExperienceCategory, HTMLDivElement | null>>(
    {
      works: null,
      organization: null,
      education: null,
    },
  );
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number | null>(null);
  const [displayedTab, setDisplayedTab] =
    useState<ExperienceCategory>(activeTab);
  const [transition, setTransition] = useState<{
    from: ExperienceCategory;
    to: ExperienceCategory;
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

function TabPanels({ activeTab }: { activeTab: ExperienceCategory }) {
  const { stageRef, measureRefs, displayedTab, transition } =
    useAnimatedTabHeight(activeTab);

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-0 overflow-hidden opacity-0"
      >
        {experienceCategoryOrder.map((tab) => (
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
          <div key={displayedTab} className="relative w-full">
            <TabPanel tab={displayedTab} />
          </div>
        )}
      </div>
    </div>
  );
}

export function ExperiencesTab() {
  const [activeTab, setActiveTab] = useState<ExperienceCategory>('works');

  return (
    <div className="flex flex-col gap-3">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ExperienceCategory)}
        className="w-full"
      >
        <TabsHighlight className="pointer-events-none absolute inset-0 z-0 rounded-[10px] bg-background/80">
          <TabsList className="mb-4 inline-flex h-11 w-full gap-2 rounded-[10px] border border-border bg-muted/40 p-1">
            <TabsHighlightItem value="works" className="flex-1 min-w-0">
              <TabsTrigger
                value="works"
                className="flex h-full w-full min-w-0 items-center justify-center gap-1.5 px-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
              >
                <BriefcaseBusiness data-icon="inline-start" />
                <span>Works</span>
              </TabsTrigger>
            </TabsHighlightItem>
            <TabsHighlightItem value="organization" className="flex-1 min-w-0">
              <TabsTrigger
                value="organization"
                className="flex h-full w-full min-w-0 items-center justify-center gap-1.5 px-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
              >
                <Users data-icon="inline-start" />
                <span className="sm:hidden">Org</span>
                <span className="hidden sm:inline truncate">
                  Organization/Volunteer
                </span>
              </TabsTrigger>
            </TabsHighlightItem>
            <TabsHighlightItem value="education" className="flex-1 min-w-0">
              <TabsTrigger
                value="education"
                className="flex h-full w-full min-w-0 items-center justify-center gap-1.5 px-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
              >
                <GraduationCap data-icon="inline-start" />
                <span>Education</span>
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
