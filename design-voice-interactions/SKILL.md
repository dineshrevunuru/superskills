---
name: design-voice-interactions
description: "Designs and builds voice interfaces the way Dinesh ships them: barge-in with duck-and-resume, turn-taking, live interim transcript ink, push-to-talk, VAD noise hygiene, echo guards, mic consent lifecycle, truthful mic status, and voice error repair — governed by the voice-first law (voice drives, screen follows; type is an equal fallback). Use when adding voice to anything — 'add voice input', 'voice assistant', 'talk to the app', 'wire up the mic', 'STT/TTS', 'push-to-talk', 'it talks over the user', 'barge-in doesn't work', 'the mic status is wrong', smart-display / Echo Show experiences, or reviewing any speech UI."
---

# Design Voice Interactions

Voice UX from Dinesh's shipped practice — his live voice-first portfolio agent (Boo) and the Echo Show conversational-commerce prototype (Saathi). Every rule here was tuned against real microphones, real accents, and real interruptions.

## When to use / when NOT to use

**Use when:** designing or building anything with a microphone or a speaking agent — voice input, spoken narration, a voice assistant, a smart-display experience, push-to-talk, live captions, or diagnosing voice bugs ("it ignores me mid-sentence", "it heard its own voice", "status says Listening but the mic is off").

**NOT this skill:**
- What the agent *says* (dialog design, prompts-per-turn, persona, question wording) → `design-conversational-interfaces`.
- The screen layout the voice drives (anti-chat stage, no scrollback, chat↔GUI switch) → `design-stage-interfaces`.
- What the *model* is allowed to output (closed-enum routing, forced tool calls, no-prose guarantee) → `design-output-contracts`.
- AI failure UX beyond voice repair (uncertainty display, hallucination mitigations, provenance) → `design-ai-trust-and-failure-states`.
- Visual/motion/taste decisions → load `design-taste` first. Claims about users/markets follow `craft-critique`'s evidence protocol.

## The voice-first law (governs everything below)

**Voice drives; the screen follows.** Voice is the only input a user *must* use. The screen exists to carry cognitive load off the user — never as a control panel they must operate.

The five rules — enforce on every screen:
1. **Zero-click entry** — listening on arrival (one-time mic grant, then never again). No "click to begin."
2. **Everything is voice-reachable** — every tap target has a spoken equivalent. Nothing is tap-only.
3. **The screen never demands input** — no forms, no required clicks to proceed. Content composes on its own.
4. **Barge-in always on** — the user can speak at any instant and the system yields mid-sentence.
5. **Type + tap are accelerators, never requirements** — they feed the *same* intent engine.

**The honest boundary: voice-first ≠ voice-only.** A visitor in an open-plan office won't speak to a webpage. Type (⌘K palette or equivalent) is a **first-class, equal-capability fallback** into the identical pipeline — not a lesser mode. Mic denial must never be a dead end.

**The modality split (why a screen at all):** speech is transient — a user can't re-hear a number. So:
- **Voice carries:** greeting, one question at a time, the recommendation + its plain reason, confirmation.
- **Screen carries:** the one dominant element, persistent data (prices, metrics), proof the user will want to re-check.
- **Never read aloud what the screen already shows.** Every voice action has a screen twin; not every screen element needs a voice twin.
- Every visual element passes one test: *does it reduce load or add it?* If it adds, cut it.

## The method — build order

Voice systems fail at the seams, so build the seams first:

1. **Write the turn contract** before any UI: who may speak when, what interrupts what, what resumes. (Sections below are that contract — reuse it.)
2. **Pick the ear (STT)** — and keep it swappable behind a dispatcher function. A/B recognizers **on the real user's accent and device** before trusting one; a browser recognizer that nails a demo can mis-hear the actual speaker (his native Web Speech test mis-heard "capable" as "capital"; the ElevenLabs Scribe ear won the A/B and became the default). Never trust a recognizer that reports success without producing results (Safari does exactly this) — detect with a watchdog and auto-fall back to the other ear.
3. **Pick the mouth (TTS) on latency first.** Latency is a dealbreaker for a voice interface — he rejected a better-sounding TTS model purely because it was slower. Rule: fastest acceptable voice > best voice. Pre-generate fixed narration at build time when the script is known (studio quality, zero runtime cost).
4. **Wire barge-in + duck-and-resume** (below) before polishing anything visual.
5. **Add noise hygiene + echo guards** — untuned, the agent interrupts itself for every cough and answers its own speech.
6. **Design the consent lifecycle and truthful status** — the states nobody demos but every user hits.
7. **Design error repair last but always** — guide vs fallback are different states (below).
8. **Timeouts with honest status:** every network hop gets a budget (his shipped values: intent route ~4s, TTS ~6.5s) and a visible "taking longer" status past it — never a silent hang, never a fake "Listening."

