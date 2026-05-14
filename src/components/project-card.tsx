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
import { ExternalLink, FileText } from 'lucide-react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { SiGooglecolab } from 'react-icons/si';

const imageSizes = '(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw';

export function ProjectCard({ project }: { project: ProjectItem }) {
  const hasImage = project.image.trim().length > 0;

  return (
    <Card className="h-full flex flex-col pt-0">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40 rounded-t-xl">
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

      <CardHeader className="gap-4">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 gap-4">
        <div className="flex flex-col gap-3">
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
          {project.liveLink ? (
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
          ) : null}
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
          {project.paperLink ? (
            <Button variant="outline" size="icon" asChild>
              <a
                href={project.paperLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open paper for ${project.title}`}
              >
                <FileText data-icon="inline-start" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          {project.notebookLink ? (
            <Button variant="outline" size="icon" asChild>
              <a
                href={project.notebookLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open notebook for ${project.title}`}
              >
                <SiGooglecolab data-icon="inline-start" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
