'use client';

import { Button } from '@/components/ui/button';
import { Dock, DockIcon } from '@/components/ui/dock';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Briefcase, Folders, House } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const navItems = [
  {
    label: 'Home',
    href: '#home',
    icon: House,
  },
  {
    label: 'Experiences',
    href: '#experiences',
    icon: Briefcase,
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: Folders,
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dockLinks = useMemo(
    () =>
      navItems.map((item) => (
        <DockIcon key={item.label} className="bg-black/10 dark:bg-white/10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                aria-label={item.label}
                className="flex size-full items-center justify-center"
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
    [],
  );

  const mobileLinks = useMemo(
    () =>
      navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 text-base font-medium text-foreground transition-all duration-300 ease-in-out hover:scale-110"
        >
          <item.icon className="size-5" />
          <span>{item.label}</span>
        </Link>
      )),
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TooltipProvider>
      <nav
        aria-label="Primary"
        className={cn(
          'z-50 transition-all duration-500 ease-in-out',
          isScrolled
            ? 'fixed bottom-4 left-1/2 -translate-x-1/2'
            : 'absolute top-0 left-0 w-full',
        )}
      >
        {isScrolled ? (
          <>
            {/* Desktop: Magic UI Dock */}
            <div className="hidden md:flex">
              <Dock iconMagnification={60} iconDistance={100}>
                {dockLinks}
              </Dock>
            </div>

            {/* Mobile: Hamburger in floating pill */}
            <div className="flex md:hidden justify-center">
              <div className="rounded-full border border-border bg-background/70 px-4 py-2 shadow-lg backdrop-blur-md">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-navbar"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <span className="flex flex-col gap-1" aria-hidden="true">
                    <span className="h-px w-5 bg-foreground" />
                    <span className="h-px w-5 bg-foreground" />
                    <span className="h-px w-5 bg-foreground" />
                  </span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-6 px-6 py-6">
            {/* Desktop: icon + label links */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out hover:scale-110 hover:text-foreground"
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile: Hamburger */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navbar"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="h-px w-5 bg-foreground" />
                <span className="h-px w-5 bg-foreground" />
                <span className="h-px w-5 bg-foreground" />
              </span>
            </Button>
          </div>
        )}

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
