/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash, ShoppingBag, ArrowRight, Sparkles, Check, Gift } from "lucide-react";
import { CartItem, Product } from "../types";
import { createShopifyCheckoutRedirect } from "../lib/shopify";
import { PRODUCTS } from "../data";
import LuxuryButton from "./LuxuryButton";
import { useSharedState } from "../useSharedState";
import { getShopifySettings } from "../shopifySettings";

// Defined premium bundle products matching requirements precisely
const SERENE_DUO_BUNDLE: Product = {
  id: "serene-duo-bundle",
  name: "Serene Scalp Hydration Duo",
  subtitle: "Soothing Treatment & Masque Balance",
  price: 79.00,
  originalPrice: 100.00,
  rating: 5,
  images: ["/snail silk face serum.webp"],
  category: "scalp-care",
  description: "Duo set: calming serum and intensive masque for scalp care.",
  intro: "A calming routine bundle for roots",
  bullets: ["Contains Oribe Serene Treatment and Masque", "Saves $21.00 instantly compared to retail pricing"],
  tags: ["BESTSELLER", "BUNDLE OFFER"]
};

const GOLD_LUST_DUO_BUNDLE: Product = {
  id: "gold-lust-oil-duo",
  name: "Luxurious Locks & Glow Kit",
  subtitle: "Oribe Gold Lust & Kérastase Combo",
  price: 80.00,
  originalPrice: 101.00,
  rating: 5,
  images: ["/snail silk scalp oil.webp"],
  category: "hair-oils",
  description: "Gold Lust oil combined with Elixir Ultime oil for maximum brilliance.",
  intro: "High-gloss liquid gold hair combo pack",
  bullets: ["Contains Oribe Gold Lust Oil and Kérastase Elixir Ultime", "Saves $21.00 instantly compared to retail pricing"],
  tags: ["BESTSELLER", "BUNDLE OFFER"]
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, color: string | undefined, qty: number) => void;
  onRemoveItem: (id: string, color: string | undefined) => void;
}

