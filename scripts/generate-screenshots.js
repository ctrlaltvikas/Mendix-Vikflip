import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to encode RGBA pixels into PNG buffer
function encodePng(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;
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
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// 1280x720 (16:9) showcase generator
function generateShowcaseScreenshot(theme = 'sepia', options = {}) {
  const width = 1280;
  const height = 720;

  const isDark = theme === 'dark';
  const isLight = theme === 'light';
  // Sepia default

  const bgDesk = isDark ? [13, 13, 14] : isLight ? [242, 242, 247] : [239, 230, 213];
  const pageBg = isDark ? [28, 28, 30] : isLight ? [255, 255, 255] : [251, 240, 217];
  const textCol = isDark ? [242, 242, 247] : isLight ? [28, 28, 30] : [61, 46, 30];
  const accent = isDark ? [10, 132, 255] : isLight ? [0, 113, 227] : [179, 89, 0];

  return encodePng(width, height, (x, y, w, h) => {
    const nx = x / w;
    const ny = y / h;

    // 1. Desk background with subtle radial vignette
    const distCenter = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2);
    const vignette = 1 - distCenter * 0.15;
    let r = bgDesk[0] * vignette;
    let g = bgDesk[1] * vignette;
    let b = bgDesk[2] * vignette;

    // 2. Floating Top Chrome Bar (nx 0.25 to 0.75, ny 0.04 to 0.10)
    if (nx >= 0.28 && nx <= 0.72 && ny >= 0.04 && ny <= 0.105) {
      const chromeBg = isDark ? [38, 38, 42] : [255, 255, 255];
      return [chromeBg[0], chromeBg[1], chromeBg[2], 240];
    }

    // 3. Central Book Spread (nx 0.12 to 0.88, ny 0.15 to 0.86)
    const bookL = 0.15, bookR = 0.85;
    const bookT = 0.15, bookB = 0.85;
    const spineX = 0.50;

    // Drop shadow around book
    const shadowDistX = Math.max(0, bookL - nx, nx - bookR);
    const shadowDistY = Math.max(0, bookT - ny, ny - bookB);
    const shadowDist = Math.sqrt(shadowDistX ** 2 + shadowDistY ** 2);
    if (shadowDist > 0 && shadowDist < 0.04) {
      const shadowFactor = 1 - (1 - shadowDist / 0.04) * 0.35;
      return [r * shadowFactor, g * shadowFactor, b * shadowFactor, 255];
    }

    if (nx >= bookL && nx <= bookR && ny >= bookT && ny <= bookB) {
      let pr = pageBg[0];
      let pg = pageBg[1];
      let pb = pageBg[2];

      const isRight = nx >= spineX;

      // Spine crease shadow
      const spineDist = Math.abs(nx - spineX);
      if (spineDist < 0.04) {
        const spineShade = (1 - spineDist / 0.04) * 0.28;
        pr = pr * (1 - spineShade);
        pg = pg * (1 - spineShade);
        pb = pb * (1 - spineShade);
      }

      // 3D Corner curl on right page
      if (options.curledCorner && isRight) {
        const curlDist = (nx - (bookR - 0.14)) + (ny - (bookB - 0.14));
        if (curlDist > 0.16) {
          // Under curl shadow
          return [bgDesk[0] * 0.7, bgDesk[1] * 0.7, bgDesk[2] * 0.7, 255];
        }
        if (curlDist > 0.10 && curlDist <= 0.16) {
          // Curled paper flap
          pr = Math.min(255, pr * 1.15);
          pg = Math.min(255, pg * 1.15);
          pb = Math.min(255, pb * 1.15);
          return [pr, pg, pb, 255];
        }
      }

      // Title header line on left page
      if (!isRight && ny > 0.22 && ny < 0.25 && nx > 0.20 && nx < 0.38) {
        return [accent[0], accent[1], accent[2], 255];
      }

      // Editorial simulated text rows
      const rowY = Math.floor((ny - 0.28) / 0.045);
      if (rowY >= 0 && rowY <= 8) {
        const rowMidY = 0.28 + rowY * 0.045 + 0.015;
        if (Math.abs(ny - rowMidY) < 0.007) {
          if (!isRight && nx > 0.20 && nx < 0.44) {
            return [textCol[0] * 0.7 + pr * 0.3, textCol[1] * 0.7 + pg * 0.3, textCol[2] * 0.7 + pb * 0.3, 255];
          }
          if (isRight && nx > 0.55 && nx < 0.80) {
            return [textCol[0] * 0.7 + pr * 0.3, textCol[1] * 0.7 + pg * 0.3, textCol[2] * 0.7 + pb * 0.3, 255];
          }
        }
      }

      // Attachment card mock on right page (nx 0.55 to 0.78, ny 0.65 to 0.75)
      if (options.hasAttachment && isRight && nx >= 0.55 && nx <= 0.78 && ny >= 0.64 && ny <= 0.74) {
        return [isDark ? 45 : 240, isDark ? 48 : 235, isDark ? 54 : 225, 255];
      }

      return [pr, pg, pb, 255];
    }

    // 4. Bottom Thumbnail Drawer (if enabled in options)
    if (options.showDrawer && ny >= 0.82) {
      const drawerBg = isDark ? [25, 25, 28] : [248, 240, 226];
      // Micro thumbnail cards
      const thumbSlot = Math.floor((nx - 0.15) / 0.08);
      if (thumbSlot >= 0 && thumbSlot <= 7 && ny >= 0.86 && ny <= 0.96) {
        const thumbSubX = (nx - (0.15 + thumbSlot * 0.08));
        if (thumbSubX > 0.01 && thumbSubX < 0.07) {
          if (thumbSlot === 3) {
            return [accent[0], accent[1], accent[2], 255]; // Active highlighted thumbnail
          }
          return [pageBg[0] * 0.95, pageBg[1] * 0.95, pageBg[2] * 0.95, 255];
        }
      }
      return [drawerBg[0], drawerBg[1], drawerBg[2], 245];
    }

    return [r, g, b, 255];
  });
}

