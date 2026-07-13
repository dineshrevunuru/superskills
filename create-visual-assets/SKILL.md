---
name: create-visual-assets
description: "Creates finished static visual assets — posters, case-study hero images, OG/social cards, cover art, one-page PDF art pieces — using a two-step philosophy-first method: write a short design philosophy, then express it on canvas as PNG/PDF, inside Dinesh's minimal taste. Use when asked to 'make a poster', 'design a cover', 'create an OG image', 'hero image for this case study', 'make a social card', 'turn this into a visual piece', or any standalone static graphic. NOT for UI screens (build-frontend-interfaces), charts (visualize-data), or anything that moves (craft-motion)."
license: "Apache-2.0 — forked from Anthropic's `canvas-design` skill. Philosophy-first two-step method retained; aesthetic re-grounded in `design-taste`. See `## Sources`."
---

# Create Visual Assets

Produce a static art object — poster, hero image, cover, card — in two steps: first write the design philosophy, then express it visually. The philosophy is written inside Dinesh's taste envelope, never outside it.

## When to use / when NOT to use

**Use for:** portfolio case-study hero images, OG/social preview cards, talk or deck cover pages, printable one-page art pieces, section dividers, conceptual posters, any standalone PNG/PDF visual.

**Do NOT use for:**
- UI screens, components, pages → `build-frontend-interfaces`
- Charts, graphs, data graphics → `visualize-data` (which loads the built-in `dataviz`)
- Motion, transitions, animated anything → `craft-motion`
- Brand-token application across a product surface → `apply-personal-brand`
- Multi-page documents whose job is reading, not looking → docx/pptx/pdf utilities

Never imitate a living artist's recognizable work — original compositions only.

## The method (steps 0–6, in order)

### Step 0 — Load `design-taste` first

Non-negotiable. Every philosophy this skill writes is a *local expression* of that file, not a new aesthetic. If the request pulls against it (dark, loud, dense, novelty), surface the conflict before designing — do not silently comply or silently refuse.

### Step 1 — Brief intake (60 seconds, 4 answers)

