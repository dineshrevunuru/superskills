---
name: test-shipped-code
description: "Test-first discipline for the PRODUCTION client code Dinesh ships — a live salon booking app, Next/React/TypeScript surfaces real users touch. Red before green: write the failing behavior test, then only enough code to pass it. Use when building or changing a shipped feature test-first, or when someone says 'write a test for this', 'add test coverage', 'red-green-refactor', 'TDD this', 'test the booking logic', 'is this test actually testing anything', or 'this passes but I don't trust it' — and before merging any logic/state/data change to a live app. Hard-scoped to shipped code: NEVER for prototypes (build-coded-prototypes says skip tests there). Mode-switches — full TDD for logic/state/data; a screenshot via verify-ui-quality for pure-visual work. Wired to Vitest / Jest / Playwright."
license: "MIT — forked from `tdd` in mattpocock/skills (© Matt Pocock), 'Skills For Real Engineers.' Adopted: the red→green loop, the confirm-the-seam gate, the tautological-test warning, vertical-slice / tracer-bullet, and mock-at-boundaries. Re-cast for React/Next/TS + Vitest/Jest/Playwright, hard-scoped to shipped client code, prototype guard added."
---

# Test Shipped Code — Red Before Green

Part of the **SHIP wing** (production-code craft). Test-first discipline for code that reaches real users: write a **behavior test** that fails, then only enough code to pass it. The tests you keep read like a spec and survive refactors — that is the whole point of writing them first.

## When to use / when NOT to use

**Use** when building or changing a **shipped** feature test-first — a salon booking app, any live Next/React/TS surface — especially anything with logic, state, data, money, time, or availability in it.

**Do NOT use** for:
- **Prototypes** → `build-coded-prototypes`. See the guard below — this is the one boundary that must never blur.
- **Hunting an existing bug** → `diagnose-bugs` (reproduce → fix → regress). Its regress step *writes* a test — and that test obeys this skill's rules — but the hunt is its skill, not this one.
- **Judging an already-written diff** → `review-shipped-code` (reads the code post-hoc on two axes). This skill *produces* code + tests as you build; that one *reviews* what exists.

## The prototype guard (the line this skill must never cross)

**A prototype gets no tests. Ever. Writing one is not diligence — it is waste, and it contradicts `build-coded-prototypes` on purpose-built ground.** A prototype exists to answer a question and then die; a hardcoded value and a `console.log` are *correct* there. The moment you catch yourself writing a test for a throwaway HTML file or a Wizard-of-Oz voice demo, stop — wrong skill.

The discipline is earned only where the stakes are real: **a regression in the shipped booking app is a client-drop and a broken-trust event, not a re-run.** That asymmetry — a prototype bug teaches you something, a production regression costs Dinesh the account — is the entire reason production code earns red-green and prototypes earn none of it. Ask one question: *"what happens if this ships to a real client?"* If the answer is "nothing, it's a sketch," you are in the wrong skill.

## Two paths — mode-switchable (what earns a test vs a screenshot)

Never unit-test everything. The change's *nature* picks the path; state which you took.

| The change is… | Tightest signal | Path |
|---|---|---|
| **Logic / state / data / async** — availability math, booking overlap, form validation, a reducer, an API-shaped transform | A **failing behavior test** — a screenshot can't catch a race or an off-by-one | **Rigor — full TDD** ↓ |
| **Pure-visual** — CSS layout, spacing, a GSAP/Framer entrance, a hover state | A **screenshot**, measured by `verify-ui-quality`, judged by `craft-critique` | **Visual — no unit test** |
| **Mixed** — a component that both computes and renders | TDD the logic seam; screenshot the render | Split: rigor for the seam, visual for the pixels |

**Recommended default:** if the change touches logic/state/data on a shipped feature → full TDD. If it is pure presentation → the visual path.

**Why a unit test is the wrong tool for visual work:** an assertion like `expect(el.style.opacity).toBe('1')` is brittle, and green tells you nothing about whether it *looks* right. A screenshot at the failing viewport catches the real defect in ~2 seconds, and the motion/spacing values it is checked against live in `design-taste` — never re-encode a curve or a duration into an assertion. `verify-ui-quality` owns that mechanical measurement pass.

## Intake gate — ask only the gaps

Tests need a seam, a set of behaviors, and an honest source of truth for expected values. Discover what you can; ask only what you can't, each with a recommended default.

