# VikFlip — Apple Books Realistic 3D Flipbook Pluggable Widget for Mendix

[![Mendix v9 & v10](https://img.shields.io/badge/Mendix-v9%20%2F%20v10%20Compatible-blue.svg)](https://marketplace.mendix.com/)
[![React 18+](https://img.shields.io/badge/React-18%2B%20%2F%20TypeScript-61DAFB.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Marketplace Ready](https://img.shields.io/badge/Mendix%20Marketplace-Submission%20Ready-success.svg)](docs/MARKETPLACE_SUBMISSION_GUIDE.md)

**VikFlip** is a production-grade, highly polished **Mendix Custom Pluggable Widget** inspired by the minimalist aesthetic of **Apple Books**. It renders high-resolution annual reports, policy magazines, blogs, and corporate digital publications with realistic 3D page-turning physics, zero-latency procedural Web Audio paper synthesis, and auto-hiding minimalist chrome.

---

## 📑 Quick Links for Mendix Marketplace Submission
* 📘 **[Mendix Marketplace Submission Guide](docs/MARKETPLACE_SUBMISSION_GUIDE.md):** Complete step-by-step walkthrough for uploading to `marketplace.mendix.com`.
* 📄 **[Marketplace Documentation Copy](MARKETPLACE.md):** Pre-formatted Markdown text ready for the *Media & Documentation* tab.
* 🏛️ **[Domain Model & Microflow Integration Guide](docs/DOMAIN_MODEL_EXAMPLE.md):** Entity schemas, attributes, and microflow configurations.
* 📦 **[Ready-to-Import Widget Archive (`VikFlip.mpk`)](dist/VikFlip.mpk):** 119 KB production package.
* 📸 **[16:9 Showcase Screenshots](assets/screenshots/):** High-resolution marketing screenshots for Marketplace listing.
* 🎨 **[Marketplace Store Icon](assets/marketplace-icon.png):** 256x256 high-res app icon.

---

## 🌟 Key Features

- **📖 Realistic Page-Turning Physics:**
  - Tactile corner dragging with natural resistance, Euler angle cloth mesh deformation, and dynamic 3D drop shadows.
  - Authentic spring-back animations when drag is released prior to midpoint.
  - Distinguishes between **hardcover front/back covers** (`data-density="hard"`) and soft editorial stock (`data-density="soft"`).
  - Authentic asymmetrical book margins: spine gutters provide breathing room (44px) so text never dives into the fold.
  - Authentic folio alignment: Left pages display page numbers at bottom-left; right pages display at bottom-right.
- **🔄 Dual Reading Modes:**
  - **Horizontal 3D Flip (`Columns2`):** Classic two-page spread with corner curls and page turns. Automatically adapts to single-page portrait mode on mobile devices (`< 768px`).
  - **Vertical Scroll Flow (`Rows3`):** Continuous vertical reading flow with centered page cards, smooth wheel/touch scrolling, and Apple Books card elevation.
  - Press <kbd>V</kbd> to toggle between Horizontal and Vertical modes.
- **🎧 Ambient Procedural Audio FX (Zero Latency):**
  - Procedural acoustic synthesis generates crisp paper-turning rustle and air displacement whoosh on every turn using the Web Audio API.
  - Dynamic randomization ($\pm 10\%$) ensures no two turns sound identical.
  - Dedicated mute toggle button in the toolbar and keyboard shortcut <kbd>M</kbd>.
- **🎨 Minimalist Apple Books Chrome (Auto-Hide UI):**
  - Glassmorphic top and bottom floating toolbars (`backdrop-filter: blur(24px) saturate(180%)`).
  - Automatically fades out after 4 seconds of reading, gently reappearing on mouse movement or soft center tap.
  - **Themes:** Light, Sepia (Warm Paper `#FBF0D9`), and Dark reading modes. Press <kbd>T</kbd> to cycle.
  - **Interactive Scrubber Slider:** Apple-styled capsule slider for immediate page navigation.
- **🗂️ Bottom Drawer Thumbnail Navigator:**
  - Slide-up mini-preview filmstrip displaying all document pages with glowing active capsule indicator. Press <kbd>D</kbd> to toggle.
- **📎 Interactive Blog Links & Verified Attachments:**
  - Interactive attachment cards (PDF, XLSX, DOCX) open an Apple Books glassmorphic modal with metadata, security badges, and direct download actions.
  - `disableFlipByClick: true` ensures clicking links, attachment cards, or selecting text **never causes accidental page flips**.
  - Internal table of contents links deep-link directly to chapters with animated page flips.
- **🛡️ Enterprise Fault-Tolerance:**
  - Wrapped in a React 18 `WidgetErrorBoundary` preventing widget exceptions from disrupting host Mendix application pages.
- **🖼️ Studio Pro Design Mode WYSIWYG Preview:**
  - Pre-compiled `VikFlip.editorPreview.js` bundled inside `.mpk` for visual rendering on the Studio Pro canvas.

---

## 📂 Repository Directory Structure

```
Mendix-Vikflip/
├── assets/
│   ├── marketplace-icon.png          # 256x256 Store listing icon
│   └── screenshots/                  # 16:9 Showcase screenshots for Marketplace
│       ├── 01-sepia-spread-apple-books.png
│       ├── 02-tactile-corner-curl-physics.png
│       ├── 03-dark-mode-reading.png
│       ├── 04-light-theme-editorial.png
│       └── 05-thumbnail-drawer-navigator.png
├── dist/
│   ├── VikFlip.mpk                   # Ready-to-import Mendix Pluggable Widget archive
│   └── 1.0.0/
│       └── vikflip.applebooksflipbook.VikFlip.mpk
├── docs/
│   ├── MARKETPLACE_SUBMISSION_GUIDE.md  # Official submission steps
│   └── DOMAIN_MODEL_EXAMPLE.md          # Entity model & microflows
├── src/
│   ├── components/
│   │   ├── AppleBooksFlipbook.tsx    # Core flipbook orchestrator & responsive sizing
│   │   ├── PageContent.tsx           # Editorial typography & asymmetric margin system
│   │   ├── AppleToolbar.tsx          # Minimalist glassmorphic floating chrome
│   │   ├── ThumbnailDrawer.tsx       # Bottom drawer filmstrip navigator
│   │   ├── AttachmentModal.tsx       # Glass dialog for document attachments & downloads
│   │   └── WidgetErrorBoundary.tsx   # React error boundary with Apple-style recovery
│   ├── data/
│   │   └── sampleReport.ts           # Sample 10-page high-resolution annual report
│   ├── styles/
│   │   └── VikFlip.css               # Apple Books glassmorphism & responsive CSS
│   ├── typings/
│   │   └── VikFlipProps.d.ts         # Strict Mendix Pluggable Widget SDK TypeScript definitions
│   ├── utils/
│   │   └── audio.ts                  # Web Audio API procedural paper rustle synthesizer
│   ├── VikFlip.xml                   # Mendix Pluggable Widget definition schema (with Base64 icon)
│   ├── VikFlip.tsx                   # Mendix Container component (maps ListValue data)
│   └── VikFlip.editorPreview.tsx     # Design-time preview for Mendix Studio Pro
├── demo/
│   ├── App.tsx                       # Standalone browser demo container
│   └── main.tsx                      # Vite React mount entry
├── scripts/
│   ├── generate-icons.js             # Generates Studio Pro & Marketplace icons
│   ├── generate-screenshots.js       # Generates 16:9 Marketplace showcase images
│   └── package-mpk.js                # Automated .mpk packager
├── MARKETPLACE.md                    # Ready-to-paste Marketplace documentation text
├── index.html                        # Browser demo HTML
├── package.json                      # Build scripts & dependencies
├── tsconfig.json                     # TypeScript compiler configuration
├── vite.config.ts                    # Vite dev server configuration
├── vite.config.widget.ts             # UMD widget bundler configuration
└── vite.config.preview.ts            # Studio Pro preview bundler configuration
```

---

## 🚀 How to Import and Use in Mendix Studio Pro (v9 & v10)

### Step 1: Copy Widget Archive
Copy `dist/VikFlip.mpk` into your Mendix project folder:
```bash
# Navigate to your Mendix project root directory
cp dist/VikFlip.mpk <YourMendixProject>/widgets/
```

### Step 2: Synchronize Widgets in Studio Pro
1. Open your project in **Mendix Studio Pro** (v9.24+ or v10+).
2. Press <kbd>F4</kbd> (or click **Project > Synchronize Project Directory**).
3. The **VikFlip** widget will now appear in your Toolbox under **Add-on widgets**.

### Step 3: Domain Model Configuration
Create an entity representing your publication pages:

| Entity: `DocumentPage` | Type | Description |
| :--- | :--- | :--- |
| `PageNumber` | Integer | Sequence number (1, 2, 3...) |
| `ChapterTitle` | String | e.g. "01. Executive Overview" |
| `PageImage` | Binary / Image | FileDocument image stream (or String URL) |
| `PageDensity` | String / Enum | `'hard'` (covers) or `'soft'` (interior pages) |

*Association:* `Publication` (1) $\rightarrow$ `DocumentPage` (*)

### Step 4: Page Placement & Property Mapping
1. Drag the **VikFlip** widget into a Data View (or page with `Publication` context).
2. In the properties panel:
   - **Data Source > Pages Data Source:** Retrieve `DocumentPage` by association or microflow.
   - **Page Image / URL:** Map to `PageImage`.
   - **Page Number:** Map to `PageNumber`.
   - **Chapter Title:** Map to `ChapterTitle`.
   - **Page Density:** Map to `PageDensity`.
   - **Initial Reading Theme:** Choose `Sepia`, `Light`, or `Dark`.
   - **Initial Reading Mode:** Choose `Horizontal (3D Flip)` or `Vertical (Scroll)`.
   - **Enable Ambient Audio FX:** Set to `true` (procedural paper rustle).
   - **On Page Change:** Optionally attach a Nanoflow to log analytics or track reader progress.
   - **On Attachment Click:** Attach a Microflow to download or display attached `FileDocument` records.

---

## 🛠️ Developer Scripts

```bash
# Start local live browser demo with hot reloading
npm run dev

# Compile standalone demo for production
npm run build

# Generate icons (Studio Pro 64x64, 256x192, and Marketplace 256x256)
npm run generate:icons

# Generate 16:9 showcase screenshots
npm run generate:screenshots

# Compile widget UMD bundle, preview bundle, and create Mendix .mpk archive
npm run package:mpk
```

---

## ⌨️ Reader Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> / <kbd>↓</kbd> | Next Page |
| <kbd>←</kbd> / <kbd>PageUp</kbd> / <kbd>↑</kbd> | Previous Page |
| <kbd>V</kbd> | Toggle Mode (**Horizontal 3D Flip** $\leftrightarrow$ **Vertical Scroll**) |
| <kbd>M</kbd> | Mute / Unmute Paper Rustle Audio FX |
| <kbd>T</kbd> | Cycle Themes (**Light** $\rightarrow$ **Sepia** $\rightarrow$ **Dark**) |
| <kbd>D</kbd> | Toggle Bottom Thumbnail Navigator Drawer |
| <kbd>Esc</kbd> | Close Modal / Drawer |

---

## 🛡️ License & Marketplace Compliance
MIT © Vikas Yadav

- **Mendix QSM Scanned:** 0 Vulnerabilities.
- **Open Source:** Clean MIT / ISC dependencies. Free of GPL, LGPL, and MPL licenses.
