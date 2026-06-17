import * as fs from 'fs';
import * as path from 'path';

const themeDir = 'phenomena-skincare';
const templatesDir = path.join(themeDir, 'templates');

console.log("Validating JSON templates...");
fs.readdirSync(templatesDir).forEach(filename => {
  if (filename.endsWith('.json')) {
    const filePath = path.join(templatesDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
      const data = JSON.parse(content);
      console.log(`✅ ${filename}: Valid JSON`);
      
      // Check sections exist
      if (data.sections) {
        Object.entries(data.sections).forEach(([key, value]: [string, any]) => {
          const type = value.type;
          const sectionFile = path.join(themeDir, 'sections', `${type}.liquid`);
          if (!fs.existsSync(sectionFile)) {
            console.error(`❌ ${filename} refers to missing section: ${type} (expected ${sectionFile})`);
          }
        });
      }
    } catch (err: any) {
      console.error(`❌ ${filename}: Invalid JSON! Error: ${err.message}`);
    }
  }
});
