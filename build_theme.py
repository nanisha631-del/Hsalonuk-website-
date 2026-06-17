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

# 2. templates/index.json with completely separated sections order
index_json_content = """{
  "sections": {
    "announcement_bar": {
      "type": "announcement-bar",
      "settings": {}
    },
    "navigation": {
      "type": "navigation",
      "settings": {}
    },
    "hero": {
      "type": "hero-section",
      "settings": {}
    },
    "bestsellers": {
      "type": "bestsellers-carousel",
      "settings": {}
    },
    "currently_obsessed": {
      "type": "currently-obsessed",
      "settings": {}
    },
    "trust_cards": {
      "type": "trust-cards",
      "settings": {}
    },
    "wave_scroll_text": {
      "type": "wave-scroll-text",
      "settings": {}
    },
    "hsalon_scroll": {
      "type": "hsalon-scroll",
      "settings": {}
    },
    "parallax_split": {
      "type": "parallax-split",
      "settings": {}
    },
    "auto_scroll_cards": {
      "type": "auto-scroll-cards",
      "settings": {}
    },
    "shop_the_look": {
      "type": "shop-the-look",
      "settings": {}
    },
    "greeting_section": {
      "type": "greeting-section",
      "settings": {}
    },
    "lightweight_formulas": {
      "type": "lightweight-formulas",
      "settings": {}
    },
    "makeup_pouch": {
      "type": "makeup-pouch",
      "settings": {}
    },
    "scrolling_banner": {
      "type": "scrolling-banner",
      "settings": {}
    },
    "fun_editorial": {
      "type": "fun-editorial",
      "settings": {}
    },
    "community_section": {
      "type": "community-section",
      "settings": {}
    },
    "hover_accordion": {
      "type": "hover-accordion",
      "settings": {}
    },
    "footer": {
      "type": "footer",
      "settings": {}
    }
  },
  "order": [
    "announcement_bar",
    "navigation",
    "hero",
    "hsalon_scroll",
    "bestsellers",
    "currently_obsessed",
    "trust_cards",
    "wave_scroll_text",
    "parallax_split",
    "auto_scroll_cards",
    "shop_the_look",
    "greeting_section",
    "lightweight_formulas",
    "makeup_pouch",
    "scrolling_banner",
    "fun_editorial",
    "community_section",
    "hover_accordion",
    "footer"
  ]
}
"""

with open(os.path.join(theme_dir, 'templates', 'index.json'), 'w', encoding='utf-8') as f:
    f.write(index_json_content)

# 2b. templates/product.json
product_json_content = """{
  "sections": {
    "announcement_bar": {
      "type": "announcement-bar",
      "settings": {}
    },
    "navigation": {
      "type": "navigation",
      "settings": {}
    },
    "main": {
      "type": "main-product",
      "settings": {}
    },
    "footer": {
      "type": "footer",
      "settings": {}
    }
  },
  "order": [
    "announcement_bar",
    "navigation",
    "main",
    "footer"
  ]
}
"""

with open(os.path.join(theme_dir, 'templates', 'product.json'), 'w', encoding='utf-8') as f:
    f.write(product_json_content)

# 2c. Write standard support templates to prevent 404/blank pages in Shopify Editor
support_templates = {
    '404.json': 'main-404',
    'page.json': 'main-page',
    'collection.json': 'main-collection',
    'cart.json': 'main-cart',
    'password.json': 'main-password',
    'blog.json': 'main-blog',
    'article.json': 'main-article',
    'search.json': 'main-search',
    'gift_card.json': 'main-giftcard'
}

for temp_name, main_type in support_templates.items():
    temp_content = f"""{{
  "sections": {{
    "announcement_bar": {{
      "type": "announcement-bar",
      "settings": {{}}
    }},
    "navigation": {{
      "type": "navigation",
      "settings": {{}}
    }},
    "main": {{
      "type": "{main_type}",
      "settings": {{}}
    }},
    "footer": {{
      "type": "footer",
      "settings": {{}}
    }}
  }},
  "order": [
    "announcement_bar",
    "navigation",
    "main",
    "footer"
  ]
}}"""
    with open(os.path.join(theme_dir, 'templates', temp_name), 'w', encoding='utf-8') as f:
        f.write(temp_content)


