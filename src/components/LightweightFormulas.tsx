/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";
import AnimatedUnderline from "./AnimatedUnderline";

interface FormulaCard {
  id: string;
  category: string;
  name: string;
  image: string;
}

const CARDS: FormulaCard[] = [
  {
    id: "f1",
    category: "SKIN & SCALP ELIXIRS",
    name: "ORIBE SERENE SCALP TREATMENT INSTANTLY RELIEVES SCALP REDNESS AND DRY IRRITATION.",
    image: "/formula 1.jpeg"
  },
  {
    id: "f2",
    category: "BEAUTIFYING DEEP GLOSS",
    name: "KÉRASTASE ELIXIR ULTIME FOR WEIGHTLESS HIGH-GLOSS BRILLIANCE AND HEAT SHIELDING.",
    image: "/formula 2.jpeg"
  },
  {
    id: "f3",
    category: "A RECOVERY RITUAL",
    name: "THE RECOVERY FACE OIL REPLETE WITH BOTANICAL JASMINE AND ROSEWOOD OILS.",
    image: "/formula 3.jpeg"
  },
  {
    id: "f4",
    category: "ACTIVE MUSCLE CARE",
    name: "THE ACTIVE BODY OIL WITH STIMULATING ROSEMARY AND COLD-PRESSED BOTANICALS.",
    image: "/formula 4.jpeg"
  }
];

export default function LightweightFormulas() {
  const settings = getShopifySettings();

  return (
    <section id="formulas-deck" className="bg-brand-offwhite w-full py-10 sm:py-16 px-4 md:px-12 relative select-none">
      <div className="max-w-xl mx-auto flex flex-col gap-3 items-center text-center mb-10">
        <ScrollReveal direction="up" distance={15}>
          <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400 font-bold">
            {settings.formulas_desc || "THE HIGHLIGHT INDEX"}
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" distance={20} delay={50}>
          <h2 className="font-sans text-[22px] sm:text-[32px] font-black tracking-tight leading-tight uppercase text-brand-black">
            {(() => {
              const headingText = settings.formulas_heading || "STORY OF LIGHTWEIGHT FORMULAS";
              const words = headingText.trim().split(" ");
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

      {/* Main Single-Column Overlapping Deck */}
      <div className="max-w-2xl mx-auto relative flex flex-col gap-10 sm:gap-14 pb-20">
        {CARDS.map((card, idx) => (
          <div 
            key={card.id}
            className="sticky w-full h-[60vh] sm:h-[65vh] min-h-[420px] max-h-[580px] bg-[#E3DFDA] rounded-[24px] sm:rounded-[36px] shadow-sm border border-brand-black/5 overflow-hidden group flex flex-col"
            style={{
              top: `${110 + idx * 20}px`, // Staggered sticky offsets for stacking stacked cards
              zIndex: 10 + idx
            }}
          >
            {/* 1. Large Rounded Beauty Portrait */}
            <div className="h-[62%] w-full relative overflow-hidden bg-gray-200">
              <ScrollZoomImage
                src={card.image}
                alt={card.name}
              />
            </div>

            {/* 2. Overlap Card Info Text Area Below Image */}
            <div className="h-[38%] bg-[#FDFBF7] p-4.5 sm:p-6 md:p-8 flex flex-col justify-center text-left border-t border-brand-black/5 gap-1 shadow-xs">
              <span className="text-[9px] sm:text-[10px] font-sans text-brand-lilac uppercase tracking-[0.2em] font-bold">
                {card.category}
              </span>
              <h3 className="font-sans text-[13px] sm:text-[16px] md:text-[17px] font-black text-brand-black leading-snug uppercase tracking-tight">
                {card.name}
              </h3>
              <div className="flex justify-between items-center mt-1 pt-2 border-t border-[#DFDADA]/40">
                <span className="text-gray-400 font-sans text-[10px] uppercase tracking-widest font-bold">FORMULA 0{idx+1}</span>
                <span className="text-brand-lilac font-mono text-[10px]">[INDEX_0{idx+1}_OK]</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
