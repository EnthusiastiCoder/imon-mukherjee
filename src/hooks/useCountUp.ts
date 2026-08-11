import { useEffect, useRef, useState } from 'react';
import { motionAllowed } from '@/lib/appearance';

/**
 * Counts a number up to its value when it first scrolls into view.
 *
 * The only JavaScript-driven effect in the motion system, because CSS cannot
 * interpolate a text node.
 *
 * Written so the true value is what exists without any of this working: the hook
 * returns `value` unchanged when motion is off, when IntersectionObserver is
 * missing, or before the observer fires with the element already past. It never
 * returns a placeholder that could get stuck on screen — the failure mode is "the
 * number did not animate", never "the number is wrong or absent".
 *
 * Uses the same easing shape as the CSS entrance so a counting stat and a
 * revealing panel feel like one gesture rather than two systems.
 */
export function useCountUp(value: number | null, durationMs = 1100) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState<number | null>(value);
  const hasRun = useRef(false);

  useEffect(() => {
    // Nothing to count to yet — the scholar API may still be in flight.
    if (value === null || value === undefined) {
      setDisplay(value);
      return;
    }

    if (!motionAllowed() || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) {
      setDisplay(value);
      return;
    }

    // Re-arm when the value arrives, so a stat that resolves after the element
    // is already on screen still animates rather than snapping.
    hasRun.current = false;
    setDisplay(0);

    let raf = 0;
    let cancelled = false;

    const run = () => {
      const start = performance.now();
      // Matches cubic-bezier(0.22, 1, 0.36, 1) closely enough to feel identical
      // to the CSS entrance without shipping a bezier solver.
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / durationMs);
        setDisplay(Math.round(value * ease(t)));
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            observer.disconnect();
            run();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    // Safety net: if the observer has not fired within a second — an odd scroll
    // restoration, a hidden ancestor, a browser quirk — show the real number
    // rather than leaving a zero on screen.
    const failsafe = window.setTimeout(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        observer.disconnect();
        setDisplay(value);
      }
    }, 1000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [value, durationMs]);

  return { ref, display };
}
