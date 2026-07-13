---
name: author-skills
description: "The authoring rubric for Dinesh's skill library — how every SKILL.md in `skills/` is written, forked, and QA'd. Single source of truth for skill FORM (structure, density, house patterns); sits beside SKILL-MAP.md, which owns the registry of WHAT exists. Load when writing a new skill, forking one (Pocock / Anthropic / marketplace), editing or reviewing a SKILL.md, or asked 'is this skill good?', 'how do I structure this skill', 'run the no-op test', 'this skill won't load', 'this skill is too long'. Names the house patterns (intake gate, mode-switchable, situational, reference-don't-restate) and runs the failure-mode QA (no-op / duplication / sediment / sprawl / premature-completion)."
license: "MIT — forked from `writing-great-skills` in mattpocock/skills (© Matt Pocock). Vocabulary and failure-mode taxonomy adopted; its anti-negation rule deliberately rejected — see 'Prohibition lists are load-bearing'."
---

# Author Skills

The rubric that governs how every skill in this library is written. A skill exists to let a **smaller model perform at Dinesh's level** — so the enemy is variance: the model taking a different path each run. Every rule below buys back **predictability** (same *process* every run, not same output).

## When to use / when NOT to use

- **Use** when authoring a new SKILL.md, forking an external skill into the library, editing or reviewing one, or diagnosing why a skill misfires ("won't load," "too long," "the model ignores half of it").
- **NOT** for deciding *whether a skill should exist*, its family, or its priority — that is **SKILL-MAP.md** (the registry). This skill owns FORM; the map owns the roster.
- **NOT** for judging the domain claims inside a skill's worked example (is that metric real? is that market claim evidenced?) — that is **`craft-critique`**'s evidence protocol. Load it too when a skill makes external claims.

## Two paths — mode-switchable

Never run one heavyweight process regardless of stakes. Pick the path, state which you took.

- **Scrappy (lint pass, ~10 min):** a one-line edit, a triage, "is this roughly OK?" Run only: description has triggers · no restated taste/evidence values · no obvious no-ops · every step has a checkable done-condition. Ship.
- **Rigor (full authoring, default for anything that ships into the library):** the full method below + the failure-mode QA. A skill is permanent infra loaded into every future run — treat a new or forked one as rigor by default.

**Recommended default:** rigor for any *new or forked* skill; scrappy for an *edit to a shipped* one. When unsure, rigor.

## Intake gate — ask only the gaps

Before authoring a skill that produces work, gather what you're missing — but **ask only what you cannot discover yourself, and offer a recommended answer to each open question** so Dinesh confirms rather than composes. Split the two kinds:

**Discover silently (do not ask):**
- The `name` — it must match the folder (kebab-case).
- Whether the skill produces an artifact (→ needs an Output-format section) or is pure reference (→ may be a flat peer-set, no steps).
- Sibling boundaries — read the boundary table in BUILD-CONTEXT.md, SKILL-MAP.md's per-skill boundary notes, and the adjacent skills' descriptions.
- Whether it is NN/g-grounded (→ needs a `## Sources` section with real nngroup.com URLs) or a fork (→ keep license attribution).

**Ask Dinesh (decisions only he owns) — each with a recommended default:**
- Does this deserve to be its own skill, or a section of an existing one? *(Recommend: fold in unless it has a distinct leading word — see Granularity.)*
- Fork vs build-new, and which source? *(Recommend the closest audited source; name it.)*
- Which family / priority in SKILL-MAP? *(Recommend from the map.)*

One round of questions, batched. Do not interrogate line by line. If every gap has a safe default, state the defaults and proceed — don't stall for confirmation on the obvious.

## The house patterns (name them, apply them)

These are the conventions every skill in this library conforms to. Refer to each by name.

