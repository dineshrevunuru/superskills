---
name: design-conversational-interfaces
description: "Design the behavior of an AI conversation once a conversation is the chosen interface — chatbots, guided-selling agents, support bots, voice-assistant dialogues, AI companions. Covers intent catalogs, turn design, question strategy, recommendation patterns, repair (guide vs fallback), refusal and safety gates, suggestion chips/prompt controls, and memory/proactivity dosing. Fuses NN/g chatbot research with Dinesh's shipped conversational products (the live Tara salon chatbot, the Boo portfolio agent, the Echo Show honest-shopkeeper). Use when asked to 'design a chatbot', 'write the conversation flow', 'script the bot', 'design the dialogue', 'what should the assistant say / ask', 'add an AI assistant to the site', or when reviewing a conversational agent's UX. NOT for deciding whether to use chat at all (design-stage-interfaces) or for voice mechanics like barge-in (design-voice-interactions)."
---

# Design Conversational Interfaces

Turn "add a chatbot" into a specified, honest, testable conversation: a closed intent catalog, a disciplined turn spine, designed repair, and refusals that build trust instead of breaking character.

## When to use / when NOT to use

**Use when:** designing or reviewing any dialogue a user has with an AI agent — what it says first, what it asks, how it recommends, how it recovers, what it refuses. Text or voice, one-shot or persistent companion.

**Do NOT use for:**
- Deciding whether conversation is the right interface at all, or designing the switch between chat and GUI → `design-stage-interfaces` owns that call. This skill assumes conversation already won.
- Barge-in, turn-taking timing, interim transcription, duck-and-resume, mishear recovery → `design-voice-interactions`.
- The enforcement machinery (closed-enum routing, forced tool calls, schema-constrained output) → `design-output-contracts`. This skill decides WHAT the intents and fallbacks are; that one guarantees no input escapes them.
- Uncertainty display, provenance UI, hallucination-mitigation affordances → `design-ai-trust-and-failure-states`.

Load `design-taste` before designing any visual surface the conversation renders onto. Claims made inside the conversation (about products, results, sources) are handled per `craft-critique`'s evidence protocol.

## The method

### 1. Scope the closed world

