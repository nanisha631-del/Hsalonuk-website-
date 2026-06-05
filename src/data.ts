/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "halo-highlighter",
    name: "Halo highlighter",
    subtitle: "Lit-from-within glow",
    price: 56.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Opal Pink", hex: "#E8D5C4" },
      { name: "Chiffon Lavender", hex: "#C4B5D4" },
      { name: "Bronze Dust", hex: "#A88B74" },
      { name: "Pearl White", hex: "#F3EDE4" }
    ],
    category: "face",
    description: "Our signature highlighter is designed to melt into your skin, providing a breathable dewiness that caught the morning light just right. Zero glitter, just pure liquid silk.",
    intro: "Formulated for skin that speaks of natural dewiness. Multi-dimensional pearl-particles adapt to your natural pigment.",
    bullets: [
      "Dermatologist tested and approved",
      "Infused with botanical squalane",
      "12-hour continuous hydration lock",
      "Non-comedogenic and vegan formuula"
    ],
    tags: ["SELLING FAST!", "BESTSELLER"]
  },
  {
    id: "color-mascara",
    name: "Color mascara",
    subtitle: "Bold lashes, playful color",
    price: 28.00,
    rating: 4,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1000&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Midnight Purple", hex: "#3A2E4C" },
      { name: "Electric Blue", hex: "#1A5276" },
      { name: "Forest Olive", hex: "#2E4F4F" },
      { name: "Suede Black", hex: "#0A0A0A" }
    ],
    category: "eye",
    description: "An innovative color-saturated mascara that defines, lifts, and lengthens without clump or flake. Choose your mood and wear it with complete confidence.",
    intro: "Lash-defining pigments that coat each individual hair with deep, botanical ingredients.",
    bullets: [
      "Volumizes without heavy weight",
      "Warm water washable for zero rubbing",
      "Infused with organic castor oil",
      "Smudge-proof in high humidity"
    ],
    tags: ["BESTSELLER"]
  },
  {
    id: "eye-shadow-stick",
    name: "Eye shadow stick",
    subtitle: "Swipe-on color, blendable",
    price: 42.00,
    originalPrice: 62.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1631214499551-772e2c24255b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Lavender", hex: "#C4B5D4" },
      { name: "Terra Cotta", hex: "#BC7F75" },
      { name: "Lilac Gray", hex: "#D3CFD9" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Blossom Pink", hex: "#E8C5CE" }
    ],
    category: "eye",
    description: "A cream-to-powder eyeshadown crayon that takes the friction out of beauty routines. Simply swipe on lid, tap with your finger to blend, and you get a stunning visual pause.",
    intro: "An effortless 10-second sweep that resists creasing and holds dynamic color intensity all day.",
    bullets: [
      "No brushes required",
      "Double-ended with sharpener included",
      "Vitamin E enriched protective formula",
      "Resists crease lines for 16 hours"
    ],
    tags: ["SAVE UP TO 32%"]
  },
  {
    id: "concealer",
    name: "Concealer",
    subtitle: "Buildable coverage, natural look",
    price: 68.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1590156546746-cf337ae99c9c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620802631468-911c03ae793e?w=1000&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Fair 10", hex: "#FCECE0" },
      { name: "Light 20", hex: "#ECC9B2" },
      { name: "Medium 30", hex: "#DBA987" },
      { name: "Dark 40", hex: "#A97652" },
      { name: "Deep 50", hex: "#6F452A" }
    ],
    category: "face",
    description: "An ultra-creamy second-skin concealer that provides flawless coverage with a feather-light feel. Infused with skin-pampering components for fine-line reduction.",
    intro: "Muted natural pigments that blend seamlessly over tired areas to give a freshly rested aura.",
    bullets: [
      "Sweat and crease-proof finish",
      "Hyaluronic acid hydration infused",
      "Comfortable all-day wear",
      "Non-cakey feel on fine facial wrinkles"
    ],
    tags: ["POPULAR"]
  },
  {
    id: "eyeliner",
    name: "Eyeliner",
    subtitle: "Smooth lines, zero skipping",
    price: 24.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1631214499551-772e2c24255b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=1000&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Deep Charcoal", hex: "#0E1111" },
      { name: "Espresso Brown", hex: "#4A3B32" },
      { name: "Forest Moss", hex: "#2C3539" },
      { name: "Sunset Plum", hex: "#6B3A5B" },
      { name: "Lilac Petal", hex: "#C4B5D4" },
      { name: "Sky Lavender", hex: "#D6CADD" },
      { name: "Oceanic Teal", hex: "#4B9CD3" }
    ],
    category: "eye",
    description: "Precision felt-tip pen liner engineered to deliver flawless, solid lines in first swipe. Zero skips, zero stutter. It stays sharp through water, tears, and late night dinners.",
    intro: "Waterproof, smudge-proof, and mistake-proof liquid eyeliner for modern everyday graphic detail.",
    bullets: [
      "Ultra-fine 0.1mm felt tip precision",
      "24-hour intense wear formula",
      "Ophthalmologist tested for sensitive eyes",
      "Recyclable cartridge casing"
    ],
    tags: ["NEW"]
  },
  {
    id: "lip-gloss",
    name: "Lip gloss",
    subtitle: "Juicy shine, no stick",
    price: 24.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Wild Rose", hex: "#D98880" },
      { name: "Lilac Glaze", hex: "#D2B4DE" },
      { name: "Honey Amber", hex: "#E59866" },
      { name: "Clear Gloss", hex: "#FBFCFC" }
    ],
    category: "lip",
    description: "An incredibly hydrating lip oil gloss hybrid. Adds immediate juicy sheen and subtle volume with zero stickiness. Infused with organic rosehip and cold-pressed jojoba.",
    intro: "Nourishing, non-sticky luxury gloss that coats the lips in a high-shine glaze of essential hydration.",
    bullets: [
      "Immediate plumping shine",
      "Infused with wild rose oil",
      "Nourishing protection from raw weather",
      "Light natural vanilla berry scent"
    ],
    tags: ["BESTSELLER"]
  },
  // Brushes
  {
    id: "buffer-brush",
    name: "Buffer brush",
    subtitle: "Soft-focus blending",
    price: 24.00,
    rating: 4,
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&auto=format&fit=crop&q=80"],
    category: "brush"
  },
  {
    id: "blend-brush",
    name: "Blend brush",
    subtitle: "Diffuses color effortlessly",
    price: 18.00,
    rating: 5,
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&auto=format&fit=crop&q=80"],
    category: "brush"
  },
  {
    id: "angled-brush",
    name: "Angled brush",
    subtitle: "Precise, sculpted definition",
    price: 21.00,
    rating: 5,
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&auto=format&fit=crop&q=80"],
    category: "brush"
  },
  // Makeup Pouch
  {
    id: "makeup-pouch",
    name: "The Makeup Pouch",
    subtitle: "Pure iridescent lilac duo",
    price: 60.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&auto=format&fit=crop&q=80"
    ],
    category: "pouch",
    description: "A cute, compact makeup pouch designed to go wherever you do. Finished with a soft, iridescent sheen and a clean zip closure, it fits your everyday essentials without taking up space. Easy to toss in your bag, easy to wipe clean, and cute enough to leave out.",
    intro: "Premium space-saving beauty pouch featuring quick-slide dual metals and easy waterproof storage.",
    bullets: [
      "Iridescent soft-touch outer coating",
      "Wipeable interior lining in lilac tone",
      "Polished heavy brass hardware zipper",
      "Compact size with custom interior sleeves"
    ],
    tags: ["POPULAR"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    author: "Natalie S.",
    rating: 5,
    title: "So effortless",
    content: "I can throw this on in two minutes and it always looks good. The finish is super natural and fresh.",
    date: "12 days ago",
    type: "text"
  },
  {
    id: "rev2",
    author: "Aliyah M.",
    rating: 5,
    title: "My new everyday favorite",
    content: "This has officially become part of my daily routine. It's lightweight, easy to use, and never feels heavy.",
    date: "10 days ago",
    type: "text"
  },
  {
    id: "rev3",
    author: "Marisol R.",
    rating: 5,
    title: "Perfect for on-the-go",
    content: "I love how quick and foolproof it is. It stays cute all day and fits right into my bag.",
    date: "1 month ago",
    type: "text"
  }
];
