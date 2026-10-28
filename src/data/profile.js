/**
 * Single source of truth for every piece of content on the site.
 *
 * Nothing here is invented: the text comes from the CV, and the projects come
 * from behance.net/shaksitarajan. Edit this file and the whole page updates —
 * no component needs to be touched.
 */

export const profile = {
  name: 'Shaksita BK',
  role: 'UI/UX Designer',
  location: 'Chennai, India',

  /** Shown in the hero eyebrow and the status card. Set to null to hide both. */
  availability: 'Open to work',

  /** Hero headline. `accent` is the word rendered in italic accent type. */
  headline: {
    before: 'Transforming ideas into',
    accent: 'intuitive',
    after: 'digital experiences.',
  },

  /** Hero sub-paragraph (Behance profile text). */
  intro:
    'Junior UI/UX Designer who loves simplifying complexity through clean interfaces, thoughtful interactions, and user-centered design.',

  /** About section — CV profile summary. */
  summary:
    'UI/UX Designer experienced in designing web, mobile, and dashboard applications. Skilled in Figma, wireframing, prototyping, responsive design, user flows, and design systems. Focused on usability, user-centered design, and creating intuitive digital experiences.',

  /** Quick facts beside the portrait. */
  facts: [
    { label: 'Based', value: 'Chennai, India' },
    { label: 'Role', value: 'UI/UX Designer' },
    { label: 'Education', value: 'BCA, University of Madras' },
    { label: 'Languages', value: 'English, Tamil' },
  ],

  portrait: {
    src: 'images/portrait.jpg',
    alt: 'Shaksita BK, UI/UX Designer',
  },
};

export const contact = {
  email: 'shaksitabk1203@gmail.com',
  phone: { display: '+91 63743 71042', href: 'tel:+916374371042' },
  resume: 'resume.pdf',
  /** Circular profile links in the Contact section, in display order. */
  social: {
    linkedin: 'https://linkedin.com/in/shaksita-bk',
    behance: 'https://www.behance.net/shaksitarajan',
    instagram: 'https://www.instagram.com/designbyshaksi',
  },
};

/** Nav entries drive both the links and the scroll-spy. Order = page order. */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export const experience = [
  {
    period: 'Sep 2025 — May 2026',
    role: 'UI/UX Designer Intern',
    company: 'Emayam Technology Private Limited',
    highlights: [
      {
        title: 'Delivery Tracking App',
        detail:
          'Contributed to dashboard layouts and data visualization for a field sales tracking and employee monitoring system.',
      },
      {
        title: 'Lead Management Dashboard',
        detail: 'Designed user interfaces for a B2B marketplace connecting buyers and sellers.',
      },
      {
        title: 'E-Commerce Website & Mobile App',
        detail:
          'Designed responsive interfaces for product management, order workflows, and buyer-seller interactions.',
      },
    ],
  },
];

export const stack = {
  groups: [
    {
      title: 'Design skills',
      items: [
        'User Research',
        'Wireframing & Prototyping',
        'Information Architecture',
        'Design Systems & Style Guides',
        'Responsive Web & Mobile Design',
        'Visual Design & Typography',
        'Interaction Design',
      ],
    },
    {
      title: 'Tools',
      items: ['Figma & FigJam', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'HTML & CSS'],
    },
    {
      title: 'Personal skills',
      items: [
        'Creative Problem-Solving',
        'User-Centered Thinking',
        'Time Management',
        'Attention to Detail',
        'Communication & Collaboration',
      ],
    },
  ],
  languages: 'English, Tamil',
};

export const education = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    issuer: 'University of Madras',
    period: '2022 — 2025 · 62%',
  },
];

export const certifications = [
  {
    title: 'UI/UX Design Certification',
    issuer: 'Green Technologies',
    period: 'Nov 2024 — Jan 2025',
  },
  {
    title: 'Advanced UI/UX Design',
    issuer: 'Brand Monk Academy',
    period: 'Jun 2026 — Sep 2026',
  },
];

/**
 * Projects, in Behance order. `discipline` restates the project's own Behance
 * title — no summaries have been written on Shaksita's behalf. When the case
 * study text is available, add a `summary` field and ProjectRow will render it.
 */
export const projects = [
  {
    id: 'neighbourhub',
    title: 'NeighbourHub',
    discipline: 'Community app · UI/UX case study',
    cover: 'images/neighbourhub.jpg',
    href: 'https://www.behance.net/gallery/257657701/NeighbourHub-UIUX-Case-Study-Community-App',
  },
  {
    id: 'flimmax',
    title: 'FLIMMAX',
    discipline: 'OTT mobile app · UI/UX case study',
    cover: 'images/flimmax.png',
    href: 'https://www.behance.net/gallery/222431369/FLIMMAX-OTT-Mobile-app-UI-UX-Case-Study',
  },
  {
    id: 'yumtrack',
    title: 'YumTrack!',
    discipline: 'Food app · Prototype · UI/UX case study',
    cover: 'images/yumtrack.png',
    href: 'https://www.behance.net/gallery/222424289/YumTrack-Food-App-Prototype-UIUX-Case-Study',
  },
  {
    id: 'furniture',
    title: 'Furniture Ecommerce Website',
    discipline: 'Website design',
    cover: 'images/furniture.png',
    href: 'https://www.behance.net/gallery/222382785/Furniture-Ecommerce-Website',
  },
  {
    id: 'organic-food',
    title: 'Organic Food Ecommerce',
    discipline: 'Website design',
    cover: 'images/organic-food.png',
    href: 'https://www.behance.net/gallery/222382083/Organic-Food-ecommerce-Website-Design',
  },
  {
    id: 'fitness',
    title: 'Fitness and Workout',
    discipline: 'UI design',
    cover: 'images/fitness.png',
    href: 'https://www.behance.net/gallery/222295055/Fitness-and-Workout-UI-Design',
  },
];

export const behanceProfile = 'https://www.behance.net/shaksitarajan';
