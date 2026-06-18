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
    rating: 5,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "skincare",
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
    rating: 5,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "skincare",
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
    rating: 5,
    images: [
      "/snail silk scalp oil.webp"
    ],
    category: "skincare",
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
    rating: 5,
    images: [
      "/ground recovery oil.webp"
    ],
    category: "skincare",
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
    rating: 5,
    images: [
      "/Gym silk.webp"
    ],
    category: "skincare",
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
    rating: 5,
    images: [
      "/snail silk scalp oil.webp"
    ],
    colors: [
      { name: "Original Gold", hex: "#D4AF37" },
      { name: "Rose Millésime", hex: "#C39B9B" }
    ],
    category: "face",
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
    rating: 4,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1000&auto=format&fit=crop&q=80"
    ],
    category: "eye",
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
    originalPrice: 62.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&auto=format&fit=crop&q=80"
    ],
    category: "eye",
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
    tags: ["SAVE UP TO 32%"]
  },
  {
    id: "concealer",
    name: "Ground Wellbeing Sleep Face Balm",
    subtitle: "Night-Time Restorative aromatherapy by Ground",
    price: 68.00,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620802631468-911c03ae793e?w=1000&auto=format&fit=crop&q=80"
    ],
    category: "face",
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
    rating: 5,
    images: [
      "/snail silk scalp mask.webp"
    ],
    category: "eye",
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
    rating: 5,
    images: [
      "/snail silk face serum.webp"
    ],
    category: "lip",
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
  // Brushes (Tools)
  {
    id: "buffer-brush",
    name: "Silicon Scalp Massage Brush",
    subtitle: "Exfoliating Root Circulation Stimulator",
    price: 24.00,
    rating: 4,
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&auto=format&fit=crop&q=80"],
    category: "brush",
    description: "A premium luxury silicone scalp massager featuring soft, flexible bristles that stimulate blood flow to promote hair growth and deeply exfoliate hair follicles during shampooing.",
    howToUse: "Gently press against scalp in small circular motions while lathering shampoo or working elixirs into hair roots. Can be used wet or dry.",
    ingredients: "100% Medical-Grade Hypoallergenic Soft Silicone, Anti-Slip Ergonomic Shell Handle."
  },
  {
    id: "blend-brush",
    name: "Rose Quartz Facial Gua Sha",
    subtitle: "Lymphatic Drainage & Contouring Stone",
    price: 18.00,
    rating: 5,
    images: ["https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000&auto=format&fit=crop&q=80"],
    category: "brush",
    description: "A hand-carved, genuine grade-A rose quartz gua sha tool designed to lift facial muscles, speed up lymphatic drainage, and assist deep absorption of face wellness oils.",
    howToUse: "Warm face oil on the templates, hold the stone flat against skin and scrape upward and outward from the center of chin, cheeks, and forehead.",
    ingredients: "100% Brazilian Grade-A Natural Rose Quartz Crystal."
  },
  {
    id: "angled-brush",
    name: "Obsidian Face Roller",
    subtitle: "Cooling De-Puffing Beauty Tool",
    price: 21.00,
    rating: 5,
    images: ["https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000&auto=format&fit=crop&q=80"],
    category: "brush",
    description: "A therapeutic, double-sided natural black obsidian facial roller that provides instant cooling de-puffing benefits, minimizes pores, and relieves structural head tension.",
    howToUse: "Roll the large obsidian stone gently outward from the nose to cheekbones, and use the smaller roller around delicate eye regions.",
    ingredients: "100% Natural Volcanic Black Obsidian Protective Gemstone."
  },
  // Makeup Pouch
  {
    id: "makeup-pouch",
    name: "The Velvet Spa Kit Pouch",
    subtitle: "Pure quilted graphite travel sleeve",
    price: 60.00,
    rating: 5,
    images: [
      "/the main image frame pouch.jpeg",
      "/the secondary insdert image frame.jpeg"
    ],
    category: "pouch",
    description: "A gorgeous, padded luxury spa kit pouch designed to house your Oribe, Kérastase, and Ground Wellbeing elixirs. Crafted with double-stitch quilted velvet, splash-proof lining, and a polished heavy brass zip closure.",
    intro: "Premium space-saving beauty pouch featuring quick-slide dual metals and easy waterproof storage.",
    bullets: [
      "Thick, luxurious quilted velvet shell",
      "Stain-proof and wipeable interior lining in graphite tone",
      "Polished heavy brass hardware zipper",
      "Perfect size to safeguard glass dropper bottles"
    ],
    howToUse: "Pack your glass apothecary dropper bottles and rollers securely into custom inside elasticated sleeves for on-the-go hotel room retreats.",
    ingredients: "Luxury Quilted Soft Velvet, Waterproof Poly Shield Lining, Heavy Core Solid Brass Metal Zipper.",
    tags: ["POPULAR"]
  },
  {
    id: "h-salon-cap",
    name: "H Salon Signature Styling Cap",
    subtitle: "Luxury Organic Cotton Cap by H Salon",
    price: 35.00,
    rating: 5,
    images: [
      "/cap h salon product image.jpg"
    ],
    category: "pouch",
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
    rating: 5,
    images: [
      "/h salon comb.webp"
    ],
    category: "brush",
    description: "An ultra-smooth, hand-carved finishing and detangling comb designed to glide effortlessly through hair without causing cuticle friction, static, or breakage. Perfect for distributing hair oils and scalp masques.",
    intro: "The ultimate styling tool. Gently detangles wet or dry strands while massaging and stimulating scalp circulation.",
    bullets: [
      "Hand-polished wide and fine teeth prevent hair tearing",
      "Therapeutic, non-scratching tips gently massage hair follicles",
      "Anti-static, premium heat-resistant material designed to last",
      "Ideal for spreading scalp treatment oils and cream masques evenly"
    ],
    howToUse: "Glide gently from scalp roots to ends. Perfect for detangling wet hair in the shower or finishing dry styles with luxury high-shine polish.",
    ingredients: "100% Eco-Friendly Cellulose Acetate, Hand-Polished Finish.",
    tags: ["BESTSELLER", "NEW"]
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
