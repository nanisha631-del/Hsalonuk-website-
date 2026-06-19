/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ArrowDownAZ, ShoppingBag, Star, RefreshCw, X, ArrowUpDown } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ShopAllPageProps {
  initialCategory?: string;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onBackToHome: () => void;
}

// Helper to define sparse product badge hierarchy to avoid overcrowding cards
const getProductBadges = (productId: string) => {
  switch (productId) {
    case "snail-silk-serum":
      return { leftBadge: "BESTSELLER" };
    case "snail-silk-scalp-mask":
      return { leftBadge: "NEW", rightBadge: "10% OFF" };
    case "snail-silk-scalp-oil":
      return { leftBadge: "WHATS HOT" };
    case "h-salon-cap":
      return { leftBadge: "NEW" };
    case "h-salon-comb":
      return { rightBadge: "15% OFF" };
    case "gym-silk":
      return { rightBadge: "20% OFF" };
    case "halo-highlighter":
      return { leftBadge: "BESTSELLER" };
    case "eye-shadow-stick":
      return { rightBadge: "10% OFF" };
    default:
      return {};
  }
};

export default function ShopAllPage({
  initialCategory = "all",
  onSelectProduct,
  onAddToCart,
  onBackToHome
}: ShopAllPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low-high" | "price-high-low" | "rating">("featured");
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initialCategory state
  useEffect(() => {
    setSelectedCategory(initialCategory);
    window.scrollTo(0, 0);
  }, [initialCategory]);

  const categories = [
    { id: "all", name: "All Remedies" },
    { id: "scalp-care", name: "Scalp Therapeutics" },
    { id: "hair-oils", name: "Hair Oils & Glosses" },
    { id: "boosters", name: "Concentrated Boosters" },
    { id: "recovery-botanicals", name: "Recovery Botanicals" },
    { id: "accessories", name: "Luxury Accessories" },
  ];

  // Filter and sort PRODUCTS
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.subtitle?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    // 3. Price Filter (under max price selected)
    result = result.filter(p => p.price <= selectedPriceMax);

    // 4. Sorting logic
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, selectedPriceMax]);

  const handleQuickAdd = (p: Product) => {
    const defaultColor = p.colors && p.colors.length > 0 ? p.colors[0].name : undefined;
    onAddToCart(p, 1, defaultColor);
    setToastMessage(`Added 1x ${p.name} to card!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("featured");
    setSelectedPriceMax(100);
  };

  return (
    <div id="shop-all-page" className="w-full bg-brand-offwhite pt-32 pb-24 px-4 md:px-12 animate-fade-in text-brand-black">
      {/* Toast Alert pop-up notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-brand-black text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-brand-offwhite/10 animate-slide-up">
          <div className="w-2 h-2 rounded-full bg-[#82D8C5] animate-ping" />
          <span className="font-sans text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Page title and navigation */}
        <div className="border-b border-brand-black/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#82D8C5] mb-2">
              <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Home</span>
              <span>/</span>
              <span>Catalog</span>
            </div>
            <h1 
              className="font-sans font-black text-4xl md:text-[54px] tracking-normal uppercase leading-none text-brand-black mt-1"
              style={{ wordSpacing: "0.3em" }}
            >
              THE FORMULA CATALOG
            </h1>
            <p className="font-sans text-sm text-brand-black/60 mt-2 max-w-xl">
              Engineered remedies for high-gloss, flake-free premium hair health. Formulated with clinical botanicals in our Mayfair laboratory.
            </p>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-brand-black/50 uppercase tracking-widest block">
              Showing {processedProducts.length} of {PRODUCTS.length} scientific items
            </span>
          </div>
        </div>

        {/* Content Layout with Filter Sidebar and Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Filters Column (3 columns wide) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search filter within page */}
            <div className="bg-white p-5 rounded-xl border border-brand-black/5 shadow-xs">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black mb-3">Instant Search</h3>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-offwhite font-sans text-xs border border-brand-black/10 rounded-lg py-2.5 pl-9 pr-4 text-brand-black placeholder-brand-black/45 focus:outline-hidden focus:border-[#82D8C5] transition-colors"
                />
                <Search className="w-4 h-4 text-brand-black/45 absolute left-3 top-3" />
              </div>
            </div>

            {/* Category filter checklist */}
            <div className="bg-white p-5 rounded-xl border border-brand-black/5 shadow-xs">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 1024) {
                        setSelectedCategory(cat.id);
                      }
                    }}
                    className={`w-full text-left font-sans text-xs uppercase font-extrabold tracking-wider py-2 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${selectedCategory === cat.id ? "bg-brand-black text-[#82D8C5]" : "bg-transparent text-brand-black/80 hover:bg-brand-offwhite"}`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter range slider */}
            <div className="bg-white p-5 rounded-xl border border-brand-black/5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black">Max Price</h3>
                <span className="font-mono text-xs font-semibold text-[#82D8C5] bg-brand-black px-2 py-0.5 rounded-xs">${selectedPriceMax} USD</span>
              </div>
              <input 
                type="range"
                min="10"
                max="100"
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="w-full accent-[#82D8C5] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-brand-black/40 mt-1">
                <span>$10 USD</span>
                <span>$100 USD</span>
              </div>
            </div>

            {/* Sort options */}
            <div className="bg-white p-5 rounded-xl border border-brand-black/5 shadow-xs">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black mb-3 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#82D8C5]" /> Sort Order
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-brand-offwhite font-sans text-xs border border-brand-black/10 rounded-lg py-2.5 px-3 text-brand-black focus:outline-hidden focus:border-[#82D8C5] transition-colors cursor-pointer"
              >
                <option value="featured">Featured remedies</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Reviewed ★★★</option>
              </select>
            </div>

            {/* Reset button indicator */}
            <button
              onClick={resetFilters}
              className="w-full bg-brand-black/5 hover:bg-brand-black hover:text-[#82D8C5] border border-brand-black/10 hover:border-brand-black text-brand-black py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          </div>

          {/* RIGHT: Product Showcase Grid (9 columns wide) */}
          <div className="lg:col-span-9">
            {processedProducts.length === 0 ? (
              <div className="w-full py-16 bg-white border border-brand-black/5 rounded-xl text-center p-8 flex flex-col items-center justify-center">
                <Search className="w-12 h-12 text-[#82D8C5]/40 mb-3" />
                <h3 className="font-sans font-black text-lg text-brand-black uppercase tracking-wider">No matching formulations found</h3>
                <p className="font-sans text-xs text-brand-black/50 mt-1 mb-5">Try relaxing your keywords, price ranges, or selected categories.</p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-black text-[#82D8C5] px-6 py-2.5 rounded-lg font-sans text-xs font-extrabold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <motion.div
                key={selectedCategory}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.1,
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {processedProducts.map((p) => {
                  const ratingStars = Array.from({ length: 5 }, (_, i) => i < p.rating);
                  const isBest = p.tags?.includes("BESTSELLER") || p.price >= 60;
                  return (
                    <motion.div 
                      key={p.id}
                      layout
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 50,
                          scale: 0.98,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.85,
                            ease: [0.19, 1, 0.22, 1],
                          }
                        }
                      }}
                      className="group bg-white border border-brand-black/5 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                    >
                      {/* Product image stage */}
                      <div className="aspect-square relative w-full overflow-hidden bg-brand-offwhite p-6 flex items-center justify-center select-none">
                        <img 
                          src={p.images[0]} 
                          alt={p.name}
                          onClick={() => onSelectProduct(p.id)}
                          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          referrerPolicy="no-referrer"
                        />
                        {/* Sparse Status badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {getProductBadges(p.id).leftBadge && (
                            <span className="bg-brand-black text-[#82D8C5] text-[9px] font-extrabold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                              {getProductBadges(p.id).leftBadge}
                            </span>
                          )}
                          {(p.id === "ground-recovery-oil" || p.id === "snail-silk-scalp-oil") && (
                            <span className="bg-brand-black/5 backdrop-blur-xs text-brand-black text-[9px] font-semibold px-2 py-0.5 rounded-xs tracking-wider uppercase border border-brand-black/5">
                              Organic
                            </span>
                          )}
                        </div>

                        {/* Sparse Discount badge (Right) */}
                        {getProductBadges(p.id).rightBadge && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-[#E76F51] text-white text-[9px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs select-none">
                              {getProductBadges(p.id).rightBadge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product info details */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1 bg-transparent">
                            <div className="flex text-brand-black">
                              {ratingStars.map((isFilled, idx) => (
                                <Star 
                                  key={idx} 
                                  className={`w-3.5 h-3.5 ${isFilled ? "fill-[#82D8C5] text-[#82D8C5] font-black" : "text-brand-black/20"}`} 
                                  id={`star-shopall-${p.id}-${idx}`}
                                />
                              ))}
                            </div>
                            <span className="font-mono text-[10px] text-brand-black/45">({p.rating}.0)</span>
                          </div>

                          <h3 
                            onClick={() => onSelectProduct(p.id)}
                            className="font-sans font-black text-[15px] leading-tight text-brand-black hover:text-[#82D8C5] transition-colors mt-1 cursor-pointer truncate"
                          >
                            {p.name}
                          </h3>

                          {p.subtitle && (
                            <p className="font-sans text-[11px] text-brand-black/50 mt-0.5 truncate leading-tight">
                              {p.subtitle}
                            </p>
                          )}

                          <p className="font-sans text-xs text-brand-black/60 mt-2 line-clamp-2 leading-relaxed">
                            {p.description || p.intro}
                          </p>
                        </div>

                        {/* Price & Cart purchase bar */}
                        <div className="mt-4 pt-3 border-t border-brand-black/5 flex items-center justify-between font-sans">
                          <div>
                            <span className="font-mono text-sm font-black text-brand-black">${p.price.toFixed(2)}</span>
                            {p.originalPrice && (
                              <span className="font-mono text-[10px] text-brand-black/35 line-through ml-1.5">${p.originalPrice.toFixed(2)}</span>
                            )}
                          </div>

                          <button
                            onClick={() => handleQuickAdd(p)}
                            className="bg-brand-black hover:bg-[#82D8C5] text-[#82D8C5] hover:text-brand-black p-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs"
                            aria-label={`Buy ${p.name}`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
