/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";

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
    title: "LIP FAVORITES",
    subtitle: "ON-THE-GO SHINE",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&auto=format&fit=crop&q=80",
    products: "Lip Glazes • Tinted Oils • Soft Balms"
  },
  {
    id: "face",
    title: "FACE ESSENTIALS",
    subtitle: "SKIN, BUT BETTER",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1200&auto=format&fit=crop&q=80",
    products: "Halo Highlighter • Cream Concealers • Dew Sprays"
  },
  {
    id: "eyes",
    title: "EYES EDITS",
    subtitle: "QUICK LOOKS, BIG PAYOFF",
    image: "https://images.unsplash.com/photo-1631214499551-772e2c24255b?w=1200&auto=format&fit=crop&q=80",
    products: "Liquid Felt Liners • Swipe Eyeshadow Crayons"
  }
];

export default function HoverAccordion() {
  const [activeCat, setActiveCat] = useState<CategoryItem>(CATEGORIES[0]);

  return (
    <section id="category-accordion" className="bg-brand-offwhite w-full py-24 px-4 md:px-12 relative overflow-hidden select-none border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-2 border-b border-brand-black/5 pb-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400">EXPLORE CATEGORIES</span>
            <h2 className="font-serif text-[38px] md:text-[52px] font-bold tracking-tight text-brand-black">
              Beauty Edits
            </h2>
          </div>
        </ScrollReveal>

        {/* Reversed split layout: Left = options (30%), Right = Image (70%) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left stack (30% column span 4) */}
          <div className="md:col-span-5 flex flex-col gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCat.id === cat.id;
              return (
                <div
                  key={cat.id}
                  className="group py-6 border-b border-brand-black/10 last:border-0 cursor-pointer"
                  onMouseEnter={() => setActiveCat(cat)}
                >
                  <div
                    className="flex flex-col transition-all duration-300"
                    style={{
                      transform: isActive ? "translateX(10px)" : "translateX(0)"
                    }}
                  >
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#999] mb-1.5 uppercase">
                      {cat.subtitle}
                    </span>
                    
                    <h3
                      className={`font-serif text-[24px] md:text-[32px] font-black transition-colors ${
                        isActive ? "text-brand-lilac" : "text-brand-black/50 group-hover:text-brand-black"
                      }`}
                    >
                      {cat.title}
                    </h3>

                    {/* Italic list of products */}
                    <span className="text-[12px] italic text-gray-500 font-serif mt-1">
                      {cat.products}
                    </span>

                    {/* Micro Highlight bar */}
                    <div
                      className="h-[1px] bg-brand-lilac mt-3 transition-all duration-300"
                      style={{
                        width: isActive ? "80%" : "0%"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right image projection panel (70% column span 7) */}
          <div className="md:col-span-7 relative aspect-[14/10] bg-[#EDEDE9]/40 overflow-hidden shadow-md">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCat.id}
                src={activeCat.image}
                alt={activeCat.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-brand-black/5 flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-brand-black shadow-xs">
              <span>View collection</span>
              <ArrowRight className="w-4 h-4 text-brand-lilac" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
