---
name: diagnose-bugs
description: "Dinesh's debugging discipline for SHIPPED apps — reproduce before you theorize, prove every fix red-then-green. Use when a shipped Next/React/TypeScript app is 'broken', 'throwing', 'failing', 'flaky', 'slow', 'works locally but not in prod', 'only breaks sometimes', or someone says 'debug this' / 'diagnose' / 'why is this happening'. Mode-switches by bug class: screenshot-first for CSS/layout/interaction bugs, the full instrumented feedback loop for state/data/async bugs, measure-first for perf regressions. NOT for prototypes — a prototype bug means the prototype answered its question; build-coded-prototypes owns that."
license: "MIT — forked from `diagnosing-bugs` in mattpocock/skills (© Matt Pocock). Reproduce→minimise→hypothesise→instrument→fix→regress loop and HITL bash-template adopted; personalised to shipped Next/React apps and mode-switched by bug class — see Sources."
---

# Diagnose Bugs — Reproduce Before You Theorize

Part of the **SHIP wing** (production-code craft). This is how Dinesh hunts a real bug in a shipped app: build a signal that goes red on *this* bug first, then let bisection, hypotheses, and instrumentation consume it. Staring at code to build a theory before you can reproduce is the exact failure this skill exists to prevent.

## When to use / when NOT to use

**Use** for bugs in **shipped, production code** — a live AI chatbot, a booking app in beta, a portfolio AI agent, any Next/React surface real users touch.

**Do NOT use** for prototypes. A bug in a throwaway prototype is not a bug to hunt — it is the prototype doing its job: revealing the answer. `build-coded-prototypes` owns that world; you delete the prototype, you don't instrument it. If you catch yourself building a regression test for a zero-dep demo, stop — wrong skill.

## The one law

**No red-capable reproduction, no hypothesis.** A red-capable signal is one that goes *red on this exact bug* and *green once it's fixed* — a failing test, a Playwright assertion, a screenshot diff, a timing harness. Until that signal exists and you have run it once, you are guessing. The single most common way smart people waste a day: they read code, form a confident theory, "fix" it, and never had a signal that could tell them they were wrong. Build the signal first and the bug is 90% found.

Root-cause is a **claim about reality** — it obeys `craft-critique`'s evidence discipline. You do not get to assert "it was the race condition" from a plausible read of the code. You assert it only when the fix flips the signal red→green **and** reverting the fix brings the red back. That revert-proves-it step is the debugging form of "cite it, don't synthesize it."

## Intake gate — ask only the gaps

Before touching code, you need five things. Fill what the report already gives you; ask **only** what's missing. Offer a best-guess default for each so Dinesh confirms instead of composing.

| # | Need | If missing, ask (with a default) | I can discover this myself |
|---|------|----------------------------------|----------------------------|
| 1 | **Exact symptom** | "What did you see — the precise wrong output / error text / broken pixels?" | Partly — logs, console, error monitor |
| 2 | **Surface + route** | "Which app + which screen/route? (default: the one you last touched)" | Yes — repo, recent commits |
| 3 | **Repro steps** | "What sequence triggers it? (default: I'll try the obvious path first)" | Sometimes — I'll attempt a repro |
| 4 | **Determinism** | "Every time, or only sometimes?" | Yes — by looping the trigger |
| 5 | **When it started** | "Did a deploy / dependency bump / data change precede it?" | Partly — git log, deploy history |

Rule from the `grilling` discipline: **split what only Dinesh knows** (what he actually saw, when it broke, which real user hit it) **from what you can find yourself** (logs, git history, a repro attempt). Never ask him for column-5 facts — go get them. Never assume column-1 facts — a bug fixed against the wrong symptom is a wrong fix.

## Pick your loop (situational — the bug class picks the path)

**Process is dead: the bug class chooses the tightest loop, not a fixed march.** One recommended default per class.

