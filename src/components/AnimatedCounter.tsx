import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: string;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Backup: auto-start if IntersectionObserver is not supported
    const startCountAnimation = () => {
      const prefix = value.startsWith("-") || value.startsWith("+") ? value[0] : "";
      const cleanString = value.replace(/^[+-]/, "");
      const match = cleanString.match(/[\d.]+/);
      
      if (!match) {
        setDisplayValue(value);
        return;
      }

      const targetNum = parseFloat(match[0]);
      const suffix = cleanString.replace(match[0], "");
      const duration = 2000; // 2 seconds luxurious transition
      const startTime = performance.now();
      const hasDecimal = match[0].includes(".");

      let animationFrameId: number;

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quintic ease-out: starts extremely fast, finishes very slowly
        const easeProgress = 1 - Math.pow(1 - progress, 5);
        const currentNum = targetNum * easeProgress;

        let formattedNum = "";
        if (hasDecimal) {
          formattedNum = currentNum.toFixed(1);
        } else {
          formattedNum = Math.floor(currentNum).toString();
        }

        setDisplayValue(`${prefix}${formattedNum}${suffix}`);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);
    };

    return () => {
      observer.disconnect();
    };
  }, [value]);

  return <span ref={elementRef} className="transition-all duration-300">{displayValue}</span>;
}
