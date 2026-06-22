/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { Search, X, Star, ArrowUpRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { useSharedState, formatPrice } from "../useSharedState";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
}

export default function SearchDrawer({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart
}: SearchDrawerProps) {
  const { state } = useSharedState();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested keywords to search for
  const suggestions = [
    { label: "Scalp Therapeutics", query: "scalp" },
    { label: "Hair Oils & Glosses", query: "oil" },
    { label: "Active Boosters", query: "booster" },
    { label: "Bestsellers", query: "clinical" },
  ];

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler to close search drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Find products matching query in name, category, subtitle or description
  const filteredProducts = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const handleSelect = (productId: string) => {
    onSelectProduct(productId);
    onClose();
  };

  const handleQuickAddItem = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : undefined;
    onAddToCart(product, 1, defaultColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-modal-backdrop" className="fixed inset-0 z-100 flex flex-col justify-start">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Search container panel */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full bg-white border-b border-brand-black/10 shadow-2xl z-10 px-4 py-8 md:px-12 md:py-10"
          >
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              {/* Top search input line */}
              <div className="flex items-center justify-between gap-4 border-b-2 border-brand-black pb-3">
                <div className="flex items-center gap-3.5 flex-grow">
                  <Search className="w-5 h-5 text-brand-black" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for scalp, oils, treatments, boosters..."
                    className="w-full bg-transparent border-none outline-hidden text-brand-black text-lg md:text-2xl font-sans font-extrabold placeholder-brand-black/30 focus:ring-0"
                    id="global-search-input"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-brand-offwhite text-brand-black transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions row if query is empty */}
              {!query.trim() ? (
                <div className="py-2 animate-fade-in text-left">
                  <span className="font-sans font-black text-[10px] uppercase tracking-widest text-brand-black/45 block mb-2.5">
                    Suggested Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(s.query)}
                        className="bg-brand-offwhite hover:bg-brand-black hover:text-[#82D8C5] text-brand-black font-sans text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-brand-black/5 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{s.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-black/35 group-hover:text-[#82D8C5]" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Search results block */
                <div className="max-h-[60vh] overflow-y-auto no-scrollbar py-2 text-left">
                  <div className="flex items-center justify-between border-b border-brand-black/5 pb-2 mb-4">
                    <span className="font-sans font-black text-[10px] uppercase tracking-widest text-brand-black/45 block">
                      Matched Formulations ({filteredProducts.length})
                    </span>
                    <span className="font-mono text-[10px] text-brand-black/35">Press Esc to exit</span>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="py-12 text-center flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 text-brand-black/15 mb-2" />
                      <p className="font-sans text-sm text-brand-black/60 font-semibold">
                        No formulas match "{query}"
                      </p>
                      <span className="text-xs text-brand-black/40 mt-1">Try clarifying keywords or check spelling</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredProducts.map((p) => {
                        return (
                          <div
                            key={p.id}
                            onClick={() => handleSelect(p.id)}
                            className="group flex gap-4 bg-brand-offwhite/50 hover:bg-brand-offwhite p-3 rounded-xl border border-brand-black/5 cursor-pointer transition-all duration-200"
                          >
                            {/* Product preview image source */}
                            <div className="w-16 h-16 rounded-lg bg-white overflow-hidden p-2 flex items-center justify-center shrink-0 border border-brand-black/5">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="object-contain w-full h-full group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Details row inside */}
                            <div className="flex-grow min-w-0 flex flex-col justify-between">
                              <div className="min-w-0">
                                <h4 className="font-sans font-extrabold text-xs text-brand-black truncate group-hover:text-[#82D8C5] transition-colors leading-tight">
                                  {p.name}
                                </h4>
                                {p.subtitle && (
                                  <span className="text-[10px] font-medium text-brand-black/50 block truncate leading-none mt-0.5">
                                    {p.subtitle}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between gap-2 mt-1">
                                <span className="font-mono text-xs font-bold text-brand-black">
                                  {formatPrice(p.price, state.currency)}
                                </span>
                                <button
                                  onClick={(e) => handleQuickAddItem(p, e)}
                                  className="text-[9px] font-sans font-black uppercase tracking-wider bg-brand-black hover:bg-[#82D8C5] text-[#82D8C5] hover:text-brand-black px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Add to cart"
                                >
                                  <ShoppingBag className="w-3 h-3" /> Quickbuy
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
