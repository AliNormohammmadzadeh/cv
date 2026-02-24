import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Server, Cloud, Database, Brain, GitBranch } from "lucide-react";

const skillCategories = [
  {
    icon: Brain,
    title: "AI & LLMs",
    skills: ["OpenAI", "Gemini", "Anthropic", "Ollama", "Hugging Face", "LangChain", "LlamaIndex"],
  },
  {
    icon: Database,
    title: "Vector DBs & RAG",
    skills: ["Pinecone", "CFVector", "Weaviate", "PGVector", "Embeddings", "Semantic Search"],
  },
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "NestJS", "Python", "FastAPI", "REST", "GraphQL", "GO"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "Nginx",  "Git"],
  },
  {
    icon: GitBranch,
    title: "Data & Tools",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "Prisma", "ClickHouse"],
  },
];

const SkillCard = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 25, mass: 0.4 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-1, 1], [18, -18]);
  const rotateY = useTransform(xSpring, [-1, 1], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="scroll-reveal relative"
      style={{ perspective: 800, animationDelay: `${index * 60}ms` }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group h-full glass rounded-2xl p-6 sm:p-8 cursor-pointer relative"
      >
        <motion.div
          style={{ translateZ: 60 }}
          className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 group-hover:scale-110 group-hover:rotate-6 transition-[background-color,transform] duration-500"
        >
          <category.icon size={24} className="text-primary" />
        </motion.div>

        <motion.h3
          style={{ translateZ: 45 }}
          className="text-xl font-black mb-4 kinetic-text"
        >
          {category.title}
        </motion.h3>

        <motion.div style={{ translateZ: 30 }} className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <span
              key={skill}
              className="kinetic-text-fast text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-[background-color,border-color,transform] duration-300 cursor-default"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {skill}
            </span>
          ))}
        </motion.div>

        <motion.div
          style={{
            left: useTransform(xSpring, [-1, 1], ["0%", "100%"]),
            top: useTransform(ySpring, [-1, 1], ["0%", "100%"]),
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-40 h-40 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="py-20 sm:py-32 px-4 sm:px-6 relative"
      style={{ background: "linear-gradient(180deg, hsl(270 30% 8% / 0.7) 0%, hsl(260 25% 6% / 0.5) 50%, hsl(250 20% 7% / 0.6) 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="scroll-reveal mb-12 sm:mb-20">
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">
            What I Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
