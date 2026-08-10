/**
 * Appearance state: which design direction is showing, and which theme.
 *
 * These are two independent axes, both expressed as attributes on <html>:
 *
 *   <html data-variant="bitplane" data-theme="dark">
 *
 * `data-theme` may be absent, which is the honest third state: "follow the OS".
 * The CSS is written for all three (see src/styles/design-system.css) — an
 * absent attribute is not the same as light, and treating it as light is how
 * pages end up bright on a dark-mode phone.
 *
 * The variant axis exists only while Dr. Mukherjee is choosing a direction. Once
 * he picks one, this collapses to a constant and the switcher is deleted.
 */

export const VARIANTS = [
  'interferometer',
  'bitplane',
  'bengal',
  'journal',
  'terminal',
  'monograph',
] as const;

export type Variant = (typeof VARIANTS)[number];

/** Human-facing names and one-line descriptions, used by the switcher. */
export const VARIANT_META: Record<Variant, { name: string; note: string }> = {
  interferometer: { name: 'Interferometer', note: 'Cool instrument panel · condensed' },
  bitplane: { name: 'Bit Plane', note: 'Amber signal · editorial serif · grid' },
  bengal: { name: 'Bengal Modern', note: 'Indigo · geometric modernist' },
  journal: { name: 'Journal', note: 'Scientific publishing · numbered' },
  terminal: { name: 'Terminal', note: 'Monospaced throughout · austere' },
  monograph: { name: 'Monograph', note: 'Quiet · maximal whitespace' },
};

export type Theme = 'light' | 'dark' | 'system';

const VARIANT_KEY = 'ds-variant';
const THEME_KEY = 'ds-theme';

export const DEFAULT_VARIANT: Variant = 'bitplane';

function isVariant(v: string | null): v is Variant {
  return !!v && (VARIANTS as readonly string[]).includes(v);
}

/**
 * A `?variant=` query parameter wins over stored state, so a link can carry a
 * specific direction — which is how the six get shared for review.
 */
export function resolveVariant(): Variant {
  if (typeof window === 'undefined') return DEFAULT_VARIANT;
  const fromUrl = new URLSearchParams(window.location.search).get('variant');
  if (isVariant(fromUrl)) return fromUrl;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(VARIANT_KEY);
  } catch {
    /* private mode / storage disabled — fall through to the default */
  }
  return isVariant(stored) ? stored : DEFAULT_VARIANT;
}

export function resolveTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const fromUrl = new URLSearchParams(window.location.search).get('theme');
  if (fromUrl === 'light' || fromUrl === 'dark') return fromUrl;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_KEY);
  } catch {
    /* ignore */
  }
  return stored === 'light' || stored === 'dark' ? stored : 'system';
}

export function setVariant(v: Variant) {
  document.documentElement.setAttribute('data-variant', v);
  try {
    window.localStorage.setItem(VARIANT_KEY, v);
  } catch {
    /* ignore */
  }
}

export function setTheme(t: Theme) {
  const root = document.documentElement;
  // 'system' removes the attribute entirely rather than writing a value, so the
  // prefers-color-scheme media query is what decides.
  if (t === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', t);
  try {
    if (t === 'system') window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, t);
  } catch {
    /* ignore */
  }
}

/** Called before React mounts so the first paint is already correct. */
export function applyStoredAppearance() {
  if (typeof document === 'undefined') return;
  setVariant(resolveVariant());
  setTheme(resolveTheme());
}

/** True when the variant switcher should be shown. */
export function switcherEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has('variants')) return params.get('variants') !== '0';
  try {
    return window.localStorage.getItem('ds-switcher') === '1';
  } catch {
    return false;
  }
}
