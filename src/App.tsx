/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import TechStack from './components/TechStack';
import Achievements from './components/Achievements';
import TestimonialSection from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioPage from './components/PortfolioPage';
import ResumeViewer from './components/ResumeViewer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [view, setView] = useState<'home' | 'portfolio'>('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', // custom focused horizontal slice for precise tracking
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [view]); // Re-run active observer registration when view toggles

  const handleNavigateToSection = (id: string) => {
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
    <div className={`relative min-h-screen bg-bg-primary selection:bg-gold-accent selection:text-black antialiased ${isPreloading ? 'overflow-hidden max-h-screen' : 'overflow-x-hidden'}`}>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}

      {/* Premium lagging interactive cursor */}
      <CustomCursor />

      {/* Floating active-underline blur Navbar */}
      <Navbar 
        activeSection={activeSection} 
        currentView={view} 
        onViewChange={setView} 
        onNavigateToSection={handleNavigateToSection} 
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Conditionally Render Landing Page or Full Interactive Portfolio Case Study Archive */}
      {view === 'portfolio' ? (
        <PortfolioPage onBackToHome={() => setView('home')} />
      ) : (
        <main id="main-content-flow">
          
          {/* Hero Area */}
          <Hero 
            onExploreProjects={() => setView('portfolio')} 
            onContactMe={() => handleNavigateToSection('about')} 
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Circular Orbit Backed Dark-Themed About Area */}
          <About onOpenResume={() => setIsResumeOpen(true)} />

          {/* Magazine-style Grid of Projects */}
          <Projects />

          {/* Narrative Core timeline experiences */}
          <Experience />

          {/* Interactive Skills categorized Matrix badges */}
          <Skills />

          {/* Dual dynamic loop horizontal tech marquees */}
          <TechStack />

          {/* Certificate, NCC & Open source achievements */}
          <Achievements />

          {/* Glassmorphic Auto-scrolling Testimonials sliders */}
          <TestimonialSection />

          {/* Luxury animated label secure Contact form */}
          <Contact />

        </main>
      )}

      {/* Oversized typography epic Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Modern Glassmorphic CV / Resume HUD Viewer overlay */}
      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

