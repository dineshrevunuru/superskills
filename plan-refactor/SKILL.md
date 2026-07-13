---
name: plan-refactor
description: "Plan a behavior-preserving refactor BEFORE touching it: fix the target shape, name the regression risk, pin behavior at the seam, then sequence it into small **always-green** steps that avoid a **big-bang rewrite**. Use when 'just clean this up', 'refactor X', 'this file is a mess', 'untangle this module', 'restructure this before I add to it', or before reshaping a risky area you don't want to break. SOLO DEFAULT: presents the plan / writes a local `refactor-plan.md` — mode-switches UP to a tracker issue only when Dinesh runs one. NOT for finding WHERE to refactor across an app (improve-code-architecture), the target module shape itself (codebase-design), or slicing NEW feature work (plan-work-tickets)."
license: "MIT — forked from `request-refactor-plan` (deprecated) in mattpocock/skills (© Matt Pocock, 'Skills For Real Engineers'). Kept: plan-the-refactor-before-doing-it, explicit scope in/out, tiny always-working commits (Martin Fowler), the plan template. Rebuilt for solo/freelance — plan presented or written to a local file by default, no user-interview / GitHub-issue pipeline assumed; regression-risk ranking + characterization-tests-first added as the core."
---

# Plan Refactor — A Reversible Sequence, Not a Rewrite

Part of the **SHIP wing** (production-code craft). Take a refactor you're about to start and turn it into a plan whose every step **keeps the program green and behavior unchanged** — so you can always stop, always ship, always tell if you broke something. The enemy is the **big-bang rewrite**: rip it out, rebuild from scratch, stay red for days with no way back and no proof the behavior survived. Martin Fowler's rule is the whole discipline — *"make each refactoring step as small as possible, so that you can always see the program working."*

## When to use / when NOT to use

**Use** when you're about to restructure code that already works — a tangled module, a god-component, duplicated logic across routes — and you want the safe path mapped before the first edit. Especially when the request is a vague "just clean this up."

**Do NOT use** when:
- You don't yet know **which** area to refactor across the app → **improve-code-architecture** (scan → report → drill). It picks and *scopes* the target; this skill sequences the safe path to it.
- The **target shape** isn't decided — what "good" looks like — → **codebase-design** (deep module, interface, seam). It owns the destination; this owns getting there without a rewrite. Don't sequence toward an undecided shape.
- The work **adds new user-visible behavior** → **plan-work-tickets** (behavior-*adding* tracer bullets). A refactor preserves behavior; a feature slice delivers it. Different primitive.
- You're **executing or reviewing** the change → the SHIP siblings (**test-shipped-code**, **review-shipped-code**, **diagnose-bugs**). This stops at an approved plan.

## The one law

**Every step preserves behavior and leaves the program green; you can stop after any step.** A refactor that must be red for a week to reach the finish is a rewrite in disguise — split it or stage it until each step stands alone. Behavior-preserving is the contract: if a behavior *change* wants to ride along, it is not part of the refactor — pull it out as a separate, non-refactor step, before or after, never smuggled inside.

## Two paths — mode-switchable

