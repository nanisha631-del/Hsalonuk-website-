/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { getShopifySettings } from "../shopifySettings";

export default function WaveScrollSection() {
  const [isMobile, setIsMobile] = useState(false);
  const settings = getShopifySettings();

  // Settings customizable in Shopify
  const textContent = settings.wave_text || "Kind to your skin, gentle on the planet. • Pure active botanicals. • Kind to your skin, gentle on the planet.";
  const speedSeconds = Number(settings.wave_speed_seconds) || 24;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate path points dynamically for smooth mathematical curves
  const pathData = useMemo(() => {
    // Large margins to ensure seamless endless wrapping of text scrolling
    const startX = isMobile ? -500 : -1440;
    const endX = isMobile ? 950 : 2880;
    const step = 8;
    let d = "";

    // Exact mathematical wave params matching user request:
    // Only EXACTLY 2 wave mounts (crests) on laptop/desktop viewports (1440px wide).
    // Wavelength of 720px causes precisely 2 wave cycles (crest-trough) to appear across 1440px.
    // Extremely polished mobile view curving from top-right to bottom-left with fewer mounts.
    const startY = isMobile ? 200 : 110; // Left side baseline
    const endY = isMobile ? 50 : 110;   // Right side baseline
    const amplitude = isMobile ? 22 : 45; // Deep wave crest depth
    const waveLength = isMobile ? 280 : 720; // 720px wavelength = exactly 2 waves across 1440px layout width

    for (let x = startX; x <= endX; x += step) {
      const t = (x - startX) / (endX - startX);
      const baseY = startY + (endY - startY) * t;

      // Mathematical sine wave formulation
      const angle = (x / waveLength) * Math.PI * 2;
      const y = baseY + Math.sin(angle) * amplitude;

      if (x === startX) {
        d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      } else {
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    }
    return d;
  }, [isMobile]);

  // Repeat the text string so it flows endlessly across the entire path length
  const repeatedText = useMemo(() => {
    const segments = Array(15).fill(textContent);
    return segments.join("   •   ");
  }, [textContent]);

  return (
    <section 
      id="wave-scroll-text" 
      className="bg-brand-offwhite w-full py-4 sm:py-6 md:py-8 relative overflow-hidden select-none flex items-center justify-center border-t border-b border-brand-black/5"
    >
      <div className="w-full max-w-7xl mx-auto px-4 relative flex flex-col justify-center items-center">
        {/* Compact SVG Container with minimal top and bottom helper margins */}
        <div className="w-full relative h-[180px] sm:h-[210px] md:h-[230px] flex items-center justify-center">
          <svg
            viewBox={isMobile ? "0 0 450 260" : "0 0 1440 220"}
            className="w-full h-full overflow-visible pointer-events-none"
            style={{ width: "100%", height: "100%" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Curve path defined for our textPath target */}
              <path id="waveScrollingPath" d={pathData} />
              
              {/* Luxurious text gradient fading smoothly toward the horizontal edges */}
              <linearGradient id="textFadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0B0B0B" stopOpacity="0" />
                <stop offset="8%" stopColor="#0B0B0B" stopOpacity="0.95" />
                <stop offset="92%" stopColor="#0B0B0B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0B0B0B" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Render curved animated marquee text matching elegant styling */}
            <text 
              className="text-[19px] sm:text-[25px] md:text-[30px] text-brand-black tracking-widest font-normal uppercase fill-current"
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
                fontStyle: "italic"
              }}
            >
              <motion.textPath 
                href="#waveScrollingPath" 
                animate={{ startOffset: ["10%", "-40%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: speedSeconds
                }}
                fill="url(#textFadeGrad)"
              >
                {repeatedText}
              </motion.textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
