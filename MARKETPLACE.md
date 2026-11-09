# VikFlip — Apple Books 3D Flipbook & Interactive Reader

## Typical usage scenario

VikFlip is an enterprise-grade Mendix Pluggable Widget inspired by the minimalist aesthetic and craftsmanship of Apple Books. It elevates flat, static corporate documents, multi-page PDFs, and web scroll views into an interactive, high-resolution reading showcase with realistic page-turning physics, real-time procedural audio synthesis, and an auto-hiding glassmorphic interface.

### Primary Use Cases:
1. **Executive & Investor Relations:** Delivering high-stakes annual shareholder reports, audited financial disclosures, and strategic overviews with authentic hardcover binding and tactile page curls.
2. **ESG & Sustainability Publications:** Converting multi-million page corporate print runs into zero-emission, immersive digital publications that board members and stakeholders actively prefer over physical printed books.
3. **Policy Magazines & Technical Whitepapers:** Showcasing regulatory briefs, research papers, and corporate circulars with asymmetric print-grade margins and verified document attachments.
4. **Luxury Product Lookbooks & Catalogs:** Displaying high-resolution commercial catalogs and marketing portfolios at silky-smooth 60–120Hz refresh rates.
5. **Interactive Corporate Portals & Knowledge Bases:** Coupling in-book deep links (jump to chapter) and downloadable document attachments (PDFs, XLSX models) with built-in protection against accidental page turns.

---

## Features and limitations

### Key Features:
* **Tactile 3D Page Physics:**
  - Realistic corner dragging with dynamic resistance, Euler angle cloth mesh deformation, contact drop shadows, and authentic spring-back kinematics.
  - Asymmetric print-grade margins: extra 44px breathing room along the spine fold so text and metrics never dive into the center gutter.
  - Traditional folio pagination: even folios outer-left, odd folios outer-right.
* **Ambient Procedural Audio:**
  - Zero-latency Web Audio API synthesis generating natural paper-turning rustle and air displacement on every turn (with a clean toolbar mute toggle).
  - No external audio file downloads or bandwidth overhead.
* **Minimalist Apple Books Chrome:**
  - Floating iOS-style glassmorphic toolbars (`backdrop-filter: blur(24px) saturate(180%)`) that auto-hide during reading and gently reappear on mouse movement or soft center tap.
  - Live page scrubber with drag tracking.
* **Dual Reading Modes:**
  - Seamlessly switch between Horizontal 3D Page Flip (two-page spread on desktop, adaptive portrait on mobile) and Vertical Continuous Scroll flow (press 'V').
* **Reading Themes:**
  - Instant toggle between Light (crisp milk white), Sepia (signature Apple Books warm paper #FBF0D9), and Dark (deep charcoal matte) reading modes (press 'T').
* **Bottom Drawer Navigator:**
  - Slide-up miniature preview filmstrip displaying all document folios with an active glowing capsule indicator (press 'D').
* **Interactive Blog Links & Attachments:**
  - Safe-click external links, table of contents jumps, and verified document attachment previews (PDF, XLSX) with zero risk of accidental page turns (`disableFlipByClick: true`).
* **Mendix React Client Ready:**
  - 100% pure React 18, zero legacy Dojo dependencies, future-proof for Mendix 10, 11, and 12.

### Limitations:
* Requires a modern web browser supporting HTML5 Canvas and Web Audio API (Chrome, Safari, Edge, Firefox, iOS Safari, Android Chrome).
* Web Audio procedural rustle requires an initial user interaction (click or tap) due to browser autoplay security policies.

---

## Dependencies

* **Mendix Studio Pro:** v9.24.0 or higher / v10.0.0 or higher (tested on LTS releases).
* **Atlas UI:** Fully compatible with Atlas Core 3.x and custom corporate theme modules.
* **External Modules:** None. Self-contained widget package (`.mpk`) with 0 external runtime network dependencies and 0 security vulnerabilities.

---

## Installation

1. In Mendix Studio Pro, download **VikFlip** from the Mendix Marketplace (or copy `VikFlip.mpk` into your project's `widgets/` folder).
2. Press **F4** (Synchronize Project Directory).
3. Drag the **VikFlip** widget from your Toolbox onto any page inside a Data View containing your publication entity.
4. Set the **Pages Data Source** to retrieve child pages (sorted by Page Number ascending).
5. Map attributes for `Page Number`, `Chapter Title`, and `Initial Theme` (Light, Sepia, or Dark).
6. Run your project locally or deploy to Mendix Cloud.

---

## Configuration & Property Reference

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Pages (Data Source)` | DataSource | Required | List of page records (`PublicationPage` entity) |
| `Page Image` | Image | Optional | High-resolution background raster or scanned folio |
| `Page Number` | Integer | Required | 1-based page index for ordering and folios |
| `Chapter Title` | String | Optional | Running header text displayed in top chrome |
| `Page Density` | Enum | `Soft` | `Hard` (covers) or `Soft` (interior pages) |
| `Initial Theme` | Enum | `Sepia` | `Light`, `Sepia`, or `Dark` |
| `Initial Mode` | Enum | `Horizontal`| `Horizontal` (3D flipbook) or `Vertical` (continuous scroll) |
| `Auto-Hide Toolbar` | Boolean | `true` | Hides floating chrome after 4 seconds of reading inactivity |
| `Show Thumbnail Drawer`| Boolean | `true` | Enables bottom filmstrip drawer navigator |
| `Sound Enabled` | Boolean | `true` | Synthesizes realistic paper rustle on turn |
| `On Page Change` | Action | Optional | Microflow / Nanoflow triggered on page navigation |
| `On Attachment Click` | Action | Optional | Microflow triggered when a user downloads an attachment |
