/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function GreetingSection() {
  const [fillPercent, setFillPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // We want to fill the scroll text as it travels through the center half of the viewport
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      // Calculate active progress 0 to 1 based on center of screen
      const startActive = windowHeight * 0.9;
      const endActive = windowHeight * 0.15;
      
      const range = startActive - endActive;
      const current = startActive - elementTop;
      const progress = Math.max(0, Math.min(1, current / range));
      
      setFillPercent(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
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
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" 
              alt="Phenomena Coastal Travel Card" 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
            
            {/* Retro title styles */}
            <div className="relative z-10 text-center flex flex-col select-none drop-shadow-md pb-4 font-serif">
              <span className="italic text-white text-[22px] sm:text-[28px] md:text-[32px] leading-tight font-medium">
                Greetings from
              </span>
              <h3 className="font-sans font-black text-[#F2825B] text-[34px] sm:text-[42px] md:text-[48px] leading-[0.9] tracking-[0.05em] uppercase mt-1">
                PHENOMENA
              </h3>
            </div>
          </div>
        </div>

        {/* Scrolling progressive fill text */}
        <div className="w-full max-w-4xl px-2">
          <p 
            className="font-sans font-extrabold text-[28px] sm:text-[38px] md:text-[54px] lg:text-[58px] leading-[1.08] tracking-tight uppercase"
            style={{
              background: `linear-gradient(to right, #000000 0%, #000000 ${fillPercent}%, rgba(0,0,0,0.12) ${fillPercent}%, rgba(0,0,0,0.12) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "background 0.05s ease-out"
            }}
          >
            GOOD MAKEUP DOESN'T NEED TO BE COMPLICATED. <br />
            OUR PRODUCTS BLEND IN SEAMLESSLY, FEEL COMFORTABLE ALL DAY, AND FIT INTO WHATEVER YOUR ROUTINE LOOKS LIKE.
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
