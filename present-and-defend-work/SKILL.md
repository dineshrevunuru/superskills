---
name: present-and-defend-work
description: "Present research findings, defend design decisions under pushback, and write async BLUF status updates the way Dinesh does. Use when preparing a research readout ('present the findings', 'share what we learned', 'readout'), a design review where decisions will be challenged ('walk the client through it', 'defend this decision', 'stakeholders are pushing back', 'why did you design it this way'), or a written update ('send the team an update', 'status update', 'summarize where we are'). Covers finding structure, small-N honesty, video evidence, dissent handling, and answer-first writing."
---

# Present & Defend Work

Turn finished work — research, designs, project state — into communication that stakeholders can act on and that survives challenge, because every claim is anchored to evidence, not preference.

## When to use / when NOT to use

**Use when:**
- Reporting research or usability findings to anyone (team, client, professor)
- Presenting a design and expecting "why did you do it this way?"
- Writing a status update, decision request, or project summary that will be read, not presented

**Do NOT use when:**
- You want the work *reviewed* before presenting → run `craft-critique` on it first; present only after the verdict
- You're writing a portfolio case study for recruiters/outsiders → `tell-case-study-story` owns that narrative
- You need to *produce* severity ratings or analyze raw session data → `analyze-usability-data` (present its output here)
- You're documenting a decision for the permanent record → `write-decision-rationale`
- You're running an interactive working session, not a presentation → `facilitate-design-workshop`

Load `writing-voice` before drafting anything written. Any claim about external reality (market, users-in-general, "best practice") is handled per `craft-critique`'s evidence protocol before it goes in front of an audience. Never present an unflagged synthetic claim.

## Step 0 — Pick the mode

```
What is the audience supposed to DO with this?
├─ Understand what research found and act on it        → MODE A: Research readout
├─ Approve / align on design decisions (live or recorded) → MODE B: Design-rationale presentation
└─ Absorb state + answer one ask, on their own time     → MODE C: Async BLUF update
```

Mixed sessions (findings THEN proposed design) run Mode A first, Mode B second — never interleaved. Findings presented alongside the fix look like justification, not evidence.

---

## Mode A — Research readout

### A1. Choose the weight (NN/g: format follows culture and iteration speed)

| Situation | Deliverable | Turnaround |
|---|---|---|
| Internal team, findings needed this sprint | Quick-findings memo: top 5–10 issues, bullets, no method section | Same/next day |
| Milestone, client deliverable, benchmark wave | Formal report: method, full findings table, appendix | Days |
| Skeptical or senior audience, buy-in needed | Live readout with video clips | Scheduled |
| No meeting possible | Async readout: annotated doc or recorded walkthrough, opened with the Mode C skeleton | Same week |

### A2. Running order (live or written — same spine)

1. **Answers first (BLUF).** Slide/section 1 = the research questions with their answers. Never open with method, recruiting, or timeline — that's an appendix, produced only if asked.
2. **Who the data represents + limitations.** One honest passage, up front: participant profile, N, what this study can and cannot claim. Stating limits *before* findings builds credibility; stating them after looks like retreat.
3. **Findings, worst-severity first.** Each finding uses the 5-part anatomy below. Play video clips on the findings you expect to be contested.
4. **What worked.** Always include it — undocumented strengths get "fixed" into regressions.
5. **Prioritized recommendations** — each with a suggested owner and next step. One priority list, not ten equal notes.

### A3. Finding anatomy — all 5 parts, every finding (NN/g actionable-findings structure)

1. **Issue** — precise observed behavior. "Participants tapped grayed-out slots" — never "users were confused" (vague) or "the design fails" (blame).
2. **Evidence** — count + quote or clip reference. Counts, not percentages (see A4).
3. **Severity** — Nielsen 0–4, produced by `analyze-usability-data` (frequency × impact × persistence). Present the rating; don't re-derive it in the room.
4. **Location** — exact screen, step, element. A finding without a location cannot be assigned or fixed.
5. **Recommendation** — a direction, not a finished redesign. Keep "what we saw" visibly separate from "what we suggest."

