---
name: analyze-usability-data
description: "Turns raw usability-test data (session notes, recordings, task outcomes) into prioritized, severity-rated findings using NN/g's 4-step analysis flow, a 6-dimension data-quality filter, and Nielsen's 0–4 severity scale (frequency × impact × persistence). This skill is the CANONICAL HOME of the severity scale — run-heuristic-evaluation and audit-accessibility rate their findings through it. Use when a usability test has been run and someone asks to 'analyze the usability data', 'what did we learn from testing', 'write up the findings', 'how bad is this issue', 'rate the severity', or 'prioritize these usability problems'. NOT for synthesizing generative interviews (synthesize-research-data) or statistical claims from large samples (use-quantitative-evidence)."
---

# Analyze Usability Data

Convert raw session data into a prioritized findings list a team can act on — patterns over anecdotes, behavior over opinion, severity over vibes.

## When to use / when NOT to use

**Use when:**
- Usability-test sessions are done and you have notes, recordings, or task outcomes to make sense of
- Anyone asks "what did testing tell us?", "which issues do we fix first?", or "how severe is this?"
- A heuristic evaluation or accessibility audit needs its findings severity-rated (they use THIS skill's scale)

**Do NOT use when:**
- The data is generative/exploratory (discovery interviews, field studies, diary studies) → `synthesize-research-data` owns thematic analysis of that
- You need statistical claims, A/B reads, or population metrics (n ≈ 40+) → `use-quantitative-evidence`
- You are still running sessions → `moderate-usability-session` owns in-session capture
- You need to choose or score SUS/SEQ instruments → `define-ux-success-metrics`
- You are building the readout deck/report for stakeholders → produce findings here, then hand to `present-and-defend-work`

## Inputs gate (check before starting)

- [ ] The study's research questions (from the test plan) — analysis without them drifts into opinion
- [ ] Session notes, atomic where possible (one observation per note, tagged participant + task)
- [ ] Task outcome per participant per task: success / partial / fail / abandoned
- [ ] Recordings, if notes are thin (salvage missing observations from playback)
- [ ] Participant profiles (to check the appropriateness dimension below)

Missing research questions? Reconstruct them from the test plan or ask — do not invent them post hoc to fit the data.

## The method — 4 steps (NN/g)

### Step 1 — Collect the relevant data points
1. Pool every observation from all sessions into one place (spreadsheet or board).
2. Keep notes atomic: one observation per row. Split compound notes.
3. Tag each row: participant, task, type (behavior / quote / task outcome / error), and timestamp if from recording.
4. Keep **observation** and **interpretation** in separate columns. "P3 scrolled past the CTA twice" is observation; "the CTA lacks contrast" is interpretation.
5. Run the **data-quality filter** (next section) on every row. Discard confounds, downgrade weak rows — before clustering, so noise never becomes a theme.

### Step 2 — Cluster into candidate issues
1. Affinity-group observations **across participants**, never session-by-session. A pattern is something ≥2 participants hit, or one participant hit severely.
2. Group by user behavior/intent ("couldn't find where to pick a stylist"), not by screen alone — one screen can hide three distinct issues.
3. Name each cluster as a candidate issue in problem language, not solution language.
4. Single-data-point clusters stay in an **Open Questions** bucket — not findings yet — unless the impact was severe (task failure, real-world harm).

### Step 3 — Interpret against the research questions
1. For each cluster answer: What happened? Why (grounded in an observed cause — a misread label, a missed control — not speculation)? Which research question does it inform?
2. When what people SAID conflicts with what they DID, the behavior wins. Log the quote, trust the click.
3. Label any causal explanation you cannot ground in an observation as *speculation* — it may motivate a follow-up test, never a recommendation.
4. Also collect **what worked**: behavior-backed positives. This protects working design from being redesigned.
5. Claims about anything external to the sessions (market, "users in general", best practice) are handled per `craft-critique`'s evidence-discipline protocol — load that skill before writing any such claim.

### Step 4 — Prioritize with severity
1. Rate every finding on the Nielsen 0–4 scale (section below). Show the frequency/impact/persistence reasoning in one line.
2. Order the findings list by severity, then by effort-to-fix if severities tie.
3. Anything rated 0 leaves the findings list entirely.

## Data-quality filter — 6 dimensions (NN/g)

Run each observation through this table. When in doubt, downgrade — a weak data point that becomes a theme misleads the whole team.

| Dimension | Ask | Action |
|---|---|---|
| **Authenticity** | Did this arise from real task engagement, or from test artificiality (performing for the moderator, exploring "because it's a test")? | Inauthentic → discard |
| **Consistency** | Does what they said match what they did? | Say–do gap → keep the behavior, flag the statement |
| **Repetition** | Is the participant just echoing task wording or the moderator's phrasing back? | Echoed language → not evidence, discard |
| **Spontaneity** | Was the comment/action unprompted, or pulled out by a probe? | Prompted → keep but weight lower than spontaneous |
| **Appropriateness** | Is the participant in-profile, and is the data point within study scope? | Out-of-scope opinion (e.g., visual-preference comments in a findability test) → log as anecdote, not finding |
| **Confounds** | Was it caused by a prototype bug, broken task wording, moderator leading, or tech glitch? | Confound → exclude from findings; route bugs to a bug ticket; note the exclusion in the report |

## Severity rating — Nielsen 0–4 (canonical home)

**This section is the single source of truth for severity in this library.** `run-heuristic-evaluation` and `audit-accessibility` rate their findings here — they reference this skill and never restate the scale.

### The scale

| Rating | Name | Meaning |
|---|---|---|
| **0** | Not a problem | No evidence of user friction — evaluator preference only. Never enters the report. |
| **1** | Cosmetic | Fix only if spare time exists. No behavioral effect. |
| **2** | Minor | Low fix priority. Noticeable friction, quickly overcome. |
| **3** | Major | High fix priority. Significant delay, error, or frustration. |
| **4** | Catastrophe | Imperative to fix before release. Blocks tasks or causes real-world harm. |

### The three factors: frequency × impact × persistence

| Factor | Ask | Points toward low | Points toward high |
|---|---|---|---|
| **Frequency** | How many participants hit it? Is the triggering situation common? | 1 of 5, rare situation | 3+ of 5, everyday situation |
| **Impact** | When hit, how hard is it to overcome? | Noticed, moved on | Task failed, wrong real-world outcome |
| **Persistence** | Do users learn around it, or hit it every time? | One-time, learnable | Recurs every visit |

Plus Nielsen's **market impact** escalator: a technically cosmetic issue that embarrasses the brand or erodes trust (typo on a checkout page, broken logo) may be raised 1–2 levels.

### Severity decision tree

```
Evidence of real user friction (not evaluator preference)?
├─ NO → 0 — drop it
└─ YES
   Did it cause task failure or abandonment?
   ├─ YES, for 2+ participants → 4
   ├─ YES, for 1 participant on a critical path (money, bookings, data loss, legal) → 4
   ├─ YES, for 1 participant, non-critical path → 3
   └─ NO — task completed
      Near-miss on a critical path (wrong booking, payment, data loss barely avoided)?
      ├─ YES → 3 — note that field conditions may be less forgiving
      └─ NO
         Significant delay, error, or visible frustration?
         ├─ YES, repeated across the session or across participants → 3
         ├─ YES, once, self-corrected quickly → 2
         └─ NO — noticed, negligible behavioral effect
            ├─ Recurs every visit (persistent irritant) → 2
            └─ One-time or purely aesthetic → 1
```

### Calibration rules

- **Frequency at n=5 is a count, never a percentage.** "3 of 5 participants" — writing "60%" is fake quant (see anti-patterns).
- **Boundary anchors:** before assigning 4, ask "would we delay launch for this?" Before assigning 1, ask "would anyone ever fix this if not now?"
- **Single-evaluator severity is noisy.** For launch-gating decisions, have 2–3 evaluators rate independently, then reconcile (mean or discussion). Solo? Say so in the report.
- **Judgment call on conflicts:** low frequency + catastrophic impact usually lands at 3, not 4, if users caught the error themselves — but critical-path near-misses deserve a note that field conditions may be less forgiving.
- **Stakeholder-facing variant:** for exec summaries, collapse to NN/g's practical High/Medium/Low: 4 and 3 → High (flag every 4 as launch-blocking), 2 → Medium, 1 → Low. Keep 0–4 as the working scale.

## Worked example

Illustrative study — a salon booking app in beta. The session data below is invented for demonstration and should not be cited as real findings. 5 participants, moderated. Research question: *Can first-time clients book the right appointment with a specific stylist without help?* Task: "Book a haircut with Maya for sometime next week."

Raw pool after Step 1's quality filter:

| P | Observation | Quality note |
|---|---|---|
| P1, P4, P5 | Tapped "Services" expecting stylist choice inside; backtracked to find "Stylists" tab; P1 and P5 repeated the wrong path on a second booking | Authentic, behavioral — keep |
| P2 | Date picker defaulted to today; nearly confirmed a same-day slot when asked for "next week"; caught it on the review screen and said "oh wait, that's today" | Authentic; spontaneous quote — keep |
| P4 | On-screen keyboard covered the Continue button; stalled ~40s until discovering scroll; no recurrence after learning | Keep |
| P3 | "I love the colors" (unprompted) | Out of scope for findability question — anecdote, not a finding |
| P2 | App crashed on back-swipe | Confound: build bug → bug ticket, excluded from findings |

Findings after clustering, interpretation, and severity:

| # | Finding | Freq | Impact | Persistence | Severity |
|---|---|---|---|---|---|
| 1 | Stylist selection is buried inside Services; users expect to choose the person first | 3/5 | Med — recovered after backtracking | Repeated on second booking | **3** |
| 2 | Date picker defaults to today with no emphasis at confirm; near-miss wrong-date booking on a critical path | 1/5 | High — a real-world wrong booking | Every booking | **3** |
| 3 | Keyboard occludes Continue on small screens | 1/5 | Med — 40s stall | One-time, learned | **2** |

Finding 2 shows the judgment call: frequency is low, but the path is critical and the error self-caught only at the last screen — 3, with a note that unmoderated real-world use may not catch it.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| "60% of users failed" from n=5 | Small-sample numbers don't estimate the population (true-score problem) | "3 of 5 participants"; hand any metric claim to `use-quantitative-evidence` |
| Quote-mining opinions as findings | Say ≠ do; opinions are the weakest data in a usability test | Weight behavior first; run the consistency dimension |
| Session-by-session recap as "analysis" | No clustering means no patterns — just 5 stories | Cluster across participants before writing anything |
| Everything rated 3–4 | Severity inflation destroys trust and prioritization | Use the decision tree + boundary anchors; expect a spread |
| Evaluator preference logged as a finding | That is a 0 by definition | Require observed user friction as the evidence line |
| Blame framing ("users failed to notice…") | Unactionable; the design is the variable | Design-framed issue ("the control lacks visual affordance at…") |
| Solution-first finding ("add a tooltip") | Prescribes a fix for an undescribed problem | Issue + evidence first; recommendation last, and it may be "investigate" |
| Polishing an unverifiable claim to sound complete | Evidence-discipline failure | Handle per `craft-critique`'s evidence-discipline protocol |
| Dropping data that contradicts the emerging story | Cherry-picking; the report becomes fiction | Log disconfirming observations under Open Questions |
| Findings retro-fitted to pre-test opinions | The test becomes theater | Interpret against the written research questions only |

## Output format

```markdown
## Usability Findings — [product · study name] — [date]
Study: [n participants, mode, tasks] · Research questions: [list]
Data-quality exclusions: [e.g., "P2 crash excluded — build bug, ticketed"]
Severity rated by: [names; note if single evaluator]

### Finding N — [one-line issue] · Severity: [0–4]
- **Issue:** [precise, design-framed problem description]
- **Evidence:** [X of N participants + what they did; quote only if load-bearing]
- **Location:** [screen / step / component]
- **Severity reasoning:** [frequency · impact · persistence, one line]
- **Recommendation:** [specific next step — a fix direction or "investigate via …"]

### What worked
[Behavior-backed positives only — protects working design]

### Open questions
[Single-participant patterns and speculation needing more data — not findings]
```

## Sources

- Analyze Usability Test Data in 4 Steps — https://www.nngroup.com/articles/analyze-usability-data/
- Which Data Points to Use in Analysis (6 quality dimensions) — https://www.nngroup.com/articles/usability-data-in-analysis/
- How to Rate the Severity of Usability Problems (Nielsen 0–4; frequency × impact × persistence + market impact) — https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
- Making Usability Findings Actionable (issue + evidence + severity + location + recommendation) — https://www.nngroup.com/articles/actionable-usability-findings/
- Why You Cannot Trust Numbers from Qualitative Usability Studies — https://www.nngroup.com/articles/true-score/
- Group Notetaking for User Research (aggregation via affinity) — https://www.nngroup.com/articles/group-notetaking/
- Observer Guidelines (atomic notes; observation vs interpretation) — https://www.nngroup.com/articles/observer-guidelines/

## Boundaries

- **Canonical severity home:** `run-heuristic-evaluation` and `audit-accessibility` rate their findings using THIS skill's 0–4 scale — they reference it, never restate it. If severity values appear duplicated elsewhere, this file wins.
- **`moderate-usability-session`** owns in-session capture (think-aloud, probing, note discipline during the session). This skill starts when the last session ends.
- **`synthesize-research-data`** owns thematic analysis of generative research (discovery interviews, field, diary) and the Define-stage outputs (need statements, HMW). Evaluative test data belongs here.
- **`use-quantitative-evidence`** owns statistical claims, significance, and A/B interpretation. This skill enforces the no-metrics-from-small-N rule and hands anything quantitative across.
- **`define-ux-success-metrics`** owns choosing and scoring instruments (SUS/SEQ/HEART); their scores enter this analysis as context, not as findings.
- **`present-and-defend-work`** owns the stakeholder readout (report format, presentation, async memo) built FROM this skill's findings output.
- **`craft-critique`** owns the evidence-discipline protocol; every external claim in findings follows it.
