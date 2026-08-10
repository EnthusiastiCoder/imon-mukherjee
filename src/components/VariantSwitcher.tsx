import { useEffect, useState } from 'react';
import {
  VARIANTS,
  VARIANT_META,
  resolveVariant,
  resolveTheme,
  setVariant,
  setTheme,
  switcherEnabled,
  type Theme,
  type Variant,
} from '@/lib/appearance';

/**
 * Temporary review control: lets Dr. Mukherjee click through all six design
 * directions on the real page, with his real data, and flip light/dark.
 *
 * Shown only when `?variants=1` is in the URL, so the live site is unaffected.
 * Delete this component and its mount in Index.tsx once a direction is chosen.
 *
 * It is styled almost entirely with literal values rather than design tokens on
 * purpose: it has to stay legible while the tokens around it change underneath,
 * and a switcher that restyled itself with each selection would make the six
 * directions harder to compare rather than easier.
 */
export function VariantSwitcher() {
  const [enabled] = useState(switcherEnabled);
  const [variant, setVariantState] = useState<Variant>(resolveVariant);
  const [theme, setThemeState] = useState<Theme>(resolveTheme);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (enabled) setVariant(variant);
  }, [enabled, variant]);

  useEffect(() => {
    if (enabled) setTheme(theme);
  }, [enabled, theme]);

  // Number keys 1-6 jump between directions — faster than clicking when
  // comparing, and it keeps the panel out of the way.
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /input|textarea|select/i.test(e.target.tagName)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= VARIANTS.length) setVariantState(VARIANTS[n - 1]);
      if (e.key === 'd') setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside
      aria-label="Design direction preview"
      style={{
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        zIndex: 9999,
        width: open ? '15rem' : 'auto',
        background: '#111315',
        color: '#f4f4f3',
        border: '1px solid #333',
        borderRadius: '6px',
        boxShadow: '0 8px 32px rgba(0,0,0,.4)',
        font: '12px/1.4 ui-monospace, monospace',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          gap: '.5rem',
          padding: '.55rem .7rem',
          background: '#1b1e20',
          borderBottom: open ? '1px solid #333' : 'none',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          fontSize: '10px',
          color: '#9aa0a6',
        }}
      >
        <span>Design direction</span>
        <span aria-hidden>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div style={{ padding: '.5rem' }}>
          {VARIANTS.map((v, i) => {
            const active = v === variant;
            return (
              <button
                key={v}
                onClick={() => setVariantState(v)}
                aria-pressed={active}
                style={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  display: 'block',
                  width: '100%',
                  padding: '.4rem .5rem',
                  marginBottom: '2px',
                  borderRadius: '3px',
                  background: active ? '#2b6098' : 'transparent',
                  color: active ? '#fff' : '#d6d8da',
                }}
              >
                <span style={{ display: 'flex', gap: '.5rem', alignItems: 'baseline' }}>
                  <span style={{ opacity: 0.55, minWidth: '.75rem' }}>{i + 1}</span>
                  <span style={{ fontWeight: 600 }}>{VARIANT_META[v].name}</span>
                </span>
                <span
                  style={{
                    display: 'block',
                    paddingLeft: '1.25rem',
                    fontSize: '10px',
                    opacity: active ? 0.85 : 0.5,
                  }}
                >
                  {VARIANT_META[v].note}
                </span>
              </button>
            );
          })}

          <div style={{ display: 'flex', gap: '2px', marginTop: '.5rem', borderTop: '1px solid #333', paddingTop: '.5rem' }}>
            {(['light', 'system', 'dark'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setThemeState(t)}
                aria-pressed={theme === t}
                style={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  flex: 1,
                  textAlign: 'center',
                  padding: '.35rem 0',
                  borderRadius: '3px',
                  fontSize: '10px',
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                  background: theme === t ? '#2b6098' : '#1b1e20',
                  color: theme === t ? '#fff' : '#9aa0a6',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <p style={{ margin: '.5rem 0 0', fontSize: '10px', color: '#6d7378' }}>
            Keys 1&ndash;6 switch direction, <kbd>d</kbd> toggles dark.
          </p>
        </div>
      )}
    </aside>
  );
}

export default VariantSwitcher;
