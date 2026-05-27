'use client';

import { usePageShow } from '@/hooks/use-page-show';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

const RouteAnimationReadyContext = createContext(true);

export function useRouteAnimationReady() {
  return useContext(RouteAnimationReadyContext);
}

type RouteAnimationState = {
  pathname: string;
  ready: boolean;
};

type LenisRouteCoordinatorProps = {
  pathname: string;
  setRouteAnimationReady: (pathname: string, ready: boolean) => void;
};

function LenisRouteCoordinator({
  pathname,
  setRouteAnimationReady,
}: LenisRouteCoordinatorProps) {
  const lenis = useLenis();

  useLayoutEffect(() => {
    let refreshFrame = 0;
    let readyFrame = 0;

    setRouteAnimationReady(pathname, false);

    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
    lenis?.resize();

    refreshFrame = requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();

      readyFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        setRouteAnimationReady(pathname, true);
      });
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      cancelAnimationFrame(readyFrame);
    };
  }, [lenis, pathname, setRouteAnimationReady]);

  return null;
}

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
  const pathname = usePathname();
  const [restoreKey, setRestoreKey] = useState(0);
  const [routeAnimationState, setRouteAnimationState] =
    useState<RouteAnimationState>(() => ({
      pathname,
      ready: true,
    }));

  const setRouteAnimationReady = useCallback(
    (nextPathname: string, ready: boolean) => {
      setRouteAnimationState({ pathname: nextPathname, ready });
    },
    [],
  );

  const routeAnimationReady =
    routeAnimationState.pathname === pathname && routeAnimationState.ready;

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
      <RouteAnimationReadyContext.Provider value={routeAnimationReady}>
        <LenisRouteCoordinator
          pathname={pathname}
          setRouteAnimationReady={setRouteAnimationReady}
        />
        {children}
      </RouteAnimationReadyContext.Provider>
    </ReactLenis>
  );
}
