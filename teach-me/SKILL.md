---
name: teach-me
description: "Teach Dinesh a concept over multiple sessions, using the current directory as a stateful teaching workspace — mission, glossary, resources, learning-records, and build-to-learn artifacts that persist progress between sessions. A personal-growth tool (100x Engineers cohort, self-upskilling), never client work. Use when he says 'teach me X', 'help me learn Y', 'get me up to speed on', 'I want to understand Z so it sticks', 'explain RSC / streaming / tool-calling / GSAP timelines', or resumes a topic started earlier. Grounds every lesson in a small buildable artifact — research-through-making — and tracks the zone of proximal development so each session challenges just enough."
license: "MIT — forked from `teach` in mattpocock/skills (© Matt Pocock). Workspace model and learning-science vocabulary (storage vs fluency strength, zone of proximal development, desirable difficulty) adopted; primary unit swapped from Tufte HTML lessons to build-to-learn artifacts, and the resources/stack retargeted to Dinesh's React/Next/AI-eng world."
---

# Teach Me — Build-to-Learn Across Sessions

The leading word is **build-to-learn**: Dinesh learns by making the smallest thing that exercises the skill, not by reading a beautiful explainer. This skill runs a **stateful teaching workspace** — the current directory *is* the memory — so a topic opened today resumes cleanly weeks later at the right difficulty. It exists to make knowledge **stick** (storage strength), not just feel familiar in the moment (fluency).

This is a **personal-growth tool**, not a delivery pipeline. It serves his 100x Engineers cohort (Module 2) and self-upskilling. Its output is *his* learning, captured in files — never a client deliverable.

## When to use / when NOT to use

- **Use** when Dinesh wants to *learn a concept over time* and have progress persist: "teach me React Server Components," "help me actually understand the tool-calling loop," resuming a topic from a prior session.
- **NOT** for one-shot doc lookups in service of a build task — that's **`research-technical-docs`** (primary-source docs/API research, cite-every-claim, no stateful workspace). If he needs the answer *now to ship something*, not to *own the concept*, route there.
- **NOT** for building to answer a *design* question and then discarding it — that's **`build-coded-prototypes`** (throwaway prototype with a disposition ritual). Build-to-learn artifacts are *kept* as learning records; prototypes get deleted once they've answered.
- **NOT** for reviewing/shipping client code — **`review-shipped-code`** and **`build-frontend-interfaces`** own that. A teach-me artifact is deliberately small, honest, and for his eyes.

## Two paths — mode-switchable

- **Scrappy ("just teach me this now"):** a single concept he won't necessarily return to. Skip the workspace scaffolding. Ground it in one primary source, have him build the smallest artifact that proves the skill, give feedback, done. Write files only if he says "let's keep going with this."
- **Rigor (the stateful workspace):** a topic he'll return to across sessions (cohort material, a skill he's deliberately building). Full workspace: mission-grounded, glossary-governed, learning-records tracking the zone of proximal development.

**Recommended default:** rigor whenever the topic maps to the cohort or a deliberate upskilling goal; scrappy for a passing "wait, how does X work?" When unsure, ask which — one question, with a default (below).

## Intake gate — ask only the gaps

Before teaching anything, you need the **mission** (why he wants this) and his **prior knowledge** (where the zone of proximal development starts). Discover what you can; ask only the rest, each with a recommended default.

**Discover silently (do not ask):**
- Scan the current directory: is there a `MISSION.md`, `learning-records/`, `GLOSSARY.md`? If so, this is a *resume* — read them first and pick up at the frontier, don't re-interview.
- The topic's nomenclature and whether it warrants a glossary (heavy-jargon stacks like RSC/hydration/streaming/`tool_choice` almost always do).
- Candidate primary sources for `RESOURCES.md` (official docs first — see the resources rule).

**Ask Dinesh (each with a default):**
- **The mission's *why*** — the concrete outcome, not "to understand X." *(Default: infer from context — "so you can extend Boo's router with confidence" — and confirm in one line.)* A vague mission makes lessons feel abstract; push once for the underlying goal, then proceed.
- **Prior knowledge + depth** — "what do you already know here, and how well?" *(Default: assume the cohort baseline for the topic and calibrate the first artifact one notch above it.)*
- **Scrappy or rigor** *(Default per the mode rule above.)*

One batched round. If the workspace already answers these, skip the gate entirely and resume.

## The stateful workspace (situational — a menu, not a march)

The directory holds the learning state. **Do not scaffold all of it for every topic** — create each file only when it earns its place. "Process is dead": a one-off scrappy lesson may create *nothing*.