# RETAIN BACKWARDS COMPATIBILITY NODE: main-product.liquid (loads product mount root)
main_product_liquid_content = """<!-- Mount Node for the Active Skincare Product Details screen -->
<div id="root" class="relative"></div>

<script id="shopify-section-settings" type="application/json">
{
  "prod_stock_text": {{ section.settings.prod_stock_text | default: "Item is in stock" | json }},
  "prod_tested_bullet_1": {{ section.settings.prod_tested_bullet_1 | default: "Dermatologist Tested" | json }},
  "prod_tested_bullet_2": {{ section.settings.prod_tested_bullet_2 | default: "Non comedogenic" | json }},
  "prod_buy_with_text": {{ section.settings.prod_buy_with_text | default: "BUY IT WITH" | json }},
  "prod_faq_title": {{ section.settings.prod_faq_title | default: "Frequently Asked Questions" | json }},
  "prod_recommended_title": {{ section.settings.prod_recommended_title | default: "Curated Duos" | json }}
}
</script>

{% schema %}
{
  "name": "Product Layout Manager",
  "tag": "section",
  "class": "section",
  "settings": [
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
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'main-product.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_product_liquid_content)

# 2d. Create theme section Liquid controllers for support templates
main_404_liquid = """<div class="max-w-2xl mx-auto px-4 py-24 text-center">
  <h1 class="text-4xl font-extrabold tracking-tight text-brand-black sm:text-5xl">404 - Page Not Found</h1>
  <p class="mt-4 text-base text-gray-500">The apothecary formula or page you are looking for doesn't exist.</p>
  <div class="mt-8">
    <a href="/" class="inline-flex items-center px-6 py-3 border border-transparent text-xs font-semibold uppercase tracking-widest text-white bg-gray-900 hover:bg-gray-800 rounded transition-all">
      Continue Browsing
    </a>
  </div>
</div>

{% schema %}
{
  "name": "404 Main Page Content",
  "settings": []
}
{% endschema %}
"""

main_page_liquid = """<div class="max-w-4xl mx-auto px-6 py-16">
  <h1 class="text-3xl font-bold tracking-tight text-brand-black mb-8">{{ page.title | default: "Brand Policy & Information" }}</h1>
  <div class="prose max-w-none text-gray-600 leading-relaxed text-sm">
    {{ page.content | default: "Please configure page details or terms under Pages settings in your Shopify Admin." }}
  </div>
</div>

{% schema %}
{
  "name": "Static Page Content",
  "settings": []
}
{% endschema %}
"""

main_collection_liquid = """<div class="max-w-7xl mx-auto px-6 py-16">
  <div class="text-center mb-12">
    <span class="text-xs uppercase tracking-widest text-[#9A89A5]">Curated Selection</span>
    <h1 class="text-4xl font-bold text-brand-black mt-2">{{ collection.title | default: "Skincare Collections" }}</h1>
    {% if collection.description != blank %}
      <div class="text-sm text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">{{ collection.description }}</div>
    {% endif %}
  </div>
  
  <div class="shopify-react-section" data-react-component="BestsellersCarousel"></div>
</div>

{% schema %}
{
  "name": "Collection Page Template",
  "settings": []
}
{% endschema %}
"""

main_cart_liquid = """<div class="max-w-2xl mx-auto px-4 py-24 text-center">
  <h1 class="text-3xl font-extrabold tracking-tight text-brand-black mb-4">Your Shopping Cart</h1>
  <p class="text-gray-500 text-sm mb-8">Your cart items reside in the slideout panel. Use the navbar cart button to review your active duos!</p>
  <a href="/" class="inline-flex items-center px-6 py-3 border border-transparent text-xs font-semibold uppercase tracking-widest text-white bg-gray-900 hover:bg-gray-800 rounded transition-all">
    Continue Shopping
  </a>
</div>

{% schema %}
{
  "name": "Standard Cart Content",
  "settings": []
}
{% endschema %}
"""

main_password_liquid = """<div class="max-w-2xl mx-auto px-4 py-24 text-center">
  <h1 class="text-3xl font-extrabold tracking-tight text-brand-black mb-4">{{ shop.name }}</h1>
  <p class="text-gray-500 text-sm mb-8">Opening Soon! This store is currently password-protected.</p>
  {% form 'storefront_password' %}
    {{ form.errors | default_errors }}
    <div class="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
      <input type="password" name="password" id="password" class="px-4 py-2 border rounded text-sm w-full" placeholder="Enter store password">
      <button type="submit" class="px-6 py-2 bg-gray-900 text-white font-semibold uppercase tracking-widest text-xs rounded hover:bg-gray-800 transition-all">
        Enter
      </button>
    </div>
  {% endform %}
</div>

{% schema %}
{
  "name": "Password Main Page",
  "settings": []
}
{% endschema %}
"""

main_blog_liquid = """<div class="max-w-6xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-bold text-center mb-12">{{ blog.title | default: "Skincare Journal" }}</h1>
  <p class="text-center text-sm text-gray-500">Read our curated guides to high-end botany, scalps, and lightweight formulas.</p>
</div>

{% schema %}
{
  "name": "Blog Content Layout",
  "settings": []
}
{% endschema %}
"""

main_article_liquid = """<div class="max-w-3xl mx-auto px-6 py-16">
  <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>
  <div class="text-xs text-gray-500 mb-8">{{ article.published_at | date: "%B %d, %Y" }}</div>
  <div class="prose max-w-none text-sm text-gray-600 leading-relaxed">
    {{ article.content }}
  </div>
