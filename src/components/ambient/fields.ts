/**
 * Ambient background fields.
 *
 * Each field is a small generative animation drawn to a canvas behind the whole
 * page. They are a separate appearance axis from the design direction, so any
 * field can be paired with any direction.
 *
 * Every field:
 *   - draws with colours read from the design tokens at runtime, passed in as
 *     "r,g,b" strings so alpha can be applied per draw. A field therefore
 *     re-tints itself when the direction or theme changes instead of carrying
 *     its own palette.
 *   - declares its own frame budget. Most of these do not need 60fps, and a
 *     field that only needs 10 costs a sixth as much as one that asks for 60.
 *   - keeps any persistent state (particles, grids) in `store`, reallocated by
 *     `init` whenever the canvas resizes.
 *
 * Keep them cheap: this runs behind real content on a very long page.
 */

export interface FieldState {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Monotonic time, advanced once per drawn frame. */
  t: number;
  c: { ink: string; muted: string; signal: string; rule: string; surface: string };
  /**
   * Per-field persistent state (particle arrays, grids), rebuilt by `init`
   * whenever the canvas is reallocated. Deliberately loose: each field owns the
   * shape of its own store and nothing else reads it.
   */
  store: Record<string, unknown>;
}

export interface Field {
  label: string;
  note: string;
  fps: number;
  init?: (s: FieldState) => void;
  draw: (s: FieldState) => void;
}

