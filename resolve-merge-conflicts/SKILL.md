---
name: resolve-merge-conflicts
description: "Resolve an in-progress git merge or rebase conflict SAFELY — understand BOTH sides' intent before you resolve, never blind-accept `--theirs`/`--ours`. Use when 'merge conflict', 'rebase conflict', 'CONFLICT (content)', 'fix the conflicts', 'resolve the conflicts', 'accept incoming vs current', git halts mid-merge/mid-rebase, or `<<<<<<<` markers appear in a React/Next/TS file. Mode-switches: regenerate for lockfiles/generated files, formatter-decides for whitespace clashes, trace-both-intents for hand-written logic. Solo by default — traces intent from git history/blame when there's no PR or tracker. NOT for judging whether the merged code is correct (`diagnose-bugs`) or blocking dangerous git (`git-guardrails`)."
license: "MIT — forked from `resolving-merge-conflicts` in mattpocock/skills (© Matt Pocock), 'Skills For Real Engineers.' The see-state → find-source → resolve-each-hunk → run-checks → finish sequence and 'always resolve; never invent behaviour' are adopted; the never-blind-accept law, solo intent-tracing, conflict-class menu, and the rebase `--ours`/`--theirs` inversion trap are added."
---

# Resolve Merge Conflicts — Read Both Intents Before You Resolve

Part of the **infra / dev-hygiene family** (the git-safety siblings of `git-guardrails`), aimed at production React/Next/TS trees. Every conflict is two real intents someone committed. Dropping one to clear the marker fast is how a real fix silently vanishes. The whole skill is one refusal: **no resolution without reading both intents.**

## When to use / when NOT to use

- **Use** mid-`merge` or mid-`rebase` (also `cherry-pick`/`stash pop`) when git has stopped on `CONFLICT` and left `<<<<<<<` markers in a React/Next/TypeScript tree.
- **NOT** for judging whether the *merged* code is correct or bug-free — this skill only reconciles two intents into one tree. If the merge introduces a behaviour bug, hand off to **`diagnose-bugs`**.
- **NOT** for blocking a destructive git command — that's **`git-guardrails`**, the safety net this skill leans on (below).

## The one law

**Never blind-accept a side to clear a conflict.** `git checkout --theirs <file>` / `--ours <file>` / "accept incoming" as a *first move* is banned — it drops the other side's intent unseen. This is a `name-and-control-bias` **control**, not awareness: "be careful merging" fails the one time it matters; "read both intents before touching a hunk" is the mechanism that doesn't. `--theirs`/`--ours` are a *last* resort on a hunk you have already understood — never the opening move.

Each side's intent is a **claim about why someone changed the code** — it obeys `craft-critique`'s evidence discipline. Cite it (commit message, PR, `blame`); do not synthesize "this side just reformats" from a plausible read of the diff. The blind-accept bug hides in exactly the hunk you *assumed* you understood.

## Two paths — mode-switchable

