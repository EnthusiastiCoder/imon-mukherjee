# Responsive Overhaul + Image Quality — Plan

**Branch:** `feat/responsive-images` (off `main` @ `f4349b0`)
**Scope agreed:** all 7 pages · free-to-restyle latitude · Vercel branch auto-deploy disabled
**Date:** 2026-08-10

---

## 1. Audit findings

Evidence gathered statically from the source; the site runs locally at `localhost:8080`
with the scholar API live on `:3001`.

### 1.1 Blocking / severe

| # | Defect | Evidence | Effect |
|---|---|---|---|
| S1 | **No mobile navigation whatsoever.** The nav is `hidden md:flex` with no hamburger, Sheet, or drawer fallback. | `src/pages/Index.tsx:335` | Below 768px the header is an empty white bar. Every section anchor and every route (Publications, Gallery, Funded Projects, Lectures, Supervision) is unreachable on a phone. |
| S2 | **Horizontal page scroll at ~1024px.** The Scholar card is `absolute` at `lg:-right-20` (−80px) inside a centred `container`, so it overhangs the viewport. No `overflow-x` guard exists. | `src/components/Hero.tsx:192,201` | Whole page scrolls sideways on tablets and small laptops. |
| S3 | **Scholar metrics invisible below `lg`.** Same element is `hidden lg:block`. | `src/components/Hero.tsx:192,201` | The citation/h-index panel — arguably the most valuable content on the page — is absent for all phone and tablet visitors. |
| S4 | **Hero carousel image rendered at `opacity-10`.** | `src/components/Hero.tsx:274` | The image is 90% transparent — this is the "washed out / poor quality" symptom. Treated as a bug; restoring to full opacity. |

### 1.2 Image quality

Source files are the constraint, not the CSS.

| File | Native px | Rendered at | Verdict |
|---|---|---|---|
| `image1.jpg` | 200×200 | ~380×256 | Upscaled ~2×, ~4× on a 2-DPR phone. Documentary photo (Dr. Mukherjee lecturing). |
| `image4.jpg` | 275×183 | ~380×256 | Upscaled. Documentary (award ceremony). |
| `image6.jpg` | 213×237 | ~380×256 | Upscaled. Documentary (portrait headshot). |
| `profile_image.jpg` | 3441×3440, **3.0 MB** | 240×240 circle | 3 MB downloaded to fill 240px. ~14× more data than needed. |
| `QML.jpg` | 2048×1152, 635 KB | full-bleed | Acceptable source; needs derivatives. |
| others | 800–1280px wide | varies | Adequate; need WebP + `srcset`. |

Additional pipeline gaps across every `<img>` on the site: no `srcset`/`sizes`, no
`width`/`height` (causes cumulative layout shift), no `loading="lazy"`, no
`decoding="async"`, and no modern-format sources.

**Constraint on replacement.** `image1/4/6` are documentary photographs of a specific
real person at specific real events. They will be replaced only with higher-resolution
copies of *the same* photographs (official IIIT Kalyani pages, event/conference pages,
ResearchGate/ORCID), or failing that, originals supplied by Dr. Mukherjee. Substituting
stock photographs of other people under captions such as "Research Team" and "Security
Seminar" would misrepresent his record and would not be correctly licensed. The four
hero-carousel images (`quantum-computer`, `cryptography`, `QML`, `steganography`) are
generic subject illustrations and *are* free to replace with licensed high-res stock.

### 1.3 Layout / responsive

| # | Defect | Evidence |
|---|---|---|
| L1 | Tab strips locked to 3–5 columns at phone width | `Publications.tsx:873` (`grid-cols-4`), `AcademicSupervision.tsx:378` (`grid-cols-5`), `Lectures.tsx:198` (`grid-cols-3`) |
| L2 | Fixed heights that don't adapt: carousel `h-[28rem]`, scholar card `h-[280px]`/`w-[340px]`, chart `h-[140px]` | `Hero.tsx:274,193,202,224` |
| L3 | Typing headline in a fixed `h-8` — clips when the string wraps on narrow screens | `Hero.tsx:163` |
| L4 | Profile image fixed `w-60 h-60` at every breakpoint | `Hero.tsx:140` |
| L5 | Section headings `text-4xl`/`text-5xl` with no down-scaling (11 occurrences) | `Index.tsx` ×7, `Publications.tsx:844`, `Lectures.tsx:186`, `NotFound.tsx:17` |
| L6 | Gallery tiles fixed `h-64`; grid jumps 1→2→3→4 with no `sm` step | `Gallery.tsx:126,138` |
| L7 | `container` theme padding (`2rem`) is overridden everywhere by a hard-coded `px-6`; gutters never scale | `tailwind.config.ts:15` vs. all pages |

