/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";

export default function GreetingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const settings = getShopifySettings();

  const titleText = settings.greeting_heading || "H SALON LUXURY";
  const greetingText = settings.greeting_hint || "Wellness from";
  const bgImage = settings.greeting_image || "/wellness from hsalon luxury image.png";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Scrolled distance within the track
      const scrolled = -rect.top;
      const scrollableDistance = totalHeight - windowHeight;
      const progressVal = scrollableDistance <= 0 ? 0 : Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(isNaN(progressVal) ? 0 : progressVal);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    // Small delay to ensure measurements load perfectly
    const t = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(t);
    };
  }, []);

  // Map scroll progress to a comfortable range for text filling (starts after 5% scroll, completes at 95%)
  const animProgressRaw = (progress - 0.05) / 0.90;
  const animProgress = isNaN(animProgressRaw) ? 0 : Math.max(0, Math.min(1, animProgressRaw));

  // Programmatically combine last two words "YOUR" and "SHINE." to underline them together
  const initialWords = "HEALTHY HAIR AND BALANCED SCALP DOESN'T NEED TO BE COMPLICATED. OUR TREATMENT ELIXIRS BLEND ESSENTIAL PLANT CLINICALS SEAMLESSLY, CALMING SENSITIVE ROOTS ALL DAY AND BEAUTIFYING YOUR SHINE.".split(" ");
  const words = [...initialWords.slice(0, -2), "YOUR SHINE."];

  // Fade and translate CTA button based on scroll completeness (starts appearing when 82% text filled)
  const buttonOpacityRaw = (animProgress - 0.82) / 0.15;
  const buttonOpacity = isNaN(buttonOpacityRaw) ? 0 : Math.max(0, Math.min(1, buttonOpacityRaw));

  return (
    <section
      ref={sectionRef}
      id="scroll-greeting"
      className="relative w-full h-[340vh] bg-white text-black"
    >
      {/* Sticky container that keeps the cards and text fixed while filling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="max-w-5xl w-full flex flex-col items-center justify-center gap-4 md:gap-6 select-none px-4 md:px-12 text-center py-4">
          
          {/* Vintage Postcard Graphic with smiley pin */}
          <div className="relative mb-2 select-none hover:scale-[1.03] transition-transform duration-500 cursor-pointer shrink-0">
            {/* Smiley Face Pin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[#FFDF1B] border border-black flex items-center justify-center text-lg shadow-md animate-bounce">
              <span>😊</span>
            </div>

            {/* Postcard Body */}
            <div 
              className="relative w-[200px] sm:w-[260px] md:w-[300px] aspect-[1.5/1] bg-white p-2.5 sm:p-3 shadow-2xl -rotate-2 overflow-hidden flex flex-col justify-end"
              style={{ borderRadius: "2px" }}
            >
              {/* Stamp Look scalloped edges overlay */}
              <div className="absolute inset-0 border-[6px] border-white z-10" />
              
              {/* Scenic background photo */}
              <div className="absolute inset-0 w-full h-full">
                <ScrollZoomImage 
                  src={bgImage} 
                  alt="H Salon Apothecary Wellness Card" 
                  className="brightness-[0.7] contrast-[1.1]"
                />
              </div>
              
              {/* Retro title styles */}
              <div className="relative z-10 text-center flex flex-col select-none drop-shadow-lg pb-2 sm:pb-3 font-serif">
                <span className="italic text-white text-[15px] sm:text-[18px] md:text-[22px] leading-tight font-medium drop-shadow-md">
                  {greetingText}
                </span>
                <h3 className="font-sans font-black text-white text-[20px] sm:text-[26px] md:text-[30px] leading-[0.9] tracking-[0.05em] uppercase mt-1 drop-shadow-lg">
                  {titleText}
                </h3>
              </div>
            </div>
          </div>

          {/* Scrolling progressive fill text */}
          <div className="w-full max-w-4xl px-2">
            <p className="font-sans font-extrabold text-[16px] sm:text-[22px] md:text-[30px] lg:text-[36px] leading-[1.2] tracking-tight uppercase flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.06em]">
              {words.map((word, i, arr) => {
                const wordStart = i / arr.length;
                const wordEnd = (i + 1.5) / arr.length; // elegant overlap for super smooth cross-bleed
                
                let wordProgress = 0;
                if (animProgress >= wordEnd) {
                  wordProgress = 1;
                } else if (animProgress <= wordStart) {
                  wordProgress = 0;
                } else {
                  wordProgress = (animProgress - wordStart) / (wordEnd - wordStart);
                }

                // Smoothly fade text opacity from discrete 12% to pure bold black 100%
                const opacity = 0.12 + wordProgress * 0.88;

                const isLastWord = i === arr.length - 1;

                if (isLastWord) {
                  // progress of the curved underline drawing (starts when almost finished scrolling text)
                  const lineProgress = Math.max(0, Math.min(1, (animProgress - 0.78) / 0.16));
                  
                  return (
                    <span key={i} className="relative inline-block whitespace-nowrap">
                      <span
                        style={{
                          opacity,
                          transition: "opacity 0.15s ease-out, color 0.15s ease-out",
                          color: wordProgress > 0 ? "#000000" : "inherit"
                        }}
                        className="inline-block"
                      >
                        {word}
                      </span>
                      {/* Premium Curved Green Underline drawn precisely with scroll */}
                      <svg
                        className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-[8px] sm:h-[12px] overflow-visible pointer-events-none"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M2,3 Q50,9 98,3"
                          fill="none"
                          stroke="#008060"
                          strokeWidth="5"
                          strokeLinecap="round"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={100 * (1 - lineProgress)}
                          className="transition-all duration-75 ease-out"
                        />
                      </svg>
                    </span>
                  );
                }

                return (
                  <span
                    key={i}
                    style={{
                      opacity,
                      transition: "opacity 0.15s ease-out, color 0.15s ease-out",
                      color: wordProgress > 0 ? "#000000" : "inherit"
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
          <div 
            style={{ 
              opacity: buttonOpacity, 
              transform: `translateY(${(1 - buttonOpacity) * 12}px)`,
              pointerEvents: buttonOpacity > 0.5 ? "auto" : "none"
            }}
            className="transition-all duration-300 ease-out mt-4 shrink-0"
          >
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
      </div>
    </section>
  );
}
