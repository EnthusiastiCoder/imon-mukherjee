import { TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/**
 * A TabsList that scrolls horizontally on small screens and becomes an even
 * grid once there is room.
 *
 * The pages used `grid w-full grid-cols-4` (and -5, and -3) with no responsive
 * prefix. TabsTrigger sets `whitespace-nowrap`, so at 360px a label like
 * "Book Chapters (12)" had roughly 80px of column and simply overflowed its
 * cell. Scrolling keeps every tab reachable and legible at any width.
 *
 * `cols` is the md-and-up grid, e.g. "md:grid-cols-4".
 */
export default function ScrollableTabsList({
  cols,
  className,
  children,
}: {
  cols: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // Negative margin lets the scroll area bleed to the screen edges on mobile,
    // so the last tab does not look clipped by the container gutter.
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
      <TabsList
        className={cn(
          "inline-flex h-auto w-max min-w-full justify-start gap-1 p-1",
          "md:grid",
          cols,
          className
        )}
      >
        {children}
      </TabsList>
    </div>
  );
}
