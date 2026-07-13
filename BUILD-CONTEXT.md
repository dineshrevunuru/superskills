# Build Context — read this FIRST before building any skill

You are building ONE skill in this portable skill library. The library's purpose: let **smaller models** perform at the author's level. Write accordingly — decision trees, checklists, do/don't tables, worked examples, red flags. Never essays.

## About the author (grounding only — do not paste into skills)

The author is a product designer who builds what they design; the AI-product patterns in this library's AI wing come from real shipped work, not theory. That grounding is the point when a skill draws on them.

## Format spec (every SKILL.md)

```
---
name: <exact-kebab-name — must match the folder>
description: "<third-person, trigger-rich: what it does + 'Use when …' + quoted trigger phrases. A smaller model must know WHEN to load it from this alone.>"
---
# Title
[1-line purpose]
## When to use / when NOT to use   (the NOT matters — name the sibling skill that owns the adjacent case)
## The method                       (numbered steps or decision tree — the core)
## [Checklists / linting rules / worked example — whatever the method needs]
## Anti-patterns / red flags
## Output format                    (only if the skill produces an artifact)
## Sources                          (NN/g-grounded skills: real nngroup.com URLs from the research files)
## Boundaries                       (which sibling skill owns what — see boundary table below)
```

- Body target: **120–350 lines.** Under 120 = probably too thin to be a skill; over 350 = move material to `references/<file>.md` in your skill folder.
- Voice: imperative, concrete, specific. "Write 3–5 research questions; they are NOT interview questions" — never "it is important to consider research questions."
- Worked examples: at least one realistic, complete example per skill (a real-shaped screener, a filled severity table, an actual prompt contract).

## Hard rules

1. **Reference, never restate.** Taste values live ONLY in `design-taste/SKILL.md`. The evidence-discipline protocol lives ONLY in `craft-critique/SKILL.md`. If your skill needs either, write "Load `design-taste` first" / "Claims are handled per `craft-critique`'s evidence protocol" — do not copy values. (Exception: none.)
2. **No volatile business metrics.** Never hardcode client/product numbers (conversion rates, costs) into a skill — they change. Say "the shipped booking chatbot" / "the live voice agent" without numbers.
3. **No fabricated author facts.** If you need a fact about the author you don't have, write the skill without it. Never invent projects, quotes, or preferences.
4. **NN/g skills carry citations.** grounding=NN/g or hybrid-NN/g → include a `## Sources` section with the real nngroup.com URLs from the research JSONs. Name frameworks precisely (e.g. "Nielsen 0–4 severity: frequency × impact × persistence").
5. **Boundaries are stated, not implied.** If the map defines a boundary for your skill (table below), write it into your `## Boundaries` section.
6. **Forks keep attribution.** If you fork a skill that has a license/author (e.g. motion-design = MIT, LottieFiles), keep a one-line attribution.
7. **Portability.** No absolute paths inside skill bodies except references to sibling skills by name. References to files inside your own skill folder are relative (`references/x.md`).

## Boundary table (write the relevant row into your skill)

| Boundary | Rule |
|---|---|
| craft-critique ↔ verify-ui-quality | critique = judgment + verdict; verify = mechanical checks (automation, cross-device, performance), defers to critique for judgment |
| design-stage-interfaces ↔ design-conversational-interfaces | stage owns the conversation-vs-GUI decision + the switch; conversational owns behavior once IN conversation |
| design-ai-trust-and-failure-states ↔ write-ai-evals | trust/failure = user-facing failure UX; evals = measuring failure (+ pre-design model capability assessment) |
| build-token-system ↔ apply-personal-brand | tokens = canonical values, produced once; brand = consumes tokens as themes, never re-encodes |
| map-customer-journey ↔ design-interaction-flows | journey/empathy maps = research-time experience mapping; interaction-flows = design-time feature/task flows, edge cases |
| synthesize-research-data | owns need statements + HMW as its Define-stage output (they are NOT a separate skill) |
| design-taste | single source of all taste values incl. motion curves/durations |

## Source map (read what applies to YOUR skill)

**NN/g research corpora (in the `research/` folder):**
- `research/nng-research-methods.json` — research planning, screeners, interview guides, interviews, contextual/field/diary, stakeholder interviews, synthesis, personas/JTBD, journey/empathy mapping, surveys
- `research/nng-evaluation-methods.json` — usability test planning/tasks/moderation/analysis, heuristics, cognitive walkthrough, accessibility, metrics (SUS/SEQ/NPS/HEART), A/B & quant, benchmarking
- `research/nng-design-strategy.json` — IA/card sort/tree test, flows, wireframing, prototyping, interaction principles, visual principles, design systems, UX writing, workshops, problem framing, success metrics, AI+UX
- `research/role-task-inventory.json` — the atomic role tasks your skill must enable (check your skill against it)

**Fork sources (read before adapting):** Several skills in this library are forks of upstream skills — among them `accessibility-review`, `ux-copy`, `design-system`, `canvas-design`, `theme-factory`, `brand-guidelines`, and `frontend-design`. Reference the upstream skill by name and read it before adapting; don't hardcode its on-disk path. When a fork carries a license/author (e.g. `motion-design` = MIT, LottieFiles, with its `director/ patterns/ reference/` subdirs), keep a one-line attribution. When a skill ships a large asset bundle (e.g. `canvas-design`'s font bundle), reference it in place — never copy megabytes into your skill.
- `dataviz` + `artifact-design` are built into the Claude binary — layer skills say "invoke the built-in `dataviz` skill first, then apply the palette from `apply-personal-brand`/token files"; never claim to replace them.

**Style exemplars (match their density and voice):** `design-taste/SKILL.md`, `craft-critique/SKILL.md`.

## Definition of done for a skill

- [ ] Folder + SKILL.md, name matches, description passes the "would a smaller model know when to load this?" test
- [ ] Method is executable end-to-end without this conversation's context
- [ ] ≥1 complete worked example
- [ ] Anti-patterns section present
- [ ] Rules 1–7 above honored (spot-check: zero taste values restated, zero volatile metrics)
- [ ] NN/g sources section if applicable
