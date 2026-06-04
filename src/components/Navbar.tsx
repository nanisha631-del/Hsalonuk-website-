/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";

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

  const navClass = isScrolled
    ? "bg-brand-offwhite/95 backdrop-blur-md shadow-sm border-b border-brand-black/5 text-brand-black"
    : "bg-transparent text-white border-b border-white/10";

  return (
    <nav
      id="main-navigation"
      className={`w-full transition-all duration-300 ${navClass} h-16 md:h-20 flex items-center justify-between px-4 md:px-12`}
    >
      {/* Left side: Hamburger + Search */}
      <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={onSearchClick}
          className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Center: Brand name */}
      <div className="shrink-0 px-1 flex justify-center items-center min-w-[130px] z-10">
        <button
          onClick={onGoHome}
          className="font-serif text-[12.5px] xs:text-[14px] sm:text-[20px] md:text-[26.5px] font-black tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-visible select-none leading-none pt-0.5"
        >
          THE SKIN LAB
        </button>
      </div>

      {/* Right side: Account + Cart */}
      <div className="flex items-center justify-end gap-4 md:gap-6 flex-1 min-w-0">
        <button
          className="p-1 hover:opacity-70 transition-opacity hidden md:block cursor-pointer"
          aria-label="Account"
        >
          <User className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={onCartClick}
          className="p-1 hover:opacity-70 transition-opacity relative cursor-pointer"
          aria-label="Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
          {cartCount > 0 && (
            <span
              id="cart-count-badge"
              className="absolute -top-1 -right-1 bg-brand-lilac text-brand-black font-sans text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border border-brand-offwhite"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
