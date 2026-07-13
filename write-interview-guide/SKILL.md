---
name: write-interview-guide
description: "Writes a semi-structured user-interview discussion guide (a.k.a. interview questionnaire) using NN/g's 7-step process: research questions in, funnel-ordered open questions out, with pre-written neutral probes, a coverage matrix mapping every question back to a research question, and a lint pass that catches leading, double-barreled, closed, and prediction questions. Use when asked to 'write interview questions', 'draft a discussion guide', 'prep an interview questionnaire', 'what should I ask users', or before ANY user interview is conducted. Not for running the interview live (conduct-user-interview), screeners (write-participant-screener), surveys (write-survey), or internal stakeholders (conduct-stakeholder-interviews)."
---

# Write Interview Guide

Turn research questions into a piloted, funnel-ordered, bias-linted discussion guide that any interviewer — including a nervous one — can run without leading the participant.

## When to use / when NOT to use

**Use when:**
- A user interview is planned and no guide exists yet — a guide is mandatory before the first session
- An existing question list needs a bias audit (the Lint Catalog below works standalone)
- Converting a stakeholder's "just ask them if they like it" into researchable questions

**Do NOT use when:**
- No research questions exist yet → run `write-research-plan` first; research questions are this skill's INPUT, never invented here
- The session is happening and you need live facilitation moves (rapport, silence, recovering from a leading slip) → `conduct-user-interview`
- You're deciding WHO to talk to → `write-participant-screener`
- The instrument is self-administered at scale → `write-survey` (its per-question bias audit owns survey items)
- The interviewee is a project stakeholder, not a user → `conduct-stakeholder-interviews`

## Pick the interview type first (30 seconds)

| Type | When | Guide shape |
|---|---|---|
| **Semi-structured** (default) | Almost always — discovery, evaluation context, follow-up studies | Ordered questions + probes; interviewer may reorder and follow tangents |
| **Structured** | Multiple interviewers must produce comparable data; low-skill moderators | Exact script, read verbatim, no improvised follow-ups |
| **Unstructured** | Pure exploration, expert domains you know nothing about (rare) | Topic list only — but still lint every question you might ask |

Everything below builds the semi-structured guide; for structured, freeze the wording and remove optional probes.

## The method — NN/g 7 steps

**Step 1 — Pull the research questions.** Copy the 3–5 research questions from the research plan verbatim into the guide header. They are researcher-facing ("What barriers cause clients to abandon booking?") and are NEVER read to participants. If someone hands you interview questions with no research questions behind them, stop and derive the research questions first — otherwise the coverage matrix in Step 4 has nothing to map to.

**Step 2 — Brainstorm interview questions.** For each research question, free-write 5–10 candidate participant-facing questions. Quantity over quality here; the lint pass cleans up later. Include at least one **critical-incident question** per behavior-focused research question: "Tell me about the last time you [did X]" — recalled real events beat generalized self-report every time.

**Step 3 — Broaden.** Convert every closed question to open-ended:
- Closed openers to eliminate: **Did / Was / Is / Do / Would / Have you**
- Open openers to use: **How / What / Tell me about / Walk me through / Describe**
- `"Do you find booking online frustrating?"` → `"How do you usually book an appointment? Walk me through the last time."`
A closed question is not just low-yield — a closed question with an embedded premise IS a leading question.

**Step 4 — Fill gaps with the coverage matrix.** Build the matrix (format below). Every research question needs ≥2 interview questions covering it; every interview question must map to ≥1 research question. Orphan interview questions get cut — "interesting to know" is not a mapping. Uncovered research questions get new questions written.

**Step 5 — Arrange into the funnel.** Order the guide:
1. **Warmup** — easy, factual, zero-stakes questions the participant cannot get wrong ("What does a typical week look like for you?"). Builds rapport; answers may be discarded.
2. **Broad** — general behavior and context in the topic area, in **chronological or experience-phase order** (first exposure → regular use → most recent use). Chronology aids recall.
3. **Narrow** — specific behaviors, critical incidents, friction, workarounds.
4. **Sensitive/evaluative** — anything touching money, failure, or emotion goes late, after trust exists.
5. **Close** — "What should I have asked about that I didn't?" + thanks + next steps.

Budget realistically: a main question plus probes runs 3–5 minutes; a 60-minute session holds roughly 8–12 main questions. Overstuffed guides force rushing, which kills probing. Mark 2–3 questions `[SKIP IF SHORT]` in advance so the cut is planned, not improvised.

**Step 6 — Pre-write the probes.** Improvised probes are where leading happens. Write neutral probes INTO the guide under each main question. The reusable phrasebook:

