import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to encode RGBA pixels into PNG buffer using standard PNG specs
function encodePng(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = Math.min(255, Math.max(0, Math.round(r)));
      rawData[pxOffset + 1] = Math.min(255, Math.max(0, Math.round(g)));
      rawData[pxOffset + 2] = Math.min(255, Math.max(0, Math.round(b)));
      rawData[pxOffset + 3] = Math.min(255, Math.max(0, Math.round(a)));
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4);
    const crcVal = zlib.crc32(Buffer.concat([typeBuf, data]));
    crc.writeUInt32BE(crcVal >>> 0, 0);
    return Buffer.concat([len, typeBuf, data, crc]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression method
  ihdr[11] = 0; // filter method
  ihdr[12] = 0; // interlace method

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Generate Apple Books Flipbook Icon (64x64 or 256x256)
function generateBookIcon(width, height, isDark = false) {
  return encodePng(width, height, (x, y, w, h) => {
    const nx = x / w;
    const ny = y / h;

    // Background squircle / rounded rect with Apple Books aesthetic
    const cornerRadius = 0.22;
    const dx = Math.abs(nx - 0.5) - (0.5 - cornerRadius);
    const dy = Math.abs(ny - 0.5) - (0.5 - cornerRadius);
    const distToEdge = (dx > 0 && dy > 0) ? Math.sqrt(dx * dx + dy * dy) - cornerRadius : Math.max(dx, dy);

    if (distToEdge > 0.01) {
      return [0, 0, 0, 0]; // Transparent outside rounded squircle
    }

    // Base background: Apple Books gradient (Sepia / Deep Charcoal)
    let bgR, bgG, bgB;
    if (!isDark) {
      // Warm Sepia Leather / Gold-Orange Apple Books Gradient
      const grad = ny * 0.7 + nx * 0.3;
      bgR = 246 - grad * 20;
      bgG = 138 - grad * 35;
      bgB = 30 - grad * 15;
    } else {
      // Sleek Dark Onyx
      const grad = ny * 0.8;
      bgR = 38 - grad * 15;
      bgG = 40 - grad * 16;
      bgB = 46 - grad * 18;
    }

    // Antialiasing for outer squircle edge
    let alpha = 255;
    if (distToEdge > -0.02) {
      alpha = Math.round(255 * (1 - (distToEdge + 0.02) / 0.03));
    }

    // Book geometry: Center spread inside icon
    const bookL = 0.18, bookR = 0.82;
    const bookT = 0.24, bookB = 0.76;
    const spineX = 0.50;

    if (nx >= bookL && nx <= bookR && ny >= bookT && ny <= bookB) {
      // Inside book spread area
      const pageProgX = nx < spineX ? (nx - bookL) / (spineX - bookL) : (nx - spineX) / (bookR - spineX);
      const isRightPage = nx >= spineX;

      // Bottom-right page corner curl
      const cornerCurlDist = (nx - (bookR - 0.18)) + (ny - (bookB - 0.18));
      if (isRightPage && cornerCurlDist > 0.20) {
        // Behind the turned page: shadow underneath curl
        return [Math.round(bgR * 0.65), Math.round(bgG * 0.65), Math.round(bgB * 0.65), alpha];
      }

      // Page paper color (warm parchment white)
      let pageR = isDark ? 238 : 255;
      let pageG = isDark ? 232 : 251;
      let pageB = isDark ? 220 : 243;

      // Spine shadow effect (ambient occlusion in the middle)
      const spineDist = Math.abs(nx - spineX);
      if (spineDist < 0.08) {
        const shadowIntensity = (1 - spineDist / 0.08) * 0.28;
        pageR = Math.round(pageR * (1 - shadowIntensity));
        pageG = Math.round(pageG * (1 - shadowIntensity));
        pageB = Math.round(pageB * (1 - shadowIntensity));
      }

      // Curled corner flap rendering
      if (isRightPage && cornerCurlDist > 0.12 && cornerCurlDist <= 0.20) {
        // The curled paper flap itself
        const flapShade = 1.05 - (cornerCurlDist - 0.12) * 2;
        pageR = Math.min(255, Math.round(pageR * flapShade));
        pageG = Math.min(255, Math.round(pageG * flapShade));
        pageB = Math.min(255, Math.round(pageB * flapShade));
      }

      // Simulated book content lines (tactile text rows)
      const lineY1 = Math.abs(ny - 0.38) < 0.018 && ((nx > 0.24 && nx < 0.44) || (nx > 0.56 && nx < 0.76));
      const lineY2 = Math.abs(ny - 0.46) < 0.018 && ((nx > 0.24 && nx < 0.44) || (nx > 0.56 && nx < 0.74));
      const lineY3 = Math.abs(ny - 0.54) < 0.018 && ((nx > 0.24 && nx < 0.40) || (nx > 0.56 && nx < 0.70));
      const lineY4 = Math.abs(ny - 0.62) < 0.018 && ((nx > 0.24 && nx < 0.42) || (nx > 0.56 && nx < 0.66));

      if (lineY1 || lineY2 || lineY3 || lineY4) {
        const textShade = 0.82;
        pageR = Math.round(pageR * textShade);
        pageG = Math.round(pageG * textShade);
        pageB = Math.round(pageB * textShade);
      }

      return [pageR, pageG, pageB, alpha];
    }

    return [bgR, bgG, bgB, alpha];
  });
}

// Generate Tile preview image (256x192)
function generateTileIcon(width, height, isDark = false) {
  return encodePng(width, height, (x, y, w, h) => {
    const nx = x / w;
    const ny = y / h;

    // Outer subtle card
    let bgR = isDark ? 28 : 242;
    let bgG = isDark ? 30 : 244;
    let bgB = isDark ? 36 : 247;

    const bookL = 0.20, bookR = 0.80;
    const bookT = 0.18, bookB = 0.82;
    const spineX = 0.50;

    if (nx >= bookL && nx <= bookR && ny >= bookT && ny <= bookB) {
      // 3D Book Elevation Shadow
      const isRight = nx >= spineX;
      let pageR = isDark ? 245 : 255;
      let pageG = isDark ? 240 : 252;
      let pageB = isDark ? 230 : 244;

      const spineDist = Math.abs(nx - spineX);
      if (spineDist < 0.07) {
        const shadow = (1 - spineDist / 0.07) * 0.25;
        pageR = Math.round(pageR * (1 - shadow));
        pageG = Math.round(pageG * (1 - shadow));
        pageB = Math.round(pageB * (1 - shadow));
      }

      // Corner curl on right page
      const cornerCurl = (nx - (bookR - 0.16)) + (ny - (bookB - 0.16));
      if (isRight && cornerCurl > 0.16) {
        return [Math.round(bgR * 0.8), Math.round(bgG * 0.8), Math.round(bgB * 0.8), 255];
      }

      // Title & Text rows
      if (Math.abs(ny - 0.32) < 0.02 && nx > 0.26 && nx < 0.44) {
        return [isDark ? 50 : 0, isDark ? 130 : 113, isDark ? 240 : 227, 255]; // Accent color title bar
      }
      if (Math.abs(ny - 0.40) < 0.015 && ((nx > 0.26 && nx < 0.45) || (nx > 0.55 && nx < 0.74))) {
        return [160, 160, 165, 255];
      }
      if (Math.abs(ny - 0.48) < 0.015 && ((nx > 0.26 && nx < 0.42) || (nx > 0.55 && nx < 0.70))) {
        return [160, 160, 165, 255];
      }
      if (Math.abs(ny - 0.56) < 0.015 && ((nx > 0.26 && nx < 0.44) || (nx > 0.55 && nx < 0.68))) {
        return [160, 160, 165, 255];
      }
      if (Math.abs(ny - 0.64) < 0.015 && ((nx > 0.26 && nx < 0.38) || (nx > 0.55 && nx < 0.62))) {
        return [160, 160, 165, 255];
      }

      return [pageR, pageG, pageB, 255];
    }

    return [bgR, bgG, bgB, 255];
  });
}

// Ensure assets directories
const assetsDir = path.join(rootDir, 'assets');
const srcAssetsDir = path.join(rootDir, 'src', 'assets');
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(srcAssetsDir, { recursive: true });

console.log('🎨 Generating Mendix Studio Pro & Marketplace Icon Assets...');

// 1. Studio Pro 64x64 Icons
const iconPng = generateBookIcon(64, 64, false);
const iconDarkPng = generateBookIcon(64, 64, true);

fs.writeFileSync(path.join(srcAssetsDir, 'VikFlip.icon.png'), iconPng);
fs.writeFileSync(path.join(srcAssetsDir, 'VikFlip.icon.dark.png'), iconDarkPng);
fs.writeFileSync(path.join(rootDir, 'src', 'VikFlip.icon.png'), iconPng);
fs.writeFileSync(path.join(rootDir, 'src', 'VikFlip.icon.dark.png'), iconDarkPng);

// 2. Studio Pro 256x192 Tile Images
const tilePng = generateTileIcon(256, 192, false);
const tileDarkPng = generateTileIcon(256, 192, true);

fs.writeFileSync(path.join(srcAssetsDir, 'VikFlip.tile.png'), tilePng);
fs.writeFileSync(path.join(srcAssetsDir, 'VikFlip.tile.dark.png'), tileDarkPng);
fs.writeFileSync(path.join(rootDir, 'src', 'VikFlip.tile.png'), tilePng);
fs.writeFileSync(path.join(rootDir, 'src', 'VikFlip.tile.dark.png'), tileDarkPng);

// 3. Marketplace 256x256 High-Resolution Store Icon & Thumbnail Image
const marketplaceIcon = generateBookIcon(256, 256, false);
fs.writeFileSync(path.join(assetsDir, 'marketplace-icon.png'), marketplaceIcon);
fs.writeFileSync(path.join(assetsDir, 'thumbnail.png'), marketplaceIcon);

// 4. Update VikFlip.xml with Base64 icon
const base64Icon = iconPng.toString('base64');
const xmlPath = path.join(rootDir, 'src', 'VikFlip.xml');
let xmlContent = fs.readFileSync(xmlPath, 'utf8');

if (xmlContent.includes('<icon/>') || xmlContent.includes('<icon>')) {
  xmlContent = xmlContent.replace(/<icon>[\s\S]*?<\/icon>|<icon\/>/, `<icon>${base64Icon}</icon>`);
  fs.writeFileSync(xmlPath, xmlContent, 'utf8');
  console.log('✅ Updated src/VikFlip.xml with embedded Base64 icon.');
}

console.log('✨ Generated icons:');
console.log(' - src/VikFlip.icon.png (64x64)');
console.log(' - src/VikFlip.icon.dark.png (64x64)');
console.log(' - src/VikFlip.tile.png (256x192)');
console.log(' - src/VikFlip.tile.dark.png (256x192)');
console.log(' - assets/marketplace-icon.png (256x256)');
