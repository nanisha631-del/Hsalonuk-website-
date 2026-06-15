/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ScenicReviewsProps {
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export default function ScenicReviews({ onAddToCart, onSelectProduct }: ScenicReviewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind to scroll progress of this specific reviews scroll section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth out progress for high-performance fluid scroll animations (butter smooth 120fps)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.35,
    restDelta: 0.0001
  });

  // Calculate unified, highly orchestrated cascading vertical offsets for 4 cards
  // They all travel smoothly, keeping uniform velocity in parallel formulation
  const card1Y = useTransform(smoothProgress, [0, 1], [900, -850]);
  const card2Y = useTransform(smoothProgress, [0, 1], [1300, -450]);
  const card3Y = useTransform(smoothProgress, [0, 1], [1700, -50]);
  const card4Y = useTransform(smoothProgress, [0, 1], [2100, 350]);

  // Minor organic rotations to mimic drifting high-fashion visual assets
  const card1Rotate = useTransform(smoothProgress, [0, 1], [-1.5, 2.5]);
  const card2Rotate = useTransform(smoothProgress, [0, 1], [2, -2]);
  const card3Rotate = useTransform(smoothProgress, [0, 1], [-2.5, 1.5]);
  const card4Rotate = useTransform(smoothProgress, [0, 1], [1.5, -1.8]);

  // STAGE 1: Splitting horizontal movement of headers.
  // Starting from snug near-center and parting to their clean outer column borders.
  const leftX = useTransform(smoothProgress, [0, 0.38], ["80%", "0%"]);
  const rightX = useTransform(smoothProgress, [0, 0.38], ["-84%", "0%"]);

  // Mobile Splitting (Vertical parting to top & bottom edges)
  const mobileTopY = useTransform(smoothProgress, [0, 0.38], ["-40px", "-230px"]);
  const mobileBottomY = useTransform(smoothProgress, [0, 0.38], ["40px", "230px"]);

  // STAGE 2: Reveal review cards ONLY after the central gap is fully split open.
  // Keeps all reviews invisible (opacity 0) from progress 0 to 0.40, then reveals them beautifully.
  const card1Opacity = useTransform(smoothProgress, [0, 0.40, 0.46, 0.95, 1.0], [0, 0, 1, 1, 0]);
  const card2Opacity = useTransform(smoothProgress, [0, 0.44, 0.50, 0.95, 1.0], [0, 0, 1, 1, 0]);
  const card3Opacity = useTransform(smoothProgress, [0, 0.48, 0.54, 0.95, 1.0], [0, 0, 1, 1, 0]);
  const card4Opacity = useTransform(smoothProgress, [0, 0.52, 0.58, 0.95, 1.0], [0, 0, 1, 1, 0]);

  // Mobile specific card vertical animations (ascends elegantly through the center gap)
  const mobileCard1Y = useTransform(smoothProgress, [0, 1], [650, -780]);
  const mobileCard2Y = useTransform(smoothProgress, [0, 1], [1050, -380]);
  const mobileCard3Y = useTransform(smoothProgress, [0, 1], [1450, 20]);
  const mobileCard4Y = useTransform(smoothProgress, [0, 1], [1850, 420]);

  // Subtle text container opacity controls
  const textOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);

  // Retrieve true shop products for fully interactive user workflow
  const p1 = PRODUCTS.find(p => p.id === "ground-recovery-oil") || PRODUCTS[0];
  const p2 = PRODUCTS.find(p => p.id === "snail-silk-serum") || PRODUCTS[1];
  const p3 = PRODUCTS.find(p => p.id === "gym-silk") || PRODUCTS[2];
  const p4 = PRODUCTS.find(p => p.id === "snail-silk-scalp-oil") || PRODUCTS[0];

  const reviewItems = [
    {
      id: "rev-1",
      author: "Michael N.",
      role: "CUSTOMER",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: `"My skin feels incredibly soft, hydrated, and looks more radiant than ever. I've received so many compliments since I started using it!"`,
      product: p1,
      y: card1Y,
      mobileY: mobileCard1Y,
      x: 25, // Shifted slightly right
      rotate: card1Rotate,
      opacity: card1Opacity
    },
    {
      id: "rev-2",
      author: "Michael N.",
      role: "CUSTOMER",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: `"Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store."`,
      product: p2,
      y: card2Y,
      mobileY: mobileCard2Y,
      x: -95, // Shifted left
      rotate: card2Rotate,
      opacity: card2Opacity
    },
    {
      id: "rev-3",
      author: "Michael N.",
      role: "CUSTOMER",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      content: `"This active stimulating recovery extract is pure luxury. It has totally redefined my body recovery ritual after long days."`,
      product: p3,
      y: card3Y,
      mobileY: mobileCard3Y,
      x: 75, // Shifted right
      rotate: card3Rotate,
      opacity: card3Opacity
    },
    {
      id: "rev-4",
      author: "Michael N.",
      role: "CUSTOMER",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      content: `"Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store."`,
      product: p4,
      y: card4Y,
      mobileY: mobileCard4Y,
      x: -40, // Shifted slightly left
      rotate: card4Rotate,
      opacity: card4Opacity
    }
  ];

  return (
    <section
      ref={containerRef}
      id="scenic-reviews-section"
      className="relative w-full h-[260vh] sm:h-[350vh] bg-[#FAF8F5] select-none overflow-visible border-t border-brand-black/5"
    >
      {/* 
        Sticky viewport pin:
        Locks background and metadata in place while review cards float across the screen.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 md:px-12 select-none">
        
        {/* Desktop Layout Grid (md and up) */}
        <div className="hidden md:grid grid-cols-12 max-w-7xl w-full mx-auto relative items-center h-full py-16">
          
          {/* Left Side Column: Premium editorial serif header, vertically stationary near the top */}
          <motion.div 
            style={{ opacity: textOpacity, x: leftX }}
            className="col-span-4 flex flex-col items-start text-left select-none pointer-events-none self-start mt-32 pl-4 lg:pl-10"
          >
            <h3 className="font-serif text-[46px] lg:text-[64px] leading-[1.05] tracking-tight text-brand-black font-light">
              Don't just trust <br />
              <span className="italic font-normal font-serif text-brand-lilac">our</span> <br />
              words.
            </h3>
          </motion.div>

          {/* Middle Column: The cascading, overlapping tracks for reviewer cards */}
          <div className="col-span-4 h-full relative flex items-center justify-center overflow-visible">
            <div className="relative w-full max-w-[390px] h-[80vh] flex items-center justify-center overflow-visible">
              
              {reviewItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  style={{
                    y: item.y,
                    x: item.x,
                    rotate: item.rotate,
                    opacity: item.opacity,
                    zIndex: 10 + index
                  }}
                  className="absolute left-0 right-0 p-6 bg-[#FCFAF7] rounded-[28px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.065)] border border-brand-black/[0.03] hover:shadow-[0_32px_75px_-12px_rgba(0,0,0,0.09)] transition-shadow duration-300 flex flex-col gap-4 select-none"
                >
                  {/* Review Header Panel */}
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={item.avatar} 
                      alt={item.author} 
                      className="w-11 h-11 rounded-full object-cover grayscale aspect-square border border-brand-black/[0.04]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col text-left leading-none">
                      <span className="font-sans font-bold text-[13.5px] text-brand-black">
                        {item.author}
                      </span>
                      <span className="font-sans font-extrabold text-[8.5px] tracking-[0.16em] text-[#A69B89] mt-1.5 uppercase">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Quote Body text is lightweight and clean */}
                  <p className="font-sans text-[13px] text-brand-black/75 text-left leading-relaxed font-normal">
                    {item.content}
                  </p>

                  {/* Deep integrated genuine product attachment card */}
                  <div 
                    onClick={() => onSelectProduct(item.product.id)}
                    className="p-3 bg-white rounded-[20px] border border-brand-black/[0.045] flex items-center gap-3 cursor-pointer hover:bg-brand-black/[0.01] transition-all"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-13 h-13 object-cover bg-gray-50 rounded-[12px] aspect-square overflow-hidden border border-brand-black/[0.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col text-left min-w-0">
                      <span className="font-sans font-bold text-[8px] tracking-[0.15em] uppercase text-[#A69B89] leading-none mb-1.5">
                        XO WAVE
                      </span>
                      <span className="font-serif text-[12.5px] font-bold leading-tight text-brand-black truncate">
                        {item.product.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1 leading-none">
                        <span className="font-sans font-bold text-[11.5px] text-brand-black">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.id === "rev-1" && (
                          <span className="font-sans text-[10px] text-gray-400 line-through">
                            $160.00
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact stylish Quick-cart round button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item.product, 1);
                      }}
                      className="w-9 h-9 rounded-full bg-[#ECE6F5] hover:bg-brand-lilac hover:scale-105 active:scale-95 text-[#5D516B] hover:text-brand-black flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

          {/* Right Side Column: Pinned supplementary editorial header, positioned lower in viewport */}
          <motion.div 
            style={{ opacity: textOpacity, x: rightX }}
            className="col-span-4 flex flex-col items-end text-right select-none pointer-events-none self-end mb-32 pr-4 lg:pr-10"
          >
            <h3 className="font-serif text-[46px] lg:text-[64px] leading-[1.05] tracking-tight text-brand-black font-light">
              See what people <br />
              <span className="italic font-normal font-serif text-brand-lilac">are saying</span>
            </h3>
          </motion.div>

        </div>

        {/* 
          Mobile Responsive Layout: 
          Recreates the exact luxury parallax splitting and ascending cards from the desktop
          perfectly adjusted for portrait dimensions!
        */}
        <div className="flex md:hidden flex-col items-center justify-center h-full w-full relative overflow-hidden select-none pointer-events-none">
          
          {/* Header 1 (Top part of the split): starts in center-top & slides further up */}
          <motion.div 
            style={{ y: mobileTopY, opacity: textOpacity }}
            className="absolute text-center select-none w-full px-4"
          >
            <h3 className="font-serif text-[38px] xl:text-[44px] leading-[1.05] tracking-tight text-brand-black font-light text-center">
              Don't just trust <br />
              <span className="italic font-normal font-serif text-brand-lilac">our</span> words.
            </h3>
          </motion.div>

          {/* Header 2 (Bottom part of the split): starts in center-bottom & slides further down */}
          <motion.div 
            style={{ y: mobileBottomY, opacity: textOpacity }}
            className="absolute text-center select-none w-full px-4"
          >
            <h3 className="font-serif text-[38px] xl:text-[44px] leading-[1.05] tracking-tight text-[#A69B89] font-light text-center">
              See what people <br />
              <span className="italic font-normal font-serif text-brand-lilac">are saying</span>
            </h3>
          </motion.div>

          {/* Floating cards traversing ascendingly through the central viewport gap */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-visible pointer-events-none">
            {reviewItems.map((item, index) => (
              <motion.div
                key={item.id}
                style={{
                  y: item.mobileY,
                  rotate: item.rotate,
                  opacity: item.opacity,
                  x: "-50%", // Keep perfectly centered horizontally
                  zIndex: 20 + index
                }}
                className="absolute left-1/2 w-[88vw] max-w-[325px] p-5 bg-[#FCFAF7] rounded-[24px] shadow-[0_18px_45px_-12px_rgba(0,0,0,0.065)] border border-brand-black/[0.025] flex flex-col gap-3.5 select-none pointer-events-auto"
              >
                {/* Review Header Panel */}
                <div className="flex items-center gap-3">
                  <img 
                    src={item.avatar} 
                    alt={item.author} 
                    className="w-9 h-9 rounded-full object-cover grayscale aspect-square border border-brand-black/[0.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col text-left leading-none">
                    <span className="font-sans font-bold text-[12px] text-brand-black">
                      {item.author}
                    </span>
                    <span className="font-sans font-extrabold text-[8px] tracking-[0.15em] text-[#A69B89] mt-1.5 uppercase">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="font-sans text-[12px] text-brand-black/75 text-left leading-relaxed font-normal">
                  {item.content}
                </p>

                {/* Attachment Link */}
                <div 
                  onClick={() => onSelectProduct(item.product.id)}
                  className="p-2 bg-white rounded-[16px] border border-brand-black/[0.045] flex items-center gap-2.5 cursor-pointer hover:bg-brand-black/[0.012] transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-[38px] h-[38px] object-cover bg-gray-50 rounded-[10px] aspect-square overflow-hidden border border-brand-black/[0.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col text-left min-w-0">
                    <span className="font-serif text-[11px] font-bold leading-tight text-brand-black truncate">
                      {item.product.name}
                    </span>
                    <span className="font-sans font-bold text-[10px] text-brand-black mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item.product, 1);
                    }}
                    className="w-7.5 h-7.5 rounded-full bg-[#ECE6F5] hover:bg-brand-lilac hover:scale-105 active:scale-95 text-[#5D516B] hover:text-brand-black flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Add to bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
