/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

interface ScrollZoomImageProps {
  src: string;
  alt: string;
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
  className = "",
  referrerPolicy = "no-referrer",
  onClick,
  id,
  loading = "lazy",
  fetchPriority = "auto"
}: ScrollZoomImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="overflow-hidden w-full h-full relative bg-zinc-200/50" id={id}>
      {/* Delicate, shimmering ambient gradient loader background */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 animate-pulse z-0" />
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
    </div>
  );
}
