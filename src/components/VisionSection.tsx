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
    <section id="vision" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">Where I'm Headed</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-gradient">Roadmap</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-[15px] h-[15px] rounded-full bg-primary/30 border-2 border-primary z-10 mt-1" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:pr-0 md:text-right" : "md:pl-0"}`}>
                  <div className={`p-6 rounded-xl bg-card glow-border inline-block text-left`}>
                    <plan.icon size={22} className="text-primary mb-3" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{plan.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{plan.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
