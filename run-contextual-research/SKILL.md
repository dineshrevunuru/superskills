---
name: run-contextual-research
description: "Plans and runs research in the user's real environment or real timeline: contextual inquiry (master-apprentice, in-context interview), field studies (observation-first site visits), and diary studies (longitudinal self-logging plus elicitation interview). Use when someone says 'watch users where they actually work', 'contextual inquiry', 'field study', 'site visit', 'shadow users', 'ethnographic', 'diary study', 'log their experience over time', or when a behavior can't be reproduced in a lab or a single session — workarounds, interruptions, expert workflows, multi-day journeys. NOT for lab/task-based testing (plan-usability-test) or single-room interviews (conduct-user-interview)."
---

# Run Contextual Research

Get behavioral data from the user's real context — their environment (contextual inquiry, field studies) or their real timeline (diary studies) — because what people say in a conference room is not what they do at their desk.

## When to use / when NOT to use

**Use when:**
- The workflow is complex, expert, or environment-dependent (physical space, other people, legacy tools, interruptions)
- You suspect workarounds, cheat sheets, or improvisations that users won't remember to report
- The experience unfolds over days or weeks (onboarding, recurring habits, multi-touchpoint journeys) → diary study
- Stakeholders are designing from assumptions about "how the work is done" and nobody has watched it

**Do NOT use — go to the sibling instead:**
- Testing whether users can complete tasks on a design → `plan-usability-test` / `moderate-usability-session`
- Attitudes, motivations, history — no observation needed → `conduct-user-interview`
- Business goals and internal politics → `conduct-stakeholder-interviews`
- Still deciding which method fits the question at all → `choose-research-method`
- You have the raw notes and need themes/insights → `synthesize-research-data`

## Step 0 — Pick the context method

```
Does the behavior unfold over days/weeks, or happen at
unpredictable moments you can't schedule a visit around?
├─ YES → DIARY STUDY (Method C)
└─ NO — it happens during a visit you can schedule:
   Can you interrupt and ask questions while they work?
   ├─ YES, interaction is acceptable → CONTEXTUAL INQUIRY (Method A)
   └─ NO — presence must be minimal (sensitive setting, natural
      group behavior, service environments) → FIELD STUDY (Method B)
```

Hybrids are normal: a field study morning + contextual-inquiry afternoon; a diary study closed out with an in-context elicitation visit. Pick the primary stance per session and say so in the plan.

## Method A — Contextual Inquiry

### The 4 principles (NN/g) — every session honors all four

| Principle | What it demands | Violation smell |
|---|---|---|
| **Context** | Go to the user's natural environment; watch real work on real tasks, not demos | "Just show me how you'd normally do it" in YOUR office |
| **Partnership** | User and researcher co-direct the session; user leads the work, you steer the inquiry | You running a question list while they sit idle |
| **Interpretation** | Meanings are formed WITH the user — say your read out loud, let them correct it | Writing interpretations privately, validating never |
| **Focus** | The project purpose decides what you attend to; you can't observe everything | Notes full of interesting-but-irrelevant color |

### The stance: master-apprentice

You are the apprentice; the user is the master craftsperson teaching you their work.

- **Do:** "Show me how you did that." · "Can I watch you do the next one?" · "You paused there — what were you weighing?" · Let them keep working while you watch.
- **Don't:** pitch ideas, correct their method, demo the product, fill silences with your hypotheses, ask "would you use a feature that…" (that's a pitch, not apprenticeship).

### Session structure (NN/g 4 parts, ~90–120 min total)

1. **Primer (10–15 min)** — Introductions, consent (recording, photos, artifacts), explain the master-apprentice setup: "You're the expert; I'm here to learn your work. Keep working as normal; I'll interrupt occasionally." Traditional-interview warmup: role, a typical day, today's workload.
2. **Transition (2–5 min)** — Explicitly mark the switch: "From here on, please start your normal work. I'll watch and sometimes ask you to pause." Users default to interview mode; without this marker they'll narrate at you instead of working.
3. **Contextual interview (60–90 min)** — The core loop, repeated: **observe → interrupt at a natural pause → discuss → validate your interpretation → let them resume.** Photograph artifacts (sticky notes, cheat sheets, printouts, second screens) with permission — artifacts are findings.
4. **Wrapup (10 min)** — Summarize your top 3–5 interpretations back to them ("Here's what I think I learned — correct me"). Their corrections are data. Thank, incentive, next steps.

### Note format — observation vs. interpretation, always split

```
OBSERVED (facts only)                    | INTERPRETED (validated? Y/N)
-----------------------------------------|--------------------------------
Retyped client phone from paper card    | Doesn't trust the app's contact
into app; paper card stays taped to     | record — stale data? → ASKED:
monitor                                  | "App is right but slower to open
                                          | than looking up." VALIDATED
```

Rule: an interpretation not validated with the user in-session is marked `N` and treated as a hypothesis, not a finding, at synthesis time.

### Remote adaptation

