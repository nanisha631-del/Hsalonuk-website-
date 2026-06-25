/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";

export default function GreetingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const settings = getShopifySettings();

  const titleText = settings.greeting_heading || "H SALON LUXURY";
  const greetingText = settings.greeting_hint || "Wellness from";
  const bgImage = settings.greeting_image || "/cap salon.png";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Programmatically combine last two words "YOUR" and "SHINE." to underline them together
  const initialWords = "HEALTHY HAIR AND BALANCED SCALP DOESN'T NEED TO BE COMPLICATED. OUR TREATMENT ELIXIRS BLEND ESSENTIAL PLANT CLINICALS SEAMLESSLY, CALMING SENSITIVE ROOTS ALL DAY AND BEAUTIFYING YOUR SHINE.".split(" ");
  const words = [...initialWords.slice(0, -2), "YOUR SHINE."];

  // Last word underline progress (starts when 78% scrolled, ends at 94%)
  const lineProgress = useTransform(scrollYProgress, [0.78, 0.94], [0, 1]);

  // Button transitions (starts at 82% scrolled, ends at 97%)
  const buttonOpacity = useTransform(scrollYProgress, [0.82, 0.97], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.82, 0.97], [12, 0]);
  const buttonPointerEvents = useTransform(scrollYProgress, (val) => val > 0.82 ? "auto" : "none");

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
                  loading="eager"
                  fetchPriority="high"
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
              {words.map((word, i) => {
                // Map the overall scroll range: text fill happens over [0.05, 0.95]
                const totalRange = 0.95 - 0.05;
                const wordStart = 0.05 + (i / words.length) * totalRange;
                const wordEnd = 0.05 + ((i + 1.5) / words.length) * totalRange;
                
                // Opacity and color values mapped smoothly via Framer Motion without React re-renders
                const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.12, 1.0]);
                const textColor = useTransform(scrollYProgress, [wordStart, wordEnd], ["rgba(0, 0, 0, 0.12)", "rgba(0, 0, 0, 1)"]);

                const isLastWord = i === words.length - 1;

                if (isLastWord) {
                  return (
                    <span key={i} className="relative inline-block whitespace-nowrap">
                      <motion.span
                        style={{
                          opacity,
                          color: textColor,
                        }}
                        className="inline-block transition-colors duration-150"
                      >
                        {word}
                      </motion.span>
                      {/* Premium Curved Green Underline drawn precisely with scroll */}
                      <svg
                        className="absolute left-0 -bottom-2 md:-bottom-3 w-full h-[8px] sm:h-[12px] overflow-visible pointer-events-none"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M2,3 Q50,9 98,3"
                          fill="none"
                          stroke="#82D8C5"
                          strokeWidth="5"
                          strokeLinecap="round"
                          pathLength="100"
                          strokeDasharray="100"
                          style={{
                            strokeDashoffset: useTransform(lineProgress, [0, 1], [100, 0])
                          }}
                        />
                      </svg>
                    </span>
                  );
                }

                return (
                  <motion.span
                    key={i}
                    style={{
                      opacity,
                      color: textColor,
                    }}
                    className="inline-block transition-colors duration-150"
                  >
                    {word}
                  </motion.span>
                );
              })}
            </p>
          </div>

          {/* Call to action below fill text */}
          <motion.div 
            style={{ 
              opacity: buttonOpacity, 
              y: buttonY,
              pointerEvents: buttonPointerEvents
            }}
            className="mt-4 shrink-0"
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
