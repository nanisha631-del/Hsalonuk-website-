# @license
# SPDX-License-Identifier: Apache-2.0

import os
import shutil
import zipfile

# Define directories
theme_dir = 'phenomena-skincare'
subdirs = [
    'layout',
    'templates',
    'sections',
    'snippets',
    'assets',
    'locales',
    'config'
]

# Create directories
for subdir in subdirs:
    os.makedirs(os.path.join(theme_dir, subdir), exist_ok=True)

# 1. layout/theme.liquid
theme_liquid_content = """<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="canonical" href="{{ canonical_url }}">

    <title>{{ page_title }}</title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {{ content_for_header }}

    <!-- Load compiled React & Tailwind assets from assets folder -->
    {{ 'theme.css' | asset_url | stylesheet_tag }}
  </head>
  <body class="bg-brand-offwhite text-brand-black min-h-screen">
    {{ content_for_layout }}

    <!-- Load compiled React script -->
    <script src="{{ 'theme.js' | asset_url }}" defer="defer" type="module"></script>
  </body>
</html>
"""

with open(os.path.join(theme_dir, 'layout', 'theme.liquid'), 'w', encoding='utf-8') as f:
    f.write(theme_liquid_content)

# 2. templates/index.json
index_json_content = """{
  "sections": {
    "main": {
      "type": "main-home",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
"""

with open(os.path.join(theme_dir, 'templates', 'index.json'), 'w', encoding='utf-8') as f:
    f.write(index_json_content)

