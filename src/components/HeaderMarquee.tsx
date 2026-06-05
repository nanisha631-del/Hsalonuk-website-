/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function HeaderMarquee() {
  return (
    <div id="announcement-bar" className="w-full bg-brand-lilac text-brand-black py-2.5 overflow-hidden z-40 relative select-none border-b border-brand-black/5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] leading-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 28,
          }}
          className="flex gap-12 text-nowrap pl-4 items-center"
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-3">
              <span>on orders over $75</span>
              <span className="underline decoration-1 underline-offset-4 cursor-pointer hover:opacity-80">SHOP NOW</span>
              <span className="text-[12px] h-4 leading-none">⭐️</span>
              <span>New customers save 10% with code FIRST10!</span>
              <span className="text-[12px] h-4 leading-none">⭐️</span>
              <span>New arrivals now live</span>
              <span className="text-[12px] h-4 leading-none">⭐️</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
