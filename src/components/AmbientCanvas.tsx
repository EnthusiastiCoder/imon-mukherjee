import { useEffect, useRef } from 'react';

/**
 * The ambient background layer — the page's actual personality.
 *
 * One canvas, a different generative field per design direction, so the
 * background is where each direction stops being a palette and becomes a world:
 *
 *   bitplane        a bit-plane whose cells flip between two shades. This is
 *                   literally least-significant-bit steganography: a payload
 *                   hiding in noise nobody looks at. Occasionally a cluster
 *                   flips in unison and a shape surfaces, then dissolves.
 *   interferometer  interference fringes drifting and beating against each
 *                   other, the pattern an optical bench actually produces.
 *   bengal          hard geometric masses rotating and sliding — modernist
 *                   composition in motion, no gradients.
 *   journal         drifting paper grain and faint rule lines, like a page held
 *                   up to light.
 *   terminal        sparse falling glyphs, cut with scanlines.
 *   monograph       nothing. Restraint is that direction's whole identity, and
 *                   the way to express it is to leave the canvas empty.
 *
 * Canvas rather than SVG or DOM because these are generative fields with
 * hundreds of cells — the design guidance is explicit that generative graphics
 * belong on a canvas, and animating hundreds of DOM nodes would be far worse.
 *
 * Cost control, since this runs behind real content:
 *   - device pixel ratio capped at 1.5
 *   - each mode declares its own frame budget; the bit field only needs ~12fps
 *   - an IntersectionObserver stops the loop entirely when scrolled past
 *   - honours prefers-reduced-motion and the `still`/`restrained` motion levels
 *     by not mounting the loop at all
 *
 * Colours are read from the design tokens at runtime, so the field re-tints when
 * the direction or theme changes rather than carrying its own palette.
 */

type Mode = 'bitplane' | 'interferometer' | 'bengal' | 'journal' | 'terminal' | 'monograph';

const FPS: Record<Mode, number> = {
  bitplane: 12,
  interferometer: 30,
  bengal: 30,
  journal: 8,
  terminal: 14,
  monograph: 0,
};

function tokens() {
  const cs = getComputedStyle(document.documentElement);
  const read = (n: string, fallback: string) => cs.getPropertyValue(n).trim() || fallback;
  return {
    ink: read('--ink-1', '#111'),
    muted: read('--ink-3', '#777'),
    signal: read('--signal', '#888'),
    rule: read('--rule', '#ddd'),
    surface: read('--surface-0', '#fff'),
  };
}

/** #rrggbb -> "r,g,b" so alpha can be applied per draw. */
function rgb(hex: string): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return '128,128,128';
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}

