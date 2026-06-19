/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Plus, Check, ShoppingBag, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface BundlePackSectionProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onSelectProduct: (productId: string) => void;
}

interface CustomBundleDef {
  title: string;
  subtitle: string;
  description: string;
  discountPct: number;
  steps: {
    label: string;
    productId: string;
    description: string;
  }[];
}

const getBundleForProduct = (productId: string): CustomBundleDef => {
  switch (productId) {
    case "snail-silk-serum":
      return {
        title: "The Serene Scalp Clarifying Ritual",
        subtitle: "3-Step Deep Root Calming Program",
        description: "Indulge in a clinical-grade scalp cleansing sequence designed to lift flakes, instantly soothe itchiness, and style with a gorgeous silken luster.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: THERAPHY MASK", productId: "snail-silk-scalp-mask", description: "Deeply balances and removes scalp scales during wash." },
          { label: "STEP 2: TREATMENT ELIXIR", productId: "snail-silk-serum", description: "Leave-in soothing drops cooling active irritation." },
          { label: "STEP 3: MERIDIAN COMB", productId: "h-salon-comb", description: "Polished celluloid teeth to stimulate root circulation." }
        ]
      };
    case "snail-silk-scalp-mask":
      return {
        title: "Thermal Moisture Infusion Routine",
        subtitle: "Intense Barrier Hydro-Reactivation",
        description: "The supreme restoration for severely dehydrated crowns. Maximizes follicle hydration levels and detangles hair strands with heavy organic silk drape.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: CLARIFY SHOT", productId: "color-mascara", description: "Hyaluronic boost to open scalp hydration channels." },
          { label: "STEP 2: COCONUT MASQUE", productId: "snail-silk-scalp-mask", description: "Intensively hydrate and calm redness under warm wrap." },
          { label: "STEP 3: THERMAL CAP", productId: "h-salon-cap", description: "Quilted cotton crown shield to keep essential formulas secure." }
        ]
      };
    case "snail-silk-scalp-oil":
      return {
        title: "Elite Lustrous Glass Hair Routine",
        subtitle: "Maximum Gloss & Humidity Defense",
        description: "Formulated for high-fashion runway shine. Refines damaged follicles, wraps dry ends in heavy silken nourishment, and defies damp British humidity.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: MOLECULAR REPAIR", productId: "eyeliner", description: "Rebuilds internal sulfide links in chemical-treated shafts." },
          { label: "STEP 2: GOLD LUST OIL", productId: "snail-silk-scalp-oil", description: "Infuses lightweight high-gloss reflection and Côte d'Azur magic." },
          { label: "STEP 3: DETANGLE WEAVE", productId: "h-salon-comb", description: "Handcrafted comb designed to part locks without snags." }
        ]
      };
    case "ground-recovery-oil":
      return {
        title: "Sovereign Nocturnal Regeneration Set",
        subtitle: "Absolute Radiance & Facial Calmness",
        description: "Transform your twilight hour into a clinical, calming session. Combats skin irritation, resets texture lines, and gives an authentic morning glow.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: RECOVERY EXTRACTION", productId: "ground-recovery-oil", description: "Botanical active fluid to renew facial brightness." },
          { label: "STEP 2: BEDTIME SLEEP BALM", productId: "concealer", description: "Breathe in pure lavender vapor to relax temple stressors." },
          { label: "STEP 3: SIGNATURE VELVET POUCH", productId: "makeup-pouch", description: "Custom velvet travel container protecting your glass bottles." }
        ]
      };
    case "gym-silk":
      return {
        title: "Post-Athletic Sensory Recovery Set",
        subtitle: "Aromatic Circulation & Hydration",
        description: "Relax tired muscles, release tension, and moisturize warm damp skin with Aesop's premium botanical complex following training or hot yoga.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: CIRCULATION RECOVERY", productId: "gym-silk", description: "Eucalyptus and ginger vapors to melt physical fatigue." },
          { label: "STEP 2: REST BALM", productId: "concealer", description: "Calming sweet almond extract to nurture weary senses." },
          { label: "STEP 3: PROTECTIVE SHIELD", productId: "h-salon-cap", description: "Comfortable high-density cotton cap for post-spa rest." }
        ]
      };
    case "halo-highlighter":
      return {
        title: "Royal Reflection Resurfacing Kit",
        subtitle: "Duo-Serum Gloss & Split-End Erase",
        description: "The dual botanical mechanism that seals open hair cuticles, corrects split ends, and delivers mesmerizing glassy luster in seconds.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: ELIXIR ULTIME", productId: "halo-highlighter", description: "Marula oil base for heat-activated gloss shield." },
          { label: "STEP 2: SPLIT END SEAL", productId: "lip-gloss", description: "Seals fractured hair fibers with weightless nutrition." },
          { label: "STEP 3: JETSETTER BAG", productId: "makeup-pouch", description: "Heavy luxury velvet cosmetic organizer." }
        ]
      };
    case "color-mascara":
      return {
        title: "Hydro-Lipidic Flake Rescue Combo",
        subtitle: "Dermatologist Hydration Routine",
        description: "For highly reactive, extremely dry and sensitive scalp skin. Provides deep cellular nourishment to keep roots calm throughout local weather changes.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: BOOSTER SHOT", productId: "color-mascara", description: "Clinically concentrated Hyaluronic Acid booster logic." },
          { label: "STEP 2: TREATMENT ELIXIR", productId: "snail-silk-serum", description: "Soothes root tissue with cooling mint extracts." },
          { label: "STEP 3: COMPLEMENTARY MASK", productId: "snail-silk-scalp-mask", description: "Locks in water reserves, detoxifying dry scales." }
        ]
      };
    case "eye-shadow-stick":
      return {
        title: "Chronologiste Youth Revitalization Duet",
        subtitle: "Active Caviar Pearls & Luxury Gloss",
        description: "Encapsulated therapeutic hair caviar that bursts on contact. Densifies hair pulp fibers and triggers intense deep follicle volume.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: CAVIAR PEARLS", productId: "eye-shadow-stick", description: "Peptide-burst pearls that renew cell energy at the roots." },
          { label: "STEP 2: KÉRASTASE ELIXIR", productId: "halo-highlighter", description: "Lightweight camellia botanical serum to finalize shine." },
          { label: "STEP 3: MERIDIAN BRUSH", productId: "h-salon-comb", description: "Stimulating tailored celluloid teeth to maximize volume." }
        ]
      };
    case "concealer":
      return {
        title: "Nocturnal Aromatherapy Restoration Kit",
        subtitle: "Mind-Calming Overnight Recovery Set",
        description: "Align your internal body clock with pure aromatherapy. Melt mental fatigue before bed while restoring your skin barrier beautifully.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: ZEN SLEEP BALM", productId: "concealer", description: "Aromatherapy lavender wax pressed smoothly onto target nodes." },
          { label: "STEP 2: BOTANICAL ELIXIR", productId: "ground-recovery-oil", description: "Nutritive morning glow oil representing premium skincare." },
          { label: "STEP 3: CROWN COCOON", productId: "h-salon-cap", description: "Thick cotton cap to protect and isolate night therapy." }
        ]
      };
    case "eyeliner":
      return {
        title: "Molecular Bone-Deep Bond Perfector",
        subtitle: "Structural Core Hair Rescue Treatment",
        description: "The absolute science-first repair program for bleached, heavily color-processed, or split-prone hair. Glues fractured hair bonds perfectly.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: BOND BUILDER NO.3", productId: "eyeliner", description: "Patented formula repairing broken disulfide links internally." },
          { label: "STEP 2: GOLD NUTRIENT OIL", productId: "snail-silk-scalp-oil", description: "Precious oils shielding strands against hot mechanical snags." },
          { label: "STEP 3: METICULOUS TAIL COMB", productId: "h-salon-comb", description: "Finetoothed styling comb for precise treatment mapping." }
        ]
      };
    case "lip-gloss":
      return {
        title: "Split End Eraser & Core Repair Duo",
        subtitle: "Glassy Cuticle Resurfacing Sequence",
        description: "Instantly binds fractured fibers together. Keeps tips completely soft, and wards off the frizzy effect of humid environments.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: NO.3 NOURISHMENT", productId: "eyeliner", description: "Injects structural cortex proteins into fragile roots." },
          { label: "STEP 2: NUTRITIVE SERUM", productId: "lip-gloss", description: "Targeted daily treatment gluing split ends into smooth fibers." },
          { label: "STEP 3: SOOTHING MASQUE", productId: "snail-silk-scalp-mask", description: "Dermatology mask protecting scales against splitting." }
        ]
      };
    default:
      return {
        title: "The Jetsetter's Apothecary Care Set",
        subtitle: "Universal Botanical Master Duo",
        description: "A gorgeous collection of our best-selling formulas and travel accessories to maintain glowing, hydrated, frizz-free results anywhere in the world.",
        discountPct: 15,
        steps: [
          { label: "STEP 1: ACCURATE STYLING TOOL", productId: "h-salon-comb", description: "Stimulate micro-circulation across hair follicles." },
          { label: "STEP 2: GOLD LUST TREATMENT", productId: "snail-silk-scalp-oil", description: "A high-shine luxury shield providing Côte d'Azur aroma." },
          { label: "STEP 3: VELVET STORAGE POUCH", productId: "makeup-pouch", description: "Elegantly padded quilted cotton velvet pouch container." }
        ]
      };
  }
};

