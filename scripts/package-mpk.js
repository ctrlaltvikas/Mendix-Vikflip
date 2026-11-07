import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('📦 Starting Mendix Marketplace Pluggable Widget Packaging for VikFlip...');

// 1. Generate & refresh icons
console.log('🎨 Generating Mendix Studio Pro & Marketplace Icon Assets...');
execSync('node scripts/generate-icons.js', { stdio: 'inherit', cwd: rootDir });

// 2. Build the runtime widget JavaScript & CSS bundle
console.log('⚡ Compiling optimized UMD widget bundle (VikFlip.js)...');
execSync('npx vite build --config vite.config.widget.ts', { stdio: 'inherit', cwd: rootDir });

// 3. Build the Studio Pro design mode preview bundle (VikFlip.editorPreview.js)
console.log('🖼️  Compiling Studio Pro WYSIWYG preview bundle (VikFlip.editorPreview.js)...');
execSync('npx vite build --config vite.config.preview.ts', { stdio: 'inherit', cwd: rootDir });

// 4. Prepare staging directories
const stagingDir = path.join(rootDir, 'dist', 'staging');
const outDir = path.join(rootDir, 'dist');
const versionDir = path.join(rootDir, 'dist', '1.0.0');

fs.rmSync(stagingDir, { recursive: true, force: true });
fs.mkdirSync(stagingDir, { recursive: true });
fs.mkdirSync(versionDir, { recursive: true });

// Subdirectory path matching widget id: vikflip/applebooksflipbook/VikFlip
const widgetSubdir = path.join(stagingDir, 'vikflip', 'applebooksflipbook', 'VikFlip');
const uiSubdir = path.join(widgetSubdir, 'ui');
fs.mkdirSync(uiSubdir, { recursive: true });

// Copy XML definition
const xmlSrc = path.join(rootDir, 'src', 'VikFlip.xml');
fs.copyFileSync(xmlSrc, path.join(stagingDir, 'VikFlip.xml'));
fs.copyFileSync(xmlSrc, path.join(widgetSubdir, 'VikFlip.xml'));

// Copy JS and CSS
const jsSrc = path.join(rootDir, 'dist', 'widget', 'VikFlip.js');
const previewSrc = path.join(rootDir, 'dist', 'widget', 'VikFlip.editorPreview.js');
const cssSrc = path.join(rootDir, 'dist', 'widget', 'mendix-vikflip.css');

fs.copyFileSync(jsSrc, path.join(stagingDir, 'VikFlip.js'));
fs.copyFileSync(jsSrc, path.join(widgetSubdir, 'VikFlip.js'));

fs.copyFileSync(previewSrc, path.join(stagingDir, 'VikFlip.editorPreview.js'));
fs.copyFileSync(previewSrc, path.join(widgetSubdir, 'VikFlip.editorPreview.js'));

fs.copyFileSync(cssSrc, path.join(stagingDir, 'VikFlip.css'));
fs.copyFileSync(cssSrc, path.join(uiSubdir, 'VikFlip.css'));

// Copy Studio Pro Icons (both light and dark modes)
const iconFiles = [
  'VikFlip.icon.png',
  'VikFlip.icon.dark.png',
  'VikFlip.tile.png',
  'VikFlip.tile.dark.png'
];

for (const iconFile of iconFiles) {
  const iconSrc = path.join(rootDir, 'src', iconFile);
  if (fs.existsSync(iconSrc)) {
    fs.copyFileSync(iconSrc, path.join(stagingDir, iconFile));
    fs.copyFileSync(iconSrc, path.join(widgetSubdir, iconFile));
  }
}

// 5. Create Mendix package.xml descriptor conforming to Mendix Marketplace specifications
const packageXmlContent = `<?xml version="1.0" encoding="utf-8" ?>
<package xmlns="http://www.mendix.com/package/1.0/">
    <clientModule name="VikFlip" version="1.0.0" xmlns="http://www.mendix.com/clientModule/1.0/">
        <widgetFiles>
            <widgetFile path="VikFlip.xml"/>
            <widgetFile path="vikflip/applebooksflipbook/VikFlip/VikFlip.xml"/>
        </widgetFiles>
        <files>
            <file path="VikFlip.js"/>
            <file path="VikFlip.css"/>
            <file path="VikFlip.editorPreview.js"/>
            <file path="VikFlip.icon.png"/>
            <file path="VikFlip.icon.dark.png"/>
            <file path="VikFlip.tile.png"/>
            <file path="VikFlip.tile.dark.png"/>
            <file path="vikflip/applebooksflipbook/VikFlip/VikFlip.js"/>
            <file path="vikflip/applebooksflipbook/VikFlip/VikFlip.editorPreview.js"/>
            <file path="vikflip/applebooksflipbook/VikFlip/ui/VikFlip.css"/>
            <file path="vikflip/applebooksflipbook/VikFlip/VikFlip.icon.png"/>
            <file path="vikflip/applebooksflipbook/VikFlip/VikFlip.icon.dark.png"/>
            <file path="vikflip/applebooksflipbook/VikFlip/VikFlip.tile.png"/>
            <file path="vikflip/applebooksflipbook/VikFlip/VikFlip.tile.dark.png"/>
        </files>
    </clientModule>
</package>`;

fs.writeFileSync(path.join(stagingDir, 'package.xml'), packageXmlContent, 'utf-8');

// 6. Create .mpk archive using native zip
const mpkOutPath = path.join(outDir, 'VikFlip.mpk');
const mpkVersionedPath = path.join(versionDir, 'vikflip.applebooksflipbook.VikFlip.mpk');

fs.rmSync(mpkOutPath, { force: true });
fs.rmSync(mpkVersionedPath, { force: true });

console.log('🗜️  Archiving files into Mendix .mpk container...');
execSync(`cd "${stagingDir}" && zip -r -q "${mpkOutPath}" ./*`, { stdio: 'inherit' });
fs.copyFileSync(mpkOutPath, mpkVersionedPath);

// Cleanup temporary staging folder
fs.rmSync(stagingDir, { recursive: true, force: true });

const stats = fs.statSync(mpkOutPath);
console.log('✅ Mendix Marketplace Pluggable Widget packaged successfully!');
console.log(`📁 Primary Package: ${mpkOutPath} (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`📁 Versioned Package: ${mpkVersionedPath}`);
console.log('🚀 Ready for Mendix Marketplace content upload.');
