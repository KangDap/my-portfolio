'use client';

import { usePageShow } from '@/hooks/use-page-show';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

type LenisProviderProps = {
  children: ReactNode;
};

const lenisOptions = {
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
};

function LenisResizeOnRoute() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const frame = requestAnimationFrame(() => {
      lenis.resize();
    });

    return () => cancelAnimationFrame(frame);
  }, [lenis, pathname]);

  return null;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [restoreKey, setRestoreKey] = useState(0);

  usePageShow((event) => {
    const shouldRestore =
      event.type === 'pageshow' ||
      (event.type === 'visibilitychange' &&
        document.visibilityState === 'visible');

    if (shouldRestore) {
      setRestoreKey((prev) => prev + 1);
    }
  });

  return (
    <ReactLenis key={restoreKey} root options={lenisOptions}>
      <LenisResizeOnRoute />
      {children}
    </ReactLenis>
  );
}
