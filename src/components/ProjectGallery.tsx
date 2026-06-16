import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  projectId: string;
  fallbackImage: string;
  projectTitle: string;
}

const REPO_GALLERIES: Record<string, string[]> = {
  'pro-1': [
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000", // Document Analysis Overview
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", // Analytical stats dashboard
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", // Secure serverless checker logic terminal
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"  // Elite review workspace
  ],
  'pro-2': [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000", // Responsive transactional bag
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000", // Curated inventory showcase
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", // Client metrics check graphs
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"  // Modern digital interface storefront
  ],
  'pro-3': [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000", // Main Devour Cafe cozy visual
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1000", // Crafted espresso brewing
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000", // Table setup presentation
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000"  // Artisanal pastries culinary menu
  ],
  'pro-4': [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000", // Romance coupling key art
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000", // Real-time secure socket-based chat panel
    "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=1000", // Algorithmic compatibility chart
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000"  // Personalized connection profiles
  ],
  'pro-5': [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000", // Editorial typewriter / laptop layout
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000", // Digital publishing environment
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000", // Dynamic storytelling collaboration
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"  // Article analytics insights
  ]
};

export default function ProjectGallery({ projectId, fallbackImage, projectTitle }: ProjectGalleryProps) {
  const images = REPO_GALLERIES[projectId] || [fallbackImage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') setIsFullscreen(false);
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, isFullscreen]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="relative flex flex-col w-full h-full justify-between select-none">
      
      {/* Active slide view stage */}
      <div className="relative flex-grow min-h-[220px] sm:min-h-[280px] lg:h-[450px] overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-900 group/gallery z-10 shadow-inner">
        
        {/* Absolute slide transition container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${projectTitle} screenshot ${currentIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Cinematic gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

        {/* Counter tag layout */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-white/95 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 z-20 shadow-md">
          <span className="font-bold text-gold-accent">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="text-gray-400">{String(images.length).padStart(2, '0')}</span>
        </div>

        {/* Fullscreen Trigger */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 z-20 opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-black/75 hover:bg-black border border-neutral-800 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
          title="Fullscreen inspection"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Floating navigational arrow pills */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-black border border-neutral-800/80 hover:border-gold-accent/40 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-lg opacity-0 group-hover/gallery:opacity-100 focus:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-black border border-neutral-800/80 hover:border-gold-accent/40 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-lg opacity-0 group-hover/gallery:opacity-100 focus:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Flat active slide progress strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900/20 z-20">
            <motion.div 
              className="h-full bg-gold-accent/80"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Tiny descriptive thumbnails list */}
      {images.length > 1 && (
        <div className="flex gap-2.5 mt-3 animate-fade-in px-1 overflow-x-auto scrollbar-none py-1 justify-center sm:justify-start">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`relative w-14 h-10 rounded-lg overflow-hidden border transition-all duration-300 transform-gpu cursor-pointer flex-shrink-0 ${
                  isActive 
                    ? 'border-gold-accent ring-2 ring-gold-accent/20 scale-105' 
                    : 'border-neutral-800/80 opacity-40 hover:opacity-100 hover:scale-102'
                }`}
                aria-label={`Show screenshot ${idx + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-transparent' : 'bg-black/25'}`} />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen expanded modal layer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/98 p-4 md:p-8 backdrop-blur"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Click to Close instruction strip */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
              <span className="font-mono text-2xs uppercase text-gray-500 tracking-widest hidden md:inline select-none">
                CLICK ANYWHERE TO REDIRECT BACKGROUND OR DISMISS [ESC]
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              >
                <Maximize2 className="w-4 h-4 rotate-180" />
              </button>
            </div>

            {/* Enlarged interactive frame */}
            <div className="relative max-w-7xl max-h-[80vh] aspect-[16/10] w-full bg-neutral-950/60 border border-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={images[currentIndex]}
                alt={projectTitle}
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* Giant pagination dots */}
            <div className="flex gap-2 mt-6">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-gold-accent' : 'bg-neutral-800'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
