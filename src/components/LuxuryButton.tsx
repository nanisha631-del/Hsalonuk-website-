/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion } from "motion/react";

interface LuxuryButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset";
}

export default function LuxuryButton({ children, className = "", ...props }: LuxuryButtonProps) {
  const [hoverDirection, setHoverDirection] = useState<"up" | "down">("up");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);

  // Parse children to extract text and separate any JSX nodes like icons (e.g. <ArrowRight />)
  const childrenArray = React.Children.toArray(children);
  
  // Extract text and find secondary elements (like SVG icons)
  let textString = "";
  let iconElement: React.ReactNode = null;

  childrenArray.forEach(child => {
    if (typeof child === "string") {
      textString += child;
    } else if (typeof child === "number") {
      textString += String(child);
    } else {
      // It's likely an icon component
      iconElement = child;
    }
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const entryY = e.clientY - rect.top;
      // If cursor enters from bottom half, animate upward; otherwise downwards
      if (entryY > rect.height / 2) {
        setHoverDirection("up");
      } else {
        setHoverDirection("down");
      }
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const chars = textString.split("");

  return (
    <button
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group select-none ${className}`}
      {...props}
    >
      <span className="sr-only">{textString}</span>
      
      {/* Character rolling layer */}
      <span className="flex items-center justify-center gap-1.5" aria-hidden="true">
        {!textString && children}
        
        {textString && (
          <span className="relative inline-flex flex-wrap justify-center overflow-hidden py-0.5">
            {chars.map((char, index) => {
              const staggerDelay = index * 0.025;
              
              const exitY = hoverDirection === "up" ? "-110%" : "110%";
              const enterY = hoverDirection === "up" ? "110%" : "-110%";

              return (
                <span 
                  key={index} 
                  className="relative inline-block overflow-hidden"
                  style={{ width: char === " " ? "0.25em" : "auto" }}
                >
                  {/* Current Char (exits on hover) */}
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{ 
                      y: isHovered ? exitY : "0%",
                      opacity: isHovered ? 0 : 1
                    }}
                    transition={{ 
                      duration: 0.35, 
                      delay: staggerDelay, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{ display: "inline-block", willChange: "transform, opacity" }}
                  >
                    {char}
                  </motion.span>
                  
                  {/* Duplicate Char (enters on hover) */}
                  <motion.span
                    className="absolute left-0 top-0 inline-block whitespace-pre text-inherit"
                    initial={{ y: enterY, opacity: 0 }}
                    animate={{ 
                      y: isHovered ? "0%" : enterY,
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.35, 
                      delay: staggerDelay, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{ display: "inline-block", willChange: "transform, opacity" }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        )}

        {iconElement && (
          <motion.span 
            className="inline-flex shrink-0 items-center justify-center text-inherit"
            animate={{ 
              x: isHovered ? 3 : 0, 
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {iconElement}
          </motion.span>
        )}
      </span>
    </button>
  );
}
