---
name: write-decision-rationale
description: "Writes lightweight decision records the way Dinesh's ARIA system does: 2–3 options each labeled with risk/reward and time, a chosen path with context-grounded reasoning, a MANDATORY What-Would-Change-This section, and a Decided → Revisiting → Superseded status lifecycle. Use when a meaningful choice between alternatives is being made or was just made — 'should we go with A or B', 'let's lock this in', 'document this decision', 'write a decision record', 'ADR', 'why did we choose X' — or when a tradeoff affecting timeline, quality, scope, or money is accepted, or when an old decision's assumptions have expired and its record needs a status update."
---

# Write Decision Rationale

Capture a decision in ~2 minutes so a future session (or a future Dinesh) knows what was chosen, what was rejected, why, and — critically — under what conditions to reopen it.

## When to use / when NOT to use

**Use when ANY of these is true:**
- A choice was made between meaningful alternatives that were seriously considered and rejected
- A tradeoff was accepted that affects timeline, quality, scope, or money
- A client, professor, vendor, or other external party drove a constraint that shaped the choice
- The Decision Support protocol just ran (a record is created automatically — no exceptions)
- An existing decision's assumptions expired → update its record's status, don't write a new one from scratch

**Do NOT use for:**
- Choices with no real alternative ("we used the only API that exists") — nothing to record
- Trivially reversible choices (undoable in under ~30 minutes with zero downstream effect) — the record costs more than the decision
- Deciding *whether a problem is worth solving at all* — that is `identify-business-problems` (opportunity sizing, triage). This skill starts once a decision between solution paths exists.
- Presenting or defending a decision to an audience — that is `present-and-defend-work`. This skill produces the record it draws from.
- Evidence-checking the claims inside the record — handled per `craft-critique`'s Evidence-Discipline Protocol (cite / get / flag). Reference it; never restate it.

## The method

Run these steps in order. A record missing any step is not done.

### Step 1 — Gate: does this deserve a record?

```
Was a real alternative seriously considered and rejected?
├── NO → stop. No record. (A record with one option is a diary entry.)
└── YES → Does the choice affect timeline, quality, scope, or money,
          or will a future session need to understand this tradeoff?
          ├── NO → stop. Mention it in the session summary instead.
          └── YES → write the record. Target: 2 minutes, not 20.
```

### Step 2 — Header

Fill: short title (the choice, not the topic — "Keep cascade vs. adopt Realtime", not "Voice stuff"), date, task ID (or "cross-domain"), domain, and `Status: Decided`. If the decider hasn't chosen yet, use `Status: Awaiting decision` and add THE ONE DECISION line (Step 6).

### Step 3 — Context (1–2 sentences max)

What situation forced this decision *now*? Name the trigger. If you can't state the trigger, you may be documenting a preference, not a decision — go back to Step 1.

### Step 4 — Options, each with risk/reward + time

List 2–3 options (never more than 3 — more means the framing is unfinished). For **every** option:

- **Pros / Cons** — specific to this project, not generic ("cons: adds a second API key and billing surface", not "cons: complexity")
- **Time/effort** — realistic, not optimistic. An option that can't be completed in available time is a liability, not an option: say so in its cons.
- **Risk-Reward quadrant** — label it:

```
                LOW REWARD              HIGH REWARD
LOW RISK    →   do fast or skip         protect time for it
HIGH RISK   →   flag + deprioritize     present with full tradeoffs
```

Tag load-bearing factual claims inline per `craft-critique`: `[EVIDENCED: source]` or `[UNDER-EVIDENCED — what would strengthen it]`. A record built on untagged confident claims is the failure mode.

### Step 5 — Decision + Reasoning

- **Chose:** one option, named. Never leave a record with options and no choice (exception: `Awaiting decision` status with THE ONE DECISION stated).
- **Reasoning:** 1–3 sentences grounded in the *specific* context — the milestone it serves, the constraint that tipped it, the capacity reality. If the reasoning would read true for any project, it isn't reasoning yet.
- Anchor to a milestone. A decision serving no milestone needs an explicit reason to exist.

