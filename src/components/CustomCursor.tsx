/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverType, setHoverType] = useState<"none" | "product" | "interactive">("none");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Configure spring animations for ultra-fluid liquid lag trailing effect
  const springConfig = { damping: 40, stiffness: 450, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor wrapper on desktop devices with hover input capabilities
    const checkViewportAndHover = () => {
      const hasHover = window.matchMedia("(hover: hover)").matches;
      const isLargeScreen = window.innerWidth > 1024;
      setEnabled(hasHover && isLargeScreen);
    };

    checkViewportAndHover();
    window.addEventListener("resize", checkViewportAndHover);

    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Dynamically detect hover targets for custom state transformations
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestProduct = target.closest(".group, [onClick], button, a, .cursor-pointer");
      
      if (closestProduct) {
        // If it's a product card or item
        if (closestProduct.closest("#bestsellers-section, .product-card-container, #custom-interactive-consultation")) {
          setHoverType("product");
        } else {
          setHoverType("interactive");
        }
      } else {
        setHoverType("none");
      }
    };

    const handleMouseLeaveWindow = () => {
      mouseX.set(-100);
      mouseY.set(-100);
      setHoverType("none");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("resize", checkViewportAndHover);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const getSize = () => {
    if (hoverType === "product") return 74;
    if (hoverType === "interactive") return 40;
    return 16;
  };

  const getBorderColor = () => {
    if (hoverType === "product") return "rgba(0, 0, 0, 0.45)";
    if (hoverType === "interactive") return "rgba(13, 13, 13, 0.15)";
    return "rgba(13, 13, 13, 0.25)";
  };

  const getBgColor = () => {
    if (hoverType === "product") return "rgba(255, 255, 255, 0.95)";
    if (hoverType === "interactive") return "rgba(255, 255, 255, 0.2)";
    return "rgba(255, 255, 255, 0)";
  };

  return (
    <>
      {/* 1. Fluid Custom Tail Cursor Circle */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          width: getSize(),
          height: getSize(),
          borderColor: getBorderColor(),
          backgroundColor: getBgColor(),
        }}
        animate={{
          scale: hoverType !== "none" ? 1.08 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="pointer-events-none z-[9999] rounded-full border border-solid flex items-center justify-center overflow-hidden shadow-xs"
      >
        {/* Soft text inside the circular cursor when hovering products */}
        {hoverType === "product" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="text-[8px] font-sans font-black tracking-[0.25em] text-black select-none uppercase text-center leading-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* 2. Micro precise pinpoint cursor follower (Locks exactly at center coordinates for accurate clicking visual reference) */}
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: hoverType !== "none" ? 0 : 1,
          opacity: hoverType !== "none" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 bg-brand-black rounded-full pointer-events-none z-[10000]"
      />
    </>
  );
}
