import type {
  Channel,
  Heading,
  Project,
  RichPart,
  RichText,
  Role,
  SkillGroup,
} from '@/types/content';
import type { SectionId } from '@/constants/navigation';
import { RESUME_HREF } from '@/constants';

/**
 * Everything the site says, in one place.
 *
 * The site renders twice — as a desktop document under `(front)` and as a
 * phone app under `(mobile)` — and those two are deliberately not allowed to
 * share components. Without this module they would each carry their own copy
 * of the same projects, skill groups and roles, and the first edit made to
 * only one of them would be a lie on the other.
 *
 * So the split is presentation only: the words, the links and the ordering
 * live here, and each front end decides what they look like. Nothing in this
 * file imports React or names a Tailwind class; the shapes it is written in
 * are in `types/content.ts`.
 *
 * ⚠️ Every figure below is counted from the repositories themselves, not
 *    estimated. See CLAUDE.md §6 for the commands that produce them and the
 *    rule that they are re-counted rather than nudged.
 */

/* ── Emphasis inside a sentence ───────────────────────────────────── */

const strong = (text: string): RichPart => ({ strong: text });
const mark = (text: string): RichPart => ({ mark: text });

/* ── Who ──────────────────────────────────────────────────────────── */

export const EMAIL = 'nipeerawutdev15@gmail.com';
export const GITHUB_LOGIN = '6531503060-nipeerawut';
export const GITHUB_URL = `https://github.com/${GITHUB_LOGIN}`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/peerawut-nipakornpan-3550a131a';
export const FACEBOOK_URL = 'https://www.facebook.com/nong.off.3';

export const PROFILE = {
  greeting: 'Hello, my name is',
  first: 'Peerawut',
  last: 'Nipakornpan',
  status: 'Open to opportunities',
  location: 'Thailand',

  /**
   * The line under the name. The first entry is what ships in the markup
   * and what a visitor without JavaScript reads; the desktop typewriter
   * cycles the rest.
   */
  roles: ['Junior Full-Stack Developer', 'Web & Mobile Developer', 'Frontend & Backend Developer'],

  intro: [
    'I build features end to end — the database schema, the API behind it, and the screens on top. ',
    'Right now I do that across two production platforms at ',
    strong('Gendee.ai'),
    ': an AI content studio and a national news service that ships as a website, an iOS and Android app, and an editorial desk.',
  ] as RichText,
} as const;

/** The scrolling band under the desktop hero. Decorative on both platforms. */
export const MARQUEE = [
  'Web Development',
  'Mobile Apps',
  'API Design',
  'Database Modelling',
  'Full-Stack Engineering',
  'System Design',
  'Authentication & Access',
  'Responsive Interfaces',
] as const;

/** The four places to find me, in the order the hero lists them. */
export const SOCIALS = [
  { label: 'GitHub', href: GITHUB_URL, icon: 'i-github' },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: 'i-linkedin' },
  { label: 'Facebook', href: FACEBOOK_URL, icon: 'i-facebook' },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: 'i-mail' },
] as const;

/* ── Section headings ─────────────────────────────────────────────── */

export const HEADINGS: Record<Exclude<SectionId, 'home'>, Heading> = {
  about: {
    before: 'I build features ',
    accent: 'end to end',
    after: '.',
    blurb: 'Who I am, where I studied, and the way I like to work.',
  },
  skills: {
    before: 'What I ',
    accent: 'work with',
    after: '.',
    blurb: 'The stack I use day to day, plus what I have shipped with before.',
  },
  experience: {
    before: 'Two products, built ',
    accent: 'in parallel',
    after: '.',
    blurb: 'Where I have worked and what I owned there.',
  },
  work: {
    before: 'Systems I have ',
    accent: 'shipped',
    after: '.',
    blurb:
      'Eight builds that reached real users — schema, API and interface where it says end to end.',
  },
  contact: {
    before: 'Say ',
    accent: 'hello',
    after: '.',
    blurb:
      'Hiring, collaborating, or just comparing notes on something you are building — my inbox is open and I reply to everything.',
  },
};

/* ── About ────────────────────────────────────────────────────────── */

