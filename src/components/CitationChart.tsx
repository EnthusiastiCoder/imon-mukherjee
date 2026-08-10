import { useId, useMemo, useState } from 'react';

/**
 * Citations by year.
 *
 * Replaces a version that assigned eight different blues by array index. That is
 * the "colour follows rank, not entity" anti-pattern: the hue carried no
 * meaning, it repainted whenever the number of years changed, and it
 * double-encoded a magnitude the bar height already showed.
 *
 * Decisions, per the dataviz method:
 *
 * - FORM. Magnitude over time, so bars. One series, so no legend — the heading
 *   names it.
 * - COLOUR. A single hue. Height already encodes magnitude; a ramp would encode
 *   it twice and imply the colour meant something else. The most recent year is
 *   emphasised because "how am I doing now" is the question this chart is
 *   actually asked, and that emphasis is restated in the label underneath so it
 *   is never colour-alone.
 * - MARKS. Thin bars anchored to the baseline, 4px rounded data-ends, a 2px
 *   surface gap between them, recessive gridlines behind.
 * - AXIS. Ticks derive from the data, rounded up to a clean step, so a future
 *   year above the old hard-coded 300 ceiling cannot flatten against the top.
 * - INTERACTION. The full column height is the hover target, not just the bar,
 *   so short bars stay reachable.
 * - ACCESS. A real <table> carries the same numbers for screen readers and for
 *   anyone who cannot separate the emphasis colour.
 */

export type CitationYear = { year: number; count: number };

/** Round an axis maximum up to a clean tick so bars never clip the top. */
function axisMax(peak: number): number {
  if (peak <= 0) return 100;
  const step = peak > 500 ? 200 : peak > 200 ? 100 : 50;
  return Math.ceil(peak / step) * step;
}

export function CitationChart({
  data,
  className,
}: {
  data: CitationYear[];
  className?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const tableId = useId();

  const max = useMemo(() => axisMax(Math.max(...data.map((d) => d.count), 0)), [data]);
  const ticks = useMemo(() => [1, 0.75, 0.5, 0.25, 0].map((f) => Math.round(max * f)), [max]);
  const latestYear = useMemo(() => Math.max(...data.map((d) => d.year)), [data]);

  if (!data.length) return null;

  return (
    <figure className={className}>
      <div className="flex gap-2">
        {/* Y axis. Recessive: muted ink, no axis line. */}
        <div
          className="flex w-8 shrink-0 flex-col justify-between pb-4 text-right text-[10px] leading-none text-ink-3 ds-data"
          aria-hidden="true"
        >
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {/* Gridlines sit behind the marks and stop at the plot area. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 top-0 flex flex-col justify-between" aria-hidden="true">
            {ticks.map((t, i) => (
              <div
                key={t}
                className="border-t border-rule"
                // The baseline reads as an axis, the rest as faint guides.
                style={{ opacity: i === ticks.length - 1 ? 1 : 0.45 }}
              />
            ))}
          </div>

          {/* Plot area. gap-[2px] is the surface gap between adjacent fills. */}
          <div className="relative flex h-36 items-stretch gap-[2px]">
            {data.map((d) => {
              const isLatest = d.year === latestYear;
              const isHover = hover === d.year;
              const pct = max ? (d.count / max) * 100 : 0;
              return (
                <div
                  key={d.year}
                  className="group relative flex min-w-0 flex-1 cursor-default flex-col justify-end pb-4"
                  // The whole column is the hit target, so a 20-citation bar is
                  // as easy to hit as a 300-citation one.
                  onMouseEnter={() => setHover(d.year)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(d.year)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  aria-describedby={tableId}
                >
                  <div
                    className="w-full rounded-t-[4px] transition-[background-color,opacity] duration-150"
                    style={{
                      height: `${pct}%`,
                      minHeight: d.count > 0 ? '2px' : '0',
                      backgroundColor: isLatest || isHover ? 'var(--signal)' : 'var(--ink-3)',
                      opacity: isLatest || isHover ? 1 : 0.55,
                    }}
                  />
                  {/* Year label. Two digits to survive a 360px viewport. */}
                  <span
                    className="absolute bottom-0 left-0 right-0 text-center text-[10px] leading-none text-ink-3 ds-data"
                    aria-hidden="true"
                  >
                    {String(d.year).slice(2)}
                  </span>

                  {isHover && (
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap border border-rule bg-surface-1 px-2 py-1 text-[11px] text-ink-1 shadow-sm ds-data"
                      style={{ borderRadius: 'var(--ds-radius-sm)' }}
                    >
                      {d.year}: {d.count.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <figcaption className="mt-2 text-[11px] text-ink-3">
        Citations per year. {latestYear} highlighted.
      </figcaption>

      {/* Same numbers, available to screen readers and to anyone who cannot use
          the emphasis colour. Positioned off-screen rather than display:none so
          it stays in the accessibility tree. */}
      <table id={tableId} className="sr-only">
        <caption>Citations by year</caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Citations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.year}>
              <th scope="row">{d.year}</th>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export default CitationChart;
