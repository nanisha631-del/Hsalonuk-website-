/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"
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
    imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=80"
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
    imageUrl: "https://images.unsplash.com/photo-1620802631468-911c03ae793e?w=600&auto=format&fit=crop&q=80"
  }
];

// Double it for seamless infinite scroll
const DOUBLE_ITEMS = [...FEEDBACK_ITEMS, ...FEEDBACK_ITEMS];

export default function AutoScrollCards() {
  return (
    <section id="hype-carousel" className="bg-white w-full py-10 sm:py-14 overflow-hidden relative border-y border-brand-black/5 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-6 text-center flex flex-col gap-1.5">
        <ScrollReveal>
          <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-[#C4B5D4] font-bold">CUSTOMER REVIEWS</span>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="font-serif text-[28px] md:text-[38px] font-black tracking-tight text-brand-black uppercase leading-none">
            The Hype Is Real
          </h2>
        </ScrollReveal>
      </div>

      {/* Scrolling Row with pause-on-hover */}
      <div className="relative w-full flex items-center overflow-hidden py-3 border-t border-b border-brand-black/5 bg-[#F7F5F2]/40">
        <div className="flex w-max gap-8 animate-marquee shrink-0 hover:[animation-play-state:paused]">
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
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
