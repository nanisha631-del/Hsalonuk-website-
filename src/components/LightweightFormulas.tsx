/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface FormulaCard {
  id: string;
  name: string;
  image: string;
}

const CARDS: FormulaCard[] = [
  {
    id: "f1",
    name: "HALO HIGHLIGHTER",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "f2",
    name: "COLOR MASCARA",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "f3",
    name: "EYE SHADOW STICK",
    image: "https://images.unsplash.com/photo-1631214499551-772e2c24255b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "f4",
    name: "CONCEALER",
    image: "https://images.unsplash.com/photo-1590156546746-cf337ae99c9c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "f5",
    name: "EYELINER",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "f6",
    name: "LIP GLOSS",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80"
  }
];

export default function LightweightFormulas() {
  return (
    <section id="formulas-deck" className="bg-brand-offwhite w-full py-20 px-4 md:px-12 relative select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Sticky Information Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6 py-6 border-l-2 border-brand-lilac/30 pl-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C4B5D4] font-bold">FEATHERLIGHT FORMULAS</span>
          
          <h2 className="font-serif text-[32px] md:text-[40px] font-black leading-snug tracking-tight text-brand-black">
            LIGHTWEIGHT FORMULAS THAT BLEND IN AND ENHANCE WHAT'S ALREADY THERE.
          </h2>

          <p className="text-gray-500 font-sans text-sm tracking-wide leading-relaxed">
            MAKEUP THAT ADAPTS TO YOUR ROUTINE, YOUR MOOD, YOUR VIBE.
          </p>

          <p className="text-gray-400 font-serif text-[15px] italic leading-relaxed">
            BUILD, BLEND, AND REAPPLY — WHEREVER THE DAY TAKES YOU.
          </p>
          
          <div className="pt-4">
            <button
              onClick={() => {
                const target = document.getElementById("bestsellers-section");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-brand-black hover:bg-brand-black/90 text-white font-sans font-bold text-xs uppercase tracking-[0.15em] px-6 py-3.5 flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-102"
            >
              SHOP THE FORMULAS
              <ArrowRight className="w-4.5 h-4.5 text-brand-lilac" />
            </button>
          </div>
        </div>

        {/* Right Column: Vertically Stacking Cards (Deck of cards effect) */}
        <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-14">
          {CARDS.map((card, idx) => (
            <div key={card.id}>
              <ScrollReveal delay={100}>
                {/* Card Container */}
                <div 
                  className="w-full h-[380px] md:h-[440px] bg-[#E3DFDA] relative overflow-hidden shadow-lg border border-brand-black/5 lg:sticky rounded-none group"
                  style={{
                    top: `${140 + idx * 25}px`, // Stacking deck values
                    zIndex: 10 + idx
                  }}
                >
                  {/* Visual image */}
                  <img
                    src={card.image}
                    alt={card.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />

                  {/* Cover overlay on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/75 via-transparent to-transparent flex items-end p-6 md:p-8">
                    <div className="flex justify-between items-end w-full">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-sans text-brand-lilac uppercase tracking-[0.15em] font-bold">FORMULA 0{idx+1}</span>
                        <h3 className="font-serif text-[18px] md:text-[22px] font-bold text-white tracking-widest">{card.name}</h3>
                      </div>
                      <span className="text-white/60 font-mono text-xs">
                        [0{idx+1}_N]
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
