---
name: design-agentic-ux
description: "Designs the surfaces of an AI that ACTS — multi-step plan display, run progress, streaming and think-time states, interrupt/cancel/undo, human-in-the-loop approval gates and review queues, memory visibility and control, and non-determinism affordances (regenerate, versions). Use when an AI works over multiple steps or on the user's behalf: 'show the agent's plan', 'design the approval flow', 'what does the user see while it's working', 'add a regenerate button', 'let users see or edit what it remembers', 'the agent did something without asking', 'progress UI for a long-running AI task', 'design the review queue'. Owns the acting-AI experience; what happens when the AI is WRONG (hallucination, refusal, error states) belongs to design-ai-trust-and-failure-states."
---

# Design Agentic UX

Make an AI that acts feel like a competent colleague, not a slot machine: it announces what it will do, shows what it is doing, can be stopped mid-word, asks before anything irreversible, remembers out loud, and never destroys a version the user might want back.

## When to use / when NOT to use

**Use when:**
- An AI performs multi-step work (research, bulk edits, drafting-and-sending, booking, code changes) and you must design the plan, progress, and control surfaces
- Deciding which agent actions run autonomously vs. need human approval
- Designing a review queue, escalation inbox, or "approve before send" flow
- Designing memory UI: what the system remembers, how the user sees/edits it
- Adding regenerate/versions/variants to any generative output
- Designing streaming text, think-time states, skeletons, or latency budgets for AI work

**Do NOT use for:**
- Hallucination, uncertainty display, refusals, or any "the AI failed/was wrong" surface → `design-ai-trust-and-failure-states` (this skill enumerates the branches; that skill designs them)
- The structural guarantee that the model can only emit designed UI (closed enums, forced tool calls, verified stores) → `design-output-contracts`
- Barge-in mechanics, mic consent, VAD, interim transcript ink → `design-voice-interactions` (this skill sets the *policy* — interrupt always wins; that skill owns the audio mechanics)
- Whether this should be a conversation at all → `design-stage-interfaces`; dialog wording once in conversation → `design-conversational-interfaces`
- Non-AI loading/empty/error screens → `design-ui-states`

Load `design-taste` first — every surface below (status lines, gates, version rails) is a designed surface and obeys it. Claims about users or platforms are handled per `craft-critique`'s evidence protocol.

## The method

1. **Inventory the actions.** List every action the agent can take, as verb + object ("send email to client", "edit 46 prices", "delete draft"). If you can't list them, the agent isn't specified yet — stop and finish the spec first.
2. **Run every action through the Autonomy Gate** (below). The branch decides its control surface.
3. **Design the run surface** — plan display, named-step progress, streaming (checklists below).
4. **Design the control plane** — interrupt, cancel, undo, per action.
5. **Design the gates and queues** for every action the Gate flagged.
6. **Design the memory card** — what is remembered, shown, editable, and dosed.
7. **Design the non-determinism affordances** for every generative output.
8. **Hand off the edges:** failure branches → `design-ai-trust-and-failure-states`; the output contract → `design-output-contracts`; proving the behaviors → `write-ai-evals`.

### Step 2 — The Autonomy Gate (run per action, no exceptions)

```
Can the USER reverse this action in one step, themselves?
├─ NO  (send, publish, purchase, delete, message a human,
│       anything leaving the system's boundary)
│   → APPROVAL GATE before acting. Always.
│     No "just do it" override — the gate IS the confirmation
│     mechanism; a bypass makes every future gate meaningless.
├─ YES, consequences contained (edits a draft, stages a change,
│       reorders a list)
│   → ACT autonomously → leave a RECEIPT → offer one-tap UNDO.
└─ YES, but wide blast radius (bulk edit, change visible to
        teammates/customers, config that alters future behavior)
    → ACT into a STAGED state → user reviews the diff → commits.
Unsure which branch? Escalate one level toward the gate.
```

This is the tier contract Dinesh runs his own AI chief-of-staff on (auto / confirm-first / never-auto). The test is *reversibility × blast radius*, never "how confident is the model." Confidence is not consent.

## Plan display — checklist

