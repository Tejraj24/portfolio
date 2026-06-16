import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Testimonial } from '../types';
import { TESTIMONIALS } from '../data';

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = TESTIMONIALS;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative Light Glows */}
      <div className="absolute right-[-100px] top-[-100px] w-96 h-96 bg-gold-accent/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-[-100px] bottom-[-100px] w-96 h-96 bg-gold-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-gold-accent uppercase tracking-widest block mb-3">CLIENT ENDORSEMENTS</span>
            <h2 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter uppercase leading-none">
              EDITORIAL <br />
              <span className="text-stroke-white text-white">TESTIMONIALS.</span>
            </h2>
          </div>

          {/* Nav Buttons */}
          <div className="flex space-x-3" id="testimonials-nav-buttons">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-neutral-800 hover:border-gold-accent flex items-center justify-center text-gray-400 hover:text-gold-accent transition-all duration-300 interactive-cursor hover:bg-neutral-900"
              aria-label="Previous testimonial"
              id="testimonials-prev-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-neutral-800 hover:border-gold-accent flex items-center justify-center text-gray-400 hover:text-gold-accent transition-all duration-300 interactive-cursor hover:bg-neutral-900"
              aria-label="Next testimonial"
              id="testimonials-next-btn"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container - Glassmorph Cards */}
        <div className="relative min-h-[380px] sm:min-h-[300px] flex items-center" id="testimonials-carousel-box">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full"
            >
              {/* Luxury Glass Card */}
              <div className="bg-neutral-950/60 backdrop-blur-md border border-neutral-800/80 rounded-4xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                {/* Background decorative Quotation Mark */}
                <Quote className="absolute right-12 bottom-4 w-48 h-48 text-neutral-900/40 pointer-events-none select-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  {/* Avatar section */}
                  <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                    <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-gold-accent to-neutral-800">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={`${testimonials[currentIndex].name}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full select-none"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xl text-white tracking-tight">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="font-mono text-[10px] text-gold-accent uppercase tracking-widest mt-1">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="font-sans text-xs text-gray-500 mt-0.5">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>

                  {/* Feedback feedback */}
                  <div className="lg:col-span-9 flex flex-col justify-center h-full">
                    <Quote className="w-8 h-8 text-gold-accent mb-6" />
                    <blockquote className="font-sans text-base sm:text-lg md:text-xl text-gray-300 italic font-light leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    {/* Selector indicators */}
                    <div className="flex space-x-2 mt-8 justify-center lg:justify-start" id="testimonials-dots">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 transition-all duration-300 rounded-full interactive-cursor ${
                            idx === currentIndex ? 'w-8 bg-gold-accent' : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                          id={`testimonials-dot-${idx}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
