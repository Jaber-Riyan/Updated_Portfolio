export type SectionKey =
  | "hero"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "reviews"
  | "blogs"
  | "contact";

export type SectionTheme = {
  bg: string;
  text: string;
  accent: string;
  bgImage: string;
};

export type GreetingCardContent = {
  enabled: boolean;
  title: string;
  message: string;
  image: string;
  bgColor: string;
  textColor: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ProjectGithubLink = {
  id: string;
  label: string;
  url: string;
};

export type ThemeConfig = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  muted: string;
  panel: string;
  animationSpeed: number;
  sections: Record<SectionKey, SectionTheme>;
};

export type HeroContent = {
  name: string;
  role: string;
  headline: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  availability: string;
  primaryCta: string;
  secondaryCta: string;
};

export type AboutContent = {
  intro: string;
  journey: string;
  work: string;
  hobbies: string;
  belief: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  location: string;
  description: string;
  impact: string[];
};

export type Project = {
  id: string;
  title: string;
  image: string;
  techStack: string[];
  summary: string;
  description: string;
  github: string;
  githubLinks: ProjectGithubLink[];
  live: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  period: string;
  summary: string;
};

export type Review = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type Blog = {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  body: string;
  tags: string[];
  link: string;
  readTime: string;
};

export type ContactContent = {
  headline: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
  x: string;
};

export type PortfolioContent = {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  reviews: Review[];
  blogs: Blog[];
  contact: ContactContent;
  greeting: GreetingCardContent;
  theme: ThemeConfig;
};

export type Route =
  | { type: "home" }
  | { type: "admin" }
  | { type: "project"; id: string }
  | { type: "blog"; id: string }
  | { type: "allProjects" }
  | { type: "allBlogs" };

export type SectionThemeRecord = Record<SectionKey, SectionTheme>;
