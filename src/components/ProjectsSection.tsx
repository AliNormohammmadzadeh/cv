import { ExternalLink, Github, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Wikija",
    role: "Software Engineer",
    desc: "Developed a large-scale data aggregation platform utilizing advanced crawling bots and scrapers to consolidate accommodation data for optimized decision making.",
    tags: ["NestJS", "Python", "FastAPI", "Crawling", "PostgreSQL", "Elasticsearch", "Redis", "Kafka"],
  },
  {
    title: "Intelika AI",
    role: "Backend Developer",
    desc: "Architected a real-time AI workspace platform featuring multi-user collaboration and intelligent chatbots. Implemented microservices and RAG-based AI features.",
    tags: ["Microservices", "NestJS", "WebSocket", "PostgreSQL", "MongoDB", "Redis", "Cloudflare Vector", "RAG", "gRPC"],
  },
  {
    title: "License Market",
    role: "Backend Developer",
    desc: "Built an automated account procurement platform with microservices architecture, streamlining operations for operators and accelerating transaction speeds.",
    tags: ["Microservices", "NestJS", "RabbitMQ", "PostgreSQL", "Prisma", "Redis"],
  },
];

const ProjectsSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      id="projects"
      className="py-8 sm:py-12 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, hsl(250 50% 12%) 0%, hsl(280 50% 12%) 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="scroll-reveal mb-6 sm:mb-8">
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">
            Professional Experience
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Projects I've <span className="text-gradient">Architected</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 sm:p-8 rounded-3xl glass-strong border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden h-full flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Sparkles size={20} className="text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="inline-block px-2 py-1 rounded-md bg-white/5 border border-white/10 mb-4">
                    <p className="text-[10px] font-mono text-primary/90 uppercase tracking-[0.2em] font-bold">{project.role}</p>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground/90 mb-6 leading-relaxed font-medium">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated background glow */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all duration-700" />
            </motion.div>
          ))}

          {/* Golden Flip Card */}
          <div 
            className="perspective-1000 h-full min-h-[350px] sm:min-h-[400px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <motion.div
              className="relative w-full h-full transition-all duration-1000 preserve-3d cursor-pointer"
              animate={{ rotateX: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Front: Golden Card */}
              <div className="absolute inset-0 backface-hidden rounded-3xl p-10 flex flex-col items-center justify-center text-center border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-600/30 via-yellow-500/10 to-transparent overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                {/* Animated Shine Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: isFlipped ? "100%" : "-100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6 mx-auto border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <Sparkles className="text-yellow-500 animate-pulse" size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-yellow-500 mb-4 tracking-tighter uppercase italic">Your Lucky Chance</h3>
                  <p className="text-yellow-100/80 text-base font-bold max-w-[200px] mx-auto leading-tight">
                    Flip to reveal the future of our collaboration
                  </p>
                  
                  <div className="mt-8 flex justify-center gap-3">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i} 
                        className="w-2 h-2 bg-yellow-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Back: Content & Silver Skills */}
              <div className="absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center border-2 border-slate-400/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rotate-x-180 shadow-[0_0_50px_rgba(148,163,184,0.15)]">
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full bg-slate-400/10 flex items-center justify-center border border-slate-400/20 shadow-[0_0_15px_rgba(148,163,184,0.2)]">
                    <Zap size={28} className="text-slate-200 fill-slate-200/20 animate-[pulse_1.5s_infinite]" />
                  </div>
                  {/* Lightning Glow Effect */}
                  <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-pulse" />
                </div>

                <h3 className="text-xl font-black mb-2 tracking-tight uppercase italic gold-text-flow font-mono">Let's Build the Impossible</h3>
                <p className="text-slate-400 text-[13px] mb-6 leading-relaxed font-bold max-w-[240px] font-mono">
                  I'll bring the architecture, you bring the vision.
                </p>
                
                <div className="grid grid-cols-2 gap-2 w-full max-w-[260px]">
                  {[1, 2, 3, 4].map((_, i) => (
                    <span 
                      key={i}
                      className="text-[10px] font-mono font-black px-2 py-2.5 rounded-lg border border-slate-400/20 bg-gradient-to-b from-slate-400/5 to-transparent text-slate-400/60 shadow-[inset_0_0_10px_rgba(148,163,184,0.05)] hover:border-slate-400/50 hover:text-slate-200 transition-all duration-500 silver-shine cursor-help"
                    >
                      ??????
                    </span>
                  ))}
                </div>
                
                <a 
                  href="#contact" 
                  className="mt-8 relative group overflow-hidden px-12 py-4 rounded-xl bg-slate-900 text-white text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-500 border border-slate-400/30 flex items-center justify-center min-w-[200px]"
                >
                  {/* Animated Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  {/* Border Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(148,163,184,0.3)] rounded-xl" />
                  
                  <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
                    Start Now
                  </span>
                  
                  {/* Bottom Shine Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
