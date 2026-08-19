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
};

/**
 * The field a direction uses when the background axis is left on "auto".
 * One direction ships, so this has one entry.
 */
export const VARIANT_DEFAULT_FIELD: Record<string, string> = {
  bitplane: 'bitplane',
};
