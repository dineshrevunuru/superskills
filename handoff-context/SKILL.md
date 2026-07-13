---
name: handoff-context
description: "Compact a conversation into a handoff another agent can resume from — decisions + state + open threads + the ONE next action, never a transcript. Shaped to the ARIA Hub session-report schema so a handoff FEEDS the registry instead of inventing a parallel format. Use when a session is ending, context is running low, work passes to a fresh agent or sub-agent, or asked 'hand this off', 'write a handoff', 'summarize this for the next session', 'compact this so someone can pick it up', 'session summary for the Hub', 'wrap up so I can continue tomorrow'. Mode-switch: a 3-line quick pass vs a full state dump."
license: "MIT — forked from `handoff` in mattpocock/skills (© Matt Pocock). Kept: the suggested-skills section, secret redaction, and reference-artifacts-don't-duplicate. Changed: output aligned to the ARIA Hub session-report schema (so it feeds the registry, not OS-temp), added the mode-switch and intake gate, made it model-invokable."
---

# Handoff Context

Compact a live conversation into a document the next agent resumes from — carrying **decisions + state + the one next action, not a transcript.** A handoff that pastes the conversation forces the next agent to re-derive everything; a good one lets them start the next action cold.

## When to use / when NOT to use

- **Use** at session end, when context is running low, when work passes to a fresh agent or an ARIA sub-agent, or when Dinesh asks to "wrap this up so I can continue tomorrow."
- **NOT** for a pure backward-looking session log with no continuation — the plain `aria/templates/session-report.md` fills that; a handoff is a session-report **plus a forward pointer** (the next action + suggested skills).
- **NOT** for authoring a permanent decision record — a handoff *links* decisions by path; if a choice deserves a durable record with a "What Would Change This" section, that's **`write-decision-rationale`** / the decision-record template.
- **NOT** the formal uninvite/exit flow — the `EXIT_REQUESTED.flag` two-phase commit (CLAUDE.md) is a different object; a handoff is agent→agent continuation, not deregistration.

## Two paths — mode-switchable

Never write one weight regardless of the receiver. Pick the path, state which you took.

- **Quick handoff (3 lines, ~2 min):** Summary → the one next action → one pointer to where things live. For a warm same-thread continuation, an in-flight nudge, or a receiver who already shares your context. Save to the scratchpad/OS temp.
- **Full state dump (the schema below):** every field the next agent needs to start cold. For a fresh agent, a cross-domain pass, or anything that files into `aria/projects/{project_id}/reports/` and feeds the Hub registry.

**Recommended default:** quick for a warm same-project continuation; full for a cold handoff or anything a different agent/domain (or the Hub) will read. **When unsure, full** — a fresh agent has none of your context, and under-informing costs more than an extra minute.

## Intake gate — ask only the gap

One thing you often can't infer: **what the next session will focus on.** Ask it once, with a recommended default drawn from the last open thread — so Dinesh confirms rather than composes:

> "Handing off — I'll aim the next session at *[the top open thread]*. Different focus?"

**Discover silently (do not ask):** the project/workpack/domain (from cwd + context), which mode fits (warm→quick, cold→full), what already lives in artifacts (link specs/ADRs/commits/diffs by path — never re-summarize them into the handoff), and whether this feeds the Hub (→ file it in `reports/`). If every gap has a safe default, state them and write — don't stall.

## The method (situational — build from the schema, drop empty fields)

The handoff maps closely onto the ARIA session-report so it can double as the report. It is a **menu, not a march**: populate the fields that carry real content, mark the rest `None`, and never manufacture a decision that wasn't made. Completing every field is not the goal; letting the next agent start the next action without re-reading is.

1. **Name the destination.** Fresh agent, sub-agent, or future-you? That sets the mode and the save location.
2. **Extract decisions, not narration.** Walk the conversation for choices made and the reasoning — discard the path that got there. Link any decision record by path.
3. **Snapshot state by reference.** Branch, files touched, what's half-done, what's green/red. Point at artifacts (specs, plans, ADRs, commits, diffs, test output) by path/URL — do not paste them in.
4. **List open threads as status + next step**, not as a to-do soup. Each thread names where it stopped and the single next move.
5. **Write the ONE next action.** The single first thing the next agent should do — concrete enough to start on without a decision.
6. **Pre-route with suggested skills** (see below).
7. **Redact + save.** Strip secrets; save to the mode's location.