A finding missing any part is not ready to present.

### A4. Responsible small-N language

| Never say (n ≤ ~10 qual study) | Say instead |
|---|---|
| "80% of users failed" | "4 of 5 participants failed" |
| "Users can't find the filter" | "3 of 5 scrolled past the filter without noticing it" |
| "Average task time was 90 s" | No averaged metrics from qual N (NN/g true-score rule) — describe the struggle instead |
| "Users want feature X" | "2 participants asked for X unprompted — a signal to validate, not a mandate" |
| "Users will abandon the flow" | "All participants who hit this error backed out of the flow" |

Rule: counts and observed behavior, never population statistics. Quant claims require the quant study (~40 participants) — say so when asked.

### A5. Video evidence rules

- One issue per clip, 20–40 seconds, trimmed to the decisive moment.
- For skeptical audiences, play the clip **before** stating the finding — let them see the failure, then name it.
- The clip must represent the *pattern*, not your most persuasive single moment. Cherry-picked clips violate the evidence protocol.
- Consent confirmed, PII blurred, participant never mocked — the room takes its cue from how you treat the person on screen.
- Persuasive order: clip > verbatim quote > count. A real user failing on video ends more arguments than any chart.

---

## Mode B — Design-rationale presentation

### B1. Running order

1. **Restate the goal and constraints** — the problem, not the pixels. The audience judges the design against whatever frame you open with; set it deliberately.
2. **Show the decision path.** 2–3 alternatives explored and the specific reason each lost. This pre-empts "did you try X?" — the single most common derail.
3. **Walk the chosen direction, anchoring every major decision.** Say the anchor type out loud:
   - *User evidence* — "3 of 5 participants missed this in round 1, so…"
   - *Data* — "the analytics show drop-off at this step, so…"
   - *Principle* — "recognition over recall, so options are visible, not memorized"
   - *Constraint* — "the API returns this in two stages, so the UI stages it too"
   - No anchor available? Say "this one is judgment — cheap to change if evidence says otherwise." Flagging it costs less than being caught defending taste as fact.
4. **Declare decided vs. open.** Name the feedback you need: "Input on the empty state, please — the navigation is settled and validated." Unscoped reviews invite relitigating everything.
5. **Take dissent** (protocol below). Anything that changes in the room goes to `write-decision-rationale` before it evaporates.

### B2. Dissent-handling protocol

Classify the pushback first; the class determines the move. Never argue taste with taste.

| Pushback class | Recognize it by | Move |
|---|---|---|
| **New evidence** | Names data, users, or constraints you didn't have | Take it, visibly: "That changes X — revised version by [date]." Updating on evidence is the credibility play, not a loss. |
| **Preference vs. preference** | "I just think…" / "I don't like…" — no anchor | Don't counter with your preference. Propose the cheapest test that settles it (first-click test, 5-user round, A/B if traffic allows) or route to the decision owner. |
| **Misread of the work** | Objects to something the design doesn't do | Clarify with the artifact, not with defense — show the state or flow they missed, then re-ask. |
| **Scope challenge** | "Why are we building this at all?" | Park it. Not this room's decision — route to the owner, return the review to the work. |
| **Small-N skepticism** | "Only five users?" | Script: "This study finds problems; it doesn't measure them. Small samples reliably surface the serious issues (NN/g's discovery-curve research), and every finding here was observed on video. Population numbers need a ~40-participant quant study — happy to scope one if we need it." |

Two hard rules: (1) concede fast and specifically when wrong — "you're right about the error state; I'll fix it" beats any deflection; (2) never accept a design change in the room without capturing who decided and why.

---

## Mode C — Async BLUF update

### C1. The skeleton

```
Subject: [the bottom line itself — "Decision needed by Thu: booking error-state copy"]

**BLUF:** [state / decision / ask — one sentence, first line]
**What changed:** [2–4 bullets, most important first]
**Need from you:** [one specific ask + by-when] — or "Nothing; FYI only."
**Risk:** [only if real — named risk + what you're doing about it]
[Link to detail — never paste the detail]
```

