import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/AliNormohammmadzadeh" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ali-normohammadzadeh-77495822a/" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/tebalen" },
];

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © 2026 Ali Normohammadzadeh
        </p>
        <div className="flex gap-5">
          {footerLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
