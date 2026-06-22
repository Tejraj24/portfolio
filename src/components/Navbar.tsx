import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  activeSection: string;
  currentView: 'home' | 'portfolio';
  onViewChange: (view: 'home' | 'portfolio') => void;
  onNavigateToSection: (id: string) => void;
  onOpenResume?: () => void;
}

export default function Navbar({ activeSection, currentView, onViewChange, onNavigateToSection, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    if (id === 'portfolio') {
      onViewChange('portfolio');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      if (currentView === 'portfolio') {
        onViewChange('home');
        // Wait for the home view components to fully mount in the DOM before scrolling
        setTimeout(() => {
          onNavigateToSection(id);
        }, 200);
      } else {
        // Already on home view, scroll immediately
        onNavigateToSection(id);
      }
    }
  };

  return (
    <>
      <motion.nav
        id="main-navigation"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-bg-primary/85 backdrop-blur-xl border-b border-border-custom/50 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center space-x-2 text-black dark:text-white font-display font-black text-2xl tracking-tighter interactive-cursor py-1"
            id="nav-logo"
          >
            <span>T.R</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent block" />
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1" id="nav-desktop-menu">
            {menuItems.map((item) => {
              const isActive = currentView === 'portfolio' 
                ? item.id === 'portfolio' 
                : (item.id === 'portfolio' ? false : activeSection === item.id);
                
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-2 font-sans font-medium text-sm transition-colors duration-300 interactive-cursor`}
                  id={`nav-item-${item.id}`}
                >
                  <span className={isActive ? 'text-black dark:text-white' : 'text-text-secondary hover:text-black dark:hover:text-white'}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Theme Toggle & Call To Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-border-custom dark:border-neutral-800/80 hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-all duration-300 interactive-cursor flex items-center justify-center"
              aria-label="Toggle theme"
              id="theme-toggle-desktop"
              title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-black" />
              ) : (
                <Sun className="w-4 h-4 text-gold-accent" />
              )}
            </button>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="flex items-center space-x-1.5 font-mono text-[10px] uppercase font-bold text-gold-dark dark:text-gold-accent border border-gold-dark/30 dark:border-gold-accent/30 hover:border-gold-dark dark:hover:border-gold-accent px-5 py-2.5 rounded-full transition-all duration-300 interactive-cursor hover:scale-105 active:scale-95"
                id="nav-resume-desktop"
              >
                <span>View CV</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => handleItemClick('contact')}
              className="flex items-center space-x-1 font-mono text-xs uppercase font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gold-accent hover:text-black dark:hover:bg-gold-accent dark:hover:text-black px-5 py-2.5 rounded-full transition-all duration-300 interactive-cursor"
              id="nav-cta-desktop"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden border border-border-custom dark:border-neutral-850 p-2 rounded-full hover:bg-white dark:hover:bg-neutral-900 text-black dark:text-white transition-all interactive-cursor"
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Animated Slide menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            className="fixed inset-0 bg-black z-30 flex flex-col justify-between p-8"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header placeholder space */}
            <div className="flex justify-between items-center pt-4 border-b border-white/10 pb-6 w-full">
              <span className="text-white font-display font-black text-2xl tracking-tighter">TEJRAJ.</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className="border border-white/20 p-2 rounded-full hover:bg-white/10 text-white transition-all interactive-cursor flex items-center justify-center cursor-pointer"
                  aria-label="Toggle theme"
                  id="theme-toggle-mobile"
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 text-white" />
                  ) : (
                    <Sun className="w-4 h-4 text-gold-accent" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="border border-white/20 p-2 rounded-full hover:bg-white/10 text-white transition-all interactive-cursor"
                  aria-label="Close menu"
                  id="nav-mobile-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Links List */}
            <div className="flex flex-col space-y-6 my-auto pt-8">
              {menuItems.map((item, index) => {
                const isActive = currentView === 'portfolio' 
                  ? item.id === 'portfolio' 
                  : (item.id === 'portfolio' ? false : activeSection === item.id);
                  
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="text-left w-full interactive-cursor"
                    id={`mobile-nav-item-${item.id}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, ease: "easeOut" }}
                  >
                    <span className="font-mono text-gold-accent text-xs block mb-1">0{index + 1}/</span>
                    <span
                      className={`font-display text-4xl font-extrabold tracking-tight transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                  </motion.button>
                );
              })}

              {onOpenResume && (
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="text-left w-full interactive-cursor flex items-center space-x-2"
                  id="mobile-nav-resume"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.08, ease: "easeOut" }}
                >
                  <span className="font-mono text-gold-accent text-xs block mb-1">0{menuItems.length + 1}/</span>
                  <span className="font-display text-4xl font-extrabold tracking-tight text-gold-accent flex items-center space-x-2">
                    <span>VIEW CV</span>
                    <Sparkles className="w-6 h-6 text-gold-accent" />
                  </span>
                </motion.button>
              )}
            </div>

            {/* Bottom Footer Information */}
            <div className="border-t border-white/10 pt-6">
              <p className="font-mono text-gray-500 text-xs mb-3">TEJRAJ • VISUAL ENGINEERING</p>
              <div className="flex space-x-4">
                <a
                  href="mailto:tejraj487@gmail.com"
                  className="font-sans text-xs text-white hover:text-gold-accent underline cursor-pointer"
                >
                  tejraj487@gmail.com
                </a>
                <span className="text-gray-500">|</span>
                <span className="font-mono text-xs text-gold-accent">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
