#!/usr/bin/env node

/**
 * PWA Icon Generator for BlackMagickOps
 * Generates all required PWA icons and screenshots
 * 
 * Requirements:
 * - Node.js 18+
 * - sharp library for image processing
 * 
 * Usage:
 *   pnpm add -D sharp
 *   node scripts/generate-pwa-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Brand colors from globals.css
const COLORS = {
  bg: '#0A0A0B',
  surface: '#121214',
  brand: '#6E8EF8',
  accent: '#5BE3C1',
  text: '#ECEDEE',
};

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../public');

/**
 * Generate a mystical sigil icon (simplified magical symbol)
 */
async function generateSigilSVG(size) {
  const center = size / 2;
  const radius = size * 0.35;
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.brand};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.accent};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="${size}" height="${size}" fill="${COLORS.bg}"/>
      
      <!-- Outer circle -->
      <circle cx="${center}" cy="${center}" r="${radius}" 
              fill="none" stroke="url(#brandGradient)" stroke-width="3" filter="url(#glow)"/>
      
      <!-- Mystical star/sigil pattern -->
      <path d="M ${center} ${center - radius * 0.8}
               L ${center + radius * 0.3} ${center + radius * 0.2}
               L ${center - radius * 0.6} ${center - radius * 0.3}
               L ${center + radius * 0.6} ${center - radius * 0.3}
               L ${center - radius * 0.3} ${center + radius * 0.2}
               Z"
            fill="none" stroke="${COLORS.accent}" stroke-width="2.5" filter="url(#glow)"/>
      
      <!-- Inner diamond -->
      <path d="M ${center} ${center - radius * 0.4}
               L ${center + radius * 0.4} ${center}
               L ${center} ${center + radius * 0.4}
               L ${center - radius * 0.4} ${center}
               Z"
            fill="${COLORS.brand}" opacity="0.3"/>
      
      <!-- Center dot -->
      <circle cx="${center}" cy="${center}" r="${radius * 0.1}" 
              fill="${COLORS.accent}" filter="url(#glow)"/>
      
      <!-- Small accent circles -->
      <circle cx="${center}" cy="${center - radius * 0.85}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${center + radius * 0.85}" cy="${center}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${center}" cy="${center + radius * 0.85}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${center - radius * 0.85}" cy="${center}" r="3" fill="${COLORS.brand}"/>
    </svg>
  `;
  
  return Buffer.from(svg);
}

/**
 * Generate screenshot with mystical theme
 */
async function generateScreenshotSVG(width, height, isMobile = false) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.surface};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Mystical pattern background -->
      ${generatePatternElements(width, height)}
      
      <!-- Hero section mockup -->
      <text x="${width / 2}" y="${height * 0.3}" 
            font-family="Arial, sans-serif" font-size="${isMobile ? 32 : 48}" 
            font-weight="bold" fill="${COLORS.text}" text-anchor="middle">
        BlackMagickOps
      </text>
      
      <text x="${width / 2}" y="${height * 0.4}" 
            font-family="Arial, sans-serif" font-size="${isMobile ? 16 : 24}" 
            fill="${COLORS.brand}" text-anchor="middle" filter="url(#glow)">
        Precision • Discipline • Magic
      </text>
      
      <!-- Decorative elements -->
      <circle cx="${width * 0.2}" cy="${height * 0.6}" r="4" 
              fill="${COLORS.accent}" opacity="0.6"/>
      <circle cx="${width * 0.8}" cy="${height * 0.7}" r="6" 
              fill="${COLORS.brand}" opacity="0.4"/>
      <circle cx="${width * 0.5}" cy="${height * 0.85}" r="3" 
              fill="${COLORS.accent}" opacity="0.7"/>
    </svg>
  `;
  
  return Buffer.from(svg);
}

function generatePatternElements(width, height) {
  let elements = '';
  const count = 20;
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.3 + 0.1;
    
    elements += `<circle cx="${x}" cy="${y}" r="${size}" fill="${COLORS.brand}" opacity="${opacity}"/>`;
  }
  
  return elements;
}

async function generateIcons() {
  console.log('🎨 Generating PWA icons for BlackMagickOps...\n');
  
  try {
    // Generate 192x192 icon
    console.log('📱 Generating icon-192.png (maskable)...');
    const icon192SVG = await generateSigilSVG(192);
    await sharp(icon192SVG)
      .resize(192, 192)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'icon-192.png'));
    console.log('✅ icon-192.png created');
    
    // Generate 512x512 icon
    console.log('📱 Generating icon-512.png (maskable)...');
    const icon512SVG = await generateSigilSVG(512);
    await sharp(icon512SVG)
      .resize(512, 512)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'icon-512.png'));
    console.log('✅ icon-512.png created');
    
    // Generate additional standard icons (any purpose)
    console.log('📱 Generating additional standard icons...');
    const sizes = [72, 96, 128, 144, 152, 180, 384];
    
    for (const size of sizes) {
      const iconSVG = await generateSigilSVG(size);
      await sharp(iconSVG)
        .resize(size, size)
        .png()
        .toFile(path.join(OUTPUT_DIR, `icon-${size}.png`));
      console.log(`✅ icon-${size}.png created`);
    }
    
    // Generate wide screenshot (desktop)
    console.log('\n📸 Generating screenshot-wide.png (1280x720)...');
    const wideScreenshot = await generateScreenshotSVG(1280, 720, false);
    await sharp(wideScreenshot)
      .resize(1280, 720)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'screenshot-wide.png'));
    console.log('✅ screenshot-wide.png created');
    
    // Generate narrow screenshot (mobile)
    console.log('📸 Generating screenshot-narrow.png (640x1136)...');
    const narrowScreenshot = await generateScreenshotSVG(640, 1136, true);
    await sharp(narrowScreenshot)
      .resize(640, 1136)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'screenshot-narrow.png'));
    console.log('✅ screenshot-narrow.png created');
    
    // Generate favicon.ico
    console.log('\n🌐 Generating favicon.ico...');
    const faviconSVG = await generateSigilSVG(32);
    await sharp(faviconSVG)
      .resize(32, 32)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon.ico'));
    console.log('✅ favicon.ico created');
    
    // Generate apple-touch-icon.png
    console.log('🍎 Generating apple-touch-icon.png...');
    const appleTouchIcon = await generateSigilSVG(180);
    await sharp(appleTouchIcon)
      .resize(180, 180)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created');
    
    console.log('\n✨ All PWA assets generated successfully!');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
    console.log('\n📋 Generated files:');
    console.log('   - icon-192.png (maskable)');
    console.log('   - icon-512.png (maskable)');
    console.log('   - icon-{72,96,128,144,152,180,384}.png (standard)');
    console.log('   - screenshot-wide.png (desktop)');
    console.log('   - screenshot-narrow.png (mobile)');
    console.log('   - favicon.ico');
    console.log('   - apple-touch-icon.png');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons };
