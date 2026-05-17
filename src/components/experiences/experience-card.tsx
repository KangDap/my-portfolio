'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ShineBorder } from '@/components/ui/shine-border';
import {
  type ExperienceItem,
  formatExperiencePeriod,
  isCurrentExperience,
} from '@/data/experiences';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

const AUTO_HEIGHT_DELAY_SECONDS = 0.2;

export function ExperienceCard({
  role,
  organization,
  startDate,
  endDate,
  location,
  highlights,
  skills,
  media,
  logoSrc,
  logoAlt,
}: ExperienceItem) {
  const period = formatExperiencePeriod({ startDate, endDate });
  const [isOpen, setIsOpen] = useState(false);
  const isOngoing = isCurrentExperience({ endDate });
  const lenis = useLenis();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number | null>(null);
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const measure = measureRef.current;
    if (!stage || !measure) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    timelineRef.current?.kill();

    {
      /* Initial mount for experience details */
    }
    if (!isMounted.current) {
      isMounted.current = true;
      gsap.set(stage, { height: 0, overflow: 'hidden' });
      gsap.set(measure, { autoAlpha: 0, y: 8 });

      rafRef.current = requestAnimationFrame(() => {
        lenis?.resize();
        rafRef.current = null;
      });

      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }

    {
      /* Open details */
    }
    const targetHeight = measure.scrollHeight || measure.clientHeight;

    if (isOpen) {
      gsap.set(stage, { height: 0, overflow: 'hidden' });
      gsap.set(measure, { autoAlpha: 0, y: 8 });

      rafRef.current = requestAnimationFrame(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          onComplete: () => {
            gsap.set(stage, { height: 'auto', overflow: 'visible' });
            lenis?.resize();
          },
        });

        timelineRef.current = timeline;

        timeline.to(
          stage,
          { height: targetHeight, duration: 0.42 },
          AUTO_HEIGHT_DELAY_SECONDS,
        );

        timeline.fromTo(
          measure,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.24 },
          0.4,
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
    }

    {
      /* Close details */
    }
    gsap.set(stage, {
      height: stage.getBoundingClientRect().height,
      overflow: 'hidden',
    });

    rafRef.current = requestAnimationFrame(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          lenis?.resize();
        },
      });

      timelineRef.current = timeline;

      timeline.to(measure, { autoAlpha: 0, y: 6, duration: 0.16 }, 0);
      timeline.to(
        stage,
        { height: 0, duration: 0.42 },
        AUTO_HEIGHT_DELAY_SECONDS,
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
  }, [isOpen, lenis]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <article
        className={cn(
          'relative flex flex-col rounded-xl border border-border bg-card shadow-sm',
          isOngoing && 'border-transparent',
        )}
      >
        {isOngoing ? (
          <ShineBorder
            borderWidth={1}
            duration={14}
            shineColor={['var(--ring)', 'var(--success-foreground)']}
          />
        ) : null}

        <div className="flex flex-col gap-4 p-6">
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
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {role}
                  </h3>
                  <p className="text-base text-foreground/80">{organization}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 text-sm text-muted-foreground">
                  {isOngoing ? (
                    <Badge
                      variant="outline"
                      className="border-success/40 text-success"
                    >
                      Ongoing
                    </Badge>
                  ) : null}
                  <span>{period}</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col gap-1 text-sm text-muted-foreground">
                <p>{location}</p>
              </div>
            </div>
          </header>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground sm:hidden">
            <div className="inline-flex items-center gap-2">
              <span>{period}</span>
              {isOngoing ? (
                <Badge
                  variant="outline"
                  className="border-success/40 text-success"
                >
                  Ongoing
                </Badge>
              ) : null}
            </div>
            {/* <span aria-hidden="true">•</span> */}
            <p>{location}</p>
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-fit px-3">
              <ChevronRight
                data-icon="inline-start"
                className={cn(
                  'transition-transform duration-300 ease-out',
                  isOpen && 'rotate-90',
                )}
              />
              {isOpen ? 'Hide Details' : 'Show Details'}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent forceMount className="overflow-hidden">
          <div ref={stageRef} className="overflow-hidden">
            <div
              ref={measureRef}
              className="flex flex-col gap-4 px-6 pb-6"
              data-experience-content
            >
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
                {/* <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Skills
                </span> */}
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
}
