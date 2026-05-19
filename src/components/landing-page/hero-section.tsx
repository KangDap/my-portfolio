'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { FaArrowDown, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa6';
import { IoDocumentTextOutline } from 'react-icons/io5';
import StackIcon, { type IconName } from 'tech-stack-icons';

gsap.registerPlugin(SplitText);

const WELCOME_TEXTS = [
  'Hello! ',
  'Halo!',
  '你好！',
  'こんにちは！',
  '안녕하세요!',
];

const CHAR_FADE_OUT_DURATION = 0.18;
const CHAR_FADE_IN_DURATION = 0.22;
const CHAR_STAGGER = 0.04;
const CYCLE_HOLD = 2.2;

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
  { label: 'GitHub', href: 'https://github.com/KangDap', icon: FaGithub },
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

function ProfileCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      <div className="pointer-events-none relative aspect-square w-full">
        <Image
          src={src}
          alt={alt}
          fill={true}
          loading="eager"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const indexRef = useRef(0);
  const cycleTimerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.to('[data-animate="scroll-indicator"]', {
          y: 15,
          duration: 0.85,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 0.6,
        });
      }

      {
        /* Hello text cycling */
      }
      const el = welcomeRef.current;
      if (!el) return;

      const animateOut = (onComplete: () => void) => {
        const split = SplitText.create(el, { type: 'chars' });

        gsap.to(split.chars, {
          autoAlpha: 0,
          y: -6,
          duration: CHAR_FADE_OUT_DURATION,
          stagger: CHAR_STAGGER,
          ease: 'power2.in',
          onComplete: () => {
            split.revert();
            onComplete();
          },
        });
      };

      const animateIn = () => {
        indexRef.current = (indexRef.current + 1) % WELCOME_TEXTS.length;
        el.textContent = WELCOME_TEXTS[indexRef.current];

        const split = SplitText.create(el, { type: 'chars' });

        gsap.set(split.chars, { autoAlpha: 0, y: 6 });

        gsap.to(split.chars, {
          autoAlpha: 1,
          y: 0,
          duration: CHAR_FADE_IN_DURATION,
          stagger: CHAR_STAGGER,
          ease: 'power2.out',
          onComplete: () => {
            split.revert();
            scheduleCycle();
          },
        });
      };

      const scheduleCycle = () => {
        if (cycleTimerRef.current !== null) {
          window.clearTimeout(cycleTimerRef.current);
        }
        cycleTimerRef.current = window.setTimeout(() => {
          animateOut(animateIn);
        }, CYCLE_HOLD * 1000);
      };

      const entranceDelay = prefersReducedMotion ? 0 : 1.2;
      cycleTimerRef.current = window.setTimeout(
        scheduleCycle,
        entranceDelay * 1000,
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      if (cycleTimerRef.current !== null) {
        window.clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-background">
      <section data-scroll-reveal-group className="relative min-h-[100svh]">
        <div className="mx-auto relative flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 py-14 lg:py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <div data-scroll-reveal-item className="flex flex-col gap-3">
                <p
                  ref={welcomeRef}
                  className="text-lg uppercase tracking-[0.32em] text-muted-foreground min-w-[10rem]"
                >
                  {WELCOME_TEXTS[0]}
                </p>
                <h1 className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92]">
                  Dafa Ghani
                </h1>
              </div>
              <p
                data-scroll-reveal-item
                className="max-w-xl text-base text-muted-foreground lg:text-lg"
              >
                Aspiring Data Science, Machine Learning, AI, and Web
                Development.
              </p>
              <div
                data-scroll-reveal-item
                className="flex flex-wrap items-center gap-3"
              >
                <Button size="lg" asChild>
                  <a href="/cv.pdf" rel="noreferrer">
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
              data-scroll-reveal-item
              className="flex justify-center lg:justify-end"
            >
              <ProfileCard
                src="/assets/45108c4c13057e9afdb7a6517bac32c9.jpg"
                alt="Profile Photo"
              />
            </div>
          </div>

          <div data-scroll-reveal-item className="flex justify-center">
            <span
              data-animate="scroll-indicator"
              className="pointer-events-none mt-8 flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] whitespace-nowrap text-foreground shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]"
            >
              <FaArrowDown className="text-primary" aria-hidden="true" />
              Scroll for more!
            </span>
          </div>
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
              <ProfileCard
                src="/assets/45108c4c13057e9afdb7a6517bac32c9.jpg"
                alt="Profile Photo"
              />
            </div>
            <div data-animate="about-right" className="flex flex-col gap-9">
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
                  Building data-driven ideas into clean experiences.
                </h2>
              </div>
              <p
                data-scroll-reveal-item
                className="max-w-xl text-base text-muted-foreground lg:text-lg"
              >
                I enjoy exploring data science, machine learning, and AI while
                developing web products that feel fast, clean, and easy to use.
              </p>
              <p
                data-scroll-reveal-item
                className="max-w-xl text-base text-muted-foreground lg:text-lg"
              >
                Currently on my last year (hopefully) at Universitas
                Padjadjaran, i&apos;ve done many projects and competitions
                related to programming, data science, cybersecurity, business,
                and more.
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
                      className="h-auto gap-3 px-5 py-2.5 text-sm font-medium transition-all duration-600 ease-out transform-gpu hover:-translate-y-1.5 hover:scale-105"
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
