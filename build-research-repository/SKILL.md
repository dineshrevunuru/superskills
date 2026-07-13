---
name: build-research-repository
description: "Atomize findings into tagged, traceable, reusable insight nuggets and govern the repository so research compounds instead of dying in a deck. Use when someone says 'research repository', 'atomic research', 'tag these findings', 'insight library', 'nuggets', 'where do we store this research', 'have we researched this before', 'reuse this study', or at the END of any synthesis (findings must be filed, not just presented) and the START of any study (check the repo before you recruit). Owns the storage taxonomy and the reuse-before-you-research gate; the nugget = observation + tags + source."
---

# Build Research Repository

Most research dies at the readout: a deck is presented, decisions are (maybe) made, and six months later someone re-runs the same study because nobody could find the last one. A repository is the discipline that stops that. It turns each finding into an **atomic nugget** — small, tagged, traceable, reusable — so insight compounds across client, portfolio, and academic work instead of resetting every project.

This is a ResearchOps skill: it runs at the *end* of synthesis (file the nuggets) and the *start* of a study (query before you recruit).

## The nugget — the atomic unit

Every insight is stored as a nugget with three mandatory parts. A nugget missing any part is not reusable and is not a nugget.

```
NUGGET
  Observation:  what was actually seen/heard — one specific, self-contained finding
  Tags:         the 4 axes below (all that apply)
  Source:       participant id + study + when + where/context   ← traceability, non-negotiable
  [Confidence]: High / Med / Low  (carried from synthesis)
  [Evidence]:   the quote or clip reference (source-linked, ≤ ~125 chars if quoted)
  [Decision]:   the decision it informed / could inform  ← business-connected
  [Status]:     Active / Superseded / Retired  (default Active; flip when the thing it describes changes)
```

A nugget with no source is an opinion, not evidence (this is the same traceability that `name-and-control-bias` requires as the control against cherry-picking). If you can't say who/when/where, it doesn't go in the repo.

## The 4-axis tag taxonomy (Dinesh's system)

Tag every nugget on all axes that apply. Multi-axis tagging is what makes a nugget findable from any future question.

| Axis | Answers | Example tags |
|------|---------|-------------|
| **Theme / topic** | The behavioral or experiential pattern | `abandonment-trigger`, `trust-signal`, `price-anxiety` |
| **Persona / segment** | Which user type it belongs to | `first-time-client`, `returning-client`, `phone-booker` |
| **Product / feature area** | Where in the product it applies | `booking-flow`, `chatbot`, `onboarding` |
| **Job / need (JTBD)** | The underlying job the user is doing | `book-fast-when-busy`, `trust-a-new-stylist` |

