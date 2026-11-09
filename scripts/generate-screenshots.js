import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to encode RGBA pixels into standard PNG buffer
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

// 600x420 standard Mendix Marketplace screenshot generator
function generateScreenshot600x420(theme = 'sepia', options = {}) {
  const width = 600;
  const height = 420;

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  // Surface colors
  const bgDesk = isDark ? [13, 13, 14] : isLight ? [242, 242, 247] : [239, 230, 213];
  const pageBg = isDark ? [28, 28, 30] : isLight ? [255, 255, 255] : [251, 240, 217];
  const textCol = isDark ? [242, 242, 247] : isLight ? [28, 28, 30] : [61, 46, 30];
  const accent = isDark ? [10, 132, 255] : isLight ? [0, 113, 227] : [179, 89, 0];

  return encodePng(width, height, (x, y, w, h) => {
    const nx = x / w;
    const ny = y / h;

    // 1. Desk background with subtle vignette
    const distCenter = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2);
    const vignette = 1 - distCenter * 0.12;
    let r = bgDesk[0] * vignette;
    let g = bgDesk[1] * vignette;
    let b = bgDesk[2] * vignette;

    // 2. Floating Top Apple Chrome Bar (nx 0.22 to 0.78, ny 0.04 to 0.12)
    if (nx >= 0.22 && nx <= 0.78 && ny >= 0.04 && ny <= 0.12) {
      const chromeBg = isDark ? [38, 38, 42] : [255, 255, 255];
      // Title pill border
      const isPillEdge = (nx < 0.23 || nx > 0.77 || ny < 0.048 || ny > 0.112);
      if (isPillEdge) {
        return [chromeBg[0] * 0.9, chromeBg[1] * 0.9, chromeBg[2] * 0.9, 230];
      }
      // Small icon / accent indicator inside toolbar
      if (nx > 0.25 && nx < 0.28 && ny > 0.065 && ny < 0.095) {
        return [accent[0], accent[1], accent[2], 255];
      }
      return [chromeBg[0], chromeBg[1], chromeBg[2], 245];
    }

    // 3. Central Book Spread Geometry
    const bookL = 0.12, bookR = 0.88;
    const bookT = 0.16, bookB = options.showDrawer ? 0.78 : 0.86;
    const spineX = 0.50;

    // Drop shadow around book
    const shadowDistX = Math.max(0, bookL - nx, nx - bookR);
    const shadowDistY = Math.max(0, bookT - ny, ny - bookB);
    const shadowDist = Math.sqrt(shadowDistX ** 2 + shadowDistY ** 2);
    if (shadowDist > 0 && shadowDist < 0.035) {
      const shadowFactor = 1 - (1 - shadowDist / 0.035) * 0.38;
      return [r * shadowFactor, g * shadowFactor, b * shadowFactor, 255];
    }

    if (nx >= bookL && nx <= bookR && ny >= bookT && ny <= bookB) {
      let pr = pageBg[0];
      let pg = pageBg[1];
      let pb = pageBg[2];

      const isRight = nx >= spineX;

      // Spine crease shadow (center gutter)
      const spineDist = Math.abs(nx - spineX);
      if (spineDist < 0.045) {
        const spineShade = (1 - spineDist / 0.045) * 0.26;
        pr = pr * (1 - spineShade);
        pg = pg * (1 - spineShade);
        pb = pb * (1 - spineShade);
      }

      // 3D Corner curl on right page
      if (options.curledCorner && isRight) {
        const cornerOriginX = bookR - 0.15;
        const cornerOriginY = bookB - 0.15;
        const curlDist = (nx - cornerOriginX) + (ny - cornerOriginY);
        if (curlDist > 0.17) {
          // Shadow underneath the turned corner
          return [bgDesk[0] * 0.65, bgDesk[1] * 0.65, bgDesk[2] * 0.65, 255];
        }
        if (curlDist > 0.10 && curlDist <= 0.17) {
          // Curled paper flap
          pr = Math.min(255, pr * 1.18);
          pg = Math.min(255, pg * 1.18);
          pb = Math.min(255, pb * 1.18);
          return [pr, pg, pb, 255];
        }
      }

      // Left page: Chapter Header line
      if (!isRight && ny > 0.23 && ny < 0.26 && nx > 0.18 && nx < 0.36) {
        return [accent[0], accent[1], accent[2], 255];
      }

      // Metric KPI cards on left page (if options.hasMetrics)
      if (options.hasMetrics && !isRight && ny >= 0.30 && ny <= 0.44 && nx >= 0.18 && nx <= 0.44) {
        const isCardBorder = (nx < 0.185 || nx > 0.435 || ny < 0.308 || ny > 0.432);
        if (isCardBorder) return [pr * 0.9, pg * 0.9, pb * 0.9, 255];
        if (ny > 0.35 && ny < 0.39 && nx > 0.21 && nx < 0.35) {
          return [textCol[0], textCol[1], textCol[2], 255]; // KPI text
        }
        return [pr * 0.96, pg * 0.96, pb * 0.96, 255];
      }

      // Editorial simulated text rows
      const startRowY = options.hasMetrics ? 0.48 : 0.30;
      const rowY = Math.floor((ny - startRowY) / 0.048);
      if (rowY >= 0 && rowY <= (options.hasMetrics ? 4 : 7)) {
        const rowMidY = startRowY + rowY * 0.048 + 0.016;
        if (Math.abs(ny - rowMidY) < 0.008) {
          if (!isRight && nx > 0.18 && nx < 0.44) {
            return [textCol[0] * 0.65 + pr * 0.35, textCol[1] * 0.65 + pg * 0.35, textCol[2] * 0.65 + pb * 0.35, 255];
          }
          if (isRight && nx > 0.55 && nx < 0.82) {
            return [textCol[0] * 0.65 + pr * 0.35, textCol[1] * 0.65 + pg * 0.35, textCol[2] * 0.65 + pb * 0.35, 255];
          }
        }
      }

      // Attachment card mock on right page
      if (options.hasAttachment && isRight && nx >= 0.55 && nx <= 0.81 && ny >= 0.58 && ny <= 0.70) {
        const isAttBorder = (nx < 0.555 || nx > 0.805 || ny < 0.588 || ny > 0.692);
        if (isAttBorder) return [accent[0], accent[1], accent[2], 255];
        return [isDark ? 45 : 242, isDark ? 48 : 236, isDark ? 54 : 224, 255];
      }

      // Running folios (page numbers) at bottom
      if (ny > (bookB - 0.05) && ny < (bookB - 0.02)) {
        if (!isRight && nx > 0.18 && nx < 0.22) {
          return [textCol[0], textCol[1], textCol[2], 255]; // Folio 2
        }
        if (isRight && nx > 0.78 && nx < 0.82) {
          return [textCol[0], textCol[1], textCol[2], 255]; // Folio 3
        }
      }

      return [pr, pg, pb, 255];
    }

    // 4. Bottom Thumbnail Drawer Navigator (for Screenshot 4)
    if (options.showDrawer && ny >= 0.76) {
      const drawerBg = isDark ? [25, 25, 28] : [248, 240, 226];
      // Micro thumbnail cards
      const thumbSlot = Math.floor((nx - 0.12) / 0.095);
      if (thumbSlot >= 0 && thumbSlot <= 7 && ny >= 0.81 && ny <= 0.95) {
        const thumbSubX = (nx - (0.12 + thumbSlot * 0.095));
        if (thumbSubX > 0.015 && thumbSubX < 0.08) {
          if (thumbSlot === 2) {
            // Active highlighted thumbnail capsule
            const isThumbEdge = (thumbSubX < 0.022 || thumbSubX > 0.073 || ny < 0.82 || ny > 0.94);
            if (isThumbEdge) return [accent[0], accent[1], accent[2], 255];
          }
          return [pageBg[0] * 0.94, pageBg[1] * 0.94, pageBg[2] * 0.94, 255];
        }
      }
      return [drawerBg[0], drawerBg[1], drawerBg[2], 250];
    }

    return [r, g, b, 255];
  });
}

