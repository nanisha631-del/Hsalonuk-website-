/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  User, 
  Mail, 
  Shield, 
  CheckCircle, 
  LogOut, 
  Calendar, 
  Package, 
  Sparkles, 
  Award,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { useSharedState, UserProfile } from "../useSharedState";

// Pre-defined Google Accounts for extremely snappy simulation
const PRESETS = [
  { name: "Nisha NA", email: "nanisha631@gmail.com", avatar: "N" },
  { name: "Hannah Cooper", email: "hannah.cooper@gmail.com", avatar: "H" },
  { name: "James Smith", email: "james.smith@googlemail.com", avatar: "J" }
];

export default function GoogleAuthModal() {
  const { state, updateState } = useSharedState();
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"choose" | "typing" | "authenticating">("choose");

  if (!state.authModalOpen) return null;

  const handleClose = () => {
    updateState({ authModalOpen: false });
    // Reset internal state
    setStep("choose");
    setEmailInput("");
    setNameInput("");
    setIsTypingMode(false);
    setLoading(false);
    setSuccess(false);
  };

  const startLoginFlow = (email: string, name: string) => {
    setStep("authenticating");
    setLoading(true);

    // Realistic Google account login delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      const loggedInUser: UserProfile = {
        name: name || email.split("@")[0],
        email: email,
        avatar: (name ? name.charAt(0) : email.charAt(0)).toUpperCase(),
        loyaltyPoints: Math.floor(Math.random() * 300) + 150, // 150 to 450 points
        joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
      };

      setTimeout(() => {
        updateState({ user: loggedInUser, authModalOpen: false });
        setSuccess(false);
        setStep("choose");
      }, 1000);
    }, 1500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    startLoginFlow(emailInput, nameInput || emailInput.split("@")[0]);
  };

  const handleLogout = () => {
    updateState({ user: null });
    handleClose();
  };

  // Google Brand Icon SVG
  const GoogleIcon = () => (
    <svg className="w-5 h-5 min-w-[20px] mr-3" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );

  return (
    <AnimatePresence>
      <div 
        id="google-auth-overlay"
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      >
        {/* Backdrop dismiss */}
        <div className="absolute inset-0" onClick={handleClose} />

        <motion.div
          id="google-auth-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-brand-black/10 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-brand-black/5 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-brand-black"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Render content based on logged in state */}
          {!state.user ? (
            <div className="p-6 sm:p-8 flex flex-col items-center">
              {/* Google Brand Header */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <GoogleIcon />
                <span className="font-sans font-bold text-gray-500 tracking-wide text-[14px]">
                  Sign in with Google
                </span>
              </div>

              {step === "choose" && (
                <div className="w-full text-center">
                  <h3 className="font-sans font-extrabold text-[22px] tracking-tight text-brand-black mb-2">
                    Welcome to H Salon
                  </h3>
                  <p className="font-sans text-xs text-gray-500 mb-6">
                    Sign in to track your boutique orders, scalp bookings, and unlock exclusive VIP loyalty points.
                  </p>

                  {/* Account List */}
                  <div className="space-y-2.5 mb-6">
                    {PRESETS.map((p) => (
                      <button
                        key={p.email}
                        onClick={() => startLoginFlow(p.email, p.name)}
                        className="w-full p-3.5 rounded-xl border border-brand-black/10 hover:border-brand-black/25 hover:bg-brand-black/[0.02] flex items-center transition-all cursor-pointer text-left group"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#82D8C5] text-brand-black font-sans font-bold flex items-center justify-center text-sm mr-3 uppercase shrink-0">
                          {p.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans font-bold text-[13px] text-brand-black truncate">
                            {p.name}
                          </h4>
                          <p className="font-sans text-[11px] text-gray-500 truncate">
                            {p.email}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}

                    {/* Manual typing button */}
                    <button
                      onClick={() => setStep("typing")}
                      className="w-full p-3.5 rounded-xl border border-dashed border-brand-black/20 hover:border-brand-black/40 hover:bg-brand-black/[0.01] flex items-center justify-center transition-all cursor-pointer text-gray-500 hover:text-brand-black text-xs font-semibold"
                    >
                      Use another email ID
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-sans">
                    <Shield className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    Secure login protected by Google Identity Services
                  </div>
                </div>
              )}

              {step === "typing" && (
                <form onSubmit={handleCustomSubmit} className="w-full">
                  <button
                    type="button"
                    onClick={() => setStep("choose")}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-black mb-4 font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to accounts
                  </button>

                  <h3 className="font-sans font-extrabold text-[18px] tracking-tight text-brand-black mb-1 text-left">
                    Enter Google details
                  </h3>
                  <p className="font-sans text-xs text-gray-500 mb-5 text-left">
                    Use any Gmail or personal email to test the real-time boutique login.
                  </p>

                  <div className="space-y-4 mb-6 text-left">
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-brand-black/60 mb-1.5">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="w-full bg-[#F8F8F8] border border-transparent focus:border-brand-black/15 focus:bg-white text-brand-black text-xs py-3 pl-10 pr-4 rounded-xl outline-none font-sans transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-brand-black/60 mb-1.5">
                        Google Email ID
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. john.doe@gmail.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full bg-[#F8F8F8] border border-transparent focus:border-brand-black/15 focus:bg-white text-brand-black text-xs py-3 pl-10 pr-4 rounded-xl outline-none font-sans transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-black hover:bg-brand-black/90 text-white font-sans text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-sm text-center"
                  >
                    Continue to H Salon
                  </button>
                </form>
              )}

              {step === "authenticating" && (
                <div className="w-full text-center py-10 flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {!success ? (
                      <motion.div
                        key="loading-ring"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center"
                      >
                        {/* Google style circular loading wheel */}
                        <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-[#4285F4] animate-spin mb-6" />
                        <h4 className="font-sans font-extrabold text-[16px] text-brand-black mb-1">
                          Verifying credentials...
                        </h4>
                        <p className="font-sans text-xs text-gray-400">
                          Communicating securely with Google Accounts Services.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success-ring"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6 border border-green-200">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="font-sans font-extrabold text-[18px] text-brand-black mb-1">
                          Successfully Authenticated
                        </h4>
                        <p className="font-sans text-xs text-gray-500">
                          Welcome back to your exclusive H Salon lounge.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ) : (
            /* Logged In: Elegant VIP Club Dashboard Drawer */
            <div className="flex flex-col">
              {/* Header Profile Section */}
              <div className="p-6 bg-brand-black text-white relative">
                {/* Glowing status circle */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-brand-lilac/10 border-2 border-[#82D8C5] flex items-center justify-center shadow-lg text-[22px] font-sans font-extrabold text-[#82D8C5] select-none">
                  {state.user.avatar}
                </div>
                <div className="pl-20 py-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#82D8C5] text-brand-black text-[9px] font-black font-mono tracking-widest px-2 py-0.5 rounded-xs uppercase leading-none">
                      VIP SILVER MEMBER
                    </span>
                  </div>
                  <h3 className="font-sans font-extrabold text-[18px] tracking-tight mt-1 truncate">
                    {state.user.name}
                  </h3>
                  <p className="font-sans text-xs text-[#82D8C5]/75 truncate mt-0.5 font-medium">
                    {state.user.email}
                  </p>
                </div>
              </div>

              {/* VIP Loyalty Progress Bar */}
              <div className="p-5 bg-brand-offwhite border-b border-brand-black/5 text-left">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-sans font-black uppercase text-brand-black tracking-widest">
                    <Award className="w-4 h-4 text-[#82D8C5]" /> Loyalty Points: {state.user.loyaltyPoints}
                  </div>
                  <span className="text-[10px] text-gray-400 font-sans font-medium">
                    Next Reward at 500
                  </span>
                </div>
                <div className="w-full bg-brand-black/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#82D8C5] h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${(state.user.loyaltyPoints / 500) * 100}%` }}
                  />
                </div>
                <p className="text-[9.5px] text-gray-400 font-sans mt-2 italic">
                  *Unlock a free Scalp Booster massage or complimentary Travel Gloss Set once you cross 500 points!
                </p>
              </div>

              {/* Live appointments & Orders list */}
              <div className="p-5 space-y-5 text-left max-h-[300px] overflow-y-auto">
                {/* Live appointments section */}
                <div>
                  <h4 className="font-sans font-black text-[10px] uppercase tracking-widest text-brand-black/50 mb-3 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-black" /> Upcoming Treatments
                  </h4>
                  <div className="p-3.5 bg-brand-offwhite border border-brand-black/5 rounded-xl hover:shadow-xs transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-sans font-bold text-[12px] text-brand-black block">
                        Scalp Therapeutic & Styling
                      </span>
                      <span className="text-[8.5px] font-mono font-black bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-xs leading-none uppercase">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono">
                      London Flagship (42 Old Broad St)
                    </p>
                    <p className="text-[11px] text-brand-black/85 font-sans mt-2.5 font-semibold">
                      Monday, June 29th at 3:30 PM
                    </p>
                  </div>
                </div>

                {/* Orders History section */}
                <div>
                  <h4 className="font-sans font-black text-[10px] uppercase tracking-widest text-brand-black/50 mb-3 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-brand-black" /> Recent Orders
                  </h4>
                  <div className="p-3.5 border border-brand-black/5 rounded-xl hover:shadow-xs transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-sans font-bold text-[12px] text-brand-black block">
                        Order #HS-9042
                      </span>
                      <span className="text-[8.5px] font-mono font-black bg-[#82D8C5]/20 text-brand-black px-1.5 py-0.5 rounded-xs leading-none uppercase">
                        In Transit
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono">
                      1x Snail Silk Face Serum, 1x Gold Lust Oil
                    </p>
                    <p className="text-[11px] text-brand-black/85 font-sans mt-2.5 font-semibold flex items-center gap-1">
                      Shipped via DHL Express <span className="font-normal text-gray-400 text-[10px]">(Est: tomorrow)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom logout area */}
              <div className="p-5 bg-brand-offwhite border-t border-brand-black/5 flex items-center justify-between">
                <span className="text-[10.5px] text-gray-400 font-sans">
                  Member since {state.user.joinedDate}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 py-2 px-3.5 bg-[#F5EDE8] hover:bg-brand-black/5 text-brand-black hover:text-red-500 font-sans text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log out
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