When site access is impossible: user shares screen + a second camera or phone repositioned on request ("point your phone at the desk"). Keep the observe→discuss loop; accept that physical-environment data degrades — say so in the plan's limitations. Ask them to give a phone-camera "desk tour" during the Primer.

## Method B — Field Study (observation-first)

Choose over contextual inquiry when interrupting would destroy the behavior (customer-facing service work, group dynamics, safety-critical tasks) or when you're mapping an unfamiliar domain before you know what to ask.

1. **Define focus** — 3–5 things this visit must answer, from the research plan. Everything else is bycatch.
2. **Arrange access + consent** — site owner's permission, individual consent from anyone recorded, and a plan for bystanders (customers, patients) who did NOT consent: no identifiable capture.
3. **Structure observations with NN/g's Context CUEs framework** (cited below) — capture systematically, not impressionistically: the physical environment and its constraints; the people and roles present; the tools and artifacts in play; the interruptions, handoffs, and workarounds as they occur.
4. **Observe in timed blocks** (e.g., 30-min blocks with 5-min note-consolidation gaps). Timestamp events. Count what recurs — "interrupted 9 times in 2 hours" beats "frequently interrupted."
5. **Debrief same-day** — raw notes decay in hours. Split observation from interpretation exactly as in Method A; interpretations here are ALL unvalidated (`N`) unless you get a follow-up conversation — schedule one when possible.

Ethnographic-style variant: longer immersion, minimal predefined focus, researcher may participate in the work. Use only when the domain is so unfamiliar that you can't yet write focus questions — it trades efficiency for discovery breadth.

## Method C — Diary Study

Longitudinal self-logging. The participant is the field-worker; your job is designing a kit they can execute without you.

### Lifecycle (run in order, skip nothing)

```
Plan → Pilot (1–2 people, 2–3 days) → Pre-study briefing →
Logging period → Elicitation interview → hand off to synthesize-research-data
```

### Planning decisions (all six, before recruiting)

1. **Logging protocol** — the key design choice:

| Protocol | Participant logs… | Choose when | Cost |
|---|---|---|---|
| **Event-based** | each time the target event happens, in the moment | Events are discrete and participant can recognize them ("every time you book an appointment") | Misses events they don't notice; in-situ friction |
| **Interval-based** | on a fixed schedule (daily, end-of-shift) | You need routine/summary data; events are too frequent to log individually | Recall bias grows with interval length — keep ≤ 24h |
| **Signal-based** | when you prompt them (experience sampling) | You want in-the-moment states at times THEY wouldn't self-select | Prompts land at bad moments; needs tooling |

2. **Length** — long enough to cover the behavior's natural cycle (a weekly routine needs ≥ 2 weeks); short enough that fatigue doesn't rot the data. 1–2 weeks is the common band.
3. **Sample tier** — ~5–12 (typical qualitative), ~12–30 (segment comparisons), 30–50 (broad/academic). Assume 20–30% will under-log; recruit above target.
4. **Incentive structure** — reward per-qualifying-entry plus a completion bonus, not one flat fee (flat fees pay the same for 3 entries as for 30).
5. **Tool tier** — dedicated diary platform (rich media, reminders built in) vs. survey tool (cheap, structured) vs. messaging app the participant already uses (lowest friction, messiest data). Lowest-friction tool that still captures your required fields wins.
6. **Entry template** — fixed fields, ≤ 3 minutes to complete. Worked example (event-based, booking behavior):

```
When did this happen? [timestamp]
What were you trying to do? [1 line]
Where were you / what else was going on? [1 line]
How did you do it — app, phone call, in person, something else? [pick + 1 line]
What got in the way, if anything? [1 line]
Feeling right now: 😖 😕 😐 🙂 😄   (tap one)
Optional: photo/screenshot of what you were looking at
```

### Engagement (the 6 levers — under-logging is the #1 failure)

Reminders on a schedule (and after silence > 48h) · entry template caps effort ≤ 3 min · per-entry incentives · a mid-study personal check-in ("your entries are exactly what we need — the Tuesday one was especially useful") · let participants log in their lowest-friction channel · pilot first to catch a broken template before 12 people run it for 2 weeks.

### Elicitation interview (the diary is not the data — diary + interview is)

Within a few days of the logging period ending, 45–60 min per participant:

