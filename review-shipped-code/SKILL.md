---
name: review-shipped-code
description: "Source-level code review for the React/Next/TypeScript apps Dinesh ships (a salon booking app, his portfolio) — the hole craft-critique (reviews the design) and verify-ui-quality (measures the rendered UI) leave open: neither reads the CODE. Runs two isolated passes — a STANDARDS axis (his repo conventions + front-end craft: accessibility, design-token conformance, React/Next idioms, no dead code) and a SPEC axis (fidelity to the originating problem/spec) — because a change can pass one and fail the other. Use when asked to 'review this code', 'review the diff/PR/branch', 'review since main', 'is this code ready to ship', 'code review before merge', 'did I build what the spec asked', or before merging any production front-end change. NOT for prototypes — those are reviewed for feel, not code (build-coded-prototypes)."
license: "MIT — forked from `code-review` in mattpocock/skills (© Matt Pocock), 'Skills For Real Engineers.' Adopted: the two-axis Standards/Spec split, the parallel-isolated-pass structure, and the don't-rerank-across-axes rule. Re-cast for React/Next/TS — the Standards baseline, the mode gate, and the verdict discipline are Dinesh's."
---

# Review Shipped Code

Read the **source** of a production front-end change and judge it on two independent axes. This is the code half of pre-ship, sitting between `craft-critique` (judges the design) and `verify-ui-quality` (measures the rendered result) — neither of which opens the files.

*Forked from `code-review` in mattpocock/skills (MIT, © Matt Pocock). The two-axis parallel structure is his; the Standards baseline, the mode gate, and the verdict discipline are re-cast for Dinesh's stack.*

## When to use / when NOT to use

**Use** before merging any change to code Dinesh ships — a salon booking app, the portfolio, any Next/React/TS surface that real users touch.

**Do NOT use on prototypes.** A throwaway HTML file or a Wizard-of-Oz voice demo is reviewed for *feel and learning*, not code craft — hardcoded hex and a `console.log` are correct there. Route prototypes to `build-coded-prototypes`. If you can't answer "what happens if this ships to a user?", it isn't in scope here.

This is **rigor path only** by design: production code earns the full read; prototypes get none of it.

## Phase 0 — the mode gate (situational, one default)

Run in order; stop at the first that fires.

1. **Is it a prototype / throwaway?** → out. `build-coded-prototypes` owns feel review. Do not proceed.
2. **Is it a pure refactor with zero behavior change?** → run **Standards axis only**; the Spec axis has nothing to check.
3. **Small, self-contained diff, low stakes** (one component, internal, not external-facing)? → **quick pass**: one reviewer runs both axes as two *mentally separate* passes, in sequence. ~15 min.
4. **Feature, PR, or anything external-facing** (default)? → **full pass**: spawn the two axes as **parallel isolated sub-agents** (`Task`/general-purpose) so neither pass contaminates the other, then aggregate.

**Recommended default: full pass, both axes.** Downgrade only when 2 or 3 clearly fits.

## The intake gate — ask only the gaps

Discover what you can; ask only what you genuinely can't. Offer a recommended answer per question, and split facts-you-can-find from decisions only Dinesh can make.