## The carry-forward discipline (what survives the compaction)

- **Decisions over transcript.** A carried decision = *what was chosen + why, in one line* (link the record if one exists). The dialogue that produced it is noise to the next agent.
- **Claims at their real confidence.** A handoff must not launder an unverified claim into a fact — "the booking flow tested well" handed forward as settled is a false premise the next agent builds on. Carry each state-claim as verified (cite the test run / commit) or flag it unverified, per **`craft-critique`**'s evidence protocol. (Its AI-work inflation scan applies to your own summary too — strip "seamless / significantly improved.")
- **Findings keep their basis.** If the handoff passes a *research* finding forward ("users abandon at step 3"), carry its sample basis and confidence — a stripped finding becomes false certainty in the next agent's hands. Load **`name-and-control-bias`** if they'll act on it.
- **Artifacts by reference.** Specs, ADRs, PRDs, commits, diffs, `references/` files already exist — link them; duplicating them into the handoff is the sprawl that makes it unreadable.
- **Redact secrets.** No API keys, tokens, passwords, or PII in a document that lands in a shared reports/ tree.

## Where to save it

| Situation | Location |
|---|---|
| Sub-agent handoff / anything the Hub should see | `aria/projects/{project_id}/reports/YYYY-MM-DD-handoff.md` |
| Workpack-scoped task continuation | `data/workpacks/<task>/HANDOFF.md` |
| Quick, ephemeral same-session pass | the scratchpad / OS temp dir |

