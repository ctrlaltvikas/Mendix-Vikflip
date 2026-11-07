# Mendix Marketplace Content Submission Guide for VikFlip

This guide walks you through publishing **VikFlip** to the public Mendix Marketplace in full compliance with the [Mendix Guidelines for Content Creators](https://docs.mendix.com/appstore/general/guidelines-for-content-creators/) and [Uploading Content to Marketplace](https://docs.mendix.com/appstore/general/uploading-content-to-marketplace/).

---

## 📋 Pre-Submission Checklist

Before accessing the Mendix Marketplace portal, ensure the following deliverables are ready:

- [x] **Widget Package (`.mpk`):** Located at `dist/VikFlip.mpk` (and versioned at `dist/1.0.0/vikflip.applebooksflipbook.VikFlip.mpk`).
- [x] **Studio Pro Support:** Supports Mendix 9.24+ (LTS) and Mendix 10.0+ (LTS/MTS).
- [x] **License Scan Compliance:** MIT License (100% free of prohibited GPL, LGPL, and MPL licenses; passes Mendix QSM scan).
- [x] **Vulnerability Status:** Zero known third-party security vulnerabilities (`npm audit` clean).
- [x] **Store Icon:** High-resolution 256x256 PNG located at `assets/marketplace-icon.png`.
- [x] **16:9 Showcase Screenshots:** 5 high-resolution 1280x720 PNG screenshots located in `assets/screenshots/`.
- [x] **Toolbox Icons:** Embedded Base64 icon in `VikFlip.xml`, plus 64x64 and 256x192 PNGs packaged in the `.mpk`.
- [x] **Design-Time WYSIWYG Preview:** `VikFlip.editorPreview.js` compiled and bundled.
- [x] **GitHub Repository:** Public repository clean with `.gitignore`, `README.md`, and `LICENSE`.
- [x] **Customer Support Channel:** Listed email (`support@vikflip.com` / `vikasharry03@gmail.com`) and GitHub issues tracker.

---

## 🚀 Step-by-Step Marketplace Submission Walkthrough

### Step 1: Open Mendix Marketplace
1. Navigate to the **[Mendix Marketplace](https://marketplace.mendix.com/)** and sign in with your Mendix developer credentials.
2. In the top navigation, click your profile avatar and select **My Marketplace** (or go directly to [My Marketplace](https://marketplace.mendix.com/link/mymarketplace/)).
3. Click the **Add Content** button (or **Share a Component**).

---

### Step 2: Tab 1 — General Information

Fill in the product details as follows:

| Field | Value / Configuration |
| :--- | :--- |
| **Component Name** | `VikFlip - Realistic Apple Books 3D Flipbook` |
| **Component Visibility** | **Public** (or Private if distributing strictly within your Mendix organization) |
| **Component Type** | **Widget** (or **Add-on** > **UI & Styling**) |
| **Short Description** | *Apple Books-inspired 3D flipbook widget for high-resolution annual reports, policy magazines, and digital documents with procedural audio and minimalist chrome.* (Under 160 characters) |
| **Category** | `UI & Styling` / `Widgets` |
| **Tags** | `flipbook`, `apple-books`, `page-flip`, `annual-report`, `magazine`, `pdf-viewer`, `web-audio`, `3d-curl` |
| **Open Source** | Select **Yes** |
| **License Type** | **MIT License** |
| **GitHub Repository URL** | `https://github.com/ctrlaltvikas/Mendix-Vikflip` |

---

### Step 3: Tab 2 — Package & Versioning

1. Click **Add Version** (or **Upload Package**).
2. Set **Version Number:** `1.0.0`
3. Set **Supported Mendix Versions:**
   - Minimum Version: `9.24.0`
   - Tested up to: `10.21.0` (or current MTS/LTS)
4. Upload File:
   - Drag & drop or select **`dist/VikFlip.mpk`** from this repository.
   - The file size is ~119 KB.
5. **Release Notes (Version 1.0.0):**
   ```text
   Initial production release of VikFlip:
   - Realistic 3D cloth page-curl physics with corner dragging and spring-back kinematics.
   - Ambient procedural audio synthesis (zero-latency Web Audio API paper rustle).
   - Minimalist auto-hiding glassmorphic chrome with soft center tap restoration.
   - Light, Sepia (warm paper #FBF0D9), and Dark reading themes.
   - Dual reading modes: Horizontal 3D Page Flip and Vertical Continuous Scroll.
   - Bottom drawer filmstrip thumbnail navigator with active folio highlighting.
   - Safe-click interactive links and verified document attachment preview modal.
   - Fault-tolerant React 18 error boundaries.
   - Full Studio Pro Design Mode WYSIWYG preview support.
   ```

---

### Step 4: Tab 3 — Media & Documentation

#### 1. Component Icon:
* Click **Upload Icon**.
* Upload: **`assets/marketplace-icon.png`** (256x256 high-resolution icon).

#### 2. Screenshots (16:9 Aspect Ratio):
Upload the screenshots located in **`assets/screenshots/`** in the following order:
1. `01-sepia-spread-apple-books.png` — *Signature Apple Books warm paper two-page spread with executive address.*
2. `02-tactile-corner-curl-physics.png` — *Tactile corner curl physics showing 3D lighting, drop shadows, and attachment card.*
3. `03-dark-mode-reading.png` — *Onyx dark mode reading experience with floating glass controls.*
4. `04-light-theme-editorial.png` — *Clean milk-white editorial magazine spread.*
5. `05-thumbnail-drawer-navigator.png` — *Slide-up bottom filmstrip thumbnail navigator with active folio glowing capsule.*

#### 3. Documentation Body:
* Open **[`MARKETPLACE.md`](file:///Users/vikasyadav/Documents/GitHub/Mendix-Vikflip/MARKETPLACE.md)**.
* Copy the entire contents of `MARKETPLACE.md` and paste it directly into the rich text / Markdown documentation editor.
* Ensure headings, tables, and code snippets render cleanly.

---

### Step 5: Tab 4 — Support & Legal Review

1. **Customer Support Channel:**
   - Support Email: `support@vikflip.com` / `vikasharry03@gmail.com`
   - Issues / Bug Tracker: `https://github.com/ctrlaltvikas/Mendix-Vikflip/issues`
2. **Support Terms:**
   - Select Standard Support / Community Open Source SLA.
3. Click **Save & Preview**.

---

### Step 6: Submit for Review

1. Review your listing preview to verify:
   - Icon is sharp and unpixelated.
   - All 5 screenshots render in native 16:9 ratio.
   - Documentation displays clear installation, configuration, and property tables.
   - Download `.mpk` link references `dist/VikFlip.mpk`.
2. Click **Submit for Review**.
3. **Mendix Governance & Approval Process:**
   - **Automated QSM Scan:** Mendix runs automated Quality & Security Management checks verifying 0 vulnerabilities and confirming MIT open-source license compliance (prohibiting GPL/LGPL/MPL).
   - **Human Review:** The Mendix Marketplace approval team validates the submission (typically within 3–5 business days).
   - You will receive an automated confirmation email once VikFlip is live on the public Mendix Marketplace!