1. **Intake gate** — the ask-only-the-gaps section above; any skill that produces work opens with one.
2. **Mode-switchable** — a scrappy fast path and a full rigor path, with one recommended default. Never a single rigid weight.
3. **Situational ("process is dead")** — the method is a **menu + selection logic with one recommended default**, never a march to run identically every time. State when a step does *not* apply. Completing the checklist is never the goal; solving *this* case is (the pattern `name-and-control-bias` models: "a bias that cannot touch your claim is noise").
4. **Reference-don't-restate** — taste values live ONLY in **`design-taste`**; the evidence-discipline protocol lives ONLY in **`craft-critique`**; the named-bias/control catalog lives ONLY in **`name-and-control-bias`**. If your skill needs any of them, write "load `design-taste` first" / "claims follow `craft-critique`'s evidence protocol" — never copy the values. These three are the canonical single-source-of-truth exemplars; match their density.
5. **Prohibition-lists-are-load-bearing** — keep the Don't/Do and Never-Do / Never-Say tables. See the dedicated section below; this is where the fork breaks from its source.

## Vocabulary adopted (the levers — think with these)

Use these as leading words; they recruit priors and anchor the same behaviour every run.

- **Leading word** — a compact concept already in the model's pretraining (*the settle*, *quiet surface loud proof*, *self-selection*). **Front-load** the skill's leading word into the *description* — that is where invocation work happens — and repeat it as a token (never re-explained as a sentence) through the body.
- **No-op test** — the core lint: does this line change behaviour versus what the model already does by default? If not, delete the whole sentence. "It is important to consider the user's needs" is a no-op; `cut, don't shrink` is not.
- **Information hierarchy / progressive disclosure** — rank content by how immediately it's needed: in-file steps → in-file reference → reference disclosed to a `references/x.md` file behind a **context pointer**. Push a body over ~350 lines *down* the ladder; inline what every path needs, disclose what only some **branches** reach. A pointer's *wording*, not its target, decides how reliably the model follows it.
- **Model-invoked vs user-invoked** — this library is model-invoked by default (every skill keeps a trigger-rich `description` so the agent and sibling skills can reach it), paying permanent context load for discoverability. A skill that only ever fires by hand can drop its description (zero context load) — but then only a human, or a **router skill**, can reach it. When user-invoked skills multiply past memory, a router (`ask-dinesh`, the shipped dispatcher over SKILL-MAP) is the cure.

## The method (rigor path)

1. **Frame the trigger.** Write the `description` first, front-loading the leading word and listing one trigger per genuinely distinct branch (synonyms of one branch are duplication — collapse them). Test: *would a smaller model know when to load this from the description alone?*
2. **Run the intake gate.** Batch the gaps; proceed on defaults.
3. **Choose the shape.** Steps (ordered actions, `tdd`-like) or flat reference (a review/catalog) or both. Pure-reference skills need no steps — a flat peer-set is a fine arrangement, not a smell.
4. **Draft to the house skeleton** (below), applying the five house patterns.
5. **Set completion criteria.** Every step ends on a *checkable* done-condition ("every modified file accounted for," not "produce a change list"). Vague bounds invite premature completion.
6. **Run the failure-mode QA** (below) end to end.
7. **Verify portability.** No absolute paths except sibling-skill names; own-folder files referenced relatively; ≥1 complete worked example; body 120–350 lines.

## The house skeleton (compact — full brief in BUILD-CONTEXT.md)

```
---
name: <kebab — matches folder>
description: "<third-person, trigger-rich: what it does + 'Use when…' + quoted trigger phrases>"
[license: "<one line>" — forks only]
---
# Title            — 1-line purpose (leading word inside it)
## When to use / when NOT to use   — name the sibling that owns the adjacent case
## The method / decision tree       — situational menu, one default
## [checklists · lint rules · tables — whatever the method needs]
## Worked example                   — realistic, complete, catches the target failure
## Anti-patterns / red flags         — Don't/Do table
## Output format                     — only if it produces an artifact
## Boundaries                        — which sibling owns what
## Sources                           — NN/g URLs and/or fork attribution
```

## The no-op test (run sentence by sentence)

Read each sentence in isolation and ask: **does the model behave differently because this line is here?** If no, delete the *whole sentence* — don't trim words from it. Be aggressive; most prose that fails should go, not be rewritten. A weak leading word (*be thorough* when the model is already thorough-ish) is a no-op — the fix is a stronger word (*relentless*), not a new technique.

