export const personalInfo = {
  name: "Tahmina Fayezi",
  initials: "TF",
  role: "Software Engineer",
  location: "Buffalo, NY",
  subtitle: "CS student & builder",
  bio: "Hi! I'm Tahmina! I love building thoughtful, purposeful software, from personal websites to award-winning AI tools. I have an interest in full stack web development, and am open to learning more about my passion. Outside of Computer Science, I also love to travel, read, and write poetry. Feel free to reach out and say hi!",
  aboutP1:
    "I'm a first-generation Computer Science student at the University at Buffalo with a passion for building software that is both beautiful and purposeful. I thrive at the intersection of design and engineering — whether crafting full-stack web applications, exploring AI-powered tools, or leading community initiatives.",
  aboutP2:
    "Outside of code, I serve as Director of Partnerships at UB Forge — connecting ambitious student builders with the resources, people, and ideas they need to turn projects into companies.",
  resumeUrl:
    "https://drive.google.com/file/d/1zJtxPu85N2N7uXTKHzYcfjfZISZI1U99/view?usp=sharing",
  email: "tahmina.fayezi33@gmail.com",
  github: "https://github.com/tahminaf",
  linkedin: "https://www.linkedin.com/in/tahmina-fayezi/",
  quote: "Ideas into action, builders into leaders.",
  quoteAttr: "— UB Forge",
};

export const skills = [
  { label: "React", variant: "emerald" },
  { label: "TypeScript", variant: "emerald" },
  { label: "Angular", variant: "emerald" },
  { label: "ASP.NET Core", variant: "emerald" },
  { label: "PHP", variant: "gold" },
  { label: "SQL / T-SQL", variant: "gold" },
  { label: "Tailwind CSS", variant: "emerald" },
  { label: "Next.js", variant: "emerald" },
  { label: "Python", variant: "gold" },
  { label: "Java", variant: "gold" },
  { label: "Node.js", variant: "emerald" },
  { label: "JWT / OAuth 2.0", variant: "emerald" },
] as const;

/* ─── Experiences ─────────────────────────────────────── */

export type ExperienceType = "work" | "education" | "clubs" | "coursework";

export interface Experience {
  type: ExperienceType;
  org: string;
  role: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
  dark?: boolean;
  previewImg?: string;
}

export const experiences: Record<ExperienceType, Experience[]> = {
  education: [
    {
      type: "education",
      org: "University at Buffalo",
      role: "B.S. in Computer Science — Honors College",
      location: "Buffalo, NY",
      period: "2022 – 2027 (Expected)",
      description:
        "Focusing on software engineering, algorithms, and data structures. Active in CS organizations and hackathons.",
      achievements: [
        "Dean's List: Fall 2023, Spring 2024, Fall 2024, Spring 2025",
        "GPA: 3.8 / 4.0",
      ],
      skills: [
        "Data Structures",
        "Algorithms & Complexity",
        "Systems Engineering",
        "Computer Organization",
        "Discrete Structures",
      ],
    },
  ],
  work: [
    {
      type: "work",
      org: "M&T Bank",
      role: "Software Engineering Intern",
      location: "Buffalo, NY",
      period: "June 2025 – August 2025",
      description:
        "Built full-stack web apps using Angular, ASP.NET Core, and SQL. Delivered 15+ API endpoints and collaborated with stakeholders to refine features. Worked in an Agile team to meet sprint goals.",
      achievements: [
        "Developed 15+ secure, scalable API endpoints.",
        "Refined features based on real-time user feedback.",
        "Contributed to 100% on-time delivery of sprint goals within Agile development team over 10-week internship.",
      ],
      skills: ["Angular", "ASP.NET Core", "T-SQL"],
      dark: true,
    },
    {
      type: "work",
      org: "PwC — Tax Innovation",
      role: "Software Engineering Intern",
      location: "New York, NY",
      period: "Summer 2026 (Upcoming)",
      description:
        "Incoming software engineering intern on the Tax Innovation team, building internal tools and systems that streamline tax workflows at scale.",
      achievements: [],
      skills: [],
      dark: true,
    },
  ],
  clubs: [
    {
      type: "clubs",
      org: "UB Forge",
      role: "Director of Partnerships",
      location: "University at Buffalo",
      period: "June 2025 – Present",
      description:
        "Lead partnerships for UB Forge, a collective of ambitious student builders where ideas turn into action. Foster connections between engineers, artists, designers, and founders to build the next generation of innovative projects and startups together.",
      achievements: [
        "Connect students with UB alumni network in Silicon Valley and startup founders from top tech companies.",
        "Facilitate collaborations across majors and skill levels, from first projects to potential billion-dollar ideas.",
        "Create an inclusive launchpad environment where students transform from builders into leaders through community-driven innovation.",
      ],
      skills: [
        "Community Building",
        "Cross-functional Collaboration",
        "Alumni Relations",
        "Startup Ecosystem Development",
      ],
    },
  ],
  coursework: [
    {
      type: "coursework",
      org: "Codepath",
      role: "Interview Prep Course",
      location: "Remote",
      period: "September 2024 – May 2025",
      description:
        "Completed a rigorous software engineering interview prep course focused on data structures, algorithms, and coding strategies.",
      achievements: [
        "Implemented 10+ coding projects using 20+ data structures.",
        "Solved 30+ medium/hard LeetCode problems with efficient algorithms.",
        "Studied best practices for tackling common technical interview questions.",
      ],
      skills: ["Data Structures", "Algorithms", "Problem Solving", "Technical Interviews"],
    },
  ],
};