**Facts to discover first (don't ask):**
- Does the fixed point resolve and is the diff non-empty? (`git rev-parse`, `git diff <point>...HEAD` — three-dot, against the merge-base.)
- Is there a spec file in the tree? Check the workpack (`BUILD-SPEC.md`, `prd.md`, `decisions/`), `tasks.json` `acceptanceCriteria`, or a `write-problem-statement` output.
- Is there a repo standards doc? (`CONTRIBUTING.md`, an ESLint/tsconfig, a design-system readme.)

**Decisions to ask Dinesh (only if unresolved):**
| Gap | Recommended default |
|---|---|
| Fixed point to diff against | `main...HEAD` for a feature branch; else last N commits |
| Which spec is authoritative | The workpack spec / acceptance criteria; if none exists, Spec axis reports "no spec available" and skips |
| Is this external-facing? | Assume yes → full pass. Confirm only to downgrade |

Never invent a spec. "No spec" is a real, reportable state — not a reason to fabricate one from the code.

## Why two isolated axes

A change can pass one and fail the other, and each masks the other if you merge them:

- Follows every convention but builds the wrong thing → **Standards pass, Spec fail.**
- Does exactly what the spec asked but ships an inaccessible, off-register control → **Spec pass, Standards fail.** (This is the common one for a designer-who-builds — the worked example below.)

They run **isolated** for a second reason: reviewing your *own* shipped code invites analyst confirmation bias — the code agrees with what you meant. Two separated passes are the concrete *control* for that, not a resolution to "be objective" (see `name-and-control-bias` — awareness is not a control; a structural change is).

## STANDARDS axis — the front-end craft baseline

Replaces Matt's generic Fowler smells with Dinesh's standards. Two binding rules, both inherited from the fork:

- **The repo overrides.** A documented repo convention always wins; suppress a baseline flag where the repo endorses it.
- **Every item is a judgement call, and skip what tooling already enforces.** ESLint, `tsc`, Prettier, and `jsx-a11y` catch a layer of this for free — do not re-report what a green pipeline already guarantees. This baseline exists for what tooling *can't* see: token conformance, the taste register, real a11y, and design judgment.

Match each against the diff — *what it is* → *how to fix*:

**Accessibility (code-level — feeds the gate, doesn't replace it)**
- **Non-semantic click target** — a `div`/`motion.div` with `onClick` standing in for a control. → use a real `<button>`/`<a>`; it's focusable and keyboard-operable for free.
- **Unlabeled control / image** — icon button with no accessible name, `img` with no `alt`, input with no associated label. → add the label/`aria-label`/`alt`.
- **Focus dropped or trapped** — a modal/route change that doesn't move or restore focus; a custom widget with no visible focus state. → manage focus explicitly; keep `:focus-visible`.
- **Motion not gated** — an animation with no `prefers-reduced-motion` fallback. → gate it (values per `design-taste`).
> Severity and the WCAG launch gate are owned by `audit-accessibility`. Flag the code smell here; route the gate there. Never downgrade an a11y finding to "minor" on your own.

**Design-token conformance**
- **Hardcoded value where a token exists** — a raw hex, px, font-size, radius, or z-index inline or in styles. → reference the token. *Canonical token values are owned by `build-token-system`; this axis only checks that the code uses them.*

**Taste / motion register**
- **Off-register motion** — a spring, a bounce, overshoot, or a duration outside the locked ranges; a full-stage set-piece. → conform to `design-taste` (load it; do not restate or hardcode a curve). This is the one baseline item where a "correct" animation is still a violation.

**React / Next idioms**
- **Effect doing an event's job** — `useEffect` reacting to a click/submit that should be an event handler. → move it into the handler.
- **Derived state stored in state** — a `useState` that just mirrors props/other state. → compute it during render.
- **Client boundary that didn't need one** — `'use client'` on a subtree that could stay a server component; data fetched in the client where a server component would do. → push the boundary down; confirm the seam.
- **Raw `<img>` / unoptimized asset** in Next → `next/image`. **List with index keys** on reorderable data → stable keys.

**Type safety**
- **`any`, unchecked cast, or `!` hiding real nullability** — a non-null assertion or `as` papering over a value that can actually be absent. → narrow it, or model the absent case.

**Dead code / cruft**
- **Leftover `console.log`, commented-out block, unused import/export, TODO without an owner, unreachable branch.** → delete it. (Tooling flags some; the judgment is whether it's truly dead.)

## SPEC axis — fidelity to the originating problem

The Spec sub-agent gets the diff **and** the authoritative spec (workpack spec / `acceptanceCriteria` / problem statement), and reports exactly three things, each quoting the spec line:

- **(a) Missing or partial** — a requirement the spec asked for that isn't in the diff, or is half-built.
- **(b) Scope creep** — behavior in the diff the spec never asked for.
- **(c) Implemented-but-wrong** — a requirement that looks done but the implementation misreads it.

The Spec axis judges *fidelity to intent*, never code craft — that's the Standards axis's job. If no spec exists, it reports "no spec available" and contributes nothing (never invents acceptance criteria to have something to say).

## The method

1. **Phase 0 mode gate** → prototype out, else pick quick vs full.
2. **Intake gate** → resolve fixed point, discover spec + standards sources, ask only the gaps.
3. **Run the two axes isolated** — parallel sub-agents (full) or two separated passes (quick). Standards gets: the diff command + commit list + repo standards docs + this baseline pasted in full. Spec gets: the diff + the spec contents.
4. **Aggregate — do NOT merge or rerank.** Report findings verbatim under `## Standards` and `## Spec`. A Spec fail must never be hidden by Standards passing, or vice versa.
5. **Severity + verdict via `craft-critique`.** Rate each finding 🔴 / 🟡 / 🟢 and issue the ship decision in its language (PASS / PASS WITH NOTES / BLOCKED). The ship verdict is an **AND-gate, not a rerank**: BLOCKED if *either* axis carries a 🔴. Ship only when both axes clear their blockers. State the shortest path to unblock.

## Worked example — a Spec-pass / Standards-fail on a Next component

**Spec (from the workpack):** "Add a *Book again* action to the confirmation screen that re-opens the booking flow." Nothing more.

```tsx
// components/RebookButton.tsx  — added in this diff
'use client'
import { motion } from 'framer-motion'

export function RebookButton({ onRebook }: { onRebook: () => void }) {
  console.log('rebook mounted')
  return (
    <motion.div
      onClick={onRebook}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ background: '#2563eb', color: '#fff', padding: '16px 24px', borderRadius: 8 }}
    >
      Book again
    </motion.div>
  )
}
```

**## Spec — PASS.** The diff adds exactly one *Book again* control that re-opens the flow. No missing requirement, no scope creep, no misread. It does the right thing.

**## Standards — BLOCKED.**
| # | Finding | Sev | Fix |
|---|---|---|---|
| 1 | `motion.div` with `onClick` — not focusable, no keyboard activation, no role/label | 🔴 | Use `<button>` (or `motion.button`); keep `:focus-visible`. Route the gate to `audit-accessibility` |
| 2 | `type:'spring'` overshoots and there's no reduced-motion guard | 🔴 | Locked zero-overshoot curve + `prefers-reduced-motion` fallback (values per `design-taste`) |
| 3 | `#2563eb`, `#fff`, `16px 24px`, `8` hardcoded — all have tokens | 🟡 | Reference the accent / on-accent / spacing / radius tokens (canonical values: `build-token-system`) |
| 4 | `console.log('rebook mounted')` left in | 🟢 | Delete |

**Ship verdict (AND-gate): BLOCKED.** A change that does exactly the right thing but ships an inaccessible, off-register control fails. Shortest path to unblock: swap to `<button>`, gate the motion to the locked curve, tokenize the four values, drop the log — then it clears both axes. This is precisely the failure a rendered-UI or design pass would miss: it *works*, and it *looks* close enough; only reading the source catches it.

## Output format

```markdown
## Review: [what was reviewed] — [fixed point]…HEAD

## Standards
| # | File:hunk | Finding (baseline item or repo rule) | Sev | Fix |
|---|-----------|--------------------------------------|-----|-----|
Axis result: PASS / PASS WITH NOTES / BLOCKED

## Spec  (or: "no spec available — axis skipped")
| # | Spec line | Missing / Creep / Wrong | Sev | Fix |
Axis result: PASS / PASS WITH NOTES / BLOCKED

**Ship verdict (AND-gate): PASS / PASS WITH NOTES / BLOCKED**
Shortest path to unblock: [if BLOCKED]
```

## Don't / Do

| Don't | Do |
|---|---|
| Run it on a prototype | Send prototypes to `build-coded-prototypes` — feel, not code |
| Merge the two axes into one ranked list | Report Standards and Spec separately; never let one mask the other |
| Re-report what ESLint/`tsc`/`jsx-a11y` already catch | Spend the review on tokens, taste, real a11y, and judgment tooling can't see |
| Restate curves, durations, or token values inline | Reference `design-taste` / `build-token-system`; flag the smell, defer the value |
| Downgrade an a11y finding to "minor" yourself | Flag the code smell; `audit-accessibility` owns severity and the gate |
| Invent a spec so the Spec axis has something to say | Report "no spec available" and move on |
| Pass a change because it "works" | AND-gate: BLOCKED if either axis has a 🔴 |
| Trust a self-review because you meant well | Isolate the passes — the structure is the control, not your intent |

## Anti-patterns / red flags

- **"It renders fine, ship it."** Rendering fine is `verify-ui-quality`'s domain; this axis reads source, where working-but-wrong hides.
- **Standards findings with no fix.** A named smell with no concrete change is a footnote, not a review (same discipline as `craft-critique`).
- **A review with zero findings on a real feature.** Usually a failed review, not a clean one — re-read for the a11y and token layer tooling skips.
- **Reranking across axes to pick a "winner."** The separation exists to stop exactly that.
- **Reviewing the whole file instead of the diff.** Scope to what changed against the fixed point; pre-existing debt is a separate task.

## Boundaries

- **`craft-critique`** owns judgment, the evidence-discipline protocol, and verdict language (PASS / PASS WITH NOTES / BLOCKED, 🔴/🟡/🟢) — this skill borrows that language and applies it to *code* findings; it reviews the design.
- **`verify-ui-quality`** measures the *rendered* result (browser automation, cross-device, performance); this skill reads the *source*. Complementary halves of pre-ship — run both on anything external-facing.
- **`audit-accessibility`** owns the WCAG severity gate; code-level a11y smells found here are inputs to it, not a substitute.
- **`build-token-system`** owns the canonical token values and architecture; this skill only checks the code *uses* them.
- **`design-taste`** owns the visual-craft and motion register the Standards axis enforces; load it, cite it, never restate its values.
- **`build-coded-prototypes`** owns prototypes — explicitly out of scope here.
- **`write-problem-statement`** produces the Spec-axis source of truth; this skill consumes it.

## Sources

- Forked from **`code-review`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). The two-axis Standards/Spec split, the parallel-isolated-pass structure, and the "don't rerank across axes" rule are his; retained under MIT.
- Standards baseline re-cast for React/Next/TypeScript against the official React and Next.js docs as the idiom authority, and against Dinesh's own taste and token systems (`design-taste`, `build-token-system`).
