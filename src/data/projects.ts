export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  isFeatured: boolean;
};

export const projects: ProjectItem[] = [
  {
    title: 'Care Connect',
    description:
      'A real-time EEG analytics dashboard that visualizes brainwave patterns and session insights.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'TanStack Query'],
    liveLink: 'https://example.com/neuro-pulse',
    githubLink: 'https://github.com/KangDap/care-connect',
    isFeatured: true,
  },
  {
    title: 'MediProfen',
    description:
      'A web-based survey platform for neuroscience research with multi-step forms and analytics.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Unity', 'C#', 'Blender 3D'],
    liveLink: 'https://example.com/survey-flow',
    githubLink: 'https://github.com/yumairai/MediProfen_KotakP3K_IMK7',
    isFeatured: true,
  },
  {
    title: 'Neuro AI',
    description:
      'A learning analytics hub that tracks engagement, outcomes, and cohort progress in one view.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Python', 'Muse EEG Headband', 'Next.js', 'FastAPI'],
    liveLink: 'https://example.com/learning-analytics',
    isFeatured: false,
  },
];

export function getFeaturedProjects(limit = 2) {
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}