| Situation | Neutral probe |
|---|---|
| Answer is thin | "Tell me more about that." |
| Vague quantifier ("sometimes", "usually") | "What does 'sometimes' look like — when was the last time?" |
| Unexplained emotion | "You said that was annoying — what happened right before that?" |
| Motive unclear | "Why is that important to you?" |
| Jargon or ambiguous term from THEM | "When you say [their word], what do you mean?" |
| Contradiction with earlier answer | "Earlier you mentioned [X] — how does that fit with this?" |
| They stop mid-thought | (silence — 5 seconds) or "…and then?" |

Banned probe forms: "So you mean [your interpretation]?" (rephrasing their observation in your words), "Wouldn't it be easier if…?" (embedded solution), "Don't you think…?" (leading).

**Step 7 — Pilot.** Run the full guide once with a colleague or one real participant before the study. Check: total time, questions that produce blank stares, questions that everyone answers identically (dead — cut them), funnel order that forces awkward backtracking. Revise the guide; note pilot changes in the header. **No guide is done until it has been piloted.** If session 1 of the real study is the pilot, say so explicitly in the research plan.

## Lint Catalog — run over EVERY question before pilot

Run each question through all seven rules. One violation = rewrite, not exception.

| # | Violation | Detect | Rewrite pattern |
|---|---|---|---|
| L1 | **Leading** | Question contains the expected answer, a value judgment, or an embedded premise ("How frustrating is…", "Why do you love…") | Strip the premise; ask for the experience: "How was…", "What was that like?" |
| L2 | **Closed opener** | Starts with Did/Was/Is/Do/Would/Have | Reopen with How/What/Tell me/Walk me through |
| L3 | **Double-barreled** | Contains "and"/"or" joining two askables ("How do you book and reschedule?") | Split into two questions; keep both only if both map to a research question |
| L4 | **Prediction/hypothetical** | Asks about future or imagined behavior ("Would you use…", "How much would you pay…") | Ask about past real behavior: "Have you ever paid for something like this? Tell me about it." People cannot predict their own behavior — answers are noise |
| L5 | **Rephrased observation** | You restate their words in YOUR framing ("So it's basically too slow for you?") | Echo THEIR exact words back, or use a neutral probe from the phrasebook |
| L6 | **Jargon/internal language** | Team or industry terms the participant may not share ("booking funnel", "native app") | Use the participant's vocabulary from the screener, or plain words |
| L7 | **Solution fishing** | Question smuggles in your design idea ("Would a reminder notification help?") | Ask about the problem: "What happens when you forget an appointment?" Icebox the solution idea in your notes, not the guide |

L4 corollary: if a stakeholder insists on "would you use it" questions to validate a foregone conclusion, the resulting claims are handled per `craft-critique`'s evidence-discipline protocol — stated-intent answers are flagged under-evidenced, never reported as demand.

## Coverage matrix (mandatory artifact)

Every guide ships with this table. It is the proof the interview answers the study, and the tool that finds gaps.

```
| IQ# | Interview question (short) | RQ1 | RQ2 | RQ3 |
|-----|----------------------------|-----|-----|-----|
| 1   | Typical week (warmup)      |  –  |  –  |  –  |   ← warmups may map to nothing
| 2   | Walk me through last booking| ●  |     |  ●  |
| ... |                            |     |     |     |
```

Pass rules: each RQ column has ≥2 filled cells · each non-warmup row has ≥1 filled cell · rows with zero mappings are deleted before pilot.

## Worked example — condensed guide

Context (example study): a salon's native booking app is in beta; discovery interviews with existing clients before wider rollout.

```markdown
# Discussion Guide — Salon booking behavior · v2 (post-pilot) · 45 min · semi-structured

RESEARCH QUESTIONS (never read aloud)
RQ1: How do clients currently decide when and how to book appointments?
RQ2: What causes clients to delay, abandon, or hand off booking?
RQ3: What role does the relationship with their stylist play in booking?

INTRO (3 min) — consent, recording permission, "no wrong answers,
we're studying booking, not you", they can skip anything.

WARMUP (5 min)
1. How long have you been coming to this salon, and how did you first find it?

BROAD — chronological (12 min)
2. Walk me through the last time you booked an appointment here,
   from the moment you decided you needed one.
   PROBES: "What did you do first?" · "What made you choose that moment?"
   · "Who else was involved?"
3. How does that compare with how you booked a year ago?
   PROBE: "What changed?"                                  [SKIP IF SHORT]

NARROW — friction & incidents (15 min)
4. Tell me about a time booking didn't go the way you wanted.
   PROBES: "What happened right before that?" · "What did you do next?"
   · "How did it end up?"
5. What do you do when you can't get the time slot you want?
   PROBE: "When was the last time that happened?"
6. Earlier you mentioned [their word for scheduling] — what do you
   mean by that?   ← placeholder; fill live with THEIR vocabulary

SENSITIVE (5 min)
7. Tell me about a time you put off booking or decided not to book at all.
   PROBE: "What was going on for you then?"

CLOSE (5 min)
8. What should I have asked about booking that I didn't?
   Thanks · incentive · what happens with their data.

COVERAGE MATRIX
| IQ | RQ1 | RQ2 | RQ3 |
|----|-----|-----|-----|
| 2  |  ●  |     |  ●  |
| 3  |  ●  |     |     |
| 4  |     |  ●  |     |
| 5  |     |  ●  |  ●  |
| 7  |     |  ●  |  ●  |
RQ1 ✔ (2)  RQ2 ✔ (3)  RQ3 ✔ (3)

PILOT NOTES: v1 Q4 was "Do you find booking frustrating?" — failed L1+L2,
rewritten as critical incident. v1 had "Would you use an app to book?" —
failed L4, cut; replaced with Q2 which surfaces channel choice from real behavior.
```

