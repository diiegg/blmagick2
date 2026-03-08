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

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/**
 * Generate OG/Twitter social card image with sigil + branding text
 */
async function generateOGImageSVG(width, height, isTwitter = false) {
  const sigilSize = height * 0.7;
  const sigilCx = width * 0.22;
  const sigilCy = height * 0.5;
  const sigilR = sigilSize * 0.35;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.bg};stop-opacity:1" />
          <stop offset="60%" style="stop-color:#0D0D0F;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.surface};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.brand};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.accent};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

      <!-- Subtle grid lines -->
      ${Array.from({length: 12}, (_, i) => {
        const x = (width / 12) * (i + 1);
        return `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${COLORS.brand}" stroke-width="0.3" opacity="0.08"/>`;
      }).join('\n      ')}
      ${Array.from({length: 6}, (_, i) => {
        const y = (height / 6) * (i + 1);
        return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${COLORS.brand}" stroke-width="0.3" opacity="0.08"/>`;
      }).join('\n      ')}

      <!-- Ambient particles -->
      ${Array.from({length: 30}, (_, i) => {
        const x = 50 + (i * 37) % (width - 100);
        const y = 30 + (i * 23) % (height - 60);
        const r = 1 + (i % 3);
        const op = 0.1 + (i % 5) * 0.06;
        const color = i % 2 === 0 ? COLORS.brand : COLORS.accent;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${op}"/>`;
      }).join('\n      ')}

      <!-- Sigil: outer circle -->
      <circle cx="${sigilCx}" cy="${sigilCy}" r="${sigilR}"
              fill="none" stroke="url(#brandGrad)" stroke-width="3" filter="url(#glow)"/>

      <!-- Sigil: star pattern -->
      <path d="M ${sigilCx} ${sigilCy - sigilR * 0.8}
               L ${sigilCx + sigilR * 0.3} ${sigilCy + sigilR * 0.2}
               L ${sigilCx - sigilR * 0.6} ${sigilCy - sigilR * 0.3}
               L ${sigilCx + sigilR * 0.6} ${sigilCy - sigilR * 0.3}
               L ${sigilCx - sigilR * 0.3} ${sigilCy + sigilR * 0.2}
               Z"
            fill="none" stroke="${COLORS.accent}" stroke-width="2.5" filter="url(#glow)"/>

      <!-- Sigil: inner diamond -->
      <path d="M ${sigilCx} ${sigilCy - sigilR * 0.4}
               L ${sigilCx + sigilR * 0.4} ${sigilCy}
               L ${sigilCx} ${sigilCy + sigilR * 0.4}
               L ${sigilCx - sigilR * 0.4} ${sigilCy}
               Z"
            fill="${COLORS.brand}" opacity="0.25"/>

      <!-- Sigil: center orb -->
      <circle cx="${sigilCx}" cy="${sigilCy}" r="${sigilR * 0.1}"
              fill="${COLORS.accent}" filter="url(#softGlow)"/>

      <!-- Sigil: cardinal dots -->
      <circle cx="${sigilCx}" cy="${sigilCy - sigilR * 0.85}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${sigilCx + sigilR * 0.85}" cy="${sigilCy}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${sigilCx}" cy="${sigilCy + sigilR * 0.85}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${sigilCx - sigilR * 0.85}" cy="${sigilCy}" r="3" fill="${COLORS.brand}"/>

      <!-- Connecting line from sigil to text -->
      <line x1="${sigilCx + sigilR + 20}" y1="${sigilCy}"
            x2="${width * 0.42}" y2="${sigilCy}"
            stroke="url(#brandGrad)" stroke-width="1" opacity="0.4" filter="url(#glow)"/>

      <!-- Brand name -->
      <text x="${width * 0.44}" y="${height * 0.42}"
            font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
            font-size="64" font-weight="700" fill="${COLORS.text}" letter-spacing="2">
        BlackMagickOps
      </text>

      <!-- Tagline -->
      <text x="${width * 0.44}" y="${height * 0.56}"
            font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
            font-size="24" fill="${COLORS.accent}" letter-spacing="4" filter="url(#glow)">
        ${isTwitter ? 'PLATFORM ENGINEERING' : 'PLATFORM ENGINEERING &amp; DEVOPS'}
      </text>

      <!-- Accent bar under tagline -->
      <rect x="${width * 0.44}" y="${height * 0.62}" width="120" height="2"
            fill="url(#brandGrad)" opacity="0.6" rx="1"/>

      <!-- Bottom domain -->
      <text x="${width * 0.44}" y="${height * 0.76}"
            font-family="'SF Pro Text', 'Helvetica Neue', Arial, sans-serif"
            font-size="18" fill="${COLORS.brand}" opacity="0.6" letter-spacing="2">
        blackmagickops.com
      </text>
    </svg>
  `;

  return Buffer.from(svg);
}

/**
 * Generate square logo with sigil + text underneath for structured data
 */
async function generateLogoSVG(size) {
  const center = size / 2;
  const radius = size * 0.25;
  const sigilCy = size * 0.38;

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
      <circle cx="${center}" cy="${sigilCy}" r="${radius}"
              fill="none" stroke="url(#brandGradient)" stroke-width="3" filter="url(#glow)"/>

      <!-- Star pattern -->
      <path d="M ${center} ${sigilCy - radius * 0.8}
               L ${center + radius * 0.3} ${sigilCy + radius * 0.2}
               L ${center - radius * 0.6} ${sigilCy - radius * 0.3}
               L ${center + radius * 0.6} ${sigilCy - radius * 0.3}
               L ${center - radius * 0.3} ${sigilCy + radius * 0.2}
               Z"
            fill="none" stroke="${COLORS.accent}" stroke-width="2.5" filter="url(#glow)"/>

      <!-- Inner diamond -->
      <path d="M ${center} ${sigilCy - radius * 0.4}
               L ${center + radius * 0.4} ${sigilCy}
               L ${center} ${sigilCy + radius * 0.4}
               L ${center - radius * 0.4} ${sigilCy}
               Z"
            fill="${COLORS.brand}" opacity="0.3"/>

      <!-- Center dot -->
      <circle cx="${center}" cy="${sigilCy}" r="${radius * 0.1}"
              fill="${COLORS.accent}" filter="url(#glow)"/>

      <!-- Cardinal dots -->
      <circle cx="${center}" cy="${sigilCy - radius * 0.85}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${center + radius * 0.85}" cy="${sigilCy}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${center}" cy="${sigilCy + radius * 0.85}" r="3" fill="${COLORS.brand}"/>
      <circle cx="${center - radius * 0.85}" cy="${sigilCy}" r="3" fill="${COLORS.brand}"/>

      <!-- Brand text -->
      <text x="${center}" y="${size * 0.74}"
            font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
            font-size="36" font-weight="700" fill="${COLORS.text}"
            text-anchor="middle" letter-spacing="1">
        BlackMagickOps
      </text>

      <!-- Tagline -->
      <text x="${center}" y="${size * 0.82}"
            font-family="'SF Pro Text', 'Helvetica Neue', Arial, sans-serif"
            font-size="16" fill="${COLORS.accent}"
            text-anchor="middle" letter-spacing="3">
        PLATFORM ENGINEERING
      </text>
    </svg>
  `;

  return Buffer.from(svg);
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
    
    // Generate OG image (1200x630)
    console.log('\n🖼️  Generating og-image.png (1200x630)...');
    const ogSVG = await generateOGImageSVG(1200, 630);
    await sharp(ogSVG)
      .resize(1200, 630)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'og-image.png'));
    console.log('✅ og-image.png created');

    // Generate Twitter card image (1200x630)
    console.log('🐦 Generating twitter-image.png (1200x630)...');
    const twitterSVG = await generateOGImageSVG(1200, 630, true);
    await sharp(twitterSVG)
      .resize(1200, 630)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'twitter-image.png'));
    console.log('✅ twitter-image.png created');

    // Generate logo.png (512x512) for structured data
    console.log('🏷️  Generating logo.png (512x512)...');
    const logoSVG = await generateLogoSVG(512);
    await sharp(logoSVG)
      .resize(512, 512)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'logo.png'));
    console.log('✅ logo.png created');

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
    console.log('   - og-image.png (OpenGraph social)');
    console.log('   - twitter-image.png (Twitter card)');
    console.log('   - logo.png (structured data)');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the generator
generateIcons();

export { generateIcons };
