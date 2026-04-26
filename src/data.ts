import type { ThemeConfig, PortfolioContent, SectionKey } from "./types";

export const sectionLabels: Record<SectionKey, string> = {
  hero: "Hero",
  about: "About",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  reviews: "Review",
  blogs: "Blogs",
  contact: "Contact",
};

export const sectionKeys = Object.keys(sectionLabels) as SectionKey[];
export const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
export const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

declare global {
  interface ImportMeta {
    env: Record<string, string | undefined>;
  }
}

export const defaultTheme: ThemeConfig = {
  primary: "#7c3aed",
  secondary: "#06b6d4",
  background: "#09090f",
  text: "#f8fafc",
  muted: "#a1a1aa",
  panel: "#11111a",
  animationSpeed: 1,
  sections: {
    hero: { bg: "#09090f", text: "#f8fafc", accent: "#a78bfa", bgImage: "" },
    about: { bg: "#0b0b13", text: "#f8fafc", accent: "#38bdf8", bgImage: "" },
    skills: { bg: "#0d0d16", text: "#f8fafc", accent: "#22d3ee", bgImage: "" },
    experience: { bg: "#09090f", text: "#f8fafc", accent: "#a78bfa", bgImage: "" },
    projects: { bg: "#0d0d16", text: "#f8fafc", accent: "#f0abfc", bgImage: "" },
    education: { bg: "#09090f", text: "#f8fafc", accent: "#67e8f9", bgImage: "" },
    reviews: { bg: "#0d0d16", text: "#f8fafc", accent: "#c4b5fd", bgImage: "" },
    blogs: { bg: "#09090f", text: "#f8fafc", accent: "#93c5fd", bgImage: "" },
    contact: { bg: "#0d0d16", text: "#f8fafc", accent: "#86efac", bgImage: "" },
  },
};

