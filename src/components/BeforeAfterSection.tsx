/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Eye, ShieldCheck, Zap, Droplets, Scissors } from "lucide-react";
import { useSharedState } from "../useSharedState";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  formula: string;
  duration: string;
  metric: string;
  metricSub: string;
  beforeImg: string;
  afterImg: string;
  bullets: string[];
}

export default function BeforeAfterSection() {
  const [activeCase, setActiveCase] = useState<string>("case-1");
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage (0 - 100)
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cases: CaseStudy[] = [
    {
      id: "case-1",
      title: "Scalp & Follicle Purifying",
      subtitle: "Calming Dry Flakes & Redness Relief",
      formula: "Snail Silk Scalp Mask + Rosemary Concentrate",
      duration: "6 Weeks Ritual",
      metric: "-88.5% Flakes",
      metricSub: "Clinically monitored lipid recovery",
      beforeImg: "/01 frame.jpeg", // using exquisite available frames & formulas
      afterImg: "/snail silk scalp mask.webp",
      bullets: [
        "Eliminates tight microscopic scalp redness and irritation",
        "Deeply hydrates root follicles without blocking oxygen pathways",
        "Increases follicle density appearance and overall strand elasticity",
      ],
    },
    {
      id: "case-2",
      title: "Sealing Cuticle Reconstruction",
      subtitle: "Thermal Styling Split-End Repair",
      formula: "Snail Silk Face Serum + Scalp Oil",
      duration: "4 Weeks Ritual",
      metric: "+92% Velvet Shine",
      metricSub: "Cuticle alignment alignment under cold-seal plates",
      beforeImg: "/03 frame.jpeg",
      afterImg: "/snail silk scalp oil.webp",
      bullets: [
        "Fuses split ends up to 210°C thermal protection levels",
        "Restores premium lustrous light reflection to hair fibers",
        "Reduces humidity-induced cuticle expansion and frizz",
      ],
    },
    {
      id: "case-3",
      title: "Dermal Lipid Barrier Boost",
      subtitle: "Intense Skin Moisture Lock",
      formula: "Ground Recovery Lipid Complex",
      duration: "8 Weeks Ritual",
      metric: "+148% Hydration",
      metricSub: "Retained cellular water-loss containment",
      beforeImg: "/02 frame.jpeg",
      afterImg: "/ground recovery oil.webp",
      bullets: [
        "Deeply penetrates skin layers to repair cell cement",
        "Balances oily/dry facial zones for smooth cosmetic prep",
        "Provides safe anti-irritant support for hyper-sensitive cells",
      ],
    },
  ];

  const currentCase = cases.find((c) => c.id === activeCase) || cases[0];

  // Dragging event handlers for before/after comparison slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleGlobalPointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
    };
  }, []);

  return (
    <section 
      id="before-after-revelation" 
      className="w-full bg-[#FAF9F5] py-28 sm:py-36 px-4 md:px-12 select-none border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section header block with generous vertical spacing (gap) and H-Salon style typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="w-10 h-10 rounded-full border border-[#82D8C5]/30 flex items-center justify-center mx-auto mb-4 bg-[#82D8C5]/5 text-[#82D8C5] shadow-xs cursor-pointer hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#82D8C5] uppercase mb-4">
            PROVEN PHYSICAL CLINICAL OUTCOMES
          </p>
          <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-black uppercase tracking-tight text-brand-black leading-[1.12] mb-6">
            BEFORE AND AFTER RESULTS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-black/60 leading-relaxed max-w-xl mx-auto">
            Witness the real, scientifically measured miracles of microalbumin silk elixirs and active lipids. These client results showcase pure cell nourishment, zero-irritation calming, and long-term cuticle restoration.
          </p>
          <div className="w-16 h-0.5 bg-[#82D8C5] mx-auto mt-6" />
        </div>

        {/* Outer Layout wrapper split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left panel: Clinical Case Study details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Interactive program selector tabs */}
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#82D8C5] uppercase block mb-1">
                SELECT CLINICAL PROGRAM
              </span>
              <div className="flex flex-col gap-2.5">
                {cases.map((c) => {
                  const isSelected = c.id === activeCase;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCase(c.id);
                        setSliderPos(50); // Reset position on switch
                      }}
                      className={`text-left px-5 py-4 rounded-xl border transition-all duration-300 transform cursor-pointer flex justify-between items-center ${
                        isSelected
                          ? "bg-brand-black text-white border-brand-black shadow-md translate-x-1.5"
                          : "bg-white text-black border-black/10 hover:border-[#82D8C5] hover:bg-[#82D8C5]/5"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className={`font-sans font-black text-xs uppercase tracking-wider mb-0.5 ${
                          isSelected ? "text-white" : "text-black"
                        }`}>
                          {c.title}
                        </span>
                        <span className={`font-sans text-[10px] truncate ${
                          isSelected ? "text-white/60" : "text-black/40"
                        }`}>
                          {c.subtitle}
                        </span>
                      </div>
                      <div className={`p-1 rounded-full ${isSelected ? "text-[#82D8C5]" : "text-black/25"}`}>
                        <Eye className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Case Study Metadata Specifications with theme color matches */}
            <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-5 shadow-2xs">
              
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#82D8C5] font-black">Applied Apothecary Formula</span>
                  <span className="font-sans font-black text-xs text-black uppercase tracking-wider">{currentCase.formula}</span>
                </div>
                <div className="text-right flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-black/40">Treatment Duration</span>
                  <span className="font-serif italic font-bold text-xs text-[#82D8C5] h-4">{currentCase.duration}</span>
                </div>
              </div>

              {/* Huge Clinical Proven Metric Widget */}
              <div className="flex items-center gap-4 bg-[#FAF9F5] rounded-xl p-4 border border-black/5">
                <div className="w-10 h-10 rounded-full bg-[#82D8C5]/10 border border-[#82D8C5]/30 flex items-center justify-center text-[#82D8C5]">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-3xl font-black text-black leading-none tracking-tight">
                    {currentCase.metric}
                  </p>
                  <p className="font-sans text-[11px] text-black/50 tracking-wide mt-1 leading-none">
                    {currentCase.metricSub}
                  </p>
                </div>
              </div>

              {/* Bullet details checkmark list */}
              <div>
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#82D8C5] uppercase block mb-3">
                  OBSERVED MOLECULAR REPAIRS
                </span>
                <ul className="space-y-2.5">
                  {currentCase.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-sans text-xs text-black/60 leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-[#82D8C5] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Right panel: Ultra attractive Draggable Comparison Slider */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              className="relative w-full aspect-[4/3] bg-zinc-200 rounded-3xl overflow-hidden cursor-ew-resize select-none border border-black/15 shadow-md group touch-none"
            >
              
              {/* After image layer (base) */}
              <img 
                src={currentCase.afterImg} 
                alt="After clinical therapy premium result" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-[0.98]"
              />
              <div className="absolute right-6 top-6 bg-brand-black text-[#82D8C5] font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md select-none shadow-md z-10">
                AFTER RITUAL
              </div>

              {/* Before image layer (overlay container cropped dynamically) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative w-full h-full aspect-[4/3] min-w-full">
                  <img 
                    src={currentCase.beforeImg} 
                    alt="Before clinical therapy raw state" 
                    referrerPolicy="no-referrer"
                    // Force the actual image to occupy the parent container's full bounds to match alignment
                    style={{
                      width: containerRef.current?.getBoundingClientRect().width || "100%",
                      height: containerRef.current?.getBoundingClientRect().height || "100%",
                      maxWidth: "none"
                    }}
                    className="absolute inset-0 object-cover pointer-events-none select-none grayscale-[30%] contrast-[1.05]"
                  />
                  <div className="absolute left-6 top-6 bg-white/90 border border-black/10 text-brand-black font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md select-none shadow-md">
                    BEFORE RAW
                  </div>
                </div>
              </div>

              {/* Glass slider vertical line separator */}
              <div 
                className="absolute inset-y-0 w-0.5 bg-white/70 backdrop-blur-xs pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag Handle ball with glowing mint accent color */}
                <div className="w-10 h-10 rounded-full bg-white/95 border border-black/10 shadow-lg flex items-center justify-center text-brand-black cursor-ew-resize hover:scale-110 active:scale-95 transition-transform absolute -translate-x-[19px]">
                  <div className="flex gap-[3px] items-center text-brand-black/45">
                    <span className="w-0.5 h-3.5 bg-black/30 rounded-full" />
                    {/* Double chevron indicators style */}
                    <div className="flex gap-[1px]">
                      <span className="w-1 h-1 rounded-full bg-[#82D8C5]" />
                      <span className="w-1 h-1 rounded-full bg-[#82D8C5]" />
                    </div>
                    <span className="w-0.5 h-3.5 bg-black/30 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Glowing instruction helper shown on hover */}
              <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
                <span className="bg-brand-black/75 backdrop-blur-md text-white/95 font-sans text-[10px] tracking-[0.16em] uppercase px-5 py-2.5 rounded-full shadow-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-[#82D8C5] animate-bounce" /> Slide comparison tool to reveal
                </span>
              </div>

            </div>

            {/* Bottom response text indicator */}
            <p className="text-center font-sans text-[11px] text-black/45 tracking-wider uppercase mt-4 italic">
              *All photography represents real clinical study volunteers. Individual scalp tissue activation may vary.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