const screenshotsDir = path.join(rootDir, 'assets', 'screenshots');
fs.mkdirSync(screenshotsDir, { recursive: true });

console.log('📸 Generating Exactly 4 Screenshots (600x420 px) for Mendix Marketplace...');

// Screenshot 1: 600x420 - Sepia Two-Page Spread with Metrics & Executive Layout
const sc1 = generateScreenshot600x420('sepia', { hasMetrics: true });
fs.writeFileSync(path.join(screenshotsDir, 'screenshot-1-sepia-two-page-spread.png'), sc1);
fs.writeFileSync(path.join(rootDir, 'assets', 'screenshot-1-sepia-two-page-spread.png'), sc1);

// Screenshot 2: 600x420 - Tactile 3D Corner Curl Physics & Verified Attachment Card
const sc2 = generateScreenshot600x420('sepia', { curledCorner: true, hasAttachment: true });
fs.writeFileSync(path.join(screenshotsDir, 'screenshot-2-tactile-3d-page-curl.png'), sc2);
fs.writeFileSync(path.join(rootDir, 'assets', 'screenshot-2-tactile-3d-page-curl.png'), sc2);

// Screenshot 3: 600x420 - Dark Mode Reading Experience with Glass Chrome
const sc3 = generateScreenshot600x420('dark', { curledCorner: true });
fs.writeFileSync(path.join(screenshotsDir, 'screenshot-3-dark-mode-reading.png'), sc3);
fs.writeFileSync(path.join(rootDir, 'assets', 'screenshot-3-dark-mode-reading.png'), sc3);

// Screenshot 4: 600x420 - Bottom Thumbnail Drawer Navigator with Active Capsule
const sc4 = generateScreenshot600x420('sepia', { showDrawer: true });
fs.writeFileSync(path.join(screenshotsDir, 'screenshot-4-thumbnail-drawer-navigator.png'), sc4);
fs.writeFileSync(path.join(rootDir, 'assets', 'screenshot-4-thumbnail-drawer-navigator.png'), sc4);

console.log('✅ Generated 4 screenshots (600x420 px):');
console.log(' 1. assets/screenshots/screenshot-1-sepia-two-page-spread.png (600x420)');
console.log(' 2. assets/screenshots/screenshot-2-tactile-3d-page-curl.png (600x420)');
console.log(' 3. assets/screenshots/screenshot-3-dark-mode-reading.png (600x420)');
console.log(' 4. assets/screenshots/screenshot-4-thumbnail-drawer-navigator.png (600x420)');
