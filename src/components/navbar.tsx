'use client';

import { Fade } from '@/components/animate-ui/primitives/effects/fade';
import {
  Highlight,
  HighlightItem,
} from '@/components/animate-ui/primitives/effects/highlight';
import { Button } from '@/components/ui/button';
import { Dock, DockIcon } from '@/components/ui/dock';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { BookUser, Briefcase, Folders, House, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Experiences', href: '/experiences', icon: Briefcase },
  { label: 'Projects', href: '/projects', icon: Folders },
  { label: 'Contacts', href: '/contacts', icon: BookUser },
];

type DockStatus =
  | 'hidden' // dock not rendered at all
  | 'entering' // dock rendered but not visible (for trigger CSS transition)
  | 'visible' // dock fully visible
  | 'leaving'; // dock exit animation

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [dockStatus, setDockStatus] = useState<DockStatus>('hidden');

  const leaveTimerRef = useRef<number | null>(null);
  const enteringRafRef = useRef<number | null>(null);

  const showDock = dockStatus !== 'hidden';
  const dockVisible = dockStatus === 'visible';

  const dockLinks = useMemo(
    () =>
      navItems.map((item) => (
        <DockIcon key={item.label} className="bg-black/10 dark:bg-white/10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                aria-label={item.label}
                className={cn(
                  'flex size-full items-center justify-center transition-colors duration-300',
                  pathname === item.href
                    ? 'text-white font-semibold'
                    : 'text-muted-foreground hover:text-white',
                )}
              >
                <item.icon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      )),
    [pathname],
  );

  const mobileLinks = useMemo(
    () =>
      navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className={cn(
            'flex items-center gap-3 rounded px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out',
            pathname === item.href
              ? 'bg-muted text-white font-semibold'
              : 'text-muted-foreground hover:text-foreground hover:scale-110',
          )}
        >
          <item.icon className="size-5" />
          <span>{item.label}</span>
        </Link>
      )),
    [pathname],
  );

  const desktopLinks = useMemo(
    () =>
      navItems.map((item) => (
        <HighlightItem key={item.label} value={item.href}>
          <Link
            href={item.href}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out',
              'text-muted-foreground hover:text-foreground data-[active=true]:text-white',
            )}
          >
            <item.icon className="size-4" />
            <span>{item.label}</span>
          </Link>
        </HighlightItem>
      )),
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      if (scrolled) setHasScrolled(true);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (leaveTimerRef.current !== null) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (enteringRafRef.current !== null) {
      cancelAnimationFrame(enteringRafRef.current);
      enteringRafRef.current = null;
    }

    if (isScrolled) {
      {
        /* Disabled lint, this only changes Dock status for animation trigger. See https://react.dev/learn/you-might-not-need-an-effect */
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDockStatus('entering');
      enteringRafRef.current = requestAnimationFrame(() => {
        setDockStatus('visible');
        enteringRafRef.current = null;
      });
    } else if (dockStatus === 'visible' || dockStatus === 'entering') {
      {
        /* Disabled lint, this only changes Dock status for animation trigger. See https://react.dev/learn/you-might-not-need-an-effect */
      }

      setDockStatus('leaving');
      leaveTimerRef.current = window.setTimeout(() => {
        setDockStatus('hidden');
        leaveTimerRef.current = null;
      }, 300);
    }

    return () => {
      if (leaveTimerRef.current !== null) {
        window.clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      if (enteringRafRef.current !== null) {
        cancelAnimationFrame(enteringRafRef.current);
        enteringRafRef.current = null;
      }
    };
  }, [isScrolled]);

  const topNav = (
    <div className="absolute left-0 top-0 hidden w-full md:block">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-6 px-6 py-6">
        <Highlight
          controlledItems
          value={pathname}
          click={false}
          className="inset-0 rounded-lg bg-muted/80"
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          exitDelay={0}
        >
          <div className="hidden items-center gap-8 md:flex">
            {desktopLinks}
          </div>
        </Highlight>
      </div>
    </div>
  );

  const mobileTopNav = (
    <div className="fixed inset-x-0 top-0 z-50 md:hidden">
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-end px-6 py-4 transition-all duration-300 ease-out',
          isScrolled
            ? 'border-b border-white/10 bg-black/60 shadow-lg backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="border-0 bg-transparent text-foreground shadow-none hover:bg-white/10"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navbar"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <nav aria-label="Primary" className="relative z-50">
        {mobileTopNav}

        {/* Dock */}
        {showDock && (
          <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center gap-6">
            <div
              className={cn(
                'hidden md:flex transition-all duration-500 ease-in-out',
                dockVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-full opacity-0',
              )}
            >
              <Dock iconMagnification={60} iconDistance={100}>
                {dockLinks}
              </Dock>
            </div>
          </div>
        )}

        {/* Top navbar */}
        {!isScrolled &&
          (hasScrolled ? (
            <Fade
              initialOpacity={0}
              opacity={1}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {topNav}
            </Fade>
          ) : (
            topNav
          ))}

        {/* Mobile backdrop */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile slide-out menu */}
        <aside
          id="mobile-navbar"
          className={cn(
            'fixed right-0 top-0 z-50 flex h-full w-64 flex-col gap-6 border-l border-border bg-background px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Menu
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">&times;</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-5">{mobileLinks}</nav>
        </aside>
      </nav>
    </TooltipProvider>
  );
}
