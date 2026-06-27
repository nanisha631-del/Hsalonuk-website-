/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Check, Sparkles, Copy, ArrowRight, Gift, Percent } from "lucide-react";
import { useSharedState } from "../useSharedState";

// Confetti item shooting from Left side
const LeftConfetti = ({ index }: { index: number; key?: React.Key }) => {
  const colors = ["#82D8C5", "#8B7C68", "#2E6C4E", "#FAF8FC", "#D1C4E9"];
  const color = colors[index % colors.length];
  const delay = index * 0.03;
  const size = index % 2 === 0 ? 9 : 6;
  const rotation = index * 30;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, y: 0, x: 0 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [1, 1.6, 0.4],
        y: [0, -150 - (index * 8) % 200],
        x: [0, 50 + ((index * 17) % 250)], // Shoots to the right
        rotate: [0, rotation, rotation * 3]
      }}
      transition={{
        duration: 2.2,
        delay: delay,
        ease: "easeOut"
      }}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: index % 3 === 0 ? "50%" : "2px",
        position: "absolute",
        bottom: "10%",
        left: "5%",
        zIndex: 60
      }}
    />
  );
};

// Confetti item shooting from Right side
const RightConfetti = ({ index }: { index: number; key?: React.Key }) => {
  const colors = ["#82D8C5", "#8B7C68", "#2E6C4E", "#FAF8FC", "#D1C4E9"];
  const color = colors[index % colors.length];
  const delay = index * 0.03;
  const size = index % 2 === 0 ? 9 : 6;
  const rotation = index * 30;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, y: 0, x: 0 }}
      animate={{
        opacity: [1, 1, 0],
        scale: [1, 1.6, 0.4],
        y: [0, -150 - (index * 8) % 200],
        x: [0, -50 - ((index * 17) % 250)], // Shoots to the left
        rotate: [0, rotation, -rotation * 3]
      }}
      transition={{
        duration: 2.2,
        delay: delay,
        ease: "easeOut"
      }}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: index % 3 === 0 ? "50%" : "2px",
        position: "absolute",
        bottom: "10%",
        right: "5%",
        zIndex: 60
      }}
    />
  );
};

