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
    title:
      'Multimodal Deep Learning Framework for Short-Term Flood Forecasting with IoT-Based Sensing and Mobile Early Warning System',
    description:
      'AI-based flood forecasting framework integrating IoT hydrological sensors, satellite rainfall estimation (GSMaP/GPM IMERG), Digital Elevation Models (DEMNAS), and historical flood records.',
    image: '/assets/projects/datathon-ristek-2026.png',
    techStack: ['Python', 'Internet of Things', 'Transformer'],
    liveLink: '',
    githubLink: '',
    paperLink:
      'https://drive.google.com/file/d/1LN9wUpvu1Uoaa9b60cVQ-sn1BL3qe-bt/view?usp=sharing',
    notebookLink: '',
    isFeatured: false,
  },
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
    liveLink: 'https://care-connect-ten-hazel.vercel.app/',
    githubLink: 'https://github.com/KangDap/care-connect',
    isFeatured: true,
  },
  {
    title: 'NusaGraph',
    description:
      'Website for exploring Indonesian geographic entities through semantic search, RDF-based data representation, GeoNames Ontology, and SPARQL query exploration.',
    image: '/assets/projects/nusagraph.png',
    techStack: [
      'Next.js',
      'Tailwind CSS',
      'SPARQL',
      'Ontology',
      'GeoNames',
      'Leaflet JS',
    ],
    liveLink: 'https://nusagraph.vercel.app',
    githubLink: 'https://github.com/Kurtz17/NusaGraph',
    isFeatured: false,
  },
  {
    title: 'MediProfen',
    description:
      'A VR Game built with Unity based on SDG 3.c that simulate first aid simulations, aiming to give civil/medical students Emergency Decision Training.',
    image: '/assets/projects/mediprofen.png',
    techStack: ['Unity', 'C#', 'Blender 3D', 'Meta Quest 2 VR'],
    githubLink: 'https://github.com/yumairai/MediProfen_KotakP3K_IMK7',
    isFeatured: false,
  },
  {
    title: 'Human Pose Detection',
    description:
      'Implements human pose estimation using the OpenPose deep learning model with OpenCV DNN and built with Streamlit interface.',
    image: '/assets/projects/human-pose-detect.png',
    techStack: ['Python', 'Computer Vision', 'OpenPose'],
    liveLink: 'https://humanposedetect.streamlit.app',
    githubLink: 'https://github.com/KangDap/human-pose-detection',
    paperLink: '',
    notebookLink: '',
    isFeatured: false,
  },
  {
    title: 'Aerosweep',
    description:
      'A Neuro-Fuzzy Hybrid System to detect and clustering waste using UAV view, using ANN and Fuzzy Inference optimized by Genetic Algorithm.',
    image: '/assets/projects/aerosweep.png',
    techStack: [
      'Python',
      'Artificial Neural Network',
      'Fuzzy Inference System',
      'Genetic Algorithm',
    ],
    liveLink: 'https://aerosweep.streamlit.app',
    githubLink: 'https://github.com/KangDap/aerosweep',
    paperLink: '',
    notebookLink: '',
    isFeatured: false,
  },
  {
    title: 'Credit Risk Intelligence Battle',
    description:
      'A comparative study to evaluate credit risk prediction using fuzzy inference and Artificial Intelligence Learning (ANN) optimized by Genetic Algorithm (GA).',
    image: '/assets/projects/crib.png',
    techStack: [
      'Python',
      'Artificial Neural Network',
      'Fuzzy Inference System',
      'Genetic Algorithm',
    ],
    liveLink: 'https://credit-risk-intelligence-battle.streamlit.app',
    githubLink:
      'https://github.com/Hafizh220705/credit-risk-intelligence-battle',
    paperLink: '',
    notebookLink: '',
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
    title:
      'Public Sentiment Analysis on the Policies of the Newly Appointed Minister of Finance Using LLM-Based Processing of YouTube Comments',
    description:
      "Sentiment analysis project on Indonesia's New Minister of Finance policies by scraping YouTube comments, using IndoBERT model.",
    image: '/assets/projects/datmin-project.jpeg',
    techStack: ['Python', 'IndoBERT'],
    liveLink: '',
    githubLink: '',
    paperLink:
      'https://drive.google.com/file/d/1wYaUYYKvj0eFs0JD-3baHY2Gp1AZyeFY/view?usp=drivesdk',
    notebookLink: '',
    isFeatured: false,
  },
  {
    title: 'COREN: Clustering and Recommendation',
    description:
      'A web-based customer segmentation application using RFM analysis and K-Means clustering to support data-driven marketing strategies.',
    image: '/assets/projects/coren.png',
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
      "Clustering Interests and Talents of Universitas Padjadjaran's Students using Data Mining",
    description:
      "Clusters Universitas Padjadjaran's students based on its interest and talents with many variables, using three methods including K-Means, Hierarchial Clustering, and DBSCAN.",
    image: '/assets/projects/rodaza-mining.png',
    techStack: ['Python', 'K-Means Clustering', 'DBSCAN'],
    liveLink: '',
    githubLink: '',
    paperLink:
      'https://drive.google.com/file/d/1jvBoJw76G7GXtgETLWrSsErWMjB30DKC/view?usp=sharing',
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
    paperLink:
      'https://drive.google.com/file/d/1tArcVrt9ty9pZ3A_9dcRkCtESZWv0AXR/view?usp=sharing',
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
  {
    title: 'Smart Parking Detection System',
    description:
      'A web-based application developed using Streamlit and a Convolutional Neural Network (CNN) to detect whether parking slots in an image are occupied or empty. The system detects each parking slot based on predefined coordinates and visually displays the results.',
    image: '/assets/projects/spds.png',
    techStack: ['Python', 'CNN', 'Streamlit'],
    liveLink: '',
    githubLink: 'https://github.com/KangDap/smart-parking-detection-system',
    paperLink: '',
    notebookLink: '',
    isFeatured: false,
  },
];

export function getFeaturedProjects(limit = 2) {
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}
