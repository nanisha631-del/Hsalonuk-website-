/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

interface ScrollZoomImageProps {
  src: string;
  alt: string;
  secondarySrc?: string;
  className?: string;
  referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
  onClick?: () => void;
  id?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

export default function ScrollZoomImage({
  src,
  alt,
  secondarySrc,
  className = "",
  referrerPolicy = "no-referrer",
  onClick,
  id,
  loading = "lazy",
  fetchPriority = "auto"
}: ScrollZoomImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSecondaryLoaded, setIsSecondaryLoaded] = useState(false);

  return (
    <div className="overflow-hidden w-full h-full relative bg-zinc-200/50" id={id}>
      {/* Premium hardware-accelerated sweeping shimmer loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-100 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-200/70 to-zinc-100 animate-pulse" />
          <div className="absolute inset-y-0 -left-[100%] w-[300%] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        onClick={onClick}
        loading={loading}
        // Custom attribute for prioritizing above-the-fold content
        {...({ fetchPriority: fetchPriority } as any)}
        onLoad={() => setIsLoaded(true)}
        decoding="async"
        className={`w-full h-full object-cover select-none luxury-zoom z-10 ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 scale-[1.03] blur-[2px]"
        } ${className}`}
      />

      {secondarySrc && (
        <img
          src={secondarySrc}
          alt={`${alt} Detail`}
          referrerPolicy={referrerPolicy}
          loading={loading}
          onLoad={() => setIsSecondaryLoaded(true)}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover select-none split-reveal-img luxury-zoom z-15 ${
            isSecondaryLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  );
}
