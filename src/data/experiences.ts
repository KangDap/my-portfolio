export type ExperienceCategory = 'works' | 'organization' | 'education';

export type ExperienceItem = {
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
  skills: string[];
  media?: string[];
  logoSrc?: string;
  logoAlt?: string;
};

const currentEndDateMatchers = [/present/i, /current/i, /now/i, /today/i];

export function isCurrentExperience(item: Pick<ExperienceItem, 'endDate'>) {
  return currentEndDateMatchers.some((matcher) => matcher.test(item.endDate));
}

export function formatExperiencePeriod(
  item: Pick<ExperienceItem, 'startDate' | 'endDate'>,
) {
  return `${item.startDate} - ${item.endDate}`;
}

export const experiencesByCategory: Record<
  ExperienceCategory,
  ExperienceItem[]
> = {
  works: [
    {
      role: 'Research Assistant',
      organization: 'AI Lab - Computer Science Department FMIPA Unpad',
      startDate: 'March 2026',
      endDate: 'Present',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Create SLR (Systematic Literature Review) related on Neuroscience fields.',
      ],
      skills: ['Neuroscience', 'Literature Review'],
      media: ['/assets/45108c4c13057e9afdb7a6517bac32c9.jpg'],
      logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
      logoAlt: 'AI Lab logo',
    },
    {
      role: 'Machine Learning Engineer',
      organization: 'Pusat Inovasi Pengajaran & Pembelajaran (PIPP) Unpad',
      startDate: 'August 2025',
      endDate: 'December 2025',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Developed survey methodologies for Electroencephalography (EEG) data collection to improve learning video quality.',
        'Built a web-based survey data collection platform integrated with the Muse S Athena EEG Headband.',
        'Evaluated and compared 3 machine learning models (SVM, Random Forest, XGBoost) based on performance metrics to select the most efficient model.',
      ],
      skills: ['Python', 'Machine Learning', 'EEG', 'Neuroscience'],
      media: [],
      logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
      logoAlt: 'PIPP is affiliated with Unpad.',
    },
    {
      role: 'Teaching Assistant',
      organization: 'Computer Science Department FMIPA Unpad',
      startDate: 'February 2025',
      endDate: 'December 2025',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Delivered weekly lab sessions for over 80 undergraduate students across three courses: Object-Oriented Programming, Web Programming, and Computer Organization & Architecture.',
        'Evaluated and gave feedback on 10+ assignments throughout the semester, resulting in 92% passing rate.',
      ],
      skills: [
        'Teaching',
        'Computer Architecture',
        'Assembly',
        'OOP',
        'Java',
        'NetBeans',
        'HTML',
        'CSS',
        'JavaScript',
        'PHP',
        'Laravel',
      ],
      media: [],
      logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
      logoAlt: 'Teaching assistant for Computer Science FMIPA Unpad.',
    },
  ],
  organization: [
    {
      role: 'Frontend Developer',
      organization: 'TEDxPadjadjaran University 2026',
      startDate: 'March 2026',
      endDate: 'Present',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Implement website design from UI/UX designer, ensuring smooth & clean view.',
        'Integrating backend logic for website functionality.',
      ],
      skills: ['Frontend', 'Next.js', 'Communication'],
      media: [],
      logoSrc: '/assets/experiences-tab/org/TEDx Logo.jpeg',
      logoAlt: 'AI Lab logo',
    },
    {
      role: 'Staff of Fundraising Department',
      organization: 'Warta Kema Unpad',
      startDate: 'March 2025',
      endDate: 'Dec 2025',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Facilitating training sessions and IT-related competition preparation for 100+ participants.',
        'Designed a structured 6-session mentoring syllabus for mentors across three competition tracks, outlining learning objectives, materials, and preparation strategies.',
        'Contributed to the success of teams advancing to national and international competition finals, with three teams qualifying as finalists.',
      ],
      skills: ['Entrepreneurship', 'Teamwork', 'Communication'],
      media: [],
      logoSrc: '/assets/experiences-tab/org/logo warta kema.png',
      logoAlt: "Warta Kema Unpad's logo",
    },
    {
      role: 'Staff of IT Development Department',
      organization: 'Himatif FMIPA Unpad',
      startDate: 'February 2024',
      endDate: 'Dec 2025',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Facilitating training sessions and IT-related competition preparation for 100+ participants.',
        'Designed a structured 6-session mentoring syllabus for mentors across three competition tracks, outlining learning objectives, materials, and preparation strategies.',
        'Contributed to the success of teams advancing to national and international competition finals, with three teams qualifying as finalists.',
      ],
      skills: ['Program Management', 'Communication'],
      media: [],
      logoSrc: '/assets/experiences-tab/org/logohimatif.png',
      logoAlt: 'AI Lab logo',
    },
    {
      role: 'Manager of IT Competition',
      organization: 'IFEST Unpad',
      startDate: 'June 2025',
      endDate: 'October 2025',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Concepted 4 competitions including Competitive Programming, Data Analysis Competition, Essay Competition, and Hackathon.',
        'Managed 400+ participants across competition from 40+ universities and high schools nationwide.',
        'Led execution of Hackathon Day attended by 15 Hackathon finalist teams, ensuring smooth technical and operational delivery.',
      ],
      skills: [
        'Leadership',
        'Program Management',
        'Communication',
        'Competition',
      ],
      media: [],
      logoSrc: '/assets/experiences-tab/org/Logo IFEST 2025.png',
      logoAlt: 'IFEST 2025',
    },
    {
      role: 'Staff of IT Competition',
      organization: 'IFEST Unpad',
      startDate: 'June 2024',
      endDate: 'October 2024',
      location: 'Jatinangor, Sumedang Regency · Hybrid',
      highlights: [
        'Designed and developed 20+ problem sets for Informatics Competition, equivalent to OSN Informatics for high school students.',
        'Managed participant registration and administrative processes for the competition, resulting in total of 30+ participant registered.',
        'Coordinated and supervised competition execution across all stages, including preliminary rounds, finals, and awarding ceremony.',
      ],
      skills: [
        'Program Management',
        'Communication',
        'Problemsetter',
        'Competition',
      ],
      media: [],
      logoSrc: '/assets/experiences-tab/org/Logo_IFest_2024.png',
      logoAlt: 'IFEST 2024',
    },
  ],
  education: [
    {
      role: 'Universitas Padjadjaran',
      organization: "Bachelor's degree, Computer Science",
      startDate: 'August 2023',
      endDate: 'August 2027',
      location: 'Sumedang, Indonesia',
      highlights: ['Grade: 3.92/4.00 (Update January 2026)'],
      skills: ['Data Science', 'Machine Learning', 'Software Engineering'],
      media: [],
      logoSrc: '/assets/experiences-tab/edu/Logo Unpad.png',
      logoAlt: "Universitas Padjadjaran's logo.",
    },
    {
      role: 'SMA Negeri 2 Bandung',
      organization: 'Mathematics and Natural Science',
      startDate: 'August 2020',
      endDate: 'August 2023',
      location: 'Bandung, Indonesia',
      highlights: ['Final Grade: 92.00'],
      skills: ['Organization', 'Time Management'],
      media: [],
      logoSrc: '/assets/experiences-tab/edu/sman_2_bandung.png',
      logoAlt: "SMAN 2 Bandung's logo.",
    },
  ],
};

export const experienceCategoryOrder: ExperienceCategory[] = [
  'works',
  'organization',
  'education',
];

export const allExperiences = experienceCategoryOrder.flatMap(
  (category) => experiencesByCategory[category],
);

export function getCurrentExperiences() {
  return allExperiences.filter(isCurrentExperience);
}
