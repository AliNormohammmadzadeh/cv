/**
 * Central, serializable source of truth for all structured content on the site.
 *
 * The React sections import the presentation-rich arrays below (which carry
 * `iconKey` + styling hints), while the Data Explorer consumes the derived
 * `datasets` registry, whose `records` are plain JSON-safe objects. Deriving the
 * registry from the same arrays guarantees the exported data always matches what
 * visitors actually see on the page.
 */

export type IconKey =
  | "Server"
  | "Database"
  | "Code2"
  | "Brain"
  | "Cloud"
  | "GitBranch"
  | "Layers"
  | "Rocket"
  | "Cpu"
  | "TrendingUp"
  | "Workflow"
  | "Sparkles"
  | "Shield"
  | "Github"
  | "Linkedin"
  | "Twitter";

export interface SocialLink {
  label: string;
  href: string;
  iconKey: IconKey;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  roles: string[];
  tagline: string;
  email: string;
  telegram: string;
  telegramHref: string;
  availability: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Ali Normohammadzadeh",
  firstName: "Ali",
  lastName: "Normohammadzadeh",
  title: "Software Engineer",
  roles: ["Software Engineer", "Product Builder", "Tech Enthusiast"],
  tagline:
    "I architect robust software solutions and leverage AI & RAG to build intelligent, scalable products.",
  email: "alinormohammadzadeh2080@gmail.com",
  telegram: "@Alind2n",
  telegramHref: "https://t.me/Alind2n",
  availability: "Available for new projects",
  socials: [
    { label: "GitHub", href: "https://github.com/AliNormohammmadzadeh", iconKey: "Github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ali-normohammadzadeh-77495822a/",
      iconKey: "Linkedin",
    },
    { label: "X / Twitter", href: "https://x.com/tebalen", iconKey: "Twitter" },
  ],
};

export interface SkillCategory {
  title: string;
  iconKey: IconKey;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    iconKey: "Server",
    skills: ["Node.js", "NestJS", "Python", "GO", "FastAPI", "REST", "GraphQL", "gRPC"],
  },
  {
    title: "Vector DBs & RAG",
    iconKey: "Database",
    skills: ["Pinecone", "CFVector", "Weaviate", "PGVector", "Embeddings", "Semantic Search"],
  },
  {
    title: "Frontend",
    iconKey: "Code2",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    title: "AI & LLMs",
    iconKey: "Brain",
    skills: [
      "OpenAI",
      "Gemini",
      "Anthropic",
      "Ollama",
      "Hugging Face",
      "LangChain",
      "LlamaIndex",
      "n8n",
    ],
  },
  {
    title: "Cloud & DevOps",
    iconKey: "Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "Nginx", "Git"],
  },
  {
    title: "DBs & Tools",
    iconKey: "GitBranch",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "Prisma", "ClickHouse"],
  },
];

export interface Project {
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Wikija",
    role: "Software Engineer",
    description:
      "Developed a large-scale data aggregation platform utilizing advanced crawling bots and scrapers to consolidate accommodation data for optimized decision making.",
    tags: ["NestJS", "Python", "FastAPI", "Crawling", "PostgreSQL", "Elasticsearch", "Redis", "Kafka"],
  },
  {
    title: "Intelika AI",
    role: "Backend Developer",
    description:
      "Architected a real-time AI workspace platform featuring multi-user collaboration and intelligent chatbots. Implemented microservices and RAG-based AI features.",
    tags: [
      "Microservices",
      "NestJS",
      "WebSocket",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Cloudflare Vector",
      "RAG",
      "gRPC",
    ],
  },
  {
    title: "License Market",
    role: "Backend Developer",
    description:
      "Built an automated account procurement platform with microservices architecture, streamlining operations for operators and accelerating transaction speeds.",
    tags: ["Microservices", "NestJS", "RabbitMQ", "PostgreSQL", "Prisma", "Redis"],
  },
];

export interface Principle {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  iconKey: IconKey;
  accent: string;
  iconBg: string;
  borderAccent: string;
}

export const principles: Principle[] = [
  {
    title: "AI-Native Architecture",
    subtitle: "From LLMs to Production",
    description:
      "I design AI systems that go beyond prototypes. RAG pipelines, LLM orchestration, vector search, and intelligent agents — built for reliability at scale.",
    highlights: ["RAG & Vector Search", "LLM Orchestration", "AI Agent Systems", "Production Pipelines"],
    iconKey: "Brain",
    accent: "from-purple-500/20 to-blue-500/20",
    iconBg: "bg-purple-500/15",
    borderAccent: "group-hover:border-purple-500/30",
  },
  {
    title: "Systems That Scale",
    subtitle: "Microservices & Beyond",
    description:
      "Event-driven microservices, distributed systems, and infrastructure designed to handle millions of requests. I think in throughput, latency, and fault tolerance.",
    highlights: ["Event-Driven Design", "Distributed Systems", "High Availability", "Performance Tuning"],
    iconKey: "Layers",
    accent: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/15",
    borderAccent: "group-hover:border-blue-500/30",
  },
  {
    title: "Ship Fast, Ship Right",
    subtitle: "Velocity Without Compromise",
    description:
      "I move fast without breaking things. CI/CD pipelines, automated testing, and clean architecture that lets teams iterate quickly while maintaining quality.",
    highlights: ["CI/CD Automation", "Clean Architecture", "Rapid Prototyping", "Developer Experience"],
    iconKey: "Rocket",
    accent: "from-pink-500/20 to-orange-500/20",
    iconBg: "bg-pink-500/15",
    borderAccent: "group-hover:border-pink-500/30",
  },
];

