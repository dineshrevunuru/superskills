---
name: plan-usability-test
description: "Plans a usability test end-to-end the NN/g way: study goals → qual/quant fork → sample size (5-user rule and exactly when it fails) → moderated/unmoderated × remote/in-person mode choice → recruiting numbers → mandatory pilot with fix-then-freeze. Use when asked to 'plan a usability test', 'set up user testing', 'test this prototype/app/flow', 'how many users do I need', 'is 5 users enough', 'moderated or unmoderated?', 'remote or in-person?', or when a stakeholder wants metrics from a small study. Produces a complete test plan document."
---

# Plan Usability Test

Turn a research question into a defensible usability test plan: right sample size, right mode, piloted before a single real participant sits down.

## When to use / when NOT to use

**Use when:**
- Someone needs to evaluate whether users can accomplish tasks in a design, prototype, or live product
- Deciding sample size, study mode, or session logistics for any usability study
- A stakeholder demands "statistically significant" results and you must size the study honestly
- Defending a small-N study to skeptics

**Do NOT use when — hand off instead:**
- Writing the actual task scenarios → `write-task-scenarios` (this skill decides *how many* tasks and *what kind*; that skill writes them)
- Writing the screener survey or recruiting logistics detail → `write-participant-screener`
- Running the live session (think-aloud, probing) → `moderate-usability-session`
- Turning session notes into findings and severity ratings → `analyze-usability-data`
- Choosing between usability testing and 19 other research methods → `choose-research-method` (come here only after usability testing is the chosen method)
- Designing an A/B test or interpreting quant significance → `use-quantitative-evidence`
- Picking long-haul product metrics (SUS/HEART/benchmark waves) → `define-ux-success-metrics`

## The method (NN/g planning chain: goals → method → tasks → recruit → pilot)

Execute in order. Each step gates the next — do not pick a sample size before the qual/quant fork, do not recruit before the mode is fixed.

### Step 1 — Define study goals
- Write 2–4 research questions the study must answer. Answerable, specific, scoped to a part of the product: "Can first-time visitors book an appointment without help?" — not "Is the app usable?"
- Name the scope explicitly (which flows, which platform, which fidelity). The 5-user math applies *per scope tested* — a study of one flow says nothing about the flows you didn't test.
- Get stakeholder sign-off on the questions NOW. Scope added after recruiting starts breaks the plan.

### Step 2 — The qual/quant fork (this decides everything downstream)
Ask: **insights or numbers?**

| Goal | Study type | What you get | What you must NOT claim |
|---|---|---|---|
| Find and fix problems | Qualitative (formative) | Observed failures, confusions, why they happen | Any percentage. "3 of 5 users failed" is an observation, not a 60% failure rate |
| Measure performance against a target or baseline | Quantitative (summative) | Success rate, time-on-task, error rate with margins | Anything about *why* — pair with qual if you need causes |

**Hard rule:** never report metrics from a qualitative-sized study. Numbers from n=5 have margins of error so wide they are noise (NN/g: "Why You Cannot Trust Numbers from Qualitative Usability Studies"). If the plan promises numbers, it must budget for the quant sample sizes in Step 3 — otherwise renegotiate the promise, don't fake the math.

### Step 3 — Sample size decision tree

```
Is the goal qualitative problem-finding?
├── YES → Is the user population one roughly-homogeneous group
│         (same tasks, same context of use)?
│         ├── YES → 5 users. Done.
│         └── NO — genuinely divergent segments (different tasks or
│             wildly different domain knowledge, e.g. patients vs
│             clinicians) → 3–4 users PER segment.
│             Two similar personas ≠ divergent segments. Divergence
│             means they'd hit DIFFERENT problems, not just differ
│             demographically.
└── NO → What are you measuring?
    ├── Task metrics (success rate, time, errors) → ~40 participants
    ├── Eyetracking heatmaps → ~39 users per heatmap
    ├── Card sorting → ~15 participants
    └── Benchmark wave (trend over releases) → ~35+ per wave
        (then this is a program — see define-ux-success-metrics)
```

**Why 5 works for qual:** problems found ≈ N(1 − (1 − L)^n), with average per-user discovery rate L ≈ 31%. At n=5 that's ~85% of the problems *in the tested scope*. Users 6+ mostly re-show you what you've already seen.

**The iteration corollary (spend the budget here):** 3 rounds of 5 users with fixes between rounds beats 1 round of 15. Round 1 finds the big problems, the fix creates new questions, rounds 2–3 catch what the fixes broke. If the budget covers 15 participants, the default plan is 5 × 3 iterations — one 15-user study is the anti-pattern.

