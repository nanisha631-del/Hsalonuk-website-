import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollToTopCircle() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDraining, setIsDraining] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isDraining) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          
          setScrollPercent(percent);
          setIsVisible(scrollTop > 350);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDraining]);

  const handleScrollToTop = () => {
    if (isDraining) return;
    setIsDraining(true);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Animate the "draining" effect of the fluid level to 0 over 850ms
    const startVal = scrollPercent;
    const startTime = performance.now();
    const duration = 850; // Smooth draining duration

    const animateDrain = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Decelerating (Ease Out Cubic) draining
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = startVal * (1 - easeProgress);
      
      setScrollPercent(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateDrain);
      } else {
        setScrollPercent(0);
        setIsDraining(false);
        setIsVisible(false);
      }
    };

    requestAnimationFrame(animateDrain);
  };

  // Render double chevrons exactly matching the reference images
  const renderChevrons = (color: string) => (
    <svg 
      className="absolute inset-0 w-full h-full p-2.5 transition-transform duration-300 group-hover:-translate-y-[2px]" 
      viewBox="0 0 100 100"
      fill="none"
    >
      <path 
        d="M30 58 L50 38 L70 58" 
        stroke={color} 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M30 40 L50 20 L70 40" 
        stroke={color} 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-circle"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 md:bottom-6 right-6 z-50 w-11 h-11 rounded-full cursor-pointer bg-[#FCFAF7] shadow-xl flex items-center justify-center p-0 border border-brand-black/10 select-none group focus:outline-none overflow-hidden"
          title="Scroll back to top"
        >
          {/* Base Layer: Off-white background with black chevrons */}
          <div className="absolute inset-0 bg-[#FCFAF7]" />
          {renderChevrons("#111111")}

          {/* Liquid Layer: Fills with black from bottom based on scroll percentage - no CSS transitions for 100% lag-free responsiveness */}
          <div 
            className="absolute left-0 right-0 bottom-0 bg-[#111111] overflow-hidden pointer-events-none"
            style={{ height: `${scrollPercent}%` }}
          >
            {/* White chevrons layer aligned perfectly over the black ones */}
            <div className="absolute left-0 right-0 bottom-0 w-11 h-11">
              {renderChevrons("#FCFAF7")}
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
