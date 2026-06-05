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
<div id="root"></div>

{% schema %}
{
  "name": "Main Home",
  "tag": "section",
  "class": "section",
  "settings": []
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
            # Create relative path for the zip archive
            arcname = os.path.relpath(file_path, os.path.dirname(theme_dir))
            zip_file.write(file_path, arcname)

print(f"Shopify theme zipped successfully as '{zip_filename}'")