</div>

{% schema %}
{
  "name": "Article Layout Manager",
  "settings": []
}
{% endschema %}
"""

main_search_liquid = """<div class="max-w-4xl mx-auto px-6 py-16 text-center">
  <h1 class="text-3xl font-bold mb-8">Search Results</h1>
  <form action="/search" method="get" class="max-w-md mx-auto mb-12 flex gap-2">
    <input type="text" name="q" placeholder="Search our apothecary..." class="px-3 py-2 border rounded text-sm w-full" value="{{ search.terms | escape }}">
    <button type="submit" class="px-4 py-2 bg-gray-900 text-white text-xs uppercase font-bold tracking-widest rounded hover:bg-gray-800">Search</button>
  </form>
  {% if search.performed %}
    <p class="text-sm text-gray-500">Found {{ search.results_count }} results for "{{ search.terms }}".</p>
  {% endif %}
</div>

{% schema %}
{
  "name": "Search Results Page",
  "settings": []
}
{% endschema %}
"""

main_giftcard_liquid = """<div class="max-w-2xl mx-auto px-4 py-24 text-center">
  <h1 class="text-3xl font-semibold mb-4">Your Gift Card</h1>
  <p class="text-sm text-gray-500 mb-8">Redeem your custom botanical credit at checkout.</p>
</div>

{% schema %}
{
  "name": "Gift Card Page",
  "settings": []
}
{% endschema %}
"""

with open(os.path.join(theme_dir, 'sections', 'main-404.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_404_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-page.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_page_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-collection.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_collection_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-cart.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_cart_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-password.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_password_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-blog.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_blog_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-article.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_article_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-search.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_search_liquid)
with open(os.path.join(theme_dir, 'sections', 'main-giftcard.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_giftcard_liquid)


# RETAIN monolithic landing fallback also as section option
main_home_liquid_content = """<div class="shopify-react-section" data-react-component="HeroSection"></div>
<div class="shopify-react-section" data-react-component="HSalonScrollSection"></div>
<div class="shopify-react-section" data-react-component="BestsellersCarousel"></div>
<div class="shopify-react-section" data-react-component="CurrentlyObsessed"></div>
<div class="shopify-react-section" data-react-component="TrustCards"></div>
<div class="shopify-react-section" data-react-component="ParallaxSplit"></div>
<div class="shopify-react-section" data-react-component="AutoScrollCards"></div>
<div class="shopify-react-section" data-react-component="ShopTheLook"></div>
<div class="shopify-react-section" data-react-component="GreetingSection"></div>
<div class="shopify-react-section" data-react-component="LightweightFormulas"></div>
<div class="shopify-react-section" data-react-component="MakeupPouchFeature"></div>
<div class="shopify-react-section" data-react-component="ScrollingBanner"></div>
<div class="shopify-react-section" data-react-component="FunEditorialSection"></div>
<div class="shopify-react-section" data-react-component="CommunitySection"></div>
<div class="shopify-react-section" data-react-component="HoverAccordion"></div>

{% schema %}
{
  "name": "Decoupled SPA Fallback",
  "settings": []
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'main-home.liquid'), 'w', encoding='utf-8') as f:
    f.write(main_home_liquid_content)


# WRITE SEPARATE SECTIONS LIQUIDS
# 1. annoucement-bar.liquid
announcement_bar_content = """<div class="shopify-react-section" data-react-component="AnnouncementBar" data-settings='{
  "announcement_text": {{ section.settings.announcement_text | default: "NEW CUSTOMERS SAVE 10% WITH CODE FIRST10! ★ NEW ARRIVALS NOW LIVE" | json }},
  "announcement_bg_color": {{ section.settings.announcement_bg_color | default: "#C4B5D4" | json }},
  "announcement_text_color": {{ section.settings.announcement_text_color | default: "#121212" | json }},
  "announcement_speed": {{ section.settings.announcement_speed | default: "28" | json }},
  "announcement_text_size": {{ section.settings.announcement_text_size | default: "11px" | json }}
}'></div>

{% schema %}
{
  "name": "Announcement Bar",
  "tag": "section",
  "class": "section-announcement-bar",
  "settings": [
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
      "label": "Animation Duration (Seconds)",
      "default": "28"
    },
    {
      "type": "text",
      "id": "announcement_text_size",
      "label": "Text Size (e.g. 11px)",
      "default": "11px"
    }
  ],
  "presets": [
    {
      "name": "Announcement Bar"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'announcement-bar.liquid'), 'w', encoding='utf-8') as f:
    f.write(announcement_bar_content)


# 2. navigation.liquid
navigation_content = """<div class="shopify-react-section" data-react-component="Navbar" data-settings='{
  "nav_logo_text": {{ section.settings.nav_logo_text | default: "Phenomena" | json }},
  "nav_logo_size": {{ section.settings.nav_logo_size | default: "28px" | json }},
  "nav_bg_color": {{ section.settings.nav_bg_color | default: "#FDFBF7" | json }},
  "nav_links_color": {{ section.settings.nav_links_color | default: "#121212" | json }}
}'></div>

