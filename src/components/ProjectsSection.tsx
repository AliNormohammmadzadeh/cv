import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";

const projects = [
  {
    title: "CloudSync Engine",
    desc: "Real-time data synchronization platform with conflict resolution. Built for distributed teams needing offline-first capabilities.",
    tags: ["TypeScript", "WebSocket", "CRDTs", "PostgreSQL"],
    status: "In Progress",
  },
  {
    title: "DevFlow CLI",
    desc: "A developer productivity CLI that automates repetitive workflows — from scaffolding to deployment pipelines.",
    tags: ["Go", "Docker", "CI/CD", "REST API"],
    status: "Planned",
  },
  {
    title: "IntelliBoard",
    desc: "AI-powered analytics dashboard that transforms raw data into actionable insights with natural language queries.",
    tags: ["React", "Python", "OpenAI", "D3.js"],
    status: "Planned",
  },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/15 text-primary",
  "Planned": "bg-amber-500/15 text-amber-400",
  "Live": "bg-emerald-500/15 text-emerald-400",
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects I'm <span className="text-gradient">Building</span>
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-xl bg-card glow-border hover:bg-surface-hover transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-xl leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 md:mt-1">
                  <a href="#" className="p-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors">
                    <Github size={18} />
                  </a>
                  <a href="#" className="p-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
