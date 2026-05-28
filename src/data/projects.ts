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
    title: 'TEDxPadjadjaran University 2026 Website',
    description:
      'The official website of TEDxPadjadjaran University 2026, providing information about TEDx pre-event and main event, local speaker application, and ticketing.',
    image: '/assets/projects/tedx-pu2026.png',
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'GSAP', 'Resend'],
    liveLink: 'https://tedxpadjadjaranuniversity.com/',
    githubLink: 'https://github.com/KangDap/care-connect',
    isFeatured: true,
  },
  {
    title: 'CareConnect',
    description:
      'A psychological consultation and violence reporting platform based on SDG 16.1 with donation features, anonymous report publication, and AI statistical analysis.',
    image: '/assets/projects/care-connect-1.png',
    techStack: [
      'Next.js',
      'Tailwind CSS',
      'Supabase',
      'Better Auth',
      'Midtrans',
      'TanStack Query',
      'FastAPI',
      'Apriori Algorithm',
    ],
    liveLink: 'https://example.com/neuro-pulse',
    githubLink: 'https://github.com/KangDap/care-connect',
    isFeatured: true,
  },
  {
    title: 'NusaGraph',
    description:
      'Website for exploring Indonesian geographic entities through semantic search, RDF-based data representation, GeoNames Ontology, and SPARQL query exploration.',
    image: '',
    techStack: [
      'Next.js',
      'Tailwind CSS',
      'SPARQL',
      'Ontology',
      'GeoNames',
      'Leaflet JS',
    ],
    liveLink: 'https://example.com/neuro-pulse',
    githubLink: 'https://github.com/Kurtz17/NusaGraph',
    isFeatured: false,
  },
  {
    title: 'MediProfen',
    description:
      'A VR Game built with Unity based on SDG 3.c that simulate first aid simulations, aiming to give civil/medical students Emergency Decision Training.',
    image: '',
    techStack: ['Unity', 'C#', 'Blender 3D', 'Meta Quest 2 VR'],
    githubLink: 'https://github.com/yumairai/MediProfen_KotakP3K_IMK7',
    isFeatured: false,
  },
  {
    title: 'Aerosweep',
    description:
      'A Neuro-Fuzzy Hybrid System to detect and clustering waste using UAV view, using ANN and Fuzzy Inference optimized by Genetic Algorithm.',
    image: '',
    techStack: [
      'Python',
      'Artificial Neural Network',
      'Fuzzy Inference System',
      'Genetic Algorithm',
    ],
    githubLink: 'https://github.com/yumairai/MediProfen_KotakP3K_IMK7',
    isFeatured: false,
  },
  {
    title: 'Neuro AI',
    description:
      "Real-time multimodal biometric system solving the 'Black Box Problem' in online education by integrating EEG, eye-tracking, and face recognition for objective engagement measurement.",
    image: '/assets/projects/neuro-ai.png',
    techStack: [
      'Python',
      'Muse S Headband (EEG)',
      'Next.js',
      'FastAPI',
      'muselsl',
      'XGBoost',
      'SVM',
      'Random Forest',
    ],
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
    image: '',
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Python',
      'Flask',
      'K-Means Clustering',
    ],
    githubLink: 'https://github.com/KangDap/coren',
    isFeatured: false,
  },
  {
    title:
      'Forecasting Renewable Energy Potential Using Data Mining to Support National Energy Independence',
    description:
      'Data mining project that analyzes and clusters Indonesian provinces based on renewable energy potential using K-Means Clustering.',
    image: '/assets/projects/gemastik-2025.png',
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
    image: '/assets/projects/datathon-ristek-2025.png',
    techStack: ['Python', 'CNN', 'Lexicon', 'NLTK', 'Sastrawi'],
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
    image: '/assets/projects/arkavidia-2025.png',
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