export default function BundlePackSection({ product, onAddToCart, onSelectProduct }: BundlePackSectionProps) {
  const bundleDef = getBundleForProduct(product.id);

  // Map products
  const stepProducts = bundleDef.steps
    .map((step) => {
      const p = PRODUCTS.find((item) => item.id === step.productId);
      return p ? { ...step, product: p } : null;
    })
    .filter(Boolean) as { label: string; productId: string; description: string; product: Product }[];

  const [isSuccessAdded, setIsSuccessAdded] = useState(false);
  const [selectedPreviewId, setSelectedPreviewId] = useState<string | null>(null);

  // Pricing
  const originalTotal = stepProducts.reduce((acc, step) => acc + step.product.price, 0);
  const discountMultiplier = (100 - bundleDef.discountPct) / 100;
  const bundleTotal = originalTotal * discountMultiplier;
  const totalSavings = originalTotal - bundleTotal;

  const handleAddBundleToCart = () => {
    if (stepProducts.length === 0) return;
    setIsSuccessAdded(true);
    
    // Add each product in routine to cart
    stepProducts.forEach((stepItem) => {
      onAddToCart(stepItem.product, 1);
    });

    setTimeout(() => {
      setIsSuccessAdded(false);
    }, 4500);
  };

  return (
    <section 
      id="compact-routine-bundle-pack"
      className="max-w-7xl mx-auto my-14 px-4 md:px-12 select-none"
    >
      <div className="bg-[#FAF8F5] border-2 border-[#3D4A3E]/10 rounded-2xl p-5 md:p-8 relative overflow-hidden text-left shadow-xs">
        
        {/* Cute Brand Tag - Green accents */}
        <div className="absolute top-0 right-0 bg-[#3D4A3E]/10 text-[#3D4A3E] text-[8.5px] font-sans font-black uppercase tracking-[0.2em] px-4 py-2 rounded-bl-xl border-l border-b border-[#3D4A3E]/15 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#3D4A3E]" /> ROUTINE BUNDLE · SAVE {bundleDef.discountPct}%
        </div>

        {/* Header Block of Bundle - Small and Cute spacing */}
        <div className="max-w-xl text-left mb-6">
          <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-[#3D4A3E] font-bold">RECOMMENDED WELLNESS RITUAL</span>
          <h2 className="font-serif text-[22px] md:text-[28px] font-black text-brand-black mt-0.5 tracking-tight leading-tight">
            {bundleDef.title}
          </h2>
          <p className="text-[11.5px] text-gray-500 font-sans mt-1.5 leading-relaxed">
            {bundleDef.subtitle}. This curated set delivers maximum benefits when layered in order. Get all three with extra savings in a combined ritual pack.
          </p>
        </div>

        {/* HORIZONTAL CARD STYLE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main sequence: horizontal row layout of product items */}
          <div className="lg:col-span-8 flex flex-col justify-center gap-4">
            
            {/* 
              LAPTOP / DESKTOP VIEW: Horizontal Card Line with interactive markers 
              Connected with beautiful green plus symbols and intense hover animations
            */}
            <div className="hidden md:flex flex-row items-center gap-4 w-full justify-between pr-2">
              {stepProducts.map((step, idx) => {
                const isActive = selectedPreviewId === step.productId;
                return (
                  <div key={step.productId} className="flex-1 flex items-center justify-between">
                    
                    {/* Compact card container */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.03, 
                        borderColor: "#3D4A3E",
                        boxShadow: "0 10px 25px -5px rgba(61, 74, 62, 0.08)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedPreviewId(step.productId === selectedPreviewId ? null : step.productId);
                      }}
                      className={`flex flex-col bg-white border border-[#3D4A3E]/15 p-4 rounded-xl text-left cursor-pointer transition-all duration-300 relative w-full h-[220px] justify-between ${
                        isActive ? "border-[#3D4A3E] ring-2 ring-[#3D4A3E]/10 bg-[#3D4A3E]/[0.02]" : "hover:bg-[#F3F6F4]"
                      }`}
                    >
                      {/* Step Indicator pill - green color theme */}
                      <div className="flex justify-between items-center">
                        <span className="bg-[#3D4A3E] text-[#FCFAF7] text-[8.5px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                          Step {idx + 1}
                        </span>
                        <span className="text-[10px] font-sans text-[#3D4A3E] font-medium">
                          ${(step.product.price * discountMultiplier).toFixed(2)}
                        </span>
                      </div>

                      {/* Product image centered inside card */}
                      <div className="w-[70px] h-[70px] rounded-full mx-auto bg-[#FCFAF7] border border-brand-black/5 flex items-center justify-center p-1.5 overflow-hidden shadow-xs hover:rotate-6 transition-transform">
                        <img 
                          src={step.product.images[0]} 
                          alt={step.product.name}
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Step Title details */}
                      <div>
                        <h4 className="font-serif text-[13px] font-black leading-tight text-brand-black uppercase tracking-tight line-clamp-1">
                          {step.product.name}
                        </h4>
                        <p className="text-[10.5px] text-gray-400 font-sans mt-0.5 line-clamp-1 italic">
                          {"Verified Botanical Formula"}
                        </p>
                      </div>

                      {/* Expandable miniature detail bar */}
                      <div className="border-t border-brand-black/5 pt-1.5 flex justify-between items-center text-[9px] text-[#3D4A3E] font-sans">
                        <span className="font-bold tracking-wider">VIEW INFUSION</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>

                    </motion.div>

                    {/* Connector element '+'. Omitted on the last product */}
                    {idx < stepProducts.length - 1 && (
                      <div className="mx-3 flex items-center justify-center text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-[#3D4A3E]/10 border border-[#3D4A3E]/15 flex items-center justify-center">
                          <Plus className="w-3.5 h-3.5 text-[#3D4A3E] stroke-[3]" />
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* 
              MOBILE VIEW: Small Horizontal Swipeable Row card style (under md breakpoint)
              Perfect for thumb-swiping! Completely cute, green-highlighted, responsive
            */}
            <div className="block md:hidden w-full overflow-hidden">
              <div className="flex overflow-x-auto gap-3.5 py-1 px-0.5 scrollbar-none snap-x snap-mandatory">
                {stepProducts.map((step, idx) => {
                  const isActive = selectedPreviewId === step.productId;
                  return (
                    <motion.div
                      key={step.productId}
                      whileTap={{ 
                        scale: 0.96,
                        borderColor: "#3D4A3E"
                      }}
                      onClick={() => {
                        setSelectedPreviewId(step.productId === selectedPreviewId ? null : step.productId);
                      }}
                      className={`w-[68vw] h-[200px] bg-white border rounded-xl p-4 snap-start shrink-0 flex flex-col justify-between text-left transition-all duration-300 ${
                        isActive 
                          ? "border-[#3D4A3E] ring-2 ring-[#3D4A3E]/10 bg-[#3D4A3E]/[0.02]" 
                          : "border-[#3D4A3E]/15 hover:bg-[#F3F6F4]"
                      }`}
                    >
                      <div className="flex justify-between items-center header-section">
                        <span className="bg-[#3D4A3E] text-white text-[8px] font-sans font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md">
                          Step {idx + 1}
                        </span>
                        
                        <span className="text-[10px] font-sans font-bold text-[#3D4A3E]">
                          ${(step.product.price * discountMultiplier).toFixed(2)}
                        </span>
                      </div>

                      {/* Image block in row detail */}
                      <div className="flex items-center gap-3.5 my-2">
                        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-brand-black/5 p-1 shrink-0">
                          <img 
                            src={step.product.images[0]} 
                            alt={step.product.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-[12.5px] font-bold text-brand-black truncate">
                            {step.product.name}
                          </h4>
                          <span className="text-[9px] text-[#3D4A3E] block font-semibold">Touch to expand description</span>
                        </div>
                      </div>

                      {/* Text subline detail */}
                      <p className="text-[10.5px] text-gray-500 font-sans leading-snug line-clamp-2">
                        {step.description}
                      </p>

                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-2.5 text-center text-[9px] text-gray-400 font-sans flex items-center justify-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#3D4A3E]" />
                <span>Swipe horizontal to explore elements</span>
                <span className="w-1 h-1 rounded-full bg-[#3D4A3E]" />
              </div>
            </div>

            {/* Expandable description panel under active items click */}
            <AnimatePresence>
              {selectedPreviewId && (() => {
                const step = stepProducts.find(s => s.productId === selectedPreviewId);
                if (!step) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#3D4A3E]/5 border border-[#3D4A3E]/10 rounded-xl p-3 text-[11px] text-gray-600 font-sans mt-2"
                  >
                    <div className="flex justify-between items-center mb-1 font-sans">
                      <span className="font-extrabold text-[#3D4A3E] uppercase text-[9.5px] tracking-wider">{step.label} DETAILS</span>
                      <button 
                        onClick={() => onSelectProduct(step.product.id)}
                        className="text-[9.5px] text-brand-black font-extrabold underline hover:text-[#3D4A3E]"
                      >
                        Visit Product Page →
                      </button>
                    </div>
                    <p className="leading-relaxed">
                      {step.description} {step.product.description}
                    </p>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

          </div>

          {/* Right side checkout box - compact summary card styled with active green checkout button */}
          <div className="lg:col-span-4 bg-white border border-[#3D4A3E]/15 rounded-xl p-5 flex flex-col justify-between shadow-xs text-left relative">
            
            <div>
              {/* Header inside checkout block */}
              <div className="flex justify-between items-start border-b border-brand-black/5 pb-3.5 mb-4">
                <div>
                  <h3 className="font-serif text-[14.5px] font-black text-brand-black leading-none">Complete Ritual</h3>
                  <span className="text-[10px] text-gray-400 font-sans mt-0.5 block">{stepProducts.length} Premium Formulas combined</span>
                </div>
                <span className="bg-[#3D4A3E]/10 text-[#3D4A3E] text-[9px] font-sans font-extrabold px-2 py-0.5 rounded-full border border-[#3D4A3E]/15 shrink-0">
                  -{bundleDef.discountPct}% SAVE
                </span>
              </div>

              {/* Items pricing list */}
              <div className="space-y-2 mb-4">
                {stepProducts.map((step) => (
                  <div key={step.productId} className="flex justify-between items-center text-[11px] font-sans text-gray-600">
                    <span className="truncate pr-3 group cursor-pointer hover:text-brand-black" onClick={() => onSelectProduct(step.product.id)}>
                      • {step.product.name}
                    </span>
                    <span className="font-bold text-gray-400 whitespace-nowrap">${step.product.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Calculation totals */}
              <div className="border-t border-brand-black/5 pt-3.5 space-y-1.5 mb-4 font-sans text-[11.5px]">
                <div className="flex justify-between text-gray-400">
                  <span>Regular Total Price:</span>
                  <span className="line-through">${originalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#3D4A3E] font-bold">
                  <span>Ritual Pack Benefit:</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
                
                {/* Visual price tag - Green Highlights */}
                <div className="flex justify-between items-end pt-2 text-[#3D4A3E]">
                  <div className="text-left">
                    <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-gray-400 font-extrabold block leading-none mb-1">BUNDLE COCOON PRICE</span>
                    <span className="font-serif italic font-semibold leading-none text-brand-black text-[12px]">Complete Routine Offer</span>
                  </div>
                  <span className="font-sans font-black text-[22px] tracking-tight leading-none text-[#3D4A3E]">
                    ${bundleTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="bg-[#FAF8F5] border border-[#3D4A3E]/10 rounded-lg p-2.5 text-[10px] text-gray-400 leading-normal mb-5 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-black font-extrabold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3D4A3E]" />
                  <span>Approved Clinic Regimen</span>
                </div>
                <p>Includes free express delivery within the United Kingdom. 30-day money-back guarantee seal.</p>
              </div>
            </div>

            {/* Bundle Checkout Button */}
            <div className="relative mt-auto">
              <AnimatePresence>
                {isSuccessAdded && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    className="absolute -top-11 left-0 right-0 bg-[#3D4A3E] text-white text-[10.5px] font-sans font-bold rounded-lg py-2 px-3 text-center flex items-center justify-center gap-1.5 shadow-md border border-[#3D4A3E]/40 z-15"
                  >
                    <Check className="w-3.5 h-3.5 text-[#82D8C5] stroke-[4]" /> Ritual Pack saved to your bag!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button - Green background color theme */}
              <button
                onClick={handleAddBundleToCart}
                disabled={isSuccessAdded}
                className={`w-full py-3.5 px-6 rounded-full font-sans font-bold text-[10.5px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isSuccessAdded 
                    ? "bg-[#3D4A3E]/25 text-white/50 pointer-events-none"
                    : "bg-[#3D4A3E] hover:bg-[#3D4A3E]/95 text-white hover:shadow-md active:scale-97 select-none border border-[#3D4A3E]"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {isSuccessAdded ? "Adding Pack..." : "Add Entire Ritual to Bag"}
              </button>
              
              <span className="text-[9px] font-sans text-gray-400 block text-center mt-2 leading-none">
                Creates custom Shopify line-items with dynamic combo pricing.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
