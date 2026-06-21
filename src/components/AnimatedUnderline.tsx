import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface AnimatedUnderlineProps {
  word: string;
}

export default function AnimatedUnderline({ word }: AnimatedUnderlineProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={containerRef} className="relative inline-block whitespace-nowrap z-10 px-1">
      {word}
      <div className="absolute left-0 right-0 bottom-[-14px] sm:bottom-[-18px] h-[10px] sm:h-[14px] overflow-visible pointer-events-none">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 2,2 Q 50,8 98,2"
            fill="none"
            stroke="#82D8C5"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
          />
        </svg>
      </div>
    </span>
  );
}
