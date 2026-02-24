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
    <section
      id="vision"
      className="py-20 sm:py-32 px-4 sm:px-6 relative"
      style={{ background: "linear-gradient(180deg, hsl(220 30% 8% / 0.7) 0%, hsl(230 25% 7% / 0.5) 50%, hsl(240 20% 8% / 0.6) 100%)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="scroll-reveal mb-10 sm:mb-16">
          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest uppercase mb-3">
            Where I'm Headed
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-gradient">Roadmap</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.title}
              className={`scroll-reveal group p-6 sm:p-8 rounded-2xl glass hover:bg-white/[0.08] transition-[background-color] duration-500 relative overflow-hidden`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <plan.icon
                size={24}
                className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-lg font-bold mb-2 kinetic-text">{plan.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{plan.desc}</p>

              <div className="absolute -inset-10 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
