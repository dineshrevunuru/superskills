---
name: choose-research-method
description: "Selects the right UX research method for a given research question using NN/g's 3-dimension framework (attitudinal/behavioral × qual/quant × context of use) across the 20-method landscape and the Discover/Explore/Test/Listen cycle. Use when someone asks 'what method should I use?', 'should we do a survey or interviews?', 'how do we find out if users…', 'what research should we run for this?', 'is a focus group right here?', or when a research question exists but no method has been chosen yet. Output is always: primary method + backup + why the rejected candidates fail the question."
---

# Choose Research Method

Turn one research question into one defensible method choice — primary, backup, and named rejects — before any study is planned or any instrument is written.

## When to use / when NOT to use

**Use when:**
- A research question (or a stakeholder ask that hides one) exists and the method is undecided.
- Someone proposes a method by habit ("let's run a survey") and you need to check it against the question.
- Budget or timeline killed the first-choice method and you need the defensible fallback.

**NOT this skill:**
- No research question yet, only a vague problem → `write-problem-statement`, then `write-research-plan` (research questions are its Section 1).
- Method already chosen, need the full 5-section plan, sample size, logistics → `write-research-plan`.
- Method = usability testing and you're deciding mode/tasks/pilot → `plan-usability-test` and `write-task-scenarios`.
- Building the instrument itself → `write-interview-guide`, `write-survey`, `write-participant-screener`.
- Designing an A/B test or judging statistical vs practical significance → `use-quantitative-evidence`.
- No user access at all and you need an expert pass instead → `run-heuristic-evaluation` (evaluation, not research — it cannot answer questions about users).
- Data already collected → `synthesize-research-data`.

## The method

Walk these 7 steps in order. Do not skip to a method name before step 5.

### Step 1 — Sharpen the question
Rewrite the ask as one answerable, method-agnostic sentence. "Do people like the app?" is not answerable; "Where in the booking flow do first-time users stall, and why?" is.
- **Compound questions get decomposed.** "Where do they stall, and why?" is two sub-questions; each walks the tree separately and may land on a different method.
- If you cannot write the sentence, stop — the project needs `write-research-plan`, not a method.

### Step 2 — Axis 1: Say or Do?
- Question is about **what people think, feel, believe, want, or would prefer** → **attitudinal**.
- Question is about **what people actually do, or whether they can succeed at something** → **behavioral**.
- Hard rule: **what people say ≠ what people do.** A behavioral question answered with an attitudinal method (survey, focus group, interview) produces confident wrong answers. This is the #1 mis-pick — check it first.

### Step 3 — Axis 2: Why or How many?
- Need **why it happens / how to fix it** → **qualitative** (direct observation, small n, insight).
- Need **how many / how much / which is better** → **quantitative** (indirect measurement, large n, numbers).
- Qual finds problems; quant sizes them. If the ask contains a number ("what % of users…"), qual alone cannot answer it — and quant alone cannot explain it.

### Step 4 — Axis 3: Context of product use
- **Natural use** — people using the product on their own terms (field study, diary, analytics, A/B).
- **Scripted use** — you direct what they do (usability testing, benchmarking, eyetracking).
- **Not using the product** — the product is absent or irrelevant (interviews, card sorting, focus groups).
- **Hybrid/limbo** — product partially real (concept testing, participatory design).
- Rule of thumb: the earlier and more exploratory the question, the more natural the context should be; the more evaluative, the more scripted.

### Step 5 — Stage check: Discover / Explore / Test / Listen
Locate the project moment (table below). A method that fits the axes but the wrong stage still fails — card sorting during launch triage answers nothing anyone is asking.

### Step 6 — Shortlist and constraint pass
Filter the 20-method landscape table by your three axis values + stage. Then apply constraints in this order:
1. **Participant access** — can you reach real target users at all? In their environment?
2. **Product maturity** — no live product = no analytics, no A/B, no benchmarking.
3. **Traffic/sample** — quant methods need volume; a thin beta cannot feed an A/B test.
4. **Time and budget** — field studies and diary studies cost weeks; pick the backup that answers the same axes faster.
5. **Team skill** — an unskilled moderator biases interviews more than an unmoderated tool does.
A constraint may demote your primary to backup, but it may never flip an axis — do not swap a behavioral question to a survey because the survey is cheaper. Say the real answer is unaffordable and offer the least-bad behavioral option.

