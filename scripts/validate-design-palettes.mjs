/**
 * Validates the redesign's colour system against the dataviz six checks.
 *
 *   node scripts/validate-design-palettes.mjs
 *
 * Exits non-zero on any failure, so it can gate a commit.
 *
 * ── Architecture ────────────────────────────────────────────────────────────
 * An earlier draft gave each visual direction its own "on brand" categorical
 * palette. That was wrong twice over. Practically, it kept failing: tinting the
 * hues toward a direction's mood pushed them out of the lightness band, under the
 * chroma floor, or into collisions — Terminal's violet and magenta came out at
 * ΔE 0.9 under protanopia, i.e. the same colour for those readers. Conceptually
 * it was backwards: categorical hues encode *which entity a datum belongs to*,
 * not the page's mood. Publication type should not change colour because the
 * theme changed.
 *
 * So the system splits in two:
 *
 *   SHARED  one categorical set, fixed entity order, identical across every
 *           direction — validated here against every surface in both modes.
 *
 *   PER-DIRECTION  surface, ink, and a single accent. This is where a direction's
 *           identity lives, along with typography and structure, which carry far
 *           more of it than chart hues ever could.
 *
 * Colour is computable, so it is computed. Do not hand-tune these values without
 * re-running this script.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const SKILL =
  process.env.DATAVIZ_SKILL ||
  'C:/Users/enthu/AppData/Local/Temp/claude/bundled-skills/2.1.226/fa737198c698c62d8512f1844f2bb43c/dataviz';
const VALIDATOR = `${SKILL}/scripts/validate_palette.js`;

/**
 * Shared categorical set — slot order is the entity order and never changes.
 * Slots map to: 1 journals · 2 conferences · 3 book chapters · 4 patents
 * (and equivalently to funding agencies elsewhere on the site).
 */
const CATEGORICAL = {
  light: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100'],
  dark: ['#3987e5', '#d95926', '#199e70', '#c98500'],
};

/**
 * Per-direction identity. `accent` is the single brand colour: links, active
 * states, the emphasised bar in the citation chart. `ink` is body text.
 */
const DIRECTIONS = {
  interferometer: {
    label: 'Interferometer — cool instrument panel, condensed grotesque',
    light: { surface: '#f6f8f9', ink: '#101a1e', accent: '#0d7d8a' },
    dark: { surface: '#0e1519', ink: '#e6eef1', accent: '#2ec4d0' },
  },
  bitplane: {
    label: 'Bit Plane — amber signal, editorial serif, hairline grid',
    light: { surface: '#f7f7f4', ink: '#14170f', accent: '#a35f00' },
    dark: { surface: '#11150f', ink: '#eceee4', accent: '#e8a33d' },
  },
  bengal: {
    label: 'Bengal Modern — indigo and madder, geometric modernist',
    light: { surface: '#f4f4f7', ink: '#15152a', accent: '#3f38b8' },
    dark: { surface: '#14141f', ink: '#e8e8f2', accent: '#8b83e8' },
  },
  journal: {
    label: 'Journal — scientific publishing, numbered sections',
    light: { surface: '#fdfdfb', ink: '#16181c', accent: '#9c1f35' },
    dark: { surface: '#16181c', ink: '#ecedef', accent: '#e0788c' },
  },
  terminal: {
    label: 'Terminal — austere, monospaced throughout',
    light: { surface: '#fbfbfa', ink: '#0e1110', accent: '#0f766e' },
    dark: { surface: '#0b0d0c', ink: '#e4e8e6', accent: '#2dd4bf' },
  },
  monograph: {
    label: 'Monograph — near-monochrome, category encoded typographically',
    light: { surface: '#fbfbfa', ink: '#1a1a19', accent: '#2b6098' },
    dark: { surface: '#17191a', ink: '#eaeae8', accent: '#8fb4dc' },
  },
};

/** WCAG relative-luminance contrast ratio. */
function contrast(a, b) {
  const lum = (hex) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl);
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function categoricalReport(palette, mode, surface) {
  try {
    return execFileSync('node', [VALIDATOR, palette.join(','), '--mode', mode, '--surface', surface], {
      encoding: 'utf8',
    });
  } catch (err) {
    return `${err.stdout || ''}${err.stderr || ''}`;
  }
}

if (!existsSync(VALIDATOR)) {
  console.error(`Validator not found at ${VALIDATOR}\nSet DATAVIZ_SKILL to the dataviz skill directory.`);
  process.exit(2);
}

let failures = 0;
const mark = (ok) => (ok ? 'PASS' : 'FAIL');

console.log('\nSHARED CATEGORICAL SET — checked against every direction surface');
console.log('='.repeat(74));
for (const mode of ['light', 'dark']) {
  console.log(`  ${mode}: ${CATEGORICAL[mode].join('  ')}`);
  for (const [key, dir] of Object.entries(DIRECTIONS)) {
    const surface = dir[mode].surface;
    const report = categoricalReport(CATEGORICAL[mode], mode, surface);
    const ok = /ALL CHECKS PASS/.test(report);
    if (!ok) failures++;
    console.log(`    ${mark(ok)}  on ${surface}  (${key})`);
    if (!ok) {
      for (const l of report.split('\n').filter((l) => /\[(FAIL|WARN)\]/.test(l))) {
        console.log(`          ${l.trim().replace(/\s{2,}/g, ' ')}`);
      }
    }
  }
}

console.log('\nPER-DIRECTION IDENTITY — ink and accent contrast');
console.log('='.repeat(74));
console.log('  ink needs >= 4.5:1 (body text) · accent >= 4.5:1 (it is used on links)\n');
for (const [key, dir] of Object.entries(DIRECTIONS)) {
  console.log(`  ${dir.label}`);
  for (const mode of ['light', 'dark']) {
    const { surface, ink, accent } = dir[mode];
    const inkRatio = contrast(ink, surface);
    const accRatio = contrast(accent, surface);
    const inkOk = inkRatio >= 4.5;
    const accOk = accRatio >= 4.5;
    if (!inkOk) failures++;
    if (!accOk) failures++;
    console.log(
      `    ${mode.padEnd(5)} ink ${ink} ${inkRatio.toFixed(2).padStart(5)}:1 ${mark(inkOk)}` +
        `   accent ${accent} ${accRatio.toFixed(2).padStart(5)}:1 ${mark(accOk)}`
    );
  }
}

console.log('\n' + '='.repeat(74));
console.log(failures === 0 ? 'All checks pass.' : `${failures} check(s) failed — fix before building.`);
process.exit(failures === 0 ? 0 : 1);
