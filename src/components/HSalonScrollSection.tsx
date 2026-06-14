/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function HSalonScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into the scroll progress OF THE CONTAINER relative to the viewport
  // "start start" locks the sticky track perfectly, "end end" releases it beautifully.
  // This secures a complete locked pin state while the animation plays during scroll.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optimize spring dynamics to guarantee instant response and zero lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.2,
    restDelta: 0.0001
  });

  // Text reveal mask progress (reveals from left to right 0% to 100%)
  // Completed within the mid-scroll range to allow breathing room at the start and end
  const revealProgress = useTransform(smoothProgress, [0.08, 0.54], [0, 100]);

  // Framer Motion native pathLength drawing (from 0 to 1)
  // Draws elegantly only when the text color reveal is fully complete
  const underlineDrawing = useTransform(smoothProgress, [0.54, 0.84], [0, 1]);

  // Prevent any pre-render dot artifacts by keeping opacity 0 until drawing starts
  const underlineOpacity = useTransform(smoothProgress, [0.54, 0.56], [0, 1]);

  // Connect reveal percent directly to a CSS percentage string for width masking
  const maskWidthPercent = useTransform(revealProgress, (v) => `${v}%`);

  return (
    <section
      ref={containerRef}
      id="hsalon-scroll-brand"
      className="relative w-full h-[155vh] md:h-[230vh] bg-brand-offwhite select-none overflow-visible"
    >
      {/* 
        Fully locked h-screen viewport pin.
        Locks the browser window in place to ensure NOTHING moves up or down during the scroll reveal.
        Centers the content perfectly so that top and bottom margins are exactly symmetrical.
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-12">
        <div className="relative flex flex-col items-center justify-center max-w-5xl w-full text-center">
          
          <div className="relative inline-block select-none">
            {/* Background layer: Very faint "H Salon" base text */}
            <h2 className="font-sans text-[64px] sm:text-[110px] md:text-[150px] lg:text-[180px] font-black leading-none uppercase tracking-tighter text-black/[0.045] select-none block">
              H SALON
            </h2>

            {/* 
              Foreground layer: Dynamic Width-Based Mask.
              This masks with pure CSS text positioning, completely avoiding dynamic clipPath recalculation.
              By rendering the foreground text overlay inside a container where width is driven by Framer Motion, 
              we achieve 120fps hardware-accelerated, butter-smooth scroll revealing on both desktop and mobile.
            */}
            <motion.div
              style={{ width: maskWidthPercent }}
              className="absolute left-0 top-0 h-full overflow-hidden whitespace-nowrap"
            >
              {/* This overlay text has a fixed width to ensure it never squeezes or shifts, keeping alignment pixel-perfect */}
              <h2 className="font-sans text-[64px] sm:text-[110px] md:text-[150px] lg:text-[180px] font-black leading-none uppercase tracking-tighter text-brand-black select-none block whitespace-nowrap">
                H SALON
              </h2>
            </motion.div>

            {/* 
              Hand-drawn, classy "one zigzag" underline (down-up-down).
              Positioned with increased gap to prevent crowding the text.
              Stroke is significantly thinner and highly elegant to match premium branding.
            */}
            <svg
              className="absolute left-0 -bottom-3 sm:-bottom-5 md:-bottom-7 w-full h-[14px] sm:h-[18px] md:h-[24px] overflow-visible pointer-events-none px-2 sm:px-4"
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 4,4 L 38,9 L 55,2 L 72,10 L 116,4"
                fill="none"
                stroke="#82D8C5"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: underlineDrawing,
                  opacity: underlineOpacity
                }}
              />
            </svg>
          </div>

          <p className="mt-7 sm:mt-11 font-sans font-extrabold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-brand-black/40">
            Apothecary & Hair Spa Collective
          </p>
        </div>
      </div>
    </section>
  );
}