export const experienceGroups: { key: ExperienceType; label: string }[] = [
  { key: "education", label: "education" },
  { key: "work", label: "work experience" },
  { key: "clubs", label: "leadership & organizations" },
  { key: "coursework", label: "relevant coursework" },
];

/* ─── Projects ────────────────────────────────────────── */

export interface Project {
  num: string;
  cat: string;
  title: string;
  description: string;
  tech: string[];
  winner?: string;
  link?: string;
  liveLink?: string;
  links?: { label: string; url: string }[];
  dark?: boolean;
}

export const projects: Project[] = [
  {
    num: "01",
    cat: "Hackathon · AI/ML",
    title: "EASE",
    description:
      "Enhanced Arthritis Support and Exercise — winner of the AI/ML track at UB Hacking 2025! Using computer vision, users complete arthritis exercises with real-time form monitoring. A RAG-based voice AI agent lets users navigate the app and learn all things arthritis.",
    tech: ["React", "Node.js", "Express.js", "Firebase", "MediaPipe", "Gemini AI", "ElevenLabs", "Tailwind CSS", "Framer Motion"],
    winner: "★ AI/ML Track Winner — UB Hacking 2025",
    links: [
      { label: "View on Devpost", url: "https://devpost.com/software/eas-e" },
      { label: "View on GitHub", url: "https://github.com/mafruhamanal/ease" },
    ],
    dark: true,
  },
  {
    num: "02",
    cat: "Full-stack · Team",
    title: "Saath",
    description:
      "Campus event discovery platform for UB students. Features RSVP functionality, organization creation, event management, co-organizer support, and JWT authentication.",
    tech: ["React", "PHP", "MySQL", "JWT"],
  },
  {
    num: "03",
    cat: "Client · Web",
    title: "Amal Pilates",
    description:
      "A full-stack Pilates studio website serving 800+ weekly users with class scheduling, instructor profiles, and user registration. Features responsive design and interactive booking capabilities, demonstrating real-world application development at scale.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/tahminaf/Amal-Pilates-Website",
  },
  {
    num: "04",
    cat: "Full-stack · Productivity",
    title: "StudySync",
    description:
      "Your all-in-one productivity platform for students — eliminating the chaos of scattered notes and deadlines. Supports notes, tasks, and schedules across 5 content types with daily reminders and real-time search. Firebase keeps your study life synced across all devices.",
    tech: ["React", "TypeScript", "Next.js", "Firebase", "Tailwind CSS"],
    link: "https://github.com/tahminaf/StudySync",
  },
  {
    num: "05",
    cat: "Full-stack · Entertainment",
    title: "Super Hero Catalog",
    description:
      "A comprehensive full-stack application showcasing 4000+ superhero films with dynamic search and rating capabilities. Users can rate movies, discover hidden gems, and explore a vast database of superhero content — secured with JWT authentication and bcrypt hashing.",
    tech: ["React", "TypeScript", "Spring Boot", "Java", "PostgreSQL"],
  },
  {
    num: "06",
    cat: "Client · Web",
    title: "Century Medical Services",
    description:
      "Primary care practice website with SEO optimization, Google Reviews integration, service carousels, FAQ pages, and contact forms.",
    tech: ["React", "Vite", "Tailwind CSS", "SEO"],
    liveLink: "https://www.centurymedicalservices.org/",
  },
  {
    num: "07",
    cat: "Client · Web",
    title: "Century Longevity & Aesthetics",
    description:
      "Med spa website with a luxury aesthetic, service showcases, Google Reviews integration, membership info, and a fully responsive layout.",
    tech: ["React", "Vite", "Tailwind CSS", "SEO"],
    liveLink: "https://www.centuryaesthetics.org/",
  },
];

/* ─── Nav ─────────────────────────────────────────────── */

export const navItems = [
  { id: "home", label: "home" },
  { id: "tech", label: "toolkit" },
  { id: "archive", label: "archive" },
  { id: "experiences", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];