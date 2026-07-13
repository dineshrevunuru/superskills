---
name: build-frontend-interfaces
description: "Builds distinctive, production-quality frontend interfaces — pages, components, landing pages, case-study pages, claude.ai artifacts — in Dinesh's visual register. Use when asked to 'build a page', 'build this component', 'code this UI', 'make a landing page', 'create an artifact', 'redesign this screen', or for any HTML/CSS/React/Next.js work where how it looks matters as much as whether it runs. Plans before coding, with design-taste loaded as the default direction; routes tooling to web-artifacts-builder or the built-in artifact-design. NOT for throwaway test prototypes (build-coded-prototypes) or post-build mechanical QA (verify-ui-quality)."
license: "Apache-2.0 — forked from Anthropic's official `frontend-design` plugin skill (full terms in that plugin's LICENSE.txt). Adapted to Dinesh's register and the design-taste / craft-critique skill boundaries."
---

# Build Frontend Interfaces

Ship UI that could not be mistaken for a template: plan first, constrain by taste, spend boldness in exactly one place, build on the right tooling, and don't call it done without a verdict.

## When to use / when NOT to use

**Use when:** building or reshaping any interface surface where the visual outcome is part of the deliverable — portfolio pages, client-facing screens, marketing/launch pages, dashboards, artifacts, components.

**Do NOT use when:**

| Situation | Use instead |
|---|---|
| Quick prototype to test a flow, hypothesis, or AI behavior | `build-coded-prototypes` |
| Mechanical post-build checks (browser automation, cross-device, performance) | `verify-ui-quality` |
| Judgment verdict on finished work | `craft-critique` |
| Any chart, graph, or KPI tile | built-in `dataviz` skill first, then return here for the surrounding page |
| Standalone visual asset (poster, OG image, illustration) | `create-visual-assets` |
| Producing or restructuring a token file | `build-token-system` |

## The method — seven phases, in order

Do not skip or reorder. Each phase gates the next.

### Phase 0 — Load `design-taste` (blocking)

The design plan starts here, not with neutral token guidance. If `design-taste` is not in context, load it before writing a single line of plan or code. It is the single source of truth for element count, breathing room, type scale, color register, accent policy, motion curves and durations, and the interaction laws. **Never restate its values in your plan — cite it and comply.** If the brief conflicts with it, surface the conflict to Dinesh; do not silently pick a side.

### Phase 1 — Pin the subject

If the brief doesn't pin down what the product or subject is, pin it yourself and state your choice:

1. **One concrete subject** — what this page is actually about.
2. **Its audience** — who reads it and in what mood/time budget.
3. **The page's single job** — one sentence. A page with two jobs gets cut to one (cutting is the taste).

Distinctive choices come from the subject's own world — its materials, instruments, artifacts, vernacular. Build with the brief's real content throughout, never lorem ipsum.

### Phase 2 — Write the design plan (before any code)

A compact token plan with four sections. Under Dinesh's register the freedom axes are narrower than a generic project — plan accordingly:

- **Color** — `design-taste` locks the surface register and accent policy. Your remaining decision: the *specific* accent hue and its tints, drawn from the subject's world, plus text/surface neutrals. Name 4–6 hex values.
- **Type** — **this is your main distinctiveness axis.** Pair a characterful display face (used with restraint) with a complementary body face, plus a utility face for captions/data if needed. Never the family you'd reach for on any other project. Set the scale, weights, and spacing intentionally — type carries the personality of the page.
- **Layout** — one-sentence concept + an ASCII wireframe to compare options. The hero is a thesis: open with the most characteristic thing in the subject's world. Element count and air are governed by `design-taste`.
- **Signature** — the single element this page will be remembered by. Run every candidate through `design-taste`'s decision procedure before it enters the plan; the strongest signatures in this register are real systems working, not choreography. Motion, if any, defers entirely to `design-taste`'s motion law — the plan names only *where* motion earns its place, never invents its own curves or durations.

If the project already has a token file (from `build-token-system`) or brand theme (`apply-personal-brand`), consume it — never re-derive values.

### Phase 3 — Anti-generic check (revise before building)

AI-generated design clusters around known default looks. Check your plan against all four:

| # | Default look | Tell |
|---|---|---|
| 1 | Warm cream bg (~#F4F1EA) + high-contrast serif display + terracotta accent | Appears regardless of subject |
| 2 | Near-black bg + single acid-green or vermilion accent | Also conflicts with the home register in `design-taste` — dark needs explicit justification |
| 3 | Broadsheet: hairline rules, zero border-radius, dense newspaper columns | Density itself fails the taste |
| 4 | **Generic-minimal SaaS** — white page, default sans (Inter), gray-on-gray text, safe blue accent, centered hero + three feature cards | **The trap specific to this register.** Passing `design-taste` is necessary, not sufficient |

Look #4 is the one that will actually bite you: because the home register is light and minimal, lazy execution reads as "any SaaS template." Distinctiveness must come from type, composition, and the signature — not from the palette.

Two tests, run both:

- **Swap test:** would this exact plan work unchanged for a different subject in the same category? If yes, it's a default, not a choice. Revise that part and say what you changed and why.
- **Regenerate test:** mentally work through a similar prompt cold — do you arrive at the same plan? If yes, revise.

Where the brief pins a visual direction, follow it exactly — the brief's words win (surface taste conflicts per Phase 0). Where it leaves an axis free, don't spend the freedom on a default. Do this planning and iteration internally; show Dinesh the plan once you're confident it would survive his eye.

### Phase 4 — Choose tooling (decision tree)

```
What are you building?
├─ A claude.ai artifact?
│  ├─ Needs state management, routing, or shadcn/ui components
│  │  → invoke `web-artifacts-builder` (its init → develop → bundle pipeline).
│  │    Never hand-roll or restate its pipeline.
│  └─ Single-file HTML/JSX page
│     → invoke the built-in `artifact-design` skill first (it calibrates
│       design investment for artifacts), then build directly.
├─ Code in an existing repo (portfolio, client app, product codebase)?
│  → No artifact tooling. Follow the repo's conventions and token files;
│    read existing components before adding new ones.
├─ Does any screen contain a chart / graph / stat tile?
│  → invoke the built-in `dataviz` skill BEFORE writing chart code.
│    Layer on top of it; never claim to replace it.
└─ Is this actually a throwaway prototype to test something?
   → Stop. This is `build-coded-prototypes` territory.
```

These tools are invoked, never duplicated. If `web-artifacts-builder` and this skill disagree on process mechanics, its pipeline wins for artifact plumbing; this skill wins for design decisions.

### Phase 5 — Build

Follow the revised plan exactly; derive every color and type decision from it.

- **CSS specificity trap:** class selectors (`.section`) and element/type selectors cancel each other out silently, especially paddings/margins between sections and CTAs. Structure specificity deliberately; prefer one consistent selector strategy.
- **Structure is information:** numbering, eyebrows, dividers, and labels must encode something true about the content. Numbered markers (01/02/03) only when the content genuinely is a sequence. Decoration that encodes nothing gets cut.
- **Copy is design material:** write it with the same intention as spacing. Active voice, name actions by their outcome ("Save changes," not "Submit"), keep one name per action through the whole flow, errors state what happened and how to fix it. For anything beyond labels, draft per `write-ux-microcopy` voiced through `writing-voice`.
- **Quality floor, built in without announcing it:** responsive down to mobile (~375px, no horizontal scroll), every state designed (empty/loading/error, not just happy path), and the full accessibility pass that `design-taste` mandates.
- **Look at it:** screenshot as you build if the environment supports it — a picture is worth 1000 tokens. Critique your own work between passes.

### Phase 6 — Restraint pass

Before showing anything:

1. **Remove one accessory** (Chanel's rule): find the one element, effect, or flourish the page survives without, and cut it.
2. **Boldness audit:** confirm boldness lives in exactly one place — the signature. Everything around it stays quiet and disciplined.
3. Run `design-taste`'s **quick self-check**, item by item. Any failure → fix before showing.

### Phase 7 — Critique pass

Load `craft-critique` and run its framework over the built UI, including the claims audit on any metric or statement the interface displays. A build is not done at "it runs" — it's done at **PASS** or **PASS WITH NOTES**. Resolve anything that blocks ship before Dinesh sees it.

## Worked example — design plan

**Brief:** portfolio case-study page for Tara, the live AI salon chatbot Dinesh shipped for his Chicago salon client.

**Subject pin:** Tara — a working AI assistant that handles consultation inquiries for a hair-system salon. Audience: design hiring managers skimming a portfolio, ~90 seconds of attention. Single job: prove Dinesh ships working AI products, not concept decks.

**First pass, caught (Phase 3):** the reflex draft was a white page, Inter, a safe blue accent, a centered hero, and three feature cards linking out to the demo — textbook Look #4. The swap test killed it: drop in any other AI project and the plan is unchanged, so it's a default, not a choice. Discarded before a line of code. The plan below is the revision — distinctiveness moved off the palette and into type, the live-conversation signature, and a product-drawn accent.

**Color** (illustrative values — pull real ones from the case-study's source system / existing token file):
- Surface + text neutrals per the `design-taste` register: `#FFFFFF`, `#111418`, `#5C6470`
- Accent role: one deep tone drawn from the product's own UI, e.g. `#1E4FD8`, with soft tints `#E8EEFB` / `#C9D8F6` for chips and callouts

**Type:** Display — a quietly characterful grotesque with real personality at large sizes (not the default sans every generated page reaches for). Body — a highly readable companion face, scaled up per taste. Utility — a mono for transcript excerpts and system labels, because the subject's world is *conversation logs and routing code*; the mono encodes that truth.

**Layout:**
```
[ Full-width headline: what Tara does, in one line          ]
[ THE SIGNATURE: live embedded Tara conversation            ]
[ problem → approach, one element at a time, huge air       ]
[ evidence row: real outcome metric (from source, verified) ]
[ how it works: router diagram, narrated reveal on scroll   ]
```

**Signature:** an embedded *live* conversation with Tara — real interaction, which is the register's sacred exception (verified against `design-taste`'s decision procedure). Fallback if a live embed is infeasible on this surface: a real transcript replaying as system-driven narration — never a visitor-operated toy.

**Anti-generic check:** swap test — this plan does not survive a subject swap (mono-for-transcripts, live-demo signature, and accent-from-product are all Tara-specific). Look #4 avoided: type pairing and signature carry the distinctiveness; the palette alone would not. Metric in the evidence row is displayed only after passing `craft-critique`'s evidence protocol — never hardcoded from memory.

**Tooling:** this is portfolio repo code → repo conventions + existing token file; `dataviz` invoked if the evidence row grows a chart.

## Anti-patterns

| Don't | Do |
|---|---|
| Start coding before a written design plan | Plan → anti-generic check → then code |
| Write a "neutral" plan and bolt taste on afterward | `design-taste` in context before the first token is chosen |
| Paste taste values (spacing, curves, accent policy) into the plan | Reference `design-taste`; comply without copying |
| Hand-roll React scaffolding + bundling for a complex artifact | Invoke `web-artifacts-builder` |
| Rebuild chart styling from scratch | Invoke built-in `dataviz` first, layer on top |
| Default typeface + safe blue and calling it "minimal" | Distinctive type + subject-grounded accent; minimal ≠ generic |
| Numbered markers / eyebrows / dividers as decoration | Structural devices only when they encode true content facts |
| Lorem ipsum or filler copy in anything shown | Real content; copy drafted per `write-ux-microcopy` |
| Scattering small effects everywhere | One orchestrated signature; everything else quiet |
| Declaring done at "it compiles and renders" | `craft-critique` verdict of PASS / PASS WITH NOTES |
| Shipping a metric or claim baked into the UI from memory | Every displayed claim passes the evidence protocol in `craft-critique` |

## Boundaries

- **`design-taste`** — single source of ALL taste values, including motion curves and durations. This skill loads it first and never restates it.
- **`craft-critique`** — owns judgment, verdict language, and the evidence-discipline protocol. Phase 7 defers to it entirely.
- **`verify-ui-quality`** — owns mechanical verification (browser automation, click-paths, cross-device, performance). Run it after this skill for anything shipping externally.
- **`build-coded-prototypes`** — owns Goldilocks-fidelity prototypes built to test hypotheses; this skill owns production-quality surfaces.
- **`web-artifacts-builder` + built-in `artifact-design` + built-in `dataviz`** — tooling utilities: invoked per the Phase 4 tree, never forked, never restated, never replaced.
- **`build-token-system` / `apply-personal-brand`** — produce canonical tokens/themes; this skill consumes them when they exist.
- **`write-ux-microcopy` / `writing-voice`** — own interface copy and voice beyond labels.

## Sources

- Forked from Anthropic's official **`frontend-design`** plugin skill, Apache-2.0 (full terms in that plugin's `LICENSE.txt`). Adopted: the distinctive-over-templated stance, plan-before-code, and the anti-generic-default discipline. Adapted for this library: `design-taste` loaded as the blocking default direction (Phase 0), the seven-phase gate, the register-specific **Look #4 (generic-minimal SaaS) trap**, tooling routed to `web-artifacts-builder` / built-in `artifact-design` / built-in `dataviz`, and the `craft-critique` verdict gate (Phase 7).
- Not an NN/g-grounded skill — no research-corpus citations apply.
