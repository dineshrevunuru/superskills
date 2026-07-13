---
name: use-quantitative-evidence
description: "Designs and reads quantitative UX evidence honestly: hypothesis-first A/B tests with a traffic/duration feasibility gate, a decision tree for when A/B is the WRONG tool (why-questions, low traffic, strategic redesigns), statistical vs practical significance, the analytics what-not-why limit with a mandatory follow-up qual spec, and the firewall against reporting metrics from 5-user studies. Use when someone says 'should we A/B test this', 'which version won', 'is this statistically significant', 'run an experiment', 'the analytics show a drop-off', 'what percent of users…', or tries to quote percentages from a small qualitative study. NOT for choosing metrics or instruments (define-ux-success-metrics) or for analyzing qual usability sessions (analyze-usability-data)."
---

# Use Quantitative Evidence

Make numbers earn their authority: test one variable with a pre-registered hypothesis, read results as effect size + cost of change (not p-values alone), and never let a 5-user study impersonate statistics.

## When to use / when NOT to use

**Use when:**
- Someone proposes an A/B test, split test, or "let's see which version wins"
- A quantitative result needs interpreting ("p = .04 — do we ship?", "is this lift real?")
- Analytics surfaced a pattern (drop-off, spike, decline) and a design change is about to be justified with it
- Anyone is about to write a percentage, average, or score from a small-N study

**Do NOT use when:**
- Choosing which metrics or instruments to track at all (HEART, SUS/SEQ, NPS, benchmark waves) → `define-ux-success-metrics`
- Analyzing qualitative usability sessions into findings and severities → `analyze-usability-data`
- Picking a research method from the full landscape (attitudinal/behavioral × qual/quant) → `choose-research-method`; this skill only checks tool-fit for validation questions already leaning quant
- Planning a qualitative usability test (the 5-user rule lives there) → `plan-usability-test`

## The method

### Step 0 — Is A/B even the right tool? (run before any test design)

```
What is the actual question?
├─ "WHY do users do X?" / "What's confusing?"
│    → WRONG TOOL. A/B measures what, never why (Nielsen).
│    → Qual usability test or interviews first; A/B later to validate the fix.
├─ "Which of two directions should the product take?" (strategic/radical redesign)
│    → WRONG TOOL. A/B optimizes within the current design — the local-maximum
│      trap. → Qual comparison + benchmark waves; A/B the details after choosing.
├─ "Does this change improve a long-term outcome?" (trust, loyalty, retention over months)
│    → POOR FIT. A/B is restricted to short-term measurable KPIs.
│    → Benchmarking program (define-ux-success-metrics owns the instrument).
├─ "Does variant B beat A on a short-term, countable KPI?"
│    ├─ Feasibility check (Step 3) FAILS on traffic/duration
│    │    → WRONG TOOL for this product. → Quant usability study (n≈40) or
│    │      qual test + counts; do NOT run an underpowered A/B "to see".
│    └─ Feasibility check passes → A/B is right. Continue to Step 1.
└─ "Can't randomize cleanly" (users see both variants, word-of-mouth contamination,
     one shared instance) → WRONG TOOL. → Before/after benchmark with caveats.
```

Never run an A/B test to *find* problems. It can only rank variants you already built.

### Step 1 — Write the hypothesis BEFORE building variants

Use this template verbatim; every bracket must be filled before anything launches:

> Because we observed **[evidence: qual finding / analytics pattern, dated]**,
> we believe changing **[ONE variable]** for **[population/segment]**
> will move **[single primary KPI]** by at least **[minimum detectable effect]**.
> We will run for **[fixed duration, whole weeks]** / until **[n per variant]**,
> and we will decide **[ship B / keep A / follow-up study]** based on the result.

