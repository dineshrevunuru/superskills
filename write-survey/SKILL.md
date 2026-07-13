---
name: write-survey
description: "Drafts and audits self-administered surveys using NN/g's 10 survey best practices: a per-question bias lint (acquiescence, social desirability, framing, prediction, double-barreled, unbalanced scales), Likert vs. semantic-differential scale construction, and a survey-type-to-design-cycle-stage match. Use when asked to 'write a survey', 'draft survey questions', 'make a questionnaire', 'add an in-app / NPS / CSAT / post-test survey', 'review my survey for bias', or when choosing a rating scale. Not for interview questions (write-interview-guide), recruiting screeners (write-participant-screener), choosing an ongoing metrics program (define-ux-success-metrics), or statistical analysis of results (use-quantitative-evidence)."
---

# Write Survey

Turn research questions into a short, bias-linted, correctly-scaled survey matched to the right design-cycle stage — one whose results can honestly claim what they claim.

## When to use / when NOT to use

**Use when:**
- A self-administered questionnaire is planned — email, in-app intercept, post-task, post-test, or panel
- An existing survey draft needs a bias audit (the Lint Catalog below works standalone)
- Choosing or constructing a rating scale (Likert vs. semantic differential, point count, labels)
- A stakeholder hands you "just ask users if they'd pay for it" and it must become something researchable

**Do NOT use when:**
- You haven't decided a survey is the right method → `choose-research-method`. Sanity gate here: a survey measures **attitudes and self-reported behavior at scale**. It cannot observe what people actually do, and it cannot explain why. If the question is "why" or "can they", a survey is the wrong tool.
- No research questions exist yet → `write-research-plan`; research questions are this skill's INPUT
- The instrument is read aloud by a moderator → `write-interview-guide` (its Lint Catalog owns interview questions)
- The questionnaire's job is deciding who qualifies for a study → `write-participant-screener` (screeners use intent-masking; surveys never do)
- You're choosing which standardized metric to track quarter over quarter → `define-ux-success-metrics`
- The survey ran and you need sample-size, significance, or claim-strength judgment → `use-quantitative-evidence`

## Step 1 — Match survey type to design-cycle stage

