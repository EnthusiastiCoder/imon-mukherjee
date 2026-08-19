import { useEffect, useRef, useState } from 'react';
import { FIELDS, VARIANT_DEFAULT_FIELD, type FieldState } from '@/components/ambient/fields';

/**
 * The ambient background layer.
 *
 * One canvas behind the whole page, drawing whichever field the `background`
 * appearance axis selects. The field library lives in ambient/fields.ts; this
 * component is only the host — sizing, the frame loop, cost control, and
 * reacting to appearance changes.
 *
 * Background is its own axis rather than a property of the design direction, so
 * any field pairs with any direction. `auto` maps each direction to the field it
 * was originally designed around.
 *
 * Cost control, since this runs behind real content on a very long page:
 *   - device pixel ratio capped at 1.5
 *   - each field declares its own frame budget; most need nowhere near 60fps
 *   - an IntersectionObserver stops the loop when the canvas is off-screen
 *   - nothing mounts at all under prefers-reduced-motion, or at the `still` and
 *     `restrained` motion levels
 */

function tokens() {
  const cs = getComputedStyle(document.documentElement);
  const read = (n: string, fallback: string) => cs.getPropertyValue(n).trim() || fallback;
  return {
    ink: rgb(read('--ink-1', '#111')),
    muted: rgb(read('--ink-3', '#777')),
    signal: rgb(read('--signal', '#888')),
    rule: rgb(read('--rule', '#ddd')),
    surface: rgb(read('--surface-0', '#fff')),
  };
}

/** #rrggbb -> "r,g,b", so fields can apply their own alpha per draw. */
function rgb(hex: string): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return '128,128,128';
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}

function resolveField(): string | null {
  const root = document.documentElement;
  const chosen = root.dataset.background ?? 'auto';
  if (chosen === 'none') return null;
  if (chosen === 'auto') {
    return VARIANT_DEFAULT_FIELD[root.dataset.variant ?? 'bitplane'] ?? 'bitplane';
  }
  return FIELDS[chosen] ? chosen : null;
}

export function AmbientCanvas({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  // Bumped whenever an appearance attribute changes, to restart the loop with
  // the new field and freshly read tokens.
  const [epoch, setEpoch] = useState(0);

  // The axes live as attributes on <html>, changed imperatively by the switcher
  // and the theme toggle, so a MutationObserver is how this learns about them.
  useEffect(() => {
    const obs = new MutationObserver(() => setEpoch((e) => e + 1));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-background', 'data-variant', 'data-theme', 'data-motion'],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    /**
     * Wipe before any early return. Switching to "None" — or down to a motion
     * level with no field — previously just stopped the loop, which left the
     * previous field's last frame frozen on screen rather than removing it.
     */
    const wipe = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    const root = document.documentElement;
    const motion = root.dataset.motion ?? 'pronounced';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wipe();
      return;
    }
    // Ambient motion is a personality feature; it belongs to the louder levels.
    if (motion === 'still' || motion === 'restrained') {
      wipe();
      return;
    }

    const fieldKey = resolveField();
    if (!fieldKey) {
      wipe();
      return;
    }
    const field = FIELDS[fieldKey];

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const state: FieldState = { ctx, w: 0, h: 0, t: 0, c: tokens(), store: {} };
    let raf = 0;
    let running = true;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      // Bail when nothing actually changed. Writing canvas.width WIPES the
      // canvas, and ResizeObserver fires on observe and again on any layout
      // settle, so an unguarded resize blanked the field repeatedly at random —
      // which looked exactly like individual fields failing to draw.
      if (w === state.w && h === state.h) return;
      state.w = w;
      state.h = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initField();
    };

    // Persistent state is sized to the canvas, so it is rebuilt whenever the
    // canvas is reallocated — and once on setup, because switching field
    // without a size change must still give the new field its own store.
    const initField = () => {
      state.store = {};
      field.init?.(state);
    };

    const budget = 1000 / (field.fps || 24);
    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < budget) return;
      last = now;
      state.t += 0.06;
      ctx.clearRect(0, 0, state.w, state.h);
      field.draw(state);
    };

    resize();
    // resize() is a no-op when the size is unchanged, which is the common case
    // when only the field changed, so init explicitly here too.
    initField();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: '80px' }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // Deliberately no clearRect here. The next effect's resize reallocates the
      // canvas anyway, and clearing on teardown left a visible blank frame every
      // time an appearance axis changed.
    };
  }, [epoch]);

  return (
    <canvas
      ref={ref}
      className={className}
      // Purely decorative: no accessible name, never a tab stop, never
      // intercepts a click meant for the content above it.
      aria-hidden="true"
      style={{ pointerEvents: 'none', ...style }}
    />
  );
}

export default AmbientCanvas;