Write three lists before any dialogue:
- **The job** — one sentence: who talks to this bot and what they leave with.
- **The capability list** — the finite set of things it can actually do (its content intents). If you can't enumerate them, the bot isn't ready to design.
- **The off-limits list** — topics it must never answer (in his shipped work: salary, visa specifics, medical advice, projects that don't exist, skills not shipped). These route to a designed refusal, never to a best-effort answer.

**Rule: the residual branch is a first-class flow.** "Utterance matched nothing" is not an error state — it is a designed intent with its own script and its own UI. Every input lands somewhere intentional.

### 2. Split GUIDE from FALLBACK (the two kinds of miss)

His shipped router keeps these as separate intents, and collapsing them is a real failure he fixed:

| Miss type | Signal | Response register |
|---|---|---|
| **Guide** — willing but lost | "what do you mean", "say that again", "I'm confused", "what can I ask" | Warm re-orientation: restate what the bot can do + 3–4 real doors. Never treated as failure. |
| **Fallback** — off-catalog / off-limits / gibberish | Topics outside the capability list, banned topics, noise | Honest decline, zero bluffing ("That one's not wired up — I'd rather show you than bluff"), then the closest real doors. |

A confused user sent to the refusal flow feels rejected; an off-limits ask sent to the guide flow gets strung along. Keep both intents in the catalog with distinct scripts.

### 3. Set the five dimensions deliberately

NN/g's 5 dimensions of site-specific AI chatbots. Fill this table for your bot — every cell is a decision, not a default:

| Dimension | The question to answer | Example (his Echo Show shopkeeper) |
|---|---|---|
| Handoff willingness | When does it route to a human, and how eagerly? | Eagerly: any medicine/symptom ask defers to a chemist or doctor; repeated confusion offers "shall I ask your son to help?" |
| Flexibility | Free-form or guided? How far off-script can users go? | Guided selling: one open first turn, then closed follow-ups; a critique loop absorbs detours without restarting |
| Proactivity | Does it speak first, suggest, follow up? | Greets + one suggestion; a declined proactive prompt is never repeated the same day |
| Emotional responsiveness | Does it acknowledge feelings, and how far? | Acknowledges, never diagnoses — warmth in register, no therapeutic claims |
| Transparency | Does it disclose AI-ness, sources, limits? | Discloses what it is, attributes every claim ("the brand says…"), names plainly what it can't do |

### 4. Know which conversations users will bring

NN/g's six conversation types with generative AI: **search queries** (one-shot fact ask) · **funneling** (broad → narrow toward one choice) · **exploring** (open-ended learning) · **chiseling** (iteratively trimming/refining an output) · **expanding** (asking for more, variations, breadth) · **pinpointing** (hunting one precise detail). Identify the top two your users will bring and design the spine for those. A guided-selling bot is a funneling machine; a docs bot is search + pinpointing. Designing for the wrong type produces the classic mismatch: a funneling user trapped in an exploring bot's essay answers.

### 5. Design the turn spine

The five-phase spine from his shipped guided-selling work:

1. **Open** — ONE open question that discloses capability and accepts either a problem or a direct ask ("Tell me what you're looking for, or what's troubling you"). Never a bare "How can I help?" — the blank input is the articulation barrier in miniature.
2. **Converge** — 1–3 **closed** follow-ups, each gated on the previous answer. Ask only what changes the recommendation. Never a form, never two questions in one turn.
3. **Deliver** — ONE confident pick, a plain reason tied to the user's own words, and the **runner-up named** as a calibrating tradeoff. Never bare confidence, never a ranked list of ten.
4. **Critique loop** — "cheaper", "no fragrance", "for my mother" → **re-rank within kept context, never restart.** Enumerate the critique vocabulary your domain will produce and handle each.
5. **Close** — a concrete next step plus doors. No turn ever dead-ends; the conversation always offers somewhere to go.

**Honesty moves that build trust structurally** (not as a label):
- Every reason ties to a user-stated need or a real, attributed source — no generic praise.
- Talking the user OUT of the bigger option when the cheaper one fits is the single strongest trust move in his shipped practice.
- Off-catalog → "I don't carry that," never a bluff. The refusal proves the discipline.
- Mirror the user's language and register.

### 6. Route every utterance through the repair tree

```
Utterance arrives
├─ Safety trigger? (domain red-flag lexicon: symptoms, money movement,
│  self-harm, legal jeopardy — checked BEFORE any answering logic)
│    → Pre-authored deferral, spoken verbatim + human route. Model never improvises here.
├─ Matches a content intent above confidence threshold?
│    → Serve that flow. End with doors.
├─ Willing-but-lost signal?
│    → GUIDE: warm re-orientation + real doors.
└─ Anything else (off-catalog, off-limits, gibberish)
     → FALLBACK: honest decline + closest real doors.
```

The safety gate runs first and is deterministic — a symptom keyword must never reach the recommender. Enforcement mechanics live in `design-output-contracts`; the deferral *dialogue* ("For that I won't guess — please see a chemist or doctor") is authored here, once, verbatim.

### 7. Design the input surface

- **Chips are a promise.** Every suggestion chip must map to a real catalog intent — a chip the bot can't honor is a scripted lie. Chips double as capability disclosure: they teach what to say.
- **Prompt controls** (NN/g): UI around the input that suggests what's possible, accelerates common asks, and refines the last answer without retyping. Post-answer "doors" (next-step chips) are the highest-value control — mark at most ONE as recommended.
- **Typed input is a first-class equal** to voice or chips — same intents, same engine, never a lesser mode (a user in an open-plan office won't talk to a screen).
- **Design for extraction.** NN/g's observed behaviors — accordion editing (iteratively expanding/trimming outputs) and apple picking (harvesting fragments into the user's own work) — mean answers should be chunked, copyable, and refinable in place.
- **Multimodal split** (voice + screen): voice carries guidance — the question, the pick, the reason; the screen carries proof — price, reviews, fit evidence. **Never read aloud what the screen already shows.** Every voice action has a screen twin; not every screen element needs a voice twin.

### 8. Dose memory and proactivity (persistent bots only)

From his companion build, calibrated against documented elder-companion failures (over-proactivity, wrong confident closes):

- At most **ONE** memory-initiated follow-up per session, early, phrased as a **question, never an assertion** — "How's the knee today?" not "Your knee was hurting."
- **Never enumerate** what the bot remembers. Recall is shown by asking well, not by listing.
- 1–2 memory-initiated turns per session, maximum.
- Proactive turns are **brief, warm, declinable** — never guilt, and a declined prompt is not repeated the same day.
- Never declare a user's concern resolved unless *they* said so in their own words. The bot inferring "glad you're better!" is the documented companion failure.
- Memory writes go through one verified path — never let the live model freely write standing memory (prompt-injection surface; mechanics in `design-output-contracts`).

### 9. Spec it, then hand off measurement

Produce the Conversation Spec (Output format below). Build the golden utterance set — 10–30 utterances including adversarial and off-limits asks — and hand it to `write-ai-evals` for measurement.

## Turn-design lint (run on every draft script)

- [ ] Opening discloses 3–4 real capabilities — not "How can I help you today?"
- [ ] Bot identifies as AI; never simulates a human
- [ ] One question per turn, everywhere — never two asks in one prompt
- [ ] Follow-ups gated on the previous answer, not a fixed slot list
- [ ] Every recommendation = one pick + named runner-up + reason in the user's own words
- [ ] Every claim attributed to a source ("the brand says…", "reviewers with dry skin said…")
- [ ] Critique vocabulary enumerated and handled as re-rank, not restart
- [ ] Guide and fallback are separate intents with distinct scripts
- [ ] Safety/refusal lines pre-authored verbatim; the model never improvises them
- [ ] Every turn ends with doors — zero dead ends, including refusals
- [ ] Chips map 1:1 to real intents; at most one marked recommended
- [ ] Voice never reads what the screen shows; every voice action has a screen twin
- [ ] Persistent-bot memory passes the dosing rules (step 8)
- [ ] Transcript claims pass `craft-critique`'s evidence protocol

## Worked example — guided-selling flow (Echo Show shopkeeper pattern)

Intent catalog (excerpt — closed set; every row is a designed flow):

| Intent | Trigger shapes | Flow | Ends with |
|---|---|---|---|
| discover | problem statements ("something for dry skin") or product names | open q → ≤3 gated follow-ups → recommend | doors: compare · save · "anything else?" |
| compare | "which is better", ordinals ("the second one") | side-by-side, deciding tradeoff spoken | doors: pick one · re-rank |
| critique | "cheaper", "no fragrance", "for my mother" | re-rank kept context | doors: new pick · runner-up |
| safety | symptom/medicine language (runs FIRST) | verbatim deferral → chemist/doctor | door: save current item · human |
| guide | "what do you mean", "what can I ask" | warm re-orientation | 3 capability doors |
| fallback | off-catalog, gibberish | honest "I don't carry that" | closest real doors |

Turn script with design notes:

```
BOT   "Tell me what you're looking for, or what's troubling you."
       ← ONE open question; accepts a problem OR a product name
USER  "My skin gets very dry in winter."
BOT   "Is it dry all over, or mostly your face?"
       ← ONE closed follow-up, gated on her answer — never a form
USER  "Mostly the face."
BOT   "Then I'd pick the ceramide cream — it's made for dry facial
       skin and it's unscented. The herbal one is ₹300 less and fine
       for everyday dryness; for winter-dry skin the first is worth it."
       ← ONE pick + named runner-up + reason in HER words
       [screen: hero card · price · 2–3 real review lines ·
        fit chips "because you said: dry · face · winter"]
       ← voice guides, screen proves; nothing read twice
USER  "Something cheaper?"
BOT   "Then the herbal one — same fit, lighter texture, ₹300 less."
       ← critique loop: re-rank, context kept, no restart
USER  "And something for my knee pain?"
BOT   "For that I won't guess — please see a chemist or doctor.
       Want me to keep the cream saved meanwhile?"
       ← safety gate fired BEFORE the recommender; deferral is
         pre-authored verbatim; still ends with a door
```

## Anti-patterns

| Don't | Do |
|---|---|
| "How can I help you today?" blank opener | Disclose 3–4 real capabilities; chips that teach what to say |
| Two questions in one turn | One question; the next is gated on the answer |
| Slot-filling interrogation (a form in disguise) | Ask only what changes the answer; ≤3 follow-ups |
| Restart on critique ("let's start over") | Re-rank within kept context |
| "Sorry, I didn't understand that." | Designed guide/fallback flows with real doors |
| One bucket for every miss | Split guide (willing-but-lost) from fallback (off-limits) |
| Bare confident recommendation | Pick + named runner-up + reason in the user's words |
| Generic praise ("a great choice!") | Every reason tied to a stated need or attributed source |
| Reading the screen aloud | Voice guides, screen proves — no double delivery |
| Memory show-off ("I remember you said…" lists) | One gentle follow-up question, early |
| Always selling the maximum | Talk the user out of over-buying when the smaller fit works — the trust move |
| Model-authored refusals and safety lines | Pre-authored verbatim lines (see `design-output-contracts`) |
| Human masquerade | Disclose AI-ness at the start |
| A dead-end refusal | Every refusal ends with the closest real doors |

## Output format

```markdown
# Conversation Spec: [bot name]

## Job & scope
[One-sentence job] · capability list · off-limits list

## Dimension settings
[5 rows: handoff / flexibility / proactivity / emotional / transparency — setting + why]

## Intent catalog
| intent | trigger shapes | flow | ends with (doors) |
[content intents + guide + fallback + safety rows — the set is closed]

## Turn spine
Opening line (verbatim) · converge rules · deliver pattern ·
critique vocabulary · close

## Repair table
| miss type | detection | response (verbatim where safety-critical) |

## Input surface
Chips at rest / doors after each flow · typed parity · recommended-chip rule

## Memory & proactivity dosing   (persistent bots only)

## Golden set
10–30 utterances incl. adversarial + off-limits → hand to write-ai-evals
```

## Sources

NN/g (frameworks used above):
- Designing site-specific AI chatbots (10 guidelines): https://www.nngroup.com/articles/ai-chatbots-design-guidelines/
- The 5 dimensions of site-specific AI chatbots: https://www.nngroup.com/articles/dimensions-of-ai-chatbots/
- Prompt controls in GenAI chatbots: https://www.nngroup.com/articles/prompt-controls-genai/
- The 6 types of conversations with generative AI: https://www.nngroup.com/articles/AI-conversation-types/
- Accordion editing and apple picking (observed GenAI behaviors): https://www.nngroup.com/articles/accordion-editing-apple-picking/

Practice grounding — Dinesh's shipped conversational products: Tara (the live salon concierge chatbot), Boo (his voice-first portfolio agent — closed-intent catalog, guide/fallback split, honest-fallback flow), and the Echo Show honest-shopkeeper prototype for first-time internet users (guided selling, safety deferral, memory dosing).

## Boundaries

- `design-stage-interfaces` owns the conversation-vs-GUI decision and the switch between them; this skill owns behavior once IN conversation.
- `design-voice-interactions` owns barge-in, turn-taking timing, interim transcription, duck-and-resume, and mishear repair mechanics — this skill owns what the agent says; that one owns how audio turns are taken.
- `design-output-contracts` owns enforcement: closed-enum routing, forced tool calls, schema-constrained output. This skill defines the intent catalog and fallback content that contract enforces.
- `design-ai-trust-and-failure-states` owns user-facing trust/failure UI (uncertainty display, provenance, verification affordances); this skill owns the refusal and repair *dialogue*.
- `write-ai-evals` owns measuring the conversation (golden sets, rubrics).
- `write-ux-microcopy` polishes final strings; `craft-critique` is the single source of the evidence protocol; `design-taste` is the single source of all visual/motion values.
