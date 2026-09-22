# Dr. Mukherjee's feedback — September 2026

Source: WhatsApp messages dated 01/09, 04/09, 05/09 and 15/09 2026.
Branch: `feat/sept-feedback`.

## Decisions taken before starting

| Question | Answer |
| --- | --- |
| How far to take "white background" | Default to light, **keep** the dark toggle |
| Which presentation for the merged research section | Follow Dr. Mukherjee's wording; presentation is mine to judge |
| Journal count 29 → 35 | **Deferred** — six papers are missing from the data |
| Where the Consultancy Project tab lives | Two tabs on the Funded Projects page |
| SERB → ANRF scope | Rename **everywhere**, including completed grants |
| Agency logos | Source via browser search |

## Items

1. **Patent tab under Publications** (01/09) — already present as "Patents"; no change needed.
2. **Merge "Research" and "Research Interests"** → one section titled "Research Interests",
   keeping only *Information Security* and *AI Applications*. Also fixes a real bug: the hero
   band and the interests section both carry `id="research"`, so the nav anchor is ambiguous.
3. **Default theme white.**
4. **No categories on funded projects** — flat list.
5. **SERB → ANRF** in all six places.
6. **Agency logos** on the funding cards.
7. **Co-supervisor above current position** on awarded supervision cards.
8. **JCDL 2025**: year `Accepted` → `2025`, indexed `IEEE` → `ACM/IEEE`.
9. **Consultancy Projects tab**: "Total projects offered: 07 (Not allowed as per institute norms)".

## Outstanding — needs Dr. Mukherjee

- **Six journal papers.** The publications header derives its count from the array, which
  holds 29; he asked for 35. The count is deliberately *not* hardcoded — a literal would
  read 35 while the Journals tab listed 29, which is the same drift that produced the old
  ₹87.86L funding mismatch. Add the six papers to `src/data/publications.ts` and the
  header corrects itself.
- **High-resolution originals** for `image1`, `image4`, `image6` (and `image2`, borderline).
  `npm run check:images` fails on these by design.
- **Sreeparna Ganguly's current position**, if one should be shown.

## Acceptance criteria

- One section with `id="research"`, titled "Research Interests", two entries.
- A fresh visitor with an OS set to dark lands on the white theme; the toggle still works.
- Funded Projects shows a flat list under a "Funded Projects" tab and a
  "Consultancy Projects" tab with the count and the norms note.
- No occurrence of "SERB" remains in `src/`.
- Awarded supervision cards print the co-supervisor line above the position line.
- Contrast sweep passes on every route in both themes.