### Step 7 — Output the recommendation
One primary, one backup, every seriously-considered reject with the axis or constraint it fails (format below). If the choice rests on an unverified claim about users ("our users won't do remote sessions"), flag it per `craft-critique`'s evidence protocol.

## The 20-method landscape (NN/g)

| Method | Say/Do | Qual/Quant | Context | Answers questions like |
|---|---|---|---|---|
| Usability testing (lab, moderated) | Do | Qual | Scripted | Can users complete X? Where and why do they fail? |
| Field studies | Do | Qual | Natural | What do people really do in their environment? |
| Contextual inquiry | Do + Say | Qual | Natural | How does this workflow actually run, with workarounds? |
| Participatory design | Say | Qual | Hybrid | What do users value enough to build in themselves? |
| Focus groups | Say | Qual | Not using | What does a group say it wants? (rarely right for UX) |
| Interviews | Say | Qual | Not using | What do individuals believe, recall, want, and why? |
| Eyetracking | Do | Either | Scripted/Natural | What do people look at (and miss)? |
| Usability benchmarking | Do | Quant | Scripted | How usable is it, in numbers, vs last quarter / a rival? |
| Moderated remote usability | Do | Qual | Scripted | Same as lab testing, geography-free |
| Unmoderated remote panel | Do | Either | Natural/Scripted | Quick task success/failure at volume, no moderator |
| Concept testing | Say | Either | Hybrid | Does the value proposition land before we build? |
| Diary / camera studies | Say (about Do) | Qual | Natural | What happens over days/weeks that no session can see? |
| Customer feedback | Say | Either | Natural | What are self-selected users complaining/asking about? |
| Desirability studies | Say | Either | Scripted | Which aesthetic/brand qualities do people attribute? |
| Card sorting | Say | Either | Not using | How do users mentally group our content? |
| Tree testing | Do | Quant | Not using | Can users find things in the proposed IA? |
| Analytics | Do | Quant | Natural | What are users doing at scale — where do they drop? |
| Clickstream | Do | Quant | Natural | What paths do users actually take? |
| A/B testing | Do | Quant | Natural | Which variant performs better on a live metric? |
| Surveys | Say | Quant | Varies | How many users report X? How satisfied are they? |

## Stage map — Discover / Explore / Test / Listen

| Stage | The question sounds like | Reach for first | Also fits |
|---|---|---|---|
| **Discover** (Strategize) | "What problems do people have? What's really going on?" | Field studies, contextual inquiry, user + stakeholder interviews | Diary studies, desk research, competitive testing |
| **Explore** (Design) | "How should we structure/shape the solution?" | Card sorting, tree testing, concept testing | Journey mapping inputs, paper-prototype feedback, participatory design |
| **Test** (Design→Launch) | "Does what we built work for people?" | Qualitative usability testing | Benchmarking, accessibility evaluation, eyetracking |
| **Listen** (Launch & Assess) | "How is it doing out there? How big is the problem?" | Analytics, surveys | A/B testing, customer feedback, search-log review |

Cheap triangulation rule: when two methods from different rows of the say/do axis fit the budget, run both — behavioral tells you *what*, attitudinal tells you *why*, and agreement between them upgrades confidence (per NN/g triangulation guidance). Contradiction between them is a finding, not a failure: trust the behavioral data for what happened.

## Worked example

**Ask (salon client, booking app in beta):** "Do people find the booking flow easy?"

**Step 1 — Sharpen + decompose:**
- Q1: *Where in the booking flow do first-time users fail or stall?*
- Q2: *Why do stalled users abandon instead of recovering?*

**Steps 2–4 — Axes (Q1):** Do (behavioral — "fail or stall" is observed, not reported) · Qual (need *where/why*, not *how many* yet) · Scripted (direct users through booking) → shortlist: usability testing, moderated remote, unmoderated panel.
**Step 5 — Stage:** Test.
**Step 6 — Constraints:** beta traffic too thin for analytics funnels or A/B; target users are local salon clients, reachable in person; solo researcher, limited hours → moderated remote testing keeps travel out and observation in.

