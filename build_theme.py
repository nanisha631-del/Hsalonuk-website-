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
  "hero_title_1": {{ section.settings.hero_title_1 | default: "RADIANT" | json }},
  "hero_title_2": {{ section.settings.hero_title_2 | default: "BEAUTY" | json }},
  "hero_subtitle": {{ section.settings.hero_subtitle | default: "Makeup, but make it fun." | json }},
  "hero_cta_text": {{ section.settings.hero_cta_text | default: "SHOP PRODUCTS" | json }},
  "hero_image_url": {% if section.settings.hero_image != blank %}{{ section.settings.hero_image | image_url: width: 1800 | json }}{% else %}""{% endif %},
  "bestsellers_title": {{ section.settings.bestsellers_title | default: "BESTSELLERS" | json }},
  "brushes_title": {{ section.settings.brushes_title | default: "MAKEUP BRUSHES" | json }},
  "pouch_title": {{ section.settings.pouch_title | default: "THE MAKEUP POUCH" | json }},
  "pouch_price": {{ section.settings.pouch_price | default: "60.00" | json }},
  "pouch_desc": {{ section.settings.pouch_desc | default: "A cute, compact makeup pouch designed to go wherever you do. Finished with a soft, iridescent sheen and a clean zip closure, it fits your everyday essentials without taking up space. Easy to toss in your bag, easy to wipe clean, and cute enough to leave out." | json }},
  "pouch_image_1_url": {% if section.settings.pouch_image_1 != blank %}{{ section.settings.pouch_image_1 | image_url: width: 1000 | json }}{% else %}""{% endif %},
  "pouch_image_2_url": {% if section.settings.pouch_image_2 != blank %}{{ section.settings.pouch_image_2 | image_url: width: 805 | json }}{% else %}""{% endif %},
  "brand_primary_color": {{ section.settings.brand_primary_color | default: "#C4B5D4" | json }},
  "collection_button_text": {{ section.settings.collection_button_text | default: "SHOP THE FULL COLLECTION" | json }}
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
      "label": "Brushes Tab Header",
      "default": "MAKEUP BRUSHES"
    },
    {
      "type": "text",
      "id": "collection_button_text",
      "label": "Collection Button Text",
      "default": "SHOP THE FULL COLLECTION"
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
      "content": "Colors & Styling"
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
