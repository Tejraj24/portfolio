import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';
// @ts-ignore
import heroPortrait from '../assets/images/regenerated_image_1781030108645.webp';

interface HeroProps {
  onExploreProjects: () => void;
  onContactMe: () => void;
  onOpenResume?: () => void;
}

export default function Hero({ onExploreProjects, onContactMe, onOpenResume }: HeroProps) {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Tejraj24', icon: <Github className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tejraj-singh-a6aaa9219/', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Email', url: 'mailto:tejraj487@gmail.com', icon: <Mail className="w-5 h-5" /> },
  ];

  const stats = [
    { value: '4+', label: 'Major Projects' },
    { value: '10+', label: 'Technologies' },
    { value: '1000+', label: 'Hours Learning' },
    { value: '100+', label: 'Git Commits' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-bg-primary pt-28 pb-16 flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto overflow-hidden text-black dark:text-neutral-100 font-sans transition-colors duration-500"
    >
      {/* Side Label - Dynamic Editorial Motif */}
      <div className="absolute left-4 bottom-24 hidden xl:flex flex-col justify-end pb-20 pointer-events-none select-none">
        <span className="-rotate-90 origin-left text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap opacity-30 font-mono">
          Portfolio Showcase // TEJRAJ.DEV
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full my-auto relative z-10">
        
        {/* Left Side: Massive Editorial Typography & Narrative */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-10 order-2 lg:order-1" id="hero-left">
          
          {/* Availability Badge & Label */}
          <motion.div
            className="inline-flex items-center space-x-2.5 bg-white dark:bg-neutral-900 border border-border-custom dark:border-neutral-800 px-4 py-2 rounded-full w-fit shadow-xs"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            id="hero-availability"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-black dark:text-neutral-200">
              Available for Hire & Projects
            </span>
          </motion.div>

          {/* Huge Editorial Headline */}
          <div className="space-y-4" id="hero-title-container">
            <motion.div
              className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-gold-accent font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              JACK OF CURIOSITY , MASTER OF CREATION
            </motion.div>

            <motion.h1
              className="font-display font-black text-black dark:text-white leading-[1] tracking-tighter uppercase flex flex-wrap gap-x-4"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6.8rem)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>Tejraj</span>
              <span className="text-stroke-black dark:text-stroke-white text-transparent">Singh</span>
            </motion.h1>
          </div>

          {/* Interactive CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            id="hero-ctas"
          >
            <button
               onClick={onExploreProjects}
               className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black hover:bg-gold-accent hover:text-black dark:hover:bg-gold-accent dark:hover:text-black font-display text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg interactive-cursor"
               id="hero-cta-projects"
            >
              View My Projects
            </button>
            
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-8 py-3.5 border-2 border-gold-accent text-gold-dark dark:text-gold-accent hover:bg-gold-accent hover:text-black font-display text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all duration-300 interactive-cursor flex items-center space-x-1.5 shadow-sm"
                id="hero-cta-resume"
              >
                <span>Interactive CV HUD</span>
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </button>
            )}
            
            <button
              onClick={() => {
                window.location.href = "mailto:tejraj487@gmail.com?subject=Let's Connect&body=Hi Tejraj,%0D%0A%0D%0AI was exploring your developer portfolio and would love to connect with you regarding opportunities / collaboration.%0D%0A%0D%0ABest regards,";
              }}
              className="px-8 py-3.5 border border-black/15 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-display text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 interactive-cursor"
              id="hero-cta-contact"
            >
              Let's Connect
            </button>
          </motion.div>

          {/* Social Icons & Dynamic Italic Stats Row */}
          <div className="pt-8 border-t border-border-custom dark:border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6" id="hero-bottom-row">
            {/* Social channels */}
            <div className="flex space-x-3.5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border-custom dark:border-neutral-800 flex items-center justify-center text-black dark:text-neutral-200 hover:bg-gold-accent hover:border-gold-accent hover:text-black dark:hover:text-black transition-all duration-300 interactive-cursor"
                  id={`hero-social-${link.name.toLowerCase()}`}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Micro Stats Grid matching Editorial italic layouts */}
            <div className="flex items-center space-x-12">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display font-black text-4xl text-black dark:text-white leading-none italic mb-1">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-secondary dark:text-neutral-450 opacity-60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Rotated Immersive Cover Card with camera/art presentation */}
        <div className="lg:col-span-4 flex justify-center items-center order-1 lg:order-2 relative" id="hero-right">
          {/* Glowing Backlight */}
          <div className="absolute w-64 h-64 bg-gold-accent/20 rounded-full blur-[90px] pointer-events-none -z-10 animate-pulse" />

          {/* Overlapping Rotate-3 Editorial Card */}
          <motion.div
            className="relative w-full max-w-[340px] aspect-[4/5] bg-black rounded-[40px] shadow-2xl p-8 flex flex-col justify-between transform rotate-3 hover:rotate-1 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(244,178,62,0.15)] group overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            id="hero-image-card"
          >
            {/* Soft Ambient Inner Glow overlay */}
            <div className="absolute inset-0 bg-radial-gradient(circle,rgba(255,255,255,0.05),transparent) pointer-events-none" />

            <div className="flex justify-between items-center z-10">
              <div className="w-10 h-10 rounded-full border border-gold-accent/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gold-accent rounded-full animate-ping"></div>
              </div>
              <span className="font-mono text-[10px] uppercase text-gold-accent tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                Active v3.2
              </span>
            </div>

            {/* Immersive inner image frame */}
            <div className="relative w-full h-[55%] my-4 rounded-3xl overflow-hidden saturate-[0.85] group-hover:saturate-100 transition-all duration-700">
               <img
                src={heroPortrait}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/profile.jpg";
                }}
                alt="Tejraj Portfolio Hero Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                id="hero-portrait-img"
              />
            </div>

            <div className="z-10 mt-auto">
              <div className="text-white font-display text-2xl font-bold leading-none tracking-tight">
                AI Interface <br />
                System
              </div>
              <div className="text-white/40 font-mono text-[9px] mt-1.5 uppercase tracking-widest">
                Design Lab // Volume III
              </div>
            </div>
          </motion.div>

          {/* Scroll Down interactive button */}
          <motion.div
            className="absolute -bottom-6 -left-6 bg-gold-accent text-black w-14 h-14 rounded-full border-4 border-bg-primary dark:border-neutral-950 flex items-center justify-center shadow-lg cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group z-20"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            onClick={onExploreProjects}
            title="Explore Projects"
          >
            <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </motion.div>
        </div>

      </div>

      {/* Decorative Brutalist Elements */}
      <div className="absolute bottom-6 right-6 p-4 flex flex-col items-end pointer-events-none select-none hidden lg:flex">
        <div className="text-[120px] font-black text-black/[0.03] dark:text-white/[0.02] absolute -bottom-10 -right-6 select-none leading-none font-display">
          TECH
        </div>
        <div className="flex space-x-1.5 pt-6">
          <div className="w-1 h-12 bg-black/10 dark:bg-white/10"></div>
          <div className="w-1 h-12 bg-gold-accent"></div>
          <div className="w-1 h-12 bg-black/10 dark:bg-white/10"></div>
        </div>
      </div>
    </section>
  );
}
