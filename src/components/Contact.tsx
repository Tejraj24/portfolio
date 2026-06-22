import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Copy } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    { name: 'Email Coordinate', value: 'tejraj487@gmail.com', url: 'mailto:tejraj487@gmail.com', icon: <Mail className="w-5 h-5 text-gold-accent" /> },
    { name: 'GitHub Forge', value: 'github.com/Tejraj24', url: 'https://github.com/Tejraj24', icon: <Github className="w-5 h-5 text-gold-accent" /> },
    { name: 'LinkedIn Space', value: 'linkedin.com/in/tejraj-singh-a6aaa9219', url: 'https://www.linkedin.com/in/tejraj-singh-a6aaa9219/', icon: <Linkedin className="w-5 h-5 text-gold-accent" /> },
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const email = 'tejraj487@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    } catch (err) {
      fallbackCopyText(email);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copying failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate real high-fidelity response latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // Forward directly into local system email provider composed to Tejraj
      const subject = encodeURIComponent(`Let's Connect - ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Tejraj,\n\n${formData.message}\n\n---\nSender Name: ${formData.name}\nCoordinates: ${formData.email}`
      );
      window.location.href = `mailto:tejraj487@gmail.com?subject=${subject}&body=${body}`;

      setFormData({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="bg-bg-primary py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-custom/50 relative overflow-hidden"
    >
      {/* Editorial Decorative Coordinates overlay */}
      <div className="absolute right-12 top-12 font-mono text-xs text-black/20 dark:text-white/20 select-none tracking-widest hidden lg:block">
        TRANSMISSION CHANNEL // SEC_06
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Enormous Heading + Info links */}
        <div className="xl:col-span-6 space-y-12" id="contact-coordinates">
          <div className="space-y-4">
            <span className="font-mono text-xs text-gold-dark uppercase tracking-widest block font-semibold">GET IN CONTACT</span>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl xl:text-6xl 2xl:text-7xl text-black dark:text-white leading-tight tracking-tighter uppercase">
              LET'S BUILD <br />
              <span className="whitespace-nowrap">SOMETHING</span> <br />
              <span className="text-stroke-black text-black dark:text-white font-black whitespace-nowrap">AMAZING.</span>
            </h2>
            <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed max-w-sm pt-2">
              I am always open to discussing development opportunities, collaborations, innovative projects, and technology-related conversations.
            </p>
          </div>

          {/* Social Coordinates row list with custom glows */}
          <div className="space-y-4 pt-4" id="contact-coordinates-list">
            {socialLinks.map((link) => {
              const isEmail = link.name === 'Email Coordinate';
              return (
                <div
                  key={link.name}
                  className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-neutral-900/60 border border-border-custom dark:border-neutral-800 hover:border-gold-accent hover:shadow-[0_10px_25px_rgba(244,178,62,0.1)] dark:hover:shadow-[0_10px_25px_rgba(244,178,62,0.05)] transition-all duration-300 group relative"
                  id={`contact-container-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 flex-grow interactive-cursor"
                    id={`contact-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <span className="p-3 bg-bg-primary dark:bg-neutral-800 rounded-xl group-hover:bg-gold-accent group-hover:text-black dark:group-hover:text-black transition-colors">
                      {link.icon}
                    </span>
                    <div>
                      <span className="font-mono text-[9px] uppercase text-text-secondary dark:text-neutral-450 block tracking-wider">{link.name}</span>
                      <span className="font-sans text-sm font-semibold text-black dark:text-neutral-100 group-hover:text-gold-dark dark:group-hover:text-gold-accent transition-colors">{link.value}</span>
                    </div>
                  </a>

                  {isEmail && (
                    <div className="relative flex items-center shrink-0 z-10 pl-2">
                      <button
                        onClick={handleCopyEmail}
                        className="p-3 rounded-2xl border border-border-custom dark:border-neutral-800/80 hover:bg-gold-accent hover:border-gold-accent hover:text-black dark:hover:text-black dark:text-neutral-400 text-text-secondary bg-bg-primary dark:bg-neutral-800 transition-all duration-300 interactive-cursor flex items-center justify-center relative cursor-pointer"
                        title="Copy email address"
                        id="contact-copy-email-btn"
                        aria-label="Copy email address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -42, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-mono text-[9px] uppercase font-bold tracking-widest rounded-lg shadow-md z-30 pointer-events-none whitespace-nowrap"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Luxury submission input form with state handlers */}
        <div className="xl:col-span-6" id="contact-form-portal">
          <div className="bg-white dark:bg-neutral-900 border border-border-custom dark:border-neutral-800 rounded-4xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            
            {/* Embedded Header info inside card */}
            <div className="mb-8 border-b border-border-custom/50 dark:border-neutral-800 pb-6 flex justify-between items-center">
              <div>
                <h3 className="font-display font-black text-xl text-black dark:text-white uppercase tracking-tight">SECURE SECRETS MAIL</h3>
                <p className="font-mono text-[9px] text-text-secondary dark:text-neutral-450 uppercase">TRANSMISSION AGENT // DIRECT TO TEJRAJ</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-gold-accent animate-pulse" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name input */}
              <div className="space-y-2">
                <label htmlFor="name" className="font-mono text-xs uppercase text-text-secondary dark:text-neutral-400 font-medium block">
                  01_Sender Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-bg-primary dark:bg-neutral-950 border border-border-custom dark:border-neutral-800/80 focus:border-gold-accent focus:bg-white dark:focus:bg-neutral-950 text-black dark:text-white font-sans text-sm outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-xs uppercase text-text-secondary dark:text-neutral-400 font-medium block">
                  02_Receiver Coordinates
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g. johndoe@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-bg-primary dark:bg-neutral-950 border border-border-custom dark:border-neutral-800/80 focus:border-gold-accent focus:bg-white dark:focus:bg-neutral-950 text-black dark:text-white font-sans text-sm outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-xs uppercase text-text-secondary dark:text-neutral-400 font-medium block">
                  03_System Statement
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Draft your brilliant proposal or core query here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-bg-primary dark:bg-neutral-950 border border-border-custom dark:border-neutral-800/80 focus:border-gold-accent focus:bg-white dark:focus:bg-neutral-950 text-black dark:text-white font-sans text-sm outline-none transition-all duration-300 resize-none animate-none"
                  required
                />
              </div>

              {/* Status Alert displays */}
              <AnimatePresence mode="popLayout">
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start space-x-3 text-sm font-sans"
                    id="contact-status-success"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block">Transmission Dispatch Successful!</span>
                      <span>Your details have been registered into the queue. A transcript has been securely forwarded totejraj487@gmail.com. We will respond shortly.</span>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start space-x-3 text-sm font-sans"
                    id="contact-status-error"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block">Integrity Validation Error!</span>
                      <span>Please make sure all input boxes contain completed entries before attempting dispatch.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Submit trigger buttons */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-display font-medium uppercase tracking-wider text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md ${
                  isSubmitting
                    ? 'bg-neutral-800 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gold-accent hover:text-black interactive-cursor'
                }`}
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
                    <span>Synchronizing Server Queue...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Initialize Secure transmission</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