Keep the tag vocabulary **controlled** — a living list per axis, not free-form. Two people (or two agents) tagging the same nugget must land on the same tags, or retrieval breaks. When a new tag is genuinely needed, add it to the vocabulary list with a one-line definition (reflexivity: say why it's distinct).

## Situational storage — route by content type (Dinesh's setup)

There is no single repository tool; the medium follows the content.

| Content type | Home | Shape |
|-------------|------|-------|
| **Visual / spatial** — affinity clusters, journey maps, screenshot teardowns, flow annotations | **Figma / FigJam** | Boarded nuggets; tags as labels/sections; source in the sticky |
| **Written** — findings, quotes, transcripts, coded excerpts, decision links | **Docs / Markdown** | One nugget per record; tags in frontmatter/table; source line mandatory |

The rule that keeps a split repo coherent: **the tag taxonomy is identical across both homes.** A `booking-flow` × `first-time-client` nugget must carry the same tags whether it lives on a FigJam board or in a doc, so a cross-content query returns both. The medium differs; the taxonomy does not.

## Before you file a nugget (lint)

Run this gate at the moment of filing — a nugget that fails any line isn't ready:

- [ ] **One finding, self-contained** — reads on its own; not a fragment, not three findings stapled together
- [ ] **Sourced** — participant id(s) + study + when + where; who/when/where or it doesn't go in
- [ ] **Tagged on every applicable axis** — theme · persona · product-area · JTBD, from the controlled vocabulary (no free-form invented tags)
- [ ] **Confidence carried, not re-derived** — the level from synthesis, per `craft-critique`'s evidence protocol
- [ ] **Decision link named** — the decision it informed or could inform; a nugget attached to no decision is trivia
- [ ] **Right home** — visual/spatial → Figma/FigJam, written → Docs; tags identical either way

## The two gates (when this skill runs)

### Gate 1 — Reuse before you research (start of any study)
Before writing a screener or recruiting anyone, query the repo across the 4 axes for the question you're about to ask.
- **Hit:** the question is already answered → don't re-run it; cite the existing nuggets and spend the study budget on what's actually unknown.
- **Partial:** answered for one segment/context but not this one → narrow the new study to the delta.
- **Miss:** genuinely new → proceed, and file the results back here.

A returned nugget only counts as a **Hit** if it clears all three checks — otherwise treat it as a Miss and re-research:
1. **Confident enough** — its confidence (per `craft-critique`'s evidence protocol) is adequate for the decision at hand; a Low-confidence nugget answers nothing on its own.
2. **Context matches** — same segment / surface / context as the new question, not a lookalike from a different persona or product area.
3. **Still fresh** — the thing it describes hasn't been redesigned, repriced, or shipped past since it was filed. A finding about a flow that no longer exists is `Superseded`, not evidence.

**Decay is real, so audit it, don't trust it blind.** When a change invalidates a nugget, flip its `Status` to `Superseded` — never delete it (the audit trail is the point) — and log it in the Full-mode changelog. Reusing a stale nugget is how a repository launders an out-of-date belief into a "known" fact.

This gate is the entire ROI of a repository. Skipping it is how teams pay to learn the same thing twice.

### Gate 2 — File on the way out (end of any synthesis)
Synthesis (`synthesize-research-data`) produces findings; this gate atomizes and files them. A study is not "done" when the deck is delivered — it's done when its nuggets are in the repo, tagged, sourced, and linked to the decision they informed. Unfiled research is a sunk cost.

## Mode-switchable

- **Scrappy (solo / one project):** one tagged doc (written) or one FigJam board (visual) per study, using the 4-axis vocabulary. Even a single well-tagged file makes Gate 1 possible next time. Don't let "I don't have a repo tool" become "findings die."
- **Full (cross-project):** a maintained taxonomy vocabulary, nuggets filed continuously, a periodic merge/dedup pass, and a changelog so a second person can audit why an insight was added, split, or retired.

## Worked example — a nugget filed, then reused (catches the re-research failure)

**End of a salon booking-app study.** Synthesis surfaced: *"Three of six first-time clients stalled at the stylist-selection step because they couldn't tell stylists apart."* Atomize it:

```
NUGGET  booking-2026-07-n04
  Observation: First-time clients stall at stylist selection — no basis to
               choose between unfamiliar stylists.
  Tags:  theme:choice-paralysis · persona:first-time-client ·
         area:booking-flow · jtbd:trust-a-new-stylist
  Source: P2,P4,P5 · booking beta study · 2026-07 · remote moderated
  Confidence: Med (3 of 6, one segment)
  Evidence: "I didn't know who to pick so I just closed it" (P4, 14:22)
  Decision: informed → add stylist bios/specialties to selection step
```
Filed in **Docs** (written finding). Tags mirror the controlled vocabulary.

**Two months later — a new "chatbot booking" study is proposed.** Gate 1 query: `persona:first-time-client` × `jtbd:trust-a-new-stylist`. The nugget above returns. The team realizes the *trust-a-new-stylist* need is already evidenced — so the new study drops the redundant "do they trust stylists?" thread and focuses only on the genuinely unknown chatbot-specific question. The repository just saved a study.

Notice the failure it caught: without Gate 1, the second study would have re-discovered the stylist-trust barrier at full cost. That re-research is the exact failure a repository exists to prevent.

## Anti-patterns / red flags

- **Findings die in the deck.** The readout is delivered and nothing is filed. The single most common failure of scaled research — and the reason repositories exist.
- **Nugget with no source.** Untraceable = unreusable = not evidence. Who/when/where or it doesn't go in.
- **Free-form tags.** Everyone invents their own tag names; retrieval collapses. Controlled vocabulary per axis, or the repo is a landfill.
- **Skipping Gate 1.** Recruiting for a question the repo already answers. Query before you pay.
- **The repo as a graveyard.** Nuggets go in, nothing comes out. If no study ever starts with a repo query, you have storage, not a repository.
- **Different taxonomies per tool.** Figma tagged one way, Docs another → cross-content queries miss half the evidence. One taxonomy, two homes.
- **Over-atomizing.** A nugget so fragmentary it loses meaning. One self-contained finding per nugget — not one per sentence.

## Boundaries

- **`synthesize-research-data`** produces the findings and does the disconfirming-case hunt; this skill atomizes, tags, stores, and governs their reuse. Synthesis hands nuggets to Gate 2.
- **`name-and-control-bias`** owns traceability as the control against cherry-picking; this skill is where that traceability physically lives (observation + source).
- **`drive-research-impact`** owns closing the loop from insight to decision-moved; this skill stores the `Decision` link that impact-tracking reads.
- **`craft-critique`** owns evidence discipline (confidence, calibration); nuggets carry the confidence level it assigns — referenced, never restated.
- **`plan-research-program`** owns roadmap triage; Gate 1 (reuse-before-research) is the input it consults before funding a study.

## Sources

- Tomer Sharon — "Democratizing UX Research" / the *atomic research nugget* model (observation + tag + evidence)
- Nielsen Norman Group — "Research Repositories for Tracking UX Research and Growing Your ResearchOps": https://www.nngroup.com/articles/research-repositories/
- Nielsen Norman Group — "UX Research Cheat Sheet" (where synthesis outputs live): https://www.nngroup.com/articles/ux-research-cheat-sheet/
- Dovetail — insight/highlight/nugget model (industry reference for atomic research structure)
- ResearchOps Community — repository taxonomy and governance practice
