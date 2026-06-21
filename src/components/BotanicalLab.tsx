/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Beaker, ShieldCheck, Scale, Microscope, Droplet, Leaf, Sprout } from "lucide-react";
import AnimatedUnderline from "./AnimatedUnderline";

interface IngredientDetail {
  id: string;
  name: string;
  scientificName: string;
  percentage: string;
  efficacy: string;
  icon: React.ComponentType<any>;
  description: string;
  extraction: string;
  molecularBenefits: string[];
  image: string;
}

export default function BotanicalLab() {
  const [activeId, setActiveId] = useState<string>("snail-silk");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const ingredients: IngredientDetail[] = [
    {
      id: "snail-silk",
      name: "Snail Mucoprotein Silk",
      scientificName: "Snail Secretion Filtrate C-200",
      percentage: "94.2%",
      efficacy: "Structural Moisture Rebuilding & Cuticle Sealing",
      icon: Droplet,
      description: "Sourced through ultra-delicate, animal-friendly stimulation systems, our Snail secretion filtrate has molecular weights calibrated to fit deep scalp fissures, wrapping hair strands in premium shielding protein silk.",
      extraction: "Scentless cold-vacuum filtration preserving native glyco-proteins and copper peptide chains.",
      molecularBenefits: [
        "Plumps dry hair cuticles instantly by 42%",
        "Triggers rapid natural collagen synthesis",
        "Provides dynamic structural thermal shield up to 210°C",
      ],
      image: "/formula 1.jpeg"
    },
    {
      id: "ground-recovery",
      name: "Ground Recovery Lipid Complex",
      scientificName: "Rosa Rubiginosa & Squalane Blend",
      percentage: "12.5%",
      efficacy: "Aesthetic Redness Healing & Skin Barrier Lock",
      icon: Leaf,
      description: "A highly concentrated therapeutic lipid sequence modeled on the natural skin barrier. Instantly calms redness, balances oily-dry moisture zones, and locks active serums into tissue during state sleep.",
      extraction: "First-press cold extraction of wild-harvested Andes rosehip seeds, balanced with high-purity olive squalane.",
      molecularBenefits: [
        "Replenishes natural subcutaneous moisture levels",
        "Reduces cellular water loss by 85% overnight",
        "Calms reactive irritation patterns instantly",
      ],
      image: "/formula 2.jpeg"
    },
    {
      id: "rosemary-active",
      name: "Steam Distilled Rosemary",
      scientificName: "Rosmarinus Officinalis Extract",
      percentage: "100% Organic",
      efficacy: "Follicle Stimulation & Anti-Flake Purifying",
      icon: Sprout,
      description: "A concentrated, highly pure stimulating botanical essence targeting follicle nodes. Triggers vascular circulation to fuel healthier hair production, while thoroughly purging oil build-ups and flakes.",
      extraction: "Slow copper-pot steam distillation of premium organic rosemary sprigs to preserve natural pinene.",
      molecularBenefits: [
        "Increases local scalp circulation when massaged",
        "Fights microbial flake-forming yeast structures",
        "Provides clear cooling anti-itch relief benefits",
      ],
      image: "/formula 3.jpeg"
    },
  ];

  // Preload ingredient images for instant responsiveness
  useEffect(() => {
    ingredients.forEach((ing) => {
      const img = new Image();
      img.src = ing.image;
    });
  }, []);

  const currentIng = ingredients.find((ing) => ing.id === activeId) || ingredients[0];

  return (
    <section id="botanical-laboratory" className="bg-[#FAF9F5] py-28 sm:py-36 px-4 md:px-12 select-none border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block with generous spacing (gaps) for luxury breathing room */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="w-10 h-10 rounded-full border border-[#82D8C5]/30 flex items-center justify-center mx-auto mb-4 bg-[#82D8C5]/5 text-[#82D8C5] shadow-xs cursor-pointer hover:rotate-12 transition-transform">
            <Beaker className="w-4 h-4" />
          </div>
          <p className="font-sans font-bold text-[10px] tracking-[0.25em] text-[#82D8C5] uppercase mb-4">
            H Salon Formulation Lab
          </p>
          <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-black uppercase tracking-tight text-brand-black leading-[1.12] mb-6">
            Bespoke Biotechnological <AnimatedUnderline word="Actives" />
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-black/60 leading-relaxed max-w-xl mx-auto">
            We operate at the exact intersection of premium clinical medicine and pure organic apothecaries. Explore the active molecules powering our signature client therapies.
          </p>
          <div className="w-16 h-0.5 bg-[#82D8C5] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Panel: Ingredient selector tabs ordered second on mobile style */}
          <div className="w-full lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <span className="font-sans text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-3">
              ACTIVE FORMULATIONS
            </span>
            <div className="flex flex-col">
              {ingredients.map((ing) => {
                const isActive = ing.id === activeId;
                return (
                  <div
                    key={ing.id}
                    className="group py-4 border-b border-black/10 last:border-0 cursor-pointer"
                    onClick={() => setActiveId(ing.id)}
                    onMouseEnter={() => setActiveId(ing.id)}
                  >
                    <div
                      className="flex flex-col transition-all duration-300"
                      style={{
                        transform: isActive ? "translateX(6px)" : "translateX(0)"
                      }}
                    >
                      <span className="text-[9px] font-sans font-bold tracking-widest text-[#0A0A0A]/40 mb-1 uppercase">
                        {ing.id === "snail-silk" ? "REBUILD DENSITY STRETCH" : ing.id === "ground-recovery" ? "HEAL BARRIER RESTORATION" : "VASCULAR FOLLICLE STIMULANT"}
                      </span>
                      
                      <h3
                        className={`font-serif text-[18px] md:text-[22px] font-black tracking-wide leading-none transition-colors uppercase ${
                          isActive ? "text-brand-lilac" : "text-[#0A0A0A]/50 group-hover:text-brand-black"
                        }`}
                      >
                        {ing.name}
                      </h3>

                      {/* Italic list of products */}
                      <span className="text-[11px] sm:text-[12px] font-sans text-gray-400 mt-1.5 leading-normal">
                        {ing.scientificName}
                      </span>

                      {/* Micro Highlight bar */}
                      <div
                        className="h-[1.5px] bg-[#82D8C5] mt-2.5 transition-all duration-300"
                        style={{
                          width: isActive ? "60%" : "0%"
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Immersive microscopic visualizer, beautiful imagery & clinical facts ordered first on mobile */}
          <div className="w-full lg:col-span-7 bg-white rounded-3xl border border-black/10 p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xs order-1 lg:order-2">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col h-full gap-5"
              >
                {/* Real Product/Formulation Image block! */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-zinc-100 rounded-2xl overflow-hidden border border-black/5 shadow-xs shrink-0">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={activeId}
                      src={currentIng.image}
                      alt={currentIng.name}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                      transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none z-10" />
                  <span className="absolute bottom-3 left-3 text-white text-[9px] font-mono tracking-widest uppercase z-10 font-bold">
                    ACTIVE MICRO-MOLECULE PRESET
                  </span>
                  <div className="absolute right-3 bottom-3 bg-[#82D8C5] text-brand-black font-sans text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm z-10">
                    {currentIng.percentage} Standard
                  </div>
                </div>

                {/* Short and Perfect Content Section below the image */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5]" />
                    <span className="font-serif italic font-bold text-xs text-[#82D8C5] uppercase tracking-wider">
                      {currentIng.efficacy}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-[13px] text-black/60 leading-relaxed">
                    {currentIng.description}
                  </p>
                </div>

                {/* Footer clinical seal */}
                <div className="border-t border-black/5 pt-4 mt-auto flex items-center justify-between text-black/40 font-sans text-[9px] tracking-widest uppercase">
                  <span>PH BALANCED</span>
                  <span>•</span>
                  <span>DERMATOLOGICALLY CERTIFIED</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
