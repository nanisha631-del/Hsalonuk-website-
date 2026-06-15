import { useState, useEffect } from "react";
import { ArrowLeft, Star, ChevronLeft, ChevronRight, Plus, Minus, Check, Heart, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";
import ScenicReviews from "./ScenicReviews";

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
  const settings = getShopifySettings();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    description: false,
    "how-to-use": false,
    ingredients: false,
    shipping: false,
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Recommendations: products from different category than current
  const recommendedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Buy it with accessory item
  const crossSellProduct = PRODUCTS.find((p) => p.id === "makeup-pouch") || PRODUCTS[0];

  const toggleTab = (tabName: string) => {
    setOpenTabs((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };

  const handleNextImage = () => {
    setSelectedImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-12 select-none">
      
      {/* Outer Grid Container wrapped in ScrollReveal to fade in gracefully on entry */}
      <ScrollReveal className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* LEFT COLUMN: Gallery Grid Layout (Lg span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-square bg-[#E0DEDA] shadow-xs overflow-hidden group rounded-2xl">
            {/* Back action badge floating nicely on top of the square image */}
            <button
              onClick={onBack}
              className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white text-brand-black border border-brand-black/5 text-[11px] font-sans font-bold py-1.5 px-3.5 shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 rounded-full cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK
            </button>

            {product.tags && product.tags.length > 0 && (
              <span className="absolute top-4 right-4 z-10 bg-brand-lilac text-brand-black text-[9.5px] font-bold py-0.5 px-2.5 uppercase tracking-wider rounded-full">
                {product.tags[0]}
              </span>
            )}
            
            <div className="w-full h-full">
              <ScrollZoomImage
                src={product.images[selectedImageIdx]}
                alt={product.name}
              />
            </div>

            {/* Slider arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-brand-black/10 bg-white/70 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer text-brand-black"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-brand-black/10 bg-white/70 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer text-brand-black"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails list below main display */}
          <div className="grid grid-cols-4 gap-2 mt-0.5">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIdx(i)}
                className={`aspect-square bg-[#E0DEDA] relative overflow-hidden transition-all duration-300 outline-none cursor-pointer rounded-lg ${
                  selectedImageIdx === i ? "ring-2 ring-brand-lilac ring-offset-2 ring-offset-brand-offwhite" : "opacity-75 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${i}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Info, controls, descriptions, accessories (Lg span 5) - highly compact */}
        <div className="lg:col-span-5 flex flex-col gap-4 font-sans">
          
          {/* Header information with tight compact margins */}
          <div className="flex flex-col gap-1.5 border-b border-brand-black/5 pb-3">
            {/* SALE Badge (matching image 1 & 2) */}
            <div className="flex items-center gap-2">
              <span className="bg-[#9A8FB7] text-white text-[10px] font-extrabold py-0.5 px-3 uppercase tracking-[0.12em] rounded-full inline-block select-none font-sans">
                SELLING FAST!
              </span>
            </div>
            
            {/* Product Title */}
            <h1 className="font-sans text-[28px] sm:text-[32px] font-black leading-[1] tracking-tight text-brand-black uppercase">
              {product.name}
            </h1>
            
            {/* Price section containing exact formatted minimal size values */}
            <div className="flex flex-wrap items-center gap-2 text-brand-black mt-0.5">
              <span className="font-sans text-[17px] font-black leading-none">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-sans text-[14px] text-gray-400 line-through leading-none">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-[#334211] text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider font-sans leading-none">
                    ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </span>
                </>
              )}
            </div>

            {/* In-Stock Indicator */}
            <div className="flex items-center gap-1.5 text-[11.5px] text-gray-600 font-sans mt-0.5">
              <span className="text-[10px] text-[#42B870] font-sans">●</span>
              <span>{settings.prod_stock_text || "Item is in stock"}</span>
            </div>

            {/* Micro benefits matching original image list with light stars */}
            <div className="flex flex-col gap-1 mt-1.5">
              <div className="flex items-center gap-2 text-[12px] font-sans text-brand-black leading-tight">
                <span className="text-[12px] text-[#A697BB]">★</span>
                <span>{settings.prod_tested_bullet_1 || "Dermatologist Tested"}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-sans text-brand-black leading-tight">
                <span className="text-[12px] text-[#A697BB]">★</span>
                <span>{settings.prod_tested_bullet_2 || "Non comedogenic"}</span>
              </div>
            </div>
          </div>

          {/* Color swatches selection - compact spacing */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-1.5 border-b border-brand-black/5 pb-2.5">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-brand-black">COLOR</span>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? "border-[#B2A4A1] scale-100 ring-1 ring-[#B2A4A1] ring-offset-2"
                          : "border-brand-black/10 hover:border-brand-black/30"
                      } cursor-pointer shadow-xs`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check className={`w-3.5 h-3.5 ${color.hex === "#FFFFFF" || color.hex === "#F3EDE4" ? "text-brand-black" : "text-white"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selection wrapped with select dropdown */}
          <div className="flex flex-col gap-1.5 border-b border-brand-black/5 pb-3">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-brand-black">
              QUANTITY
            </span>
            <div className="relative w-28">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-white border border-brand-black/15 text-brand-black text-[12px] font-sans font-bold py-1.5 px-3 rounded-full appearance-none outline-none cursor-pointer pr-8"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-black text-[9px]">
                ▼
              </div>
            </div>
          </div>

          {/* Actions: ADD TO BAG & BUY IT NOW pill shapes - highly compact */}
          <div className="flex flex-col gap-2 border-b border-brand-black/5 pb-3 mt-1">
            <button
              onClick={() => onAddToCart(product, quantity, selectedColor)}
              className="w-full bg-brand-black hover:bg-brand-black/95 text-white font-sans font-bold py-3 text-[12px] uppercase tracking-[0.12em] transition-all hover:scale-[1.01] active:scale-98 cursor-pointer shadow-xs rounded-full flex items-center justify-center gap-1"
            >
              ADD TO CART • ${(product.price * quantity).toFixed(2)}
            </button>
            
            <button
              onClick={() => {
                onAddToCart(product, quantity, selectedColor);
                alert("Redirecting securely to test checkout gateway!");
              }}
              className="w-full bg-white hover:bg-brand-black/5 border border-brand-black text-brand-black font-sans font-bold py-3 text-[12px] uppercase tracking-[0.12em] transition-all hover:scale-[1.01] active:scale-98 cursor-pointer rounded-full flex items-center justify-center shadow-xs"
            >
              BUY IT NOW
            </button>

            {/* Demostore Notice matching original Screenshot 3 */}
            <div className="text-center text-[10.5px] text-gray-400 font-sans tracking-wide py-1 leading-none">
              This is a demo store for Palo Alto. These products are not for sale.
            </div>
          </div>

          {/* Collapsible Tabs: DESCRIPTION, HOW TO USE, INGREDIENTS, SHIPPING & RETURNS - extremely compact */}
          <div className="flex flex-col gap-1 mt-0">
            
            {/* Description Tab */}
            <div className="bg-[#F0EEF3] rounded-xl transition-all duration-300 hover:bg-[#EAE8ED]">
              <button
                onClick={() => toggleTab("description")}
                className="w-full flex items-center justify-between text-left font-serif text-[13px] font-bold uppercase tracking-wider text-brand-black px-4 py-2.5 cursor-pointer select-none"
              >
                <span>Description</span>
                {openTabs["description"] ? <Minus className="w-3.5 h-3.5 text-brand-black" /> : <Plus className="w-3.5 h-3.5 text-brand-black" />}
              </button>
              <AnimatePresence initial={false}>
                {openTabs["description"] && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3.5 text-[12px] text-gray-600 font-sans leading-relaxed flex flex-col gap-1.5 border-t border-brand-black/5 pt-2.5">
                      <p>{product.description || "Designed with skin comfort at the priority, built for natural luminescence."}</p>
                      <p className="italic text-[11px]">{product.intro}</p>
                      {product.bullets && product.bullets.length > 0 && (
                        <ul className="list-disc pl-4 flex flex-col gap-1 mt-1">
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
            <div className="bg-[#F0EEF3] rounded-xl transition-all duration-300 hover:bg-[#EAE8ED]">
              <button
                onClick={() => toggleTab("how-to-use")}
                className="w-full flex items-center justify-between text-left font-serif text-[13px] font-bold uppercase tracking-wider text-brand-black px-4 py-2.5 cursor-pointer select-none"
              >
                <span>How To Use</span>
                {openTabs["how-to-use"] ? <Minus className="w-3.5 h-3.5 text-brand-black" /> : <Plus className="w-3.5 h-3.5 text-brand-black" />}
              </button>
              <AnimatePresence initial={false}>
                {openTabs["how-to-use"] && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3.5 text-[12px] text-gray-600 font-sans leading-relaxed flex flex-col gap-1 border-t border-brand-black/5 pt-2.5">
                      {product.howToUse ? (
                        <p>{product.howToUse}</p>
                      ) : (
                        <>
                          <p>1. Ensure your hair, scalp, or skin is clean and balanced.</p>
                          <p>2. Dispense a warm portion of product between your fingers or directly onto the treatment zone.</p>
                          <p>3. Massage gently to encourage optimal absorption and activation of active elixirs.</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ingredients Tab */}
            <div className="bg-[#F0EEF3] rounded-xl transition-[#000] duration-300 hover:bg-[#EAE8ED]">
              <button
                onClick={() => toggleTab("ingredients")}
                className="w-full flex items-center justify-between text-left font-serif text-[13px] font-bold uppercase tracking-wider text-brand-black px-4 py-2.5 cursor-pointer select-none"
              >
                <span>Ingredients</span>
                {openTabs["ingredients"] ? <Minus className="w-3.5 h-3.5 text-brand-black" /> : <Plus className="w-3.5 h-3.5 text-brand-black" />}
              </button>
              <AnimatePresence initial={false}>
                {openTabs["ingredients"] && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3.5 text-[11.5px] font-mono text-gray-500 tracking-tight leading-relaxed border-t border-brand-black/5 pt-2.5">
                      {product.ingredients || "Abyssine Extract, Sweet Almond Oil, Premium Squalane, Rose Extract, Jasmine, Camellia Seed Extract, Hyaluronic Acid Complexes, Organic Essential Oils."}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping + Returns Tab */}
            <div className="bg-[#F0EEF3] rounded-xl transition-all duration-300 hover:bg-[#EAE8ED]">
              <button
                onClick={() => toggleTab("shipping")}
                className="w-full flex items-center justify-between text-left font-serif text-[13px] font-bold uppercase tracking-wider text-brand-black px-4 py-2.5 cursor-pointer select-none"
              >
                <span>Shipping + Returns</span>
                {openTabs["shipping"] ? <Minus className="w-3.5 h-3.5 text-brand-black" /> : <Plus className="w-3.5 h-3.5 text-brand-black" />}
              </button>
              <AnimatePresence initial={false}>
                {openTabs["shipping"] && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3.5 text-[12px] text-gray-600 font-sans leading-relaxed flex flex-col gap-1 border-t border-[#000]/5 pt-2.5">
                      <p>We provide Free Shipping on all worldwide orders over $75. Economy delivery options deliver to your door within 3 to 7 working days.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Buy It With Cross-Sell section highlighted with crisp boundary */}
          {crossSellProduct && (
            <div className="mt-2.5 p-3.5 bg-white border border-brand-black/30 rounded-xl flex flex-col gap-2 shadow-xs font-sans">
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-black flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 fill-current" /> {settings.prod_buy_with_text || "BUY IT WITH"}
              </span>
              <div className="flex gap-3 items-center">
                <img
                  src={crossSellProduct.images[0]}
                  alt={crossSellProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-cover bg-gray-100 rounded-lg aspect-square overflow-hidden"
                />
                <div className="flex-1 flex flex-col min-w-0">
                  <span className="font-serif text-[13px] font-bold text-brand-black truncate leading-tight">
                    {crossSellProduct.name}
                  </span>
                  <span className="font-sans text-[11px] text-gray-400">
                    ${crossSellProduct.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(crossSellProduct, 1)}
                  className="bg-brand-black hover:bg-brand-black/95 text-white text-[9.5px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer"
                >
                  Quick Buy
                </button>
              </div>
            </div>
          )}

        </div>
      </ScrollReveal>

      {/* FREQUENTLY ASKED QUESTIONS SECTION - with ScrollReveal smooth entry */}
      <ScrollReveal className="max-w-7xl mx-auto mt-6 border-t border-brand-black/10 pt-6 px-4 md:px-12">
        <h2 className="font-sans text-[11px] sm:text-[12px] font-extrabold tracking-widest text-[#9A8FB7] mb-3 uppercase text-left" style={settings.brand_primary_color ? { color: settings.brand_primary_color } : {}}>
          {settings.prod_faq_title || "Frequently Asked Questions"}
        </h2>
        <div className="flex flex-col">
          {[
            {
              q: "Is this suitable for all hair and scalp types?",
              a: "Absolutely. Our specialized scalp and hair formulas are dermatologist-tested and dermatologist-approved for zero irritation, being safe for even hyper-sensitive crowns, color-treated locks, or dry hair fibers."
            },
            {
              q: "Are H Salon curations vegan and cruelty-free?",
              a: "Yes! Sustainability and organic purity are core principles. We choose sustainable harvesting and pledge 100% cruelty-free, sulfate-free, and paraben-free formulation lines."
            },
            {
              q: "How long do the therapeutic benefits last after use?",
              a: "Our deep treatment elixirs and oils hydrate hair fibers for up to 48 hours, providing ongoing moisture protection, exceptional high-gloss shine, and organic scent-therapy relief."
            },
            {
              q: "Can I layer these treatments with other styling products?",
              a: "Yes. Our botanical, weightless elixirs are engineered to layer seamlessly with any everyday styling cremes, leave-in repair sprays, or thermal protecting shields."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-brand-black/10 py-1 bg-transparent">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left font-sans text-[11px] sm:text-[11.5px] font-bold uppercase tracking-widest text-brand-black py-2.5 cursor-pointer select-none"
              >
                <span>{faq.q}</span>
                <span className="font-sans font-bold text-xs text-brand-black">
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
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 text-[11.5px] text-gray-500 font-sans leading-relaxed select-none">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* DYNAMIC PRESS TESTIMONIAL LOGOS SECTION - with ScrollReveal smooth entry */}
      <ScrollReveal className="max-w-7xl mx-auto mt-6 border-t border-brand-black/10 pt-6 text-center px-4 md:px-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">PRESS APPROVED</span>
        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-6 items-center max-w-xl mx-auto opacity-55">
          <div className="font-serif text-[16px] md:text-[20px] italic tracking-widest font-black text-brand-black select-none">
            BYRDIE
          </div>
          <div className="font-serif text-[18px] md:text-[22px] tracking-wider font-extrabold text-brand-black select-none">
            allure
          </div>
          <div className="font-serif text-[16px] md:text-[20px] tracking-widest font-semibold text-brand-black select-none">
            VOGUE
          </div>
        </div>
        <p className="mt-6 font-serif text-[16px] md:text-[20px] italic text-gray-500 max-w-2xl mx-auto leading-relaxed">
          "An effortless approach to premium hair and wellbeing therapy—root-first, restorative, and deeply grounding. Exactly what modern luxury wellness demands."
        </p>
      </ScrollReveal>

      {/* LUXURY SCROLL REVIEWS ANIMATION TRACK */}
      <ScenicReviews 
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />

      {/* RECOMMENDATIONS CAROUSEL ROW - with ScrollReveal smooth entry */}
      <ScrollReveal className="max-w-7xl mx-auto mt-8 border-t border-brand-black/10 pt-6 px-4 md:px-12">
        <div className="mb-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">YOU MAY ALSO LIKE</span>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold tracking-tight text-brand-black mt-0.5">
            {settings.prod_recommended_title || "Curated Duos"}
          </h2>
        </div>

        {/* On mobile: a horizontal slider showing exactly 1 card in view. On desktop: standard 4-grid! */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-0 pl-0 pr-0 md:grid md:grid-cols-4 md:gap-6 w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              className="w-full md:w-auto shrink-0 snap-center md:snap-align-none select-none flex flex-col gap-3 group cursor-pointer px-4 md:px-0"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden rounded-xl">
                <ScrollZoomImage
                  src={p.images[0]}
                  alt={p.name}
                />
              </div>
              <div className="flex flex-col gap-1 items-start px-2 md:px-0">
                <h3 className="font-serif text-[15.5px] font-semibold text-brand-black group-hover:underline">
                  {p.name}
                </h3>
                <span className="font-sans text-[13px] text-gray-500 font-semibold">
                  ${p.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Page progress slide dots indicator - mobile viewport only */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-6">
          {recommendedProducts.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className="w-1.5 h-1.5 rounded-full bg-brand-black/35 hover:bg-brand-black/80 transition-colors"
            />
          ))}
        </div>
      </ScrollReveal>

      {/* STICKY BOTTOM CHECKOUT TRIGGER FOR MOBILE VIEWPORT SCROLL */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-black/10 py-3.5 px-4 z-50 flex items-center justify-between gap-3 lg:hidden"
          >
            {/* Left circular or rounded pill select */}
            <div className="relative flex-1">
              <select
                value={selectedColor || ""}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full bg-[#F1EEF4] border-none text-brand-black text-[12px] font-sans font-bold py-3.5 px-4 rounded-full appearance-none outline-none cursor-pointer pr-10"
              >
                {product.colors?.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-black font-bold">
                ↓
              </div>
            </div>

            {/* Right buy CTA button */}
            <button
              onClick={() => onAddToCart(product, quantity, selectedColor)}
              className="bg-brand-black hover:bg-brand-black/95 text-white font-sans text-[12px] font-bold py-3.5 px-6 rounded-full uppercase tracking-wider flex-1 cursor-pointer transition-transform duration-150 active:scale-95 text-center truncate shadow-sm"
            >
              Add • ${product.price.toFixed(2)}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
