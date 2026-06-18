/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { getShopifySettings } from "../shopifySettings";

export default function HSalonScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const settings = getShopifySettings();

  // Support custom Shopify template settings or dynamic values
  const rawHeadingText = settings.hsalon_heading || "H salon";
  const subText = settings.hsalon_subtext || "Apothecary & Hair Spa Collective";
  
  // Clean, sanitized uppercase string split into letters for sequential filling
  const wordText = rawHeadingText.toUpperCase();
  const letters = wordText.split("");

  // Hook into the scroll progress OF THE CONTAINER relative to the viewport
  // Slower speed by using a significantly taller container track h-[280vh] sm:h-[320vh]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate underline drawing progress with a customized easing mapping:
  // Starts fast, and slows down near the end of the drawing sequence.
  const underlineDrawing = useTransform(
    scrollYProgress,
    [0.75, 0.78, 0.82, 0.87, 0.92],
    [0, 0.45, 0.75, 0.92, 1],
    { clamp: true }
  );
  const underlineOpacity = useTransform(scrollYProgress, [0.74, 0.76], [0, 1], { clamp: true });

  const activeUnderlineColor = "#82D8C5";

  return (
    <section
      ref={containerRef}
      id="hsalon-scroll-brand"
      className="relative w-full h-[280vh] sm:h-[320vh] bg-brand-offwhite select-none overflow-visible"
    >
      {/* 
        Fully locked h-screen viewport pin to ensure content remains perfectly centered and symmetrical
        as the user scrolls and fills each character of the brand heading rigidly.
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-12">
        <div className="relative flex flex-col items-center justify-center max-w-5xl w-full text-center">
          
          <div className="relative inline-block select-none">
            {/* 
              Flex container holding our characters for seamless inline alignment.
              Each letter fills sequentially ("one by one") based on its scroll window segment.
            */}
            <div className="flex justify-center items-center font-sans font-black text-[54px] sm:text-[98px] md:text-[135px] lg:text-[160px] leading-none uppercase tracking-tighter select-none whitespace-nowrap">
              {letters.map((char, index) => {
                const totalChars = letters.length;
                
                // Active range for the scroll text filling starts at 15% and completes at 75% scroll track
                const startRange = 0.15;
                const endRange = 0.75;
                const step = (endRange - startRange) / totalChars;
                
                const charStart = startRange + index * step;
                const charEnd = startRange + (index + 1) * step;
                
                // Directly map container scroll progress to this specific character's reveal percentage [0% to 100%]
                // Using raw scroll transform guarantees real-time rigid control without automatic delayed sliding.
                const charFillProgress = useTransform(scrollYProgress, [charStart, charEnd], [0, 100], { clamp: true });
                const charFillWidthStr = useTransform(charFillProgress, (val) => `${val}%`);

                return (
                  <div key={index} className="relative inline-block select-none">
                    {/* Background layer: Subtle text placeholder */}
                    <span className="text-black/[0.045]">
                      {char === " " ? "\u00A0" : char}
                    </span>
                    
                    {/* Active foreground layer: Clipped mask filling with solid rich black (#000000) */}
                    <motion.div 
                      style={{ width: charFillWidthStr }}
                      className="absolute left-0 top-0 h-full overflow-hidden whitespace-nowrap text-[#000000] drop-shadow-sm pointer-events-none"
                    >
                      <span className="text-[#000000]">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* 
              Hand-drawn, classy underline drawing precisely linked to finish.
              Positioned with custom padding to match original aesthetic seamlessly.
            */}
            <svg
              className="absolute left-0 -bottom-3 sm:-bottom-5 md:-bottom-7 w-full h-[14px] sm:h-[18px] md:h-[24px] overflow-visible pointer-events-none px-2 sm:px-4"
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 3,6 C 35,11 85,11 117,4.5"
                fill="none"
                stroke={activeUnderlineColor}
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: underlineDrawing,
                  opacity: underlineOpacity
                }}
              />
            </svg>
          </div>

          <p className="mt-8 sm:mt-12 font-sans font-extrabold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-brand-black/40">
            {subText}
          </p>
        </div>
      </div>
    </section>
  );
}