Pick the type FIRST — it fixes deployment, length budget, and what the results may claim. (Stages per NN/g's Discover → Explore → Test → Listen cycle.)

| Stage | Survey type | Deploy | Can claim | Cannot claim |
|---|---|---|---|---|
| Discover | **Discovery survey** — behavior frequency, channels, top tasks | Email to existing users / panel | Prevalence of self-reported behavior & attitudes | Why; actual behavior |
| Discover | **Stakeholder survey** — goals, success definitions, worries | Internal email | Where the org agrees/disagrees | User truth of any kind |
| Discover–Explore | **Competitor-customer survey** | Panel of competitor users | Perceptions of alternatives | Feature-level usability |
| Explore | **Diary-study companion** — repeated micro check-ins | Scheduled prompts during diary study | Change over time in self-report | Moment-level causation |
| Explore | **Statistical-persona survey** — attitudinal/behavioral items for clustering | Large-n panel | Segment structure (given big n) | Anything at small n |
| Test | **Post-task: SEQ** — 1 item, 7-point, immediately after each task | In-session | Perceived per-task difficulty | Overall product quality |
| Test | **Post-test: SUS** — 10 items, verbatim | End of session | Benchmarkable perceived usability | Which screen caused it |
| Listen | **NPS (0–10) / CSAT (5-pt) / CES (1–7)** | Recurring email or in-app | Trend against own baseline | Diagnosis of any kind |
| Listen | **Intercept / custom listening** — 1–3 questions in context | In-app, at the moment of the experience | Reaction to THIS experience, now | Generalization beyond that moment |

Rules that ride on the table:
- **Standardized instruments ship verbatim.** SEQ, SUS, NPS, CSAT, CES exist so scores are comparable. Reworded SUS is not SUS — the benchmark claim dies. (SUS's alternating positive/negative items are the deliberate exception to the mixed-polarity ban below; that's another reason not to touch it.)
- **Intercept surveys are 1–3 questions.** Anything longer belongs in email.
- **One survey, one stage.** A "discovery + satisfaction + pricing" survey answers none of them well — split or cut.

## Step 2 — Draft under the NN/g 10 best practices

Every question obeys all ten. These are drafting constraints, not review niceties:

1. **Ask only what a survey can measure** — attitudes and self-reported past/current behavior. Never ability, never "why".
2. **Neutral, natural, clear language** — no jargon, no loaded words, reading level of a text message.
3. **Never ask respondents to predict behavior** — no "would you use", "how likely are you to", "how much would you pay". People cannot predict themselves; answers are noise.
4. **Closed-ended questions carry the survey** — at most 1–2 open-text fields, optional, at the end. Open text at scale is an analysis tax you pay later.
5. **No double-barreled questions** — one askable per question.
6. **Balanced scales** — symmetric positive/negative anchors around a midpoint.
7. **Option sets are exhaustive and mutually exclusive** — "Other (describe)" and "None of these" close the gaps; ranges never overlap.
8. **Provide an opt-out** — "Prefer not to say" on anything personal; "Not applicable" where it can be.
9. **Most questions optional** — required-everything produces straightlining, not data.
10. **Respect respondents** — state length honestly up front, target ≤5 minutes, thank them, never dark-pattern the intercept dismiss button.

Question-count budget: every question must map to a research question AND to a decision it informs. **If no decision changes based on the answer, the question is cut** — "interesting to know" is how surveys bloat past the abandon point.

## Step 3 — Construct the scales

### Likert vs. semantic differential — decide per construct

| You are measuring… | Use | Shape |
|---|---|---|
| Perceived quality of a thing along a dimension (easy↔difficult, cluttered↔clean, slow↔fast) | **Semantic differential** (default) | Bipolar adjective pair at the ends, 7 points, rate the OBJECT directly |
| Agreement with a genuine attitude statement that can't be phrased as a bipolar pair | **Likert** | Statement + Strongly disagree → Strongly agree, 5 or 7 points |
| Anything a standardized instrument already covers | **The instrument, verbatim** | SEQ / SUS / NPS / CSAT / CES |

Prefer semantic differential when both work: with no statement to agree with, it structurally reduces **acquiescence bias** (the yes-saying tendency) and **social-desirability bias**. A battery of "agree/disagree" statements is a bias generator.

### Construction rules (both scale types)

- **Balanced anchors, always**: "How satisfied or dissatisfied…", never "How satisfied…". One-sided stems are framing bias baked into the sentence.
- **Odd point count** (5 or 7) so a true neutral exists. Forced-choice even scales need a written justification.
- **Label at minimum both endpoints**; label every point on 5-point scales. Unlabeled numbers mean different things to different respondents.
- **Never mix positive- and negative-keyed statements in one custom battery.** Mixed polarity confuses respondents and produces reverse-coding errors at analysis time. (SUS does it by design; that's SUS's problem to have, verbatim.)
- **Keep scale direction consistent across the whole survey** — if 7 is "best" once, 7 is "best" everywhere.
- **Anchor to a real event where possible**: "…your most recent booking" beats "…in general". Memory of a specific instance beats a self-generated average.

## Step 4 — The per-question bias audit (Lint Catalog)

Run EVERY question through all ten rules before pilot. One violation = rewrite, not exception. This S-catalog is the survey-specific **instance** of `name-and-control-bias` — the general named-bias/control mapping lives there and wins on conflict; S1–S10 below are its instrument biases specialized to self-administered items with per-question detects and rewrites.

| # | Bias / violation | Detect | Rewrite pattern |
|---|---|---|---|
| S1 | **Acquiescence** | Agree/disagree statement format, especially in batteries | Convert to semantic differential or a direct two-sided question ("How easy or difficult was…") |
| S2 | **Social desirability** | Question touches self-image: money, hygiene, compliance, effort, "do you read the…" | Normalize the premise ("Some people skip X — how often do you…"), make it optional, add "Prefer not to say", state anonymity |
| S3 | **Framing / leading** | One-sided stem, embedded premise, loaded adjective ("How much do you love the new design?") | Strip the premise; two-sided neutral stem ("How satisfied or dissatisfied are you with…") |
| S4 | **Double-barreled** | "and"/"or" joins two judgments ("easy and fast") | Split; keep both halves only if both map to a research question |
| S5 | **Prediction / hypothetical** | "Would you", "how likely are you to", "how much would you pay" | Ask past/current behavior ("In the past 3 months, have you paid for…") or cut. Any surviving stated-intent item is reported per `craft-critique`'s evidence protocol: flagged under-evidenced, never as demand |
| S6 | **Unbalanced scale** | More positive than negative options (Excellent / Very good / Good / Fair / Poor) | Symmetric anchors around neutral (Very poor → Very good) |
| S7 | **Non-exhaustive / overlapping options** | No "Other"/"None"; ranges like 1–5, 5–10 | Add "Other (describe)" + "None of these"; make ranges exclusive (1–4, 5–9) |
| S8 | **Missing opt-out** | Personal question with no escape, or required | "Prefer not to say" / "Not applicable"; default to optional |
| S9 | **Order effects (primacy/recency)** | Long option lists in fixed order; earlier questions priming later ones | Randomize option order where order isn't inherent (never randomize scale points); ask general before specific |
| S10 | **Fatigue / random response** | >5 min, grid batteries, everything required | Cut to the decision-mapped questions; break grids apart; most questions optional |

## Step 5 — Assemble and pilot

Order: intro (honest length + purpose + anonymity) → easy behavioral questions → scaled attitude questions → optional open text → optional demographics LAST (demographics first = drop-off and priming) → thanks.

**Pilot = soft launch.** Send to a handful of real respondents (or ~5–10% of the list) before the full send. Check: actual completion time vs. promised, where drop-off happens, straightlining in grids, open-text answers that reveal a misread question. Fix, note changes, then launch. A survey is typo-locked at send — unlike an interview, there is no moderator to repair a bad question live. **No survey is done until it has been soft-launched.**

## Worked example — in-app listening survey, audited

Context (example study): a salon's native booking app is in beta; a short in-app survey after a completed booking. Stakeholder's draft, then the audit, then the ship version.

**Draft as received:**
1. Don't you agree the new app makes booking easier and faster?
2. How much would you pay for premium booking features?
3. How would you rate the app? Excellent / Very good / Good / Fair
4. What is your household income? (required)
5. Which features have you used? ▢ Booking ▢ Rebooking ▢ Reminders

**Audit:**

| Q | Violations | Call |
|---|---|---|
| 1 | S1 (agree format), S3 (leading premise "new app makes"), S4 (easier AND faster) | Rewrite as two semantic differentials |
| 2 | S5 (prediction — pricing fiction) | Replace with past behavior; intent claim would be flagged per `craft-critique` |
| 3 | S6 (4 positive-leaning options, 1 negative) | Balanced 5-point |
| 4 | S2 (sensitive), S8 (required, no opt-out) — and it maps to no decision | Cut entirely |
| 5 | S7 (no "None", no "Other") | Add both |

**Ship version (≤2 minutes, all questions optional):**

```markdown
Quick 4-question survey about the booking you just made — about 1 minute,
anonymous, skip anything you like.

1. How difficult or easy was booking this appointment in the app?
   Very difficult 1 · 2 · 3 · 4 · 5 · 6 · 7 Very easy          [SEQ-style, event-anchored]

2. How slow or fast did booking this appointment feel?
   Very slow 1 · 2 · 3 · 4 · 5 · 6 · 7 Very fast

3. Which of these have you used in the app? (select all that apply)
   ▢ Booking  ▢ Rebooking  ▢ Reminders  ▢ Other: ____  ▢ None of these
   [option order randomized except "Other"/"None", which stay last]

4. Anything about booking in the app you'd change? (optional)
   [open text]

Thanks — this helps us improve booking for everyone.
```

Note what the audit did: the stakeholder's two most natural questions (Q1, Q2) were the two worst offenders, and the pricing question died entirely — the honest substitute is behavioral data or a flagged-as-under-evidenced intent item, never a confident demand claim.

## Anti-patterns / red flags

- **The kitchen-sink survey.** Discovery + satisfaction + pricing + demographics in one send. Each extra goal taxes every other goal's data quality. One survey, one stage, one decision set.
- **Agree/disagree batteries as the default instrument.** Likert grids are the path of least resistance and the largest acquiescence surface. Semantic differential first; Likert only when the construct truly is agreement.
- **Modifying SUS/SEQ/NPS wording "to fit our product".** The moment you reword, you lose the only thing a standardized instrument buys you — comparability. Verbatim or custom, never in between.
- **"Would you use / would you pay" anywhere.** Stated intent is polite fiction. If the stakeholder insists, the item ships with an under-evidenced flag on its results per `craft-critique` — it is never reported as demand.
- **Required demographics up front.** Highest-sensitivity, lowest-decision-value questions in the highest-drop-off position. Optional, last, with opt-outs — or cut.
- **Treating survey results as behavior.** Surveys capture what people SAY at scale. Where the say/do gap matters, pair with analytics or usability testing and say so in the report header.
- **Skipping the soft launch because "it's only five questions".** Every survey reads fine to its author. The soft launch is where the misread question, the broken skip logic, and the 9-minute "3-minute survey" get caught.
- **Reporting percentages from tiny or self-selected samples.** Drafting ends here; whether n supports the claim is `use-quantitative-evidence`'s call — route the analysis there, don't eyeball it.

## Output format

Deliver the survey as one markdown file:

1. **Header** — study name, design-cycle stage + survey type (from the Step 1 table), deployment channel, target length in minutes, sample plan, and one line: "results support claims about ___ and cannot support claims about ___"
2. **Intro copy** — honest length, purpose, anonymity/privacy line
3. **Questions** — numbered, each tagged with type (semantic differential / Likert / multi-select / standardized-instrument name / open text), scale shape, required/optional, randomization notes
4. **Bias audit table** — every question × S1–S10, showing pass or the rewrite that fixed it
5. **Pilot notes** — soft-launch findings and what changed

## Sources

- NN/g, 10 Survey Best Practices (the 10 drafting rules): https://www.nngroup.com/articles/survey-best-practices/
- NN/g, Rating Scales (Likert vs. semantic differential, labeling, balance): https://www.nngroup.com/articles/rating-scales/
- NN/g, Surveys Throughout the Design Cycle (survey-type table): https://www.nngroup.com/articles/surveys-design-cycle/
- NN/g, 10 Survey Challenges and mitigations: https://www.nngroup.com/articles/10-survey-challenges/
- NN/g, Survey Response Biases (acquiescence, social desirability, recency, framing, random response, unbalanced scale): https://www.nngroup.com/videos/survey-response-biases/
- NN/g, UX Research Cheat Sheet (the Discover → Explore → Test → Listen cycle the Step 1 table maps types onto): https://www.nngroup.com/articles/ux-research-cheat-sheet/
- NN/g, When to Use Which UX Research Method (attitudinal × quant framing; method landscape): https://www.nngroup.com/articles/which-ux-research-methods/

## Boundaries

- **write-research-plan** owns research questions — they arrive here as input; every survey question maps back to one.
- **choose-research-method** owns whether a survey is the right method at all; this skill's gate ("attitudes + self-report at scale, never why, never can-they") is a tripwire, not a substitute.
- **write-interview-guide** owns moderator-read questions and its own lint catalog; this skill's Lint Catalog governs self-administered items only.
- **write-participant-screener** owns qualification questionnaires — screeners select people and use intent-masking; surveys measure people and never mask.
- **define-ux-success-metrics** owns choosing SUS/SEQ/NPS/CSAT/HEART as an ongoing metrics program and benchmarking waves; this skill owns constructing and administering the instrument correctly inside one study.
- **use-quantitative-evidence** owns analysis after fielding: sample size, significance, and which claims the n supports.
- **synthesize-research-data** owns what happens to open-text responses after collection.
- **name-and-control-bias** is the canonical source of truth for named biases and their controls; the Step 4 Lint Catalog (S1–S10) is its survey-specific instance — the self-administered detects and rewrites live here, the general bias-control mapping lives there.
- **craft-critique** owns the evidence-discipline protocol invoked for stated-intent items (S5) — referenced, never restated here.