### 1.4 Noted, out of scope (not fixing unless asked)

- `scholarService.js` returns `since2020: 0` for all three metrics — a real data bug, but content/API not layout.
- `index.html:9` and `:12` declare two different `google-site-verification` values.
- `index.html` meta says "Distinguished Professor"; `Hero.tsx:64` says "Assistant Professor (Grade I)".

---

## 2. Approach

1. **Foundations first** — a shared `<Img>` component and a build-time image pipeline, so
   every later page change consumes one primitive instead of hand-rolling `srcset`.
2. **Fluid type + spacing scale** — replace one-off `text-4xl`/`px-6` with a small set of
   responsive utilities so headings and gutters scale by construction.
3. **Page-by-page**, one commit each, verified at 360 / 414 / 768 / 1024 / 1440.

Image derivatives are generated with `sharp` at build time into `public/images/derived/`,
emitting AVIF + WebP + JPEG fallback at 400/800/1200/1600px. Originals stay in git;
derivatives are gitignored and regenerated by an `npm run images` script wired into
`prebuild`, so Vercel produces them without bloating the repo.

## 3. Commit plan

| # | Commit | Files |
|---|---|---|
| 1 | `chore: ignore secrets and local workspace config` ✅ done | `.gitignore` |
| 2 | `chore: disable Vercel auto-deploy for feat/responsive-images` ✅ done | `vercel.json` |
| 3 | `docs: add responsive + image audit and plan` | `plans/responsive-and-images.md` |
| 4 | `build: add sharp image derivative pipeline` | `scripts/build-images.mjs`, `package.json`, `.gitignore` |
| 5 | `feat: add responsive Img component` | `src/components/Img.tsx` |
| 6 | `style: add fluid type and container scale` | `tailwind.config.ts`, `src/index.css` |
| 7 | `fix(hero): restore carousel opacity and remove fixed heights` | `src/components/Hero.tsx` |
| 8 | `fix(hero): make scholar card responsive instead of hidden below lg` | `src/components/Hero.tsx` |
| 9 | `feat(nav): add mobile navigation drawer` | `src/components/MobileNav.tsx`, `src/pages/Index.tsx` |
| 10 | `fix(publications): responsive tab strip and headings` | `src/pages/Publications.tsx` |
| 11 | `fix(supervision): responsive tab strip and cards` | `src/pages/AcademicSupervision.tsx` |
| 12 | `fix(lectures): responsive tab strip and headings` | `src/pages/Lectures.tsx` |
| 13 | `fix(funded-projects): responsive grids and headings` | `src/pages/FundedProjects.tsx` |
| 14 | `fix(gallery): responsive grid and Img adoption` | `src/pages/Gallery.tsx` |
| 15 | `fix(index): responsive sections and Img adoption` | `src/pages/Index.tsx` |
| 16 | `fix(404): responsive layout` | `src/pages/NotFound.tsx` |
| 17 | `perf: replace hero carousel art with licensed high-res sources` | `public/images/*` |
| 18 | `perf: swap in higher-resolution documentary photos` | `public/images/*` — *blocked on sourcing* |

## 4. Acceptance criteria

- **AC1** No horizontal scrollbar at 320, 360, 414, 768, 1024, 1280, 1440px on all 7 routes.
- **AC2** Every route is fully navigable at 360px — all 5 sub-pages and all section anchors reachable.
- **AC3** Scholar metrics are visible and legible at every breakpoint.
- **AC4** No `<img>` is displayed at more than 1.0× its intrinsic width at any breakpoint on a 2-DPR screen — or is flagged in the "needs a better source" list.
- **AC5** Every `<img>` has explicit dimensions (or an aspect-ratio box), `loading`, and `decoding`.
- **AC6** Homepage image payload < 500 KB (currently ~3.5 MB, dominated by `profile_image.jpg`).
- **AC7** No text smaller than 14px; tap targets ≥ 44×44px.
- **AC8** `npm run build` succeeds and `npm run lint` introduces no new errors.

## 5. Verification

No test framework is configured in this repo, so verification is manual + build-gated:

- `npm run build` after each page commit (AC8).
- Manual sweep at the six widths above via devtools device emulation (AC1, AC2, AC7).
- `scripts/check-images.mjs` — compares each image's intrinsic width against its
  largest rendered width and fails loudly on upscaling (AC4). Doubles as a regression
  guard when new images are added.
- Payload measured from the network panel on a cold load (AC6).

Adding a test framework (Vitest + Playwright for viewport regression) is worth doing but
is deliberately out of scope here — it would be its own branch.