{% schema %}
{
  "name": "Sticky Navigation Bar",
  "tag": "section",
  "class": "section-navigation",
  "settings": [
    {
      "type": "text",
      "id": "nav_logo_text",
      "label": "Logo Brand Name Text",
      "default": "Phenomena"
    },
    {
      "type": "text",
      "id": "nav_logo_size",
      "label": "Logo Typography Size",
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
      "label": "Links Text Color",
      "default": "#121212"
    }
  ],
  "presets": [
    {
      "name": "Sticky Navigation Bar"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'navigation.liquid'), 'w', encoding='utf-8') as f:
    f.write(navigation_content)


# 3. hero-section.liquid
hero_section_content = """<div class="shopify-react-section" data-react-component="HeroSection" data-settings='{
  "hero_subtitle": {{ section.settings.hero_subtitle | default: "Apothecary hair & scalp elixirs." | json }},
  "hero_cta_text": {{ section.settings.hero_cta_text | default: "SHOP PRODUCTS" | json }},
  "hero_image_url": {% if section.settings.hero_image != blank %}{{ section.settings.hero_image | image_url: width: 2752 | json }}{% else %}""{% endif %}
}'></div>

{% schema %}
{
  "name": "Framed Hero Showcase",
  "tag": "section",
  "class": "section-hero",
  "settings": [
    {
      "type": "text",
      "id": "hero_subtitle",
      "label": "Hero Compact Subtitle Pill",
      "default": "Apothecary hair & scalp elixirs."
    },
    {
      "type": "text",
      "id": "hero_cta_text",
      "label": "CTA Link Button Text",
      "default": "SHOP PRODUCTS"
    },
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Portrait Zoom Background (Resolution: ~2750x1500)"
    }
  ],
  "presets": [
    {
      "name": "Framed Hero Showcase"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'hero-section.liquid'), 'w', encoding='utf-8') as f:
    f.write(hero_section_content)


# 4. bestsellers-carousel.liquid
bestsellers_carousel_content = """<div class="shopify-react-section" data-react-component="BestsellersCarousel" data-settings='{
  "bestsellers_title": {{ section.settings.bestsellers_title | default: "BESTSELLERS" | json }},
  "collection_button_text": {{ section.settings.collection_button_text | default: "SHOP THE FULL COLLECTION" | json }}
}'></div>

