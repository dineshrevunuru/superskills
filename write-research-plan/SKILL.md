---
name: write-research-plan
description: "Writes a complete one-page UX research plan using NN/g's 5-section structure (Purpose & Goals, Participants, Method & Procedure, Logistics, Relevant Documents) — with method-agnostic research questions, a saturation-based sample size, and a mandatory feasibility gate. Use when preparing ANY user research: 'write a research plan', 'plan this study', 'prepare user research', 'set up user interviews', 'how many participants do we need', 'what should our research questions be', or when a stakeholder asks for research and no plan document exists yet. NOT for choosing the method itself (choose-research-method) or writing the questions asked to participants (write-interview-guide)."
---

# Write a Research Plan

Turn a research request into a one-page plan another researcher could run without you — before any participant is contacted.

*Altitude: this is a rigor-enforcer, not a tutorial. It assumes you know what a research question is and exists to catch what you skip under deadline — a missing decision, imaginary user access, a plan with no buffer. Move fast where the brief is well-formed; slow down only at the gaps it flags.*

## When to use / when NOT to use

**Use when:**
- Any research activity is about to happen (interviews, usability test, survey, field study, diary study) and no plan document exists
- A stakeholder says "we should talk to users" — this skill converts the vague ask into a runnable plan
- Someone asks "how many participants?" or "what are we actually trying to learn?"
- An existing plan needs review (run the lint tables and feasibility gate against it)

**Do NOT use for:**
- Framing the problem the research serves → `write-problem-statement` (do that FIRST; a plan without a framed problem answers the wrong question efficiently)
- Selecting which method fits the questions → `choose-research-method` owns the attitudinal/behavioral × qual/quant landscape; this skill records its output in Section 3
- Writing the questions you will actually ask participants → `write-interview-guide`
- Writing the recruiting questionnaire → `write-participant-screener`
- Planning a usability test specifically → `plan-usability-test` (5-user rule, mode tradeoffs, pilots); this skill still supplies the wrapper plan

## Intake gate — pull the context before you draft (do this first)

**Smart gate: fill what you can from the request and surrounding context, then ask ONLY the unanswered questions below. Never re-ask what's already been said. Start drafting the moment questions 1–4 are answerable; 5–6 can ship as flagged gaps inside the plan.**

Ask only the gaps:

1. **The decision.** What gets decided differently because of this research, who owns that call, and when is it made? → No decision behind it = don't run the study.
2. **Your current belief.** What do you already think the answer is, and what's that based on — data, a stakeholder's assertion, or a hunch? → Becomes the evidenced/under-evidenced background; stops you researching what you already know.
3. **Access to users.** Who exactly are the users, and can you actually reach them — existing client/user list, a recruiting panel, or cold? → Recruiting is the long pole; hard access reshapes the whole plan.
4. **Time + budget reality.** Hard deadline, incentive budget, tools on hand, and your own hours to run *and* synthesize?
5. **Prior work.** What research, analytics, support tickets, or session recordings already exist that this should build on rather than rediscover?
6. **Scope.** Open discovery, or evaluating a specific thing you've already built?

**Expert shortcut:** if the brief already answers 1–4 ("plan interviews to decide whether the booking flow ships; users are our beta clients; call is in 3 weeks"), skip the interrogation — confirm the single real gap and draft. The gate exists to stop a confident plan built on a missing decision or imaginary access, not to slow a well-formed brief.

## The method

Work the steps in order. Each step fills one part of the NN/g 5-section plan (see Output format).

### Step 1 — Anchor to a decision, not curiosity

Write one sentence: *"This research exists so that [who] can decide [what] by [when]."*
- No decision named → stop. Ask the requester what they will do differently based on the findings. Research that informs no decision is time burn.
- The problem framing comes from `write-problem-statement` output when it exists. If it doesn't exist, flag that gap before proceeding.

### Step 2 — Write 3–5 research questions (Section 1: Purpose & Goals)

Research questions are what the TEAM needs to learn. They are **NOT interview questions** — never read one aloud to a participant.

| Property | Research question | Interview question |
|---|---|---|
| Audience | The team | The participant |
| Voice | Analytical, third person | Conversational, second person |
| Where it lives | Section 1 (Purpose & Goals) | Section 3 (Method & Procedure) / interview guide |
| Example | "What barriers prevent first-time clients from completing an online booking?" | "Walk me through the last time you booked an appointment online." |