**Defending small N to skeptics:** the goal of a qual test is finding-and-fixing, not statistical proof. Show the discovery curve, show the per-problem evidence (clips, quotes), and offer a quant follow-up study for any claim that needs a number. Handle every claim in the readout per `craft-critique`'s evidence-discipline protocol — observed problems are citable evidence; extrapolated percentages from n=5 are not.

### Step 4 — Mode selection (moderated/unmoderated × remote/in-person)

| Mode | Cost / speed | Data depth | Use when | Invalid when |
|---|---|---|---|---|
| **Moderated in-person** | Highest cost, slowest | Richest — body language, environment, hands on hardware | Hardware/physical products; assistive-tech users on their own devices; fragile prototypes needing a wizard; sensitive topics | Budget/geography can't support it and remote loses nothing |
| **Moderated remote** | Medium — no travel, wider recruit pool | Near in-person depth: live probing, clarification, task repair | **Default for most studies.** Early prototypes, complex flows, exploratory "why" questions | Participant can't run the tech; you need their physical context |
| **Unmoderated remote** | Cheapest — ~20–40% cheaper, saves ~20 researcher-hours; runs in parallel, overnight | Thinnest — no probing, no clarification, no repair | Stable UI, simple well-defined tasks, larger N needed fast, natural-environment behavior | Exploratory/why questions; fragile prototypes; tasks needing any mid-session judgment. Platform ceiling ≈ 20 min/session |
| **Unmoderated in-person** | Rare (kiosk / lab intercept) | Thin | Walk-up kiosk hardware | Almost everything else — skip by default |

Decision shortcuts:
- Need to ask "why" or "what did you expect?" mid-task → **moderated**, no exception.
- Prototype might break or dead-end → **moderated** (a moderator repairs; an unmoderated participant just quits and the data point is garbage).
- Quant study at ~40 participants → **unmoderated remote** is usually the only affordable mode; accept the depth loss, it's a numbers study anyway.
- Testing with screen-reader / assistive-tech users → **in-person, their own equipment** (see `audit-accessibility` for the full protocol).

