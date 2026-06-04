/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ParallaxSplit() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is scrolled into view (0 to 1)
      const enteredDistance = windowHeight - rect.top;
      const totalDistance = windowHeight + rect.height;
      const progress = Math.max(0, Math.min(1, enteredDistance / totalDistance));
      
      // map progress (0.5 being centered) to travel bounds
      const offsetVal = (progress - 0.5) * 60; // moves max 30px up or down
      setScrollOffset(offsetVal);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax-split"
      className="bg-brand-offwhite w-full py-24 md:py-36 px-4 md:px-12 relative overflow-hidden flex flex-col justify-center items-center select-none"
    >
      <div className="max-w-6xl w-full relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left Side Container (Upper/Left Image) */}
        <div 
          className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-brand-nude/15 z-10 transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `translate3d(${-15 + scrollOffset * 0.4}px, ${-15 + scrollOffset * 0.4}px, 0)`,
            willChange: "transform"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80"
            alt="Makeup texture model"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Right Side Container (Lower/Right Image) */}
        <div 
          className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-brand-lilac/15 z-10 transition-transform duration-100 ease-out flex items-center justify-center md:top-12"
          style={{
            transform: `translate3d(${15 - scrollOffset * 0.4}px, ${15 - scrollOffset * 0.4}px, 0)`,
            willChange: "transform"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80"
            alt="Luminous cheekbone glow"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Center Text Overlay Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none md:p-6 text-center">
          <ScrollReveal>
            <div className="bg-brand-offwhite/90 backdrop-blur-md px-10 py-8 border border-brand-black/5 flex flex-col items-center gap-3 shadow-xl max-w-lg pointer-events-auto">
              <h2 className="font-serif text-[32px] md:text-[46px] lg:text-[54px] font-black text-brand-black leading-tight">
                MAKEUP, MADE <br />
                <span className="italic font-light text-brand-lilac">EFFORTLESS.</span>
              </h2>
              <p className="text-gray-500 font-sans text-xs tracking-widest uppercase">
                Lightweight, buildable formulas infused with skincare ingredients. 
              </p>
              <button
                onClick={() => {
                  const target = document.getElementById("bestsellers-section");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 text-xs font-sans font-bold uppercase tracking-[0.15em] border-b border-brand-black pb-1 hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-2"
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
