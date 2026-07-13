---
name: conduct-business-research
description: "Runs a desk/secondary research pass: anchor to a decision, inventory what internal and external sources already answer, grade every source on a quality ladder, and turn the unanswered remainder into a gap list that becomes the primary-research agenda. Use when starting discovery on a new market, domain, industry, or client space, BEFORE commissioning any primary research, or whenever the ask sounds like 'business research', 'market research', 'desk research', 'secondary research', 'research this space/industry', 'what does the market look like', 'what do we already know about X', or 'is there existing data on this'. Every external claim is handled per craft-critique's evidence protocol."
---

# Conduct Business Research

Desk/secondary research done as a discipline: find what is already answered before paying to answer it again, and convert what is NOT answered into the primary-research agenda. The gap list is the deliverable — the reading is not.

## When to use / when NOT to use

**Use when:**
- A project, discovery phase, or client engagement is starting and the market/domain is unfamiliar
- Anyone is about to plan primary research (interviews, surveys, tests) — this pass runs FIRST
- A strategy, pitch, case study, or recommendation needs external claims and none are cited yet
- The ask is a market scan, domain scan, industry overview, or "what's out there on X"

**Do NOT use for:**
- Tearing down competitor products or comparing their usability → `run-competitive-analysis` (this skill only records competitors as market facts, then hands off)
- Framing what problem to solve → `write-problem-statement` (run it first; its discovery goals seed the research questions here)
- Planning the primary study itself → `write-research-plan` and `choose-research-method` (they consume this skill's gap list)
- Sizing opportunities or picking which problem to attack → `identify-business-problems`
- Building the differentiation story → `position-product`
- Answers that live in a person's head, not a document → `conduct-stakeholder-interviews`
- Deep analytics interpretation or A/B design → `use-quantitative-evidence`

## The method

**Step 0 — Load `craft-critique`.** Every external claim this skill produces is handled per its evidence protocol (cite / get / flag). That protocol is defined there and only there — do not improvise a local version.

**Step 1 — Anchor to a decision.**
Write one sentence: *"This research informs [decision], made by [who], by [when]."*
- No decision named → no research. Push back and get one. Research without a decision anchor becomes the "black hole of interesting data" (NN/g's phrase) — collection with no action.
- Then write **3–5 research questions**: method-agnostic, answerable, each traceable to the decision. These are NOT search queries; they are the questions the decision needs answered. If `write-problem-statement` already produced discovery goals, derive the questions from those.

**Step 2 — Timebox the pass.**
Desk research is a bounded sweep, not a reading project. Default: **0.5–2 days** (NN/g industry data: most full discoveries run under 2 weeks — the desk pass is a fraction of that). Declare the timebox before opening the first source. Stop early at **saturation**: when new sources repeat what the inventory already holds.

**Step 3 — Inventory INTERNAL sources first.** Cheapest, most specific, most ignored:
- [ ] Prior research reports and study notes (check the research repository / archive first — NN/g atomic-research logic: past studies answer future questions)
- [ ] Analytics and product data already collected
- [ ] Support tickets, sales notes, client emails, CRM records
- [ ] Past decision records and archived workpacks
- [ ] Anything a teammate/client already wrote about this space

If an internal answer exists, the question is ANSWERED — do not re-research the known.

**Step 4 — Scan EXTERNAL sources down the quality ladder.** Start at Tier 1; only descend when a tier is exhausted for the question.

| Tier | Source type | Status in output |
|---|---|---|
| **1** | Primary data: government statistics, regulators, census, company financial filings, peer-reviewed studies | Citable as-is |
| **2** | Named-methodology industry research: established research firms, academic industry reports, NN/g-grade practitioner research | Citable with date + methodology noted |
| **3** | Journalism and trade press: named author, named outlet, dated | Citable for events/facts; opinions labeled as opinions |
| **4** | Vendor content, company blogs, SEO listicles, "State of X" marketing reports, social posts | **Leads only — never citations.** Use them to find the Tier 1–2 origin |

Scan rules:
- **Chase claims to origin.** If source B cites source A, cite A. If A cannot be found, the claim drops to the tier of B — or gets flagged.
- **Triangulate load-bearing claims.** Any claim the decision rests on needs **2+ independent sources** (independent = not tracing back to the same origin). A single-source load-bearing claim gets flagged per the evidence protocol.
- **Set a recency window** matched to the market's rate of change (AI products: ~12 months; regulated/slow industries: 2–3 years). Note the window in the output; stats outside it get flagged as stale.
- **Separate fact from opinion.** "Analyst predicts X by 2030" is an opinion about the future, never a market fact. Record it labeled as a prediction, with the predictor named.

**Step 5 — Extract into an evidence inventory.** Atomic findings — one claim per row, saved with enough context to be reused without re-reading the source:

| Claim | Source (linked) | Date | Tier | Status |
|---|---|---|---|---|
| one specific, checkable statement | origin source, not the article that quoted it | publication date | 1–4 | CITED / UNDER-EVIDENCED |

Then mark each research question: **ANSWERED / PARTIAL / OPEN**, pointing at its inventory rows.

**Step 6 — Build the gap list → primary-research agenda.** This is the payload. Every PARTIAL or OPEN question, plus every load-bearing claim still under-evidenced, becomes a gap entry:
- **Gap:** what exactly is unknown
- **Why it matters:** which decision breaks if this stays unknown
- **Cheapest way to close it:** named method (hand to `choose-research-method`; the agenda feeds `write-research-plan`)

A gap the decision doesn't need → cut it. Not every hole gets filled.

**Step 7 — Synthesize with a recommendation.** State what the evidence supports NOW, what it cannot support yet, and one recommended next action. A scan without a recommendation fails — presenting data without insight is not finished work.

## Worked example

*(Structure is the lesson — rows illustrate the discipline, not verified findings.)*

Context: designing a conversational shopping experience for voice-first commerce aimed at first-time internet users in India (his Amazon Echo Show concept project).

**Decision anchor:** "This research informs which shopping tasks the concept designs for first, decided by me, before concept exploration starts next week." Timebox: 1 day. Recency window: 24 months.

**Research questions:**
1. How do first-time internet users in India currently discover and buy products online?
2. What share of that population prefers voice/regional-language input over typed English?
3. What has already been tried in voice commerce there, and where did it stall?

**Evidence inventory (excerpt):**

| Claim | Source | Date | Tier | Status |
|---|---|---|---|---|
| Regional-language internet users outnumber English-language users in India | Telecom regulator annual report | 2025 | 1 | CITED |
| "Voice search is the primary input for next-billion users" | Vendor blog citing its own survey; original methodology not published | 2024 | 4 | UNDER-EVIDENCED — need a Tier 1–2 origin or own survey |
| Two major platforms launched, then scaled back, voice-shopping features | Trade press, named reporters, two independent outlets | 2024 | 3 | CITED (event fact) |

**Question status:** Q1 PARTIAL · Q2 OPEN (only Tier 4 sources found) · Q3 ANSWERED for "what was tried," OPEN for "why it stalled."

**Gap list → primary-research agenda:**
1. **Gap:** actual input-mode preference (voice vs. typed) among target users. **Why:** the core interaction model rests on it. **Close:** 6–8 user interviews with first-time internet users; hand to `write-research-plan`.
2. **Gap:** why prior voice-shopping efforts stalled. **Why:** avoids repeating a known failure. **Close:** teardown of the two scaled-back products via `run-competitive-analysis` + practitioner postmortems if published.

**Recommendation:** Evidence supports designing for regional-language-first users now (Q1/Tier 1). It does NOT yet support voice as the default input — that is the highest-risk assumption; close gap 1 before concept selection.

## Anti-patterns / red flags

- **Primary research before the desk pass.** Commissioning interviews to learn what a Tier 1 report already says is the exact waste this skill exists to prevent.
- **Citation laundering.** Five articles that all trace to one vendor press release counted as five sources. Independence means independent origins.
- **The scan as the deliverable.** A 30-source reading list with no gap list and no recommendation is homework, not research.
- **Market-size numbers pasted bare.** Any TAM/market-size figure without date + methodology + origin gets flagged, not repeated. Wildly divergent market-size numbers across sources is itself a finding.
- **Opinion laundered as fact.** Analyst predictions, founder quotes, and trend pieces recorded as market facts.
- **Internal context recycled as external evidence.** Synthesizing "the market wants X" from the team's own beliefs or prior positioning — the exact failure `craft-critique`'s protocol exists to stop.
- **No timebox.** "Still reading" past the declared window means saturation was never checked or the decision anchor was never real.
- **Tier 4 in the citations.** Vendor content may open a trail; it never ends one.
- **Filling every gap.** Gaps get closed in decision-priority order; a gap no decision needs gets cut, not scheduled.

## Output format

```markdown
## Desk Research — [decision it informs]

**Decision anchor:** [decision, decider, deadline]
**Timebox:** [declared] · **Recency window:** [window]

### Research questions
1. [question] — ANSWERED / PARTIAL / OPEN

### Evidence inventory
| Claim | Source (linked) | Date | Tier | Status |
|---|---|---|---|---|

### Gap list → primary-research agenda
1. **Gap:** … **Why it matters:** … **Cheapest close:** [method → hand to write-research-plan]

### What the evidence supports now
[Only CITED, triangulated claims]

### What it cannot support yet
[Under-evidenced items, named per craft-critique's protocol]

**Recommendation:** [one next action]
```

## Sources

- Secondary research in UX (desk research as the step before primary): https://www.nngroup.com/articles/secondary-research-in-ux/
- Discovery phase (problem-space research, evidence over opinion, discovery timeboxes): https://www.nngroup.com/articles/discovery-phase/
- Triangulation — 2+ methods/metrics on the same question, single-source claims are weak: https://www.nngroup.com/articles/triangulation-better-research-results-using-multiple-ux-methods/
- Analytics for UX — the "black hole of interesting data," decision-anchored measurement: https://www.nngroup.com/articles/analytics-user-experience/
- Research repositories (inventory internal knowledge before researching anew): https://www.nngroup.com/articles/research-repositories/
- Atomic research — one evidence-backed insight per item, saved for reuse: https://www.nngroup.com/videos/atomic-research-small-insights-big-impact/
- Competitive usability evaluations (the sibling this skill hands competitor work to): https://www.nngroup.com/articles/competitive-usability-evaluations/
- UX research plans (what the gap list feeds): https://www.nngroup.com/articles/pm-research-plan/

## Boundaries

- **`craft-critique`** is the single source of the evidence-discipline protocol. This skill applies it to every external claim; it never restates it.
- **`run-competitive-analysis`** owns competitor teardowns and competitive usability evaluation. This skill records "competitor X exists / launched / retreated" as market facts and hands deeper analysis off.
- **`write-problem-statement`** owns problem framing and runs before this skill; its discovery goals seed the research questions.
- **`write-research-plan`** and **`choose-research-method`** own primary research. This skill's gap list is their input — it never plans the study itself.
- **`identify-business-problems`** owns opportunity sizing, risk-reward quadrants, and milestone anchoring of what the research surfaces.
- **`conduct-stakeholder-interviews`** owns answers that live in people. Desk research inventories documents and data; when the trail ends at "ask the person who knows," hand off.
- **`use-quantitative-evidence`** owns analytics interpretation depth and A/B design; this skill only inventories analytics as an internal source.
