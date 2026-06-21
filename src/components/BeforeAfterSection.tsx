/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Eye, ShieldCheck, Zap, Droplets, Scissors, ChevronLeft, ChevronRight } from "lucide-react";
import { useSharedState } from "../useSharedState";
import AnimatedUnderline from "./AnimatedUnderline";

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
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage (0 - 100)
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hasAnimatedInView, setHasAnimatedInView] = useState<boolean>(false);
  const isAutoAnimating = useRef<boolean>(false);

  const cases: CaseStudy[] = [
    {
      id: "case-1",
      title: "Scalp & Follicle Purifying",
      subtitle: "Calming Dry Flakes & Redness Relief",
      formula: "Snail Silk Scalp Mask + Rosemary Concentrate",
      duration: "6 Weeks Ritual",
      metric: "-88.5% Flakes",
      metricSub: "Clinically monitored lipid recovery",
      beforeImg: "/scalp before image.jpeg",
      afterImg: "/scalp after image.jpeg",
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
      metricSub: "Cuticle alignment with cold-seal plates",
      beforeImg: "/sealing before image.jpeg",
      afterImg: "/sealing after image.jpeg",
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
      beforeImg: "/dermal before image.jpeg",
      afterImg: "/dermal after image.jpeg",
      bullets: [
        "Deeply penetrates skin layers to repair cell cement",
        "Balances oily/dry facial zones for smooth cosmetic prep",
        "Provides safe anti-irritant support for hyper-sensitive cells",
      ],
    },
  ];

  const currentCase = cases.find((c) => c.id === activeCase) || cases[0];

  // Robustly track container width with ResizeObserver & preload images for instant performance
  useEffect(() => {
    // Preload images to browser cache
    cases.forEach((c) => {
      const imgBefore = new Image();
      imgBefore.src = c.beforeImg;
      const imgAfter = new Image();
      imgAfter.src = c.afterImg;
    });

    if (!containerRef.current) return;
    
    const updateSize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    // Initial size
    setContainerWidth(containerRef.current.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, []);

  // Animation to simulate automatic drag preview when visible or when switching cases
  const triggerAutoSliderDemo = () => {
    isAutoAnimating.current = true;
    const startTime = performance.now();
    const duration = 1600; // 1.6 seconds of elegant demo swing

    const animate = (time: number) => {
      if (isDragging.current || !isAutoAnimating.current) {
        isAutoAnimating.current = false;
        return;
      }

      const elapsed = time - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setSliderPos(50);
        isAutoAnimating.current = false;
        return;
      }

      // Fluid swing: 50 -> 74 -> 50 -> 26 -> 50
      const swing = Math.sin(progress * 2 * Math.PI) * 24;
      setSliderPos(50 + swing);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  // IntersectionObserver to trigger the swipe effect automatically one time when scrolled into view
  useEffect(() => {
    if (hasAnimatedInView || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimatedInView(true);
            setTimeout(() => {
              triggerAutoSliderDemo();
            }, 600); // Elegant entrance delay
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimatedInView]);

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
    isAutoAnimating.current = false; // Abort any running auto-animation immediately
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
            BEFORE AND AFTER <AnimatedUnderline word="RESULTS" />
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-black/60 leading-relaxed max-w-xl mx-auto">
            Witness the real, scientifically measured miracles of microalbumin silk elixirs and active lipids. These client results showcase pure cell nourishment, zero-irritation calming, and long-term cuticle restoration.
          </p>
          <div className="w-16 h-0.5 bg-[#82D8C5] mx-auto mt-6" />
        </div>

        {/* Outer Layout wrapper split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left panel: Clinical Case Study details - Ordered second on mobile to stay under slides */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6 order-2 lg:order-1">
            
            {/* Interactive program selector tabs */}
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-3">
                SELECT CLINICAL PROGRAM
              </span>
              <div className="flex flex-col">
                {cases.map((c) => {
                  const isActive = c.id === activeCase;
                  return (
                    <div
                      key={c.id}
                      className="group py-4 border-b border-black/10 last:border-0 cursor-pointer"
                      onClick={() => {
                        if (activeCase !== c.id) {
                          setActiveCase(c.id);
                          setSliderPos(50);
                          isAutoAnimating.current = false;
                          setTimeout(() => {
                            triggerAutoSliderDemo();
                          }, 50);
                        }
                      }}
                      onMouseEnter={() => {
                        if (activeCase !== c.id) {
                          setActiveCase(c.id);
                          setSliderPos(50);
                          isAutoAnimating.current = false;
                          setTimeout(() => {
                            triggerAutoSliderDemo();
                          }, 50);
                        }
                      }}
                    >
                      <div
                        className="flex flex-col transition-all duration-300"
                        style={{
                          transform: isActive ? "translateX(6px)" : "translateX(0)"
                        }}
                      >
                        <span className="text-[9px] font-sans font-bold tracking-widest text-[#0A0A0A]/40 mb-1 uppercase">
                          {c.id === "case-1" ? "RESTORE BALANCED CROWNS" : c.id === "case-2" ? "REBUILD HAIR FIBER INTEGRITY" : "DEEP CELLULAR HYDRATION"}
                        </span>
                        
                        <h3
                          className={`font-serif text-[18px] md:text-[22px] font-black tracking-wide leading-none transition-colors uppercase ${
                            isActive ? "text-brand-lilac" : "text-[#0A0A0A]/50 group-hover:text-brand-black"
                          }`}
                        >
                          {c.title}
                        </h3>

                        {/* Italic list of products */}
                        <span className="text-[11px] sm:text-[12px] font-sans text-gray-400 mt-1.5 leading-normal">
                          {c.subtitle}
                        </span>

                        {/* Micro Highlight bar */}
                        <div
                          className="h-[1.5px] bg-[#82D8C5] mt-2.5 transition-all duration-300"
                          style={{
                            width: isActive ? "60%" : "0%"
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right panel: Ultra attractive Draggable Comparison Slider - Ordered first on mobile */}
          <div className="lg:col-span-7 flex flex-col justify-between order-1 lg:order-2">
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              className="relative w-full aspect-[4/3] bg-zinc-200 rounded-3xl overflow-hidden cursor-ew-resize select-none border border-black/15 shadow-md group touch-none"
            >
              {cases.map((c) => {
                const isActive = c.id === activeCase;
                return (
                  <motion.div
                    key={c.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.05,
                      filter: isActive ? "blur(0px)" : "blur(4px)"
                    }}
                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      zIndex: isActive ? 5 : 1,
                    }}
                  >
                    {/* After image layer (base) */}
                    <img 
                      src={c.afterImg} 
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
                          src={c.beforeImg} 
                          alt="Before clinical therapy raw state" 
                          referrerPolicy="no-referrer"
                          // Force the actual image to occupy the parent container's full bounds to match alignment
                          style={{
                            width: containerWidth ? `${containerWidth}px` : "100%",
                            height: "100%",
                            maxWidth: "none"
                          }}
                          className="absolute inset-0 object-cover pointer-events-none select-none grayscale-[30%] contrast-[1.05]"
                        />
                        <div className="absolute left-6 top-6 bg-white/90 border border-black/10 text-brand-black font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md select-none shadow-md z-10">
                          BEFORE RAW
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Glowing vertical line separator with customized mint green color */}
              <div 
                className="absolute inset-y-0 w-1 bg-[#82D8C5] shadow-[0_0_12px_#82D8C5] pointer-events-none flex items-center justify-center z-10"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag Handle button - Highly intuitive with double horizontal arrows (Chevrons). Set to relative and shrink-0 to follow perfect flexbox centering vertically and horizontally. */}
                <div className="relative w-12 h-12 rounded-full bg-brand-black text-[#82D8C5] border-2 border-white shadow-2xl flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-transform shrink-0 z-20 pointer-events-auto">
                  <div className="flex items-center justify-between w-full px-1.5">
                    <ChevronLeft className="w-4 h-4 text-[#82D8C5] stroke-[3]" />
                    <ChevronRight className="w-4 h-4 text-[#82D8C5] stroke-[3]" />
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

            {/* Cute small short summary bar under clinical image instead of giant metadata card */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-y-2 gap-x-4 border border-black/5 bg-white/40 p-4 rounded-xl leading-normal text-xs text-black/60 shadow-xs max-w-full">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5]" />
                <span className="font-bold text-black">{currentCase.metric}</span>
                <span className="text-[11px] font-sans text-black/40">({currentCase.metricSub})</span>
              </div>
              <div className="flex items-center gap-1.5 md:text-right">
                <span className="font-serif italic font-bold text-[#82D8C5]">{currentCase.duration}</span>
                <span className="text-black/30">•</span>
                <span className="truncate max-w-[220px] font-medium text-black/70" title={currentCase.formula}>{currentCase.formula}</span>
              </div>
            </div>

            {/* Bottom response text indicator */}
            <p className="text-center font-sans text-[10px] text-black/40 tracking-wider uppercase mt-4 italic">
              *All photography represents real clinical study volunteers. Individual scalp tissue activation may vary.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
