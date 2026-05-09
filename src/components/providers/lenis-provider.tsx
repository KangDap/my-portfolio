'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

type LenisProviderProps = {
  children: ReactNode;
};

const lenisOptions = {
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
};

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