| File / dir | What it holds | Create it when… |
|---|---|---|
| `MISSION.md` | The *why* — the real-world outcome grounding every lesson | The topic is multi-session (rigor path). Always for rigor; never for a one-off. |
| `GLOSSARY.md` | Canonical, opinionated definitions of the topic's terms | The topic has its own nomenclature. Add a term **only once he uses it correctly** — it's a record of compressed understanding, not a dictionary. |
| `RESOURCES.md` | Trusted primary sources (knowledge) + communities (wisdom) | As soon as you cite anything. Never teach from parametric memory alone. |
| `learning-records/NNNN-slug.md` | ADR-style capture of a non-obvious lesson, corrected misconception, or disclosed prior knowledge | Genuine understanding is *demonstrated* — not merely covered. Drives the next session's difficulty. |
| `builds/NNNN-slug/` | The **build-to-learn artifact** — the smallest runnable thing that exercises the skill. His primary unit. | Every lesson in the build-to-learn loop. Kept, not deleted. |
| `reference/*.md` | Compressed cheat-sheets he'll revisit (syntax, the algorithm, the flow) | The lesson produced something worth quick-reference later. **Has a visual surface → load `design-taste` first.** |
| `NOTES.md` | His stated teaching preferences, working scratch | He expresses a preference for how he's taught. |

Compact templates:

```md
# Mission: {Topic}
## Why  {1–3 sentences — the concrete outcome, not "to understand X"}
## Success looks like  {specific, observable things he'll be able to DO}
## Constraints  {time, prior commitments, how he likes to learn}
## Out of scope  {adjacent rabbit-holes he's NOT chasing now — protects the ZPD}
```
```md
# {Topic} Glossary
**{Term}**: {one–two tight sentences — what it IS, not how to do it}
_Avoid_: {looser aliases, so language compresses to one word}
```
```md
# {NNNN} — {what was learned / established}
{1–3 sentences: what he now understands (or disclosed knowing), and why it
changes what to teach next.}  [Optional: Status / Evidence / Implications]
```
```md
# {Topic} Resources
## Knowledge  - [Primary source — official docs / recognised expert](url)  {what it covers; when to reach for it}
## Wisdom (Communities)  - {100x cohort channel / high-signal forum}  {when to test a skill in the real world}
```

## The build-to-learn loop (the method)

Run this per lesson. Keep each lesson **short and completable fast** — working memory is small; one tangible win per session, sitting in the zone of proximal development (challenging *just enough*, calculated from `learning-records/`).

1. **Locate the frontier.** Resume: read `learning-records/` + `GLOSSARY.md` + last `builds/`. Fresh: start from the mission and prior-knowledge answer. Pick the single next skill that's one notch above where he is.
2. **Ground the knowledge — cite, don't synthesize.** Pull the *minimum* knowledge the skill needs from a **primary source in `RESOURCES.md`** (official docs, recognised expert). Never teach from parametric memory; claims about how a library/API behaves follow **`craft-critique`**'s evidence discipline (cite / get / flag). For *acquiring* knowledge, difficulty is the enemy — strip everything not required for this one skill.
3. **Build the smallest artifact that exercises it.** This is the fork's signature: he *makes* it. `builds/NNNN-slug/` — a ~10–40-line script, hook, component, or state machine he can run. React/Next/TypeScript; Vitest/Jest for a red→green feedback loop; GSAP/Framer when the skill is motion; Playwright when it's a browser behavior. For *skill* durability, difficulty is the tool — make him retrieve and construct, not copy.
4. **Close the feedback loop — tight and, where possible, automatic.** Run it. A failing-then-passing test, a rendered output, a printed value — immediate feedback beats a verdict from you. If the artifact renders UI, it's still his work he'll reopen: **load `design-taste` first** so even a learning artifact meets his bar.
5. **Assess before you promote (the storage-strength gate).** Fluency ≠ mastery. Recognising the answer, or reading his own code back, is fluency and *feels* like understanding. The real test is **retrieval + construction**: can he rebuild the artifact, or explain *why* it works, from a blank file? Only then write a `learning-record` and, if he uses the term correctly, promote it to the glossary. Bias check: reading his fluency as storage strength is a confirmation/recency trap — route to **`name-and-control-bias`**; the control is a from-scratch rebuild, not a recognition prompt.
6. **Build storage strength deliberately across sessions.** Space practice out (revisit a prior skill cold), interleave related skills in practice (not in first-acquisition), and use retrieval over re-reading. These are *desirable difficulties* — the friction is the point.
7. **Delegate wisdom to a community.** Some questions need real-world testing, not another lesson. Default to answering, then point him at a high-signal community (his 100x cohort first). Respect an opt-out — record it in `RESOURCES.md`.

**Mission drift is normal.** If learning shifts what he cares about, update `MISSION.md` and write a learning-record — but confirm with him before changing the mission.

## Worked example — learning the tool-calling agent loop across three sessions

Mission (grounded, no fabricated facts/metrics): *"Understand tool-calling agent loops well enough to extend Boo's router with confidence."* Success: *build a minimal forced-tool-choice loop from scratch.* Topic is jargon-heavy → glossary earns its place.