# 3. sections/main-home.liquid
main_home_liquid_content = """<!-- The mount point for the React-powered phenomena homepage -->
<div id="root" class="relative"></div>

<!-- JSON payload storing dynamic Shopify Customizer inputs.
     This allows real-time edits to update the React frontend smoothly. -->
<script id="shopify-section-settings" type="application/json">
{
  "announcement_text": {{ section.settings.announcement_text | default: "NEW CUSTOMERS SAVE 10% WITH CODE FIRST10! ★ NEW ARRIVALS NOW LIVE" | json }},
  "announcement_bg_color": {{ section.settings.announcement_bg_color | default: "#C4B5D4" | json }},
  "announcement_text_color": {{ section.settings.announcement_text_color | default: "#121212" | json }},
  "announcement_speed": {{ section.settings.announcement_speed | default: "28" | json }},
  "announcement_text_size": {{ section.settings.announcement_text_size | default: "11px" | json }},

  "nav_logo_text": {{ section.settings.nav_logo_text | default: "Phenomena" | json }},
  "nav_logo_size": {{ section.settings.nav_logo_size | default: "28px" | json }},
  "nav_bg_color": {{ section.settings.nav_bg_color | default: "#FDFBF7" | json }},
  "nav_links_color": {{ section.settings.nav_links_color | default: "#121212" | json }},

  "hero_title_1": {{ section.settings.hero_title_1 | default: "RADIANT" | json }},
  "hero_title_2": {{ section.settings.hero_title_2 | default: "BEAUTY" | json }},
  "hero_subtitle": {{ section.settings.hero_subtitle | default: "Makeup, but make it fun." | json }},
  "hero_cta_text": {{ section.settings.hero_cta_text | default: "SHOP PRODUCTS" | json }},
  "hero_image_url": {% if section.settings.hero_image != blank %}{{ section.settings.hero_image | image_url: width: 1800 | json }}{% else %}""{% endif %},
  "hero_height": {{ section.settings.hero_height | default: "h-[75vh]" | json }},
  "hero_text_align": {{ section.settings.hero_text_align | default: "text-center" | json }},
  "hero_anim_duration": {{ section.settings.hero_anim_duration | default: "0.9" | json }},
  "hero_overlay_opacity": {{ section.settings.hero_overlay_opacity | default: "0.82" | json }},

  "bestsellers_title": {{ section.settings.bestsellers_title | default: "BESTSELLERS" | json }},
  "brushes_title": {{ section.settings.brushes_title | default: "WHAT'S HOT" | json }},
  "collection_button_text": {{ section.settings.collection_button_text | default: "SHOP THE FULL COLLECTION" | json }},
  "carousel_gap": {{ section.settings.carousel_gap | default: "gap-5" | json }},
  "card_title_size": {{ section.settings.card_title_size | default: "text-[15px]" | json }},
  "bestseller_anim_duration": {{ section.settings.bestseller_anim_duration | default: "0.5" | json }},

  "obsessed_label": {{ section.settings.obsessed_label | default: "WEEK WRAPUP" | json }},
  "obsessed_title": {{ section.settings.obsessed_title | default: "Currently Obsessed" | json }},
  "obsessed_desc": {{ section.settings.obsessed_desc | default: "Curated edits of our most-worn formulas and shades, thoughtfully grouped so you don't have to overthink it." | json }},
  "obsessed_item_1_title": {{ section.settings.obsessed_item_1_title | default: "LOW EFFORT GLOW" | json }},
  "obsessed_item_1_subtitle": {{ section.settings.obsessed_item_1_subtitle | default: "Daily gloss and natural highlight formulas" | json }},
  "obsessed_item_1_img": {% if section.settings.obsessed_item_1_img != blank %}{{ section.settings.obsessed_item_1_img | image_url: width: 1200 | json }}{% else %}""{% endif %},
  "obsessed_item_2_title": {{ section.settings.obsessed_item_2_title | default: "MAIN CHARACTER EYES" | json }},
  "obsessed_item_2_subtitle": {{ section.settings.obsessed_item_2_subtitle | default: "Precision liquid liners and saturated eye pigments" | json }},
  "obsessed_item_2_img": {% if section.settings.obsessed_item_2_img != blank %}{{ section.settings.obsessed_item_2_img | image_url: width: 1200 | json }}{% else %}""{% endif %},
  "obsessed_item_3_title": {{ section.settings.obsessed_item_3_title | default: "FINISHING TOUCHES" | json }},
  "obsessed_item_3_subtitle": {{ section.settings.obsessed_item_3_subtitle | default: "Setting sprays, buffers, and featherlight buffers" | json }},
  "obsessed_item_3_img": {% if section.settings.obsessed_item_3_img != blank %}{{ section.settings.obsessed_item_3_img | image_url: width: 1200 | json }}{% else %}""{% endif %},
  "obsessed_item_4_title": {{ section.settings.obsessed_item_4_title | default: "SOFT LIPS CLUB" | json }},
  "obsessed_item_4_subtitle": {{ section.settings.obsessed_item_4_subtitle | default: "Hydrating berry-oil lip glazes and sheens" | json }},
  "obsessed_item_4_img": {% if section.settings.obsessed_item_4_img != blank %}{{ section.settings.obsessed_item_4_img | image_url: width: 1200 | json }}{% else %}""{% endif %},

  "trust_card_1_title": {{ section.settings.trust_card_1_title | default: "Skin-First Formulas" | json }},
  "trust_card_1_desc": {{ section.settings.trust_card_1_desc | default: "Makeup that treats your skin while you wear it." | json }},
  "trust_card_2_title": {{ section.settings.trust_card_2_title | default: "Inclusive Shades" | json }},
  "trust_card_2_desc": {{ section.settings.trust_card_2_desc | default: "Made to work across tones and undertones." | json }},
  "trust_card_3_title": {{ section.settings.trust_card_3_title | default: "Multi-Use Essentials" | json }},
  "trust_card_3_desc": {{ section.settings.trust_card_3_desc | default: "Minimal effort. Maximum options." | json }},
  "trust_card_4_title": {{ section.settings.trust_card_4_title | default: "Clean & Conscious" | json }},
  "trust_card_4_desc": {{ section.settings.trust_card_4_desc | default: "Vegan. Cruelty-free. Thoughtfully formulated." | json }},

  "parallax_title_line_1": {{ section.settings.parallax_title_line_1 | default: "MAKEUP, MADE" | json }},
  "parallax_title_line_2_italic": {{ section.settings.parallax_title_line_2_italic | default: "effortless." | json }},
  "parallax_desc": {{ section.settings.parallax_desc | default: "Lightweight, buildable makeup infused with skincare-level ingredients. Easy to wear, easy to blend, and made for whatever your routine looks like." | json }},
  "parallax_button_text": {{ section.settings.parallax_button_text | default: "SHOP THE COLLECTION" | json }},
  "parallax_image_1": {% if section.settings.parallax_image_1 != blank %}{{ section.settings.parallax_image_1 | image_url: width: 800 | json }}{% else %}""{% endif %},
  "parallax_image_2": {% if section.settings.parallax_image_2 != blank %}{{ section.settings.parallax_image_2 | image_url: width: 800 | json }}{% else %}""{% endif %},
  "parallax_scroll_intensity": {{ section.settings.parallax_scroll_intensity | default: "50" | json }},

  "marquee_card_text_1": {{ section.settings.marquee_card_text_1 | default: "REAL REVIEWS" | json }},
  "marquee_card_text_2": {{ section.settings.marquee_card_text_2 | default: "CLEAN FORMULAS" | json }},
  "marquee_card_text_3": {{ section.settings.marquee_card_text_3 | default: "FAST SHIPPING" | json }},
  "marquee_card_speed": {{ section.settings.marquee_card_speed | default: "25s" | json }},

  "look_title": {{ section.settings.look_title | default: "Shop The Look" | json }},
  "look_tagline": {{ section.settings.look_tagline | default: "TAP TO DISCOVER" | json }},
  "look_main_image": {% if section.settings.look_main_image != blank %}{{ section.settings.look_main_image | image_url: width: 1200 | json }}{% else %}""{% endif %},

  "greeting_heading": {{ section.settings.greeting_heading | default: "THE SKIN LAB" | json }},
  "greeting_hint": {{ section.settings.greeting_hint | default: "Greetings from" | json }},

  "formulas_heading": {{ section.settings.formulas_heading | default: "STORY OF LIGHTWEIGHT FORMULAS" | json }},
  "formulas_desc": {{ section.settings.formulas_desc | default: "THE HIGHLIGHT INDEX" | json }},

  "pouch_title": {{ section.settings.pouch_title | default: "THE MAKEUP POUCH" | json }},
  "pouch_price": {{ section.settings.pouch_price | default: "60.00" | json }},
  "pouch_desc": {{ section.settings.pouch_desc | default: "A cute, compact makeup pouch designed to go wherever you do. Finished with a soft, iridescent sheen and a clean zip closure, it fits your everyday essentials without taking up space. Easy to toss in your bag, easy to wipe clean, and cute enough to leave out." | json }},
  "pouch_image_1_url": {% if section.settings.pouch_image_1 != blank %}{{ section.settings.pouch_image_1 | image_url: width: 1000 | json }}{% else %}""{% endif %},
  "pouch_image_2_url": {% if section.settings.pouch_image_2 != blank %}{{ section.settings.pouch_image_2 | image_url: width: 805 | json }}{% else %}""{% endif %},

  "prod_stock_text": {{ section.settings.prod_stock_text | default: "Item is in stock" | json }},
  "prod_tested_bullet_1": {{ section.settings.prod_tested_bullet_1 | default: "Dermatologist Tested" | json }},
  "prod_tested_bullet_2": {{ section.settings.prod_tested_bullet_2 | default: "Non comedogenic" | json }},
  "prod_buy_with_text": {{ section.settings.prod_buy_with_text | default: "BUY IT WITH" | json }},
  "prod_faq_title": {{ section.settings.prod_faq_title | default: "Frequently Asked Questions" | json }},
  "prod_recommended_title": {{ section.settings.prod_recommended_title | default: "Curated Duos" | json }},

  "brand_primary_color": {{ section.settings.brand_primary_color | default: "#C4B5D4" | json }}
}
</script>

{% schema %}
{
  "name": "Main Home",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "header",
      "content": "Announcement Bar"
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement Text",
      "default": "NEW CUSTOMERS SAVE 10% WITH CODE FIRST10! ★ NEW ARRIVALS NOW LIVE"
    },
    {
      "type": "color",
      "id": "announcement_bg_color",
      "label": "Bar Background Color",
      "default": "#C4B5D4"
    },
    {
      "type": "color",
      "id": "announcement_text_color",
      "label": "Bar Text Color",
      "default": "#121212"
    },
    {
      "type": "text",
      "id": "announcement_speed",
      "label": "Animation Duration (Seconds, e.g. 28)",
      "default": "28"
    },
    {
      "type": "text",
      "id": "announcement_text_size",
      "label": "Text Size (e.g. 11px)",
      "default": "11px"
    },
    {
      "type": "header",
      "content": "Navigation Setup"
    },
    {
      "type": "text",
      "id": "nav_logo_text",
      "label": "Navigation Store Brand Name",
      "default": "Phenomena"
    },
    {
      "type": "text",
      "id": "nav_logo_size",
      "label": "Brand Logo Size (e.g. 28px)",
      "default": "28px"
    },
    {
      "type": "color",
      "id": "nav_bg_color",
      "label": "Navbar Background Color",
      "default": "#FDFBF7"
    },
    {
      "type": "color",
      "id": "nav_links_color",
      "label": "Navbar Links Color",
      "default": "#121212"
    },
    {
      "type": "header",
      "content": "Hero Section"
    },
    {
      "type": "text",
      "id": "hero_title_1",
      "label": "Hero Title Line 1",
      "default": "RADIANT"
    },
    {
      "type": "text",
      "id": "hero_title_2",
      "label": "Hero Title Line 2",
      "default": "BEAUTY"
    },
    {
      "type": "text",
      "id": "hero_subtitle",
      "label": "Hero Subtitle",
      "default": "Makeup, but make it fun."
    },
    {
      "type": "text",
      "id": "hero_cta_text",
      "label": "Hero CTA Button Text",
      "default": "SHOP PRODUCTS"
    },
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Background Image (Portrait/Landscape)"
    },
    {
      "type": "text",
      "id": "hero_height",
      "label": "Hero Screen Height CSS (e.g. h-[75vh])",
      "default": "h-[75vh]"
    },
    {
      "type": "text",
      "id": "hero_text_align",
      "label": "Hero Text Alignment Alignment",
      "default": "text-center"
    },
    {
      "type": "text",
      "id": "hero_anim_duration",
      "label": "Hero Entry Animation Delay Speed",
      "default": "0.9"
    },
    {
      "type": "text",
      "id": "hero_overlay_opacity",
      "label": "Hero Background Brightness",
      "default": "0.82"
    },
    {
      "type": "header",
      "content": "Product Sections"
    },
    {
      "type": "text",
      "id": "bestsellers_title",
      "label": "Bestsellers Tab Header",
      "default": "BESTSELLERS"
    },
    {
      "type": "text",
      "id": "brushes_title",
      "label": "What's Hot Tab Header",
      "default": "WHAT'S HOT"
    },
    {
      "type": "text",
      "id": "collection_button_text",
      "label": "Collection Button Text",
      "default": "SHOP THE FULL COLLECTION"
    },
    {
      "type": "text",
      "id": "carousel_gap",
      "label": "Active Slider Card Gap (e.g. gap-5)",
      "default": "gap-5"
    },
    {
      "type": "text",
      "id": "card_title_size",
      "label": "Card Heading Font Size (e.g. text-[15px])",
      "default": "text-[15px]"
    },
    {
      "type": "text",
      "id": "bestseller_anim_duration",
      "label": "Bestsellers Stagger Speeds",
      "default": "0.5"
    },
    {
      "type": "header",
      "content": "Currently Obsessed Accordion"
    },
    {
      "type": "text",
      "id": "obsessed_label",
      "label": "Obsessed Small Label Heading",
      "default": "WEEK WRAPUP"
    },
    {
      "type": "text",
      "id": "obsessed_title",
      "label": "Obsessed Section Large Heading",
      "default": "Currently Obsessed"
    },
    {
      "type": "textarea",
      "id": "obsessed_desc",
      "label": "Obsessed Subtitle Description Text",
      "default": "Curated edits of our most-worn formulas and shades, thoughtfully grouped so you don't have to overthink it."
    },
    {
      "type": "text",
      "id": "obsessed_item_1_title",
      "label": "Item 1 Slide Title Heading",
      "default": "LOW EFFORT GLOW"
    },
    {
      "type": "text",
      "id": "obsessed_item_1_subtitle",
      "label": "Item 1 Slide Description Title",
      "default": "Daily gloss and natural highlight formulas"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_1_img",
      "label": "Item 1 Side Portrait Close-up"
    },
    {
      "type": "text",
      "id": "obsessed_item_2_title",
      "label": "Item 2 Slide Title Heading",
      "default": "MAIN CHARACTER EYES"
    },
    {
      "type": "text",
      "id": "obsessed_item_2_subtitle",
      "label": "Item 2 Slide Description Title",
      "default": "Precision liquid liners and saturated eye pigments"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_2_img",
      "label": "Item 2 Side Portrait Close-up"
    },
    {
      "type": "text",
      "id": "obsessed_item_3_title",
      "label": "Item 3 Slide Title Heading",
      "default": "FINISHING TOUCHES"
    },
    {
      "type": "text",
      "id": "obsessed_item_3_subtitle",
      "label": "Item 3 Slide Description Title",
      "default": "Setting sprays, buffers, and featherlight buffers"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_3_img",
      "label": "Item 3 Side Portrait Close-up"
    },
    {
      "type": "text",
      "id": "obsessed_item_4_title",
      "label": "Item 4 Slide Title Heading",
      "default": "SOFT LIPS CLUB"
    },
    {
      "type": "text",
      "id": "obsessed_item_4_subtitle",
      "label": "Item 4 Slide Description Title",
      "default": "Hydrating berry-oil lip glazes and sheens"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_4_img",
      "label": "Item 4 Side Portrait Close-up"
    },
    {
      "type": "header",
      "content": "Trust Badges Section"
    },
    {
      "type": "text",
      "id": "trust_card_1_title",
      "label": "Badge 1 Title Heading",
      "default": "Skin-First Formulas"
    },
    {
      "type": "text",
      "id": "trust_card_1_desc",
      "label": "Badge 1 Description Lines",
      "default": "Makeup that treats your skin while you wear it."
    },
    {
      "type": "text",
      "id": "trust_card_2_title",
      "label": "Badge 2 Title Heading",
      "default": "Inclusive Shades"
    },
    {
      "type": "text",
      "id": "trust_card_2_desc",
      "label": "Badge 2 Description Lines",
      "default": "Made to work across tones and undertones."
    },
    {
      "type": "text",
      "id": "trust_card_3_title",
      "label": "Badge 3 Title Heading",
      "default": "Multi-Use Essentials"
    },
    {
      "type": "text",
      "id": "trust_card_3_desc",
      "label": "Badge 3 Description Lines",
      "default": "Minimal effort. Maximum options."
    },
    {
      "type": "text",
      "id": "trust_card_4_title",
      "label": "Badge 4 Title Heading",
      "default": "Clean & Conscious"
    },
    {
      "type": "text",
      "id": "trust_card_4_desc",
      "label": "Badge 4 Description Lines",
      "default": "Vegan. Cruelty-free. Thoughtfully formulated."
    },
    {
      "type": "header",
      "content": "Parallax Split Section"
    },
    {
      "type": "text",
      "id": "parallax_title_line_1",
      "label": "Parallax Header Line 1",
      "default": "MAKEUP, MADE"
    },
    {
      "type": "text",
      "id": "parallax_title_line_2_italic",
      "label": "Parallax Header Line 2 (Italic)",
      "default": "effortless."
    },
    {
      "type": "textarea",
      "id": "parallax_desc",
      "label": "Parallax Subtitle Description Lines",
      "default": "Lightweight, buildable makeup infused with skincare-level ingredients. Easy to wear, easy to blend, and made for whatever your routine looks like."
    },
    {
      "type": "text",
      "id": "parallax_button_text",
      "label": "Parallax Button Text",
      "default": "SHOP THE COLLECTION"
    },
    {
      "type": "image_picker",
      "id": "parallax_image_1",
      "label": "Rear Polaroid Image"
    },
    {
      "type": "image_picker",
      "id": "parallax_image_2",
      "label": "Front overlapping Polaroid Image"
    },
    {
      "type": "text",
      "id": "parallax_scroll_intensity",
      "label": "Parallax Scroll Sensitivity Speed multiplier (e.g. 50)",
      "default": "50"
    },
    {
      "type": "header",
      "content": "Auto Scroll Feedback Reviews"
    },
    {
      "type": "text",
      "id": "marquee_card_text_1",
      "label": "Banner Text Bullet 1",
      "default": "REAL REVIEWS"
    },
    {
      "type": "text",
      "id": "marquee_card_text_2",
      "label": "Banner Text Bullet 2",
      "default": "CLEAN FORMULAS"
    },
    {
      "type": "text",
      "id": "marquee_card_text_3",
      "label": "Banner Text Bullet 3",
      "default": "FAST SHIPPING"
    },
    {
      "type": "text",
      "id": "marquee_card_speed",
      "label": "Continuous Auto Scroll Banner Speed (e.g. 25s)",
      "default": "25s"
    },
    {
      "type": "header",
      "content": "Shop The Look Screen"
    },
    {
      "type": "text",
      "id": "look_title",
      "label": "Dewy Look Area Header",
      "default": "Shop The Look"
    },
    {
      "type": "text",
      "id": "look_tagline",
      "label": "Dewy Look Accent Tagline",
      "default": "TAP TO DISCOVER"
    },
    {
      "type": "image_picker",
      "id": "look_main_image",
      "label": "Model main looks background image"
    },
    {
      "type": "header",
      "content": "Greeting Section Interactive Postcard"
    },
    {
      "type": "text",
      "id": "greeting_heading",
      "label": "Postcard Banner Stamp Brand",
      "default": "THE SKIN LAB"
    },
    {
      "type": "text",
      "id": "greeting_hint",
      "label": "Postcard Small Upper Greeting Line",
      "default": "Greetings from"
    },
    {
      "type": "header",
      "content": "Lightweight Formulas Highlight Deck"
    },
    {
      "type": "text",
      "id": "formulas_heading",
      "label": "Formulas Main Header Title",
      "default": "STORY OF LIGHTWEIGHT FORMULAS"
    },
    {
      "type": "text",
      "id": "formulas_desc",
      "label": "Formulas Accent Tagline Header",
      "default": "THE HIGHLIGHT INDEX"
    },
    {
      "type": "header",
      "content": "The Makeup Pouch Feature"
    },
    {
      "type": "text",
      "id": "pouch_title",
      "label": "Pouch Section Title",
      "default": "THE MAKEUP POUCH"
    },
    {
      "type": "text",
      "id": "pouch_price",
      "label": "Pouch Unit Price ($)",
      "default": "60.00"
    },
    {
      "type": "textarea",
      "id": "pouch_desc",
      "label": "Pouch Description Text",
      "default": "A cute, compact makeup pouch designed to go wherever you do. Finished with a soft, iridescent sheen and a clean zip closure, it fits your everyday essentials without taking up space. Easy to toss in your bag, easy to wipe clean, and cute enough to leave out."
    },
    {
      "type": "image_picker",
      "id": "pouch_image_1",
      "label": "Pouch Image 1 (Left Portrait image)"
    },
    {
      "type": "image_picker",
      "id": "pouch_image_2",
      "label": "Pouch Image 2 (Overlapping Inset image)"
    },
    {
      "type": "header",
      "content": "Product Detail Customizations"
    },
    {
      "type": "text",
      "id": "prod_stock_text",
      "label": "Product Stock Title Line",
      "default": "Item is in stock"
    },
    {
      "type": "text",
      "id": "prod_tested_bullet_1",
      "label": "Testing Bullet 1 Line",
      "default": "Dermatologist Tested"
    },
    {
      "type": "text",
      "id": "prod_tested_bullet_2",
      "label": "Testing Bullet 2 Line",
      "default": "Non comedogenic"
    },
    {
      "type": "text",
      "id": "prod_buy_with_text",
      "label": "Buy it With Up-sell Title Header",
      "default": "BUY IT WITH"
    },
    {
      "type": "text",
      "id": "prod_faq_title",
      "label": "Frequently Asked Questions Section Heading",
      "default": "Frequently Asked Questions"
    },
    {
      "type": "text",
      "id": "prod_recommended_title",
      "label": "Curated recommended Row Title",
      "default": "Curated Duos"
    },
    {
      "type": "header",
      "content": "Branding Colors"
    },
    {
      "type": "color",
      "id": "brand_primary_color",
      "label": "Brand Accent Color (e.g. Lavender, Lilac, Pink)",
      "default": "#C4B5D4"
    }
  ]
}
{% endschema %}
"""