Note what the lint pass did: the two most natural-sounding stakeholder questions ("is it frustrating?", "would you use the app?") were both violations, and their replacements produce recalled behavior instead of opinion.

## Anti-patterns / red flags

- **Reading research questions to participants.** "What barriers cause abandonment?" is analyst language; participants confabulate answers to it. RQs stay in the header.
- **The guide as a script cage.** Semi-structured means the guide guarantees coverage — it does not forbid following an unexpected thread. If a tangent maps to an RQ, chase it; the matrix tells you what still needs covering.
- **20+ questions for a 60-minute slot.** Overstuffing is the most common guide failure: it eliminates probing, which is where the actual findings live. Cut to 8–12 and pre-mark the skips.
- **Improvising probes live.** Unwritten probes drift leading under time pressure. If it's not in the guide, the fallback is the neutral phrasebook — nothing else.
- **"Would you / how much would you pay" anywhere in the guide.** Prediction questions produce polite fiction. Past behavior only.
- **Skipping the pilot because "the questions look fine".** Every guide reads fine to its author. Pilot or it isn't done.
- **Treating interview answers as behavioral truth.** Interviews capture what people SAY. Where the say/do gap matters, pair with observation (usability testing, field methods) — flag this in the guide header so downstream synthesis inherits the caveat.

## Output format

Deliver the guide as one markdown file:

1. **Header** — study name, version, session length, interview type, pilot status, say/do caveat if applicable
2. **Research questions** — verbatim from the research plan, marked "never read aloud"
3. **Intro script** — consent, recording, expectations (3 lines max)
4. **Funnel-ordered questions** — numbered, grouped Warmup → Broad → Narrow → Sensitive → Close, each with pre-written probes and `[SKIP IF SHORT]` marks
5. **Coverage matrix** — with pass-rule check shown
6. **Pilot notes** — what changed and which lint rules the originals failed

## Sources

- NN/g, The User Interview Guide — the 7-step process: https://www.nngroup.com/articles/interview-guide/
- NN/g, Interview Question Mistakes (leading, double-barreled, rephrasing, jargon, prediction): https://www.nngroup.com/articles/interview-questions-mistakes/
- NN/g, Open-Ended vs. Closed Questions: https://www.nngroup.com/articles/open-ended-questions/
- NN/g, Leading Questions: https://www.nngroup.com/articles/leading-questions/
- NN/g, 3 Types of User Interviews (structured / semi-structured / unstructured): https://www.nngroup.com/videos/3-types-user-interviews/
- NN/g, The Funnel Technique in Interviews: https://www.nngroup.com/videos/funnel-technique-interviews/
- NN/g, Probing in User Interviews: https://www.nngroup.com/videos/probing-user-interviews/
- NN/g, Research Plans (research questions vs. interview questions): https://www.nngroup.com/articles/pm-research-plan/

## Boundaries

- **write-research-plan** owns research questions and the 5-section plan — they arrive here as input. If they don't exist, go there first.
- **conduct-user-interview** owns the live session: rapport, silence handling, in-the-moment moderation mistakes, say-vs-do interpretation. This skill ends when the piloted guide is handed over.
- **write-participant-screener** owns who qualifies for the session; screener answers feed participant vocabulary into this guide (see worked-example Q6).
- **write-survey** owns self-administered instruments and their per-question bias audit; this Lint Catalog governs interview questions only.
- **conduct-stakeholder-interviews** owns discussion guides for internal/business stakeholders (goals, success criteria, politics).
- **craft-critique** owns the evidence-discipline protocol referenced in the L4 corollary — never restated here.
