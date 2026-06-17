import * as fs from 'fs';
import * as path from 'path';

const themeDir = 'phenomena-skincare';
const sectionsDir = path.join(themeDir, 'sections');

console.log("Analyzing schema settings for duplicates...");
fs.readdirSync(sectionsDir).forEach(filename => {
  if (filename.endsWith('.liquid')) {
    const filePath = path.join(sectionsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const schemaMatch = content.match(/{%\s*schema\s*%}(.*?){%\s*endschema\s*%}/s);
    if (schemaMatch) {
      const schemaJson = schemaMatch[1].trim();
      try {
        const schema = JSON.parse(schemaJson);
        if (schema.settings && Array.isArray(schema.settings)) {
          const ids = new Set<string>();
          schema.settings.forEach((s: any) => {
            if (s.id) {
              if (ids.has(s.id)) {
                console.error(`❌ Duplicate ID found in ${filename}: '${s.id}'`);
              }
              ids.add(s.id);
            }
          });
        }
      } catch (err) {
        // ignore JSON errors here, handled in other script
      }
    }
  }
});
