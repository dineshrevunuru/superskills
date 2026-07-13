---
name: improve-code-architecture
description: "Find where a React/Next/TypeScript codebase has started to ROT, render the opportunities as a visual HTML report you can actually look at, then drill into the one you pick and scope its fix. The scan→report→drill shape for whole-codebase architecture — the SHIP-wing skill that zooms OUT, above a single diff (review-shipped-code) or a single bug (diagnose-bugs). Low-priority by design: only worth running once an app is big enough to rot. Use when a codebase 'is getting hard to work in', 'feels tangled', 'where should I refactor', 'scan for refactor opportunities', 'architecture review', 'this god-component is out of control', or one area keeps breeding bugs. NOT for young/small apps (nothing to deepen yet) or prototypes."
license: "MIT — forked from `improve-codebase-architecture` in mattpocock/skills (© Matt Pocock, 'Skills For Real Engineers'). The scan→visual-report→drill mechanic, the depth vocabulary, and the deletion test are his, retained under MIT."
---

# Improve Code Architecture

Zoom OUT on a React/Next/TypeScript codebase that has started to **rot**: scan for architectural friction, render the opportunities as a **visual HTML report you can actually look at**, then drill into the one you pick and scope its fix. `scan → report → drill` — the SHIP-wing skill for whole-codebase architecture, the level above a single diff or a single bug. **Low-priority by design:** an app has to be big enough to rot before this earns its runtime. The report format plays to Dinesh's eye — he reads a *picture* of the rot faster than a wall of findings.

## When to use / when NOT to use

**Use** when a shipped React/Next app "is getting hard to work in," an area keeps breeding bugs, a component has grown into a monster, or you want an architecture review before the next feature lands on top of debt.

**Do NOT use — the low-priority guard is the point of this section:**
- **Young / small app** — nothing has deepened yet, so there's no rot to scan; running this on a three-week-old app invents refactors to look busy. Say so and stop.
- **Prototype** — throwaway code is judged on feel, not architecture. `build-coded-prototypes` owns it; you delete a prototype, you don't deepen it.
- **A single diff / PR** — that's `review-shipped-code`, which zooms IN on one change. This zooms out on the whole tree.
- **A specific bug** — that's `diagnose-bugs`. (But a bug that keeps *recurring in one area* is a rot signal that feeds this scan.)

This is **rigor-path SHIP** — production code only. When unsure whether the codebase is old enough to warrant it, it usually isn't.

## The mode gate (situational — one default)

Run in order; stop at the first that fits. **Completing a full report is never the goal — surfacing the one refactor worth doing is.**

1. **Too young to rot?** → out (see the guard). Don't manufacture opportunities to have a report.
2. **You already suspect where the rot lives** (one god-component, one tangled route)? → **quick scan**: explore that area only, list 2–3 candidates in a short markdown table, drill the pick. ~30 min, no HTML.
3. **Large codebase, don't know where the rot lives?** → **full report**: a sub-agent walk of the whole tree, the visual HTML report with before/after diagrams and a ranked top-recommendation, then drill. Hours.

**Recommended default: quick scan.** The full visual report earns its cost only on a genuinely large, unfamiliar, or rotting codebase — its payoff is the *seeing*, and you only need that when you can't already point at the problem.

## Intake gate — ask only the gaps

Discover what you can; ask only what you genuinely can't, and offer a recommended answer to each so Dinesh confirms rather than composes.

