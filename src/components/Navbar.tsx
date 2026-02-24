import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Vision", href: "#vision" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const NavLink = ({ label, href }: { label: string; href: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="relative text-sm font-semibold text-muted-foreground hover:text-orange-300 transition-colors duration-300 py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-orange-400 to-rose-400"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </a>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`mx-auto transition-all duration-700 ease-out ${
            scrolled
              ? "max-w-5xl mt-3 mx-3 sm:mx-auto rounded-2xl glass-strong shadow-2xl"
              : "max-w-6xl"
          }`}
        >
          <div className="px-5 sm:px-6 h-14 flex items-center justify-between">
            <a
              href="#"
              className="flex items-center group"
            >
              <div className="relative flex items-center justify-center w-10 h-10">
                <Brain
                  size={28}
                  className="text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(265_85%_65%/0.7)]"
                />
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {links.map((link) => (
                <NavLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <MagneticButton
                href="#contact"
                className="hidden sm:inline-flex px-5 py-2 rounded-xl btn-gradient text-xs font-bold shadow-lg shadow-primary/20"
              >
                Hire Me
              </MagneticButton>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-orange-300 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-3 right-3 z-40 glass-strong rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-lg text-muted-foreground hover:text-orange-300 transition-colors font-semibold"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl btn-gradient text-sm font-bold mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
