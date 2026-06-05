/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { getShopifySettings } from "../shopifySettings";

export default function HeaderMarquee() {
  const settings = getShopifySettings();
  const text = settings.announcement_text || "ON ORDERS OVER $75 ★ SHOP NOW ★ NEW CUSTOMERS SAVE 10% WITH CODE FIRST10! ★ NEW ARRIVALS NOW LIVE";

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
          className="flex gap-12 text-nowrap pl-4 items-center animate-marquee"
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>{text}</span>
              <span className="text-[12px] h-4 leading-none">⭐️</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