export function AmbientCanvas({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const root = document.documentElement;
    const motion = root.dataset.motion ?? 'pronounced';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Ambient motion is a personality feature, so it belongs to the louder
    // levels. At still and restrained the canvas stays blank by design.
    if (reduced || motion === 'still' || motion === 'restrained') return;

    const mode = (root.dataset.variant ?? 'bitplane') as Mode;
    if (mode === 'monograph') return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let last = 0;
    let t = 0;

    // Bit-plane state, allocated on resize.
    let cols = 0;
    let rows = 0;
    let bits: Uint8Array = new Uint8Array(0);
    const CELL = 14;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      bits = new Uint8Array(cols * rows);
      for (let i = 0; i < bits.length; i++) bits[i] = Math.random() < 0.5 ? 1 : 0;
    };

    const draw = (mode: Mode) => {
      const c = tokens();
      ctx.clearRect(0, 0, w, h);

      if (mode === 'bitplane') {
        // Flip a small random share of cells each frame — the noise floor that
        // a hidden payload lives in.
        const flips = Math.floor(bits.length * 0.02);
        for (let i = 0; i < flips; i++) {
          const idx = (Math.random() * bits.length) | 0;
          bits[idx] ^= 1;
        }
        // Every so often a contiguous block flips together, so a shape briefly
        // surfaces out of the noise and then dissolves back into it.
        if (Math.random() < 0.03) {
          const bw = 4 + ((Math.random() * 7) | 0);
          const bh = 3 + ((Math.random() * 5) | 0);
          const bx = (Math.random() * Math.max(1, cols - bw)) | 0;
          const by = (Math.random() * Math.max(1, rows - bh)) | 0;
          const v = Math.random() < 0.5 ? 1 : 0;
          for (let y = by; y < by + bh; y++)
            for (let x = bx; x < bx + bw; x++) bits[y * cols + x] = v;
        }
        const base = rgb(c.muted);
        const sig = rgb(c.signal);
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (!bits[y * cols + x]) continue;
            const nearSignal = (x * 7 + y * 13) % 97 < 4;
            ctx.fillStyle = nearSignal ? `rgba(${sig},0.16)` : `rgba(${base},0.09)`;
            ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 3, CELL - 3);
          }
        }
        return;
      }

      if (mode === 'interferometer') {
        // Two fringe sets at slightly different periods, beating against each
        // other the way an interferometer's output actually does.
        const base = rgb(c.signal);
        ctx.lineWidth = 1;
        for (let i = 0; i < 2; i++) {
          const period = 26 + i * 3;
          const phase = t * (0.35 + i * 0.12);
          const angle = 0.18 + i * 0.06;
          ctx.save();
          ctx.translate(w / 2, h / 2);
          ctx.rotate(angle);
          ctx.translate(-w / 2, -h / 2);
          for (let x = -h; x < w + h; x += period) {
            const off = Math.sin((x + phase * 40) / 90) * 14;
            ctx.strokeStyle = `rgba(${base},${0.05 + 0.03 * Math.sin((x + phase * 30) / 60)})`;
            ctx.beginPath();
            ctx.moveTo(x + off, -h);
            ctx.lineTo(x + off, h * 2);
            ctx.stroke();
          }
          ctx.restore();
        }
        return;
      }

      if (mode === 'bengal') {
        // Hard-edged masses, no gradients — the modernist idiom this direction
        // sits in builds with solid form.
        const sig = rgb(c.signal);
        const ink = rgb(c.muted);
        const shapes = 7;
        for (let i = 0; i < shapes; i++) {
          const p = t * 0.12 + i * 1.7;
          const cx = (Math.sin(p * 0.5 + i) * 0.5 + 0.5) * w;
          const cy = (Math.cos(p * 0.37 + i * 2) * 0.5 + 0.5) * h;
          const size = 60 + ((i * 37) % 90);
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(p * 0.15 + i);
          ctx.fillStyle = i % 3 === 0 ? `rgba(${sig},0.07)` : `rgba(${ink},0.05)`;
          if (i % 2 === 0) ctx.fillRect(-size / 2, -size / 2, size, size);
          else {
            ctx.beginPath();
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(size / 2, size / 2);
            ctx.lineTo(-size / 2, size / 2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }
        return;
      }

      if (mode === 'journal') {
        // Drifting grain plus a couple of faint rules: a page held to the light.
        const ink = rgb(c.muted);
        const n = Math.floor((w * h) / 5200);
        for (let i = 0; i < n; i++) {
          const x = (Math.sin(i * 12.9898 + t * 0.02) * 43758.5453) % 1;
          const y = (Math.sin(i * 78.233 + t * 0.013) * 43758.5453) % 1;
          ctx.fillStyle = `rgba(${ink},0.055)`;
          ctx.fillRect(Math.abs(x) * w, Math.abs(y) * h, 1.5, 1.5);
        }
        ctx.strokeStyle = `rgba(${rgb(c.signal)},0.05)`;
        ctx.lineWidth = 1;
        for (let i = 1; i < 3; i++) {
          const y = (h / 3) * i + Math.sin(t * 0.2 + i) * 6;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        return;
      }

      if (mode === 'terminal') {
        const sig = rgb(c.signal);
        const glyphs = '01<>{}[]/\\|+=*#$%&';
        ctx.font = '12px ui-monospace, monospace';
        const columns = Math.floor(w / 26);
        for (let i = 0; i < columns; i++) {
          const speed = 0.35 + ((i * 37) % 10) / 14;
          const y = ((t * speed * 30 + i * 140) % (h + 160)) - 80;
          ctx.fillStyle = `rgba(${sig},0.13)`;
          ctx.fillText(glyphs[(i + Math.floor(t)) % glyphs.length], i * 26 + 8, y);
          ctx.fillStyle = `rgba(${sig},0.06)`;
          ctx.fillText(glyphs[(i * 3 + Math.floor(t * 0.5)) % glyphs.length], i * 26 + 8, y - 26);
        }
        // Scanlines.
        ctx.fillStyle = `rgba(${rgb(c.muted)},0.035)`;
        for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1);
        return;
      }
    };

    const budget = 1000 / (FPS[mode] || 24);
    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < budget) return;
      last = now;
      t += 0.06;
      draw(mode);
    };

    resize();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw(mode);
    });
    ro.observe(canvas);

    // Stop entirely once scrolled past — no reason to burn frames on a field
    // nobody can see.
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
    };
  }, []);

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
