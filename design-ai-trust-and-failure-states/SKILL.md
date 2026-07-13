---
name: design-ai-trust-and-failure-states
description: "Design the user-facing reliability layer of any AI product: uncertainty and confidence display, provenance/citations, hallucination and sycophancy mitigations, explainability calibrated to stakes, and a named cause + recovery path for EVERY failure — refusal, timeout, content filter, context overflow, mic/STT death, TTS death, dead live-embed. Use when asked 'what happens when the AI is wrong/fails/refuses', 'design the error/fallback/empty state for the AI', 'how do we show confidence or sources', 'the model hallucinated', 'the mic/voice broke', or before shipping ANY AI feature — no AI surface ships with only a happy path. Owns failure UX; measuring failure belongs to write-ai-evals."
---

# Design AI Trust & Failure States

Make an AI product trustworthy the way Dinesh's shipped systems are: prevent hallucination structurally, give every displayed fact provenance, and design every failure as a first-class state with a named cause and a real way forward. A failure that breaks character reads as a crash; a designed failure reads as discipline.

## When to use / when NOT to use

**Use when:**
- Designing or reviewing any AI feature's error, fallback, refusal, loading, or uncertainty surface
- Deciding how to display confidence, sources, citations, or "the AI might be wrong" caveats
- An AI system can fail in ways classic UI can't: hallucination, sycophancy, misrouting, mic/STT death, TTS death, context overflow, a dead live-embed
- Writing refusal or safety-deferral behavior (medical, financial, off-limits topics)

**Do NOT use for:**
- Measuring failure rates, golden sets, rubrics, LLM-as-judge, or pre-design model capability assessment → `write-ai-evals`
- The mechanics of closed-enum routing, forced tool calls, and schema contracts → `design-output-contracts` (this skill decides WHICH failures must be prevented structurally and designs what the user sees; that skill owns how the contract is built)
- In-conversation voice turn mechanics — barge-in, interim transcription, echo guards, conversational repair → `design-voice-interactions` (this skill owns voice DEATH states: mic denied, engine failure, timeouts)
- Non-AI error states (form validation, 404s) → `design-ui-states`

Load `design-taste` first — failure states are designed surfaces, not exceptions to the design.

## The core law: constrain, then design the remainder

Trust is built in three tiers, in this order. Never skip to tier 3.

1. **Prevent structurally.** A guarantee beats a tendency. If the model physically cannot emit a fabricated fact, no mitigation copy is needed. (Mechanics live in `design-output-contracts`.)
2. **Design every residual failure.** Whatever cannot be prevented gets a named cause + designed state + recovery path. No failure falls through to a raw error, a spinner, or model prose.
3. **Prove trust on the happy path.** Provenance, tradeoffs, and calibrated explanation make the *correct* answer believable. An unproven right answer earns no more trust than a wrong one.

