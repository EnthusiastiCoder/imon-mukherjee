/**
 * Appearance axes.
 *
 * The design is explored along several INDEPENDENT axes, each expressed as one
 * attribute on <html>:
 *
 *   <html data-variant="bitplane" data-motion="pronounced" data-theme="dark">
 *
 * Axes compose freely: 6 directions x 4 motion levels x 3 themes is 72
 * combinations from one component tree. This is deliberately a registry rather
 * than three hard-coded pairs of functions, because more axes are coming — a new
 * one costs a single entry in AXES plus its CSS, and the switcher, the URL
 * parameters, the persistence and the pre-paint application all pick it up with
 * no further changes.
 *
 * Resolution order for every axis: URL parameter, then localStorage, then the
 * axis default. The URL parameter matters — it is how a specific combination
 * gets shared for review.
 *
 * THEME IS NOT SPECIAL-CASED IN THE CALLER. It declares `systemValue: 'system'`,
 * which means "remove the attribute entirely so the CSS media query decides".
 * That third state is real and is the default; writing an explicit value on first
 * load is what leaves dark-mode visitors on a bright page.
 */

export type AxisId = 'variant' | 'motion' | 'background' | 'theme';

export interface AxisOption {
  value: string;
  name: string;
  note: string;
}

export interface AxisDef {
  id: AxisId;
  /** The data-* attribute name, without the `data-` prefix. */
  attr: string;
  /** Shown as the group heading in the switcher. */
  label: string;
  options: readonly AxisOption[];
  default: string;
  /**
   * When set, this option means "no attribute" — the CSS decides for itself.
   * Used by theme, where absence is how prefers-color-scheme stays in charge.
   */
  systemValue?: string;
  /** Render as a compact segmented row rather than a list. */
  compact?: boolean;
}

export const AXES: readonly AxisDef[] = [
  {
    id: 'variant',
    attr: 'variant',
    label: 'Design direction',
    default: 'bitplane',
    options: [
      { value: 'interferometer', name: 'Interferometer', note: 'Cool instrument panel · condensed' },
      { value: 'bitplane', name: 'Bit Plane', note: 'Amber signal · editorial serif · grid' },
      { value: 'bengal', name: 'Bengal Modern', note: 'Indigo · geometric modernist' },
      { value: 'journal', name: 'Journal', note: 'Scientific publishing · all serif' },
      { value: 'terminal', name: 'Terminal', note: 'Monospaced throughout · austere' },
      { value: 'monograph', name: 'Monograph', note: 'Quiet · maximal whitespace' },
    ],
  },
  {
    id: 'motion',
    attr: 'motion',
    label: 'Motion',
    default: 'pronounced',
    // Five gestures that differ in kind, not amount — see styles/motion.css.
    options: [
      { value: 'still', name: 'Still', note: 'Nothing moves' },
      { value: 'restrained', name: 'Restrained', note: 'Fade only — nothing travels' },
      { value: 'pronounced', name: 'Pronounced', note: 'Directional rise, parallax' },
      { value: 'kinetic', name: 'Kinetic', note: 'Springy overshoot, alternating sides' },
      { value: 'maximalist', name: 'Maximalist', note: '3D tilt and wipe, scrubbed' },
    ],
  },
  {
    // Its own axis rather than a property of the design direction, so any field
    // pairs with any direction. Labels and notes mirror ambient/fields.ts; the
    // field library is the source of truth for what each one actually does.
    id: 'background',
    attr: 'background',
    label: 'Background',
    default: 'auto',
    options: [
      { value: 'auto', name: 'Auto', note: "Match the design direction" },
      { value: 'none', name: 'None', note: 'No field' },
      { value: 'bitplane', name: 'Bit plane', note: 'Cells flipping in the noise floor' },
      { value: 'cipher', name: 'Cipher', note: 'Columns of substituting characters' },
      { value: 'circuit', name: 'Circuit', note: 'Orthogonal traces and vias' },
      { value: 'interferometer', name: 'Interference', note: 'Fringe sets beating' },
      { value: 'waves', name: 'Waves', note: 'Stacked sine bands drifting' },
      { value: 'contour', name: 'Contour', note: 'Topographic lines shifting' },
      { value: 'constellation', name: 'Constellation', note: 'Points linking when close' },
      { value: 'flowfield', name: 'Flow field', note: 'Particles following a current' },
      { value: 'starfield', name: 'Starfield', note: 'Points receding into depth' },
      { value: 'rain', name: 'Rain', note: 'Diagonal streaks' },
      { value: 'halftone', name: 'Halftone', note: 'Dot grid swelling' },
      { value: 'hexgrid', name: 'Hex grid', note: 'Hexagonal lattice pulsing' },
      { value: 'orbits', name: 'Orbits', note: 'Concentric rings turning' },
      { value: 'bengal', name: 'Masses', note: 'Hard geometric forms' },
      { value: 'terminal', name: 'Glyph rain', note: 'Falling characters, scanlines' },
      { value: 'monograph', name: 'Rules', note: 'Long lines drifting' },
      { value: 'journal', name: 'Grain', note: 'Drifting paper texture' },
      { value: 'drift', name: 'Drift', note: 'Slow soft blobs' },
    ],
  },
  {
    id: 'theme',
    attr: 'theme',
    label: 'Theme',
    default: 'system',
    systemValue: 'system',
    compact: true,
    options: [
      { value: 'light', name: 'Light', note: '' },
      { value: 'system', name: 'System', note: 'Follow the OS' },
      { value: 'dark', name: 'Dark', note: '' },
    ],
  },
];

