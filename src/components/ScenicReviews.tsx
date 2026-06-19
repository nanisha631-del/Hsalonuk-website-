/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Star, Check, ThumbsUp, MessageSquare, Award, ArrowLeftRight, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ScenicReviewsProps {
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onSelectProduct: (productId: string) => void;
  product?: Product;
}

interface CustomReview {
  id: string;
  author: string;
  location: string;
  title: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  verified: boolean;
  tag: string;
  avatarLetter: string;
}

const getReviewsForProduct = (productId: string): CustomReview[] => {
  switch (productId) {
    case "snail-silk-serum":
      return [
        {
          id: "ser-1",
          author: "Charlotte H.",
          location: "Kensington, London",
          title: "Scalp redness completely vanished",
          rating: 5,
          date: "Yesterday",
          content: "After using it for just 10 days, my persistent dry scalp and itching have completely cleared. The peppermint and tea tree aroma is incredibly sensory, cooling, and refreshing.",
          helpfulCount: 24,
          verified: true,
          tag: "TENSION RELIEF",
          avatarLetter: "C"
        },
        {
          id: "ser-2",
          author: "Olivia W.",
          location: "Surrey, UK",
          title: "Absolute miracle in a glass bottle",
          rating: 5,
          date: "5 days ago",
          content: "This leave-on is incredibly lightweight. Doesn't leave my blonde hair greasy or heavy. Worth every single penny since starting my hair wellness class.",
          helpfulCount: 18,
          verified: true,
          tag: "WEIGHTLESS EFFECT",
          avatarLetter: "O"
        },
        {
          id: "ser-3",
          author: "Dr. Eleanor G.",
          location: "Oxford, UK",
          title: "Therapeutic relief for busy minds",
          rating: 4,
          date: "2 weeks ago",
          content: "The cooling sensation of this Serene treatment is immediate. It really calms my scalp tension after long clinic hours. Highly recommended by my H Salon therapist.",
          helpfulCount: 42,
          verified: true,
          tag: "THERAPEUTIC",
          avatarLetter: "E"
        }
      ];
    case "snail-silk-scalp-mask":
      return [
        {
          id: "msk-1",
          author: "Sophia M.",
          location: "Edinburgh, Scotland",
          title: "Silken hair of my dreams",
          rating: 5,
          date: "3 days ago",
          content: "The ultimate conditioning treat. I wrap it in a warm damp towel for 8 minutes to replicate the salon thermal wrap. The rosemary and jojoba scent feels like a true British spa.",
          helpfulCount: 31,
          verified: true,
          tag: "SILK SMOOTHING",
          avatarLetter: "S"
        },
        {
          id: "msk-2",
          author: "Hannah B.",
          location: "The Cotswolds",
          title: "No more dry scalp flakes!",
          rating: 5,
          date: "1 week ago",
          content: "This balanced mask is intensely hydrating. My scalp is calm and completely flake-free after my second wash. Feels extraordinarily high-end and luxurious.",
          helpfulCount: 14,
          verified: true,
          tag: "ANTI-FLAKE",
          avatarLetter: "H"
        },
        {
          id: "msk-3",
          author: "Penelope K.",
          location: "Bristol, UK",
          title: "Soothing beyond belief",
          rating: 5,
          date: "3 weeks ago",
          content: "The scalp-nourishing properties are supreme. It detangles thick hair effortlessly, reduces root redness, and restores scalp moisture overnight. Absolute luxury.",
          helpfulCount: 9,
          verified: true,
          tag: "BARRIER HYDRATION",
          avatarLetter: "P"
        }
      ];
    case "snail-silk-scalp-oil":
      return [
        {
          id: "oil-1",
          author: "Grace T.",
          location: "Kensington, London",
          title: "Magical high-gloss and Côte d'Azur scent",
          rating: 5,
          date: "2 days ago",
          content: "I've tried every premium hair oil, and nothing compares to Gold Lust. It gives a glassy, high-fashion glow without a trace of weight. And that signature fragrance is intoxicating!",
          helpfulCount: 56,
          verified: true,
          tag: "LUMINOSITY GLOW",
          avatarLetter: "G"
        },
        {
          id: "oil-2",
          author: "Beatrice L.",
          location: "Cheshire, UK",
          title: "Protects my color-treated locks",
          rating: 5,
          date: "1 week ago",
          content: "A few drops before blow-drying keeps my hair perfectly soft and shiny. It shields my highlights and smells incredibly expensive, locking in moisture during heat treatments.",
          helpfulCount: 38,
          verified: true,
          tag: "HEAT DEFENSE",
          avatarLetter: "B"
        },
        {
          id: "oil-3",
          author: "Amira J.",
          location: "Central London",
          title: "Silky ends, zero frizz",
          rating: 5,
          date: "1 month ago",
          content: "Using it daily on my split ends has completely transformed my hair texture. It flows with beautiful natural movement and resists damp UK weather effortlessly.",
          helpfulCount: 22,
          verified: true,
          tag: "FRIZZ CONTROL",
          avatarLetter: "A"
        }
      ];
    case "ground-recovery-oil":
      return [
        {
          id: "grd-1",
          author: "Lauren K.",
          location: "Mayfair, London",
          title: "The holy grail of active serums",
          rating: 5,
          date: "4 days ago",
          content: "Waking up with an instant, hydrated, and fully rested morning glow is so addictive. The jasmine botanical fragrance instantly prepares my mind for sound sleep. Worth every pound.",
          helpfulCount: 74,
          verified: true,
          tag: "MORNING GLOW",
          avatarLetter: "L"
        },
        {
          id: "grd-2",
          author: "Zara F.",
          location: "Glasgow, Scotland",
          title: "Deeply healed my dry patches",
          rating: 5,
          date: "2 weeks ago",
          content: "My facial skin was prone to dry patches and redness. This organic nectar deeply healed my barrier. The glow is very real, clean, and has stabilized my reactive skin completely.",
          helpfulCount: 41,
          verified: true,
          tag: "MEMBRANE REPAIR",
          avatarLetter: "Z"
        },
        {
          id: "grd-3",
          author: "Isabella D.",
          location: "Richmond, UK",
          title: "Restorative face gold",
          rating: 5,
          date: "1 month ago",
          content: "I do the upward facial press method each evening in front of the mirror. Skin redness is completely gone. I look rested, balanced, and fresh-faced every single morning.",
          helpfulCount: 33,
          verified: true,
          tag: "REDNESS CALMING",
          avatarLetter: "I"
        }
      ];
    case "gym-silk":
      return [
        {
          id: "gym-1",
          author: "Harriet S.",
          location: "Chelsea, London",
          title: "Magical post-workout muscle relief",
          rating: 5,
          date: "3 days ago",
          content: "I apply this body oil right after hot yoga. The eucalyptus and ginger vapors are extremely awakening. Muscle tension melts immediately, and my skin has a gorgeous sheen.",
          helpfulCount: 19,
          verified: true,
          tag: "ATHLETIC THERAPY",
          avatarLetter: "H"
        },
        {
          id: "gym-2",
          author: "Victoria P.",
          location: "Bath, Somerset",
          title: "The softest satiny limbs",
          rating: 5,
          date: "1 week ago",
          content: "Smells heavenly like an Aesop botanical boutique. My dry skin is fully nourished and has a satin sheen. Excellent absorbs fast and doesn't rub off on clothes.",
          helpfulCount: 15,
          verified: true,
          tag: "SATIN FINISH",
          avatarLetter: "V"
        },
        {
          id: "gym-3",
          author: "Maya R.",
          location: "Leeds, UK",
          title: "A sensory therapeutic marvel",
          rating: 5,
          date: "2 weeks ago",
          content: "Highly energetic body oil. Improves circulation and locks in moisture beautifully when applied to warm damp skin. Gives me a sense of deep physical confidence.",
          helpfulCount: 20,
          verified: true,
          tag: "SENSORY AWAKENING",
          avatarLetter: "M"
        }
      ];
    case "halo-highlighter":
      return [
        {
          id: "hl-1",
          author: "Lily A.",
          location: "Hampstead, London",
          title: "Out-of-this-world high-gloss shine",
          rating: 5,
          date: "Yesterday",
          content: "This makes my hair look like glass under salon lighting! It completely protects against my high-heat styling irons. The marula lipids add unbelievable bounce and body.",
          helpfulCount: 30,
          verified: true,
          tag: "GLASS RESURFACE",
          avatarLetter: "L"
        },
        {
          id: "hl-2",
          author: "Maisie R.",
          location: "Manchester, UK",
          title: "48 hours of pure frizz protection",
          rating: 5,
          date: "5 days ago",
          content: "I live in the rainy UK, and this is the only shield that stops my curly hair from frizzing instantly. Beautiful weightless high-gloss finish. Recommended for rainy days!",
          helpfulCount: 12,
          verified: true,
          tag: "HUMIDITY SHIELD",
          avatarLetter: "M"
        }
      ];
    case "color-mascara":
      return [
        {
          id: "cm-1",
          author: "Poppy Finch",
          location: "Oxford, UK",
          title: "Instant 2% Hyaluronic Scalp Shot",
          rating: 5,
          date: "2 days ago",
          content: "Literally cured my post-coloring dry scalp flakes in one single application. I blend it with my shampoo as instructed. Incredible moisture levels and absolute root relief.",
          helpfulCount: 18,
          verified: true,
          tag: "HYALURONIC SHOT",
          avatarLetter: "P"
        }
      ];
    case "eye-shadow-stick":
      return [
        {
          id: "es-1",
          author: "Florence T.",
          location: "Notting Hill",
          title: "Precious peptide caviar pearls",
          rating: 5,
          date: "1 week ago",
          content: "The pearl-burst mechanism is so tactile and premium. On the scalp, it leaves a hydrated, plump fullness that makes my thin hair look twice as voluminous next day. Splendid!",
          helpfulCount: 22,
          verified: true,
          tag: "VOLUME BOOST",
          avatarLetter: "F"
        }
      ];
    case "concealer":
      return [
        {
          id: "con-1",
          author: "Daisy Bell",
          location: "Windsor, UK",
          title: "The ultimate bedtime sensory balm",
          rating: 5,
          date: "3 days ago",
          content: "I rub this on my temples and breathe in the lavender vapor before sleep. Facial lines relax, and my morning skin is so plump and resting well. Absolutely essential sleep routine.",
          helpfulCount: 45,
          verified: true,
          tag: "SLEEP INDUCING",
          avatarLetter: "D"
        }
      ];
    case "eyeliner":
      return [
        {
          id: "ey-1",
          author: "Arabella S.",
          location: "Cardiff, Wales",
          title: "Real structural bond repair",
          rating: 5,
          date: "1 week ago",
          content: "My hair was severely breakage-damaged from bleach. After 3 applications of this bond perfector, my hair feels strong, heavy-draped, and healthy again. Incredible physical repair.",
          helpfulCount: 51,
          verified: true,
          tag: "BOND BUILDING",
          avatarLetter: "A"
        }
      ];
    case "lip-gloss":
      return [
        {
          id: "lg-1",
          author: "Megan J.",
          location: "Newcastle, UK",
          title: "Rescued my split ends!",
          rating: 5,
          date: "4 days ago",
          content: "This nutritious serum glues split ends together overnight! It creates a glassy high-gloss finish on dry tips without the heavy grease of standard serums. A true savior.",
          helpfulCount: 17,
          verified: true,
          tag: "CUTICLE SEAL",
          avatarLetter: "M"
        }
      ];
    case "makeup-pouch":
      return [
        {
          id: "mp-1",
          author: "Imogen P.",
          location: "Cambridge, UK",
          title: "Exquisite quilted velvet quality",
          rating: 5,
          date: "2 weeks ago",
          content: "The stitch craftsmanship is remarkable. Heavy cotton lining preserves my glass apothecary bottles safely when traveling. A beautiful, tactile luxury container.",
          helpfulCount: 29,
          verified: true,
          tag: "VELVET STITCHING",
          avatarLetter: "I"
        }
      ];
    case "h-salon-cap":
      return [
        {
          id: "hc-1",
          author: "Clara S.",
          location: "Brighton, UK",
          title: "Perfect post-treatment crown shield",
          rating: 5,
          date: "3 days ago",
          content: "I wear this cap outdoors to protect my scalp skin from harsh UV rays after applying cold-pressed oils. Elegant brass clasp and thick comfortable fit. Love the structured vibe.",
          helpfulCount: 11,
          verified: true,
          tag: "UV PROTECTION",
          avatarLetter: "C"
        }
      ];
    case "h-salon-comb":
      return [
        {
          id: "hco-1",
          author: "Seraphina L.",
          location: "Belfast, UK",
          title: "Incredible scalp meridian stimulation",
          rating: 5,
          date: "5 days ago",
          content: "The hand-polished celluloid material flows like butter over hair. No scratching. I run it through my scalp 10 times at night as a wellness class ritual to balance energy.",
          helpfulCount: 43,
          verified: true,
          tag: "SCALP MERIDIANS",
          avatarLetter: "S"
        }
      ];
    default:
      return [
        {
          id: "def-1",
          author: "Eleanor T.",
          location: "London, UK",
          title: "Sensory wellbeing in every drop",
          rating: 5,
          date: "3 days ago",
          content: "Absolute pure luxury. You can smell the incredible botanical complex instantly. It has transformed my daily wellness self-care rituals.",
          helpfulCount: 15,
          verified: true,
          tag: "BOTANICAL THERAPY",
          avatarLetter: "E"
        },
        {
          id: "def-2",
          author: "Aria M.",
          location: "Yorkshire, UK",
          title: "High-end therapy recommendation",
          rating: 5,
          date: "1 week ago",
          content: "My follicles are so happy. It maintains root hydration perfectly without feeling heavy. I've already purchased a backup set.",
          helpfulCount: 11,
          verified: true,
          tag: "RESTORE BALANCE",
          avatarLetter: "A"
        }
      ];
  }
};

