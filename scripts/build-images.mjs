/**
 * Generates responsive derivatives for every source image in public/images.
 *
 * For each source we emit AVIF + WebP + a JPEG fallback at each width in WIDTHS
 * that is not larger than the source itself — upscaling only wastes bytes without
 * adding detail. Binaries land in public/images/derived/, which is gitignored and
 * rebuilt by `npm run images` (wired into both predev and prebuild), so the repo
 * keeps only the originals.
 *
 * The manifest is written to src/generated/image-manifest.json instead, and IS
 * committed: it is a few KB of deterministic metadata, and having it in the tree
 * means `src/components/Img.tsx` type-checks and a fresh clone builds without
 * first regenerating several hundred image files.
 *
 * Runs are incremental — a source whose derivatives all exist and are newer than
 * it is skipped, so `predev` costs ~nothing after the first build. Pass --force
 * to regenerate everything (e.g. after changing a quality setting).
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC_DIR = 'public/images';
const OUT_DIR = 'public/images/derived';
const MANIFEST_DIR = 'src/generated';
const MANIFEST_PATH = path.join(MANIFEST_DIR, 'image-manifest.json');
const WIDTHS = [400, 800, 1200, 1600];
const SOURCE_RE = /\.(jpe?g|png|webp)$/i;
const FORMATS = ['avif', 'webp', 'jpg'];

const FORCE = process.argv.includes('--force');

// Quality settings tuned for photographic content. AVIF earns a lower number than
// WebP at equivalent perceptual quality, which is most of its size advantage.
const AVIF = { quality: 52, effort: 5 };
const WEBP = { quality: 78 };
const JPEG = { quality: 80, mozjpeg: true, progressive: true };

/** Widths to emit for a source of the given intrinsic width, never upscaling. */
function widthsFor(intrinsic) {
  const fitting = WIDTHS.filter((w) => w <= intrinsic);
  // A source smaller than the smallest target still deserves one derivative at
  // its own size, so it gets format conversion (AVIF/WebP) even without resizing.
  if (fitting.length === 0) return [intrinsic];
  // Include the source's own width when it falls between two targets, so the
  // largest derivative is a true 1:1 representation rather than a downscale.
  if (intrinsic < WIDTHS.at(-1) && !fitting.includes(intrinsic)) fitting.push(intrinsic);
  return [...new Set(fitting)].sort((a, b) => a - b);
}

async function isFresh(srcPath, name, widths) {
  try {
    const srcMtime = (await stat(srcPath)).mtimeMs;
    for (const w of widths) {
      for (const ext of FORMATS) {
        const s = await stat(path.join(OUT_DIR, `${name}-${w}.${ext}`));
        if (s.mtimeMs < srcMtime) return false;
      }
    }
    return true;
  } catch {
    return false; // a derivative is missing
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(MANIFEST_DIR, { recursive: true });

  const entries = await readdir(SRC_DIR, { withFileTypes: true });
  const sources = entries
    .filter((e) => e.isFile() && SOURCE_RE.test(e.name))
    .map((e) => e.name)
    .sort();

  if (sources.length === 0) {
    console.warn(`No source images found in ${SRC_DIR}`);
    return;
  }

  const manifest = {};
  let written = 0;
  let skipped = 0;
  let bytesIn = 0;

  for (const file of sources) {
    const srcPath = path.join(SRC_DIR, file);
    const name = file.replace(SOURCE_RE, '');
    const meta = await sharp(srcPath, { failOn: 'none' }).metadata();
    const widths = widthsFor(meta.width);
    bytesIn += (await stat(srcPath)).size;

    manifest[file] = {
      name,
      width: meta.width,
      height: meta.height,
      aspectRatio: +(meta.width / meta.height).toFixed(4),
      widths,
    };

    if (!FORCE && (await isFresh(srcPath, name, widths))) {
      skipped++;
      continue;
    }

    for (const width of widths) {
      const resized = sharp(srcPath, { failOn: 'none' }).resize({
        width,
        withoutEnlargement: true,
        fit: 'inside',
      });

      for (const [ext, pipeline] of [
        ['avif', resized.clone().avif(AVIF)],
        ['webp', resized.clone().webp(WEBP)],
        ['jpg', resized.clone().jpeg(JPEG)],
      ]) {
        await pipeline.toFile(path.join(OUT_DIR, `${name}-${width}.${ext}`));
        written++;
      }
    }

    console.log(
      `  ${file.padEnd(24)} ${String(meta.width).padStart(4)}x${String(meta.height).padEnd(5)} -> ${widths.join(', ')}`
    );
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  const mb = (n) => (n / 1024 / 1024).toFixed(2);
  console.log(
    `\n${sources.length} sources (${mb(bytesIn)} MB originals): ` +
      `${written} derivatives written, ${skipped} already current.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
