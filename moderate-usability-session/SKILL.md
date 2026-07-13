---
name: moderate-usability-session
description: "Moderates a live usability-test session the NN/g way: think-aloud intro script, neutral re-prompts, echo/boomerang/Columbo probes, intentional silence, the no-premature-rescue rule, atomic note capture, and observer ground rules with a post-session debrief. Use when running or preparing to run a session with a real participant — 'moderate the session', 'run the usability test', 'facilitator script', 'think-aloud instructions', 'the participant is stuck / asks for help / went quiet — what do I say?', 'brief my observers', 'debrief after the session'. NOT for planning the study (plan-usability-test), writing the tasks (write-task-scenarios), or analyzing results afterward (analyze-usability-data)."
---

# Moderate a Usability Session

Run the live session so the participant's behavior — not the moderator's influence — produces the data. NN/g's three pillars of a valid test: representative users, appropriate tasks, **skilled facilitator**. This skill is the third pillar.

## When to use / when NOT to use

**Use when:** you are about to sit (in person or remote) with a participant and a set of task scenarios — moderated usability test, think-aloud prototype session, beta walkthrough with tasks.

**Do NOT use when:**
- Choosing method, mode, sample size, or running the pilot → `plan-usability-test`
- Writing or fixing the task wording → `write-task-scenarios`
- Turning session notes into findings and severities → `analyze-usability-data`
- The session has no tasks — pure conversation → `conduct-user-interview`

## The session arc

1. **Pre-session (15 min before):** consent form ready · recording tested and started only after consent · prototype/product reset to the exact start state · task scenarios printed or pasteable one at a time (never show the full list) · atomic-note template open · observers briefed (ground rules below) · phone/notifications silenced — a multitasking moderator is a facilitation failure.
2. **Greet + rapport (3–5 min):** small talk, water, seating. A tense participant under-narrates and over-pleases.
3. **Think-aloud intro + demo (3 min):** script below. Always demo narration yourself — telling is not enough.
4. **Task loop:** read the scenario aloud AND hand it to them in writing → they work, you observe and re-prompt → task ends (success, give-up, or graceful exit) → one or two neutral post-task probes → next task. If the plan includes a post-task rating (e.g. SEQ), administer it before any discussion — talk contaminates the score. Instrument choice belongs to `define-ux-success-metrics`.
5. **Wrap-up (5–10 min):** open questions saved from mid-session ("You asked earlier what that icon does — what did you expect?"), overall impressions, thank + incentive.
6. **Observer debrief (10–15 min, participant gone):** structure below. Never skip it — memory of session 1 dies during session 3.

## Think-aloud intro script

Adapt names, keep every functional beat — each sentence prevents a specific bias:

> "Today I'll ask you to try some tasks with [product]. As you work, **think out loud**: say what you're looking at, what you're trying to do, what you expect to happen, and anything that surprises or confuses you. There are no wrong answers — **we're testing the design, not you**. If something is confusing, that's exactly what we need to find, and it's the design's fault, not yours.
> I didn't design this myself, so you won't hurt my feelings — be as honest as you can. *(If you did design it, say instead: "I worked on this, but the most useful thing you can give me is honest criticism — you can't offend me.")*
> While you work I'll mostly stay quiet. If you ask me a question I'll probably note it and answer at the end — helping mid-task would change what we learn. If you go quiet, I'll just remind you to keep talking.
> Let me show you what thinking aloud sounds like." → Demo for ~30 seconds on something unrelated (e.g. changing your phone's wallpaper): narrate targets, expectations, hesitations. Then have them do a 30-second practice narration before task 1.

## Mid-task decision tree

| Participant does / says | You do (exact moves) |
|---|---|
| Goes quiet | Wait a beat, then: **"Keep talking."** / "What are you thinking?" / "What are you looking at?" — nothing more |
| "Am I doing this right?" | Boomerang: **"What do you think?"** or "There's no right way — whatever you'd do at home." |
| "What does this button do?" | Boomerang: **"What do you expect it would do?"** Note the question; answer at wrap-up |
| "Is that what was supposed to happen?" | Echo: **"Supposed to happen?"** with rising tone — let them fill the gap |
| Says something vague ("that's weird") | Echo their word: **"Weird?"** — never "Why is it bad?" (presumes bad) |
| Blames themselves ("I'm so dumb") | "You're doing exactly what we need. If it's confusing, that's the design's problem." Then back to silence |
| Struggles with the task | **Nothing.** Struggle is the data. See rescue rule below |
| Wanders off-task (browsing unrelated areas) | Let it run ~30s (detours reveal mental models), then re-read the scenario verbatim |
| Completes the task without noticing | "Where are you now with [goal from scenario]?" — never announce success or failure |
| Finishes fast and looks at you | Columbo: trail off half-formed — **"So the booking is…?"** — and wait |
| Asks your opinion ("Do you like this design?") | "My opinion doesn't count today — yours does. What do you think of it?" |
| Encounters a real bug/crash | Note timestamp, restore state with minimal words ("Let me reset that"), mark task **compromised**, continue |

## Neutral probe phrasebook

The three NN/g probe techniques (shared with `conduct-user-interview`; used here inside tasks):

