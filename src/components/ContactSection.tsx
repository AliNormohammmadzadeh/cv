import { Send, Mail, MessageSquare, SendHorizontal } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="scroll-slide-left">
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
              Ready to start your{" "}
              <span className="text-gradient">next project?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Whether you have a specific idea or just want to explore
              possibilities, I'm always open to discussing new opportunities and
              collaborations.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:border-primary/30 transition-[border-color] duration-300">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Email Me
                  </p>
                  <a
                    href="mailto:alinormohammadzadeh2080@gmail.com"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    alinormohammadzadeh2080@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:border-primary/30 transition-[border-color] duration-300">
                  <SendHorizontal className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Telegram
                  </p>
                  <a
                    href="https://t.me/Alind2n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    @Alind2n
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:border-primary/30 transition-[border-color] duration-300">
                  <MessageSquare className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Let's Chat
                  </p>
                  <p className="text-lg font-semibold">Available for new projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — glass contact form */}
          <div className="scroll-slide-right relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 to-blue-500/15 blur-3xl rounded-3xl -z-10" />
            <div className="glass-strong p-8 sm:p-10 rounded-3xl">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground uppercase ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all resize-none placeholder:text-muted-foreground/50"
                  />
                </div>
                
                {/* CHANGED: Wrapped in a div, removed redundant flex classes since MagneticButton handles them now */}
                <div className="w-full pt-2">
                  <MagneticButton
                    type="submit"
                    className="btn-gradient py-4 rounded-xl font-bold group"
                  >
                    {/* CHANGED: Added whitespace-nowrap to prevent text wrapping */}
                    <span className="whitespace-nowrap">Send Message</span>
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </MagneticButton>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;