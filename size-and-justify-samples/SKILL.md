---
name: size-and-justify-samples
description: "The canonical sample-size-and-sufficiency reference for all research — the single authority on 'how many participants' and 'is n big enough to support this claim'. A CANONICAL REFERENCE loaded before you recruit and before you report a rate, the way name-and-control-bias is loaded before trusting a finding. Use when someone asks 'how many participants / interviews / users / respondents', 'is 5 users enough', 'what sample size', 'is n enough to say X%', 'can I report a percentage', 'what's my margin of error', 'is this enough to be significant', 'we tested 6 people and 60% said…', or before fielding any study and before putting any number in a deck. Owns saturation stop-rules, quant n for a target confidence interval, and the hard 'n too small to claim this' refusal."
---

# Size and Justify Samples

How many participants you need is not one number — it depends on what you're trying to *say*. This is the single source of truth for sizing a study and for the gate that refuses a claim the n cannot support. It sits next to `name-and-control-bias`: that file owns whether the sample is *skewed*, this file owns whether it is *big enough*. They are orthogonal — a large sample can still be biased, and a clean sample can still be too small. Load both before you trust a finding.

## How to use this reference

You are almost always here because you're about to recruit, or because a number is about to go in a deliverable. Two modes:

- **Fast path — "pick your number" (scrappy):** match your situation to the **Pick-your-number table** below, take the recommended default, note the one stop-rule for it, recruit. 5 minutes. Use for time-boxed freelance studies and low-stakes calls.
- **Full path — justify the number (rigor):** derive n from the decision — what precision the decision needs, what segments must be sized separately, what the "too small to claim" line is for the specific sentence you want to write. Use for any n that gates a decision, any external claim, any client deliverable, any number that will outlive the session.

**Situational, not a fixed formula.** The right sizing *logic* changes with the question: saturation for generative qual, a target confidence interval for a rate, effect size for a comparison. Pick the logic that fits *this* problem — do not apply a quant n to a discovery study or demand saturation from a benchmark. The goal is not "hit the number"; it is a sample whose size can carry the exact claim you intend to make.

## The one rule that separates this from theater

**A percentage with no interval is a lie of precision.** Every rate you report must either carry its margin of error / confidence interval, or be reported as a bare count (*X of Y*). "60% of users" from 6 people is not a small truth — it is a made-up number wearing a decimal point. Sample size buys *precision, not permission*: n decides how tightly you can state a rate, the **method and segment** decide whether you may state one at all. If you cannot attach an interval, you may not attach a percent.

(Compare `name-and-control-bias`: "n fixes precision, not bias." Same coin — n is necessary for a defensible rate and sufficient for nothing.)

## Pick-your-number table (the fast path)

Per **segment**, not per study. See the segment rule below — it is the most common sizing error.

| Situation | Default n | The one stop-rule / note |
|---|---|---|
| Generative discovery, one narrow/homogeneous segment | **5–6** | Stop at saturation; 5 is a floor, not a target |
| Generative discovery, broad/diverse population | **12–15**, as ~5 per sub-segment | Saturate *each* segment separately; 12 total across 3 personas ≠ sized |
| Formative usability (find problems), one persona | **5 per round**, 3 rounds > 1 round of 15 | Iterate; fix between rounds (Nielsen 5-user rule) |
| Formative usability, divergent personas | **3–4 per segment** | Segments that behave differently need their own users |
| Summative / quant metrics (success rate, time, SUS) | **~40** | ≈ ±15% margin on a 50% rate at 95% (NN/g quant guideline) |
| Benchmarking a metric over time | **~40 per wave** (size as quant) | Same tasks every wave; a trend needs a stable instrument and a quant-sized wave |
| Eyetracking heatmap | **~39** | Below this the heatmap is noise |
| Quantitative card sort | **~15** | For stable dendrogram / agreement |
| Tree test | **30–50** | Findability rates need the precision |
| Survey reporting a rate at ±5% | **~385** | Large population, worst-case p=0.5; ±10% → ~100 |
| A precision target not on this table | **compute it** | Use the margin formula below, or hand the A/B comparison to `use-quantitative-evidence` |

If you take a default off this table, you still owe the reader *which claim it supports* — a discovery n supports themes, a quant n supports a rate with an interval. They are not interchangeable.

