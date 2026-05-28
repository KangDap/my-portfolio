'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
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
  const coordinatedPathnameRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (coordinatedPathnameRef.current === pathname) {
      lenis?.resize();
      ScrollTrigger.refresh();
      setRouteAnimationReady(pathname, true);
      return;
    }

    let frame = 0;
    let readyTimer = 0;

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenis?.scrollTo(0, { immediate: true });
      lenis?.resize();
    };

    const settleScroll = (remainingFrames: number) => {
      frame = requestAnimationFrame(() => {
        resetScroll();
        ScrollTrigger.refresh();

        if (remainingFrames > 0) {
          settleScroll(remainingFrames - 1);
          return;
        }

        readyTimer = window.setTimeout(() => {
          resetScroll();
          ScrollTrigger.refresh();
          coordinatedPathnameRef.current = pathname;
          setRouteAnimationReady(pathname, true);
        }, 0);
      });
    };

    setRouteAnimationReady(pathname, false);
    resetScroll();
    settleScroll(2);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(readyTimer);
    };
  }, [lenis, pathname, setRouteAnimationReady]);

  return null;
}

function LenisVisibilityRefresh() {
  const lenis = useLenis();

  useEffect(() => {
    let frame = 0;

    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };

    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [lenis]);

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

  return (
    <ReactLenis root options={lenisOptions}>
      <RouteAnimationReadyContext.Provider value={routeAnimationReady}>
        <LenisVisibilityRefresh />
        <LenisRouteCoordinator
          pathname={pathname}
          setRouteAnimationReady={setRouteAnimationReady}
        />
        <div
          data-route-transition-pending={routeAnimationReady ? undefined : ''}
        >
          {children}
        </div>
      </RouteAnimationReadyContext.Provider>
    </ReactLenis>
  );
}
