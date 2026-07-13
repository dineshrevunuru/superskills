---
name: synthesize-research-data
description: "Situational orchestrator that turns raw qualitative (and mixed qual+quant) research — interview transcripts, field notes, diary entries, open survey text, session recordings — into traceable themes, calibrated insights, user need statements, and How-Might-We questions. Reads the DECISION + data type + problem, then SELECTS a synthesis approach from a menu (thematic coding · affinity · framework-mapping to JTBD/journey/matrix · mixed qual+quant) instead of marching one fixed pipeline — while enforcing the same rigor constants every time (traceability, a mandatory disconfirming-case hunt, prevalence as X of Y never a bare %, a confidence level per finding, negative cases reported). Use when the ask is 'synthesize the research', 'what did we learn from the interviews', 'affinity map these notes', 'code these transcripts', 'turn this data into insights/findings', 'map this to jobs-to-be-done / the journey', 'write need statements', or 'write HMW questions'. Owns the Define-stage outputs (need statements + HMWs). NOT for usability-test findings + severity (analyze-usability-data), persona/JTBD artifacts (build-personas), journey/empathy maps (map-customer-journey), or statistical claims from large samples (use-quantitative-evidence)."
---

# Synthesize Research Data

Turn a pile of raw data into findings a team can trust and Define-stage statements a team can design from — without laundering a vivid quote into a "finding."

There is no fixed 5-phase pipeline here. Synthesis is **situational**: the right approach depends on the decision you're feeding, the data you have, and the problem's shape. This file reads those three, routes you to the approach that fits, and holds you to the rigor constants that never change. Deep how-to for each approach lives in `references/` and is loaded on demand.

## When to use / when NOT to use

| Situation | Skill |
|---|---|
| Interviews, field notes, diary entries, open survey text, recordings → themes + insights | **This skill** |
| Qual themes + a survey's rates / analytics on the same question → one blended read | **This skill** (mixed-methods module) |
| Insights → user need statements and How-Might-We questions | **This skill** (owned here; not a separate skill) |
| Usability-test sessions → findings + Nielsen 0–4 severity | `analyze-usability-data` |
| Population %s, A/B winners, "is this significant" | `use-quantitative-evidence` |
| Synthesized attributes → personas / JTBD artifact | `build-personas` (downstream) |
| Journey map / empathy map | `map-customer-journey` (downstream) |
| One scoping problem statement to frame a discovery | `write-problem-statement` |
| Ideation/concepts after an HMW | `explore-divergent-concepts` |

**Prerequisite:** raw data exists. No data = nothing to synthesize; route to `write-research-plan`. This skill cannot run on opinions.

## Two modes (declare which you're in)

- **Scrappy fast path** — a handful of sessions, low-stakes or time-boxed freelance work. Atomize → one coding pass → framework-map or cluster → insights with counts → the disconfirming hunt is still mandatory but lighter (one deliberate counter-search per theme). Skip the incubation break only by saying the tradeoff out loud.
- **Full traceable analysis** — anything that gates a client, launch, or external claim. Every constant below at full weight: two coders / fresh-eyes pass, incubation break, per-theme disconfirming hunt, nugget-level traceability, confidence per finding, triangulation for load-bearing claims.

Both modes obey the same constants. Mode changes the *effort*, never the *rules*.

## The rigor constants (the spine — these never vary)

Whatever approach you pick below, all seven hold. This is what makes the output defensible instead of a decorated opinion.

1. **Traceability.** Every insight = an **observation** + a **tag/theme** + a **source** (participant id + where/when it was said/done). A second researcher must be able to walk from any claim back to the raw moment. No source tag → no evidence count → the note is unusable. Full nugget format + where nuggets go: `references/traceability-and-nuggets.md` (they hand off to `build-research-repository`).
2. **The disconfirming-case hunt is MANDATORY** before any theme is accepted. Before you write a theme, actively search the corpus for what would *break* it — the participants who did the opposite, the sessions you're ignoring. A theme that survived a real counter-search is a finding; one that was never challenged is a guess. This is the #1 defense against the cherry-pick. Technique: `references/disconfirming-cases.md`. (The bias it kills — analyst confirmation — is named in `name-and-control-bias`; this skill is where the control runs.)
3. **Prevalence as "X of Y participants," never a bare %.** "6 of 8," not "75% of users." A qualitative sample licenses *existence and texture* claims, not *prevalence rates*. Percenting qual data is the over-claim `craft-critique` and `name-and-control-bias` exist to stop.
4. **A confidence level (High / Med / Low) on every finding** — set by triangulation and prevalence, not by how vivid the quote was. Rubric in Step 3.
5. **Negative and outlier cases are reported, not deleted.** The participant who breaks the pattern goes in the deck, tagged. Reporting only convergence is how synthesis lies by omission.
6. **The observation → inference → recommendation ladder is three distinct layers.** Never collapse them. "P3 re-read the confirmation screen 3×" (observation) ≠ "P3 distrusted the auto-booking" (inference) ≠ "add an explicit confirm step" (recommendation). Label which layer you're on; a recommendation with no inference under it, or an inference with no observation under it, is unfounded.
7. **Findings are framed as NEEDS, and each recommendation ties to a DECISION + a METRIC.** A finding says what the user needs (a goal), not what to build. Every recommendation names the decision it informs and the metric that would move if you act — Dinesh's business-connected edge. "Recommend X" with no decision and no metric attached is research theater.

