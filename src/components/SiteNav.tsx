import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/**
 * Site navigation.
 *
 * The previous markup was a single `hidden md:flex` bar with no fallback, so
 * below 768px the header rendered as an empty strip and every route and section
 * anchor was unreachable on a phone. This defines the link structure once as
 * data and renders it twice — a dropdown bar at md and up, a drawer below — so
 * the two can never drift apart.
 */

type NavLink =
  | { kind: "section"; label: string; target: string }
  | { kind: "route"; label: string; to: string };

type NavItem = NavLink | { kind: "group"; label: string; items: NavLink[] };

const NAV: NavItem[] = [
  { kind: "section", label: "Home", target: "home" },
  { kind: "section", label: "About", target: "about" },
  {
    kind: "group",
    label: "Research",
    items: [
      { kind: "section", label: "Research Interests", target: "research" },
      { kind: "route", label: "Funded Projects", to: "/funded-projects" },
      { kind: "route", label: "Publications", to: "/publications" },
    ],
  },
  {
    kind: "group",
    label: "Academic",
    items: [
      { kind: "route", label: "Academic Supervision", to: "/academic-supervision" },
      { kind: "route", label: "Lectures", to: "/lectures" },
      { kind: "section", label: "Talks & Conferences", target: "talks" },
    ],
  },
  { kind: "route", label: "Gallery", to: "/gallery" },
  { kind: "section", label: "Contact", target: "contact" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-slate-600 hover:text-blue-600 transition-colors rounded-md px-2 py-1";

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-sm">
      <div className="container flex items-center justify-between gap-4 py-3 sm:py-4">
        {/* The markup previously had an empty <h1> here. The page's real h1 is
            the name in the hero, so this is a plain link rather than a second
            top-level heading. */}
        <Link
          to="/"
          className="font-bold text-slate-800 text-base sm:text-lg whitespace-nowrap"
        >
          Dr. Imon Mukherjee
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {NAV.map((item) =>
            item.kind === "group" ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className={`${linkClass} flex items-center gap-1`}>
                  {item.label} <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border shadow-lg">
                  {item.items.map((sub) =>
                    sub.kind === "route" ? (
                      <DropdownMenuItem key={sub.label} asChild>
                        <Link to={sub.to}>{sub.label}</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        key={sub.label}
                        onClick={() => scrollToSection(sub.target)}
                      >
                        {sub.label}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.kind === "route" ? (
              <Link key={item.label} to={item.to} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                className={linkClass}
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
            <SheetHeader className="text-left">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col">
              {NAV.map((item) =>
                item.kind === "group" ? (
                  <div key={item.label} className="mt-4 first:mt-0">
                    <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    {item.items.map((sub) => (
                      <MobileLink key={sub.label} link={sub} onNavigate={() => setOpen(false)} />
                    ))}
                  </div>
                ) : (
                  <MobileLink key={item.label} link={item} onNavigate={() => setOpen(false)} />
                )
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

/** A drawer row. 44px min height keeps it a comfortable tap target. */
function MobileLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const className =
    "flex min-h-[44px] w-full items-center rounded-md px-3 text-base text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors";

  if (link.kind === "route") {
    return (
      <SheetClose asChild>
        <Link to={link.to} className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      </SheetClose>
    );
  }

  return (
    <SheetClose asChild>
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate();
          // Let the drawer finish closing before scrolling, otherwise the
          // dialog's scroll lock is still active and the jump is swallowed.
          setTimeout(() => scrollToSection(link.target), 250);
        }}
      >
        {link.label}
      </button>
    </SheetClose>
  );
}
