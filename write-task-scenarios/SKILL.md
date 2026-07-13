---
name: write-task-scenarios
description: "Converts research goals into unbiased, realistic usability-test task scenarios via NN/g's 7-step goal→question→activity→scenario chain, then lints them against the 10 task-writing mistakes and forks them for quant vs qual studies. Use when preparing what participants will DO in a usability test — 'write test tasks', 'task scenarios', 'what should we ask users to do', 'draft tasks for the usability study', 'are these tasks leading?'. NOT for interview questions (write-interview-guide) or overall study planning (plan-usability-test)."
---

# Write Task Scenarios

Turn what the team needs to learn into tasks participants can realistically perform — without the wording telling them where to click.

## When to use / when NOT to use

**Use when:**
- A usability test is planned and you need the tasks participants will attempt
- Existing tasks feel leading, vague, or keep producing "everyone succeeded" non-findings
- Converting a PRD, feature spec, or research question into something testable
- Reviewing someone else's task list before a pilot

**NOT for:**
- Interview questions → `write-interview-guide`. A task scenario is something a participant *does*; an interview question is something they *answer*. Never mix them in one artifact.
- Study goals, sample size, mode (moderated/unmoderated), or the pilot protocol → `plan-usability-test`. This skill produces the tasks that plan consumes.
- Scoring results or rating severity after sessions → `analyze-usability-data`.
- Tree-test "find it" tasks → `structure-information-architecture` owns tree testing, but its tasks must still pass the lint below (especially mistake #1, interface echo).

## The method — 7-step chain (research goal → scenario)

Run every scenario through all seven steps. Skipping straight to step 5 is how leading tasks get written.

1. **State the research goal.** The decision the study informs, in one sentence. "Decide whether first-time clients can book without calling" — not "test the app."
2. **Write the research question(s).** Specific and answerable by watching behavior: "Can new users complete a booking in one sitting? Where do they stall?" One goal usually yields 2–4 questions.
3. **Identify the user goal behind each question.** What a real person is trying to achieve in their life — never a feature. "Get an appointment that fits my schedule," not "use the booking flow."
4. **Pick the activity.** The concrete thing a user would do in the product to reach that goal. This defines the task's start point and scope.
5. **Draft the scenario.** Wrap the activity in a short, realistic context: who they are for this task, why they want it, and a direct instruction to do it. Formula: **[minimal context] + [motivation] + [actionable ask]**. Keep it under ~3 sentences.
6. **Supply the data the task needs.** Any names, dates, budgets, addresses, login credentials, or payment stand-ins the participant must have. If they'd have to invent it mid-task, you provide it up front (on a card or in the scenario itself).
7. **Lint, then pilot.** Run the 10-mistake lint below on every task. Then pilot per `plan-usability-test` — task wording is the #1 thing pilots catch.

**The chain must stay traceable.** Every scenario maps back to a research question; every research question has at least one scenario. A task that answers no question gets cut. A question with no task means the study can't answer it.

## The 10-mistake lint pass

Run this checklist on every task before the pilot. One failure = rewrite the task, not the checklist.

| # | Mistake | Detection test | Fix |
|---|---------|---------------|-----|
| 1 | **Interface echo** | Any word in the task appears verbatim in a nav label, button, or heading on the path | Rewrite in the user's language; participants must match *meaning*, not strings |
| 2 | **Embedded steps** | Task narrates the route ("go to Settings, then…") | State only the end goal; the route IS the data you're collecting |
| 3 | **Hypothetical phrasing** | Starts with "How would you…" / "Would you…" | Make it actionable: "Book…", "Find…", "Change…" — they do it, not describe it |
| 4 | **Compound task** | Two or more goals fused with "and"/"then" | Split. If one part fails you can't tell which — and success scoring becomes ambiguous |
| 5 | **Unrealistic context** | The participant would never want this (wrong persona, implausible situation) | Anchor to a goal your recruited users actually have; adjust the screener or the task |
| 6 | **Missing data** | Task needs info you didn't supply (dates, budget, an existing account) — participant invents it mid-task | Provide realistic props up front (step 6 of the chain) |
| 7 | **Feature priming** | Task names the capability under test ("use the filter to…") | Describe the goal the feature serves; whether they find the feature is the finding |
| 8 | **Over-specification** | Details that don't serve the goal steer or distract ("you're a 34-year-old accountant named…") | Cut every detail that doesn't change what the participant does |
| 9 | **No validatable success state** (quant only) | Two observers could disagree whether the task "succeeded" | Define one binary end state before the session (see fork below) |
| 10 | **Motivation-free command** | Bare imperative with zero context ("Book an appointment.") — participants comply mechanically instead of behaving naturally | Add the one sentence of context that makes them *want* the outcome |

**Lint discipline:** read each task aloud, then open the actual interface and scan for string matches (mistake #1) — don't lint from memory. Record the lint as done in the output artifact.

## Quant vs qual task fork

Decide the study type first (it comes from `plan-usability-test`), then fork every task:

```
Is the study collecting metrics (success rate, time-on-task, errors)?
├── YES → QUANT TASK rules:
│   ├── One single, validatable success state — binary, defined in writing before any session
│   ├── Identical wording for every participant — no adaptation, no clarification mid-task
│   ├── Concrete target: "Book the earliest Saturday appointment" not "book an appointment you like"
│   ├── Defined start and end points (time-on-task is meaningless without them)
│   └── No open-ended or exploratory tasks — variability destroys the metric
└── NO → QUAL TASK rules:
    ├── Open-ended and exploratory tasks are allowed and often best
    ├── "Find a service that would work for you" is fine — the reasoning IS the data
    ├── Wording may flex per participant if the goal stays fixed
    ├── Note per task what to observe (hesitations, backtracks, misreads) for the moderator
    └── NEVER report numbers from these sessions — qual studies produce insights, not metrics
```

**Red flag:** a task list where some tasks have success states and some don't usually means the team hasn't decided what kind of study this is. Send it back to `plan-usability-test`.

## Worked example — full chain

Context: a salon booking app in beta — a native mobile app for scheduling appointments. Qualitative study, 5 first-time clients.

1. **Research goal:** Decide whether the booking flow is ready to replace phone bookings for new clients.
2. **Research questions:** RQ1 — Can a first-time client complete a booking unaided? RQ2 — Do clients understand what each service includes before choosing?
3. **User goal (RQ1):** Get a haircut appointment that fits around my work schedule.
4. **Activity:** Complete a first booking end-to-end in the app.
5. **Scenario draft:** *"A friend recommended this salon. You want to get a haircut sometime next week, but you're only free after 5pm on weekdays. Set up an appointment that works for you."*
6. **Data supplied:** Test account already signed in; card entry mocked with a provided test card; "next week" anchored to a printed calendar showing the participant's fake work schedule.
7. **Lint pass:**
   - ✅ #1 No interface echo — checked the live beta: task avoids "Book Now", "Services", "Schedule" (all real labels)
   - ✅ #3 Actionable ("Set up an appointment"), not "how would you book…"
   - ✅ #6 Availability constraint and payment stand-in supplied
   - ✅ #10 Motivation present (friend's recommendation, schedule pressure)
   - ⚠️ First draft said *"Use the app to book a haircut appointment"* — failed #1 ("book" echoed the "Book Now" CTA) and #10 (no motivation). Rewritten as above.

**Same task, quant fork (for a later benchmark wave):** *"You're free next Tuesday after 5pm. Book the earliest available appointment after 5pm that day."* Success state: confirmation screen shows a Tuesday booking with start time ≥ 5:00pm. Start: home screen. End: confirmation visible. Identical wording, all participants.

## Anti-patterns / red flags

- **Writing tasks from the sitemap.** Tasks generated by walking the nav ("test each section") produce feature tours, not behavior. Always start from the research goal (step 1).
- **The helpful rewrite.** Adding hints after watching a pilot participant struggle. The struggle was the finding. Fix the interface, not the task.
- **Asking for opinions inside a task.** "Book an appointment and tell us if you like the design" — the second half is an interview question and it contaminates the first half. Behavior during, opinions after.
- **Tasks requiring the participant's real personal data** (real card, real address, real sensitive personal details). Always supply stand-ins. This is an ethics failure, not just a design one.
- **One mega-task covering the whole product.** You get one confounded data point. Split into focused tasks — count and order come from `plan-usability-test` — and keep tasks independent so an early failure doesn't cascade into the rest.
- **Reusing qual tasks as quant tasks unchanged.** Open-ended wording that made a great qual task makes an unscoreable quant task. Re-fork every task when the study type changes.
- **"Everyone succeeded" across the board.** Usually means the tasks leaked the answers (mistakes #1, #2, #7) — lint again before celebrating.

## Output format

Deliver tasks as a traceability table + participant-facing cards:

```markdown
## Task set: [study name] — [quant/qual]

| # | Research question | User goal | Scenario (participant-facing) | Data supplied | Success state (quant) / Observe (qual) | Lint |
|---|-------------------|-----------|-------------------------------|---------------|----------------------------------------|------|
| 1 | RQ1 | ... | "..." | ... | ... | ✅ 10/10, [date] |

Task order: [sequence — set in plan-usability-test]
Pilot status: [not run / run on DATE — changes made / frozen]
```

Participant-facing cards contain ONLY the scenario text — never the research question, success state, or observation notes.

## Sources

- Turn User Goals into Task Scenarios — https://www.nngroup.com/articles/task-scenarios-usability-testing/
- Write Better Qualitative Usability Tasks: Top 10 Mistakes to Avoid — https://www.nngroup.com/articles/better-usability-tasks/
- Test Tasks: Quantitative vs. Qualitative — https://www.nngroup.com/articles/test-tasks-quant-qualitative/
- From UX Research Goals to Usability-Test Tasks (7-step method) — https://www.nngroup.com/articles/ux-research-goals-to-scenarios/

## Boundaries

- `plan-usability-test` owns study goals, sample size, mode selection, task count/type/order, and the pilot protocol. This skill writes and lints the tasks that plan specifies; the pilot's task-wording fixes come back through this skill's lint.
- `write-interview-guide` owns questions participants *answer*; this skill owns tasks participants *perform*. Post-task follow-up questions belong to the interview/moderation side.
- `moderate-usability-session` owns delivering tasks live: reading them aloud, probing, and handling mid-task questions without leading.
- `analyze-usability-data` owns scoring outcomes and severity after sessions — against the success states this skill defined before them.
- `structure-information-architecture` owns tree-test and card-sort tasks; it applies this skill's lint (interface echo especially) to its find-it task wording.
