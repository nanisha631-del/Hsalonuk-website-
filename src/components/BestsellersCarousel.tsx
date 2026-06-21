/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data";
import ProductCard from "./ProductCard";
import { getShopifySettings } from "../shopifySettings";
import { useSharedState } from "../useSharedState";

const bestsellerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18, // Adjusted stagger to make sequential entry feels beautifully snappy but distinct
    }
  }
};

const bestsellerCardVariants = {
  hidden: {
    opacity: 0,
    y: 35, // Smooth rising translation
    filter: "blur(3px)", // Perfect soft cinematic blur
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.0, 
      ease: [0.16, 1, 0.3, 1], // Fluid cubic-bezier
    }
  }
};

export default function BestsellersCarousel() {
  const settings = getShopifySettings();
  const { handleAddToCart, handleSelectProduct, updateState } = useSharedState();
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  
  // Custom mount state key to force-animate child items on any direct browser refresh/load event
  const [mountKey, setMountKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"BESTSELLERS" | "BUNDLES">("BESTSELLERS");
  
  useEffect(() => {
    setMountKey((prev) => prev + 1);
  }, [activeTab]);

  const filteredProducts = activeTab === "BUNDLES"
    ? PRODUCTS.filter((p) => p.category === "bundle")
    : [
        ...PRODUCTS.filter((p) => p.id === "h-salon-cap" || p.id === "h-salon-comb"),
        ...PRODUCTS.filter((p) => p.id !== "h-salon-cap" && p.id !== "h-salon-comb" && p.category !== "brush" && p.category !== "pouch" && p.category !== "bundle").slice(0, 4)
      ];

  const scrollCarouselLeft = () => {
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollCarouselRight = () => {
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="bestsellers-section" className="bg-brand-offwhite pt-12 md:pt-16 pb-12 px-4 md:px-12 relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Heading container and tabs */}
        <div className="flex justify-between items-end border-b border-brand-black/10 pb-4">
          <div className="flex items-center gap-6 sm:gap-10">
            <button
              onClick={() => {
                setActiveTab("BESTSELLERS");
              }}
              className={`text-[18px] sm:text-[28px] font-sans font-black uppercase tracking-tight pb-3 relative transition-all duration-300 focus:outline-none cursor-pointer ${
                activeTab === "BESTSELLERS" ? "text-brand-black" : "text-brand-black/35 hover:text-brand-black/70"
              }`}
            >
              {settings.bestsellers_title || "BESTSELLERS"}
              {activeTab === "BESTSELLERS" && (
                <motion.div 
                  layoutId="activeBestsellerTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#82D8C5]" 
                />
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("BUNDLES");
              }}
              className={`text-[18px] sm:text-[28px] font-sans font-black uppercase tracking-tight pb-3 relative transition-all duration-300 focus:outline-none cursor-pointer ${
                activeTab === "BUNDLES" ? "text-brand-black" : "text-brand-black/35 hover:text-brand-black/70"
              }`}
            >
              BUNDLES
              {activeTab === "BUNDLES" && (
                <motion.div 
                  layoutId="activeBestsellerTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#82D8C5]" 
                />
              )}
            </button>
          </div>
        </div>

        {/* Slider and arrows row */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            key={mountKey}
            variants={bestsellerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            ref={carouselContainerRef}
            className="flex gap-5 overflow-x-auto select-none py-4 px-1 scroll-smooth w-full no-scrollbar relative snap-x snap-mandatory"
          >
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                variants={bestsellerCardVariants}
                className="snap-center w-[85vw] sm:w-[320px] md:w-[280px] shrink-0"
                style={{ willChange: "transform, opacity, filter" }}
              >
                <ProductCard
                  product={p}
                  onSelect={handleSelectProduct}
                  onQuickAdd={(item, event) => {
                    event.stopPropagation();
                    handleAddToCart(item, 1, item.colors && item.colors.length > 0 ? item.colors[0].name : undefined);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Left & Right absolute slider trigger buttons */}
          <button
            onClick={scrollCarouselLeft}
            className="absolute left-2 top-[35%] -translate-y-1/2 w-10 h-10 rounded-full border border-brand-black/10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors cursor-pointer text-brand-black shadow-xs hidden md:flex"
            aria-label="Previous bestseller"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollCarouselRight}
            className="absolute right-2 top-[35%] -translate-y-1/2 w-10 h-10 rounded-full border border-brand-black/10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors cursor-pointer text-brand-black shadow-xs hidden md:flex"
            aria-label="Next bestseller"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Under slider button for collection */}
        <div className="flex justify-center mt-4">
          <button
            id="view-collection-button"
            onClick={() => {
              updateState({ 
                currentView: "shop_all", 
                selectedCategory: activeTab === "BUNDLES" ? "bundle" : "all" 
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-brand-lilac/20 hover:bg-brand-lilac/30 text-brand-black font-sans font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 transition-colors cursor-pointer"
          >
            {activeTab === "BUNDLES" ? "SHOP ALL BUNDLES" : (settings.collection_button_text || "SHOP THE FULL COLLECTION")}
          </button>
        </div>
      </div>
    </section>
  );
}
