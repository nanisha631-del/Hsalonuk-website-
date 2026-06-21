/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import AnimatedUnderline from "./AnimatedUnderline";

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  products: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "lips",
    title: "SCALP & ROOT ELIXIRS",
    subtitle: "RESTORE BALANCED CROWNS",
    image: "/snail silk scalp oil.webp",
    products: "Oribe Serene Scalp • Root Cooling Masques • Power Drops"
  },
  {
    id: "face",
    title: "WELLBEING SKIN CARE",
    subtitle: "DEEP CELLULAR HYDRATION",
    image: "/ground recovery oil.webp",
    products: "Ground Face Oils • Active Recovery Body Oils • Sleep Bed Balms"
  },
  {
    id: "eyes",
    title: "RESTORE & GLOSS CARE",
    subtitle: "REBUILD HAIR FIBER INTEGRITY",
    image: "/snail silk face serum.webp",
    products: "Kérastase Elixir Ultime • Chronologiste Pearls • Olaplex Shields"
  }
];

export default function HoverAccordion() {
  const [activeCat, setActiveCat] = useState<CategoryItem>(CATEGORIES[0]);

  return (
    <section id="category-accordion" className="bg-brand-offwhite w-full py-12 px-4 md:px-12 relative overflow-hidden select-none border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-1 border-b border-brand-black/5 pb-3">
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400 font-bold">EXPLORE CATEGORIES</span>
            <h2 className="font-serif text-[28px] md:text-[38px] font-bold tracking-tight text-brand-black leading-none uppercase">
              Apothecary <AnimatedUnderline word="Collections" />
            </h2>
          </div>
        </ScrollReveal>

        {/* Reversed split layout: Left = options (30%), Right = Image (70%) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          
          {/* Left stack (30% column span 4) */}
          <div className="md:col-span-4 flex flex-col gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCat.id === cat.id;
              return (
                <div
                  key={cat.id}
                  className="group py-3 sm:py-4 border-b border-brand-black/10 last:border-0 cursor-pointer"
                  onMouseEnter={() => setActiveCat(cat)}
                >
                  <div
                    className="flex flex-col transition-all duration-300"
                    style={{
                      transform: isActive ? "translateX(6px)" : "translateX(0)"
                    }}
                  >
                    <span className="text-[9px] font-sans font-bold tracking-widest text-gray-400 mb-0.5 uppercase">
                      {cat.subtitle}
                    </span>
                    
                    <h3
                      className={`font-serif text-[18px] md:text-[22px] font-black tracking-wide leading-none transition-colors ${
                        isActive ? "text-brand-lilac" : "text-brand-black/50 group-hover:text-brand-black"
                      }`}
                    >
                      {cat.title}
                    </h3>

                    {/* Italic list of products */}
                    <span className="text-[11px] sm:text-[12px] font-sans text-gray-400 mt-1 leading-normal">
                      {cat.products}
                    </span>

                    {/* Micro Highlight bar */}
                    <div
                      className="h-[1.5px] bg-brand-lilac mt-2 transition-all duration-300"
                      style={{
                        width: isActive ? "60%" : "0%"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right image projection panel (70% column span 7) representing 1:1 on mobile, 16:9 aspect-video on laptop */}
          <div className="md:col-span-8 w-full max-w-full md:max-w-2xl mx-auto aspect-square md:aspect-video relative bg-[#F7F7F9]/80 overflow-hidden shadow-xs rounded-[16px] border border-brand-black/5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCat.id}
                src={activeCat.image}
                alt={activeCat.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full object-contain p-4 md:p-6"
              />
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 border border-brand-black/5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-sans font-black text-brand-black rounded-full shadow-xs hover:bg-white transition-colors">
              <span>View collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-lilac" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
