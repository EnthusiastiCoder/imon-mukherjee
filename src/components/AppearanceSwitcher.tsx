import { useEffect, useState } from 'react';
import { AXES, applyAxis, resolveAxis, switcherEnabled, type AxisId } from '@/lib/appearance';

/**
 * Review control for every appearance axis.
 *
 * Renders itself from the AXES registry rather than hard-coding controls, so a
 * new axis appears here automatically — that is the point of the registry, since
 * more axes are planned.
 *
 * Shown only with `?variants=1` in the URL, so the live site is unaffected.
 *
 * Styled with literal values rather than design tokens on purpose: it has to stay
 * legible while the tokens around it change underneath, and a panel that
 * restyled itself with every selection would make the options harder to compare
 * rather than easier. For the same reason it opts out of the motion system — a
 * switcher that animated when you changed the motion level would be measuring
 * itself.
 */
export function AppearanceSwitcher() {
  const [enabled] = useState(switcherEnabled);
  const [open, setOpen] = useState(true);
  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(AXES.map((a) => [a.id, resolveAxis(a.id)]))
  );

  const choose = (id: AxisId, value: string) => {
    setSelection((prev) => ({ ...prev, [id]: value }));
    applyAxis(id, value);
  };

  // Number keys cycle the design direction, m cycles motion, d toggles dark.
  // Faster than clicking when comparing, and it keeps the panel out of the way.
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement && /input|textarea|select/i.test(t.tagName)) return;

      const variants = AXES.find((a) => a.id === 'variant')!.options;
      const n = Number(e.key);
      if (n >= 1 && n <= variants.length) choose('variant', variants[n - 1].value);

      if (e.key === 'm') {
        const motion = AXES.find((a) => a.id === 'motion')!.options;
        const i = motion.findIndex((o) => o.value === selection.motion);
        choose('motion', motion[(i + 1) % motion.length].value);
      }

      if (e.key === 'd') {
        choose('theme', selection.theme === 'dark' ? 'light' : 'dark');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, selection]);

  if (!enabled) return null;

  const shell: React.CSSProperties = {
    position: 'fixed',
    right: '1rem',
    bottom: '1rem',
    zIndex: 9999,
    width: open ? '15.5rem' : 'auto',
    maxHeight: '90vh',
    overflowY: 'auto',
    background: '#111315',
    color: '#f4f4f3',
    border: '1px solid #333',
    borderRadius: '6px',
    boxShadow: '0 8px 32px rgba(0,0,0,.45)',
    font: '12px/1.4 ui-monospace, monospace',
    animation: 'none',
    transition: 'none',
  };

  return (
    <aside aria-label="Appearance options" style={shell}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          padding: '.55rem .7rem',
          background: '#1b1e20',
          borderBottom: open ? '1px solid #333' : 'none',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          fontSize: '10px',
          color: '#9aa0a6',
          position: 'sticky',
          top: 0,
        }}
      >
        <span>Appearance</span>
        <span aria-hidden>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div style={{ padding: '.5rem' }}>
          {AXES.map((a, ai) => (
            <fieldset
              key={a.id}
              style={{
                all: 'unset',
                display: 'block',
                marginTop: ai === 0 ? 0 : '.6rem',
                paddingTop: ai === 0 ? 0 : '.5rem',
                borderTop: ai === 0 ? 'none' : '1px solid #2a2d2f',
              }}
            >
              <legend
                style={{
                  all: 'unset',
                  display: 'block',
                  fontSize: '9px',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: '#6d7378',
                  marginBottom: '.35rem',
                }}
              >
                {a.label}
              </legend>

              {a.compact ? (
                <div style={{ display: 'flex', gap: '2px' }}>
                  {a.options.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => choose(a.id, o.value)}
                      aria-pressed={selection[a.id] === o.value}
                      title={o.note}
                      style={{
                        all: 'unset',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        flex: 1,
                        textAlign: 'center',
                        padding: '.35rem 0',
                        borderRadius: '3px',
                        fontSize: '10px',
                        letterSpacing: '.04em',
                        textTransform: 'uppercase',
                        background: selection[a.id] === o.value ? '#2b6098' : '#1b1e20',
                        color: selection[a.id] === o.value ? '#fff' : '#9aa0a6',
                      }}
                    >
                      {o.name}
                    </button>
                  ))}
                </div>
              ) : (
                a.options.map((o, i) => {
                  const active = selection[a.id] === o.value;
                  return (
                    <button
                      key={o.value}
                      onClick={() => choose(a.id, o.value)}
                      aria-pressed={active}
                      style={{
                        all: 'unset',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        display: 'block',
                        width: '100%',
                        padding: '.35rem .5rem',
                        marginBottom: '2px',
                        borderRadius: '3px',
                        background: active ? '#2b6098' : 'transparent',
                        color: active ? '#fff' : '#d6d8da',
                      }}
                    >
                      <span style={{ display: 'flex', gap: '.5rem', alignItems: 'baseline' }}>
                        {a.id === 'variant' && (
                          <span style={{ opacity: 0.55, minWidth: '.7rem' }}>{i + 1}</span>
                        )}
                        <span style={{ fontWeight: 600 }}>{o.name}</span>
                      </span>
                      {o.note && (
                        <span
                          style={{
                            display: 'block',
                            paddingLeft: a.id === 'variant' ? '1.2rem' : 0,
                            fontSize: '10px',
                            opacity: active ? 0.85 : 0.5,
                          }}
                        >
                          {o.note}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </fieldset>
          ))}

          <p style={{ margin: '.6rem 0 0', fontSize: '10px', color: '#6d7378', lineHeight: 1.5 }}>
            <kbd>1</kbd>–<kbd>6</kbd> direction · <kbd>m</kbd> motion · <kbd>d</kbd> dark
          </p>
        </div>
      )}
    </aside>
  );
}

export default AppearanceSwitcher;
