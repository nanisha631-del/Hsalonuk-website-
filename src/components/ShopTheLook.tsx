/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { Plus, ChevronLeft, ChevronRight, ShoppingBag, Eye } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";

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
    name: "Kérastase Elixir Ultime Hair Oil",
    price: 56.00,
    productId: "halo-highlighter",
    x: 66,
    y: 26.5,
    placement: "bottom"
  },
  {
    id: "h2",
    name: "Olaplex No. 9 Bond Protector Serum",
    price: 24.00,
    productId: "eyeliner",
    x: 57,
    y: 5.5,
    placement: "bottom"
  },
  {
    id: "h3",
    name: "Kérastase Nutritive Split-End Serum",
    price: 24.00,
    productId: "lip-gloss",
    x: 40,
    y: 62,
    placement: "right"
  }
];

export default function ShopTheLook({ onSelectProduct, onAddToCart }: ShopTheLookProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const settings = getShopifySettings();

  const title = settings.look_title || "Shop The Look";
  const tagline = settings.look_tagline || "TAP TO DISCOVER";
  const mainImage = settings.look_main_image || "/Shop the look.jpg";

  // Products from our list to show in this carousel
  const lookProducts = PRODUCTS.filter((p) =>
    ["halo-highlighter", "eyeliner", "lip-gloss"].includes(p.id)
  );

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
              {title}
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
          <div className="lg:col-span-6 relative aspect-square md:aspect-[4/5] bg-brand-nude/15 overflow-hidden shadow-md rounded-[16px]">
            <ScrollZoomImage
              src={mainImage}
              alt="Model visual look"
            />
            
            {/* Hotspot dots */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  className="absolute z-20"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  {/* Plus Trigger Button */}
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : spot)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? "bg-brand-lilac text-brand-black rotate-45 scale-110" 
                        : "bg-white text-brand-black hover:scale-105"
                    } shadow-lg cursor-pointer focus:outline-none`}
                    aria-label={`Show ${spot.name}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  {/* Tooltip Popup */}
                  {isActive && (
                    <div
                      className={`absolute z-30 bg-white/95 backdrop-blur-md text-brand-black p-4 w-48 shadow-xl border border-brand-black/5 flex flex-col gap-2 rounded-none transition-all duration-300 ${
                        spot.placement === "top" ? "bottom-10 -left-20" :
                        spot.placement === "bottom" ? "top-10 -left-20" :
                        spot.placement === "left" ? "right-10 -top-8" : "left-10 -top-8"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider text-brand-lilac font-bold">FEATURED</span>
                      <h4 className="font-serif text-[15px] font-bold">{spot.name}</h4>
                      <span className="font-sans text-[13px] font-semibold text-gray-600">${spot.price.toFixed(2)}</span>
                      
                      {/* Action trigger links inside hotspot */}
                      <div className="grid grid-cols-2 gap-2 mt-1 border-t border-brand-black/5 pt-2">
                        <button
                          onClick={() => onSelectProduct(spot.productId)}
                          className="text-[10px] uppercase font-bold text-left hover:text-brand-lilac flex items-center gap-0.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={() => {
                            const p = PRODUCTS.find((prod) => prod.id === spot.productId);
                            if (p) onAddToCart(p, 1);
                            setActiveHotspot(null);
                          }}
                          className="text-[10px] uppercase font-bold text-right hover:text-brand-lilac"
                        >
                          + Quick Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Horizontally scrollable product row */}
          <div className="lg:col-span-6 overflow-hidden h-full">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto select-none py-2 px-1 no-scrollbar scroll-smooth w-full"
            >
              {lookProducts.map((p) => (
                <div
                  key={p.id}
                  className="w-[240px] md:w-[280px] bg-white border border-[#D8D3CC]/60 rounded-none overflow-hidden flex-shrink-0 flex flex-col justify-between group transition-transform hover:-translate-y-1 duration-300"
                >
                  <div
                    onClick={() => onSelectProduct(p.id)}
                    className="cursor-pointer"
                  >
                    <div className="aspect-square bg-[#E5E0DA] relative overflow-hidden">
                      <ScrollZoomImage
                        src={p.images[0]}
                        alt={p.name}
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-1 items-start">
                      <h3 className="font-serif text-[16px] font-bold text-brand-black group-hover:underline">
                        {p.name}
                      </h3>
                      <p className="font-sans text-[13px] text-gray-500">
                        ${p.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <button
                      onClick={() => onAddToCart(p, 1)}
                      className="w-full bg-brand-black hover:bg-brand-black/90 text-white font-sans text-[11px] font-bold py-3 uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
