# Image credits and provenance

## Hero carousel — decorative stock

These four are generic subject illustrations, not photographs of Dr. Mukherjee's
work. They were replaced because the previous files were 800–2048px against a
2304px requirement (a 1152px display at 2× DPR) and their licensing was not
recorded anywhere in the repo.

Sourced from Unsplash under the [Unsplash License](https://unsplash.com/license),
which permits free commercial and non-commercial use without permission or
attribution. Exact source URLs, so each is traceable:

| File | Source |
|---|---|
| `quantum-computer.jpg` | `https://images.unsplash.com/photo-1635070041078-e363dbe005cb` |
| `cryptography.jpg` | `https://images.unsplash.com/photo-1614064641938-3bbee52942c7` |
| `QML.jpg` | `https://images.unsplash.com/photo-1555949963-ff9fe0c870eb` |
| `steganography.jpg` | `https://images.unsplash.com/photo-1550751827-4bd374c3f58b` |

All four were fetched at `?w=2400&q=80&fm=jpg`.

These are placeholders in the sense that generic stock art is a weaker choice than
real photographs of the lab, equipment, or research output. If such photographs
exist, they should replace these.

## Gallery and profile — documentary photographs

`profile_image.jpg`, `image1`–`image6`, `5G.jpg`, `BCCL.jpg`, and `Plane.jpg` are
photographs of Dr. Mukherjee and of real events. They are **not** interchangeable
with stock imagery: the gallery presents them as a record of specific research
activities, so substituting photographs of other people would misrepresent that
record.

Four are below the resolution they are displayed at and need original files from
Dr. Mukherjee. `npm run check:images` reports the current state; as of this
writing:

| File | Have | Need | Note |
|---|---|---|---|
| `image1.jpg` | 200px | 800px | Lecture at a podium |
| `image4.jpg` | 275px | 800px | Award ceremony |
| `image6.jpg` | 213px | 800px | Portrait |
| `image2.jpg` | 768px | 800px | Marginal — 96% |

A search of public sources (IIIT Kalyani faculty page, the IRINS profile, and a
Google Images sweep) found no higher-resolution copies. The IRINS portrait is
286×311, smaller still. Several results were this site's own files being indexed
back, and `image2`/`image3` match LinkedIn's served sizes exactly — which suggests
these were saved from LinkedIn posts rather than from originals. The camera
originals are the only realistic fix.

Note also that the gallery captions do not describe these photographs: `image1`
(a lecture) is captioned "Quantum Computing Lab", `image4` (an award ceremony) is
"Security Seminar", and `image6` (a portrait) is "Research Team". These are
leftovers from the template and should be rewritten by someone who knows what the
photographs actually show.
