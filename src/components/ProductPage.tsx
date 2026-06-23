import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Star, ChevronLeft, ChevronRight, Plus, Minus, Check, Heart, ShieldCheck, Sparkles, HelpCircle, Play, Pause, Volume2, Award, Clock, BookOpen, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import ScrollReveal from "./ScrollReveal";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";
import ScenicReviews from "./ScenicReviews";
import BundlePackSection from "./BundlePackSection";
import LuxuryButton from "./LuxuryButton";
import { useSharedState, formatPrice } from "../useSharedState";

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onSelectProduct: (productId: string) => void;
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

const getRitualForProduct = (productId: string) => {
  switch (productId) {
    case "snail-silk-serum":
      return {
        title: "The Serene Crown Calming Ritual",
        steps: [
          "Apply 4–5 drops of the Serene Scalp Treatment directly to your hair parts, focusing on areas of tension or dryness.",
          "Beloved aromatherapy: Rub leftover elixir onto your palms, cup over your face, and take 3 deep, mindful breaths of cooling peppermint and tea tree.",
          "Crown massage: Using light circular fingertip pressure, massage from your temples up to the crown for 2 minutes to stimulate oxygen flow and release mental pressure."
        ],
        benefit: "Activates instant micro-cooling relief while grounding your nervous system for ultimate serenity."
      };
    case "snail-silk-scalp-mask":
      return {
        title: "The Sensory Bathing Masque Ritual",
        steps: [
          "After cleansing, smooth a generous palmful of the Serene Scalp Masque from roots to tips.",
          "Thermal Wrap: Wrap hair in a warm, damp towel to let the active jojoba esters and quinoa proteins deeply penetrate under gentle steam.",
          "Meditation pause: Close your eyes and practice 4-7-8 breathing (inhale for 4s, hold for 7s, exhale for 8s) for 5 minutes during activation.",
          "Rinse & Restore: Rinse slowly with cool water to stimulate scalp circulation and seal the protective moisture barrier."
        ],
        benefit: "Deeply hydrates scalp moisture levels, leaving hair silken-soft and scalp intensely calm."
      };
    case "snail-silk-scalp-oil":
      return {
        title: "The Liquid Gold High-Gloss Ritual",
        steps: [
          "Warm 2–3 drops of Gold Lust Hair Oil in your palms to activate the botanical extracts.",
          "Inhale the signature Côte d'Azur fragrance, designed to evoke light and elevate sensory focus.",
          "Smooth gently through damp hair mid-shaft to ends, channeling downward motions to align hair cuticles.",
          "For therapy: Use as a nighttime restorative scalp massage, leaving overnight to heal color-treated or dry strands."
        ],
        benefit: "Provides weightless, high-gloss shine and shields locks from environmental stress."
      };
    case "ground-recovery-oil":
      return {
        title: "The Sunset Grounding Face Ritual",
        steps: [
          "Warm 3–4 drops of the active Jasmine and Rosewood oil between clean palms.",
          "Hold palms 2 inches from your nose; inhale deeply for 4 seconds, pausing, and exhaling slow tension.",
          "Press (don't rub) the oil into cheeks, forehead, and chin, using upward lifting motions toward the hair line.",
          "Using your knuckles, gently stroke down the sides of your neck to encourage lymphatic drainage and sound sleep."
        ],
        benefit: "Soothes skin redness overnight while guiding your evening thoughts into peaceful calm."
      };
    case "gym-silk":
      return {
        title: "The Active Renewal Limbs Ritual",
        steps: [
          "Post-shower, apply a generous amount of Active Body Oil to damp limbs while muscles are warm and receptive.",
          "Use firm, sweeping hand movements toward your heart to stimulate healthy lymphatic circulation.",
          "Spend extra time kneading tight shoulder knots or calf muscles, breathing in the awakening Eucalyptus & Ginger oils."
        ],
        benefit: "Invigorates sore muscle fibers and eases physical tension after high performance or exercise."
      };
    case "halo-highlighter":
      return {
        title: "The Halo Luminosity Shield Ritual",
        steps: [
          "Apply 2 pumps of Elixir Ultime into hands. Stroke from mid-lengths to the very ends of dry hair.",
          "Anti-humidity sealing: Gently press the palms against flyaways to activate the Marula-lipid protective shield.",
          "Brush through with a wide-tooth comb to distribute the nourishing camellia coat evenly."
        ],
        benefit: "Adds up to 48 hours of luxury high-gloss shine and provides solid thermal protection."
      };
    case "color-mascara":
      return {
        title: "The Intense Moisture Infusion Ritual",
        steps: [
          "Blend 3 drops of the Hydration Booster with your shampoo or apply directly as a targeted scalp shot.",
          "Massage in a slow, circular wave-like motion over the parietal bones to encourage deep scalp hydration absorption.",
          "Allow 2 minutes of quiet scalp contact before continuing with styling or rinsing."
        ],
        benefit: "Micro-targets hyper-dry zones to inject active 2% Hyaluronic Acid and restore cuticle strength."
      };
    case "eye-shadow-stick":
      return {
        title: "The Celestial Caviar Pearl Ritual",
        steps: [
          "Dispense 2-3 pumps, watching the precious peptide pearls burst and fresh active extracts fuse.",
          "Gently smooth over the scalp, moving in horizontal zones from front hairline back to the nape.",
          "Press down on the hollow acupressure point at the base of your skull for 10 seconds to relieve mental pressure."
        ],
        benefit: "Intensely regenerates hair vitality, adding a bouncy, youth-restored volume and natural polish."
      };
    case "concealer":
      return {
        title: "The Nighttime Serenity Balm Ritual",
        steps: [
          "Melt a pea-sized amount of Sleep Balm between your thumbs and index fingers, releasing therapeutic lavender vapor.",
          "Apply directly to temples, wrists, and over the collarbone.",
          "Massage the brow bone and jawline in small, soothing circular motions to release daytime facial holding patterns.",
          "Inhale deeply as the organic shea and chamomile establish a sleep-inducing atmosphere."
        ],
        benefit: "Melts away facial tension to offer an incredibly rested, organic, well-nourished morning glow."
      };
    case "eyeliner":
      return {
        title: "The Anti-Damage Shielding Ritual",
        steps: [
          "Apply a dime-sized amount to your palms and work evenly through fresh, damp hair.",
          "Anti-friction coat: Press down lightly along the hair shaft to encourage bond protection shield sealing.",
          "Air-dry or diffuse on low heat, focusing your mind on structural strength and internal resilience."
        ],
        benefit: "Patented disulfide bond repair shields your hair from heat styling and daily environmental damage."
      };
    case "lip-gloss":
      return {
        title: "The Cuticle Rescue Seal Ritual",
        steps: [
          "Apply several drops of nutritive serum directly to dry or split hair tips.",
          "Press the tips gently between flat palms to feed plant proteins and niacinamide into porous fibers.",
          "Stroke any remaining serum over frizzy crown layers to bring an instant high-gloss glaze."
        ],
        benefit: "Seals split ends immediately and protects vulnerable hair tips from high winds and dry air."
      };
    case "makeup-pouch":
      return {
        title: "The Mindful Sensory Packing Ritual",
        steps: [
          "Unzip your quilted velvet pouch slowly, enjoying the tactile feel of heavy double-stitched cotton.",
          "Arrange your glass apothecary dropper bottles, oils, and combs into their secure inside sleeves.",
          "Close the brass zip with intention, knowing your daily wellness and therapy tools are sheltered."
        ],
        benefit: "Keeps your luxurious hair therapy products organized, safe, and ready for any hotel wellness retreat."
      };
    case "h-salon-cap":
      return {
        title: "The Post-Treatment Crown Shield Ritual",
        steps: [
          "After a deep hair masque or scalp oil treatment, secure your signature cap comfortably over hair.",
          "Adjust the back brass clasp to apply a light, comforting hug to your crown bones.",
          "Wear during outdoor walks to safeguard your sensitive, nutrient-rich scalp from harsh solar UV rays and wind."
        ],
        benefit: "Protects treated follicles while creating a polished, structured look that complements your style."
      };
    case "h-salon-comb":
      return {
        title: "The Meridians Scalp Stimulation Ritual",
        steps: [
          "Hold the hand-polished celluloid comb at a 45-degree angle against your clean scalp.",
          "Stroke gently from your front hairline all the way back to the neck nape in long, continuous passes.",
          "Repeat this motion 10 times across different channels to stimulate over 60 scalp pressure meridians."
        ],
        benefit: "Perfect for distributing rich hair oils or sleeping scalp treatments evenly before rest."
      };
    default:
      return {
        title: "Signature Hair Therapy Ritual",
        steps: [
          "Integrate the botanical treatment into your weekly wellness or bathing routines with deep breathing.",
          "Massage gently using slow circular motions to stimulate target fibers.",
          "Close your eyes and focus on your inner calm."
        ],
        benefit: "Deeply restores balance, vitality, and high-gloss beauty."
      };
  }
};

