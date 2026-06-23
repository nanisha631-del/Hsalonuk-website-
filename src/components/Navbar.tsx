/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { 
  Menu, 
  Search, 
  User, 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  ChevronRight, 
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getShopifySettings } from "../shopifySettings";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import ScrollZoomImage from "./ScrollZoomImage";
import { useSharedState, CurrencyCode, formatPrice, CURRENCY_MAP } from "../useSharedState";

const COUNTRY_CURRENCY_MAP: Record<CurrencyCode, { country: string; label: string; mobileLabel: string }> = {
  USD: { country: "United States", label: "USD $", mobileLabel: "US | $" },
  GBP: { country: "United Kingdom", label: "GBP £", mobileLabel: "UK | £" },
  EUR: { country: "Europe", label: "EUR €", mobileLabel: "EU | €" },
  CAD: { country: "Canada", label: "CAD CA$", mobileLabel: "CA | $" },
};

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currentView: "home" | "product" | "shop_all" | "bestsellers" | "about" | "contact";
  onGoHome: () => void;
  onSearchClick: () => void;
  onNavigate: (view: "home" | "product" | "shop_all" | "bestsellers" | "about" | "contact", category?: string) => void;
}

export default function Navbar({
  cartCount,
  onCartClick,
  currentView,
  onGoHome,
  onSearchClick,
  onNavigate
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"shop_all" | "bestsellers" | "bundle" | "about" | "contact" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopAllExpanded, setMobileShopAllExpanded] = useState(false);
  
  // Custom Currency Dropdown state and listener
  const { state, updateState } = useSharedState();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const settings = getShopifySettings();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const openDropdown = (menu: "shop_all" | "bestsellers" | "bundle" | "about" | "contact") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const closeDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const cancelClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleImmediateClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close menus on resize or route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [currentView]);

  const navBg = settings.nav_bg_color || undefined;
  const navColor = settings.nav_links_color || undefined;

  // Render a dropdown link with train-passing background fill (left-to-right on enter, right-to-left on exit)
  const renderDropdownLink = (
    label: React.ReactNode, 
    onClick: () => void, 
    hasChevron: boolean = false, 
    fontWeightClass: string = "font-semibold",
    rightNode?: React.ReactNode
  ) => {
    return (
      <button
        onClick={onClick}
        className="relative overflow-hidden px-4.5 py-2.5 w-full text-left text-brand-black transition-colors duration-300 group rounded-md flex items-center justify-between cursor-pointer select-none"
      >
        {/* Sliding background color capsule - Left to Right on Enter, Right to Left on Leave */}
        <span 
          className="absolute inset-0 bg-[#82D8C5] rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left z-0" 
        />
        
        {/* Left foreground contents */}
        <span className={`relative z-10 flex items-center gap-2 ${fontWeightClass} text-[13px] tracking-wide`}>
          {hasChevron && (
            <ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 text-black/50 group-hover:text-black" />
          )}
          <span>{label}</span>
        </span>

        {/* Right side element */}
        {rightNode && <span className="relative z-10 shrink-0">{rightNode}</span>}
      </button>
    );
  };

  // Render a clean hover button with solid background slide fill from left to right
  const renderNavButton = (label: string, view: "home" | "product" | "shop_all" | "bestsellers" | "about" | "contact", category?: string) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => {
          onNavigate(view, category);
          setActiveDropdown(null);
        }}
        className="relative px-2.5 py-1.5 text-[10px] font-sans font-black uppercase tracking-[0.15em] cursor-pointer select-none group focus:outline-none overflow-hidden rounded-md inline-block"
      >
        {/* Left-to-Right background color box on hover */}
        <span 
          className="absolute inset-0 bg-[#82D8C5] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-md"
        />

        {/* Clear readable text overlaying the background */}
        <span className={`relative z-10 block transition-colors duration-200 ${isActive ? "text-[#82D8C5] group-hover:text-black font-black" : "text-brand-black group-hover:text-black font-black"}`}>
          {label}
        </span>
      </button>
    );
  };

  const bestsellers = PRODUCTS.slice(0, 4);
  const bundles = PRODUCTS.filter((p) => p.category === "bundle").slice(0, 4);

  return (
    <>
      <nav
        id="main-navigation"
        className={`w-full relative transition-all duration-300 z-50 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-xs" : "bg-brand-offwhite"} border-b border-brand-black/10 h-20 md:h-24 flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between px-4 md:px-12`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* LEFT COLUMN: Hamburger Menu on Mobile / Brand Logo Aligned Alike to Phenomena on Laptop */}
        <div className="flex-1 lg:flex-none flex items-center justify-start z-50">
          {/* Mobile view side toggle menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:opacity-70 transition-opacity lg:hidden cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-6 h-6 text-brand-black" />
          </button>

          {/* Laptop view left-aligned brand logo */}
          <button
            onClick={onGoHome}
            className="hidden lg:flex items-center gap-1.5 hover:opacity-85 transition-opacity duration-300 cursor-pointer select-none uppercase leading-none"
          >
            <span 
              className="font-sans font-extralight text-[56px] tracking-tighter text-brand-black select-none leading-none" 
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 200 }}
            >
              H
            </span>
            <div 
              className="flex flex-col justify-between h-[40px] items-start text-[16px] font-light tracking-[0.18em] leading-none text-left text-brand-black select-none pl-1" 
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
            >
              <span className="block mt-[-2px]">SAL</span>
              <span className="block mb-[-2px]">ON</span>
            </div>
          </button>
        </div>

        {/* CENTER POSITION: Centered H Salon logo (Mobile View Only) */}
        <div className="flex lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center z-50">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1 hover:opacity-85 transition-opacity duration-300 cursor-pointer select-none uppercase leading-none"
          >
            <span 
              className="font-sans font-extralight text-[44px] tracking-tighter text-brand-black select-none leading-none" 
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 200 }}
            >
              H
            </span>
            <div 
              className="flex flex-col justify-between h-[31px] items-start text-[12.5px] font-light tracking-[0.18em] leading-none text-left text-brand-black select-none pl-0.5" 
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
            >
              <span className="block mt-[-1.5px]">SAL</span>
              <span className="block mb-[-1.5px]">ON</span>
            </div>
          </button>
        </div>

        {/* MIDDLE COLUMN: Desktop Navigation with Dropdowns on Hover */}
        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 h-full">
          {/* Shop All Menu Item */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => openDropdown("shop_all")}
            onMouseLeave={closeDropdown}
          >
            {renderNavButton("Shop all", "shop_all")}
          </div>

          {/* Bestsellers Menu Item */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => openDropdown("bestsellers")}
            onMouseLeave={closeDropdown}
          >
            {renderNavButton("Bestsellers", "bestsellers")}
          </div>

          {/* Bundle Menu Item */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => openDropdown("bundle")}
            onMouseLeave={closeDropdown}
          >
            {renderNavButton("Bundle", "shop_all", "bundle")}
          </div>

          {/* About us Menu Item */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => openDropdown("about")}
            onMouseLeave={closeDropdown}
          >
            {renderNavButton("About us", "about")}
          </div>

          {/* Contact us Menu Item */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => openDropdown("contact")}
            onMouseLeave={closeDropdown}
          >
            {renderNavButton("Contact us", "contact")}
          </div>
        </div>

        {/* RIGHT COLUMN: Action Buttons */}
        <div className="flex-1 lg:flex-none flex items-center justify-end gap-1 md:gap-4 z-50">
          {/* CURRENCY CODES DROPDOWN */}
          <div 
            ref={currencyDropdownRef} 
            className="hidden lg:block relative select-none z-50"
            onMouseEnter={() => setCurrencyOpen(true)}
            onMouseLeave={() => setCurrencyOpen(false)}
          >
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 px-2 py-1.5 text-[10.5px] md:text-[12px] text-brand-black/80 hover:text-brand-black cursor-pointer bg-transparent border-0 uppercase tracking-wider focus:outline-none transition-colors select-none font-medium leading-none animate-fade-in"
              style={{ fontFamily: '"Inter", sans-serif' }}
              aria-label="Change Currency"
            >
              <span className="hidden sm:inline">
                {COUNTRY_CURRENCY_MAP[state.currency]?.country} | {COUNTRY_CURRENCY_MAP[state.currency]?.label}
              </span>
              <span className="sm:hidden inline text-[9.5px]">
                {COUNTRY_CURRENCY_MAP[state.currency]?.mobileLabel}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-brand-black/60 transition-transform duration-300 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {currencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-56 sm:w-60 bg-white border border-brand-black/10 rounded-lg shadow-xl py-2 z-50 overflow-hidden font-sans"
                >
                  {Object.entries(COUNTRY_CURRENCY_MAP).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => {
                        updateState({ currency: code as CurrencyCode });
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[12px] hover:bg-brand-black/5 transition-colors flex items-center justify-between cursor-pointer select-none ${
                        state.currency === code ? "font-bold text-black bg-brand-black/3" : "text-gray-600 font-normal"
                      }`}
                    >
                      <span className="truncate">{config.country} | {config.label}</span>
                      {state.currency === code && <span className="w-1.5 h-1.5 bg-[#82D8C5] rounded-full shrink-0 ml-1" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onSearchClick}
            className="p-2 hover:opacity-70 transition-opacity cursor-pointer text-brand-black"
            aria-label="Instant Search"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => onNavigate("about")}
            className="p-2 hover:opacity-70 transition-opacity hidden md:block cursor-pointer text-brand-black"
            aria-label="Account Login"
          >
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={onCartClick}
            className="p-2 hover:opacity-70 transition-opacity relative cursor-pointer text-brand-black"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span
                id="cart-count-badge"
                className="absolute top-1.5 right-1.5 bg-brand-lilac text-brand-black font-sans text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border border-white"
                style={{ backgroundColor: "#82D8C5" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* MEGA DROPDOWNS: Render based on active hover selection */}
        <AnimatePresence>
          {activeDropdown === "shop_all" && (
            <motion.div 
              key="shop_all_mega"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
              className="absolute left-0 right-0 top-full w-full bg-white border-b border-brand-black/15 shadow-2xl z-40"
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto py-10 px-12 grid grid-cols-12 gap-8"
              >
                {/* Categories column */}
                <div className="col-span-3 border-r border-brand-black/5 pr-6">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-[#82D8C5] mb-4">Categories</h3>
                  <ul className="space-y-2 font-sans text-sm">
                    <li>
                      {renderDropdownLink("All Treatments", () => { onNavigate("shop_all", "all"); setActiveDropdown(null); }, true, "font-bold")}
                    </li>
                    <li>
                      {renderDropdownLink("Scalp Therapeutics", () => { onNavigate("shop_all", "scalp-care"); setActiveDropdown(null); }, true, "font-semibold")}
                    </li>
                    <li>
                      {renderDropdownLink("Hair Oils & Glosses", () => { onNavigate("shop_all", "hair-oils"); setActiveDropdown(null); }, true, "font-semibold")}
                    </li>
                    <li>
                      {renderDropdownLink("Concentrated Boosters", () => { onNavigate("shop_all", "boosters"); setActiveDropdown(null); }, true, "font-semibold")}
                    </li>
                    <li>
                      {renderDropdownLink("Recovery Botanicals", () => { onNavigate("shop_all", "recovery-botanicals"); setActiveDropdown(null); }, true, "font-semibold")}
                    </li>
                    <li>
                      {renderDropdownLink("Luxury Accessories", () => { onNavigate("shop_all", "accessories"); setActiveDropdown(null); }, true, "font-semibold")}
                    </li>
                  </ul>
                </div>

                {/* Now Trending Column */}
                <div className="col-span-3 border-r border-brand-black/5 pr-6">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black mb-4">Now Trending</h3>
                  <ul className="space-y-2 font-sans text-sm text-brand-black/75">
                    <li>
                      {renderDropdownLink(
                        "Clinical Bestsellers ✨", 
                        () => { onNavigate("bestsellers"); setActiveDropdown(null); }, 
                        false, 
                        "font-bold",
                        <span className="text-[9px] bg-brand-black text-[#82D8C5] px-1.5 py-0.5 rounded-xs font-black font-mono">HOT</span>
                      )}
                    </li>
                    <li>
                      {renderDropdownLink("Oribe Serene Scalp Treatment", () => { onNavigate("product", "snail-silk-serum"); setActiveDropdown(null); }, false, "font-semibold")}
                    </li>
                    <li>
                      {renderDropdownLink("Gold Lust Hair Oil", () => { onNavigate("product", "snail-silk-scalp-oil"); setActiveDropdown(null); }, false, "font-semibold")}
                    </li>
                    <li>
                      {renderDropdownLink("The Recovery Face Oil", () => { onNavigate("product", "ground-recovery-oil"); setActiveDropdown(null); }, false, "font-semibold")}
                    </li>
                  </ul>
                </div>

                {/* Graphical Showcase Right Section */}
                <motion.div 
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.2, // Delicate staggered sequence
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="col-span-6 grid grid-cols-3 gap-4"
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 30, filter: "blur(4px)", scale: 0.99 },
                      show: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)", 
                        scale: 1,
                        transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    style={{ willChange: "transform, opacity, filter" }}
                    onClick={() => { onNavigate("product", "snail-silk-serum"); setActiveDropdown(null); }}
                    className="group relative rounded-lg overflow-hidden border border-brand-black/5 bg-brand-offwhite cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square w-full overflow-hidden relative bg-white">
                      <img 
                        src="/snail silk face serum.webp" 
                        alt="Scalp Treatment"
                        className="object-cover w-full h-full group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="p-3 text-center">
                      <h4 className="font-sans font-extrabold text-[12px] truncate text-brand-black text-left group-hover:text-[#82D8C5]">Scalp Treatment</h4>
                      <p className="font-mono text-[10px] text-brand-black/60 mt-0.5 text-left">$48.00 USD</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 30, filter: "blur(4px)", scale: 0.99 },
                      show: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)", 
                        scale: 1,
                        transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    style={{ willChange: "transform, opacity, filter" }}
                    onClick={() => { onNavigate("product", "snail-silk-scalp-oil"); setActiveDropdown(null); }}
                    className="group relative rounded-lg overflow-hidden border border-brand-black/5 bg-brand-offwhite cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square w-full overflow-hidden relative bg-white">
                      <img 
                        src="/snail silk scalp oil.webp" 
                        alt="Gold Lust Hair Oil"
                        className="object-cover w-full h-full group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="p-3 text-center">
                      <h4 className="font-sans font-extrabold text-[12px] truncate text-brand-black text-left group-hover:text-[#82D8C5]">Gold Lust Hair Oil</h4>
                      <p className="font-mono text-[10px] text-brand-black/60 mt-0.5 text-left">$45.00 USD</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 30, filter: "blur(4px)", scale: 0.99 },
                      show: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)", 
                        scale: 1,
                        transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    style={{ willChange: "transform, opacity, filter" }}
                    onClick={() => { onNavigate("product", "ground-recovery-oil"); setActiveDropdown(null); }}
                    className="group relative rounded-lg overflow-hidden border border-brand-black/5 bg-brand-offwhite cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square w-full overflow-hidden relative bg-white">
                      <img 
                        src="/ground recovery oil.webp" 
                        alt="Recovery Face Oil" 
                        className="object-cover w-full h-full group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="p-3 text-center">
                      <h4 className="font-sans font-extrabold text-[12px] truncate text-brand-black text-left group-hover:text-[#82D8C5]">Recovery Face Oil</h4>
                      <p className="font-mono text-[10px] text-brand-black/60 mt-0.5 text-left">$64.00 USD</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeDropdown === "bestsellers" && (
            <motion.div 
              key="bestsellers_mega"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
              className="absolute left-0 right-0 top-full w-full bg-white border-b border-brand-black/15 shadow-2xl z-40"
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto py-10 px-12"
              >
                <div className="flex items-center justify-between mb-6 border-b border-brand-black/5 pb-3">
                  <div>
                    <h3 className="font-sans font-black text-sm uppercase tracking-wider text-brand-black">Clinically Rated Bestsellers</h3>
                    <p className="font-sans text-xs text-brand-black/60 mt-0.5 font-medium">Scientifically supported premium results across hundreds of verified trials.</p>
                  </div>
                  <button 
                    onClick={() => { onNavigate("bestsellers"); setActiveDropdown(null); }}
                    className="font-sans text-xs font-bold text-[#82D8C5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Bestsellers Page <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bestseller Grid Preview list */}
                <motion.div 
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.18, // sequential snappy sequence
                        delayChildren: 0.25, // wait for dropdown to partially open
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-4 gap-6"
                >
                  {bestsellers.map((product) => (
                    <motion.div 
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 35, filter: "blur(3px)", scale: 0.99 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          filter: "blur(0px)", 
                          scale: 1,
                          transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
                        }
                      }}
                      style={{ willChange: "transform, opacity, filter" }}
                      onClick={() => { onNavigate("product", product.id); setActiveDropdown(null); }}
                      className="group border border-brand-black/5 rounded-lg p-3 bg-brand-offwhite cursor-pointer hover:shadow-md transition-all duration-300 text-center"
                    >
                      <div className="aspect-square rounded-md overflow-hidden relative mb-3 bg-white">
                        <ScrollZoomImage 
                          src={product.images[0]} 
                          secondarySrc={product.images.length > 1 ? product.images[1] : undefined}
                          alt={product.name}
                          className="p-2"
                        />
                        <span className="absolute top-2 left-2 bg-[#82D8C5] text-brand-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs tracking-wider uppercase z-20">
                          ★ {product.rating.toFixed(1)}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-xs truncate text-brand-black group-hover:text-[#82D8C5] transition-colors">{product.name}</h4>
                      <p className="font-mono text-xs font-semibold text-[#82D8C5] mt-1">{formatPrice(product.price, state.currency)}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeDropdown === "bundle" && (
            <motion.div 
              key="bundle_mega"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
              className="absolute left-0 right-0 top-full w-full bg-white border-b border-brand-black/15 shadow-2xl z-40"
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto py-10 px-12"
              >
                <div className="flex items-center justify-between mb-6 border-b border-brand-black/5 pb-3">
                  <div>
                    <h3 className="font-sans font-black text-sm uppercase tracking-wider text-brand-black">Apothecary Value Rituals & Sets</h3>
                    <p className="font-sans text-xs text-brand-black/60 mt-0.5 font-medium">Curated multi-step programs with exclusive savings up to 15% off regular custom routines.</p>
                  </div>
                  <button 
                    onClick={() => { onNavigate("shop_all", "bundle"); setActiveDropdown(null); }}
                    className="font-sans text-xs font-bold text-[#82D8C5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View All Bundles <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bundle Grid Preview list */}
                <motion.div 
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.18, // sequential snappy sequence
                        delayChildren: 0.25, // wait for dropdown to partially open
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-4 gap-6"
                >
                  {bundles.map((product) => (
                    <motion.div 
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 35, filter: "blur(3px)", scale: 0.99 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          filter: "blur(0px)", 
                          scale: 1,
                          transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
                        }
                      }}
                      style={{ willChange: "transform, opacity, filter" }}
                      onClick={() => { onNavigate("product", product.id); setActiveDropdown(null); }}
                      className="group border border-brand-black/5 rounded-lg p-3 bg-brand-offwhite cursor-pointer hover:shadow-md transition-all duration-300 text-center"
                    >
                      <div className="aspect-square rounded-md overflow-hidden relative mb-3 bg-white">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="object-contain w-full h-full p-2 group-hover:scale-[1.06] hover:scale-[1.06] transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:transform]"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 bg-[#82D8C5] text-brand-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                          ★ {product.rating.toFixed(1)}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-xs truncate text-brand-black group-hover:text-[#82D8C5] transition-colors">{product.name}</h4>
                      <p className="font-mono text-xs font-semibold text-[#82D8C5] mt-1">{formatPrice(product.price, state.currency)}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeDropdown === "about" && (
            <motion.div 
              key="about_mega"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
              className="absolute left-0 right-0 top-full w-full bg-white border-b border-brand-black/15 shadow-2xl z-40"
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto py-10 px-12 grid grid-cols-12 gap-8 text-left"
              >
                {/* Column 1: Editorial story summary */}
                <div className="col-span-4 border-r border-[#82D8C5]/10 pr-8">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#82D8C5] font-black uppercase">Our Heritage</span>
                  <h3 className="font-serif italic font-extrabold text-[22px] text-brand-black mt-2 leading-tight">
                    Pure. Clinically Proven. Devoted to Hair Wellness.
                  </h3>
                  <p className="text-[11px] leading-relaxed text-gray-500 font-sans mt-3">
                    Born out of a prestigious London apothecary, H Salon unites ancient botanical extracts with cutting-edge trichological science to restore your hair from root to tips.
                  </p>
                  <button 
                    onClick={() => { onNavigate("about"); setActiveDropdown(null); }}
                    className="text-[10px] font-sans font-black uppercase tracking-wider text-brand-black underline mt-4 hover:text-[#82D8C5] transition-colors cursor-pointer"
                  >
                    Read Our Full Story →
                  </button>
                </div>

                {/* Column 2: Core Philosophy */}
                <div className="col-span-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase text-brand-black tracking-wider">Vegan & Organic Formula</h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-1">100% cruelty-free formulation featuring certified natural cold-pressed botanicals for deep follicle nourishment.</p>
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase text-brand-black tracking-wider">Trichological Experts</h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-1">Each formula is co-crafted with clinical experts to treat stubborn scalp dry areas and structural cuticles.</p>
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase text-brand-black tracking-wider">Zero Chemical Noise</h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-1">Absolutely free of synthetic silicones, industrial sulfates, and disruptive parabens.</p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Stats / Accents */}
                <div className="col-span-4 pl-6 bg-brand-offwhite rounded-xl p-5 border border-brand-black/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[8.5px] font-sans font-black text-[#82D8C5] uppercase tracking-widest block mb-1 font-black">Apothecary Standards</span>
                    <h4 className="font-serif text-[15px] font-black text-brand-black uppercase tracking-tight">Clinical Studies & Results</h4>
                    <p className="text-[11px] text-gray-400 leading-normal font-sans mt-1.5">
                      "After 4 weeks of consistent regimen, 94% of testers registered a notable increase in hair strand thick feel, and 98% noticed a smoother scalp touch."
                    </p>
                  </div>
                  <div className="flex gap-4 border-t border-brand-black/5 pt-3.5 mt-3.5 select-none">
                    <div>
                      <span className="font-serif italic font-black text-xl text-brand-black block">94%</span>
                      <span className="text-[8.5px] font-sans text-gray-400 uppercase tracking-wider block font-black">Volume Increase</span>
                    </div>
                    <div>
                      <span className="font-serif italic font-black text-xl text-brand-black block">98%</span>
                      <span className="text-[8.5px] font-sans text-gray-400 uppercase tracking-wider block font-black">Scalp Relief</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeDropdown === "contact" && (
            <motion.div 
              key="contact_mega"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
              className="absolute left-0 right-0 top-full w-full bg-white border-b border-brand-black/15 shadow-2xl z-40"
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto py-10 px-12 grid grid-cols-12 gap-8 text-left"
              >
                {/* Column 1: Concierge details */}
                <div className="col-span-4 border-r border-[#82D8C5]/10 pr-8">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#82D8C5] font-black uppercase">Store & HQ Concierge</span>
                  <h3 className="font-serif italic font-extrabold text-[22px] text-brand-black mt-2 leading-tight">
                    How Can We Support Your Journey?
                  </h3>
                  <p className="text-[11px] leading-relaxed text-gray-500 font-sans mt-3">
                    Whether you require specific ingredient checks, details on shipping, or dynamic ritual guidance, our apothecary team is here to assist 24 hours a day.
                  </p>
                  <button 
                    onClick={() => { onNavigate("contact"); setActiveDropdown(null); }}
                    className="text-[10px] font-sans font-black uppercase tracking-wider text-brand-black underline mt-4 hover:text-[#82D8C5] transition-colors cursor-pointer"
                  >
                    View Support Page →
                  </button>
                </div>

                {/* Column 2: Quick Contacts */}
                <div className="col-span-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase text-brand-black tracking-wider">Email Concierge</h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-0.5">concierge@hsalon.com</p>
                      <p className="text-[9.5px] text-[#82D8C5] font-sans font-bold leading-none mt-1">Average Response Duration: under 12 hours</p>
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase text-brand-black tracking-wider">London Flagship Salon</h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-0.5">42 Old Broad St, London, EC2N 1HQ, UK</p>
                      <p className="text-[9.5px] text-gray-400 font-sans mt-0.5">Appointments: flagship@hsalon.com</p>
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase text-brand-black tracking-wider">Business & Press</h4>
                      <p className="text-[11px] text-gray-400 font-sans mt-0.5">press@hsalon.com · wholesale@hsalon.com</p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Support CTA Box / Consultation */}
                <div className="col-span-4 pl-6 bg-brand-offwhite rounded-xl p-5 border border-brand-black/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[8.5px] font-sans font-black text-[#82D8C5] uppercase tracking-widest block mb-1">Tailored Service</span>
                    <h4 className="font-serif text-[15px] font-black text-brand-black uppercase tracking-tight">Complimentary Consultation</h4>
                    <p className="text-[11px] text-gray-400 leading-normal font-sans mt-1.5">
                      Need custom guidance for your specific hair texture? Book a direct virtual analysis session with one of our licensed cosmetologists.
                    </p>
                  </div>
                  <button 
                    onClick={() => { onNavigate("contact"); setActiveDropdown(null); }}
                    className="w-full bg-brand-black hover:bg-[#82D8C5] hover:text-brand-black border border-brand-black text-white text-[9px] font-sans font-black uppercase tracking-widest py-2 rounded-full transition-all mt-4"
                  >
                    Book Free Analysis
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MOBILE FULL DRAWER NAVIGATION: Matches Images 7 & 8 exactly */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-xs flex justify-start items-stretch">
          <div className="w-[85vw] max-w-[400px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto relative animate-slide-right">
            {/* Top drawer header */}
            <div className="p-6 flex items-center justify-between border-b border-brand-black/5">
              {/* Brand logo left */}
              <button
                onClick={() => { onGoHome(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1 uppercase leading-none select-none text-left"
              >
                <span className="font-sans font-normal text-[32px] tracking-tighter text-brand-black select-none leading-none" style={{ fontFamily: '"Inter", sans-serif' }}>H</span>
                <div className="flex flex-col justify-between h-[22.5px] items-start text-[9.5px] font-normal tracking-[0.16em] leading-none text-brand-black select-none pl-0.5" style={{ fontFamily: '"Inter", sans-serif' }}>
                  <span className="block mt-[-0.8px]">SAL</span>
                  <span className="block mb-[-1px]">ON</span>
                </div>
              </button>

              {/* Close Button right */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-brand-black hover:opacity-75 transition-opacity cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[2]" />
              </button>
            </div>

            {/* Middle Main Drawer Links (Image 8 style) */}
            <div className="flex-1 px-6 py-8 space-y-6">
              {/* Shop All with +/- toggle option */}
              <div className="border-b border-brand-black/5 pb-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => { onNavigate("shop_all", "all"); setMobileMenuOpen(false); }}
                    className="font-sans font-extrabold text-[28px] tracking-tight text-brand-black hover:text-[#82D8C5] transition-colors text-left"
                  >
                    Shop all
                  </button>
                  <button
                    onClick={() => setMobileShopAllExpanded(!mobileShopAllExpanded)}
                    className="p-2 text-brand-black/60 hover:text-brand-black cursor-pointer"
                  >
                    {mobileShopAllExpanded ? (
                      <Minus className="w-5 h-5 stroke-[3.5] text-[#82D8C5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[3.5] text-[#82D8C5]" />
                    )}
                  </button>
                </div>

                {/* Subcategories drawer section */}
                {mobileShopAllExpanded && (
                  <div className="mt-4 pl-4 space-y-3 border-l-2 border-[#82D8C5]/30 animate-fade-in text-[15px] font-bold">
                    <button 
                      onClick={() => { onNavigate("shop_all", "all"); setMobileMenuOpen(false); }}
                      className="block text-brand-black/75 hover:text-[#82D8C5] py-1 cursor-pointer w-full text-left"
                    >
                      All Formulations
                    </button>
                    <button 
                      onClick={() => { onNavigate("shop_all", "scalp-care"); setMobileMenuOpen(false); }}
                      className="block text-brand-black/75 hover:text-[#82D8C5] py-1 cursor-pointer w-full text-left"
                    >
                      Scalp Therapeutics
                    </button>
                    <button 
                      onClick={() => { onNavigate("shop_all", "hair-oils"); setMobileMenuOpen(false); }}
                      className="block text-brand-black/75 hover:text-[#82D8C5] py-1 cursor-pointer w-full text-left"
                    >
                      Hair Oils & Glosses
                    </button>
                    <button 
                      onClick={() => { onNavigate("shop_all", "boosters"); setMobileMenuOpen(false); }}
                      className="block text-[#82D8C5] py-1 cursor-pointer w-full text-left font-black"
                    >
                      Concentrated Boosters
                    </button>
                    <button 
                      onClick={() => { onNavigate("shop_all", "recovery-botanicals"); setMobileMenuOpen(false); }}
                      className="block text-brand-black/75 hover:text-[#82D8C5] py-1 cursor-pointer w-full text-left"
                    >
                      Recovery Botanicals
                    </button>
                    <button 
                      onClick={() => { onNavigate("shop_all", "accessories"); setMobileMenuOpen(false); }}
                      className="block text-brand-black/75 hover:text-[#82D8C5] py-1 cursor-pointer w-full text-left"
                    >
                      Luxury Accessories
                    </button>
                  </div>
                )}
              </div>

              {/* Bestsellers dynamic redirect and scroll */}
              <div className="border-b border-brand-black/5 pb-4">
                <button
                  onClick={() => { onNavigate("bestsellers"); setMobileMenuOpen(false); }}
                  className="font-sans font-extrabold text-[28px] tracking-tight text-brand-black hover:text-[#82D8C5] transition-colors text-left w-full"
                >
                  Bestsellers
                </button>
              </div>

              {/* Bundle dynamic redirect */}
              <div className="border-b border-brand-black/5 pb-4">
                <button
                  onClick={() => { onNavigate("shop_all", "bundle"); setMobileMenuOpen(false); }}
                  className="font-sans font-extrabold text-[28px] tracking-tight text-brand-black hover:text-[#82D8C5] transition-colors text-left w-full"
                >
                  Bundles
                </button>
              </div>

              {/* About us dynamic redirect */}
              <div className="border-b border-brand-black/5 pb-4">
                <button
                  onClick={() => { onNavigate("about"); setMobileMenuOpen(false); }}
                  className="font-sans font-extrabold text-[28px] tracking-tight text-brand-black hover:text-[#82D8C5] transition-colors text-left w-full"
                >
                  About
                </button>
              </div>

              {/* Contact us dynamic redirect */}
              <div className="border-b border-brand-black/5 pb-4">
                <button
                  onClick={() => { onNavigate("contact"); setMobileMenuOpen(false); }}
                  className="font-sans font-extrabold text-[28px] tracking-tight text-brand-black hover:text-[#82D8C5] transition-colors text-left w-full"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Bottom utility sublinks (Image 8 style) */}
            <div className="p-6 bg-brand-offwhite border-t border-brand-black/5 space-y-6 text-left">
              {/* Currency Selector Grid */}
              <div className="space-y-2.5">
                <span className="block font-sans font-black text-[10px] uppercase tracking-widest text-brand-black/45">
                  Select Currency
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(COUNTRY_CURRENCY_MAP).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => {
                        updateState({ currency: code as CurrencyCode });
                      }}
                      className={`px-3 py-2 text-[11px] font-sans font-semibold rounded-lg text-left transition-all duration-200 flex items-center justify-between cursor-pointer border select-none h-11 ${
                        state.currency === code 
                          ? "border-brand-black bg-brand-black text-[#82D8C5] font-black" 
                          : "border-brand-black/10 hover:border-brand-black/30 bg-white text-brand-black"
                      }`}
                    >
                      <span>{code} ({CURRENCY_MAP[code as CurrencyCode].symbol})</span>
                      {state.currency === code && <span className="w-1.5 h-1.5 bg-[#82D8C5] rounded-full shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-brand-black/10 w-full" />

              <div className="space-y-4">
                <button
                  onClick={() => { onSearchClick(); setMobileMenuOpen(false); }}
                  className="block font-sans font-black text-xs uppercase tracking-widest text-brand-black/80 hover:text-[#82D8C5] transition-colors text-left w-full cursor-pointer"
                >
                  Search
                </button>
                <div className="flex gap-6">
                  <button
                    onClick={() => { onNavigate("about"); setMobileMenuOpen(false); }}
                    className="block font-sans font-black text-xs uppercase tracking-widest text-brand-black/80 hover:text-[#82D8C5] transition-colors text-left cursor-pointer"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { onNavigate("about"); setMobileMenuOpen(false); }}
                    className="block font-sans font-black text-xs uppercase tracking-widest text-[#82D8C5] hover:text-brand-black transition-colors text-left cursor-pointer"
                  >
                    Create account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Click outside mobile drawer to dismiss */}
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
