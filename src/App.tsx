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
import ParallaxSplit from "./components/ParallaxSplit";
import AutoScrollCards from "./components/AutoScrollCards";
import ShopTheLook from "./components/ShopTheLook";
import GreetingSection from "./components/GreetingSection";
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
import { getShopifySettings } from "./shopifySettings";


export default function App() {
  const settings = getShopifySettings();
  
  // Detect if we are running in the AI Studio preview environment vs a live Shopify store
  const isStudioPreview = typeof window !== "undefined" && (
    window.location.hostname.includes("run.app") ||
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1")
  );

  const [currentView, setCurrentView] = useState<"home" | "product">("home");
  const [selectedProductId, setSelectedProductId] = useState<string>("halo-highlighter");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Tab state for Section 3 bestseller product carousel
  const [bestsellersTab, setBestsellersTab] = useState<"BESTSELLERS" | "WHATS HOT">("BESTSELLERS");
  const [shopifyModalOpen, setShopifyModalOpen] = useState(false);
  
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

  // Cart Management
  const handleAddToCart = (product: Product, quantity: number, color?: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (idx > -1) {
        const update = [...prev];
        update[idx].quantity += quantity;
        return update;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    // Auto trigger open the cart drawer to feed back to user!
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, color: string | undefined, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id && item.selectedColor === color
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string, color: string | undefined) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === id && item.selectedColor === color))
    );
  };

  // Nav actions
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView("product");
  };

  const handleGoHome = () => {
    setCurrentView("home");
  };

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
          onCartClick={() => setCartOpen(true)}
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
              <section id="hero-showcase" className="w-full bg-brand-offwhite pt-24 sm:pt-28 pb-10 px-4 md:px-12 select-none">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">

                  {/* The Framed Hero Card with precise aspect ratios corresponding to native images */}
                  <div className="relative w-full aspect-[1792/2400] md:aspect-[2752/1536] bg-[#E8E8E8] rounded-2xl md:rounded-[36px] overflow-hidden shadow-xs flex items-end justify-center pb-12 sm:pb-24">
                    
                    {/* Background portrait of skin close-up */}
                    <div className="absolute inset-0 z-0 select-none overflow-hidden rounded-2xl md:rounded-[36px]">
                      {/* Desktop Background Image - 2752x1536 */}
                      <div className="hidden sm:block w-full h-full">
                        <ScrollZoomImage
                          src={settings.hero_image_url || "/hero section image.jpeg"}
                          alt="Radiant Skin Beauty Hero Background"
                          className="brightness-[0.85] object-center"
                        />
                      </div>
                      {/* Mobile Background Image - 1792x2400 */}
                      <div className="block sm:hidden w-full h-full">
                        <ScrollZoomImage
                          src="/hero section mobile view.jpeg"
                          alt="Radiant Skin Beauty Hero Background Mobile"
                          className="brightness-[0.85] object-center"
                        />
                      </div>
                    </div>

                    {/* Styled Center Hero Contents positioned lower */}
                    <div className="relative z-10 text-center flex flex-col items-center gap-3 px-4 md:px-12 max-w-2xl select-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-1.5"
                      >
                        <p className="text-white text-[11px] sm:text-xs font-sans tracking-[0.22em] font-extrabold uppercase bg-black/15 px-4.5 py-2 rounded-full backdrop-blur-[3px] shadow-sm inline-block">
                          {settings.hero_subtitle || "Apothecary hair & scalp elixirs."}
                        </p>
                      </motion.div>

                      {/* Pill button: SHOP PRODUCTS */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                        className="mt-3.5"
                      >
                        <button
                          onClick={() => {
                            const next = document.getElementById("bestsellers-section");
                            if (next) next.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-white text-brand-black px-11 py-4 rounded-full text-[11px] font-extrabold uppercase tracking-[0.22em] hover:bg-white/95 hover:scale-[1.03] transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
                        >
                          {settings.hero_cta_text || "SHOP PRODUCTS"}
                        </button>
                      </motion.div>
                    </div>

                    {/* Slow mouse down indicator inside the frame */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/50 text-[9px] uppercase font-sans tracking-widest">
                      <span>Scroll down</span>
                      <div className="w-[1px] h-4 bg-white/30" />
                    </div>

                  </div>

                  {/* Elegant Background Element: RADIANT BEAUTY below the girls */}
                  <div className="relative w-full text-center mt-6 md:mt-8 select-none pointer-events-none cursor-default overflow-hidden">
                    <span className="font-sans text-[48px] sm:text-[90px] md:text-[130px] lg:text-[150px] font-black leading-none uppercase tracking-tighter text-black/[0.035] block">
                      {settings.hero_title_1 || "RADIANT"} {settings.hero_title_2 || "BEAUTY"}
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 3 — BESTSELLER PRODUCT CAROUSEL */}
              <section id="bestsellers-section" className="bg-brand-offwhite py-12 px-4 md:px-12 relative select-none">
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
                    <div
                      ref={carouselContainerRef}
                      className="flex gap-5 overflow-x-auto select-none py-4 px-1 scroll-smooth w-full no-scrollbar relative snap-x snap-mandatory"
                    >
                      {filteredProducts.map((p) => (
                        <div key={p.id} className="snap-center w-[85vw] sm:w-[320px] md:w-[280px] shrink-0">
                          <ProductCard
                            product={p}
                            onSelect={handleSelectProduct}
                            onQuickAdd={(item, event) => {
                              event.stopPropagation();
                              handleAddToCart(item, 1, item.colors && item.colors.length > 0 ? item.colors[0].name : undefined);
                            }}
                          />
                        </div>
                      ))}
                    </div>

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

              {/* SECTION 4 — CURRENTLY OBSESSED */}
              <CurrentlyObsessed />

              {/* SECTION 5 — TRUST CARDS */}
              <TrustCards />

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
              <section id="makeup-pouch-feature" className="bg-brand-offwhite py-12 px-4 md:px-12 relative select-none">
                <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[36px] shadow-xs border border-brand-black/5">
                  
                  {/* Top Tab Headers */}
                  <div className="flex gap-6 border-b border-brand-black/5 pb-2.5 mb-6">
                    <span className="font-sans text-[13px] sm:text-[15px] font-black tracking-widest text-brand-black cursor-pointer pb-2 border-b-2 border-brand-lilac">
                      {settings.pouch_title || "THE APOTHECARY SPA POUCH"}
                    </span>
                    <span className="font-sans text-[13px] sm:text-[15px] font-bold tracking-widest text-gray-400 hover:text-brand-black cursor-pointer pb-2">
                      ROOT THERAPY DUOS
                    </span>
                  </div>

                  {/* Overlapping Images Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Beautiful Overlapping Image Card frame */}
                    <div className="md:col-span-6 relative w-full select-none">
                      <div className="w-[85%] aspect-[1.12/1] bg-[#E8E4DF] overflow-hidden rounded-2xl sm:rounded-[28px] relative shadow-xs">
                        <ScrollZoomImage
                          src={settings.pouch_image_1_url || "/the main image frame pouch.jpeg"}
                          alt="The Apothecary Spa Pouch Main"
                        />
                      </div>
                      
                      {/* Secondary overlapping inset picture */}
                      <div className="absolute bottom-[-10px] right-2 w-[42%] aspect-square bg-[#DFDEDA] border-[3px] border-white rounded-[16px] sm:rounded-[22px] overflow-hidden shadow-md">
                        <ScrollZoomImage
                          src={settings.pouch_image_2_url || "/the secondary insdert image frame.jpeg"}
                          alt="Apothecary Pouch Inset Detail"
                        />
                      </div>
                    </div>

                    {/* Right: Tight details copy with ADD TO BAG button */}
                    <div className="md:col-span-6 flex flex-col gap-3 sm:gap-4 items-start w-full">
                      <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-brand-lilac font-black">
                        TRENDING BESTSELLER
                      </span>
                      
                      {/* Price in bold compact size */}
                      <div className="font-sans text-[26px] sm:text-[32px] font-black leading-none text-brand-black">
                        ${settings.pouch_price || "60.00"}
                      </div>

                      <p className="text-[11.5px] sm:text-[13px] font-sans text-gray-400 leading-relaxed">
                        {settings.pouch_desc || "A gorgeous, quilted velvet protection sleeve designed to shelter your luxury elixirs, active botanicals, and scalp oils. Liquid-proof lining shields your precious apothecary glass droppers, while the compact, padded structural silhouette packs seamlessly into travel bags for premium root treatments anywhere."}
                      </p>

                      <div className="flex gap-4 w-full mt-2">
                        {/* Add to Bag CTA */}
                        <button
                          onClick={() => {
                            const pouch = PRODUCTS.find((p) => p.id === "makeup-pouch");
                            if (pouch) {
                              handleAddToCart(pouch, 1);
                            }
                          }}
                          className="flex-1 bg-brand-black hover:bg-brand-black/90 text-white font-sans font-bold py-3.5 px-6 text-[11px] uppercase tracking-[0.2em] transition-colors rounded-full cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          ADD TO BAG
                        </button>

                        <button
                          onClick={() => handleSelectProduct("makeup-pouch")}
                          className="border border-brand-black/15 bg-transparent hover:bg-brand-black/5 text-brand-black font-sans font-bold py-3.5 px-6 text-[11px] uppercase tracking-[0.2em] transition-all rounded-full cursor-pointer whitespace-nowrap"
                        >
                          DETAILS
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* SECTION 12 — SCROLLING BANNER */}
              <ScrollingBanner />

              {/* SECTION 13 — "HAIRCARE SHOULD BE RESTORATIVE" EDITORIAL */}
              <section id="fun-editorial" className="bg-[#F7F5F2] w-full py-24 px-4 md:px-12 relative overflow-hidden select-none">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  
                  {/* Left slide text */}
                  <div className="md:col-span-6 flex flex-col gap-6 items-start">
                    <ScrollReveal direction="right" distance={35}>
                      <h2 className="font-serif text-[42px] md:text-[62px] font-black leading-[1.15] text-brand-black tracking-tight uppercase">
                        HAIRCARE SHOULD <br />
                        BE HEALING. <br />
                        NOT COMPLICATED. <br />
                      </h2>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={150} direction="right" distance={25}>
                      <div className="flex flex-col gap-2 border-l border-brand-lilac/30 pl-4 max-w-md mt-4">
                        <span className="text-[12px] font-sans font-black text-brand-black uppercase tracking-widest">BUILD YOUR ROUTINE.</span>
                        <p className="text-sm font-sans text-gray-500 leading-relaxed">
                          A highly targeted ritual of concentrated treatment elixirs, active botanical scalp masks, and lightweight root-penetrating hair oils. Scientifically formulated to calm irritated follicles, lock in deep moisture, and amplify your natural luminous shine from within.
                        </p>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal delay={250} direction="right" distance={15}>
                      <button
                        onClick={() => {
                          const target = document.getElementById("bestsellers-section");
                          if (target) target.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-6 text-xs font-sans font-bold uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-70 transition-opacity cursor-pointer text-brand-black"
                      >
                        EXPLORE THE TREATMENT RANGE →
                      </button>
                    </ScrollReveal>
                  </div>

                  {/* Right slide video */}
                  <div className="md:col-span-6 relative aspect-[4/5] bg-[#E0DEDA] shadow-lg rounded-2xl overflow-hidden">
                    <ScrollReveal delay={200} direction="none" className="w-full h-full">
                      <AestheticVideoPlayer />
                    </ScrollReveal>
                  </div>

                </div>
              </section>

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
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

    </div>
  );
}