## The turn-taking engine: barge-in, duck, resume

The core loop, exactly as shipped:

```
Agent speaking
  └─ voice onset detected (VAD or push-to-talk key)
       → DUCK: pause agent audio mid-word, instantly
         (do not wait for the transcript — duck on onset)
       ├─ transcript = real utterance  → agent yields; utterance
       │    enters the intent pipeline; agent's next turn replaces
       │    the interrupted one (never "resume then answer")
       ├─ transcript = blip / noise / echo → RESUME: agent continues
       │    from the exact word it paused on — not from the top
       └─ nothing arrives → stuck-duck watchdog (~1.5s) resumes
```

Rules:
- **Duck on onset, decide on transcript.** Instant duck makes the system feel alive; the transcript then decides yield vs resume. Waiting for the transcript before ducking reads as "it talks over me."
- **Resume means exact position.** Restarting a sentence from the top after a false alarm reads as broken. Pause the audio element; resume it.
- **The agent's speak function gates on the ducked flag** — while the user holds the floor, the next agent beat waits. No queue-jumping.
- **One-slot queue:** if the user fires two intents fast, keep only the latest. Voice users correct themselves; honoring the stale intent is a bug.
- **One question per turn (agent side):** never ask two things in one prompt; never tell the user what to say. Turn-taking dies when the agent stacks questions.
- **Keep the recognizer alive through agent narration.** Barge-in that only works while the agent is silent is not barge-in.
- Give the user redundant interrupt paths: voice onset, tap-the-stage, Escape. All roads duck.

## The ear: interim ink + push-to-talk

**Live interim ink** — show the user their words *while they speak*, not after:
- Record in small timeslices (shipped: ~400ms chunks) and post the audio-so-far to STT on a cadence (~1.1s); render each interim transcript as light "ink" on screen while the user is still talking.
- **The final pass is authoritative** — it replaces all interims.
- **Generation-counter every utterance:** stale interim results from a previous utterance must be dropped, or old words flash over new speech.
- Why it matters: interim ink is the user's only proof they're being heard AND their only chance to catch a mis-hear before the system acts on it. It is the voice equivalent of a focused text field.

**Push-to-talk — always offer it alongside open-mic:**
- Hold a key (his: Space, suppressed inside text inputs) → record indefinitely — holding the key **disables silence auto-stop**, because thinking pauses mid-sentence are normal; release → send.
- Show the hint near the mic status ("Space — hold to talk"); hide it on touch devices (no keyboard).
- Push-to-talk is the noisy-room and privacy answer; open-mic is the hands-free answer. Neither replaces the other.
- Open-mic end-of-utterance: a quiet window (~900ms shipped) closes the turn. Tune on real speech, not demo speech — elderly and second-language speakers pause longer; widen it for them.

## Noise hygiene + echo guards

Untuned voice UIs fail two ways: they hear the room, and they hear themselves.

**VAD noise hygiene:**
- **Onset requires sustained energy** — shipped rule: 2 consecutive hot VAD ticks (~260ms sustained) before an utterance opens. Single-tick triggers make every click, cough, and thud duck the agent.
- **Words only from the STT** — tell the recognizer not to tag audio events (his STT sends `tag_audio_events=false`), and strip any residual `(...)`/`[...]` annotations client-side. "(coughing)" must never appear in the ink or reach the router.
- **Noise-only transcripts take the blip path:** empty or annotation-only results resume the agent silently. No error message for a cough.

**Echo guards (the agent hearing itself):**
- Use echo-cancelled mic capture (`getUserMedia` with echo cancellation) as the floor, not the fix.
- **Overlap filter:** drop any transcript that overlaps ≥70% with the line the agent is currently speaking — that's the agent's own voice coming back.
- **Blip filter:** drop transcripts under 2 words that arrive during agent speech unless push-to-talk was held (a deliberate "stop" is usually accompanied by the key or a tap).
- Test with speakers on, not headphones. Headphone demos hide every echo bug.

## Mic consent lifecycle

Consent is a designed flow, not a browser popup you hope goes well.

