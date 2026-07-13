---
name: name-and-control-bias
description: "The canonical bias-and-validity reference for all research — every named bias paired with a concrete control, internal vs external validity separated. A CANONICAL REFERENCE other skills load before designing a study or trusting a finding, the way craft-critique is loaded for evidence discipline. Use when someone asks 'is this biased?', 'what biases are in play?', 'validity threats', 'will this generalize?', 'how do I control for X', 'is my sample skewed', 'non-response / self-selection / survivorship', or before fielding any study and before believing any result. Names biases as an engineering problem with controls — never 'just be objective'."
---

# Name and Control Bias

Bias is not a moral failing to feel bad about — it is a set of named, predictable failure modes, each with a known control. This is the single source of truth for that mapping. Other research skills carry local lint lists (interview L-catalog, survey S-catalog, screener red flags); those are *instances* of this reference. When they conflict, this file wins.

## How to use this reference

You are almost always here because another skill said "load `name-and-control-bias`." Two modes:

- **Fast triage (scrappy path):** before fielding, run only the **Top 5 study-killers** (below) against your design. 10 minutes. Use for low-stakes or time-boxed freelance studies.
- **Full audit (rigor path):** walk every lifecycle stage, name each bias actually in play for *this* study, attach its control, and separate internal- from external-validity threats. Use for any finding that will gate a decision, any external-facing claim, any client deliverable.

**Situational, not a checklist to run identically.** A bias that cannot touch your claim is noise — do not "control" for biases that don't threaten *this* study. Name the ones that actually endanger the specific conclusion you want to draw, and spend your controls there. Completing the list is not the goal; surviving "how could this conclusion be wrong?" is.

## The one rule that separates this from theater

**Awareness is not a control.** "We tried to stay objective," "we used a neutral tone," "we know about confirmation bias" — none of these are controls. A control is a *concrete change to the study* (a recruit channel, a question rewrite, a second coder, a randomized order) that removes or bounds the bias whether or not anyone stays vigilant. If your mitigation depends on the researcher remembering to be good, it is not a control.

## Top 5 study-killers (run these every time)

| # | Bias | The tell | Concrete control |
|---|------|----------|-----------------|
| 1 | **Self-selection** | You recruited whoever volunteered / was easy to reach | Screen against motivation; mix ≥2 recruit channels; name who's systematically absent |
| 2 | **Leading / framing** | Questions carry the answer ("How much easier is the new flow?") | Neutral rewrite + fresh-eyes review of the guide/survey before fielding (see `write-interview-guide`, `write-survey`) |
| 3 | **Confirmation (analyst)** | You coded the data and it agreed with what you expected | Mandatory disconfirming-case hunt; second coder or fresh-eyes pass on analysis |
| 4 | **Social desirability** | Participants praised a thing in front of the people who made it | Ask past behavior not opinion; ensure/assure independence & anonymity; never moderate praise of your own work |
| 5 | **Small-n overgeneralization** | "3 of 6" became "50% of users" | Claim calibration — report prevalence as *X of Y*, never a % on qual n (see `craft-critique`, `size-and-justify-samples`) |

If you do nothing else, do these five. Most published-then-regretted UX conclusions die on one of them.

## Full audit — biases by lifecycle stage

### Stage 1 — Sampling & recruiting (external-validity threats)
| Bias | What it does | Control |
|------|-------------|---------|
| **Sampling / selection** | Sample doesn't represent the target population | Define the sampling frame explicitly; recruit against it; report the delta between who you wanted and who you got |
| **Self-selection** | Volunteers differ systematically (more engaged, more opinionated) | Screen for motivation; diversify channels; caveat findings toward the volunteer profile |
| **Non-response** | Those who ignored the invite differ from those who answered | Track response rate; compare respondents to the frame on known attributes; chase a non-responder subsample |
| **Survivorship** | Only current/successful users are in the data; the churned, the failed, the lapsed are invisible | *Deliberately recruit* dropouts, churned accounts, task-failers — the absent cases usually hold the finding |
| **Coverage / WEIRD** | Over-reliance on Western, educated, available, English-speaking samples | Represent the margins; for non-Western or multilingual populations route to `research-across-cultures`; for disability inclusion route to `run-inclusive-research` |

### Stage 2 — Instrument & question design
| Bias | What it does | Control |
|------|-------------|---------|
| **Leading / framing** | Wording implies the "right" answer or embeds a premise | Strip the premise; ask for the experience, not the verdict |
| **Acquiescence** ("yea-saying") | Tendency to agree regardless of content | Balanced scales, some reverse-coded items, prefer behavioral questions over agree/disagree |
| **Social desirability** | The flattering answer beats the true one | Ask about *past behavior* not intentions; indirect/third-person framing; guarantee anonymity |
| **Prestige / demand** | Participant reports what sounds impressive or what they think you want | Neutral framing; avoid signaling the hoped-for outcome |
| **Double-barreled** | One item asks two things; the answer is uninterpretable | Split into two items (survey S-catalog is the instance of this rule) |

