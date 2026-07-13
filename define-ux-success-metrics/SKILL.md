---
name: define-ux-success-metrics
description: "Defines how a design's success will be measured: HEART goals→signals→metrics, SUS/SEQ/NPS instrument selection, UX benchmarking waves, and analytics measurement plans with macro/micro conversions. Use when asked 'how do we measure success', 'what metrics should we track', 'define KPIs for this feature', 'set up HEART', 'should we use NPS', 'benchmark our UX', 'write a measurement plan', or before any launch that will later be judged. NOT for analyzing usability findings (analyze-usability-data), designing A/B tests (use-quantitative-evidence), or measuring AI output quality (write-ai-evals)."
---

# Define UX Success Metrics

Turn a fuzzy goal ("make the flow better") into a small set of metrics someone will actually act on — before the work ships, never retrofitted after.

## When to use / when NOT to use

**Use when:**
- A feature, redesign, or launch needs a definition of success before build starts
- A stakeholder asks "how will we know this worked?"
- Someone proposes NPS, "engagement," or a dashboard and you need to pressure-test it
- Setting up a benchmarking program or a per-launch measurement plan

**Do NOT use when:**
- Analyzing session recordings or rating issue severity → `analyze-usability-data`
- Designing an A/B test or judging whether a difference is real → `use-quantitative-evidence`
- Planning a usability study's sample size or mode → `plan-usability-test`
- Measuring AI model output quality (golden sets, rubrics) → `write-ai-evals`
- Writing custom survey questions → `write-survey` (SUS/SEQ are standardized — administer verbatim, never rewrite items)

## The method: goals → signals → metrics

Run these steps in order. Do not skip Step 0.

**Step 0 — Name the decision the metric feeds.**
Ask: "If this number moves, who does what differently?" If no one changes behavior, the metric is decoration — cut it. Every metric in the plan must have an owner and a decision attached.

**Step 1 — Pick the framework.**

```
Is the product used by choice (consumer/self-serve)?
├── YES → HEART (Google's framework: Happiness, Engagement,
│         Adoption, Retention, Task success)
└── NO — mandated workplace/B2E tool (users can't leave)?
    └── YES → CASTLE (NN/g's B2E complement — Engagement, Adoption,
              and Retention are weak signals when use is mandatory;
              measure Cognitive load, Advanced-feature usage,
              Satisfaction, Task efficiency, Learnability, Errors)
```

**Step 2 — Choose 2–4 categories. Never all five.**
Tracking everything means acting on nothing. Pick the categories where this specific launch is supposed to move the needle. A new-user onboarding flow cares about Adoption + Task success; a retention feature cares about Retention + Happiness.

**Step 3 — Derive Goal → Signal → Metric for each category.**

| Layer | What it is | Test |
|---|---|---|
| **Goal** | Success stated in words, no numbers | Would the team agree this is what "working" means? |
| **Signal** | A user behavior or attitude that indicates the goal | Can you observe it? (logged action, survey response) |
| **Metric** | The countable expression of the signal | Can you compute it from real instrumentation, today? |

Write goals FIRST. Teams that start at metrics pick whatever the analytics tool already shows — that is the tool defining success, not the design.

**Step 4 — Assign an instrument per metric** (decision tree below). Mix behavioral (what users do) with at least one attitudinal (what users feel) — behavior alone can't distinguish "efficient" from "gave up fast."

**Step 5 — Set baseline, target, and comparison standard.**
Every metric needs: current baseline (or "capture in Wave 1"), a target, and WHAT you compare against — past self (most common), a competitor, or an industry benchmark. A number with no comparison is noise.

**Step 6 — Write the measurement plan** (Output format below) and get the metric owners to sign it before build starts.

## HEART quick reference

| Category | Goal example | Signal example | Metric example |
|---|---|---|---|
| **Happiness** | Users find the flow effortless | Post-task ease ratings | SEQ average per task; SUS per wave |
| **Engagement** | Users return to the feature voluntarily | Repeat visits to feature | Weekly actions per active user |
| **Adoption** | New users start using the new flow | First-time completions | % of new users completing flow in first week |
| **Retention** | Users keep coming back | Return visits over time | % of Wave-1 users active in month 3 |
| **Task success** | Users complete the core task unaided | Completions, errors, abandons | Task success rate; error rate; time-on-task |

Caveat on time-on-task: decide up front whether time means **efficiency** (shorter = better; transactional tasks) or **engagement** (longer = better; content consumption). The same number reads opposite ways — a plan that doesn't declare the framing invites cherry-picking later.

## Instrument selection decision tree

