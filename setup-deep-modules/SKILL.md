---
name: setup-deep-modules
description: "Wire dependency-cruiser to ENFORCE deep-module boundaries in one of Dinesh's React/Next/TypeScript apps — so the seams `codebase-design` designs can't erode into shallow cross-layer imports. Use when asked to 'enforce module boundaries', 'stop imports reaching into a feature's internals', 'add a boundary/architecture lint', 'set up dependency-cruiser', 'enforce layering', 'block deep imports past the public interface', or when agents/teammates keep bypassing a designed seam. Low-priority infra: reach for it only when a codebase is big enough (multi-feature, seams eroding) that discipline alone stops holding — NOT on prototypes or a small single-file app. The linter is a CONTROL, not a code-review reminder."
license: "MIT — forked from `setup-ts-deep-modules` in mattpocock/skills (© Matt Pocock). dependency-cruiser wiring, the entry-points-are-public / subfolders-are-private depth model, the four-rule `$1` back-reference pattern, and the prove-the-rules-bite completion criterion adopted; re-cast from monorepo packages to a single Next.js app's feature/layer boundaries, solo-first wiring, and the tie to `codebase-design`."
---

# Setup Deep Modules

Install the **automated boundary control** that keeps `codebase-design`'s deep modules deep. A designed seam holds only while everyone remembers to import through it; under deadline someone reaches past the entry point into an internal, the seam quietly rots, and the module goes shallow. This skill wires [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) so that reach-past is a hard `error`, not a review comment nobody left — a **control, not vigilance** (`name-and-control-bias`: awareness is not a control; a structural block is).

For the vocabulary — module, interface, depth, seam, entry point — load **`codebase-design`**; use its words throughout and don't restate them here. This skill enforces the shape that skill designs.

## When to use / when NOT to use

- **Use** on a real, growing Next/TS app Dinesh maintains — multi-feature, where an ARIA sub-agent (or a teammate) keeps importing a feature's internals instead of its public entry point, or where lower layers reach upward.
- **Low priority.** A guard, not a deadline task. Reach for it only when the codebase is *big enough that seams stop holding by discipline*. A two-component app doesn't need it; adding it there is ceremony. When unsure whether it's big enough, the honest answer is often "not yet — skip."
- **NOT on prototypes.** Throwaway code has no seams to protect — route to `build-coded-prototypes`; it gets no boundary lint.
- **NOT the design.** *Where* a seam goes and *how deep* a module is is `codebase-design`'s judgment. This skill only enforces a seam that already exists — it can't invent good boundaries, only hold the ones you drew.
- **NOT the diff review.** `review-shipped-code` flags a boundary violation by eye; this makes the same violation a mechanical `error` the review then defers to (floor here, ceiling there).

## Two modes — mode-switchable

Pick one; state which.

- **Scrappy (one guard rule, ~10 min):** the app is mostly fine but *one* seam keeps getting bypassed. Add just the `entrypoint-boundary-from-outside` rule scoped to that module, wire it into the local check, prove it bites. No full config, no example module.
- **Rigor (full boundary config, default when a codebase has genuinely grown):** install dependency-cruiser, the full entry-point + layering + no-cycle rule set, scaffold an example module, prove the rules bite, document + context-pointer.

**Recommended default:** rigor when the app is multi-feature *and* boundaries are already eroding; scrappy when you just need to nail one seam. When unsure it's even big enough → skip (low-priority guard).

## Intake gate — ask only the gaps