export interface Metric {
  value: string;
  label: string;
  iconKey: IconKey;
}

export const metrics: Metric[] = [
  { value: "3+", label: "Production AI Systems", iconKey: "Cpu" },
  { value: "10+", label: "Microservices Built", iconKey: "Layers" },
  { value: "RAG", label: "Pipeline Specialist", iconKey: "Brain" },
  { value: "Full", label: "Stack Coverage", iconKey: "TrendingUp" },
];

export interface RoadmapItem {
  num: string;
  title: string;
  description: string;
  iconKey: IconKey;
  gradient: string;
  glowColor: string;
}

export const buildingNext: RoadmapItem[] = [
  {
    num: "01",
    title: "AI Workflow Automation",
    description:
      "Intelligent automation pipelines with n8n and custom AI agents that eliminate repetitive engineering tasks.",
    iconKey: "Workflow",
    gradient: "from-purple-500/10 via-transparent to-blue-500/10",
    glowColor: "group-hover:shadow-purple-500/10",
  },
  {
    num: "02",
    title: "Developer-First AI Tools",
    description:
      "API-first developer tools that integrate LLMs into existing workflows — amplifying engineers, not replacing them.",
    iconKey: "Sparkles",
    gradient: "from-blue-500/10 via-transparent to-cyan-500/10",
    glowColor: "group-hover:shadow-blue-500/10",
  },
  {
    num: "03",
    title: "Enterprise-Grade RAG",
    description:
      "Production RAG systems with advanced retrieval, re-ranking, and guardrails for enterprise use cases.",
    iconKey: "Shield",
    gradient: "from-pink-500/10 via-transparent to-purple-500/10",
    glowColor: "group-hover:shadow-pink-500/10",
  },
];

/** A JSON-safe record: the atomic unit exported into a dataset row. */
export type DataRecord = Record<string, unknown>;

export interface Dataset {
  /** Stable machine id, also used in filenames and multi-dataset keys. */
  id: string;
  /** Human friendly name. */
  name: string;
  /** What the dataset contains. */
  description: string;
  /** Logical grouping used by the explorer's group toggles. */
  group: string;
  /** Plain, serializable rows. */
  records: DataRecord[];
}

/**
 * The dataset registry consumed by the Data Explorer. Every `records` array is
 * derived from the presentation data above so there is no risk of drift.
 */
export const datasets: Dataset[] = [
  {
    id: "profile",
    name: "Profile",
    description: "Core identity: name, title, roles, tagline and contact channels.",
    group: "Profile",
    records: [
      {
        name: profile.name,
        title: profile.title,
        roles: profile.roles,
        tagline: profile.tagline,
        email: profile.email,
        telegram: profile.telegram,
        availability: profile.availability,
      },
    ],
  },
  {
    id: "social_links",
    name: "Social Links",
    description: "Public profiles and where to find me online.",
    group: "Profile",
    records: profile.socials.map((s) => ({ label: s.label, href: s.href })),
  },
  {
    id: "skills",
    name: "Skills",
    description: "Technical skill categories and the tools within each.",
    group: "Portfolio",
    records: skillCategories.map((c) => ({ category: c.title, skills: c.skills })),
  },
  {
    id: "projects",
    name: "Projects",
    description: "Professional projects with role, summary and tech stack.",
    group: "Portfolio",
    records: projects.map((p) => ({
      title: p.title,
      role: p.role,
      description: p.description,
      tags: p.tags,
    })),
  },
  {
    id: "philosophy",
    name: "Engineering Philosophy",
    description: "Guiding engineering principles and their focus areas.",
    group: "Vision",
    records: principles.map((p) => ({
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      highlights: p.highlights,
    })),
  },
  {
    id: "metrics",
    name: "Metrics",
    description: "Headline numbers that summarize experience.",
    group: "Vision",
    records: metrics.map((m) => ({ value: m.value, label: m.label })),
  },
  {
    id: "roadmap",
    name: "Roadmap",
    description: "What I'm actively building next.",
    group: "Vision",
    records: buildingNext.map((b) => ({
      step: b.num,
      title: b.title,
      description: b.description,
    })),
  },
];

export const getDatasetById = (id: string): Dataset | undefined =>
  datasets.find((d) => d.id === id);
