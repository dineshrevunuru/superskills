# Skill Map

A complete index of the library — every skill, grouped by wing, with a one-line description of what it does and the failure it exists to prevent.

New here? Load [`ask-dinesh`](ask-dinesh/) and describe your situation; it routes you to the right skill(s) in the right order. For install instructions, credits, and the fuller story, see the [README](README.md).

---

## How the library stays coherent

Eight rules keep 88 skills from drifting into contradiction:

1. **Single source of truth — taste.** `design-taste` is the ONLY file that states taste values (breathing room, type scale-up, cut-don't-shrink, no toys, no spectacle). Every other skill says "load design-taste first" — never restates values. Restated values drift; drift is the failure this library exists to prevent.
2. **Single source of truth — evidence discipline.** The cite-or-flag-under-evidenced protocol lives ONLY in `craft-critique`. Business, communication, and research skills reference it.
3. **Judgment vs procedure boundary.** `craft-critique` owns principles and verdict language; `verify-ui-quality` owns the mechanical checks (browser automation, click-paths, cross-device, performance) and invokes craft-critique for judgment.
4. **Chat ↔ stage boundary.** `design-stage-interfaces` owns the conversation-vs-GUI decision and the switch; `design-conversational-interfaces` owns behavior once you are in conversation.
5. **Failure UX vs failure measurement.** `design-ai-trust-and-failure-states` owns user-facing failure UX; `write-ai-evals` owns measuring it.
6. **Tokens are canonical once.** `build-token-system` produces token files; `apply-personal-brand` consumes them as themes and never re-encodes values.
7. **Written for smaller models.** Decision trees, checklists, do/don't tables, worked examples, red-flag lists — not essays. Each skill's description makes its trigger obvious ("Use when…").
8. **Citations stay in the file.** Research and evaluation skills carry their nngroup.com source URLs so every claim stays verifiable.

---

## Personal DNA

The taste, voice, and critique standard the rest of the library references.

| Skill | What it does |
|---|---|
| [`design-taste`](design-taste/) | The single source of truth for taste: minimal, huge breathing room, larger/clearer text, cut-don't-shrink, accessibility-first, no gimmick widgets, no spectacle motion, quiet surface / loud proof. Every other skill loads it first. |
| [`writing-voice`](writing-voice/) | The personalized writing voice the library's prose emulates. (fork: Anthropic `writing-style`) |
| [`craft-critique`](craft-critique/) | The evidence-disciplined critique standard: cite-or-flag-under-evidenced, no sugar-coating, a pixel-polish gate, and an AI-claims audit. |

## Research

The full research method, atomized — grounded in Nielsen Norman Group methodology with real citations.

| Skill | What it does |
|---|---|
| [`write-research-plan`](write-research-plan/) | NN/g five-section research plan; research questions are not interview questions; saturation over magic numbers. |
| [`choose-research-method`](choose-research-method/) | The NN/g 20-method landscape (attitudinal/behavioral × qual/quant); outputs a primary method, a backup, and why the rejects fail. |
| [`write-participant-screener`](write-participant-screener/) | Intent-masking questions, behavioral criteria, professional-participant red flags, and recruiting logistics. |
| [`write-interview-guide`](write-interview-guide/) | NN/g seven-step guide: funnel ordering, neutral probes, a coverage matrix, and a leading/double-barreled lint. |
| [`write-survey`](write-survey/) | NN/g survey best practices, a per-question bias audit, and scale construction. |
| [`conduct-user-interview`](conduct-user-interview/) | Echo / boomerang / Columbo probes, comfortable silence, and the say-vs-do caveat. |
| [`run-contextual-research`](run-contextual-research/) | Contextual inquiry, field studies, and diary studies. |
| [`conduct-stakeholder-interviews`](conduct-stakeholder-interviews/) | A business-goals interview guide plus power–interest mapping; the discovery entry point for client work. |
| [`synthesize-research-data`](synthesize-research-data/) | A situational orchestrator for NN/g thematic analysis and affinity diagramming; produces need-statements and How-Might-We outputs. |
| [`build-personas`](build-personas/) | Proto / qualitative / statistical personas kept honest, anchored to jobs-to-be-done. |
| [`map-customer-journey`](map-customer-journey/) | Journey maps and empathy maps (user flows live in `design-interaction-flows`). |
| [`build-research-repository`](build-research-repository/) | Atomic research nuggets (observation + tags + source), four-axis tagging (theme × persona × product × JTBD), and a reuse-before-you-research gate. |
| [`govern-research-ethics`](govern-research-ethics/) | Layered consent, PII care, and duty-of-care for sensitive-topic participants. |
| [`research-technical-docs`](research-technical-docs/) | Investigate a technical question against high-trust primary sources (docs, source, specs, first-party APIs), trace every assertion, and save a cited note. |

## Evaluation & rigor

Usability testing, expert review, accessibility, and the statistical/sampling backbone.

| Skill | What it does |
|---|---|
| [`plan-usability-test`](plan-usability-test/) | The five-user rule and exactly when it breaks; mode tradeoffs; a mandatory pilot. |
| [`write-task-scenarios`](write-task-scenarios/) | A seven-step goal→scenario chain and a ten-mistake task-writing lint. |
| [`moderate-usability-session`](moderate-usability-session/) | Think-aloud facilitation, probing without leading, and no premature rescue. |
| [`analyze-usability-data`](analyze-usability-data/) | A four-step analysis with Nielsen 0–4 severity rating. |
| [`run-heuristic-evaluation`](run-heuristic-evaluation/) | The ten usability heuristics operationalized, plus cognitive walkthrough and an expert-review format. |
| [`audit-accessibility`](audit-accessibility/) | Accessibility review with an assistive-tech caveat; a hard launch gate. (fork: `accessibility-review`) |
| [`define-ux-success-metrics`](define-ux-success-metrics/) | HEART, SUS / SEQ / NPS, benchmarking waves, and measurement plans. |
| [`use-quantitative-evidence`](use-quantitative-evidence/) | A/B design and when A/B is the wrong tool; statistical vs practical significance; never metrics from n=5. |
| [`size-and-justify-samples`](size-and-justify-samples/) | Sampling authority: per-segment saturation for qual, a quant n for a target confidence interval, and a hard "n too small to claim this" gate. |
| [`name-and-control-bias`](name-and-control-bias/) | The canonical bias↔control reference: every named bias paired with a concrete control; internal vs external validity; "awareness is not a control." |

## Design craft

Flows, states, hierarchy, copy, and brand — the pixel-and-decision layer.

| Skill | What it does |
|---|---|
| [`design-interaction-flows`](design-interaction-flows/) | Feature flows, task flows, wireflows, PRD→scenario translation, and edge-case + failure-path enumeration. |
| [`explore-divergent-concepts`](explore-divergent-concepts/) | Parallel directions before converging, documented exploration, and explicit convergence criteria. |
| [`structure-information-architecture`](structure-information-architecture/) | IA design with card sort and tree test as one generate→evaluate loop. |
| [`design-ui-states`](design-ui-states/) | Empty / loading / error / partial / ideal states, plus forms and error reporting. |
| [`apply-visual-hierarchy`](apply-visual-hierarchy/) | NN/g visual principles, Gestalt, and legibility; references `design-taste`. |
| [`write-ux-microcopy`](write-ux-microcopy/) | Microcopy frameworks voiced through the product's voice. (fork: `ux-copy`) |
| [`create-visual-assets`](create-visual-assets/) | A philosophy-first method for visual assets, with a reference font bundle. (fork: canvas-design) |
| [`apply-personal-brand`](apply-personal-brand/) | Turns a token system into brand themes; all values come from the author's own systems (portfolio, Boo, a client booking app), and it supplies the data-viz palette. |

## Design systems

Token architecture and governance.

| Skill | What it does |
|---|---|
| [`build-token-system`](build-token-system/) | Primitive → semantic → component token architecture, Figma-variable ↔ code sync, taste defaults baked into the primitives. |
| [`document-and-govern-design-system`](document-and-govern-design-system/) | Design-system documentation and governance with NN/g maturity research. (fork: `design-system`) |

## AI product design

The differentiator wing — designing for models, agents, and voice.

| Skill | What it does |
|---|---|
| [`design-conversational-interfaces`](design-conversational-interfaces/) | NN/g chatbot guidelines plus hard-won practice from a shipped production chatbot. |
| [`design-stage-interfaces`](design-stage-interfaces/) | Anti-chat "stage" patterns, the articulation barrier, and ownership of the chat↔GUI switch. |
| [`design-voice-interactions`](design-voice-interactions/) | Barge-in, turn-taking, interim ink, duck-and-yield, and error repair. |
| [`design-output-contracts`](design-output-contracts/) | Closed-enum routing and forced tool-call contracts — UI only, never prose. |
| [`design-ai-trust-and-failure-states`](design-ai-trust-and-failure-states/) | Uncertainty display, provenance, hallucination mitigations, and a named cause + recovery for every failure. |
| [`write-ai-evals`](write-ai-evals/) | Golden sets, rubrics, LLM-as-judge, plus a pre-design model capability / cost–latency–quality assessment. |
| [`engineer-production-prompts`](engineer-production-prompts/) | System prompts, few-shot, output constraints, prompt-versioning-as-code, and model output guidelines as a design artifact. |
| [`design-agentic-ux`](design-agentic-ux/) | Plan / progress / interrupt / cancel / undo, human-in-the-loop approval gates, memory and context visibility, streaming/latency states, and non-determinism affordances (regenerate, versions). |

## Design engineering

From prototype to verified front-end.

| Skill | What it does |
|---|---|
| [`build-frontend-interfaces`](build-frontend-interfaces/) | Anti-generic front-end craft with the library's taste as default tokens; invokes web-artifacts-builder as tooling. (fork: frontend-design) |
| [`build-coded-prototypes`](build-coded-prototypes/) | Goldilocks fidelity, real data / live model APIs, Wizard-of-Oz for AI and voice, and a disposition ritual. |
| [`verify-ui-quality`](verify-ui-quality/) | Fresh-eyes QA with browser automation, cross-device checks, and a front-end performance pass; defers judgment to `craft-critique`. |
| [`visualize-data`](visualize-data/) | A thin layer over the built-in data-viz skill that swaps in the library palette. |

## SHIP — production code & delivery

Production-code craft, rigor-gated and explicitly never for prototypes.

| Skill | What it does |
|---|---|
| [`review-shipped-code`](review-shipped-code/) | Two-axis (standards + spec) source-level review of React / Next / TS apps. |
| [`test-shipped-code`](test-shipped-code/) | Red-green-refactor TDD scoped to production code; guarded off prototypes. |
| [`diagnose-bugs`](diagnose-bugs/) | Reproduce → minimize → hypothesize → instrument → fix → regress, for shipped apps. |
| [`codebase-design`](codebase-design/) | Deep-vs-shallow module vocabulary and heuristics for AI-navigable React / Next code. |
| [`improve-code-architecture`](improve-code-architecture/) | Scan a codebase → a visual HTML report of opportunities → drill in and improve. |
| [`model-domain-language`](model-domain-language/) | Establish shared domain vocabulary across a codebase. |
| [`setup-deep-modules`](setup-deep-modules/) | Enforce module boundaries for AI-navigable code. |
| [`implement-spec`](implement-spec/) | Implement a written spec end-to-end with validation. |
| [`plan-work-tickets`](plan-work-tickets/) | Break work into small, scoped tickets. |
| [`triage-issues`](triage-issues/) | Prioritize and route incoming issues. |
| [`plan-large-work`](plan-large-work/) | Stage a large initiative into a sequenced plan. |
| [`qa-to-issues`](qa-to-issues/) | Turn QA findings into tracked issues. |
| [`plan-refactor`](plan-refactor/) | Scope and sequence a refactor safely. |
| [`setup-pre-commit`](setup-pre-commit/) | A Husky + lint-staged + typecheck/test pre-commit gate for Next / React apps. |
| [`git-guardrails`](git-guardrails/) | A hook that blocks dangerous git commands. |
| [`resolve-merge-conflicts`](resolve-merge-conflicts/) | Work through merge conflicts methodically. |
| [`setup-skill-project`](setup-skill-project/) | Scaffold a new skill project. |
| [`make-setup-wizard`](make-setup-wizard/) | Build a setup wizard for a project. |

*The delivery-pipeline skills default to local files; wire them to an issue tracker only if you use one.*

## Motion

Animation craft, a two-register model, a glossary, and a codebase-motion audit. This wing adapts Emil Kowalski's skills (MIT).

| Skill | What it does |
|---|---|
| [`craft-motion`](craft-motion/) | Universal motion-craft rules and a ten-standard review bar; a restrained presentation register by default, with a separate gesture register (springs, velocity, interruptibility) for direct-manipulation surfaces. (fork: motion-design) |
| [`animation-vocabulary`](animation-vocabulary/) | A reverse-lookup glossary: a vague motion description → its precise term ("bouncy thing when a popover opens" → Pop in). |
| [`improve-animations`](improve-animations/) | An audit-then-plan advisor for a codebase's motion: read-only → prioritized findings + self-contained plans. |

## Business & strategy

Framing, research, positioning, and growth.

| Skill | What it does |
|---|---|
| [`write-problem-statement`](write-problem-statement/) | One problem, no embedded solution, an icebox for solutions, and derived discovery goals; the entry gate for every project. |
| [`conduct-business-research`](conduct-business-research/) | Desk / secondary research and a gap list that becomes a primary-research agenda. |
| [`identify-business-problems`](identify-business-problems/) | Opportunity sizing, a risk–reward quadrant, milestone anchoring, and a feasibility check. |
| [`run-competitive-analysis`](run-competitive-analysis/) | NN/g competitive usability evaluation (competitors as free prototypes) plus a positioning teardown. |
| [`position-product`](position-product/) | A differentiation story built from cited evidence, with mandatory under-evidenced flags. |
| [`design-growth-surfaces`](design-growth-surfaces/) | Onboarding, upgrade paths, paywalls, and launch pages as designed strategy with pricing/conversion awareness; leans on marketing-skills plugins (cro, onboarding, copywriting) as utilities. |

## Communication

Storytelling, presentation, decisions, and proposals.

| Skill | What it does |
|---|---|
| [`tell-case-study-story`](tell-case-study-story/) | Problem → process → outcome with verifiable proof, over-proved quietly, written through `writing-voice`. |
| [`present-and-defend-work`](present-and-defend-work/) | Findings structure, design-rationale presentations, async BLUF updates, and dissent handling. |
| [`write-decision-rationale`](write-decision-rationale/) | A lightweight decision-record format with a mandatory "what would change this." |
| [`write-client-proposal`](write-client-proposal/) | Scope tiers, value framing, and pricing your own work. |
| [`facilitate-design-workshop`](facilitate-design-workshop/) | Kickoffs, ideation, journey-mapping workshops, and prioritization exercises. |

## Meta

The rubric that governs how every skill is written, and the router over the whole library.

| Skill | What it does |
|---|---|
| [`author-skills`](author-skills/) | The authoring rubric that governs how every skill in this library is written (no-op test, failure-mode QA, house patterns). Forked from Matt Pocock's `writing-great-skills` (MIT). |
| [`ask-dinesh`](ask-dinesh/) | The router: a situation → the right skill(s) in the right order; reads this map and the README as its live index and reconciles against what's on disk. Forked pattern from Matt Pocock's `ask-matt` (MIT). |

## Productivity & knowledge

Session handoff, learning, and knowledge capture.

| Skill | What it does |
|---|---|
| [`handoff-context`](handoff-context/) | Compact a working session into a structured handoff doc for the next agent. |
| [`teach-me`](teach-me/) | A multi-session, stateful learning workspace (build-to-learn) for self-upskilling. |
| [`build-knowledge-base`](build-knowledge-base/) | Capture notes into a durable, searchable knowledge base. |
| [`scaffold-practice-project`](scaffold-practice-project/) | Spin up a practice project to drill a technique. |
| [`migrate-to-library`](migrate-to-library/) | Generalize an existing pattern or skill into this library. |

---

## Installing a skill

Each skill lives at `skills/<skill-name>/SKILL.md` (plus a `references/` folder where needed) and is git-versioned. To use one, copy its folder into any `.claude/skills/`, `~/.claude/skills/`, a claude.ai skills upload, or an Agent SDK skills directory. See the [README](README.md) for full install commands.
