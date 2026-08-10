# Design Brief — "Quantum Lab", three variations

**Branch:** `feat/responsive-images` (continue here; 21 commits already landed)
**Status:** agreed direction, not yet built
**Date:** 2026-08-10

> Read `plans/responsive-and-images.md` first — it records the responsive/image work
> already done and what remains outstanding. This file covers the visual redesign only.

---

## 1. Decisions already made with the user

| Question | Answer |
|---|---|
| Direction | **Quantum Lab** — dark-first instrument-panel character |
| Themes | **Both, light default**, honouring OS preference, with a manual toggle |
| Sequencing | **Homepage first**, review, then roll out to the other 6 pages |
| Deliverable | **Multiple variations**, so Dr. Mukherjee can pick one |

**Tension to resolve deliberately:** "Quantum Lab" was pitched dark-first, but the
theme answer is light-default. Resolution: the lab character comes from *structure
and typography* — precision rules, tabular numerals, panel headers, instrument-style
stat readouts — not from darkness alone. Light is the default and must be fully
resolved; dark is the more dramatic expression of the same system, selected from the
same ramps rather than an automatic inversion.

## 2. Why this brief exists

The current design is, almost exactly, the AI-default the `artifact-design` skill
warns against: purple-to-blue gradient hero on white, gradient-clipped text on every
heading, `rounded-xl` cards with shadows, everything centred. The user's words were
"plain and kinda vibecoded slop." The fix is a different point of view, not more
polish on this one.

**Grounding.** The subject is not "an academic portfolio" — it is *this* researcher:
steganography (a payload hidden inside a cover), steganalysis (detecting it), and
quantum computing. The site is also unusually data-dense — 1,296 citations, h-index
19, i10 32, ₹87.86L across DRDO/SERB/MeitY, 5 PhDs awarded and 7 ongoing, 100+
publications. That density means **information design**, not decoration: surface the
summary before the detail, encode state in form as well as number, treat numerals as
instrument readouts.

## 3. Implementation approach — one token layer, three value sets

Build the variations as **pure CSS custom-property sets**, switched by a
`data-variant` attribute on `<html>`, orthogonal to `data-theme`:

```
<html data-variant="interferometer" data-theme="dark">
```

Every component reads tokens only — never a literal colour, never a colour defined
solely inside a `[data-theme]` or media block (that is the classic unreadable bug the
design skill calls out). Then:

- All three variations cost one component pass, not three.
- Dr. Mukherjee clicks through them live on a real page rather than judging mockups.
- Picking a winner is a one-line default change; the losers delete cleanly.

Ship a **variant switcher** — a small fixed control, dev-only or behind `?variants=1`
— so he can toggle without a rebuild. Remove it once he has chosen.

**Theme structure (all three variations):** bare `:root` defines the complete light
palette; `@media (prefers-color-scheme: dark)` redefines *only* the tokens, guarded
as `:root:not([data-theme="light"])`; `:root[data-theme="dark"]` redefines them again
so the toggle wins in both directions. `body` sets an explicit token background.

## 4. The three variations

Deliberately spread across the axes that read at a glance — accent hue, display face,
and density — so the choice is real rather than three shades of the same idea.

### V1 — Interferometer  *(the most literal reading of the direction)*
- **Feel:** dense instrument panel. Optical-bench precision.
- **Colour:** cool cyan-teal signal on a slate-blue-black ground (dark) / cool
  near-white (light). Neutrals biased toward the accent, never pure grey.
- **Type:** condensed grotesque display · IBM Plex Sans body · IBM Plex Mono data.
- **Structure:** strict 12-column grid, hairline dividers, panel headers as
  letter-spaced small caps above a rule. Tightest spacing of the three.

### V2 — Bit Plane  *(steganography made structural)*
- **Feel:** editorial warmth against technical structure. A preprint with taste.
- **Colour:** signal amber/ochre on ink with a slight green-blue bias.
- **Type:** Newsreader (editorial serif, real character, optical sizes) display ·
  IBM Plex Sans body · IBM Plex Mono data.
