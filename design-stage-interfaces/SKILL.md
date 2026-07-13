---
name: design-stage-interfaces
description: "Breaks AI output out of chat into structured, generated UI on a 'stage' — one present-tense surface that re-composes per intent — and owns the conversation-vs-GUI decision. Use when someone asks 'should this be a chatbot?', when a design 'reads as chat' or the mandate is 'avoid a chat interface', when designing how an AI answer appears on screen ('generative UI', 'intent-based UI', composed answers, voice-first screens, Echo Show / kiosk / ambient displays), or when designing the switch between talking and showing. For behavior once inside a conversation (turns, question phrasing, repair), use design-conversational-interfaces instead."
---

# Design Stage Interfaces — break the answer out of chat

Decide whether an AI feature should be conversation, GUI, or hybrid — then render every AI answer as composed, structured UI on a single re-composing stage instead of a scrolling chat log.

## When to use / when NOT to use

**Use when:**
- Deciding the container for an AI feature: chat, GUI, or hybrid ("should this be a chatbot?")
- A conversational prototype reads as chat and must escape it ("this looks like every other chatbot")
- Designing what an AI's *answer* looks like on screen — generative UI, composed answers, voice+screen splits
- Designing the moment the system switches from listening to showing, and back

**NOT for:**
- Behavior once *inside* a conversation — turn design, question phrasing, repair, persona → `design-conversational-interfaces`. This skill decides WHETHER and WHERE conversation happens; that one owns what happens within it.
- Voice mechanics — barge-in, ducking, interim transcripts, push-to-talk → `design-voice-interactions`
- Enforcing that the model can only emit UI, never prose → `design-output-contracts`. This skill designs the surface; that one builds the guarantee.
- Taste values (element count, breathing room, motion) → load `design-taste` first, always.

## Three facts that drive everything

1. **Chat is a layout, not a technology.** Six layout signals make something read as chat (list below) — not the presence of an LLM. A product can use AI heavily and contain zero chat; a scripted demo with bubbles and a scrollback still reads as chat. Diagnose the layout, not the model.
2. **Free-text articulation is a skill many users don't have.** NN/g calls this the articulation barrier: intent-based outcome specification (tell the AI the outcome, not the steps) is the new paradigm, but demanding well-formed prose from users excludes a large share of them. The fix is hybrid: GUI scaffolds around input (chips, prompt controls, structured pickers) and structured UI as output.
3. **Speech is transient; screens persist.** A user cannot re-hear a number. Split the modalities by strength: conversation captures intent and narrates; the screen persists, structures, and lets the user scan and verify. Neither does the other's job.

**The governing rule: conversation captures intent; the stage delivers the answer.** Chat as a full-time container — intent in bubbles, answers in bubbles, history as scrollback — is almost never the right call.

## The 6 chat signals (the diagnostic)

A surface reads as chat when it has any of these. Audit every conversational design against all six:

| # | Signal | Stage replacement |
|---|--------|-------------------|
| 1 | Speaker-attributed bubbles (left/right) | Attribution by behavior: the user's words are a transient caption; the system's answer is the composed UI itself. Only two things exist — your words, and the world they conjure. |
| 2 | Scrollback accumulating every turn | ONE stage. New intent re-composes the surface in place; the old answer dissolves, never stacks. Recall comes back via the recall menu (below), never a transcript. |
| 3 | Bottom composer bar | No permanent text box. Voice is ambient; type is a summonable palette (⌘K) that appears and vanishes. A voice *transport* pill (status + level + interrupt, zero text entry) is allowed — it is not a composer. |
| 4 | Visible turn-taking stacked Q→A→Q→A | Only the current composed state exists, morphing on new intent. No history column of exchanges. |
| 5 | Per-message avatars / timestamps | None. The system's presence is ambient (an orb, a status line), not stamped on each message. |
| 6 | "Sent message" mechanic (submit → wait → reply appears) | Continuous presence: the user's speech surfaces as it's understood and fades; the stage begins composing on intent resolution, with an honest working status. |

