/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { getShopifySettings } from "../shopifySettings";
import AnimatedUnderline from "./AnimatedUnderline";

interface ScrollerCard {
  type: "text" | "image";
  author?: string;
  rating?: number;
  highlight?: string;
  content?: string;
  imageUrl?: string;
}

const FEEDBACK_ITEMS: ScrollerCard[] = [
  {
    type: "text",
    author: "Natalie S.",
    rating: 5,
    highlight: "So effortless",
    content: "I can throw this on in two minutes and it always looks good. The finish is super natural."
  },
  {
    type: "image",
    imageUrl: "/Review 1.jpeg"
  },
  {
    type: "text",
    author: "Aliyah M.",
    rating: 5,
    highlight: "My new everyday favorite",
    content: "This has officially become part of my daily routine. It is lightweight and easy to blend."
  },
  {
    type: "image",
    imageUrl: "/Review 2.jpeg"
  },
  {
    type: "text",
    author: "Marisol R.",
    rating: 5,
    highlight: "Perfect for on-the-go",
    content: "I love how quick and foolproof it is. It stays cute all day and fits right into my purse bag."
  },
  {
    type: "image",
    imageUrl: "/Review 3.jpeg"
  },
  {
    type: "text",
    author: "Elena G.",
    rating: 5,
    highlight: "Absolute game changer!",
    content: "My scalp feels so hydrated and the hair gloss is incredible. Truly premium botanical formulas."
  },
  {
    type: "image",
    imageUrl: "/Review 4.jpeg"
  },
  {
    type: "text",
    author: "Chloe W.",
    rating: 5,
    highlight: "Clean and radiant",
    content: "No sticky residue or strong chemical smell. Smells wonderful and looks so glass-like."
  },
  {
    type: "image",
    imageUrl: "/Review 5.jpeg"
  },
  {
    type: "text",
    author: "Serena K.",
    rating: 5,
    highlight: "Soothed my dry scalp",
    content: "Struggled with winter dryness for years, but this active formula completely healed it."
  },
  {
    type: "image",
    imageUrl: "/Review 6.jpeg"
  }
];

// Double it for seamless infinite scroll
const DOUBLE_ITEMS = [...FEEDBACK_ITEMS, ...FEEDBACK_ITEMS];

export default function AutoScrollCards() {
  const settings = getShopifySettings();
  let speed = settings.marquee_card_speed || "50s";
  if (speed.endsWith("s")) {
    const numericPart = parseFloat(speed);
    if (!isNaN(numericPart)) {
      speed = `${numericPart * 1.8}s`;
    }
  }
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="hype-carousel" className="bg-white w-full py-10 sm:py-14 overflow-hidden relative border-y border-brand-black/5 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-6 text-center flex flex-col gap-1.5">
        <ScrollReveal>
          <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-brand-lilac font-bold" style={settings.brand_primary_color ? { color: settings.brand_primary_color } : {}}>
            CUSTOMER REVIEWS
          </span>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="font-serif text-[28px] md:text-[38px] font-black tracking-tight text-brand-black uppercase leading-none">
            {(() => {
              const hypeTitle = settings.obsessed_title || "The Hype Is Real";
              const words = hypeTitle.trim().split(" ");
              const lastWord = words.pop() || "";
              const remainingText = words.join(" ") + " ";
              return (
                <>
                  {remainingText}
                  <AnimatedUnderline word={lastWord} />
                </>
              );
            })()}
          </h2>
        </ScrollReveal>
      </div>

      {/* Scrolling Row with pause-on-hover */}
      <div 
        className="relative w-full flex items-center overflow-hidden py-3 border-t border-b border-brand-black/5 bg-[#F7F5F2]/40 cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex w-max gap-8 animate-marquee shrink-0"
          style={{ 
            animationDuration: speed,
            animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {DOUBLE_ITEMS.map((item, idx) => {
            if (item.type === "text") {
              return (
                <div
                  key={idx}
                  className="w-[280px] h-[300px] bg-white border border-[#D8D3CC] p-8 flex flex-col justify-between rounded-none overflow-hidden shrink-0 shadow-xs"
                >
                  <div className="flex flex-col gap-2">
                    {/* Stars bar */}
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h4 className="font-serif text-[17px] font-bold text-brand-black leading-tight">
                      "{item.highlight}"
                    </h4>

                    <p className="font-sans text-[13px] text-gray-500 leading-relaxed italic">
                      {item.content}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5 pt-2 border-t border-brand-black/5">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-brand-black">
                      {item.author}
                    </span>
                    <span className="text-[10px] text-gray-400 font-sans uppercase">
                      Verified Glow Customer
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={idx}
                  className="w-[280px] h-[300px] bg-brand-nude/10 border border-[#D8D3CC] overflow-hidden rounded-none shrink-0"
                >
                  <img
                    src={item.imageUrl}
                    alt="Customer aesthetic photo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.06] [will-change:transform]"
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
