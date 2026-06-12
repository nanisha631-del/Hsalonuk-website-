/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { motion } from "motion/react";
import { getShopifySettings } from "../shopifySettings";

export default function HeaderMarquee() {
  const settings = getShopifySettings();
  const text = settings.announcement_text || "ON ORDERS OVER $75 ★ SHOP NOW ★ NEW CUSTOMERS SAVE 10% WITH CODE FIRST10! ★ NEW ARRIVALS NOW LIVE";

  const speedVal = settings.announcement_speed ? parseFloat(settings.announcement_speed) : 28;
  const bg = settings.announcement_bg_color || undefined;
  const color = settings.announcement_text_color || undefined;
  const fontSize = settings.announcement_text_size || "11px";

  const customStyle: React.CSSProperties = {};
  if (bg) customStyle.backgroundColor = bg;
  if (color) customStyle.color = color;
  customStyle.fontSize = fontSize;

  return (
    <div 
      id="announcement-bar" 
      className="w-full bg-brand-lilac text-brand-black py-2.5 overflow-hidden z-40 relative select-none border-b border-brand-black/5 font-sans font-bold uppercase tracking-[0.2em] leading-none"
      style={customStyle}
    >
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: isNaN(speedVal) ? 28 : speedVal,
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

