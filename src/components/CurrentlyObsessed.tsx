/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import { getShopifySettings } from "../shopifySettings";

interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

export default function CurrentlyObsessed() {
  const settings = getShopifySettings();
  const [activeId, setActiveId] = useState("glow");

  const ITEMS: AccordionItem[] = [
    {
      id: "glow",
      title: settings.obsessed_item_1_title || "CROWN GROWTH & SCALP",
      subtitle: settings.obsessed_item_1_subtitle || "Stimulating leave-in elixirs and cooling root therapy",
      image: settings.obsessed_item_1_img || "/01 frame.jpeg",
      bgColor: "#E8D5C4" // Cream
    },
    {
      id: "eyes",
      title: settings.obsessed_item_2_title || "DEEP NUTRITION GLOSS",
      subtitle: settings.obsessed_item_2_subtitle || "High-brilliance restorative hair oils and moisture drops",
      image: settings.obsessed_item_2_img || "/02 frame.jpeg",
      bgColor: "#C1EDE2" // Soft pale mint green
    },
    {
      id: "touches",
      title: settings.obsessed_item_3_title || "GROUNDING WELLBEING",
      subtitle: settings.obsessed_item_3_subtitle || "Aromatherapy overnight face oils and muscle reliefs",
      image: settings.obsessed_item_3_img || "/03 frame.jpeg",
      bgColor: "#EBDCCB" // Cream/beige neutral
    },
    {
      id: "lips",
      title: settings.obsessed_item_4_title || "LUXURY SPA TOOLS",
      subtitle: settings.obsessed_item_4_subtitle || "Natural quartz gua shas and padded velvet kit pouches",
      image: settings.obsessed_item_4_img || "/04 frame.jpeg",
      bgColor: "#D6F5EE" // Very light soft Ice-Mint green
    }
  ];

  const activeItem = ITEMS.find(item => item.id === activeId) || ITEMS[0];

  return (
    <section 
      id="currently-obsessed" 
      className="w-full py-10 sm:py-14 px-4 md:px-12 relative overflow-hidden transition-all duration-700 ease-in-out"
      style={{ backgroundColor: activeItem.bgColor }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-1 border-b border-black/10 pb-3 text-black">
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-black/60">
              {settings.obsessed_label || "WEEK WRAPUP"}
            </span>
            <h2 className="font-serif text-[28px] md:text-[38px] font-bold tracking-tight uppercase leading-none">
              {settings.obsessed_title || "Currently Obsessed"}
            </h2>
            <p className="text-black/55 font-sans text-[11px] sm:text-xs uppercase tracking-widest max-w-lg mt-1 block">
              {settings.obsessed_desc || "Curated edits of our most-worn formulas and shades, thoughtfully grouped so you don't have to overthink it."}
            </p>
          </div>
        </ScrollReveal>

        {/* 1 Row Split Layout - Swapped to text on left, image on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          
          {/* Left vertical accordion text headings - 35% width */}
          <div className="md:col-span-5 flex flex-col gap-1.5 h-full justify-center">
            {ITEMS.map((item, index) => {
              const isActive = activeId === item.id;
              const serial = `0${index + 1}`;
              return (
                <div
                  key={item.id}
                  className={`group py-2.5 border-b border-black/10 last:border-0 cursor-pointer select-none transition-all duration-300 ${
                    isActive ? "border-l-3 border-black pl-4" : "pl-1 hover:pl-2.5"
                  }`}
                  onMouseEnter={() => setActiveId(item.id)}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col">
                      <h3
                        className={`font-serif text-[17px] md:text-[20px] tracking-wide uppercase leading-none bg-[linear-gradient(to_right,#000000_50%,rgba(0,0,0,0.35)_50%)] bg-[length:200%_100%] bg-clip-text text-transparent transition-[background-position,font-weight] duration-500 ease-out ${
                          isActive 
                            ? "bg-[position:0_0] font-black" 
                            : "bg-[position:100%_0] group-hover:bg-[position:0_0] font-semibold"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Muted subtitle */}
                      <span className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-sans mt-1 transition-all duration-300 ${
                        isActive ? "text-black/75" : "text-black/45 group-hover:text-black/70"
                      }`}>
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Serial label */}
                    <span
                      className={`font-mono text-xs italic transition-all duration-300 ${
                        isActive ? "text-black opacity-100 font-bold scale-105" : "text-black/25 opacity-60 group-hover:text-black/50"
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
            {ITEMS.map((item) => {
              const isActive = item.id === activeId;
              return (
                <motion.img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 1.05,
                    filter: isActive ? "blur(0px)" : "blur(4px)"
                  }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: isActive ? 1 : 0
                  }}
                />
              );
            })}
            
            {/* Absolute label accent */}
            <div className="absolute bottom-6 left-6 bg-white/75 backdrop-blur-md px-5 py-3 text-xs uppercase tracking-widest font-sans border border-black/5 text-black flex items-center gap-2 shadow-md z-10">
              <span className="font-bold tracking-widest">{activeItem.title}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