/**
 * Counted up from zero by the desktop script; printed flat on a phone.
 *
 * `short` is the same figure captioned for a tile a third of a phone wide.
 * Truncating the long caption there would hide the noun that gives the number
 * its meaning, and wrapping it to three lines makes a strip of numbers taller
 * than the paragraph above it.
 *
 * 306 is the number of commits authored under this account across the seven
 * repositories listed in CLAUDE.md §6, on the branches named there.
 */
export const STATS = [
  { value: 2, label: 'Platforms in production', short: 'Platforms' },
  { value: 7, label: 'Repositories contributed to', short: 'Repos' },
  { value: 306, label: 'Commits authored', short: 'Commits' },
] as const;

export const BIO = {
  lead: 'Most features I take on start at the database and finish in the browser. I design the tables and access rules, write the API, then build the screens that use them.',
  paragraphs: [
    [
      'That is how I work at ',
      mark('Gendee.ai'),
      ', on two products at once: ',
      strong('Gendee.ai'),
      ', an AI content generation platform where people make images, video, speech and avatars from a shared credit wallet, and ',
      strong('CIRCLE'),
      ', a news service that ships as a mobile app, a website and an editorial desk against one backend. Owning the whole path means the pieces actually fit — no guessing at a contract someone else wrote.',
    ],
    [
      'I graduated in Software Engineering from Mae Fah Luang University, School of Applied Digital Technology. My senior project and my internship both ran inside real operations, where accurate records mattered more than clever code. That shaped how I build: get the data model right first, keep the interface predictable, and write it down so the next person is not stuck.',
    ],
  ] as readonly RichText[],
} as const;

/** `value` is a list of lines, because the education entry needs two. */
export const FACTS = [
  {
    icon: 'i-briefcase',
    key: 'Currently',
    value: ['Junior Full-Stack Developer at Gendee.ai'],
  },
  {
    icon: 'i-cap',
    key: 'Education',
    value: ['B.Eng. Software Engineering', 'Mae Fah Luang University'],
  },
  {
    icon: 'i-code',
    key: 'Focus',
    value: ['Angular, Next.js, Deno edge functions, PostgreSQL'],
  },
  {
    icon: 'i-pin',
    key: 'Based in',
    value: ['Thailand — open to remote & on-site'],
  },
] as const;

/** The two products, as URLs a visitor can open right now. */
export const LIVE_LINKS = [
  {
    name: 'Gendee.ai',
    host: 'gendee.ai',
    href: 'https://gendee.ai/',
    icon: 'i-globe',
    tint: 'var(--brand-1)',
  },
  {
    name: 'CIRCLE',
    host: 'circle-th.com',
    href: 'https://circle-th.com/',
    icon: 'i-news',
    tint: 'var(--brand-4)',
  },
] as const;

