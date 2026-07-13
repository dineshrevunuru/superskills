---
name: implement-spec
description: "Drive a spec or set of tickets to shipped, committed code — the conductor of the SHIP-wing rigor path. Agrees the test seams up front, builds in vertical slices (red→green via `test-shipped-code` at each seam), runs `review-shipped-code` as an AND-gate before commit, and routes surprise breakage to `diagnose-bugs`. Use when asked to 'implement this spec', 'build this ticket', 'build out the feature', 'work through the tickets', 'implement what the spec says', 'build the booking flow', or before committing a shipped Next/React/TypeScript feature. Solo-first: the 'tickets' are a workpack BUILD-SPEC / tasks.json / a plain checklist, NOT an assumed Jira board — mode-switches UP to a tracker only when Dinesh actually has one. NOT for prototypes (build-coded-prototypes owns those — no tests, no review gate)."
license: "MIT — forked from `implement` in mattpocock/skills (© Matt Pocock), 'Skills For Real Engineers.' Kept: use TDD at pre-agreed seams, typecheck/test cadence, review before commit, commit to the current branch. Re-cast as the DRIVER that sequences the SHIP wing (test-shipped-code / review-shipped-code / diagnose-bugs), scoped to shipped Next/React/TS, given a solo-first spec-source intake and a prototype guard."
---

# Implement Spec — Drive the Ship Loop

Part of the **SHIP wing** (production-code craft). This is the **conductor**: it turns a spec/tickets into shipped, committed code by *sequencing* the other SHIP skills — it does not re-teach TDD or code review, it drives them at the right moments. The value is the ordering: seams agreed first, tests red before code, a review gate before commit.

## When to use / when NOT to use

**Use** to build a spec or set of tickets into committed code on a **shipped** Next/React/TS surface (a salon booking app, a portfolio).

**Do NOT use** for:
- **Prototypes** → `build-coded-prototypes` (no seams, no tests, no review gate — the hard line; a `console.log` is *correct* there).
- **Hunting an existing bug** → `diagnose-bugs`. This skill *builds new work*; when a bug you didn't intend surfaces mid-build, hand off to that loop — don't debug ad hoc inside the build.
- **Writing the spec itself** → `write-problem-statement` / the workpack. This skill *consumes* a spec; it never invents acceptance criteria to have something to build.
- **Slicing the spec into tickets** → `plan-work-tickets` (tracer-bullet tickets + blocking edges, sequenced so a ready one always exists). This skill *builds* the ticket it's handed; it never slices or re-sequences the backlog.
- **Reviewing a diff that already exists** → `review-shipped-code` directly. This skill drives that review as one step, not the whole job.

## Intake gate — ask only the gaps (solo-first)

