---
name: craft-motion
description: "Designs and implements UI motion the way Dinesh ships it — choreography, stagger math, state feedback, and working code for CSS, GSAP, and Framer Motion, all inside the quiet register where motion presents the evidence and is never the show. Use when adding or fixing any animation: 'animate this', 'add a transition', 'stagger these cards', 'motion for this modal/list/page', hover/press feedback, loading/success/error states, scroll reveals, or when motion 'feels robotic/janky/too much'. Load design-taste FIRST — every curve, duration tier, and the overshoot law live there, never here."
license: "MIT — forked from the LottieFiles motion-design skill (director layer replaced, craft mechanics adapted); universal rules + gesture mechanics + motion review bar grafted from Emil Kowalski's emilkowalski/skills (MIT, © 2026)"
---

# Craft Motion

Turn a motion intent into shipped, token-driven animation: decide the category, do the stagger math, pick properties, implement in CSS/GSAP/Framer Motion, and gate it for reduced motion — without ever restating a taste value.

## When to use / when NOT to use

**Use when:** implementing entrances, exits, staggered reveals, state feedback (hover, press, success, error, loading), modal/page transitions, scroll-triggered reveals — or diagnosing motion that feels robotic, slow, cheap, or distracting.

**Do NOT use when:**
- Deciding **whether** a motion idea should exist at all, or whether it's too big — that is `design-taste`'s motion law and calibration cases ("The Convergence" died as pure choreography). Run its decision procedure first; this skill only builds what survives.
- Rendering a **verdict** on finished motion — `craft-critique` owns judgment and verdict language.
- Measuring fps/jank/bundle impact mechanically — `verify-ui-quality`.
- Animating charts — `visualize-data` (which layers on the built-in `dataviz` skill); come back here only for the easing/stagger tokens.

## Step 0 — Load order and the token rule (mandatory)

1. **Load `design-taste`.** It is the single source of the locked curve system (entrance transform, entrance opacity/filter, exit, in-place morph), the three duration tiers (quick / standard / slow), the overshoot law, the scale ceiling, and the reduced-motion law.
2. **Materialize those values ONCE per project as named tokens.** Every animation references tokens. An inlined `cubic-bezier(...)` or raw millisecond value anywhere else in the codebase is a defect.

```css
:root {
  /* Fill every value from design-taste. Never invent, never tweak. */
  --ease-enter:      /* design-taste: entrance transform curve ("the settle") */;
  --ease-enter-soft: /* design-taste: entrance opacity/filter curve */;
  --ease-exit:       /* design-taste: exit curve */;
  --ease-morph:      /* design-taste: in-place morph curve */;
  --dur-quick:       /* design-taste: quick tier — pick ONE value in its range */;
  --dur-standard:    /* design-taste: standard tier — one value */;
  --dur-slow:        /* design-taste: slow tier — one value */;
}
```

For JS animation systems, mirror the same seven values in one `motion-tokens.(js|ts)` file. One source per project, filled from `design-taste`, imported everywhere.

## Universal motion craft rules (both registers)

