/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, X, Heart, MessageCircle, ShoppingBag, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useSharedState } from "../useSharedState";
import { PRODUCTS } from "../data";
import { Product } from "../types";

interface ReelItem {
  id: string;
  username: string;
  userAvatar: string;
  coverImage: string;
  videoUrl: string;
  likes: string;
  comments: string;
  caption: string;
  productMatch: Product;
}

export default function UgcVideoGrid() {
  const { handleAddToCart } = useSharedState();
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [addedItem, setAddedItem] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Elite UGC items
  const reels: ReelItem[] = [
    {
      id: "ugc-1",
      username: "@aurora.glows",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      coverImage: "/Review 1.jpeg",
      videoUrl: "/frame video.mp4",
      likes: "12.4K",
      comments: "142",
      caption: "My morning hair spa routine using H Salon's Snail Silk Scalp Oil! Unreal shine and split end resolution. ✨💆‍♀️ #haircareroutine",
      productMatch: PRODUCTS.find((p) => p.id === "snail-silk-scalp-oil") || PRODUCTS[2],
    },
    {
      id: "ugc-2",
      username: "@charlotte.skinstudios",
      userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      coverImage: "/Review 3.jpeg",
      videoUrl: "/frame video.mp4",
      likes: "8.9K",
      comments: "98",
      caption: "Deep barrier hydration with Ground Recovery Oil. Perfect for post-retinol nights. 🌿💧 #skintips",
      productMatch: PRODUCTS.find((p) => p.id === "ground-recovery-oil") || PRODUCTS[3],
    },
    {
      id: "ugc-3",
      username: "@luxe.locks",
      userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      coverImage: "/Review 5.jpeg",
      videoUrl: "/frame video.mp4",
      likes: "15.1K",
      comments: "210",
      caption: "Snail Silk Scalp Mask treatment before styling. My luxury salon secret at home. 🐚🚿 #scalpcaresunday",
      productMatch: PRODUCTS.find((p) => p.id === "snail-silk-scalp-mask") || PRODUCTS[1],
    },
    {
      id: "ugc-4",
      username: "@fit_glow_gains",
      userAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80",
      coverImage: "/Review 6.jpeg",
      videoUrl: "/frame video.mp4",
      likes: "21.2K",
      comments: "420",
      caption: "Post-workout body revitalization with Gym Silk. Say goodbye to muscle fatigue! 🏋️‍♀️💧 #glowup",
      productMatch: PRODUCTS.find((p) => p.id === "gym-silk") || PRODUCTS[4],
    },
  ];

  const handleOpenReel = (idx: number) => {
    setActiveReelIndex(idx);
    setIsPlaying(true);
    setAddedItem(false);
  };

  const handleCloseReel = () => {
    setActiveReelIndex(null);
  };

  const handleNextReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeReelIndex !== null) {
      const nextIdx = (activeReelIndex + 1) % reels.length;
      setActiveReelIndex(nextIdx);
      setIsPlaying(true);
      setAddedItem(false);
    }
  };

  const handlePrevReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeReelIndex !== null) {
      const prevIdx = (activeReelIndex - 1 + reels.length) % reels.length;
      setActiveReelIndex(prevIdx);
      setIsPlaying(true);
      setAddedItem(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="ugc-social-stories" className="bg-[#FAF9F5] py-20 px-4 md:px-12 border-t border-black/5 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="font-sans font-black text-xs tracking-[0.25em] text-brand-black/40 uppercase mb-3">
              As Seen On Socials
            </p>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-black uppercase tracking-tighter leading-none mb-4">
              Our Community’s Real Rituals
            </h2>
            <p className="font-sans text-sm text-brand-black/60 max-w-xl">
              Spontaneous reviews and therapeutic routines shared by creators, editors, and salon lovers. Click any story to watch and instantly purchase their ritual setup.
            </p>
          </div>
          <span className="font-sans text-xs font-bold text-black/40 tracking-widest uppercase border-b border-black/15 pb-1">
            ✨ Tap any to watch & shop
          </span>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {reels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              onClick={() => handleOpenReel(idx)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative aspect-[9/16] bg-[#ECEBE7] rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-black/5"
            >
              {/* Cover Image */}
              <img
                src={reel.coverImage}
                alt={reel.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Darkener Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 z-10" />

              {/* Creator Tag (Top-left) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <img
                  src={reel.userAvatar}
                  alt={reel.username}
                  className="w-6 h-6 rounded-full border border-white/20 object-cover"
                />
                <span className="font-sans text-[10px] font-bold text-white tracking-wide">
                  {reel.username}
                </span>
              </div>

              {/* Dynamic Video icon indicators on hover */}
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>

              {/* Real-time statistics & short caption at base */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <p className="font-sans text-[11px] text-white/90 line-clamp-2 leading-relaxed mb-3">
                  {reel.caption}
                </p>
                <div className="flex items-center gap-3 text-white/50 text-[10px] font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 nav-heart fill-white text-white" /> {reel.likes}
                  </span>
                  <span>•</span>
                  <span>{reel.productMatch.name.split(" ")[0]} Match</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Immersive Portrait-Video Story Player Modal */}
      <AnimatePresence>
        {activeReelIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4">
            {/* Absolute close trigger on outer cover */}
            <div className="absolute inset-0" onClick={handleCloseReel} />

            {/* Immersive Compact Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-[#121212] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row aspect-[16/9] md:h-[580px] z-50 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Portrait Video Stage */}
              <div className="relative w-full md:w-[45%] h-full bg-black flex items-center justify-center overflow-hidden border-r border-white/5">
                <video
                  ref={videoRef}
                  src={reels[activeReelIndex].videoUrl}
                  autoPlay
                  loop
                  playsInline
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Video controls overlays */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col pointer-events-none text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={reels[activeReelIndex].userAvatar}
                      alt={reels[activeReelIndex].username}
                      className="w-7 h-7 rounded-full border border-white/30"
                    />
                    <span className="font-sans text-[11px] font-bold tracking-wide">
                      {reels[activeReelIndex].username}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-white/90 leading-relaxed max-w-xs">
                    {reels[activeReelIndex].caption}
                  </p>
                </div>

                {/* Instant Play/Pause Hud Indicator */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Floating Navigation Controls Inside Video */}
                <button
                  onClick={handlePrevReel}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-20 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextReel}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-20 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Side: Editorial Shoppable Product Showcase */}
              <div className="w-full md:w-[55%] h-full bg-[#181818] p-8 md:p-10 flex flex-col justify-between text-white relative">
                {/* Close Button top-right */}
                <button
                  onClick={handleCloseReel}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-white/50"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Headings */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase">
                      SHOP THE VIDEO RITUAL
                    </span>
                  </div>
                  <h4 className="font-sans font-black text-2xl uppercase tracking-tighter text-white mb-2 leading-none">
                    Featured Formulation
                  </h4>
                  <p className="font-sans text-xs text-white/50 lowercase italic mb-6">
                    H Salon bespoke apothecary product sequence
                  </p>
                </div>

                {/* Compact Product Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-5 items-center mb-6">
                  <div className="w-24 h-24 bg-white/10 rounded-xl overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={reels[activeReelIndex].productMatch.images[0]}
                      alt={reels[activeReelIndex].productMatch.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h5 className="font-sans font-black text-sm uppercase tracking-tight text-white mb-0.5">
                      {reels[activeReelIndex].productMatch.name}
                    </h5>
                    <p className="font-sans text-[11px] text-white/40 mb-2">
                      {reels[activeReelIndex].productMatch.subtitle}
                    </p>
                    <p className="font-serif text-[11px] italic text-white/60 line-clamp-2 leading-relaxed mb-1">
                      {reels[activeReelIndex].productMatch.description}
                    </p>
                  </div>
                </div>

                {/* Pricing + Add To Basket Grid */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Item Price</span>
                    <span className="font-sans font-black text-2xl text-white">
                      ${reels[activeReelIndex].productMatch.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(reels[activeReelIndex].productMatch, 1);
                      setAddedItem(true);
                      setTimeout(() => setAddedItem(false), 2500);
                    }}
                    className={`font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md transition-all duration-300 cursor-pointer ${
                      addedItem
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-black hover:bg-white/90 active:scale-95"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {addedItem ? "Added to Basket" : "Add to Basket"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
