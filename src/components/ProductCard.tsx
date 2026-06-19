/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "../types";
import ScrollZoomImage from "./ScrollZoomImage";

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onQuickAdd: (product: Product, event: React.MouseEvent) => void;
}

// Helper to define sparse product badge hierarchy to avoid overcrowding cards
const getProductBadges = (productId: string) => {
  switch (productId) {
    case "snail-silk-serum":
      return { leftBadge: "BESTSELLER" };
    case "snail-silk-scalp-mask":
      return { leftBadge: "NEW", rightBadge: "10% OFF" };
    case "snail-silk-scalp-oil":
      return { leftBadge: "WHATS HOT" };
    case "h-salon-cap":
      return { leftBadge: "NEW" };
    case "h-salon-comb":
      return { rightBadge: "15% OFF" };
    case "gym-silk":
      return { rightBadge: "20% OFF" };
    case "halo-highlighter":
      return { leftBadge: "BESTSELLER" };
    case "eye-shadow-stick":
      return { rightBadge: "10% OFF" };
    default:
      return {};
  }
};

export default function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const badges = getProductBadges(product.id);

  return (
    <div
      className="group relative bg-[#EDEDE9]/30 rounded-none overflow-hidden cursor-pointer flex flex-col justify-between h-full"
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 30px rgba(0,0,0,0.06)" : "none",
        transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product.id)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#E0DEDA]">
        {/* Hierarchical Sparse Status Badge (Left) */}
        {badges.leftBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-brand-black text-[#82D8C5] text-[9px] md:text-[10px] font-sans font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm select-none">
              {badges.leftBadge}
            </span>
          </div>
        )}

        {/* Small discount badge (Right) */}
        {badges.rightBadge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[#E76F51] text-white text-[9px] md:text-[10px] font-sans font-black uppercase tracking-wider px-2 py-1 rounded-xs shadow-xs select-none">
              {badges.rightBadge}
            </span>
          </div>
        )}

        <ScrollZoomImage
          src={product.images[0]}
          alt={product.name}
        />

        {/* PREMIUM EXPANDING CAPSULE QUICK ADD BUTTONS */}
        {/* Laptop/Desktop responsive hover variant */}
        <button
          onClick={(e) => onQuickAdd(product, e)}
          className="absolute bottom-3 right-3 z-20 h-10 w-10 hover:w-28 bg-brand-black hover:bg-[#82D8C5] text-[#82D8C5] hover:text-brand-black rounded-full hidden lg:flex items-center justify-start overflow-hidden transition-all duration-300 ease-out cursor-pointer group/bag shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          title={`Quick Buy ${product.name}`}
        >
          <div className="flex items-center justify-center min-w-10 h-10 shrink-0">
            <ShoppingBag className="w-4 h-4 shrink-0" />
          </div>
          <span className="opacity-0 group-hover/bag:opacity-100 transition-opacity duration-350 font-sans font-black text-[9px] tracking-widest uppercase truncate whitespace-nowrap leading-none pr-3">
            Quick Buy
          </span>
        </button>

        {/* Mobile/Tablet touch-friendly constant variant */}
        <button
          onClick={(e) => onQuickAdd(product, e)}
          className="absolute bottom-3 right-3 z-20 h-10 w-10 bg-brand-black active:bg-[#82D8C5] text-[#82D8C5] active:text-brand-black rounded-full lg:hidden flex items-center justify-center cursor-pointer shadow-md active:scale-90 transition-all duration-150"
          title={`Quick Buy ${product.name}`}
          aria-label={`Quick Buy ${product.name}`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Info details */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-1 items-start">
        {/* Star Rating */}
        <div className="flex gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating ? "fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-serif text-[16px] md:text-[18px] font-medium text-brand-black group-hover:text-brand-black/85 transition-colors mt-1">
          {product.name}
        </h3>

        {/* Subtitle / Type */}
        {product.subtitle && (
          <p className="text-[12px] text-gray-500 font-sans tracking-wide">
            {product.subtitle}
          </p>
        )}

        {/* Price & original price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-sans text-[14px] md:text-[15px] font-semibold text-brand-black">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-[13px] text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color swatches previews if available */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
