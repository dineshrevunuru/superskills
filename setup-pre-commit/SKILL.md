---
name: setup-pre-commit
description: "Set up a Husky pre-commit hygiene GATE — lint-staged + Prettier on staged files, plus optional typecheck and fast tests — in one of Dinesh's shipped React/Next/TypeScript repos. Use when asked to 'add pre-commit hooks', 'set up Husky', 'configure lint-staged', 'add a format/typecheck gate before commit', 'stop unformatted or broken code getting committed', or when a client repo needs a hygiene floor. Low-priority infra: reach for it only when a maintained/client repo needs the gate — NOT on prototypes. The hook is a CONTROL, not a reminder to run the linter."
license: "MIT — forked from `setup-pre-commit` in mattpocock/skills (© Matt Pocock). Steps and defaults adopted; mode gate, staged-only-speed discipline, and Dinesh's stack/config re-cast."
---

# Setup Pre-Commit

Install a **pre-commit gate** that formats staged files and (optionally) typechecks and tests *before* a commit lands — so unformatted or broken code can't reach the history. The gate is a **control**, not vigilance: it works whether or not anyone remembers to run the linter (`name-and-control-bias` — awareness is not a control; a structural change is). This is the automated *floor* under `review-shipped-code`'s human review — never a substitute for it.

*Forked from `setup-pre-commit` in mattpocock/skills (MIT, © Matt Pocock).*

## When to use / when NOT to use

- **Use** on a repo Dinesh will *maintain* — a client repo, a salon booking app, the portfolio — that has no working pre-commit protection, or a gate that's misconfigured (too slow, wrong scope).
- **Low priority.** This is a hygiene floor, not a deadline task. Reach for it only when a repo is real enough that a bad commit costs something. Do not volunteer it mid-feature.
- **NOT on prototypes.** A throwaway HTML file or a Wizard-of-Oz demo has no hygiene bar to enforce — hardcoded values and a stray `console.log` are correct there. Route prototypes to `build-coded-prototypes`; they get no gate.
- **NOT the review itself.** A green gate is not a passed review — judgment (a11y, tokens, taste, spec fidelity) lives in `review-shipped-code` / `craft-critique`, which *defer* to tooling for exactly the mechanical layer this skill installs.

## Two modes — mode-switchable

Pick one; state which. Both keep the gate **staged-files-only fast** — that is the whole design.

- **Minimal (format-only):** `.husky/pre-commit` runs `npx lint-staged` and nothing else — Prettier (and ESLint `--fix` if the repo uses it) on *staged files only*. Sub-second on a normal commit. Use for a solo repo, the portfolio, or any repo with no meaningful test suite.
- **Full (format + typecheck + test):** minimal **plus** `typecheck` and a *fast, staged-scoped* test run. Use for a client production repo where a type error or a broken unit reaching `main` costs client trust.

**Recommended default:** **full** for a client/production repo that already has `typecheck` and `test` scripts; **minimal** otherwise. When a repo has no test suite, do not fabricate one to reach full — minimal is the honest gate.

## Intake gate — ask only the gaps