/* ── Skills ───────────────────────────────────────────────────────── */

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: 'Frontend',
    meta: 'Interfaces & experience',
    tint: 'var(--brand-1)',
    icon: 'i-code',
    items: [
      {
        name: 'Angular',
        href: 'https://angular.dev/',
        logo: 'logo-angular',
        brand: '#0F0F11',
        brandOnDark: '#e8ecf8',
      },
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        logo: 'logo-nextjs',
        brand: '#000000',
        brandOnDark: '#e8ecf8',
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        logo: 'logo-react',
        brand: '#61DAFB',
        brandOnDark: '#61DAFB',
      },
      {
        name: 'Ionic',
        href: 'https://ionicframework.com/',
        logo: 'logo-ionic',
        brand: '#3880FF',
        brandOnDark: 'hsl(217 100% 72%)',
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        logo: 'logo-tailwind-css',
        brand: '#06B6D4',
        brandOnDark: 'hsl(189 94% 68%)',
      },
      {
        name: 'Flutter',
        href: 'https://flutter.dev/',
        logo: 'logo-flutter',
        brand: '#02569B',
        brandOnDark: 'hsl(207 97% 68%)',
      },
    ],
  },
  {
    title: 'Backend',
    meta: 'APIs & services',
    tint: 'var(--brand-2)',
    icon: 'i-server',
    items: [
      {
        name: 'Supabase',
        href: 'https://supabase.com/',
        logo: 'logo-supabase',
        brand: '#3FCF8E',
        brandOnDark: 'hsl(153 60% 68%)',
      },
      {
        name: 'Go (Fiber)',
        href: 'https://go.dev/',
        logo: 'logo-go-fiber',
        brand: '#00ADD8',
        brandOnDark: 'hsl(192 100% 68%)',
      },
      {
        name: 'Node.js (Express.js)',
        href: 'https://nodejs.org/',
        logo: 'logo-nodejs-expressjs',
        brand: '#5FA04E',
        brandOnDark: 'hsl(108 55% 68%)',
      },
      {
        name: 'Java (Spring Boot)',
        href: 'https://spring.io/projects/spring-boot',
        logo: 'logo-spring-boot',
        brand: '#6DB33F',
        brandOnDark: 'hsl(96 48% 68%)',
      },
    ],
  },
  {
    title: 'Database',
    meta: 'Modelling & integrity',
    tint: 'var(--brand-3)',
    icon: 'i-database',
    items: [
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        logo: 'logo-postgresql',
        brand: '#4169E1',
        brandOnDark: 'hsl(225 73% 68%)',
      },
      {
        name: 'MSSQL',
        href: 'https://www.microsoft.com/en-us/sql-server',
        logo: 'logo-generic-db',
        brand: '#CC2927',
        brandOnDark: 'hsl(1 68% 68%)',
      },
      {
        name: 'MySQL',
        href: 'https://www.mysql.com/',
        logo: 'logo-mysql',
        brand: '#4479A1',
        brandOnDark: 'hsl(206 55% 68%)',
      },
    ],
  },
  {
    title: 'Tools',
    meta: 'Workflow & collaboration',
    tint: 'var(--brand-4)',
    icon: 'i-tools',
    items: [
      {
        name: 'Git',
        href: 'https://git-scm.com/',
        logo: 'logo-git',
        brand: '#F03C2E',
        brandOnDark: 'hsl(4 87% 68%)',
      },
      {
        name: 'GitHub',
        href: 'https://github.com/',
        logo: 'logo-github',
        brand: '#181717',
        brandOnDark: '#e8ecf8',
      },
      {
        name: 'Firebase',
        href: 'https://firebase.google.com/',
        logo: 'logo-firebase',
        brand: '#DD2C00',
        brandOnDark: 'hsl(12 100% 68%)',
      },
      {
        name: 'Swagger',
        href: 'https://swagger.io/',
        logo: 'logo-swagger',
        brand: '#85EA2D',
        brandOnDark: 'hsl(92 82% 68%)',
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        logo: 'logo-postman',
        brand: '#FF6C37',
        brandOnDark: 'hsl(16 100% 68%)',
      },
      {
        name: 'Figma',
        href: 'https://www.figma.com/',
        logo: 'logo-figma',
        brand: '#F24E1E',
        brandOnDark: 'hsl(14 89% 68%)',
      },
    ],
  },
];

/* ── Experience ───────────────────────────────────────────────────── */

export const TIMELINE: readonly Role[] = [
  {
    title: 'Junior Full-Stack Developer',
    org: 'Gendee.ai',
    orgIcon: 'i-building',
    when: ['Jun 2026 – Present'],
    current: true,
    summary: [
      'Two platforms at once — ',
      strong('Gendee.ai'),
      ', an AI content studio, and ',
      strong('CIRCLE'),
      ', a news service on web, mobile and an editorial desk. 306 commits across seven repositories.',
    ],
    highlights: [
      'Shipped three Gendee systems end to end — organizations, courses and notifications — from PostgreSQL schema and policies, through Deno edge functions, to the Angular screens.',
      'Wrote most of the CIRCLE web app from an empty repository: Next.js 16 App Router, TanStack Query, rewards, web push and support tickets.',
      'Connected the CIRCLE reader app and editorial desk to their backend, then collapsed the news schema and moved articles onto English slugs.',
      'Eleven languages, accessibility, unit tests and handover docs throughout.',
    ],
    tags: ['Angular', 'Next.js', 'Ionic', 'Deno', 'Supabase', 'PostgreSQL'],
  },
  {
    title: 'Full Stack Developer Intern',
    org: 'DoiTung',
    orgIcon: 'i-briefcase',
    when: ['Internship', 'Jan 2026 – Apr 2026'],
    current: false,
    summary: [
      'Built ',
      strong('MyTissue'),
      ', an internal system tracking client wood inventory through every processing stage — multi-step workflows with transactional consistency.',
    ],
    highlights: [],
    tags: ['Next.js', 'Go / Fiber', 'MSSQL'],
  },
];