### Step 5 — Tasks
Decide count and type here; write them in `write-task-scenarios`.
- Qualitative session: 4–8 tasks in ~60 min moderated; ≤5 short tasks in a 20-min unmoderated session.
- Quantitative: every task needs one concrete, machine-checkable success state — no open-ended exploration.
- Order: warm-up task first, highest-priority research questions next (fatigue kills the last task's data), independent tasks so one failure doesn't cascade.

### Step 6 — Recruit
- Define the participant profile by **behavior and context, not demographics** ("booked a service appointment online in the last 3 months", not "women 25–40").
- Screener writing → `write-participant-screener`.
- Over-recruit for no-shows: +1 floater per 5 moderated sessions; +15–20% for unmoderated.
- Schedule moderated sessions with 30-min gaps for reset and debrief notes.

### Step 7 — Logistics (fix before pilot)
- Session length (60 min moderated typical; ≤20 min unmoderated), incentive, consent + recording permission, prototype links tested on the participant-facing device, note-taking template, observer ground rules.

### Step 8 — Pilot: mandatory, with fix-then-freeze
No plan ships without a pilot session. Not optional at any budget.

1. **Schedule** the pilot ≥2 days before the first real session — enough runway to fix what it finds.
2. **Run** a full dress rehearsal with one participant (a colleague outside the project is acceptable; a real recruited user is better).
3. **Validate** all five: task wording understood as intended · session fits the time slot · task order has no cascades · screener actually selected the right person · tech works end-to-end (links, recording, remote platform).
4. **Fix** everything the pilot exposed.
5. **Freeze.** After the first real session begins, the protocol is immutable — no reworded tasks, no reordered lists, no new questions. Mid-study edits make sessions incomparable and the findings unaggregatable.
6. **Pilot data is keepable as a real data point only if nothing changed.** Changed one word of one task? The pilot is calibration, not data.

**For unmoderated studies the pilot is doubly mandatory:** there is no moderator to repair a broken task, so a flawed task silently ruins every parallel session at once. Pilot the exact platform flow a participant will see, including the intro screens.

## Worked example — filled plan

Context: salon booking app in beta (Dinesh's shipped freelance work); question is whether new clients can book unaided before wide release.

```markdown
# Usability Test Plan — Booking App Beta, First-Booking Flow
Date: 2026-07-14 · Owner: Dinesh · Status: pilot scheduled 2026-07-16

## 1. Research questions
RQ1 Can a first-time user book an appointment without assistance?
RQ2 Where do users hesitate or stall between service selection and confirmation?
RQ3 Do users understand what happens after booking (confirmation, reminders)?
Scope: booking flow only, iOS beta build. Excludes: rebooking, cancellation, admin app.

## 2. Study type
Qualitative / formative — find and fix before release. No metrics will be
reported from this study. (Quant benchmark deferred to post-launch, n≈40.)

## 3. Participants
Profile (behavioral): booked any personal-service appointment online in the
last 3 months; has NOT used this app; owns an iPhone.
N = 5 (single segment — new clients all attempt the same flow).
Recruit 6 (1 floater). Screener: see write-participant-screener output.

## 4. Mode
Moderated remote (video call + screen share of beta build).
Why: beta may dead-end (moderator repair needed) and RQ2 requires live probing.
In-person rejected: no hardware/context dependency justifies the cost.
Unmoderated rejected: fragile build + "why" questions = invalid mode.

## 5. Tasks (written in write-task-scenarios)
T1 warm-up: browse services · T2 book a specific service (RQ1, RQ2)
T3 locate confirmation details (RQ3) · T4 open exploration of anything unclear
Session: 45 min + 15 min buffer.

## 6. Logistics
Incentive: $50 gift card · Consent + recording form sent at scheduling
Observers: silent, questions routed to moderator via chat, debrief after each
session · Notes: one observation per note, observation ≠ interpretation.

## 7. Pilot — 2026-07-16 (2 days before session 1)
Validate: task wording, 45-min fit, task independence, screener accuracy,
screen-share of beta build on participant's own iPhone.
Fix-then-freeze: protocol locked after pilot fixes; pilot counts as data
only if zero changes result.

## 8. Limitations (stated up front, per craft-critique evidence protocol)
Findings are problem discoveries in the booking flow only; no population
percentages will be claimed. Untested flows carry no evidence either way.
```

## Anti-patterns / red flags

| Red flag | Why it fails | Fix |
|---|---|---|
| "We tested with 5 users: 80% success rate" | Fake quant — n=5 margins are noise | Report observed problems; run n≈40 if a number is required |
| One 15-user study to "be thorough" | Same problems found 3×, zero fixes validated | 3 iterations × 5 users, fix between rounds |
| 5 users total across patients + clinicians | Divergent segments hit different problems | 3–4 per segment |
| Unmoderated study with "explore and tell us why" tasks | No probing exists in the mode; you get silence or fiction | Moderated, or rewrite as concrete tasks |
| Skipping the pilot to hit a deadline | First real session becomes the pilot — that data is burned anyway | 1 pilot ≥2 days out; it's cheaper than one wasted participant |
| Rewording a confusing task after session 2 | Sessions 1–2 and 3–5 are now different studies | Freeze after pilot; log the flaw, fix next round |
| Recruiting by demographics ("millennials") | Demographics don't predict behavior with the product | Screen on behavior + context |
| 40-min unmoderated session plan | Platforms cap ~20 min; participants rush or drop | Cut tasks or switch to moderated |
| Sample size chosen before the qual/quant fork | The fork determines N, not the other way around | Run Step 2 first, always |

## Output format

Produce a single test-plan document with exactly these sections (as in the worked example): **1 Research questions + scope · 2 Study type (qual/quant + what will NOT be claimed) · 3 Participants (profile, N with justification, recruit count) · 4 Mode (chosen + rejected modes with reasons) · 5 Tasks (count, order, pointer to write-task-scenarios) · 6 Logistics · 7 Pilot date + fix-then-freeze note · 8 Limitations.**
A plan missing section 2's "will not claim" line or section 7's pilot date is incomplete — do not present it.

## Sources

- 5-user rule + discovery curve: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- When 5 fails / how many users: https://www.nngroup.com/articles/how-many-test-users/
- Qual-okay, quant-wrong split: https://www.nngroup.com/articles/5-test-users-qual-quant/
- Quant sample sizes (~40, ~39 eyetracking, ~15 card sort): https://www.nngroup.com/articles/summary-quant-sample-sizes/
- Planning checklist (goals → method → tasks → recruit → pilot): https://www.nngroup.com/articles/usability-test-checklist/
- Pilot testing / fix-then-freeze: https://www.nngroup.com/articles/pilot-testing/
- Unmoderated testing constraints: https://www.nngroup.com/articles/unmoderated-usability-testing/
- Never trust numbers from qual studies: https://www.nngroup.com/articles/true-score/

## Boundaries

- **write-task-scenarios** owns writing the tasks; this skill only sets count, type (concrete vs exploratory), and order.
- **write-participant-screener** owns screener questions and recruiting logistics detail; this skill sets the profile and N.
- **moderate-usability-session** owns everything inside the live session; **analyze-usability-data** owns everything after it.
- **use-quantitative-evidence** owns A/B tests and statistical interpretation; this skill only routes quant goals to the right sample size.
- **define-ux-success-metrics** owns metric/instrument selection (SUS, SEQ, HEART) and benchmark programs.
- **audit-accessibility** owns testing protocol adaptations for assistive-tech participants.
- **craft-critique** owns the evidence-discipline protocol — claims in plans and readouts are handled per that skill, never restated here.