{% schema %}
{
  "name": "Bestsellers Carousel",
  "tag": "section",
  "class": "section-bestsellers",
  "settings": [
    {
      "type": "text",
      "id": "bestsellers_title",
      "label": "Title Text",
      "default": "BESTSELLERS"
    },
    {
      "type": "text",
      "id": "collection_button_text",
      "label": "Collection Bottom Link Text",
      "default": "SHOP THE FULL COLLECTION"
    }
  ],
  "presets": [
    {
      "name": "Bestsellers Carousel"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'bestsellers-carousel.liquid'), 'w', encoding='utf-8') as f:
    f.write(bestsellers_carousel_content)


# 5. currently-obsessed.liquid
currently_obsessed_content = """<div class="shopify-react-section" data-react-component="CurrentlyObsessed" data-settings='{
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
  "obsessed_item_4_img": {% if section.settings.obsessed_item_4_img != blank %}{{ section.settings.obsessed_item_4_img | image_url: width: 1200 | json }}{% else %}""{% endif %}
}'></div>

{% schema %}
{
  "name": "Currently Obsessed Stacks",
  "tag": "section",
  "class": "section-obsessed",
  "settings": [
    {
      "type": "text",
      "id": "obsessed_label",
      "label": "Accent Subtitle Label",
      "default": "WEEK WRAPUP"
    },
    {
      "type": "text",
      "id": "obsessed_title",
      "label": "Main Section Heading",
      "default": "Currently Obsessed"
    },
    {
      "type": "textarea",
      "id": "obsessed_desc",
      "label": "Obsessed Description",
      "default": "Curated edits of our most-worn formulas and shades, thoughtfully grouped so you don't have to overthink it."
    },
    {
      "type": "header",
      "content": "Interactive Benefit Slide 1"
    },
    {
      "type": "text",
      "id": "obsessed_item_1_title",
      "label": "Card 1 Title",
      "default": "LOW EFFORT GLOW"
    },
    {
      "type": "text",
      "id": "obsessed_item_1_subtitle",
      "label": "Card 1 Subtitle",
      "default": "Daily gloss and natural highlight formulas"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_1_img",
      "label": "Card 1 Image Portrait File"
    },
    {
      "type": "header",
      "content": "Interactive Benefit Slide 2"
    },
    {
      "type": "text",
      "id": "obsessed_item_2_title",
      "label": "Card 2 Title",
      "default": "MAIN CHARACTER EYES"
    },
    {
      "type": "text",
      "id": "obsessed_item_2_subtitle",
      "label": "Card 2 Subtitle",
      "default": "Precision liquid liners and saturated eye pigments"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_2_img",
      "label": "Card 2 Image Portrait File"
    },
    {
      "type": "header",
      "content": "Interactive Benefit Slide 3"
    },
    {
      "type": "text",
      "id": "obsessed_item_3_title",
      "label": "Card 3 Title",
      "default": "FINISHING TOUCHES"
    },
    {
      "type": "text",
      "id": "obsessed_item_3_subtitle",
      "label": "Card 3 Subtitle",
      "default": "Setting sprays, buffers, and featherlight buffers"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_3_img",
      "label": "Card 3 Image Portrait File"
    },
    {
      "type": "header",
      "content": "Interactive Benefit Slide 4"
    },
    {
      "type": "text",
      "id": "obsessed_item_4_title",
      "label": "Card 4 Title",
      "default": "SOFT LIPS CLUB"
    },
    {
      "type": "text",
      "id": "obsessed_item_4_subtitle",
      "label": "Card 4 Subtitle",
      "default": "Hydrating berry-oil lip glazes and sheens"
    },
    {
      "type": "image_picker",
      "id": "obsessed_item_4_img",
      "label": "Card 4 Image Portrait File"
    }
  ],
  "presets": [
    {
      "name": "Currently Obsessed Stacks"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'currently-obsessed.liquid'), 'w', encoding='utf-8') as f:
    f.write(currently_obsessed_content)


# 6. trust-cards.liquid
trust_cards_content = """<div class="shopify-react-section" data-react-component="TrustCards" data-settings='{
  "trust_card_1_title": {{ section.settings.trust_card_1_title | default: "Skin-First Formulas" | json }},
  "trust_card_1_desc": {{ section.settings.trust_card_1_desc | default: "Makeup that treats your skin while you wear it." | json }},
  "trust_card_2_title": {{ section.settings.trust_card_2_title | default: "Inclusive Shades" | json }},
  "trust_card_2_desc": {{ section.settings.trust_card_2_desc | default: "Made to work across tones and undertones." | json }},
  "trust_card_3_title": {{ section.settings.trust_card_3_title | default: "Multi-Use Essentials" | json }},
  "trust_card_3_desc": {{ section.settings.trust_card_3_desc | default: "Minimal effort. Maximum options." | json }},
  "trust_card_4_title": {{ section.settings.trust_card_4_title | default: "Clean & Conscious" | json }},
  "trust_card_4_desc": {{ section.settings.trust_card_4_desc | default: "Vegan. Cruelty-free. Thoughtfully formulated." | json }}
}'></div>

{% schema %}
{
  "name": "Premium Trust Grid",
  "tag": "section",
  "class": "section-trust",
  "settings": [
    {
      "type": "text",
      "id": "trust_card_1_title",
      "label": "Trust Card 1 Title",
      "default": "Skin-First Formulas"
    },
    {
      "type": "text",
      "id": "trust_card_1_desc",
      "label": "Trust Card 1 Description",
      "default": "Makeup that treats your skin while you wear it."
    },
    {
      "type": "text",
      "id": "trust_card_2_title",
      "label": "Trust Card 2 Title",
      "default": "Inclusive Shades"
    },
    {
      "type": "text",
      "id": "trust_card_2_desc",
      "label": "Trust Card 2 Description",
      "default": "Made to work across tones and undertones."
    },
    {
      "type": "text",
      "id": "trust_card_3_title",
      "label": "Trust Card 3 Title",
      "default": "Multi-Use Essentials"
    },
    {
      "type": "text",
      "id": "trust_card_3_desc",
      "label": "Trust Card 3 Description",
      "default": "Minimal effort. Maximum options."
    },
    {
      "type": "text",
      "id": "trust_card_4_title",
      "label": "Trust Card 4 Title",
      "default": "Clean & Conscious"
    },
    {
      "type": "text",
      "id": "trust_card_4_desc",
      "label": "Trust Card 4 Description",
      "default": "Vegan. Cruelty-free. Thoughtfully formulated."
    }
  ],
  "presets": [
    {
      "name": "Premium Trust Grid"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'trust-cards.liquid'), 'w', encoding='utf-8') as f:
    f.write(trust_cards_content)


# 6.5. wave-scroll-text.liquid
wave_scroll_text_content = """<div class="shopify-react-section" data-react-component="WaveScrollSection" data-settings='{
  "wave_text": {{ section.settings.wave_text | default: "Kind to your skin, gentle on the planet. • Pure active botanicals. • Kind to your skin, gentle on the planet." | json }},
  "wave_speed_seconds": {{ section.settings.wave_speed_seconds | default: 24 | json }}
}'></div>

{% schema %}
{
  "name": "Wavy Text Scroll",
  "tag": "section",
  "class": "section-wave-scroll-text",
  "settings": [
    {
      "type": "textarea",
      "id": "wave_text",
      "label": "Scrolling Text Content",
      "default": "Kind to your skin, gentle on the planet. • Pure active botanicals. • Kind to your skin, gentle on the planet."
    },
    {
      "type": "number",
      "id": "wave_speed_seconds",
      "label": "Scroll speed in seconds",
      "default": 24
    }
  ],
  "presets": [
    {
      "name": "Wavy Text Scroll"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'wave-scroll-text.liquid'), 'w', encoding='utf-8') as f:
    f.write(wave_scroll_text_content)


# 6.6. hsalon-scroll.liquid
hsalon_scroll_content = """<div class="shopify-react-section" data-react-component="HSalonScrollSection" data-settings='{
  "hsalon_heading": {{ section.settings.hsalon_heading | default: "H salon" | json }},
  "hsalon_subtext": {{ section.settings.hsalon_subtext | default: "Apothecary & Hair Spa Collective" | json }}
}'></div>

