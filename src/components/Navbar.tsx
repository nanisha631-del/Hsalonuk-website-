/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import * as React from "react";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { getShopifySettings } from "../shopifySettings";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currentView: "home" | "product";
  onGoHome: () => void;
  onSearchClick: () => void;
  onMenuClick: () => void;
}

export default function Navbar({
  cartCount,
  onCartClick,
  currentView,
  onGoHome,
  onSearchClick,
  onMenuClick
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const settings = getShopifySettings();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // If we are on product page, we want the solid background by default
    if (currentView === "product") {
      setIsScrolled(true);
      return;
    }

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentView]);

  const navBg = settings.nav_bg_color || undefined;
  const navColor = settings.nav_links_color || undefined;
  const logoText = settings.nav_logo_text || "H salon";
  const logoSize = settings.nav_logo_size || undefined;

  const navStyle: React.CSSProperties = {};
  if (navBg) navStyle.backgroundColor = navBg;
  if (navColor) navStyle.color = navColor;

  const logoStyle: React.CSSProperties = {};
  if (logoSize) logoStyle.fontSize = logoSize;
  if (navColor) logoStyle.color = navColor;

  const navClass = "bg-brand-offwhite text-brand-black border-b border-brand-black/10 shadow-xs";

  return (
    <nav
      id="main-navigation"
      className={`w-full transition-all duration-300 ${navBg ? "" : navClass} h-16 md:h-20 flex items-center justify-between px-4 md:px-12`}
      style={navStyle}
    >
      {/* Left side: Hamburger + Search */}
      <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Menu"
          style={navColor ? { color: navColor } : {}}
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={onSearchClick}
          className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Search"
          style={navColor ? { color: navColor } : {}}
        >
          <Search className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Center: Brand name */}
      <div className="shrink-0 px-1 flex justify-center items-center min-w-[130px] z-10">
        <button
          onClick={onGoHome}
          className="flex items-center gap-1.5 hover:opacity-80 transition-all duration-300 cursor-pointer select-none uppercase leading-none"
        >
          <span className="font-sans font-black text-[33px] sm:text-[39px] tracking-tighter text-brand-black" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>H</span>
          <div className="flex flex-col items-start text-[8px] sm:text-[9.5px] font-medium tracking-[0.22em] leading-[0.98] text-left text-brand-black pt-[3px]" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            <span>SAL</span>
            <span>ON</span>
          </div>
        </button>
      </div>

      {/* Right side: Account + Cart */}
      <div className="flex items-center justify-end gap-4 md:gap-6 flex-1 min-w-0">
        <button
          className="p-1 hover:opacity-70 transition-opacity hidden md:block cursor-pointer"
          aria-label="Account"
          style={navColor ? { color: navColor } : {}}
        >
          <User className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={onCartClick}
          className="p-1 hover:opacity-70 transition-opacity relative cursor-pointer"
          aria-label="Shopping Cart"
          style={navColor ? { color: navColor } : {}}
        >
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
          {cartCount > 0 && (
            <span
              id="cart-count-badge"
              className="absolute -top-1 -right-1 bg-brand-lilac text-brand-black font-sans text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border border-brand-offwhite"
              style={settings.brand_primary_color ? { backgroundColor: settings.brand_primary_color } : {}}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
