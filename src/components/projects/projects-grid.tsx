'use client';

import { ProjectCard } from '@/components/projects/project-card';
import { useRouteAnimationReady } from '@/components/providers/lenis-provider';
import type { ProjectItem } from '@/data/projects';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

type ProjectsGridProps = {
  projects: ProjectItem[];
  className?: string;
};

export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const routeAnimationReady = useRouteAnimationReady();

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || projects.length === 0 || !routeAnimationReady) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]');

      gsap.set(cards, { autoAlpha: 0, y: 24 });

      ScrollTrigger.batch(cards, {
        start: 'top 80%',
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          });
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          });
        },
      });
    }, grid);

    return () => ctx.revert();
  }, [projects.length, routeAnimationReady]);

  return (
    <div
      ref={gridRef}
      className={cn('grid gap-6', className)}
      data-project-grid
      data-route-animation-pending={routeAnimationReady ? undefined : ''}
    >
      {projects.map((project) => (
        <div key={project.title} data-project-card>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
