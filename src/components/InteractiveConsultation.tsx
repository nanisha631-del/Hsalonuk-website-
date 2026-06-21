/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Star, HelpCircle } from "lucide-react";
import { useSharedState } from "../useSharedState";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import LuxuryButton from "./LuxuryButton";

export default function InteractiveConsultation() {
  const { handleAddToCart } = useSharedState();
  const [step, setStep] = useState<"intro" | "q1" | "q2" | "q3" | "result">("intro");
  const [answers, setAnswers] = useState({
    concern: "",
    texture: "",
    scent: "",
  });

  const [addedToCart, setAddedToCart] = useState(false);

  // Restart the consultation
  const handleReset = () => {
    setAnswers({ concern: "", texture: "", scent: "" });
    setStep("intro");
    setAddedToCart(false);
  };

  // Find recommendation based on answers
  const getRecommendation = (): Product => {
    const concern = answers.concern;
    const texture = answers.texture;

    if (concern === "scalp") {
      if (texture === "rich") {
        return PRODUCTS.find((p) => p.id === "snail-silk-scalp-mask") || PRODUCTS[1];
      }
      return PRODUCTS.find((p) => p.id === "snail-silk-serum") || PRODUCTS[0];
    }
    
    if (concern === "hair") {
      if (texture === "oil") {
        return PRODUCTS.find((p) => p.id === "snail-silk-scalp-oil") || PRODUCTS[2];
      }
      if (texture === "light") {
        return PRODUCTS.find((p) => p.id === "eyeliner") || PRODUCTS[9];
      }
      return PRODUCTS.find((p) => p.id === "halo-highlighter") || PRODUCTS[5];
    }

    if (concern === "skin") {
      if (texture === "rich") {
        return PRODUCTS.find((p) => p.id === "concealer") || PRODUCTS[8];
      }
      return PRODUCTS.find((p) => p.id === "ground-recovery-oil") || PRODUCTS[3];
    }

    if (concern === "body") {
      return PRODUCTS.find((p) => p.id === "gym-silk") || PRODUCTS[4];
    }

    // Default premium fallback
    return PRODUCTS.find((p) => p.id === "snail-silk-scalp-oil") || PRODUCTS[2];
  };

  const recommendedProduct = getRecommendation();

  return (
    <section 
      id="custom-interactive-consultation" 
      className="w-full bg-[#F7F5F2] py-28 sm:py-36 px-4 md:px-12 select-none border-t border-black/5"
    >
      {/* Title block with generous gap (spacing) for breathing room */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <p className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#82D8C5] uppercase mb-4">
          AUTOMATED CURATOR COCKTAIL // RITUAL
        </p>
        <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-black leading-[1.12] text-brand-black tracking-tight uppercase">
          DISCOVER YOUR PERFECT <br />
          HAIR & SKIN RITUAL
        </h2>
        <div className="w-16 h-0.5 bg-[#82D8C5] mx-auto mt-6" />
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl md:rounded-[36px] overflow-hidden shadow-[0_12px_40px_rgba(130,216,197,0.06)] relative border border-black/10 flex flex-col min-h-[560px]">
        {/* Decorative Watermark background */}
        <div className="absolute right-0 top-0 text-[180px] font-black tracking-tighter text-[#82D8C5]/[0.08] pointer-events-none select-none font-serif uppercase">
          HSALON
        </div>

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-[500px]"
            >
              {/* Image Section Block to show beautiful custom picture */}
              <div className="md:col-span-5 relative bg-zinc-100 aspect-square md:aspect-auto overflow-hidden group">
                <img 
                  src="/01 frame.jpeg" 
                  alt="Custom diagnostics consult - luxury cosmetics setup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] brightness-[0.94] [will-change:transform]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="font-sans font-extrabold text-[9px] uppercase tracking-widest text-[#82D8C5] block mb-1">
                    DIAGNOSTIC SPA GATE
                  </span>
                  <p className="font-serif text-lg font-bold uppercase leading-tight">
                    Custom Calibrated Botanicals
                  </p>
                </div>
              </div>

              {/* Action content block */}
              <div className="md:col-span-7 flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 relative z-10">
                <div className="w-12 h-12 rounded-full border border-[#82D8C5]/30 flex items-center justify-center mb-6 bg-[#82D8C5]/5 text-[#82D8C5] shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="font-sans font-bold text-xs tracking-[0.25em] text-[#82D8C5] uppercase mb-3">
                  Virtual Spa Concierge
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl text-black leading-tight tracking-tight uppercase mb-6">
                  Ready to calibrate <br />
                  your formula?
                </h3>
                <p className="font-sans text-sm text-brand-black/60 leading-relaxed mb-10 max-w-md">
                  Spend 30 seconds with our interactive curation tool. We will analyze your concerns and custom-match an elite apothecary therapy just for you.
                </p>
                
                <LuxuryButton
                  onClick={() => setStep("q1")}
                  className="group flex items-center gap-3 bg-brand-black text-white hover:bg-[#82D8C5] hover:text-brand-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
                >
                  Begin Curation
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </LuxuryButton>
              </div>
            </motion.div>
          )}

          {step === "q1" && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col p-8 sm:p-12 md:p-16 max-w-4xl mx-auto w-full relative z-10 justify-center h-full min-h-[500px]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#82D8C5] uppercase">Step 01 / 03</span>
                <span className="font-sans text-xs font-bold text-black/60">Concerns</span>
              </div>
              <h3 className="font-serif text-[28px] sm:text-[36px] text-black leading-none uppercase tracking-tight mb-8 text-center sm:text-left">
                Where is your primary care concern?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "scalp", label: "Sensitive, Flaky or Dry Scalp", sub: "Requires calm cooling, redness-relief & nutrient balance" },
                  { id: "hair", label: "Dry, Frizzy or Damaged Hair Locks", sub: "Requires cuticle sealing, weightless gloss & heat protection" },
                  { id: "skin", label: "Dull, Dehydrated or Sleepy Face Skin", sub: "Requires overnight lipid barrier repair & grounding hydration" },
                  { id: "body", label: "Tense Body, Overworked Joints & Limbs", sub: "Requires therapeutic warming botanics & muscle recovery" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswers({ ...answers, concern: opt.id });
                      setStep("q2");
                    }}
                    className="group border border-black/10 hover:border-[#82D8C5] hover:bg-[#82D8C5]/5 rounded-2xl p-6 text-left transition-all duration-300 active:scale-[0.98] cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-black mb-1.5 group-hover:text-brand-black">
                          {opt.label}
                        </span>
                        <span className="font-sans text-[11px] text-black/50 leading-relaxed group-hover:text-black/75">
                          {opt.sub}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "q2" && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col p-8 sm:p-12 md:p-16 max-w-4xl mx-auto w-full relative z-10 justify-center h-full min-h-[500px]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#82D8C5] uppercase">Step 02 / 03</span>
                <span className="font-sans text-xs font-bold text-black/60">Formula Texture</span>
              </div>
              <h3 className="font-serif text-[28px] sm:text-[36px] text-black leading-none uppercase tracking-tight mb-8 text-center sm:text-left">
                What is your preferred ritual texture?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "light", label: "Weightless Serum", sub: "Instantly absorbed, highly concentrated botanical elixirs" },
                  { id: "rich", label: "Intensive Balm/Mask", sub: "Rich therapeutic treatment to fully reconstruct structure" },
                  { id: "oil", label: "Nourishing Oil", sub: "Sacred revitalization supplying intense protection & glossy shine" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswers({ ...answers, texture: opt.id });
                      setStep("q3");
                    }}
                    className="group border border-black/10 hover:border-[#82D8C5] hover:bg-[#82D8C5]/5 rounded-2xl p-6 text-left transition-all duration-300 active:scale-[0.98] cursor-pointer flex flex-col min-h-[140px]"
                  >
                    <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-black mb-2 group-hover:text-brand-black">
                      {opt.label}
                    </span>
                    <span className="font-sans text-[11px] text-black/50 leading-relaxed mt-auto">
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("q1")}
                className="mt-6 self-start text-[11px] font-bold tracking-widest text-[#82D8C5]/80 hover:text-brand-black hover:scale-105 transition-all uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Back
              </button>
            </motion.div>
          )}

          {step === "q3" && (
            <motion.div
              key="q3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col p-8 sm:p-12 md:p-16 max-w-4xl mx-auto w-full relative z-10 justify-center h-full min-h-[500px]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#82D8C5] uppercase">Step 03 / 03</span>
                <span className="font-sans text-xs font-bold text-black/60">Aromatic Profile</span>
              </div>
              <h3 className="font-serif text-[28px] sm:text-[36px] text-black leading-none uppercase tracking-tight mb-8 text-center sm:text-left">
                Select your aromatic inspiration:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "herb", label: "Peppermint & Chamomile", sub: "Cooling sensory release, clean herbals, and lightweight hydration" },
                  { id: "jasmine", label: "Jasmin & Sandalwood", sub: "Exotic rich floral patterns, delicate, grounding and high-end" },
                  { id: "lavender", label: "Lavender & Rosemary", sub: "Soothing earthy elements, helps trigger deep rest and sleep cycles" },
                  { id: "euc", label: "Eucalyptus & Ginger", sub: "Warm energizing stimulation, blood-flow activation & post-workout freshness" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAnswers({ ...answers, scent: opt.id });
                      setStep("result");
                    }}
                    className="group border border-black/10 hover:border-[#82D8C5] hover:bg-[#82D8C5]/5 rounded-2xl p-6 text-left transition-all duration-300 active:scale-[0.98] cursor-pointer"
                  >
                    <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-black mb-1.5 block group-hover:text-brand-black">
                      {opt.label}
                    </span>
                    <span className="font-sans text-[11px] text-black/50 leading-relaxed block">
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("q2")}
                className="mt-6 self-start text-[11px] font-bold tracking-widest text-[#82D8C5]/80 hover:text-brand-black hover:scale-105 transition-all uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Back
              </button>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col md:flex-row p-6 sm:p-10 md:p-16 gap-8 md:gap-12 relative z-10 items-center justify-center w-full"
            >
              {/* Product Match Visual Frame */}
              <div className="w-full md:w-1/2 max-w-sm aspect-square bg-[#EAEAEA] rounded-3xl overflow-hidden relative border border-black/10 group shadow-xs">
                <img
                  src={recommendedProduct.images[0]}
                  alt={recommendedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-brand-black text-[#82D8C5] font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full select-none shadow-md">
                  YOUR FORMULA MATCH
                </div>
              </div>

              {/* Product Match details */}
              <div className="w-full md:w-1/2 flex flex-col">
                <span className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#82D8C5] uppercase mb-2">
                  CONCIERGE DIAGNOSTIC RECIPE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-black leading-tight uppercase tracking-tight mb-2">
                  {recommendedProduct.name}
                </h3>
                <p className="font-sans text-xs italic text-black/55 mb-4">
                  {recommendedProduct.subtitle}
                </p>

                {/* Rating - fully styled luxury emerald review */}
                <div className="flex items-center gap-1 text-[#82D8C5] mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < recommendedProduct.rating ? "text-[#82D8C5]" : "text-black/10"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-black/40 font-mono tracking-widest ml-2 uppercase">
                    5.0 RATED FORMULA
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-black/60 leading-relaxed mb-6">
                  {recommendedProduct.description}
                </p>

                {/* Match points */}
                {recommendedProduct.bullets && (
                  <ul className="space-y-2 mb-8">
                    {recommendedProduct.bullets.slice(0, 3).map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-sans text-xs text-black/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price and Add item to Cart drawer */}
                <div className="flex flex-wrap items-center justify-between border-t border-black/5 pt-6 mt-auto gap-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-[#82D8C5] uppercase tracking-widest font-black">Ritual Price</span>
                    <span className="font-serif font-black text-2xl text-black">
                      ${recommendedProduct.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleAddToCart(recommendedProduct, 1);
                        setAddedToCart(true);
                        setTimeout(() => setAddedToCart(false), 3000);
                      }}
                      className={`font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] px-8 py-4 rounded-full flex items-center gap-2 shadow-md transition-all duration-300 cursor-pointer ${
                        addedToCart
                          ? "bg-emerald-500 text-white hover:scale-105"
                          : "bg-brand-black text-white hover:bg-[#82D8C5] hover:text-brand-black hover:scale-[1.03] active:scale-95"
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="w-4 h-4 text-white animate-pulse" />
                          Added To Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Instant Add To Bag
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReset}
                      className="p-4 rounded-full border border-black/10 hover:border-[#82D8C5] hover:bg-[#82D8C5]/5 hover:text-brand-black transition-all cursor-pointer text-black/40"
                      title="Retake Consultation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