**Discover silently (don't ask):**
- The test runner and conventions — read `package.json` (Vitest or Jest), the existing `*.test.ts` / `*.spec.ts` files, the Playwright config. Match them; don't introduce a second framework.
- The spec / acceptance criteria — the workpack (`BUILD-SPEC.md`, `prd.md`), `tasks.json` `acceptanceCriteria`, or a `write-problem-statement` output. This is where the *right* behaviors come from.
- The public interface of the unit under change (the exported function, hook, or route handler).

**Ask Dinesh (decisions only he owns) — each with a default:**

| Gap | Recommended default |
|---|---|
| Which seams to test | The critical-path + complex-logic functions (booking availability, payment, validation); not every private helper |
| What "done" means for this slice | The behaviors named in the spec/acceptance criteria; if none exist, the ones that break a real client if wrong |
| The source of truth for expected values | A hand-worked known-good literal or the spec — **never** a value recomputed by the code (see the tautology warning) |

One batched round. If every gap has a safe default, state them and start the loop.

## The seam gate — confirm before you write the test

A **seam** is the public boundary you observe behavior at — the exported function, the hook's return, the API response. Tests live at seams, never against internals.

**Write down the seams under test and confirm them with Dinesh before writing a single test.** You cannot test everything; agreeing the seams up front is how effort lands on booking-availability and payment logic instead of on every private helper. No test is written at an unconfirmed seam. Ask: *"the public interface here is X — do we test at that seam, or is there a better one?"*

This gate is also a bias control. Testing at an internal seam (a private method, a DB row you query directly) couples the test to *how* the code works, so it breaks on every refactor and passes on every real bug — the inverse of what you want. Per `name-and-control-bias`, the fix is a structural one — test at the public seam — not "remember to write good tests."

## The loop (rigor path — red → green → refactor-elsewhere)

Work in **vertical slices**: one seam, one failing test, one minimal implementation, repeat. Each test is a **tracer bullet** — it responds to what the last cycle taught you. Do not write all the tests first (horizontal slicing tests *imagined* behavior and goes blind to real changes).

1. **Red.** Write one failing behavior test at a confirmed seam. Run it — confirm it fails *for the stated reason*, not a typo. A test you never watched fail is not yet a test.
2. **Green.** Write only enough code to pass it. No speculative features, no anticipating the next test.
3. **Repeat.** Next slice. One seam → one test → one implementation.
4. **Refactor is a separate stage.** Cleaning up structure is not part of the red→green cycle — it belongs to review (`review-shipped-code`), run against a green suite so the tests prove behavior held.

**What green does and does not prove:** a passing test proves the code does what the *test* says. It does **not** prove the test asked for the *right* behavior. Whether the intended behavior is correct is a claim about the spec, not the code — it belongs to `craft-critique`'s evidence discipline and `review-shipped-code`'s Spec axis. A fully green suite on the wrong feature is a real, common failure a test can never catch.

## What a good test is — and the two that lie

A good test verifies **behavior through the public interface** and reads like a spec: `"unavailable slot is rejected"` tells you what capability exists and survives any internal rewrite. Two failure modes make a test *look* like coverage while proving nothing:

- **Tautological** — the expected value is recomputed the way the code computes it (`expect(total(items)).toBe(items.reduce(...))`, a snapshot derived by hand the same way, a constant asserted equal to itself). It passes *by construction* and can never disagree with the code. **Control:** expected values come from an independent source of truth — a hand-verified literal, a worked example, the spec. This is the same confirmation trap the seam gate names: a test that agrees with your own implementation isn't a check, it's an echo.
- **No-op** — the assertion cannot fail against a broken implementation (`expect(result).toBeDefined()` on a function that always returns an object, asserting a mock was constructed, `expect(true).toBe(true)`-adjacent). **Control:** before trusting a test, break the implementation on purpose — if the test stays green, it was testing nothing.

**Mock at system boundaries only** — external APIs, the clock, randomness, sometimes the DB. Never mock your own modules or internal collaborators; a test that mocks the thing it's testing verifies the mock. Inject boundary dependencies (pass the payment client in) rather than constructing them inside, so the seam stays honest.

## Worked example — a tautological booking test rewritten to behavior

**The shipped seam** (the salon booking app): `isSlotAvailable(slot, existingBookings)` returns `true` when a requested slot is free of every existing booking, and `false` when it collides with one.

**The test as received — passes green, asserts nothing:**

```typescript
// BAD: expected value is recomputed with the same overlap logic the code uses
test("isSlotAvailable checks overlaps", () => {
  const slot = { start: "10:00", end: "10:30" };
  const bookings = [{ start: "10:15", end: "10:45" }];
  const expected = !bookings.some(
    (b) => slot.start < b.end && b.start < slot.end
  );
  expect(isSlotAvailable(slot, bookings)).toBe(expected);
});
```

Run the linting passes:
1. **Tautological:** `expected` re-derives the answer with the *same* overlap comparison the implementation uses. If the real code has an off-by-one on the boundary (`<=` vs `<`), the test has the identical bug and still passes. It can never disagree with the code — it's an echo, not a check. The name (`"checks overlaps"`) even describes *how*, not *what*.
2. **Break-it proof:** replace the whole body with `return false` — a function that calls *every* slot unavailable. The one input here is a colliding slot, whose right answer is already `false`, so the test stays green against a completely broken implementation. It never exercises the available direction at all — it is not holding the seam down.

**Rewritten — behavior, against hand-verified literals:**

```typescript
// GOOD: expected values are independent, hand-worked known-good results
test("rejects a slot that overlaps an existing booking", () => {
  // 10:00–10:30 requested; 10:15–10:45 already booked → they collide
  expect(
    isSlotAvailable({ start: "10:00", end: "10:30" }, [
      { start: "10:15", end: "10:45" },
    ])
  ).toBe(false);
});

test("allows a slot that starts exactly when a booking ends", () => {
  // boundary case: 10:30–11:00 vs a 10:00–10:30 booking → NO overlap
  expect(
    isSlotAvailable({ start: "10:30", end: "11:00" }, [
      { start: "10:00", end: "10:30" },
    ])
  ).toBe(true);
});
```

The expected `false` / `true` are worked out by a human against the spec, not by the code. Now the boundary case is a *real* assertion: if the implementation uses `<=` where it should use `<`, the second test goes red — the exact off-by-one the tautological version hid. That boundary test is the tracer bullet; write it red first, then implement `isSlotAvailable` to pass it.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Write a test for a prototype "to be safe" | Skip it — a prototype earns no tests (`build-coded-prototypes`); tests are for shipped code |
| Compute the expected value with the code's own logic | Assert against a hand-verified literal / the spec |
| Ship a test that can't fail against a broken build | Break the implementation on purpose; if it stays green, delete the test |
| Test a private helper or query the DB to verify | Test at the confirmed public seam, through the interface |
| Mock your own module, then assert the mock ran | Mock only true boundaries (API, clock, random); inject them in |
| Write all tests first, then all code | One vertical slice — one seam, one red test, one minimal pass — at a time |
| Unit-test a GSAP entrance's opacity/transform values | Screenshot it; measure with `verify-ui-quality`, values from `design-taste` |
| Fold refactoring into the red→green cycle | Refactor after green, as review (`review-shipped-code`) |
| Treat a green suite as proof the feature is right | Green proves behavior matches the test; correctness of intent is `craft-critique` |

## Boundaries

- **`build-coded-prototypes`** owns prototypes — which get **no** tests. This skill owns shipped code only; the guard above is the hard line.
- **`diagnose-bugs`** owns hunting an existing bug (reproduce → fix → regress). Its final regression test follows *this* skill's rules; new-feature work is this skill, bug-hunts are that one.
- **`review-shipped-code`** owns judging an already-written diff on Standards + Spec axes. This skill produces the tests + code; that one reviews the result. They pair: build here, review there.
- **`verify-ui-quality`** owns the mechanical rendered-UI measurement (screenshots, spacing, cross-device, performance) — the visual path's engine. This skill owns logic/state/data behavior tests. Neither issues verdicts.
- **`craft-critique`** owns judgment and the evidence-discipline verdict — including whether the behavior a green test locks in is the *right* behavior. A passing test is never that proof.
- **`name-and-control-bias`** supplies the confirmation-bias framing the tautology and seam gates rest on (awareness is not a control; a structural change is).
- **`design-taste`** owns every motion, spacing, and type value the visual path is checked against — never restated here, never asserted in a unit test.

## Sources

- Forked from **`tdd`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: red-before-green, one-slice-at-a-time, the seam concept + confirm-the-seam gate, the tautological / implementation-coupled / horizontal-slicing anti-patterns, tracer-bullet vertical slices, and mock-at-boundaries. Re-cast for React/Next/TypeScript + Vitest/Jest/Playwright; hard-scoped to shipped client code; the prototype guard and the visual-vs-logic mode switch are additions.
- **`design-taste`**, **`craft-critique`**, **`name-and-control-bias`**, **`verify-ui-quality`**, **`build-coded-prototypes`**, **`review-shipped-code`**, **`diagnose-bugs`** — referenced by name, never restated.
