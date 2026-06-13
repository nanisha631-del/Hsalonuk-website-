/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function ScrollingBanner() {
  const textItem = "PURA VIDA • DEEP NOURISHMENT • CROWN TREATMENT • APOTHECARY SHINE • SPA LUXURY ";
  const fullText = Array(12).fill(textItem).join(" • ");

  return (
    <section id="scrolling-banner" className="w-full h-[500px] md:h-[600px] relative overflow-hidden select-none">
      <ScrollReveal className="w-full h-full">
        {/* Background Ken Burns Animating Image */}
        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-full h-full bg-[#E8D5C4] relative"
        >
          {/* Extremely high end visual models photo - custom laptop/mobile versions */}
          <img
            src="/scroll banner photo laptop view.jpeg"
            alt="H Salon Luxury Hair treatments vibe - Laptop View"
            referrerPolicy="no-referrer"
            className="hidden md:block w-full h-full object-cover brightness-[0.92]"
          />
          <img
            src="/scroll banner photo mobile view.jpeg"
            alt="H Salon Luxury Hair treatments vibe - Mobile View"
            referrerPolicy="no-referrer"
            className="block md:hidden w-full h-full object-cover brightness-[0.92]"
          />
        </motion.div>

        {/* Text Marquee Overlay strip at bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-brand-black/25 backdrop-blur-[1px] py-6 border-t border-white/5 overflow-hidden z-20">
          <div className="flex whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
              className="font-serif italic text-[36px] md:text-[50px] font-medium text-white flex gap-6 tracking-wide text-nowrap pl-6 uppercase"
            >
              {fullText}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