| Bug class | Tightest loop | Path |
|---|---|---|
| CSS / layout / spacing / interaction / visual state | A **screenshot** goes red on it faster than any test harness | **Fast path** ↓ |
| State / data / async / race / logic / wrong output | Needs an **instrumented, assertable** loop — a screenshot can't catch a race | **Rigor path** ↓ |
| Performance regression (slow, janky, heavy) | **Measure first** — logs lie about perf; establish a baseline, then bisect | Rigor path, perf branch |
| Unknown / "sometimes wrong, sometimes fine" | Presume async underneath a visual symptom → **default to the rigor path** | Rigor path |

Escalation rule: if the fast path can't hold the bug down — the screenshot is right *sometimes* — the symptom is a lagging indicator of a state/async cause. **Stop screenshotting and escalate to the rigor path.** Intermittent visual = async bug wearing a CSS mask.

## Fast path — screenshot-first (CSS / layout / interaction)

For a visual bug, **the screenshot is the red-capable loop.** Don't build a test harness to see that a modal overflows on mobile.

1. Drive the broken route with browser automation and capture the screenshot at the failing viewport. `verify-ui-quality` owns the mechanical half — spacing, type scale, state, interaction parity, cross-device — run its machine pass to *measure* the delta.
2. Compare against intent. What "correct" means is `design-taste` (breathing room, one dominant element, the locked motion curves) and the Figma/token spec — **load `design-taste`; never eyeball taste from memory.**
3. Fix, re-screenshot. Red (wrong pixels) → green (right pixels) is your proof. Revert to confirm the red returns.
4. Verdict language and severity (🔴/🟡/🟢) come from `craft-critique` — this path *finds* the bug; craft-critique *judges* whether it blocks ship.

Deterministic and 2 seconds per iteration — that's why it beats the full loop for visual bugs. But it is **only red-capable when the symptom is always on screen.** Flaky visual → escalate.

## Rigor path — the full loop (state / data / async / perf)

Six phases. Skip one only with an explicit reason.

**Phase 1 — Build a red-capable feedback loop.** *This is the skill; everything else is mechanical.* Construct a signal that goes red on this bug, in roughly this order of preference: (1) failing test at the seam that reaches the bug; (2) HTTP/curl script against a running dev server or the deployed API route; (3) a **Playwright script** that drives the real UI and asserts on DOM / console / network; (4) replay a captured payload (save the real request/event to disk, run it through the code path in isolation); (5) a throwaway harness calling the bug path directly; (6) a differential loop (old build vs new, or two configs, diff the output); (7) **HITL bash loop** (below) only when a human must physically act. Then **tighten it**: faster (cache setup, narrow scope), sharper (assert the *exact* symptom, not "didn't crash"), deterministic (pin time, seed RNG, freeze network).
- **Completion criterion:** you can name **one command** you have **already run once** (paste the invocation + its output) that is red-capable, deterministic, fast, and agent-runnable. If you're reading code to build a theory before this command exists — **stop. That's the failure this skill prevents.**

**Phase 2 — Reproduce + minimise.** Run the loop; watch it go red. Confirm it reproduces the **user's** symptom, not a nearby lookalike. Then shrink to the smallest scenario that still goes red — cut inputs, callers, config, steps **one at a time**, re-running after each cut. Done when every remaining element is load-bearing (removing any one makes it green). A minimal repro shrinks Phase 3's suspect space and becomes Phase 5's clean test.

**Phase 3 — Hypothesise.** Generate **3–5 ranked, falsifiable** hypotheses *before testing any*. Format: *"If X is the cause, changing Y makes the bug vanish / changing Z makes it worse."* Can't state the prediction? It's a vibe — sharpen or discard. Generating only one hypothesis is **anchoring bias** — you fixate on the first plausible story and code confirms it because you went looking for confirmation; `name-and-control-bias` names both (anchoring, analyst confirmation). The multi-hypothesis rule *is* the control. Show the ranked list to Dinesh before probing — domain knowledge re-ranks instantly ("we bumped that dep Tuesday"); don't block if he's AFK.

