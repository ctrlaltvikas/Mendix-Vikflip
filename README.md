# VikFlip — Apple Books Realistic 3D Flipbook Pluggable Widget for Mendix

[![Mendix v9 & v10](https://img.shields.io/badge/Mendix-v9%20%2F%20v10%20Compatible-blue.svg)](https://marketplace.mendix.com/)
[![React 18+](https://img.shields.io/badge/React-18%2B%20%2F%20TypeScript-61DAFB.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**VikFlip** is a production-grade, highly polished **Mendix Custom Pluggable Widget** that renders high-resolution annual reports, policy magazines, blogs, and digital publications with realistic page-turning physics, ambient procedural audio effects, and an Apple Books-inspired minimalist aesthetic.

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

---

## 📂 Repository Directory Structure

```
Mendix-Vikflip/
├── dist/
│   ├── VikFlip.mpk                   # Ready-to-import Mendix Pluggable Widget archive
│   └── 1.0.0/
│       └── vikflip.applebooksflipbook.VikFlip.mpk
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
│   ├── VikFlip.xml                   # Mendix Pluggable Widget definition schema
│   ├── VikFlip.tsx                   # Mendix Container component (maps ListValue data)
│   └── VikFlip.editorPreview.tsx     # Design-time preview for Mendix Studio Pro
├── demo/
│   ├── App.tsx                       # Standalone browser demo container
│   └── main.tsx                      # Vite React mount entry
├── scripts/
│   └── package-mpk.js                # Automated .mpk packager
├── index.html                        # Browser demo HTML
├── package.json                      # Build scripts & dependencies
├── tsconfig.json                     # TypeScript compiler configuration
├── vite.config.ts                    # Vite dev server configuration
└── vite.config.widget.ts             # UMD widget bundler configuration
```

---

## 🚀 How to Import and Use in Mendix Studio Pro (v9 & v10)

### Step 1: Copy Widget Archive
Copy `dist/VikFlip.mpk` into your Mendix project folder:
```bash
# Navigate to your Mendix project root directory
cp /path/to/Mendix-Vikflip/dist/VikFlip.mpk <YourMendixProject>/widgets/
```

### Step 2: Synchronize Widgets in Studio Pro
1. Open your project in **Mendix Studio Pro** (v9.24+ or v10+).
2. Press <kbd>F4</kbd> (or click **Project > Synchronize Project Directory**).
3. The **VikFlip** widget will now appear in your Toolbox under **Add-on widgets**.

### Step 3: Domain Model Configuration (Example)
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

# Compile widget UMD bundle & generate Mendix .mpk archive
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

## 📄 License
MIT © Vikas Yadav