const screenshotsDir = path.join(rootDir, 'assets', 'screenshots');
fs.mkdirSync(screenshotsDir, { recursive: true });

console.log('📸 Generating 16:9 High-Resolution Mendix Marketplace Screenshots...');

// 1. Sepia Two-Page Spread (The Signature Apple Books warm paper mode)
const sc1 = generateShowcaseScreenshot('sepia', { curledCorner: false });
fs.writeFileSync(path.join(screenshotsDir, '01-sepia-spread-apple-books.png'), sc1);

// 2. Realistic 3D Tactile Corner Curl & Spring-back Physics
const sc2 = generateShowcaseScreenshot('sepia', { curledCorner: true, hasAttachment: true });
fs.writeFileSync(path.join(screenshotsDir, '02-tactile-corner-curl-physics.png'), sc2);

// 3. Dark Theme with Minimalist Glass Chrome
const sc3 = generateShowcaseScreenshot('dark', { curledCorner: true });
fs.writeFileSync(path.join(screenshotsDir, '03-dark-mode-reading.png'), sc3);

// 4. Light Clean White Theme
const sc4 = generateShowcaseScreenshot('light', { curledCorner: false });
fs.writeFileSync(path.join(screenshotsDir, '04-light-theme-editorial.png'), sc4);

// 5. Bottom Thumbnail Filmstrip Navigator
const sc5 = generateShowcaseScreenshot('sepia', { showDrawer: true, curledCorner: false });
fs.writeFileSync(path.join(screenshotsDir, '05-thumbnail-drawer-navigator.png'), sc5);

console.log('✅ Generated 5 high-resolution 16:9 screenshots in assets/screenshots/');
