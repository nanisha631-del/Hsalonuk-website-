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

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "product">("home");
  const [selectedProductId, setSelectedProductId] = useState<string>("halo-highlighter");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Tab state for Section 3 bestseller product carousel
  const [bestsellersTab, setBestsellersTab] = useState<"BESTSELLERS" | "MAKEUP BRUSHES">("BESTSELLERS");
  
  const carouselContainerRef = useRef<HTMLDivElement>(null);

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

  // Bestsellers filtering
  const filteredProducts = PRODUCTS.filter((p) => {
    if (bestsellersTab === "MAKEUP BRUSHES") {
      return p.category === "brush";
    } else {
      return p.category !== "brush" && p.category !== "pouch";
    }
  });

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
              <section id="hero-showcase" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Fullbleed background hero cover */}
                <div className="absolute inset-0 bg-[#E8E8E8] z-0 select-none">
                  <img
                    src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1900&auto=format&fit=crop&q=80"
                    alt="Radiant Skin Beauty Hero Background"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center brightness-[0.78]"
                  />
                </div>

                {/* Styled Center Hero Contents with sliding transitions */}
                <div className="relative z-10 text-center flex flex-col items-center gap-6 px-4 md:px-12 max-w-4xl pt-16 select-none">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-[11px] font-sans font-bold text-[#E8D5C4] uppercase tracking-[0.25em] drop-shadow-xs">
                      MIST • HIGHLIGHT • DEFINE
                    </span>
                    <h1 className="font-serif text-[56px] md:text-[88px] lg:text-[110px] font-light leading-[0.85] tracking-[-0.02em] text-white my-6 uppercase">
                      RADIANT<br />BEAUTY
                    </h1>
                    <p className="text-white/90 text-xs md:text-sm font-sans tracking-[0.2em] font-semibold max-w-xl mx-auto uppercase">
                      Makeup, but make it fun.
                    </p>
                  </motion.div>

                  {/* Buttons with staggered delays */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                    className="flex justify-center gap-6 flex-wrap mt-4"
                  >
                    <button
                      onClick={() => {
                        const next = document.getElementById("bestsellers-section");
                        if (next) next.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-brand-black text-white border border-brand-black px-10 py-4.5 uppercase tracking-[0.2em] text-[11px] font-bold hover:scale-[1.05] transition-all duration-300 shadow-xl cursor-pointer rounded-none"
                    >
                      BESTSELLERS
                    </button>
                    <button
                      onClick={() => {
                        const block = document.getElementById("category-accordion");
                        if (block) block.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-transparent border border-white text-white px-10 py-4.5 uppercase tracking-[0.2em] text-[11px] font-bold hover:scale-[1.05] transition-all duration-300 cursor-pointer rounded-none"
                    >
                      MAKEUP BASICS
                    </button>
                  </motion.div>
                </div>
                
                {/* Slow mouse down indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-[10px] uppercase font-sans tracking-widest animate-bounce">
                  <span>Scroll down</span>
                  <div className="w-[1px] h-6 bg-white/40" />
                </div>
              </section>

              {/* SECTION 3 — BESTSELLER PRODUCT CAROUSEL */}
              <section id="bestsellers-section" className="bg-brand-offwhite py-20 px-4 md:px-12 relative select-none">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                  
                  {/* Heading container and tabs */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-black/5 pb-6">
                    <div>
                      <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gray-400">OUR FAVORITES</span>
                      <h2 className="font-serif text-[32px] md:text-[44px] font-bold tracking-tight text-brand-black mt-1">
                        Bestsellers
                      </h2>
                    </div>

                    {/* Toggle tabs for categories */}
                    <div className="flex gap-6 border-b border-brand-black/5 pb-1 md:pb-0">
                      {(["BESTSELLERS", "MAKEUP BRUSHES"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setBestsellersTab(tab)}
                          className={`text-xs md:text-sm font-sans font-bold uppercase tracking-widest pb-3 relative transition-colors cursor-pointer ${
                            bestsellersTab === tab ? "text-brand-black" : "text-gray-400 hover:text-brand-black"
                          }`}
                        >
                          {tab}
                          {bestsellersTab === tab && (
                            <motion.div
                              layoutId="activeBestsellerTabUnderline"
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-lilac"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* See all / View More link */}
                    <button
                      onClick={() => setBestsellersTab(bestsellersTab === "BESTSELLERS" ? "MAKEUP BRUSHES" : "BESTSELLERS")}
                      className="text-xs font-sans font-bold uppercase tracking-[0.16em] text-brand-black border-b border-brand-black pb-1 hover:opacity-75 transition-opacity cursor-pointer hidden md:block"
                    >
                      VIEW ALL {bestsellersTab === "BESTSELLERS" ? "BRUSHES" : "PRODUCTS"} →
                    </button>
                  </div>

                  {/* Slider and arrows row */}
                  <div className="relative w-full overflow-hidden">
                    <div
                      ref={carouselContainerRef}
                      className="flex gap-6 overflow-x-auto select-none py-4 px-1 scroll-smooth w-full no-scrollbar relative snap-x snap-mandatory"
                    >
                      {filteredProducts.map((p) => (
                        <div key={p.id} className="snap-start w-[240px] md:w-[280px] shrink-0">
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
                  <div className="flex justify-center mt-6">
                    <button
                      id="view-collection-button"
                      onClick={() => {
                        const firstProduct = PRODUCTS[0];
                        handleSelectProduct(firstProduct.id);
                      }}
                      className="bg-[#C4B5D4]/20 hover:bg-[#C4B5D4]/30 text-[#6B5A7F] font-sans font-bold text-xs uppercase tracking-[0.2em] px-10 py-4.5 transition-colors cursor-pointer"
                    >
                      SHOP THE FULL COLLECTION
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
              <section id="makeup-pouch-feature" className="bg-brand-offwhite py-20 px-4 md:px-12 relative select-none">
                <ScrollReveal>
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white/40 border border-brand-black/5 p-6 md:p-12">
                    
                    {/* Left: Square Cosmetics bag layout */}
                    <div className="md:col-span-6 relative aspect-square bg-[#E8E4DF] overflow-hidden rounded-xs">
                      <img
                        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
                        alt="The Makeup Pouch"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      />
                    </div>

                    {/* Right Info panels */}
                    <div className="md:col-span-6 flex flex-col gap-6 items-start">
                      <div className="flex flex-col gap-2.5">
                        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C4B5D4] font-black">
                          THE MAKEUP POUCH
                        </span>
                        <h2 className="font-serif text-[42px] font-bold leading-tight tracking-tight text-brand-black">
                          GETTING POPULAR
                        </h2>
                      </div>

                      <p className="text-sm font-sans text-gray-500 leading-relaxed max-w-lg mb-1">
                        A cute, compact makeup pouch designed to go wherever you do. Finished with a soft, iridescent sheen and a clean zip closure, it fits your everyday essentials without taking up space. Easy to toss in your bag, easy to wipe clean, and cute enough to leave out.
                      </p>

                      <div className="font-sans text-[24px] font-extrabold text-brand-black">
                        $60.00
                      </div>

                      {/* Add to Bag CTA */}
                      <button
                        onClick={() => {
                          const pouch = PRODUCTS.find((p) => p.id === "makeup-pouch");
                          if (pouch) {
                            handleAddToCart(pouch, 1);
                          } else {
                            alert("Creating luxury pouch item!");
                          }
                        }}
                        className="w-full bg-brand-black hover:bg-brand-black/90 hover:opacity-95 text-white font-sans font-bold py-4 px-8 text-xs uppercase tracking-[0.2em] transition-colors rounded-none cursor-pointer"
                      >
                        ADD TO BAG
                      </button>

                      {/* Detail overview sub links */}
                      <button
                        onClick={() => handleSelectProduct("makeup-pouch")}
                        className="text-xs font-sans font-bold uppercase tracking-widest text-[#2A2A2A] hover:underline flex items-center gap-1.5"
                      >
                        View details <ArrowRight className="w-4 h-4 text-brand-lilac" />
                      </button>
                    </div>

                  </div>
                </ScrollReveal>
              </section>

              {/* SECTION 12 — SCROLLING BANNER */}
              <ScrollingBanner />

              {/* SECTION 13 — "MAKEUP SHOULD BE FUN" EDITORIAL */}
              <section id="fun-editorial" className="bg-[#F7F5F2] w-full py-24 px-4 md:px-12 relative overflow-hidden select-none">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  
                  {/* Left slide text */}
                  <div className="md:col-span-6 flex flex-col gap-6 items-start">
                    <ScrollReveal>
                      <h2 className="font-serif text-[42px] md:text-[68px] font-black leading-[1.1] text-brand-black tracking-tight uppercase">
                        MAKEUP SHOULD <br />
                        BE FUN. <br />
                        NOT A FULL-TIME <br />
                        JOB.
                      </h2>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={150}>
                      <div className="flex flex-col gap-2 border-l border-brand-lilac/30 pl-4 max-w-md mt-4">
                        <span className="text-[12px] font-sans font-black text-brand-black uppercase tracking-widest">BUILD YOUR ROUTINE.</span>
                        <p className="text-sm font-sans text-gray-500 leading-relaxed">
                          These are the kind of products you swipe on, tap in, and forget about—in a good way. Skin-first, easy to use, and made for experimenting without commitment.
                        </p>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal delay={250}>
                      <button
                        onClick={() => {
                          const target = document.getElementById("bestsellers-section");
                          if (target) target.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-6 text-xs font-sans font-bold uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-70 transition-opacity cursor-pointer text-brand-black"
                      >
                        SHOP THE BESTSELLERS →
                      </button>
                    </ScrollReveal>
                  </div>

                  {/* Right slide image */}
                  <div className="md:col-span-6 relative aspect-[4/5] bg-[#E0DEDA] shadow-lg">
                    <ScrollReveal delay={200}>
                      <img
                        src="https://images.unsplash.com/photo-1617897903246-719242758050?w=1000&auto=format&fit=crop&q=80"
                        alt="Editorial posing cosmetics"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-xs"
                      />
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