Seven laws that hold for **every** animation regardless of register — they reinforce `design-taste`, never override it. The method below applies them in the **presentation register** (design-taste's default 0%-overshoot "settle"); the **gesture register** applies the same laws through springs (see *Gesture register implementation*). Curve, duration, and overshoot **values** are never restated here — they live in `design-taste`'s two registers, referenced by name.

| Law | Rule | Where the value lives |
|---|---|---|
| **Ease-out, never ease-in; custom over built-in** | Enter and exit on a strong custom curve that starts fast; `ease-in` on any UI motion is a defect — it delays the exact moment the user watches. Bare `ease`/`ease-in-out`/built-ins are too weak for deliberate motion; linear is legal ONLY for loops | `--ease-enter`/`--ease-exit`/`--ease-morph` tokens (design-taste presentation curves are already strong ease-outs — this law just names why) |
| **GPU-only** | Animate `transform` + `opacity` only; animating `width`/`height`/`margin`/`padding`/`top`/`left`/`box-shadow` (or Framer `x`/`y`/`scale` shorthands under load) is a performance defect | mechanic |
| **Origin from the trigger** | Popovers, dropdowns, tooltips scale from their trigger via `transform-origin` (`var(--radix-popover-content-transform-origin)`), not center. **Modals are exempt — they stay centered** | mechanic |
| **Never `scale(0)`** | Nothing appears from nothing. Start entrances at `scale(.9–.97)` + `opacity:0`, never `scale(0)` | scale floor → design-taste |
| **Interruptible** | Rapidly-triggered or gesture-driven motion retargets from the CURRENT on-screen value, never restarts keyframes from zero. CSS transitions retarget; `@keyframes` do not | mechanic |
| **Asymmetric enter/exit** | The deliberate phase (a press, a hold, a destructive confirm) runs slower; the system's response snaps. Symmetric timing on a press-and-release is a defect | tiers → design-taste |
| **Frequency-appropriate** | Match motion to how often it's seen: **100+/day and every keyboard-initiated action get NO animation**; tens/day get reduced motion; occasional gets standard; rare/first-time may carry delight | decision |

**Which tier applies (do not overwrite the tiers).** Frequent UI micro-interactions — press, hover, toggle, dropdown — live in design-taste's **quick** tier, which is already sub-300ms, the budget high-frequency UI demands. The **standard/slow** tiers are for content-presentation set-pieces (scroll reveals, choreographed sequences), never for a control the user hits all day. Match the tier to frequency; the tier values themselves are design-taste's.

## The method

Run these six steps for every motion request:

1. **Should it move at all?** Default answer: no. Motion must carry evidence — show where something came from, confirm an action landed, or reveal content in the order it should be read. "Adds polish/richness/life" is not a purpose; cut it. (If the idea smells like a set-piece or a toy, stop — `design-taste` decision procedure.)
2. **Name the category** (drives everything downstream):

| Category | Easing token | Duration tier | Rules |
|---|---|---|---|
| Entrance | `--ease-enter` on transform + `--ease-enter-soft` on opacity | standard | Offset 12–24px; ONE direction per view |
| Exit | `--ease-exit` | quick (≈65–75% of its paired entrance) | Exits are shorter — users care about what appears |
| Press / hover feedback | `--ease-morph` | quick | Must START within 100ms of input |
| In-place state change (color, border, selected) | `--ease-morph` | quick | Never opacity-only for meaningful changes |
| Choreographed sequence (list, dashboard, modal+content) | per element above | stagger math below | Total stagger < 500ms, hard cap |
| Loading loop (spinner, skeleton) | linear — the ONLY place linear is legal | 1000–2000ms/cycle | Gate on `prefers-reduced-motion` |

3. **Pick properties.** `transform` + `opacity` only, unless there is a named reason. One property = direct; two = polished; three+ = justify or cut. Never animate `width`/`height`/`margin`/`box-shadow`/`filter` (layout/paint jank) — fake shadows with a pre-rendered pseudo-element cross-fade.
4. **Do the timing math** (choreography section below) — durations by tier, delays by stagger table, distance scaling: a move ~2× longer in pixels gets ~1.3× the duration, not 2×.
5. **Design the reduced-motion equivalent NOW**, not after: spatial movement → opacity-only fade; loops → static; duration ≈ half. Same information must arrive.
6. **Implement from the recipes below**, then run the pre-ship gate.

## Choreography and stagger math

**One hero per beat.** The most important element gets the largest displacement and enters first; everything else is subtler in every dimension. Two things demanding attention at once = zero things.

**Spatial origin consistency.** All elements in a view enter from the same direction or a shared origin point. Mixed directions read as chaos.

**Sequence shape** (for any multi-element reveal): setup 20–30% of total time → action 30–40% → resolution 30–40% → then **100–200ms of stillness** before any new motion may begin. No back-to-back beats.

**The 1/3 rules:**
- *Distance:* no element travels more than 1/3 of its container in one unbroken move.
- *Density:* with 3+ animated elements, at most 1/3 are moving at the same instant — element 1 settles as element 3 starts.

**Stagger table:**

| Pattern | Per-item delay | Total budget | Use for |
|---|---|---|---|
| Micro cascade | 20–40ms | < 200ms | List rows, grid cells, chips |
| Standard | 50–80ms | < 400ms | Cards, nav items, modal content |
| Deliberate | 100–150ms | < 500ms | A hero + 2–3 proof points |

- Hard cap: total stagger **< 500ms**. Past that, motion is making the user wait for content — a design failure.
- All staggered siblings share the same easing token; vary **start time only**, never the curve.
- Default order = reading order. Center-out only when the hero is literally central.
- Long lists: stagger the first 6–8 items, land the rest together. Nobody watches item 14 arrive.
- **No punctuation overshoot on the last item.** That is the fork's playful trick; the overshoot law in `design-taste` kills it.

**Follow-through (the one secondary motion that earns its keep):** child content starts 50–100ms after its parent container; a card's shadow settles ~50ms after the card. Skip counter-motion, parallax layers, and "background life" — in this register they are spectacle, not craft.

## State feedback recipes (quiet register)

The fork ships Playful/Energetic variants of each of these — springs, confetti, particle bursts, checkmark pops. **All dead here.** Ship these instead:

| State | Recipe | Timing |
|---|---|---|
| Hover | Begin within 100ms; tint/underline/shadow-lift via `--ease-morph`; exit slightly slower than enter (reads as polish) | quick tier |
| Press | Scale to 0.97–0.98 on down, back to 1.0 on release, `--ease-morph`, settles exactly at 1.0 — no bounce past it | quick tier |
| Toggle | Thumb translates with `--ease-morph`; track color transitions simultaneously; no squash, no bounce at destination | quick tier |
| Success | Checkmark stroke-draw (SVG `stroke-dashoffset`) + color transition. No scale pop, no particles, no confetti | quick → standard |
| Error | Prefer calm inline validation: message slides down + fades with `--ease-enter-soft`, border color via `--ease-morph`, icon fades in 50ms later. Shake only when input is truly rejected: ±8–12px horizontal, 2 cycles, decreasing amplitude, settles at origin, ~300ms, zero overshoot | quick tier |
| Loading | Skeleton: opacity sweep left→right, 1500–2000ms/cycle. Spinner: continuous rotation, linear, 1000–1500ms/rev. Both replaced by a static state under reduced motion | loop |
| Disabled ↔ enabled | Opacity 100% ↔ ~55%, `--ease-morph`; nothing else moves | quick tier |
| Focus | Ring appears near-instant (≤100ms); must be fully visible with reduced motion ON — focus is never motion-dependent | instant/quick |

**Same interaction = same motion, every time, everywhere.** Feedback that varies reads as broken.

## Implementation

### CSS (default choice — zero dependency, honors the taste)

```css
.card {
  opacity: 0;
  transform: translateY(16px);
}
.is-revealed .card {
  opacity: 1;
  transform: translateY(0);
  transition:
    transform var(--dur-standard) var(--ease-enter),
    opacity   var(--dur-standard) var(--ease-enter-soft);
  transition-delay: calc(var(--i) * 60ms);   /* stagger: set --i per item */
}
@media (prefers-reduced-motion: reduce) {
  .is-revealed .card {
    transform: none;
    transition: opacity calc(var(--dur-standard) / 2) var(--ease-enter-soft);
    transition-delay: 0ms;
  }
}
```

Set `style="--i: 0"`, `--i: 1`, … per item (or `nth-child`). Trigger `.is-revealed` from an `IntersectionObserver` with `{ threshold: 0.3, once: true }` — reveal once, never re-run on scroll-back.

### GSAP (choose for timeline sequencing across many elements)

```js
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { EASE, DUR } from "./motion-tokens";   // EASE.enter = [x1,y1,x2,y2], filled from design-taste
gsap.registerPlugin(CustomEase);

// CustomEase wants an SVG cubic path, not a bare bezier — build it from the four control
// points so the curve stays single-sourced (same array Framer uses below).
const path = ([x1, y1, x2, y2]) => `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;
CustomEase.create("enter", path(EASE.enter));
CustomEase.create("exit",  path(EASE.exit));

const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.timeline({ defaults: { ease: "enter", duration: DUR.standard } })
    .from(".metric-hero", { y: 20, opacity: 0 })
    .from(".proof-chip", { y: 14, opacity: 0, stagger: { each: 0.06 } }, "-=0.2");
});
mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.from([".metric-hero", ".proof-chip"],
    { opacity: 0, duration: DUR.standard / 2 });
});
```

Timeline overlap (`"-=0.2"`) keeps the 1/3-density rule readable; `matchMedia` makes the reduced path a first-class build, not an afterthought.

### Framer Motion (choose inside React when mount/unmount drives the motion)

```tsx
import { EASE, DUR } from "./motion-tokens";  // EASE.enter = [x, x, x, x] from design-taste