**Session 1 (fresh).** Intake gate: mission confirmed in one line; prior knowledge = "I've called an LLM API, never wired a tool." Create `MISSION.md`; seed `RESOURCES.md` with **primary sources only** (the model provider's tool-use docs, the AI-SDK docs) — not a blog. Frontier = "get a plain completion." Build `builds/0001-plain-completion/` — ~15 lines: call the model, print the text. Run it. It works — but coverage ≠ learning, so **no learning-record yet.** Seed `GLOSSARY.md` with *completion*, *token* (terms he already uses correctly).

**Session 2 (days later — resume).** Read `learning-records/` (empty) + glossary + `builds/0001`. Frontier one notch up: add **one** tool with forced `tool_choice`. He predicts the model will "decide" to call the tool; he builds `builds/0002-one-forced-tool/`, runs it, and discovers forced `tool_choice` *removes* the choice — the model must call it. That's a corrected misconception → **`learning-records/0001-forced-tool-choice-is-not-a-decision.md`** (high value: it predicts future stumbles on router design). Tighten the glossary entry for `tool_choice`. Add a Vitest assertion so the loop is red→green, not eyeballed.

**Session 3 (resume from LR-0001).** ZPD: a **closed-enum router** (guide vs honest fallback) — the pattern in his shipped Boo work, now understood from the ground up rather than pattern-matched. Build `builds/0003-closed-enum-router/`. **Assessment gate:** can he rebuild the forced-`tool_choice` + closed-enum skeleton from a *blank file* and say *why* it beats a free-form prompt? Recognition would be fluency; the from-scratch rebuild is the storage-strength control (per `name-and-control-bias`). He can → write the learning-record and promote `router`, `closed enum`, `fallback intent` to the glossary. The workspace now carries three sessions of state; a fourth resumes in seconds.

Notice what the workspace did that a chat could not: it **persisted the corrected misconception** (LR-0001) so Session 3 built *on* it instead of re-teaching, and it calculated difficulty from recorded evidence, not vibes.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Teach from parametric memory ("I think the API works like…") | Cite a primary source in `RESOURCES.md`; claims follow `craft-critique`'s cite/get/flag |
| Explain it and call it taught | Have him **build** the smallest artifact that exercises it, then run it |
| Read his fluency (recognises it, reads code back) as mastery | Gate on retrieval + from-scratch rebuild (storage strength); bias per `name-and-control-bias` |
| Scaffold all workspace files for a one-off question | Situational menu — create each file only when it earns its place; a scrappy lesson may create none |
| Cram a whole subsystem into one lesson | One tangible win in the zone of proximal development; working memory is small |
| Add a glossary term the moment it's mentioned | Add it once he **uses** it correctly — the glossary records compressed understanding |
| Log every session as a learning-record | Write one only when non-obvious understanding is *demonstrated* or a misconception corrected |
| Ship a UI learning artifact / cheat-sheet in the generic look | Load `design-taste` first — it's his work, he'll reopen it |
| Silently change the mission when learning drifts | Update `MISSION.md` + learning-record, but confirm the change with him first |
| Restate learning-science or taste values inline | Point to the framework (Bjork/Vygotsky) and to `design-taste` — never re-encode |

## Boundaries

- **`research-technical-docs`** owns technical/docs research done to *ship a task* (no stateful workspace, no ZPD tracking). This skill owns *learning a concept over time*; it may call `research-technical-docs` to gather a lesson's primary sources.
- **`build-coded-prototypes`** owns build-to-*answer-a-design-question*-then-discard (disposition ritual, throwaway branch). This skill owns build-to-*learn*: the artifact is kept as a learning record, not deleted.
- **`design-taste`** owns every taste value any rendered artifact or cheat-sheet must honour — loaded, never restated.
- **`craft-critique`** owns the evidence-discipline protocol behind "cite, don't synthesize" and the assessment honesty; loaded, never restated.
- **`name-and-control-bias`** owns the confirmation/recency controls behind the storage-strength gate.
- **Maintenance law:** registered in **SKILL-MAP.md** (a personal-growth / learning entry — the map has no "Productivity" family) and routed in **`ask-dinesh`** so the router can reach it. Keep both in sync: if this skill is renamed or retired, update the map row and the router route, or the index and router lie.

## Sources

- Forked from **`teach`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: the stateful-workspace model (mission / glossary / resources / learning-records), the fluency-vs-storage-strength split, zone of proximal development, desirable difficulty, knowledge/skills/wisdom decomposition, and the community-delegation posture. **Changed for this library:** the primary unit is a **build-to-learn artifact** (React/Next/TS · Vitest/Jest/Playwright · GSAP/Framer), not a Tufte HTML lesson; resources retargeted to primary docs in his stack; the Don't/Do table is kept (the source rubric would strip prohibitions — this library keeps them, paired with their Do).
- Learning-science grounding (named, not restated): **Robert & Elizabeth Bjork** — *desirable difficulties*, storage vs retrieval (fluency) strength; **Lev Vygotsky** — the *zone of proximal development*. Any claim a lesson makes about how a library or API behaves is evidenced per `craft-critique`, not asserted from memory.
