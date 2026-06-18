/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { getShopifySettings } from "../shopifySettings";

export default function HeaderMarquee() {
  const settings = getShopifySettings();
  const text = settings.announcement_text || "ON ORDERS OVER $75 ★ SHOP NOW ★ NEW CUSTOMERS SAVE 10% WITH CODE FIRST10! ★ NEW ARRIVALS NOW LIVE";

  const speedVal = settings.announcement_speed ? parseFloat(settings.announcement_speed) * 1.6 : 48;
  const bg = settings.announcement_bg_color || undefined;
  const color = settings.announcement_text_color || undefined;
  const fontSize = settings.announcement_text_size || "11px";
  const [isPaused, setIsPaused] = useState(false);

  const customStyle: React.CSSProperties = {};
  if (bg) customStyle.backgroundColor = bg;
  if (color) customStyle.color = color;
  customStyle.fontSize = fontSize;

  return (
    <div 
      id="announcement-bar" 
      className="w-full bg-brand-lilac text-brand-black py-2.5 overflow-hidden z-40 relative select-none border-b border-brand-black/5 font-sans font-bold uppercase tracking-[0.2em] leading-none cursor-pointer"
      style={customStyle}
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        <div
          className="flex gap-12 text-nowrap pl-4 items-center animate-marquee shrink-0 py-0.5"
          style={{ 
            animationDuration: `${isNaN(speedVal) ? 48 : speedVal}s`,
            animationPlayState: isPaused ? "paused" : "running"
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {Array(12).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>{text}</span>
              <span className="text-[12px] h-4 leading-none">⭐️</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