{% schema %}
{
  "name": "H salon Scroll Fill",
  "tag": "section",
  "class": "section-hsalon-scroll",
  "settings": [
    {
      "type": "text",
      "id": "hsalon_heading",
      "label": "Scroll Fill Heading Text",
      "default": "H salon"
    },
    {
      "type": "text",
      "id": "hsalon_subtext",
      "label": "Scroll Fill Subtext",
      "default": "Apothecary & Hair Spa Collective"
    }
  ],
  "presets": [
    {
      "name": "H salon Scroll Fill"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'hsalon-scroll.liquid'), 'w', encoding='utf-8') as f:
    f.write(hsalon_scroll_content)


# 7. parallax-split.liquid
parallax_split_content = """<div class="shopify-react-section" data-react-component="ParallaxSplit" data-settings='{
  "parallax_title_line_1": {{ section.settings.parallax_title_line_1 | default: "MAKEUP, MADE" | json }},
  "parallax_title_line_2_italic": {{ section.settings.parallax_title_line_2_italic | default: "effortless." | json }},
  "parallax_desc": {{ section.settings.parallax_desc | default: "Lightweight, buildable makeup infused with skincare-level ingredients. Easy to wear, easy to blend, and made for whatever your routine looks like." | json }},
  "parallax_button_text": {{ section.settings.parallax_button_text | default: "SHOP THE COLLECTION" | json }},
  "parallax_image_1": {% if section.settings.parallax_image_1 != blank %}{{ section.settings.parallax_image_1 | image_url: width: 1000 | json }}{% else %}""{% endif %},
  "parallax_image_2": {% if section.settings.parallax_image_2 != blank %}{{ section.settings.parallax_image_2 | image_url: width: 1000 | json }}{% else %}""{% endif %}
}'></div>

{% schema %}
{
  "name": "Parallax Split Frame",
  "tag": "section",
  "class": "section-parallax-split",
  "settings": [
    {
      "type": "text",
      "id": "parallax_title_line_1",
      "label": "Normal Title Text",
      "default": "MAKEUP, MADE"
    },
    {
      "type": "text",
      "id": "parallax_title_line_2_italic",
      "label": "Italicized Accent Title Text",
      "default": "effortless."
    },
    {
      "type": "textarea",
      "id": "parallax_desc",
      "label": "Description Text Block",
      "default": "Lightweight, buildable makeup infused with skincare-level ingredients. Easy to wear, easy to blend, and made for whatever your routine looks like."
    },
    {
      "type": "text",
      "id": "parallax_button_text",
      "label": "Button Label CTA",
      "default": "SHOP THE COLLECTION"
    },
    {
      "type": "image_picker",
      "id": "parallax_image_1",
      "label": "Bottom Layer Background Picture"
    },
    {
      "type": "image_picker",
      "id": "parallax_image_2",
      "label": "Dynamic Front Floating Polaroid"
    }
  ],
  "presets": [
    {
      "name": "Parallax Split Frame"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'parallax-split.liquid'), 'w', encoding='utf-8') as f:
    f.write(parallax_split_content)


# 8. auto-scroll-cards.liquid
auto_scroll_cards_content = """<div class="shopify-react-section" data-react-component="AutoScrollCards" data-settings='{
  "marquee_card_text_1": {{ section.settings.marquee_card_text_1 | default: "REAL REVIEWS" | json }},
  "marquee_card_text_2": {{ section.settings.marquee_card_text_2 | default: "CLEAN FORMULAS" | json }},
  "marquee_card_text_3": {{ section.settings.marquee_card_text_3 | default: "FAST SHIPPING" | json }},
  "marquee_card_speed": {{ section.settings.marquee_card_speed | default: "25s" | json }}
}'></div>

