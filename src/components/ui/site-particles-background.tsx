'use client';

import { Particles } from '@/components/ui/particles';
import { useEffect, useState } from 'react';

export function SiteParticlesBackground() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const getTheme = () =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  const isDarkMode = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <Particles
        className="absolute inset-0"
        quantity={isDarkMode ? 200 : 100}
        staticity={isDarkMode ? 100 : 52}
        ease={isDarkMode ? 90 : 80}
        size={isDarkMode ? 0.45 : 0.35}
        color={isDarkMode ? '#ffffff' : '#000000'}
        refresh={isDarkMode}
        vx={isDarkMode ? 0 : 0.01}
        vy={isDarkMode ? 0 : 0}
      />
      <div className="absolute inset-0 bg-background/70 dark:bg-background/35" />
    </div>
  );
}
