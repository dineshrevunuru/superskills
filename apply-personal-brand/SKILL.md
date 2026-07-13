---
name: apply-personal-brand
description: "Applies one of Dinesh's system themes — portfolio/Boo, Saathi (Echo Show), a salon booking-app client — to any artifact: slide decks, docs, reports, landing pages, PDFs, and charts (it supplies the dataviz palette layer). A theme here is a POINTER to a token source produced by build-token-system, never a stored palette. Use when asked to 'brand this', 'apply my theme', 'make this look like my portfolio', 'style this deck', 'use my client's branding', 'match the Echo Show project', 'theme this page/chart', or when any external-facing artifact is about to ship unstyled. NOT for choosing or storing token values (build-token-system) or making taste calls (design-taste)."
---

# Apply Personal Brand — Theme Layer for Dinesh's Systems

Make any artifact carry the identity of one of Dinesh's systems by consuming that system's token source — resolve values at apply time, map them to the artifact's anatomy, verify, ship. This file never contains a color, size, or font value; it contains pointers and procedure.

## When to use / when NOT to use

**Use when:**
- A deck, doc, report, landing page, PDF, or chart needs to look like one of his systems (portfolio, Boo, Saathi, the salon client)
- An external-facing artifact is about to ship with default/unstyled formatting
- `visualize-data` needs a palette for a chart (this skill supplies its palette layer)
- A new system or client needs a theme slot registered (see "Registering a new slot")

**Do NOT use when:**
- Deciding what the values ARE → **`build-token-system`** produces the canonical token files this skill consumes. A value that doesn't exist as a token is a request back to that skill, never an improvisation here.
- Making a taste call (element count, breathing room, type scale, motion) → **`design-taste`** — load it first, cite it, never restate it.
- Building actual product UI → **`build-frontend-interfaces`** consumes token files directly; this skill themes artifacts and collateral, not product screens.
- Matching Dinesh's *verbal* identity → **`writing-voice`**. This skill is visual-only.
- Judging whether the themed result is good enough to ship → **`craft-critique`**.

## The law: a theme is a pointer, not a palette

A theme package = **(1)** a pointer to a token source + **(2)** a role map from that source's semantic tokens to the artifact's anatomy + **(3)** the checks that must re-run after application.

- **Never re-encode.** No hex, px, or font name from a token source gets copied into this skill, a "brand doc," a theme note, or artifact code comments. Copied values fork and drift — drift is the failure this library exists to prevent.
- **Resolve at apply time, every time.** Sources move and values change. A value remembered from last month's apply is stale by definition.
- **Missing token = STOP.** If a role you need has no token in the source, route the request to `build-token-system` (or ask Dinesh). Do not fill the gap with a plausible value.

## Theme slots (the registry)

Slots are placeholders that point at token sources. They hold token *names* and locations — never values.

| Slot | Covers | Token source (resolve at apply time) | Status |
|---|---|---|---|
| `portfolio` | Career-facing artifacts: case-study pages/decks, outreach one-pagers, talk slides, anything a recruiter or hiring manager sees | Portfolio engine repo → the `:root` custom-property block in `public/index.html` (token names: `--accent --accent-soft --accent-ink --ink --mut --faint --line --green` + its declared type face). When `build-token-system` extracts a `tokens.json` for the engine, that file supersedes the `:root` block. | Live |
| `boo` | Boo product surfaces (stage, console, orb) and artifacts *about* Boo | **Alias of `portfolio`** — Boo lives in the portfolio engine and must never fork from it. Boo-specific state tokens (orb/voice states) live in the engine's own files, not here. | Live (alias) |
| `saathi` | Echo Show conversational-commerce project: APL screens, project decks, spec docs *for that platform* | Amazon conv-commerce workpack → `DESIGN-TOKENS.md` (verified APL grammar; every value tagged `[DOC]` or `[APPROX]` — preserve the tag when consuming, and label `[APPROX]` values honestly in the artifact). | Live |
| `salon` | Salon booking-app client artifacts: decks, reports, ad creative, handoff docs for the client or its customers | **No canonical token file exists yet.** Before the first themed artifact: harvest from the client's live surfaces (site, the shipped chatbot, admin app) via `build-token-system`, or ask Dinesh for the brand source. | Placeholder — never guess |
| `none` | Rubric/template-governed artifacts: graded academic submissions, ATS resume pipeline | n/a — the template or rubric wins; theming is noise there | Always available |

