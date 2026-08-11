import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Monitor, Moon, Sun } from "lucide-react";
import { applyAxis, resolveAxis } from "@/lib/appearance";

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
    "text-sm text-ink-2 hover:text-signal transition-colors px-2 py-1";

  return (
    // Solid rather than the previous translucent white with a blur and a shadow:
    // a hairline rule against a token surface holds its edge in both themes,
    // where a white/95 bar inverts into a bright band on a dark ground.
    <nav className="fixed top-0 z-50 w-full border-b border-rule bg-surface-0">
      <div className="container flex items-center justify-between gap-4 py-3 sm:py-4">
        {/* The markup previously had an empty <h1> here. The page's real h1 is
            the name in the hero, so this is a plain link rather than a second
            top-level heading. */}
        <Link
          to="/"
          className="ds-display whitespace-nowrap text-base sm:text-lg"
        >
          Imon Mukherjee
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex lg:gap-3">
          {NAV.map((item) =>
            item.kind === "group" ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className={`${linkClass} flex items-center gap-1`}>
                  {item.label} <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-rule bg-surface-1 text-ink-1">
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
          <ThemeToggle />
        </div>

        {/* Mobile. The theme toggle sits beside the menu button rather than
            inside the drawer, so switching theme does not require opening
            navigation first. */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 text-ink-1"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85vw] max-w-sm overflow-y-auto border-rule bg-surface-0 text-ink-1"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="ds-display text-ink-1">Navigation</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col">
              {NAV.map((item) =>
                item.kind === "group" ? (
                  <div key={item.label} className="mt-4 first:mt-0">
                    <p className="ds-label px-3 pb-1">
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
      </div>

      {/* Read-position rule. The one piece of chrome that earns being linked
          continuously to scroll rather than triggered once — on a page this long
          it answers "how much is left". Driven by animation-timeline: scroll(),
          so it costs no JavaScript and simply does not appear at the lower
          motion levels or where scroll-driven animation is unsupported.
          aria-hidden because it duplicates the scrollbar for screen readers. */}
      <div
        className="ds-scroll-progress absolute bottom-0 left-0 h-px w-full bg-signal"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </nav>
  );
}

/**
 * Light/dark toggle.
 *
 * Three states, cycled in that order: follow the OS, force light, force dark.
 * "System" is a real state and the default — writing an explicit value on first
 * load is what leaves dark-mode visitors staring at a bright page.
 */
type ThemeValue = 'light' | 'dark' | 'system';

function ThemeToggle() {
  const [theme, setThemeState] = useState<ThemeValue>(() => resolveAxis('theme') as ThemeValue);

  const next: Record<ThemeValue, ThemeValue> = { system: 'light', light: 'dark', dark: 'system' };
  const icon: Record<ThemeValue, typeof Sun> = { system: Monitor, light: Sun, dark: Moon };
  const Icon = icon[theme];

  return (
    <button
      type="button"
      onClick={() => {
        const t = next[theme];
        setThemeState(t);
        applyAxis('theme', t);
      }}
      // 44px, not the 36px this started as: it is a real control and needs a
      // real tap target on a phone.
      className="ml-1 flex h-11 w-11 items-center justify-center text-ink-2 transition-colors hover:text-signal"
      // The label states the current mode rather than the next one, so a screen
      // reader user knows where they are, not just what will happen.
      aria-label={`Colour theme: ${theme}. Activate to switch.`}
      title={`Theme: ${theme}`}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}

/** A drawer row. 44px min height keeps it a comfortable tap target. */
function MobileLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const className =
    "flex min-h-[44px] w-full items-center px-3 text-base text-ink-2 transition-colors hover:bg-surface-2 hover:text-signal";

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
