/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
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
  Award,
  ChevronRight,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";
import { useSharedState, UserProfile } from "../useSharedState";

export default function GoogleAuthModal() {
  const { state, updateState } = useSharedState();
  
  // High fidelity Google Auth states
  const [step, setStep] = useState<"email" | "password" | "register" | "authenticating">("email");
  const [emailInput, setEmailInput] = useState("nanisha631@gmail.com"); // Pre-populate user's real email ID forsnappy premium detection!
  const [passwordInput, setPasswordInput] = useState("");
  const [firstName, setFirstName] = useState("Nisha");
  const [lastName, setLastName] = useState("NA");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Clean form states when modal is toggled
  useEffect(() => {
    if (state.authModalOpen) {
      if (state.user) {
        // If already logged in, do not reset
      } else {
        setStep("email");
        setEmailInput("nanisha631@gmail.com");
        setPasswordInput("");
        setFirstName("Nisha");
        setLastName("NA");
        setShowPassword(false);
        setLoading(false);
        setSuccess(false);
        setErrorMsg("");
      }
    }
  }, [state.authModalOpen, state.user]);

  if (!state.authModalOpen) return null;

  const handleClose = () => {
    updateState({ authModalOpen: false });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMsg("Enter an email or phone number");
      return;
    }
    // Basic email format check
    if (!emailInput.includes("@")) {
      setErrorMsg("Enter a valid email address");
      return;
    }
    setErrorMsg("");
    setStep("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setErrorMsg("Enter your password");
      return;
    }
    if (passwordInput.length < 4) {
      setErrorMsg("Wrong password. Try again or click Forgot password.");
      return;
    }

    setErrorMsg("");
    triggerAuthSuccess();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg("Enter first and last name");
      return;
    }
    if (!emailInput.trim() || !emailInput.includes("@")) {
      setErrorMsg("Enter a valid Google email address");
      return;
    }
    if (passwordInput.length < 6) {
      setErrorMsg("Choose a stronger password of 6 characters or more");
      return;
    }

    setErrorMsg("");
    triggerAuthSuccess();
  };

  const triggerAuthSuccess = () => {
    setStep("authenticating");
    setLoading(true);

    // Realistic secure Google Identity Services handshaking delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      const displayName = step === "register" 
        ? `${firstName} ${lastName}` 
        : (emailInput.toLowerCase().includes("nanisha631") ? "Nisha NA" : firstName + " " + lastName);

      const loggedInUser: UserProfile = {
        name: displayName.trim() || emailInput.split("@")[0],
        email: emailInput.trim(),
        avatar: (displayName ? displayName.charAt(0) : emailInput.charAt(0)).toUpperCase(),
        loyaltyPoints: Math.floor(Math.random() * 200) + 240, // Elegant premium loyalty scorecard
        joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
      };

      setTimeout(() => {
        updateState({ user: loggedInUser, authModalOpen: false });
        setSuccess(false);
        setStep("email");
      }, 1100);
    }, 1400);
  };

  const handleLogout = () => {
    updateState({ user: null });
    handleClose();
  };

  // Official high-fidelity Google brand logo SVG
  const GoogleLogoSvg = () => (
    <svg className="h-[24px] select-none" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.24 18.2c-5.08 0-9.24-4.01-9.24-9.1C0 4.01 4.16 0 9.24 0c2.53 0 4.8.99 6.53 2.65l-2.3 2.3c-1.18-1.14-2.67-1.78-4.23-1.78-3.71 0-6.73 3.03-6.73 6.73 0 3.7 3.02 6.73 6.73 6.73 2.13 0 3.86-.81 4.95-1.92.83-.83 1.34-2.03 1.51-3.61H9.24V7.93h10.28c.11.54.16 1.09.16 1.67 0 2.62-.72 5.09-2.45 6.82-1.68 1.72-3.88 2.78-7.99 2.78z" fill="#4285F4"/>
      <path d="M28.45 12.28c0 3.51-2.61 6.12-6.12 6.12s-6.12-2.61-6.12-6.12c0-3.52 2.61-6.12 6.12-6.12s6.12 2.6 6.12 6.12zm-3.21 0c0-2.22-1.57-3.64-2.91-3.64s-2.91 1.42-2.91 3.64c0 2.2 1.57 3.63 2.91 3.63s2.91-1.43 2.91-3.63z" fill="#EA4335"/>
      <path d="M41.77 12.28c0 3.51-2.61 6.12-6.12 6.12s-6.12-2.61-6.12-6.12c0-3.52 2.61-6.12 6.12-6.12s6.12 2.6 6.12 6.12zm-3.21 0c0-2.22-1.57-3.64-2.91-3.64s-2.91 1.42-2.91 3.64c0 2.2 1.57 3.63 2.91 3.63s2.91-1.43 2.91-3.63z" fill="#FBBC05"/>
      <path d="M54.51 6.64v10.74c0 4.41-2.6 6.22-5.69 6.22-2.88 0-4.63-1.93-5.29-3.52l2.8-1.16c.5.12 1.34 1.16 2.49 1.16 1.62 0 2.61-.99 2.61-2.88v-.88h-.11c-.54.67-1.58 1.28-2.89 1.28-2.73 0-5.18-2.34-5.18-5.99 0-3.63 2.45-6.02 5.18-6.02 1.31 0 2.35.58 2.89 1.23h.11v-.98h3.09zm-2.98 5.67c0-2.19-1.39-3.63-2.76-3.63-1.41 0-2.78 1.44-2.78 3.63 0 2.17 1.37 3.61 2.78 3.61 1.37 0 2.76-1.44 2.76-3.61z" fill="#4285F4"/>
      <path d="M59.13.82H62.3v17.38h-3.17V.82z" fill="#34A853"/>
      <path d="M72.33 14.17l2.53 1.68c-.78 1.17-2.64 3.55-6.24 3.55-4.21 0-7.39-3.24-7.39-6.12 0-3.08 3.2-6.12 7.03-6.12 3.86 0 5.69 3.09 6.3 4.74l.33.84-9.39 3.88c.72 1.42 1.84 2.14 3.42 2.14 1.58 0 2.67-.78 3.41-2.59zm-6.61-2.12l6.28-2.6c-.34-.87-1.39-1.49-2.53-1.49-1.49 0-2.91 1.34-3.75 4.09z" fill="#EA4335"/>
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
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-[448px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Render content based on logged in state */}
          {!state.user ? (
            <div className="px-6 py-10 sm:p-10 flex flex-col">
              {/* Centered official Google branded SVG */}
              <div className="flex justify-center mb-6">
                <GoogleLogoSvg />
              </div>

              {step === "email" && (
                <form onSubmit={handleEmailSubmit} className="w-full flex flex-col">
                  <h3 className="font-sans text-[24px] text-[#202124] font-normal text-center mb-1">
                    Sign in
                  </h3>
                  <p className="font-sans text-[16px] text-[#202124] font-normal text-center mb-8">
                    to continue to <span className="font-semibold text-black">H Salon</span>
                  </p>

                  {errorMsg && (
                    <div className="mb-4 text-xs font-sans text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200 text-left">
                      {errorMsg}
                    </div>
                  )}

                  {/* Google style floating input */}
                  <div className="relative mb-6">
                    <input
                      id="google-email-input"
                      type="text"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setErrorMsg("");
                      }}
                      className="peer block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="google-email-input"
                      className="absolute text-sm text-gray-500 duration-150 transform -translate-y-3.5 scale-75 top-4.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-blue-600 pointer-events-none font-sans"
                    >
                      Email or phone
                    </label>
                  </div>

                  {/* Forgot email */}
                  <div className="text-left mb-8">
                    <button
                      type="button"
                      className="text-sm font-sans font-semibold text-[#1a73e8] hover:text-[#1557b0] hover:underline cursor-pointer"
                    >
                      Forgot email?
                    </button>
                  </div>

                  {/* Google Identity compliance info */}
                  <p className="text-[12px] text-gray-500 leading-normal font-sans text-left mb-10">
                    To continue, Google will securely share your name, email address, profile picture, and language preference with <span className="font-medium text-gray-700">H Salon</span>.
                  </p>

                  {/* Footer layout containing standard Create Account and Next action */}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg("");
                        setStep("register");
                      }}
                      className="text-sm font-sans font-semibold text-[#1a73e8] hover:text-[#1557b0] hover:bg-blue-50/50 px-3 py-2 rounded transition-colors cursor-pointer"
                    >
                      Create account
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-sans text-sm font-semibold rounded-md transition-colors cursor-pointer shadow-sm tracking-wide"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {step === "password" && (
                <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col">
                  <h3 className="font-sans text-[24px] text-[#202124] font-normal text-center mb-1">
                    Welcome
                  </h3>
                  
                  {/* Account pill displaying active email */}
                  <div className="self-center flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-sans text-[#3c4043] font-medium mt-2 mb-8 bg-gray-50/50 max-w-full">
                    <div className="w-5 h-5 rounded-full bg-[#1a73e8] text-white text-[10px] font-bold flex items-center justify-center uppercase shrink-0">
                      {emailInput.charAt(0)}
                    </div>
                    <span className="truncate pr-1">{emailInput}</span>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 text-xs font-sans text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200 text-left">
                      {errorMsg}
                    </div>
                  )}

                  {/* Floating input for Google Password */}
                  <div className="relative mb-3">
                    <input
                      id="google-password-input"
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setErrorMsg("");
                      }}
                      className="peer block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="google-password-input"
                      className="absolute text-sm text-gray-500 duration-150 transform -translate-y-3.5 scale-75 top-4.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-blue-600 pointer-events-none font-sans"
                    >
                      Enter your password
                    </label>
                  </div>

                  {/* Show password checkbox */}
                  <div className="flex items-center gap-2 text-left mb-8 pl-1">
                    <input
                      type="checkbox"
                      id="show-pass-check"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label 
                      htmlFor="show-pass-check" 
                      className="text-xs font-sans text-gray-600 select-none cursor-pointer"
                    >
                      Show password
                    </label>
                  </div>

                  {/* Footer containing navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg("");
                        setStep("email");
                      }}
                      className="text-sm font-sans font-semibold text-[#1a73e8] hover:text-[#1557b0] hover:bg-blue-50/50 px-3 py-2 rounded transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-sans text-sm font-semibold rounded-md transition-colors cursor-pointer shadow-sm tracking-wide"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {step === "register" && (
                <form onSubmit={handleRegisterSubmit} className="w-full flex flex-col">
                  <h3 className="font-sans text-[22px] text-[#202124] font-normal text-center mb-1">
                    Create Google Account
                  </h3>
                  <p className="font-sans text-[14px] text-gray-500 text-center mb-6">
                    to continue to <span className="font-semibold text-black">H Salon</span>
                  </p>

                  {errorMsg && (
                    <div className="mb-4 text-xs font-sans text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200 text-left">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name inputs */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="relative">
                      <input
                        id="google-first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="peer block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="google-first-name"
                        className="absolute text-sm text-gray-500 duration-150 transform -translate-y-3.5 scale-75 top-4.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-blue-600 pointer-events-none font-sans"
                      >
                        First name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="google-last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="peer block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="google-last-name"
                        className="absolute text-sm text-gray-500 duration-150 transform -translate-y-3.5 scale-75 top-4.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-blue-600 pointer-events-none font-sans"
                      >
                        Last name
                      </label>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative mb-4">
                    <input
                      id="google-reg-email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="google-reg-email"
                      className="absolute text-sm text-gray-500 duration-150 transform -translate-y-3.5 scale-75 top-4.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-blue-600 pointer-events-none font-sans"
                    >
                      Your email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="relative mb-8">
                    <input
                      id="google-reg-pass"
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="peer block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="google-reg-pass"
                      className="absolute text-sm text-gray-500 duration-150 transform -translate-y-3.5 scale-75 top-4.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-blue-600 pointer-events-none font-sans"
                    >
                      Create password
                    </label>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg("");
                        setStep("email");
                      }}
                      className="text-sm font-sans font-semibold text-[#1a73e8] hover:text-[#1557b0] hover:bg-blue-50/50 px-3 py-2 rounded transition-colors cursor-pointer"
                    >
                      Sign in instead
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-sans text-sm font-semibold rounded-md transition-colors cursor-pointer shadow-sm tracking-wide"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {step === "authenticating" && (
                <div className="w-full text-center py-8 flex flex-col items-center justify-center min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {!success ? (
                      <motion.div
                        key="loading-ring"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center"
                      >
                        {/* Authentic Google styled multi-colored loading spinner */}
                        <div className="relative w-14 h-14 mb-6">
                          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#4285F4] border-r-[#34A853] animate-spin" />
                        </div>
                        <h4 className="font-sans font-bold text-[18px] text-gray-800 mb-1">
                          Verifying credentials...
                        </h4>
                        <p className="font-sans text-xs text-gray-500">
                          Communicating securely with Google Accounts Services.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success-ring"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-6 border border-green-200">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="font-sans font-extrabold text-[18px] text-gray-800 mb-1">
                          Successfully Authenticated
                        </h4>
                        <p className="font-sans text-xs text-gray-500">
                          Welcome to your exclusive H Salon boutique lounge.
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
