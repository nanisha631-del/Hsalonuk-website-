/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { useSharedState, formatPrice } from "../useSharedState";

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
        title: "The Clinically Soothed Scalp Set",
        subtitle: "3-Step Deep Root Calming Program",
        description: "A customized 3-step routine designed to soothe irritated crowns and stimulate root circulation.",
        discountPct: 15,
        steps: [
          { label: "1. BALANCING MASK", productId: "snail-silk-scalp-mask", description: "Soothes roots and reduces flaking." },
          { label: "2. TREATMENT ELIXIR", productId: "snail-silk-serum", description: "Leave-in soothing drops cooling irritation." },
          { label: "3. MERIDIAN COMB", productId: "h-salon-comb", description: "Polished natural jade comb to stimulate growth." }
        ]
      };
    case "snail-silk-scalp-mask":
      return {
        title: "Deep Moisture Infusion Routine",
        subtitle: "Hydro-Reactivation Barrier Program",
        description: "Intense botanical hydration system to completely eliminate dryness, redness and static.",
        discountPct: 15,
        steps: [
          { label: "1. COCONUT MASQUE", productId: "snail-silk-scalp-mask", description: "Deep hydration mask for sensitive scalp." },
          { label: "2. CLARIFY SHOT", productId: "color-mascara", description: "Hyaluronic pre-wash boost." },
          { label: "3. HEAT CAP", productId: "h-salon-cap", description: "Traps micro-steam to maximize hydration." }
        ]
      };
    case "snail-silk-scalp-oil":
      return {
        title: "Lustrous Mirror Shine Routine",
        subtitle: "Gloss Renewal & Humidity Defense",
        description: "The ultimate runway shine program that seals damaged cuticles and blocks humidity.",
        discountPct: 15,
        steps: [
          { label: "1. GLOSS SERUM", productId: "snail-silk-scalp-oil", description: "Lightweight oil for ultimate high-gloss finish." },
          { label: "2. BOND REPAIR", productId: "eyeliner", description: "Rebuilds essential cortical bounds." },
          { label: "3. PRECISION COMB", productId: "h-salon-comb", description: "Anti-static styling comb." }
        ]
      };
    case "ground-recovery-oil":
      return {
        title: "Nocturnal Repair Recovery Set",
        subtitle: "Overnight Radiance Barrier Restorer",
        description: "Re-hydrate and restore the skin lipid barrier during your sleep cycle.",
        discountPct: 15,
        steps: [
          { label: "1. EVENING LIPID", productId: "ground-recovery-oil", description: "Botanical face lipid with powerful calm." },
          { label: "2. SLEEP BALM", productId: "concealer", description: "Aromatherapy balm to ease tension." },
          { label: "3. TRAVEL POUCH", productId: "makeup-pouch", description: "Elegant velvet protective envelope." }
        ]
      };
    case "gym-silk":
      return {
        title: "Active Post-Workout Set",
        subtitle: "Sensory Circulation & Fatigue Relief",
        description: "Release tension and hydrate weary muscles after active physical exercises.",
        discountPct: 15,
        steps: [
          { label: "1. RECOVERY ELIXIR", productId: "gym-silk", description: "Refreshing ginger vapor to soothe scalp." },
          { label: "2. MASSAGE BALM", productId: "concealer", description: "Sweet almond soothing balm." },
          { label: "3. SPA BAND", productId: "h-salon-cap", description: "Comfy cotton protection hair cap." }
        ]
      };
    case "halo-highlighter":
      return {
        title: "Gloss Reflection Resurfacing Set",
        subtitle: "Therapeutic Gloss & Core Hydration",
        description: "Advanced peptide and botanical combination that heals split ends and adds gloss.",
        discountPct: 15,
        steps: [
          { label: "1. REFLECTION OIL", productId: "halo-highlighter", description: "Camellia oil base for radiant shine." },
          { label: "2. SPLIT END SEAL", productId: "lip-gloss", description: "Restores broken hair cuticles softly." },
          { label: "3. COSMETIC BAG", productId: "makeup-pouch", description: "Ultra-plush velvet storage bag." }
        ]
      };
    case "color-mascara":
      return {
        title: "Dermatologist Dry Flake Combo",
        subtitle: "Anti-Dandruff Balancing Program",
        description: "Deep prebiotic and botanical nutrition to restore dry, flaky scalp bases.",
        discountPct: 15,
        steps: [
          { label: "1. PRE-WASH SHOT", productId: "color-mascara", description: "Clean base pre-shampoo booster." },
          { label: "2. SOOTHING DROPS", productId: "snail-silk-serum", description: "Leaves scalp completely scale-free." },
          { label: "3. ROOT BALM", productId: "snail-silk-scalp-mask", description: "Locks hydration deep into follicles." }
        ]
      };
    case "eye-shadow-stick":
      return {
        title: "Trichologist Follicle Nourish Set",
        subtitle: "Caviar Micro-Peptide Renewal Program",
        description: "Encapsulated cellular nutrients that immediately restore density and shine.",
        discountPct: 15,
        steps: [
          { label: "1. CAVIAR DROPS", productId: "eye-shadow-stick", description: "Peptide spheres to bolster cell growth." },
          { label: "2. GLOSS ELIXIR", productId: "halo-highlighter", description: "Locks shine and shields styling heat." },
          { label: "3. STYLING COMB", productId: "h-salon-comb", description: "Gently combs through root strands." }
        ]
      };
    case "concealer":
      return {
        title: "Essential Aromatic Overnight Set",
        subtitle: "Skin Barrier Renewal Routine",
        description: "An incredibly calming overnight skin care ritual to seal active moisture.",
        discountPct: 15,
        steps: [
          { label: "1. COMFORT BALM", productId: "concealer", description: "Relaxing lavender-infused face balm." },
          { label: "2. GLOW OIL", productId: "ground-recovery-oil", description: "Renews lipid integrity on cheeks." },
          { label: "3. SLEEP CAP", productId: "h-salon-cap", description: "Safeguards strands from pillow friction." }
        ]
      };
    case "eyeliner":
      return {
        title: "Molecular Bone-Deep Bond Restorer",
        subtitle: "Chemical Damage Repair Program",
        description: "A fast acting scientific treatment that repairs bleach or heat damaged hair bonds.",
        discountPct: 15,
        steps: [
          { label: "1. BOND RECONSTRUCTOR", productId: "eyeliner", description: "Fuses broken disulfide links instantly." },
          { label: "2. NUTRIENT SHIELD", productId: "snail-silk-scalp-oil", description: "Provides nourishing lipid shield." },
          { label: "3. SECTIONING COMB", productId: "h-salon-comb", description: "Aide to spread the treatment scalpwide." }
        ]
      };
    case "lip-gloss":
      return {
        title: "Cuticle Glassing Duo & Repair Set",
        subtitle: "Instant Humidity Defense Combo",
        description: "Locks down rough cuticles to create a beautifully smooth, glassy drape.",
        discountPct: 15,
        steps: [
          { label: "1. FIBER BALM", productId: "eyeliner", description: "Fills missing cortical keratin." },
          { label: "2. RESURFACING SHINE", productId: "lip-gloss", description: "Binds split ends together perfectly." },
          { label: "3. SOOTHING WRAP", productId: "snail-silk-scalp-mask", description: "Locks down cuticle layers safely." }
        ]
      };
    default:
      return {
        title: "The Ultimate Apothecary Ritual",
        subtitle: "Universal Salon Glow Masters",
        description: "Our signature, world-renowned glow essentials designed to support any skin type.",
        discountPct: 15,
        steps: [
          { label: "1. POLISHING TOOL", productId: "h-salon-comb", description: "Stimulates scalp cell blood circulation." },
          { label: "2. DEEP TREATMENT OIL", productId: "snail-silk-scalp-oil", description: "Nourishes fibers and blocks dryness." },
          { label: "3. SIGNATURE POUCH", productId: "makeup-pouch", description: "Soft lined storage travel bag." }
        ]
      };
  }
};

