/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";

export default function GreetingSection() {
  const [fillPercent, setFillPercent] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress exactly when text elements cross the viewport center
      // Start filling when text top enters 85% of viewport height
      // Finish filling when text top is at 35% of viewport height
      const startFill = windowHeight * 0.85;
      const endFill = windowHeight * 0.35;
      
      const range = startFill - endFill;
      const current = startFill - rect.top;
      const progress = Math.max(0, Math.min(1, current / range));
      
      setFillPercent(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial calls
    handleScroll();
    const t = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="scroll-greeting"
      className="bg-white text-black w-full py-28 md:py-36 px-4 md:px-12 relative overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      <div className="max-w-6xl flex flex-col items-center gap-10">
        
        {/* Vintage Postcard Graphic with smiley pin */}
        <div className="relative mb-6 select-none hover:scale-[1.03] transition-transform duration-500 cursor-pointer">
          {/* Smiley Face Pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[#FFDF1B] border border-black flex items-center justify-center text-lg shadow-md animate-bounce">
            <span>😊</span>
          </div>

          {/* Postcard Body */}
          <div 
            className="relative w-[280px] sm:w-[350px] md:w-[410px] aspect-[1.5/1] bg-white p-3 shadow-2xl -rotate-2 overflow-hidden flex flex-col justify-end"
            style={{ borderRadius: "2px" }}
          >
            {/* Stamp Look scalloped edges overlay */}
            <div className="absolute inset-0 border-[6px] border-white z-10" />
            
            {/* Scenic background photo */}
            <div className="absolute inset-0 w-full h-full">
              <ScrollZoomImage 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" 
                alt="The Skin Lab Coastal Travel Card" 
                className="brightness-[0.7] contrast-[1.1]"
              />
            </div>
            
            {/* Retro title styles */}
            <div className="relative z-10 text-center flex flex-col select-none drop-shadow-lg pb-4 font-serif">
               <span className="italic text-white text-[22px] sm:text-[28px] md:text-[32px] leading-tight font-medium drop-shadow-md">
                Greetings from
              </span>
              <h3 className="font-sans font-black text-white text-[32px] sm:text-[40px] md:text-[45px] leading-[0.9] tracking-[0.05em] uppercase mt-1 drop-shadow-lg">
                THE SKIN LAB
              </h3>
            </div>
          </div>
        </div>

        {/* Scrolling progressive fill text */}
        <div className="w-full max-w-4xl px-2">
          <p ref={textRef} className="font-sans font-extrabold text-[26px] sm:text-[36px] md:text-[50px] lg:text-[54px] leading-[1.12] tracking-tight uppercase flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em]">
            {"GOOD MAKEUP DOESN'T NEED TO BE COMPLICATED. OUR PRODUCTS BLEND IN SEAMLESSLY, FEEL COMFORTABLE ALL DAY, AND FIT INTO WHATEVER YOUR ROUTINE LOOKS LIKE.".split(" ").map((word, i, arr) => {
              const progress = fillPercent / 100;
              const wordStart = i / arr.length;
              const wordEnd = (i + 1.3) / arr.length; // slight overlap for smooth bleed
              let wordProgress = 0;
              if (progress >= wordEnd) {
                wordProgress = 1;
              } else if (progress <= wordStart) {
                wordProgress = 0;
              } else {
                wordProgress = (progress - wordStart) / (wordEnd - wordStart);
              }

              // Color smooth transition: light warm beige to pure bold black
              const r = Math.round(210 - wordProgress * (210 - 10));
              const g = Math.round(205 - wordProgress * (205 - 10));
              const b = Math.round(195 - wordProgress * (195 - 10));
              const color = `rgb(${r}, ${g}, ${b})`;

              return (
                <span
                  key={i}
                  style={{
                    color,
                    transition: "color 0.15s ease-out",
                  }}
                  className="inline-block"
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* Call to action below fill text */}
        <div className="mt-4">
          <button
            onClick={() => {
              const target = document.getElementById("bestsellers-section");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-black hover:bg-brand-lilac hover:text-black text-white font-sans font-bold text-[11px] uppercase tracking-[0.2em] px-10 py-4.5 rounded-full shadow-lg hover:scale-103 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            SHOP OUR PRODUCTS
          </button>
        </div>

      </div>
    </section>
  );
}