**The shipped pattern behind tier 1** (from Dinesh's live voice portfolio agent and the Echo Show shopkeeper prototype): the model routes or selects — it never authors user-facing facts. The router is a forced tool call into a closed intent enum with no prose field; the renderer draws only from a verified data store; the model picks product IDs and the server hydrates every price, name, and review. Result: "UI-only output" and "no hallucination" are the same guarantee. Facts the store doesn't hold are structurally impossible to display.

## The method

1. **Run the failure census** before designing the happy path. Walk every layer (table below) and list each way it dies. If you design the happy path first, failures become afterthoughts bolted onto a finished layout.
2. **Sort each failure: prevent or design.** Can this failure be made structurally impossible (closed enum, verified store, deterministic clip, safety gate that runs BEFORE the recommender)? If yes → spec it with `design-output-contracts`. If no → it goes in the failure table.
3. **Fill the failure table** — one row per residual failure: *named cause (user language) + designed state + recovery path (1–3 real doors) + who else is notified.* This table is the deliverable.
4. **Split the misses.** Not-understanding is three different states (decision tree below). Collapsing them into one generic error is the most common AI-UX failure.
5. **Design the trust surface** for the happy path: provenance on every fact, runner-up on every recommendation, uncertainty routing, explainability matched to stakes.
6. **Write the copy** per the NN/g error-message guidelines, then gate: run the pre-ship checklist, audit every claim per `craft-critique`'s evidence protocol, and hand the failure census to `write-ai-evals` so each path gets measured.

## Failure census — the layers to walk

| Layer | Enumerate these failures |
|---|---|
| **Ear (STT / input)** | Mic permission denied · mic granted then revoked · engine "lying success" (starts, never returns results — real Safari behavior) · noise-only input (cough, thud) · unintelligible speech · wrong-language detection |
| **Brain (routing / generation)** | No matching intent (off-catalog real question) · low classifier confidence · off-limits topic (policy) · user confusion ("what do you mean?") · model API error · timeout · context overflow / long-session drift |
| **Facts (data / tools)** | Requested fact not in the verified store · tool call fails · stale data · a fact that exists but can't be shared (NDA, privacy) |
| **Mouth (TTS / output)** | TTS API fails or times out · audio blocked by browser autoplay policy · voice mid-utterance cutoff |
| **Live components** | Embedded live system unreachable · live status claimed but heartbeat dead |
| **Environment** | Network drop mid-turn · tab backgrounded · device switch (desktop → mobile capabilities differ) |

## Decision tree: which miss is this?

The router must distinguish these BEFORE any copy is written — they are different intents with different states, not one error:

```
The system can't fulfill the utterance
├─ User is WILLING but LOST ("didn't get that", "what can I ask?",
│  "say that again", "I'm confused")
│  → GUIDE state: warm re-orientation + the real doors. Never an error tone —
│    nothing failed; the user needs a map. (Shipped as a separate `guide`
│    intent in the live router — do not collapse it into fallback.)
├─ Real question, OUTSIDE the system's content (capability gap)
│  → HONEST FALLBACK: own the gap plainly ("Not wired up. No bluffing."),
│    offer the 2–3 closest real things. Never fake competence.
├─ OFF-LIMITS topic (policy: salary, visa specifics, medical, financial)
│  → REFUSAL: name the boundary + route to the right channel
│    ("That's a conversation, not a soundbite — I'll cover it with you
│    directly." + contact door). For safety-critical refusals the spoken/
│    displayed line is DETERMINISTIC — authored verbatim, never model-written.
└─ GIBBERISH / noise
   → BLIP path: no error state at all. Resume where the system paused.
     Surfacing an error for a cough punishes the user for existing.
```

**Refusal is a trust feature, not an embarrassment.** In the shopkeeper prototype the medicine deferral is the centerpiece demo: symptom query → "For that I won't guess — please see a chemist or doctor" → a caring next step ("shall I tell your son?"). A refusal with a named reason and a human handoff builds more trust than a confident answer. Design refusals to be seen.

## Uncertainty display — the three-band rule

Never show a shaky answer. Route by confidence band:

| Band | Behavior |
|---|---|
| **High confidence + verified data** | Answer plainly, provenance attached. No hedging theater — hedges on solid answers train users to ignore all hedges. |
| **Medium** | Answer + make the uncertainty legible: name the deciding tradeoff, show the runner-up, add a verification nudge for consequential outputs ("check the size chart before ordering"). |
| **Below threshold** | Do NOT render the answer. Route to honest fallback. (The shipped router does exactly this: low confidence → `fallback`, structurally.) |

Rules:
- **No numeric confidence percentages to users** unless calibration is proven by `write-ai-evals`. An uncalibrated "87% confident" is a fabricated fact wearing a lab coat.
- **Status indicators never lie.** Never show "Listening" without a live mic; never show a "live" badge without a real heartbeat; a mute control must actually stop the audio, not just dim the icon. One caught lie poisons every truthful indicator on the page.
- **No premature errors** (NN/g): don't flag failure while the user is still speaking or typing. Require sustained signal before treating input as an utterance (the shipped agent needs ~260ms of sustained voice onset so a thud never opens a turn).

## Provenance — every fact wears its receipt

- Every displayed fact traces to a verified source, and the source is visible: a source chip under a metric, an attributed review line ("people with very oily skin found it heavy"), a named authority for informational answers.
- **Attribute, don't assert.** "The brand says…" — never the agent's own claim on anything the agent didn't verify.
- **Design the honest absence.** When a fact exists but can't be shared (NDA, privacy), show the absence AS the state — a visible "why I can't show this" where the number would be — never a fabricated stand-in. In Dinesh's portfolio, the enterprise case deliberately renders NO metric and says why; the restraint reads as discipline. Absence, made visible, is a receipt.
- Every trust claim in your copy is handled per `craft-critique`'s evidence-discipline protocol.

## Sycophancy mitigations (design-side)

NN/g: generative models align to the user's stated views, and drift compounds over a session. Counter it in the design, not just the prompt:

1. **Ground answers in retrieved/verified data, never in the user's framing.** "You're right, that IS the best one" is a failure; "this one fits because you said X — but the cheaper one is plenty" is the standard.
2. **The runner-up rule: never bare confidence.** Every recommendation names the runner-up and the deciding tradeoff. A system willing to talk the user OUT of an option (downsell when fit allows, surface honest cons) is the strongest trust signal available.
3. **Design dissent affordances.** An explicit "what should I watch out for?" path returning attributed negative themes — the system that only praises is the system users stop believing.
4. **Session-reset nudge.** On long sessions, offer a fresh start carrying a summary of pinned facts — drift dies with the context.
5. **Ban flattery microcopy.** No "Great question!" — it's sycophancy in the UI layer.

## Explainability by stakes

Match explanation depth to consequence, not to how proud you are of the model (NN/g: craft explanations per role and stakes):

| Stakes | Explanation | Example |
|---|---|---|
| **Low** (a content pick, a sort order) | One plain-language reason, inline | "Because you said dry skin" fit-chip |
| **Medium** (money, time, effort) | Reason + deciding tradeoff + provenance | Pick + runner-up + "this one's gentler, that one's ₹300 less" + review attribution |
| **High** (health, legal, finances, irreversible) | Don't explain — REFUSE and route to a human, with deterministic verbatim copy | Medicine query → scripted deferral to a pharmacist, never a model-authored sentence |

Over-explaining low stakes adds load (violates `design-taste`: cut, don't add); under-explaining high stakes is a liability. The high-stakes row is not an explanation problem — it's a refusal problem.

## Worked example — failure table for a shipped voice-first agent

Condensed from Dinesh's live portfolio agent (Boo) and the Echo Show shopkeeper prototype. This is the artifact step 3 produces:

| Failure | Named cause (user language) | Designed state | Recovery path |
|---|---|---|---|
| Off-catalog real question | "Not wired up — I'd rather show you than bluff." | Hand-authored fallback widget: honest headline + redirect chips. Never prose. | 3 chips to the closest real content + open mic |
| User confused / lost | Nothing failed — user needs a map | Warm `guide` re-orientation ("Let's find it.") | The 3–4 strongest real doors as chips |
| Off-limits ask (salary etc.) | "That's a conversation, not a soundbite." | Refusal naming the right channel; no answer attempted | Contact door |
| Safety ask (medicine) | "For that I won't guess — see a chemist or doctor." | Deterministic verbatim deferral, gate runs BEFORE the recommender; item unsellable by data | Human handoff offer ("shall I tell your son?") |
| Router timeout | "Taking longer than usual…" | Status line at a short tested threshold (~4s), then a local keyword router answers anyway | Degraded-but-working routing; never a bare spinner |
| TTS fails / times out | Voice drops, words don't | Fallback chain: hosted TTS → browser TTS → silent + full text on screen (~6.5s gate) | UI never blocks on audio |
| Mic permission denied | "Mic off." + struck-mic glyph | Truthful status + recovery card with browser-specific fix steps; typed input stays first-class equal | Re-ask on tap; grant mid-session → greeted back |
| STT lying success (engine starts, returns nothing) | Silent — user must never discover it by talking to a dead ear | Watchdog timer detects zero results → auto-switch to the server STT path | Seamless; recovery copy only if both die |
| Noise-only input (cough) | None shown | Blip path: agent resumes exactly where it paused | Nothing to recover — no state change |
| Live embed unreachable | "She's not reachable right now — here's the real link." | Honest down-state; never a scripted impostor faking liveness; live badge tied to heartbeat | Real external URL + other proof doors |
| Low classifier confidence | Same as off-catalog | Routed to fallback structurally — a shaky answer never renders | Fallback doors |
| Context overflow / drift | "We've covered a lot — want a fresh start? I'll keep the short list." | Summary + reset offer; key facts pinned | Fresh session carrying pinned facts |

Every row: cause named honestly, state designed in-register, a real door out, no prose leak. Note which rows notify a second party (the shopkeeper's missed-safety escalations go to a designated family member) — failure UX includes who ELSE hears about it.

## Copy rules for failure states (NN/g error-message guidelines)

- **Visible** where the failure happened — not a toast in a corner for a center-stage failure
- **Human language, zero codes** — "I can't reach the voice service" not "Error 502"
- **Precise about what actually happened** — "mic is off" ≠ "didn't catch that" ≠ "not in my catalog." One generic message for three causes is three lies.
- **Constructive next step in the same breath** — the door is part of the message, not a separate screen
- **Never blames the user** — "I didn't catch that" not "You weren't clear"
- **Stays in-register** — the failure state uses the product's voice and visual system. Breaking character into system-speak ("Sorry, an error occurred") reads as a crash even when it's handled. Even the failure is designed — a graceful miss demonstrates the same discipline the product claims.
- Audit existing products' messages against the NN/g scoring rubric (see Sources) to prioritize fixes.

## Pre-ship gate (run before any AI surface ships)

- [ ] Failure census complete — every layer walked, every row prevented or designed
- [ ] Zero "something went wrong": every failure names its actual cause in user language
- [ ] Every failure state offers ≥1 real recovery door — zero dead ends
- [ ] Guide / fallback / refusal / blip are distinct states, not one error
- [ ] High-stakes refusals are deterministic verbatim copy, never model-authored
- [ ] Status indicators cannot lie (listening, live, muted, thinking — each tied to real state)
- [ ] Every displayed fact traces to a verified source; provenance visible; absences designed, not papered over
- [ ] Every recommendation carries a runner-up or named tradeoff — no bare confidence
- [ ] Below-threshold confidence routes to fallback; no shaky answers rendered
- [ ] No uncalibrated confidence numbers shown to users
- [ ] Failure states pass `design-taste` (designed surfaces) and copy passes the NN/g guidelines above
- [ ] Failure census handed to `write-ai-evals` with expected behavior per row (the measurement contract)

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| "Sorry, I didn't understand that." for every miss | Name which miss it is: lost, off-catalog, off-limits, or noise |
| Let a failure fall through to raw model prose | Every branch resolves to a designed state — the fallback is a widget, not a paragraph |
| Show "Listening" / "Live" / muted states cosmetically | Bind every status to the real underlying state |
| Display an uncalibrated confidence % | Route by band; prove calibration before showing numbers |
| Hedge every answer to feel safe | Hedge only medium-band answers; hedging everything trains users to ignore hedges |
| Fabricate a stand-in when a fact is missing or NDA'd | Design the honest absence — visible, with the reason |
| Agree with the user's framing, then answer | Ground in verified data; name the tradeoff; keep the runner-up |
| Bolt error states on after the happy path | Census first; failures are enumerated before layout begins |
| A refusal that just says no | Refusal = named boundary + the right human/channel to go to |
| Punish noise with an error state | Blips resume silently; errors are for real turns |
| Explain a high-stakes answer harder | High stakes → refuse and hand to a human, deterministically |

## Output format

Deliver as: (1) the failure table — `failure | named cause | designed state | recovery path | who's notified`, one row per residual failure; (2) the structural-prevention list handed to `design-output-contracts`; (3) trust-surface spec (provenance, runner-up, uncertainty bands, explainability tiers); (4) the copy per state; (5) the measurement handoff to `write-ai-evals`.

## Sources

- Hallucination mitigations (uncertainty, verification nudges): https://www.nngroup.com/articles/ai-hallucinations/
- Sycophancy in generative-AI chatbots (alignment drift, session resets): https://www.nngroup.com/articles/sycophancy-generative-ai-chatbots/
- Explainable AI in chat interfaces: https://www.nngroup.com/articles/explainable-ai/
- Crafting AI explanations by role and stakes: https://www.nngroup.com/articles/crafting-ai-explanations/
- Designing AI products — canonical study guide: https://www.nngroup.com/articles/designing-ai-study-guide/
- Error-message guidelines (visible, human, precise, constructive, no premature errors): https://www.nngroup.com/articles/error-message-guidelines/
- Error-messages scoring rubric (auditable quality scale): https://www.nngroup.com/articles/error-messages-scoring-rubric/
- Slips vs. mistakes; preventing conscious mistakes: https://www.nngroup.com/articles/user-mistakes/

Dinesh-practice grounding: the shipped closed-enum router with forced tool choice (his live voice portfolio agent), the honest-fallback / guide split, the truthful mic + status state machine, the Echo Show honest-shopkeeper safety gate and runner-up rule.

## Boundaries

- **`write-ai-evals`** owns failure MEASUREMENT (golden sets, rubrics, LLM-as-judge) and pre-design model capability assessment. This skill owns user-facing failure UX. Hand it the failure census; it proves each row behaves.
- **`design-output-contracts`** owns the structural mechanics (closed-enum routing, forced tool calls, verified-store hydration, no-prose schemas). This skill decides which failures must be prevented structurally and designs what users see.
- **`design-voice-interactions`** owns in-conversation turn mechanics (barge-in, interim ink, echo guards, repair). This skill owns voice death states: mic denied, engine failure, timeouts, TTS fallback chains.
- **`craft-critique`** owns the evidence-discipline protocol — every claim in trust copy is handled per it.
- **`design-taste`** owns all taste values; failure states are designed surfaces and load it first.