**Phase 4 — Instrument.** Each probe maps to one prediction; **change one variable at a time.** Prefer debugger/REPL (one breakpoint beats ten logs) → targeted logs at the boundaries that *distinguish* hypotheses → never "log everything and grep." **Tag every log** with a unique prefix, e.g. `[DBG-a4f2]`, so cleanup is one grep. **Perf branch:** don't log — establish a baseline (`performance.now()`, React Profiler, network waterfall, query plan), then bisect. Measure first, fix second.

**Phase 5 — Fix + regression test.** Write the test **before** the fix — *if a correct seam exists.* A correct seam exercises the **real bug pattern at the call site**. A too-shallow seam (a single-caller unit test for a bug that needs two callers racing) gives false confidence — and **the absence of a correct seam is itself the finding**: the architecture is preventing lockdown; note it. With a seam: turn the minimal repro into a failing test → watch it fail → apply fix → watch it pass → re-run the Phase 1 loop against the **original un-minimised** scenario. Red-then-green, both directions.

**Phase 6 — Cleanup + post-mortem.** Required before "done": original repro no longer reproduces · regression test passes (or missing-seam documented) · all `[DBG-...]` logs grepped out · throwaways deleted · **the winning hypothesis written into the commit/PR message** so the next debugger learns. Then ask: *what would have prevented this?* If the answer is architectural (no seam, tangled callers, hidden coupling), flag it **after** the fix lands — you know more now than at the start.

## HITL Playwright loop (flaky front-end repro)

For a front-end bug that (a) is intermittent and (b) sometimes needs a human (a real payment, a physical device, a captcha you must never solve for the user), keep the loop **structured** rather than clicking blindly.

- **Agent-driven, unattended:** a Playwright script drives the Next route N times and asserts the symptom, printing a **flake rate**. Non-deterministic bugs don't need a clean repro — they need a *higher reproduction rate*. Loop 100×, parallelise, inject sleeps to widen the race window. A 50% flake is debuggable; 1% is not — raise the rate until it is.
- **Human-in-the-loop, last resort:** when a step is genuinely human-only, drive *them* with a bash script (`step "<instruction>"` waits for Enter; `capture VAR "<question>"` reads the answer back) so the verdict still feeds the loop as structured `KEY=VALUE` output — never freeform "did it work?" chat. Copy `scripts/hitl-loop.template.sh`, edit the steps, run it.

## Worked example — the flaky booking-slot bug (catches the wrong first hypothesis)

**Report (a booking app in beta):** "Sometimes the confirmation screen shows a *different* time than the one I picked. Not always. Can't tell when."

**Intake gate** fills fast: symptom = confirmed time ≠ selected time (only-Dinesh-knows); surface = booking confirm route; determinism = **intermittent** (the tell); "when started" = git log shows the slot-picker was refactored to a faster tap flow last week (discovered, not asked).

**Tempting first hypothesis (reject the anchor):** "timezone formatting bug in the display layer" — the obvious CSS/display guess. Under the one law, **it does not get tested first.** Intermittent + wrong-value = the *unknown* class → escalate to the **rigor path**, not the screenshot path. (A single screenshot would show the *right* time on the passing runs and quietly validate the wrong theory — the exact trap.)

**Phase 1 loop** — the law in action: *name one command you have already run; paste the invocation and its output.* A Playwright script selects a slot, double-taps confirm, asserts `confirmedTime === selectedTime`, looped 50×:

```
$ node repro-slot.mjs --runs 50
  ...
  FAIL 15  PASS 35   flake=30%   3.1s/run avg
```

Red-capable, deterministic-enough, 3s/run — and it exists *before* the timezone theory is tested. That ordering is the whole skill.

**Phase 2 minimise:** cut steps one at a time. It only fails when **two slots are tapped in quick succession** before the first settles. Remove the fast double-tap → 0 failures. That single element is load-bearing — and it already **kills the timezone hypothesis**: formatting doesn't care how fast you tap.

**Phase 3 hypotheses (ranked):** (1) stale closure — the confirm handler captured `selectedTime` from a render before the second tap's state update; (2) unbatched async state update; (3) server echoing a cached slot. Predictions stated for each. #1 predicts: replace the captured value with a functional read / ref → flake vanishes.

