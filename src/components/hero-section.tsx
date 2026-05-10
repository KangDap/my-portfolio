import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
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

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Welcome !
              </p>
              <h1 className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92]">
                Dafa Ghani
              </h1>
            </div>
            <p className="max-w-xl text-base text-muted-foreground lg:text-lg">
              Aspiring Data Science, Machine Learning, AI, and Web Development.
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

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="aspect-square w-full rounded-2xl border border-border bg-card shadow-lg" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Photo Placeholder
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
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
    </section>
  );
}
