import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import MagneticButton from "./ui/MagneticButton";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono warm-subtitle text-sm sm:text-base tracking-widest uppercase mb-4 sm:mb-6 font-semibold">
            Software Engineer · Product Builder · Tech Enthusiast
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4 sm:mb-6 cursor-default"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="text-gradient inline-flex flex-wrap justify-center items-baseline">
            <span>Ali</span>
            <motion.span
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{
                width: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -10,
                marginLeft: isHovered ? "0.75rem" : 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.4 },
              }}
              className="overflow-hidden whitespace-nowrap text-2xl sm:text-4xl md:text-5xl font-bold text-muted-foreground/80"
            >
              Normohammadzadeh
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed px-2"
        >
          I architect{" "}
          <span className="text-foreground font-medium">robust software solutions</span> and
          leverage <span className="text-foreground font-medium">AI & RAG</span> to build
          intelligent, scalable products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12 sm:mb-16"
        >
          <MagneticButton
            href="#contact"
            className="px-10 py-4 rounded-2xl btn-gradient font-bold text-base shadow-lg shadow-primary/25"
          >
            Let's Build Together
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="px-10 py-4 rounded-2xl glass text-foreground font-bold text-base hover:bg-white/10 transition-colors"
          >
            See My Work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-5"
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Mail, href: "#", label: "Email" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="p-3 rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ArrowDown size={20} className="text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