Default to the registry-visible path for a full handoff — dumping into OS temp (Pocock's default) is where the Hub never sees it, defeating the personalization.

## Output format — the handoff document (full mode)

The ARIA session-report's fields (Summary / Decisions / Open Items / Blockers / Notes for Hub), with Work Completed sharpened into a **State** snapshot and the two forward-facing fields the report lacks (**Next action**, **Suggested skills**):

```markdown
# Handoff — {task / project}
**Date:** {YYYY-MM-DD} · **Project/workpack:** {id} · **Domain:** {domain}
**For next session:** {the focus, from the intake gate}

## Summary
{1–3 sentences: what this session did and where it leaves the work.}

## Decisions made
- {decision} — {one-line reasoning}. {link to decision record if one exists, or "None"}

## State — where it stands
- Branch: {name} · Touched: {files, by path}
- Working: {what's green — cite the test run/commit} · Half-done: {what's mid-flight}
- Artifacts (do not re-read here, open by path): {spec / ADR / diff paths}

## Open threads
- {thread}: stopped at {X} → next step {Y}
- (or "None — clean stopping point")

## Blockers
- {blocker}: {what's affected, options considered} (or "None")

## Next action
{The single first thing the next agent should do — concrete enough to start cold.}

## Suggested skills
{Route via `ask-dinesh`; name the specific skills the continuation needs.}

## Notes for Hub
{Cross-domain awareness — timeline/registry impact — or "None".}
```

**Quick mode** collapses to Summary + Next action + one path pointer — nothing else.

**Suggested skills** is Pocock's contribution, kept: pre-fill a pointer *into* the router for this specific continuation. If UI/motion work continues → "load **`design-taste`** first"; if the next agent will review the code → **`review-shipped-code`** / **`craft-critique`**; if chasing a defect → **`diagnose-bugs`**; when unsure which → **`ask-dinesh`** to route.

## Worked example — transcript dump → resumable handoff (catches the target failure)

**As received (a handoff that dumps the conversation):**

```
We started on Boo's barge-in duck. I opened server.js and read the router. You said
the duck felt too slow, so I lowered the gain ramp to 80ms but it clipped. Then we
debated GSAP vs a raw Web Audio ramp — you preferred Web Audio. I changed the ramp,
ran the Playwright test, and it failed on Chrome. I checked the console, saw an
AudioContext error, and we talked about autoplay policy for a while. I fixed it by
resuming the context on the first gesture. The test passed on Chrome but I didn't
get to Safari...
```

**Run the discipline — the failure it catches:** one decision (Web Audio over GSAP) and one open thread (Safari untested) are buried in nine lines of narration. The next agent has to re-read the whole thing to find them, and can't tell the *verified* claim (Chrome passes) from the *unverified* one (Safari) — the exact false-premise risk `craft-critique` guards.

**Rewritten to the schema:**

```markdown
# Handoff — Boo voice agent · barge-in duck
**Date:** 2026-07-12 · **Project/workpack:** portfolio · **Domain:** Building
**For next session:** verify the duck ramp on Safari/WebKit

## Summary
Tuned Boo's barge-in duck to a raw Web Audio gain ramp and cleared an AudioContext
autoplay error by resuming on first gesture. Chrome verified green; Safari unverified.

## Decisions made
- Duck ramp via raw Web Audio, not GSAP — GSAP added nothing over a native gain ramp
  and the ramp must be sample-accurate. (no durable record yet — promote if it recurs)

## State — where it stands
- Branch: boo-duck-tune · Touched: server.js (router), audio ramp util
- Working: AudioContext resumes on first gesture; Playwright barge-in suite green on
  Chrome (verified this session) · Half-done: Safari path never run
- Artifacts: server.js router; the barge-in decisions in boo-product-identity memory

## Open threads
- Safari duck ramp: stopped before running it → next step: Playwright suite on WebKit

## Blockers
- None

## Next action
Run the Playwright barge-in suite on WebKit and confirm the duck ramp doesn't clip.

## Suggested skills
`diagnose-bugs` if WebKit fails; `design-voice-interactions` if the duck *timing*
needs a design call rather than a fix; route via `ask-dinesh`.

## Notes for Hub
Portfolio/Building domain; no timeline impact. Not ready to merge until Safari passes.
```

The rewrite hands the next agent a single first action and a scannable state — they never re-read the session, and the verified/unverified split is explicit.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Paste the conversation / narrate the path you took | Carry the decision + one-line reasoning; discard the path |
| Copy the spec/ADR/diff into the handoff | Link it by path; keep the handoff scannable |
| Hand off "it tested well" as settled fact | Mark each state-claim verified (cite run) or unverified — per `craft-critique` |
| List ten equal to-dos | One prioritized **Next action** + open threads as status→next-step |
| Invent a decision to fill the field | Mark empty fields `None`; a handoff is a menu, not a march |
| Save to OS temp where the Hub never sees it | File full handoffs in `reports/` so they feed the registry |
| Leave a key/token/PII in the doc | Redact before saving to any shared tree |
| Reinvent a bespoke format | Use the ARIA session-report field schema so it doubles as the report |

## Boundaries

- **`aria/templates/session-report.md`** owns the backward-only session log; this skill *extends* its field schema with the forward pointer (Next action + Suggested skills). One full handoff can be filed AS the session report — don't write both.
- **`write-decision-rationale`** / the decision-record template own durable decisions with "What Would Change This"; a handoff only *links* them.
- **`ask-dinesh`** routes a fresh task from scratch; the handoff's Suggested-skills field is a *pre-filled* pointer into that router for this one continuation.
- The **`EXIT_REQUESTED.flag`** uninvite protocol (CLAUDE.md) owns deregistration; a handoff is continuation, not exit.

## Sources

- Forked from **`handoff`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Kept: the suggested-skills section, secret redaction, and reference-artifacts-don't-duplicate. Reworked: output aligned to the ARIA Hub session-report schema and registry-visible save paths (not OS temp), added the mode-switch and intake gate, and made it model-invokable so the agent can fire it when context runs low.
- Schema aligned to **`aria/templates/session-report.md`** (Summary / Decisions / Open Items / Blockers / Notes for Hub) and the sub-agent reporting contract in the project CLAUDE.md (reports live in `aria/projects/{project_id}/reports/`).
- **`data/templates/decision-record.md`** — the durable-decision format a handoff links to rather than reproduces.