```
## Method recommendation: booking-flow ease (beta)

Q1 — Where do first-time users fail or stall?
  Primary: Moderated remote usability testing, 5 users, think-aloud
    — behavioral + qual + scripted matches the question exactly;
      beta stage means observed failure is the only trustworthy signal.
  Backup: Unmoderated remote panel (same tasks)
    — if scheduling with real salon clients falls through; loses
      probing depth, keeps behavioral observation.

Q2 — Why do stalled users abandon?
  Primary: Post-task probing inside the same sessions (no second study).
  Backup: Short interviews with beta users who abandoned.

Rejected:
  - Survey — attitudinal; asks users to SAY whether booking is easy.
    Say ≠ do: fails Axis 1 for a behavioral question.
  - Analytics funnel — right axes (do + quant + natural) but fails the
    constraint pass: beta traffic can't support it yet. Revisit at Listen
    stage post-launch.
  - Focus group — say-not-do, plus group opinion about a flow nobody
    operates in-session answers neither sub-question.

Evidence flag: "salon clients won't join remote sessions" is assumed,
not verified — confirm with the client before demoting the primary.

Next: hand the primary to plan-usability-test + write-task-scenarios.
```

## Anti-patterns / red flags

- **Method-first thinking.** "We always do interviews" / "leadership wants a survey." The question picks the method; habit doesn't. Re-run from Step 1.
- **Survey for a behavioral question.** The cheapest method is a wrong answer at a discount. If the verb in the question is *do, use, complete, find, fail* — the method must observe, not ask.
- **Analytics to answer "why."** Numbers say *what* and *how much*, never why. Pair with a qual method or don't claim causes.
- **Focus group as default.** Groupthink + say-not-do; almost never the right UX method. Demand a specific reason (e.g., group dynamics ARE the research object) before accepting one.
- **A/B testing an unvalidated design.** Optimizing between two variants nobody can use ranks the failures. Qual-test first, A/B later.
- **Reporting qual counts as stats.** "3 of 5 users = 60%" is fiction — sizing claims belong to quant methods (`use-quantitative-evidence` owns this rule).
- **Concept testing as usability proof.** "They loved the idea" says nothing about whether they can operate the build.
- **One method, high-stakes claim.** A launch-gating conclusion from a single source is under-evidenced — triangulate or flag it per `craft-critique`.
- **Constraint laundering.** Quietly downgrading a behavioral question to an attitudinal method "because budget" without telling anyone. Name the tradeoff in the Rejected section; let the owner decide.

## Output format

```markdown
## Method recommendation: [sharpened research question]

Q[n] — [sub-question]
  Primary: [method] — [axes matched + stage + deciding constraint]
  Backup:  [method] — [what constraint kills the primary; what the backup loses]

Rejected:
  - [method] — [the axis it fails, or the constraint, in one line]

Evidence flag: [any unverified assumption the choice rests on — or "none"]

Next: [which sibling skill takes over — plan/instrument]
```

Every reject line must name the failing axis or constraint. "Not a good fit" is not a reason.

## Sources

- NN/g, "When to Use Which User-Experience Research Methods" (3-dimension framework + 20-method landscape): https://www.nngroup.com/articles/which-ux-research-methods/
- NN/g, "A Guide to Using User-Experience Research Methods": https://www.nngroup.com/articles/guide-ux-research-methods/
- NN/g, "UX Research Cheat Sheet" (Discover/Explore/Test/Listen): https://www.nngroup.com/articles/ux-research-cheat-sheet/
- NN/g, "Context Methods: Field and Diary Studies" (natural-context selection): https://www.nngroup.com/articles/context-methods-field-diary-studies/
- NN/g, "Triangulation: Get Better Research Results by Using Multiple UX Methods": https://www.nngroup.com/articles/triangulation-better-research-results-using-multiple-ux-methods/

## Boundaries

- **write-research-plan** owns everything after the method is chosen: research questions in full form, sample size, procedure, logistics. This skill hands off to it.
- **plan-usability-test / write-task-scenarios** own execution once the answer is "usability testing."
- **write-interview-guide / write-survey / write-participant-screener** own instrument construction; this skill never drafts questions.
- **use-quantitative-evidence** owns A/B design, significance judgment, and the never-metrics-from-n=5 rule.
- **run-heuristic-evaluation** owns the no-users-available expert-review path — an evaluation method, not a research method; it cannot stand in for user data.
- **craft-critique** owns the evidence-discipline protocol referenced here; never restate it.
