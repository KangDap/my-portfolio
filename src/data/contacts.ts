export type ContactInfoItem = {
  label: string;
  value: string;
  href?: string;
  icon: 'mail' | 'phone' | 'map';
};

export type SocialCard = {
  label: string;
  description: string;
  cta: string;
  href: string;
  icon: 'instagram' | 'linkedin' | 'github' | 'email';
  theme: 'sunset' | 'ocean' | 'charcoal' | 'emerald';
};

export const contactProfile = {
  email: 'dafagar08@gmail.com',
  phone: '+62 812 2479 0955',
  location: 'Bandung, Indonesia',
};

export const contactInfoItems: ContactInfoItem[] = [
  {
    label: 'Email',
    value: contactProfile.email,
    href: `mailto:${contactProfile.email}`,
    icon: 'mail',
  },
  //   {
  //     label: 'Phone',
  //     value: contactProfile.phone,
  //     href: `tel:${contactProfile.phone}`,
  //     icon: 'phone',
  //   },
  {
    label: 'Location',
    value: contactProfile.location,
    icon: 'map',
  },
];

export const socialCards: SocialCard[] = [
  {
    label: 'Follow My Life Update',
    description: 'See through my daily.',
    cta: 'Go to Instagram',
    href: 'https://instagram.com/dafa.ghani',
    icon: 'instagram',
    theme: 'sunset',
  },
  {
    label: "Let's Connect",
    description: 'Connect with me professionally.',
    cta: 'Go to LinkedIn',
    href: 'https://linkedin.com/in/dafaghani',
    icon: 'linkedin',
    theme: 'ocean',
  },
  {
    label: 'Explore the Code',
    description: 'Explore my open-source work.',
    cta: 'Go to GitHub',
    href: 'https://github.com/KangDap',
    icon: 'github',
    theme: 'charcoal',
  },
  {
    label: 'Send an Email',
    description: 'Drop a message directly.',
    cta: 'Email Me',
    href: `mailto:${contactProfile.email}`,
    icon: 'email',
    theme: 'emerald',
  },
];
