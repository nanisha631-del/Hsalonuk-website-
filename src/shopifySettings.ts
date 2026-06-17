/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShopifySettings {
  announcement_text?: string;
  announcement_bg_color?: string;
  announcement_text_color?: string;
  announcement_speed?: string;
  announcement_text_size?: string;

  nav_logo_text?: string;
  nav_logo_size?: string;
  nav_bg_color?: string;
  nav_links_color?: string;

  hero_title_1?: string;
  hero_title_2?: string;
  hero_subtitle?: string;
  hero_cta_text?: string;
  hero_image_url?: string;
  hero_height?: string;
  hero_text_align?: string;
  hero_anim_duration?: string;
  hero_overlay_opacity?: string;

  bestsellers_title?: string;
  brushes_title?: string;
  collection_button_text?: string;
  carousel_gap?: string;
  card_title_size?: string;
  bestseller_anim_duration?: string;

  obsessed_label?: string;
  obsessed_title?: string;
  obsessed_desc?: string;
  obsessed_item_1_title?: string;
  obsessed_item_1_subtitle?: string;
  obsessed_item_1_img?: string;
  obsessed_item_2_title?: string;
  obsessed_item_2_subtitle?: string;
  obsessed_item_2_img?: string;
  obsessed_item_3_title?: string;
  obsessed_item_3_subtitle?: string;
  obsessed_item_3_img?: string;
  obsessed_item_4_title?: string;
  obsessed_item_4_subtitle?: string;
  obsessed_item_4_img?: string;

  trust_card_1_title?: string;
  trust_card_1_desc?: string;
  trust_card_2_title?: string;
  trust_card_2_desc?: string;
  trust_card_3_title?: string;
  trust_card_3_desc?: string;
  trust_card_4_title?: string;
  trust_card_4_desc?: string;

  parallax_title_line_1?: string;
  parallax_title_line_2_italic?: string;
  parallax_desc?: string;
  parallax_button_text?: string;
  parallax_image_1?: string;
  parallax_image_2?: string;
  parallax_scroll_intensity?: string;

  marquee_card_text_1?: string;
  marquee_card_text_2?: string;
  marquee_card_text_3?: string;
  marquee_card_speed?: string;

  look_title?: string;
  look_tagline?: string;
  look_main_image?: string;

  greeting_heading?: string;
  greeting_hint?: string;

  formulas_heading?: string;
  formulas_desc?: string;

  pouch_title?: string;
  pouch_price?: string;
  pouch_desc?: string;
  pouch_image_1?: string;
  pouch_image_2?: string;
  pouch_image_1_url?: string;
  pouch_image_2_url?: string;

  prod_stock_text?: string;
  prod_tested_bullet_1?: string;
  prod_tested_bullet_2?: string;
  prod_buy_with_text?: string;
  prod_faq_title?: string;
  prod_recommended_title?: string;

  brand_primary_color?: string;
  wave_text?: string;
  wave_speed_seconds?: string | number;
  hsalon_heading?: string;
  hsalon_subtext?: string;
  greeting_image?: string;
}

/**
 * Accesses dynamic Shopify Customizer section settings in real-time.
 * If running outside Shopify, it falls back to defaults gracefuly.
 */
export function getShopifySettings(): ShopifySettings {
  if (typeof document === "undefined") {
    return {};
  }

  // Use a global cache on window to keep settings consistent and super fast
  const win = window as any;
  if (win.__mergedShopifySettings) {
    return win.__mergedShopifySettings;
  }

  const mergedSettings: Record<string, any> = {};

  // 1. Scan for old single monolithic config tag
  const script = document.getElementById("shopify-section-settings");
  if (script) {
    try {
      const parsed = JSON.parse(script.textContent || "{}");
      for (const [key, val] of Object.entries(parsed)) {
        if (val !== undefined && val !== null && val !== "") {
          mergedSettings[key] = val;
        }
      }
    } catch (e) {
      console.error("Shopify Theme Customizer: parsed settings format is invalid", e);
    }
  }

  // 2. Scan and merge settings from all active native reorderable sections on the page
  const sectionContainers = document.querySelectorAll(".shopify-react-section[data-settings]");
  sectionContainers.forEach((el) => {
    try {
      const settingsAttr = el.getAttribute("data-settings");
      if (settingsAttr) {
        const parsed = JSON.parse(settingsAttr);
        for (const [key, val] of Object.entries(parsed)) {
          if (val !== undefined && val !== null && val !== "") {
            mergedSettings[key] = val;
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse settings for a section container element:", e);
    }
  });

  win.__mergedShopifySettings = mergedSettings;
  return mergedSettings;
}
