/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface UgcItem {
  id: string;
  imageUrl: string;
  handle: string;
  instagramUrl: string;
}

const UGC_ITEMS: UgcItem[] = [
  {
    id: "g1",
    imageUrl: "/instagram_1.jpg",
    handle: "@hsalonapothecary",
    instagramUrl: "https://www.instagram.com/p/DZc6RWQIYrI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g2",
    imageUrl: "/instagram_2.jpg",
    handle: "@hsalonapothecary",
    instagramUrl: "https://www.instagram.com/p/DZfu24OI7LI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g3",
    imageUrl: "/instagram_3.jpg",
    handle: "@yatra.signature",
    instagramUrl: "https://www.instagram.com/p/DYzNHGMiEVC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g4",
    imageUrl: "/instagram_4.jpg",
    handle: "@hsalonapothecary",
    instagramUrl: "https://www.instagram.com/p/DXy_yGiiAGq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g5",
    imageUrl: "/instagram_5.jpg",
    handle: "@hsalon.chelsea",
    instagramUrl: "https://www.instagram.com/p/DU0XKoGDseG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g6",
    imageUrl: "/instagram_6.jpg",
    handle: "@scalpsilk.cannes",
    instagramUrl: "https://www.instagram.com/p/DUnS8rEiCQu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g7",
    imageUrl: "/instagram_7.jpg",
    handle: "@hsalonapothecary",
    instagramUrl: "https://www.instagram.com/p/DQpGtfhiCxS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "g8",
    imageUrl: "/instagram_8.jpg",
    handle: "@love.hsalon",
    instagramUrl: "https://www.instagram.com/p/DNSSA2QzoVc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  }
];

export default function CommunitySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple the items so we have a long continuous loop for infinite marquee effect
  const TRIPLE_ITEMS = [...UGC_ITEMS, ...UGC_ITEMS, ...UGC_ITEMS];

  return (
    <section 
      id="community-ugc" 
      className="bg-white text-brand-black w-full py-12 px-4 md:px-12 relative overflow-hidden select-none border-t border-brand-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">
        
        {/* Giant Centered Stats Headers - Tightened and Sleeker */}
        <div className="flex flex-col items-center gap-1 max-w-xl">
          <ScrollReveal>
            <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-brand-lilac font-black">
              TAG @HSALONAPOTHECARY FOR A CHANCE TO BE FEATURED
            </span>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="font-serif text-[60px] md:text-[76px] font-black leading-none text-brand-black tracking-tighter">
              100K+
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-gray-400 leading-relaxed font-bold">
              JOIN OUR COMMUNITY OF 100K+ GLOW ENTHUSIASTS
            </p>
          </ScrollReveal>
        </div>

        {/* UGC Horizontal Sliding Marquee with Hover Pause */}
        <div 
          className="w-full relative overflow-hidden py-3 bg-white mt-1 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scrolling Row */}
          <div 
            className="flex w-max gap-4 sm:gap-6 animate-marquee shrink-0"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {TRIPLE_ITEMS.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] relative overflow-hidden bg-brand-offwhite rounded-[24px] sm:rounded-[32px] cursor-pointer group shadow-xs shrink-0 border border-brand-black/5 block"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <img
                  src={item.imageUrl}
                  alt={`Community Post ${idx}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Subtle White Glassmorphism Overlay with Slide-to-top */}
                <div
                  className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs border-t border-brand-black/5 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 transition-transform duration-300 ease-out"
                  style={{
                    transform: hoveredIdx === idx ? "translateY(0)" : "translateY(100%)",
                  }}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Instagram className="w-3.5 h-3.5 text-brand-lilac shrink-0" />
                    <span className="font-sans text-[10px] sm:text-[11px] font-black tracking-wider text-brand-black uppercase truncate">
                      {item.handle}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Call to actions bottom links - More compact */}
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center border-t border-brand-black/5 pt-6 w-full">
          {["SHOP THE LOOK", "OUR BRAND MANIFESTO", "VISIT TIKTOK"].map((link, i) => (
            <button
              key={i}
              className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#888] hover:text-brand-black border-b border-transparent hover:border-brand-black/35 pb-1 transition-all cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
