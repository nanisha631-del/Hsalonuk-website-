/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";

export default function HeroSection() {
  const settings = getShopifySettings();

  return (
    <section id="hero-showcase" className="w-full bg-brand-offwhite pt-24 sm:pt-28 pb-1 md:pb-12 px-4 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* The Framed Hero Card with precise aspect ratios corresponding to native images */}
        <div className="relative w-full aspect-[1792/2400] md:aspect-[2752/1536] bg-[#E8E8E8] rounded-2xl md:rounded-[36px] overflow-hidden shadow-xs flex items-end justify-center pb-12 sm:pb-24">
          
          {/* Background portrait of skin close-up or silent high-definition cinematic video loop */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden rounded-2xl md:rounded-[36px]">
            {/* Ambient silent background video loop */}
            <video
              src="/frame video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-[0.78] z-10"
              poster={settings.hero_image_url || "/hero section image.jpeg"}
            />
            {/* Fallback image layer behind video for smooth loading */}
            <div className="w-full h-full">
              <ScrollZoomImage
                src={settings.hero_image_url || "/hero section image.jpeg"}
                alt="Radiant Skin Beauty Hero Background"
                className="brightness-[0.85] object-center"
              />
            </div>
          </div>

          {/* Styled Center Hero Contents positioned lower */}
          <div className="relative z-10 text-center flex flex-col items-center gap-3 px-4 md:px-12 max-w-2xl select-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1.5"
            >
              <p className="text-white text-[11px] sm:text-xs font-sans tracking-[0.22em] font-extrabold uppercase bg-black/15 px-4.5 py-2 rounded-full backdrop-blur-[3px] shadow-sm inline-block">
                {settings.hero_subtitle || "Apothecary hair & scalp elixirs."}
              </p>
            </motion.div>

            {/* Pill button: SHOP PRODUCTS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="mt-3.5"
            >
              <button
                onClick={() => {
                  const next = document.getElementById("bestsellers-section");
                  if (next) next.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-brand-black px-11 py-4 rounded-full text-[11px] font-extrabold uppercase tracking-[0.22em] hover:bg-white/95 hover:scale-[1.03] transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
              >
                {settings.hero_cta_text || "SHOP PRODUCTS"}
              </button>
            </motion.div>
          </div>

          {/* Slow mouse down indicator inside the frame */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/50 text-[9px] uppercase font-sans tracking-widest">
            <span>Scroll down</span>
            <div className="w-[1px] h-4 bg-white/30" />
          </div>

        </div>
      </div>
    </section>
  );
}
