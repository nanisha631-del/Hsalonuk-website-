/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

import { Product, CartItem } from "./types";
import { PRODUCTS } from "./data";

// Component imports
import HeaderMarquee from "./components/HeaderMarquee";
import Navbar from "./components/Navbar";
import ScrollReveal from "./components/ScrollReveal";
import ProductCard from "./components/ProductCard";
import CurrentlyObsessed from "./components/CurrentlyObsessed";
import TrustCards from "./components/TrustCards";
import WaveScrollSection from "./components/WaveScrollSection";
import ParallaxSplit from "./components/ParallaxSplit";
import AutoScrollCards from "./components/AutoScrollCards";
import ShopTheLook from "./components/ShopTheLook";
import GreetingSection from "./components/GreetingSection";
import HSalonScrollSection from "./components/HSalonScrollSection";
import LightweightFormulas from "./components/LightweightFormulas";
import ScrollingBanner from "./components/ScrollingBanner";
import CommunitySection from "./components/CommunitySection";
import HoverAccordion from "./components/HoverAccordion";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import ScrollZoomImage from "./components/ScrollZoomImage";
import ShopifyInstructionModal from "./components/ShopifyInstructionModal";
import AestheticVideoPlayer from "./components/AestheticVideoPlayer";
import HeroSection from "./components/HeroSection";
import BestsellersCarousel from "./components/BestsellersCarousel";
import MakeupPouchFeature from "./components/MakeupPouchFeature";
import FunEditorialSection from "./components/FunEditorialSection";
import { getShopifySettings } from "./shopifySettings";
import { useSharedState } from "./useSharedState";

// Staggered animation triggers from left to right as requested (slowly like a 1, 2, 3, 4 counting)
const bestsellerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35, // Premium medium-paced count (1, 2, 3, 4)
    }
  }
};

// Smooth, refined animation starting from bottom (y offset), fading in, and gently settles.
const bestsellerCardVariants = {
  hidden: {
    opacity: 0,
    y: 90,
    scale: 1.05, // Classy zoom-out transition starting from slightly magnified state
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.35, // Elegant medium timing for supreme smoothness
      ease: [0.19, 1, 0.22, 1], // Custom slow power-4 cubic bezier curve for high-end feel
    }
  }
};

export default function App() {
  const settings = getShopifySettings();
  
  // Detect if we are running in the AI Studio preview environment vs a live Shopify store
  const isStudioPreview = typeof window !== "undefined" && (
    window.location.hostname.includes("run.app") ||
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1")
  );

  const {
    state,
    updateState,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleSelectProduct,
    handleGoHome,
  } = useSharedState();

  const {
    currentView,
    selectedProductId,
    cartOpen,
    cartItems,
    shopifyModalOpen,
  } = state;
  
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic brand styling color sync
  useEffect(() => {
    if (settings.brand_primary_color) {
      document.documentElement.style.setProperty('--color-brand-lilac', settings.brand_primary_color);
    }
  }, [settings.brand_primary_color]);

  // Scroll to top on page or view transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  // Derive cart elements total count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Bestsellers filtering - strictly limited to exactly 5 bestsellers
  const filteredProducts = PRODUCTS.filter((p) => {
    return p.category !== "brush" && p.category !== "pouch";
  }).slice(0, 5);

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
    <div className="bg-brand-offwhite min-h-screen text-brand-black flex flex-col relative tracking-wide selection:bg-brand-lilac/30 animate-fade-in">
      
      {/* Unified Fixed Header Container */}
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        {/* Announcement bar */}
        <HeaderMarquee />

        {/* Primary Sticky Top Nav */}
        <Navbar
          cartCount={cartCount}
          onCartClick={() => updateState({ cartOpen: true })}
          currentView={currentView}
          onGoHome={handleGoHome}
          onSearchClick={() => {
            alert("Dynamic Instant Search will look up collections in active store database!");
          }}
          onMenuClick={() => {
            const side = document.getElementById("bestsellers-section");
            if (side) side.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </header>

      {/* VIEW ROUTER */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {currentView === "home" ? (
            <motion.div
              key="homepage-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col w-full"
            >
              {/* SECTION 2 — HERO SECTION */}
              <HeroSection />

              {/* SECTION 2.5 — H SALON STICKY TEXT REVEAL SECTION */}
              <HSalonScrollSection />

              {/* SECTION 3 — BESTSELLER PRODUCT CAROUSEL */}
              <BestsellersCarousel />

              {/* SECTION 4 — CURRENTLY OBSESSED */}
              <CurrentlyObsessed />

              {/* SECTION 5 — TRUST CARDS */}
              <TrustCards />

              {/* NEW SECTION — ENDLESS WAVE SCROLL MARQUEE */}
              <WaveScrollSection />

              {/* SECTION 6 — PARALLAX SPLIT IMAGE */}
              <ParallaxSplit />

              {/* SECTION 7 — "THE HYPE IS REAL" CONTINUOUS AUTO SCROLL */}
              <AutoScrollCards />

              {/* SECTION 8 — SHOP THE LOOK */}
              <ShopTheLook
                onSelectProduct={handleSelectProduct}
                onAddToCart={(p, qty) => handleAddToCart(p, qty, p.colors && p.colors.length > 0 ? p.colors[0].name : undefined)}
              />

              {/* SECTION 9 — TEXT FILL ON SCROLL */}
              <GreetingSection />

              {/* SECTION 10 — LIGHTWEIGHT FORMULA PARALLAX STACKS */}
              <LightweightFormulas />

              {/* SECTION 11 — MAKEUP POUCH PRODUCT HIGHLIGHT */}
              <MakeupPouchFeature />

              {/* SECTION 12 — SCROLLING BANNER */}
              <ScrollingBanner />

              {/* SECTION 13 — "HAIRCARE SHOULD BE RESTORATIVE" EDITORIAL */}
              <FunEditorialSection />

              {/* SECTION 14 — COMMUNITY UGC */}
              <CommunitySection />

              {/* SECTION 15 — LANDING HOVER ACCORDION */}
              <HoverAccordion />

            </motion.div>
          ) : (
            <motion.div
              key="productpage-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* SECTION 11 Product Page view details */}
              <ProductPage
                product={PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0]}
                onBack={handleGoHome}
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SECTION 16 — COPYRIGHT FOOTER */}
      <Footer onGoHome={handleGoHome} />

      {/* CAROUSEL SLIDE-OUT CART VIEW DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => updateState({ cartOpen: false })}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

    </div>
  );
}
