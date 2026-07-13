---
name: scaffold-practice-project
description: "Scaffold a small buildable practice project — a green-running baseline with one deliberate gap — to learn a concept by BUILDING it, not reading about it. Use when Dinesh says 'let me build a tiny thing to learn X', 'scaffold a practice repo/sandbox', 'set up a project to try Y', 'I learn this by making it', 'give me a failing test to implement', 'stub out an exercise for this pattern', or when a teach-me lesson needs its build-to-learn artifact stood up. Generalizes course-exercise scaffolding (problem/solution/reference split, one-command run, a red baseline you turn green) to any solo React/Next/TypeScript practice repo — defaults to a single throwaway file and mode-switches up to a minimal framework repo only when the framework IS the concept."
license: "MIT — forked from `scaffold-exercises` in mattpocock/skills (© Matt Pocock). The scaffold-to-a-passing-baseline method and the problem/solution/explainer split are generalized; the course CLI linter, section/exercise numbering, and ai-hero repo assumptions are dropped in favor of a solo local scaffold."
---

# Scaffold Practice Project — Green Baseline + One Deliberate Gap

Scaffold **the gap, not the answer**: stand up the smallest thing that runs green, then cut one deliberate hole — a red test or a `// TODO` — that only *building* can fill. Learning by making, not by reading a finished example.

## When to use / when NOT to use

- **Use** when standing up a tiny buildable sandbox to learn a pattern by making it; converting "I want to understand X" into a failing test to implement; stubbing a practice exercise (for yourself, or a set for the 100x cohort); or standing up the `builds/NNNN` artifact a **`teach-me`** lesson calls for.
- **NOT `teach-me`** — that owns the multi-session pedagogy (mission / glossary / zone-of-proximal-development / learning-records). This skill just stands up ONE practice scaffold, which `teach-me` *calls into*. If the goal is progress that persists across weeks, route there; this is the scaffold it uses.
- **NOT `build-coded-prototypes`** — that owns throwaway artifacts that answer a *design* question and then hit a disposition ritual. A practice scaffold answers "can I build this pattern from scratch?", not "which design is right?"
- **NOT `research-technical-docs`** — that owns reading docs to *ship a task*. Here the reading is only the cited minimum a gap needs; the point is the build.

## Two paths — mode-switchable

- **Scrappy (single throwaway file):** the concept survives outside a framework — a reducer, a hook's logic, a parser, an algorithm, a type-level puzzle. One `x.ts` + a failing `x.test.ts`, run with `tsx` / Vitest. Stands up in minutes.
- **Rigor (minimal framework repo):** the framework *is* the concept — RSC, a real route/loader, hydration, a component tree, a browser API. A minimal Vite or Next scaffold, one `pnpm dev` / `pnpm test`, and the gap/sealed-solution/reference split as folders.

**Recommended default:** scrappy single file whenever the pattern survives outside the framework; rigor only when removing the framework removes the concept. When unsure, scrappy — a passing single file graduates into a repo later; an unused repo never shrinks back.

## Intake gate — ask only the gaps

**Discover silently (do not ask):**
- The concept and its smallest observable **success move** — infer from context.
- Stack = React / Next / TypeScript unless he says otherwise.
- Whether you're already inside a `teach-me` workspace — scan cwd for `MISSION.md` / `builds/` / `learning-records/`. If so, this scaffold lands as the next `builds/NNNN` and you skip re-interviewing.
- Whether the gap renders UI (→ load **`design-taste`** before the baseline).

**Ask Dinesh (each with a default):**
- **The one success move** — "after this, from a blank file, you can ___." *(Default: infer the smallest capability, confirm in one line.)*
- **Scrappy file or minimal repo** *(Default per the mode rule.)*
- **Standalone throwaway, or a kept artifact in a teach-me workspace** *(Default: standalone local, unless a workspace is already here.)*

One batched round; proceed on the defaults. If every gap has a safe default, state them and build.

## The scaffold parts (situational menu — one default, not a march)

Include each only when it earns its place. "Process is dead": a scrappy scaffold may be two files.