## Failure-mode QA (the QA pass — stolen wholesale, minus one)

Walk these against the draft. Report only the ones actually present.

| Failure mode | The tell | Fix |
|---|---|---|
| **Premature completion** | A step's done-condition is fuzzy ("understanding reached"); the model quits early and moves on | Sharpen the criterion first (cheap, local); only if irreducibly fuzzy *and* you observe the rush, split the sequence so later steps are hidden |
| **Duplication** | The same meaning in two places — especially a restated taste/evidence value | Collapse to one **single source of truth**; if it's a DNA value, replace with "load `design-taste`/`craft-critique`" |
| **Sediment** | Stale lines that settled because adding felt safe and removing felt risky (a dead tool, an old path) | Core down and delete; staleness is a relevance failure, not a formatting one |
| **Sprawl** | Simply too long — even if every line is live and unique | Disclose reference to `references/x.md` behind a pointer; split by branch |
| **No-op** | A line the model already obeys by default | Delete the sentence, or upgrade the weak leading word |

**The one Pocock failure mode this library REJECTS: Negation.** His rubric treats every prohibition ("don't do X") as a failure mode and demands you restate it positively. **Do not apply that here.** See below for why, and when the escape hatch still applies.

## Prohibition lists are load-bearing (the deliberate break from the source)

Dinesh's Don't/Do tables and the DNA files' Never-Do / Never-Say lists are **kept, endorsed, and required** — the opposite of the source rule. The reasoning:

- **Smaller models are the target.** A named prohibition is a hard guardrail a small model can check against; deleting it in favour of only-positive phrasing removes the tripwire that catches the exact failure. `design-taste` bans "interaction toys" and `craft-critique` bans "This is great!" *by name* — those bans are the skill's teeth.
- **The Don't/Do table already satisfies the source's own escape hatch.** Pocock permits a prohibition when it's "a hard guardrail you can't phrase positively" *and* "pair it with what to do instead." Every Don't/Do row IS that pairing: the Don't names the tripwire, the Do supplies the target. So keep the two-column table — never a bare Don't column, never a bare Do column.
- **Where the source's instinct still helps:** in *prose steps*, prefer the positive ("write one-line comments") over a naked ban ("don't write verbose comments") so the forbidden pattern isn't the last thing read. Reserve standalone prohibitions for tables and Never-lists. So: **positive in steps, prohibitions in tables — and every prohibition paired with its Do.**

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Open the description with filler ("This skill helps you…") | Front-load the leading word; lead with the trigger |
| Restate a taste value, an evidence rule, or a bias/control | Point to `design-taste` / `craft-critique` / `name-and-control-bias` |
| Write "it is important to…" / "always try to be thorough" | Delete the no-op, or name a concrete behaviour |
| One rigid process for every invocation | Menu + selection logic, one recommended default (situational) |
| Interrogate the user field by field | One batched intake gate, each gap with a recommended default |
| Strip prohibitions to "state it positively" | Keep the Don't/Do table; pair every ban with its Do |
| Let a step end on "looks good" | End on a checkable, exhaustive done-condition |
| Grow the body past 350 lines to keep everything inline | Disclose reference to `references/x.md` behind a pointer |
| Fork and drop the license line | Keep MIT/author attribution in `## Sources` and frontmatter |

## Worked example — the no-op test + QA over a weak draft

**Draft skill `draft-empty-states` (excerpt, as received):**

```
---
name: draft-empty-states
description: This skill helps you design empty states for your app.
---
# Empty States
It is important to always consider the user's needs when designing.
Empty states should have generous whitespace — pad them to about 64px,
bump the text up a size, and stick to one accent color.
Try to be thorough and make sure everything looks good before shipping.
Export the mockup from Sketch and hand it to engineering.
Never leave an empty state blank.
```

**Run the passes:**