Lint every research question:
- [ ] Method-agnostic (doesn't presume interviews vs survey vs test)
- [ ] Answerable by observing or asking users (not "should we build X?" — that's the decision, not the question)
- [ ] Specific enough that you'd recognize an answer when you see one
- [ ] Tagged **attitudinal** (what people say/believe) or **behavioral** (what people do) — `choose-research-method` needs these tags
- [ ] Not a disguised interview question (contains "you"? starts with "tell me"? → it's an interview question, move it out)

More than 5 questions → cut. A study that answers 3 questions well beats one that grazes 8.

Background claims justifying the study ("users are abandoning the flow", "clients keep calling instead of booking") are handled per `craft-critique`'s evidence protocol — apply it to every claim and record the result in the plan itself.

### Step 3 — Record the method (input from choose-research-method)

Run `choose-research-method` with the tagged research questions. Record in the plan: chosen method, backup method, and one line on why the method matches the questions. Do not re-derive the landscape here.

If the study compares 2+ conditions (designs, prototypes, flows), also record the study-design call:

| | Between-subjects | Within-subjects |
|---|---|---|
| Who sees what | Different people per condition | Same person sees all conditions |
| Learning transfer | None — clean | Real — counterbalance condition order |
| Participants needed | More (N per condition) | Fewer |
| Session length | Shorter | Longer — watch fatigue |
| Default | Comparing learnability or first impressions | Comparing preference or quick task variants |

### Step 4 — Define participants and size the sample (Section 2)

**Criteria:** behavioral over demographic. "Booked a service appointment online in the last 3 months" recruits better participants than "women 25–40." Write inclusion AND exclusion criteria (exclude: works in UX/market research, participated in a study in the last 6 months, employees of the client).

**Sample size — saturation over magic numbers.** There is no universally correct N. Calibrate with NN/g's 3 factors, then commit to a number with rationale:

1. **Diversity of the target group** — 2 distinct user segments ≈ double the base
2. **Scope of the research** — broad exploratory questions need more sessions than one narrow flow
3. **Researcher skill** — a skilled interviewer extracts more per session; if the moderator is new, add sessions

Decision tree:
- Exploratory/discovery interviews, one segment → start at **8–10** (NN/g: 5 is usually too few for exploratory research)
- Exploratory, 2+ segments → **6–8 per segment**
- Qualitative usability test of one flow → **5 per segment** is defensible (see `plan-usability-test` for exactly when the 5-user rule fails)
- Any quantitative claim ("X% of users…") → this plan is the wrong scope; route to `use-quantitative-evidence`

Write the saturation clause into the plan: *"Stop when 2 consecutive sessions surface no new themes; N above is the recruiting target, not a completion quota."* Over-recruit ~20% for no-shows (recruiting mechanics belong to `write-participant-screener`).

### Step 5 — Write the procedure so a stranger could run it (Section 3)

Method & Procedure must be replicable: session length, mode (in-person / remote moderated / unmoderated), session outline with time boxes, what is shown to participants and when, recording setup, and which participant-facing instruments are used (link them — don't inline them). This is where interview questions/tasks LIVE (by link); research questions never appear here.

Include a pilot: session 0 with a colleague or friendly user to shake out the guide, the prototype, and the timing. Findings from the pilot don't count as data.

### Step 6 — Logistics (Section 4)

Dates, locations/tools, incentive amount and delivery method, recording + consent process, team roles (moderator, notetaker, observers), and the recruiting timeline. **Recruiting is almost always the long pole — it starts the day the plan is approved, not the week of sessions.**

### Step 7 — Link relevant documents (Section 5)

Screener, interview guide or task list, consent form, prior research this builds on, the problem statement. Links, not copies — the plan stays one page.

### Step 8 — Run the feasibility gate (mandatory, before the plan ships)

A plan that cannot be completed on time is a liability, not a plan. All must pass:

- [ ] Total effort estimated realistically: recruiting + sessions + no-show buffer + synthesis (synthesis ≈ 1× the session time, minimum) — and it fits the decision deadline from Step 1
- [ ] Recruiting lead time counted (panels: days; niche B2B users: weeks)
- [ ] ≥20% schedule buffer — a plan filling 100% of available time fails
- [ ] Incentive budget approved or explicitly flagged as pending
- [ ] Pilot session scheduled
- [ ] Someone named as moderator and someone as notetaker for every session
- [ ] If any check fails: cut scope (fewer questions, one segment, remote instead of in-person) — never silently compress the timeline

## Worked example — discovery interviews for a salon booking app

```markdown
# Research Plan: How salon clients decide and book — v1 (2026-07-11)

## 1. Purpose & Goals
The booking app is in beta; the team must decide before launch whether the
booking flow matches how clients actually choose services. Support requests
suggest clients call the salon instead of finishing online bookings —
under-evidenced: call-log tally requested from front desk, due before sessions.

Research questions (team-facing — not asked to participants):
  RQ1. How do first-time clients decide which service and stylist to book? (behavioral)
  RQ2. What information do clients need before committing to an appointment? (attitudinal)
  RQ3. At what points do clients abandon online booking and fall back to phoning? (behavioral)
  RQ4. How do returning clients rebook — and what would make rebooking one step? (behavioral)

## 2. Participants
N = 9 (recruit 11; ~20% no-show buffer). One segment: adults who booked any
personal-care appointment online OR by phone in the last 3 months.
Rationale: single segment, moderately broad scope, experienced moderator →
8–10 range; 9 chosen to fit three sessions/day across three days.
Saturation clause: stop if 2 consecutive sessions surface no new themes.
Include: mix of first-time and repeat salon clients; mix of online and phone bookers.
Exclude: works in UX/research/marketing; salon employees or their relatives;
research participant in last 6 months.

## 3. Method & Procedure
Method: semi-structured interviews, 45 min, remote moderated (video call).
Backup: contextual inquiry at the salon if remote recall proves thin (per
choose-research-method output). No conditions compared → no between/within call.
Session outline: intro + consent (5) → recent-booking walkthrough, critical
incident (20) → information-needs probes (10) → rebooking behavior (8) → wrap (2).
Instruments: interview guide v2 (linked) — built via write-interview-guide.
Pilot: session 0 with a colleague on day 1; pilot data excluded.

## 4. Logistics
Recruiting opens day plan is approved (screener linked); sessions days 8–10;
synthesis days 11–13; readout day 15 — decision deadline is day 18 (buffer: 3 days).
Incentive: e-gift card per session (amount pending budget approval — flagged).
Moderator: lead researcher. Notetaker: rotating. Recording: with consent, tool linked.

## 5. Relevant Documents
Screener v1 · Interview guide v2 · Consent form · Problem statement ·
Beta support-ticket summary
```

## Anti-patterns

| Don't | Do |
|---|---|
| Put "Tell me about…" questions in Purpose & Goals | Research questions are team-facing; participant prompts live in the linked guide |
| "We'll do 5 interviews because 5 users find everything" | The 5-user rule is for qualitative usability testing of a flow, not exploratory interviews — calibrate with the 3 factors + saturation |
| Start recruiting after writing the interview guide | Recruiting starts the day the plan is approved — it's the long pole |
| Justify the study with "users hate the current flow" | Run every background claim through `craft-critique`'s evidence protocol |
| 8+ research questions "since we have them in the room" | 3–5; park the rest for the next study |
| Plan sessions to the decision deadline exactly | ≥20% buffer or the plan fails the gate |
| Inline the screener and guide into the plan | Link them; the plan stays one page |
| Skip the pilot to save a session slot | Pilot always; its findings are not data |

## Output format

One page, these 5 sections — NN/g's components, with Logistics broken out of Method & Procedure into its own section:

1. **Purpose & Goals** — decision sentence, evidenced background, 3–5 tagged research questions
2. **Participants** — behavioral inclusion/exclusion criteria, N + rationale + saturation clause + over-recruit buffer
3. **Method & Procedure** — method + backup + why, between/within call if comparing conditions, replicable session outline, linked instruments, pilot
4. **Logistics** — dates, tools, incentives, consent/recording, roles, recruiting timeline
5. **Relevant Documents** — links only

Title the file with a version and date; the plan is a living document until sessions start.

## Sources

- NN/g — Research Plans: Organize, Document, Inform (Purpose & Goals · Participants · Method & Procedure — Logistics is NN/g's sub-part of this, broken out here · Relevant Documents): https://www.nngroup.com/articles/pm-research-plan/
- NN/g — Creating a UX Research Plan (video): https://www.nngroup.com/videos/creating-ux-research-plan/
- NN/g — Sample sizes for interviews (saturation, 3 calibration factors): https://www.nngroup.com/articles/interview-sample-size/
- NN/g — Between-subjects vs. within-subjects study design: https://www.nngroup.com/articles/between-within-subjects/
- NN/g — Which UX research method to use: https://www.nngroup.com/articles/which-ux-research-methods/
- NN/g — Problem statements: https://www.nngroup.com/articles/problem-statements/

## Boundaries

- `write-problem-statement` owns framing the problem the research serves — run it before this skill when no framed problem exists.
- `choose-research-method` owns the method decision (attitudinal/behavioral × qual/quant landscape); this skill consumes its output in Section 3.
- `write-participant-screener` owns the recruiting questionnaire and recruiting mechanics; this plan links to it.
- `write-interview-guide` owns participant-facing questions; they appear here only as a linked instrument.
- `plan-usability-test` owns usability-test specifics (5-user rule limits, mode tradeoffs); this skill provides the surrounding plan document.
- `craft-critique` owns the evidence protocol applied to background claims — reference it, never restate it.
- `use-quantitative-evidence` owns any study meant to produce statistical claims.
