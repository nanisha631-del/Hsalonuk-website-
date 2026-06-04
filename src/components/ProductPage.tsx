/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, Star, ChevronLeft, ChevronRight, Plus, Minus, Check, Heart, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export default function ProductPage({
  product,
  onBack,
  onAddToCart,
  onSelectProduct
}: ProductPageProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>("description");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Recommendations: products from different category than current
  const recommendedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Buy it with accessory item
  const crossSellProduct = PRODUCTS.find((p) => p.id === "makeup-pouch") || PRODUCTS[0];

  const toggleTab = (tabName: string) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  const handleNextImage = () => {
    setSelectedImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 md:pt-40 pb-24 px-4 md:px-12 select-none">
      {/* Breadcrumb & Back action */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.15em] text-brand-black hover:opacity-75 transition-opacity cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to collection
        </button>
        <span className="text-xs text-gray-400 font-sans tracking-wide">
          Shop all / {product.category.toUpperCase()} / {product.name.toUpperCase()}
        </span>
      </div>

      {/* Outer Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Gallery Grid Layout (Lg span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[3/4] bg-[#E0DEDA] shadow-xs overflow-hidden group">
            {product.tags && product.tags.length > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-brand-lilac text-brand-black text-[10px] font-bold py-1 px-3 uppercase tracking-wider rounded-full">
                {product.tags[0]}
              </span>
            )}
            
            <img
              src={product.images[selectedImageIdx]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Slider arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-brand-black/10 bg-white/70 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer text-brand-black"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-brand-black/10 bg-white/70 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer text-brand-black"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnails list below main display */}
          <div className="grid grid-cols-4 gap-3 mt-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIdx(i)}
                className={`aspect-[3/4] bg-[#E0DEDA] relative overflow-hidden transition-all duration-300 outline-none cursor-pointer ${
                  selectedImageIdx === i ? "ring-2 ring-brand-lilac ring-offset-2 ring-offset-brand-offwhite" : "opacity-75 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${i}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Info, controls, descriptions, accessories (Lg span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Header information */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-brand-lilac">
              {product.category.toUpperCase()} ESSENTIAL
            </span>
            <h1 className="font-serif text-[38px] md:text-[48px] font-bold leading-tight tracking-tight text-brand-black">
              {product.name.toUpperCase()}
            </h1>
            
            <div className="flex items-center gap-2 text-brand-black">
              <span className="font-sans text-[24px] font-extrabold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-sans text-[18px] text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* In-Stock Indicator */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[13px] font-sans text-emerald-700 font-semibold">
                Item is in stock and ready to ship
              </span>
            </div>
          </div>

          {/* Luxury benefits badges */}
          <div className="grid grid-cols-2 gap-4 py-4 px-5 border border-brand-black/5 bg-white/40">
            <div className="flex items-center gap-2 text-xs font-sans text-gray-700 tracking-wide">
              <Star className="w-4 h-4 text-brand-lilac fill-current" />
              Dermatologist Tested
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-gray-700 tracking-wide">
              <Sparkles className="w-4 h-4 text-brand-lilac fill-current" />
              Non-comedogenic
            </div>
          </div>

          {/* Color swatches selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-xs font-sans uppercase tracking-wider text-gray-500">
                <span>Color: <strong className="text-brand-black font-semibold">{selectedColor}</strong></span>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                      selectedColor === color.name
                        ? "border-brand-black scale-105 ring-2 ring-brand-lilac/50 ring-offset-2"
                        : "border-brand-black/10 hover:border-brand-black/30"
                    } cursor-pointer shadow-xs`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check className={`w-4 h-4 ${color.hex === "#FFFFFF" || color.hex === "#F3EDE4" ? "text-black" : "text-white"}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity stepper selection */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-sans uppercase tracking-wider text-gray-500">
              Quantity
            </span>
            <div className="flex items-center border border-brand-black/15 bg-white w-32 py-1 px-3 rounded-none">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1.5 text-gray-500 hover:text-black hover:opacity-75 cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center font-sans font-bold text-brand-black px-2 text-[15px]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1.5 text-gray-500 hover:text-black hover:opacity-75 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions: ADD TO BAG & BUY IT NOW */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onAddToCart(product, quantity, selectedColor)}
              className="w-full bg-brand-black hover:bg-brand-black/90 text-white font-sans font-bold py-4.5 text-[13px] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-98 cursor-pointer shadow-md rounded-none flex items-center justify-center gap-2"
            >
              ADD TO BAG • ${(product.price * quantity).toFixed(2)}
            </button>
            
            <button
              onClick={() => {
                onAddToCart(product, quantity, selectedColor);
                alert("Redirecting securely to test checkout gateway!");
              }}
              className="w-full bg-transparent hover:bg-brand-black/5 border border-brand-black text-brand-black font-sans font-bold py-4.5 text-[13px] uppercase tracking-[0.2em] transition-all scale-100 hover:scale-[1.01] active:scale-98 cursor-pointer rounded-none flex items-center justify-center"
            >
              BUY IT NOW
            </button>

            <button className="flex items-center justify-center gap-2 py-2.5 text-xs text-gray-400 font-sans uppercase tracking-widest hover:text-brand-black transition-colors border-t border-brand-black/5 mt-2">
              <Heart className="w-3.5 h-3.5" />
              Add to wishlist
            </button>
          </div>

          {/* Collapsible Tabs: DESCRIPTION, HOW TO USE, INGREDIENTS */}
          <div className="flex flex-col border-t border-brand-black/10 mt-4">
            
            {/* Description Tab */}
            <div className="border-b border-brand-black/10 py-4.5">
              <button
                onClick={() => toggleTab("description")}
                className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black hover:opacity-85 cursor-pointer"
              >
                <span>Description</span>
                {activeTab === "description" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <AnimatePresence initial={false}>
                {activeTab === "description" && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 text-sm text-gray-600 font-sans leading-relaxed flex flex-col gap-3">
                      <p>{product.description || "Designed with skin comfort at the priority, built for natural luminescence."}</p>
                      <p className="italic">{product.intro}</p>
                      {product.bullets && product.bullets.length > 0 && (
                        <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-2">
                          {product.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* How To Use Tab */}
            <div className="border-b border-brand-black/10 py-4.5">
              <button
                onClick={() => toggleTab("how-to-use")}
                className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black hover:opacity-85 cursor-pointer"
              >
                <span>How To Use</span>
                {activeTab === "how-to-use" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <AnimatePresence initial={false}>
                {activeTab === "how-to-use" && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 text-sm text-gray-600 font-sans leading-relaxed flex flex-col gap-2">
                      <p>1. Ensure your face is clean, dry, and balanced with serum.</p>
                      <p>2. Sweep or wipe the product directly onto desired areas needing color or highlights.</p>
                      <p>3. Tap gently with warmth of finger pads to diffuse edges perfectly into your base makeup.</p>
                      <p>4. Build color progressively for night out contrast.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ingredients Tab */}
            <div className="border-b border-brand-black/10 py-4.5">
              <button
                onClick={() => toggleTab("ingredients")}
                className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black hover:opacity-85 cursor-pointer"
              >
                <span>Ingredients</span>
                {activeTab === "ingredients" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <AnimatePresence initial={false}>
                {activeTab === "ingredients" && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 text-sm text-gray-500 font-mono tracking-tight leading-relaxed">
                      Organic Castor Seed Oil, Jojoba Esters, Synthetic Fluorphlogopite, Squalane, Tocopheryl Acetate (Vitamin E), Shea Butter Extract, Rosehip Fruit Extract, Titanium Dioxide (CI 77891), Lavender Flower Extract.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping + Returns Tab */}
            <div className="border-b border-brand-black/10 py-4.5">
              <button
                onClick={() => toggleTab("shipping")}
                className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black hover:opacity-85 cursor-pointer"
              >
                <span>Shipping & Returns</span>
                {activeTab === "shipping" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <AnimatePresence initial={false}>
                {activeTab === "shipping" && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 text-sm text-gray-600 font-sans leading-relaxed flex flex-col gap-2">
                      <p>We provide Free Shipping on all worldwide orders over $75. Economy delivery options deliver to your door within 3 to 7 working days.</p>
                      <p>Unhappy with shading? We offer completely free 30-day return policy for unused products in pristine cosmetics packaging boxes.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Buy It With Cross-Sell section */}
          {crossSellProduct && (
            <div className="mt-4 p-5 bg-[#C4B5D4]/10 border border-[#C4B5D4]/30 rounded-none flex flex-col gap-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#6B5A7F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> BUY IT WITH
              </span>
              <div className="flex gap-4 items-center">
                <img
                  src={crossSellProduct.images[0]}
                  alt={crossSellProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover' bg-[#E0DEDA] aspect-square overflow-hidden"
                />
                <div className="flex-1 flex flex-col">
                  <span className="font-serif text-[15px] font-semibold text-brand-black">
                    {crossSellProduct.name}
                  </span>
                  <span className="font-sans text-[13px] text-gray-500">
                    ${crossSellProduct.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(crossSellProduct, 1)}
                  className="bg-brand-black hover:bg-brand-black/90 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 transition-all"
                >
                  Quick Buy
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <div className="max-w-4xl mx-auto mt-28 border-t border-brand-black/10 pt-16">
        <h2 className="font-serif text-[28px] md:text-[36px] font-bold text-center tracking-tight text-brand-black mb-8 uppercase">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col border-b border-brand-black/10">
          {[
            {
              q: "Is this suitable for all skin types?",
              a: "Absolutely. Our specialized skin care cosmetics formulas are non-comedogenic, dermatologist tested for hyper-allergic breakouts, and safe for extremely sensitive cheeks, lips, or dry skin."
            },
            {
              q: "Is this product vegan and cruelty-free?",
              a: "Yes! Sustainability and compassion is our primary core principle. We use zero animal fat derivatives and pledge 100% cruelty-free formulation lines verified by third-party boards."
            },
            {
              q: "How long does it last after applying?",
              a: "When blended properly, color pigments withstand high sweat levels, and offer pristine hydration-lock durability upwards of 12 to 16 full day hours without fine-line cake flaking."
            },
            {
              q: "Can I wear this with other brand bases?",
              a: "Yes. Our light butter formulas blend as compatible layers upon liquid silicon bases, dry foundations, or organic sunblock oils nicely."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border-t border-brand-black/5 py-4">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left font-serif text-[17px] font-semibold text-brand-black/90 hover:text-brand-black cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="font-sans font-bold text-lg text-brand-lilac">
                  {activeFaq === idx ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: 10 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 }
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm font-sans text-gray-600 leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC PRESS TESTIMONIAL LOGOS SECTION */}
      <div className="max-w-6xl mx-auto mt-24 border-t border-brand-black/10 pt-16 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400">PRESS APPROVED</span>
        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-8 items-center max-w-xl mx-auto opacity-55">
          <div className="font-serif text-[18px] md:text-[22px] italic tracking-widest font-black text-brand-black select-none">
            BYRDIE
          </div>
          <div className="font-serif text-[20px] md:text-[24px] tracking-wider font-extrabold text-brand-black select-none">
            allure
          </div>
          <div className="font-serif text-[18px] md:text-[22px] tracking-widest font-semibold text-brand-black select-none">
            GLAMOUR
          </div>
        </div>
        <p className="mt-8 font-serif text-[18px] md:text-[22px] italic text-gray-500 max-w-2xl mx-auto leading-relaxed">
          "An effortless approach to modern makeup—skin-first, wearable, and cool. Exactly what Gen Z wants right now."
        </p>
      </div>

      {/* RECOMMENDATIONS CAROUSEL ROW */}
      <div className="max-w-7xl mx-auto mt-28 border-t border-brand-black/10 pt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400">YOU MAY ALSO LIKE</span>
            <h2 className="font-serif text-[28px] md:text-[36px] font-bold tracking-tight text-brand-black mt-1">
              Curated Duos
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p.id);
                setSelectedImageIdx(0);
                setSelectedColor(p.colors && p.colors.length > 0 ? p.colors[0].name : undefined);
                setQuantity(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="aspect-square bg-[#E0DEDA] overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-serif text-[15px] font-medium text-brand-black group-hover:underline">
                  {p.name}
                </h3>
                <span className="font-sans text-[13px] text-gray-500 font-semibold">
                  ${p.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
