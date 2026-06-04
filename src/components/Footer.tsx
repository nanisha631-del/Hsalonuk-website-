/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface FooterProps {
  onGoHome: () => void;
}

export default function Footer({ onGoHome }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="brand-footer" className="bg-brand-black text-white w-full pt-20 pb-12 px-4 md:px-12 relative overflow-hidden select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Segment layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Newsletter subscription input style (underline, no border) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C4B5D4]">NEWSLETTER</span>
            <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-white tracking-tight leading-tight">
              Get 10% off your first beauty order. Complete the look.
            </h3>
            
            <form onSubmit={handleSubmit} className="flex gap-4 items-end mt-4">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                className="bg-transparent border-b border-white/20 focus:border-white py-2 text-white font-sans text-xs tracking-wider outline-none flex-1 font-semibold uppercase placeholder-gray-500 rounded-none"
              />
              <button
                type="submit"
                className="bg-white hover:bg-brand-lilac hover:text-brand-black text-brand-black font-sans font-bold text-[11px] uppercase tracking-widest px-6 py-2.5 transition-all cursor-pointer rounded-none"
              >
                {subscribed ? "THANK YOU!" : "SUBSCRIBE"}
              </button>
            </form>

            <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
              By subscribing, you agree to receive promotional cosmetics newsletters. View privacy policy details anytime.
            </span>
          </div>

          {/* Column 2: Blank spacer for layout rhythm */}
          <div className="md:col-span-2 hidden md:block" />

          {/* Column 3: Link grids */}
          <div className="md:col-span-5 grid grid-cols-3 gap-6 text-left">
            
            {/* Grid cell 1 */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#999]">SHOP</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                <li><button className="hover:text-white hover:underline cursor-pointer">Bestsellers</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Face glow</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Lip balms</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Eye shadows</button></li>
              </ul>
            </div>

            {/* Grid cell 2 */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#999]">ABOUT</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                <li><button className="hover:text-white hover:underline cursor-pointer">Our story</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Manifesto</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Vegan specs</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Careers</button></li>
              </ul>
            </div>

            {/* Grid cell 3 */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#999]">SUPPORT</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
                <li><button className="hover:text-white hover:underline cursor-pointer">Help center</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Shipping policy</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">Free returns</button></li>
                <li><button className="hover:text-white hover:underline cursor-pointer">FAQs</button></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Center Giant phenomena title */}
        <div className="text-center pt-8 border-t border-white/5">
          <button
            onClick={onGoHome}
            className="font-serif font-black text-[60px] sm:text-[100px] md:text-[160px] leading-none tracking-[0.1em] text-white/5 hover:text-white/10 transition-colors uppercase border-none block w-full mt-4 cursor-pointer"
          >
            PHENOMENA
          </button>
        </div>

        {/* Bottom row copyrights and socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest border-t border-white/5 pt-8">
          <div>
            © 2026, Palo-Alto-Theme-Phenomena. Built with React and absolute luxury. All rights reserved.
          </div>
          <div className="flex gap-6 items-center">
            <button className="hover:text-white p-1" aria-label="Instagram"><Instagram className="w-4 h-4" /></button>
            <button className="hover:text-white p-1" aria-label="Twitter"><Twitter className="w-4 h-4" /></button>
            <button className="hover:text-white p-1" aria-label="Youtube"><Youtube className="w-4 h-4" /></button>
          </div>
        </div>

      </div>
    </footer>
  );
}
