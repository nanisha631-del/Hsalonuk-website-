/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, X, Heart, ShoppingBag, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useSharedState, formatPrice } from "../useSharedState";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import AnimatedUnderline from "./AnimatedUnderline";

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
  const { state, handleAddToCart } = useSharedState();
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(true);
  const [addedItem, setAddedItem] = useState(false);
  
  // Independent playback states for the 5 grid videos so they can be controlled individually
  const [gridStatuses, setGridStatuses] = useState<Record<string, { play: boolean; muted: boolean }>>({
    "ugc-1": { play: true, muted: true },
    "ugc-2": { play: true, muted: true },
    "ugc-3": { play: true, muted: true },
    "ugc-4": { play: true, muted: true },
    "ugc-5": { play: true, muted: true },
  });

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRefs = {
    "ugc-1": useRef<HTMLVideoElement>(null),
    "ugc-2": useRef<HTMLVideoElement>(null),
    "ugc-3": useRef<HTMLVideoElement>(null),
    "ugc-4": useRef<HTMLVideoElement>(null),
    "ugc-5": useRef<HTMLVideoElement>(null),
  };

  // Five premium UGC normalized video URLs in the public folder
  const reels: ReelItem[] = [
    {
      id: "ugc-1",
      username: "@aurora.glows",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      coverImage: "/Review 1.jpeg",
      videoUrl: "/ugc_video_1.mp4",
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
      videoUrl: "/ugc_video_2.mp4",
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
      videoUrl: "/ugc_video_3.mp4",
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
      videoUrl: "/ugc_video_4.mp4",
      likes: "21.2K",
      comments: "420",
      caption: "Post-workout body revitalization with Gym Silk. Say goodbye to muscle fatigue! 🏋️‍♀️💧 #glowup",
      productMatch: PRODUCTS.find((p) => p.id === "gym-silk") || PRODUCTS[4],
    },
    {
      id: "ugc-5",
      username: "@isabella.roots",
      userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      coverImage: "/Review 2.jpeg",
      videoUrl: "/ugc_video_5.mp4",
      likes: "18.3K",
      comments: "312",
      caption: "You’ve all been following my #HairGrowthJourney — and I’m so excited to share the newest addition to my routine! 🌱💆‍♀️ #scalphealth",
      productMatch: PRODUCTS.find((p) => p.id === "snail-silk-face-serum") || PRODUCTS[0],
    },
  ];

  const handleOpenReel = (idx: number) => {
    // Pause any playing grid videos to focus sound on modal
    Object.keys(videoRefs).forEach((id) => {
      const el = videoRefs[id as keyof typeof videoRefs]?.current;
      if (el) el.pause();
    });

    setActiveReelIndex(idx);
    setIsModalPlaying(true);
    setIsModalMuted(false); // Let modal play unmuted for best user engagement upon explicitly tapping it
    setAddedItem(false);
  };

  const handleCloseReel = () => {
    setActiveReelIndex(null);
    // Restart grid videos in loop
    setTimeout(() => {
      reels.forEach((r) => {
        const el = videoRefs[r.id as keyof typeof videoRefs]?.current;
        const status = gridStatuses[r.id];
        if (el && status && status.play) {
          el.play().catch(() => {});
        }
      });
    }, 100);
  };

  const handleNextReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeReelIndex !== null) {
      const nextIdx = (activeReelIndex + 1) % reels.length;
      setActiveReelIndex(nextIdx);
      setIsModalPlaying(true);
      setAddedItem(false);
    }
  };

  const handlePrevReel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeReelIndex !== null) {
      const prevIdx = (activeReelIndex - 1 + reels.length) % reels.length;
      setActiveReelIndex(prevIdx);
      setIsModalPlaying(true);
      setAddedItem(false);
    }
  };

  // Toggle play/pause for individual grid video card
  const toggleGridPlay = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const el = videoRefs[id as keyof typeof videoRefs]?.current;
    if (!el) return;

    setGridStatuses((prev) => {
      const nextPlay = !prev[id].play;
      if (nextPlay) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
      return {
        ...prev,
        [id]: { ...prev[id], play: nextPlay },
      };
    });
  };

  // Toggle mute/unmute for individual grid video card
  const toggleGridMute = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const el = videoRefs[id as keyof typeof videoRefs]?.current;
    if (!el) return;

    setGridStatuses((prev) => {
      const nextMute = !prev[id].muted;
      el.muted = nextMute;
      return {
        ...prev,
        [id]: { ...prev[id], muted: nextMute },
      };
    });
  };

  // Modal play controls
  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (isModalPlaying) {
        modalVideoRef.current.pause();
        setIsModalPlaying(false);
      } else {
        modalVideoRef.current.play().then(() => {
          setIsModalPlaying(true);
        }).catch(() => {});
      }
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      const nextMuted = !modalVideoRef.current.muted;
      modalVideoRef.current.muted = nextMuted;
      setIsModalMuted(nextMuted);
    }
  };

  // Sync modal video playback properties
  useEffect(() => {
    const el = modalVideoRef.current;
    if (el) {
      el.muted = isModalMuted;
      if (isModalPlaying) {
        el.play().catch(() => {
          // Fallback if browser blocks unmuted play on activation
          el.muted = true;
          setIsModalMuted(true);
          el.play().catch(() => {});
        });
      } else {
        el.pause();
      }
    }
  }, [activeReelIndex, isModalPlaying, isModalMuted]);

  return (
    <section id="ugc-social-stories" className="bg-[#FAF9F5] py-28 sm:py-36 px-4 md:px-12 border-t border-black/5 select-none relative overflow-hidden">
      <div className="absolute right-0 top-0 text-[180px] font-black leading-none text-[#82D8C5]/[0.03] pointer-events-none select-none font-sans">
        UGC
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82D8C5] animate-ping" />
              <p className="font-sans font-black text-xs tracking-[0.25em] text-[#82D8C5] uppercase">
                As Seen On Socials
              </p>
            </div>
            <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] font-black uppercase tracking-tight text-brand-black leading-[1.12] mb-6">
              Our Community’s Real <AnimatedUnderline word="Rituals" />
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-black/60 max-w-xl">
              Authentic luxury reviews and therapeutic recovery routines shared by real collectors, editors, and salon lovers. Click any setup to expand the immersive player and shop their custom apothecary matches.
            </p>
          </div>
          <span className="font-sans text-[10px] font-bold text-black/40 tracking-[0.2em] uppercase border-b border-[#82D8C5]/40 pb-1.5">
            ✨ Tap standard to watch & shop
          </span>
        </div>

        {/* The Grid displaying Autoplay/Muted videos directly inside the frames with independent manual overlays */}
        <div className="flex flex-row overflow-x-auto gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 snap-x snap-mandatory pb-4 select-none scrollbar-none">
          {reels.map((reel, idx) => {
            const hasStatus = gridStatuses[reel.id] || { play: true, muted: true };
            return (
              <motion.div
                key={reel.id}
                onClick={() => handleOpenReel(idx)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative aspect-[9/16] bg-zinc-200 rounded-3xl overflow-hidden cursor-pointer group shadow-sm border border-black/10 transition-shadow hover:shadow-md shrink-0 w-[285px] sm:w-auto snap-center"
              >
                {/* Autoplay Video Loop */}
                <video
                  ref={videoRefs[reel.id as keyof typeof videoRefs]}
                  src={reel.videoUrl}
                  poster={reel.coverImage}
                  autoPlay
                  loop
                  preload="metadata"
                  muted={hasStatus.muted}
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06] hover:scale-[1.06] [will-change:transform]"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 z-10" />

                {/* Top Row: User details & Custom Playback Quick Controls */}
                <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={reel.userAvatar}
                      alt={reel.username}
                      className="w-7 h-7 rounded-full border border-white/30 object-cover shadow-sm"
                    />
                    <span className="font-sans text-[10px] font-bold text-white tracking-wider filter drop-shadow-sm">
                      {reel.username}
                    </span>
                  </div>

                  {/* Quick toggle HUD directly on the frame */}
                  <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => toggleGridPlay(e, reel.id)}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
                      title={hasStatus.play ? "Pause" : "Play"}
                    >
                      {hasStatus.play ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current ml-0.5" />}
                    </button>
                    <button
                      onClick={(e) => toggleGridMute(e, reel.id)}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
                      title={hasStatus.muted ? "Unmute" : "Mute"}
                    >
                      {hasStatus.muted ? <VolumeX className="w-2.5 h-2.5" /> : <Volume2 className="w-2.5 h-2.5" />}
                    </button>
                  </div>
                </div>

                {/* Middle Hover Big Trigger Box */}
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#82D8C5] text-brand-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 fill-current" />
                  </div>
                </div>

                {/* Bottom Story Specs */}
                <div className="absolute bottom-5 inset-x-5 z-20 pointer-events-none">
                  <p className="font-sans text-xs text-white/95 line-clamp-2 leading-relaxed mb-4 font-medium tracking-wide">
                    {reel.caption}
                  </p>
                  <div className="flex items-center justify-between text-white/50 text-[9px] font-mono uppercase tracking-wider border-t border-white/10 pt-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-[#82D8C5] text-[#82D8C5]" /> {reel.likes}
                    </span>
                    <span className="text-[#82D8C5] font-sans font-bold">
                      {reel.productMatch.name.split(" ")[0]} MATCH
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Immersive Portrait-Video Story Player Modal with Comprehensive Custom HUD Controls */}
      <AnimatePresence>
        {activeReelIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={handleCloseReel} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-sm lg:max-w-4xl bg-[#121212] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto max-h-[92vh] lg:h-[600px] z-50 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Immersive Portrait Video Screen */}
              <div className="relative w-full lg:w-[46%] h-[380px] lg:h-full bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 shrink-0">
                <video
                  ref={modalVideoRef}
                  src={reels[activeReelIndex].videoUrl}
                  autoPlay
                  loop
                  playsInline
                  muted={isModalMuted}
                  onClick={toggleModalPlay}
                  className="w-full h-full object-cover cursor-pointer text-center"
                />

                {/* HUD Overlay for manual play/pause and mute/unmute */}
                <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModalPlay();
                    }}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15 flex items-center justify-center hover:bg-[#82D8C5] hover:text-brand-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isModalPlaying ? "Pause" : "Play"}
                  >
                    {isModalPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModalMute();
                    }}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15 flex items-center justify-center hover:bg-[#82D8C5] hover:text-brand-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isModalMuted ? "Unmute" : "Mute"}
                  >
                    {isModalMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* User tag & captions overlaid at critical focus bottom */}
                <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col pointer-events-none text-white bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={reels[activeReelIndex].userAvatar}
                      alt={reels[activeReelIndex].username}
                      className="w-7 h-7 rounded-full border border-white/30"
                    />
                    <span className="font-sans text-[11px] font-semibold tracking-wide">
                      {reels[activeReelIndex].username}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-white/90 leading-normal line-clamp-2">
                    {reels[activeReelIndex].caption}
                  </p>
                </div>

                {/* Big center play graphic states */}
                {!isModalPlaying && (
                  <div
                    onClick={toggleModalPlay}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#82D8C5] text-brand-black flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Slider Chevrons */}
                <button
                  onClick={handlePrevReel}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#82D8C5] hover:text-brand-black transition-colors z-20 cursor-pointer border border-white/5"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextReel}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#82D8C5] hover:text-brand-black transition-colors z-20 cursor-pointer border border-white/5"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Side: Editorial Shoppable Product Drawer */}
              <div className="w-full lg:w-[54%] h-auto lg:h-full bg-[#181818] p-6 lg:p-10 flex flex-col justify-between text-white relative">
                <button
                  onClick={handleCloseReel}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-white/50"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#82D8C5] animate-ping" />
                    <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#82D8C5] uppercase">
                      SHOP THE VIDEO RITUAL
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl uppercase tracking-tight text-white mb-1.5 leading-none">
                    Featured Formulation
                  </h4>
                  <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest leading-none mb-6">
                    H Salon Bespoke Biological System
                  </p>
                </div>

                {/* Compact Interactive Product Match Grid */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex gap-4 items-center mb-6">
                  <div className="w-20 h-20 bg-white/5 rounded-xl overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={reels[activeReelIndex].productMatch.images[0]}
                      alt={reels[activeReelIndex].productMatch.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-sans font-black text-xs uppercase tracking-tight text-white mb-0.5 truncate">
                      {reels[activeReelIndex].productMatch.name}
                    </h5>
                    <p className="font-sans text-[10px] text-[#82D8C5] mb-2 font-semibold">
                      {reels[activeReelIndex].productMatch.subtitle}
                    </p>
                    <p className="font-sans text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                      {reels[activeReelIndex].productMatch.description}
                    </p>
                  </div>
                </div>

                {/* Basket pricing segment */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Item Price</span>
                    <span className="font-sans font-black text-2xl text-white">
                      {formatPrice(reels[activeReelIndex].productMatch.price, state.currency)}
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
                        : "bg-[#82D8C5] text-brand-black hover:bg-[#82D8C5]/90 active:scale-95"
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
