/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";

export default function ParallaxSplit() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const settings = getShopifySettings();
  const [isInView, setIsInView] = useState(false);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (underlineRef.current) {
      observer.observe(underlineRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const title1 = settings.parallax_title_line_1 || "HAIR & SCALP,";
  const title2 = settings.parallax_title_line_2_italic || "effortless.";
  const desc = settings.parallax_desc || "Prestige, plant-active elixirs and scalp-healing balms infused with clean aromatherapy. Crafted to soothe roots, nourish skin, and shield hair from everyday stresses.";
  const btnText = settings.parallax_button_text || "SHOP THE COLLECTION";
  
  // Use user's new images as default fallbacks
  const img1 = settings.parallax_image_1 || "/image frame 1.jpeg";
  const img2 = settings.parallax_image_2 || "/image frame 2.jpeg";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Framer Motion zero re-render scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // spread progress goes from 1 to 0 over scroll interval [0.12, 0.50]
  const spread = useTransform(scrollYProgress, [0.12, 0.50], [1, 0]);

  // Coordinate transforms mapped smoothly to the spread factor
  const leftX = useTransform(spread, (s) => isMobile ? -28 - (s * 95) : -65 - (s * 175));
  const leftY = useTransform(spread, (s) => isMobile ? -15 - (s * 15) : -35 - (s * 30));
  const leftRot = useTransform(spread, (s) => -4.5 - (s * 6));
  const leftOpacity = useTransform(scrollYProgress, [0.12, 0.50], [0.6, 1.0]);

  const rightX = useTransform(spread, (s) => isMobile ? 28 + (s * 95) : 65 + (s * 175));
  const rightY = useTransform(spread, (s) => isMobile ? 15 + (s * 15) : 35 + (s * 30));
  const rightRot = useTransform(spread, (s) => 5 + (s * 6));
  const rightOpacity = useTransform(scrollYProgress, [0.12, 0.50], [0.6, 1.0]);

  return (
    <section
      ref={sectionRef}
      id="parallax-split"
      className="bg-brand-offwhite w-full py-10 sm:py-14 px-4 md:px-12 relative overflow-hidden flex flex-col items-center select-none"
    >
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
        
        {/* Overlapping Polaroid Image Container - Boosted sizing for grander feel */}
        <div className="relative w-[280px] sm:w-[480px] h-[260px] sm:h-[450px] mx-auto flex items-center justify-center">
          
          {/* POLAROID 1 (REAR PHOTO) - Dynamically flies in from left and rotates on scroll */}
          <motion.div 
            className="absolute w-[130px] sm:w-[220px] bg-white p-2 pb-6 sm:p-3.5 sm:pb-14 shadow-lg border border-brand-black/5 z-0 origin-center"
            style={{
              x: leftX,
              y: leftY,
              rotate: leftRot,
              opacity: leftOpacity,
              willChange: "transform, opacity",
            }}
          >
            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden relative">
              <ScrollZoomImage
                src={img1}
                alt="Scalp treatment visual"
                loading="lazy"
              />
            </div>
            <div className="mt-1.5 text-left font-mono text-[7px] sm:text-[9px] text-gray-400 tracking-wider">
              SCALP_ELIXIR // 01
            </div>
          </motion.div>

          {/* POLAROID 2 (FRONT PHOTO) - Dynamically flies in from right and rotates on scroll */}
          <motion.div 
            className="absolute w-[130px] sm:w-[220px] bg-white p-2 pb-6 sm:p-3.5 sm:pb-14 shadow-xl border border-brand-black/5 z-10 origin-center"
            style={{
              x: rightX,
              y: rightY,
              rotate: rightRot,
              opacity: rightOpacity,
              willChange: "transform, opacity",
            }}
          >
            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden relative">
              <ScrollZoomImage
                src={img2}
                alt="Hair gloss visual"
                loading="lazy"
              />
            </div>
            <div className="mt-1.5 text-left font-mono text-[7px] sm:text-[9px] text-gray-400 tracking-wider">
              HAIR_GLOSS // DEEP
            </div>
          </motion.div>
        </div>

        {/* Center Text Layer UNDER Polaroid stack */}
        <div className="w-full flex flex-col items-center max-w-lg mt-2">
          <ScrollReveal direction="up" distance={25}>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-black leading-tight text-brand-black uppercase leading-[1]">
                {title1} <br />
                <span className="relative inline-block z-10 whitespace-nowrap text-brand-black italic font-light lowercase font-serif py-1">
                  {title2}
                  <span 
                    ref={underlineRef}
                    className={`absolute bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#82D8C5] -z-10 rounded-full origin-left transform -rotate-1 opacity-90 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isInView ? "scale-x-105" : "scale-x-0"
                    }`}
                    style={settings.brand_primary_color ? { backgroundColor: settings.brand_primary_color } : {}}
                  />
                </span>
              </h2>
              
              <p className="text-gray-500 font-sans text-[13px] sm:text-[15px] leading-relaxed max-w-sm mt-1">
                {desc}
              </p>
              
              <button
                onClick={() => {
                  const target = document.getElementById("bestsellers-section");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-4 text-xs font-sans font-bold uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1.5 text-brand-black"
              >
                {btnText}
                <ArrowRight className="w-4 h-4 text-brand-lilac" style={settings.brand_primary_color ? { color: settings.brand_primary_color } : {}} />
              </button>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