**Discover first (don't ask):** which app + its size and age (repo, LOC, commit history) · where recent bugs clustered (`git log`, the error monitor) · whether a repo-standards or vocabulary doc exists (`CONTEXT.md`, ADRs, a design-system readme) · the framework seams (App Router vs Pages, server/client split).

**Ask Dinesh (decisions only) — each with a default:**
| Gap | Recommended default |
|---|---|
| Is this codebase old/large enough to be worth scanning? | If it's young or you can't name a friction area → don't run it |
| Scope: whole tree or one area? | The area with the most recent bug churn; whole tree only on the full path |
| Anything off-limits (an ADR'd decision not to re-litigate)? | Honor existing ADRs; only reopen one when the friction is real (mark it in the card) |

## The architecture vocabulary (working subset)

The full vocabulary — **module, interface, implementation, depth, seam, adapter, leverage, locality** — is owned by `codebase-design` (a low-priority SHIP sibling; load it for the full set, and hand the scoped deepening to it for the reshape). The working subset this skill needs, re-cast for React/Next:

| Term | Working meaning |
|---|---|
| **module** | one unit behind one interface: a component, a hook, a route handler, a lib file. Not "component/service/util" used loosely — the unit with a *seam*. |
| **interface** | its surface — props, a hook's return shape, an exported signature — what callers touch. |
| **depth** | ratio of what it *does* to what its interface *exposes*. **Deep** = narrow interface over substantial work. **Shallow** = interface nearly as wide as the implementation (a pass-through). |
| **seam** | the interface you test or substitute through. "The interface is the test surface." |
| **deletion test** | would deleting this module **concentrate** complexity into one place, or just **relocate** it? *Concentrates* = a real deepening. *Relocates* = cosmetic churn. This test is the gate on every candidate. |

Use these terms exactly in every candidate — don't drift into "layer," "wrapper," or "boundary."

## Step 1 — Scan for rot (React/Next signals)

On the full path, use a sub-agent (`Task`/general-purpose) to walk the tree; on the quick path, read the suspect area yourself. Don't march a fixed checklist — explore where you feel friction, then run the **deletion test** on anything that smells shallow. The recurring React/Next rot signals:

| Signal | The tell | Deletion-test read |
|---|---|---|
| **God-component** | one component owns fetching + state + validation + render (hundreds of lines, a dozen `useState`) | extracting the *logic* into one deep module concentrates it; splitting into tidy sub-components just prop-drills the same state — the trap in the worked example |
| **Shallow hook / wrapper** | a `use*` or util whose body is ~one line and whose interface is as wide as its body | delete it → complexity concentrates at the one call site, nothing lost |
| **No locality** | pure fns extracted only for testability, but the real bugs live in how they're *wired together* | the seam is at the wrong altitude — test the composition, not the isolated piece |
| **Boundary tangle (Next)** | `'use client'` sprawled up the tree; data fetched client-side where a server component would do; server/client logic interleaved | push the boundary down → one clear seam |
| **Duplicated logic across routes** | the same validation/format/fetch re-implemented in N routes | one module, N call sites (leverage) |
| **Untestable through its interface** | can't be exercised without mounting the whole tree or standing up the world | the interface *is* the finding — the architecture blocks lockdown (the same signal `diagnose-bugs` Phase 5 names) |

A candidate is only real if the deletion test says *concentrates*. If it says *relocates*, it's cosmetic — carry it no higher than `Speculative`, or cut it.

## Step 2 — Render the report (visual, drill-ready)

On the quick path, a short markdown table of candidates is the whole report — skip the HTML. On the full path, write a **single self-contained HTML file to the OS temp dir** (`$TMPDIR` → fallback `/tmp` / `%TEMP%`; `architecture-review-<timestamp>.html`), open it, and tell Dinesh the absolute path. Nothing lands in the repo.

**Register — load `design-taste` first.** The report is a surface Dinesh *reads*, so it inherits his register — don't restate the taste values here; load the file and let the report carry them. Two things this report adds on top: red for leakage and amber for warnings (the diagnostic reason a second and third color earn their place under the single-accent law), and drop the generic emerald-and-indigo dashboard the source ships. It's a **throwaway diagnostic, not a shipped artifact** — the taste *register* applies, the pixel-polish ship-gate does not.

Each candidate is one card carrying:
- **Title** that names the deepening, not the file ("Extract the booking state machine," not "refactor BookingFlow.tsx").
- **Strength badge** — `Strong` / `Worth exploring` / `Speculative`. A candidate that failed the deletion test never reaches `Strong`.
- **Files** (monospaced), **Problem** (one sentence), **Solution** (one sentence), **Wins** (bullets ≤6 words, in glossary terms: *"locality: bugs land in one module," "leverage: one interface, N call sites"* — never "cleaner" or "easier to maintain").
- **Before / After diagram** — the centrepiece. Use Mermaid (via CDN) for graph-shaped structure (call flow, dependencies) and hand-built divs / inline SVG for editorial visuals (mass diagrams showing interface-as-wide-as-implementation, cross-sections, call-graph collapse). Mix them — all-Mermaid reads generic. ~320px tall so before/after sits side by side.

End with a **Top recommendation**: the one to tackle first, one sentence why, an anchor to its card.

**The real-vs-cosmetic gate — this is `craft-critique`'s job, applied to refactors.** A refactor opportunity is a *claim* ("this split improves testability/locality/leverage"). Before a candidate earns `Strong`, run it through `craft-critique`: is the win real and load-bearing, or is it churn dressed as depth (renaming, moving files, splitting for tidiness)? A candidate that only *relocates* complexity is the refactor equivalent of an under-evidenced claim — flag it, don't polish it. Do **not** propose interfaces yet; the report names opportunities, the drill designs them. After the file is written, ask: "Which of these would you like to drill into?"

## Step 3 — Drill into the pick

Once Dinesh picks one, scope its fix — don't just start refactoring:

1. **State the deepening as a problem, not a solution.** One deep module, what sits behind the seam, what its interface exposes, what's out of scope. Borrow `write-problem-statement`'s discipline — testing-seam minimization and an explicit out-of-scope list so the refactor doesn't sprawl into a rewrite.
2. **Design the interface twice.** The best interface is rarely the first one — committing to it anchors you (`name-and-control-bias` names anchoring; designing it twice is the concrete control, not "stay open-minded"). Use `explore-divergent-concepts`' parallel-under-opposing-constraints move — sketch the deepened module's interface two ways (e.g. a hook `{ state, actions }` vs a reducer module vs a state-machine), each under a different priority, then *synthesize* rather than pick the first. Name the seam in the vocabulary above.
3. **Say which tests survive.** A deepening is only real if the new seam is *testable at one interface*. Name the test that now hits one seam instead of mounting the tree (Vitest/Jest at the module, Playwright only if the seam is genuinely UI). If no clean seam falls out, the candidate was cosmetic — return to Step 2.
4. **Keep the vocabulary current.** If the deepened module earns a name that isn't in `CONTEXT.md` (or wherever the domain glossary lives), add it. If Dinesh rejects the candidate for a load-bearing reason a future scan would need, offer to record it as an ADR so the next review doesn't re-suggest it — only when the reason is durable, not "not worth it right now."

The actual reshape, once scoped, is handed to `codebase-design` — the deep-module SHIP sibling that owns turning the scoped cluster into a deep module; the resulting change then ships as a normal production change through the usual gates (`review-shipped-code` before merge).

## Worked example — the god-component (catches the cosmetic split)

**Scan flags** `BookingFlow.tsx` in a salon booking app: ~640 lines, 12 `useState`, an availability-polling `useEffect`, slot fetching, price calc, validation, and the render for all four steps. Classic god-component. Two candidate splits surface — and this is exactly where a naive scan goes wrong:

**Candidate A — "Extract StepOne / StepTwo / StepThree / StepFour + BookingHeader" (the trap).**
Deletion test: would deleting `BookingFlow` concentrate complexity? **No** — the state still lives in the parent and gets *prop-drilled* into five shallow children. You've turned one fat module into six shallow ones; each child's interface (its props) is as wide as its body. Locality got *worse* — a booking-state bug now spans six files instead of one. `craft-critique` verdict: churn dressed as depth. → badge `Speculative`, or cut it. **A refactor tool's instinct, and the failure this skill exists to catch.**

**Candidate B — "Extract the booking state machine behind one `useBookingMachine()` interface" (the real deepening).**
Move slot selection, validation, availability, and price into one module exposing `{ state, actions }` (a reducer or state-machine); `BookingFlow` becomes a thin view over it. Deletion test: deleting the ad-hoc state scattered through the component **concentrates** it into one deep module with a narrow interface. Locality: booking-logic bugs now land in one place. Leverage: the confirm screen and the rebook button reuse the same interface — one interface, N call sites. Testable at one seam without mounting the tree (Vitest against `useBookingMachine`). → badge `Strong`, and the **Top recommendation**.

**Report card for B:** *Files* — `BookingFlow.tsx`, new `useBookingMachine.ts`. *Problem* — "state, validation, and availability are tangled into the view; nothing is testable without mounting the flow." *Solution* — "lift the logic into one deep module; the component becomes a view." *Before/After* — a mass diagram: before, `BookingFlow`'s interface (props + JSX) nearly as tall as its implementation (shallow-fat); after, a short view interface over a tall `useBookingMachine` implementation (deep). *Wins* — "locality: booking bugs in one module," "leverage: reused by confirm + rebook," "seam: one interface to test."

**The catch:** Candidate A is what most refactor instincts (and most tools) propose first — tidy sub-components. The **deletion test plus `craft-critique`'s real-vs-cosmetic gate** is the only thing separating the split that helps from the split that just scatters. Drill Step 2 then designs B's interface twice (reducer vs xstate) before committing.

## Don't / Do

| Don't | Do |
|---|---|
| Run this on a young or small app | Honor the low-priority guard — no rot yet, no scan |
| Run it on a prototype | Send prototypes to `build-coded-prototypes` — feel, not architecture |
| Treat "6 tidy sub-components" as a deepening | Run the deletion test — does it *concentrate* complexity or just relocate it? |
| Badge a cosmetic split `Strong` because it's neat | Gate every candidate through `craft-critique`; churn caps at `Speculative` |
| Ship the corporate-dashboard report look | Load `design-taste` and let the report inherit his register — editorial, a surface he reads, never a dashboard |
| Propose interfaces inside the report | Report names opportunities; the drill designs the interface (twice) |
| Design the deepened interface once and commit | `explore-divergent-concepts` — sketch it two ways, then synthesize |
| Drift into "service / wrapper / boundary" | Use module / interface / depth / seam exactly (`codebase-design` owns the vocab) |
| Let the drill balloon into a rewrite | `write-problem-statement` discipline — explicit out-of-scope list |
| Fork and drop the license line | Keep the MIT / Matt Pocock attribution in frontmatter and Sources |

## Anti-patterns / red flags

- **A report on a young codebase.** Manufacturing refactors to have something to show. The guard exists to stop exactly this.
- **Cosmetic split as a deepening.** Extracting sub-components / renaming / moving files with no locality or leverage win — the deletion test says *relocates*, not *concentrates*.
- **Interfaces proposed in the report.** The report surfaces friction; jumping to the interface skips the design-it-twice step and anchors on the first shape.
- **All-Mermaid diagrams.** Every card looks the same and reads generic — mix in hand-built mass diagrams and cross-sections.
- **A deepening with no surviving test.** If nothing becomes testable at one seam, it wasn't a real depth win — it was churn.
- **Re-litigating an ADR'd decision.** Surfacing a refactor an ADR already rejected, without new friction to justify reopening it.
- **Restating taste or vocabulary values inline.** Load `design-taste` for the register and `codebase-design` for the full vocabulary; carry only the working subset.

## Output format

**Quick path** — a markdown candidate table + a one-line top pick, then the drill scope:
```markdown
## Architecture scan: [app] — [area]
| Candidate (names the deepening) | Files | Deletion test | Strength | Win (glossary terms) |
|---|---|---|---|---|
**Top pick:** [candidate] — [one sentence].
```
**Full path** — the self-contained HTML report in the temp dir (path reported) + the same top pick. Either way, the **drill scope** for the pick: problem statement (out-of-scope list) · two interface sketches → synthesis · the test that now hits one seam.

## Boundaries

- **`review-shipped-code`** zooms IN on one diff/PR before merge; this zooms OUT on the whole tree. The scoped refactor from Step 3 ships *through* it.
- **`diagnose-bugs`** hunts one bug; a bug that keeps recurring in one area is a rot signal that feeds this scan. Its Phase-5 "no correct seam exists" finding is the same signal as this skill's "untestable through its interface."
- **`craft-critique`** owns the judgment that separates a real deepening from cosmetic churn (the evidence-discipline protocol, applied to refactor claims) and the strength verdict. Load it; never restate it.
- **`design-taste`** owns the register the HTML report inherits — load it, never restate its values.
- **`codebase-design`** owns the full architecture vocabulary *and* the deep-module reshape (a low-priority SHIP sibling): once Step 3 scopes a deepening, `codebase-design` is the skill that reshapes the scoped cluster into a deep module. This skill carries only the working subset it needs to scan — it scans and scopes, `codebase-design` reshapes.
- **`explore-divergent-concepts`** owns the design-it-twice / opposing-constraints move the drill uses to shape the deepened interface.
- **`write-problem-statement`** owns the scope discipline (testing-seam minimization, out-of-scope) the drill borrows so a deepening doesn't sprawl into a rewrite.
- **`build-coded-prototypes`** owns prototypes — explicitly out of scope here.

## Sources

- Forked from **`improve-codebase-architecture`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Kept: the **scan → visual-HTML-report → drill** mechanic, the before/after diagram-per-candidate report, the depth vocabulary, and the **deletion test**. Personalized: rot signals re-cast for React/Next/TypeScript (god-component, shallow hooks, boundary tangles, no-locality); mode-switched (quick scan vs full report) with the low-priority "too young to rot" guard; the report's register handed to `design-taste`; the real-vs-cosmetic verdict handed to `craft-critique`; the drill's `/grilling`→intake+`craft-critique`, `/codebase-design` design-it-twice→`explore-divergent-concepts`, `/domain-modeling` dropped; wired to the SHIP siblings `review-shipped-code` and `diagnose-bugs`.
