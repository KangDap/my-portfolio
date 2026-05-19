'use client';

import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { type ReactNode, useLayoutEffect, useRef } from 'react';

type GsapScrollSmootherProps = {
  children: ReactNode;
  smooth?: number;
  effects?: boolean;
  normalizeScroll?: boolean;
};

export function GsapScrollSmoother({
  children,
  smooth = 1.5,
  effects = true,
  // Try false first, if there's bug will change to True. See https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll().
  normalizeScroll = false,
}: GsapScrollSmootherProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    const existing = ScrollSmoother.get();
    if (existing) {
      existing.kill();
    }

    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth,
      effects,
      normalizeScroll,
      ignoreMobileResize: true,
      smoothTouch: 0.1,
    });

    ScrollTrigger.refresh();

    return () => {
      smoother.kill();
    };
  }, [smooth, effects, normalizeScroll]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
