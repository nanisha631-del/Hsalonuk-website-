/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShopifySettings {
  announcement_text?: string;
  hero_title_1?: string;
  hero_title_2?: string;
  hero_subtitle?: string;
  hero_cta_text?: string;
  hero_image_url?: string;
  bestsellers_title?: string;
  brushes_title?: string;
  pouch_title?: string;
  pouch_price?: string;
  pouch_desc?: string;
  pouch_image_1?: string;
  pouch_image_2?: string;
  pouch_image_1_url?: string;
  pouch_image_2_url?: string;
  brand_primary_color?: string;
  collection_button_text?: string;
}

/**
 * Accesses dynamic Shopify Customizer section settings in real-time.
 * If running outside Shopify, it falls back to defaults gracefuly.
 */
export function getShopifySettings(): ShopifySettings {
  if (typeof document !== "undefined") {
    const script = document.getElementById("shopify-section-settings");
    if (script) {
      try {
        const parsed = JSON.parse(script.textContent || "{}");
        // Clear any empty string or placeholder values so defaults can kick in
        const cleanSettings: Record<string, any> = {};
        for (const [key, val] of Object.entries(parsed)) {
          if (val !== undefined && val !== null && val !== "") {
            cleanSettings[key] = val;
          }
        }
        return cleanSettings as ShopifySettings;
      } catch (e) {
        console.error("Shopify Theme Customizer: parsed settings format is invalid", e);
      }
    }
  }
  return {};
}
