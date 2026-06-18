/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { getShopifySettings } from "../shopifySettings";

interface CardItem {
  title: string;
  desc: string;
}

export default function TrustCards() {
  const settings = getShopifySettings();

  const CARDS: CardItem[] = [
    {
      title: settings.trust_card_1_title || "Scalp-First Science",
      desc: settings.trust_card_1_desc || "Active clinical botanicals that heal your scalp follicles while conditioning."
    },
    {
      title: settings.trust_card_2_title || "All-Hair Adaptability",
      desc: settings.trust_card_2_desc || "Formulated to balance and care for all hair structures and types."
    },
    {
      title: settings.trust_card_3_title || "Scent-Therapy Blends",
      desc: settings.trust_card_3_desc || "Signature Oribe and Ground Wellbeing stress-relieving scents."
    },
    {
      title: settings.trust_card_4_title || "100% Purity Certified",
      desc: settings.trust_card_4_desc || "Vegan, sulfate-free, and carefully hand-blended formulas."
    }
  ];

  return (
    <section id="trust-cards" className="bg-brand-offwhite w-full py-10 sm:py-14 px-2 sm:px-6 md:px-12 relative border-t border-brand-black/5 select-none">
      <div className="max-w-2xl md:max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {CARDS.map((card, idx) => {
          // Precise responsive grid: 2x2 on mobile, single straight 1x4 horizontal row on md+
          const borderClasses = `
            border-[#DFDADA]
            ${idx === 0 ? "border-r border-b md:border-r md:border-b-0" : ""}
            ${idx === 1 ? "border-b md:border-r md:border-b-0" : ""}
            ${idx === 2 ? "border-r md:border-b-0 md:border-r" : ""}
            ${idx === 3 ? "md:border-0" : ""}
          `;

          return (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center p-3 xs:p-4 sm:p-6 md:p-8 ${borderClasses}`}
            >
              <ScrollReveal delay={idx * 100} direction="up" distance={15}>
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  {/* Premium chrome-look Star SVG with radial background glow */}
                  <div className="relative w-8 h-8 flex items-center justify-center select-none">
                    <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-xs overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id={`starGlow-${idx}`} cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#DFD8E9" stopOpacity="0.95"/>
                          <stop offset="100%" stopColor="#DFD8E9" stopOpacity="0"/>
                        </radialGradient>
                        <linearGradient id={`chromeGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#B3A190"/>
                          <stop offset="25%" stopColor="#F5EFEB"/>
                          <stop offset="50%" stopColor="#5C4D40"/>
                          <stop offset="75%" stopColor="#E0D6CD"/>
                          <stop offset="100%" stopColor="#30241A"/>
                        </linearGradient>
                        <filter id={`glossyShadow-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#3F2815" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      {/* Glow circle behind star */}
                      <circle cx="50" cy="50" r="42" fill={`url(#starGlow-${idx})`}/>
                      {/* Detailed heavy metal 5-pointed star */}
                      <path
                        d="M50 14 L62.5 39 L89.5 41.5 L69.5 58.5 L75.5 85 L50 71 L24.5 85 L30.5 58.5 L10.5 41.5 L37.5 39 Z"
                        fill={`url(#chromeGrad-${idx})`}
                        stroke="#221A12"
                        strokeWidth="3.5"
                        filter={`url(#glossyShadow-${idx})`}
                        strokeLinejoin="round"
                      />
                      {/* Specular light highlight bevel overlay */}
                      <path
                        d="M50 21 L59 39 L81 41.5 L64 54.5"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    </svg>
                  </div>

                  {/* Heavy font heading */}
                  <h3 id={`trust-card-title-${idx}`} className="font-sans text-[11px] sm:text-[13px] font-black text-brand-black tracking-widest uppercase leading-tight mt-1">
                    {card.title}
                  </h3>

                  {/* Clean readable description matching style perfectly */}
                  <p className="font-sans text-[10px] sm:text-[11.5px] text-gray-400 leading-normal max-w-[180px] mx-auto">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
