const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const convertToWebP = async (inputPath) => {
  try {
    const outputPath = inputPath.replace(/\.(jpeg|jpg|png)$/, '.webp');
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
};

const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpeg|jpg|png)$/i.test(file)) {
      await convertToWebP(fullPath);
    }
  }
};

// Démarrer la conversion depuis le dossier public/images
processDirectory('public/images')
  .then(() => console.log('Conversion terminée'))
  .catch(console.error); 