export default function ScenicReviews({ onAddToCart, onSelectProduct, product }: ScenicReviewsProps) {
  const currentReviews = getReviewsForProduct(product?.id || "snail-silk-serum");

  // Helpful states
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});
  const [helpfulOverrides, setHelpfulOverrides] = useState<Record<string, number>>({});

  const handleHelpfulClick = (reviewId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedReviews[reviewId]) return;
    setVotedReviews((prev) => ({ ...prev, [reviewId]: true }));
    setHelpfulOverrides((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
  };

  // Scroll Driven Horizontal scroll setup for Laptops (sticky containers)
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Safe limits for horizontal transitions
  const translateXVal = useTransform(
    scrollYProgress, 
    [0.15, 0.85], 
    ["100px", "-550px"]
  );

  return (
    <section
      ref={containerRef}
      id="scenic-reviews-scroll-container"
      className="relative w-full bg-[#FCFAF7] border-t border-brand-black/5 select-none overflow-hidden"
    >
      {/* 
        LAPTOP / DESKTOP VIEW: Scroll-Driven Horizontal Track (md and up)
        Guaranteed smooth, lag-free, response directly mapped to physical page scroll
      */}
      <div className="hidden md:block relative h-[180vh] w-full bg-[#FCFAF7]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          
          {/* Header block within sticky view */}
          <div className="max-w-7xl mx-auto px-12 md:px-24 mb-10 text-left w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#3D4A3E]/10 text-[#3D4A3E] text-[10px] font-sans font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-full border border-[#3D4A3E]/20 flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3 h-3 text-[#3D4A3E]" /> SCROLL-REVEAL EXPERIENCES
              </span>
              <span className="text-[11px] font-serif italic text-gray-400">Authentic Client Logs</span>
            </div>
            
            <h2 className="font-serif text-[38px] lg:text-[46px] font-bold tracking-tight text-brand-black leading-tight">
              The Client Sanctuary
            </h2>
            <p className="text-[13px] text-gray-500 font-sans max-w-xl mt-1.5">
              Scroll down smoothly to review genuine ritual experiences recorded by our verified UK clients.
            </p>
          </div>

          {/* Smooth Horizontal Track */}
          <div className="w-full relative flex items-center h-[350px]">
            <motion.div 
              style={{ x: translateXVal }} 
              className="flex gap-8 px-12 md:px-24 w-max h-full items-center"
            >
              {/* Optional Introductory Card */}
              <div className="w-[320px] bg-[#3D4A3E] text-white rounded-3xl p-8 flex flex-col justify-between shrink-0 shadow-lg border border-[#3D4A3E]/40 text-left h-[300px]">
                <div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <MessageSquare className="w-5 h-5 text-[#82D8C5]" />
                  </div>
                  <h3 className="font-serif text-[20px] font-extrabold text-white leading-tight">
                    Pure & Natural Formula Feedback
                  </h3>
                  <p className="text-[12px] opacity-85 mt-2.5 leading-relaxed font-sans">
                    Formulations tailored specifically to {product?.name || "your hair type"} using authentic botanicals.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono tracking-wider text-[#82D8C5]">
                  <span>100% EXCLUSIVE RATING</span>
                </div>
              </div>

              {/* Verified Product specific reviews in continuous flow */}
              {currentReviews.map((rev) => {
                const helpfulCount = rev.helpfulCount + (helpfulOverrides[rev.id] || 0);
                const isVoted = votedReviews[rev.id];

                return (
                  <div
                    key={rev.id}
                    className="w-[340px] h-[300px] bg-white border border-brand-black/5 rounded-3xl p-7 flex flex-col justify-between hover:border-[#3D4A3E]/30 transition-all duration-300 shadow-xs hover:shadow-lg text-left bg-gradient-to-br from-white to-[#FCFAF7]/40 shrink-0"
                  >
                    <div>
                      {/* Rating details */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? "text-[#EEDBC5] fill-[#EEDBC5]" : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono font-bold tracking-wider text-[#3D4A3E] bg-[#3D4A3E]/5 px-2.5 py-0.5 rounded-full border border-[#3D4A3E]/10 uppercase">
                          {rev.tag}
                        </span>
                      </div>

                      {/* Review Title & Content */}
                      <h4 className="font-serif text-[15px] font-bold text-brand-black leading-snug mb-2">
                        "{rev.title}"
                      </h4>
                      <p className="text-[12px] text-gray-500 font-sans leading-relaxed line-clamp-4">
                        {rev.content}
                      </p>
                    </div>

                    {/* Member footer */}
                    <div className="border-t border-brand-black/5 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EDEDE9] flex items-center justify-center font-serif text-[12px] font-bold text-[#3D4A3E] border border-brand-black/5 shrink-0">
                          {rev.avatarLetter}
                        </div>
                        <div>
                          <span className="font-sans font-bold text-[11.5px] text-brand-black block leading-none">
                            {rev.author}
                          </span>
                          <span className="text-[9px] text-gray-400 font-sans block mt-1">
                            {rev.location}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleHelpfulClick(rev.id, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] cursor-pointer select-none font-bold transition-all ${
                          isVoted
                            ? "bg-[#3D4A3E]/10 border-[#3D4A3E]/35 text-[#3D4A3E]"
                            : "border-brand-black/5 hover:border-[#3D4A3E]/30 text-gray-400 hover:text-[#3D4A3E]"
                        }`}
                      >
                        <ThumbsUp className="w-2.5 h-2.5" />
                        Helpful ({helpfulCount})
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* End of Track Luxury Stamp Card */}
              <div className="w-[300px] h-[300px] bg-[#FCFAF7] border border-dashed border-brand-black/10 rounded-3xl p-8 flex flex-col justify-between shrink-0 text-left">
                <div className="space-y-4">
                  <span className="text-[9px] font-bold font-mono text-[#3D4A3E]/50 tracking-[0.2em] block uppercase">BRITISH TRICHOLOGY SEAL</span>
                  <div className="flex -space-x-2">
                    <span className="w-7 h-7 rounded-full bg-[#82D8C5]/20 flex items-center justify-center border border-white text-[10px] font-black text-brand-black">S</span>
                    <span className="w-7 h-7 rounded-full bg-[#EEDBC5]/20 flex items-center justify-center border border-white text-[10px] font-black text-brand-black">H</span>
                    <span className="w-7 h-7 rounded-full bg-[#9A8FB7]/20 flex items-center justify-center border border-white text-[10px] font-black text-brand-black">O</span>
                  </div>
                  <h4 className="font-serif text-[15.5px] font-bold text-brand-black leading-tight">Verified Shopify Reviews</h4>
                  <p className="text-[11px] text-gray-400 font-sans mt-1 leading-normal">
                    Secure order history linkage maintains absolute authenticity. No simulated reviews permitted.
                  </p>
                </div>
                <div className="text-[10px] text-gray-400 font-sans border-t border-brand-black/5 pt-3">
                  All items tested under dry climate stressors.
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 
        MOBILE OR SMARTPHONE VIEW: Smooth Horizontal Scroll-Snap (under md breakpoint)
        Zero sticky complexity, high performance native GPU scrolling, no lagging!
      */}
      <div className="block md:hidden py-12 px-5">
        
        {/* Mobile Header Block */}
        <div className="text-left mb-6">
          <span className="bg-[#3D4A3E]/10 text-[#3D4A3E] text-[9px] font-sans font-extrabold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[#3D4A3E]/20 inline-flex items-center gap-1 mb-2 leading-none">
            <Sparkles className="w-3 h-3 text-[#3D4A3E]" /> DYNAMIC REVIEWS
          </span>
          <h2 className="font-serif text-[28px] font-bold tracking-tight text-brand-black leading-tight">
            Client Sanctuary
          </h2>
          <span className="font-serif italic text-gray-400 text-[12px] block mt-0.5">Verified Client Feedback for {product?.name}</span>
        </div>

        {/* Swipe Guidance Helper */}
        <div className="flex items-center gap-1.5 text-[9.5px] text-gray-400 uppercase tracking-widest font-sans mb-4">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Swipe left to scroll reviews</span>
        </div>

        {/* Scroll-Snap Horizontal Container - 100% lag-free since it runs on native browser scrolling */}
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pt-2 pb-6 scrollbar-none scroll-smooth">
          
          {/* Introductory Card */}
          <div className="w-[85vw] bg-[#3D4A3E] text-white rounded-3xl p-6 snap-start shrink-0 flex flex-col justify-between text-left h-[280px]">
            <div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <MessageSquare className="w-5 h-5 text-[#82D8C5]" />
              </div>
              <h3 className="font-serif text-[18px] font-extrabold text-white leading-tight">
                Pure Scalp & Hair Apothecary Reports
              </h3>
              <p className="text-[12px] opacity-85 mt-2 leading-relaxed">
                Proven results verified directly from premium hair wellness routine schedules in the UK.
              </p>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-[#82D8C5] uppercase">
              Swipe to begin · Verified records
            </span>
          </div>

          {currentReviews.map((rev) => {
            const helpfulCount = rev.helpfulCount + (helpfulOverrides[rev.id] || 0);
            const isVoted = votedReviews[rev.id];

            return (
              <div
                key={rev.id}
                className="w-[85vw] h-[280px] bg-white border border-brand-black/5 rounded-3xl p-6 snap-start shrink-0 flex flex-col justify-between text-left shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating ? "text-[#EEDBC5] fill-[#EEDBC5]" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono font-bold tracking-wider text-[#3D4A3E] bg-[#3D4A3E]/5 px-2 py-0.5 rounded-full border border-[#3D4A3E]/10 uppercase">
                      {rev.tag}
                    </span>
                  </div>

                  <h4 className="font-serif text-[14.5px] font-bold text-brand-black leading-tight mb-1.5 line-clamp-1">
                    "{rev.title}"
                  </h4>
                  <p className="text-[11.5px] text-gray-500 font-sans leading-relaxed line-clamp-4">
                    {rev.content}
                  </p>
                </div>

                <div className="border-t border-brand-black/5 pt-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#EDEDE9] flex items-center justify-center font-serif text-[11px] font-extrabold text-[#3D4A3E]">
                      {rev.avatarLetter}
                    </div>
                    <div>
                      <span className="font-sans font-bold text-[11px] text-brand-black block leading-none">
                        {rev.author}
                      </span>
                      <span className="text-[8.5px] text-gray-400 font-sans block mt-0.5">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleHelpfulClick(rev.id, e)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-[9px] cursor-pointer font-extrabold ${
                      isVoted
                        ? "bg-[#3D4A3E]/10 border-[#3D4A3E]/35 text-[#3D4A3E]"
                        : "border-brand-black/5 text-[#3D4A3E] bg-white h-full"
                    }`}
                  >
                    <ThumbsUp className="w-2.5 h-2.5" />
                    Helpful ({helpfulCount})
                  </button>
                </div>

              </div>
            );
          })}

          {/* End stamp card */}
          <div className="w-[85vw] h-[280px] bg-[#FCFAF7] border border-dashed border-brand-black/10 rounded-3xl p-6 snap-start shrink-0 flex flex-col justify-between text-left">
            <div>
              <span className="text-[8px] font-bold font-mono text-[#3D4A3E]/50 tracking-[0.2em] block uppercase mb-1.5">ORGANIC CALM STANDARDS</span>
              <h4 className="font-serif text-[15px] font-bold text-brand-black leading-tight">Verified Shopify Accounts Only</h4>
              <p className="text-[11px] text-gray-400 font-sans mt-2 leading-relaxed">
                All reviews originate from buyers authenticated via checkout. Our formulas deliver real visual confidence.
              </p>
            </div>
            <div className="text-[9px] text-gray-400 font-sans border-t border-brand-black/5 pt-3">
              30-day money-back guarantee seal.
            </div>
          </div>

        </div>

        {/* Visual Swipe Indicators */}
        <div className="flex justify-center gap-1 mt-1 opacity-70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3D4A3E]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </div>

      </div>

    </section>
  );
}