Lint the hypothesis:
- [ ] Grounded in prior evidence, not a hunch ("because we observed…" is mandatory)
- [ ] Exactly one variable differs between A and B (if a bundle changed, say explicitly "this tests the bundle" — you learn nothing about the parts)
- [ ] One primary KPI, declared now — not chosen from a dashboard after results
- [ ] Guardrail metrics named (what must NOT get worse, e.g. refunds, unsubscribes, task errors)
- [ ] The decision each outcome triggers is written down (if no outcome would change the decision, don't run the test)

### Step 2 — Design checklist

- [ ] Randomization unit chosen and consistent (user, not session, for anything with memory)
- [ ] Users stay in their assigned variant for the whole test
- [ ] Variants differ only by the tested variable — same copy, same load speed, same season
- [ ] Sample size computed BEFORE launch (Step 3), then frozen
- [ ] Duration covers whole business cycles — full weeks minimum; include a weekend if behavior differs by day
- [ ] No mid-test changes to either variant (a change restarts the test)

### Step 3 — Feasibility gate: traffic and duration

Quick sample-size estimate (Lehr's rule of thumb, 80% power, α = .05, two-sided):

```
n per variant ≈ 16 × p × (1 − p) / d²
  p = baseline conversion rate (as a decimal)
  d = minimum detectable effect, ABSOLUTE (e.g., +1 percentage point = 0.01)
```

Then: `weeks to run = 2n / (eligible visitors per week)` — round UP to whole weeks.

**Gate:** if the test needs more than ~4–8 weeks, the math is telling you the traffic can't support A/B at that effect size. Options, in order: (a) test a bigger, bolder difference (larger d), (b) pick a KPI earlier in the funnel with a higher base rate, (c) abandon A/B for this question — quant usability (n≈40) or qual. Do not launch anyway "to get directional data" — an underpowered test produces noise wearing a lab coat.

### Step 4 — Run rules (where honest tests die)

- **No peeking.** Checking significance daily and stopping at the first p < .05 manufactures false winners. Fixed horizon: decide the end date/sample up front, read once.
- **No early shipping on a trend.** "Trending toward significance" is not a result.
- **No metric shopping.** With 20 metrics at α = .05, expect one false "winner" by chance. The primary KPI was declared in Step 1; everything else is context.
- **Log everything that changed mid-flight** (deploys, campaigns, outages, seasonality). Any of these can confound the read.

### Step 5 — Read the result: statistical vs practical significance

p < .05 means "unlikely if there were truly no difference." It does NOT mean the difference matters. Always report **effect size + confidence interval + cost of change** — never a bare p-value.

| Result | Statistical read | Practical read | Decision |
|---|---|---|---|
| Significant, effect ≥ your MDE | Real | Worth it | Ship winner (check guardrails first) |
| Significant, effect ≪ MDE | Real but tiny | Usually not worth the change cost, complexity, or roadmap slot | Ship only if change cost ≈ 0; say "statistically significant, practically insignificant" out loud |
| Not significant, underpowered (n below Step 3's number, or CI very wide) | No evidence either way | Unknown | "We couldn't detect it" — NEVER "there is no difference." Re-run bigger or drop |
| Not significant, adequately powered | No meaningful difference at this sensitivity | Variants are equivalent for this KPI | Keep the simpler/cheaper variant; that's a finding, not a failure |

Reporting rules:
- State the effect with its margin of error: "B: +1.4pp booking-start rate (95% CI +0.3 to +2.5pp)" — not "B won."
- A significant primary KPI with a damaged guardrail is a loss, not a win.
- One test = one context. A winner on this page, this audience, this season does not generalize automatically — external claims follow `craft-critique`'s evidence protocol.

## Analytics: the what-not-why limit

Analytics tells you WHAT happened and WHERE — never WHY. "68% drop-off at step 3" contains zero information about the cause: confusing form? price shock? comparison shopping? a bug on one browser?

**Hard rule: no design change ships justified by analytics alone.** Every analytics pattern that will drive a change gets a follow-up qual spec first:

```
FOLLOW-UP QUAL SPEC
Analytics observation: [what + where + magnitude + date range]
Candidate explanations: [2–4 falsifiable hypotheses — force yourself past the first]
Discriminating method:  [usability test / session-recording review / intercept
                         survey / interviews] + why THIS method separates them
Who & how many:         [profile, n, which flow/tasks]
Decision this feeds:    [the specific change that hinges on the answer]
```

If you cannot name the decision the answer feeds, you're collecting data for comfort — skip it.

## The small-N firewall (never metrics from 5-user studies)

Qualitative usability studies (n ≈ 5) exist to **find problems**, not to measure. Any number from one is observed score = true score + sampling noise, and at n=5 the noise dwarfs the signal (NN/g's true-score argument). One different participant swings your "rate" by 20 points.

**Language rules — enforce these in every report you touch:**

| Banned | Required instead |
|---|---|
| "60% of users failed" (from n=5) | "3 of 5 participants failed" |
| "Average time on task was 74s" (n=5) | "Times ranged widely; P4 stalled ~40s at the keyboard overlap" |
| "SUS improved from 68 to 74" (tiny n) | Directional context only, no trend claim → `define-ux-success-metrics` |
| "Success rate will be ~80% in production" | No projection from qual — run quant usability (n≈40) if the number matters |

When a stakeholder demands a number anyway, offer exactly three honest paths: (1) quant usability study at n≈40, (2) analytics on the live behavior at scale, (3) counts with an explicit no-projection caveat in writing. Reporting the fake percentage "just this once" is the thing this firewall exists to stop.

## Worked example (numbers illustrative — not client data)

**Situation:** the salon-booking flow shows visitors abandoning between service selection and confirmation. Proposal on the table: "A/B test moving the stylist picker earlier."

**Step 0:** the question is really "does the earlier picker fix the abandonment?" — a WHICH question, testable. Continue.

**Step 1 hypothesis:** *Because we observed 3 of 5 usability participants backtracking to find stylist selection (qual study, prior finding), we believe moving stylist choice before service choice for all mobile visitors will raise booking-completion rate by at least +2 percentage points. Fixed horizon; decision: ship if ≥ +2pp, keep A otherwise.*

**Step 3 feasibility (illustrative math):** baseline completion p = 0.05, d = 0.02.
`n ≈ 16 × 0.05 × 0.95 / 0.02² = 0.76 / 0.0004 = 1,900 per variant → 3,800 total.`
Site traffic: ~450 eligible mobile visitors/week → **~8.4 weeks. Gate fails.**

**Verdict:** A/B is the wrong tool for this product at this traffic. Route taken instead: ship the change behind the existing qual evidence (3 of 5 backtracked — a severity-3 finding from `analyze-usability-data`), then verify with a before/after read over 4 weeks reported WITH the caveat that before/after lacks a control, plus 5 follow-up qual sessions on the new flow. Note what did NOT happen: nobody ran the underpowered test anyway, and nobody reported "60% of users backtracked."

**Contrast read (high-traffic case, illustrative):** an e-commerce test returns B: +0.2pp, p = .03, on a checkout redesign that adds a maintenance-heavy component. Statistically significant, practically insignificant — the effect is a tenth of the MDE and the change has real upkeep cost. Keep A. Mirror case: p = .12 with an observed +15% lift and a CI from −3% to +33% — underpowered, not "no effect"; re-run with the Step 3 sample size before concluding anything.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| "Let's A/B test it" as a reflex for every question | A/B can't answer why, can't rank strategies, can't run on low traffic | Step 0 tree first — name the question type |
| Launching without a sample-size calculation | Underpowered test → noise, then a confident wrong decision | Step 3 gate; if it fails, change tools |
| Peeking daily, stopping at first p < .05 | Multiplies false-positive rate several-fold | Fixed horizon, read once |
| Declaring the winner from a secondary metric | Metric shopping — one of many metrics "wins" by chance | One primary KPI, declared before launch |
| "p < .05, ship it" with no effect-size read | Statistical ≠ practical significance | Effect size + CI + cost of change, every time |
| "No significant difference, so the redesign doesn't work" | Absence of evidence ≠ evidence of absence when underpowered | Check power first; report "couldn't detect" honestly |
| Redesigning a funnel because analytics showed drop-off | What-not-why: the cause is unknown | Follow-up qual spec before any change ships |
| Percentages, averages, or score trends from a 5-user study | True-score noise; fake quant | Counts ("3 of 5"); route real measurement to n≈40 quant |
| Testing a 12-change bundle and crediting one change | No variable isolation — attribution is fiction | One variable, or explicitly report "the bundle won" |
| Retro-fitting a hypothesis to the winning metric (HARKing) | The test becomes theater | Hypothesis written and dated before launch |
| Generalizing one test's winner to other pages/audiences | One test = one context | New claim → new evidence, per `craft-critique` |

## Output format

**Experiment spec (before launch):**

```markdown
## A/B Spec — [name] — [date]
Hypothesis: [Step 1 template, filled]
Primary KPI: [one] · Guardrails: [list]
Variants: A = [control] · B = [one variable changed]
Sample: [n/variant, showing the math] · Duration: [whole weeks] · Unit: [user/session]
Decision rule: [ship B if …; keep A if …; follow-up if …]
Step 0 verdict: [why A/B is the right tool here]
```

**Results read (after the fixed horizon):**

```markdown
## A/B Read — [name] — [date]
Result: [KPI A vs B, absolute effect + 95% CI + p]
Statistical: [significant / not, powered / underpowered]
Practical: [effect vs MDE, cost of change, guardrail status]
Confounds logged: [deploys, campaigns, seasonality — or "none"]
Decision: [ship / keep / re-run / follow-up qual] — [one-line reasoning]
Scope: [what this result does and does NOT generalize to]
```

## Sources

- A/B Testing 101 — https://www.nngroup.com/articles/ab-testing/
- Putting A/B Testing in Its Place (what-not-why, short-term-KPI limit, local-maximum risk) — https://www.nngroup.com/articles/putting-ab-testing-in-its-place/
- Statistical Significance Does Not Equal Practical Significance — https://www.nngroup.com/articles/practical-significance/
- Quantitative vs. Qualitative Usability Testing — https://www.nngroup.com/articles/quant-vs-qual/
- Quantitative User-Research Methodologies — https://www.nngroup.com/articles/quantitative-user-research-methods/
- Why You Cannot Trust Numbers from Qualitative Usability Studies (true-score) — https://www.nngroup.com/articles/true-score/
- Sample Sizes for Quantitative Studies (the ~40-participant guideline) — https://www.nngroup.com/articles/summary-quant-sample-sizes/

## Boundaries

- **`define-ux-success-metrics`** owns choosing and scoring metrics/instruments (HEART, SUS/SEQ, NPS, benchmark waves). This skill takes an already-chosen KPI and owns testing it and reading the numbers.
- **`analyze-usability-data`** owns qual findings and severity; it hands any metric claim across to this skill, and this skill hands qual patterns (the "why") back to it and to `synthesize-research-data`.
- **`plan-usability-test`** owns qualitative test planning and the 5-user rule; this skill polices the boundary from the other side — no metrics OUT of those small studies.
- **`choose-research-method`** owns full method selection across the landscape; this skill's Step 0 tree only checks tool-fit once the question is already a quant-validation candidate.
- **`craft-critique`** owns the evidence-discipline protocol; every generalization from a test result and every external claim in a results read follows it.
