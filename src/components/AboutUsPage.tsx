/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { Sparkles, FlaskConical, Award, ShieldCheck, Heart } from "lucide-react";

interface AboutUsPageProps {
  onBackToHome: () => void;
}

export default function AboutUsPage({ onBackToHome }: AboutUsPageProps) {
  return (
    <div id="about-us-page" className="w-full bg-brand-offwhite pt-32 pb-24 px-4 md:px-12 animate-fade-in text-brand-black">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Navigation / Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#82D8C5]">
            <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Home</span>
            <span>/</span>
            <span>About</span>
          </div>
          <h1 
            className="font-sans font-black text-4xl md:text-[56px] leading-[0.9] tracking-normal uppercase text-brand-black"
            style={{ wordSpacing: "0.3em" }}
          >
            LABORATORY DIARY
          </h1>
          <p className="font-sans text-xs md:text-sm text-brand-black/60 tracking-wider max-w-lg mx-auto uppercase">
            EST. 2018 — LONDON, MAYFAIR CLINIC
          </p>
          <div className="w-12 h-0.5 bg-[#82D8C5] mx-auto mt-4" />
        </div>

        {/* Editorial Brand Image Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-brand-black/15 shadow-xl bg-white select-none">
          <img 
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1600&auto=format&fit=crop&q=80" 
            alt="Laboratory Sourcing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8">
            <p className="font-sans font-semibold text-lg md:text-2xl text-white text-center italic max-w-2xl leading-relaxed">
              "We synthesize active clinical performance with natural bio-cellular botanical lipids for restorative hair health."
            </p>
          </div>
        </div>

        {/* Brand Mission Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
          <div className="space-y-4">
            <h3 className="font-sans font-black text-xl uppercase tracking-wider text-brand-black flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-[#82D8C5]" /> Molecular Sourcing
            </h3>
            <p className="font-sans text-xs md:text-sm text-brand-black/70 leading-relaxed">
              Founded in Mayfair, London, H Salon emerged from a critical realization: standard commercial haircare products rely heavily on sulfates and silicone compounds to generate temporary chemical gloss, causing long-term degradation of the scalp's delicate stratum corneum.
            </p>
            <p className="font-sans text-xs md:text-sm text-brand-black/70 leading-relaxed">
              Our clinical laboratory team re-engineered high-gloss hair repair from first principles. By combining active peptides, plant-derived squalane, rosemary botanicals, and high-purity natural lipids, we formulated products that naturally nourish and construct hair fibers from within.
            </p>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-2xl border border-brand-black/5 shadow-xs">
            <h3 className="font-sans font-black text-xs uppercase tracking-widest text-[#82D8C5]">Laboratory Quality Standards</h3>
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#82D8C5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-brand-black uppercase">Zero Sulfates or Parabens</h4>
                  <p className="font-sans text-[11px] text-brand-black/50 leading-normal">Safeguards the natural lipid barrier against dry scalp erosion and redness.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#82D8C5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-brand-black uppercase">Dermatologically Certified</h4>
                  <p className="font-sans text-[11px] text-brand-black/50 leading-normal">Monitored clinically inside independent research trials for high tolerance with sensitive skin.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#82D8C5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-brand-black uppercase">Clinically Bio-Active</h4>
                  <p className="font-sans text-[11px] text-brand-black/50 leading-normal">Infused with active botanicals, tea-tree peptides, hyaluronic acids, and squalanes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sourcing Timeline */}
        <div className="border-t border-brand-black/10 pt-10 text-center space-y-6">
          <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black">Our Integrity Ethos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] mx-auto text-lg font-bold">1</div>
              <h4 className="font-sans font-bold text-xs text-brand-black uppercase">Ethic Sourcing</h4>
              <p className="font-sans text-[11px] text-brand-black/60">We trace every flower extraction back to trusted organic farmers who cultivate sustainably without chemical pesticides.</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] mx-auto text-lg font-bold">2</div>
              <h4 className="font-sans font-bold text-xs text-brand-black uppercase">Amber Glass</h4>
              <p className="font-sans text-[11px] text-brand-black/60">Using 100% recyclable heavy dark amber-glass containers to block UV glare and prevent molecular decomposition.</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#82D8C5]/10 flex items-center justify-center text-[#82D8C5] mx-auto text-lg font-bold">3</div>
              <h4 className="font-sans font-bold text-xs text-brand-black uppercase">Small Batches</h4>
              <p className="font-sans text-[11px] text-brand-black/60">Freshly manufactured in small therapeutic quantities every 60 days in London to guarantee bio-activity.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