## Step 0 — Intake / triage (do this before choosing an approach)

Answer three questions in one or two lines each. They pick the approach for you.

1. **Decision.** What decision does this synthesis feed, and *what finding would change it*? (Decision-first. If nothing you could find would change any decision, stop — this is research theater, not synthesis.)
2. **Data.** What do you actually have? Interviews / field / diary / open-ended survey text / recordings — and is there any **quant** on the same question (survey rates, analytics, task metrics)?
3. **Problem shape.** Is the question *"why do they hire this / what job is it doing"* (→ JTBD), *"where does it break across the end-to-end experience"* (→ journey), *"how do options trade off"* (→ matrix), or *open/exploratory with no obvious frame* (→ let themes emerge)?

## Step 1 — Atomize the raw material (every approach shares this)

Break every source into atomic observations BEFORE any grouping:

- **One observation per note.** "Struggled to find prices AND didn't trust the photos" = two notes.
- **Observation, not interpretation.** Record what was seen/said, not what it means. "P3 re-read the confirmation screen three times" — not "P3 was confused."
- **Verbatim where it matters.** Keep striking quotes word-for-word, in quotation marks.
- **Source-tag every note** — participant id + source type + where/when (P4 · interview · 12:31 / P4 · diary · day 3). No tag = no evidence count later.
- **Label `[said]` vs `[did]`.** Contradictions between the two are findings, not noise.

## Step 2 — Pick the synthesis approach (menu + selection logic)

