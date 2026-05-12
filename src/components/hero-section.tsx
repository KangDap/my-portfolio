'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { User } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { FaArrowDown, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa6';
import { IoDocumentTextOutline } from 'react-icons/io5';
import StackIcon, { type IconName } from 'tech-stack-icons';

const techStack: Array<{ label: string; icon: IconName }> = [
  { label: 'JavaScript', icon: 'js' },
  { label: 'PHP', icon: 'php' },
  { label: 'C++', icon: 'c++' },
  { label: 'C#', icon: 'c#' },
  { label: 'Python', icon: 'python' },
  { label: 'Java', icon: 'java' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'React', icon: 'react' },
  { label: 'Tailwind', icon: 'tailwindcss' },
  { label: 'MySQL', icon: 'mysql' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'TanStack', icon: 'tanstack' },
  { label: 'Prisma', icon: 'prisma' },
  { label: 'Supabase', icon: 'supabase' },
  { label: 'Laravel', icon: 'laravel' },
  { label: 'CodeIgniter', icon: 'codeigniter' },
  { label: 'Next.js', icon: 'nextjs2' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/KangDap',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/dafaghani',
    icon: FaLinkedin,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/dafa.ghani',
    icon: FaInstagram,
  },
];

function ProfileCard({ label }: { label: string }) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="aspect-square w-full rounded-2xl border border-border bg-card shadow-lg" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!sectionRef.current || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { duration: 0.85, ease: 'power2.out' },
      });

      timeline
        .from(
          '[data-animate="hero-left"] > *',
          { autoAlpha: 0, y: 180, stagger: 0.16 },
          0,
        )
        .from(
          '[data-animate="hero-right"]',
          { autoAlpha: 0, y: 180, scale: 0.98 },
          0.08,
        )
        .from(
          '[data-animate="scroll-indicator"]',
          { autoAlpha: 0, y: 180 },
          0.24,
        );

      gsap.to('[data-animate="scroll-indicator"]', {
        y: 10,
        duration: 0.85,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-background">
      <section className="relative min-h-[100svh]">
        <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-6 py-14 lg:py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div data-animate="hero-left" className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Welcome !
                </p>
                <h1 className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92]">
                  Dafa Ghani
                </h1>
              </div>
              <p className="max-w-xl text-base text-muted-foreground lg:text-lg">
                Aspiring Data Science, Machine Learning, AI, and Web
                Development.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noreferrer">
                    <IoDocumentTextOutline /> My CV
                  </a>
                </Button>
                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.map((item) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      size="icon-lg"
                      asChild
                    >
                      <a href={item.href} aria-label={item.label}>
                        <item.icon aria-hidden="true" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-animate="hero-right"
              className="flex justify-center lg:justify-end"
            >
              <ProfileCard label="Profile Photo" />
            </div>
          </div>
        </div>
        <div
          data-animate="scroll-indicator"
          className="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground shadow-sm backdrop-blur"
        >
          <FaArrowDown className="text-primary" aria-hidden="true" />
          Scroll for more!
        </div>
      </section>

      <section id="about">
        <div
          data-scroll-reveal-group
          className="mx-auto flex w-full max-w-6xl items-center px-6 py-14 lg:py-20"
        >
          <div className="grid w-full gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div
              data-animate="about-left"
              data-scroll-reveal-item
              className="flex justify-center lg:justify-start"
            >
              <ProfileCard label="Profile Photo" />
            </div>
            <div data-animate="about-right" className="flex flex-col gap-12">
              <div data-scroll-reveal-item className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <User
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                    About Me
                  </p>
                </div>
                <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
                  Building data-driven ideas into polished experiences.
                </h2>
              </div>
              <p
                data-scroll-reveal-item
                className="max-w-xl text-base text-muted-foreground lg:text-lg"
              >
                I enjoy exploring machine learning and AI while crafting web
                products that feel fast, clean, and easy to use.
              </p>

              <div
                data-animate="tech-stack"
                data-scroll-reveal-item
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <FaCode
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                    Tech Stack
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {techStack.map((tech) => (
                    <Badge
                      key={tech.label}
                      data-animate="tech-pill"
                      variant="ghost"
                      className="h-auto gap-3 px-5 py-2.5 text-sm font-medium transition-all duration-600 ease-out transform-gpu hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_18px_36px_-24px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_18px_36px_-24px_rgba(255,255,255,0.25)]"
                    >
                      <span
                        data-icon="inline-start"
                        aria-hidden="true"
                        className="relative flex size-6 shrink-0 items-center justify-center"
                      >
                        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-600 ease-out group-hover/badge:opacity-0">
                          <StackIcon
                            name={tech.icon}
                            variant="grayscale"
                            className="size-6"
                          />
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-600 ease-out group-hover/badge:opacity-100">
                          <StackIcon
                            name={tech.icon}
                            variant="dark"
                            className="size-6"
                          />
                        </span>
                      </span>
                      {tech.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