{% schema %}
{
  "name": "Auto-Scrolling Reviews",
  "tag": "section",
  "class": "section-autoscroll",
  "settings": [
    {
      "type": "text",
      "id": "marquee_card_text_1",
      "label": "Ticker Phrase 1",
      "default": "REAL REVIEWS"
    },
    {
      "type": "text",
      "id": "marquee_card_text_2",
      "label": "Ticker Phrase 2",
      "default": "CLEAN FORMULAS"
    },
    {
      "type": "text",
      "id": "marquee_card_text_3",
      "label": "Ticker Phrase 3",
      "default": "FAST SHIPPING"
    },
    {
      "type": "text",
      "id": "marquee_card_speed",
      "label": "Scroll Ticker Duration Speed (e.g. 25s)",
      "default": "25s"
    }
  ],
  "presets": [
    {
      "name": "Auto-Scrolling Reviews"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'auto-scroll-cards.liquid'), 'w', encoding='utf-8') as f:
    f.write(auto_scroll_cards_content)


# 9. shop-the-look.liquid
shop_the_look_content = """<div class="shopify-react-section" data-react-component="ShopTheLook" data-settings='{
  "look_title": {{ section.settings.look_title | default: "Shop The Look" | json }},
  "look_tagline": {{ section.settings.look_tagline | default: "TAP TO DISCOVER" | json }},
  "look_main_image": {% if section.settings.look_main_image != blank %}{{ section.settings.look_main_image | image_url: width: 1200 | json }}{% else %}""{% endif %}
}'></div>

{% schema %}
{
  "name": "Shop The Look (Pins)",
  "tag": "section",
  "class": "section-shop-the-look",
  "settings": [
    {
      "type": "text",
      "id": "look_title",
      "label": "Title Heading",
      "default": "Shop The Look"
    },
    {
      "type": "text",
      "id": "look_tagline",
      "label": "Pins Hover Accent Subheading",
      "default": "TAP TO DISCOVER"
    },
    {
      "type": "image_picker",
      "id": "look_main_image",
      "label": "Look Model Portrait (Full Aspect Ratio)"
    }
  ],
  "presets": [
    {
      "name": "Shop The Look (Pins)"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'shop-the-look.liquid'), 'w', encoding='utf-8') as f:
    f.write(shop_the_look_content)


# 10. greeting-section.liquid
greeting_section_content = """<div class="shopify-react-section" data-react-component="GreetingSection" data-settings='{
  "greeting_heading": {{ section.settings.greeting_heading | default: "H SALON LUXURY" | json }},
  "greeting_hint": {{ section.settings.greeting_hint | default: "Wellness from" | json }},
  "greeting_image": {% if section.settings.greeting_image != blank %}{{ section.settings.greeting_image | image_url: width: 1200 | json }}{% else %}"/wellness from hsalon luxury image.png"{% endif %}
}'></div>

{% schema %}
{
  "name": "Interactive Postcard Stamp",
  "tag": "section",
  "class": "section-greeting",
  "settings": [
    {
      "type": "text",
      "id": "greeting_heading",
      "label": "Postcard Banner Stamp Brand",
      "default": "H SALON LUXURY"
    },
    {
      "type": "text",
      "id": "greeting_hint",
      "label": "Postcard Small Upper Greeting Line",
      "default": "Wellness from"
    },
    {
      "type": "image_picker",
      "id": "greeting_image",
      "label": "Postcard Background Image"
    }
  ],
  "presets": [
    {
      "name": "Interactive Postcard Stamp"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'greeting-section.liquid'), 'w', encoding='utf-8') as f:
    f.write(greeting_section_content)


# 11. lightweight-formulas.liquid
lightweight_formulas_content = """<div class="shopify-react-section" data-react-component="LightweightFormulas" data-settings='{
  "formulas_heading": {{ section.settings.formulas_heading | default: "STORY OF LIGHTWEIGHT FORMULAS" | json }},
  "formulas_desc": {{ section.settings.formulas_desc | default: "THE HIGHLIGHT INDEX" | json }}
}'></div>

{% schema %}
{
  "name": "Lightweight Formulas Index",
  "tag": "section",
  "class": "section-formulas",
  "settings": [
    {
      "type": "text",
      "id": "formulas_heading",
      "label": "Main Headline Title",
      "default": "STORY OF LIGHTWEIGHT FORMULAS"
    },
    {
      "type": "text",
      "id": "formulas_desc",
      "label": "Subtitle Accent Headline",
      "default": "THE HIGHLIGHT INDEX"
    }
  ],
  "presets": [
    {
      "name": "Lightweight Formulas Index"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'lightweight-formulas.liquid'), 'w', encoding='utf-8') as f:
    f.write(lightweight_formulas_content)


# 12. makeup-pouch.liquid
makeup_pouch_content = """<div class="shopify-react-section" data-react-component="MakeupPouchFeature" data-settings='{
  "pouch_title": {{ section.settings.pouch_title | default: "THE APOTHECARY SPA POUCH" | json }},
  "pouch_price": {{ section.settings.pouch_price | default: "60.00" | json }},
  "pouch_desc": {{ section.settings.pouch_desc | default: "A gorgeous, quilted velvet protection sleeve designed to shelter your luxury elixirs, active botanicals, and scalp oils. Liquid-proof lining shields your precious apothecary glass droppers, while the compact, padded structural silhouette packs seamlessly into travel bags for premium root treatments anywhere." | json }},
  "pouch_image_1_url": {% if section.settings.pouch_image_1 != blank %}{{ section.settings.pouch_image_1 | image_url: width: 1000 | json }}{% else %}""{% endif %},
  "pouch_image_2_url": {% if section.settings.pouch_image_2 != blank %}{{ section.settings.pouch_image_2 | image_url: width: 800 | json }}{% else %}""{% endif %}
}'></div>

