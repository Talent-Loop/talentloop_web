const fs = require('fs');
const path = require('path');

// Using a simple approach - analyze image with sharp if available, or use pixel-by-pixel if not
try {
  const sharp = require('sharp');
  
  async function analyzeImage() {
    const imagePath = path.join(__dirname, 'src', 'services', 'design', 'Home.png');
    
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    console.log(`Image dimensions: ${metadata.width}x${metadata.height}\n`);
    
    // Extract raw pixel data
    const buffer = await image.raw().toBuffer({ resolveWithObject: true });
    const pixelData = buffer.data;
    const channels = buffer.info.channels;
    
    console.log("=== COLOR ANALYSIS FROM HOME.PNG ===\n");
    
    // Helper to get average color from a region
    const getRegionColor = (x1, x2, y1, y2, label) => {
      let r = 0, g = 0, b = 0;
      let count = 0;
      
      for (let x = x1; x < x2; x += 3) {
        for (let y = y1; y < y2; y += 3) {
          const idx = (y * metadata.width + x) * channels;
          if (idx + 2 < pixelData.length) {
            r += pixelData[idx];
            g += pixelData[idx + 1];
            b += pixelData[idx + 2];
            count++;
          }
        }
      }
      
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
      console.log(`${label}: RGB(${r}, ${g}, ${b}) = ${hex}`);
      return hex;
    };
    
    // Sidebar (left ~170px)
    console.log("SIDEBAR:");
    getRegionColor(10, 160, 20, 150, "  Background (top)");
    getRegionColor(10, 160, 150, 400, "  Background (middle)");
    
    console.log("\nMAIN BACKGROUND:");
    getRegionColor(200, 900, 50, 150, "  Main content area");
    
    console.log("\nCARDS:");
    getRegionColor(205, 350, 125, 195, "  Stat card background");
    
    console.log("\nTEXT:");
    getRegionColor(215, 330, 138, 148, "  Card label text");
    getRegionColor(215, 330, 155, 180, "  Card value text");
  }
  
  analyzeImage().catch(err => {
    console.error('Sharp error:', err.message);
    console.log('\nSharp not available, using manual color analysis...');
  });
} catch (err) {
  console.error('Error loading modules:', err.message);
  console.log('Manual color extraction not available in this environment.');
}
