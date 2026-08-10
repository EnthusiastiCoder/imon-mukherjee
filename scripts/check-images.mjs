/**
 * Fails when a source image is too small for the size it is displayed at.
 *
 * This is the regression guard behind AC4: the original complaint about blurry
 * images was caused entirely by sub-300px source files being stretched into
 * ~380px-wide cards, which no amount of CSS can fix. Rather than re-discovering
 * that by eye, each image declares the largest CSS width it is rendered at
 * (RENDERED_AT below) and this script compares it against the intrinsic width in
 * the derivative manifest.
 *
 * A photo needs `rendered * DPR` real pixels to look sharp. We check against
 * DPR 2, which is what essentially every phone and modern laptop has.
 *
 * Exit 1 on failure so `npm run check:images` can gate a build or a PR.
 */
import { readFile } from 'node:fs/promises';

const MANIFEST = 'src/generated/image-manifest.json';
const TARGET_DPR = 2;

// Largest CSS pixel width each image is rendered at, across all breakpoints.
// Keep in sync when a layout changes the display size of an image.
const RENDERED_AT = {
  'profile_image.jpg': 288, // Hero avatar, lg:w-72
  'quantum-computer.webp': 1152, // Hero carousel, max-w-6xl
  'cryptography.jpg': 1152,
  'QML.jpg': 1152,
  'steganography.jpg': 1152,
  'image1.jpg': 400, // Gallery tile at its widest column
  'image2.jpg': 400,
  'image3.jpg': 400,
  'image4.jpg': 400,
  'image5.webp': 400,
  'image6.jpg': 400,
  '5G.jpg': 400,
  'BCCL.jpg': 400,
  'Plane.jpg': 400,
};

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));

const rows = [];
let failures = 0;

for (const [file, rendered] of Object.entries(RENDERED_AT)) {
  const entry = manifest[file];
  if (!entry) {
    rows.push({ file, status: 'MISSING', detail: 'not found in manifest' });
    failures++;
    continue;
  }

  const needed = rendered * TARGET_DPR;
  const ratio = entry.width / needed;

  if (ratio >= 1) {
    rows.push({
      file,
      status: 'ok',
      detail: `${entry.width}px source ≥ ${needed}px needed`,
    });
  } else {
    // Below 1.0 the browser is upscaling on a 2-DPR screen. Under 0.5 it is
    // upscaling even on a plain 1-DPR monitor, which is visible to anyone.
    const severity = ratio < 0.5 ? 'BLURRY' : 'SOFT';
    rows.push({
      file,
      status: severity,
      detail: `${entry.width}px source, needs ${needed}px (${Math.round(ratio * 100)}%)`,
    });
    failures++;
  }
}

const pad = Math.max(...rows.map((r) => r.file.length));
for (const r of rows) {
  const mark = r.status === 'ok' ? '✓' : '✗';
  console.log(`${mark} ${r.file.padEnd(pad)}  ${r.status.padEnd(7)} ${r.detail}`);
}

if (failures > 0) {
  console.error(
    `\n${failures} image(s) are displayed above their native resolution.\n` +
      `Replace the source files with higher-resolution originals — this cannot be fixed in CSS.`
  );
  process.exit(1);
}

console.log(`\nAll ${rows.length} images have sufficient resolution at ${TARGET_DPR}x DPR.`);
