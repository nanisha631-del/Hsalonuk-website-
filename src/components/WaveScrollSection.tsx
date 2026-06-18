/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from "react";
import { getShopifySettings } from "../shopifySettings";

export default function WaveScrollSection() {
  const [isMobile, setIsMobile] = useState(false);
  const settings = getShopifySettings();

  // Settings customizable in Shopify
  const textContent = settings.wave_text || "Kind to your skin, gentle on the planet. • Pure active botanicals. • Kind to your skin, gentle on the planet.";
  const speedSeconds = (Number(settings.wave_speed_seconds) || 24) * 2.1;

  const [offset, setOffset] = useState(10);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // requestAnimationFrame text path animator supporting clean pausing on hover
  useEffect(() => {
    if (isPaused) return;
    let animId: number;
    let lastTime = performance.now();
    
    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      setOffset(prev => {
        // Scroll from 10% down to -40% (total span of 50%).
        const speed = 50 / speedSeconds; // percent per second
        let next = prev - speed * delta;
        if (next < -40) {
          next = 10;
        }
        return next;
      });
      
      animId = requestAnimationFrame(tick);
    };
    
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, speedSeconds]);

  // Generate path points dynamically for smooth mathematical curves
  const pathData = useMemo(() => {
    const startX = isMobile ? -500 : -1440;
    const endX = isMobile ? 950 : 2880;
    const step = 8;
    let d = "";

    const startY = isMobile ? 200 : 110; 
    const endY = isMobile ? 50 : 110;   
    const amplitude = isMobile ? 22 : 45; 
    const waveLength = isMobile ? 280 : 720; 

    for (let x = startX; x <= endX; x += step) {
      const t = (x - startX) / (endX - startX);
      const baseY = startY + (endY - startY) * t;

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
        <div 
          className="w-full relative h-[180px] sm:h-[210px] md:h-[230px] flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
              <textPath 
                href="#waveScrollingPath" 
                startOffset={`${offset}%`}
                fill="url(#textFadeGrad)"
              >
                {repeatedText}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