- **Scrappy (recommended default for a small, self-explanatory conflict):** the conflict is generated/lockfile/whitespace, or a one-hunk clash where *both intents are fully visible in the hunk itself*. Resolve per the class menu, run the checks, done.
- **Rigor (default the moment logic is hand-written, hunks are more than a couple, or you can't tell from the hunk alone *why* each side changed):** trace each side to its source before resolving. A merge in `usePrice.ts` is rigor; a `package-lock.json` clash is scrappy.

**Default:** scrappy for generated/trivial; rigor for hand-written logic. When you can't name why a side changed, you're in rigor.

## Intake gate — ask only the gaps

Discover silently (do not ask): merge vs rebase (read `git status` — the `--ours`/`--theirs` labels **invert** on rebase, see red flags); whether it's solo (assume yes — no tracker); the project's check commands (read `package.json` scripts). Then ask Dinesh, each with a default:

- **What's the merge's goal** — which branch's direction wins if two intents *truly* collide? *(Recommend: infer from the branch names + why you started the merge; only surface this if a real incompatibility forces a pick.)*
- **Is there a PR/issue carrying the other side's intent, or is this solo?** *(Recommend: assume solo — trace intent from `git log`/`blame`; reach for a PR/tracker only if one actually exists. Never assume an enterprise pipeline.)*

## Pick the resolution per hunk (situational — the conflict class chooses the move)

| Conflict class | The move (not a coin-flip) |
|---|---|
| **Lockfile / generated** (`package-lock`, `pnpm-lock`, build output, test snapshots) | Don't hand-merge. Take either, then **regenerate from the resolved source** — reinstall / rebuild / re-snapshot. |
| **Formatting / import-order / whitespace only** | Take either side, then **let the formatter decide** — Prettier/ESLint is the tiebreaker, not you. |
| **Two independent edits in one region** (both real, non-overlapping) | **Union them — keep BOTH.** This is the exact hunk where blind `--theirs` drops a fix. |
| **Genuinely incompatible** (both changed the same logic differently) | Pick the side matching the **merge's goal**; note the trade-off. Never invent a third behaviour neither side wrote. |
| **Visual / styling hunk** (Tailwind classes, layout, motion) | "Correct" = the side matching the token/taste spec, **not** the newer commit. Load `design-taste`; never coin-flip styling. |

## The method (rigor path)

1. **See the state.** `git status`, `git log --oneline --merge`, and `git diff` the conflicted files. Confirm **merge vs rebase** — it changes what `--ours`/`--theirs` mean.
2. **Trace both intents to source.** For each hunk, find *why* each side changed. Solo reality (no tracker): `git log -p --follow <file>`, `git blame` the conflicting lines, and the branch's reason-for-existing. Only escalate to a PR/issue if you actually have one. Intent is a claim — cite the commit, don't guess it (`craft-critique`).
3. **Resolve each hunk** per the class menu. Preserve both intents where compatible; where incompatible, pick per the merge goal + record the trade-off. Then **grep the tree for `<<<<<<<`, `=======`, `>>>>>>>`** — zero markers may survive.
4. **Run the project's checks:** typecheck → tests → format/lint. Fix anything the merge broke. Resolved = **green**, not marker-free.
5. **Finish + commit.** Stage everything and commit (merge) or `git rebase --continue` (rebase) until all commits are replayed. Never force-push a rebased branch over shared history (`git-guardrails` Band B). Never `--abort` at the first hard hunk — the tree is recoverable, resolve in place.

## Worked example — blind `--theirs` would drop a prod fix (rebase, inverted labels)

**Setup (Next/TS):** rebasing `feat/checkout-copy` onto `main`. Conflict in `src/hooks/usePrice.ts`.
- **`main` side (HEAD):** last week's prod fix — `cents / 100` became `cents == null ? 0 : cents / 100` to stop a `NaN` crash when `cents` is undefined. Commit: `fix: guard NaN in usePrice`.
- **feature side (being replayed):** the same function, reformatted with a currency-symbol tweak — branched *before* the fix landed, so it still divides the old way.

**The blind move:** the agent runs `git checkout --theirs src/hooks/usePrice.ts` — "take my branch's version." During a **rebase**, `--theirs` is the commit being *replayed* = the feature branch. It silently reverts the `NaN` guard. Markers gone, file compiles, looks clean — and the prod crash is back. This is the failure the skill exists to catch.

**The discipline catches it.** Step 2 traces both intents: `git log -p main -- src/hooks/usePrice.ts` shows HEAD's hunk *is* the crash fix; the feature commit shows its intent was only the currency symbol + formatting — it never meant to touch the divide. So the two intents are **compatible, not competing** → class = "two independent edits" → **union them:** keep `main`'s `NaN` guard AND the feature's currency symbol. Blind `--theirs` would have dropped a real fix; reading both sides kept both.

**Proof (step 4):** typecheck + the regression test `main` shipped for the `undefined cents` case → green. Confirm it would go red without the guard. Stage, `git rebase --continue`. Root cause of "which side wins" was *evidenced from the commits*, not asserted from the diff.

## Anti-patterns / red flags

- **Blind-accept as the opening move.** `--theirs`/`--ours`/"accept incoming" before you've read what the other side did. The cardinal sin.
- **The rebase inversion.** Assuming "theirs = the other branch." During a **rebase** it's flipped — `--ours` is the branch you're rebasing *onto* (upstream), `--theirs` is *your* commits being replayed. Check `git status` first, every time.
- **Recency = correctness.** Picking the newer or larger hunk because it's newer or larger. Neither is evidence of intent.
- **Hand-merging a lockfile.** Editing `package-lock.json` by hand instead of regenerating it from the resolved `package.json`.
- **Markers-gone = done.** Declaring resolved without running typecheck/tests. A clean-looking merge that fails typecheck is not resolved.
- **Inventing a third behaviour** that neither side wrote, to "reconcile" them.
- **`--abort` at the first hard hunk.** Giving up instead of the guarded, recoverable in-place resolve.

## Don't / Do

| Don't | Do |
|---|---|
| Blind-accept a side (`checkout --theirs`) to clear the marker | Read both intents first; `--theirs` only after you know what it drops |
| Assume theirs = the other branch during a rebase | Confirm merge vs rebase in `git status`; the labels invert on rebase |
| Hand-merge `package-lock` / generated files / snapshots | Regenerate from the resolved source (reinstall / rebuild / re-snapshot) |
| Pick the newer or larger hunk as "correct" | Pick by intent + the merge's goal; recency isn't correctness |
| Invent a third behaviour neither side wrote | Preserve an existing intent; note the trade-off if you must choose |
| Call it resolved when the markers are gone | Resolved = typecheck + tests + format green |
| Synthesize intent from a plausible read of the diff | Cite it — commit message, PR, `git blame` (`craft-critique`) |
| `--abort` at the first hard hunk | Resolve in place; `git-guardrails` keeps the tree recoverable |

## Boundaries

- **`git-guardrails`** — the safety net *under* this skill: it blocks the `reset --hard`/`checkout .` an agent grabs when a resolution gets messy, and the force-push over a rebased branch (Band B). That guard is *why* you resolve in place instead of `--abort`ing. Sibling in the infra / dev-hygiene family.
- **`diagnose-bugs`** / **`review-shipped-code`** — judge whether the *resolved* code is correct/bug-free; this skill only reconciles two intents into one tree. A behaviour bug the merge introduces is theirs to hunt.
- **`craft-critique`** — owns the evidence discipline: "this side intended X" is a claim → cite the commit/PR, never synthesize it from the diff.
- **`name-and-control-bias`** — "read both intents" is the *control*; "be careful merging" is mere awareness. Fixating on the first side you read is anchoring; the read-both rule is the control against it.
- **`design-taste`** — when a hunk lands in a visual surface, "correct" is the side matching the token/taste spec, not the newer commit. Load it; never restate its values.
- **Registration (maintenance law):** add a row to **SKILL-MAP.md** (family: Infra / dev-hygiene, Pocock Wave 4) and an entry to the **`ask-dinesh`** router when this lands, so the roster doesn't lie.

## Sources

- Forked from **`resolving-merge-conflicts`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: the see-state → find-primary-source → resolve-each-hunk (preserve both intents) → run-checks → finish sequence, and "always resolve; never invent new behaviour." Personalized for Dinesh: the never-blind-accept law re-cast as a `name-and-control-bias` control, mode-switched (scrappy for generated/trivial, rigor for hand-written logic), the conflict-class menu, **solo-reality intent-tracing** (`git log`/`blame` when there is no PR or tracker — mode-switches up to a PR only when one exists), the rebase `--ours`/`--theirs` inversion trap, and wiring to `git-guardrails` + Next/React/TS checks.
