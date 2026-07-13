---
name: ask-dinesh
description: "The dispatcher over Dinesh Reddy Revunuru's skill library — given a situation, it routes to the right skill(s) in the right ORDER, and names the always-on underlays. Load when you're not sure which skill fits, when an ask spans several skills, or before starting any multi-stage piece of work. Use when someone says 'which skill do I use for…', 'where do I start', 'I need to research X before building Y', 'how do I take this from idea to shipped', 'is there a skill for this', or describes a goal without naming a skill. It ROUTES — it never does the work. Reads ../SKILL-MAP.md and ../README.md as the live index so it never goes stale, and confirms every route against what's actually on disk."
license: "MIT — router pattern forked from `ask-matt` in mattpocock/skills (© 2026 Matt Pocock); Pocock's anti-negation rule deliberately rejected — the Don't/Do tables are load-bearing here."
---

# Ask Dinesh

You don't remember every skill in the library, and the library keeps growing — so ask this first. It maps the situation you describe to the skill(s) that own it and the order to run them. It routes; it does not do the work.

## When to use / when NOT to use

- **Use** when the fit is unclear, the ask spans stages (research → design → build → tell), or you're about to start something big and want the whole chain before step one.
- **Do NOT use** when the skill is obvious. "Write a survey" → load `write-survey` and go. Routing a one-skill ask through the full tree is pure overhead — take the **Fast path** below. This router owns *situation → skill(s) + order*; each routed skill owns its own method.

## How this router works (read first)

1. **The index is live, not baked in.** `../SKILL-MAP.md` (taxonomy + provenance + build rules) and `../README.md` (one-line description per skill) are the source of truth for *what exists*. Read them at route time — never route from memory of this file.
2. **Confirm against disk before you route.** The map can lag the folder. Before naming a skill, verify its folder exists (`ls ../`). This is the **honest-fallback law** (Dinesh's own closed-enum routers never emit an intent they can't fulfill): if a skill you'd route to isn't on disk, say so and route to the nearest real owner + the roadmap — do **not** invent a plausible-sounding skill.
3. **Output a chain, not a verdict.** A route is an *ordered* list of skills + the underlays that load beneath them + which steps are cuttable for this situation. Then hand off — you stop, the routed skill starts.

## Mode switch (situational, not a march)

- **Fast path (scrappy):** the situation maps cleanly to one skill, or you already named it → return that skill, stop. No tree, no chain.
- **Full path (rigor):** the ask is ambiguous or spans stages → run the routing gate, map the ordered chain, name the underlays and the gates. Mark every step that this specific situation lets you cut. **The chain is a recommended default — process is dead; you route judgment, not a fixed pipeline.**

## The routing gate — ask only the gaps

You usually need three facts to route. Infer each from the ask first; **ask only the one or two you genuinely can't.** Offer a recommended read so the answer is one word, and separate what you can discover from what only Dinesh decides.

| # | Fact needed | Infer from | Ask only if you can't infer |
|---|-------------|-----------|-----------------------------|
| 1 | **Object** — a screen/flow · a study/finding · a prototype · shipped code/app · positioning · a written piece · a new skill | The nouns in the ask | "Is this a *design*, a *study*, or a *written piece*?" |
| 2 | **Stage** — framing / researching / designing / building / reviewing / shipping / telling | The verb ("redesign", "review", "write up") | "Are we *figuring out what to build*, *building it*, or *judging what's built*?" |
| 3 | **Stakes + fidelity** — scrappy/timeboxed vs external-facing; throwaway prototype vs production; *decision only Dinesh can make* | Deadline words, "client/recruiter/demo", "just testing" | "Is this *going in front of someone*, or *a throwaway to answer a question*?" |

Stakes routes the mode. Fidelity routes the build skill (`build-coded-prototypes` vs `build-frontend-interfaces`) and whether the a11y + critique gates fire. Never route on a guess when one word would settle it.

## The always-on underlays (never a route — they load *beneath* the route)

These are references other skills pull in, not destinations. Name them with the route; don't send someone *to* them as the answer.

- **`design-taste`** — loads under **any** visual, layout, motion, or interaction decision. Blocking Phase-0 load for every design/build route. Never restated; it is the single source of taste values.
- **`craft-critique`** — loads under **any** review, and under **any** claim about markets/users/positioning (the cite / get / flag-under-evidenced protocol). Never restated.
- **`name-and-control-bias`** — loads before **any** study is fielded and before **any** finding is trusted. The canonical bias↔control reference.
- **`writing-voice`** — loads under **any** writing. Its siblings for research rigor: `size-and-justify-samples`, `build-research-repository`, `govern-research-ethics` — reference-tier, loaded beneath research routes.