export default function ProductPage({
  product,
  onBack,
  onAddToCart,
  onSelectProduct
}: ProductPageProps) {
  const { state } = useSharedState();
  const settings = getShopifySettings();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    ritual: true,
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

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // minimum swipe distance
    if (diff > threshold) {
      handleNextImage();
    } else if (diff < -threshold) {
      handlePrevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-36 md:pt-44 pb-24 px-4 md:px-12 select-none">
      
      {/* Outer Grid Container wrapped in ScrollReveal to fade in gracefully on entry */}
      <ScrollReveal className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* LEFT COLUMN: Gallery Grid Layout (Lg span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative aspect-square bg-[#E0DEDA] shadow-xs overflow-hidden group rounded-2xl"
          >
            {/* Back action badge floating nicely on top of the square image */}
            <button
              onClick={onBack}
              className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white text-brand-black border border-brand-black/5 text-[11px] font-sans font-bold py-1.5 px-3.5 shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 rounded-full cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK
            </button>

             {/* Hierarchical Sparse Status Badge (Left) */}
            {getProductBadges(product.id).leftBadge && (
              <span className="absolute top-4 right-4 z-10 bg-brand-black text-[#82D8C5] text-[9.5px] font-extrabold py-1 px-3 uppercase tracking-wider rounded-sm shadow-sm select-none">
                {getProductBadges(product.id).leftBadge}
              </span>
            )}

            {/* Small discount badge (Right, if leftBadge is missing) */}
            {!getProductBadges(product.id).leftBadge && getProductBadges(product.id).rightBadge && (
              <span className="absolute top-4 right-4 z-10 bg-[#E76F51] text-white text-[9.5px] font-black py-1 px-3 uppercase tracking-wider rounded-xs shadow-xs select-none">
                {getProductBadges(product.id).rightBadge}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 rounded-full border border-brand-black/10 bg-white/80 active:bg-white backdrop-blur-xs flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer text-brand-black z-20"
            >
              <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 rounded-full border border-brand-black/10 bg-white/80 active:bg-white backdrop-blur-xs flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer text-brand-black z-20"
            >
              <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Thumbnails list below main display */}
          <div className="flex gap-2 mt-2 justify-center w-full">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIdx(i)}
                className={`w-11 h-11 md:w-16 md:h-16 shrink-0 bg-[#E0DEDA] relative overflow-hidden transition-all duration-300 outline-none cursor-pointer rounded-lg ${
                  selectedImageIdx === i ? "ring-2 ring-brand-black ring-offset-2 ring-offset-brand-offwhite" : "opacity-75 hover:opacity-100"
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
              <span className="bg-[#82D8C5] text-white text-[10px] font-extrabold py-0.5 px-3 uppercase tracking-[0.12em] rounded-full inline-block select-none font-sans">
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
                {formatPrice(product.price, state.currency)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-sans text-[14px] text-gray-400 line-through leading-none">
                    {formatPrice(product.originalPrice, state.currency)}
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
            <LuxuryButton
              onClick={() => onAddToCart(product, quantity, selectedColor)}
              className="w-full bg-brand-black hover:bg-brand-black/95 text-white font-sans font-bold py-3 text-[12px] uppercase tracking-[0.12em] transition-all hover:scale-[1.01] active:scale-98 cursor-pointer shadow-xs rounded-full flex items-center justify-center gap-1"
            >
              ADD TO CART • {formatPrice(product.price * quantity, state.currency)}
            </LuxuryButton>
            
            <LuxuryButton
              onClick={() => {
                onAddToCart(product, quantity, selectedColor);
                alert("Redirecting securely to test checkout gateway!");
              }}
              className="w-full bg-white hover:bg-brand-black/5 border border-brand-black text-brand-black font-sans font-bold py-3 text-[12px] uppercase tracking-[0.12em] transition-all hover:scale-[1.01] active:scale-98 cursor-pointer rounded-full flex items-center justify-center shadow-xs"
            >
              BUY IT NOW
            </LuxuryButton>

            {/* Demostore Notice matching original Screenshot 3 */}
            <div className="text-center text-[10.5px] text-gray-400 font-sans tracking-wide py-1 leading-none">
              This is a demo store for Palo Alto. These products are not for sale.
            </div>
          </div>

          {/* Collapsible Tabs: DESCRIPTION, HOW TO USE, INGREDIENTS, SHIPPING & RETURNS - extremely compact */}
          <div className="flex flex-col gap-1 mt-0">
            
            {/* Therapeutic Ritual Tab */}
            {(() => {
              const ritual = getRitualForProduct(product.id);
              return (
                <div className="bg-[#EDEDE9]/75 rounded-xl transition-all duration-300 border border-[#82D8C5]/30 hover:bg-[#E4E4DC]">
                  <button
                    onClick={() => toggleTab("ritual")}
                    className="w-full flex items-center justify-between text-left font-serif text-[13px] font-bold uppercase tracking-wider text-brand-black px-4 py-2.5 cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-1.5 text-[#3D4A3E] font-extrabold text-[11px] tracking-wider uppercase font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-[#82D8C5] fill-[#82D8C5]" />
                      Therapeutic Ritual
                    </span>
                    {openTabs["ritual"] ? <Minus className="w-3.5 h-3.5 text-brand-black" /> : <Plus className="w-3.5 h-3.5 text-brand-black" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {openTabs["ritual"] && (
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
                        <div className="px-4 pb-3.5 text-[12px] text-gray-700 font-sans leading-relaxed flex flex-col gap-2.5 border-t border-brand-black/5 pt-2.5">
                          <h4 className="font-sans text-[12px] md:text-[13.5px] font-black uppercase tracking-wider text-brand-black leading-tight">
                            {ritual.title}
                          </h4>
                          <div className="flex flex-col gap-2">
                            {ritual.steps.map((step, idx) => (
                              <div key={idx} className="flex gap-2 items-start">
                                <span className="w-4.5 h-4.5 rounded-full bg-[#82D8C5]/30 text-[#2A342B] text-[9.5px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <p className="text-gray-600 text-[11.5px] leading-relaxed">{step}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-0.5 p-2 bg-white/70 rounded-lg border border-[#82D8C5]/15 text-[11px] text-gray-500 font-sans">
                            <span className="font-sans font-black uppercase text-[9px] tracking-wider text-brand-black block mb-0.5">Therapeutic Benefit</span>
                            <span className="italic">{ritual.benefit}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })()}

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
                    {formatPrice(crossSellProduct.price, state.currency)}
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

      {/* PREMIUM DYNAMIC ROUTINE BUNDLE PACK BUILDER */}
      <BundlePackSection 
        product={product}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />

      {/* 4 PREMIUM INTERACTIVE ACADEMY SECTIONS */}
      <AcademyProductEnhancements product={product} />

      {/* LUXURY SCROLL REVIEWS ANIMATION TRACK */}
      <ScenicReviews 
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        product={product}
      />

      {/* RECOMMENDATIONS CAROUSEL ROW - with ScrollReveal smooth entry */}
      <ScrollReveal className="max-w-7xl mx-auto mt-8 border-t border-brand-black/10 pt-6 px-4 md:px-12">
        <div className="mb-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">YOU MAY ALSO LIKE</span>
          <h2 className="font-sans text-[20px] md:text-[25px] font-black uppercase tracking-tight text-brand-black mt-0.5">
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
                <h3 className="font-sans text-[13px] font-black uppercase tracking-wider text-brand-black group-hover:underline">
                  {p.name}
                </h3>
                <span className="font-sans text-[13px] text-gray-500 font-semibold">
                  {formatPrice(p.price, state.currency)}
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
              Add • {formatPrice(product.price, state.currency)}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ==========================================
// 4 PREMIUM INTERACTIVE PRODUCT PAGE SECTIONS
// ==========================================

interface EnhancementIngredient {
  name: string;
  source: string;
  potency: string;
  bioavailability: string;
  description: string;
}

interface EnhancementClinicals {
  metric1: { name: string; value: number };
  metric2: { name: string; value: number };
  metric3: { name: string; value: number };
  daysData: {
    1: string;
    7: string;
    14: string;
    28: string;
  };
}

const getProductEnhancementData = (productId: string) => {
  const defaults = {
    ingredients: [
      {
        name: "Abyssine Peptide Extract",
        source: "Deep-ocean hydrothermal valleys",
        potency: "96.5% purity",
        bioavailability: "98.2%",
        description: "Deeply relieves cell distress, reducing skin sensitivity while binding broken cuticle keratin chains."
      },
      {
        name: "Bio-Mimetic Squalane",
        source: "Sustainable organic olives",
        potency: "99% active concentration",
        bioavailability: "95.0%",
        description: "Perfect biocompatible hydration that mimics the body's natural moisture mantle to preserve cuticle shine."
      },
      {
        name: "Cold-Pressed Jasminum Oil",
        source: "South of France, dawn harvest",
        potency: "Pure botanical concentrate",
        bioavailability: "92.4%",
        description: "Releases luxury aromatherapeutic scent vectors that stimulate olfactory tranquility while smoothening frizzy strands."
      }
    ] as EnhancementIngredient[],
    clinicals: {
      metric1: { name: "Fiber Tensile Strength", value: 85 },
      metric2: { name: "Scalp Moisture Retention", value: 120 },
      metric3: { name: "Micro-Redness Reduction", value: 65 },
      daysData: {
        1: "Immediate cooling sensory release. Follicular muscle contraction is lowered by 45% for direct relaxation.",
        7: "Hydration reaches a peak. Dry scalp flakes are reduced by 60%, and early hair cuticle scales lay flat.",
        14: "Dermal barrier thickness is increased. Root fibers are anchored with 78% reinforced hold.",
        28: "Complete follicular rejuvenation. Hair looks visibly lustrous, bouncy, and highly resilient against friction."
      }
    } as EnhancementClinicals
  };

  switch (productId) {
    case "snail-silk-serum":
      return {
        ingredients: [
          {
            name: "Premium Snail Secretion Filtrate",
            source: "Zero-harm organic farm runs",
            potency: "94.8% nutrient trace",
            bioavailability: "99.1%",
            description: "An incredibly potent multi-mucin complex that instantly seals microscopic fissures in both the scalp and follicle fibers."
          },
          {
            name: "Peppermint Oil Vapor",
            source: "English organic herb estates",
            potency: "Pure pharmaceutical grade",
            bioavailability: "93.0%",
            description: "Triggers instant vascular micro-stimulation, bringing cool blood oxygen back to fatigued hair parts and dull roots."
          },
          {
            name: "Botanical Saffron Flower",
            source: "Hand-harvested Kashmiri stamens",
            potency: "Ultra-potent antioxidant",
            bioavailability: "89.5%",
            description: "Protects delicate follicles from solar UV stress, neutralizes environmental pollutants, and retains natural color pitch."
          }
        ],
        clinicals: {
          metric1: { name: "Cuticle Fissure Sealing", value: 92 },
          metric2: { name: "Scalp Microvolt Stimulation", value: 110 },
          metric3: { name: "Follicular Elasticity", value: 88 },
          daysData: {
            1: "Instant 42% decrease in scalp tightness. Active menthol reserves provide ongoing sensory freshness.",
            7: "Snail proteins rebuild active amino-bonds in dry hair tips. Microscopic split-ends start binding together.",
            14: "Root moisture reserves surge. Up to 84% reduction in dry, itchy scalp spots.",
            28: "Optimal clinical hydration. Hair grows with robust structure, exceptional thickness, and rich, glassy shine."
          }
        }
      };
    case "snail-silk-scalp-mask":
      return {
        ingredients: [
          {
            name: "Hydrolyzed Quinoa Proteins",
            source: "High-altitude organic crops",
            potency: "92.0% peptide structure",
            bioavailability: "96.4%",
            description: "Encapsulates weak or chemically processed hair strands in a protective protein envelope, restoring tensile stretch."
          },
          {
            name: "English Rosemary Distillate",
            source: "Hampshire premium valleys",
            potency: "Double-distilled pure oil",
            bioavailability: "91.8%",
            description: "Highly stimulating botanical essence famous for unclogging sebum-locked hair follicles while nourishing roots."
          },
          {
            name: "Organic Aloe Vera Extract",
            source: "Volcanic soil farms",
            potency: "Cold-extracted gel 200x",
            bioavailability: "97.5%",
            description: "Imparts continuous cooling relief, instantly soothing micro-inflammation and lowering cellular thermal tension."
          }
        ],
        clinicals: {
          metric1: { name: "Sebum-Lock Elimination", value: 95 },
          metric2: { name: "Friction Damage Protection", value: 115 },
          metric3: { name: "Flake Relief Index", value: 88.5 },
          daysData: {
            1: "Immediate hair softness. Flake irritations are reduced by 50% from the first warm-towel steam bath.",
            7: "Follicle pores are purified. The natural moisture mantle is balanced, leaving hair airy and weightless.",
            14: "Strand elasticity is boosted. Hair handles thermal blowouts with 70% fewer structural snap-breaks.",
            28: "The scalp barrier is fully reinforced. Flakes drop to zero, leaving behind clean, luxurious hair growth."
          }
        }
      };
    case "snail-silk-scalp-oil":
      return {
        ingredients: [
          {
            name: "French Camellia Seed Extract",
            source: "Protected coastal cliff groves",
            potency: "A-Grade lipid extraction",
            bioavailability: "95.5%",
            description: "A decadent, non-comedogenic glaze that sinks deep into porous strands, restoring high-gloss light reflectance."
          },
          {
            name: "Saffron Flower Concentrate",
            source: "Organic Mediterranean valleys",
            potency: "Pure botanical active",
            bioavailability: "87.0%",
            description: "Revitalizes hair cuticle colors, enhancing healthy golden, dark, or copper highlights with natural brilliance."
          },
          {
            name: "Cold-Pressed Moroccan Argan",
            source: "Empowered women's cooperatives",
            potency: "First-press virgin luxury",
            bioavailability: "94.2%",
            description: "Infuses high-concentrations of Vitamin E and essential omega-lipids to anchor weak hair shafts tightly in place."
          }
        ],
        clinicals: {
          metric1: { name: "High-Gloss Brilliance", value: 150 },
          metric2: { name: "Thermal Defense Barrier", value: 95 },
          metric3: { name: "Frizz Humidity Control", value: 125 },
          daysData: {
            1: "Ultra-velvet glaze forms on hair surface. Light reflection is increased by 60% with zero heavy buildup.",
            7: "Nutrients lock deep into dry mid-shafts. Split end breakage is reduced by 72% under styling stress.",
            14: "The hair shaft is perfectly sealed. Moisture remains locked, defying dry winter air or styling high-heat.",
            28: "Breathtaking luminosity and strength. Hair flows fluidly and requires 85% less styling detangle effort."
          }
        }
      };
    case "ground-recovery-oil":
      return {
        ingredients: [
          {
            name: "Night-Harvest Jasmyn Blossom",
            source: "Premium southern gardens",
            potency: "Pure absolute concrete",
            bioavailability: "93.4%",
            description: "Soothes raw skin layers while releasing warm sweet olfactory signals that guide brain waves into deep sleep states."
          },
          {
            name: "Kupang Sandalwood Extract",
            source: "Regenerated natural forests",
            potency: "98% beta-santalol purity",
            bioavailability: "90.0%",
            description: "A thick, healing oil that reduces cellular heat and calms skin redness, making it perfect for sensitive crowns."
          },
          {
            name: "Evening Primrose Seed Oil",
            source: "UK organic fields",
            potency: "Cold-pressed organic",
            bioavailability: "94.8%",
            description: "High in GLA, this repairs dry cellular lipid membranes, ensuring incredible morning elasticity and skin suppleness."
          }
        ],
        clinicals: {
          metric1: { name: "Overnight Cellular Healing", value: 130 },
          metric2: { name: "Redness Soothing Index", value: 85 },
          metric3: { name: "Dermal Suppleness", value: 98 },
          daysData: {
            1: "Instant neural calming. Sleep quality is boosted by warm botanical scent-therapy during inhalation.",
            7: "Dry patch scaling is lowered by 65%. Redness around temples and forehead looks noticeably calmer.",
            14: "The lipid moisture barrier is completely rebuilt, stopping dry heat moisture loss overnight.",
            28: "Awake to an incredibly healthy, smooth skin glow with restored cellular bounce and flawless balance."
          }
        }
      };
    case "gym-silk":
      return {
        ingredients: [
          {
            name: "Encapsulated Peppermint & Eucalyptus",
            source: "High-level organic distillers",
            potency: "Continuous-release active",
            bioavailability: "96.0%",
            description: "Triggers active thermal cooling receptors in fatigued muscles, providing long-term relief from physical tension."
          },
          {
            name: "Awakening Ginger Rhizome",
            source: "Tropical mountain crops",
            potency: "Pure CO2 super-critical extract",
            bioavailability: "92.5%",
            description: "A highly warming circulatory agent that mobilizes blood flow to stiff joints, encouraging rapid recovery."
          },
          {
            name: "Golden Safflower Lipid Serum",
            source: "Organic UK valleys",
            potency: "High-linoleic active",
            bioavailability: "95.1%",
            description: "Fights cellular stress and repairs dry skin, making limbs feel satiny, radiant, and incredibly soft after exercise."
          }
        ],
        clinicals: {
          metric1: { name: "Muscle Relief Sensation", value: 110 },
          metric2: { name: "Dermal Elasticity", value: 85 },
          metric3: { name: "Vascular Circulation Boost", value: 100 },
          daysData: {
            1: "Immediate tissue cooling. Post-workout muscle tightness is relieved by 55% during hand massage.",
            7: "Sweat-induced skin irritations or blockages are cleared. Skin on joints feels smooth and healthy.",
            14: "Improves fluid drainage, helping to shape and energize tired legs after long standing or workouts.",
            28: "Stronger skin structure with complete muscle recovery. Body skin glows with athletic, hydrated health."
          }
        }
      };
    default:
      return defaults;
  }
};

interface AcademyProductEnhancementsProps {
  product: Product;
}

export function AcademyProductEnhancements({ product }: AcademyProductEnhancementsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundscape, setSoundscape] = useState<"rain" | "wind" | "silence">("rain");
  const [playbackProgress, setPlaybackProgress] = useState(35);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [breathState, setBreathState] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathProgress, setBreathProgress] = useState(0);

  const [activeDay, setActiveDay] = useState<1 | 7 | 14 | 28>(1);
  const [activeIngredientIdx, setActiveIngredientIdx] = useState<number>(0);

  // Quiz States
  const [quizStep, setQuizStep] = useState<"intro" | "q1" | "q2" | "result">("intro");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizLoading, setQuizLoading] = useState(false);

  // Audio Context synthesis references
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<{
    noiseNode?: AudioNode;
    oscNodes?: OscillatorNode[];
    gainNode?: GainNode;
    filterNode?: BiquadFilterNode;
  }>({});

  const stopAudio = () => {
    if (soundNodesRef.current.gainNode) {
      try {
        const now = audioContextRef.current?.currentTime || 0;
        soundNodesRef.current.gainNode.gain.setValueAtTime(soundNodesRef.current.gainNode.gain.value, now);
        soundNodesRef.current.gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      } catch (e) {}
    }
    setTimeout(() => {
      if (soundNodesRef.current.noiseNode) {
        try { (soundNodesRef.current.noiseNode as any).stop(); } catch (e) {}
        soundNodesRef.current.noiseNode = undefined;
      }
      if (soundNodesRef.current.oscNodes) {
        soundNodesRef.current.oscNodes.forEach((osc) => {
          try { osc.stop(); } catch (e) {}
        });
        soundNodesRef.current.oscNodes = [];
      }
    }, 350);
  };

  const startAudio = (selectedSound?: string) => {
    stopAudio();
    const soundType = selectedSound || soundscape;
    
    setTimeout(() => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.4); // Friendly, gentle loudness filter
        mainGain.connect(ctx.destination);
        soundNodesRef.current.gainNode = mainGain;

        if (soundType === "rain") {
          // Synthesis of comforting Pink Noise representing the UK Rain drops
          const bufferSize = 2 * ctx.sampleRate;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11; // normalise filter response
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1400, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(mainGain);
          whiteNoise.start(0);
          soundNodesRef.current.noiseNode = whiteNoise;

        } else if (soundType === "wind") {
          // Wind multi-oscillator low frequencies for Calm Forest atmosphere
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const lowMod = ctx.createOscillator();
          const modGain = ctx.createGain();

          osc1.type = "sine";
          osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 wind bass

          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(111, ctx.currentTime); // Beat frequencies stimulation

          lowMod.type = "sine";
          lowMod.frequency.setValueAtTime(0.18, ctx.currentTime); // LFO wind speed breathing
          modGain.gain.setValueAtTime(18, ctx.currentTime);

          lowMod.connect(modGain);
          modGain.connect(osc1.frequency);
          modGain.connect(osc2.frequency);

          const windFilter = ctx.createBiquadFilter();
          windFilter.type = "bandpass";
          windFilter.frequency.setValueAtTime(320, ctx.currentTime);
          windFilter.Q.setValueAtTime(1.8, ctx.currentTime);

          osc1.connect(windFilter);
          osc2.connect(windFilter);
          windFilter.connect(mainGain);

          osc1.start(0);
          osc2.start(0);
          lowMod.start(0);

          soundNodesRef.current.oscNodes = [osc1, osc2, lowMod];

        } else if (soundType === "silence") {
          // Pure 432Hz sine frequency with a soft 8Hz Theta wave binaural pulsing representing Deep Mist
          const osc = ctx.createOscillator();
          const binauralMod = ctx.createOscillator();
          const modGain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(432, ctx.currentTime);

          binauralMod.type = "sine";
          binauralMod.frequency.setValueAtTime(6, ctx.currentTime);
          modGain.gain.setValueAtTime(0.08, ctx.currentTime);

          binauralMod.connect(modGain);
          modGain.connect(mainGain.gain);

          osc.connect(mainGain);
          osc.start(0);
          binauralMod.start(0);

          soundNodesRef.current.oscNodes = [osc, binauralMod];
        }
      } catch (e) {
        console.error("Failed to start sound synthesis", e);
      }
    }, 50);
  };

  useEffect(() => {
    if (isPlaying) {
      startAudio();
    } else {
      stopAudio();
    }
  }, [isPlaying, soundscape]);

  // Handle unmount & view changes
  useEffect(() => {
    return () => {
      // Gentle audio stop on unmounting
      if (soundNodesRef.current.gainNode && audioContextRef.current) {
        try {
          soundNodesRef.current.gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        } catch (e) {}
      }
      if (soundNodesRef.current.noiseNode) {
        try { (soundNodesRef.current.noiseNode as any).stop(); } catch (e) {}
      }
      if (soundNodesRef.current.oscNodes) {
        soundNodesRef.current.oscNodes.forEach((osc) => {
          try { osc.stop(); } catch (e) {}
        });
      }
    };
  }, []);

  const data = getProductEnhancementData(product.id);

  // Simple interval to simulate audio progress
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Breathing masterclass loop
  useEffect(() => {
    let timer: any;
    if (isVideoModalOpen) {
      timer = setInterval(() => {
        setBreathProgress((prev) => {
          if (prev >= 100) {
            setBreathState((current) => {
              if (current === "inhale") return "hold";
              if (current === "hold") return "exhale";
              return "inhale";
            });
            return 0;
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isVideoModalOpen, breathState]);

  const handleNextQuiz = (key: string, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [key]: value }));
    if (quizStep === "q1") {
      setQuizStep("q2");
    } else if (quizStep === "q2") {
      setQuizLoading(true);
      setTimeout(() => {
        setQuizLoading(false);
        setQuizStep("result");
      }, 1000);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizStep("intro");
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 border-t border-brand-black/10 pt-10 px-4 md:px-12 select-none">
      
      {/* SECTION 1: THE ACADEMY SANCTUARY (VISUAL CLASS & THERAPEUTIC SOUNDSCAPE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14" id="academy-sanctuary">
        
        {/* Left Video Masterclass & Academy Info */}
        <div className="lg:col-span-7 bg-[#2A342B] text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group shadow-md border border-[#82D8C5]/10">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#82D8C5]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-12 bottom-0 w-48 h-48 bg-[#9A8FB7]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#82D8C5]/20 text-[#82D8C5] text-[10px] uppercase font-sans font-bold tracking-[0.2em] px-2.5 py-1 rounded-full border border-[#82D8C5]/30">
                UK Academy Live
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5] animate-ping" />
            </div>
            
            <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[#EEDBC5] leading-tight mb-3">
              Women's Calmness & Hair Sanctuary
            </h3>
            <p className="text-[12px] md:text-[13px] text-gray-300 leading-relaxed max-w-xl mb-6 font-sans">
              Designed as parts of our London & UK group classes, we integrate custom-formed botanical elixirs with clinical restorative rituals, breathing exercises, and sensory soundscapes. Experience deep healing therapy at home.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-[#82D8C5]/10 border border-[#82D8C5]/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-[#82D8C5]" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-[12.5px] font-bold text-white">Interactive Breathing Masterclass</h4>
                <p className="text-[10px] text-gray-400 font-sans">Learn raw hair stimulation & sensory calming</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsVideoModalOpen(true);
                setBreathState("inhale");
                setBreathProgress(0);
              }}
              className="bg-[#82D8C5] hover:bg-[#6fc4b1] text-brand-black text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Start Micro-Class
            </button>
          </div>
        </div>

        {/* Right Active Soundscape Player */}
        <div className="lg:col-span-5 bg-[#F6F6F2] border border-brand-black/10 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#82D8C5]/30 transition-all">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-black tracking-[0.16em] text-[#82D8C5] uppercase font-sans">SENSORY REJUVENATION</span>
                <h3 className="font-sans text-[20px] font-black text-brand-black uppercase tracking-tight mt-0.5">Atmosphere Soundscape</h3>
              </div>
              <Volume2 className={`w-4 h-4 text-brand-black ${isPlaying ? "animate-pulse" : "opacity-40"}`} />
            </div>

            <p className="text-[11.5px] text-gray-500 font-sans leading-relaxed mb-5">
              Tap into your scalp therapeutic ritual. Turn on an organic wellness soundscape calibrated specifically to clear cognitive noise.
            </p>

            {/* Choose Ambient Sound */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: "rain", label: "UK Rain", info: "8Hz Frequency" },
                { id: "wind", label: "Calm Forest", info: "Theta Resonance" },
                { id: "silence", label: "Deep Mist", info: "432Hz Tone" }
              ].map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => {
                    setSoundscape(sound.id as any);
                    if (!isPlaying) setIsPlaying(true);
                  }}
                  className={`px-3 py-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer duration-300 ${
                    soundscape === sound.id 
                      ? "border-[#82D8C5] bg-[#82D8C5]/15 text-brand-black font-black" 
                      : "border-brand-black/10 bg-white/60 text-gray-400 hover:text-brand-black hover:border-brand-black/30"
                  }`}
                >
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider">{sound.label}</span>
                  <span className="text-[8px] opacity-70 font-sans">{sound.info}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-brand-black/5 flex flex-col gap-3">
            {/* Visual Equalizer Sim */}
            <div className="flex justify-center items-center gap-1 h-6">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: isPlaying ? `${Math.sin(playbackProgress + i) * 10 + 12}px` : "3px",
                    transition: "height 0.15s ease-in-out"
                  }}
                  className={`w-1 rounded-full ${soundscape === "rain" ? "bg-[#82D8C5]" : soundscape === "wind" ? "bg-[#82D8C5]/75" : "bg-brand-black"}`}
                />
              ))}
            </div>

            {/* Progress and control */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-brand-black text-white flex items-center justify-center cursor-pointer shrink-0"
              >
                {isPlaying ? <Pause className="w-4.5 h-4.5 fill-current" /> : <Play className="w-4.5 h-4.5 fill-current ml-0.5" />}
              </button>
              <div className="flex-1">
                <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono mb-1">
                  <span>AMBIENCE CALIBRATED</span>
                  <span>{isPlaying ? "01:21" : "PAUSED"}</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-black rounded-full" style={{ width: `${playbackProgress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: INTERACTIVE BOTANICAL POTENCY & BIO-ABSORPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 border-t border-brand-black/5 pt-10" id="botanical-potency">
        
        {/* Left title section */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">ORGANIC COMPLEXITY</span>
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-brand-black leading-tight mt-1 mb-3">
            Active Botanical Potency Key
          </h3>
          <p className="text-[12px] md:text-[13px] text-gray-500 leading-relaxed font-sans mb-4">
            We isolate and combine precious clinical nutrients. Select key bioactive botanical elements below to see molecular sourcing details, clinical potency ratios, and bio-absorption ratings.
          </p>
          <div className="flex gap-2">
            <span className="text-[11px] font-sans font-bold uppercase text-[#82D8C5] bg-[#82D8C5]/10 px-2.5 py-1 rounded-full border border-[#82D8C5]/20">
              100% Traceable
            </span>
            <span className="text-[11px] font-sans font-bold uppercase text-[#9A8FB7] bg-[#9A8FB7]/10 px-2.5 py-1 rounded-full border border-[#9A8FB7]/20">
              Bio-Compatible
            </span>
          </div>
        </div>

        {/* Right Clickable Ingredient Cards */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {data.ingredients.map((ing, idx) => {
            const isSelected = activeIngredientIdx === idx;
            return (
              <div
                key={ing.name}
                onClick={() => setActiveIngredientIdx(idx)}
                className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col text-left ${
                  isSelected 
                    ? "border-[#82D8C5] bg-white shadow-sm" 
                    : "border-brand-black/5 bg-[#EDEDE9]/35 hover:bg-[#EDEDE9]/70"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#82D8C5]/10 text-[#3D4A3E] font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <h4 className="font-serif text-[15px] md:text-[17px] font-bold text-[#2A342B]">
                      {ing.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#82D8C5] tracking-tight">
                    {ing.potency}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3.5 mt-3 border-t border-brand-black/5 flex flex-col gap-3">
                        <p className="text-[12px] text-gray-600 font-sans leading-relaxed">
                          {ing.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div className="bg-[#EDEDE9]/50 p-2.5 rounded-xl border border-brand-black/5">
                            <span className="block text-[8px] font-bold uppercase text-gray-400 font-sans">Sourcing Estate</span>
                            <span className="text-[11px] font-serif italic text-brand-black font-semibold">{ing.source}</span>
                          </div>
                          <div className="bg-[#EDEDE9]/50 p-2.5 rounded-xl border border-brand-black/5">
                            <span className="block text-[8px] font-bold uppercase text-gray-400 font-sans">Absorption Rate</span>
                            <span className="text-[11.5px] font-sans font-extrabold text-[#3D4A3E]">{ing.bioavailability} Bioavailability</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

      {/* SECTION 3: CLINICAL PERFORMANCE & RESTORATIVE SCALP TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 border-t border-brand-black/5 pt-10" id="clinical-performance">
        
        {/* Left Interactive Graph Gages */}
        <div className="lg:col-span-5 bg-white border border-brand-black/5 p-6 rounded-2xl shadow-xs">
          <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase font-sans">CLINICAL STABILITY REPORT</span>
          <h3 className="font-serif text-[18px] font-bold text-brand-black mb-6">Restorative Bio-Targeting</h3>
          
          <div className="flex flex-col gap-4">
            {/* Metric 1 */}
            <div>
              <div className="flex justify-between items-center text-[10px] font-sans font-bold text-gray-500 uppercase mb-1">
                <span>{data.clinicals.metric1.name}</span>
                <span className="text-brand-black">+{data.clinicals.metric1.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(data.clinicals.metric1.value, 100)}%` }}
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-[#82D8C5] rounded-full" 
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="flex justify-between items-center text-[10px] font-sans font-bold text-gray-500 uppercase mb-1">
                <span>{data.clinicals.metric2.name}</span>
                <span className="text-brand-black">+{data.clinicals.metric2.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(data.clinicals.metric2.value, 100)}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-full bg-[#9A8FB7] rounded-full" 
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="flex justify-between items-center text-[10px] font-sans font-bold text-gray-500 uppercase mb-1">
                <span>{data.clinicals.metric3.name}</span>
                <span className="text-brand-black">+{data.clinicals.metric3.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(data.clinicals.metric3.value, 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-full bg-brand-black rounded-full" 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-black/5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#82D8C5]" />
            <span className="text-[10px] text-gray-400 font-sans uppercase">SGS DERMATOLOGICAL LAB REGISTERED</span>
          </div>
        </div>

        {/* Right Day Selection Timeline */}
        <div className="lg:col-span-7 text-left flex flex-col justify-between h-full lg:pl-4">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gray-400">CHRONOLOGICAL PERFORMANCE</span>
            <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-brand-black leading-tight mt-1 mb-3">
              The 28-Day Structural Evolution
            </h3>
            <p className="text-[12px] md:text-[13px] text-gray-500 leading-relaxed font-sans mb-6">
              Track the clinical physical updates your hair, follicles, and scalp tissue undergo during daily wellness contact. Click each milestone cycle below to examine the changes:
            </p>

            {/* Day Selector Pill Bar */}
            <div className="flex items-center gap-2 p-1 bg-[#EDEDE9]/50 rounded-2xl max-w-sm mb-6 border border-brand-black/5 justify-between">
              {([1, 7, 14, 28] as const).map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`flex-1 rounded-xl py-2 px-2 text-center font-sans font-bold text-[11px] uppercase transition-colors shrink-0 cursor-pointer ${
                    activeDay === day 
                      ? "bg-brand-black text-white shadow-xs" 
                      : "text-gray-500 hover:text-brand-black"
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Description Details Card */}
          <div className="bg-[#EDEDE9]/30 rounded-2xl p-5 border border-brand-black/5 min-h-[110px] flex gap-4 items-start transition-all">
            <div className="w-10 h-10 rounded-full bg-[#82D8C5]/10 text-brand-black flex items-center justify-center shrink-0 border border-[#82D8C5]/30">
              <Clock className="w-5 h-5 text-brand-black" />
            </div>
            <div>
              <h4 className="font-serif text-[14px] font-bold text-[#3D4A3E] uppercase tracking-wide mb-1">
                {activeDay === 1 ? "Phase 1: Immediate Activation" : activeDay === 7 ? "Phase 2: Cellular Hydration" : activeDay === 14 ? "Phase 3: Lipid Enclosure" : "Phase 4: Absolute Restructure"}
              </h4>
              <p className="text-[12px] text-gray-600 font-sans leading-relaxed">
                {data.clinicals.daysData[activeDay]}
              </p>
            </div>
          </div>
        </div>

      </div>



      {/* INTERACTIVE VIDEO MASTERCLASS MODAL OVERLAY */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#2A342B] text-white max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-[#82D8C5]/20 p-6 flex flex-col gap-5 text-center relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-white/75 hover:text-white font-sans font-bold text-[11px] uppercase tracking-wider bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                Close ×
              </button>

              <div className="mt-4">
                <span className="text-[9px] font-bold tracking-widest text-[#82D8C5] uppercase font-sans">LIVE FROM LONDON HEADQUARTERS</span>
                <h3 className="font-serif text-[20px] font-bold text-[#EEDBC5] mt-1">Calmness & Hair Simulation</h3>
              </div>

              {/* Breathing Expansion Circle animation */}
              <div className="flex flex-col items-center justify-center py-8 relative">
                <motion.div
                  animate={{
                    scale: breathState === "inhale" ? 1.4 : breathState === "hold" ? 1.4 : 1,
                    backgroundColor: breathState === "inhale" ? "rgba(130, 216, 197, 0.25)" : breathState === "hold" ? "rgba(154, 143, 183, 0.25)" : "rgba(130, 216, 197, 0.08)"
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="w-28 h-28 rounded-full border border-[#82D8C5]/30 flex flex-col items-center justify-center"
                >
                  <span className="font-serif text-[14px] italic text-[#EEDBC5] font-extrabold capitalize">
                    {breathState}
                  </span>
                  <span className="text-[8px] text-gray-300 font-sans uppercase tracking-[0.15em] mt-0.5">
                    {breathState === "inhale" ? "Breathe In" : breathState === "hold" ? "Hold Space" : "Release"}
                  </span>
                </motion.div>
                
                {/* Progress dot orbit simulation */}
                <div className="w-32 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-[#82D8C5] rounded-full transition-all duration-200" style={{ width: `${breathProgress}%` }} />
                </div>
              </div>

              <div className="text-left bg-white/5 border border-white/10 p-3 rounded-2xl flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#82D8C5]/10 text-[#82D8C5] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">!</span>
                <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                  Focus on your crown. Apply {product.name} gently during this cycle to double muscle relaxation and increase biochemical scalp uptake.
                </p>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-[#82D8C5] hover:bg-[#6fc4b1] text-brand-black text-[11px] font-bold uppercase tracking-wider py-3 rounded-full cursor-pointer font-sans transition-colors"
              >
                Complete Session
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

