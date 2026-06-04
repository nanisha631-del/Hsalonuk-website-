/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onQuickAdd: (product: Product, event: React.MouseEvent) => void;
}

export default function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-[#EDEDE9]/30 rounded-none overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 ease-out h-full"
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 30px rgba(0,0,0,0.06)" : "none"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product.id)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#E0DEDA]">
        {/* Badges */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-brand-lilac text-brand-black text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick Add Overlay Button - slides up on hover */}
        <button
          onClick={(e) => onQuickAdd(product, e)}
          className="absolute bottom-0 left-0 w-full bg-brand-black text-white text-[12px] md:text-[13px] uppercase tracking-widest font-sans font-bold py-3.5 transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:bg-brand-black/90 active:bg-brand-black/95 cursor-pointer z-10"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          Quick Add
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
