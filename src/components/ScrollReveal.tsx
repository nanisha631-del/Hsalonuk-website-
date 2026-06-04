/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "none";
  distance?: number;
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  distance = 25
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px", // triggers cleanly when coming near
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getInitialTransform = () => {
    if (isVisible) {
      return "translate(0px, 0px) scale(1)";
    }
    switch (direction) {
      case "up":
        return `translateY(${distance}px) scale(1)`;
      case "down":
        return `translateY(-${distance}px) scale(1)`;
      case "left":
        return `translateX(${distance}px) scale(1)`;
      case "right":
        return `translateX(-${distance}px) scale(1)`;
      case "zoom":
        return "translateY(0px) scale(0.96)";
      case "none":
        return "none";
      default:
        return `translateY(${distance}px) scale(1)`;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getInitialTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: "850ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
