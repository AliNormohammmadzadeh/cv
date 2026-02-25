import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { useState } from "react";
import MagneticButton from "./ui/MagneticButton";

const socialLinks = [
  { icon: Github, href: "https://github.com/AliNormohammmadzadeh", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ali-normohammadzadeh-77495822a/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/tebalen", label: "X / Twitter" },
];

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(270,50%,12%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-mono warm-subtitle text-sm sm:text-base tracking-widest uppercase mb-4 sm:mb-6 md:mt-14 font-semibold">
            Software Engineer · Product Builder · Tech Enthusiast
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mb-4 sm:mb-6 min-h-[3.5rem] sm:min-h-[5rem] md:min-h-[7rem] flex items-center justify-center"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient inline-flex items-baseline">
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
          </h1>
        </motion.div>

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
          className="flex items-center justify-center gap-4 sm:gap-5 mb-10"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass text-foreground/80 hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300"
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
          className="flex justify-center"
        >
          <a
            href="#skills"
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-12 h-12">
              {/* Outer ring — slow clockwise */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 48 48"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="heroRing1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(265 85% 65%)" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="hsl(290 70% 60%)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="hsl(320 75% 65%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  stroke="url(#heroRing1)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="46 92"
                />
              </motion.svg>

              {/* Inner ring — faster counter-clockwise */}
              <motion.svg
                className="absolute inset-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)]"
                viewBox="0 0 38 38"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="heroRing2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(290 70% 60%)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(265 85% 65%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="19"
                  cy="19"
                  r="17"
                  fill="none"
                  stroke="url(#heroRing2)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="28 80"
                />
              </motion.svg>

              {/* Orbiting dot */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[1px] w-[5px] h-[5px] rounded-full bg-primary/50 shadow-[0_0_8px_2px_hsl(265_85%_65%/0.4)]" />
              </motion.div>

              {/* Center chevron */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className="text-primary/50 group-hover:text-primary transition-colors duration-300"
                  />
                </motion.div>
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/[0.04] blur-md pointer-events-none" />
            </div>

            <span className="text-[9px] font-mono text-muted-foreground/20 uppercase tracking-[0.3em] group-hover:text-muted-foreground/50 transition-colors duration-300">
              explore
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
