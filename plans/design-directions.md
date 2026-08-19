# Design Brief — six directions to choose from

**Status: CLOSED. Decided and shipped 2026-08-19.**

Dr. Mukherjee reviewed all six directions at `/variants` and chose
**Bit Plane · maximalist motion · bit-field background**, with the light/dark
toggle kept. That combination is live at the domain root; the five other
directions, seventeen of the eighteen background fields, the appearance
switcher and three font families were removed in the same change (PR #5).

One defect survived that change and was fixed afterwards in PR #8: shadcn's own
tokens still hung off a `.dark` class, which nothing in this app sets, so every
bare `<Card>` stayed white in dark mode. Those tokens now carry this palette and
follow `data-theme`. Fixing it surfaced three contrast failures that had never
been checked — `--ink-3` had never met AA in light mode — so
`scripts/validate-design-palettes.mjs` now checks every ink against every surface
rather than a hardcoded copy of the palette.

The record below is the brief as written before the build, kept because it
explains *why* each direction existed and what the colour system guarantees.
Anything describing future work is historical — read the status line above
first. The alternatives are recoverable from git history if one is ever wanted.

Outstanding, unrelated to the design decision:

- High-resolution originals for four documentary photos (`image1`, `image2`,
  `image4`, `image6`). `npm run check:images` fails deliberately until then.
- Whether the commented-out seventh ongoing PhD student should be listed.

---

**Branch:** `feat/responsive-images` (merged to `main` as 220154c)
**Date:** 2026-08-10, closed 2026-08-19

> Read `plans/responsive-and-images.md` first — it covers the responsive/image work
> already done and what remains outstanding. This file is the visual redesign.

---

## 1. What the user asked for

- Original brief: "premium design", the current site is "plain and kinda vibecoded slop".
- First answer narrowed to one direction (Quantum Lab); the user then widened it:
  **"not just quantum lab, go for anything and everything you feel like could be good."**
- **Multiple variations are the deliverable** — Dr. Mukherjee picks one.
- Themes: **both, light default**, honouring OS preference, with a manual toggle.
- Sequencing: **homepage first**, review, then roll the winner across the other 6 pages.

## 2. Why the current design fails

It is, almost exactly, the AI-default the `artifact-design` skill names: purple-to-blue
gradient hero on white, gradient-clipped text on *every* heading, `rounded-xl` cards
with drop shadows, everything centred. That is why it reads as generated. More polish
on the same idea will not fix it — it needs a point of view.

**Grounding.** The subject is not "an academic portfolio", it is *this* researcher:
steganography (a payload hidden inside a cover), steganalysis (detecting it), quantum
computing and post-quantum cryptography. The content is unusually data-dense — 1,296
citations, h-index 19, i10 32, ₹87.86L across DRDO/SERB/MeitY, 5 PhDs awarded and 7
ongoing, 100+ publications. Dense data means **information design**: summary before
detail, state encoded in form as well as number, numerals treated as instrument
readouts. Avoid the other named defaults too — warm cream + serif + terracotta;
near-black with a lone acid pop; Inter or Space Grotesk as the safe face; emoji section
markers; `rounded-lg` everywhere.

## 3. Architecture: one token layer, six value sets

Directions are **CSS custom-property sets** switched by `data-variant` on `<html>`,
orthogonal to `data-theme`:

```html
<html data-variant="bitplane" data-theme="dark">
```

Components read tokens only — never a literal colour, and never a colour whose only
definition sits inside a `[data-theme]` or media block (the classic unreadable-page
bug). Consequences:

- Six directions cost roughly one component pass, not six.
- Dr. Mukherjee toggles between them **live, on the real page, with his real data**.
- Choosing a winner is a one-line default change; the losers delete cleanly.

Ship a temporary **variant switcher** behind `?variants=1` so he can click through
without a rebuild. Remove it once he has chosen.

**Theme structure:** bare `:root` holds the complete light palette;
`@media (prefers-color-scheme: dark)` redefines *only* tokens, guarded as
`:root:not([data-theme="light"])`; `:root[data-theme="dark"]` redefines them again so
the toggle wins both ways. `body` sets an explicit token background.

**Where structure varies.** Directions that differ only in colour and type will read as
six skins, not six designs — which is the original complaint. So each direction also
gets its own **hero treatment and section rhythm**, while sharing the underlying
content components (cards, tables, tabs). Personality in the parts that carry it;
shared plumbing everywhere else.

## 4. The colour system — validated, not eyeballed

`node scripts/validate-design-palettes.mjs` — **all 12 categorical and 24 contrast
checks pass.** Re-run it after any tweak; it exits non-zero on failure.

The system splits deliberately (see the script header for the full reasoning):

**Shared categorical set** — fixed entity order, identical in all six directions.
Slots map to journals · conferences · book chapters · patents, and equivalently to
funding agencies.

| Mode | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| light | `#2a78d6` | `#eb6834` | `#1baf7a` | `#eda100` |
| dark | `#3987e5` | `#d95926` | `#199e70` | `#c98500` |

**Per-direction identity** — surface, ink, accent:

| Direction | Light surface / ink / accent | Dark surface / ink / accent |
|---|---|---|
| Interferometer | `#f6f8f9` `#101a1e` `#0d7d8a` | `#0e1519` `#e6eef1` `#2ec4d0` |
| Bit Plane | `#f7f7f4` `#14170f` `#a35f00` | `#11150f` `#eceee4` `#e8a33d` |
| Bengal Modern | `#f4f4f7` `#15152a` `#3f38b8` | `#14141f` `#e8e8f2` `#8b83e8` |
| Journal | `#fdfdfb` `#16181c` `#9c1f35` | `#16181c` `#ecedef` `#e0788c` |
| Terminal | `#fbfbfa` `#0e1110` `#0f766e` | `#0b0d0c` `#e4e8e6` `#2dd4bf` |
| Monograph | `#fbfbfa` `#1a1a19` `#2b6098` | `#17191a` `#eaeae8` `#8fb4dc` |

Neutrals must be derived with a slight hue bias toward each direction's accent — a
pure mid-grey reads as unconsidered.

## 5. The six directions

Spread across the axes that read at a glance — temperature, display face, density — so
the choice is real rather than six shades of one idea.

### 1 · Interferometer — *cool instrument panel*
Optical-bench precision. Strict 12-column grid, hairline dividers, panel headers as
letter-spaced small caps above a rule. Tightest spacing of the six.
**Type:** condensed grotesque display · IBM Plex Sans · IBM Plex Mono.

### 2 · Bit Plane — *steganography made structural*
Editorial warmth against technical structure. Content sits **flush in planes**,
hairline-delineated — no floating rounded cards, no shadows — over a faint grid
substrate referencing a bit-plane. Furthest from the current template.
**Type:** Newsreader display · IBM Plex Sans · IBM Plex Mono.

### 3 · Bengal Modern — *indigo and madder*
Grounded in place: IIIT Kalyani is in West Bengal, and indigo is a Bengal material.
Indian modernist, in the NID / Correa lineage — geometric, high-contrast, structural.
**Must be modernist, not ornamental**; ethnic decoration would be patronising.
**Type:** a geometric grotesque with real character · humanist body face.

### 4 · Journal — *scientific publishing*
Modelled on the journals he publishes in. Numbered sections, figure-caption discipline,
reference-style typography, deep maroon section marks. Extremely legible, quietly
prestigious. The numbering here is honest — his content genuinely is sectioned.
**Type:** a text serif with real optical sizing · grotesque for labels.

### 5 · Terminal — *austere, monospaced throughout*
The risk option. A near-total mono type system, rigid structure, minimal chrome — like
a beautifully set paper in a terminal. Memorable and very on-subject for a
cryptographer. Fails badly if executed loosely; needs precision.
**Type:** one mono family across every role, with weight and size doing all the work.

### 6 · Monograph — *the quiet one*
Confident restraint. Maximal whitespace, rules instead of containers, largest type
scale, near-monochrome. **Category is encoded typographically — label plus rule —
rather than by colour**, which is why it needs no categorical hues. Ages best.
**Type:** large serif display · neutral grotesque body · mono for data only.

## 6. Typography mechanics

Self-host via `@fontsource` npm packages — **not** a Google Fonts `<link>`. No
third-party request, no FOUT if the CDN is blocked, subset ships with the build.
Preload the display face; `font-display: swap` elsewhere.

Running text near 65 characters. `text-wrap: balance` on headings. Letter-spacing on
uppercase labels. **`font-variant-numeric: tabular-nums` wherever digits align** — this
site is full of years, citation counts, grant amounts and impact factors, and it is the
single cheapest change that will make it read as precise rather than generic.

## 7. The citation chart — rebuild per the `dataviz` skill

`src/components/Hero.tsx` currently assigns **eight blues by array index**. The hue
carries no meaning and repaints if the data length changes — "colour follows rank, not
entity", a named anti-pattern.

- **Form:** magnitude over time → bars. Already correct.
- **Colour:** sequential single hue keyed to value, or the direction's accent with the
  current year emphasised. Not eight cycled hues.
- **Marks:** 4px rounded data-ends anchored to the baseline, 2px gap between bars,
  recessive grid and axes.
- **Hover:** per-bar tooltip with a hit target larger than the mark.
- Axis ticks already derive from the data (fixed earlier) — keep that.
- 1,296 / 19 / 32 / ₹87.86L are **hero numbers** and should be read before any chart.

## 8. Build order

1. Token layer + six variation sets + light/dark for each.
2. Variant switcher behind `?variants=1` (temporary).
3. Fonts wired and self-hosted.
4. Homepage per direction: nav, hero, stat row, chart, section shells, cards, footer.
5. **Screenshot each direction, light and dark, desktop and 360px** — needs
   `chrome-devtools`.
6. Run each through `ui-critique` for an independent read before showing the client.
7. Present → he picks → roll across the remaining 6 pages → delete losers and switcher.

## 9. Environment notes

- `npm run dev` → Vite on **:8080**, Express scholar API on **:3001**.
  `SERPAPI_KEY` is in `server/.env` (gitignored). **Rotate it** — it was pasted in chat.
- The MCP servers in `.mcp.json` load after a session restart. Once loaded, every
  direction was verified in a real browser, and the shipped combination was swept for
  contrast across all 7 routes in both themes.
- `npm run check:images` exits non-zero on purpose: 4 documentary photos need originals
  from Dr. Mukherjee. Not a regression.
- `npm run lint` reports 5 errors and 7 warnings, all pre-existing, none in new files.
- Do not push to `origin main` — the allowlist hook blocks it. Land work by PR.
  `main` auto-deploys to production on merge, so avoid merging comment- or docs-only
  branches on their own; fold them into the next real change.