/** Deterministic pseudo-random, so fields look the same across reloads. */
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const FIELDS: Record<string, Field> = {
  /* ── Derived from the subject ──────────────────────────────────────────── */

  bitplane: {
    label: 'Bit plane',
    note: 'Cells flipping in the noise floor',
    fps: 12,
    init(s) {
      const cell = 14;
      const cols = Math.ceil(s.w / cell);
      const rows = Math.ceil(s.h / cell);
      s.store.cell = cell;
      s.store.cols = cols;
      s.store.rows = rows;
      s.store.bits = new Uint8Array(cols * rows).map(() => (Math.random() < 0.5 ? 1 : 0));
    },
    draw(s) {
      const cell = s.store.cell as number;
      const cols = s.store.cols as number;
      const rows = s.store.rows as number;
      const bits = s.store.bits as Uint8Array;
      for (let i = 0; i < bits.length * 0.02; i++) bits[(Math.random() * bits.length) | 0] ^= 1;
      // Occasionally a block flips together, so a shape surfaces then dissolves.
      if (Math.random() < 0.03) {
        const bw = 4 + ((Math.random() * 7) | 0);
        const bh = 3 + ((Math.random() * 5) | 0);
        const bx = (Math.random() * Math.max(1, cols - bw)) | 0;
        const by = (Math.random() * Math.max(1, rows - bh)) | 0;
        const v = Math.random() < 0.5 ? 1 : 0;
        for (let y = by; y < by + bh; y++)
          for (let x = bx; x < bx + bw; x++) bits[y * cols + x] = v;
      }
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!bits[y * cols + x]) continue;
          const hot = (x * 7 + y * 13) % 97 < 4;
          s.ctx.fillStyle = hot ? `rgba(${s.c.signal},0.16)` : `rgba(${s.c.muted},0.09)`;
          s.ctx.fillRect(x * cell + 1, y * cell + 1, cell - 3, cell - 3);
        }
      }
    },
  },

  cipher: {
    label: 'Cipher',
    note: 'Columns of substituting characters',
    fps: 10,
    draw(s) {
      const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&@';
      s.ctx.font = '11px ui-monospace, monospace';
      const cols = Math.floor(s.w / 22);
      const rows = Math.floor(s.h / 20);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const seed = x * 31 + y * 17;
          if (rand(seed + Math.floor(s.t * 0.6)) > 0.93) {
            const hot = rand(seed) > 0.97;
            s.ctx.fillStyle = hot ? `rgba(${s.c.signal},0.3)` : `rgba(${s.c.muted},0.12)`;
            const g = glyphs[Math.floor(rand(seed + Math.floor(s.t)) * glyphs.length)];
            s.ctx.fillText(g, x * 22 + 6, y * 20 + 14);
          }
        }
      }
    },
  },

  circuit: {
    label: 'Circuit',
    note: 'Orthogonal traces and vias',
    fps: 8,
    init(s) {
      const paths: { pts: number[][]; seed: number }[] = [];
      for (let i = 0; i < 26; i++) {
        const pts: number[][] = [];
        let x = rand(i) * s.w;
        let y = rand(i + 99) * s.h;
        pts.push([x, y]);
        for (let k = 0; k < 5; k++) {
          const len = 40 + rand(i * 7 + k) * 130;
          if (k % 2 === 0) x += rand(i + k) > 0.5 ? len : -len;
          else y += rand(i + k * 3) > 0.5 ? len : -len;
          pts.push([x, y]);
        }
        paths.push({ pts, seed: i });
      }
      s.store.paths = paths;
    },
    draw(s) {
      s.ctx.lineWidth = 1;
      for (const p of s.store.paths as { pts: number[][]; seed: number }[]) {
        const pulse = (Math.sin(s.t * 0.5 + p.seed) + 1) / 2;
        s.ctx.strokeStyle = `rgba(${s.c.muted},${0.05 + pulse * 0.05})`;
        s.ctx.beginPath();
        p.pts.forEach(([x, y], i) => {
          if (i) s.ctx.lineTo(x, y);
          else s.ctx.moveTo(x, y);
        });
        s.ctx.stroke();
        // A via at the end of each trace, lighting in sequence.
        const [ex, ey] = p.pts[p.pts.length - 1];
        s.ctx.fillStyle = `rgba(${s.c.signal},${0.08 + pulse * 0.22})`;
        s.ctx.beginPath();
        s.ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        s.ctx.fill();
      }
    },
  },

  /* ── Optical and wave ──────────────────────────────────────────────────── */

  interferometer: {
    label: 'Interference',
    note: 'Fringe sets beating against each other',
    fps: 30,
    draw(s) {
      s.ctx.lineWidth = 1;
      for (let i = 0; i < 2; i++) {
        const period = 26 + i * 3;
        const phase = s.t * (0.35 + i * 0.12);
        s.ctx.save();
        s.ctx.translate(s.w / 2, s.h / 2);
        s.ctx.rotate(0.18 + i * 0.06);
        s.ctx.translate(-s.w / 2, -s.h / 2);
        for (let x = -s.h; x < s.w + s.h; x += period) {
          const off = Math.sin((x + phase * 40) / 90) * 14;
          s.ctx.strokeStyle = `rgba(${s.c.signal},${0.05 + 0.03 * Math.sin((x + phase * 30) / 60)})`;
          s.ctx.beginPath();
          s.ctx.moveTo(x + off, -s.h);
          s.ctx.lineTo(x + off, s.h * 2);
          s.ctx.stroke();
        }
        s.ctx.restore();
      }
    },
  },

  waves: {
    label: 'Waves',
    note: 'Stacked sine bands drifting',
    fps: 30,
    draw(s) {
      const bands = 7;
      s.ctx.lineWidth = 1.5;
      for (let b = 0; b < bands; b++) {
        const yBase = (s.h / (bands - 1)) * b;
        const amp = 18 + b * 4;
        const speed = 0.25 + b * 0.05;
        s.ctx.strokeStyle = b % 3 === 0 ? `rgba(${s.c.signal},0.10)` : `rgba(${s.c.muted},0.07)`;
        s.ctx.beginPath();
        for (let x = 0; x <= s.w; x += 8) {
          const y = yBase + Math.sin(x / 130 + s.t * speed + b) * amp;
          if (x) s.ctx.lineTo(x, y);
          else s.ctx.moveTo(x, y);
        }
        s.ctx.stroke();
      }
    },
  },

  contour: {
    label: 'Contour',
    note: 'Topographic lines shifting',
    fps: 20,
    draw(s) {
      const step = 26;
      s.ctx.lineWidth = 1;
      for (let level = 0; level < 9; level++) {
        s.ctx.strokeStyle =
          level % 4 === 0 ? `rgba(${s.c.signal},0.09)` : `rgba(${s.c.muted},0.055)`;
        s.ctx.beginPath();
        for (let x = 0; x <= s.w; x += 10) {
          const n =
            Math.sin(x / 190 + s.t * 0.12) * 46 +
            Math.sin(x / 70 - s.t * 0.08) * 22 +
            Math.cos(x / 320 + s.t * 0.05) * 60;
          const y = level * step * 2 + n + 40;
          if (x) s.ctx.lineTo(x, y);
          else s.ctx.moveTo(x, y);
        }
        s.ctx.stroke();
      }
    },
  },

  /* ── Particle ──────────────────────────────────────────────────────────── */

  constellation: {
    label: 'Constellation',
    note: 'Points linking when they drift close',
    fps: 30,
    init(s) {
      const n = Math.min(70, Math.round((s.w * s.h) / 26000));
      s.store.pts = Array.from({ length: n }, (_, i) => ({
        x: rand(i) * s.w,
        y: rand(i + 50) * s.h,
        vx: (rand(i + 100) - 0.5) * 0.32,
        vy: (rand(i + 150) - 0.5) * 0.32,
      }));
    },
    draw(s) {
      const pts = s.store.pts as { x: number; y: number; vx: number; vy: number }[];
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > s.w) p.vx *= -1;
        if (p.y < 0 || p.y > s.h) p.vy *= -1;
      }
      s.ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 20000) continue;
          s.ctx.strokeStyle = `rgba(${s.c.muted},${0.09 * (1 - d2 / 20000)})`;
          s.ctx.beginPath();
          s.ctx.moveTo(pts[i].x, pts[i].y);
          s.ctx.lineTo(pts[j].x, pts[j].y);
          s.ctx.stroke();
        }
      }
      for (const p of pts) {
        s.ctx.fillStyle = `rgba(${s.c.signal},0.22)`;
        s.ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
    },
  },

  flowfield: {
    label: 'Flow field',
    note: 'Particles following a drifting current',
    fps: 30,
    init(s) {
      s.store.parts = Array.from({ length: 260 }, (_, i) => ({
        x: rand(i) * s.w,
        y: rand(i + 7) * s.h,
        life: rand(i + 13) * 100,
      }));
    },
    draw(s) {
      const parts = s.store.parts as { x: number; y: number; life: number }[];
      s.ctx.lineWidth = 1;
      for (const p of parts) {
        const a =
          Math.sin(p.x / 170 + s.t * 0.1) * 2 + Math.cos(p.y / 140 - s.t * 0.08) * 2;
        const nx = p.x + Math.cos(a) * 1.5;
        const ny = p.y + Math.sin(a) * 1.5;
        s.ctx.strokeStyle = `rgba(${s.c.muted},0.07)`;
        s.ctx.beginPath();
        s.ctx.moveTo(p.x, p.y);
        s.ctx.lineTo(nx, ny);
        s.ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (--p.life < 0 || p.x < 0 || p.x > s.w || p.y < 0 || p.y > s.h) {
          p.x = Math.random() * s.w;
          p.y = Math.random() * s.h;
          p.life = 60 + Math.random() * 90;
        }
      }
    },
  },

  starfield: {
    label: 'Starfield',
    note: 'Points receding into depth',
    fps: 30,
    init(s) {
      s.store.stars = Array.from({ length: 150 }, (_, i) => ({
        x: rand(i) * 2 - 1,
        y: rand(i + 31) * 2 - 1,
        z: rand(i + 61),
      }));
    },
    draw(s) {
      const cx = s.w / 2;
      const cy = s.h / 2;
      for (const st of s.store.stars as { x: number; y: number; z: number }[]) {
        st.z -= 0.0022;
        if (st.z <= 0.02) {
          st.z = 1;
          st.x = Math.random() * 2 - 1;
          st.y = Math.random() * 2 - 1;
        }
        const px = cx + (st.x / st.z) * cx * 0.5;
        const py = cy + (st.y / st.z) * cy * 0.5;
        if (px < 0 || px > s.w || py < 0 || py > s.h) continue;
        const r = (1 - st.z) * 1.9;
        s.ctx.fillStyle = `rgba(${s.c.signal},${0.05 + (1 - st.z) * 0.2})`;
        s.ctx.fillRect(px, py, r, r);
      }
    },
  },

  rain: {
    label: 'Rain',
    note: 'Diagonal streaks',
    fps: 30,
    init(s) {
      s.store.drops = Array.from({ length: 90 }, (_, i) => ({
        x: rand(i) * s.w,
        y: rand(i + 5) * s.h,
        len: 12 + rand(i + 9) * 26,
        sp: 3 + rand(i + 17) * 5,
      }));
    },
    draw(s) {
      s.ctx.lineWidth = 1;
      for (const d of s.store.drops as { x: number; y: number; len: number; sp: number }[]) {
        s.ctx.strokeStyle = `rgba(${s.c.muted},0.10)`;
        s.ctx.beginPath();
        s.ctx.moveTo(d.x, d.y);
        s.ctx.lineTo(d.x - d.len * 0.32, d.y + d.len);
        s.ctx.stroke();
        d.y += d.sp;
        d.x -= d.sp * 0.32;
        if (d.y > s.h) {
          d.y = -d.len;
          d.x = Math.random() * (s.w + 200);
        }
      }
    },
  },

  /* ── Lattice ───────────────────────────────────────────────────────────── */

  halftone: {
    label: 'Halftone',
    note: 'Dot grid swelling under a moving wave',
    fps: 24,
    draw(s) {
      const step = 22;
      for (let y = step / 2; y < s.h; y += step) {
        for (let x = step / 2; x < s.w; x += step) {
          const v =
            (Math.sin(x / 150 + s.t * 0.22) + Math.cos(y / 130 - s.t * 0.17) + 2) / 4;
          const r = v * 4.2;
          if (r < 0.35) continue;
          s.ctx.fillStyle = v > 0.82 ? `rgba(${s.c.signal},0.2)` : `rgba(${s.c.muted},0.1)`;
          s.ctx.beginPath();
          s.ctx.arc(x, y, r, 0, Math.PI * 2);
          s.ctx.fill();
        }
      }
    },
  },

  hexgrid: {
    label: 'Hex grid',
    note: 'Hexagonal lattice pulsing',
    fps: 18,
    draw(s) {
      const R = 26;
      const hStep = R * 1.5;
      const vStep = Math.sqrt(3) * R;
      s.ctx.lineWidth = 1;
      for (let col = 0, x = 0; x < s.w + R; col++, x += hStep) {
        for (let y = (col % 2 ? vStep / 2 : 0); y < s.h + R; y += vStep) {
          const pulse = (Math.sin(s.t * 0.4 + x / 160 + y / 200) + 1) / 2;
          s.ctx.strokeStyle =
            pulse > 0.88 ? `rgba(${s.c.signal},0.16)` : `rgba(${s.c.muted},0.05)`;
          s.ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            const px = x + Math.cos(a) * R;
            const py = y + Math.sin(a) * R;
            if (i) s.ctx.lineTo(px, py);
            else s.ctx.moveTo(px, py);
          }
          s.ctx.closePath();
          s.ctx.stroke();
        }
      }
    },
  },

  bengal: {
    label: 'Masses',
    note: 'Hard geometric forms, no gradients',
    fps: 30,
    draw(s) {
      for (let i = 0; i < 7; i++) {
        const p = s.t * 0.12 + i * 1.7;
        const cx = (Math.sin(p * 0.5 + i) * 0.5 + 0.5) * s.w;
        const cy = (Math.cos(p * 0.37 + i * 2) * 0.5 + 0.5) * s.h;
        const size = 60 + ((i * 37) % 90);
        s.ctx.save();
        s.ctx.translate(cx, cy);
        s.ctx.rotate(p * 0.15 + i);
        s.ctx.fillStyle = i % 3 === 0 ? `rgba(${s.c.signal},0.07)` : `rgba(${s.c.muted},0.05)`;
        if (i % 2 === 0) s.ctx.fillRect(-size / 2, -size / 2, size, size);
        else {
          s.ctx.beginPath();
          s.ctx.moveTo(0, -size / 2);
          s.ctx.lineTo(size / 2, size / 2);
          s.ctx.lineTo(-size / 2, size / 2);
          s.ctx.closePath();
          s.ctx.fill();
        }
        s.ctx.restore();
      }
    },
  },

  orbits: {
    label: 'Orbits',
    note: 'Concentric rings turning at different rates',
    fps: 30,
    draw(s) {
      const cx = s.w * 0.72;
      const cy = s.h * 0.4;
      s.ctx.lineWidth = 1;
      for (let i = 1; i <= 9; i++) {
        const r = i * 62;
        s.ctx.save();
        s.ctx.translate(cx, cy);
        s.ctx.rotate(s.t * (0.05 + i * 0.012) * (i % 2 ? 1 : -1));
        s.ctx.strokeStyle = `rgba(${s.c.muted},0.055)`;
        s.ctx.beginPath();
        s.ctx.ellipse(0, 0, r, r * 0.62, 0, 0, Math.PI * 2);
        s.ctx.stroke();
        s.ctx.fillStyle = `rgba(${s.c.signal},0.25)`;
        s.ctx.beginPath();
        s.ctx.arc(r, 0, 2.2, 0, Math.PI * 2);
        s.ctx.fill();
        s.ctx.restore();
      }
    },
  },

  /* ── Quiet ─────────────────────────────────────────────────────────────── */

  monograph: {
    label: 'Rules',
    note: 'Long lines drifting, barely there',
    fps: 10,
    draw(s) {
      const lines = Math.ceil(s.h / 110) + 2;
      s.ctx.lineWidth = 1;
      for (let i = 0; i < lines; i++) {
        const speed = 0.4 + ((i * 13) % 7) / 12;
        const y = ((i * 110 + s.t * speed * 9) % (s.h + 220)) - 110;
        const inset = 40 + Math.sin(s.t * 0.08 + i) * 90;
        s.ctx.strokeStyle = i % 5 === 0 ? `rgba(${s.c.signal},0.07)` : `rgba(${s.c.muted},0.05)`;
        s.ctx.beginPath();
        s.ctx.moveTo(inset, y);
        s.ctx.lineTo(s.w - inset * 0.6, y);
        s.ctx.stroke();
      }
    },
  },

  journal: {
    label: 'Grain',
    note: 'Drifting paper texture',
    fps: 8,
    draw(s) {
      const n = Math.floor((s.w * s.h) / 5200);
      s.ctx.fillStyle = `rgba(${s.c.muted},0.055)`;
      for (let i = 0; i < n; i++) {
        const x = Math.abs((Math.sin(i * 12.9898 + s.t * 0.02) * 43758.5453) % 1) * s.w;
        const y = Math.abs((Math.sin(i * 78.233 + s.t * 0.013) * 43758.5453) % 1) * s.h;
        s.ctx.fillRect(x, y, 1.5, 1.5);
      }
    },
  },

  terminal: {
    label: 'Glyph rain',
    note: 'Falling characters and scanlines',
    fps: 14,
    draw(s) {
      const glyphs = '01<>{}[]/\\|+=*#$%&';
      s.ctx.font = '12px ui-monospace, monospace';
      const columns = Math.floor(s.w / 26);
      for (let i = 0; i < columns; i++) {
        const speed = 0.35 + ((i * 37) % 10) / 14;
        const y = ((s.t * speed * 30 + i * 140) % (s.h + 160)) - 80;
        s.ctx.fillStyle = `rgba(${s.c.signal},0.13)`;
        s.ctx.fillText(glyphs[(i + Math.floor(s.t)) % glyphs.length], i * 26 + 8, y);
        s.ctx.fillStyle = `rgba(${s.c.signal},0.06)`;
        s.ctx.fillText(glyphs[(i * 3 + Math.floor(s.t * 0.5)) % glyphs.length], i * 26 + 8, y - 26);
      }
      s.ctx.fillStyle = `rgba(${s.c.muted},0.035)`;
      for (let y = 0; y < s.h; y += 4) s.ctx.fillRect(0, y, s.w, 1);
    },
  },

  drift: {
    label: 'Drift',
    note: 'Slow soft blobs, almost imperceptible',
    fps: 20,
    draw(s) {
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(s.t * 0.06 + i * 1.3) * 0.5 + 0.5) * s.w;
        const y = (Math.cos(s.t * 0.045 + i * 2.1) * 0.5 + 0.5) * s.h;
        const r = 170 + i * 60;
        const g = s.ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${i % 2 ? s.c.signal : s.c.muted},0.06)`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        s.ctx.fillStyle = g;
        s.ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
    },
  },
};

/**
 * Which field a design direction uses when the background axis is left on
 * "auto". Keeps each direction's original character as its default while
 * letting any field be chosen explicitly.
 */
export const VARIANT_DEFAULT_FIELD: Record<string, string> = {
  interferometer: 'interferometer',
  bitplane: 'bitplane',
  bengal: 'bengal',
  journal: 'journal',
  terminal: 'terminal',
  monograph: 'monograph',
};
