/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShieldCheck, Sparkles, Award, ShoppingBag, Eye, Heart } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

// Smooth liquid overlay title filling from left to right on hover
const LiquidFillHeading = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <h1 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-sans font-black text-4xl md:text-[56px] leading-[0.9] tracking-normal uppercase mb-3 cursor-pointer select-none"
      style={{
        wordSpacing: "0.25em",
        backgroundImage: "linear-gradient(to right, #82D8C5 50%, #ffffff 50%)",
        backgroundSize: "200% 100%",
        backgroundPosition: isHovered ? "0% 0%" : "100% 0%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        transition: "background-position 1.25s cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      Laboratory Bestsellers
    </h1>
  );
};

// Reusable fluid background-filling action tab buttons
interface FluidTabHeaderButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}

const FluidTabHeaderButton = ({ label, isActive, onClick, onMouseEnter }: FluidTabHeaderButtonProps) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`relative px-5 py-2.5 rounded-xl font-sans text-xs font-black uppercase tracking-wider overflow-hidden transition-colors duration-500 cursor-pointer text-center select-none ${
        isActive ? "text-brand-black" : "text-white bg-white/10 hover:bg-white/15"
      }`}
    >
      <span className="relative z-10">{label}</span>
      <span
        style={{
          width: isActive ? "100%" : "0%",
          transition: "width 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
        className="absolute inset-y-0 left-0 bg-[#82D8C5] z-0 rounded-xl"
      />
    </button>
  );
};