Partial removal fails. A demo where the agent never sends text bubbles still reads as chat if the scrollback, the user-side bubbles, and the bottom dock remain. Kill all six or you've restyled chat, not escaped it.

## The method

### Step 0 — Load `design-taste`
Every stage decision (one dominant element, cut-don't-shrink, motion ceiling) defers to it.

### Step 1 — Decide the container (the decision this skill owns)

```
Q1. Can the user's need be enumerated up front?
    (finite options, known filters, a form would work)
    ├─ YES → GUI. Do not build a chatbot. Chat adds interaction
    │        cost — typing, waiting, reading — with zero gain over
    │        a well-designed picker. Skill ends here.
    └─ NO — long-tail, open-ended, or problem-shaped intent → Q2

Q2. Can users articulate what they want in one utterance?
    ├─ MOSTLY → conversational ENTRY (voice or typed) feeding an
    │           intent engine → answer renders on the stage
    └─ OFTEN NOT (blank-page / blank-mic problem)
              → hybrid entry: open input + visible scaffolds —
                starter chips, prompt controls, example asks.
                Affordance without instruction: the chips show
                "what you can ask here."

Q3. Is the ANSWER structured?
    (numbers, comparisons, products, steps, media, evidence)
    ├─ YES (almost always) → compose it as UI on the stage.
    │        Never a prose reply.
    └─ TRULY conversational (open dialogue, emotional support,
             negotiation — rare) → stay in conversation →
             hand off to design-conversational-interfaces

Q4. Will the user need to recall, compare, or forward it later?
    └─ YES → design recall mechanisms (Step 3, rule 7) —
             never a transcript.
```

### Step 2 — Run the 6-signal audit
On any surviving conversational surface, check each signal in the table above and specify its replacement. Write the audit down: `signal present? → replacement chosen`.

### Step 3 — Design the stage (7 rules)

1. **One surface, present tense.** The current answer lives on the stage and re-composes in place on new intent. Chat is a log (history-oriented); the stage is a scene (present-oriented).
2. **User words are ephemeral.** Speech or typed input surfaces as a transient caption that fades once understood — never a persistent bubble in a record.
3. **No composer; input is ambient or summonable.** Voice always available; ⌘K palette for type. Type and tap are accelerators into the *same* intent engine, never a lesser mode.
4. **Every element must reduce load, or be cut.** The screen exists to carry cognitive load off the user (persist the number they can't re-hear, show what's askable) — it is never a control panel they must operate. Run the test per element: does it reduce load or add it?
5. **Split the modalities by strength.** Voice narrates and navigates; the screen persists and proves. Never read aloud what the screen already shows; never paint a wall of text that's being spoken (use synced, ephemeral captions).
6. **The answer is generated UI, not prose.** Every response — including "I don't know" — resolves to a designed component: metric tile, comparison card, steps row, live embed, honest-fallback widget. A text blob on the stage is a defect. Enforcement mechanism (closed-enum routing, forced tool call, no prose field) → `design-output-contracts`.
7. **Give recall back without a log.** Killing scrollback without a recall mechanism trades one failure for another — a user who wants the number they saw two answers ago must be able to get it. Pick from the recall menu:

| Mechanism | What it gives | Use when |
|---|---|---|
| Chapter rail of *questions* | A slim numbered index of what was asked; tapping re-composes that answer | Multi-question sessions. History = an index of questions, never a transcript of answers. |
| Rewind scrubber / timeline | Scrub prior composed states like video (filmstrip, not scroll) | Linear narrated content |
| Pinned artifacts | Key proof (a metric, a live demo) parks on the stage and persists while narration moves on | Evidence the user must re-check or verify |
| Deep links (state in URL) | Every composed state is a shareable, returnable URL | Anything forwardable — someone sends a saved view to a colleague |

### Step 4 — Design the switch (the seam between talking and showing)

- **In (intent → stage):** intent resolves → old state dissolves → an honest working status morphs ("pulling the case… writing it up…") → the answer composes. Status lines change only between sections, never mid-block.
- **Pacing law: narrate the hook, hand over the depth.** Conversation owns entry and quick answers; depth loads as a scannable composed state the user self-paces through. The AI is an accelerator, never a bottleneck.
- **Momentum default, control the exception.** Auto-advance is gated to voice/reading pace (never yank content away); any scroll, key, or tap detaches auto-drive with a visible "Resume" affordance; auto-advance *pauses by design* when a live, operable artifact lands — the user gets the wheel at the moment of maximum interest.
- **Out (stage → conversation):** never dead-end. Every composed state ends with a real follow-up plus 2–3 soft next-step chips. A new utterance at any moment re-composes the stage (interruption mechanics → `design-voice-interactions`). Tapping any on-stage element may redirect the narration to it — the user can walk with the system or grab the wheel.

### Step 5 — Verify against taste and truth
Run the `design-taste` self-check on the composed states. Any claims shown on the stage (metrics, "live" badges) follow `craft-critique`'s evidence protocol — a stage that composes beautifully around an unverified number is a beautiful lie.

## Worked example 1 — de-chatting a voice agent (real case)

Dinesh's voice-first portfolio agent had a full scripted demo where the agent *never sent a text bubble* — every answer rendered as structured beats. It still read as chat. The 6-signal audit found why:

| Signal | Present? | Fix shipped |
|---|---|---|
| 1 Bubbles | User-side only (their speech showed as right-aligned bubbles) | User's words became a large transient center caption that fades once understood |
| 2 Scrollback | YES — answers accumulated in a scrolling feed | ONE center stage; each answer composes in place; the *previous answer* dissolves |
| 3 Composer | YES — persistent bottom dock | Dock removed; voice ambient; ⌘K palette for type; later, a bottom voice-transport pill (status + level + tap-to-interrupt, no text entry) — allowed, it's a transport |
| 4 Turn stack | Implied by the feed | Gone with the feed |
| 5 Avatars | No | — |
| 6 Sent-message | Partially | Continuous listening + honest status line ("Listening…" → "Thinking" → "Speaking") |

Recall resolution (better than pure no-history): once a question is answered, the answer fades and **the question drops into a slim right-side chapter rail** (01…05), with a rewind scrubber below — history is an index of questions asked, never a transcript of answers. Key proof pins to the stage; every composed state is a deep link.

Result: the same content and motion, one container change — and the product stopped reading as "another chatbot" and started reading as a system composing answers in front of you.

## Worked example 2 — the container decision on a shopping surface

Ask: conversational commerce on a smart display (Echo Show class) for first-time, low-digital-literacy users.

- **Q1 enumerable?** No — users arrive with problems ("my skin gets dry in winter"), not product names. → conversation survives.
- **Q2 articulable?** Yes, in their own words — one open prompt ("Tell me what you're looking for, or what's troubling you"), then 1–3 *closed* follow-ups gated on each answer. Never a form.
- **Q3 structured answer?** Yes — a product pick is price + rating + reviews + tradeoffs. So: **voice carries the guidance** (the one question, the recommendation, its plain reason, the honest caveat); **the screen carries the proof** (one dominant hero card readable at 10 ft, price, rating, 2–3 real peer-review lines, "because you said…" fit chips, the runner-up as a slim visible strip). Never read aloud what the screen shows.
- **Q4 recall?** The critique loop ("cheaper", "no fragrance") **re-ranks the stage, not restarts the conversation** — the composed state updates in place.

The decision output: conversation for intent, stage for the answer — not a chat window with product cards inside bubbles.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| "It's not chat — we styled the bubbles differently" | Chat is the 6 layout signals, not the skin | Run the audit; kill all six |
| Chatbot for an enumerable task | Articulation barrier in reverse: forcing users to type what a picker could offer; pure interaction-cost tax | Q1 of the tree → GUI |
| Killing scrollback with no recall mechanism | Users lose the number they saw; frustration replaces clutter | Pick from the recall menu before shipping |
| Keeping a composer bar "just in case" | The permanent text box re-anchors the whole layout as chat | Summonable palette + ambient voice |
| The stage as a control panel | Screens that demand operation add load; the stage exists to reduce it | Per-element load test; cut what adds |
| Model prose printed to the stage | One text blob breaks the paradigm and invites hallucinated content | Closed-enum → component recipes; see `design-output-contracts` |
| Answer dumped after a one-liner ("here you go:" + payload) | Sent-message mechanic in disguise | Compose as narrated beats; talk-then-show, element lands on the sentence that references it |
| Fully open mic/input with no scaffolds | Blank-mic problem: users don't know what they can ask | Starter chips + example asks visible at rest |
| Auto-advancing past a live artifact | Steals the wheel at the moment of maximum interest | Auto-advance pauses by design at operable elements |
| Narrating every element one at a time, evenly | Drip-narration is slow and boring for depth | Narrate the hook, hand over the depth — dense states are self-paced |

## Output format (stage spec)

When this skill produces a deliverable, write a one-page stage spec:

```
CONTAINER DECISION: [GUI / conversational entry + stage / conversation]
  — per decision tree, with the Q1–Q4 answers stated
6-SIGNAL AUDIT: [table — signal present? → replacement]
STAGE STATES: [the finite set of composed answer states + what
  component each is made of; every state a deep link]
RECALL: [chosen mechanism(s) from the menu]
THE SWITCH: [entry trigger → working status → compose; pacing;
  handback chips per state; interruption → re-compose]
OUTPUT CHANNEL: [pointer to the output contract enforcing UI-only]
```

## Sources

- NN/g — AI: First New UI Paradigm in 60 Years (intent-based outcome specification): https://www.nngroup.com/articles/ai-paradigm/
- NN/g — The Articulation Barrier (prose UIs exclude users; hybrid text+GUI as the solution): https://www.nngroup.com/articles/ai-articulation-barrier/
- NN/g — Generative UI (interfaces produced per intent, outcome-oriented design): https://www.nngroup.com/articles/generative-ui/
- NN/g — Prompt Controls in GenAI (GUI scaffolds around free-text input): https://www.nngroup.com/articles/prompt-controls-genai/
- NN/g — Accordion Editing & Apple Picking (users harvest structured pieces from AI output — evidence that answers should be structured, not prose): https://www.nngroup.com/articles/accordion-editing-apple-picking/
- NN/g — Interaction Cost (the currency of the Q1 GUI-vs-chat call): https://www.nngroup.com/articles/interaction-cost-definition/
- Dinesh's practice: the anti-chat stage doctrine and prototypes (`NO-CHAT-STAGE.md`), the flow catalog's stage recipes, and the shipped voice-first portfolio agent (Boo) + a live salon-booking chatbot shipped for a client — the patterns here are extracted from that shipped work.

## Boundaries

- **This skill ↔ `design-conversational-interfaces`:** this skill owns the conversation-vs-GUI decision and the chat↔stage switch; that skill owns behavior once IN conversation (turns, phrasing, repair, persona).
- **`design-output-contracts`** owns the structural guarantee that the model emits UI, never prose (closed enums, forced tool calls, no-prose-field schemas). This skill specifies *that* the stage needs it, not *how*.
- **`design-voice-interactions`** owns barge-in, ducking, turn-taking, and interim-transcript mechanics referenced in the switch design.
- **`design-taste`** is the single source of all taste values; **`craft-critique`** is the single source of the evidence protocol. Reference both, never restate.
