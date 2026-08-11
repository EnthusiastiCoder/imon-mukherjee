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

export type AxisId = 'variant' | 'motion' | 'theme';

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
  return read('ds-switcher') === '1';
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