export const defaultContent: PortfolioContent = {
  hero: {
    name: "Jaber Ahmed Riyan",
    role: "Junior Full Stack Developer",
    headline: "I build practical full-stack web applications with React, TypeScript, Node.js, Express, and MongoDB.",
    description: "A passionate full-stack developer focused on clean user interfaces, robust REST APIs, scalable databases, and real-world problem solving across the JavaScript and TypeScript ecosystem.",
    location: "Bangladesh | Open to remote opportunities",
    email: "jaber@example.com",
    phone: "+880 1700 000000",
    profileImage: "",
    availability: "Available for junior web developer, MERN stack, and full-stack roles",
    primaryCta: "View Projects",
    secondaryCta: "About Me",
  },
  about: {
    intro: "Hi, I am Jaber Ahmed Riyan. I am a full stack developer passionate about crafting full-stack solutions that solve real-world problems. From sleek React interfaces to robust Node.js APIs, I bridge creativity and functionality. I thrive in the TypeScript ecosystem, building RESTful APIs with Express JS and Node JS, designing NoSQL databases with MongoDB and Mongoose, and creating dynamic UIs using React JS and Tailwind CSS.",
    journey: "My journey into programming started with a simple question: why am I learning this, and will it truly impact my life? That curiosity turned into passion. I built fundamentals through Phitron Batch-3 with C, C++, Data Structures and Algorithms, MySQL, and Python. Later I explored Python and Django, then joined Programming Hero Level-1 Batch-10 to master HTML, CSS, JavaScript, React, Firebase, Node.js, Express.js, MongoDB, Git, and GitHub. In the Endgame Phase I worked as Backend Developer and Team Leader on a team project, learning collaboration, API architecture, and project management. I am currently in Programming Hero Level-2 Batch-5, diving deeper into TypeScript, Mongoose, Passport JS, Redis, PostgreSQL, Redux, and RTK Query.",
    work: "I love challenging projects that push my limits and sharpen my skills. Whether it is solving complex backend logic, optimizing performance, designing intuitive UIs, or transforming unclear requirements into functional products, I enjoy turning problems into elegant solutions.",
    hobbies: "Outside coding, I enjoy watching movies, exploring new technologies, improving English communication skills, watching tech podcasts and tutorials, traveling, and discovering hidden places that inspire fresh perspectives.",
    belief: "To me, coding is not just syntax. It is solving real problems that make people's lives easier. As a Junior Web Developer, I am focused on growing my expertise, learning industry best practices, and building meaningful projects that create impact.",
  },
  skills: [
    { id: "languages", title: "Programming Languages", items: ["C", "C++", "Python", "JavaScript", "TypeScript"] },
    { id: "frontend-development", title: "Frontend Development", items: ["HTML5", "CSS3", "React JS", "Redux", "RTK Query", "Next JS", "Firebase", "Tailwind CSS", "Bootstrap", "Daisy UI", "Headless UI", "Origin UI", "ShadCN UI"] },
    { id: "backend-development", title: "Backend Development", items: ["Node JS", "Express JS", "Mongoose", "Passport JS", "RESTful APIs", "Socket.IO", "Node Mailer"] },
    { id: "databases", title: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL", "Redis"] },
    { id: "payments", title: "Payment Gateways", items: ["Stripe", "SSL Commerz"] },
    { id: "data-structures-algorithms", title: "Data Structures & Algorithms", items: ["Singly Linked List", "Double Linked List", "Stack", "Queue", "Priority Queue", "Binary Tree", "BST", "Heap", "STL", "Graph Basics", "BFS", "DFS", "2D Grid", "Dijkstra Algorithm", "Bellman Ford Algorithm", "Floyd Warshall Algorithm", "Dynamic Programming", "0-1 Knapsack", "Unbounded Knapsack", "LCS DP", "Minimum Spanning Tree"] },
    { id: "devops-tools", title: "Tools, DevOps & Infrastructure", items: ["Git", "GitHub", "Cloudinary", "Redux DevTools", "React DevTools", "Axios", "Nginx", "VPS", "CI/CD"] },
  ],
  experience: [
    { id: "orbitly", role: "Backend Developer & Team Leader", company: "Programming Hero Endgame Team Project", companyUrl: "https://web.programming-hero.com/", period: "2024", location: "Remote, Bangladesh", description: "Led backend delivery for a collaborative team project after completing Programming Hero Level-1, focusing on API architecture and project coordination.", impact: ["Designed RESTful API flows with Node.js, Express.js, MongoDB, and Mongoose.", "Coordinated backend tasks, team communication, and feature integration.", "Practiced real-world GitHub collaboration, reviews, and delivery planning."] },
    { id: "fincrate", role: "Full Stack Web Development Trainee", company: "Programming Hero Level-2 Batch-5", companyUrl: "https://web.programming-hero.com/", period: "2025 - Present", location: "Bangladesh", description: "Deepening production-ready full-stack skills with TypeScript, Mongoose, Passport JS, Redis, PostgreSQL, Redux, and RTK Query.", impact: ["Building stronger backend architecture and authentication patterns.", "Practicing advanced state management and scalable frontend data flows.", "Improving code quality with TypeScript-first development habits."] },
    { id: "brightapps", role: "Programming Fundamentals Learner", company: "Phitron Batch-3", companyUrl: "https://phitron.io/", period: "2023 - 2024", location: "Bangladesh", description: "Built the core programming foundation needed for long-term software engineering growth.", impact: ["Learned C, C++, Data Structures and Algorithms, MySQL, and Python.", "Developed problem-solving habits through fundamentals and DSA practice."] },
  ],
  projects: [
    { id: "nova-commerce", title: "Nova Commerce Engine", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80", techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"], summary: "Composable commerce platform for subscriptions, inventory, and checkout operations.", description: "Built multi-tenant commerce workflows with role-based admin tools, Stripe billing, inventory reservation, webhook recovery, and operational analytics for growth teams.", github: "https://github.com/username/nova-commerce", githubLinks: [{ id: "client", label: "Client Side", url: "https://github.com/username/nova-commerce-client" }, { id: "server", label: "Server Side", url: "https://github.com/username/nova-commerce-server" }, { id: "admin", label: "Admin Side", url: "https://github.com/username/nova-commerce-admin" }], live: "https://nova-commerce.example.com" },
    { id: "signaldesk", title: "SignalDesk AI Ops", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80", techStack: ["Next.js", "OpenAI", "Prisma", "Redis", "Docker"], summary: "Incident intelligence workspace that summarizes alerts and suggests next actions.", description: "Created an AI-assisted incident command center with alert clustering, timeline generation, Slack handoff, and postmortem drafting for engineering teams.", github: "https://github.com/username/signaldesk", githubLinks: [{ id: "fullstack", label: "Fullstack Repo", url: "https://github.com/username/signaldesk" }], live: "https://signaldesk.example.com" },
    { id: "atlas-crm", title: "Atlas CRM Suite", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80", techStack: ["TypeScript", "NestJS", "GraphQL", "PostgreSQL", "Vercel"], summary: "CRM for pipeline forecasting, account health, and executive reporting.", description: "Implemented a data-rich CRM with GraphQL APIs, permissions, activity streams, import jobs, and executive dashboards used by revenue teams.", github: "https://github.com/username/atlas-crm", githubLinks: [{ id: "client", label: "Client Side", url: "https://github.com/username/atlas-crm-client" }, { id: "api", label: "API Server", url: "https://github.com/username/atlas-crm-api" }], live: "https://atlas-crm.example.com" },
  ],
  education: [
    { id: "btech", degree: "B.Tech in Computer Science", school: "National Institute of Technology", period: "2013 - 2017", summary: "Focused on distributed systems, software engineering, data structures, and database design." },
    { id: "cert", degree: "AWS Certified Developer Associate", school: "Amazon Web Services", period: "2023", summary: "Validated experience building cloud-native applications with serverless, storage, and CI/CD workflows." },
  ],
  reviews: [
    { id: "maya", quote: "Aarav thinks like a product owner and ships like a systems engineer. He turned a risky rebuild into a calm, measurable release.", author: "Maya Rao", role: "VP Product, Orbitly Cloud" },
    { id: "liam", quote: "He is the engineer you want in ambiguous work. Clear architecture, direct communication, and excellent mentoring instincts.", author: "Liam Chen", role: "Engineering Manager, Fincrate Labs" },
  ],
  blogs: [
    { id: "api-boundaries", title: "Designing API Boundaries That Survive Product Change", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=80", excerpt: "A practical way to keep APIs stable while product workflows evolve quickly.", body: "Strong API boundaries start with business capabilities, not database tables. This article covers versioning, idempotency, schema ownership, and the tradeoffs that keep teams moving without creating accidental platform debt.", tags: ["Architecture", "APIs", "Backend"], link: "https://example.com/blog/api-boundaries", readTime: "7 min read" },
    { id: "animation-with-purpose", title: "Using Motion Without Making Interfaces Noisy", image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1100&q=80", excerpt: "How I decide where animation helps hierarchy, feedback, and perceived performance.", body: "Animation should clarify state, guide attention, and reinforce brand rhythm. The post explains timing, scroll-triggered reveals, reduced-motion support, and why fewer animations often feel more premium.", tags: ["Frontend", "UX", "GSAP"], link: "https://example.com/blog/animation-with-purpose", readTime: "5 min read" },
  ],
  contact: {
    headline: "Need a fullstack engineer who can own the whole product surface?",
    description: "Send a note with the problem, team shape, and timeline. I usually reply within one business day.",
    email: "jaber@example.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    x: "https://x.com/username",
  },
  greeting: {
    enabled: true,
    title: "Welcome to Jaber's portfolio",
    message: "Explore full-stack projects, skills, blogs, and the engineering journey behind them.",
    image: "",
    bgColor: "#0f172a",
    textColor: "#ffffff",
    ctaLabel: "Enter Portfolio",
    ctaHref: "#top",
  },
  theme: defaultTheme,
};
