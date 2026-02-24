import { ExternalLink, Github } from "lucide-react";

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
  "In Progress": "bg-primary/20 text-primary border border-primary/20",
  Planned: "bg-accent/20 text-accent border border-accent/20",
  Live: "bg-emerald-500/20 text-emerald-400 border border-emerald-400/20",
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="py-12 sm:py-20 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, hsl(250 50% 12%) 0%, hsl(280 50% 12%) 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="scroll-reveal mb-8 sm:mb-12">
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Projects I'm <span className="text-gradient">Building</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="scroll-reveal group p-6 sm:p-8 rounded-2xl glass hover:bg-white/[0.08] transition-[background-color] duration-500 relative overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold kinetic-text">
                      {project.title}
                    </h3>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-mono font-medium ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xl leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="kinetic-text-fast text-xs font-bold px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="p-2.5 rounded-xl glass text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="#"
                    className="p-2.5 rounded-xl glass text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="absolute -inset-10 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