| State | Behavior |
|---|---|
| Not yet asked | A designed, flat-factual ask in product voice ("Boo listens, if you want…") — never a dark pattern, never begging. **Ask at most twice**; the ask re-arms only after the user interrupts/engages again. |
| Granted | One-time grant, then never re-ask. Grant mid-session → the agent acknowledges and invites speech ("There you are. Just talk."). Watch `navigator.permissions` `onchange` to catch a grant made in browser settings. |
| Denied | A recovery card: honest copy, the browser-specific path to re-enable (point at the padlock), and the type path front-and-center. Denial is a fork to an equal mode, not a wall. |
| Blocked by platform | Some browsers (Safari) gate or silently break mic/recognition: let the **native prompt be the ask** there (skip the designed card), re-ask per visit if that's the platform norm, and write platform-aware recovery copy ("Reload and choose Allow — or just type"). |
| Sound blocked (autoplay) | Separate state from mic denial — a small hint to tap once for sound; never conflate with mic consent. |

## Truthful status — the state machine

The status line and mic indicator are a **contract with the user's trust**. One false "Listening" and every other claim on the surface is suspect.

- **Never claim "Listening" without a live mic.** No mic → status reads "Mic off." — never blank, never optimistic.
- **One coherent state machine with a priority order** (his shipped order): `muted > thinking > composing/speaking > idle`. Conflicting states never stack (e.g., blocked + muted must not render together — suppress the lower one).
- **"Speaking" holds through inter-beat gaps** in multi-part narration; "Composing" appears only before a flow's *first* word. A status that flickers Composing↔Speaking between sentences reads as broken.
- **Mute must be honest:** the mute control actually pauses the agent's audio — not just the icon. Pause also stops mic tracks if it claims the mic is paused.
- **Tap semantics follow state:** idle with no mic → the mic control re-asks for the mic (it never "pauses" a nonexistent mic); the accessible label tracks the action ("Enable the mic" / "Pause voice" / "Resume voice").
- **Blocked/denied renders a distinct glyph** (struck-through mic), not the normal idle look.
- **Two visual channels, never one:** the agent's output (waveform/aurora reacting to *its* audio) and the user's input (mic meter reacting to *their* voice) are separate channels driven by real analyser data — a shared or synthetic visualization lies about who is talking.

## Error repair: four different failures, four different states

Do not collapse these into one "Sorry, I didn't understand." Each gets its own path:

| Failure | Signal | Repair |
|---|---|---|
| **Blip** (cough, thud, echo) | Empty/noise-only/overlap-filtered transcript | Silent: resume the agent exactly where it paused. Zero UI. |
| **Mis-hear** | Interim ink shows wrong words; user re-speaks | The ink already exposed it; accept the re-say. Never act on a low-confidence transcript without showing what was heard. |
| **Willing but lost** ("what do you mean", "say that again", "what can I ask") | Confusion/meta intent | A **guide** state: warm re-orientation offering the few real doors. This user wants to engage — treat confusion as navigation, not error. |
| **Off-catalog / off-limits / gibberish** | No matching intent, or a topic the product must not answer | The **honest fallback**: a designed refusal in product voice + redirect chips to real content. Never bluff, never free-prose. (The routing guarantee itself → `design-output-contracts`.) |

Also handle the infrastructure failures honestly:
- **Dead mic / lying recognizer:** a start watchdog (~3s) that expects audio or results; on failure, switch ears or drop to truthful "Mic off." + type path.
- **Slow network:** budget each hop; past budget show "taking longer…"; on timeout land in a designed state, never a spinner forever.
- **Keep the room alive through every failure** — ambient motion/status continue so the page never reads as crashed.

## Worked example — 20 seconds of a real session

Agent is mid-sentence narrating a case study. Speakers on, no headphones.

1. `0.0s` — Agent speaking; status "Speaking"; recognizer alive; agent waveform moving, user mic meter near-flat.
2. `2.1s` — User's chair thuds. VAD sees 1 hot tick, then quiet → below the 2-tick onset bar → **nothing happens**. Agent never flinches.
3. `5.4s` — User starts: "wait, how much did—". Two consecutive hot ticks (~260ms) → **duck**: agent audio pauses mid-word within a frame; user mic meter jumps.
4. `5.9s` — First interim ink renders: *"wait how much"* — user sees they're heard, keeps talking.
5. `7.2s` — User trails off; ~900ms of quiet closes the utterance; final transcript replaces interims: "wait, how much did that cost".
6. `7.3s` — Real utterance → agent **yields** (no resume): intent routes, the answer becomes the agent's next turn. Status: "Thinking" → "Speaking".
7. `11.0s` — Mid-answer, the agent's own voice leaks back through the mic. Transcript arrives: "how much that cost per month" — 78% overlap with the line being spoken → **echo guard drops it**. No duck.
8. `14.5s` — User coughs. Onset opens (sustained), agent ducks… transcript comes back noise-only → **blip path**: agent resumes from the exact word it paused on. User never sees an error.
9. `18.0s` — User holds Space and dictates a long, pausing question. Silence auto-stop is suppressed while held; release sends; the ink was live the whole time.

