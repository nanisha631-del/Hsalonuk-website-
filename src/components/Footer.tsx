/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Instagram, Twitter, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useSharedState } from "../useSharedState";

interface FooterProps {
  onGoHome: () => void;
}

export default function Footer({ onGoHome }: FooterProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { updateState } = useSharedState();

  const handleOpenPolicy = (tab: "privacy" | "refund" | "shipping" | "terms") => {
    updateState({ policyModalOpen: true, policyTab: tab });
  };

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

  // Reusable sub-component to render smooth liquid color-filling from left to right on hover/activation
  const LiquidFillText = ({ text, isActive }: { text: string; isActive: boolean }) => {
    return (
      <span className="relative inline-block overflow-hidden pb-0.5">
        {/* Base Layer (Classic muted black) */}
        <span className="text-brand-black transition-colors duration-400">
          {text}
        </span>
        {/* Liquid Herbal green Active Layer */}
        <span
          style={{
            width: isActive ? "100%" : "0%",
            transition: "width 0.55s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
          className="absolute top-0 left-0 h-full text-[#2E6C4E] whitespace-nowrap overflow-hidden inline-block font-black select-none"
        >
          {text}
        </span>
      </span>
    );
  };

  return (
    <footer id="brand-footer" ref={footerRef} className="bg-[#F1EEF4] text-brand-black w-full pt-12 md:pt-16 pb-8 md:pb-12 px-4 md:px-12 relative select-none border-t border-brand-black/5 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-10">
        
        {/* Brand Info & Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 items-start border-b border-brand-black/10 pb-5 md:pb-10">
          {/* About the Brand Text Panel (Matching image 8 & 9) */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-[18px] md:text-[20px] font-bold text-[#8B7C68] uppercase">
              ABOUT THE BRAND
            </h4>
            <p className="text-[14px] md:text-[15px] font-sans text-gray-600 leading-relaxed">
              Good hair, scalp, and skincare should feel natural and restorative, not complicated. That’s why we focus on pure clinical active botanical formulas that heal irritated roots and skin.
            </p>
          </div>

          {/* Contact Information Panel */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-[18px] md:text-[20px] font-bold text-[#8B7C68] uppercase">
              CONTACT INFORMATION
            </h4>
            <div className="text-[13px] md:text-[14px] font-sans text-gray-600 leading-relaxed space-y-2">
              <p>
                <strong className="text-brand-black">Trade Name:</strong> H Salon
              </p>
              <p>
                <strong className="text-brand-black">Email:</strong>{" "}
                <a href="mailto:support@hsalon.uk" className="hover:underline text-[#2E6C4E] font-extrabold">
                  support@hsalon.uk
                </a>
              </p>
              <p>
                <strong className="text-brand-black">Physical Address:</strong> H Salon, 42 Old Broad Street, London, EC2N 1HP, United Kingdom
              </p>
              <p className="text-[11px] text-gray-500 pt-1 leading-normal">
                Operated by <strong className="text-brand-black font-semibold">H SALON LTD</strong> (Company No. 14605981). Registered Office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom.
              </p>
            </div>
          </div>
        </div>

        {/* SHOP + SUPPORT Collapsible accordions with liquid color fill and hover triggers */}
        <div className="flex flex-col border-t-0 md:border-t border-brand-black/10 mt-0 md:mt-2 max-w-xl">
          
          {/* Shop Tab with desktop mouse hover trigger */}
          <div 
            className="border-b border-brand-black/10 py-4 transition-colors duration-300"
            onMouseEnter={() => {
              if (window.innerWidth >= 1024) setActiveTab("shop");
            }}
            onMouseLeave={() => {
              if (window.innerWidth >= 1024) setActiveTab(null);
            }}
          >
            <button
              onClick={() => toggleTab("shop")}
              className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black cursor-pointer group/tab"
            >
              <LiquidFillText text="Shop" isActive={activeTab === "shop"} />
              <div className={`transition-transform duration-300 ${activeTab === "shop" ? "rotate-180" : ""}`}>
                {activeTab === "shop" ? <Minus className="w-4 h-4 text-[#2E6C4E]" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {activeTab === "shop" && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: 12 },
                    collapsed: { opacity: 0, height: 0, marginTop: 0 }
                  }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="pb-1 flex flex-col gap-2.5 text-xs text-gray-500 font-sans pl-1">
                    <li><button className="hover:text-black hover:underline cursor-pointer">Bestsellers</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Scalp & Root Care</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Wellbeing Face Oils</button></li>
                    <li><button className="hover:text-black hover:underline cursor-pointer">Restore & Gloss Serum</button></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Support Tab with desktop mouse hover trigger */}
          <div 
            className="border-b border-brand-black/10 py-4 transition-colors duration-300"
            onMouseEnter={() => {
              if (window.innerWidth >= 1024) setActiveTab("support");
            }}
            onMouseLeave={() => {
              if (window.innerWidth >= 1024) setActiveTab(null);
            }}
          >
            <button
              onClick={() => toggleTab("support")}
              className="w-full flex items-center justify-between text-left font-serif text-[17px] font-bold uppercase tracking-wider text-brand-black cursor-pointer group/tab"
            >
              <LiquidFillText text="Support" isActive={activeTab === "support"} />
              <div className={`transition-transform duration-300 ${activeTab === "support" ? "rotate-180" : ""}`}>
                {activeTab === "support" ? <Minus className="w-4 h-4 text-[#2E6C4E]" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence initial={false}>
              {activeTab === "support" && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: 12 },
                    collapsed: { opacity: 0, height: 0, marginTop: 0 }
                  }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="pb-1 flex flex-col gap-2.5 text-xs text-gray-500 font-sans pl-1">
                    <li><button onClick={() => handleOpenPolicy("privacy")} className="hover:text-black hover:underline cursor-pointer text-left">Privacy Policy</button></li>
                    <li><button onClick={() => handleOpenPolicy("shipping")} className="hover:text-black hover:underline cursor-pointer text-left">Shipping Policy</button></li>
                    <li><button onClick={() => handleOpenPolicy("refund")} className="hover:text-black hover:underline cursor-pointer text-left">Refund & Return Policy</button></li>
                    <li><button onClick={() => handleOpenPolicy("terms")} className="hover:text-black hover:underline cursor-pointer text-left">Terms of Service</button></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Center Giant H salon logo designed to zoom in dynamically from center */}
        <div className="pt-4 pb-2 md:pt-8 md:pb-4 overflow-hidden flex justify-center items-center w-full">
          <motion.button
            onClick={onGoHome}
            style={{
              scale: logoScale,
              opacity: logoOpacity
            }}
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity duration-300 cursor-pointer select-none text-brand-lilac/80 hover:text-brand-lilac justify-center origin-center mx-auto uppercase leading-none animate-fade-in"
          >
            <span className="font-sans font-normal text-[90px] sm:text-[130px] md:text-[170px] tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>H</span>
            <div className="flex flex-col justify-between h-[64px] sm:h-[92px] md:h-[120px] items-start text-[27px] sm:text-[39px] md:text-[51px] font-normal tracking-[0.16em] leading-none pl-1 sm:pl-1.5 md:pl-2" style={{ fontFamily: '"Inter", sans-serif' }}>
              <span className="block mt-[-2px]">SAL</span>
              <span className="block mb-[-3.5px]">ON</span>
            </div>
          </motion.button>
        </div>

        {/* Socials & Copyrights */}
        <div className="flex flex-col gap-4 md:gap-6 pt-1 md:pt-2">
          {/* Social icons */}
          <div className="flex gap-4 items-center pl-1">
            <a 
              href="https://www.instagram.com/hsalon.uk/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-70 p-2 border border-brand-black/10 rounded-full cursor-pointer transition-colors flex items-center justify-center bg-white" 
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-700" />
            </a>
            <a 
              href="https://www.tiktok.com/in/about" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-70 p-2 border border-brand-black/10 rounded-full cursor-pointer transition-colors flex items-center justify-center bg-white" 
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 text-gray-700 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 3.48-.01 6.96-.02 10.43-.1 2.22-.98 4.45-2.73 5.87-1.89 1.58-4.52 2.19-6.95 1.74-2.84-.46-5.32-2.61-6.19-5.36-.97-3-.45-6.52 1.58-9.08 1.68-2.14 4.34-3.23 6.99-2.9v4.07c-1.43-.16-2.95.27-3.92 1.36-.88.97-1.12 2.45-.69 3.69.45 1.37 1.83 2.37 3.28 2.38 1.88.04 3.48-1.55 3.51-3.43V.02z" />
              </svg>
            </a>
            <button className="hover:opacity-70 p-2 border border-brand-black/10 rounded-full cursor-pointer transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 text-[12px] text-gray-400 font-sans tracking-wide border-t border-brand-black/5 pt-4 md:pt-6">
            <div className="flex flex-col gap-2">
              <div>
                © 2026, H salon. Designed by Addy Growth Studio.
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <button onClick={() => handleOpenPolicy("privacy")} className="hover:text-brand-black hover:underline cursor-pointer transition-colors duration-200">Privacy Policy</button>
                <span className="text-gray-300 select-none">•</span>
                <button onClick={() => handleOpenPolicy("refund")} className="hover:text-brand-black hover:underline cursor-pointer transition-colors duration-200">Refund Policy</button>
                <span className="text-gray-300 select-none">•</span>
                <button onClick={() => handleOpenPolicy("shipping")} className="hover:text-brand-black hover:underline cursor-pointer transition-colors duration-200">Shipping Policy</button>
                <span className="text-gray-300 select-none">•</span>
                <button onClick={() => handleOpenPolicy("terms")} className="hover:text-brand-black hover:underline cursor-pointer transition-colors duration-200">Terms of Service</button>
              </div>
            </div>

            {/* Payment gateway image */}
            <div className="flex items-center pt-2 md:pt-0">
              <img 
                src="/hsalon gateway.png" 
                alt="Payment Gateways" 
                className="h-7 md:h-8 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
