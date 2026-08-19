/**
 * Validates the design system's colour decisions.
 *
 *   node scripts/validate-design-palettes.mjs
 *
 * Exits non-zero on any failure, so it can gate a commit or a build.
 *
 * ── Why this exists in this shape ────────────────────────────────────────────
 *
 * Earlier versions carried their own copy of the palette and checked only two
 * pairings: ink-1 and the accent, each against surface-0. Both choices caused
 * real bugs to ship.
 *
 *   - The copy went stale. It still described six design directions after five
 *     had been deleted from the stylesheet.
 *   - The narrow coverage missed ink-3, which carries every caption, label and
 *     metadata line. It measured 4.18:1 on surface-0 and 3.85:1 on surface-2 in
 *     light mode — below AA on every surface — and nothing caught it because
 *     nothing looked.
 *
 * So: the palette is PARSED from src/styles/design-system.css rather than
 * restated, and every ink is checked against every surface.
 *
 * A third check guards a duplication that cannot be removed. The ~50 components
 * in src/components/ui read HSL-triplet tokens from src/index.css, because
 * Tailwind composes them as hsl(var(--x) / <alpha>) and 17 opacity modifiers in
 * those components depend on that form, while the design system stores the same
 * colours as hex. Two representations of one palette drift; when they did, the
 * symptom was a white card behind near-white text in dark mode on the Lectures
 * page. This fails the build instead.
 */
import { readFileSync } from 'node:fs';

const DESIGN_CSS = 'src/styles/design-system.css';
const SHADCN_CSS = 'src/index.css';

/* ── colour maths ─────────────────────────────────────────────────────────── */

const channels = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};

const relLuminance = (hex) => {
  const [r, g, b] = channels(hex);
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (a, b) => {
  const [hi, lo] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const hexToHslTriplet = (hex) => {
  const [r, g, b] = channels(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let hue = 0;
  let sat = 0;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  const n = (x) => Math.round(x * 10) / 10;
  return `${n(hue * 360)} ${n(sat * 100)}% ${n(l * 100)}%`;
};

/* ── parsing ──────────────────────────────────────────────────────────────── */

const tokensIn = (text, blockRe, valueRe) => {
  const m = text.match(blockRe);
  if (!m) throw new Error(`block not found: ${blockRe}`);
  return Object.fromEntries([...m[1].matchAll(valueRe)].map((x) => [x[1], x[2]]));
};

const HEX = /--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g;
const HSL = /--([a-z0-9-]+):\s*([\d.]+ [\d.]+% [\d.]+%)/g;

const design = readFileSync(DESIGN_CSS, 'utf8');
const shadcn = readFileSync(SHADCN_CSS, 'utf8');

/**
 * The categorical and status colours live in a shared :root block rather than
 * per-mode, so they are merged into both. Reading only the per-mode blocks meant
 * the light-mode status colours were silently skipped — which is how two of them
 * shipped below AA.
 */
const shared = tokensIn(design, /^:root \{([^}]*)\}/m, HEX);
const palette = {
  light: { ...shared, ...tokensIn(design, /:root,\s*\n:root\[data-variant='bitplane'\]\s*\{([^}]*)\}/, HEX) },
  dark: { ...shared, ...tokensIn(design, /:root\[data-theme='dark'\]\s*\{([^}]*)\}/, HEX) },
};

const shadcnTokens = {
  light: tokensIn(shadcn, /@layer base \{\s*\n  :root \{([^}]*)\}/, HSL),
  dark: tokensIn(shadcn, /:root\[data-theme='dark'\] \{([^}]*)\}/, HSL),
};

/* ── checks ───────────────────────────────────────────────────────────────── */

const AA_BODY = 4.5;
const INKS = ['ink-1', 'ink-2', 'ink-3'];
const SURFACES = ['surface-0', 'surface-1', 'surface-2'];

/** Which design token each shadcn role must equal. Mirrors src/index.css. */
const SHADCN_MAP = {
  background: 'surface-0',
  foreground: 'ink-1',
  card: 'surface-1',
  popover: 'surface-1',
  primary: 'signal',
  secondary: 'surface-2',
  muted: 'surface-2',
  accent: 'surface-2',
  border: 'rule',
  input: 'rule',
  ring: 'signal',
};

let failures = 0;
const mark = (ok) => (ok ? 'PASS' : 'FAIL');

console.log('\nINK ON SURFACES — every ink on every surface, both modes');
console.log('='.repeat(74));
console.log(`  ink-3 carries captions and metadata, which is body text, so it is`);
console.log(`  held to the same ${AA_BODY}:1 bar as the rest.\n`);
for (const mode of ['light', 'dark']) {
  for (const ink of INKS) {
    const cells = SURFACES.map((s) => {
      const c = contrast(palette[mode][ink], palette[mode][s]);
      const ok = c >= AA_BODY;
      if (!ok) failures++;
      return `${s.replace('surface-', 's')}=${c.toFixed(2)}${ok ? '' : ' FAIL'}`;
    });
    console.log(`    ${mode.padEnd(5)} ${ink} ${palette[mode][ink]}  ${cells.join('  ')}`);
  }
}

console.log('\nSIGNAL — used on links and on filled controls');
console.log('='.repeat(74));
for (const mode of ['light', 'dark']) {
  const p = palette[mode];
  const onSurface = contrast(p.signal, p['surface-0']);
  const inkOnSignal = contrast(p['signal-ink'], p.signal);
  const a = onSurface >= AA_BODY;
  const b = inkOnSignal >= AA_BODY;
  if (!a) failures++;
  if (!b) failures++;
  console.log(
    `    ${mode.padEnd(5)} signal ${p.signal} on surface-0 ${onSurface.toFixed(2)}:1 ${mark(a)}` +
      `   signal-ink on signal ${inkOnSignal.toFixed(2)}:1 ${mark(b)}`
  );
}

console.log('');
console.log('STATUS COLOURS — used as text, so held to the body-text bar');
console.log('='.repeat(74));
for (const mode of ['light', 'dark']) {
  for (const role of ['status-good', 'status-warn', 'status-info']) {
    // Status colours are declared once in the shared block, so light mode is
    // the fallback when a mode does not override them.
    const c = palette[mode][role] ?? palette.light[role];
    if (!c) continue;
    const cells = SURFACES.map((sf) => {
      const v = contrast(c, palette[mode][sf]);
      const ok = v >= AA_BODY;
      if (!ok) failures++;
      return `${sf.replace('surface-', 's')}=${v.toFixed(2)}${ok ? '' : ' FAIL'}`;
    });
    console.log(`    ${mode.padEnd(5)} ${role.padEnd(11)} ${c}  ${cells.join('  ')}`);
  }
}

console.log('\nSHADCN TOKEN PARITY — src/components/ui must use the same palette');
console.log('='.repeat(74));
for (const mode of ['light', 'dark']) {
  for (const [role, token] of Object.entries(SHADCN_MAP)) {
    const hex = palette[mode][token];
    const got = shadcnTokens[mode][role];
    if (!hex || !got) {
      console.log(`    FAIL  ${mode.padEnd(5)} --${role} missing (expects ${token})`);
      failures++;
      continue;
    }
    const want = hexToHslTriplet(hex);
    const ok = want === got;
    if (!ok) failures++;
    console.log(
      `    ${mark(ok)}  ${mode.padEnd(5)} --${role.padEnd(10)} ${token.padEnd(9)} ${hex}` +
        (ok ? '' : `  want "${want}" got "${got}"`)
    );
  }
}

console.log('\n' + '='.repeat(74));
console.log(failures === 0 ? 'All checks pass.' : `${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
