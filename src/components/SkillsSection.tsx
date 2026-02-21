import { motion } from "framer-motion";
import { Code2, Server, Cloud, Cpu, Database, Layers } from "lucide-react";

const skills = [
  { icon: Code2, title: "Frontend", desc: "React, TypeScript, Next.js, Tailwind" },
  { icon: Server, title: "Backend", desc: "Node.js, Python, Go, REST/GraphQL" },
  { icon: Cloud, title: "Cloud & DevOps", desc: "AWS, Docker, Kubernetes, CI/CD" },
  { icon: Database, title: "Data", desc: "PostgreSQL, MongoDB, Redis, Kafka" },
  { icon: Cpu, title: "Systems", desc: "Microservices, Event-Driven, DDD" },
  { icon: Layers, title: "Architecture", desc: "System Design, Scalability, Security" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">What I Do</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Full-Stack, <span className="text-gradient">Full-Throttle</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-5 sm:p-6 rounded-xl bg-card glow-border card-warm hover:bg-surface-hover transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                <skill.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
