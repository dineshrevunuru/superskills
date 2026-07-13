---
name: design-taste
description: "Dinesh Reddy Revunuru's canonical interface taste. Load BEFORE making any visual, layout, motion, or interaction decision — designing a screen, building UI, choosing a layout, adding animation, reviewing a design, or picking between design directions. This file is the SINGLE SOURCE OF TRUTH for his taste values; every other skill references it and must never restate these values. When in doubt whether a design choice fits Dinesh, load this skill."
---

# Design Taste — Dinesh Reddy Revunuru

This is not a style guide for one product. It is the taste that governs **everything** Dinesh designs or ships. When any instruction elsewhere conflicts with this file, surface the conflict — do not silently pick one.

## The register

A staff designer **presenting** — calm authority, restraint as the loudest signal. Never a performer, never a playground, never try-hard. The work should feel like someone who has nothing to prove proving it anyway, quietly.

Governing phrase: **"Quiet surface, loud proof."** The skin stays minimal; the substance (real metrics, live demos, working systems) carries the wow.

## The taste tokens (the law)

These are verbatim commitments, not preferences:

1. **Minimal** — fewer simultaneous elements per screen. One dominant element beats three competing ones.
2. **Huge breathing room** — generous whitespace and margins, scaled beyond comfortable defaults (his portfolio direction runs ~88px breathing room at desktop scale). If it feels airy to you, it's approaching right for him.
3. **Larger, clearer text and context** — type scaled up beyond typical defaults. Readability is never traded for density.
4. **Cut, don't shrink** — when a layout fights between density and air, REMOVE elements rather than shrinking them. Shrinking to fit is a design failure; cutting is design.
5. **Accessibility-first** — explicit passes for contrast, focus states, target sizes, reduced motion, keyboard reach. Not a checklist at the end; a constraint from the start.
6. **Single restrained accent** — one accent color doing real work (his portfolio: one blue on white), soft tints over saturated fills. A second accent needs an explicit reason to exist.
7. **White / airy default** — light, open surfaces are the home register. Dark/atmospheric treatments are the exception and need justification.

## Interaction law: no interaction toys

**User-manipulated "argue with the UI" widgets read as gimmicks.** Drag-to-discover contraptions, poke-and-watch-it-react toys, flip/scrub mechanics whose purpose is cleverness — all out, even when they test perfectly.

- Default to **narrated/system-driven choreography**: things compose, draw, and converge as the content explains itself — the visitor watches evidence assemble, they don't operate a machine.
- If a proposed "wow" requires the visitor to operate a contraption → **flag it as taste-risky and propose the narrated version instead.**
- The sacred exception: **genuinely real interaction** (talking to a live AI, using a working product embed). Real ≠ gimmick. The test: does the interaction DO something true, or does it just perform interactivity?

## Motion law: small, earned, content-shaped

Motion presents the evidence; motion is never the show.

- **Scale ceiling:** full-stage spectacle choreography is out even when it's passive and system-driven. A set-piece that takes over the screen dies on sight regardless of how well it's built.
- **What survives in practice:** syllable-locked count-ups, a chart drawing itself as it's discussed, staggered chip reveals, settle-in entrances — motion shaped exactly to the content it carries.
- **Premium register: 0% overshoot.** No springs, no bounce. His locked curve system:
  - Entrances (transform): `cubic-bezier(.22,1,.36,1)` — "the settle"
  - Entrance opacity/filter: `cubic-bezier(0,0,.2,1)`
  - Exits: `cubic-bezier(.4,0,1,1)`
  - In-place morphs: `cubic-bezier(.4,0,.2,1)`
  - Durations: quick 150–250ms · standard 350–450ms · slow 550–800ms
- **Reduced-motion is honored, always** — loops gate on `prefers-reduced-motion`, dissolves get static equivalents.
- Before building any set-piece visual, assume it dies. **Propose the quiet version first.**

## Two motion registers

Motion here runs in two registers, and which one applies is not a style choice — it's decided by **who is moving the pixels.**

**Presentation register — the default.** System-driven motion that *presents* evidence: content entrances, syllable-locked count-ups, a chart drawing itself, staggered reveals, Boo's narrated choreography, everything on the portfolio. All of this file's motion rules describe this register — the motion law above (whose "premium register: 0% overshoot" names exactly this), the quick self-check's zero-overshoot line, the anti-patterns "no springs" row. Its law is unchanged: **0% overshoot, the locked four-curve system, the 350–800ms duration tiers.** No springs, no bounce. Motion serves the content and never performs.

