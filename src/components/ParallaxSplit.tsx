/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";

export default function ParallaxSplit() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is scrolled into view (0 to 1)
      const enteredDistance = windowHeight - rect.top;
      const totalDistance = windowHeight + rect.height;
      const progress = Math.max(0, Math.min(1, enteredDistance / totalDistance));
      
      // map progress (0.5 being centered) to travel bounds
      const offsetVal = (progress - 0.5) * 50; // moves max 25px
      setScrollOffset(offsetVal);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax-split"
      className="bg-brand-offwhite w-full py-10 sm:py-14 px-4 md:px-12 relative overflow-hidden flex flex-col items-center select-none"
    >
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
        
        {/* Overlapping Polaroid Image Container */}
        <div className="relative w-[210px] sm:w-[350px] h-[210px] sm:h-[410px] mx-auto flex items-center justify-center">
          
          {/* POLAROID 1 (REAR PHOTO) - Moves slightly left and up on scroll */}
          <div 
            className="absolute top-1 left-2 sm:left-12 w-[110px] sm:w-[190px] bg-white p-1.5 pb-5 sm:p-2.5 sm:pb-11 shadow-lg border border-brand-black/5 transition-transform duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) z-0 origin-center"
            style={{
              transform: `translate3d(${-8 - scrollOffset * 0.15}px, ${-scrollOffset * 0.05}px, 0) rotate(-4.5deg)`,
              willChange: "transform"
            }}
          >
            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden relative">
              <ScrollZoomImage
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"
                alt="Models lip gloss pose"
              />
            </div>
            <div className="mt-1.5 text-left font-mono text-[6px] sm:text-[8px] text-gray-300 tracking-wider">
              LIP_GLOSS // 01
            </div>
          </div>

          {/* POLAROID 2 (FRONT PHOTO) - Moves slightly right and down on scroll */}
          <div 
            className="absolute top-10 left-16 sm:top-24 sm:left-32 w-[110px] sm:w-[190px] bg-white p-1.5 pb-5 sm:p-2.5 sm:pb-11 shadow-xl border border-brand-black/5 transition-transform duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) z-10 origin-center"
            style={{
              transform: `translate3d(${8 + scrollOffset * 0.18}px, ${scrollOffset * 0.08}px, 0) rotate(5deg)`,
              willChange: "transform"
            }}
          >
            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden relative">
              <ScrollZoomImage
                src="https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80"
                alt="Makeup look pose"
              />
            </div>
            <div className="mt-1.5 text-left font-mono text-[6px] sm:text-[8px] text-gray-300 tracking-wider">
              MAKEUP // DEWY
            </div>
          </div>
        </div>

        {/* Center Text Layer UNDER Polaroid stack */}
        <div className="w-full flex flex-col items-center max-w-lg mt-2">
          <ScrollReveal direction="up" distance={25}>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-black leading-tight text-brand-black uppercase leading-[1]">
                MAKEUP, MADE <br />
                <span className="relative inline-block z-10 whitespace-nowrap text-brand-black italic font-light lowercase font-serif py-1">
                  effortless.
                  <span className="absolute bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#E1D1FF] -z-10 rounded-full scale-x-105 origin-left transform -rotate-1 opacity-70" />
                </span>
              </h2>
              
              <p className="text-gray-500 font-sans text-[13px] sm:text-[15px] leading-relaxed max-w-sm mt-1">
                Lightweight, buildable makeup infused with skincare-level ingredients. Easy to wear, easy to blend, and made for whatever your routine looks like.
              </p>
              
              <button
                onClick={() => {
                  const target = document.getElementById("bestsellers-section");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-4 text-xs font-sans font-bold uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1.5 text-brand-black"
              >
                SHOP THE COLLECTION
                <ArrowRight className="w-4 h-4 text-brand-lilac" />
              </button>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