// Particle sub-component for high-performance CSS confetti poppers
const ConfettiItem = ({ index, side }: { index: number; side: "left" | "right"; key?: string }) => {
  const delay = (index * 0.08).toFixed(2); // Snappy sequence
  
  // High-visibility bright and shiny festive party colors: Gold, deep pink, cyan, lime green, orange, indigo, yellow, silver-white
  const colors = ["#FFD700", "#FF1493", "#00FFFF", "#39FF14", "#FF4500", "#9D00FF", "#FFFF00", "#FFFFFF"];
  const color = colors[index % colors.length];
  
  // Mixed rectangular and square shapes for hyper-realistic shredded particle effect
  const isRect = index % 2 === 0;
  const width = isRect ? (index % 3 === 0 ? 12 : 8) : (index % 3 === 0 ? 10 : 7);
  const height = isRect ? (index % 3 === 0 ? 6 : 4) : (index % 3 === 0 ? 10 : 7);
  const rotationSkew = (index * 22) % 120;
  
  // Custom travel properties mapped to CSS custom variables
  const xDist = 60 + (index * 8) % 190; // 60px - 250px lateral span
  const yUp = -(180 + (index * 11) % 250); // -180px to -430px upward span

  const style = {
    "--x-dist": `${xDist}px`,
    "--y-up": `${yUp}px`,
    animationDelay: `${delay}s`,
    backgroundColor: color,
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "0px", // Real square and rectangular shape cuts as requested!
    left: side === "left" ? "2px" : "auto",
    right: side === "right" ? "2px" : "auto",
    transform: `rotate(${rotationSkew}deg)`,
    animationDuration: "3.0s",
  } as React.CSSProperties;

  return (
    <div 
      className={`absolute bottom-36 opacity-0 pointer-events-none z-50 ${
        side === "left" ? "animate-pop-left" : "animate-pop-right"
      }`}
      style={style}
    />
  );
};

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const settings = getShopifySettings();
  const { handleAddToCart } = useSharedState();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  
  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [isPromoExpanded, setIsPromoExpanded] = useState(false);

  // Celebration state managers
  const [confettiActive, setConfettiActive] = useState<"discount" | "bundle" | null>(null);
  const [activeCirclePop, setActiveCirclePop] = useState<{ text: string; show: boolean } | null>(null);

  // Master celebration trigger
  const triggerCelebration = (type: "discount" | "bundle") => {
    // 1. Activate CSS particle confetti emitter for exactly 3 seconds
    setConfettiActive(type);
    setTimeout(() => {
      setConfettiActive(null);
    }, 3000);

    // 2. Activate circle floating popup badge for exactly 2 seconds, then gracefully zoom out/fade out
    const textMsg = type === "discount" 
      ? "You Claimed Your 10% Discount!"
      : "You Added Perfect Bundle!";
    
    setActiveCirclePop({ text: textMsg, show: true });
    setTimeout(() => {
      setActiveCirclePop({ text: textMsg, show: false });
    }, 2000);
  };

  const handleApplyPromo = () => {
    setPromoError(null);
    setPromoSuccess(null);
    if (!promoCode.trim()) {
      setPromoError("Please enter a code");
      return;
    }
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === "FIRST10") {
      setAppliedPromo("FIRST10");
      setPromoSuccess("Discount code 'First10' applied! 10% saved.");
      setPromoCode("");
      triggerCelebration("discount");
    } else {
      setPromoError("Invalid discount code. Try 'First10'.");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess(null);
    setPromoError(null);
  };

  const handleCheckout = async () => {
    setIsRedirecting(true);
    setCheckoutError(null);
    try {
      const checkoutUrl = await createShopifyCheckoutRedirect(cartItems, PRODUCTS);
      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.error("Shopify Checkout Error:", err);
      setCheckoutError(err.message || "Failed to start checkout. Ensure titles match Shopify.");
      setIsRedirecting(false);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedPromo ? subtotal * 0.10 : 0;
  const finalTotal = subtotal - discountAmount;

  const freeShippingThreshold = 75;
  const deliveryCostMessage =
    subtotal >= freeShippingThreshold
      ? "You've earned FREE shipping!"
      : `Spend $${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE shipping.`;

  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Check if bundles are already inside the shopping basket to avoid duplicate offerings
  const isSereneDuoInCart = cartItems.some((item) => item.product.id === "serene-duo-bundle");
  const isGoldLustDuoInCart = cartItems.some((item) => item.product.id === "gold-lust-oil-duo");

  const handleAddBundle = (bundle: Product) => {
    handleAddToCart(bundle, 1, undefined);
    triggerCelebration("bundle");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/45 backdrop-blur-xs z-50 cursor-pointer"
            onClick={onClose}
            id="cart-backdrop"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-offwhite shadow-2xl z-50 flex flex-col h-full overflow-hidden"
            id="cart-drawer-container"
          >
            {/* Promo Heading Banner */}
            <div className="bg-brand-black text-white text-center py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium px-4 select-none">
              ✨ New customers save 10% with code <span className="text-brand-lilac font-semibold">FIRST10</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-black/5 select-none bg-brand-offwhite">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-black" />
                <h2 className="font-serif text-[20px] font-semibold text-brand-black uppercase tracking-tight">
                  Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-3 hover:bg-brand-black/5 rounded-full transition-colors font-sans text-brand-black cursor-pointer flex items-center justify-center gap-1 text-[11px] tracking-widest uppercase font-bold"
              >
                Close <X className="w-4 h-4" />
              </button>
            </div>

            {/* Float-locked Congrats popups in middle of cart drawer container */}
            <AnimatePresence>
              {activeCirclePop && activeCirclePop.show && (
                <motion.div
                  initial={{ scale: 0.3, opacity: 0, rotate: -35, y: 50 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    rotate: 0,
                    y: 0,
                    transition: { type: "spring", stiffness: 200, damping: 16 }
                  }}
                  exit={{ 
                    scale: 0.3, 
                    opacity: 0, 
                    rotate: 35,
                    y: -40,
                    transition: { duration: 0.4, ease: "easeIn" }
                  }}
                  className="absolute inset-x-4 top-1/4 mx-auto z-50 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-48 h-48 rounded-full bg-brand-black text-brand-lilac shadow-2xl flex flex-col items-center justify-center p-5 text-center border-[3px] border-brand-lilac relative overflow-hidden backdrop-blur-md">
                    {/* Shimmer background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-lilac/5 to-transparent pointer-events-none" />
                    
                    {/* High-glam diagonal shine sweep overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-shine-sweep pointer-events-none z-10" />

                    <Sparkles className="w-5 h-5 text-brand-lilac animate-pulse mb-1 relative z-20" />
                    <p className="font-serif text-[15px] font-black leading-tight uppercase tracking-widest text-[#82D8C5] relative z-20">
                      {activeCirclePop.text.includes("Discount") ? "10% Discount" : "Perfect Bundle"}
                    </p>
                    <p className="font-sans text-[10px] font-extrabold text-white/90 leading-snug mt-1.5 uppercase tracking-widest relative z-20">
                      {activeCirclePop.text.includes("Discount") ? "Claimed Instantly!" : "Added to Bag!"}
                    </p>
                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand-lilac animate-ping relative z-20" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confetti party poppers falling along left & right visual borders */}
            {confettiActive && (
              <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden" id="confetti-overlay-container">
                {Array.from({ length: 24 }).map((_, i) => (
                  <ConfettiItem key={`left-emitter-${i}`} index={i} side="left" />
                ))}
                {Array.from({ length: 24 }).map((_, i) => (
                  <ConfettiItem key={`right-emitter-${i}`} index={i} side="right" />
                ))}
              </div>
            )}

            {/* Shipping Goal Progress */}
            <div className="p-4 bg-brand-lilac/10 border-b border-brand-black/5 flex flex-col gap-1.5 select-none">
              <span className="font-sans text-[11px] font-bold text-brand-black uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-brand-lilac" />
                {deliveryCostMessage}
              </span>
              <div className="w-full bg-brand-black/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-lilac h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Scrollable Products list container */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-52 text-center gap-3 py-6 select-none">
                  <ShoppingBag className="w-12 h-12 text-[#D8D3CC] stroke-[1px]" />
                  <p className="font-serif text-[18px] text-gray-500 italic max-w-xs">
                    Your bag is empty. Let's find your radiant glow.
                  </p>
                  <LuxuryButton
                    onClick={onClose}
                    className="mt-1 bg-brand-black text-white text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 font-sans font-black hover:bg-brand-black/90 active:scale-95 transition-all"
                  >
                    CONTINUE SHOPPING
                  </LuxuryButton>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor || "none"}`}
                      className="flex gap-3 border-b border-brand-black/5 pb-4 last:border-0"
                    >
                      {/* Item Image */}
                      <div className="w-16 h-16 bg-[#E0DEDA] aspect-square overflow-hidden flex-shrink-0 rounded-md">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title and delete */}
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif text-[14px] md:text-[15px] font-semibold text-brand-black leading-tight uppercase tracking-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Selected Color / Detail variant */}
                          {item.selectedColor && (
                            <p className="text-[10px] text-gray-500 mt-0.5 tracking-wide font-sans">
                              Color: {item.selectedColor}
                            </p>
                          )}
                        </div>

                        {/* Quantity & price controls */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center border border-brand-black/10 rounded-full py-0.5 px-2 bg-white">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.selectedColor,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:opacity-75 cursor-pointer text-brand-black"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-sans text-[11px] font-bold text-brand-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:opacity-75 cursor-pointer text-brand-black"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-sans text-[13px] font-bold text-brand-black select-none">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RECOMMENDED BUNDLE OFFERS SUBSECTION */}
              <div className="border-t border-brand-black/5 pt-4 mt-2 select-none">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-brand-lilac animate-pulse" />
                  <h3 className="font-serif text-[14px] font-bold tracking-wider text-brand-black uppercase">
                    SAVE WITH BESTSELLER BUNDLES (Saves 20%+)
                  </h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* Bundle 1 Offer */}
                  {!isSereneDuoInCart && (
                    <div className="bg-white border border-brand-black/5 p-3 rounded-lg flex items-center gap-3 hover:shadow-sm transition-all">
                      <div className="w-14 h-14 bg-[#E0DEDA] rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={SERENE_DUO_BUNDLE.images[0]} 
                          alt={SERENE_DUO_BUNDLE.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-[12.5px] font-bold text-brand-black uppercase truncate">
                          {SERENE_DUO_BUNDLE.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 font-sans truncate">
                          Serene Treatment + Hydrating Masque
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-sans text-[12px] font-extrabold text-brand-black">
                            ${SERENE_DUO_BUNDLE.price.toFixed(2)}
                          </span>
                          <span className="font-sans text-[10px] text-gray-400 line-through">
                            ${SERENE_DUO_BUNDLE.originalPrice?.toFixed(2)}
                          </span>
                          <span className="text-[9px] font-bold text-[#42B870] font-sans bg-green-50 px-1 py-0.5 rounded-sm">
                            SAVE 21%
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddBundle(SERENE_DUO_BUNDLE)}
                        className="bg-brand-black hover:bg-[#82D8C5] hover:text-brand-black text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  )}

                  {/* Bundle 2 Offer */}
                  {!isGoldLustDuoInCart && (
                    <div className="bg-white border border-brand-black/5 p-3 rounded-lg flex items-center gap-3 hover:shadow-sm transition-all">
                      <div className="w-14 h-14 bg-[#E0DEDA] rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={GOLD_LUST_DUO_BUNDLE.images[0]} 
                          alt={GOLD_LUST_DUO_BUNDLE.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-[12.5px] font-bold text-brand-black uppercase truncate">
                          {GOLD_LUST_DUO_BUNDLE.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 font-sans truncate">
                          Gold Lust Oil + Kérastase Shine Oil
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-sans text-[12px] font-extrabold text-brand-black">
                            ${GOLD_LUST_DUO_BUNDLE.price.toFixed(2)}
                          </span>
                          <span className="font-sans text-[10px] text-gray-400 line-through">
                            ${GOLD_LUST_DUO_BUNDLE.originalPrice?.toFixed(2)}
                          </span>
                          <span className="text-[9px] font-bold text-[#42B870] font-sans bg-green-50 px-1 py-0.5 rounded-sm">
                            SAVE 20%
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddBundle(GOLD_LUST_DUO_BUNDLE)}
                        className="bg-brand-black hover:bg-[#82D8C5] hover:text-brand-black text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  )}

                  {isSereneDuoInCart && isGoldLustDuoInCart && (
                    <p className="text-[10px] font-sans text-gray-400 text-center py-1 select-none">
                      🎉 Wow, you unlocked all our special bestseller bundles!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky bottom panel summary - height optimized */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-brand-black/5 flex flex-col gap-3.5 select-none" id="sticky-bottom-summary">
                {/* Collapsible Promo Code Container */}
                <div className="border-b border-brand-black/5 pb-2.5">
                  {!isPromoExpanded ? (
                    <button 
                      onClick={() => setIsPromoExpanded(true)}
                      className="text-[10px] uppercase tracking-widest text-[#4DB6AC] hover:text-brand-black font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Have a discount promo code? Apply here +</span>
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1.5 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">
                          Promo code (Try: <span className="text-brand-lilac">First10</span>)
                        </label>
                        <button 
                          onClick={() => setIsPromoExpanded(false)}
                          className="text-[9px] text-gray-400 hover:text-brand-black uppercase font-bold"
                        >
                          Close ×
                        </button>
                      </div>
                      <div className="flex gap-1.5 mt-0.5">
                        <input
                          type="text"
                          placeholder="CODE (e.g. First10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-brand-offwhite text-[11px] text-brand-black placeholder-gray-400 border border-brand-black/10 px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#82D8C5] uppercase font-semibold"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="bg-brand-black hover:bg-brand-black/90 text-white text-[10px] tracking-widest uppercase px-3.5 py-1.5 active:scale-95 transition-all font-black"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-red-500 text-[9px] mt-0.5 font-sans font-medium">{promoError}</p>
                      )}
                      {promoSuccess && (
                        <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-[10px] px-2 py-1.5 rounded border border-emerald-100/30 mt-1 font-sans">
                          <span className="font-semibold">{promoSuccess}</span>
                          <button onClick={handleRemovePromo} className="text-red-800 hover:underline text-[9px] font-black uppercase ml-2 select-none">Remove</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[12.5px] text-gray-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)} USD</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between items-center text-[12.5px] text-green-600 font-semibold">
                      <span>Discount (10% with {appliedPromo})</span>
                      <span>-${discountAmount.toFixed(2)} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-brand-black/5 pt-1.5 mt-0.5">
                    <span className="font-serif text-[16px] text-brand-black font-semibold">
                      Total
                    </span>
                    <span className="font-sans text-[18px] font-extrabold text-brand-black">
                      ${finalTotal.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                    Shipping and taxes calculated at checkout
                  </p>

                  {checkoutError && (
                    <div className="p-2.5 bg-red-50 text-red-700 text-[11px] rounded border border-red-150 font-sans leading-relaxed text-center">
                      {checkoutError}
                    </div>
                  )}

                  <LuxuryButton
                    id="checkout-trigger"
                    onClick={handleCheckout}
                    disabled={isRedirecting}
                    className={`w-full bg-brand-black hover:bg-brand-black/95 text-[#82D8C5] py-3 text-[11px] font-black uppercase tracking-[0.2em] hover:opacity-95 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-full ${
                      isRedirecting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isRedirecting ? "Redirecting to checkout..." : "CHECKOUT NOW"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </LuxuryButton>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
