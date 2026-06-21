/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ScrollReveal from "./ScrollReveal";
import AestheticVideoPlayer from "./AestheticVideoPlayer";
import AnimatedUnderline from "./AnimatedUnderline";

export default function FunEditorialSection() {
  return (
    <section id="fun-editorial" className="bg-[#F7F5F2] w-full py-24 px-4 md:px-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left slide text */}
        <div className="md:col-span-6 flex flex-col gap-6 items-start">
          <ScrollReveal direction="right" distance={35}>
            <h2 className="font-serif text-[42px] md:text-[62px] font-black leading-[1.15] text-brand-black tracking-tight uppercase">
              HAIRCARE SHOULD <br />
              BE HEALING. <br />
              NOT <AnimatedUnderline word="COMPLICATED" />. <br />
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150} direction="right" distance={25}>
            <div className="flex flex-col gap-2 border-l border-brand-lilac/30 pl-4 max-w-md mt-4">
              <span className="text-[12px] font-sans font-black text-brand-black uppercase tracking-widest">BUILD YOUR ROUTINE.</span>
              <p className="text-sm font-sans text-gray-500 leading-relaxed">
                A highly targeted ritual of concentrated treatment elixirs, active botanical scalp masks, and lightweight root-penetrating hair oils. Scientifically formulated to calm irritated follicles, lock in deep moisture, and amplify your natural luminous shine from within.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250} direction="right" distance={15}>
            <button
              onClick={() => {
                const target = document.getElementById("bestsellers-section");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 text-xs font-sans font-bold uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-70 transition-opacity cursor-pointer text-brand-black"
            >
              EXPLORE THE TREATMENT RANGE →
            </button>
          </ScrollReveal>
        </div>

        {/* Right slide video */}
        <div className="md:col-span-6 relative aspect-[4/5] bg-[#E0DEDA] shadow-lg rounded-2xl overflow-hidden">
          <ScrollReveal delay={200} direction="none" className="w-full h-full">
            <AestheticVideoPlayer />
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