- [ ] Any run longer than ~2 steps shows its plan **before** working: steps named as outcomes the user would say ("find matching products", "draft the emails"), not internals ("calling search_catalog")
- [ ] ≤5 visible steps. More than 5 → group. An agent narrating every micro-step is noise, not transparency
- [ ] Progress = **named-step status that morphs between steps, never mid-step** ("pulling the case… → combining the numbers… → writing it up" — the status-line pattern from Dinesh's shipped self-writing reel). Mid-step status flicker reads as instability
- [ ] Determinate progress ("38 of 46") **only** when the count is real. No fake percent bars on unknowable work — a bar that stalls at 90% burns more trust than no bar
- [ ] If the plan itself is consequential (touches gated actions), it is **editable before run**: user can remove a step or downgrade it to "ask me first"
- [ ] Status labels track the actual machine state. His live agent's rule: "Composing" shows only before the first output, "Speaking/Working" holds through gaps between beats, and the status never claims a capability that's off (never "Listening" without a live mic). Truthful status is a hard law, not polish

## Streaming & latency states

| Wait so far | Show |
|---|---|
| < ~300ms | Nothing. An indicator that flashes in and out reads as jitter |
| ~0.3–2s | Ambient working state (pulse/breath on the agent's presence element) — no words yet |
| ~2–6s | Named-step status line (morphing between steps) |
| Past the budget | "Taking longer than usual" + keep-waiting/cancel choice — never an open-ended spinner |

- **Set explicit latency budgets per call and design the over-budget state.** His live agent budgets ~4s for routing and ~6.5s for speech synthesis, then switches to the "taking longer" status. Pick numbers for *your* stack; the point is the budget exists and has a designed state.
- **Model choice is a UX decision.** He switched his live router to a smaller, faster model after measuring multi-second gaps, and rejected a higher-quality TTS model purely on latency — "latency is a dealbreaker for a voice interface." Fastest model that passes quality wins.
- **Stream into a stable layout.** Reserve the space; text fills it. Content must never reflow under the reader's eyes, and an auto-advancing surface never yanks content away before it's consumed (block-gate on reading/attention pace).
- **The overlap rule:** the next block's skeleton appears while the current block is ~70% consumed — the user must never stare at an empty box waiting to fill.
- Reduced-motion variants for every streaming/skeleton animation, per `design-taste`.

## Interrupt · cancel · undo — checklist

- [ ] **Interrupt is always live.** The user can speak/tap/type at any instant and the agent yields immediately — no queue of pending narration behind the interruption (at most a one-slot queue)
- [ ] **Duck-and-resume:** if an interruption turns out to be noise or a false start, resume *exactly* where the agent paused — don't restart the step. (Audio mechanics: `design-voice-interactions`)
- [ ] **Grab-the-wheel:** any manual act (scroll, edit, drag) detaches auto-drive instantly; a quiet "Resume ▸" affordance offers the way back. Momentum is the default; control is the exception — and control always wins the instant it's asserted
- [ ] **Cancel mid-run is a clean stop, not a crash:** finish or roll back the in-flight item, then show the ledger — steps completed / step interrupted / steps not started. Partial work is preserved and labeled partial
- [ ] **Every autonomous action leaves a receipt:** what changed, when, and the undo affordance — in the flow, not buried in a log
- [ ] **Undo must truly undo.** If engineering says restore isn't possible, the action was misclassified — move it to the gate branch. Never ship a decorative undo

## Approval gates & review queues

**Gate anatomy — all five, one screen, one action per gate:**

1. **The ask** — verb + object, plain words: "Send this email to Priya Sharma?"
2. **The why** — one line tracing the trigger: "She's one of 3 wholesale customers affected by the price change."
3. **The exact effect** — the full draft / diff / preview, not a summary of it. Approving what you haven't seen isn't approval
4. **The escape** — edit-in-place and reject are as reachable as approve
5. **The commit** — explicit, labeled with the consequence ("Send now"), never a default-focused OK

**Review queues** (when gates would come in bursts):
- Batch homogeneous, lower-stakes decisions into one queue with per-row approve/edit/reject and a single commit for the untouched remainder
- **Thresholds live in code, not in model judgment.** In Dinesh's Echo Show companion design, the model summarizes context for an escalation but *never decides whether* a safety-relevant escalation fires — that's deterministic server logic. The model writes the memo; the rule fires the event
- The queue shows **digests, not raw transcripts** — reviewers get what they need to decide, not surveillance material
- **Escalations are disclosed to the person they're about** ("I've told Ravi"), and framed as the user's choice wherever possible ("shall I ask Ravi?") — except pre-disclosed safety thresholds
- **Approval-fatigue check:** if the user approves several gates in a row without opening the preview, the gates are miscalibrated — move reversible actions to act + undo. A confirmation must earn its interruption; an ignored gate is worse than no gate

## Memory & context visibility

- **Visible:** the user can open "what you remember about me" and read it in their own words — not embeddings-speak
- **Editable, one write path:** view / edit / delete each item; memory writes go through a single verified path, never side-channel writes mid-conversation the user can't audit
- **Typed and capped:** facts carry a status (open concern / noted / closed); cap the number of **open concerns** (his shipped design: 3 open — distinct from the once-per-session follow-up dose below). An agent tracking 40 "open threads" about you is a stalker, not a companion
- **Dosed:** memory surfaces in conversation as **at most one follow-up per session, early, phrased as a question, never an assertion** ("How's the knee today?" — never "Your knee hurt on Tuesday"). Never enumerate remembered facts back at the user
- **Attributed:** memory-derived output shows its ground in-line — "because you said…" chips tying each recommendation to the user's own stated need
- **Closed honestly:** an open concern closes only on evidence from the *user's own words*, never on the agent's optimistic paraphrase (his quote-gated close rule — health threads literally cannot close without her saying so)
- **Consented:** memory capture is asked for in a designed moment, declinable, and a decline is itself remembered (don't re-ask the same day)

## Non-determinism affordances

- **Regenerate never destroys.** Previous outputs stay reachable — a version rail (v1 · v2 · v3) or history, never a silent replace. Users routinely want v1 back after seeing v3
- **Design for apple-picking:** NN/g observed users harvesting pieces from *multiple* generations. Support side-by-side compare and per-section copy/keep — a full-swap regenerate forces the user to choose one whole when they want parts of each
- **Accordion editing beats re-rolling:** targeted controls on a selection — shorten, expand, change tone — outperform "regenerate everything" for refinement. Put them on the output, not in the prompt box
- **Pin what must not vary:** verified facts (prices, metrics, names) render from the verified store and are byte-identical across regenerations; only the prose around them varies. (Mechanics: `design-output-contracts`)
- **Prompt controls near the output** (suggested refinements, parameter chips) cut the re-articulation cost of "almost right" — the articulation barrier applies twice as hard to *revising*
- **Label the variance:** if the same input can yield different outputs, say so at the surface ("You may get a different result") — implied determinism sets a trap

## Worked example — "Price-list agent" (spec, complete)

Task given to the agent: *"Apply the new supplier price list to our 46 products and email the 3 affected wholesale customers."*

| Surface | Design |
|---|---|
| Autonomy Gate pass | 46 price edits = reversible, wide blast radius → **staged**. 3 customer emails = leaves the boundary → **gated, each**. Commit of staged prices = the explicit user action |
| Plan display | Shown before run: ① Match supplier list to catalog ② Stage price changes ③ Flag unusual changes ④ Draft customer emails (I'll ask before sending). User can tap ④ → "always ask" (already default) |
| Progress | Step ① real count: "38 of 46 matched". Steps ②–④ named-step status morphs: "staging changes… → checking for outliers… → drafting emails…" No percent bar |
| Streaming | Staged-changes table fills in place, rows appear into reserved space; email drafts stream into fixed-size cards; draft-2 skeleton appears while draft 1 is ~70% done |
| Interrupt/cancel | Stop finishes the in-flight row, then ledger: "38 staged · 8 not processed · nothing committed, nothing sent." Resume ▸ offered |
| Review queue | 4 rows where price moved >20% flagged for row-level review (threshold is code, not model opinion); remaining 34 commit in one action. Model's note per flagged row: one-line why |
| Undo | After commit: receipt "46 prices updated · Revert all" pinned; per-row revert in the table |
| Email gates | One gate per recipient: ask + why + full draft + edit-in-place + "Send now". No "send all 3" |
| Memory | Chip after run: "Remembered: wholesale notices go out on Fridays — want me to hold these until Friday? (yes / no / don't remember this)" |
| Regenerate | On a draft: v1/v2 chips, side-by-side, per-paragraph keep; the ₹ figures pinned from the staged table, identical in every version |
| Handoffs | "Supplier list has a product we don't carry" branch → `design-ai-trust-and-failure-states`; the drafts' no-fabricated-price guarantee → `design-output-contracts`; 20-run eval of gate/undo behavior → `write-ai-evals` |

## Anti-patterns

| Don't | Do |
|---|---|
| Fake percent bar on unknowable work | Named-step status, morphing between steps |
| "Thinking…" with no exit | Latency budget + "taking longer" state + cancel |
| Gate every micro-action | Gate irreversibles; act + undo the rest |
| "Just do it" bypass on irreversible actions | The gate is the confirmation; no override path |
| Confidence as consent ("model was 97% sure") | Reversibility × blast radius decides, never confidence |
| Silent memory writes | Ask, show, attribute, allow delete — one write path |
| Reciting everything it remembers | One dosed follow-up, early, as a question |
| Agent decides whether a safety escalation fires | Thresholds in code; model only summarizes context |
| Regenerate silently replaces | Version rail + compare + per-section keep |
| Streaming that reflows the page under the reader | Reserved space; block-gated advance |
| Narrating internal tool calls as "transparency" | ≤5 user-nameable steps |
| "Done!" with no record | Receipt: what changed + undo, in the flow |
| Decorative undo that can't restore | Reclassify the action into the gate branch |

## Output format

When this skill produces an artifact, deliver the **agentic-surface spec**: (1) action inventory with the Autonomy Gate branch per action; (2) run-surface spec — plan steps, status-line script, latency budgets and over-budget states; (3) control-plane spec — interrupt/cancel/undo behavior per action, receipt copy; (4) gate and queue specs with the five-part anatomy filled in; (5) memory card — what's stored, shown, dosed, and how it's edited; (6) versions/regenerate behavior per generative output. The worked example above is the shape.

## Sources

- Intent-based outcome specification — the paradigm agentic UX serves: https://www.nngroup.com/articles/ai-paradigm/
- The articulation barrier (why prompt-only control fails; hybrid GUI+intent): https://www.nngroup.com/articles/ai-articulation-barrier/
- Generative UI & outcome-oriented design: https://www.nngroup.com/articles/generative-ui/
- Prompt controls in GenAI — the 4 uses, controls near the output: https://www.nngroup.com/articles/prompt-controls-genai/
- Accordion editing & apple picking (observed regenerate/versions behavior): https://www.nngroup.com/articles/accordion-editing-apple-picking/
- The 6 types of conversations with generative AI: https://www.nngroup.com/articles/AI-conversation-types/
- Progressive disclosure (plan → detail layering): https://www.nngroup.com/articles/progressive-disclosure/
- Confirmation dialogs — when a gate earns its interruption: https://www.nngroup.com/articles/confirmation-dialog/
- Indicator vs. validation vs. notification — choosing the feedback channel: https://www.nngroup.com/articles/indicators-validations-notifications/
- Proactivity as a chatbot dimension (dose it, make it declinable): https://www.nngroup.com/articles/dimensions-of-ai-chatbots/
- Designing AI products — canonical study guide: https://www.nngroup.com/articles/designing-ai-study-guide/

Dinesh-practice grounding: his live voice portfolio agent (status-line morph, block-gating, grab-the-wheel, duck-and-resume, truthful status machine, latency-driven model choices), the Saathi Echo Show companion (memory dosing, quote-gated closes, code-owned escalation thresholds, digest-not-transcripts review queue, "because you said…" attribution), and the ARIA tier contract (auto / confirm-first / never-auto).

## Boundaries

- **`design-ai-trust-and-failure-states`** owns everything after "the AI is wrong or fails": hallucination mitigation, uncertainty display, refusal UX, error/fallback states. This skill designs the *acting* surfaces and hands every failure branch there by name.
- **`design-output-contracts`** owns the structural guarantee layer (closed enums, forced tool calls, verified-store hydration). This skill *consumes* it — pinned facts across regenerations, fallback-always-resolves — and dictates what the contract must make impossible.
- **`design-voice-interactions`** owns audio turn mechanics (barge-in, VAD, interim ink, mic consent). This skill sets the interruption *policy* — user always wins, resume where paused.
- **`design-stage-interfaces`** owns the conversation-vs-GUI decision; **`design-conversational-interfaces`** owns dialog behavior once in conversation. Agentic runs frequently live on a stage, not in chat — decide there first.
- **`design-ui-states`** owns non-AI state screens (empty/loading/error content generally); this skill owns the AI-run-specific states (plan, streaming, staged, receipt).
- **`write-ai-evals`** proves the behaviors specified here (gate coverage, undo integrity, latency budgets); this skill defines what must be proven.
- **`design-taste`** is the single source of all visual/motion values; **`craft-critique`** owns the evidence protocol and verdict language for any claim made along the way.
