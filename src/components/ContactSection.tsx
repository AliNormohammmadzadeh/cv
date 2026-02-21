import { motion } from "framer-motion";
import { Send, Coffee, Handshake } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Handshake size={40} className="text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Let's Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            I'm actively looking for a co-founder who shares the ambition to build world-class products. 
            If you're a visionary with complementary skills, let's talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all glow-box"
            >
              <Send size={16} />
              Get in Touch
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg glow-border bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-surface-hover transition-all"
            >
              <Coffee size={16} />
              Book a Coffee Chat
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 text-xs text-muted-foreground font-mono"
        >
          © 2026 · Built with passion & too much coffee
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