**Phase 4 instrument:** one `[DBG-9c1]` log of the captured vs live value at confirm time. Confirms #1 — captured value lags by one tap. Classic React stale-closure, introduced by last week's tap-flow refactor.

**Phase 5 fix + proof:** functional setState / ref read. Regression test at the handler seam reproduces the double-tap race → fails before, passes after. Re-run the Phase 1 loop: **0/50.** Revert the fix → 15/50 returns. **Red→green→red = root cause proven**, not asserted.

**Phase 6:** logs grepped out, winning hypothesis written into the PR, and a note: the refactor removed the only seam that would've caught this — flag for a follow-up. **The discipline that saved the day was refusing to test the timezone theory before reproducing.**

## Anti-patterns / red flags

- **Theory before repro.** Reading code to build a hypothesis with no red-capable command in hand. The cardinal sin.
- **Screenshotting a race.** Using the fast path on an intermittent bug — the passing runs launder a wrong theory. Intermittent visual = escalate.
- **Fixing the nearby bug.** The loop goes red on *a* failure that isn't the user's symptom. Wrong bug → wrong fix.
- **Single hypothesis.** Anchoring on the first plausible cause; code "confirms" it because you only looked there.
- **"It's fixed" with no green-then-red.** Declaring root cause without watching the fix flip the signal *and* the revert flip it back. That's synthesis, not evidence (`craft-critique`).
- **Flaky loop treated as a loop.** A 30-second, 40%-flake signal is barely a signal — tighten and raise the rate first.
- **Untagged debug logs.** They survive to production. Tag with a prefix or don't add them.
- **Debugging a prototype.** Wrong skill — the bug is the answer; delete the prototype.

## Don't / Do

| Don't | Do |
|---|---|
| Read code to form a theory first | Build a red-capable signal, run it once, *then* theorise |
| Screenshot an intermittent bug | Escalate to the instrumented loop; screenshots can't catch races |
| Trust one plausible hypothesis | Rank 3–5 falsifiable ones before testing any |
| Claim "it was X" from a good read | Prove it: fix flips red→green, revert flips it back |
| Log everything and grep | One tagged probe per prediction, at the deciding boundary |
| Chase a flaky 40% loop as-is | Raise the reproduction rate until it's debuggable |
| Skip the test because "the fix is obvious" | Write it at a correct seam — or document that no seam exists |
| Fix and move on silently | Write the winning hypothesis into the commit; flag architectural causes |

## Boundaries

- **`verify-ui-quality`** owns the mechanical UI half the fast path leans on — browser automation, spacing/type measurement, cross-device, Core Web Vitals. It runs the machines and reports numbers; this skill uses those numbers to *locate* a visual bug.
- **`craft-critique`** owns the evidence-discipline verdict. Root-cause is a claim → it takes red-then-green proof, not a confident read. Severity (🔴/🟡/🟢) and PASS/BLOCKED language live there, not here.
- **`design-taste`** owns what "correct" means for any visual bug (breathing room, one dominant element, locked motion curves). Load it on the fast path; never restate its values.
- **`name-and-control-bias`** names the biases the hypothesis phase controls for — anchoring (single-hypothesis) and analyst confirmation (coding to fit the expected story). The 3–5-hypothesis rule is the control.
- **`build-coded-prototypes`** owns the prototype world. A prototype bug is out of scope here — the guard is at the top of this file.

## Sources

- Forked from **Matt Pocock — `diagnosing-bugs`** (github.com/mattpocock/skills, MIT © Matt Pocock). Kept: the reproduce→minimise→hypothesise→instrument→fix→regress loop, "build a tight red-capable feedback loop before theorising," and the HITL bash-loop template (`scripts/hitl-loop.template.sh`). Personalised: scoped to shipped apps (not prototypes), mode-switched by bug class (screenshot-first vs full loop vs perf), wired to Next/React/Playwright, and cross-linked to `verify-ui-quality`, `craft-critique`, `design-taste`, and `name-and-control-bias`.