Every beat above is a rule from this file. If your build can't reproduce this timeline, the missing rule is the bug.

## Ship checklist

- [ ] Voice-first law: zero-click entry, everything voice-reachable, screen never demands input, barge-in always on, type is equal
- [ ] Type/tap fallback reaches every capability voice reaches (same engine)
- [ ] Duck on onset < 100ms; resume is exact-position; stuck-duck watchdog exists
- [ ] VAD onset requires sustained energy; cough/click cannot open an utterance
- [ ] Echo test passed with speakers on (overlap + blip filters live)
- [ ] Interim ink renders while speaking; final pass authoritative; stale interims dropped
- [ ] Push-to-talk works, suppresses auto-stop while held, hint hidden on touch
- [ ] STT ear A/B'd on the real user's accent; dispatcher makes ears swappable; lying-recognizer watchdog + auto-fallback
- [ ] TTS chosen on latency; fixed narration pre-generated where possible
- [ ] Consent: designed ask (max 2), denied-recovery card, mid-session grant greeted, platform-gated browsers use the native prompt
- [ ] Status never lies: no "Listening" without a mic; states never stack; mute actually mutes
- [ ] Agent and user have separate, real-data visual channels
- [ ] Blip / mis-hear / guide / fallback are four distinct states
- [ ] Network budgets + "taking longer" status on every hop
- [ ] Accessibility: labels track state and action; reduced-motion honored (per `design-taste`); captions/ink give a non-audio path

## Anti-patterns

| Don't | Do |
|---|---|
| "Click the mic to talk" gate on arrival | Listening on arrival after a one-time grant; the only ask is to talk |
| Wait for a transcript before interrupting the agent | Duck on voice onset; let the transcript decide yield vs resume |
| Restart the sentence after a false-alarm duck | Resume from the exact paused word |
| One "Sorry, I didn't get that" for every failure | Blip = silent resume · mis-hear = re-say via ink · lost = guide · off-limits = honest fallback |
| Status says "Listening" while the mic is denied/dead | Truthful "Mic off." + recovery path |
| Mute button that only changes the icon | Mute pauses the actual audio (and mic tracks if claimed) |
| Single-tick VAD that ducks on every thud | Sustained-onset bar (~2 ticks / ~260ms) |
| Trusting one recognizer because the demo worked | A/B ears on the real accent; watchdog + automatic ear fallback |
| Reading the screen's content aloud | Voice says the reason; screen holds the data; never both |
| Prettiest TTS voice regardless of delay | Fastest acceptable voice; latency is the dealbreaker |
| Voice-only bravado (no type path) | ⌘K-style type fallback, first-class, same engine |
| One shared blob visualizing "audio" | Agent channel and user channel, separately, from real analyser data |
| "(coughing)" rendered into the transcript | Words-only STT + client-side tag stripping; noise takes the blip path |

## Boundaries

- `design-conversational-interfaces` — owns dialog content and behavior once IN conversation (what to ask, persona, wording). This skill owns the audio turn mechanics around it.
- `design-stage-interfaces` — owns the conversation-vs-GUI decision and the non-chat stage the voice drives.
- `design-output-contracts` — owns the model-output guarantee (closed-enum routing, forced tool calls). This skill only requires that a fallback/guide state *exists*.
- `design-ai-trust-and-failure-states` — owns AI failure UX broadly; this skill owns voice-channel repair (blips, mis-hears, mic/status truth).
- `design-taste` — single source of all visual/motion values used by any voice surface.
- `craft-critique` — evidence protocol for any claim about users or platforms.

## Sources

Practice-grounded, not NN/g — every rule was tuned against real microphones, accents, and interruptions on shipped work:
- **Boo** — Dinesh's live voice-first portfolio agent: source of the barge-in duck-and-resume loop, live interim ink, Space push-to-talk, the ElevenLabs Scribe ear A/B'd against Web Speech (the "capable" mis-hear that flipped the default), words-only STT (`tag_audio_events=false` + client-side tag stripping), the consent lifecycle, and the truthful status/orb state machine.
- **Saathi** — the Echo Show conversational-commerce prototype: source of the smart-display turn engine, echo/noise hygiene under open-room conditions, and the per-hop network budgets.
