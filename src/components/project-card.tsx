'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ProjectItem } from '@/data/projects';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

const imageSizes = '(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw';

export function ProjectCard({ project }: { project: ProjectItem }) {
  const hasImage = project.image.trim().length > 0;

  return (
    <Card className="h-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40">
        {hasImage ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            No preview
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink data-icon="inline-start" aria-hidden="true" />
            </a>
          </Button>
          {project.githubLink ? (
            <Button variant="outline" size="icon" asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open GitHub repository for ${project.title}`}
              >
                <FaGithub data-icon="inline-start" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
