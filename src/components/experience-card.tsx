'use client';

import { AutoHeight } from '@/components/animate-ui/primitives/effects/auto-height';
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
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

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
  const contentRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      const t = gsap.fromTo(
        el,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          delay: 0.06,
          ease: 'power2.out',
          onComplete: () => {
            try {
              window.dispatchEvent(new Event('resize'));
            } catch (e) {
              console.log(e);
            }
          },
        },
      );
      return () => {
        t.kill();
      };
    } else {
      const t = gsap.to(el, {
        autoAlpha: 0,
        y: 6,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          try {
            window.dispatchEvent(new Event('resize'));
          } catch (e) {
            console.log(e);
          }
        },
      });
      return () => {
        t.kill();
      };
    }
  }, [isOpen]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <article
        className={cn(
          'relative flex flex-col gap-5 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm',
          isOngoing && 'border-transparent',
        )}
      >
        {isOngoing ? (
          <ShineBorder
            borderWidth={1}
            duration={14}
            shineColor={['var(--success)', 'var(--success-foreground)']}
          />
        ) : null}
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
              <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
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
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p>{location}</p>
            </div>
          </div>
        </header>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-fit px-3">
            <ChevronRight
              data-icon="inline-start"
              className={cn(
                'transition-transform duration-200',
                isOpen && 'rotate-90',
              )}
            />
            {isOpen ? 'Hide Details' : 'Show Details'}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          <AutoHeight
            deps={[isOpen]}
            transition={
              isOpen
                ? { type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }
                : { type: 'spring', stiffness: 300, damping: 30 }
            }
          >
            <div
              ref={contentRef}
              className="flex flex-col gap-4 pt-2"
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
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Skills
                </span>
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </AutoHeight>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
}