export default function BundlePackSection({ product, onAddToCart, onSelectProduct }: BundlePackSectionProps) {
  const { state } = useSharedState();
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
      className="max-w-7xl mx-auto my-6 px-4 md:px-12 select-none"
    >
      <div className="bg-[#FAF9F6] border border-brand-black/10 rounded-2xl p-3 md:p-8 relative overflow-hidden text-left shadow-xs transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        
        {/* Brand Tag with themed colors */}
        <div className="hidden sm:flex absolute top-0 right-0 bg-brand-black text-[#82D8C5] text-[8.5px] font-sans font-black uppercase tracking-[0.2em] px-4 py-2.5 rounded-bl-xl border-l border-b border-brand-black/10 items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#82D8C5]" /> ROUTINE BUNDLE · SAVE {bundleDef.discountPct}%
        </div>

        {/* Header Block under logo theme */}
        <div className="max-w-xl text-left mb-3.5 md:mb-6">
          <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-[#82D8C5] font-black">RECOMMENDED CLINICAL RITUAL</span>
          <h2 className="font-sans text-[15px] md:text-[23px] font-black text-brand-black mt-0.5 tracking-tight leading-tight uppercase">
            {bundleDef.title}
          </h2>
          <p className="hidden md:block text-[11px] text-gray-400 font-sans mt-1 leading-snug">
            {bundleDef.subtitle} · Standard Synergistic Program.
          </p>
        </div>

        {/* MAIN COMPACT GRID VIEW -- UNIFIED & HIGH-CONTRAST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Steps column (left 8 grid spans) */}
          <div className="lg:col-span-8 flex flex-col justify-center gap-2 overflow-hidden">
            
            {/* DESKTOP VIEW: Grid of vertical cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-3 w-full items-stretch">
              {stepProducts.map((step, idx) => {
                const isActive = selectedPreviewId === step.productId;
                return (
                  <motion.div
                    key={step.productId + "-desktop"}
                    whileHover={{ 
                      scale: 1.03, 
                      borderColor: "#82D8C5",
                      boxShadow: "0 8px 24px -4px rgba(130,216,197,0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedPreviewId(step.productId === selectedPreviewId ? null : step.productId);
                    }}
                    className={`flex flex-col bg-white border p-3.5 rounded-xl text-center cursor-pointer transition-all duration-300 relative justify-between gap-2.5 h-[220px] w-full ${
                      isActive 
                        ? "border-[#82D8C5] ring-2 ring-[#82D8C5]/10 bg-[#82D8C5]/5" 
                        : "border-brand-black/5 hover:border-brand-black/15"
                    }`}
                  >
                    <div className="flex flex-col items-stretch justify-between w-full h-full">
                      {/* Brand Label & Price */}
                      <div className="flex justify-between items-center w-full mb-2 shrink-0">
                        <span className="bg-brand-black text-[#82D8C5] text-[8.5px] font-sans font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                          {step.label.split(":")[0]}
                        </span>
                        <span className="text-[10px] font-mono text-brand-black/60 font-semibold">
                          {formatPrice(step.product.price * discountMultiplier, state.currency)}
                        </span>
                      </div>

                      {/* Product image - beautifully centered */}
                      <div className="w-[72px] h-[72px] rounded-full shrink-0 mx-auto bg-[#FAF9F6] border border-brand-black/5 flex items-center justify-center p-1 overflow-hidden shadow-xs hover:rotate-3 transition-transform">
                        <img 
                          src={step.product.images[0]} 
                          alt={step.product.name}
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Text info - centered */}
                      <div className="text-center w-full mt-1.5">
                        <h4 className="font-sans text-[11px] font-black leading-tight text-brand-black uppercase tracking-tight line-clamp-1">
                          {step.product.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-sans mt-0.5 leading-tight line-clamp-1">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop-only card footer label bar */}
                    <div className="flex border-t border-brand-black/5 pt-1.5 justify-between items-center text-[9px] text-brand-black/30 font-sans font-extrabold w-full">
                      <span className="tracking-widest uppercase">VIEW LAYER</span>
                      <ArrowRight className="w-2.5 h-2.5 text-brand-black/20" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* MOBILE VIEW: Compact horizontal product list cards stacked vertically */}
            <div className="flex flex-col md:hidden gap-2 w-full">
              {stepProducts.map((step, idx) => {
                const isActive = selectedPreviewId === step.productId;
                return (
                  <motion.div
                    key={step.productId + "-mobile"}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedPreviewId(step.productId === selectedPreviewId ? null : step.productId);
                    }}
                    className={`flex flex-row items-center bg-white border p-2 rounded-xl cursor-pointer transition-all duration-300 relative justify-start gap-2.5 h-[62px] w-full ${
                      isActive 
                        ? "border-[#82D8C5] bg-[#82D8C5]/5" 
                        : "border-brand-black/5"
                    }`}
                  >
                    {/* Circle Image on left */}
                    <div className="w-[40px] h-[40px] rounded-full shrink-0 bg-[#FAF9F6] border border-brand-black/5 flex items-center justify-center p-0.5 overflow-hidden">
                      <img 
                        src={step.product.images[0]} 
                        alt={step.product.name}
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content on right */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-1">
                        <span className="bg-brand-black text-[#82D8C5] text-[6.5px] font-sans font-black uppercase tracking-wider px-1 py-0.2 rounded-xs">
                          {step.label.split(":")[0]}
                        </span>
                      </div>
                      <h4 className="font-sans text-[10.5px] font-bold leading-tight text-brand-black uppercase tracking-tight truncate">
                        {step.product.name}
                      </h4>
                      <p className="text-[9px] text-gray-400 font-sans truncate leading-none mt-0.5">
                        {step.description}
                      </p>
                    </div>

                    {/* Price on far right */}
                    <div className="text-right shrink-0 pr-1">
                      <span className="text-[10px] font-mono font-bold text-brand-black">
                        {formatPrice(step.product.price * discountMultiplier, state.currency)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
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
                    className="bg-brand-black/5 border border-brand-black/10 rounded-xl p-3 text-[11px] text-gray-500 font-sans mt-2"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-brand-black uppercase text-[9px] tracking-wider">{step.label} DETAILS</span>
                      <button 
                        onClick={() => onSelectProduct(step.product.id)}
                        className="text-[9.5px] text-brand-black font-extrabold underline hover:text-[#82D8C5] transition-colors"
                      >
                        Learn More Details →
                      </button>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      {step.description} {step.product.description}
                    </p>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

          </div>

          {/* Checkout block (right 4 grid spans) */}
          <div className="lg:col-span-4 bg-white border border-brand-black/10 rounded-xl p-5 flex flex-col justify-between shadow-xs text-left relative transition-all">
            
            <div>
              {/* Header inside checkout box */}
              <div className="flex justify-between items-start border-b border-brand-black/5 pb-3 mb-4">
                <div>
                  <h3 className="font-serif text-[14px] font-black text-brand-black uppercase tracking-tight">Complete Ritual</h3>
                  <span className="text-[10px] text-gray-400 font-sans mt-0.5 block">{stepProducts.length} Premium Formulas combined</span>
                </div>
                <span className="bg-[#82D8C5]/10 text-brand-black text-[9px] font-sans font-extrabold px-2 py-0.5 rounded-full border border-[#82D8C5]/30 shrink-0">
                  -{bundleDef.discountPct}% SAVE
                </span>
              </div>

              {/* Items pricing list */}
              <div className="space-y-1.5 mb-4">
                {stepProducts.map((step) => (
                  <div key={step.productId} className="flex justify-between items-center text-[11px] font-sans text-gray-500">
                    <span className="truncate pr-3 cursor-pointer hover:text-brand-black" onClick={() => onSelectProduct(step.product.id)}>
                      • {step.product.name}
                    </span>
                    <span className="font-bold text-gray-400 whitespace-nowrap">{formatPrice(step.product.price, state.currency)}</span>
                  </div>
                ))}
              </div>

              {/* Calculation totals */}
              <div className="border-t border-brand-black/5 pt-3 space-y-1 mb-4 font-sans text-[11px]">
                <div className="flex justify-between text-gray-400">
                  <span>Regular Total Value:</span>
                  <span className="line-through">{formatPrice(originalTotal, state.currency)}</span>
                </div>
                <div className="flex justify-between text-brand-black font-extrabold">
                  <span>Combo Benefits:</span>
                  <span className="text-red-700">-{formatPrice(totalSavings, state.currency)}</span>
                </div>
                
                {/* Visual price tag - theme matching */}
                <div className="flex justify-between items-end pt-2 text-brand-black border-t border-dashed border-brand-black/5 mt-2">
                  <div className="text-left">
                    <span className="text-[7.5px] font-sans uppercase tracking-[0.2em] text-gray-400 font-black block leading-none mb-1">RITUAL OFFER PRICE</span>
                    <span className="font-serif italic font-semibold leading-none text-brand-black text-[11px] leading-none">Instant Bundle Pricing</span>
                  </div>
                  <span className="font-sans font-black text-[21px] tracking-tight leading-none text-brand-black">
                    {formatPrice(bundleTotal, state.currency)}
                  </span>
                </div>
              </div>

              {/* Minimalist safety line */}
              <div className="bg-[#FAF9F6] border border-brand-black/5 rounded-lg p-2 text-[9.5px] text-gray-400 leading-tight mb-4 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#82D8C5] shrink-0" />
                <span>Approved regimen. Includes free UK shipping.</span>
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
                    className="absolute -top-11 left-0 right-0 bg-brand-black text-white text-[10px] font-sans font-bold rounded-lg py-2 px-3 text-center flex items-center justify-center gap-1.5 shadow-md border border-brand-black/10 z-15"
                  >
                    <Check className="w-3.5 h-3.5 text-[#82D8C5] stroke-[4]" /> Added Entire Ritual to Bag!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button - Elegant Solid Black turning into brand-mint on hover */}
              <button
                onClick={handleAddBundleToCart}
                disabled={isSuccessAdded}
                className={`w-full py-3 px-5 rounded-full font-sans font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isSuccessAdded 
                    ? "bg-brand-black/20 text-brand-black/30 pointer-events-none"
                    : "bg-brand-black text-white hover:bg-[#82D8C5] hover:text-brand-black hover:scale-101 hover:shadow-sm active:scale-97 select-none border border-brand-black"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {isSuccessAdded ? "Adding Pack..." : "Add Entire Ritual to Bag"}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
