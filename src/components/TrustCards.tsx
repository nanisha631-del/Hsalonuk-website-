/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import ScrollReveal from "./ScrollReveal";

interface CardItem {
  title: string;
  desc: string;
}

const CARDS: CardItem[] = [
  {
    title: "Skin-First Formulas",
    desc: "Makeup that treats your skin while you wear it."
  },
  {
    title: "Inclusive Shades",
    desc: "Made to work across tones and undertones."
  },
  {
    title: "Multi-Use Essentials",
    desc: "Minimal effort. Maximum options."
  },
  {
    title: "Clean & Conscious",
    desc: "Vegan. Cruelty-free. Thoughtfully formulated."
  }
];

export default function TrustCards() {
  return (
    <section id="trust-cards" className="bg-brand-offwhite w-full py-10 sm:py-14 px-2 sm:px-6 md:px-12 relative border-t border-brand-black/5 select-none">
      <div className="max-w-2xl mx-auto grid grid-cols-2">
        {CARDS.map((card, idx) => {
          // Determine borders to design a precise 2x2 crossed grid of lines with no outer frame
          const isLeft = idx % 2 === 0;
          const isTop = idx < 2;
          const borderClasses = `
            ${isLeft ? "border-r" : ""} 
            ${isTop ? "border-b" : ""} 
            border-[#DFDADA]
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
