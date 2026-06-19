/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface ScrollZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
  onClick?: () => void;
  id?: string;
}

export default function ScrollZoomImage({
  src,
  alt,
  className = "",
  referrerPolicy = "no-referrer",
  onClick,
  id
}: ScrollZoomImageProps) {
  return (
    <div className="overflow-hidden w-full h-full relative" id={id}>
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        onClick={onClick}
        initial={{ scale: 1.09 }}
        whileInView={{ scale: 1.01 }}
        viewport={{ once: true, amount: 0.1 }}
        whileHover={{ scale: 1.06 }}
        transition={{ 
          scale: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
          default: { duration: 0.4 }
        }}
        className={`w-full h-full object-cover select-none ${className}`}
      />
    </div>
  );
}
