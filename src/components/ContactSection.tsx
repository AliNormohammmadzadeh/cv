import { Send, Mail, MessageSquare, SendHorizontal, Zap } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:alinormohammadzadeh2080@gmail.com?subject=${subject}&body=${body}`;
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(280 50% 12%) 0%, hsl(250 15% 5%) 100%)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side */}
          <div className="scroll-slide-left pt-4">
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
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Say You Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@gmail.com"
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
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all resize-none placeholder:text-muted-foreground/50"
                  />
                </div>
                
                <div className="w-full pt-2">
                  <MagneticButton
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    className={`py-4 rounded-xl font-bold group transition-all duration-300 ${
                      isSuccess ? "bg-emerald-500 shadow-emerald-500/25" : "btn-gradient shadow-primary/25"
                    }`}
                  >
                    <span className="whitespace-nowrap flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap size={18} />
                          </motion.div>
                          Sending...
                        </>
                      ) : isSuccess ? (
                        "Message Ready in Email Client!"
                      ) : (
                        "Send Message"
                      )}
                    </span>
                    {!isSubmitting && !isSuccess && (
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    )}
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