import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * The header every section shares.
 *
 * Previously each section was a bare display heading with a "View All" button
 * floated opposite it, which gave the whole lower page one flat rhythm: heading,
 * grid, heading, grid. This adds two things that carry information rather than
 * decoration —
 *
 *   eyebrow  the same letter-spaced label used in the hero, so sections read as
 *            part of one system rather than as separate blocks
 *   summary  a real figure for the section (total funding, how many doctorates,
 *            how many papers). A visitor scanning for scale gets it here instead
 *            of having to count cards.
 *
 * The rule underneath is what actually separates sections; it replaces the
 * heavier top border each one carried.
 */
export function SectionHeader({
  eyebrow,
  title,
  summary,
  to,
  actionLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  /** A real number for this section — shown in the data face beside the rule. */
  summary?: ReactNode;
  to?: string;
  actionLabel?: string;
  children?: ReactNode;
}) {
  return (
    <header className="ds-reveal mb-[var(--space-block)]">
      <p className="ds-label">{eyebrow}</p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="ds-display text-display-md">{title}</h2>

        {to && actionLabel && (
          <Link
            to={to}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start text-sm font-medium text-signal underline-offset-4 hover:underline sm:self-auto"
          >
            {actionLabel}
            <ExternalLink size={15} aria-hidden="true" />
          </Link>
        )}
      </div>

      {(summary || children) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-3">
          {summary && <p className="ds-data text-sm text-ink-2">{summary}</p>}
          {children}
        </div>
      )}
    </header>
  );
}

export default SectionHeader;