### Step 6 — THE ONE DECISION (only when the decider hasn't chosen)

When the record goes to Dinesh (or any decider) for a call, compress everything into one crux question from which the rest follows mechanically. Example shape: *"May a spoken price be a model-generated, guardrail-verified utterance — or must it stay a server-authored string played verbatim? Everything else follows."* If you can't write this line, the analysis isn't finished.

### Step 7 — What Would Change This (MANDATORY — the record is invalid without it)

Every decision is built on assumptions that can expire. List 2–4 concrete reopening conditions, each in the form: **observable trigger → what to do**.

- ✅ "An in-house Indian-audio eval shows the new engine beats the tuned cascade → reopen full replacement"
- ✅ "Project reframed from 'honest commerce' to 'most natural voice demo' → naturalness outweighs verbatim faithfulness"
- ❌ "If circumstances change" — not observable, not a trigger
- ❌ "If a better option appears" — always trivially true, never actionable

To generate these, inventory the assumptions: What did we assume about the deadline? The user? The tool's capability? The budget? Each fragile assumption becomes one line.

### Step 8 — Impact + filing

One line on what this unblocks or affects downstream. Then file it:
- Task-specific → the task's workpack `decisions/` folder
- Spans multiple tasks/domains → the central `decisions/` folder
- Filename: `YYYY-MM-DD-short-slug.md`

## Status lifecycle (decisions are living documents)

```
Awaiting decision ──(decider chooses)──→ Decided
Decided ──(a What-Would-Change-This trigger fires)──→ Revisiting
Revisiting ──(re-analysis confirms original)──→ Decided   (note the re-confirmation + date)
Revisiting ──(new decision made)──→ Superseded            (link the new record)
```

**Rules:**
- Never silently rewrite a `Decided` record's choice. Flip status to `Revisiting`, re-run Steps 4–7, then either re-confirm or write the successor and mark this one `Superseded — see <new record>`.
- A `Superseded` record is never deleted — it explains why the old path looked right, which is exactly what a future session needs.
- When starting related work, scan existing records first; if a relevant one exists, cite it instead of re-deciding.

## Record template

```markdown
# Decision: [Short title — the choice, not the topic]
**Date:** YYYY-MM-DD
**Task:** [task ID or "cross-domain"]
**Domain:** [Academic / Job Search / Freelance / Portfolio / Personal / Building]
**Status:** [Awaiting decision / Decided / Revisiting / Superseded — see <record>]

## Context
[1–2 sentences: the trigger that forced this now]

## Options Considered
### Option A: [Name]
- **Pros:** … **Cons:** …
- **Time/effort:** [realistic]
- **Risk-Reward:** [quadrant]
### Option B: [Name]
- (same fields)

## Decision
**Chose:** [A/B/C]   (use **Recommended:** instead when Status is Awaiting decision)
**Reasoning:** [specific, milestone-anchored — 1–3 sentences]

## THE ONE DECISION   (only when Status: Awaiting decision — omit once Decided)
[the single crux question from which everything else follows mechanically]

## What Would Change This   ← mandatory
- [observable trigger] → [action]
- [observable trigger] → [action]

## Impact
[what this unblocks/affects downstream]
```

## Worked example (condensed from a real record)

