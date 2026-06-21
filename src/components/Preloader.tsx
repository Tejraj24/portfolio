import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "JACK OF CURIOSITY , MASTER OF CREATION";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsTypingComplete(true), 800); // pause before fade out
      }
    }, 50); // typing speed

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => onComplete(), 800); // allow fade out animation
      return () => clearTimeout(timer);
    }
  }, [isTypingComplete, onComplete]);

  return (
    <AnimatePresence>
      {!isTypingComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary text-black dark:text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="font-mono text-sm md:text-xl uppercase tracking-widest text-center px-4 flex items-center">
            {text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 md:w-3 h-4 md:h-6 bg-gold-accent ml-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