**Discover silently (don't ask):**
- Package manager — lockfile: `pnpm-lock.yaml` → pnpm · `yarn.lock` → yarn · `bun.lockb` → bun · else npm. Use it for every command.
- Modules root — the folder deep modules live in: `src/features` · `src/modules` · `src/packages` · else the app's dominant feature folder. Confirm only if genuinely ambiguous.
- Existing `.dependency-cruiser.*` config — if present, **merge** the rules in, never overwrite; tell Dinesh what you added.
- Is this a prototype? → out (see above).

**Ask Dinesh (decisions only) — each with a default:**
| Gap | Recommended default |
|---|---|
| Is this codebase big enough to enforce boundaries? | Only if multi-feature and seams are eroding; else skip |
| Scrappy one-rule or rigor full config? | Per the mode rule above |
| What are the layers, and which may import which? | Enforce the entry-point boundary + the one shipped layering rule; add only layering rules Dinesh names — don't invent a hierarchy |
| Where does `lint:boundaries` run? | **Solo default:** the local `check` script and/or the pre-commit gate (`setup-pre-commit`). Add GitHub Actions/CI **only if he already has one** — never assume a team pipeline |

One batched round. If every gap has a safe default, state them and proceed.

## The method (situational — run only what this repo needs)

1. **Size + prototype check.** Prototype, or not big enough to need enforced seams → stop. Otherwise continue.
2. **Detect** package manager, modules root, existing config (intake gate). Existing config → merge into it and skip to step 5.
3. **Install** `dependency-cruiser` as a devDependency with the detected manager.
4. **Write the config.** Copy [`dependency-cruiser.config.cjs`](./dependency-cruiser.config.cjs) to the repo root as `.dependency-cruiser.cjs`; set `MODULES_ROOT` to the folder from step 2. The rules are path-depth based and extension-agnostic — only `MODULES_ROOT` and the `LAYERING` block need your attention. **Scrappy mode:** keep only `entrypoint-boundary-from-outside` + `no-circular`; drop the rest.
5. **Wire the check (solo-first).** Add a `lint:boundaries` script → `depcruise <modules-root>`. Then fold it into the check Dinesh *already* runs: his `check`/`validate` script, and/or the `setup-pre-commit` hook. Only if he has a CI pipeline, add it there too. Don't scaffold GitHub Actions for a solo repo that has none.
6. **Scaffold an example module** (rigor only) — a committed copy-me `<modules-root>/example/`: `index.ts` (entry point that delegates to an internal, so it's visibly *deep*), `lib/impl.ts` (internal, in a subfolder), `tests/example.test.ts` (imports only `../index`). Tell Dinesh it's a template to copy or delete.
7. **Prove the rules bite** — the completion criterion (below). A config that doesn't fail on a violation is worthless.
8. **Document + context-pointer** (rigor). One `README.md` at the modules root: the `<name>/index.ts` + private-subfolders layout, "import only through a module's entry point," and how to run `lint:boundaries`. Then add a one-line pointer from `CLAUDE.md` (else `AGENTS.md`, create if neither): *"Features are deep modules — import only through their entry point; see src/features/README.md."* That pointer is what makes an agent discover the rule instead of tripping it.

**Prove-the-rules-bite (step 7, mandatory):**
1. Run `lint:boundaries` — it must **pass** clean.
2. Add a shallow cross-layer import (the worked example below) — run again, it must **fail** with the boundary rule.
3. Revert — run once more, it must **pass**.

**Done when:** you've observed pass → fail-on-violation → pass. If step 2 doesn't fail, the rules aren't wired; fix before finishing.

## Worked example — a rule that blocks a shallow cross-layer import

The target failure: a page component reaches **past** a feature's entry point into its internals, coupling the UI to a data-layer file it should never see. Reads like a normal import; silently makes `bookings` a shallow module (the seam `codebase-design` drew is now bypassed).

```ts
// src/app/salon/page.tsx  — the violation
import { runBookingsQuery } from "@/features/bookings/lib/queries" // ⛔ internal
const rows = await runBookingsQuery(salonId, range)               // UI now owns the query
```

`runBookingsQuery` lives in `features/bookings/lib/` — a subfolder, i.e. **private**. The public entry point `features/bookings/index.ts` exposes a `bookings` port (the deep interface). Run `lint:boundaries`:

```
  error entrypoint-boundary-from-outside: src/app/salon/page.tsx → src/features/bookings/lib/queries.ts
    App/page/shared code may import a module's entry points but nothing inside its subfolders.
```

The fix — go through the entry point, restoring the seam:

```ts
// src/app/salon/page.tsx  — passes
import { bookings } from "@/features/bookings"   // ✅ public entry point
const rows = await bookings.list(salonId, range) // internals hidden behind the port
```

`depcruise` is green again. **That is the failure this skill exists to catch:** not a missing seam, but a *designed* seam an import quietly reached past — the exact erosion no one leaves a review comment for. The linter caught it on commit instead of six months later when the query is duplicated across five screens. (Deepening the module itself — the `bookings` port — is `codebase-design`; this skill only enforces that nobody routes around it.)

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Install this on a prototype or a two-component app | Reach for it only when the codebase is big enough that seams erode; else `build-coded-prototypes` |
| Overwrite an existing `.dependency-cruiser.*` config | Detect first; merge the rules in and report what you added |
| Ship the config and rely on "remember to import through the entry point" | The linter *is* the control — no reliance on vigilance (`name-and-control-bias`) |
| Ship without proving a violation fails | Run pass → fail-on-shallow-import → pass; an un-tested config is decorative |
| Add a layering rule for a boundary nothing actually crosses | A rule no real import can violate is noise — enforce only live boundaries (`name-and-control-bias`) |
| Invent a layer hierarchy Dinesh didn't ask for | Enforce the entry-point boundary; add only layering rules he names |
| Scaffold GitHub Actions for a solo repo with no CI | Wire into his local `check`/pre-commit gate; add CI only when a pipeline already exists |
| Treat a green `depcruise` as a passed review | Judgment (a11y, taste, spec) stays human — `review-shipped-code` / `craft-critique`; a lint is only the floor |
| Expect the linter to make boundaries *good* | It only holds the seams `codebase-design` drew — a lint can't design depth |

## Boundaries

- **`codebase-design`** owns *designing* the deep modules and *where* the seams go (judgment); this skill *enforces* them mechanically so they don't erode. Design there, enforce here. It owns the vocabulary — load it; never restate module/interface/seam/depth here.
- **`setup-pre-commit`** owns the pre-commit *gate*; this skill produces the `lint:boundaries` check that gate can run. Complementary infra — the boundary lint is one line in the hook it installs.
- **`improve-code-architecture`** scans/ranks *where* boundaries are already being violated across the app (detect the rot); this installs the rule that *prevents new* violations. Detect there, prevent here — both share `codebase-design`'s depth model.
- **`review-shipped-code`** flags a boundary crossing by human eye; this makes the same crossing a mechanical `error` the review defers to. Floor here, ceiling there.
- **`build-coded-prototypes`** owns prototypes — explicitly out of scope; enforcing seams on throwaway code is ceremony.
- **`craft-critique`** owns verdict + the evidence protocol — any claim that enforcement made the code "more navigable" is cited or measured, not asserted; a green lint is never a verdict.
- **`design-taste`** owns the visual/motion register — a dependency linter enforces import structure only, never taste.

## Sources

- Forked from **`setup-ts-deep-modules`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Retained: the dependency-cruiser install/wiring, the entry-points-are-the-public-surface / any-subfolder-is-private depth model, the forbidden-rule set with `$1` group back-references (intra-module freedom + tests-through-entry-points), and the prove-the-rules-bite completion criterion + README/context-pointer discipline. Re-cast: from monorepo `src/packages/` to a single Next.js app's feature/layer boundaries (the shallow-cross-layer-import case), solo-first wiring (local `check`/pre-commit, CI only when a pipeline exists), the low-priority + prototype guard, mode-switch, intake gate, and the enforce-vs-design tie to `codebase-design`.
- **`codebase-design`** — the deep-module vocabulary and the `BookingsPort` example this enforces (Michael Feathers' *seam*, John Ousterhout's *deep module*, referenced there not restated).
- **`name-and-control-bias`** — the control-not-vigilance framing, and "a rule no real import can violate is noise."
