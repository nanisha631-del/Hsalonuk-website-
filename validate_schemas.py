import os
import json
import re

theme_dir = 'phenomena-skincare'
sections_dir = os.path.join(theme_dir, 'sections')

print("Validating section schemas...")
for filename in os.listdir(sections_dir):
    if filename.endswith('.liquid'):
        file_path = os.path.join(sections_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract schema block
        match = re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', content, re.DOTALL)
        if match:
            schema_json = match.group(1).strip()
            try:
                json.loads(schema_json)
                print(f"✅ {filename}: Valid Schema")
            except Exception as e:
                print(f"❌ {filename}: Invalid Schema! Error: {e}")
                print("--- Schema Content ---")
                print(schema_json)
                print("----------------------")
        else:
            print(f"⚠️ {filename}: No schema block found.")