const list = { show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: DUR.standard, ease: EASE.enter },
  },
};

function ProofRow() {
  const reduced = useReducedMotion();
  return (
    <motion.ul variants={list} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.3 }}>
      {chips.map((c) => (
        <motion.li key={c.id}
          variants={reduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : item}>
          {c.label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

Never reach for `type: "spring"` — springs overshoot by construction, and the overshoot law lives in `design-taste`. Use explicit `ease` arrays from the token file.

## Gesture register implementation

**Applies ONLY to direct-manipulation surfaces** — drag, bottom-sheet / drawer, swipe-to-dismiss, and voice barge-in / duck / resume. This is `design-taste`'s **gesture register** — the second register in the two-register law. The finger (or the voice) is manipulating the surface in real time, so motion must inherit the user's velocity and stay grabbable at any instant. Everywhere else, stay in the presentation register above.

**This is the one exception to the "never spring" rule** stated in the Framer Motion section and the anti-patterns table. Those bans govern the **presentation register** — content entrances, exits, and state feedback, where a spring's overshoot is wrong. On a genuine drag / sheet / swipe / voice surface a spring is not just allowed, it is **required**: it retargets from the current value and carries velocity through an interruption, which a fixed-duration curve cannot. **Never flag a spring on a real drag surface as a violation** — the test is the surface, not the code.

**Spring config — shape here, values from design-taste.** Mirror the token discipline: the bounce and response of the gesture register are `design-taste` values, referenced not restated. Default to the critically-damped spring (no visible overshoot — the gesture register stays honest with design-taste's restraint); reach for the momentum spring's bounce ONLY when the gesture itself carried momentum (a flick, a throw, a drag release).

```js
// gesture-tokens: extra named springs in the SAME motion-tokens file, filled from
// design-taste's gesture register (bounce/response) — never invent, never tweak.
import { SPRING } from "./motion-tokens";  // SPRING.settle = critically-damped default; SPRING.momentum = flick-only
// Motion / Framer Motion spring API — { type:"spring", bounce, duration } maps to Apple's damping + response.
animate(el, { transform: "translateY(0px)" }, { type: "spring", ...SPRING.settle });
```

**1:1 tracking + velocity history** — glue the surface to the finger, respect the grab offset, and record a short history for the release handoff:

```js
el.addEventListener("pointerdown", (e) => {
  el.setPointerCapture(e.pointerId);                          // keep tracking when the pointer leaves bounds
  const grab = e.clientY - el.getBoundingClientRect().top;    // respect WHERE they grabbed, don't snap to center
  const hist = [];                                            // last few {y,t} → release velocity
  const onMove = (m) => {
    const y = m.clientY - grab;
    el.style.transform = `translateY(${y}px)`;                // set transform DIRECTLY — never a parent CSS var (recalc storm)
    hist.push({ y, t: m.timeStamp });
    if (hist.length > 5) hist.shift();
    if (isDragging) { /* multi-touch guard: ignore extra pointers once dragging */ }
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", () => { /* velocity from hist → project → hand off (below) */ }, { once: true });
});
```

**Momentum projection + velocity handoff** — animate to where the flick is *going*, then hand the spring the release velocity so there is no seam between drag and animation:

```js
// Apple's exponential-decay projection (NOT v²/2·decel). d ≈ 0.998 normal feel, 0.99 snappier.
const project = (v, d = 0.998) => (v / 1000) * d / (1 - d);
const target  = nearestSnapPoint(currentY + project(releaseVelocity));  // snap chosen from the PROJECTION, not the release point
animate(el, { transform: `translateY(${target}px)` },
  { type: "spring", ...SPRING.momentum, velocity: releaseVelocity });   // continue at the finger's exact velocity
```

**Boundaries: rubber-band, never hard-stop** — past a natural edge, resist progressively (real things slow before they stop). **Dismiss on velocity, not a distance threshold** — a flick should be enough (`Math.abs(distance)/elapsedMs > ~0.11`).

```js
const rubberband = (over, dim, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
```

**Voice as a gesture surface.** Barge-in / duck / resume is direct manipulation of the audio and orb — the user interrupting the assistant is a real-time gesture, not a content reveal. The duck retargets from the current level (interruptible), never restarts; resume continues from where it ducked. Same law: inherit state, never replay from zero. (The barge-in/duck/resume and orb-state behavior spec is owned by the voice/orb work, not here — this section owns only the motion mechanics.)

**Reduced motion still applies.** The gesture register honors the reduced-motion law (`design-taste`): keep the 1:1 drag (it's comprehension, not vestibular motion), but drop the momentum overshoot and projected fling to a direct settle. `useReducedMotion()` branches the spring.

## Worked example — case-study metrics row (scroll reveal)

Request: "Animate the results section of a booking-app case study — a headline metric and three proof chips — as it scrolls into view."

**The tempting wrong version (what a default model reaches for — every one cut here):** a spring pop on the metric, a count-up that bounces past the number and settles back, confetti or a checkmark burst the instant it lands, chips flying in from four different edges, and the whole row re-animating on every scroll-back. Each is overshoot or spectacle the register kills on sight. The disciplined build:

1. **Should it move?** Yes — the motion carries evidence: the visitor watches the proof assemble in reading order. Quiet version (no motion) loses the emphasis on the hero metric; motion is earned.
2. **Category:** choreographed sequence = one entrance (hero) + micro-cascade (chips).
3. **Properties:** `translateY` + `opacity`. Nothing else.
4. **Timing math:**
   - 0ms — headline metric enters: y 20px→0, standard tier, `--ease-enter` / `--ease-enter-soft`.
   - Chips start as the hero passes its midpoint (density rule): +180ms, +240ms, +300ms — 60ms micro-cascade, quick-to-standard tier each.
   - Total stagger 300ms < 400ms budget ✓. Everything lands, then 150ms stillness before any count-up may begin.
   - All four elements rise from below — one origin ✓. Hero has the largest offset ✓.
5. **Reduced motion:** all four fade in together, opacity only, half duration, no delays.
6. **Implement:** the Framer snippet above, chips at `staggerChildren: 0.06`, hero as its own `motion.div` preceding the list. Reveal `once: true` — a proof row that re-animates on every scroll-back turns evidence into a toy.
7. **Gate:** checklist below, then `craft-critique` for the judgment pass.

## Anti-patterns / red flags

| Red flag | Why it's dead | Do instead |
|---|---|---|
| Inline `cubic-bezier(...)` or raw ms outside the token block | Values drift from `design-taste` | Tokens only; one source per project |
| Spring / bounce / `ease-out-back` / elastic / "bounce settle" | Overshoot law (`design-taste`) | The settle: `--ease-enter`, lands exactly on target |
| "Add secondary + ambient layers for richness" (fork doctrine) | Maximalism; spectacle-adjacent | Primary carries meaning; follow-through only when it clarifies |
| Background life: parallax, floating blobs, gradient drift, particles | Motion bigger than content | Cut. Stillness is the register |
| Linear easing on spatial movement | Reads robotic | Linear is legal ONLY for spinners/progress |
| Opacity-only for a meaningful state change | Change goes unnoticed | Pair opacity with transform or color |
| Stagger total > 500ms; item 14 still arriving | User waits for content | Stagger first 6–8, land the rest together |
| Elements entering from mixed directions | Chaos, no spatial story | One origin per view |
| Re-running reveals on every scroll pass | Evidence becomes a toy | `once: true`, always |
| Hover that shifts layout or grows past ~1.02 | Twitchy, needy | Tint, underline, shadow-lift |
| Animating width/height/margin/box-shadow | Layout/paint jank | Transform + opacity; pseudo-element shadow fade |
| Skipping the reduced-motion build | Accessibility law (`design-taste`) | Design it in step 5, ship it as a first-class path |

*Register scope — read before applying the spring/overshoot bans above.* These rows govern the **presentation register**. A spring, momentum, or controlled overshoot on a **genuine direct-manipulation surface** (drag / sheet / swipe / voice) is the **gesture register** doing its job — correct, not a violation. See *Gesture register implementation*.

## Pre-ship gate

- [ ] Every motion names the evidence it carries (no "polish" entries)
- [ ] Zero curve/duration literals outside the token block; tokens filled from `design-taste`
- [ ] Entrances use enter tokens, exits use exit token, exits ≈ 65–75% of paired entrance
- [ ] 1/3 distance rule and 1/3 density rule hold; total stagger < 500ms
- [ ] 100–200ms stillness after each beat; reveals fire once
- [ ] Transform + opacity only; < 20 animated elements per viewport; 60fps eyeballed (mechanical pass → `verify-ui-quality`)
- [ ] Reduced-motion path built and manually toggled on to verify
- [ ] Same interaction produces the same motion everywhere
- [ ] Still right on the 100th viewing — feedback you meet daily must be boring
- [ ] Judgment pass run via `craft-critique`

## Motion review bar (route motion reviews here)

The pre-ship gate above is the *builder's* self-check. This is the *reviewer's* bar: when `craft-critique` reviews motion, it routes to these ten non-negotiable standards. Each is a finding when violated; **approval is earned — default to flagging.** The precise curve/duration/spring values behind each standard are `design-taste`'s two registers (referenced, never restated); the full catalog — every standard expanded, the flag-on-sight escalation triggers, and the remedial fix order — lives in `references/motion-review-standards.md`. Load it whenever a finding needs the exact value or the fix hierarchy.

1. **Justified** — every animation answers "why does this move?" (spatial consistency, state, feedback, explanation, prevents a jarring change). "Looks cool" on a frequent element is a block.
2. **Frequency-appropriate** — 100+/day and keyboard actions get NO animation; tens/day reduced; occasional standard; rare may delight.
3. **Responsive easing** — ease-out / strong custom curve on enter+exit; `ease-in` on UI is a block; built-ins are too weak.
4. **Duration budget** — frequent UI micro-interactions stay in the quick tier (sub-300ms); standard/slow tiers are for set-pieces only.
5. **Origin & physicality** — trigger-anchored `transform-origin` (modals exempt); never `scale(0)` — start `scale(.9–.97)` + opacity.
6. **Interruptible** — toasts/toggles/drags retarget from current state, not keyframes from zero.
7. **GPU-only** — `transform` + `opacity` only; animated layout props are a performance finding.
8. **Accessibility** — `prefers-reduced-motion` honored (gentler, not zero); `:hover` motion gated behind `@media (hover:hover) and (pointer:fine)`.
9. **Asymmetric enter/exit** — deliberate phase slower, system response snappy; symmetric press-and-release is a finding.
10. **Cohesion** — motion matches the component's register and the product; when unsure it feels right, deleting it is the strongest move.

Group findings by impact (feel-breaking → missed simplifications → performance → interruptibility/timing → origin/physicality/cohesion → accessibility), then **Block** or **Approve** — full verdict rubric in the reference. `craft-critique` owns the final verdict language; this bar supplies the motion-specific findings it routes on.

## Sources / attribution

Forked from the **motion-design** skill by **LottieFiles (MIT)**. Kept and adapted: choreography rules, 1/3 rules, stagger budgets, enter/exit ratios, state-feedback recipes, property/performance guidance. Replaced: the personality-archetype director layer (Playful/Premium/Corporate/Energetic, Disney exaggeration, emotion-to-motion maps) — register, curves, durations, and the overshoot law are owned by `design-taste`.

The **Universal motion craft rules**, the **Gesture register implementation** mechanics, and the **Motion review bar** (with its `references/motion-review-standards.md` catalog) are grafted from **Emil Kowalski's "Skills For Design Engineers"** — `emilkowalski/skills`, MIT © 2026 Emil Kowalski. Adopted: the frequency-to-motion table, ease-out / never-ease-in, GPU-only, origin-from-trigger, never-`scale(0)`, interruptibility, asymmetric timing (from `review-animations` + `STANDARDS.md` and `improve-animations/AUDIT.md`); and the pointer-capture / velocity-history / momentum-projection / velocity-handoff / rubber-band gesture mechanics (from `apple-design`). Per the two-register law, all curve / duration / overshoot **values** stay owned by `design-taste`; Emil's springs / velocity / physicality apply only in the **gesture register** and never override the presentation-register default.

## Boundaries

- **`design-taste`** — single source of ALL taste values including motion curves, duration tiers, the overshoot law, and the scale ceiling. This skill references its tokens and never restates a value. Whether a motion idea lives at all is decided there first.
- **`design-taste` — the two registers.** The **presentation register** (0%-overshoot settle) is the default for all content/presentation motion; the **gesture register** (springs / velocity / physicality) is a separate register for direct-manipulation surfaces only. Both registers' curve, duration, and overshoot values are owned by `design-taste` — this skill references them by register name, never restates them, and never lets the gesture register override the presentation default.
- **`craft-critique`** — owns judgment and verdict language; run it after the pre-ship gate. It routes motion-specific reviews to this skill's *Motion review bar* (Emil's ten standards; full catalog in `references/motion-review-standards.md`) and still owns the final verdict.
- **`verify-ui-quality`** — owns mechanical checks (fps measurement, cross-device, performance budgets); it defers to craft-critique for judgment.
- **`visualize-data`** — owns chart/data animation defaults via the built-in `dataviz` skill; borrows easing/duration tokens from the same token block.