- **Echo** — repeat their last word/phrase with rising intonation. P: "That's confusing." You: "Confusing?"
- **Boomerang** — return their question as a question. P: "Should I tap this?" You: "What would you do if I weren't here?"
- **Columbo** — start a sentence, trail off, let them complete it. "So this total includes… ?"

Leading → neutral rewrites (lint every probe against the left column):

| Leading (don't) | Neutral (do) |
|---|---|
| "Was that easy?" | "How was that?" |
| "Did you see the search bar?" | "How would you find [X]?" — never point at UI |
| "Do you like the new layout?" | "What do you think of this page?" |
| "Would you use this feature?" | "Walk me through when, if ever, you'd do something like this." (say-vs-do: treat answers as attitude, not prediction) |
| "Was the checkout confusing?" | "What was going through your mind during checkout?" |
| "So you'd expect it under Settings, right?" | "Where would you expect to find it?" |

Two structural lints: no **double-barreled** probes ("How was the search and the filters?" — split them) and no **vocabulary gifts** (never speak an interface label the participant hasn't said first; you'll hand them the answer to a findability task).

## Intentional silence

Silence is a technique, not a gap to fill:

- After asking a probe, **count silently to 10** before saying anything else. Most participants resume or elaborate by 6.
- After they answer, hold **2–3 more seconds** — the afterthought is often the insight.
- Nervous question-barrage is a facilitation failure: every extra question narrows what they were about to volunteer.
- Break silence only with the minimal re-prompt ("Keep talking") — never a new, more specific question while they're mid-struggle.

## The rescue rule — no premature rescue

Watching someone struggle feels rude. Rescuing them destroys the data point you recruited them for. Run this tree before intervening:

1. **Is the participant genuinely distressed** (upset, not merely annoyed)? → Intervene now: "This is really useful — let's move on." Log task as **failure**, note the trigger. People > data, always.
2. **Is the blocker out of scope** (bug, prototype dead end, test-environment crash — not the design under test)? → Minimal unblock, mark task **compromised**, continue.
3. **Has the struggle stopped producing new information** (same loop 3+ times, nothing new narrated)? → End gracefully: "Thanks — that tells us a lot. Let's try the next one." Log as **failure with abandonment point**.
4. **Is the session clock at risk** (this task is eating tasks the plan ranks higher)? → Same graceful exit, log failure, note time.
5. **None of the above** → stay silent. Repeat.

If you must hint (rare — only when a later task depends on completing this one), use the **smallest-first hint ladder** and log the level given: (1) re-read the scenario verbatim → (2) "What else might you try?" → (3) point at a region, not the control ("Anything on this screen?") → (4) reveal the step. A task completed after level 3–4 is logged as **assisted = failure** for success-rate purposes.

Never: explain the design, defend a choice ("what that's for is…"), or announce that they missed something. The moment you explain, the session becomes a demo.

## Atomic note capture

Notes feed `analyze-usability-data`; capture them so they can be clustered without re-watching video.

- **One observation per note.** No paragraphs. Each note must survive being shuffled out of order.
- **Timestamp + task ID on every note** (`T2 14:32 …`).
- **Observation ≠ interpretation.** Write what happened; park what it means in a separate marked column. `T2: scrolled past the Book button twice` is a note; "button has low contrast" is interpretation — it goes to analysis (and any claim built from notes is governed by `craft-critique`'s evidence protocol).
- **Verbatim quotes in quotation marks** — paraphrase kills evidence. `"I guess it saved? I don't trust it."`
- **Per-task outcome line, logged at task end:** `T2: FAIL — abandoned at payment step, 6m10s, hint level 0`. Outcomes: success / partial / fail / assisted(=fail) / compromised.
- Mark moments worth clipping for stakeholders: `📹 14:35`.

## Observer ground rules + debrief

Observers (teammates, clients, stakeholders) are an asset — unmanaged, they are the fastest way to invalidate a session.

**Ground rules — send before, restate at session start:**
1. Silent and invisible: mic muted, camera off (remote) or behind glass/out of eyeline (in person). No audible reactions — a laugh or groan reaches the participant.
2. All questions route through the moderator (chat/notes); moderator decides whether they're asked at task end, wrap-up, or never (if leading).
3. Every observer takes atomic notes in the shared log — same one-observation-per-note discipline, observation column only.
4. No diagnosing or designing during the session. Park solution ideas in a separate "icebox" column.
5. Stay for the debrief. Observing without debriefing is spectating.

**Post-session debrief (10–15 min, immediately after each session):**
1. Moderator states the outcome per task (success/partial/fail/assisted/compromised) — facts first.
2. Each observer shares their **top 3 observations** — observations, not conclusions.
3. Capture surprises and contradictions with earlier sessions in the shared log.
4. Protocol check: anything broken (task wording, timing, tech)? Wording defects route to `write-task-scenarios`; mid-study changes get flagged to `plan-usability-test` because they break cross-participant comparability.
5. Stop there. Cross-session clustering and severity wait for `analyze-usability-data` after the final session.

## Worked example — 90 seconds, annotated

Salon booking app (beta), Task 2: *"You want a haircut this Saturday afternoon with anyone available. Book it."*

> **P:** *(scrolls services list, pauses)* Umm… I see Cut & Style, Consultation… *(goes quiet, 8 seconds)*
> **M:** "Keep talking." ← minimal re-prompt, not a new question
> **P:** I'm looking for just… a normal haircut? Is Cut & Style the same thing?
> **M:** "What do you think?" ← boomerang; does NOT confirm, notes the label question for wrap-up
> **P:** I'll guess yes. *(taps it)* Okay, now a calendar… Saturday… it says no times.
> **M:** *(silence, counts to 10)* ← struggle is the data; no rescue
> **P:** That can't be right. Maybe it's only showing morning? This is annoying.
> **M:** "Annoying?" ← echo; invites elaboration without "why is it bad"
> **P:** I can't tell if Saturday is full or if the app is broken. I'd honestly just call the salon.
> **M:** "What would you do next, if you weren't here with me?" ← neutral; lets them abandon naturally
> **P:** Call. Or try another day I guess. *(taps Sunday, times appear)* Oh — so Saturday IS full. It should just say that.
>
> **Notes produced:** `T2 03:10 — hesitated 8s between "Cut & Style"/"Consultation"` · `T2 03:25 — "Is Cut & Style the same thing?" (label doubt, verbatim)` · `T2 04:02 — empty Saturday read as possible bug, not full capacity` · `T2 04:15 — "I'd honestly just call the salon." 📹` · `T2 outcome: PARTIAL — booked Sunday not Saturday, 4m50s, hint level 0`

Everything is observation + quote; "the empty state needs a 'fully booked' message" is interpretation and waits for analysis.

## Anti-patterns

NN/g's facilitation-mistake catalog, plus the recoveries:

| Anti-pattern | Why it kills the data | Recovery |
|---|---|---|
| **Premature rescue** — jumping in at the first struggle | Erases the exact failure evidence the study exists to find | Run the rescue tree; default is silence |
| **Explaining or defending the design** | Converts the test into a demo; participant stops exploring | "I'll answer at the end" — note it, move on |
| **Leading questions / vocabulary gifts** | Participant performs the answer you implied | Lint against the phrasebook; echo/boomerang instead |
| **Question barrage after silence** | Each question narrows what they'd have volunteered | 10-count; minimal re-prompt only |
| **Insufficient probing** — accepting "it's fine" / "that's weird" at face value | The elaboration behind the vague word is the finding; it evaporates unasked | Echo their exact word ("Weird?"), then hold the silence |
| **Announcing success/failure per task** ("Great, you got it!") | Trains them to seek approval and hide confusion | Neutral close: "Thanks — next one." |
| **Multitasking moderator** (Slack, side notes-cleanup) | Missed cues, broken rapport, missed probes | Dedicated notetaker or record; moderator only moderates |
| **Poor rapport / cold open** | Anxious participants under-narrate and over-please | Never cut the 3-minute warm-up to save time |
| **Unmanaged observers** | One audible laugh contaminates every task after it | Ground rules restated at start; violations = observer leaves |
| **Paragraph notes** | Un-sortable in analysis; interpretation baked into evidence | One observation per note, timestamped |
| **Skipping the debrief** | Sessions blur; freshest observations lost | 10 minutes, immediately, every session |
| **Rewriting tasks mid-study silently** | Later participants aren't comparable with earlier ones | Route through `write-task-scenarios` + flag to `plan-usability-test` |

## Sources

- Thinking Aloud: The #1 Usability Tool — https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/
- Talking with Users in a Usability Test (echo/boomerang/Columbo) — https://www.nngroup.com/articles/talking-to-users/
- Leading Questions — https://www.nngroup.com/articles/leading-questions/
- Intentional Silence in UX Research — https://www.nngroup.com/articles/intentional-silence-ux/
- Checklist for Moderating a Usability Test — https://www.nngroup.com/articles/usability-checklist/
- Observer Guidelines (atomic notes, one observation per note) — https://www.nngroup.com/articles/observer-guidelines/
- Group Notetaking for User Research — https://www.nngroup.com/articles/group-notetaking/
- Tips for Doing User Research in the Field — https://www.nngroup.com/articles/tips-user-research-field/

## Boundaries

- **`plan-usability-test`** owns study goals, mode selection (moderated/unmoderated × remote/in-person), sample size, and the mandatory pilot. This skill assumes the plan exists.
- **`write-task-scenarios`** owns task wording. Broken wording discovered live is logged here but fixed there.
- **`analyze-usability-data`** owns everything after the last session: clustering notes, data-quality assessment, Nielsen severity, findings. This skill's job ends at clean atomic notes + per-task outcomes + debrief logs.
- **`conduct-user-interview`** owns standalone interview technique (no tasks). The echo/boomerang/Columbo family is shared; this skill applies it inside task-based sessions only.
- **`define-ux-success-metrics`** owns which post-task/post-test instruments (SEQ, SUS) to run; this skill only dictates *when* to administer them (before discussion).
- Claims built from session notes follow **`craft-critique`**'s evidence-discipline protocol — notes are evidence, interpretations are not.