1. Read their entries BEFORE the call; mark gaps, contradictions, and spikes.
2. Walk entry-by-entry (or cluster-by-cluster for heavy loggers): "Entry 7 — walk me through what happened right before this."
3. Probe gaps: "Nothing logged Thursday–Saturday — quiet days, or did logging slip?" (Both answers are data; don't assume.)
4. Resolve logged-vs-recalled conflicts: what they wrote in the moment usually outranks what they remember now — but ask why the memory differs.
5. Delivery technique (probes, silence, not leading) → per `conduct-user-interview`.

## Worked example — contextual inquiry session plan (salon admin app)

```
STUDY: How front-desk staff handle bookings during live salon hours
FOCUS (3): (1) When do they use the admin app vs. paper vs. memory?
(2) What interrupts a booking mid-entry, and what happens to it?
(3) What workarounds exist that the app team doesn't know about?
METHOD: Contextual inquiry, in-salon, during a busy block (Sat 10a–12p)
SESSIONS: 4 staff across 2 locations, 90 min each
PRIMER: consent (audio + artifact photos; NO capture of customers),
  master-apprentice framing, warmup: role, typical Saturday
TRANSITION: "Take the next walk-ins and calls as normal; I'll watch
  from the side and ask questions between customers."
INTERRUPT RULE: never mid-customer; only in gaps
NOTES: two-column observed/interpreted; validate interpretations
  in the gaps and at wrapup
WRAPUP: read back top 5 interpretations; collect artifact photos
LIMITATION (stated in plan): Saturday-peak behavior only — quiet-day
  behavior unobserved; flag before generalizing
OUTPUT: validated interpretation list + artifact photo set
  → synthesize-research-data
```

## Anti-patterns / red flags

- **The conference-room "contextual" inquiry** — user demos from memory in a meeting room. That's an interview with props; the Context principle is dead. Go to the work or rename the study.
- **Interviewing instead of observing** — >50% of the contextual-interview phase spent in Q&A with no work happening. Re-issue the transition: "Show me on the next real one."
- **Interpretations never validated** — a notebook of private conclusions is researcher fan-fiction. Say your read out loud; being corrected is the method working.
- **Pitching mid-session** — "we're thinking of adding X, would that help?" kills the apprentice stance and converts observation into a focus group of one.
- **Unfocused observation** — 40 pages of everything = nothing. Focus questions first; if a session answers none of them, the session failed regardless of how interesting it felt.
- **Diary study with no elicitation interview** — entries alone are ambiguous fragments; you'll misread half of them. The interview is not optional.
- **Flat-fee diary incentives** — pays 3 entries the same as 30; guarantees under-logging.
- **Skipping the diary pilot** — a confusing template silently corrupts every participant's data for the full study length. Pilot 2–3 days with 1–2 people, always.
- **Capturing bystanders** — photos/recordings of customers or colleagues who never consented. Legal and ethical exposure; plan non-identifiable capture up front.
- **Generalizing one site or one week** — state the coverage limitation in the plan and repeat it at readout. Claims beyond it are handled per `craft-critique`'s evidence protocol.

## Output format

Every study produces three artifacts:

1. **Study plan (before)** — focus questions (3–5), method + why (from Step 0), sessions/participants, consent + capture plan, stated limitations. Diary studies add: protocol choice, length, entry template, incentive + reminder plan, tool, pilot dates.
2. **Session records (during)** — two-column observed/interpreted notes with validation flags, timestamped events, artifact photos. Diary: entry corpus + per-participant elicitation notes.
3. **Handoff bundle (after)** — validated interpretations, unvalidated hypotheses (marked), artifacts, limitations → feeds `synthesize-research-data` untouched. Do NOT ship themes or recommendations from this skill.

## Sources

- Contextual inquiry (4 principles, session structure): https://www.nngroup.com/articles/contextual-inquiry/
- Field studies: https://www.nngroup.com/articles/field-studies/
- Context CUEs framework for field observation: https://www.nngroup.com/articles/context-cues-framework-field-studies/
- Remote contextual inquiry: https://www.nngroup.com/articles/remote-contextual-inquiry/
- Context methods study guide (field vs. ethnographic vs. CI distinctions): https://www.nngroup.com/articles/context-methods-study-guide/
- Diary studies (lifecycle, logging protocols, sample tiers): https://www.nngroup.com/articles/diary-studies/
- Better diary studies (engagement, incentives, templates): https://www.nngroup.com/articles/better-diary-studies/
- Field vs. diary context methods: https://www.nngroup.com/articles/context-methods-field-diary-studies/
- 5 steps of diary studies (video): https://www.nngroup.com/videos/5-steps-diary-studies/

## Boundaries

- `conduct-user-interview` owns interviewing technique (probes, silence, rapport, say-vs-do interpretation); this skill owns interviews conducted in the user's environment interleaved with observation, and defers to it for question delivery.
- `moderate-usability-session` owns task-based sessions — if you brought the tasks and the participant is completing them for you, that skill governs even on-site.
- `write-research-plan` owns the full research-plan document; this skill's study plan slots into it.
- `write-participant-screener` owns recruiting instruments; `choose-research-method` owns the decision of whether a context method fits at all.
- `synthesize-research-data` owns everything after the handoff bundle: coding, themes, need statements, HMW.
- Claims made from context data (coverage, generalization) follow `craft-critique`'s evidence protocol.
- **Split flag (internal):** this skill bundles contextual inquiry + field studies + diary studies per the map. If diary studies become recurring real work, split them out into `design-diary-study` + `run-diary-elicitation-interview` and reduce Method C here to a pointer.
