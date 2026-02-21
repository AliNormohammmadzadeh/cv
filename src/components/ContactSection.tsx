import { motion } from "framer-motion";
import { Send, Coffee, Handshake } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.04] to-transparent" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Handshake size={36} className="text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Let's Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-2">
            I'm actively looking for a co-founder who shares the ambition to build world-class products. 
            If you're a visionary with complementary skills, let's talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:your@email.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl btn-gradient font-semibold text-sm"
            >
              <Send size={16} />
              Get in Touch
            </a>
            <a
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-glow bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-surface-hover transition-all"
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
          className="mt-16 sm:mt-20 text-xs text-muted-foreground font-mono"
        >
          © 2026 · Built with passion & too much coffee
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