```
What do you need to measure?
├── Perceived usability of the WHOLE product/flow
│   └── SUS — 10 items, administered post-test/post-wave.
│       5-point agreement scale, alternating positive/negative items.
│       Score = 0–100 (odd items: score−1; even items: 5−score; sum ×2.5).
│       Compare against your own prior waves; ~68 is the published
│       cross-industry average. One SUS number with no comparison
│       point means nothing.
├── Difficulty of ONE task, right after the user did it
│   └── SEQ — single question: "Overall, how difficult or easy was
│       this task?" 1 = Very difficult … 7 = Very easy.
│       Ask immediately after each task, before the next one.
├── Workload on a mission-critical / high-stress task
│   └── NASA-TLX — 6 workload subscales; heavier instrument,
│       use only when overload itself is the risk.
├── Behavioral outcome (did they succeed / convert / return?)
│   └── Analytics events + success rate. Success rate is the
│       simplest usability metric — define pass/fail (and any
│       partial-credit rule) BEFORE running sessions.
└── Stakeholder demands NPS
    └── Administer it, but never alone — see NPS caveats.
```

### NPS caveats (say these out loud when NPS comes up)

NPS ("How likely are you to recommend…?", 0–10; NPS = %promoters[9–10] − %detractors[0–6]):

1. **The bins destroy information.** Collapsing an 11-point scale into 3 buckets throws away most of the signal — a 7→8 shift is invisible, a 6→7 shift isn't, arbitrarily.
2. **It's gameable** — teams learn to beg for 9s at the survey moment.
3. **It's too coarse for design decisions.** NPS can't tell you WHAT to fix; it measures a vague future intention, not experience.

If the org requires NPS: report it, but pair every NPS number with task success + a perceived-usability score (SUS/SEQ) so design decisions run on the diagnostic metrics, not the vanity one.

### The small-N prohibition

**Never report metrics from a 5-user qualitative study.** With n=5, the margin of error swamps the measurement — "3 of 5 succeeded" is an insight prompt, not a 60% success rate. Quantitative UX metrics need ~40 participants; trendable benchmark waves need ~35+. If someone puts a percentage from a qual study in a deck, flag it (enforced jointly with `analyze-usability-data`).

## Benchmarking waves (long-term program)

Benchmarking ≠ per-launch success metrics. Success metrics answer "did THIS launch work?"; benchmarking tracks 2–4 long-haul metrics across releases to answer "is the product getting better?" Run both; don't confuse them.

The 7-step flow (NN/g):

1. Choose metrics tied to **critical tasks** — 2–4 metrics covering different UX aspects (one behavioral, one attitudinal minimum)
2. Pick the collection method — quant usability testing, analytics, or surveys
3. Establish the baseline wave (~35+ participants for trendable numbers)
4. Freeze the protocol (checklist below)
5. Re-measure on a fixed cadence (per major release, or quarterly)
6. Compare against the chosen standard: past self / competitor / industry
7. Document every wave in a research repository so wave 6 is still comparable to wave 1

**Frozen-protocol checklist — identical across every wave:**

- [ ] Task wording — verbatim, character-for-character
- [ ] Instrument and its exact items (SUS/SEQ administered unmodified)
- [ ] Recruiting criteria and screener
- [ ] Device/platform/environment
- [ ] Metric definitions (what counts as success, how timing starts/stops)
- [ ] Documented in the repository with date, N, and any deviations

**If the product change breaks a task** (the feature moved, the flow no longer exists): version the task, mark the trend line broken at that wave, and start a new baseline for that task. Never quietly reword and keep comparing — a trend across changed protocols is fiction.

## Analytics measurement plan (macro/micro conversions)

Translate UX goals into instrumentation BEFORE launch, so day-1 data is usable.

- **Macro conversion** — the one primary outcome the product exists for (confirmed booking, completed purchase, published project). One per product surface. This is the number leadership sees.
- **Micro conversions** — the smaller steps that indicate progress toward the macro (viewed services, selected time slot, entered contact details). These are the diagnostic layer: when the macro stalls, micros show WHERE the funnel leaks.

Rules:
1. Every micro must sit on the causal path to the macro. "Time on site" is not a micro conversion; "reached the payment step" is.
2. Name events in the analytics tool exactly as they appear in the plan — drift between plan names and event names kills the plan within a month.
3. **Report business outcomes, not UX activity.** "Ran 3 studies, fixed 14 issues" is activity. "Unaided booking completion up since redesign; support-assisted bookings down" is an outcome. Executives fund outcomes.
4. Any claim comparing your numbers to market/industry figures goes through `craft-critique`'s evidence protocol — cite the benchmark source or flag it under-evidenced.

## Worked example — a salon booking app (beta)

Context: a salon's native booking app in beta. The launch question: "does the app let clients book unaided?"

Framework: HEART (consumer, used by choice). Categories chosen: **Adoption, Task success, Happiness** (Engagement cut — booking is transactional, more visits ≠ better; Retention deferred to a later wave — beta window too short to read it).

