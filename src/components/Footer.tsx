/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Instagram, Twitter, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";

interface FooterProps {
  onGoHome: () => void;
}

export default function Footer({ onGoHome }: FooterProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to trigger smooth center zoom of H salon logo
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Luxury spring configurations for smooth responsiveness
  const smoothScale = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.4,
    restDelta: 0.0001
  });

  // Maps scroll progress to a glorious center-scaling zoom effect
  const logoScale = useTransform(smoothScale, [0.0, 0.95], [0.35, 1.05]);
  const logoOpacity = useTransform(smoothScale, [0.0, 0.85], [0.15, 1.0]);

  const toggleTab = (tabName: string) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <footer id="brand-footer" ref={footerRef} className="bg-[#F1EEF4] text-brand-black w-full pt-16 pb-12 px-4 md:px-12 relative select-none border-t border-brand-black/5 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* About the Brand Text Panel (Matching image 8 & 9) */}
        <div className="max-w-xl flex flex-col gap-3">
          <h4 className="font-serif text-[18px] md:text-[20px] font-bold text-[#8B7C68] uppercase">
            ABOUT THE BRAND
          </h4>
          <p className="text-[14px] md:text-[15px] font-sans text-gray-600 leading-relaxed">
            Good hair, scalp, and skincare should feel natural and restorative, not complicated. That’s why we focus on pure clinical active botanical formulas that heal irritated roots and skin.
          </p>
        </div>

        {/* SHOP + SUPPORT Collapsible accordions matching product page & image 8 */}
        <div className="flex flex-col border-t border-brand-black/10 mt-4 max-w-xl">
          
          {/* Shop Tab */}
          <div className="border-b border-brand-black/10 py-4">
            <button
              onClick={() => toggleTab("shop")}
              className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black cursor-pointer"
            >
              <span>Shop</span>
              {activeTab === "shop" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
            <AnimatePresence initial={false}>
              {activeTab === "shop" && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="pt-3 pb-1 flex flex-col gap-2.5 text-xs text-gray-500 font-sans pl-1">
                    <li><button className="hover:text-black hover:underline cursor-pointer">Bestsellers</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Scalp & Root Care</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Wellbeing Face Oils</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Restore & Gloss Serum</button></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Support Tab */}
          <div className="border-b border-brand-black/10 py-4">
            <button
              onClick={() => toggleTab("support")}
              className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black cursor-pointer"
            >
              <span>Support</span>
              {activeTab === "support" ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
            <AnimatePresence initial={false}>
              {activeTab === "support" && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="pt-3 pb-1 flex flex-col gap-2.5 text-xs text-gray-500 font-sans pl-1">
                    <li><button className="hover:text-black hover:underline cursor-pointer">Help center</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Shipping policy</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Free returns</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">FAQs</button></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Center Giant H salon logo designed to zoom in dynamically from center */}
        <div className="pt-8 pb-4 overflow-hidden flex justify-center items-center w-full">
          <motion.button
            onClick={onGoHome}
            style={{
              scale: logoScale,
              opacity: logoOpacity
            }}
            className="flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity duration-300 cursor-pointer select-none text-brand-lilac/80 hover:text-brand-lilac justify-center origin-center mx-auto uppercase leading-none"
          >
            <span className="font-sans font-black text-[90px] sm:text-[140px] md:text-[180px] tracking-tighter">H</span>
            <div className="flex flex-col items-start text-[22px] sm:text-[34px] md:text-[44px] font-black tracking-[0.2em] leading-[0.95] text-left">
              <span>SAL</span>
              <span>ON</span>
            </div>
          </motion.button>
        </div>

        {/* Socials & Copyrights */}
        <div className="flex flex-col gap-6 pt-2">
          {/* Social icons */}
          <div className="flex gap-4 items-center pl-1">
            <button className="hover:opacity-70 p-2 border border-brand-black/10 rounded-full cursor-pointer transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-gray-700" />
            </button>
            <button className="hover:opacity-70 p-2 border border-brand-black/10 rounded-full cursor-pointer transition-colors" aria-label="TikTok">
              <svg className="w-5 h-5 text-gray-700 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 3.48-.01 6.96-.02 10.43-.1 2.22-.98 4.45-2.73 5.87-1.89 1.58-4.52 2.19-6.95 1.74-2.84-.46-5.32-2.61-6.19-5.36-.97-3-.45-6.52 1.58-9.08 1.68-2.14 4.34-3.23 6.99-2.9v4.07c-1.43-.16-2.95.27-3.92 1.36-.88.97-1.12 2.45-.69 3.69.45 1.37 1.83 2.37 3.28 2.38 1.88.04 3.48-1.55 3.51-3.43V.02z" />
              </svg>
            </button>
            <button className="hover:opacity-70 p-2 border border-brand-black/10 rounded-full cursor-pointer transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="text-[12px] text-gray-400 font-sans tracking-wide">
            © 2026, H salon. Powered by Palo Alto. These products are not for sale.
          </div>
        </div>

      </div>
    </footer>
  );
}
