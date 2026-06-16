import { ArrowUp, Github, Linkedin, Mail, Instagram, Sparkles, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onOpenResume?: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const scrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Tejraj24', icon: <Github className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tejraj-singh-a6aaa9219/', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Email', url: 'mailto:tejraj487@gmail.com', icon: <Mail className="w-5 h-5" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-neutral-900">
      {/* Absolute faint backing decorative grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(244,178,62,0.05),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Enormous Oversized Awwwards Typography */}
        <div className="space-y-2 select-none border-b border-neutral-900 pb-16" id="footer-logo-billboard">
          <motion.h2
            className="font-display font-black leading-[0.8] tracking-tighter uppercase"
            style={{ fontSize: 'clamp(3rem, 15vw, 12rem)' }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            CREATE.
          </motion.h2>
          <motion.h2
            className="font-display font-black leading-[0.8] tracking-tighter uppercase text-stroke-white text-white"
            style={{ fontSize: 'clamp(3rem, 15vw, 12rem)' }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            BUILD.
          </motion.h2>
          <motion.h2
            className="font-display font-black leading-[0.8] tracking-tighter uppercase text-gold-accent"
            style={{ fontSize: 'clamp(3rem, 15vw, 12rem)' }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            INNOVATE.
          </motion.h2>
        </div>

        {/* Link grids and detail nodes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12" id="footer-details-grid">
          {/* Identity column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-2.5 text-white font-display font-black text-2xl tracking-tighter">
              <span>TEJRAJ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent block" />
            </div>
            <p className="font-sans text-sm text-gray-400 max-w-sm leading-relaxed">
              Synthesizing aesthetic digital assets with hard-coded server architecture. Let's sculpt the next web horizon.
            </p>
            {/* Social channels row */}
            <div className="flex space-x-3.5">
              {socialLinks.map((sc) => (
                <a
                  key={sc.name}
                  href={sc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-800 hover:border-gold-accent bg-neutral-950 flex items-center justify-center text-gray-400 hover:text-gold-accent transition-all duration-300 interactive-cursor"
                  title={sc.name}
                >
                  {sc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">NAVIGATION CODES</h4>
            <div className="grid grid-cols-2 gap-3">
              {links.map((ln) => (
                <button
                  key={ln.id}
                  onClick={() => scrollToSection(ln.id)}
                  className="text-left font-sans text-sm text-gray-400 hover:text-gold-accent hover:translate-x-1.5 transition-all duration-350 interactive-cursor block py-1 w-fit"
                >
                  {ln.name}
                </button>
              ))}
            </div>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="mt-6 flex items-center space-x-1.5 py-1 font-mono text-[10px] font-bold text-gold-accent hover:text-white transition-colors duration-350 select-none cursor-pointer hover:underline uppercase"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>INTERACTIVE RESUME HUD</span>
                <Sparkles className="w-3 h-3 animate-pulse" />
              </button>
            )}
          </div>

          {/* Contact action column */}
          <div className="md:col-span-3 space-y-4 relative">
            <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">BACKEND CHANNELS</h4>
            <div className="space-y-4">
              <a
                href="mailto:tejraj487@gmail.com"
                className="font-display font-extrabold text-base text-white hover:text-gold-accent block transition-colors cursor-pointer"
              >
                tejraj487@gmail.com
              </a>
              <p className="font-mono text-xs text-gold-accent">AVAILABLE WORLDWIDE (REMOTE/HYBRID)</p>
            </div>

            {/* Back to top scroll button */}
            <button
              onClick={scrolltoTop}
              className="absolute right-0 bottom-0 md:relative md:mt-6 bg-neutral-900 border border-neutral-800 hover:border-gold-accent p-3 rounded-2xl text-gray-400 hover:text-gold-accent transition-all duration-300 interactive-cursor shadow-lg"
              aria-label="Back to top"
              title="Return to topmost page coordinate"
              id="footer-back-to-top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Closing copyright row */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500" id="footer-bottom-copyright">
          <span>&copy; {currentYear} TEJRAJ • ALL RECOGNITIONS RESERVED.</span>
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors cursor-help" title="Website complies fully with WCAG 2.1 accessibility criteria.">ACCESIBILITY STATUS: GREEN</span>
            <span>SYSTEM VERSION v3.2.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
