import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  Rocket,
  Shield,
  Workflow,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
} from "lucide-react";

const principles = [
  {
    icon: Brain,
    title: "AI-Native Architecture",
    subtitle: "From LLMs to Production",
    desc: "I design AI systems that go beyond prototypes. RAG pipelines, LLM orchestration, vector search, and intelligent agents — built for reliability at scale.",
    highlights: [
      "RAG & Vector Search",
      "LLM Orchestration",
      "AI Agent Systems",
      "Production Pipelines",
    ],
    accent: "from-purple-500/20 to-blue-500/20",
    iconBg: "bg-purple-500/15",
    borderAccent: "group-hover:border-purple-500/30",
  },
  {
    icon: Layers,
    title: "Systems That Scale",
    subtitle: "Microservices & Beyond",
    desc: "Event-driven microservices, distributed systems, and infrastructure designed to handle millions of requests. I think in throughput, latency, and fault tolerance.",
    highlights: [
      "Event-Driven Design",
      "Distributed Systems",
      "High Availability",
      "Performance Tuning",
    ],
    accent: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/15",
    borderAccent: "group-hover:border-blue-500/30",
  },
  {
    icon: Rocket,
    title: "Ship Fast, Ship Right",
    subtitle: "Velocity Without Compromise",
    desc: "I move fast without breaking things. CI/CD pipelines, automated testing, and clean architecture that lets teams iterate quickly while maintaining quality.",
    highlights: [
      "CI/CD Automation",
      "Clean Architecture",
      "Rapid Prototyping",
      "Developer Experience",
    ],
    accent: "from-pink-500/20 to-orange-500/20",
    iconBg: "bg-pink-500/15",
    borderAccent: "group-hover:border-pink-500/30",
  },
];

const metrics = [
  { value: "3+", label: "Production AI Systems", icon: Cpu },
  { value: "10+", label: "Microservices Built", icon: Layers },
  { value: "RAG", label: "Pipeline Specialist", icon: Brain },
  { value: "Full", label: "Stack Coverage", icon: TrendingUp },
];

const buildingNext = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    desc: "Intelligent automation pipelines with n8n and custom AI agents that eliminate repetitive engineering tasks.",
  },
  {
    icon: Sparkles,
    title: "Developer-First AI Tools",
    desc: "API-first developer tools that integrate LLMs into existing workflows — amplifying engineers, not replacing them.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade RAG",
    desc: "Production RAG systems with advanced retrieval, re-ranking, and guardrails for enterprise use cases.",
  },
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(220 50% 12%) 0%, hsl(250 50% 10%) 50%, hsl(250 50% 12%) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="scroll-reveal mb-10 sm:mb-14 text-center">
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">
            Why Leaders Choose Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            My Engineering{" "}
            <span className="text-gradient">Philosophy</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            I don't just write code — I architect solutions that ship fast, scale
            reliably, and leverage AI where it creates real value.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={`group relative p-6 sm:p-8 rounded-2xl glass-strong border border-white/5 ${p.borderAccent} transition-all duration-500 overflow-hidden flex flex-col`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}
              >
                <p.icon size={24} className="text-primary" />
              </div>

              <p className="text-[10px] font-mono text-primary/70 uppercase tracking-[0.2em] font-bold mb-1">
                {p.subtitle}
              </p>
              <h3 className="text-xl font-black mb-3 kinetic-text">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-primary/80"
                  >
                    <CheckCircle2 size={10} className="shrink-0" />
                    {h}
                  </span>
                ))}
              </div>

              <div
                className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${p.accent} blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="scroll-reveal glass rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 border border-white/5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((m, i) => (
              <div key={m.label} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <m.icon size={20} className="text-primary" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black kinetic-text mb-1">
                  {m.value}
                </p>
                <p className="text-xs font-bold text-foreground/80">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I'm Building Next */}
        <div className="scroll-reveal mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center shadow-lg shadow-primary/25">
              <ArrowRight size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                What I'm <span className="text-gradient">Building Next</span>
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                Actively exploring these frontiers
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {buildingNext.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-5 sm:p-6 rounded-2xl glass hover:bg-white/[0.06] transition-all duration-500 border border-white/5 hover:border-primary/20"
            >
              <item.icon
                size={22}
                className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300"
              />
              <h4 className="text-sm font-black mb-2 text-foreground/90 group-hover:text-foreground transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
