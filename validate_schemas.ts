import * as fs from 'fs';
import * as path from 'path';

const themeDir = 'phenomena-skincare';
const sectionsDir = path.join(themeDir, 'sections');

console.log("Validating section schemas via TypeScript/Node...");
fs.readdirSync(sectionsDir).forEach(filename => {
  if (filename.endsWith('.liquid')) {
    const filePath = path.join(sectionsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const schemaMatch = content.match(/{%\s*schema\s*%}(.*?){%\s*endschema\s*%}/s);
    if (schemaMatch) {
      const schemaJson = schemaMatch[1].trim();
      try {
        JSON.parse(schemaJson);
        console.log(`✅ ${filename}: Valid Schema`);
      } catch (err: any) {
        console.log(`❌ ${filename}: Invalid Schema! Error: ${err.message}`);
        console.log("--- Schema Content ---");
        console.log(schemaJson);
        console.log("----------------------");
      }
    } else {
      console.log(`⚠️ ${filename}: No schema block found.`);
    }
  }
});
