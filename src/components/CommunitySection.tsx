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
}

const UGC_ITEMS: UgcItem[] = [
  {
    id: "g1",
    imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80",
    handle: "@aura_skin"
  },
  {
    id: "g2",
    imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80",
    handle: "@glow_beauty"
  },
  {
    id: "g3",
    imageUrl: "https://images.unsplash.com/photo-1620802631468-911c03ae793e?w=600&auto=format&fit=crop&q=80",
    handle: "@lucia_dew"
  },
  {
    id: "g4",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    handle: "@min_glow"
  },
  {
    id: "g5",
    imageUrl: "https://images.unsplash.com/photo-1631214499551-772e2c24255b?w=600&auto=format&fit=crop&q=80",
    handle: "@studioprisma"
  },
  {
    id: "g6",
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80",
    handle: "@violet_glow"
  }
];

export default function CommunitySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="community-ugc" className="bg-brand-black text-white w-full py-24 px-4 md:px-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center">
        
        {/* Giant Centered Stats Headers */}
        <div className="flex flex-col items-center gap-2 max-w-xl">
          <ScrollReveal>
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-lilac font-black">
              TAG @THESKINLABBEAUTY FOR A CHANCE TO BE FEATURED
            </span>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="font-serif text-[72px] md:text-[96px] font-black leading-none text-white tracking-tighter">
              100K+
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-[#999] leading-relaxed">
              JOIN OUR COMMUNITY OF 100K+ GLOW ENTHUSIASTS
            </p>
          </ScrollReveal>
        </div>

        {/* UGC 3x2 responsive image grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {UGC_ITEMS.map((item, idx) => (
            <div key={item.id}>
              <ScrollReveal delay={idx * 100}>
                <div
                  className="relative aspect-square overflow-hidden bg-[#2A2A2A] rounded-xs cursor-pointer group"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <img
                    src={item.imageUrl}
                    alt={`Community Post ${idx}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay with Instagram slide-up */}
                  <div
                    className="absolute inset-0 bg-brand-black/55 backdrop-blur-3xs flex flex-col items-center justify-center gap-2 duration-300 transition-all"
                    style={{
                      opacity: hoveredIdx === idx ? 1 : 0,
                      transform: hoveredIdx === idx ? "translateY(0)" : "translateY(100%)",
                    }}
                  >
                    <Instagram className="w-6 h-6 text-brand-lilac animate-pulse" />
                    <span className="font-sans text-[12px] font-bold tracking-widest text-white uppercase mt-1">
                      {item.handle}
                    </span>
                    <span className="font-sans text-[10px] text-gray-300 uppercase tracking-widest flex items-center gap-1">
                      View Post <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Call to actions bottom links */}
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center border-t border-white/5 pt-8 w-full">
          {["SHOP THE LOOK", "OUR BRAND MANIFESTO", "VISIT TIKTOK"].map((link, i) => (
            <button
              key={i}
              className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