with open(os.path.join(theme_dir, 'sections', 'main-home.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_home_liquid_content)

# 4. snippets/.gitkeep
with open(os.path.join(theme_dir, 'snippets', '.gitkeep'), 'w', encoding='utf-8') as f:
    f.write('')

# 5. locales/en.default.json
en_default_content = """{
  "general": {
    "accessibility": {
      "skip_to_content": "Skip to content"
    }
  }
}
"""

with open(os.path.join(theme_dir, 'locales', 'en.default.json'), 'w', encoding='utf-8') as f:
    f.write(en_default_content)

# 6. config/settings_schema.json
settings_schema_content = """[
  {
    "name": "theme_info",
    "theme_name": "Phenomena Skincare Theme",
    "theme_version": "1.0.0",
    "theme_author": "Phenomena",
    "theme_documentation_url": "https://example.com/docs",
    "theme_support_url": "https://example.com/support"
  }
]
"""

with open(os.path.join(theme_dir, 'config', 'settings_schema.json'), 'w', encoding='utf-8') as f:
    f.write(settings_schema_content)

# 7. config/settings_data.json
settings_data_content = """{
  "current": {},
  "presets": {
    "Default": {}
  }
}
"""

with open(os.path.join(theme_dir, 'config', 'settings_data.json'), 'w', encoding='utf-8') as f:
    f.write(settings_data_content)

# 8. Copy compiled assets
shutil.copy('dist/assets/theme.css', os.path.join(theme_dir, 'assets', 'theme.css'))
shutil.copy('dist/assets/theme.js', os.path.join(theme_dir, 'assets', 'theme.js'))

print("All Shopify theme files created successfully.")

# Create a zip archive of the theme
zip_filename = 'phenomena-skincare.zip'
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zip_file:
    for root, dirs, files in os.walk(theme_dir):
        for file in files:
            file_path = os.path.join(root, file)
            # Create relative path from theme_dir to put folders at the zip root
            arcname = os.path.relpath(file_path, theme_dir)
            zip_file.write(file_path, arcname)

print(f"Shopify theme zipped successfully as '{zip_filename}'")

# Ensure the zip is accessible as a static asset for easy downloading from preview app
os.makedirs('public', exist_ok=True)
shutil.copy(zip_filename, os.path.join('public', zip_filename))
shutil.copy(zip_filename, os.path.join('dist', zip_filename))
print("Copied zip to public/ and dist/ folders for web downloading.")
