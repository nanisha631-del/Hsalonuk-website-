/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import ScrollZoomImage from "./ScrollZoomImage";
import { getShopifySettings } from "../shopifySettings";
import LuxuryButton from "./LuxuryButton";

export default function HeroSection() {
  const settings = getShopifySettings();

  return (
    <section id="hero-showcase" className="w-full bg-brand-offwhite pt-32 md:pt-[140px] pb-6 md:pb-12 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* The Taller Vertical Framed Hero Card on mobile and widescreen on desktop per request */}
        <div className="relative w-full aspect-[2/3] md:aspect-[16/9] bg-[#E8E8E8] rounded-[24px] md:rounded-[36px] overflow-hidden shadow-sm flex items-end justify-center pb-12 sm:pb-20">
          
          {/* Background portrait of skin close-up - Responsive with correct rounded top and bottom mirroring */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden rounded-[24px] md:rounded-[36px]">
            {/* Laptop view image - exact 16:9 aspect fit, no hover zoom cuts */}
            <div className="hidden md:block w-full h-full overflow-hidden">
              <motion.img
                src="/HERO IMAGE H SALON LAPTOP ONLY.png"
                alt="Radiant Hair and Scalp Elixir Hero Background"
                className="w-full h-full object-cover brightness-[0.95]"
                loading="eager"
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  scale: 1.06,
                  transition: { duration: 3.0, ease: "easeInOut" }
                }}
                transition={{
                  scale: { duration: 2.2, ease: "easeOut" },
                  opacity: { duration: 1.8, ease: "easeOut" },
                  default: { duration: 2.0, ease: "easeInOut" }
                }}
                onError={(e) => {
                  e.currentTarget.src = "/hero section image.jpeg";
                }}
              />
            </div>
            {/* Mobile view video - strictly replacing the image with the requested halon 1 video on mobile only */}
            <div className="block md:hidden w-full h-full">
              <video
                loop
                playsInline
                autoPlay
                muted
                preload="auto"
                className="w-full h-full object-cover brightness-[0.80]"
              >
                <source src="/halon 1.mp4" type="video/mp4" />
              </video>
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
              <LuxuryButton
                onClick={() => {
                  const next = document.getElementById("bestsellers-section");
                  if (next) next.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-brand-black px-11 py-4 rounded-full text-[11px] font-extrabold uppercase tracking-[0.22em] hover:bg-white/95 hover:scale-[1.03] transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
              >
                {settings.hero_cta_text || "SHOP PRODUCTS"}
              </LuxuryButton>
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