**Discover silently (don't ask):**
- **The spec source.** Solo reality: "tickets" = a `plan-work-tickets` `tickets/` folder, a workpack `BUILD-SPEC.md` / `prd.md`, `tasks.json` `acceptanceCriteria`, a `write-problem-statement` output, or a plain markdown checklist. There is **no assumed issue-tracker.** Read whichever exists; the acceptance criteria in it are the definition of done.
- The runner + conventions (`package.json` — Vitest/Jest/Playwright), the branch, the `setup-pre-commit` hook if present.

**Ask Dinesh (decisions only he owns) — each with a default:**

| Gap | Recommended default |
|---|---|
| Where do the tickets live? | The workpack spec / `tasks.json`; **mode-switch UP** to Jira/Linear/GitHub Issues only if he says this engagement has one |
| Which tickets are in this slice of work | The next ready ticket(s) in `plan-work-tickets`'s sequence (or the ones the spec marks for this milestone); don't pull the whole backlog |
| Done means… | Every acceptance criterion in the spec met **and** the review gate green — not "it runs" |

One batched round. If every gap has a safe default, state them and start.

## Two paths — mode-switchable

State which you took.

- **Scrappy (small/low-stakes ticket, ~15 min):** one focused red→green test at the single critical seam if there's logic; implement; typecheck + run that test; a one-pass self-review; commit. Skip the parallel review sub-agents.
- **Rigor (default for any real shipped feature):** the full seam plan → per-slice red→green → typecheck/test cadence → the full `review-shipped-code` gate before commit.

**Recommended default:** rigor for anything a real user touches; scrappy only for a genuinely small, internal, single-component change. When unsure, rigor.

## The seam plan — agree the seams BEFORE any code

Before writing a line, name the **seams** this ticket will be tested at (the public boundaries — exported function, hook return, route handler) and confirm them with Dinesh. The seam gate itself is owned by `test-shipped-code`; this skill's job is to run that gate *up front, once, for the whole ticket* so the build has a spine.

Why up front: it is the structural control against the commonest implement failure — **build the whole feature, then retrofit a test that agrees with the code you just wrote** (a tautological, horizontal test that proves nothing). Per `name-and-control-bias`, the fix is structural (agree the seam and write the test red *before* the code), not a reminder to "test well." A test written after the implementation is an echo of it.

Not everything earns a seam: logic/state/data does; pure-visual work earns a screenshot instead — the split is `test-shipped-code`'s mode switch. Agree the *logic* seams here.

## The build loop (rigor path)

Work in **vertical slices** — one seam at a time, never all tests then all code.

1. **Red→green at the seam.** For each slice, drive the `test-shipped-code` loop: one failing behavior test at a confirmed seam → only enough code to pass it. Do not restate that loop here — invoke it.
2. **Cadence.** Typecheck and run the touched test file after each slice; run the **full suite once** at the end. A slice isn't done until its type errors are zero and its test is green.
3. **Surprise breakage → hand off, don't spelunk.** If something you didn't intend breaks (a failing test elsewhere, a flaky render, a prod-only error), stop building and route to `diagnose-bugs` (reproduce → minimize → fix → regress). Its regression test obeys `test-shipped-code`'s rules. Resume the build after it flips green→red→green.
4. **Repeat** until every acceptance criterion in the spec has a slice that satisfies it.

Refactoring is **not** part of a red→green cycle — it runs after green, as review.

## The pre-commit gate — review, then commit

The terminal step, and it is a **gate**, not a formality:

1. **Run `review-shipped-code`** on the diff (`main...HEAD`). It runs the two isolated axes (Standards + Spec) and issues the verdict in `craft-critique`'s language.
2. **AND-gate.** Commit only when both axes clear — **BLOCKED if either carries a 🔴.** A feature that "works" and "looks close enough" still fails here on an inaccessible or off-register control; that's the point of reading the source before shipping.
3. **Commit to the current branch** — branch first if you're on `main`. Never force-push or hard-reset; `git-guardrails` enforces that Tier-3 line. If `setup-pre-commit` is installed, let its hook run — don't `--no-verify` past it.

**Completion criterion (guards premature completion):** every acceptance criterion met · typecheck clean · full suite green · review gate PASS (or PASS WITH NOTES, notes logged) · committed. Anything short of all five is not done.

## Worked example — a booking-flow ticket

**Ticket (a salon booking app, from the workpack `BUILD-SPEC.md`):** "On the confirmation screen, add a *Book again* action that re-opens the booking flow pre-filled with the same stylist."

**The tempting failure (reject it):** build the `RebookButton`, click it once by hand, retrofit a test that asserts `onRebook` fired, commit straight to the branch. Two traps: the retrofitted test is an **echo** of the code (tautological — `name-and-control-bias`), and there was **no review gate** — so an inaccessible control ships.

**The rigor path:**
1. **Seam plan (up front):** the logic seam is `buildRebookPayload(booking) → { stylistId, serviceId }`. The button's *render* is pure-visual → screenshot, not a unit test (`test-shipped-code`'s split). Confirm the one seam with Dinesh.
2. **Slice 1 — red→green** via `test-shipped-code`: write the failing test `"rebook payload carries the original stylist"` against a **hand-worked** literal (not a value recomputed by the code) → watch it fail → implement `buildRebookPayload` to pass. Typecheck + run the file: green.
3. **Cadence:** full suite green; the render checked with a screenshot at the mobile viewport (`verify-ui-quality`), values judged against `design-taste` — never asserted in a unit test.
4. **Pre-commit gate** — `review-shipped-code` on the diff. **Spec axis: PASS** (does exactly what the ticket asked). **Standards axis: BLOCKED** — the button was built as a `motion.div` with `onClick`: not focusable, no keyboard activation, and a hardcoded hex where a token exists. **AND-gate → BLOCKED.**
5. **Fix + re-gate:** swap to `<button>`, tokenize the color (canonical value owned by `build-token-system`) → both axes clear.
6. **Commit** to the feature branch under `git-guardrails`. Done — all five completion criteria met.

