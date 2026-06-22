/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { Plus, ChevronLeft, ChevronRight, ShoppingBag, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";
import AnimatedUnderline from "./AnimatedUnderline";
import { useSharedState, formatPrice } from "../useSharedState";

interface ShopTheLookProps {
  onSelectProduct: (id: string) => void;
  onAddToCart: (p: Product, qty: number) => void;
}

interface Hotspot {
  id: string;
  name: string;
  price: number;
  productId: string;
  x: number; // percentage from left
  y: number; // percentage from top
  placement: "top" | "bottom" | "left" | "right";
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "h1",
    name: "H Salon Signature Styling Cap",
    price: 35.00,
    productId: "h-salon-cap",
    x: 48,
    y: 18,
    placement: "bottom"
  },
  {
    id: "h2",
    name: "H Salon Luxury Texture Comb",
    price: 28.00,
    productId: "h-salon-comb",
    x: 62,
    y: 65,
    placement: "left"
  },
  {
    id: "h3",
    name: "Oribe Serene Scalp Treatment",
    price: 48.00,
    productId: "snail-silk-serum",
    x: 32,
    y: 55,
    placement: "right"
  }
];

export default function ShopTheLook({ onSelectProduct, onAddToCart }: ShopTheLookProps) {
  const { state } = useSharedState();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const settings = getShopifySettings();

  const title = settings.look_title || "Shop The Look";
  const tagline = settings.look_tagline || "TAP TO DISCOVER";
  const mainImage = "/shop the look image frame.jpeg";

  // Products from our list to show in this carousel
  const lookProducts = PRODUCTS.filter((p) =>
    ["h-salon-cap", "snail-silk-serum", "h-salon-comb"].includes(p.id)
  );

  // Re-order lookProducts to be exactly [Cap, Serum, Comb] to align perfectly with the spatial layout
  const orderedLookProducts = [
    lookProducts.find(p => p.id === "h-salon-cap"),
    lookProducts.find(p => p.id === "snail-silk-serum"),
    lookProducts.find(p => p.id === "h-salon-comb"),
  ].filter(Boolean) as Product[];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleHotspotActivate = (productId: string | null) => {
    setActiveProductId(productId);
    if (productId) {
      const card = cardRefs.current[productId];
      if (card && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardLeft = card.offsetLeft;
        const containerWidth = container.clientWidth;
        const cardWidth = card.clientWidth;
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <section id="shop-the-look" className="bg-brand-offwhite w-full py-10 sm:py-14 px-4 md:px-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Title row */}
        <div className="flex justify-between items-end border-b border-brand-black/5 pb-3">
          <div>
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400 font-bold">
              {tagline}
            </span>
            <h2 className="font-serif text-[28px] md:text-[38px] font-bold tracking-tight text-brand-black uppercase leading-none">
              {(() => {
                const words = title.trim().split(" ");
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
          </div>
          
          {/* Controls for the slider */}
          <div className="flex gap-2.5">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-brand-black/10 hover:border-brand-black flex items-center justify-center transition-colors cursor-pointer text-brand-black"
              aria-label="Previous Products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-brand-black/10 hover:border-brand-black flex items-center justify-center transition-colors cursor-pointer text-brand-black"
              aria-label="Next Products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Hotspot Image (50% area) */}
          <div className="lg:col-span-6 relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] bg-brand-nude/15 overflow-hidden shadow-md rounded-[24px]">
            <ScrollZoomImage
              src={mainImage}
              alt="Model visual look with Styling Cap, Comb and Serum"
            />
            
            {/* Hotspot dots */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeProductId === spot.productId;
              const matchingProduct = PRODUCTS.find(prod => prod.id === spot.productId);
              
              return (
                <div
                  key={spot.id}
                  className="absolute z-20"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onMouseEnter={() => handleHotspotActivate(spot.productId)}
                  onMouseLeave={() => setActiveProductId(null)}
                >
                  {/* Plus/Cross Trigger Button */}
                  <button
                    onClick={() => handleHotspotActivate(isActive ? null : spot.productId)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-305 ${
                      isActive 
                        ? "bg-[#82D8C5] text-brand-black scale-110 rotate-45" 
                        : "bg-white/95 text-brand-black hover:scale-110 shadow-md"
                    } shadow-lg cursor-pointer focus:outline-none`}
                    aria-label={`Show ${spot.name}`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
                  </button>

                  {/* Tooltip Popup: Capsule/Rectangular, beautiful curved radius with product small image */}
                  <AnimatePresence>
                    {isActive && matchingProduct && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.93, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`absolute z-30 bg-white/95 backdrop-blur-sm text-brand-black shadow-xl border border-brand-black/5 flex flex-col rounded-xl sm:rounded-2xl
                          w-[160px] sm:w-[250px] 
                          p-2 sm:p-3.5 
                          gap-2 sm:gap-3 
                          ${spot.id === "h1" ? "sm:bottom-10 sm:-left-24 sm:top-auto sm:right-auto top-9 -left-[64px]" :
                            spot.id === "h2" ? "sm:right-10 sm:-top-12 sm:left-auto sm:bottom-auto bottom-9 -left-[112px]" :
                            "sm:left-10 sm:-top-12 sm:right-auto sm:bottom-auto top-9 -left-[20px]"}`}
                      >
                        <div className="flex gap-2 sm:gap-3 items-center">
                          {/* Cute product image */}
                          <img
                            src={matchingProduct.images[0]}
                            alt={matchingProduct.name}
                            className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover border border-black/5 shrink-0 bg-brand-offwhite"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-widest text-[#82D8C5] uppercase">
                              FEATURED LOOK
                            </span>
                            <h4 className="font-serif text-[10.5px] sm:text-[13px] font-extrabold text-brand-black leading-tight truncate sm:whitespace-normal sm:line-clamp-2">
                              {matchingProduct.name}
                            </h4>
                            <span className="font-sans text-[9.5px] sm:text-[11px] font-semibold text-gray-500">
                              {formatPrice(matchingProduct.price, state.currency)}
                            </span>
                          </div>
                        </div>

                        {/* Action triggers */}
                        <div className="grid grid-cols-2 gap-1 border-t border-brand-black/5 pt-1.5 sm:pt-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProduct(spot.productId);
                            }}
                            className="text-[8.5px] sm:text-[10px] uppercase font-bold text-left hover:text-brand-lilac flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                          >
                            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(matchingProduct, 1);
                              setActiveProductId(null);
                            }}
                            className="text-[8.5px] sm:text-[10px] uppercase font-mono font-bold text-right text-[#82D8C5] hover:text-[#5fc0aa] whitespace-nowrap cursor-pointer"
                          >
                            + Quick Add
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Horizontally scrollable product row */}
          <div className="lg:col-span-6 overflow-hidden h-full">
            <div
              ref={scrollContainerRef}
              className="flex gap-5 overflow-x-auto select-none py-2 px-1 no-scrollbar scroll-smooth w-full"
            >
              {orderedLookProducts.map((p) => {
                const isActive = activeProductId === p.id;
                
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      cardRefs.current[p.id] = el;
                    }}
                    onMouseEnter={() => setActiveProductId(p.id)}
                    onMouseLeave={() => setActiveProductId(null)}
                    className={`w-[220px] sm:w-[255px] bg-white border rounded-[16px] overflow-hidden flex-shrink-0 flex flex-col justify-between group transition-all duration-300 ${
                      isActive 
                        ? "border-[#82D8C5] shadow-lg" 
                        : "border-[#D8D3CC]/60 shadow-xs"
                    }`}
                  >
                    <div
                      onClick={() => onSelectProduct(p.id)}
                      className="cursor-pointer"
                    >
                      <div className="aspect-[4/3] bg-brand-offwhite relative overflow-hidden">
                        <ScrollZoomImage
                          src={p.images[0]}
                          alt={p.name}
                        />
                        {p.tags?.includes("NEW") && (
                          <span className="absolute top-3 left-3 bg-brand-lilac text-white font-sans text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex flex-col gap-1 items-start">
                        <span className="text-[8px] font-sans font-bold tracking-widest text-[#82D8C5] uppercase">
                          {p.id === "h-salon-cap" ? "STYLING ACCESSORY" : p.id === "h-salon-comb" ? "SCALP MASSAGE" : "ORGANIC TREATMENT"}
                        </span>
                        <h3 className="font-serif text-[14px] sm:text-[15px] font-bold text-brand-black line-clamp-1 group-hover:underline">
                          {p.name}
                        </h3>
                        <p className="font-sans text-[12px] sm:text-[13px] text-gray-500 font-bold">
                          {formatPrice(p.price, state.currency)}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <button
                        onClick={() => onAddToCart(p, 1)}
                        className={`w-full font-sans text-[10px] font-bold py-2.5 uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                          isActive 
                            ? "bg-[#82D8C5] hover:bg-[#5fc0aa] text-brand-black" 
                            : "bg-brand-black hover:bg-brand-black/90 text-white"
                        }`}
                      >
                        <ShoppingBag className="w-3 h-3" /> Add to Bag
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
