'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useLayoutEffect, useRef } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  selector?: string;
  revealOnLoad?: boolean;
};

const REVEAL_START = 'top 85%';

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function revealItems(
  items: HTMLElement[],
  options: { duration: number; stagger: number },
) {
  gsap.to(items, {
    autoAlpha: 1,
    y: 0,
    duration: options.duration,
    stagger: options.stagger,
    ease: 'power2.out',
    clearProps: 'opacity,transform',
  });
}

function fadeOutItems(
  items: HTMLElement[],
  options: { duration: number; stagger: number } = {
    duration: 0.5,
    stagger: 0.05,
  },
) {
  gsap.to(items, {
    autoAlpha: 0,
    y: 180,
    duration: options.duration,
    stagger: options.stagger,
    ease: 'power2.in',
  });
}

export function ScrollReveal({
  children,
  selector = '[data-scroll-reveal]',
  revealOnLoad = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const groups = Array.from(
        container.querySelectorAll<HTMLElement>('[data-scroll-reveal-group]'),
      );

      groups.forEach((group) => {
        const items = Array.from(
          group.querySelectorAll<HTMLElement>('[data-scroll-reveal-item]'),
        );

        if (items.length === 0) return;

        const isVisible = isInViewport(group);

        if (isVisible && !revealOnLoad) {
          gsap.set(items, { autoAlpha: 1, y: 0, clearProps: 'opacity' });
        } else {
          gsap.set(items, { autoAlpha: 0, y: 180 });
        }

        if (revealOnLoad && isVisible) {
          revealItems(items, { duration: 0.85, stagger: 0.16 });
        }

        ScrollTrigger.create({
          trigger: group,
          start: REVEAL_START,
          onEnter: () => revealItems(items, { duration: 0.85, stagger: 0.16 }),
          onEnterBack: () =>
            revealItems(items, { duration: 0.75, stagger: 0.12 }),
          onLeave: () => fadeOutItems(items),
          onLeaveBack: () => fadeOutItems(items),
        });
      });

      const elements = Array.from(
        container.querySelectorAll<HTMLElement>(selector),
      ).filter((element) => !element.closest('[data-scroll-reveal-group]'));

      if (elements.length === 0) return;

      const hiddenTargets: HTMLElement[] = [];

      if (revealOnLoad) {
        hiddenTargets.push(...elements);
      } else {
        elements.forEach((element) => {
          hiddenTargets.push(element);
          if (isInViewport(element)) {
            gsap.set(element, { autoAlpha: 1, y: 0 });
          } else {
            gsap.set(element, { autoAlpha: 0, y: 180 });
          }
        });
      }

      if (hiddenTargets.length === 0) return;

      gsap.set(hiddenTargets, { autoAlpha: 0, y: 180 });

      ScrollTrigger.batch(hiddenTargets, {
        start: REVEAL_START,
        onEnter: (batch) => {
          revealItems(batch as HTMLElement[], {
            duration: 0.85,
            stagger: 0.12,
          });
        },
        onEnterBack: (batch) => {
          revealItems(batch as HTMLElement[], {
            duration: 0.75,
            stagger: 0.1,
          });
        },
        onLeave: (batch) => {
          fadeOutItems(batch as HTMLElement[]);
        },
        onLeaveBack: (batch) => {
          fadeOutItems(batch as HTMLElement[]);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [selector, revealOnLoad]);

  return <div ref={containerRef}>{children}</div>;
}
