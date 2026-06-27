/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "snail-silk-serum",
    name: "Snail Silk® Face Serum",
    subtitle: "Anti-Aging Microalbumin Cellular Face Serum",
    price: 71.00,
    rating: 4.8,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "scalp-care",
    description: "The ultimate cell-level nourishment. Harnesses premium microalbumin silk elixirs to form an invisible, protective moisture barrier. Restores absolute radiance, smooths skin textures, and hydrates deeply.",
    intro: "A premium microalbumin face serum that heals skin barrier and restores radiant youth.",
    bullets: [
      "Deeply hydrates and restores skin cell elasticity",
      "Forms a lightweight, protective silk micro-shield",
      "Smooths skin textures and reduces dry lines",
      "100% natural, lightweight non-greasy absorption"
    ],
    howToUse: "Apply a few drops to clean, damp face and neck daily. Gently massage in upward motions until fully absorbed. Follow with moisturizer.",
    ingredients: "Aqua, Snail Silk Peptides, Active Ceramide Precursors, Hyaluronic Acid Complexes, White Tea Infusion, Vegetable Glycerin.",
    tags: ["BESTSELLER", "WHATS HOT", "NEW"]
  },
  {
    id: "snail-silk-scalp-mask",
    name: "Snail Silk® Scalp Mask",
    subtitle: "Intensive Soothing & Hydrating Scalp Mask",
    price: 54.00,
    rating: 4.6,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "scalp-care",
    description: "This intensive soothing treatment mask deeply hydrates and balances the scalp while conditioning and detangling hair. Formulated to relieve redness, flaking, and dry root irritation.",
    intro: "A luxurious conditioning treatment mask that purifies roots and rejuvenates hair and scalp.",
    bullets: [
      "Intensely hydrates and balances dry scalp moisture levels",
      "Deeply conditions and detangles to reveal silken-soft hair",
      "Calms scalp irritation, itching, and redness",
      "Safe for color and keratin treated hair, sulfate-free"
    ],
    howToUse: "Apply a generous amount to hair and scalp after shampooing. Massage gently. Leave on for 5 to 10 minutes, then rinse thoroughly.",
    ingredients: "Sulfate-Free Aqua, Cetearyl Alcohol, Jojoba Seed Esters, Rosemary Extract, Chamomile Extract, Hydrolyzed Quinoa Proteins, Panthenol, Squalane.",
    tags: ["BESTSELLER", "WHATS HOT"]
  },
  {
    id: "snail-silk-scalp-oil",
    name: "Scalp Silk®",
    subtitle: "Premium Nourishing Scalp & Growth Elixir",
    price: 48.00,
    rating: 4.9,
    images: [
      "/snail silk scalp oil.webp"
    ],
    category: "hair-oils",
    description: "This highly concentrated, premium hair and scalp oil absorbs instantly to restore hair density to its prime. Penetrates to condition roots, strengthen strands, and provide weightless shine.",
    intro: "Premium clinical-grade scalp silk that stimulates healthy growth and adds glossy root vitality.",
    bullets: [
      "Provides deep scalp nourishment for healthier hair growth",
      "Weightless high-gloss shine without oily residue",
      "Smooths dry ends, reduces split ends, and strengthens locks",
      "Safe for color, keratin, and chemically treated hair profiles"
    ],
    howToUse: "Massage a few drops directly into roots and scalp, or distribute through hair length as a leave-in shine treatment.",
    ingredients: "Argania Spinosa Kernel Oil, Jasminum Officinale (Jasmine) Extract, Sandalwood Extract, Squalane, Vitamin E, Rosemary Oil.",
    tags: ["BESTSELLER", "WHATS HOT"]
  },
  {
    id: "ground-recovery-oil",
    name: "Ground Recovery Oil®",
    subtitle: "Overnight Face & Barrier Repair Oil",
    price: 65.00,
    rating: 4.7,
    images: [
      "/ground recovery oil.webp"
    ],
    category: "hair-oils",
    description: "An overnight lipid barrier repair oil formulated to replenish skin elasticity, soothe skin redness, and ground your evening ritual. Blended with active Jasmine, Rosewood, sweet almond, and avocado oils.",
    intro: "Replenishes and comforts tired skin overnight to lock in essential moisture and restore organic glow.",
    bullets: [
      "Formulated with premium Jasmine and Rosewood botanicals",
      "Soothes skin redness, inflammation, and uneven tones",
      "Creates a protective moisture barrier for intensive hydration",
      "100% natural, hand-crafted organic aromatherapy blend"
    ],
    howToUse: "Warm 3-4 drops in the palms of your hands, bring to the face and take 3 deep, grounding breaths. Gently press onto clean face and neck in upward sweeping motions before sleep.",
    ingredients: "Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Cucumber Seed Oil, Jasminum Officinale (Jasmine) Flower Oil, Aniba Rosaeodora (Rosewood) Wood Oil, Tocopherol.",
    tags: ["BESTSELLER", "WHATS HOT"]
  },
  {
    id: "gym-silk",
    name: "Gym Silk®",
    subtitle: "Therapeutic Muscle & Body Stimulation Oil",
    price: 34.00,
    rating: 4.5,
    images: [
      "/Gym silk.webp"
    ],
    category: "hair-oils",
    description: "An energizing, stimulating body oil crafted with therapeutic aromatherapy to soothe tired muscles and support athletic recovery. Infuse and revitalize the senses with cold-pressed botanical oils.",
    intro: "Blends cooling Eucalyptus, warming Black Pepper, Rosemary, and Ginger to stimulate blood flow and ease tension.",
    bullets: [
      "Stimulates circulation and relieves muscle tension after intense workouts",
      "Energizes the senses with refreshing Eucalyptus and Rosemary",
      "Deeply nourishing, quick-absorbing pure botanical base",
      "100% organic, hand-crafted in small batches for natural purity"
    ],
    howToUse: "Massage generously into tired muscles, joints, and limbs post-workout or after a warm bath. Rub in long, circular strokes towards the heart.",
    ingredients: "Helianthus Annuus (Sunflower) Seed Oil, Eucalyptus Globulus Leaf Oil, Rosmarinus Officinalis (Rosemary) Leaf Oil, Black Pepper Seed Oil, Zingiber Officinale (Ginger) Root Oil.",
    tags: ["BESTSELLER", "WHATS HOT", "NEW"]
  },
  {
    id: "h-salon-cap",
    name: "H Salon Ultra-Soft Sauna Hat",
    subtitle: "Premium Post-Treatment Protective Sauna Hat",
    price: 74.00,
    rating: 4.1,
    images: [
      "/cap h salon product image.jpg"
    ],
    category: "accessories",
    description: "A premium-crafted post-treatment protective sauna hat. Expertly designed to shield treated hair and sensitive scalps from direct heat, steam, or UV exposure. Rebalances scalp temperature perfectly.",
    intro: "Style meets scalp protection. Keep treated hair and sensitive scalp shielded in ultimate comfort.",
    bullets: [
      "Protects treated hair and sensitive scalps from high sauna heat and steam",
      "Aids deep conditioning treatments by trapping mild natural steam",
      "Crafted with ultra-soft, breathable premium fibers",
      "Adjustable secure fit for ultimate comfort"
    ],
    howToUse: "Wear comfortably during sauna sessions, hot baths, or post-treatment relaxation to shield scalp and lock in conditioning moisture.",
    ingredients: "100% Certified Premium Felted Wool and Organic Cotton fibers.",
    tags: ["BESTSELLER", "NEW"]
  },
  {
    id: "h-salon-comb",
    name: "Tranquillity Scalp and Body Gua Sha",
    subtitle: "Therapeutic Jade Scalp & Body Massage Tool",
    price: 48.00,
    rating: 4.5,
    images: [
      "/h salon comb.webp"
    ],
    category: "accessories",
    description: "An exquisite, hand-carved jade massage tool designed to stimulate scalp microcirculation and promote active hair growth. Releases tension across scalp meridians, neck, and shoulders.",
    intro: "The ultimate therapeutic tool. Massages head meridians to stimulate follicle circulation and relieve stress.",
    bullets: [
      "Hand-polished, high-grade jade comb prevents hair friction or tearing",
      "Gently stimulates scalp blood circulation and vital energy paths",
      "Perfect for distributing scalp treatment oils and cream masks evenly",
      "Releases deep tension, tightness, and physical stress on contact"
    ],
    howToUse: "Glide gently from forehead hair line to neck base in long, sweeping patterns. Excellent for massaging in Scalp Silk® or during relaxing bath routines.",
    ingredients: "100% Hand-Polished Natural Green Xiuyan Jade.",
    tags: ["BESTSELLER", "NEW"]
  },
  {
    id: "hair-and-scalp-circulation-set",
    name: "Hair and Scalp Circulation Set",
    subtitle: "Therapeutic Growth & Circulation Program",
    price: 169.00,
    rating: 4.8,
    images: [
      "/snail silk scalp oil.webp"
    ],
    category: "bundle",
    description: "Our signature therapeutic combination to reverse thin textures and supercharge active hair roots. Promotes healthy microcirculation while moisturizing dry hair strands and feeding active scalp structures.",
    intro: "The ultimate professional synergy to rejuvenate stagnant hair bases and feed follicles with vital clinical molecules.",
    bullets: [
      "Stimulates deep scalp blood circulation for faster growth",
      "Purges toxic scalp congestion and hydrates dry cuticles",
      "Features natural mint, argan oil, and active herbal minerals",
      "Perfect for thinning, fragile, or highly irritated styling bases"
    ],
    howToUse: "Apply the treatment masque to calm redness, then follow with targeted circular movements using the massage tool and nutrient-dense gold oil.",
    ingredients: "Active Peppermint, Pure Argan Extract, Organic Botanicals, Zinc & Magnesium Minerals.",
    tags: ["BESTSELLER", "BUNDLE", "NEW"]
  },
  {
    id: "hair-growth-set",
    name: "Hair Growth Set",
    subtitle: "Active Root Nourishment & Volume Program",
    price: 88.00,
    rating: 4.7,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "bundle",
    description: "Engender thick, robust strands from core to cuticle. Rebuilds and fortifies weak, broken fibers while soothing and clarifying the root system for an optimal growth environment.",
    intro: "A clinically designed clinical duo to feed structural follicles, stop premature shedding, and thicken each lock.",
    bullets: [
      "Supplying vital proteins and amino acids directly to hair centers",
      "Calms root inflammation to minimize premature hair fall",
      "Deeply hydrates dry hair shafts without weight or greasiness",
      "Unveils noticeable length, rich thickness, and long-term bounce"
    ],
    howToUse: "Massage serum into roots daily and distribute evenly. Use during periods of seasonal thinning or high styling strain.",
    ingredients: "Hydrolized Wheat Protein, Cellular Peptide Complexes, Clover Extract, Biotin, Niacinamide.",
    tags: ["BESTSELLER", "BUNDLE"]
  },
  {
    id: "pure-balance-ritual-face-scalp-hair",
    name: "Pure Balance Ritual: Face, Scalp & Hair",
    subtitle: "Sovereign Face, Scalp & Fiber Rejuvenation",
    price: 284.00,
    rating: 4.9,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "bundle",
    description: "The complete botanical crown reset. Rebalance skin hydration and feed vital bio-cellular molecules to reverse fine lines, clarify itchy scalps, and lock in glossy hair luster.",
    intro: "Indulge in a premium high-contrast routine that balances your skin, hair, and senses with supreme organic actives.",
    bullets: [
      "Corrects severe scalp dryness, irritation, and flaking",
      "Infuses deep-level lipids to lock in facial moisture and radiance",
      "Fortifies cuticle structures to repel wind, styling, and UV damage",
      "100% pure premium medical-grade botanicals and active oils"
    ],
    howToUse: "A custom 20-minute evening wellness protocol. Inhale aromatherapy blends, apply lipid restorers to face/hair, and finish with static-free combing.",
    ingredients: "Snail Silk Proteins, Lavender, Sandalwood, Avocado Lipid complex, Chamomile Extract.",
    tags: ["BUNDLE", "WHATS HOT"]
  },
  {
    id: "scalp-care-bundle",
    name: "Scalp Care Bundle",
    subtitle: "Clinical Anti-Irritation & Detangle Set",
    price: 129.00,
    rating: 4.6,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "bundle",
    description: "Designed specifically for highly sensitive, dry, or flake-prone scalps. Formulated with cooling peppermint, tea tree oil, and rich coconut-derived masques to restore absolute harmony to your base.",
    intro: "A calming clinical-grade scalp cleansing sequence to lift scales, soothe redness, and detangle with a glossy drape.",
    bullets: [
      "Instantly relieves chronic scalp dryness, itching, and flaking",
      "Cooling peppermint, tea tree, and chamomile calm scalp heat",
      "Restores essential moisture to dry roots and vulnerable fibers",
      "Safe for color, keratin, and chemically processed hair profiles"
    ],
    howToUse: "Use weekly as a complete treatment wash program, letting masques sit on roots for 10 minutes before rinsing and styling.",
    ingredients: "Mentha Piperita, Tea Tree Extract, Salicylic Acid, Coconut Lipid Acids, Aloe Vera Leaf Juice.",
    tags: ["BUNDLE", "POPULAR"]
  },
  {
    id: "scalp-massage-set",
    name: "Scalp Massage Set",
    subtitle: "Deep Root Meridian Stimulation Combo",
    price: 108.00,
    rating: 4.5,
    images: [
      "/snail silk scalp oil.webp"
    ],
    category: "bundle",
    description: "Unite therapeutic hand-crafted grooming tools with our rich active lipid elixirs. Maximizes deep root circulation, releases cranial muscle tension, and promotes optimal follicular delivery.",
    intro: "An authentic physical scalp rehabilitation routine combining modern biotechnology and traditional meridians.",
    bullets: [
      "Promotes active blood flow to hair roots for healthier growth",
      "Releases deep stress, tension, and tightness across the head",
      "Spreads therapeutic masques and active oils uniformly",
      "Handcrafted cellulous static-free comb protects vulnerable cuticles"
    ],
    howToUse: "Massage calming active lipids directly into roots, then use smooth hand-carved comb teeth in long crown-to-neck sweeping patterns for 5 minutes.",
    ingredients: "Cellulose Acetate, Lavender Extract, Sweet Almond Oil, Squalane, Vitamin E.",
    tags: ["BUNDLE", "WHATS HOT"]
  },
  {
    id: "snail-silk-scalp-skin-ritual",
    name: "Snail Silk® Scalp & Skin Ritual",
    subtitle: "Duo-Active Microalbumin Cellular System",
    price: 115.00,
    rating: 5,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "bundle",
    description: "The pinnacle of physical skin and hair restoration. Harnesses premium microalbumin silk elixirs and active biolipids to form an invisible moisture shield, erase fine dehydration lines, and soothe scalp redness.",
    intro: "Experience pure cell-level nourishment, zero-irritation calming, and long-term protective cuticle restoration.",
    bullets: [
      "Deeply nourishes dermal layers and hair roots with protein",
      "Provides high-performance 48-hour moisture and environmental protection",
      "Perfect for highly stressed, dry, or chemically altered fibers",
      "Light organic aromatherapy reduces mental and physical stress on contact"
    ],
    howToUse: "Warm elixirs in fingers and massage over targets, letting active microalbumin compounds activate overnight.",
    ingredients: "Microalbumin Silk Peptides, Active Ceramide Precursors, Hyaluronic Acid Complexes, White Tea Infusion.",
    tags: ["BUNDLE", "BESTSELLER"]
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