**Gesture / direct-manipulation register — the exception.** When the user's own finger or pointer is *on* the thing — dragging a sheet, swiping a card, throwing a drawer, hauling a slider, barging in on or ducking Boo's voice — springs aren't just allowed, they're **correct.** A surface under direct manipulation has to behave like a physical object: respond on pointer-down, track 1:1 from where it was grabbed, inherit the release velocity, project momentum toward where the flick is headed, and stay grabbable and reversible at any instant. Locked ease-out curves can't do this — they can't be caught mid-flight and reversed without a visible jump; springs animate from the live on-screen value, so they can. Default to critically-damped springs (no overshoot); add a little bounce **only** when the gesture itself carried momentum — a flick, a throw — never on a surface that merely appeared. These springs settle fast (Apple's response ≈0.3–0.4s); that's a spring parameter, not a swap of the presentation tiers, which still govern the set-pieces.

**The selection rule — run it every time:**

> Is the user directly manipulating this surface with a pointer or gesture right now?
> **Yes** → gesture register. Springs, velocity handoff, interruptibility. A spring on a genuine drag surface is *right* — never flag it as breaking the motion law.
> **No** → presentation register, the default. 0% overshoot, locked curves, duration tiers. Springs are out.

The registers never fight because they never share a surface: a spring leaking onto system-driven presentation motion is one violation; a locked curve bolted onto a live drag is the other. The gesture register governs *how* a drag surface moves, not *whether* it should exist — the interaction law ("no interaction toys") still decides that, and a gimmick widget with flawless spring physics is still out. Two Emil instincts *align* with the existing law and so stay universal — not register-gated: **decelerate into rest** — never ease *in* on interactive motion, so the gesture register's ease-out and the presentation register's "settle" are the same taste — and **compositor-only** — animate `transform` and `opacity`, never layout properties, in either register. What the gesture register gates in is *only* the spring physics — interruptible, velocity-aware, bounce-on-momentum. The registers differ in interruptibility and physics, not in restraint.

`craft-motion` owns the technique for both registers and references this section for the boundary between them — it materializes the locked curves for presentation and the spring damping/response for gesture, and invents neither.

## Calibration cases (learn from real rejections)

Two things Dinesh himself spec'd, picked, and then killed on sight — the taste lives in these:

**"The Line You Draw" (killed 2026-07-06).** A draggable trust-boundary widget with caution states that settled home on release. Tested perfectly. He killed it: *"that feels gimmicky."* Lesson: a user-operated toy shifts the register from presentation to playground; self-conscious cleverness undercuts calm authority. Function is irrelevant if the feel is wrong.

**"The Convergence" (killed 2026-07-07).** A fully passive, cue-synced, zero-overshoot 34-node set-piece — no user manipulation at all. He killed it: *"That's too much. We need to roll back."* Lesson: the ceiling has a second axis — SCALE, not just agency. Even narrated spectacle dies. What replaced it: a quiet steps row and a problem card.

If a proposal resembles either case, it is presumptively dead. Argue for it only with a specific reason this instance is different — and expect no.

## Decision procedure

When making a design call, run this in order:

1. **Can I cut something instead?** (Cut beats shrink, always.)
2. **Is the visitor operating a contraption?** → propose the narrated version.
3. **Is the motion bigger than the content it carries?** → shrink the motion, not the content.
4. **Would this read as performing?** → it's out; restraint is the register.
5. **Does the quiet version lose anything real?** Usually no. Ship the quiet version.

## Quick self-check (before showing any UI)

- [ ] One dominant element per screen; nothing competing
- [ ] Whitespace feels generous to the point of luxury
- [ ] Type is larger than your first instinct
- [ ] Nothing was shrunk to fit — cuts were made instead
- [ ] Contrast, focus, target sizes, reduced-motion all pass
- [ ] One accent color, working hard
- [ ] Zero overshoot; every duration inside the locked ranges
- [ ] No widget exists whose purpose is its own cleverness
- [ ] The wow, if any, is real (live system, true metric) — not choreography

## Anti-patterns

| Don't | Do |
|---|---|
| Shrink text/elements to fit more in | Cut elements; keep the rest full-size |
| Add a draggable/pokeable "delight" widget | Narrate it: let the system compose it while explaining |
| Full-screen animated set-piece | Small, cue-synced motion on the evidence itself |
| Springy, bouncy, overshooting motion | The settle — 0% overshoot, locked curves |
| Second accent color "for variety" | One accent; vary weight and tint instead |
| Dark atmospheric skin by default | White, airy, open; dark only with a reason |
| Dense dashboard energy | One thing at a time, huge air around it |
| "Wow" that performs interactivity | "Wow" that IS the real thing working |

## Single-source-of-truth rule

Other skills (visual hierarchy, frontend building, token systems, motion, branding) must **reference this file** — "load design-taste first" — and must never restate these values. If you find taste values duplicated elsewhere, the duplicate is wrong and this file wins.

## Boundaries

This file is the **single source of all taste values, including the motion curve system and duration tiers** (per the library boundary map). What each sibling owns instead:

- **`craft-motion`** owns motion *technique* — choreography, stagger math, working CSS/GSAP/Framer code. The curves, durations, and overshoot law it animates with are defined *here*; it materializes them as tokens once per project and never invents or tweaks them.
- **`build-token-system`** encodes these values as machine-readable tokens; the *taste* (why a value is what it is) lives here — the token file is its projection, not its origin.
- **`apply-visual-hierarchy`, `build-frontend-interfaces`, `apply-personal-brand`, `create-visual-assets`** consume these values when they build — they load this file first and cite it, never restate it.
- **`craft-critique` / `verify-ui-quality`** judge work against this file's bar; they point to it for the taste standard rather than carrying a copy.

## Sources

**Dinesh's own canonical taste** — not NN/g-grounded, not a fork. Its authority is Dinesh directly, so there are no external citations: the source is the decision-maker. It is drawn from his stated preference for minimal, larger/clearer text and huge breathing room; his portfolio direction (single blue on white, generous desktop breathing room); his locked four-curve, 0%-overshoot motion system; and two set-pieces he spec'd, picked, then killed on sight — "The Line You Draw" (2026-07-06) and "The Convergence" (2026-07-07), both recorded in the Calibration cases above.

**Gesture register — grafted, MIT.** The gesture / direct-manipulation register in "Two motion registers" is grafted from Emil Kowalski's *apple-design* skill (emilkowalski/skills, "Skills For Design Engineers"), MIT. Adopted: Apple's fluid-interface principles — respond on pointer-down, 1:1 tracking, velocity handoff, momentum projection, and interruptible critically-damped springs (damping/response) — scoped to direct-manipulation surfaces only. The presentation-register default (0% overshoot, locked curves, duration tiers) is Dinesh's own and is unchanged by the graft.
