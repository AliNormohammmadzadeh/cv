import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Vision", href: "#vision" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono font-bold text-primary text-sm tracking-wider">
          {"<YN />"}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