## Qualitative: saturation as a per-segment stop rule

Qual is sized by **saturation** — the point where new sessions in a segment stop surfacing new codes/themes — not by a magic number. Operationalize it so it's a rule, not a vibe:

- Track **new themes per session**. Stop a segment when **two consecutive sessions add nothing new**.
- Saturation is **per homogeneous segment**. Diverse populations saturate later because each sub-group has its own themes.

Grounded floors (where saturation typically lands; use as minimums, not targets):

| Segment shape | Floor | Basis |
|---|---|---|
| Narrow, homogeneous, single topic | **~5–6** | Basic themes emerge by ~6 (Guest/Bunce/Johnson); Nielsen discovery |
| Generative, one broad segment | **~8–12** | Saturation ~12 for a fairly homogeneous group (Guest/Bunce/Johnson) |
| Diverse population / multiple behaviors | **20–30 total**, as ~5–8 per sub-segment | NN/g interview-sample-size; scope × diversity × researcher skill |

**The segment rule (memorize this):** sample size is *per segment, not aggregate*. Five users split across three personas is ~1.7 per persona — which resolves nothing about any of them. You need 5 *per* persona, or 3–4 each if the personas are genuinely divergent. A study "with 12 users" that spans students, retirees, and admins is three under-powered studies wearing one number.

**When the 5-user rule fails** (do NOT default to 5 here): quantitative metrics (~40), eyetracking (~39), highly divergent user groups (3–4 *per* segment), card sorting (~15), benchmarking (size each wave as quant, ~40/wave). Five users is right for *finding problems in one persona*, wrong for *measuring anything*.

## Quantitative: n for a target precision

Size quant from the **precision the decision needs**, then report the interval — not from a bare significance test.

**Rate / proportion (success rate, completion, "% who…").** Margin of error at 95% ≈ `1.96 × √(p(1−p)/n)`, worst case at p=0.5. To hit a target margin `m`: `n ≈ (1.96/m)² × p(1−p)` → at p=0.5, `n ≈ 0.96 / m²`.

| n | ±margin at 95% (p=0.5) |
|---|---|
| 20 | ±22% |
| 30 | ±18% |
| 40 | ±15% |
| 100 | ±10% |
| 200 | ±7% |
| ~385 | ±5% |

Use the **Adjusted-Wald interval** (Sauro & Lewis) for the actual CI on small and medium n and for completion rates — the plain normal approximation misbehaves near 0%/100% and at low n. Reach for it whenever n < ~100 or a rate is near the ceiling/floor.

**Continuous metric (time-on-task, SUS score).** n is driven by **variability**: to estimate a mean within ±m, `n ≈ (1.96 × SD / m)²`. You need a rough SD from a pilot or prior data — high-variance metrics like time-on-task need more people than you expect. Report the **mean with its CI**, not just the mean.

**Comparison / detectable difference.** Sizing to detect a difference between two designs is governed by **effect size** (difference ÷ SD) and power (aim 0.8), not by "how many felt like enough." Small effects need large n; if you can't recruit the n, you can only detect a large effect — say so. Prefer **effect size and CIs over p-values**; p<0.05 is not the same as a difference that matters (statistical ≠ practical significance). The A/B test machinery, power calc, and significance read belong to `use-quantitative-evidence` — this file sizes the up-front n; hand off the test.

