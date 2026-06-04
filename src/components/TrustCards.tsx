/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ShieldCheck, Heart, Recycle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface CardItem {
  icon: React.ReactNode;
  number: string;
  title: string;
  desc: string;
}

const CARDS: CardItem[] = [
  {
    icon: <Star className="w-6 h-6 text-brand-lilac fill-current" />,
    number: "★",
    title: "Skin-First Formulas",
    desc: "Makeup that treats your skin while you wear it, day-in-and-out."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-lilac" />,
    number: "02",
    title: "Inclusive Shades",
    desc: "Carefully formulated to work across tones and depth undertones."
  },
  {
    icon: <Heart className="w-6 h-6 text-brand-lilac" />,
    number: "03",
    title: "Multi-Use Essentials",
    desc: "Minimum physical shelf space weight, maximum creative options."
  },
  {
    icon: <Recycle className="w-6 h-6 text-brand-lilac" />,
    number: "04",
    title: "Clean & Conscious",
    desc: "100% Vegan, cruelty-free, organic, and ethically sourced extract lines."
  }
];

export default function TrustCards() {
  return (
    <section id="trust-cards" className="bg-brand-offwhite w-full py-20 px-4 md:px-12 relative border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((card, idx) => (
          <div key={idx}>
            <ScrollReveal delay={idx * 150}>
              <div className="border border-[#D8D3CC] bg-transparent rounded-none p-10 md:p-12 flex flex-col items-center text-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                {/* Highlight Icon or Number */}
                <div className="w-12 h-12 rounded-full bg-brand-lilac/10 flex items-center justify-center border border-brand-lilac/20 text-brand-lilac font-serif text-[20px] font-bold">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-[20px] font-bold text-brand-black tracking-tight mt-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[13.5px] text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
}