// Fluid and decelerating (ease-out) countdown numbering counter starting from 1 to target value
const AnimatedCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("1");

  useEffect(() => {
    const prefix = value.startsWith("-") ? "-" : "";
    const cleanString = value.replace(/^[+-]/, "");
    const match = cleanString.match(/[\d.]+/);
    
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[0]);
    const suffix = cleanString.replace(match[0], "");
    const duration = 1800; // 1.8 seconds transition
    const startTime = performance.now();
    const hasDecimal = match[0].includes(".");

    let animationFrameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Decelerating (Ease Out Cubic) easing
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = 1 + (targetNum - 1) * easeProgress;

      let formattedNum = "";
      if (hasDecimal) {
        formattedNum = currentNum.toFixed(1);
      } else {
        formattedNum = Math.floor(currentNum).toString();
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{displayValue}</span>;
};

interface BestsellersPageProps {
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onBackToHome: () => void;
}

export default function BestsellersPage({
  onSelectProduct,
  onAddToCart,
  onBackToHome
}: BestsellersPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "volume" | "nourish">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter products by BESTSELLER tag
  const bestsellerProducts = PRODUCTS.filter(p => p.tags?.includes("BESTSELLER"));

  const filteredProducts = bestsellerProducts.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "volume") {
      return p.category === "scalp-care"; // scalp treatments
    }
    if (activeTab === "nourish") {
      return p.category === "hair-oils"; // hair oils
    }
    return true;
  });

  const handleQuickAdd = (p: Product) => {
    const defaultColor = p.colors && p.colors.length > 0 ? p.colors[0].name : undefined;
    onAddToCart(p, 1, defaultColor);
    setToastMessage(`Success: Added ${p.name} to checkout bag!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const clinicalStats = [
    { value: "94%", label: "Verified lipid barrier repair", detail: "Based on 6 weeks clinical trial" },
    { value: "-88.5%", label: "Flake reduction", detail: "Snail Silk Mask + Rosemary" },
    { value: "100%", label: "Cruelty Free & Vegan", detail: "Third-party laboratory certified" },
    { value: "48-HR", label: "Anti-frizz humidity lock", detail: "Camellia & Squalane shield" }
  ];

  return (
    <div id="bestsellers-page" className="w-full bg-brand-offwhite pt-32 pb-24 px-4 md:px-12 animate-fade-in text-brand-black">
      {/* Toast Alert pop-up notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-brand-black text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-brand-offwhite/10 animate-slide-up">
          <div className="w-2 h-2 rounded-full bg-[#82D8C5] animate-ping" />
          <span className="font-sans text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#82D8C5] mb-2">
          <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Home</span>
          <span>/</span>
          <span>Spotlight Selection</span>
        </div>

        {/* Hero Section Banner */}
        <div className="bg-brand-black rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden text-white flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#82D8C5]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#82D8C5]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#82D8C5]/10 text-[#82D8C5] px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider mb-4 border border-[#82D8C5]/20">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Verified Clinical Performance
            </div>
            <LiquidFillHeading />
            <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
              These gold-standard formulas are highly acclaimed by dermatologists and editors worldwide. Explore molecular hair and skin care with instant results.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 z-10">
            <FluidTabHeaderButton
              label="All Winners"
              isActive={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) setActiveTab("all");
              }}
            />
            <FluidTabHeaderButton
              label="Scalp Restoratives"
              isActive={activeTab === "volume"}
              onClick={() => setActiveTab("volume")}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) setActiveTab("volume");
              }}
            />
            <FluidTabHeaderButton
              label="High-Gloss Elixirs"
              isActive={activeTab === "nourish"}
              onClick={() => setActiveTab("nourish")}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) setActiveTab("nourish");
              }}
            />
          </div>
        </div>

        {/* Clinical trial success metrics strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {clinicalStats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-brand-black/5 shadow-xs text-center">
              <span className="block font-sans font-black text-3xl md:text-4xl text-[#82D8C5] leading-none mb-1">
                <AnimatedCounter value={stat.value} />
              </span>
              <span className="block font-sans text-xs font-bold uppercase tracking-wider text-brand-black leading-tight mt-1">{stat.label}</span>
              <span className="block font-mono text-[10px] text-brand-black/40 mt-1.5">{stat.detail}</span>
            </div>
          ))}
        </div>

        {/* Highlight list card details */}
        <motion.div
          key={activeTab}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.3, // Deliberate gentle delay for one-by-one sequential showcasing
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {filteredProducts.map((p) => {
            const hasColors = p.colors && p.colors.length > 0;
            return (
              <motion.div 
                key={p.id}
                layout
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40, // Elegant smooth rising translation
                    filter: "blur(4px)", // Perfectly soft blur entry
                    scale: 0.99,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: {
                      duration: 1.2, // Continuous fluid motion
                      ease: [0.16, 1, 0.3, 1], // GPU rendering optimized cubic bezier curve
                    }
                  }
                }}
                style={{ willChange: "transform, opacity, filter" }}
                className="bg-white rounded-2xl border border-brand-black/5 p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image panel with badge */}
                <div 
                  onClick={() => onSelectProduct(p.id)}
                  className="w-full lg:w-1/3 aspect-square bg-brand-offwhite rounded-xl relative overflow-hidden flex items-center justify-center p-8 cursor-pointer select-none border border-brand-black/5 shrink-0 group"
                >
                  <img 
                    src={p.images[0]} 
                    alt={p.name}
                    className="object-contain w-full h-full p-4 group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-black text-white px-3 py-1 rounded-md text-[10px] font-sans font-black tracking-widest uppercase flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#82D8C5]" /> CLINICAL CHAMPION
                  </div>
                </div>

                {/* Content description details inside */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#82D8C5]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#82D8C5] text-[#82D8C5]" />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-brand-black/50 font-bold uppercase">5.0 / 5.0 VERIFIED RATING</span>
                  </div>

                  <div>
                    <h2 
                      onClick={() => onSelectProduct(p.id)}
                      className="font-sans font-black text-2xl md:text-3xl text-brand-black hover:text-[#82D8C5] transition-colors leading-tight cursor-pointer uppercase tracking-tight"
                    >
                      {p.name}
                    </h2>
                    {p.subtitle && (
                      <p className="font-sans text-sm text-[#82D8C5] font-extrabold tracking-wide mt-1">{p.subtitle}</p>
                    )}
                  </div>

                  <p className="font-sans text-xs md:text-sm text-brand-black/60 leading-relaxed">
                    {p.description || p.intro}
                  </p>

                  {/* Bullet points metrics */}
                  {p.bullets && p.bullets.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {p.bullets.slice(0, 4).map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-sans text-brand-black/80">
                          <ShieldCheck className="w-4 h-4 text-[#82D8C5] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pricing and interaction row */}
                  <div className="pt-6 border-t border-brand-black/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-xl md:text-2xl font-black text-brand-black">${p.price.toFixed(2)} USD</span>
                      {p.originalPrice && (
                        <span className="text-xs text-brand-black/35 line-through">${p.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectProduct(p.id)}
                        className="border border-brand-black/10 hover:border-brand-black bg-white select-none text-brand-black px-6 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                      <button
                        onClick={() => handleQuickAdd(p)}
                        className="bg-brand-black hover:bg-[#82D8C5] hover:text-brand-black text-[#82D8C5] select-none px-6 py-2.5 rounded-xl font-sans text-xs font-extrabold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