export const axis = (id: AxisId): AxisDef => {
  const found = AXES.find((a) => a.id === id);
  if (!found) throw new Error(`Unknown appearance axis: ${id}`);
  return found;
};

const storageKey = (a: AxisDef) => `ds-${a.id}`;

function isValid(a: AxisDef, v: string | null): v is string {
  return !!v && a.options.some((o) => o.value === v);
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Private mode, or storage disabled. Fall through to the default.
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

/** URL parameter, then stored value, then the axis default. */
export function resolveAxis(id: AxisId): string {
  const a = axis(id);
  if (typeof window === 'undefined') return a.default;
  const fromUrl = new URLSearchParams(window.location.search).get(a.attr);
  if (isValid(a, fromUrl)) return fromUrl;
  const stored = read(storageKey(a));
  return isValid(a, stored) ? stored : a.default;
}

export function applyAxis(id: AxisId, value: string, persist = true) {
  const a = axis(id);
  const root = document.documentElement;
  if (a.systemValue && value === a.systemValue) {
    root.removeAttribute(`data-${a.attr}`);
    if (persist) write(storageKey(a), null);
    return;
  }
  root.setAttribute(`data-${a.attr}`, value);
  if (persist) write(storageKey(a), value);
}

/**
 * Stamp every axis before React mounts, so the first paint is already in the
 * right palette and at the right motion level rather than flashing the default.
 */
export function applyStoredAppearance() {
  if (typeof document === 'undefined') return;
  for (const a of AXES) applyAxis(a.id, resolveAxis(a.id), false);
}

/**
 * True when the appearance switcher should be shown.
 *
 * `?variants=1` LATCHES: it is written to storage so the panel survives every
 * later navigation, including links that do not carry the parameter. Without
 * that it disappeared any time a direction was shared as a plain
 * `?variant=…&motion=…` link, which is most of them — the control for choosing a
 * design should not be something you can lose by following a link to a design.
 *
 * `?variants=0` clears it, which is the only way to turn the panel back off.
 */
export function switcherEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has('variants')) {
    const on = params.get('variants') !== '0';
    write('ds-switcher', on ? '1' : null);
    return on;
  }
  if (read('ds-switcher') === '1') return true;

  /**
   * On by default wherever this is deployed for review, off on the live site.
   *
   * Vercel names a branch preview `<project>-git-<branch>-<scope>.vercel.app`,
   * so the presence of `-git-` distinguishes a preview from production without
   * needing a build flag. Localhost counts as review too. Anything else — the
   * production domain, a custom domain — gets the clean page, so the panel
   * cannot appear to a real visitor.
   */
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host.includes('-git-');
}

/**
 * Does the visitor want motion? Mirrors the CSS guard so JS-driven effects (the
 * number count-up) make the same decision the stylesheet does.
 */
export function motionAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return resolveAxis('motion') !== 'still';
}