**Validated instruments still need n.** Choosing a validated scale (SUS, SEQ, UMUX) fixes the *instrument*, not the *precision* — a SUS mean from 6 users has a wide CI; a benchmark comparison still wants ~40. And a *custom* scale must be validated (reliability, e.g. Cronbach's α ≥ ~0.70, and construct validity) *before* its numbers mean anything — sizing an unvalidated instrument buys precise noise. Metric choice → `define-ux-success-metrics`.

## The hard gate — "n is too small to claim this"

Before any number ships, run the gate against the **specific sentence** you want to write:

1. **Is it qual n (< ~20–30) being turned into a percentage?** → Refuse. Report counts (*X of Y*) + themes + severity. Never convert a qual sample into a population rate. (This is the failure `name-and-control-bias` killer #5 points here to enforce.)
2. **Does the claim need a rate at all, or just direction/severity?** → If direction/severity, you don't need the number; report the theme and its severity and move on.
3. **If it needs a rate, is the interval narrow enough to support the decision?** → Compute the 95% CI. If "3 of 6 → 50%" carries a CI of roughly ±35%, the number spans "rare" to "most" — it cannot gate anything. State the CI; if it's uselessly wide, the honest output is "n insufficient for a rate; here is the count and what would earn one."
4. **Below ~30, do not report a percentage at all.** Report *X of Y*. A percent on n<30 implies a precision the sample does not have.

The gate's job is to catch the number *before* it becomes a quotable "60% of users." Refusing here is not being unhelpful — it is the difference between a defensible deliverable and one that dies on the first "wait, out of how many?"

## Small-N defense — when a client wants percentages from 6 people

The freelance reality: a study is 6 people and a stakeholder wants "what percent." You have a **situational menu**, chosen by what the *decision* needs — not one rigid answer:

**Path A — Reframe to themes + severity (default when the 6 are all you have).**
Convert the rate into what small-n qual actually earns:
- Report as counts: "4 of 6 beta testers failed to find reschedule."
- Attach **severity** (frequency × impact × persistence — the Nielsen-style rating owned by `analyze-usability-data` / `plan-usability-test`): a core-task blocker is High regardless of the exact rate.
- Recommend on severity, not on a manufactured percent. This is honest *and* decision-useful — most ship/fix calls need severity and direction, not a population rate.

**Path B — Triangulate to *earn* the number (when the decision genuinely needs a rate).**
Don't manufacture a rate from the 6 — go get one from a source that *has* the n:
- Booking-funnel / app analytics, support-ticket counts, search logs, or a quick larger survey.
- If analytics show the same drop-off the 6 described, **cite the analytics rate** (which has the n) and use the 6 sessions to explain *why*. The qual carries causation; the quant carries the number. Triangulation mechanics + joint display → `integrate-mixed-methods`; which method to add → `choose-research-method`.

**How to pick:** decision needs direction/severity → **Path A**. Decision needs a defensible rate (pricing, roadmap gate, exec metric) → **Path B**; never let the 6 impersonate the 600.

## Worked example — the gate catches a fabricated rate

**Deliverable as drafted (a salon booking app, beta):** *"60% of users can't find the reschedule button — we tested 6 beta users and 4 failed. Recommend redesign."*

Run the gate — it catches three problems in one sentence:

1. **The count is being dressed as a population rate.** 4 of 6 is a count, not "60% of users." (It isn't even 60% — 4/6 ≈ 67%; the round number is itself a tell that someone smoothed a count into a statistic.)
2. **The precision is fake.** With n=6, the 95% CI on a 4/6 rate is roughly **30%–90%** (Adjusted-Wald). The true failure rate could be a third of users or nearly all of them — "60%" names a point the data cannot locate. → *Refuse the percentage.*
3. **The claim doesn't actually need the rate.** Reschedule is a core self-service task; 4 of 6 failing on it is **High severity** (frequent, blocks the task, persists across sessions). The redesign is justified by severity — the percent was never load-bearing.

**Honest rewrite (Path A):** "4 of 6 beta testers failed to find reschedule (High severity: core task, blocks self-service). Recommend redesign; exact failure rate is not yet measurable at n=6."

**If leadership needs the rate (Path B):** pull the booking app's own analytics — of sessions that open reschedule, what share complete it? That population has the n for a real rate with a tight CI. If it corroborates the drop-off, cite *that* number and use the 6 sessions to explain the cause. Now the percentage is earned, not invented.

**Verdict:** as written, the claim is BLOCKED — not because the finding is wrong (the barrier is real, strong internal validity) but because the *number* over-claims what 6 people can support. The fix is not a bigger caveat; it is a count + severity now, and a triangulated rate if the decision demands one. Notice the gate did not compute a sample size — it matched the *claim* to the *n on hand* and refused the mismatch. That is the situational discipline.

## Anti-patterns / red flags

- **Percent on qual n.** "3 of 5 → 60%." A rate from a discovery sample is the signature failure this skill exists to stop.
- **Aggregate n across segments.** "12 users" spanning three personas is three under-powered studies. Size per segment.
- **Defaulting to 5 for everything.** Five finds problems in one persona; it measures nothing. Quant needs ~40, benchmarks ~35/wave, eyetracking ~39.
- **A number with no interval.** Every rate carries its margin/CI or is reported as *X of Y*. No exceptions.
- **Chasing n to fix a skewed sample.** A bigger biased sample is precisely wrong at scale — that's `name-and-control-bias`, not this file. n and bias are orthogonal.
- **p<0.05 as "it matters."** Statistical significance ≠ practical significance; report effect size and CI (hand the test to `use-quantitative-evidence`).
- **Sizing an unvalidated custom scale.** Precision on a bad instrument is precise noise; validate reliability first.
- **Reporting saturation you didn't track.** "We reached saturation" with no new-theme-per-session record is an assertion, not a stop-rule.
- **Manufacturing a rate to satisfy a stakeholder.** If the decision needs a number and you only have 6, triangulate to earn it — don't launder the 6 into a percent.

## Output format — the sizing justification

When the sizing must be defended (research plan, deliverable footnote, stakeholder pushback):

```markdown
## Sample plan / sufficiency
- Claim it must support: [the exact sentence — a theme? a rate? a comparison?]
- Sizing logic: [saturation per segment | rate to ±m at 95% | effect size to detect d]
- Segments & n: [segment → n each, not aggregate]
- Target precision: [margin/CI for a rate, or "themes+severity, no rate"]
- What this n CANNOT claim: [the boundary — e.g. "not a population rate"]
- If under-powered: [reframe to counts+severity | triangulate via <source>]
```

## Sources

- Nielsen Norman Group — "Why You Only Need to Test with 5 Users": https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- Nielsen Norman Group — "How Many Test Users in a Usability Study?" (5 for qualitative, ~20 quant minimum for significance, card sort ~15, eyetracking ~39): https://www.nngroup.com/articles/how-many-test-users/
- Nielsen Norman Group — "5 Users Is Okay for Qualitative, Wrong for Quantitative": https://www.nngroup.com/articles/5-test-users-qual-quant/
- Nielsen Norman Group — "How Many Participants for Quantitative Usability Studies" (the ~40 quant guideline): https://www.nngroup.com/articles/summary-quant-sample-sizes/
- Nielsen Norman Group — "How Many Participants for a UX Interview Study" (scope × diversity × skill; saturation): https://www.nngroup.com/articles/interview-sample-size/
- Nielsen Norman Group — "Why You Cannot Trust Numbers from Qualitative Usability Studies" (true-score reasoning): https://www.nngroup.com/articles/true-score/
- Nielsen Norman Group — "Success Rate: The Simplest Usability Metric": https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/
- Nielsen Norman Group — "Practical vs. Statistical Significance": https://www.nngroup.com/articles/practical-significance/
- Nielsen Norman Group — "Benchmarking UX: Tracking Metrics" (track the same tasks/metrics each wave; size each wave as a quant study): https://www.nngroup.com/articles/benchmarking-ux/
- Guest, Bunce & Johnson (2006), "How Many Interviews Are Enough?" — saturation ~12 for a homogeneous group, basic themes by ~6
- Sauro & Lewis, *Quantifying the User Experience* — confidence intervals, the Adjusted-Wald interval for proportions/completion rates, sample-size and precision math

## Boundaries

- **`name-and-control-bias`** owns whether the sample's *composition* is biased (self-selection, survivorship, coverage); this file owns *how many*. n fixes precision, not bias — load both when auditing a finding.
- **`craft-critique`** owns the claim-calibration verdict (cite / get / flag under-evidenced, claim-strength language); this file supplies the *sizing input* to that verdict — whether the n can carry the claim's precision.
- **`use-quantitative-evidence`** owns A/B tests, significance testing, power, and experiment analysis; this file sizes the up-front n for a target precision, then hands off the test.
- **`integrate-mixed-methods`** owns triangulation mechanics and joint displays; this file flags *when* a too-small n forces triangulation to earn a number.
- **`analyze-usability-data` / `plan-usability-test`** own the severity rating used in the small-n reframe; this file routes the count there rather than to a percent.
- **`choose-research-method`** owns which method fits the question; **`define-ux-success-metrics`** owns which metric — this file owns the n once method and metric are chosen.
- **`write-survey` / `write-participant-screener`** own recruiting mechanics and quotas; this file sets the target count they recruit to.
