import { motion } from "framer-motion";
import { Rocket, Target, Zap, Globe } from "lucide-react";

const plans = [
  {
    icon: Rocket,
    title: "Build a Dev-First SaaS",
    desc: "Creating developer tools that simplify complex workflows. Thinking API-first, DX-obsessed products.",
  },
  {
    icon: Target,
    title: "Open Source Contributions",
    desc: "Contributing to the tools I use daily. Building in public and sharing knowledge with the community.",
  },
  {
    icon: Zap,
    title: "AI-Powered Products",
    desc: "Exploring the intersection of AI and software engineering to build intelligent automation tools.",
  },
  {
    icon: Globe,
    title: "Scale to Millions",
    desc: "Designing systems that handle massive scale from day one. Infrastructure that grows with ambition.",
  },
];

const VisionSection = () => {
  return (
    <section id="vision" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">Where I'm Headed</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-gradient">Roadmap</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 sm:p-8 rounded-xl bg-card glow-border card-warm hover:bg-surface-hover transition-all duration-300"
            >
              <plan.icon size={24} className="text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">{plan.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{plan.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
