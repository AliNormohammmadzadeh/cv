import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/AliNormohammmadzadeh",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ali-normohammadzadeh-77495822a/",
  },
  {
    icon: Twitter,
    label: "X / Twitter",
    href: "https://x.com/tebalen",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:alinormohammadzadeh2080@gmail.com",
  },
];

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Vision", href: "#vision" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer
      className="relative z-10 py-10 sm:py-14 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, hsl(250 50% 6%) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main footer card */}
        <div
          className="rounded-3xl p-8 sm:p-10 border border-white/[0.06] relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--card) / 0.5), hsl(var(--card) / 0.3))",
            backdropFilter: "blur(30px) saturate(1.6)",
            WebkitBackdropFilter: "blur(30px) saturate(1.6)",
          }}
        >
          {/* Top edge highlight */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Background glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            {/* Name */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
                <span className="text-gradient">Ali</span>{" "}
                <span className="text-foreground/90">Normohammadzadeh</span>
              </h3>
              <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-[0.2em]">
                Software Engineer · AI & Backend Specialist
              </p>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon
                    size={16}
                    className="text-foreground/60 group-hover:text-primary transition-colors duration-300"
                  />
                  <span className="text-[11px] font-semibold text-foreground/50 group-hover:text-foreground/80 transition-colors duration-300 hidden sm:inline">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-gradient text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-300"
            >
              <Send size={14} />
              Let's Work Together
            </a>

            {/* Copyright */}
            <p className="text-[11px] text-muted-foreground/40 font-mono">
              &copy; {new Date().getFullYear()} Ali Normohammadzadeh. Crafted
              with precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
