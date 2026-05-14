export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  paperLink?: string;
  notebookLink?: string;
  isFeatured: boolean;
};

export const projects: ProjectItem[] = [
  {
    title: 'Care Connect',
    description:
      'A psychological consultation and violence reporting platform based on SDG 16.1 with donation features, anonymous report publication, and AI statistical analysis.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'TanStack Query'],
    liveLink: 'https://example.com/neuro-pulse',
    githubLink: 'https://github.com/KangDap/care-connect',
    isFeatured: true,
  },
  {
    title: 'MediProfen',
    description:
      'A VR Game built with Unity based on SDG 3.c that simulate first aid simulations, aiming to give civil/medical students Emergency Decision Training.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Unity', 'C#', 'Blender 3D'],
    githubLink: 'https://github.com/yumairai/MediProfen_KotakP3K_IMK7',
    isFeatured: true,
  },
  {
    title: 'Neuro AI',
    description:
      "Real-time multimodal biometric system solving the 'Black Box Problem' in online education by integrating EEG, eye-tracking, and face recognition for objective engagement measurement.",
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Python', 'Muse EEG Headband', 'Next.js', 'FastAPI'],
    liveLink: 'https://neuro-ai-ashy.vercel.app',
    githubLink: 'https://github.com/hdans/Neuro-AI',
    paperLink: '',
    notebookLink:
      'https://colab.research.google.com/drive/1VXMjrR0eoJP42pU-a3-bkpNlH_qbcKBC?usp=sharing',
    isFeatured: false,
  },
  {
    title: 'COREN: Clustering and Recommendation',
    description:
      'A web-based customer segmentation application using RFM analysis and K-Means clustering to support data-driven marketing strategies.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'],
    githubLink: 'https://github.com/KangDap/coren',
    isFeatured: false,
  },
  {
    title:
      'Forecasting Renewable Energy Potential Using Data Mining to Support National Energy Independence',
    description:
      'Data mining project that analyzes and clusters Indonesian provinces based on renewable energy potential using K-Means Clustering.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: [
      'Python',
      'K-Means Clustering',
      'Scikit-learn',
      'Pandas',
      'NumPy',
    ],
    liveLink: '',
    githubLink: '',
    paperLink:
      'https://drive.google.com/file/d/1jvBoJw76G7GXtgETLWrSsErWMjB30DKC/view?usp=sharing',
    notebookLink:
      'https://colab.research.google.com/drive/1N2vOlIKf4BoFMe6tE8fJgqq9qT3cfrc1',
    isFeatured: false,
  },
  {
    title:
      'Sentiment Analysis of Halodoc App Reviews Using a Convolutional Neural Network (CNN) Model with the Lexicon-Based Labeling Method',
    description:
      'Sentiment analysis project on Halodoc app reviews using a Convolutional Neural Network (CNN) model with lexicon-based automatic labeling.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Python', 'CNN', 'Lexicon'],
    liveLink: '',
    githubLink: 'https://github.com/abdazizhamud/dapa-ganteng-datathon-ristek',
    paperLink: '',
    notebookLink: '',
    isFeatured: false,
  },
  {
    title: 'Food Price Forecasting with Gradient Boosting',
    description:
      'Machine learning-based forecasting system for Indonesian food prices using XGBoost and Gradient Boosting.',
    image: '/assets/projects/project-placeholder.svg',
    techStack: ['Python', 'XGBoost', 'Optuna', 'Pandas', 'Scikit-learn'],
    liveLink: '',
    githubLink: '',
    paperLink:
      'https://drive.google.com/file/d/1T9nWYb84cC_cHhWXqTtw8EvLqsIJ1Q5o/view?usp=sharing',
    notebookLink: '',
    isFeatured: false,
  },
];

export function getFeaturedProjects(limit = 2) {
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}
