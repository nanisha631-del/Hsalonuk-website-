/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ScrollZoomImage from "./ScrollZoomImage";
import { PRODUCTS } from "../data";
import { getShopifySettings } from "../shopifySettings";
import { useSharedState } from "../useSharedState";

export default function MakeupPouchFeature() {
  const settings = getShopifySettings();
  const { handleAddToCart, handleSelectProduct } = useSharedState();

  return (
    <section id="makeup-pouch-feature" className="bg-brand-offwhite py-12 px-4 md:px-12 relative select-none">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[36px] shadow-xs border border-brand-black/5">
        
        {/* Top Tab Headers */}
        <div className="flex gap-6 border-b border-brand-black/5 pb-2.5 mb-6">
          <span className="font-sans text-[13px] sm:text-[15px] font-black tracking-widest text-brand-black cursor-pointer pb-2 border-b-2 border-brand-lilac">
            {settings.pouch_title || "THE APOTHECARY SPA POUCH"}
          </span>
          <span className="font-sans text-[13px] sm:text-[15px] font-bold tracking-widest text-gray-400 hover:text-brand-black cursor-pointer pb-2">
            ROOT THERAPY DUOS
          </span>
        </div>

        {/* Overlapping Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Beautiful Overlapping Image Card frame */}
          <div className="md:col-span-6 relative w-full select-none">
            <div className="w-[85%] aspect-[1.12/1] bg-[#E8E4DF] overflow-hidden rounded-2xl sm:rounded-[28px] relative shadow-xs">
              <ScrollZoomImage
                src={settings.pouch_image_1_url || "/the main image frame pouch.jpeg"}
                alt="The Apothecary Spa Pouch Main"
              />
            </div>
            
            {/* Secondary overlapping inset picture */}
            <div className="absolute bottom-[-10px] right-2 w-[42%] aspect-square bg-[#DFDEDA] border-[3px] border-white rounded-[16px] sm:rounded-[22px] overflow-hidden shadow-md">
              <ScrollZoomImage
                src={settings.pouch_image_2_url || "/the secondary insdert image frame.jpeg"}
                alt="Apothecary Pouch Inset Detail"
              />
            </div>
          </div>

          {/* Right: Tight details copy with ADD TO BAG button */}
          <div className="md:col-span-6 flex flex-col gap-3 sm:gap-4 items-start w-full">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-brand-lilac font-black">
              TRENDING BESTSELLER
            </span>
            
            {/* Price in bold compact size */}
            <div className="font-sans text-[26px] sm:text-[32px] font-black leading-none text-brand-black">
              ${settings.pouch_price || "60.00"}
            </div>

            <p className="text-[11.5px] sm:text-[13px] font-sans text-gray-400 leading-relaxed">
              {settings.pouch_desc || "A gorgeous, quilted velvet protection sleeve designed to shelter your luxury elixirs, active botanicals, and scalp oils. Liquid-proof lining shields your precious apothecary glass droppers, while the compact, padded structural silhouette packs seamlessly into travel bags for premium root treatments anywhere."}
            </p>

            <div className="flex gap-4 w-full mt-2">
              {/* Add to Bag CTA */}
              <button
                onClick={() => {
                  const pouch = PRODUCTS.find((p) => p.id === "makeup-pouch");
                  if (pouch) {
                    handleAddToCart(pouch, 1);
                  }
                }}
                className="flex-1 bg-brand-black hover:bg-brand-black/90 text-white font-sans font-bold py-3.5 px-6 text-[11px] uppercase tracking-[0.2em] transition-colors rounded-full cursor-pointer whitespace-nowrap shadow-xs"
              >
                ADD TO BAG
              </button>

              <button
                onClick={() => handleSelectProduct("makeup-pouch")}
                className="border border-brand-black/15 bg-transparent hover:bg-brand-black/5 text-brand-black font-sans font-bold py-3.5 px-6 text-[11px] uppercase tracking-[0.2em] transition-all rounded-full cursor-pointer whitespace-nowrap"
              >
                DETAILS
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
