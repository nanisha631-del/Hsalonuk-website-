/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function HeaderMarquee() {
  const announcementText = "Free shipping on orders above $75 • Affordable skincare for everyone • New arrivals now live • ";
  const repeatedText = Array(8).fill(announcementText).join(" ");

  return (
    <div id="announcement-bar" className="w-full bg-brand-black text-white py-2 overflow-hidden z-40 relative select-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium flex gap-4 text-nowrap pl-4"
        >
          {repeatedText}
        </motion.div>
      </div>
    </div>
  );
}