| Question | Why |
|---|---|
| What TYPE and SIZE? | poster / OG card 1200×630 / hero 2400×1200 / A4 PDF — pixel dimensions decide everything downstream |
| Where does it LIVE? | link preview, portfolio page, print, projector — sets contrast, margin, and type-size floor |
| What ONE idea must it carry? | one asset = one idea. If the brief has three ideas, cut two (per `design-taste`: cut, don't shrink) |
| Is this a Dinesh-brand asset? | if yes, pull palette/type from `apply-personal-brand` tokens instead of choosing fresh |

If any answer is missing and guessable, state the assumption in one line. If not guessable, ask.

### Step 2 — Deduce the subtle reference

Find the conceptual thread of the subject and plan to weave it into form — never announce it. Someone who knows the subject should *feel* it; everyone else sees a clean composition. Think jazz quote, not caption.

- Voice product → turn-taking rhythm in the spacing
- Research piece → repeated marks accumulating like observations
- Booking system → a grid with one slot filled

The reference lives in structure, color, or rhythm — not in an illustrated icon of the thing.

### Step 3 — Write the philosophy (.md, before any canvas code)

Name the piece's micro-movement (1–2 words) and write **3–5 short paragraphs** covering, once each:

1. Space and form — what dominates, what is absent
2. Color and material — palette logic (defer accent/surface rules to `design-taste`)
3. Scale and rhythm — what is monumental, what whispers, what repeats
4. Composition and hierarchy — where the eye lands first and why
5. Craft standard — state plainly that the result must read as meticulous, labored-over, expert work; precision is the register, not decoration

**Philosophy rules:**
- It is an aesthetic worldview, NOT a layout spec — leave interpretive room for the expression step
- 90% visual, 10% text: information lives in space, form, and color; words are rare and load-bearing
- Each design aspect appears once — no restating color logic three ways
- It must be expressible inside the `design-taste` envelope; if it can't be, it's the wrong philosophy

Save it as `<asset-name>-philosophy.md` next to the output.

### Step 4 — Express on canvas

Pick the tool by output:

```
Need PNG at exact pixels, full typographic control → HTML/CSS at fixed dimensions → headless screenshot (default choice)
Geometric/systematic marks, repeated elements     → SVG (hand-write coordinates) → render to PNG
Print PDF                                        → same HTML → print-to-PDF, or reportlab if programmatic layout wins
```

**Canvas hard rules (mechanical, check every one):**
- Nothing overlaps. Nothing clips at edges. Every element has clear separation.
- Margins generous beyond comfortable — the `design-taste` breathing-room law applies to canvases too
- Limited, intentional palette — accent and surface rules per `design-taste`
- Text minimal and visual-first: a large essential word or two, small clinical labels; never explanatory blocks
- Perfect shapes, deliberate alignment — a 1px-off edge reads as AI slop
- Repetition builds meaning: dense accumulations of marks, layered patterns, systematic reference markers that reward a second look — restraint in element *types*, patience in element *count*

**Fonts — use the bundle in place, do NOT copy it (~5.5MB):**
The OFL families ship with the sibling `canvas-design` skill in its `canvas-fonts/` directory — reference them there (`canvas-design/canvas-fonts/`), never duplicate them into this skill or the project.
(On any machine without that bundle, fetch the same OFL fonts from Google Fonts.)

| Fits the register (default pool) | Taste-risky — needs an explicit reason |
|---|---|
| Work Sans, Instrument Sans, Outfit (clean sans) | Erica One, Boldonse, Big Shoulders (loud display) |
| Geist Mono, IBM Plex Mono, JetBrains Mono (clinical labels) | Pixelify Sans, Silkscreen (novelty pixel) |
| Crimson Pro, Lora, Instrument Serif (earned warmth) | Nothing You Could Do, Smooch Sans (handwriting) |
| Jura Light, Poiret One (thin display, large sizes only) | Gloock, Italiana at body sizes (display misused) |

Load via `@font-face` pointing at the bundle path. Thin weights at large sizes suit the register; never trade legibility for thinness.

### Step 5 — The refine pass (mandatory, additive-free)

Assume the first render is not good enough. Do a second pass with one rule: **refine what exists; add nothing.** If the instinct is to draw a new shape or add a texture — stop, and instead ask: "how does what's already here become more of one piece?" Tighten alignment, unify spacing rhythm, recheck edges, remove the weakest element. Removal is allowed; addition is not.

### Step 6 — Gate before delivering

Run `craft-critique` on the final render — the pixel-polish ship gate and a recorded verdict, not "looks done." Any claim rendered *inside* the asset (a metric, a quote) is handled per `craft-critique`'s evidence protocol. Deliver only on PASS or PASS WITH NOTES.

## Worked example — OG card for the salon-chatbot case study

**Brief:** 1200×630 OG image for a case study on a live AI receptionist chatbot built for a salon's booking app (call the assistant "Ava"). Lives in link previews at ~500px wide. One idea: *a receptionist that never stops answering.* Dinesh-brand asset → palette/type from `apply-personal-brand` tokens.

**Subtle reference:** chat turn-taking. Expressed as two alternating columns of quiet horizontal bars — left-aligned bars and right-aligned bars in a breathing rhythm down the canvas, like a conversation seen from far away. No chat bubbles, no phone illustration, no robot icon.

**Philosophy — "Measured Air" (condensed here; real one runs 3–5 paragraphs):**

> Space is the message: one word holds the field, everything else recedes to the margin. The composition is a conversation heard through a wall — presence, rhythm, no words. What is absent (faces, devices, decoration) is the design.
>
> Color is a single working accent on an open surface, per the taste law. The accent appears exactly where the rhythm resolves — the final bar, the answer.
>
> Every bar is placed to the pixel; the rhythm's spacing is a strict scale, not eyeballed. The piece must read as labored-over: obsessive alignment as the visible signature of expertise, ornament as its opposite.

**Expression decisions:** HTML at 1200×630 → headless screenshot. Type: "Ava" large in Work Sans, one small Geist Mono label ("AI receptionist — live") anchored low-left. Fourteen alternating bars, tint-weighted; only the last bar carries the accent at full strength. Margins luxurious even at preview scale.

**Refine pass:** killed a second label line (the salon's name and city) — two labels competed; the case-study page carries the client name. Snapped bar rhythm from three ad-hoc gaps to one repeating pair. Re-rendered.

**Gate:** craft-critique verdict PASS WITH NOTES (🟢 consider a 1600px variant for retina previews). Delivered: `ava-og.png` + `ava-og-philosophy.md`.

## Anti-patterns

| Don't | Do |
|---|---|
| Jump straight to canvas code | Write the philosophy first — it is the design decision |
| Spec the layout inside the philosophy | Philosophy = worldview; expression step makes layout choices |
| Illustrate the subject literally (robot icon for AI, chat bubble for chatbot) | Weave the reference into structure and rhythm |
| Add elements during refinement | Refine or remove only — the second pass is subtractive |
| Paragraphs of text on the canvas | A few load-bearing words; space does the explaining |
| Gradient soup, texture stacking, "premium" glow | Flat, precise, intentional — restraint is the register |
| Cartoony/clip-art energy for "fun" briefs | Sophistication regardless of subject; playful ≠ amateur |
| Copy the font bundle into this skill or the project | Reference it at its original path; fetch from Google Fonts elsewhere |
| Ship on "looks good to me" | craft-critique gate with recorded verdict |
| Mimic a recognizable living artist's style | Original composition grounded in the written philosophy |

## Output format

Every run delivers exactly:
1. `<asset-name>.png` or `.pdf` — the piece, at the brief's exact dimensions
2. `<asset-name>-philosophy.md` — the philosophy it expresses
3. The craft-critique verdict line (PASS / PASS WITH NOTES + notes)

## Boundaries

- **design-taste** owns every taste value (element count, breathing room, type scale, accent/surface, motion — all of it). This skill applies them by reference, never restates them.
- **craft-critique** owns the ship verdict and the evidence protocol for any claim rendered in the asset.
- **build-frontend-interfaces** owns interactive/UI surfaces; this skill owns static art objects.
- **visualize-data** owns anything with axes, scales, or encoded data.
- **craft-motion** owns anything that moves; if an asset later animates, hand it off.
- **apply-personal-brand** owns Dinesh-brand tokens; brand assets consume them here rather than re-deriving palette/type.

## Sources

- Forked from Anthropic's **`canvas-design`** skill, **Apache License 2.0** (LICENSE.txt ships with the source; terms at http://www.apache.org/licenses/LICENSE-2.0). Retained: the two-step philosophy-first method (write the philosophy `.md`, then express on canvas) and the "never copy a living artist" rule. Re-grounded: the aesthetic is now a local expression of `design-taste`, not a free-standing style; the ship gate routes through `craft-critique`.
- **`design-taste`** — canonical taste values (element count, breathing room, type scale, accent/surface); this skill points, never restates.
- **`craft-critique`** — the ship verdict and the evidence protocol for any claim rendered inside an asset.
- Font bundle: OFL-licensed families shipped with `canvas-design`'s `canvas-fonts/`. Reference in place; off that machine, fetch the same families from Google Fonts. Never copied into this skill or the project.