| Category | Goal | Signal | Metric | Instrument |
|---|---|---|---|---|
| Adoption | Existing clients switch from phone booking to the app | First-time bookings made in-app | % of active clients completing ≥1 in-app booking in first month | Analytics event `booking_confirmed` (first per user) |
| Task success | A client completes a booking with zero staff help | Bookings completed without a support call/walk-in assist | Unaided completion rate; abandonment step | Funnel events + support log cross-check |
| Happiness | Booking feels easy | Post-booking ease rating | SEQ (1–7) shown once after first completed booking; SUS emailed each benchmark wave | In-app SEQ prompt; SUS survey |

Conversion structure:
- **Macro:** `booking_confirmed`
- **Micros (in funnel order):** `service_selected` → `stylist_selected` → `timeslot_viewed` → `timeslot_selected` → `contact_completed` → `booking_confirmed`

Plan decisions: baselines captured in Wave 1 of beta (no targets before a baseline exists — a target invented pre-baseline is theater). Comparison standard: past self, wave over wave. Owner per metric named in the plan. Review cadence: end of each beta wave. Time-on-task explicitly framed as **efficiency** (shorter is better — this is a transactional flow).

Decision each metric feeds: Adoption low → marketing/onboarding problem, not UI; Task success low → funnel micros locate the leaking step for redesign; SEQ low with high completion → it works but feels hard — friction pass next sprint.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| Tracking all 5 HEART categories | Diffuse attention, no action | 2–4 categories tied to THIS launch's intent |
| Starting from what the analytics tool shows | Tool defines success, not design | Goals first, metrics last |
| NPS as the only UX metric | Coarse, gameable, non-diagnostic | Pair with task success + SUS/SEQ |
| Percentages from n=5 studies | Margin of error swamps signal | Insights from small N; metrics from ~40+ |
| Rewording tasks between benchmark waves | Trend becomes fiction | Frozen protocol; version + re-baseline on breaks |
| Metrics defined after launch | Baseline lost forever | Plan signed before build starts |
| "Engagement up" on a transactional flow | Longer time may mean users are lost | Declare efficiency-vs-engagement framing up front |
| Reporting UX activity (studies run, issues fixed) | Reads as cost, not value | Report outcome deltas on the agreed metrics |
| Metric with no owner or decision attached | Dashboard decoration | Step 0: cut it |
| Rewriting SUS/SEQ items to "fit the product" | Breaks comparability with all benchmarks | Administer standardized instruments verbatim |

## Output format

```markdown
# Measurement Plan — [feature/launch name]
Framework: HEART | CASTLE — [why]
Categories: [2–4, with one-line reason each]

## Goals → Signals → Metrics
| Category | Goal | Signal | Metric | Instrument | Baseline | Target | Owner |
|---|---|---|---|---|---|---|---|

## Conversions
Macro: [event name]
Micros (funnel order): [event] → [event] → … → [macro]

## Decisions these metrics feed
- [metric] moves down → [who] does [what]

## Comparison standard: past self / competitor / industry [cite source]
## Review cadence: [when, by whom]
## Benchmarking: [in program? which 2–4 long-haul metrics; wave cadence; protocol doc link]
```

## Sources

- HEART + goals-signals-metrics into analytics: https://www.nngroup.com/articles/ux-goals-analytics/
- CASTLE (B2E complement to HEART): https://www.nngroup.com/articles/castle-framework/
- Perceived usability — SUS post-test, SEQ post-task, NASA-TLX: https://www.nngroup.com/articles/measuring-perceived-usability/
- Core metric triad (success, time, errors + satisfaction): https://www.nngroup.com/articles/usability-metrics/
- Success rate, the simplest metric: https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/
- NPS caveats: https://www.nngroup.com/articles/nps-ux/
- Never report metrics from qual studies (true score): https://www.nngroup.com/articles/true-score/
- Quant sample sizes (~40; ~35+/wave): https://www.nngroup.com/articles/summary-quant-sample-sizes/
- 7 steps to benchmark product UX: https://www.nngroup.com/articles/product-ux-benchmarks/
- Benchmarking as a program: https://www.nngroup.com/articles/benchmarking-ux/
- Benchmark repository / wave comparability: https://www.nngroup.com/articles/ux-benchmarking-repository/
- Reporting business outcomes, not activity: https://www.nngroup.com/articles/reporting-ux-business-outcomes/

## Boundaries

- **`plan-usability-test`** owns study planning and sample-size routing; this skill owns WHICH instruments and metrics the study collects.
- **`analyze-usability-data`** owns qualitative findings and severity; instrument scores from this skill enter its analysis as context, not as findings. The small-N prohibition is enforced in both.
- **`use-quantitative-evidence`** owns A/B test design and statistical-vs-practical significance; any "is this metric difference real?" question hands off there.
- **`write-ai-evals`** owns measuring AI output quality (golden sets, rubrics, LLM-as-judge); this skill measures the surrounding product UX.
- **`write-survey`** owns custom survey construction; SUS/SEQ/NPS are standardized instruments administered verbatim, so they live here.
- Claims comparing metrics to market or industry benchmarks are handled per `craft-critique`'s evidence protocol.