{% schema %}
{
  "name": "Featured Quilted Pouch Card",
  "tag": "section",
  "class": "section-pouch",
  "settings": [
    {
      "type": "text",
      "id": "pouch_title",
      "label": "Pouch Spotlight Header",
      "default": "THE APOTHECARY SPA POUCH"
    },
    {
      "type": "text",
      "id": "pouch_price",
      "label": "Pouch Spotlight Retail Price ($)",
      "default": "60.00"
    },
    {
      "type": "textarea",
      "id": "pouch_desc",
      "label": "Detailed Product Description Copy",
      "default": "A gorgeous, quilted velvet protection sleeve designed to shelter your luxury elixirs, active botanicals, and scalp oils. Liquid-proof lining shields your precious apothecary glass droppers, while the compact, padded structural silhouette packs seamlessly into travel bags for premium root treatments anywhere."
    },
    {
      "type": "image_picker",
      "id": "pouch_image_1",
      "label": "Left Portrait Feature Image"
    },
    {
      "type": "image_picker",
      "id": "pouch_image_2",
      "label": "Front Overlay Overlapping Detail Image"
    }
  ],
  "presets": [
    {
      "name": "Featured Quilted Pouch Card"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'makeup-pouch.liquid'), 'w', encoding='utf-8') as f:
    f.write(makeup_pouch_content)


# Extra clean design visual containers (ready presets for re-ordering block assemblies)
# 13. scrolling-banner.liquid
scrolling_banner_content = """<div class="shopify-react-section" data-react-component="ScrollingBanner"></div>
{% schema %}
{
  "name": "Continuous Marquee Ribbon",
  "tag": "section",
  "class": "section-scrolling-ribbon",
  "settings": [],
  "presets": [
    {
      "name": "Continuous Marquee Ribbon"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'scrolling-banner.liquid'), 'w', encoding='utf-8') as f:
    f.write(scrolling_banner_content)


# 14. fun-editorial.liquid
fun_editorial_content = """<div class="shopify-react-section" data-react-component="FunEditorialSection"></div>
{% schema %}
{
  "name": "Aesthetic Editorial Banner",
  "tag": "section",
  "class": "section-editorial-banner",
  "settings": [],
  "presets": [
    {
      "name": "Aesthetic Editorial Banner"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'fun-editorial.liquid'), 'w', encoding='utf-8') as f:
    f.write(fun_editorial_content)


# 15. community-section.liquid
community_section_content = """<div class="shopify-react-section" data-react-component="CommunitySection"></div>
{% schema %}
{
  "name": "Instagram UGC Feed Showcase",
  "tag": "section",
  "class": "section-ugc-community",
  "settings": [],
  "presets": [
    {
      "name": "Instagram UGC Feed Showcase"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'community-section.liquid'), 'w', encoding='utf-8') as f:
    f.write(community_section_content)


# 16. hover-accordion.liquid
hover_accordion_content = """<div class="shopify-react-section" data-react-component="HoverAccordion"></div>
{% schema %}
{
  "name": "Skincare Active Accordion",
  "tag": "section",
  "class": "section-accordion",
  "settings": [],
  "presets": [
    {
      "name": "Skincare Active Accordion"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'hover-accordion.liquid'), 'w', encoding='utf-8') as f:
    f.write(hover_accordion_content)


# 17. footer.liquid
footer_liquid_content = """<div class="shopify-react-section" data-react-component="Footer"></div>
{% schema %}
{
  "name": "Unified Copyright Footer",
  "tag": "section",
  "class": "section-footer",
  "settings": [],
  "presets": [
    {
      "name": "Unified Copyright Footer"
    }
  ]
}
{% endschema %}
"""
with open(os.path.join(theme_dir, 'sections', 'footer.liquid'), 'w', encoding='utf-8') as f:
    f.write(footer_liquid_content)


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
    "theme_version": "2.0.0",
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