## The main flow: problem → shipped experience → story

The route most work travels. Enter wherever the work actually is — you rarely start at step 1.

1. **Frame** → `write-problem-statement` (the entry gate for every project: one problem, no baked-in solution, derive discovery goals). Skip only if the problem is already sharp and written.
2. **Branch — do you need evidence?** If a claim about users/market is load-bearing and you don't have it:
   - `choose-research-method` → `write-research-plan` (+ `write-participant-screener`, `write-interview-guide`) → `conduct-user-interview` / `run-contextual-research` / `conduct-stakeholder-interviews` → `synthesize-research-data`.
   - Underlays: `name-and-control-bias`, `govern-research-ethics`, `size-and-justify-samples`. Evaluative instead of generative? Route the usability branch: `plan-usability-test` → `write-task-scenarios` → `moderate-usability-session` → `analyze-usability-data` — or `run-heuristic-evaluation` for an expert review without users.
3. **Design** → `explore-divergent-concepts` (if the direction isn't settled) → `design-interaction-flows` → `design-ui-states` · `apply-visual-hierarchy` · `write-ux-microcopy` · `craft-motion`. **AI surface?** Detour to the AI on-ramp *before* the visual skills. Underlay: `design-taste` (blocking).
4. **Build** → `build-coded-prototypes` (throwaway / demo / answer one question) **or** `build-frontend-interfaces` (production). The fidelity answer from the gate picks one — do not production-build a Friday demo.
5. **Verify + judge** → `verify-ui-quality` (mechanical: spacing, states, cross-device, perf) → `craft-critique` (judgment + verdict). External-facing → `audit-accessibility` is a hard launch gate.
6. **Tell** → `tell-case-study-story` (portfolio) / `present-and-defend-work` (readout, defense, async update) / `write-decision-rationale` (record the call).

## On-ramps (a starting situation that generates work, then merges onto the flow)

- **Building something AI does** → **`design-stage-interfaces` first** (it owns the chat-vs-generated-UI decision). Then the behavior skills: `design-conversational-interfaces` · `design-voice-interactions` · `design-output-contracts` · `design-ai-trust-and-failure-states` · `design-agentic-ux`, with `engineer-production-prompts` and `write-ai-evals` underneath. Merges into the main flow at step 4 (Build).
- **Business / positioning** → `identify-business-problems` → `conduct-business-research` → `run-competitive-analysis` → `position-product`. Underlay: `craft-critique` (under-evidenced flags are mandatory here). Conversion surface? → `design-growth-surfaces`.
- **Design-system work** → `build-token-system` → `document-and-govern-design-system` → `apply-personal-brand` (consumes tokens as themes, never re-encodes them).
- **A client engagement is opening** → `conduct-stakeholder-interviews` → `write-client-proposal`; merges at step 1 (Frame).

## Decision tree — the situations Dinesh actually hits

Route to the **recommended chain** in order; cut the marked steps when the situation is scrappy. Underlays load beneath, always.

| Situation | Recommended chain (in order) | Cut for scrappy / timeboxed | Underlay |
|-----------|------------------------------|-----------------------------|----------|
| **New research study** | `write-problem-statement` → `choose-research-method` → `write-research-plan` (+ `write-participant-screener` + `write-interview-guide`) → conduct-* → `synthesize-research-data` | Drop the written plan + screener; go method → conduct → synthesize | `name-and-control-bias`, `govern-research-ethics`, `size-and-justify-samples` |
| **Synthesize findings** | `synthesize-research-data` (situational orchestrator) → store in `build-research-repository` | Nugget-code straight to the repository | `name-and-control-bias` (before trusting), `craft-critique` (calibrate claims) |
| **Review a design** | `craft-critique` (judgment + verdict) | If self-built UI, add `verify-ui-quality` first for the mechanical pass | `design-taste`; `audit-accessibility` if external-facing |
| **Review shipped code** | `review-shipped-code` — two isolated passes: a STANDARDS axis (repo conventions + a11y + design-token conformance + React/Next idioms) and a SPEC axis (did it build what the problem asked) | Standards axis alone on a small diff; drop the SPEC pass when there's no spec to check against | `design-taste` (front-end standards), `craft-critique` (design surface + claim honesty — the code skill defers judgment there) |
| **Debug a shipped app** | `diagnose-bugs` — reproduce before you theorize, prove the fix red-then-green | Screenshot-first for a CSS/layout/interaction bug; skip the full instrumented loop | — |
| **Build a prototype** | `build-coded-prototypes` | It's already the scrappy build skill | `design-taste` (blocking). AI/voice behavior → AI on-ramp first |
| **Position / competitor work** | `run-competitive-analysis` → `position-product` | Straight to `position-product` if the competitive read exists | `craft-critique` (under-evidenced flags mandatory) |
| **Write a case study / email / update** | Case study → `tell-case-study-story`; readout/defense/async → `present-and-defend-work`; proposal → `write-client-proposal`; decision → `write-decision-rationale`; a plain email → `writing-voice` alone | For an email, `writing-voice` is the whole route | `writing-voice` (always); `craft-critique` for any claim |
| **Design a screen / flow** | `write-problem-statement` (if unframed) → `explore-divergent-concepts` (if direction open) → `design-interaction-flows` → `design-ui-states` · `apply-visual-hierarchy` · `write-ux-microcopy` · `craft-motion` | Skip framing + divergence; enter at `design-interaction-flows` | `design-taste` (blocking) |
| **Design an AI feature** | `design-stage-interfaces` → behavior skill(s) for the modality → `engineer-production-prompts` + `write-ai-evals` | Enter at the specific behavior skill if the stage decision is settled | `design-taste`, `design-ai-trust-and-failure-states` |
| **Author a new skill** | `author-skills` (the authoring rubric — form, house patterns, no-op test, failure-mode QA) → update `../SKILL-MAP.md` **and this router** in the same pass | — | `craft-critique` (QA the draft's claims) |

## Motion / animation work

- **Name an effect** ("what's it called when…", describes a motion without its term) → `animation-vocabulary` (a lookup — returns the word, does not build).
- **Design or spec motion** → `craft-motion`. Underlay: `design-taste`'s **two motion registers** — is the user directly manipulating it (drag / sheet / swipe / voice barge-in)? → gesture register (springs OK). System-driven presentation motion? → default register (0% overshoot, locked curves).
- **Audit / improve a whole codebase's motion** → `improve-animations` (read-only → prioritized findings + self-contained plans). **Review a motion diff / judge whether it feels right** → `craft-critique` (verdict), which routes to `craft-motion`'s 10-standard motion-review bar for the specifics.

## Ship / deliver / maintain code (Pocock Wave 4 — solo-first, all mode-switch to a tracker only if he runs one)

Route these when the work is DELIVERING or MAINTAINING production code, not designing it:
- **Plan a build** → `plan-work-tickets` (slice a plan into tracer-bullet tickets with blocking edges) · `plan-large-work` (too big for one session → resolve investigation tickets first) · `plan-refactor` (scope + sequence a refactor before touching code).
- **Execute** → `implement-spec` (drives `test-shipped-code` at seams → `review-shipped-code` before commit — the SHIP AND-gate).
- **Bugs / QA** → `qa-to-issues` (plain-language or a `verify-ui-quality` log → filed issues) · `triage-issues` (advance a backlog) · `diagnose-bugs` (hunt one specific bug).
- **Code structure** → `model-domain-language` (one name per concept) · `codebase-design` / `improve-code-architecture` / `setup-deep-modules`.
- **Repo hygiene** → `resolve-merge-conflicts` · `setup-skill-project` · `setup-pre-commit` · `make-setup-wizard` · `git-guardrails`.
- **Learn / capture / migrate** → `teach-me` · `scaffold-practice-project` (build-to-learn) · `build-knowledge-base` (his Figma/Docs) · `research-technical-docs` (docs/API research) · `migrate-to-library`.

## Coverage gaps — route them honestly

A router that pretends an unbuilt skill exists lies; a router that keeps calling a *shipped* skill a gap lies the other way. Reconcile with `ls ../` every pass — route real skills to themselves, and only the genuinely-unbuilt ones to the nearest owner plus the roadmap.

- **Competitor split** (`teardown-competitor-experience` / `analyze-competitor-strategy`) — proposed in `../RESEARCH-EXPANSION.md`, **not on disk**. Route to the real `run-competitive-analysis` today; it owns both the teardown and the strategy read until they split.
- **Already shipped — do NOT re-flag as gaps.** The SHIP wing (`review-shipped-code`, `diagnose-bugs`) and the authoring rubric (`author-skills`) are **on disk now**; route to them directly (rows above), not to `craft-critique` / `verify-ui-quality` / `../BUILD-CONTEXT.md` as stand-ins. `../POCOCK-ADOPTION.md` is a pre-build discussion doc — when it disagrees with disk, disk wins.

## Worked example — an ambiguous ask routed (catches the mis-route)

**Ask:** "I need to redesign a salon's booking flow before the client demo Friday."

**Naive route (wrong):** jump to `build-frontend-interfaces` and start rebuilding the flow.

**Run the gate:** Object = a *flow* (design). Stage = the word "redesign" *presupposes we know what's broken* — do we? Stakes = client demo Friday, external-facing, timeboxed; "demo" = throwaway fidelity, not production.

**Route (catches two mis-routes):**

1. **`write-problem-statement`** — "redesign" is a solution wearing a problem's clothes. Is the *flow* the problem, or is the drop-off upstream? Ten minutes here or you redesign blind. *(Catch #1: building before framing.)*
2. **Evidence — scrappy branch.** Friday rules out a new study. If booking-funnel data or session recordings exist → `analyze-usability-data` on what's already there; underlay `name-and-control-bias` (don't over-read a handful of sessions). If nothing exists, say so and mark the redesign *under-evidenced* per `craft-critique` — don't invent a justification.
3. **`design-interaction-flows`** → the redesigned flow, edge + failure paths. Underlay `design-taste` (blocking).
4. **`build-coded-prototypes`** — a *demo*, so throwaway fidelity. **Not `build-frontend-interfaces`.** *(Catch #2: production-building a Friday throwaway.)*
5. **`craft-critique`** before it ships to the client — external eyes, so the pixel-polish + claims gate fires; `audit-accessibility` if the demo is clickable.

**What the router did:** it did not open Figma or write code. It named the ordered chain, cut the new-study step the deadline forbids, picked prototype over production fidelity, and flagged the two failures a naive "just redesign it" would have walked straight into. Then it stopped and handed off.

## Anti-patterns / red flags

| Don't | Do |
|-------|-----|
| Start doing the work (writing the survey, opening the editor) | Name the skill(s) + order, then stop — the routed skill does it |
| Route a one-skill ask through the whole tree | Take the Fast path; return the single skill |
| Name a skill from memory of this file | Read `../SKILL-MAP.md` + `../README.md` and `ls ../` at route time |
| Invent a skill to fill a gap | Route to the nearest real owner + point at the roadmap doc |
| Send someone *to* `design-taste` / `craft-critique` as the answer | Name them as underlays that load *beneath* the real route |
| Emit the default chain as a rigid pipeline | Mark the cuttable steps for *this* situation; the chain is a recommendation |
| Route on a guess when one word would settle it | Ask the one gap you can't infer — then route |
| Treat `../SKILL-MAP.md` as complete when disk has more | Reconcile with `ls ../`; disk wins, then flag the map as stale |
| Keep routing a shipped skill as a "gap" because this file's gap list went stale | A built skill routes to itself; reconcile the gap list against `ls ../` every pass |

## Boundaries

- **This skill routes; it never executes.** The moment a skill is named, its own `SKILL.md` owns the method — do not restate what it does here (its `description` is the source of truth).
- **`../SKILL-MAP.md`** owns the canonical taxonomy, provenance, and build rules; **this router** owns *situation → skill + order*. When they disagree about what *exists*, disk wins — then the map is flagged stale.
- **`design-taste` / `craft-critique` / `name-and-control-bias`** are underlays this router *names* but never routes *to* as a destination — they load beneath whatever route is chosen.
- **The SHIP wing** (`review-shipped-code`, `diagnose-bugs`) is on disk — route code-review and bug-diagnosis situations to those skills directly. `review-shipped-code` owns source-level code and defers design judgment to `craft-critique` and rendered-UI behavior to `verify-ui-quality`; `diagnose-bugs` owns reproduce→fix→regress for shipped apps, never prototypes (`build-coded-prototypes`).
- **Maintenance law:** whenever a skill is added, renamed, or removed, update this router *and* `../SKILL-MAP.md` in the same pass. A route to a skill that moved, or a missing route to a new one, is a router that lies.

## Sources

- **Router pattern forked from `ask-matt`** — Matt Pocock, `mattpocock/skills` (MIT, © 2026 Matt Pocock). The main-flow / on-ramps / underlay-vocabulary / standalone structure is his; the content, situations, and library are Dinesh's. Pocock's anti-negation rule is deliberately rejected — the Don't/Do and anti-pattern tables are load-bearing here.
- **Honest-fallback law** — Dinesh's own closed-enum routers (the `FLOW-CATALOG` / `aria-portfolio` server work in `t15-portfolio-ideation`): a router never emits an intent it can't fulfill; unknown input falls back honestly rather than hallucinating a route. That discipline is why this file confirms every skill against disk.
- **Live index** — `../SKILL-MAP.md` and `../README.md`, read at route time.
