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
    if (hoverType === "product") return 24;
    if (hoverType === "interactive") return 20;
    return 10;
  };

  const getBorderColor = () => {
    if (hoverType === "product") return "#82D8C5";
    if (hoverType === "interactive") return "rgba(130, 216, 197, 0.5)";
    return "rgba(13, 13, 13, 0.15)";
  };

  const getBgColor = () => {
    if (hoverType === "product") return "rgba(130, 216, 197, 0.1)";
    if (hoverType === "interactive") return "rgba(255, 255, 255, 0)";
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
      </motion.div>

      {/* 2. Micro precise pinpoint cursor follower */}
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 bg-brand-black rounded-full pointer-events-none z-[10000]"
      />
    </>
  );
}