### Stage 3 — Moderation & data collection
| Bias | What it does | Control |
|------|-------------|---------|
| **Hawthorne / observer** | People behave differently because they're watched | Naturalistic tasks; warm-up to reduce salience; longer sessions so the mask slips; unmoderated where feasible |
| **Demand characteristics** | Participant guesses the hypothesis and "helps" by confirming it | Don't telegraph the purpose; neutral task framing; misdirect emphasis where ethical |
| **Interviewer / confirmation (live)** | Moderator hears what they expect, probes selectively | Pre-written neutral probes only; a disconfirming probe per topic; second observer taking independent notes |
| **Order / priming** | Earlier questions or stimuli shape later answers | Randomize/counterbalance question and stimulus order; separate topics; note carryover in analysis |

### Stage 4 — Analysis & interpretation (internal-validity threats)
| Bias | What it does | Control |
|------|-------------|---------|
| **Confirmation (analyst)** | Coding drifts to fit the expected story | Fix research questions before data; hunt disconfirming cases explicitly; second coder / fresh-eyes pass |
| **Anchoring** | The first vivid session sets the frame for all the rest | Code systematically across all data before concluding; weight by prevalence not by memorability |
| **Recency / salience / availability** | The most vivid or most recent quote dominates | Prevalence counts (*X of Y participants*); a quote is an illustration of a counted pattern, never the evidence itself |
| **Cherry-picking** | Only supporting quotes make the report | Traceability: every insight = observation + tag + source; report negative/disconfirming cases in the same deck |
| **Overgeneralization** | Small-n qual becomes a population rate | Calibrate the claim to the evidence and bound its generalizability (`craft-critique`, `size-and-justify-samples`) |

### Stage 5 — Study-level confounds (internal-validity threats beyond the analyst)

Person-level biases aren't the only way a finding is wrong *within* the study. The moment your claim is about **change** — pre/post a redesign, an A/B, a longitudinal wave — name these design confounds, or an unrelated cause gets credited to your change:

| Confound | What it does | Control |
|------|-------------|---------|
| **History** | An outside event (a promo, an outage, a season) moved the metric — not your change | Concurrent control/holdout group; log external events; never attribute a shift to the design alone |
| **Maturation** | Participants got more expert / more tired over time regardless of the design | Counterbalance; control group; keep sessions short enough that fatigue isn't the story |
| **Instrumentation** | The measure drifted — reworded task, redefined metric, a different moderator between waves | Version-lock the instrument and metric definitions across waves; one protocol |
| **Regression to the mean** | You sampled an extreme (worst pages, angriest users); they drift toward average with no change at all | Don't select on the extreme then read the rebound as impact; compare against a baseline |
| **Testing / practice** | Being measured once changes the second measurement (they learned the task) | Between-subjects where feasible; separate practice trials; model the learning curve |

## Internal vs external validity — state which you're claiming

- **Internal validity** — is the finding real *within this study*? Threatened by the instrument, moderation, and analysis biases (Stages 2–4) and by study-level confounds (Stage 5). A well-run 6-person study can have strong internal validity.
- **External validity** — does it generalize *beyond* this sample and context? Threatened by the sampling biases (Stage 1), WEIRD coverage, and artificial task context.
- **The rule:** name which one your claim needs. Small-n qual typically earns decent internal validity and weak external validity — so it can say "here is a real barrier these users hit" (internal) but not "40% of the market hits this barrier" (external). Conflating the two is the most common over-claim; `craft-critique` enforces the calibration, this file names why.

## Worked example — a bias audit that catches four killers

**Study as proposed:** "Booking-flow validation. We interviewed 6 beta clients of a salon's booking app; 5 said the new flow is easier; recommend shipping."

Run the audit — it catches four:

1. **Self-selection (Stage 1):** the 6 were the *engaged beta opt-ins* — the clients who never returned after one confusing attempt were never in the room. → *Control:* recruit 3–4 lapsed/abandoned bookers; they hold the abandonment finding.
2. **Social desirability (Stage 3):** interviews ran *at the salon*, moderated by someone the clients associate with the business, about the business's own product. Praise is the polite default. → *Control:* independent/anonymous setting; ask "walk me through your last booking" (behavior) not "is the new flow easier?" (verdict).
3. **Survivorship (Stage 1):** "5 of 6 said easier" is 5 of 6 *who completed a booking*. The people the flow defeated aren't counted. → *Control:* include task-failers; report completion context.
4. **Overgeneralization (Stage 4):** "5 of 6" is being read as ~83% approval. → *Control:* report as "5 of 6 interviewed beta clients," confidence **Low** for a ship decision, and triangulate with booking-funnel analytics before the flow gates launch.

