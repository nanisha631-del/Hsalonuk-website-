/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
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
      staggerChildren: 0.45, // Deliberate gentle delay to show products one after another
    }
  }
};

const bestsellerCardVariants = {
  hidden: {
    opacity: 0,
    y: 40, // Elegant smooth vertical translation
    filter: "blur(4px)", // Perfectly soft and highly optimized cinematic blur
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.2, // Slightly adjusted duration for immediate snappiness and peak GPU rendering efficiency
      ease: [0.16, 1, 0.3, 1], // Perfect cubic-bezier curve for high-framerate fluid translation
    }
  }
};

export default function BestsellersCarousel() {
  const settings = getShopifySettings();
  const { handleAddToCart, handleSelectProduct } = useSharedState();
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = [
    ...PRODUCTS.filter((p) => p.id === "h-salon-cap" || p.id === "h-salon-comb"),
    ...PRODUCTS.filter((p) => p.id !== "h-salon-cap" && p.id !== "h-salon-comb" && p.category !== "brush" && p.category !== "pouch").slice(0, 4)
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
          <div>
            <h2 className="text-[20px] sm:text-[30px] font-sans font-black uppercase tracking-tight pb-2 relative text-brand-black select-none">
              {settings.bestsellers_title || "BESTSELLERS"}
              <div className="absolute bottom-0 left-0 w-24 h-[3px] bg-brand-lilac" />
            </h2>
          </div>
        </div>

        {/* Slider and arrows row */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            variants={bestsellerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
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
              const firstProduct = PRODUCTS[0];
              handleSelectProduct(firstProduct.id);
            }}
            className="bg-brand-lilac/20 hover:bg-brand-lilac/30 text-brand-black font-sans font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 transition-colors cursor-pointer"
          >
            {settings.collection_button_text || "SHOP THE FULL COLLECTION"}
          </button>
        </div>
      </div>
    </section>
  );
}