- **Scrappy (~5 min):** a genuinely small, reversible, in-file cleanup you can hold in your head (rename a symbol, extract one pure function, inline a shallow wrapper). Name the one risk in a sentence, lean on the type-checker + existing tests, do it. Don't ceremony a 3-line rename.
- **Rigor (default when it's real):** the full method below — scope in/out, risk read, characterization tests first, an always-green step sequence. Any refactor that crosses a seam, touches multiple call sites, sits on a money/auth/data path, or runs against thin test coverage is rigor.

**Recommended default:** rigor whenever the code has users and the blast radius exceeds one file; scrappy only for a trivially reversible tidy. When unsure, rigor — the plan is cheap, an unplanned reshape that goes red is not.

## Destination — situational (SOLO default, tracker UP)

The plan is identical; only where it lands changes.
- **SOLO DEFAULT — present it, optionally a local file.** Show the plan inline; if it'll outlive the sitting, write `refactor-plan.md` (or `refactor-plans/<slug>.md`) in the repo. A file in the repo *is* the record — Dinesh works solo/freelance with no shared tracker.
- **Mode-switch UP — a tracker issue.** Only when he actually runs one (a client's Linear, a GitHub repo). File one issue in step order. Never assume it; the deprecated source defaulted to a GitHub issue — that assumption is the thing this fork drops.

## Intake gate — ask only the gaps

Discover what the code shows; ask **only** what you can't read, each with a recommended default so Dinesh confirms rather than composes.

| # | Need | Discover myself | If missing, ask (with a default) |
|---|------|-----------------|----------------------------------|
| 1 | **Target shape** — the concrete end state | Partly — from an upstream drill (improve-code-architecture) or the code's obvious friction | "What does *done* look like — one deep module behind `X`, the boundary pushed down? (default: smallest reshape that removes the friction)" |
| 2 | **Behavior contract** | No | "Behavior stays identical, or is a change intended? (default: preserved — any change splits out as its own step)" |
| 3 | **Coverage at the seam** | Yes — run the suite, read the tests around the target | "—" (if thin, characterization tests come first; see step 3) |
| 4 | **Blast radius** | Yes — grep the call sites, `git log` the churn | "—" |

One batched round. If every gap has a safe default, state them and proceed.

## The method (rigor path — a menu, not a march)

Run the steps this refactor needs; a small in-file reshape skips 3–4's ceremony.

1. **Fix the target as a destination, not "clean it up."** Name the concrete end shape (the deep module and its interface, the collapsed duplication, the boundary moved). If the shape isn't decided, stop — that's **codebase-design** / **improve-code-architecture**'s job first; sequencing toward a fuzzy target is how a plan becomes a rewrite. Then draw the scope line: what changes, and an **explicit out-of-scope list** of what does not (borrow **write-problem-statement**'s discipline so the refactor can't sprawl).
2. **Name the risk — a refactor's risk is regression.** For each area you'll touch, read three dimensions and rank them: **blast radius** (how many call sites), **seam crossed** (does it touch a data/network/money/auth path), **coverage** (is current behavior pinned by a test). The rank drives the sequence — highest-risk area gets covered first and touched last. This is optimism bias — "it'll just refactor cleanly" — and **name-and-control-bias** owns both the naming and the control: the control is pinning behavior with a test before you touch a hot path. Its inverse holds too — a "risk" on code nothing depends on that a test already covers is **noise**; don't gold-plate a safe corner.
3. **Pin behavior at the seam — characterization tests first.** Before restructuring, make sure a test exercises the *current* behavior through the seam you'll refactor behind (the seam is **codebase-design**'s term — the interface you substitute/test through). Thin coverage on a real reshape = you cannot tell if you broke it, and that uncertainty is what turns a refactor into a scary rewrite. If coverage is thin, write **characterization tests** first: they capture what the code *does today* (bugs and all), not what it should — a snapshot so any moved behavior shows up instantly. (This skill owns the characterization-first discipline — that a test must pin *current* behavior before you touch the seam, and where the seam is; **test-shipped-code** owns the test-writing craft a characterization test still obeys — assert observable behavior, not implementation; expected values from an independent source, never tautological.)
4. **Sequence into always-green steps, risk-ranked.** Order so each step compiles, passes tests, and could ship alone. Front-load a **prefactor** (one mechanical cleanup that makes later steps trivial). Prefer **parallel change** — new form beside old, migrate, then delete — over a flag day. Put the scary, hardest-to-reverse step **last**, after the seam is covered and the safe steps have de-risked around it. For a **wide refactor** whose blast radius fans across the tree so no single step lands green (renaming a shared type, retyping a column), don't force it small — sequence **expand → migrate-in-batches → contract**; **plan-work-tickets** owns that pattern, apply it, don't restate it.
5. **Set stop points + confirm.** Mark the checkpoints where the suite is green and you could hand off or walk away (**handoff-context** owns the between-session carry). Present the numbered plan; ask whether the scope line, the risk rank, and the granularity are right. Iterate until Dinesh approves — only then execute or file it.

## Worked example — "just clean up checkout.ts" → a plan that isn't a rewrite

**Request:** "`checkout.ts` is a mess, just clean it up." It's ~400 lines mixing cart math, tax calc, a Stripe call, and currency formatting; the same tax logic is copy-pasted into the admin refund path. No test pins the totals.

**The trap (what "clean it up" invites):** a big-bang rewrite — spin up a fresh `checkout/` folder with new abstractions, port everything, delete the old file, rewire every caller. Red for days, and *nothing can prove the totals still come out the same*. That's the failure this skill exists to catch.

**The plan instead:**
- **1 Target shape:** pull the pure cart+tax math into one deep module `computeTotals(cart): Totals` behind a small interface; Stripe stays behind its existing seam; formatting moves to the view. **Out of scope:** the Stripe integration itself, the checkout UI copy, the refund *screen*.
- **2 Risk read:**

  | Area | Blast radius | Seam crossed | Covered? | Risk |
  |---|---|---|---|---|
  | cart + tax math | high (every checkout) | money path | no | **highest** |
  | duplicated tax in refund path | medium | money path | no | high |
  | Stripe call | already behind a seam | external | yes | low — don't touch |
  | currency formatting | low | none | n/a | low — cosmetic |

- **3 Pin behavior:** coverage is thin, so **characterization tests first** — feed representative carts and snapshot today's totals (bugs and all). Now moving the math can't silently change a number.
- **4 Always-green sequence (risk-ranked):**
  1. *(prefactor, no risk)* add characterization tests around current `checkout.ts` totals — green, ships alone.
  2. extract `computeTotals` as a pure fn; `checkout.ts` calls it — behavior identical, tests still green.
  3. move currency formatting to the view — cosmetic, tests green.
  4. *(hardest, last)* collapse the duplicated refund-path tax into the same `computeTotals` — now covered on both call sites, de-risked, done last.
- **5 Stop points:** green after every step; safe to stop or hand off at any one.

**The catch:** the rewrite would have been red for days and could not have *proven* totals were preserved; the characterization-tests-first + tiny-steps plan is green after every step, touches the money path only once it's pinned, and defers the cosmetic move. Same destination — a reversible sequence instead of a leap.

## Don't / Do

| Don't | Do |
|---|---|
| Answer "clean this up" with a from-scratch rewrite | Name the target shape, then sequence reversible always-green steps |
| Start sequencing before the target shape is decided | Get the shape from codebase-design / improve-code-architecture first |
| Refactor a hot path with no test pinning behavior | Characterization tests first — pin current behavior at the seam |
| Smuggle a behavior change into the refactor | Split it out as a separate, non-refactor step |
| Touch the highest-risk area first | Cover it first, touch it last, de-risk around it |
| Force a wide refactor into one green step | Sequence expand → migrate → contract (plan-work-tickets) |
| Gold-plate a safe corner nothing depends on | A risk a test already covers on unused code is noise |
| Default to filing a GitHub issue | Present the plan / local `refactor-plan.md`; tracker only if he runs one |

## Anti-patterns / red flags

- **Big-bang rewrite.** New folder, port everything, delete the old, rewire — red for days, no proof behavior survived. The single failure this skill prevents.
- **Sequencing toward a fuzzy target.** "Make it cleaner" with no named end shape — the plan drifts into a rewrite because there's no destination to stop at.
- **Restructuring on thin coverage.** No characterization test before a real reshape → you can't tell a regression from a refactor.
- **Behavior change smuggled in.** A "while I'm here" fix hidden inside a behavior-preserving step — now a red suite could mean either, and you can't tell which.
- **Hardest step first.** Doing the scary irreversible collapse before the seam is covered and the easy steps have de-risked it.
- **A step that can't ship alone.** If it only compiles once the *next* step also lands, it isn't a step — merge or re-cut.

## Output format — the refactor plan

```markdown
## Refactor plan: <target>

**Target shape:** <concrete destination — a deep module behind X, duplication collapsed — never "cleaner">
**Behavior:** preserved  (or: <named change, split to its own step>)
**Out of scope:** <explicit list>

**Risk read:**
| Area to touch | Blast radius | Seam | Covered? | Risk |
|---|---|---|---|---|

**Steps — each green + reversible:**
1. [prefactor] <smallest safe first step> — ships alone
2. …
(highest-risk area: covered first, touched last)

**Stop points:** program is green after any step.
```

Any claim the plan makes about being "safer" or "faster" is a claim, not a given — it follows **craft-critique**'s evidence discipline (measure it or flag it), never a confident assertion.

## Boundaries

- **improve-code-architecture** zooms OUT — scans an app, ranks the rot, and *scopes* the fix in its drill; this skill takes that scoped target and plans the safe incremental path to it. Scope there, sequence here.
- **codebase-design** owns the target *shape* (deep module, interface, seam, the deletion test) and the vocabulary; this owns the safe *path* to that shape. Shape there, sequence here — load it for the seam/interface terms, never restate them.
- **plan-work-tickets** slices NEW, behavior-*adding* feature work into tracer bullets and owns the **expand → migrate → contract** wide-refactor pattern; this plans behavior-*preserving* restructuring and references that pattern rather than restating it.
- **test-shipped-code** owns the red→green loop and what makes a test sound (assert behavior not implementation, non-tautological) — it does *not* cover characterization; this owns the characterization-tests-first discipline (pin current behavior, green from the start, bugs and all, before the seam is touched) and where the seam is.
- **review-shipped-code · diagnose-bugs** own executing and checking the change; this stops at an approved plan.
- **write-problem-statement** owns the scope + out-of-scope discipline the plan borrows so a refactor can't sprawl into a rewrite.
- **handoff-context** owns the between-session carry the stop points hand off to.
- **name-and-control-bias** owns the optimism-bias naming and the "a risk that can't touch the code is noise" principle; **craft-critique** owns the evidence discipline any safety claim follows; if the refactor touches rendered UI, the visual correctness of those states defers to **design-taste**. All named, never restated.

## Sources

- Forked from **`request-refactor-plan` (deprecated), mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Kept: **plan the refactor before doing it**, explicit scope-in / out-of-scope, **tiny commits each leaving the codebase working** (Martin Fowler — "make each refactoring step as small as possible, so that you can always see the program working"), and the plan template (problem → target → steps → out-of-scope). Personalized: solo-first — the plan is presented or written to a local file by default, with a tracker issue as the mode-switch-up, dropping the source's user-interview → GitHub-issue pipeline; added **regression-risk ranking** and **characterization-tests-first** as the core discipline; recast for React/Next/TypeScript and wired to the SHIP-wing siblings (improve-code-architecture scopes, codebase-design shapes, plan-work-tickets owns expand→migrate→contract, test-shipped-code owns the test-writing craft).