The gate caught what the "it works, commit it" path would have shipped: a working, right-looking, **inaccessible** control. That catch is the whole reason the loop ends in a review, not a click-test.

## Anti-patterns / red flags

- **No seam plan.** Diving into code before naming the test seams — you'll retrofit echoes at the end.
- **Horizontal build.** All the code, then all the tests. Slice vertically or the tests go blind to what you actually built.
- **Debugging inside the build.** Spelunking a surprise bug ad hoc instead of handing it to `diagnose-bugs` — you lose the red-capable signal and the build's thread at once.
- **Skipping the gate because "it works."** Working is not shippable; the review reads the source, where working-but-inaccessible hides.
- **`--no-verify` past the pre-commit hook**, or committing straight to `main`.
- **Inventing acceptance criteria** the spec never stated so there's "more to build" — scope creep the Spec axis will flag anyway.

## Don't / Do

| Don't | Do |
|---|---|
| Assume a Jira/Linear board | Read the workpack spec / `tasks.json`; mode-switch UP to a tracker only if he has one |
| Write the feature, then bolt a test on | Agree the seam, write the test red *first* via `test-shipped-code` |
| Restate the red→green loop or the review axes here | Invoke `test-shipped-code` / `review-shipped-code` — this skill only sequences them |
| Debug a mid-build surprise inline | Route to `diagnose-bugs`; resume after it's green |
| Commit because it runs | Run the review AND-gate; commit only when both axes clear |
| Force-push / commit to `main` | Branch first; commit to the feature branch under `git-guardrails` |
| Test-drive or review a prototype | Send prototypes to `build-coded-prototypes` — no tests, no gate |

## Boundaries

- **`test-shipped-code`** owns the red→green loop, the seam gate, and the logic-vs-visual split. This skill runs that gate *once up front* for the whole ticket and drives the loop per slice — it never restates TDD.
- **`review-shipped-code`** owns the two-axis Standards/Spec review and verdict. This skill runs it as the mandatory pre-commit AND-gate.
- **`diagnose-bugs`** owns hunting a bug. When one surfaces mid-build, this skill hands off and resumes after; it never debugs ad hoc.
- **`build-coded-prototypes`** owns prototypes — explicitly out of scope (no tests, no gate). The hard line.
- **`write-problem-statement`** / the workpack produces the spec this consumes; this skill never invents one.
- **`plan-work-tickets`** slices that spec into the tracer-bullet tickets (with blocking edges) and sequences them; this skill builds the ready ticket it hands over — it never re-slices or re-sequences.
- **`git-guardrails`** enforces the Tier-3 commit safety; **`setup-pre-commit`** owns the hook. This skill commits to the current branch under both.
- **`craft-critique`** owns verdict language and evidence discipline; **`design-taste`** owns every taste value the visual checks defer to — neither restated here, both reached through the skills above.
- **`name-and-control-bias`** supplies the confirmation-bias framing behind seams-up-front (a structural control, not a reminder).

## Sources

- Forked from **`implement`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Kept: TDD at pre-agreed seams, regular typechecking + single-file tests + one full-suite run, review before commit, commit to the current branch. Re-cast as the SHIP-wing driver, scoped to shipped Next/React/TypeScript, with a solo-first spec-source intake, the prototype guard, and explicit hand-offs to `test-shipped-code`, `review-shipped-code`, and `diagnose-bugs`.
- **`test-shipped-code`**, **`review-shipped-code`**, **`diagnose-bugs`**, **`build-coded-prototypes`**, **`plan-work-tickets`**, **`git-guardrails`**, **`setup-pre-commit`**, **`craft-critique`**, **`design-taste`**, **`name-and-control-bias`** — referenced by name, never restated.