Notes that keep the slots honest:
- The `saathi` source's dark-navy surface is the *platform default* on Echo Show — the documented exception to the light home register (`design-taste`). It is scoped to that platform, not a license for dark artifacts elsewhere.
- `portfolio` is Dinesh's personal brand. When an artifact is "his" but no system fits, `portfolio` is the default recommendation — confirm before applying.

## The method

1. **Load `design-taste`.** The register governs a deck exactly as it governs a screen.
2. **Pick the slot by AUDIENCE, not subject** (decision tree below). If two slots could apply, or the audience is new and external: recommend one slot with a reason and confirm with Dinesh before applying. If the tree resolves cleanly, proceed.
3. **Resolve the token source.** Open the pointer target, read the current values. Source missing, moved, or empty → STOP; route to `build-token-system` or ask. Record what you resolved and when (see Output format).
4. **Map roles to the artifact's anatomy** using the role map below. Every styled part of the artifact must trace to a named token.
5. **Apply typography roles from the source** — heading face and body face as the source declares them; scale errs larger per `design-taste`.
6. **Charts:** hand the palette derivation to `visualize-data` (section below). Never color a chart directly from this skill.
7. **Re-run medium checks.** Contrast passes on the token source's home medium prove nothing about yours: re-check text/surface pairs for projector (washes out light grays), print (no glow, different whites), and dark rooms. Interactive pages also re-check focus visibility.
8. **Register check.** One accent doing real work per view; identity carried by restraint, not decoration. Two accented elements on one slide → cut one (cut, don't shrink — `design-taste`).
9. **External-facing?** Ship through `craft-critique`'s pixel-polish gate.

### Slot decision tree

```
Who is the artifact FOR?
├─ Recruiter / hiring manager / portfolio visitor      → portfolio
├─ Someone using or evaluating Boo the product         → boo (alias of portfolio)
├─ Echo Show screen or Saathi project deliverable      → saathi
├─ Salon client, their staff, or their customers       → salon (resolve source first — see slot note)
├─ Professor grading it / ATS parsing it               → none (template or rubric wins)
└─ New system or client not in the table               → no slot yet: build-token-system first,
                                                          then register a slot (section below)
```

The tree keys on audience because subject misleads: a case study *about* the salon work *for* recruiters takes `portfolio`, not `salon`.

## Role map (artifact anatomy → semantic roles)

Map each artifact part to the token source's semantic role. Token names differ per source — match by JOB, using `build-token-system`'s naming grammar.

| Artifact part | Semantic role to resolve |
|---|---|
| Page / slide background | page-surface token |
| Headings + primary copy | primary-text token, heading face |
| Captions, metadata, secondary copy | secondary/muted-text token |
| The ONE emphasized element per view (key metric, CTA, active link) | accent token |
| Soft wash behind an accented element | accent-tint token (only if the source has one) |
| Cards / callouts / raised blocks | raised-surface token + hairline/border token |
| Dividers, table rules | line/border token |
| Positive delta / success marker | feedback-positive token if the source has one — else the accent; never a new hue |
| Chart: the finding series | accent token |
| Chart: all other series | neutral ramp (muted → faint text tokens) |
| Focus rings, hover, active (live pages only) | focus/action tokens |

Two rules ride on the table:
- **No token for the role → back to `build-token-system`.** The artifact waits; the improvised hex never happens.
- **One accent per view. Never cycle accents across shapes or slides** "for visual interest" — the upstream Anthropic fork cycles three accents; that behavior is deliberately removed here per `design-taste`'s accent discipline.

## Dataviz palette layer

When the artifact contains any chart, this skill's job is to hand `visualize-data` a derivation, not colors:

1. Finding series ← the slot's accent token.
2. Every other series ← the slot's neutral ramp (secondary → faint), darkest for the nearest comparison.
3. Surface ← the slot's page-surface token.
4. `visualize-data` re-runs the built-in `dataviz` color validator on the swapped palette — a theme swap never exempts a chart from validation.

## Worked example — "Style the salon chatbot case-study deck"

Ask: theme the case-study deck about the salon's chatbot work, going to hiring managers.

1. **Slot:** audience = hiring managers → `portfolio`. (Subject is the salon client; audience picks the slot. Applying `salon` here would brand Dinesh's case study as the client's collateral — wrong.) Tree resolved cleanly; no confirmation needed.
2. **Resolve:** open the portfolio engine's `:root` block. Present and current — token names `--accent --accent-soft --accent-ink --ink --mut --faint --line --green` and the engine's declared face. For an HTML deck, reference the custom properties directly; for a `.pptx` export, resolve values once at export and note source + date in the theme note.
3. **Role map:** slides on the page surface; headings and body in `--ink` at heading/body scale; slide captions and dates in `--mut`; exactly one metric per slide carries `--accent`; callout cards get a `--line` hairline; the before→after improvement marker uses `--green` (the source's positive-feedback token — no new hue invented).
4. **Chart** (booking funnel, before/after): handed to `visualize-data` — "after" series = `--accent`, "before" = neutral from `--faint`; validator re-run on the pair.
5. **Medium check:** deck will be projected — re-check `--mut` captions against the page surface at projector contrast; one caption pair fails → captions promoted to the secondary-text role's darker option *from the source*, not a tweaked hex.
6. **Register check:** slide 4 had the metric AND a CTA both accented → CTA de-accented (one accent doing real work).
7. External-facing → `craft-critique` pixel-polish gate before send.

Result: the deck reads as the portfolio's quiet register with the salon-client proof carrying the wow — and contains zero values that don't trace to the engine's token source.

## Registering a new slot (new system or client)

1. Run **`build-token-system`** for the new system — harvest, tier, produce its token package. This skill does not shortcut that step.
2. Add one row to the slot table: slot name, what it covers, the source pointer, status.
3. A slot whose "source" is hex values pasted into this file is invalid — that is re-encoding, the exact failure the boundary exists to prevent.
4. One-off third-party theme (conference template, co-branded deck): consume *their* guidelines as a temporary source pointer the same way. Register a slot only if the relationship recurs.

## Anti-patterns

| Don't | Do |
|---|---|
| Paste hex/px/font values into this skill, a theme note, or artifact comments | Point at the token source; resolve at apply time |
| Keep a "brand palette" doc parallel to the token files | One source; a parallel doc is drift on a schedule |
| Cycle accents across shapes or slides (upstream fork behavior) | One accent per view — `design-taste` |
| Pick the slot by artifact subject | Pick by audience (salon case study for recruiters = `portfolio`) |
| Theme a graded or ATS-parsed artifact | Slot `none`; the template/rubric wins |
| Guess the client's colors from memory or industry vibes | Resolve the source or ask; STOP if missing |
| Apply saathi's dark navy to a one-pager "because it's a Saathi artifact" | Dark is platform-scoped; other audiences resolve per the tree + light home register |
| Theme as a decoration pass over a dense artifact | Cut content first (`design-taste`), then theme |
| Trust contrast because the source system passes | Re-check per medium: projector, print, dark room |
| Fix a failing pair by nudging the resolved hex | Swap to a different token from the source, or send the gap to `build-token-system` |

## Output format

Deliver the themed artifact plus a 3-line **theme note** kept with the artifact (never in this skill):

```
THEME: portfolio — resolved from <source file> on <date> (commit/version if available)
CHECKS: contrast re-run for <medium> · dataviz validator re-run (if charts) · register check done
EXCEPTIONS: <any [APPROX] values consumed, any roles routed back to build-token-system>
```

## Boundaries

- **`build-token-system` ↔ this skill:** tokens are canonical values, produced ONCE, there. This skill consumes them as themes and never re-encodes a value. If brand work needs a value that isn't a token, the request goes back there.
- **`design-taste`** is the single source of all taste values (register, accent discipline, cut-don't-shrink, motion). Cited throughout; never restated.
- **`visualize-data`** (+ built-in `dataviz`) owns chart method and validation; this skill only supplies the palette derivation.
- **`build-frontend-interfaces`** consumes token files directly for product UI; this skill themes artifacts and collateral.
- **`writing-voice`** owns verbal identity; this skill is visual-only.
- **`craft-critique`** judges the themed result and gates external shipping.

## Sources

- Adapted from Anthropic's **`theme-factory`** and **`brand-guidelines`** skills — mechanism adopted (choose → confirm → apply consistently; shape: encode roles once). All values replaced with pointers to Dinesh's token sources; the upstream three-accent cycling behavior deliberately removed per `design-taste`'s accent discipline.
- Not NN/g-grounded — a systems/theming skill, so it carries fork attribution in place of nngroup.com citations.