- **Structure:** content sits **flush in planes** — hairline-delineated, no floating
  rounded cards, no drop shadows. A faint grid substrate referencing a bit-plane.
  Most distinctive; furthest from the current template.

### V3 — Monograph  *(the quiet one)*
- **Feel:** confident restraint. Prestige without ornament.
- **Colour:** near-monochrome; a single desaturated steel-blue as the only accent.
- **Type:** large serif display carrying the page · neutral grotesque body · mono for
  data only.
- **Structure:** maximal whitespace, rules instead of containers, largest type scale.
  Ages best; least "designed."

**Do not** spend the freedom on the named AI defaults: warm cream + serif +
terracotta; near-black + lone acid-green pop; purple-to-blue gradient; Inter or Space
Grotesk as the safe face; emoji section markers; everything centred; `rounded-lg`
everywhere; accent bar on rounded cards.

## 5. Typography mechanics

Self-host via `@fontsource` npm packages — **not** a Google Fonts `<link>`. Reasons:
no third-party request on a site that already loads fast, no FOUT if the CDN is
blocked, and the subset ships with the build. Preload the display face; `font-display:
swap` on the rest.

Running text near 65 characters. `text-wrap: balance` on headings. Letter-spacing on
uppercase labels. **`font-variant-numeric: tabular-nums` everywhere digits align** —
this site is full of years, citation counts, grant amounts and impact factors, and it
is the single cheapest thing that will make it read as precise rather than generic.

## 6. The citation chart — rebuild per the `dataviz` skill

`src/components/Hero.tsx` currently renders citations-by-year with **eight different
blues assigned by array index**. That is the "colour follows rank, not entity"
anti-pattern: the hue carries no meaning, and it re-paints if the data length changes.

It should be:
- **Form:** magnitude over time → bars. Correct already.
- **Colour:** *sequential, one hue, light→dark* keyed to value — or, better, a single
  accent with the current year emphasised. Not eight cycled hues.
- **Validate** the palette with `scripts/validate_palette.js` from the dataviz skill
  before shipping. Run it for light **and** dark surfaces. Do not eyeball it.
- **Marks:** 4px rounded data-ends anchored to the baseline, 2px gap between bars,
  recessive grid and axes.
- **Hover:** per-bar tooltip (partly there; make the hit target bigger than the mark).
- Axis ticks already derive from the data after the earlier fix — keep that.

Also worth a stat-tile treatment: 1,296 / 19 / 32 / ₹87.86L are hero numbers and
deserve to be read before any chart.

## 7. Build order

1. Token layer + all three variation value sets + light/dark for each.
2. Variant switcher (temporary).
3. Fonts wired and self-hosted.
4. Homepage: nav, hero, stat row, chart, section shells, cards, footer.
5. **Screenshot each variation, light and dark, desktop and 360px** — needs the
   `chrome-devtools` MCP.
6. Run each through `ui-critique` for an independent read before showing the client.
7. User review → pick one → roll across the remaining 6 pages → delete the losers and
   the switcher.

## 8. Environment notes for whoever picks this up

- `npm run dev` → Vite on **:8080**, Express scholar API on **:3001**. Both work;
  `SERPAPI_KEY` is in `server/.env` (gitignored).
- The **MCP servers in `.mcp.json` require a session restart to load** — they were
  configured after the previous session started, so `chrome-devtools`, `webfetch` and
  `ui-critique` were unavailable for all of the work to date. Step 5 above is blocked
  without them.
- `npm run check:images` currently exits non-zero on purpose: 4 documentary photos
  need originals from Dr. Mukherjee. Not a regression — see the other plan file.
- Do not push to `origin main`; the allowlist hook blocks it. Vercel auto-deploy is
  disabled for this branch in `vercel.json`; previews are manual via `npx vercel`.
