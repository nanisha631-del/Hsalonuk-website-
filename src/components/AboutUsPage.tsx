/**
 * Copyright 2026 Google LLC
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { Sparkles, ShieldCheck, Heart, Wind, Flower, Droplets, Compass, ArrowRight } from "lucide-react";

interface AboutUsPageProps {
  onBackToHome: () => void;
  onNavigateToShop?: () => void;
}

export default function AboutUsPage({ onBackToHome, onNavigateToShop }: AboutUsPageProps) {
  // Scroll to top on load to ensure smooth entry
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div id="about-us-page" className="w-full bg-brand-offwhite pt-28 pb-24 px-4 md:px-8 lg:px-16 animate-fade-in text-brand-black selection:bg-[#82D8C5]/30">
      
      {/* SECTION 1: ASYMMETRICAL EDITORIAL HERO */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 pb-16">
        
        {/* Left column: Typography / Concept */}
        <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
          <div className="flex items-center gap-2 text-[#82D8C5] tracking-widest text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skin • Scalp • Self</span>
          </div>
          
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-brand-black uppercase">
            Our Story <br />
            <span className="font-normal italic text-brand-lilac/90">&amp; Philosophy</span>
          </h1>
          
          <div className="w-16 h-[1.5px] bg-[#82D8C5] my-6" />
          
          <p className="font-sans text-lg md:text-xl text-brand-black/80 font-light leading-relaxed max-w-2xl">
            At H Salon, we believe scalp care is the ultimate form of self-care. British founded and plant-powered, we craft premium formulas that nourish hair at the root with balance, clinical science, and conscious intention.
          </p>
          
          <p className="font-mono text-xs text-brand-black/50 uppercase tracking-[0.2em] pt-2">
            London, United Kingdom — Est. 2018
          </p>
        </div>

        {/* Right column: High-fashion organic landscape vertical image */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-brand-black/5 group">
            <div className="absolute inset-0 bg-[#82D8C5]/5 z-10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
            <img 
              src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1000&auto=format&fit=crop&q=80" 
              alt="Intrepid Botanical Elements" 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <span className="font-mono text-[9px] tracking-widest text-[#5ba192] uppercase font-bold block mb-1">
                Active Botanical Sourcing
              </span>
              <p className="font-sans text-xs text-brand-black/70 italic">
                Sustainably hand-harvested wild rosemary and raw lipids, preserves peak bio-potency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE FOUNDER'S JOURNEY WITH SPLIT IMAGE */}
      <div className="bg-[#EDEDE9]/30 rounded-3xl p-8 md:p-12 lg:p-16 max-w-7xl mx-auto my-12 border border-brand-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Circular framed ambient photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl group">
              <div className="absolute inset-0 bg-brand-lilac/10 z-10 mix-blend-screen" />
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80" 
                alt="Our Founder Annabel" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-8 z-20">
                <p className="font-serif text-white text-lg tracking-wider italic">
                  Annabel • Founder &amp; Herbal Specialist
                </p>
              </div>
            </div>
          </div>

          {/* Deep narrative copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-mono text-xs tracking-widest text-[#82D8C5] uppercase font-bold">
              The Journey of Intention
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-black leading-tight">
              "We synthesize active clinical performance with natural bio-cellular ingredients."
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-black/70 leading-relaxed">
              H Salon was born in the peaceful landscapes of the United Kingdom from a single realisation: the modern commercial hair industry relies heavily on aggressive chemical detergents, artificial silicones, and synthetic fillers that erode the scalp micro-biome. 
            </p>
            <p className="font-sans text-sm md:text-base text-brand-black/70 leading-relaxed">
              To change this paradigm, our founding team set out to consult with leading European biologists and botanical apothecaries. Together, we crafted a high-potency collection that respects the skin, heals the follicle, and transforms home wellness routines into moments of pure, relaxing self-connection.
            </p>
            
            <div className="pt-4 border-t border-brand-black/10 flex items-center justify-between">
              <div>
                <p className="font-serif text-lg font-bold text-brand-black">Annabel S.</p>
                <p className="font-sans text-xs text-brand-black/50 uppercase tracking-widest">H Salon Founder</p>
              </div>
              {/* Artistic script decoration representing signature */}
              <div className="font-serif text-3xl italic text-[#82D8C5] tracking-widest pr-4 select-none opacity-80">
                Annabel.S
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SENSORY EXPERIENTIAL PHOTO GALLERY */}
      <div className="max-w-7xl mx-auto py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs tracking-widest text-[#82D8C5] uppercase font-bold">
            Sensory Aesthetics
          </span>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-brand-black">
            Nourished From Root to Tip
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-black/60 leading-relaxed">
            Take a glimpse inside our conscious botanical extraction, clinical lab balance, and luxurious spa treatments.
          </p>
        </div>

        {/* 3-Image Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="space-y-4 text-left group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-brand-black/5 shadow-md relative">
              <img 
                src="https://images.unsplash.com/photo-1519738012095-2d7e34e5a2c1?w=800&auto=format&fit=crop&q=80" 
                alt="Pure Botanical Extractions"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest">Phase 01</span>
                <p className="font-serif text-white text-lg font-medium">Pure Botanicals</p>
              </div>
            </div>
            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
              Every drop of oil is cold-pressed in small batches, ensuring delicate plant liposomes are preserved for skin relief.
            </p>
          </div>

          {/* Card 2 */}
          <div className="space-y-4 text-left group md:translate-y-6">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-brand-black/5 shadow-md relative">
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80" 
                alt="Clinical Testing"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest">Phase 02</span>
                <p className="font-serif text-white text-lg font-medium">Scientific Balance</p>
              </div>
            </div>
            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
              Rigorous laboratory testing ensures precise dermatological compatibility for even the most sensitive scalps.
            </p>
          </div>

          {/* Card 3 */}
          <div className="space-y-4 text-left group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-brand-black/5 shadow-md relative">
              <img 
                src="https://images.unsplash.com/photo-1608248597481-496100c80836?w=800&auto=format&fit=crop&q=80" 
                alt="Applied Treatment Meditation"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest">Phase 03</span>
                <p className="font-serif text-white text-lg font-medium">Elevated Rituals</p>
              </div>
            </div>
            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
              Formulated to turn basic daily grooming into an oasis of relaxation, calming both mind and nervous system.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 4: INTERACTIVE BRAND CORE PILLARS */}
      <div className="max-w-7xl mx-auto py-16">
        <hr className="border-brand-black/10 my-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-12">
          
          <div className="lg:pr-8 space-y-4 text-left">
            <span className="font-mono text-xs tracking-widest text-[#82D8C5] uppercase font-bold">
              Our Ethos
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-brand-black">
              The Three Core Pillars Of H Salon
            </h3>
            <p className="font-sans text-sm text-brand-black/60 leading-relaxed">
              We operate at the beautiful intersection of scientific purity, sensual delight, and absolute product safety.
            </p>
          </div>

          {/* Pillar Grid Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-black/5 hover:border-[#82D8C5]/40 transition-all duration-300 hover:shadow-lg space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] group-hover:scale-110 group-hover:bg-[#82D8C5]/20 transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-brand-black uppercase">
                Performance Driven
              </h4>
              <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
                We combine legendary active organic extracts with proven biotics and clean peptides to restore healthy micro-biome defense. No compromises, just real results.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-black/5 hover:border-[#82D8C5]/40 transition-all duration-300 hover:shadow-lg space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] group-hover:scale-110 group-hover:bg-[#82D8C5]/20 transition-all">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-brand-black uppercase">
                Universal Usability
              </h4>
              <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
                Thoughtfully formulated for all hair textures, scalp conditions, and skin types. Our formulations adjust naturally to restore optimal pH balance for everyone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-black/5 hover:border-[#82D8C5]/40 transition-all duration-300 hover:shadow-lg space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] group-hover:scale-110 group-hover:bg-[#82D8C5]/20 transition-all">
                <Flower className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-brand-black uppercase">
                Sensory Indulgence
              </h4>
              <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
                Captivating subtle herbal aromatics and textures designed to trigger calming sensory feedback, enabling true mindfulness inside busy modern lifestyles.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-black/5 hover:border-[#82D8C5]/40 transition-all duration-300 hover:shadow-lg space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] group-hover:scale-110 group-hover:bg-[#82D8C5]/20 transition-all">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-brand-black uppercase">
                Apothecary Purity
              </h4>
              <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
                Entirely clean formulas with zero harsh sulfates, animal fats, silicones, synthetic parabens, or micro-plastics that build up on hair shafts.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 5: THE CONSCIOUS WELLNESS CREDO TIMELINE */}
      <div className="max-w-7xl mx-auto py-16 border-t border-brand-black/10">
        <div className="text-center space-y-4 mb-12">
          <span className="font-mono text-xs tracking-widest text-[#82D8C5] uppercase font-bold">
            Conscious Standards
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-black uppercase">
            Our Sustainable Ethics
          </h2>
          <div className="w-12 h-0.5 bg-[#82D8C5] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-4">
          
          <div className="space-y-3 p-6 bg-white rounded-2xl border border-brand-black/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#82D8C5]/10 flex items-center justify-center text-[#559285] mx-auto text-xl font-serif font-black">
              1
            </div>
            <h4 className="font-serif text-lg text-brand-black">Skin, Scalp, Self</h4>
            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
              We design every single remedy on the medical and scientific basis that perfect scalp nourishment is the only true way to get lifelong hair luster.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-white rounded-2xl border border-brand-black/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#82D8C5]/10 flex items-center justify-center text-[#559285] mx-auto text-xl font-serif font-black">
              2
            </div>
            <h4 className="font-serif text-lg text-brand-black">Conscious Formulations</h4>
            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
              100% cruelty-free, organic sourcing. We partner only with sustainable farmers who harvest plant lipids with minimal soil disruption.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-white rounded-2xl border border-brand-black/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#82D8C5]/10 flex items-center justify-center text-[#559285] mx-auto text-xl font-serif font-black">
              3
            </div>
            <h4 className="font-serif text-lg text-brand-black">Premium Spa Heritage</h4>
            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">
              Formulated to meet the highest performance benchmarks, proudly showcased inside elite wellness havens like the YĀTRĀ Signature Spa in Mayfair.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 6: ELEVATED BRAND CALL TO ACTION */}
      <div className="max-w-5xl mx-auto mt-16 bg-gradient-to-br from-brand-black to-[#2A2B27] rounded-3xl p-8 md:p-14 text-center space-y-6 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#82D8C5]/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-brand-lilac/5 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-widest text-[#82D8C5] uppercase font-bold">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">
            Ready to experience clinical plant therapy?
          </h2>
          <p className="font-sans text-sm text-white/70 leading-relaxed">
            Elevate your everyday scalp health routine with our award-winning Snail Silk® Scalp Mask and Ground Recovery Oil®. 
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onNavigateToShop || onBackToHome}
              className="group bg-[#82D8C5] hover:bg-[#97e3d1] text-brand-black font-sans font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              Shop The Collection
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={onBackToHome}
              className="text-white hover:text-[#82D8C5] border border-white/20 hover:border-[#82D8C5]/40 font-sans text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
