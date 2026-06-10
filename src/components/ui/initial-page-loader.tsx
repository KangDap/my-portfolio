'use client';

import Loader from '@/components/ui/loader';
import { useEffect, useRef, useState } from 'react';

const LOADER_EXIT_DELAY = 450;
const LOADER_FADE_DURATION = 300;

export function InitialPageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const exitDelayTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const hideLoader = () => {
      exitDelayTimerRef.current = window.setTimeout(() => {
        setIsExiting(true);

        unmountTimerRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, LOADER_FADE_DURATION);
      }, LOADER_EXIT_DELAY);
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader, { once: true });
    }

    return () => {
      window.removeEventListener('load', hideLoader);

      if (exitDelayTimerRef.current !== null) {
        window.clearTimeout(exitDelayTimerRef.current);
      }

      if (unmountTimerRef.current !== null) {
        window.clearTimeout(unmountTimerRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-label="Loading page"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground transition-opacity duration-300 ${
        isExiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Loader />
    </div>
  );
}