/* ── Work ─────────────────────────────────────────────────────────── */

export const PROJECTS: readonly Project[] = [
  {
    title: 'Gendee for Business',
    org: 'Gendee.ai · B2B',
    blurb: 'One credit wallet per org — roles, live quotas, invites, org-billed top-ups.',
    tags: ['Angular', 'Deno', 'PostgreSQL'],
    icon: 'i-building',
    tint: 'var(--brand-1)',
    badge: { text: 'End to end' },
  },
  {
    title: 'Course Platform',
    org: 'Gendee.ai · Commerce',
    blurb: 'Catalog, enrolment rounds, live-payment checkout, expiring seat holds.',
    tags: ['Angular', 'Deno', 'PostgreSQL'],
    icon: 'i-cap',
    tint: 'var(--brand-2)',
    badge: { text: 'End to end' },
  },
  {
    title: 'Notifications & Push',
    org: 'Gendee.ai · Platform',
    blurb: 'Database triggers fanning out to Firebase Cloud Messaging, and a bell.',
    tags: ['Firebase', 'Deno', 'PostgreSQL'],
    icon: 'i-bell',
    tint: 'var(--brand-3)',
    badge: { text: 'End to end' },
  },
  {
    title: 'CIRCLE Web Platform',
    org: 'CIRCLE · Reader web',
    blurb: 'The news site, written from an empty repository.',
    tags: ['Next.js', 'TanStack', 'Supabase'],
    icon: 'i-globe',
    tint: 'var(--brand-4)',
    badge: { text: 'End to end' },
  },
  {
    title: 'CIRCLE News App',
    org: 'CIRCLE · iOS & Android',
    blurb: 'Accounts, LINE sign-in, saving and sharing, wired end to end.',
    tags: ['Ionic', 'Capacitor', 'Supabase'],
    icon: 'i-news',
    tint: 'var(--brand-1)',
    badge: { text: 'Mobile app' },
  },
  {
    title: 'Editorial Desk',
    org: 'CIRCLE · Newsroom',
    blurb: 'Where the newsroom writes: workflow, categories, staff access.',
    tags: ['Angular', 'Supabase', 'TypeScript'],
    icon: 'i-layers',
    tint: 'var(--brand-2)',
    badge: { text: 'Internal tool' },
  },
  {
    title: 'Operations Dashboard',
    org: 'Gendee.ai · Admin',
    blurb: 'Redeem codes, organizations and per-model success rates.',
    tags: ['Angular', 'Signals', 'Supabase'],
    icon: 'i-gauge',
    tint: 'var(--brand-3)',
    badge: { text: 'Internal tool' },
  },
  {
    title: 'DoiTung Waste Management',
    org: 'Senior project · Mae Fah Luang University',
    blurb: 'Community waste tracking, and a peer-reviewed IEEE paper.',
    tags: ['React', 'Node.js', 'MySQL'],
    icon: 'i-leaf',
    tint: 'var(--brand-4)',
    badge: {
      text: 'IEEE 2026',
      href: 'https://ieeexplore.ieee.org/document/11460046',
      ariaLabel: 'Read the IEEE conference paper on IEEE Xplore',
    },
  },
];

/* ── Contact ──────────────────────────────────────────────────────── */

export const CHANNELS: readonly Channel[] = [
  {
    label: 'LinkedIn',
    handle: 'peerawut-nipakornpan',
    href: LINKEDIN_URL,
    icon: 'i-linkedin',
    tint: '#0a66c2',
  },
  {
    label: 'GitHub',
    handle: GITHUB_LOGIN,
    href: GITHUB_URL,
    icon: 'i-github',
    tint: 'var(--text)',
  },
  {
    label: 'Facebook',
    handle: 'nong.off.3',
    href: FACEBOOK_URL,
    icon: 'i-facebook',
    tint: '#1877f2',
  },
  {
    label: 'Resume',
    handle: 'PDF, one page',
    href: RESUME_HREF,
    icon: 'i-download',
    tint: 'var(--brand-2)',
    download: true,
  },
];

/** Every repository, for the link out of the Work section. */
export const REPOSITORIES_URL = `${GITHUB_URL}?tab=repositories`;