| Part | What it is | Include when… |
|---|---|---|
| **Green baseline** | skeleton that compiles/runs/tests green, the interesting part *absent* | always — the floor that makes a later red mean *your gap*, not a broken setup |
| **The gap** | one red spec or `// TODO` with a checkable done-condition | always — this IS the skill; a scaffold with no gap is a tutorial |
| **Sealed solution** | reference impl kept out of sight (a `solution` branch / folder) | when there's a right answer to check against; skip for open exploration |
| **Minimum-knowledge ref** | a tiny cited cheat-sheet, only what the gap needs | jargon- or API-heavy concept; skip for a plain-logic gap |
| **One-command run** | `pnpm test` / `pnpm dev` / `tsx`, wired into the existing runner | always |
| **Structured section/exercise tree** | Pocock's `XX-section/` + `XX.YY-exercise/` split (renumber with `git mv` to keep history) | ONLY when authoring a *set for others* (cohort/course) — never for solo practice |

## The method (scaffold, then hand the gap over)

1. **Write the success move.** One line at the top of the README / file: "After this, from a blank file, I can ___." Same discipline as `build-coded-prototypes`' Step 0. If you can't write it, you don't have a concept yet — narrow it.
2. **Pick the vehicle** per the mode rule. The framework-is-the-concept test decides scrappy vs rigor.
3. **Stand up the green baseline.** Skeleton runs/tests green with the concept *missing*. One command in the project's existing runner — add no new package manager or runtime just to practice. This is Pocock's "lint passes," generalized: the floor is *it runs green*.
4. **Cut ONE deliberate gap.** Stub exactly the piece the concept lives in — an empty function body, a `// TODO`, a failing spec that names the transitions — and nothing else. The done-condition is checkable (a spec goes green, an assertion holds), never "looks right." One concept, one gap; a second concept is a second scaffold.
5. **Seal the solution.** Write the reference impl, then put it out of sight — a `solution` git branch, a `solution/` folder you don't open. Peek only after an honest from-the-stub attempt. Reading the answer and feeling you get it is the confirmation trap **`name-and-control-bias`** names — the control is filling the gap from the stub, not recognizing the solution.
6. **Ground only what the gap needs, cited.** If the concept has API surface or jargon, add a small cheat-sheet with the *minimum* from a primary source — claims about how the API behaves follow **`craft-critique`**'s evidence discipline (cite / get / flag). A scaffold that ships a full tutorial to read has become the thing it exists to replace.
7. **Hand the gap over; close the loop tight.** He fills the stub; red→green (or the TODO's assertion) is the automatic feedback — better than a verdict from you. If the gap renders UI, load **`design-taste`** first; if it doesn't, that step does not apply — skip it, don't perform it.
8. **Disposition.** *Kept* (a `teach-me` `builds/NNNN` build-to-learn artifact — kept, not deleted; a separate `learning-record` follows only once the concept is rebuilt from a blank file) or *folded-and-discarded* (standalone: the learned pattern lands in real work, the scaffold goes). `teach-me` owns the kept case; `build-coded-prototypes` owns the discard ritual.

## Worked example — scaffolding a repo to learn `useReducer` by building it

**Ask:** "I keep reaching for `useReducer` and copying examples. I want to actually own it — set me up a practice project."

1. **Success move:** "From a blank file, write and drive a typed reducer for a small fetch machine (`idle → loading → success | error`), without looking it up." Not "understand useReducer" — an observable capability.
2. **Vehicle:** a reducer is a pure `(state, action) => state` — it survives entirely outside React. Framework is *not* the concept → **scrappy single file.** First failure this catches: reaching for `create-next-app` to practice a pure function — a whole repo is over-scaffolding, and every extra file is a place for the *setup*, not the concept, to break.
3. **Green baseline:** `fetchMachine.ts` exporting `type State`, `type Action`, and a `reducer` that returns `state` unchanged; `fetchMachine.test.ts` with the transition specs; `pnpm vitest` runs — and every spec is **red**. Green floor = it *runs*; red = the gap, by design.
4. **The gap:** the `reducer` body is a single `return state`. The failing specs name every transition (`loading` on `FETCH`; `success` + data on `RESOLVE`; `error` on `REJECT`; ignore `RESOLVE` while `idle`). Done-condition is exact: all specs green. One gap — no `useReducer`-in-a-component yet; that's a *second* scaffold once the pure reducer is owned.
5. **Seal the solution — the big failure this catches:** the naive "practice project" is the finished reducer with tidy comments explaining each case. He'd read it, nod, and still copy the next one — fluency, not storage strength. Here the working reducer lives on a `solution` branch he doesn't check out until he's tried; the sealed gap forces retrieval + construction. Recognizing the answer is exactly the trap `name-and-control-bias` flags.
6. **Ground it:** a 6-line `reducer-cheatsheet.md` — only the discriminated-union action shape and the exhaustive-`switch` rule, from the React + TS handbook docs (cited per `craft-critique`), not a blog tour.
7. **Hand over:** he fills the body until `pnpm vitest` is green. No UI here, so the `design-taste` step **does not apply** — stated and skipped.
8. **Disposition:** standalone, so once green he folds the pattern into the real component that needed it and deletes the scaffold — the *decision* lands in `main`, the practice repo doesn't. Had this been a `teach-me` lesson, `builds/NNNN-fetch-reducer/` would be *kept* (not deleted) as the build-to-learn artifact instead — a `learning-record` follows only once he rebuilds the reducer from a blank file.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Scaffold the finished example with explanatory comments | Ship a green baseline with one sealed gap you fill from a stub |
| `create-next-app` to practice a pure function | Scrappy single file whenever the pattern survives outside the framework |
| Leave the gap's done-condition as "looks right" | A failing spec or TODO with a checkable, exact done-condition |
| Cut three gaps into one scaffold | One concept, one gap; a second concept is a second scaffold |
| Keep the solution open in the next tab | Seal it (branch/folder); peek only after an honest attempt (`name-and-control-bias`) |
| Read the solution and call it learned | Fill the gap from the stub — retrieval + construction, not recognition |
| Ship a full tutorial README to read | The minimum knowledge the gap needs, cited per `craft-critique` |
| Wire a numbered section/exercise tree for solo practice | Local single scaffold; the course tree is only for authoring a set for others |
| Add a new package manager or runtime for the sandbox | Reuse the project's runner; one command to run |
| Render a practice UI in the generic look | Load `design-taste` first — it's still his work |

## Output format

When asked to *plan* a scaffold before building it, emit this and get a nod first:

```
SCAFFOLD PLAN — [concept]
Success move:  [from a blank file, I can ___]
Vehicle:       [single file / minimal repo — and why (framework is / isn't the concept)]
The gap:       [the one stubbed piece + its checkable done-condition: spec green / assertion holds]
Sealed as:     [solution branch or folder — or "open exploration, no sealed solution"]
Grounding:     [the primary source the cheat-sheet cites — or "plain logic, none needed"]
Run:           [the one command]
Disposition:   [kept as a teach-me build / folded-and-discarded]
```

When building, the deliverable is the running green baseline with its one sealed gap — never the filled-in answer.

## Boundaries

- **`teach-me`** owns multi-session learning pedagogy (mission / glossary / ZPD / learning-records) and *calls* this skill to stand up each build-to-learn artifact; this skill owns standing up ONE practice scaffold.
- **`build-coded-prototypes`** owns throwaway artifacts that answer a *design* question plus the disposition ritual; this skill owns a kept-or-folded *learning* scaffold that answers "can I build this pattern?".
- **`research-technical-docs`** owns docs research done to ship; this skill's reading is only the cited minimum a gap needs.
- **`design-taste`** owns every taste value a rendered practice screen honors; **`craft-critique`** owns the evidence discipline behind the cited cheat-sheet; **`name-and-control-bias`** owns the confirmation control behind sealing the solution. Reference, never restate.
- **Maintenance law:** a new skill earns a row in **SKILL-MAP.md** and a route in **`ask-dinesh`** — do both in the pass that ships this, or the index and router lie.

## Sources

- Forked from **`scaffold-exercises`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: scaffold-to-a-passing-baseline (his lint-green floor → generalized "runs green"), the problem/solution/explainer split (→ the gap / sealed solution / cited cheat-sheet), the one-command run, and `git mv` for renames. Generalized/dropped: the course CLI linter (`ai-hero-cli internal lint`), the `XX-section` / `XX.YY` numbering, and the ai-hero course-repo assumptions — replaced by a solo local scaffold that mode-switches up to a structured exercise tree only when authoring a set for the cohort. The source rubric would strip the Don't/Do table; this library keeps it, each ban paired with its Do.
- **Build-to-learn / research-through-making** is the shared instinct with `teach-me` (named there); the learning-science grounding (storage vs fluency strength — Bjork) lives in `teach-me`, referenced not restated.