**Verdict:** the finding has weak internal validity (social-desirability + leading setting) *and* weak external validity (self-selection + survivorship) — it cannot gate a ship decision as written. The fix is not "be more objective"; it is four concrete design changes. And a Stage-5 threat it does *not* yet need a control for: the "easier *now*" framing invites history and regression-to-the-mean confounds — but the study never established a baseline, so those cannot touch the claim until the design is fixed. Naming a threat and correctly declining to spend a control there is the discipline, not a gap.

Notice what the audit did: it did not run the whole catalog. It named the four biases that actually endanger *this* claim ("ship the flow") and attached a control to each. That is the situational discipline.

## Output format — the bias audit

Report a bias audit as a table plus a validity verdict. One row per bias *actually in play* for this claim — never the whole catalog.

```markdown
## Bias audit: [the specific claim being tested]

| Bias | Stage | The tell (in THIS study) | Control (concrete change) | Residual risk | Validity hit |
|------|-------|--------------------------|---------------------------|---------------|--------------|
| …    | 1–5   | …                        | …                         | High/Med/Low  | Internal / External |

**Internal validity:** [strong / weak — why]
**External validity:** [strong / weak — why]
**Verdict:** [Can this claim gate the decision it is aimed at? If not, the concrete fixes that would let it — not "be more careful."]
```

The **residual-risk** column is the second honesty check (the first is "awareness is not a control"): a control *bounds* a bias, it rarely zeroes it. State how much risk is left after the control — never imply the fix made the bias vanish.

## Anti-patterns / red flags

- **"We were aware of confirmation bias."** Awareness is not a control. What did you *change*?
- **Controlling for biases that can't touch the claim.** Auditing survey-order effects on a 6-person contextual study is theater; spend controls where the claim is actually exposed.
- **Treating a big sample as a bias fix.** A large self-selected or non-representative sample is *precisely* wrong at scale. n fixes precision, not bias.
- **Reporting only convergence.** If two sources agree, say so; if they diverge, that's a finding to investigate, not to drop (see `integrate-mixed-methods`).
- **"Neutral tone" as the whole mitigation for social desirability.** Independence and behavioral questioning are the controls; tone is not.
- **Naming a bias and stopping.** A named bias with no attached control, applied to the design, is a footnote, not rigor.
- **Confusing internal and external validity** — claiming generalization from a study that only earned internal validity.

## Boundaries

- **`craft-critique`** owns the evidence-discipline verdict (cite / get / flag under-evidenced, claim-strength calibration). This skill supplies the *named biases and controls* that discipline points at; load both when auditing a conclusion.
- **`size-and-justify-samples`** owns how many participants and the "n too small to claim this" gate; this skill owns whether the *composition* of that sample is biased.
- **`write-interview-guide` / `write-survey` / `write-participant-screener`** carry local question/recruit lint lists — those are instances of Stages 2 and 1 here; this file is their source of truth.
- **`research-across-cultures`** and **`run-inclusive-research`** own the controls for WEIRD-coverage and disability-representation biases named in Stage 1.
- **`integrate-mixed-methods`** owns triangulation mechanics; this skill flags when a single-source finding *needs* triangulation.

## Sources

- Nielsen Norman Group — "Confirmation Bias in UX" (analyst/interviewer confirmation, Stages 3–4): https://www.nngroup.com/articles/confirmation-bias-ux/
- Nielsen Norman Group — "Avoid Leading Questions to Get Better Insights from Participants" (leading/framing, Stage 2): https://www.nngroup.com/articles/leading-questions/
- Nielsen Norman Group — "6 Mistakes When Crafting Interview Questions" (demand, social-desirability, double-barreled in interviews, Stages 2–3): https://www.nngroup.com/articles/interview-questions-mistakes/
- Nielsen Norman Group — "Writing Good Survey Questions: 10 Best Practices" (acquiescence, double-barreled, response bias in surveys): https://www.nngroup.com/articles/survey-best-practices/
- Nielsen Norman Group — "Recruiting and Screening Candidates for User Research Projects" (self-selection & sampling composition, Stage 1): https://www.nngroup.com/articles/recruiting-screening-research-candidates/
- Nielsen Norman Group — "Triangulation: Get Better Research Results by Using Multiple UX Methods" (why a single-source finding needs corroboration): https://www.nngroup.com/articles/triangulation-better-research-results-using-multiple-ux-methods/
- Sauro & Lewis, *Quantifying the User Experience* — validity, confidence, and sampling (basis for the internal/external split and small-n calibration)