### C2. Rules

- The bottom line is the **first** line — and the subject line. A skimmer who reads nothing else still gets the point.
- **One ask per update.** Two asks halves the response rate on both. Split into two messages if genuinely two asks.
- Readable in 30 seconds — target under 150 words. Everything longer is a linked document, not a longer email.
- Every ask carries a by-when. An ask without a deadline is a wish.
- No change and no ask → don't send it. Cadence-filler updates train recipients to skip you.
- Bad news goes in the BLUF, not paragraph four. Burying it reads as hiding it.

---

## Worked example — one finding, weak vs. strong

**Weak (unactionable):** "Users were confused by the booking calendar and didn't like how it looked. We should make it more intuitive."

**Strong (5-part):**
> **Issue:** Participants could not distinguish available from taken appointment slots.
> **Evidence:** 4 of 5 participants tapped a grayed-out slot at least once; P3: "Is this one open or not?" (clip, 0:32).
> **Severity:** 3 — Major. Frequent (4/5), blocked task progress, persisted across repeat attempts.
> **Location:** Booking flow, step 2 — calendar day view, slot grid.
> **Recommendation:** Differentiate slot states beyond a gray tint — explicit labels or removal of unavailable slots. Retest in the next round.

**And the matching BLUF update:**
> **Subject: Booking-flow test done — 1 major issue, fix proposed**
> **BLUF:** Round-1 testing found one Major issue (slot availability is illegible); fix proposed, retest planned for next round.
> **What changed:** 5 sessions complete · 1 Major + 3 Minor findings · full readout linked.
> **Need from you:** Approve the slot-state fix direction by Friday so it makes the next build.
> [Link: readout doc]

---

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Open with method, timeline, or "first, some background" | Open with the answer; method is an appendix |
| Percentages or averages from a 5-user study | Counts: "4 of 5 participants" |
| Finding with no location or no recommendation | All 5 parts, or it doesn't ship |
| "Users are confused / don't get it" | Describe the observed behavior precisely |
| Defend a decision with "I feel" or seniority | Name the anchor — or flag the decision as judgment, cheap to reverse |
| Present everything as open for feedback | Declare decided vs. open; scope the ask |
| Report only what's broken | Include what worked, or it gets "fixed" |
| Cherry-pick the friendliest clip | Clips represent the pattern (evidence protocol) |
| Ask buried at the bottom of a long update | BLUF: ask in line one and the subject |
| Win the argument, lose the record | Room decisions go to `write-decision-rationale` same day |
| Counter a stakeholder's taste with your taste | Classify the dissent; escalate to evidence or a test |

## Sources

- Actionable findings (issue/evidence/severity/location/recommendation): https://www.nngroup.com/articles/actionable-usability-findings/
- Formal report vs. quick findings: https://www.nngroup.com/articles/formal-vs-quick-usability-reports/
- Engaging reports & async presentations: https://www.nngroup.com/articles/engaging-reports-presentations/
- Video evidence: https://www.nngroup.com/videos/video-evidence/
- Answering small-N skepticism: https://www.nngroup.com/articles/responding-skepticism-small-usability-tests/
- 5-user discovery curve: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- Never report metrics from qual N (true score): https://www.nngroup.com/articles/true-score/
- Nielsen 0–4 severity (frequency × impact × persistence): https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/

## Boundaries

- **craft-critique** owns the evidence-discipline protocol and verdict language. This skill *presents* claims that already passed that protocol; it never carries its own copy.
- **analyze-usability-data** owns producing severity ratings and the analysis itself; this skill presents its output.
- **write-decision-rationale** owns the durable decision record (including what-would-change-this); decisions made or changed during a presentation hand off there.
- **tell-case-study-story** owns portfolio/case-study narrative for external audiences; this skill serves working stakeholders on live projects.
- **writing-voice** owns tone and register for anything written; **design-taste** governs any designed readout artifact (slides, one-pagers).
- **facilitate-design-workshop** owns interactive working sessions; a readout that turns into co-design has changed skills.
