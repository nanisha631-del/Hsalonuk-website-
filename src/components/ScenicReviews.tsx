/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Star, Check, ThumbsUp, MessageSquare, Award, ArrowLeftRight, Sparkles, Upload, X, Image as ImageIcon, Film } from "lucide-react";
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
  mediaUrl?: string;
  mediaType?: "image" | "video" | null;
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
    case "pure-balance-ritual-face-scalp-hair":
      return [
        {
          id: "pbr-1",
          author: "Isabella K.",
          location: "Richmond, London",
          title: "My holy grail luxury crown reset",
          rating: 5,
          date: "Yesterday",
          content: "Absolute pure perfection for face and scalp. Waking up with a hydrated, fully relaxed morning glow and silken hair is so addicting. The Lavender and Snail Silk Proteins feel extraordinarily expensive.",
          helpfulCount: 52,
          verified: true,
          tag: "COMPLETE RECOVERY",
          avatarLetter: "I"
        },
        {
          id: "pbr-2",
          author: "Camilla P.",
          location: "Belgravia, UK",
          title: "The complete luxury spa at home",
          rating: 5,
          date: "4 days ago",
          content: "My face redness has completely faded and my scalp dry patches are totally gone. The fragrance is incredibly rich and calming. Worth every single pound!",
          helpfulCount: 37,
          verified: true,
          tag: "HIGH-END BOTANICALS",
          avatarLetter: "C"
        },
        {
          id: "pbr-3",
          author: "Lady Georgina L.",
          location: "Chelsea, London",
          title: "Sovereign skin & hair rejuvenator",
          rating: 5,
          date: "2 weeks ago",
          content: "I follow the 20-minute nighttime wellness protocol with the comb and elixirs. My skin glows with athletic hydrated health and my hair has a gorgeous mirror gloss. Outstanding and authentic.",
          helpfulCount: 61,
          verified: true,
          tag: "SOVEREIGN GLOW",
          avatarLetter: "G"
        }
      ];
    case "hair-and-scalp-circulation-set":
      return [
        {
          id: "hcc-1",
          author: "Chloe J.",
          location: "Bath, UK",
          title: "Incredible growth and thickness results",
          rating: 5,
          date: "Just now",
          content: "This combination has completely reversed my thinning hair strands. The microcirculation massage tool with the peppermint oil stimulates the roots like magic.",
          helpfulCount: 19,
          verified: true,
          tag: "GROWTH SYNERGY",
          avatarLetter: "C"
        },
        {
          id: "hcc-2",
          author: "Seraphina M.",
          location: "Windsor, UK",
          title: "Highly energetic scalp therapy",
          rating: 5,
          date: "6 days ago",
          content: "The argan oil and massage tool are highly therapeutic. My scalp tension disappears immediately after my class session, leaving roots deeply moisturized.",
          helpfulCount: 22,
          verified: true,
          tag: "TEMPLE RELIEF",
          avatarLetter: "S"
        }
      ];
    case "hair-growth-set":
      return [
        {
          id: "hgs-1",
          author: "Amelie B.",
          location: "Hampstead, London",
          title: "Stopped my premature shedding!",
          rating: 5,
          date: "2 days ago",
          content: "I've been massaging this peptide-enriched serum into my scalp roots daily. My hair fall has decreased by half in just three weeks and has a noticeable bounce.",
          helpfulCount: 42,
          verified: true,
          tag: "ANTI-SHEDDING",
          avatarLetter: "A"
        },
        {
          id: "hgs-2",
          author: "Jessica T.",
          location: "Edinburgh, Scotland",
          title: "Superb volume booster",
          rating: 5,
          date: "1 week ago",
          content: "Rebuilds and fortifies weak, broken fibers effortlessly. My hair ends feel heavy and thick, and my roots have amazing lift.",
          helpfulCount: 31,
          verified: true,
          tag: "VOLUME BOOSTER",
          avatarLetter: "J"
        }
      ];
    case "scalp-care-bundle":
      return [
        {
          id: "scb-1",
          author: "Fiona D.",
          location: "Surrey, UK",
          title: "Relieved my chronic dry scalp flakes",
          rating: 5,
          date: "3 days ago",
          content: "After years of trying medicated coal tar shampoos, this luxury peppermint and chamomile bundle is the only thing that cured my redness and irritation. Totally worth it.",
          helpfulCount: 28,
          verified: true,
          tag: "FLAKE CONTROL",
          avatarLetter: "F"
        },
        {
          id: "scb-2",
          author: "Aveline R.",
          location: "Mayfair, London",
          title: "Soothing beyond measure",
          rating: 5,
          date: "2 weeks ago",
          content: "Leaves the scalp feeling calm and icy clean and the hair beautifully soft and silken-smooth. Color and keratin safe, no nasty sulfates.",
          helpfulCount: 16,
          verified: true,
          tag: "BARRIER CALMING",
          avatarLetter: "A"
        }
      ];
    case "scalp-massage-set":
      return [
        {
          id: "sms-1",
          author: "Eleanor S.",
          location: "The Cotswolds",
          title: "Heavenly root meridian stimulation",
          rating: 5,
          date: "Yesterday",
          content: "Perfect grooming comb paired with the organic stimulating oil feels heavenly. I glide them gently before bed with 10 slow strokes to activate scalp pressure points.",
          helpfulCount: 34,
          verified: true,
          tag: "MERIDIAN PATHWAYS",
          avatarLetter: "E"
        },
        {
          id: "sms-2",
          author: "Beatrice G.",
          location: "Cheshire, UK",
          title: "My night scalp massage ritual is complete",
          rating: 5,
          date: "5 days ago",
          content: "Helps calm my busy mind completely. The scent is of high-end boutique botanicals, and my comb glides like absolute glass.",
          helpfulCount: 19,
          verified: true,
          tag: "SENSORY REST",
          avatarLetter: "B"
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
  const [customReviews, setCustomReviews] = React.useState<CustomReview[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(`custom_reviews_${product?.id || "snail-silk-serum"}`);
      setCustomReviews(stored ? JSON.parse(stored) : []);
    } catch (e) {
      setCustomReviews([]);
    }
  }, [product?.id]);

  const staticReviews = getReviewsForProduct(product?.id || "snail-silk-serum");
  const currentReviews = [...customReviews, ...staticReviews];

  // Helpful states
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});
  const [helpfulOverrides, setHelpfulOverrides] = useState<Record<string, number>>({});

  // Form states for adding review
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("HONEST EXPERIENCES");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Media states
  const [newMediaUrl, setNewMediaUrl] = useState<string>("");
  const [newMediaType, setNewMediaType] = useState<"image" | "video" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith("video/") ? "video" : "image";
    setNewMediaType(fileType);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewMediaUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveMedia = () => {
    setNewMediaUrl("");
    setNewMediaType(null);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newContent) return;

    setIsSubmitting(true);

    // Simulate luxury brand review authentication and posting latency
    setTimeout(() => {
      const newReview: CustomReview = {
        id: `custom-${Date.now()}`,
        author: newAuthor,
        location: newLocation || "Verified UK Client",
        title: newTitle,
        rating: newRating,
        date: "Just now",
        content: newContent,
        helpfulCount: 0,
        verified: true,
        tag: newTag.toUpperCase() || "VERIFIED CUSTOMER",
        avatarLetter: newAuthor.charAt(0).toUpperCase() || "C",
        mediaUrl: newMediaUrl || undefined,
        mediaType: newMediaType || undefined
      };

      const updated = [newReview, ...customReviews];
      setCustomReviews(updated);

      try {
        localStorage.setItem(`custom_reviews_${product?.id || "snail-silk-serum"}`, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form fields
      setNewRating(5);
      setNewAuthor("");
      setNewLocation("");
      setNewTitle("");
      setNewContent("");
      setNewTag("HONEST EXPERIENCES");
      setNewMediaUrl("");
      setNewMediaType(null);

      // Close modal after 1.5s success visual feedback
      setTimeout(() => {
        setIsWriteReviewOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    }, 800);
  };

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
        Write a Review Overlay Modal
      */}
      <AnimatePresence>
        {isWriteReviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant soft dark blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isSubmitting) setIsWriteReviewOpen(false); }}
              className="absolute inset-0 bg-brand-black/45 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FCFAF7] text-brand-black rounded-3xl w-full max-w-lg p-7 sm:p-8 relative shadow-2xl border border-brand-black/5 z-10 max-h-[90vh] overflow-y-auto scrollbar-none"
            >
              {/* Close Button */}
              <button
                disabled={isSubmitting}
                type="button"
                onClick={() => setIsWriteReviewOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-brand-black/5 hover:bg-brand-black/10 flex items-center justify-center text-brand-black transition-colors cursor-pointer"
              >
                <span className="font-sans text-lg font-bold">×</span>
              </button>

              <div className="text-left">
                <span className="text-[#3D4A3E] text-[9px] font-sans font-black uppercase tracking-[0.2em] bg-[#3D4A3E]/10 px-3 py-1 rounded-full border border-[#3D4A3E]/20 inline-flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3 h-3 text-[#3D4A3E]" /> AUTHENTIC CLIENT FEEDBACK
                </span>
                <h3 className="font-sans text-2xl font-black uppercase tracking-tight text-brand-black leading-tight">
                  Share Your Ritual
                </h3>
                <p className="text-[11.5px] text-gray-400 font-sans mt-1 leading-normal">
                  Record your honest formulation review for <span className="font-bold text-brand-black">{product?.name}</span>.
                </p>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#82D8C5]/20 flex items-center justify-center text-[#3D4A3E] border border-[#82D8C5]/30">
                    <Check className="w-8 h-8 text-[#3D4A3E]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[15px] font-black uppercase tracking-wider text-brand-black">Review Published Live!</h4>
                    <p className="text-xs text-gray-500 mt-1">Thank you. Your authentic experience has been recorded successfully.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5 text-left">
                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer text-[#82D8C5]"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? "text-[#82D8C5] fill-[#82D8C5]" : "text-gray-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Review Headline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Cured my dry skin instantly!"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white/70 border border-brand-black/10 rounded-xl px-4 py-2.5 text-xs font-sans text-brand-black focus:outline-none focus:border-[#3D4A3E] transition-all"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Your Experience</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience using this formulation..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-white/70 border border-brand-black/10 rounded-xl px-4 py-2.5 text-xs font-sans text-brand-black focus:outline-none focus:border-[#3D4A3E] transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Author Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Charlotte H."
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-white/70 border border-brand-black/10 rounded-xl px-4 py-2.5 text-xs font-sans text-brand-black focus:outline-none focus:border-[#3D4A3E] transition-all"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Location</label>
                      <input
                        type="text"
                        placeholder="e.g., Kensington, London"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full bg-white/70 border border-brand-black/10 rounded-xl px-4 py-2.5 text-xs font-sans text-brand-black focus:outline-none focus:border-[#3D4A3E] transition-all"
                      />
                    </div>
                  </div>

                  {/* Review Tag Category Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Core Result Tag</label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full bg-white/70 border border-brand-black/10 rounded-xl px-3.5 py-2.5 text-xs font-sans text-brand-black focus:outline-none focus:border-[#3D4A3E] transition-all"
                    >
                      <option value="HONEST EXPERIENCES">HONEST EXPERIENCES</option>
                      <option value="TENSION RELIEF">TENSION RELIEF</option>
                      <option value="WEIGHTLESS EFFECT">WEIGHTLESS EFFECT</option>
                      <option value="THERAPEUTIC">THERAPEUTIC</option>
                      <option value="SILK SMOOTHING">SILK SMOOTHING</option>
                      <option value="ANTI-FLAKE">ANTI-FLAKE</option>
                      <option value="BARRIER HYDRATION">BARRIER HYDRATION</option>
                      <option value="LUMINOSITY GLOW">LUMINOSITY GLOW</option>
                      <option value="HEAT DEFENSE">HEAT DEFENSE</option>
                      <option value="FRIZZ CONTROL">FRIZZ CONTROL</option>
                      <option value="MORNING GLOW">MORNING GLOW</option>
                      <option value="MEMBRANE REPAIR">MEMBRANE REPAIR</option>
                      <option value="REDNESS CALMING">REDNESS CALMING</option>
                    </select>
                  </div>

                  {/* Elegant File Upload Section */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-black/60 block">Add Photo or Video</label>
                    <div className="relative border border-dashed border-brand-black/10 rounded-xl p-4 bg-white/50 flex flex-col items-center justify-center transition-all hover:bg-white/80">
                      {newMediaUrl ? (
                        <div className="relative w-full rounded-lg overflow-hidden border border-brand-black/5 bg-brand-black/5">
                          {newMediaType === "video" ? (
                            <video 
                              src={newMediaUrl} 
                              controls 
                              className="w-full max-h-48 object-contain mx-auto rounded-lg"
                            />
                          ) : (
                            <img 
                              src={newMediaUrl} 
                              alt="Review upload preview" 
                              className="w-full max-h-48 object-contain mx-auto rounded-lg"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <button
                            type="button"
                            onClick={handleRemoveMedia}
                            className="absolute top-2 right-2 p-1.5 bg-brand-black/70 hover:bg-brand-black text-white rounded-full transition-colors cursor-pointer shadow-md"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center gap-1.5 cursor-pointer w-full py-2">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-xs text-gray-500 font-sans font-medium">Click to upload image or video</span>
                          <span className="text-[9px] text-gray-400 font-sans">Supports JPG, PNG, MP4</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3D4A3E] hover:bg-brand-black text-white py-3 px-4 rounded-xl text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#3D4A3E]/10 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying checkout & submitting...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#82D8C5]" />
                        <span>Submit Live Review</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unified responsive elegant review grid for both laptop and mobile */}
      <div className="max-w-7xl mx-auto px-5 sm:px-12 md:px-24 py-16 text-left">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#3D4A3E]/10 text-[#3D4A3E] text-[10px] font-sans font-black uppercase tracking-[0.25em] px-3.5 py-1 rounded-full border border-[#3D4A3E]/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#3D4A3E]" /> CLIENT TRUST REPORT
              </span>
              <span className="text-[10px] font-sans font-black uppercase tracking-wider text-brand-black/40">Authentic Experiences</span>
            </div>
            <h2 className="font-sans text-[28px] sm:text-[34px] lg:text-[40px] font-black uppercase tracking-tight text-brand-black leading-none">
              The Client Sanctuary
            </h2>
            <p className="text-[12.5px] text-gray-500 font-sans max-w-xl leading-relaxed">
              Honest ritual experiences recorded by our verified clients. All updates are applied in real time.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setIsWriteReviewOpen(true)}
            className="bg-[#3D4A3E] text-white hover:bg-[#2F3A30] px-6 py-3.5 rounded-full text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer border border-[#3D4A3E]/10 hover:scale-105 shrink-0 self-start md:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#82D8C5]" /> Write a Review
          </button>
        </div>

        {/* Responsive Grid containing cute, aesthetic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Static Intro Card */}
          <div className="bg-[#3D4A3E] text-white rounded-3xl p-6 flex flex-col justify-between shadow-md border border-[#3D4A3E]/40 text-left min-h-[290px] hover:shadow-lg transition-shadow duration-300">
            <div>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-4.5 h-4.5 text-[#82D8C5]" />
              </div>
              <h3 className="font-sans text-[14px] font-black uppercase tracking-wider text-white leading-tight">
                Pure & Natural Formula Feedback
              </h3>
              <p className="text-[11.5px] opacity-85 mt-2 leading-relaxed font-sans">
                Formulations tailored specifically to {product?.name || "your hair type"} using authentic botanicals.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#82D8C5]">
              <span>100% EXCLUSIVE RATING</span>
            </div>
          </div>

          {/* Map currentReviews */}
          {currentReviews.map((rev) => {
            const helpfulCount = rev.helpfulCount + (helpfulOverrides[rev.id] || 0);
            const isVoted = votedReviews[rev.id];

            return (
              <div
                key={rev.id}
                className="bg-white border border-brand-black/5 rounded-3xl p-5 flex flex-col justify-between hover:border-[#3D4A3E]/30 transition-all duration-300 shadow-sm hover:shadow-md text-left bg-gradient-to-br from-white to-[#FCFAF7]/40 min-h-[290px]"
              >
                <div>
                  {/* Rating details */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "text-[#82D8C5] fill-[#82D8C5]" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[8.5px] font-mono font-bold tracking-wider text-[#3D4A3E] bg-[#3D4A3E]/5 px-2.5 py-0.5 rounded-full border border-[#3D4A3E]/10 uppercase">
                      {rev.tag}
                    </span>
                  </div>

                  {/* Review Title & Content */}
                  <h4 className="font-sans text-[12px] font-bold uppercase tracking-wide text-brand-black leading-snug mb-1.5">
                    "{rev.title}"
                  </h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                    {rev.content}
                  </p>

                  {/* Render optional media attachments */}
                  {rev.mediaUrl && (
                    <div className="mt-3.5 overflow-hidden rounded-2xl border border-brand-black/5 bg-brand-black/5">
                      {rev.mediaType === "video" ? (
                        <video 
                          src={rev.mediaUrl} 
                          controls 
                          playsInline 
                          muted 
                          className="w-full h-36 object-cover hover:scale-102 transition-transform duration-300"
                        />
                      ) : (
                        <img 
                          src={rev.mediaUrl} 
                          alt="Customer uploaded review attachment" 
                          referrerPolicy="no-referrer"
                          className="w-full h-36 object-cover hover:scale-102 transition-transform duration-300"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Member footer */}
                <div className="border-t border-brand-black/5 pt-3.5 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#EDEDE9] flex items-center justify-center font-serif text-[11px] font-bold text-[#3D4A3E] border border-brand-black/5 shrink-0">
                      {rev.avatarLetter}
                    </div>
                    <div>
                      <span className="font-sans font-bold text-[11px] text-brand-black block leading-none">
                        {rev.author}
                      </span>
                      <span className="text-[8px] text-gray-400 font-sans block mt-0.5">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleHelpfulClick(rev.id, e)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[9px] cursor-pointer select-none font-bold transition-all ${
                      isVoted
                        ? "bg-[#3D4A3E]/10 border-[#3D4A3E]/35 text-[#3D4A3E]"
                        : "border-brand-black/5 hover:border-[#3D4A3E]/30 text-gray-400 hover:text-[#3D4A3E]"
                    }`}
                  >
                    <ThumbsUp className="w-2.5 h-2.5" />
                    <span>Helpful ({helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Extra Decorative Seal Card */}
          <div className="bg-[#FCFAF7] border border-dashed border-brand-black/10 rounded-3xl p-6 flex flex-col justify-between text-left min-h-[290px]">
            <div className="space-y-3">
              <span className="text-[8px] font-bold font-mono text-[#3D4A3E]/50 tracking-[0.2em] block uppercase">BRITISH TRICHOLOGY SEAL</span>
              <div className="flex -space-x-1.5">
                <span className="w-6.5 h-6.5 rounded-full bg-[#82D8C5]/20 flex items-center justify-center border border-white text-[9px] font-black text-brand-black">S</span>
                <span className="w-6.5 h-6.5 rounded-full bg-[#EEDBC5]/20 flex items-center justify-center border border-white text-[9px] font-black text-brand-black">H</span>
                <span className="w-6.5 h-6.5 rounded-full bg-[#9A8FB7]/20 flex items-center justify-center border border-white text-[9px] font-black text-brand-black">O</span>
              </div>
              <h4 className="font-sans text-[12px] font-black uppercase tracking-wider text-brand-black leading-tight">Verified Shopify Reviews</h4>
              <p className="text-[10.5px] text-gray-400 font-sans leading-normal">
                Secure order history linkage maintains absolute authenticity. No simulated reviews permitted.
              </p>
            </div>
            <div className="text-[9.5px] text-gray-400 font-sans border-t border-brand-black/5 pt-3">
              All items tested under dry climate stressors.
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
