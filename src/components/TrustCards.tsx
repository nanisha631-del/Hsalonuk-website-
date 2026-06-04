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
    <section id="trust-cards" className="bg-brand-offwhite w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 relative border-t border-brand-black/5 select-none">
      <div className="max-w-4xl mx-auto grid grid-cols-2">
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
              className={`flex flex-col items-center text-center p-6 sm:p-10 md:p-14 ${borderClasses}`}
            >
              <ScrollReveal delay={idx * 150} direction="up" distance={20}>
                <div className="flex flex-col items-center gap-3 sm:gap-4.5">
                  {/* Premium chrome-look Star SVG with radial background glow */}
                  <div className="relative w-12 h-12 flex items-center justify-center select-none">
                    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#3F2815" floodOpacity="0.4"/>
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

                  {/* Heavy font heading (Oswald font under font-serif style) */}
                  <h3 id={`trust-card-title-${idx}`} className="font-serif text-[15px] sm:text-[21px] font-black text-brand-black tracking-tight uppercase leading-tight mt-1">
                    {card.title}
                  </h3>

                  {/* Clean readable description matching style perfectly */}
                  <p className="font-sans text-[11.5px] sm:text-[13.5px] text-gray-500 leading-relaxed max-w-[240px] mx-auto">
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
