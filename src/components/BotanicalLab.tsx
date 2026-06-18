/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Beaker, ShieldCheck, Scale, Microscope, Droplet, Leaf, Sprout } from "lucide-react";

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
            Bespoke Biotechnological Actives
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-black/60 leading-relaxed max-w-xl mx-auto">
            We operate at the exact intersection of premium clinical medicine and pure organic apothecaries. Explore the active molecules powering our signature client therapies.
          </p>
          <div className="w-16 h-0.5 bg-[#82D8C5] mx-auto mt-6" />
        </div>

        {/* The Laboratory Interactive Stage */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Panel: Ingredient selector tabs ordered second on mobile style */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4 justify-center order-2 lg:order-1">
            {ingredients.map((ing) => {
              const Icon = ing.icon;
              const isHighlighted = ing.id === hoveredId;
              return (
                <button
                  key={ing.id}
                  onClick={() => setActiveId(ing.id)}
                  onMouseEnter={() => {
                    setHoveredId(ing.id);
                    setActiveId(ing.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                  }}
                  className={`relative overflow-hidden w-full text-left p-6 rounded-2xl border transition-all duration-500 transform cursor-pointer flex items-center gap-4 hover:scale-[1.01] active:scale-95 z-0 ${
                    isHighlighted
                      ? "border-brand-black shadow-lg lg:translate-x-3 text-white"
                      : "bg-white text-black border-black/10 hover:border-black/30"
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-brand-black -z-10"
                    initial={{ x: "-101%" }}
                    animate={{ x: isHighlighted ? ["-101%", "0%"] : "101%" }}
                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 transition-all duration-500 ${
                    isHighlighted 
                      ? "bg-[#82D8C5]/20 border-[#82D8C5]/30 text-[#82D8C5]" 
                      : "bg-black/5 border-black/5 text-black/50"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <p className={`font-sans font-black text-xs uppercase tracking-wider leading-none mb-1.5 transition-colors duration-500 ${
                      isHighlighted ? "text-white" : "text-black"
                    }`}>
                      {ing.name}
                    </p>
                    <p className={`font-mono text-[9px] truncate uppercase tracking-widest transition-colors duration-500 ${
                      isHighlighted ? "text-[#82D8C5]" : "text-black/40"
                    }`}>
                      {ing.scientificName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Immersive microscopic visualizer, beautiful imagery & clinical facts ordered first on mobile */}
          <div className="w-full lg:w-[60%] bg-white rounded-3xl border border-black/10 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xs order-1 lg:order-2">
            <div className="absolute right-0 bottom-0 text-[180px] font-black leading-none text-[#82D8C5]/[0.05] pointer-events-none select-none font-serif">
              BIO
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.99, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Meta details with emerald/turquoise colors */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-6 mb-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#82D8C5] font-black">Clinical Concentration</span>
                    <span className="font-serif font-black text-2xl text-black">
                      {currentIng.percentage} Standard
                    </span>
                  </div>
                  <div className="bg-brand-black text-[#82D8C5] font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full select-none shadow-sm">
                    POTENT MATRIX
                  </div>
                </div>

                {/* Grid Split Content: Left image column, right detail column */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 flex-1">
                  
                  {/* Real Product/Formulation Image block! */}
                  <div className="md:col-span-12 lg:col-span-12 xl:col-span-5 relative aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[320px] lg:h-full bg-zinc-100 rounded-2xl overflow-hidden border border-black/5 shadow-xs">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
                    <span className="absolute bottom-3 left-3 text-white text-[9px] font-mono tracking-widest uppercase z-10">
                      LAB REVELATION
                    </span>
                  </div>

                  {/* Scientific Highlights Details */}
                  <div className="md:col-span-7 flex flex-col gap-6 justify-between">
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#82D8C5] uppercase block mb-1">
                          Molecular Purpose
                        </span>
                        <p className="font-serif text-[15px] font-black text-black uppercase tracking-wide leading-tight">
                          {currentIng.efficacy}
                        </p>
                      </div>
                      <div>
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase block mb-1">
                          Active Description
                        </span>
                        <p className="font-sans text-xs text-black/60 leading-relaxed">
                          {currentIng.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 bg-[#FAF9F5]/80 border border-black/5 rounded-2xl p-5">
                      <div>
                        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-[#82D8C5] uppercase block mb-1.5 flex items-center gap-1.5">
                          <Microscope className="w-3.5 h-3.5" /> Extraction Standard
                        </span>
                        <p className="font-sans text-xs text-black/70 leading-relaxed italic">
                          "{currentIng.extraction}"
                        </p>
                      </div>

                      <div className="border-t border-black/5 pt-4 mt-1">
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#82D8C5] uppercase block mb-2.5 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> Molecular Benefits
                        </span>
                        <ul className="space-y-2">
                          {currentIng.molecularBenefits.map((ben, idx) => (
                            <li key={idx} className="flex items-center gap-2 font-sans text-xs text-black/70">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5] shrink-0" />
                              <span>{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer clinical seal */}
                <div className="border-t border-black/5 pt-6 mt-auto flex items-center justify-between text-black/40 font-sans text-[10px] tracking-widest uppercase">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" /> PH BALANCED
                  </span>
                  <span>•</span>
                  <span>DERMATOLOGICALLY TESTED CERTIFIED</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
