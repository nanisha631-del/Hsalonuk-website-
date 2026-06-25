import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: string;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(value);
      return;
    }

    const prefix = value.startsWith("-") || value.startsWith("+") ? value[0] : "";
    const cleanString = value.replace(/^[+-]/, "");
    const match = cleanString.match(/[\d.]+/);
    
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[0]);
    const suffix = cleanString.replace(match[0], "");
    const duration = 1200; // 1.2 seconds elegant transition
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
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, isInView]);

  return <span ref={elementRef} className="transition-all duration-300">{displayValue}</span>;
}
