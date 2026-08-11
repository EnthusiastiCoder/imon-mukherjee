import { Children, type ReactNode } from 'react';

/**
 * A scrolling band.
 *
 * Used here to carry something true rather than as decoration: the venues he
 * actually publishes in. A visitor assessing a researcher wants exactly that
 * list, and a band is a better shape for it than a paragraph of comma-separated
 * names — it reads as a masthead of credentials and it never runs out of room
 * on a phone.
 *
 * Mechanics:
 *   - the track is rendered TWICE and translated by exactly -50%, which is what
 *     makes the loop seamless. Any other duplication count or offset shows a
 *     visible jump at the wrap.
 *   - `aria-hidden` on the duplicate, so a screen reader hears the list once.
 *   - paused on hover and on focus-within, so the content can actually be read
 *     and any link inside can be clicked.
 *   - honours prefers-reduced-motion and the still/restrained motion levels via
 *     CSS in motion.css; it degrades to a static, horizontally scrollable row
 *     rather than disappearing.
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className = '',
}: {
  children: ReactNode;
  /** Seconds for one full pass. Larger is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const items = Children.toArray(children);

  const track = (hidden: boolean) => (
    <ul
      className="ds-marquee-track flex shrink-0 items-center gap-[var(--space-gutter)]"
      aria-hidden={hidden || undefined}
    >
      {items.map((child, i) => (
        <li key={i} className="flex shrink-0 items-center gap-[var(--space-gutter)]">
          {child}
          {/* A separator between entries, not after the last one visually —
              the duplicated track means "last" is never actually the end. */}
          <span className="text-signal" aria-hidden="true">
            &#47;&#47;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`ds-marquee group relative flex overflow-hidden ${className}`}
      style={{ ['--marquee-duration' as string]: `${speed}s` }}
      data-reverse={reverse ? 'true' : undefined}
    >
      {track(false)}
      {track(true)}
    </div>
  );
}

export default Marquee;
