/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";

interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: "glow",
    title: "LOW EFFORT GLOW",
    subtitle: "Daily gloss and natural highlight formulas",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1200&auto=format&fit=crop&q=80",
    bgColor: "#E8D5C4" // Cream
  },
  {
    id: "eyes",
    title: "MAIN CHARACTER EYES",
    subtitle: "Precision liquid liners and saturated eye pigments",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&auto=format&fit=crop&q=80",
    bgColor: "#C4B5D4" // Purple
  },
  {
    id: "touches",
    title: "FINISHING TOUCHES",
    subtitle: "Setting sprays, buffers, and featherlight buffers",
    image: "https://images.unsplash.com/photo-1620802631468-911c03ae793e?w=1200&auto=format&fit=crop&q=80",
    bgColor: "#EBDCCB" // Cream/beige neutral
  },
  {
    id: "lips",
    title: "SOFT LIPS CLUB",
    subtitle: "Hydrating berry-oil lip glazes and sheens",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1200&auto=format&fit=crop&q=80",
    bgColor: "#D2C4E3" // Soft lilac purple
  }
];

export default function CurrentlyObsessed() {
  const [activeItem, setActiveItem] = useState<AccordionItem>(ITEMS[0]);

  return (
    <section 
      id="currently-obsessed" 
      className="w-full py-20 px-4 md:px-12 relative overflow-hidden transition-all duration-700 ease-in-out"
      style={{ backgroundColor: activeItem.bgColor }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-2 border-b border-black/10 pb-6 text-black">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-black/60">WEEK WRAPUP</span>
            <h2 className="font-serif text-[38px] md:text-[52px] font-bold tracking-tight">
              Currently Obsessed
            </h2>
            <p className="text-black/55 font-sans text-xs uppercase tracking-widest max-w-lg mt-1">
              Curated edits of our most-worn formulas and shades, thoughtfully grouped so you don't have to overthink it.
            </p>
          </div>
        </ScrollReveal>

        {/* 1 Row Split Layout - Swapped to text on left, image on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left vertical accordion text headings - 35% width */}
          <div className="md:col-span-5 flex flex-col gap-2 h-full justify-center">
            {ITEMS.map((item, index) => {
              const isActive = activeItem.id === item.id;
              const serial = `0${index + 1}`;
              return (
                <div
                  key={item.id}
                  className={`group py-5 border-b border-black/10 last:border-0 cursor-pointer select-none transition-all duration-300 ${
                    isActive ? "border-l-3 border-black pl-5" : "pl-1 hover:pl-3"
                  }`}
                  onMouseEnter={() => setActiveItem(item)}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col">
                      <h3
                        className={`font-serif text-[20px] md:text-[23px] tracking-wide transition-all duration-500 uppercase leading-none ${
                          isActive 
                            ? "text-black font-black" 
                            : "text-black/35 group-hover:text-black font-semibold"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Muted subtitle */}
                      <span className={`text-[10px] md:text-[11px] uppercase tracking-wider font-sans mt-1.5 transition-all duration-500 ${
                        isActive ? "text-black/75" : "text-black/45 group-hover:text-black/70"
                      }`}>
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Serial label */}
                    <span
                      className={`font-mono text-xs italic transition-all duration-500 ${
                        isActive ? "text-black opacity-100 font-bold scale-110" : "text-black/25 opacity-60 group-hover:text-black/50"
                      }`}
                    >
                      {serial}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right image display area - 65% width */}
          <div className="md:col-span-7 relative aspect-[14/10] bg-black/5 overflow-hidden shadow-2xl border border-black/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Absolute label accent */}
            <div className="absolute bottom-6 left-6 bg-white/75 backdrop-blur-md px-5 py-3 text-xs uppercase tracking-widest font-sans border border-black/5 text-black flex items-center gap-2 shadow-md">
              <span className="font-bold tracking-widest">{activeItem.title}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
