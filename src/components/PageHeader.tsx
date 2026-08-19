import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Fixed header for the sub-pages.
 *
 * The five sub-pages each carried their own copy of this bar in two slightly
 * different dialects ("Back to Home" with a Button, "← Back to Portfolio" with a
 * bare Link), and three of them also declared the page title as an <h1> here and
 * again in the page body — two h1s per document. This is the single version.
 *
 * The back label collapses to "Back" below sm so the row cannot overflow at
 * 360px, and the title truncates rather than pushing the layout wide.
 */
export default function PageHeader({ title }: { title: string }) {
  return (
    <nav className="fixed top-0 w-full bg-surface-0 border-b border-rule z-50">
      <div className="container flex items-center justify-between gap-3 py-3">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 min-h-[44px] rounded-md px-2 -ml-2 font-semibold text-ink-1 hover:text-signal transition-colors"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <span className="truncate text-base sm:text-lg font-bold text-ink-1">
          {title}
        </span>
      </div>
    </nav>
  );
}