**Discover silently (don't ask):**
- Package manager — lockfile: `package-lock.json` (npm) · `pnpm-lock.yaml` (pnpm) · `yarn.lock` (yarn) · `bun.lockb` (bun). Default npm if none.
- Existing Prettier config (`.prettierrc*`, `prettier.config.*`, or a `prettier` key in package.json) — if present, **leave it**.
- Existing `typecheck` and `test` scripts in package.json — their presence decides whether full mode is even possible.
- Existing ESLint config (`.eslintrc*`, `eslint.config.*`) — if present, add `eslint --fix` to the staged JS/TS glob.
- An existing `.husky/` dir with a working hook — if so, **audit and adjust**, don't reinstall from scratch.
- Is this a prototype? → out (see above).

**Ask Dinesh (decisions only) — each with a default:**
| Gap | Recommended default |
|---|---|
| Minimal or full mode | Full if `typecheck` + `test` scripts exist and it's client-facing; else minimal |
| Is this repo worth a gate at all | Yes if maintained/client-facing; skip for throwaway |
| Move slow suites out of the hook? | Yes — Playwright e2e and full test runs go to pre-push or CI, never pre-commit |

One batched round. If every gap has a safe default, state them and proceed.

## The method (situational — stop when the gate fits)

1. **Prototype check.** Prototype → stop; route to `build-coded-prototypes`.
2. **Detect** the package manager and existing config (intake gate above). If `.husky/` already holds a working hook, skip to step 6 and *tune* rather than reinstall.
3. **Install** as devDependencies: `husky lint-staged prettier` (swap in the detected manager).
4. **Init Husky:** `npx husky init` — creates `.husky/` and adds `"prepare": "husky"` to package.json.
5. **Write `.husky/pre-commit`** (no shebang for Husky v9+):
   - Minimal: just `npx lint-staged`.
   - Full: add the lines you *actually have scripts for* — omit any missing one and tell Dinesh:
     ```
     npx lint-staged
     npm run typecheck
     npm run test
     ```
     Keep `test` **fast and staged-scoped** — a single non-watch run of the units affected by the change (e.g. `vitest related --run` / `jest --onlyChanged`), never the whole suite, never Playwright. A gate that takes 30s gets bypassed with `--no-verify`, and a bypassed gate is dead.
6. **Write `.lintstagedrc`:**
   - Minimal (source default): `{ "*": "prettier --ignore-unknown --write" }`
   - Full, ESLint-aware:
     ```json
     {
       "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
       "*.{json,css,md,mdx}": "prettier --write"
     }
     ```
7. **Write `.prettierrc` ONLY if none exists.** His shipped repos usually already have one — detect first, never overwrite. If genuinely missing, use the source defaults: `useTabs:false`, `tabWidth:2`, `printWidth:80`, `singleQuote:false`, `trailingComma:"es5"`, `semi:true`, `arrowParens:"always"`.
8. **Verify + smoke-test:** `.husky/pre-commit` exists · `prepare` script is `"husky"` · lint-staged config present · Prettier config resolves · run `npx lint-staged` once by hand. Then stage everything and commit `Add pre-commit hooks (husky + lint-staged + prettier)` — the commit runs the new hook, which is the real smoke test.

## What belongs where (speed is the constraint)

| Check | Pre-commit | Pre-push / CI |
|---|---|---|
| Prettier / ESLint on **staged** files | ✅ (lint-staged) | — |
| `tsc --noEmit` typecheck | ✅ full mode (fast) | ✅ |
| **Fast** unit tests, staged-scoped | ✅ full mode | ✅ full suite |
| Playwright e2e / full test suite | ❌ too slow → bypassed | ✅ |
| Format the **whole repo** | ❌ | one-off script |

## Worked example — a repo with no protection gets the fast gate

**Repo:** a client Next/TS app, no Husky, unformatted diffs and the occasional type error slipping to `main`. The naive fix (and the trap):

```
# .husky/pre-commit  — the SLOW version that dies
npx prettier --write .      # reformats the ENTIRE repo every commit
npm run typecheck
npx vitest run              # whole suite
npx playwright test         # e2e — tens of seconds
```

This "works" for a week. Then commits start taking 40s, someone reaches for `git commit --no-verify` under deadline, the habit spreads, and the gate is decorative — worse than none, because it advertises protection that isn't running.

**The staged-files-only gate (full mode):**

```
# .husky/pre-commit
npx lint-staged             # Prettier + eslint --fix on STAGED files only — sub-second
npm run typecheck           # fast incremental tsc --noEmit
npx vitest related --run    # only units touching the staged changes
```

```json
// .lintstagedrc
{
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md,mdx}": "prettier --write"
}
```

Playwright and the full `vitest run` move to CI. Result: a commit that touches three files pays for three files — a gate fast enough that `--no-verify` never gets typed, which is the only kind of gate that survives. **That is the failure this skill exists to catch:** not "no gate," but a gate so slow it trains everyone to skip it.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Format the whole repo / run the full suite / run Playwright in pre-commit | Keep it staged-files-only + fast typecheck; move slow suites to pre-push/CI |
| Add `npm run test`/`typecheck` when no such script exists | Omit the line, tell Dinesh, ship minimal mode |
| Overwrite an existing `.prettierrc` with the defaults | Detect config first; leave the repo's own rules alone |
| Reinstall over a working `.husky/` hook | Audit and tune the existing hook |
| Install the gate on a prototype | Skip it — prototypes go to `build-coded-prototypes` |
| Treat a green pre-commit as a passed review | Route judgment to `review-shipped-code` / `craft-critique`; the gate is only the floor |
| Ship the gate and "remember to format" as the backup | The hook *is* the control — no reliance on vigilance (`name-and-control-bias`) |
| Assume Prettier enforces the design register | A formatter enforces mechanical style only; taste stays human (`design-taste`) |

## Boundaries

- **`review-shipped-code`** owns the human, two-axis source review; this skill installs the mechanical tooling that review *defers to* ("skip what tooling already enforces"). The gate is the floor, the review is the ceiling — run both on client code.
- **`craft-critique`** owns judgment and verdict language; a passing hook is never a verdict.
- **`design-taste`** owns the visual/motion register — a formatter cannot enforce it; never conflate "formatted" with "on-register."
- **`test-shipped-code`** owns *writing* the tests full mode runs (red-green, Vitest/Jest/Playwright); this skill only *executes* the fast staged-scoped subset in the hook — it never authors coverage.
- **`build-coded-prototypes`** owns prototypes — explicitly out of scope here.
- **`diagnose-bugs`** is the sibling SHIP skill for when a bug slips *past* the gate; unrelated flow, same wing.

## Sources

- Forked from **`setup-pre-commit`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Retained: package-manager detection, `npx husky init`, the lint-staged/Prettier config, the Prettier defaults, and the commit-as-smoke-test. Re-cast: the minimal/full mode gate, the staged-files-only speed discipline (the pre-commit-vs-CI split), the ESLint-aware lint-staged config, and the prototype guard for Dinesh's React/Next/TS + Vitest/Jest/Playwright stack.
- **`name-and-control-bias`** — the "a hook is a control, not vigilance" framing (awareness is not a control).
