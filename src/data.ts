/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "snail-silk-serum",
    name: "Oribe Serene Scalp Treatment",
    subtitle: "Soothing Leave-On Treatment by Oribe",
    price: 48.00,
    rating: 4.8,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "scalp-care",
    description: "This lightweight, fast-absorbing leave-on treatment provides instant, long-lasting relief from scalp irritation, dryness, and flaking. Formulated with cooling peppermint, tea tree, and chamomile extracts to calm and soothe the scalp.",
    intro: "A spa-grade scalp elixir that cools instantly and relieves redness and dry irritation.",
    bullets: [
      "Instantly relieves scalp dryness, itching, and redness",
      "Peppermint and chamomile oils provide a cooling sensation",
      "Extends time between washes by balancing scalp oils",
      "Fast-absorbing, non-greasy formula is color and keratin safe"
    ],
    howToUse: "Apply directly to clean, damp, or dry scalp. Massage thoroughly into roots. Do not rinse. Style as usual for a weightless, balanced finish.",
    ingredients: "Aqua/Water, Mentha Piperita (Peppermint) Oil, Chamomilla Recutita (Chamomile) Flower Extract, Tea Tree Leaf Oil, Aloe Barbadensis Leaf Juice, Salicylic Acid, Glycerin.",
    tags: ["BESTSELLER", "WHATS HOT", "NEW"]
  },
  {
    id: "snail-silk-scalp-mask",
    name: "Oribe Serene Scalp Masque",
    subtitle: "Balance Soothing Treatment Masque by Oribe",
    price: 52.00,
    rating: 4.6,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "scalp-care",
    description: "This intensive soothing treatment masque deeply hydrates and balances the scalp while conditioning and detangling hair. It leaves the scalp calm and hair silken-soft.",
    intro: "A luxurious conditioning treatment masque that removes flakes and rejuvenates hair and scalp.",
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
    name: "Oribe Gold Lust Hair Oil",
    subtitle: "Nourishing Hair & Scalp Oil by Oribe",
    price: 45.00,
    rating: 4.9,
    images: [
      "/snail silk scalp oil.webp"
    ],
    category: "hair-oils",
    description: "This luxurious, lightweight oil absorbs instantly to restore hair to its prime. Infused with a rich blend of jasmine, edelweiss, lychee, sandalwood, and argan extracts, it penetrates to condition and strengthen.",
    intro: "Liquid gold that provides elite protection, intense shine, and frizz control without weight.",
    bullets: [
      "Provides deep conditioning, weightless high-gloss shine",
      "Protects hair from heat styling and controls frizz",
      "Smooths dry ends, reduces split ends, and strengthens locks",
      "Signature Oribe scent with luxurious botanical extracts"
    ],
    howToUse: "Apply a few drops throughout damp hair as a pre-shampoo or overnight treatment, or on dry hair before heat styling to smooth flyaways and add high-gloss shine.",
    ingredients: "Cyclopentasiloxane, Coconut Alkanes, Argania Spinosa (Argan) Kernel Oil, Jasminum Officinale (Jasmine) Extract, Sandalwood Extract, Edelweiss Flower Extract, Lychee Fruit Extract.",
    tags: ["BESTSELLER", "WHATS HOT"]
  },
  {
    id: "ground-recovery-oil",
    name: "The Recovery Face Oil",
    subtitle: "Overnight Barrier Repair by Ground Wellbeing",
    price: 64.00,
    rating: 4.7,
    images: [
      "/ground recovery oil.webp"
    ],
    category: "recovery-botanicals",
    description: "An overnight lipid barrier repair oil formulated to replenish skin elasticity, soothe skin redness, and ground your evening skincare ritual. Blended with active Jasmine, Rosewood, sweet almond, avocado, and cucumber oils.",
    intro: "Comforts and replenishes tired skin overnight to lock in essential moisture and restore radiance.",
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
    name: "The Active Body Oil",
    subtitle: "Muscle Stimulation Oil by Ground Wellbeing",
    price: 38.00,
    rating: 4.5,
    images: [
      "/Gym silk.webp"
    ],
    category: "recovery-botanicals",
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
    id: "halo-highlighter",
    name: "Kérastase Elixir Ultime Hair Oil",
    subtitle: "Beautifying & Glossing Hair Oil by Kérastase",
    price: 56.00,
    rating: 4.8,
    images: [
      "/snail silk scalp oil.webp"
    ],
    category: "hair-oils",
    description: "Our signature multi-use hair oil delivers deep nourishment and up to 48 hours of high-performance shine. Infused with a sacred blend of Marula, Camellia, and Argan oils to seal split ends and provide thermal protection up to 450°F.",
    intro: "Formulated for hair that breathes of luxurious gloss. Micro-repair lipid particles adapt to dry fibers.",
    bullets: [
      "Dermatologist tested and salon approved",
      "Infused with cold-pressed Marula and Camellia oils",
      "48-hour continuous anti-frizz humidity lock",
      "Thermoprotectant shield up to 450°F"
    ],
    howToUse: "Apply 1-2 pumps to damp or dry hair, working from mid-lengths to ends. Use before blow-drying to protect or as a finishing touch for unmatched brilliance.",
    ingredients: "Cyclopentasiloxane, Dimethiconol, Camellia Oleifera Seed Oil, Argania Spinosa Kernel Oil, Sclerocarya Birrea (Marula) Seed Oil, Zea Mays (Corn) Germ Oil, Linalool, Alpha-Isomethyl Ionone.",
    tags: ["SELLING FAST!", "BESTSELLER"]
  },
  {
    id: "color-mascara",
    name: "Oribe Power Drops Hydration Booster",
    subtitle: "Intense Moisture Infusion by Oribe",
    price: 28.00,
    rating: 4.2,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "boosters",
    description: "An innovative, highly concentrated scalp and hair serum boost engineered to deliver deep hydration. Formulated with 2% Hyaluronic Acid and Creatine to reconstruct strength, smoothness, and flexibility.",
    intro: "Hydration booster elixirs that coat each individual follicle with botanical restorative nutrients.",
    bullets: [
      "Replenishes dry, damaged hair with an instant moisture surge",
      "Creates a defensive barrier to lock in scalp hydration",
      "Infused with active hyaluronic acid complexes",
      "Safe for color-treated and chemically-processed hair"
    ],
    howToUse: "Mix 3-5 drops with any Oribe shampoo, conditioner, or styling product in the palm of your hand, or apply directly to damp hair and scalp before blow-drying.",
    ingredients: "Aqua (Water), Glycerin, Pentylene Glycol, Sodium Hyaluronate (Hyaluronic Acid), Creatine, Moringa Oleifera Seed Extract, Hydrolyzed Vegetable Protein, Phenoxyethanol.",
    tags: ["BESTSELLER"]
  },
  {
    id: "eye-shadow-stick",
    name: "Kérastase Chronologiste Caviar Serum",
    subtitle: "Regenerating Scalp & Hair Pearls by Kérastase",
    price: 42.00,
    rating: 4.6,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "boosters",
    description: "A luxury youth-forward caviar peptide serum that transforms dry hair and scalp. Micro-encapsulated pearls burst on contact to release Abyssine, Vitamin E, and Hyaluronic Acid to intensely hydrate, soothe, and pump up hair bounce.",
    intro: "An effortless 10-second sweep that regenerates hair vitality and holds absolute salon freshness all day.",
    bullets: [
      "No rinsing required",
      "Peptide-enriched scalp protection",
      "Tocopheryl enriched anti-aging formula",
      "Volumizes roots and seals cuticles for 24 hours"
    ],
    howToUse: "Apply 2-3 pumps directly to the scalp and damp or dry hair. Massage gently from roots to tips to burst and distribute active caviar nutrient pearls.",
    ingredients: "Aqua, Glycerin, Abyssine Extract, Sodium Hyaluronate, Tocopheryl Acetate, Caviar Peptide Complexes, Argania Spinosa Extract, Perfume/Fragrance.",
    tags: ["BESTSELLER"]
  },
  {
    id: "concealer",
    name: "Ground Wellbeing Sleep Face Balm",
    subtitle: "Night-Time Restorative aromatherapy by Ground",
    price: 68.00,
    rating: 4.9,
    images: [
      "/ground recovery oil.webp"
    ],
    category: "recovery-botanicals",
    description: "An ultra-creamy, decadent night balm infused with soothing organic chamomile, lavender, and sweet almond. Formulated to deeply nourish skin, relieve facial tension, and support an deep, restful state.",
    intro: "Soothing natural botanical waxes that melt into skin to give an incredibly rested, organic glow.",
    bullets: [
      "Instantly calms irritation and dryness",
      "Rich organic shea butter and honey wax base",
      "Aromatherapy relaxation properties for sleep",
      "Non-comedogenic and vegan-approved balm"
    ],
    howToUse: "Massage a small pea-sized amount onto clean face, neck, or temples before sleep. Warm in hands first, inhale the calming aromatherapy scent for 3 deep breaths, then gently press into skin.",
    ingredients: "Butyrospermum Parkii (Shea) Butter, Beeswax, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Lavandula Angustifolia (Lavender) Oil, Anthemis Nobilis (Chamomile) Flower Oil, Tocopherol.",
    tags: ["POPULAR"]
  },
  {
    id: "eyeliner",
    name: "Olaplex No. 9 Bond Protector Serum",
    subtitle: "Anti-Damage Hair Shield by Olaplex",
    price: 24.00,
    rating: 4.4,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "boosters",
    description: "A weightless, silicone-free antioxidant hair serum that shields locks from pollution and high heat styling for up to 48 hours. Powered by Olaplex's patented Bond Building Technology to rebuild broken disulfide bonds.",
    intro: "Anti-pollution, anti-tangle, and heat-protective hair shield serum for pristine everyday luxury results.",
    bullets: [
      "Satin shine finish with rich bounce",
      "48-hour heat protection up to 450°F",
      "Silicon-free weightless antioxidant shield",
      "Patented disulfide bond repair technology"
    ],
    howToUse: "Apply a small amount to damp, clean hair, working upward from ends to roots. Blow-dry or air-dry for touchably soft, repaired, and protected hair.",
    ingredients: "Water (Aqua), Bis-Aminopropyl Diglycol Dimaleate (Bond Builder), Red Algae Extract, Glycerin, Sodium Benzoate, Citric Acid, Fragrance.",
    tags: ["NEW"]
  },
  {
    id: "lip-gloss",
    name: "Kérastase Nutritive Split-End Serum",
    subtitle: "High-Nutrition Ultra-Sealer by Kérastase",
    price: 24.00,
    rating: 4.6,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "hair-oils",
    description: "An incredibly nutritive, lightweight split-end serum hybrid. Adds immediate sensory hydration and seals fiber split-ends instantly. Infused with plant-based proteins and niacinamide to nurture cuticle locks.",
    intro: "Nourishing, non-sticky luxury oil-gel that coats hair tips in a high-shine glaze of intense hydration.",
    bullets: [
      "Immediate fiber repair and smoothness",
      "Infused with pure niacinamide complexes",
      "Provides deep protection from raw wind and dry conditions",
      "Light natural white floral luxury scent"
    ],
    howToUse: "Apply several drops to dry or damp hair tips and run fingers through ends to seal. Leave in. Style hair normally.",
    ingredients: "Isododecane, Dimethicone, Wheat Protein Amino Acids, Soy Protein, Niacinamide, Hydrolyzed Wheat Gluten, Benzyl Salicylate, Geraniol.",
    tags: ["BESTSELLER"]
  },
  {
    id: "h-salon-cap",
    name: "H Salon Signature Styling Cap",
    subtitle: "Luxury Organic Cotton Cap by H Salon",
    price: 35.00,
    rating: 4.1,
    images: [
      "/cap h salon product image.jpg"
    ],
    category: "accessories",
    description: "A premium-crafted signature cap designed for the perfect post-treatment aesthetic or casual day wear. Embroidered with the elegant H Salon logo, featuring a fully adjustable brass buckle clasp and breathable structured organic cotton.",
    intro: "Style meets scalp care. Keep hair protected from wind, UV rays, and styling stress in our custom logo cap.",
    bullets: [
      "100% premium double-stitch organic cotton",
      "Embroidered signature H Salon classic branding",
      "Adjustable brass buckle clasp for custom secure fit",
      "Protects treated hair and sensitive scalps from direct UV exposure"
    ],
    howToUse: "Wear comfortably to shield your scalp and keep styled hair in absolute place after premium treatment or on relaxed daily strolls.",
    ingredients: "100% Certified Organic Cotton, Brushed Brass Metal Adjuster.",
    tags: ["BESTSELLER", "NEW"]
  },
  {
    id: "h-salon-comb",
    name: "H Salon Luxury Texture Comb",
    subtitle: "Hand-Carved Anti-Static Dressing Comb",
    price: 28.00,
    rating: 4.5,
    images: [
      "/h salon comb.webp"
    ],
    category: "accessories",
    description: "An ultra-smooth, hand-carved finishing and detangling comb designed to glide effortlessly through hair without causing cuticle friction, static, or breakage. Perfect for distributing hair oils and scalp masques.",
    intro: "The ultimate styling tool. Gently detangles wet or dry strands while massaging and stimulating scalp circulation.",
    bullets: [
      "Hand-polished wide and fine teeth prevent hair tearing",
      "Therapeutic, non-scratching tips gently massage hair follicles",
      "Anti-static, premium heat-resistant material designed to last",
      "Ideal for spreading scalp treatment oils and cream masques evenly"
    ],
    howToUse: "Glide gently from scalp roots to ends. Perfect for detangling wet hair in the shower or finishing dry styles with luxury high-shine polish.",
    ingredients: "Eco-Friendly Cellulose Acetate, Hand-Polished Finish.",
    tags: ["BESTSELLER", "NEW"]
  },
  {
    id: "hair-and-scalp-circulation-set",
    name: "Hair and Scalp Circulation Set",
    subtitle: "Therapeutic Growth & Circulation Synergy",
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