export default function AestheticDiscountPopup() {
  const { updateState } = useSharedState();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  // Read already claimed states to make sure we do not re-popup if already claimed
  useEffect(() => {
    const savedPromo = localStorage.getItem("hsalon-applied-promo");
    const savedClaimed = localStorage.getItem("hsalon-claimed-discount");
    
    if (savedPromo === "FIRST10" || savedClaimed === "true") {
      setIsClaimed(true);
    } else {
      // Elegant slow entry: open 3 seconds after load so they absorb the luxury brand first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync state if user applies/removes code externally
  useEffect(() => {
    const checkState = () => {
      const savedPromo = localStorage.getItem("hsalon-applied-promo");
      const savedClaimed = localStorage.getItem("hsalon-claimed-discount");
      if (savedPromo === "FIRST10" || savedClaimed === "true") {
        setIsClaimed(true);
      } else {
        setIsClaimed(false);
      }
    };
    window.addEventListener("storage", checkState);
    const interval = setInterval(checkState, 1500);
    return () => {
      window.removeEventListener("storage", checkState);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Track that they dismissed the initial popup so it doesn't auto-open again,
    // but the mini floating pill button will appear so they can claim it whenever they are ready!
    localStorage.setItem("hsalon-dismissed-popup", "true");
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMsg("Please enter your email to proceed.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg("Please enter a valid luxury wellness email.");
      return;
    }

    // Process real 10% discount pre-activation:
    setIsClaimed(true);
    setTriggerConfetti(true);
    
    // Write state
    localStorage.setItem("hsalon-applied-promo", "FIRST10");
    localStorage.setItem("hsalon-claimed-discount", "true");

    // Dispatch custom event to notify CartDrawer instantly
    window.dispatchEvent(new Event("storage"));

    // Keep confetti running
    setTimeout(() => {
      setTriggerConfetti(false);
    }, 4000);
  };

  const handleCopyAndApply = () => {
    navigator.clipboard.writeText("FIRST10");
    setCopied(true);
    
    // Automatically trigger cart opening so they can see their applied discount code
    setTimeout(() => {
      updateState({ cartOpen: true });
      setIsOpen(false);
    }, 1000);
  };

  return (
    <>
      {/* 1. MAIN MODAL POPUP RENDER */}
      <AnimatePresence>
        {isOpen && (
          <div id="discount-popup-portal" className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            
            {/* Ambient Blurred Overlap Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 bg-brand-black/40 backdrop-blur-md cursor-pointer"
              onClick={handleClose}
            />

            {/* Main Interactive Dialog: Styled to perfection with left column image and right column form */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 220, damping: 24 }
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0, 
                y: 20,
                transition: { duration: 0.4, ease: "easeIn" }
              }}
              className="bg-brand-offwhite w-full max-w-[850px] min-h-[460px] border border-brand-black/15 shadow-2xl rounded-2xl overflow-hidden relative select-none flex flex-col md:flex-row z-[120] text-brand-black"
            >
              {/* Dual Party Popper Confetti simulations inside the popup card */}
              {triggerConfetti && (
                <>
                  {/* Left popper bursts */}
                  {Array.from({ length: 35 }).map((_, i) => (
                    <LeftConfetti key={`l-${i}`} index={i} />
                  ))}
                  {/* Right popper bursts */}
                  {Array.from({ length: 35 }).map((_, i) => (
                    <RightConfetti key={`r-${i}`} index={i} />
                  ))}
                </>
              )}

              {/* Close Button Trigger Corner */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-black/5 text-brand-black cursor-pointer transition-colors z-30"
                aria-label="Close promotion dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT COLUMN: Luxurious Brand Showcase Image Frame */}
              <div className="w-full md:w-[45%] relative min-h-[180px] md:min-h-full bg-[#1A1A1A] overflow-hidden flex flex-col justify-end p-6 select-none border-b md:border-b-0 md:border-r border-brand-black/10">
                {/* Visual Image container with fallback for maximum reliability */}
                <img 
                  src="/the main image frame pouch.jpeg" 
                  alt="H Salon Luxury Botanical Rituals" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 brightness-[0.75] transition-transform duration-[4000ms] hover:scale-105"
                  onError={(e) => {
                    // Fallback to secondary asset if pouch isn't present
                    e.currentTarget.src = "/cap h salon product image.jpg";
                  }}
                />
                
                {/* Soft decorative vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent pointer-events-none" />

                {/* Left column aesthetic badge overlays */}
                <div className="relative z-10 space-y-1.5 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#82D8C5] font-extrabold block">
                    HARVESTED BY HAND
                  </span>
                  <h4 className="font-serif text-[18px] sm:text-[22px] font-black uppercase tracking-tight leading-tight">
                    Snail Silk® Scalp Care
                  </h4>
                  <p className="text-gray-300 font-sans text-[11px] leading-relaxed max-w-xs font-medium">
                    A refined weekly treatment designed to soothe root irritation, nurture growth, and revive shine.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Form Content & Coupon Activation */}
              <div className="w-full md:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative bg-brand-offwhite">
                <AnimatePresence mode="wait">
                  {!isClaimed ? (
                    /* STATE A: Get Discount Email Form */
                    <motion.div
                      key="form-view"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-5"
                    >
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1 text-[#8B7C68]">
                          <Sparkles className="w-4 h-4 text-[#82D8C5] animate-pulse" />
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-extrabold">
                            Apothecary Invitation
                          </span>
                        </div>
                        <h3 className="font-serif text-[28px] sm:text-[36px] font-black leading-none uppercase tracking-tight text-brand-black">
                          Claim 10% Off
                        </h3>
                        <p className="font-serif text-[13px] sm:text-[14px] font-bold text-gray-500 italic mt-0.5">
                          On your first botanical wellness order
                        </p>
                      </div>

                      <p className="text-gray-500 font-sans text-[12px] leading-relaxed text-left">
                        Unlock immediate eligibility for a complimentary <strong className="text-brand-black font-extrabold">10% discount</strong> on our entire range. Join our community to receive botanical insights and luxury scalp care advice.
                      </p>

                      <form onSubmit={handleSubmitEmail} className="space-y-3.5 mt-2">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
                          <input
                            type="email"
                            required
                            placeholder="Enter your email to unlock savings..."
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrorMsg("");
                            }}
                            className="w-full bg-white text-xs sm:text-sm text-brand-black placeholder-gray-400 border border-brand-black/10 rounded-full pl-11 pr-4 py-4 focus:outline-none focus:border-[#82D8C5] transition-all font-sans font-medium shadow-xs"
                          />
                        </div>

                        {errorMsg && (
                          <p className="text-red-500 text-[11px] font-sans font-bold leading-none text-left pl-1">
                            {errorMsg}
                          </p>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-brand-black hover:bg-[#82D8C5] text-white hover:text-brand-black py-4 text-xs font-black uppercase tracking-[0.22em] rounded-full transition-all duration-300 hover:scale-[1.01] active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                        >
                          ACTIVATE MY SAVINGS <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </form>

                      <p className="text-[10px] text-gray-400 font-sans leading-relaxed text-left">
                        We value your privacy. We formulation-cured your personal information securely. Opt-out of insights at any time.
                      </p>
                    </motion.div>
                  ) : (
                    /* STATE B: Unlock Promo Ticket Success */
                    <motion.div
                      key="success-view"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.35 }}
                      className="text-left space-y-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-600 font-bold block">
                            PROMO CODE UNLOCKED
                          </span>
                          <h3 className="font-serif text-[20px] sm:text-[24px] font-black uppercase tracking-tight text-brand-black leading-none mt-0.5">
                            Welcome To H Salon
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                        Your discount has been verified and <strong className="text-brand-black font-extrabold">pre-loaded into your active cart!</strong> Enjoy 10% off your scalp recovery products.
                      </p>

                      <div className="bg-white border border-dashed border-brand-black/20 rounded-xl p-4 flex flex-col gap-2 relative mt-1">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Your 10% Coupon Code:</span>
                        <div className="flex items-center justify-between bg-brand-offwhite rounded-md p-3.5 border border-brand-black/5">
                          <span className="font-mono text-[16px] sm:text-[18px] font-extrabold tracking-widest text-brand-black select-all">
                            FIRST10
                          </span>
                          <button
                            onClick={handleCopyAndApply}
                            className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-brand-black hover:bg-[#82D8C5] hover:text-brand-black text-white px-3.5 py-2 rounded transition-colors cursor-pointer select-none"
                          >
                            {copied ? "Copied" : "Copy Code"}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleCopyAndApply}
                        className="w-full bg-brand-black hover:bg-brand-black/95 text-[#82D8C5] hover:text-white py-4 text-xs font-black uppercase tracking-[0.25em] rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        REDEEM & VIEW CART <ArrowRight className="w-4 h-4 text-white" />
                      </button>

                      <button
                        onClick={handleClose}
                        className="text-[10px] text-gray-400 hover:text-brand-black font-bold uppercase tracking-widest block text-center w-full transition-colors cursor-pointer"
                      >
                        Dismiss and continue viewing products
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. MINI FLOATING DISCOUNT TRIGGER BADGE */}
      {/* Appears when the main modal is dismissed or closed and the user has NOT claimed the promo yet */}
      <AnimatePresence>
        {!isOpen && !isClaimed && (
          <motion.button
            id="mini-discount-trigger"
            initial={{ scale: 0, opacity: 0, y: 55 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 55 }}
            transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 sm:right-8 z-[90] bg-brand-black hover:bg-[#82D8C5] text-white hover:text-brand-black border border-white/20 px-4.5 py-3 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer font-sans text-[10px] sm:text-[11px] font-black tracking-[0.18em] uppercase transition-all hover:scale-105 active:scale-95 select-none"
          >
            <Percent className="w-4 h-4 text-[#82D8C5] animate-pulse" />
            <span>Claim 10% Off</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