```markdown
# Decision: Voice engine — keep Scribe+ElevenLabs cascade vs. adopt speech-to-speech Realtime
**Date:** 2026-07-10 · **Task:** t60 · **Domain:** Building · **Status:** Awaiting decision

## Context
Dinesh proposed replacing the demo's voice cascade with a speech-to-speech
realtime model. The demo's premise is verbatim-faithful spoken prices.

## Options Considered
### Option A: Wholesale replace with speech-to-speech Realtime
- **Pros:** native barge-in/turn-taking; better one-model prosody
- **Cons:** spoken prices become model-paraphrased — vendor docs say S2S output
  "can't be made deterministic" [EVIDENCED: vendor docs]; no native Indian-Hindi
  voice, reads foreign to the target persona [EVIDENCED: vendor voice catalog]
- **Time/effort:** days (new key, new session plumbing, new eval)
- **Risk-Reward:** HIGH RISK / MEDIUM REWARD

### Option B: Keep cascade as faithful spine; Realtime only on the open-browsing lane
- **Pros:** keeps verbatim price guarantee; showcases naturalness where stakes are low
- **Cons:** two engines to maintain; barge-in gain partly reachable by tuning the
  existing cascade anyway [EVIDENCED: endpointing docs]
- **Time/effort:** ~1 day additive experiment
- **Risk-Reward:** LOW RISK / MEDIUM REWARD

## Decision
**Recommended:** B. The demo is titled "The Honest Shopkeeper" — one stage-audible
wrong price kills its credibility, and the beta milestone can't absorb a re-eval cycle.

**THE ONE DECISION:** May a spoken price be a model-generated, guardrail-verified
utterance — or must it stay a server-authored string played verbatim?
Everything else follows mechanically.

## What Would Change This
- In-house Indian-audio eval shows Realtime beats the tuned cascade → reopen full replace
- Project reframed from "honest commerce" to "most natural voice" → naturalness wins

## Impact
Unblocks the demo build spec; fixes which engine owns price/confirmation lines.
```

## Anti-patterns

| Don't | Do |
|---|---|
| Record with one option | No real alternative → no record (Step 1 gate) |
| Options listed, no choice | Always a chosen/recommended path — or `Awaiting decision` + THE ONE DECISION |
| Skip What-Would-Change-This | Mandatory; 2–4 observable trigger → action lines |
| "If circumstances change" as a trigger | Name the assumption that expires and how you'd notice |
| Reasoning that fits any project | Ground in the specific milestone, constraint, capacity |
| Confident external claims, untagged | `[EVIDENCED]` / `[UNDER-EVIDENCED]` per craft-critique |
| Hardcode volatile numbers (prices, conversion rates) as permanent facts | Date-stamp them or describe qualitatively — records outlive numbers |
| Edit a Decided record's choice in place | Revisiting → re-decide → Supersede with a link |
| Delete superseded records | Keep them; they explain the old path |
| 20-minute essay | 2 minutes; the template is the ceiling, not the floor |
| Retroactive record that flatters the choice | Write the rejected options as strong as they actually were |

## Pre-file checklist

- [ ] Passed the Step 1 gate (real alternative existed; choice has downstream weight)
- [ ] 2–3 options, each with pros/cons, realistic time, and a risk-reward quadrant
- [ ] A chosen path with reasoning specific enough that it couldn't describe another project
- [ ] Reasoning anchored to a milestone
- [ ] What-Would-Change-This present, every line an observable trigger → action
- [ ] Load-bearing claims tagged per craft-critique's evidence protocol
- [ ] Status set; if Awaiting decision, THE ONE DECISION is stated
- [ ] Filed with `YYYY-MM-DD-slug.md` name in the right decisions folder

## Boundaries

- **craft-critique** owns the Evidence-Discipline Protocol (cite / get / flag) and verdict language — this skill tags claims per that protocol, never restates it.
- **identify-business-problems** owns opportunity sizing and using the risk-reward quadrant to triage *whether* something is worth doing; this skill uses the quadrant only to label options inside a record.
- **present-and-defend-work** owns turning a record into a readout, presentation, or BLUF update for an audience; this skill produces the artifact it presents from.
- **write-problem-statement** owns framing the problem before any options exist; a decision record assumes the problem is already framed.

## Sources

**Dinesh's ARIA decision-record protocol** — not NN/g-grounded, not a fork. The format (2–3 options with risk-reward + realistic time, a chosen path with milestone-anchored reasoning, the mandatory What-Would-Change-This section, and the Decided → Revisiting → Superseded lifecycle) is lifted directly from ARIA's Decision Records protocol and the `decision-record.md` template — its authority is Dinesh's own operating standard. Evidence tagging (`[EVIDENCED]` / `[UNDER-EVIDENCED]`) is `craft-critique`'s Evidence-Discipline Protocol, cited never restated. The worked example is condensed from the real t60 voice-engine record (2026-07-10), with its volatile cost figures stripped — grounded, not invented.