1. **Description (trigger test):** "helps you design empty states" has no trigger phrasing and no leading word — a small model won't know *when* to fire it. → Rewrite: `"Design the empty, loading, error, and first-run states of a screen. Use when a screen has no data yet, a list is empty, a fetch fails, or asked 'what does this look like before there's content?'"`
2. **No-op:** "It is important to always consider the user's needs" and "Try to be thorough and make sure everything looks good" change nothing the model doesn't already do. → **Delete both whole sentences.**
3. **Duplication (reference-don't-restate):** the "whitespace / larger text / one accent color" line **hard-codes `design-taste` values** (and drifts — the guessed number isn't even the canonical one) — the exact drift bug this rule exists to stop. → Replace with: "Load `design-taste` first for breathing room, type scale, and accent rules."
4. **Sediment:** "Export the mockup from Sketch" — stale tool; the library ships React/Next prototypes. → Delete or re-point to the real stack.
5. **Premature completion:** "make sure everything looks good before shipping" is an unbounded done-condition. → Replace with an exhaustive criterion: "every state (empty, loading, error, first-run, partial) has a designed screen — none left to the happy path."
6. **Negation — where the fork is REJECTED:** the source rubric would flag `Never leave an empty state blank` as negation and demand it be restated positively. **Keep it.** It is a load-bearing guardrail for a small model. → Upgrade it into a paired Don't/Do row: | *Don't* ship a blank empty state | *Do* give it a one-line explanation + the primary next action |. Prohibition kept, paired with its Do — exactly the house rule.

**Result:** a 6-line description-plus-body of mostly no-ops and a drift bug becomes a tight skill that points to `design-taste`, carries a checkable completion criterion, and *keeps* its prohibition as a Don't/Do row. The QA caught what a "does it read nicely?" pass would miss.

## Output format

Authoring a skill → the SKILL.md itself, to the house skeleton. Reviewing one → a QA report:

```markdown
## Skill QA: <skill-name>  — path <mode: scrappy / rigor>

**Verdict: SHIP / FIX-FIRST / REWRITE**
**The one thing:** <highest-leverage change, one sentence>

| Failure mode | Line(s) | The tell | Fix |
|---|---|---|---|
| no-op / duplication / sediment / sprawl / premature-completion | … | … | … |

**Reference-don't-restate:** <any taste/evidence value restated? → point to the SoT>
**Prohibitions:** <kept as Don't/Do pairs? bare bans upgraded?>
**Portability + length:** <paths OK · worked example present · 120–350 lines>
```

## Boundaries

- **SKILL-MAP.md** owns the registry — which skills exist, families, priorities, and the per-skill boundary rules (the boundary *table* itself lives in BUILD-CONTEXT.md). This skill owns the *form* of any one SKILL.md. A new skill updates both: the map gets a row, this rubric shapes the file.
- **BUILD-CONTEXT.md** is the build-time brief (grounding on who Dinesh is, source map, definition of done). This skill is its portable, permanent form — the rubric that travels with the library. When they diverge, treat BUILD-CONTEXT as the origin of record for grounding, this file as the authority on craft.
- **`craft-critique`** owns judging the *content and claims* inside a skill (is that metric evidenced?). This skill owns judging its *construction* (is that line a no-op?). Load both when a skill makes external claims.
- **`design-taste`** owns every taste value a skill's UI examples must honour — never restated here, only pointed to.

## Sources

- Forked from **`writing-great-skills`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: the leading-word / front-loading discipline, the no-op test, information-hierarchy / progressive-disclosure via context pointers, the model-invoked vs user-invoked tradeoff, router skills, and the failure-mode taxonomy (premature-completion, duplication, sediment, sprawl, no-op). **Deliberately rejected:** its "negation is a failure mode — state positive behaviour, not prohibitions" rule; Dinesh's Don't/Do and Never-lists are load-bearing for smaller models (see "Prohibition lists are load-bearing").
- **BUILD-CONTEXT.md** — house format spec, hard rules 1–7, the boundary table, definition of done.
- **SKILL-MAP.md** — governing rules (single-source-of-truth for taste and evidence discipline; written-for-smaller-models), per-skill boundary notes, families and priorities.
- Canonical density/rigor exemplars to match: **`name-and-control-bias`**, **`design-taste`**, **`craft-critique`**.