You are not obligated to run all of these. Pick the one that fits Step 0. **Default:** if the decision maps cleanly to a scaffold, use **framework-mapping** (Dinesh's signature — synthesis that lands directly in a JTBD / journey / matrix the team already reasons in). If it doesn't, or the space is genuinely open, run **thematic coding** to let themes emerge, then map the survivors onto whatever frame the decision needs. When truly unsure, thematic coding is the safe general default — it always runs.

| Approach | Pick it when | Module |
|---|---|---|
| **Framework-mapping** *(default when a frame fits)* | The decision maps to a scaffold: "what job is it hired for" (JTBD), "where does the end-to-end break" (journey), "how do options trade off" (2×2 / matrix). Fastest path to a decision-ready artifact. | `references/framework-mapping.md` |
| **Thematic coding** | Large or solo corpus (5+ transcripts), open/exploratory question, traceability to quotes is the priority, no obvious frame yet. The safe general default. | `references/thematic-coding.md` |
| **Affinity diagramming** | A *team* needs shared ownership/buy-in; ≤ ~200 observations; you can get people in a room (or a shared board). | `references/affinity-diagramming.md` |
| **Mixed qual+quant** | You have quant on the same question (survey rates, analytics, task metrics) and need one blended read with triangulated confidence — not two disconnected decks. | `references/mixed-methods-synthesis.md` |

These combine. High-stakes synthesis often runs thematic coding *and* framework-mapping (themes emerge, then map to the scaffold), or affinity for the team pass *and* coding to verify the evidence counts. Whatever the mix, the constants in the spine run underneath all of them.

## Step 3 — Apply the approach with the ladder, confidence, and the disconfirming gate

For every candidate theme the chosen approach surfaces:

1. **Walk the ladder.** Keep observation, inference, and recommendation as three separate lines (constant 6).
2. **Run the disconfirming hunt** (constant 2). Search for the counter-cases *before* accepting the theme. If the counter-search overturns it, the theme is the counter-finding — not the thing you started with. See `references/disconfirming-cases.md`.
3. **Count prevalence** as *X of Y*, across how many source types (constant 3).
4. **Set confidence:**

```
High  = triangulated (≥2 methods/source types agree) AND ≥ half of participants AND survived the disconfirming hunt
Med   = passes candidacy (recurs across ≥3 participants) but single-source, or < half, or thin counter-evidence exists
Low   = below candidacy / n=1 / only vivid-quote support — keep as a signal to watch, NEVER as a headline or a ship gate
```

Claim calibration itself is governed by `craft-critique`'s evidence protocol — apply it, don't restate it. Then write each surviving theme as an **insight**:

```
INSIGHT: [pattern] + [why it matters for the specific decision at hand]
Evidence: [X of Y participants] · [source types] · [1–2 verbatim quotes with source tags]
Confidence: High / Med / Low
Counter-cases: [who broke the pattern, and why it still holds — or where it doesn't]
Decision it informs: [the Step-0 decision] · Metric that would move: [the measure that changes if we act]
```

## Step 4 — Define-stage outputs (owned by this skill)

Synthesis isn't done at insights — it's done when the team can ideate. Produce both from the **High/Med** insights (never build Define-stage outputs on a Low finding).

### 4a. User need statements — `[user] needs [verb-phrase goal] because [insight from the research]`

Lint each: **need is a verb/goal, never a noun/feature** ("needs a comparison table" ✗ → "needs to weigh two stylists before committing" ✓) · **the "because" is a finding, not the need restated** (circular = fail) · **traceable** to a named theme + its count · **generative test** — the team can imagine ≥3 different solutions (exactly one imaginable solution = a feature request in disguise) · **user is specific** ("first-time client with textured hair"), not "users."

### 4b. How-Might-We questions — 1–3 per need statement, at the right altitude

Grammar: **HMW + [help/enable/let] + [specific user] + [achieve outcome] + [in context]?** Lint each: traceable to a need statement (write `← NS2`) · names **no** UI component, screen, or technology · broad enough to generate ≥5 visibly different directions, narrow enough to *reject* some ideas · framed toward the desired outcome, not the pain restated ("HMW reduce confusion" is the pain with a "?" stapled on).

## Worked example — catching a cherry-picked theme (booking-app chatbot)

**The tempting synthesis (what a rushed pass produces).** Reviewing beta transcripts for a shipped salon-booking chatbot, a synthesizer lands on this quote from P2: *"I love that it just books the whole thing for me — I don't even have to think."* Vivid, quotable, flattering to the auto-booking feature. It becomes a headline theme: **"Users love the AI auto-booking."** Recommendation: expand auto-booking, remove the confirmation step.

**Now run the constants. It collapses.**

- **Disconfirming hunt (constant 2):** deliberately search the corpus for people who did *not* love auto-booking. P5 re-read the confirmation screen three times before trusting it. P7 said *"wait — did it actually book, or is it just asking?"* P9 backed out and re-did the booking manually to be sure. P3 asked whether she could undo it. That is four sessions the headline ignored.
- **Ladder (constant 6):** P2's *observation* is one enthusiastic line. The *inference* "users love auto-booking" was smuggled in as if it were the observation. The counter-sessions carry a different inference entirely: users want the automation **but need a visible confirm-and-undo before they trust it to act.**
- **Prevalence (constant 3):** "love it, remove the confirm step" = **2 of 11** beta testers (illustrative count). "Want a clear confirm/undo before it commits" = **6 of 11**, across interview `[said]` and observed `[did]`.
- **Confidence (constant 4):** the original headline is **Low** (n=2, single-source, vivid-quote only) — not a ship gate. The corrected theme is **High** (6 of 11, said + did, survived the hunt).

**Corrected finding, framed as a need (constant 7):**

```
INSIGHT: Users want the chatbot to do the work but will not trust it to commit
         a booking silently — the missing beat is a visible confirm + undo.
Evidence: 6 of 11 beta testers · interview[said] + observed[did] · High
Counter-cases: P2 wanted zero friction (1 of 11) — real, but a minority; note, don't design for it alone.
Decision it informs: ship silent auto-book vs. auto-book-with-confirm-step
Metric that would move: booking-completion / abandonment on the confirm interaction

NEED (NS1): A first-time client using the chatbot needs to confirm and be able to
undo an action before it commits, because a silent booking they didn't verify made
them distrust whether it happened at all.

HMW (← NS1): HMW let a first-time client feel certain the chatbot did exactly what
they intended — with a way back — at the moment it acts on their behalf?
```

**What the constants caught:** a Low-confidence n=2 quote had been about to gate a ship decision toward *removing* the exact safeguard 6 of 11 users needed. No percentage was invented, no vivid quote became the evidence, the counter-cases were reported not buried, and the recommendation now points at a real decision and a real metric.

## Anti-patterns

| Don't | Do |
|---|---|
| Run one fixed pipeline regardless of the decision or data | Triage (Step 0) → pick the approach that fits → constants underneath |
| Accept a theme because a quote is vivid | Run the disconfirming hunt first; the counter-search decides |
| Cluster interpretations ("P3 was confused") | Cluster observations; interpret at the theme level |
| "75% of users want X" from 8 interviews | "6 of 8 participants" — counts, never percentages |
| Delete the participant who breaks the pattern | Report negative/outlier cases, tagged |
| Collapse observation, inference, and recommendation into one sentence | Keep the three ladder layers distinct and labeled |
| A finding that names a feature ("users need a filter") | A need that names a goal; run the ≥3-solutions test |
| "Recommend X" floating with no decision or metric | Tie every recommendation to the decision it informs + the metric that moves |
| Skip incubation to ship faster and say nothing | Take the break; or state the tradeoff out loud (scrappy mode) |
| One person synthesizes, team receives a PDF | Second coder / fresh-eyes pass (full mode) or a team wall (affinity) |
| Build a persona/journey/HMW on a Low finding | Define-stage outputs come only from High/Med insights |

## Output format

```markdown
# Synthesis: [study] — [date]
Decision this feeds: [Step-0 decision + what finding would change it]
Data: [n participants · source types · quant present? · total atomized observations]
Approach: [framework-mapping / thematic coding / affinity / mixed] · Mode: [scrappy / full]

## Themes           (full-sentence claims, not topic nouns)
| # | Theme | Evidence (X of Y · sources) | Confidence | Counter-cases | Quotes |

## Outliers & contradictions   [n=1 patterns to watch · say-vs-do conflicts]

## Insights          [per Step 3 block — ladder, evidence, confidence, decision + metric]

## Need statements   NS1: [user] needs [verb goal] because [insight]   (← Theme #)

## How-Might-We      HMW1: …?   (← NS#)

## What this data cannot answer   [named gaps → next research question]
```

The "cannot answer" section is mandatory — it is what keeps synthesis honest about the edge of its evidence.

## Sources

- Thematic analysis (6 steps, codes vs. themes): https://www.nngroup.com/articles/thematic-analysis/
- Affinity diagramming method: https://www.nngroup.com/articles/affinity-diagram/
- Affinity diagramming pitfalls: https://www.nngroup.com/articles/affinity-diagramming-pitfalls/
- Confirmation bias in UX (why the disconfirming hunt is a control): https://www.nngroup.com/articles/confirmation-bias-ux/
- User need statements: https://www.nngroup.com/articles/user-need-statements/
- How-Might-We questions: https://www.nngroup.com/articles/how-might-we-questions/
- Triangulation across methods: https://www.nngroup.com/articles/triangulation-better-research-results-using-multiple-ux-methods/
- Atomic research / nuggets: https://www.nngroup.com/videos/atomic-research-small-insights-big-impact/
- Research repositories: https://www.nngroup.com/articles/research-repositories/
- Discovery framing (where Define-stage outputs land): https://www.nngroup.com/articles/discovery-phase/

## Boundaries

- **This skill owns need statements + HMW questions** as its Define-stage output — not a separate skill. Anything downstream of an HMW (ideation, concepts) belongs to `explore-divergent-concepts`.
- `name-and-control-bias` is the canonical source for the biases this skill's disconfirming hunt controls (analyst confirmation, cherry-picking, anchoring, recency); load it before trusting a finding. This skill runs the *control*, it does not restate the bias catalog.
- `craft-critique` owns the evidence-discipline protocol and claim-strength calibration; this skill applies it and never restates it.
- `build-research-repository` owns where atomic nuggets live and their tagging taxonomy; this skill produces nuggets in the traceable format and hands them off.
- `govern-research-ethics` owns consent, PII handling, and retention; synthesis keeps verbatim quotes pseudonymous (participant ids, never names) and defers any identifiable-data question there.
- `use-quantitative-evidence` owns statistical claims, A/B, and population %s; the mixed-methods module blends *with* quant but sends significance/CI questions there.
- `analyze-usability-data` owns usability-session analysis + Nielsen 0–4 severity; send test-session data there.
- `build-personas` and `map-customer-journey` consume this skill's themes and own their artifacts.
- `write-problem-statement` owns the single scoping problem statement; this skill feeds it evidence.
