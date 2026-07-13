---
name: build-coded-prototypes
description: "Builds working coded prototypes at exactly the fidelity the current design question needs — from a single zero-dependency HTML file to a live-model-wired voice demo. Use when asked to 'prototype this', 'build a quick demo', 'make it clickable', 'make it actually work', 'fake the AI for now', 'wire up the real API', 'test this concept before we build it', or when deciding how real a prototype must be before a usability test or stakeholder review. Covers per-dimension (Goldilocks) fidelity, zero-dep vs framework choice, real data and live model APIs, Wizard-of-Oz for AI/voice concepts, parallel-then-iterative sequencing, and honest prototype-vs-production labeling."
---

# Build Coded Prototypes

Build the cheapest working artifact that answers the current design question truthfully — and never let it claim to be more real than it is.

## When to use / when NOT to use

**Use when:** turning a concept into something operable; deciding how "real" a demo must be; wiring a live model or real data into a test artifact; simulating AI/voice behavior before the system exists; building 2–3 directions to compare.

**NOT this skill:**
- Production-grade interface builds → `build-frontend-interfaces` (this skill's output may seed that one, but the bar is different).
- Generating the concepts themselves before any build → `explore-divergent-concepts`. This skill starts once there is something to build.
- Designing the model's output contract (closed-enum routing, forced tool calls) → `design-output-contracts`. This skill *wires in* that contract.
- Measuring an AI prototype's quality → `write-ai-evals`.
- Mechanical pre-ship QA → `verify-ui-quality`. Judgment/verdict → `craft-critique`.

**Load `design-taste` first** for anything a human will see. Claims in or about the prototype are handled per `craft-critique`'s evidence protocol.

## Step 0 — Write the question before writing code

NN/g's Goldilocks principle: a prototype carries *just enough* fidelity to answer the current question — no more. Before any code:

1. Write ONE sentence: "This prototype exists to answer: ___."
2. Write how you'll know it answered it (who looks at it, what they do, what decision follows).
3. If you cannot write the question, you are decorating, not prototyping. Stop and get the question.

Examples of real questions: "Does voice-paced content feel like momentum or like being held hostage?" · "Will an elderly first-timer trust a spoken recommendation with proof on screen?" · "Is the model's routing fast enough to feel conversational?"

**First fork — screen question or logic question?** The dials and vehicles below assume the answer is a *screen*. If the real question is about **state, transitions, or data shape** ("does this reducer survive X-then-Y", "can this model even represent that case", "what should the API surface be"), a pretty screen hides the answer. Skip ahead to **Mode: Logic prototype** and drive it in a terminal. Everything under "The method" is the screen path.

## The method

### 1. Set fidelity per dimension, not as one dial

Fidelity is five independent dials (NN/g: hi-fi and lo-fi can be mixed per dimension). Fill this table before building:

| Dimension | Low | High | Go HIGH only when the question is about… |
|---|---|---|---|
| **Visual** | grey boxes, system font | real tokens, real motion | register, taste, brand, "does it feel premium" |
| **Content** | placeholder text | real verified copy + numbers | comprehension, trust, information scent |
| **Interaction** | click-through stills | working states, real input, real timing | flow, error paths, pacing, any voice question |
| **Data** | hardcoded array | live source / real catalog shape | data-shaped layouts, faithfulness, edge-case volume |
| **Intelligence** | scripted / Wizard-of-Oz | live model call | latency, phrasing variance, model failure modes, cost |

Rules:
- Raise a dial only if the question needs it. Every unneeded high dial is time burned and a new way to break.
- **Voice and AI concepts invert the usual order:** interaction fidelity goes HIGH first (timing, barge-in, turn-taking ARE the design — stills cannot answer them); visual can stay low for a long time.
- **Real content beats placeholder as early as possible.** Placeholder numbers hide layout failures and invite fabrication. If the real number isn't verified yet, use an obviously-fake value (`₹——`, `XX%`), never a plausible invented one.
- Cost-of-change check: the dial that is expensive to change later (information architecture, interaction model) deserves prototype cycles; the dial that is cheap to change later (colors, copy polish) does not.

### 2. Pick the vehicle: zero-dep vs framework

```
Is the question answerable in one screen/flow, lifespan weeks not months?
├─ YES → ONE self-contained HTML file (inline CSS/JS, no build step, no npm).
│        Open it in a browser. Done. This answers most prototype questions.
│
├─ Needs a real API key (model, TTS, data)?
│   → Add a ZERO-DEP Node server in front (http module + global fetch,
│     hand-parse .env). Keys live server-side only; .env is gitignored;
│     the client calls /api/*, never the vendor.
│
├─ Is a working engine you already own 60%+ of the answer?
│   → FORK + STRIP the real thing instead of greenfield. (Dinesh's practice:
│     his voice-commerce prototype forked his live voice-portfolio engine as
│     step P0 — reused the STT/TTS endpoints and key handling as-is.)
│
└─ Is the prototype the seed of the product — routing, many components,
   team handoff, real deploy?
   → Framework (his register: Next.js + Framer Motion). Now you are in
     build-frontend-interfaces territory; this skill hands off.
```

Red flags: `npm install` for a question a `<canvas>` tag can answer; a build pipeline for a demo with a two-week life; a framework chosen "so we can reuse it later" with no named later.

### 3. Build the degradation ladder (real data, live APIs)

Every live dependency gets a fallback so the prototype demos anywhere — no wifi, no keys, no vendor uptime.

Pattern (from Dinesh's real router server):
- **Tier 1 — deterministic:** a keyword/rule classifier that works with ZERO keys.
- **Tier 2 — live model:** activates only when the API key is present in env; on any error or low confidence, falls back to Tier 1 with the failure noted in the payload (`via: "keyword-fallback"`).
- **Voice ladder:** vendor TTS → browser TTS → silent text-reveal. Same for STT: vendor ear → browser SpeechRecognition → typed input into the *identical* pipeline.

Non-negotiables when wiring real data or models:
- Keys server-side only (local Node proxy or serverless fn). Never in client JS, never hardcoded, never committed.
- **The model selects IDs; the server supplies values.** For any catalog/data prototype: the model returns product/record IDs only, the server renders every displayed price, name, spec, and rating from the store, and unknown IDs are validated out. A model can *arrange* verified content, never *author* a displayed fact.
- Every branch — including failure — resolves to a designed state, not a raw error string. "Not wired up" is a first-class screen.
- The contract that enforces "model cannot emit prose" is owned by `design-output-contracts`; wire it, don't redesign it here.

### 4. Wizard-of-Oz the intelligence (AI + voice concepts)

NN/g's Wizard of Oz method: a human or script plays the system so users experience the concept before the system exists. It is the canonical cheap path for AI, voice, and chat concepts.

**The single-swap-point law (Dinesh's practice):** build every faked layer behind the *exact* interface the real layer will use, so upgrading is replacing ONE function or variable — never a rewrite.

Real instances from his shipped work:
- `speak()` — browser SpeechSynthesis stands in for studio TTS; production swaps the body of one function, callers untouched.
- `gain` — a synthetic speech envelope drives the voice bars and ambient visuals; production swaps one variable to the real audio `AnalyserNode`.
- Barge-in — timer-fired in the demo, mic-VAD in production; the interrupt flag, the mid-word yield, and the resume logic are the real code from day one.

**Rule: fake the SOURCE, never the BEHAVIOR.** State machines, pacing gates, interruption logic, and error paths must be real; only the signal feeding them is simulated. A video pretending to be barge-in tests nothing; a scripted trigger firing the real interrupt path tests the design.

WoZ vs live-model decision:

```
Question about the EXPERIENCE (flow, pacing, trust, copy, layout)?
├─ YES → Wizard-of-Oz / scripted source. Cheaper, deterministic, testable today.
└─ Question about the MODEL (latency, phrasing variance, misroutes, cost)?
    ├─ YES → wire the live model, cheapest capable tier, behind the server proxy.
    └─ BOTH → stage it: WoZ locks the experience first; then swap the source
              at the single swap point and re-test only what changed.
```

For voice concepts specifically: a WoZ prototype that actually *speaks* (any stock voice) and can be *interrupted* answers more than a pixel-perfect mockup that does neither. Timing is the design.

### 5. Sequence: parallel first, then iterative

NN/g's finding: parallel design followed by iteration beats iteration alone — in their case data, parallel design improved usability ~70% vs ~18% for iteration alone. Quantity of starting points yields quality.

- **Diverge:** build 2–3 cheap prototypes of genuinely different directions on the SAME content spine, so the comparison isolates the direction. (His practice: two visual skins — dark glass vs white airy — playing the identical scripted sequence; three product concepts drafted before one was picked to build.) Which concepts to diverge on comes from `explore-divergent-concepts`.
- **Converge:** pick with explicit criteria — run `craft-critique` on the candidates; the verdict picks. Never drift into iterating whichever file was open.
- **Iterate:** refine only the winner. Small cycles, verify each in the browser before the next.

**Variant hygiene:**
- A new direction is a NEW file; the current best version stays untouched. (His practice: a stripped variant shipped as a new file with the original preserved.)
- Cheap A/B levers are URL params (`?variant=`, `?ear=`, `?debug=1`) that opt IN to the experiment; the default path stays the approved behavior. Leave dormant levers in place — they cost nothing and enable the next test.
- Never edit the estimate of "which is best" into the code silently — record the pick and the reason (a one-line decision note beats archaeology).

### 6. Verify in the real medium

- Drive the prototype in an actual browser with real input — not just screenshots. Headless/hidden tabs throttle timers and freeze CSS transitions; a "broken animation" in a background-tab screenshot is often not a bug. Confirm on a focused window before filing or fixing.
- Feature-detect capabilities (canvas filters, MediaRecorder, SpeechRecognition); never UA-sniff. Vendors lie less than user-agent strings.
- Voice/audio prototypes get a cross-browser reality pass early: autoplay policies, mic-permission flows, and speech APIs differ per browser and will reshape the design (e.g., needing a one-tap start gate).
- The full mechanical pass (click-paths, cross-device, performance) belongs to `verify-ui-quality` — invoke it before anyone external sees the prototype.

### 7. Prototype-vs-production honesty

The demo must never claim to be more real than it is. Run `craft-critique`'s evidence protocol over the prototype itself:

- **Label simulated exchanges.** His live-demo pattern: "a typical exchange, recreated — the deployment is real." The recreation is honest; the claim about the real system is separate and true.
- **Never imply scripted choreography is live AI.** If only one surface is genuinely live, say so and point to it; the contrast *raises* trust.
- **Absence rendered as discipline.** When a number can't be shown (NDA, not yet measured), show the caveat as a first-class element — his enterprise pattern: names and scale, never fabricated metrics. An honest gap on screen beats a plausible invention.
- **Fallbacks tell the truth.** Off-catalog or off-limits input routes to an honest "I don't have that," never a bluffed answer.
- **Write the honesty README** (or handoff note): what is real, what is scripted, what is hardcoded, what breaks, and what the single swap points are. A prototype that demos well is the most dangerous thing to accidentally ship — the README is the guard.

## Mode: Logic prototype — drive the state machine in a terminal, before any pixels

The steps above are the screen path. For questions about **business logic, state transitions, or data shape**, the cheapest truthful artifact is not a screen — it is a tiny interactive terminal app that lets you *press keys and watch state change*. Reach for it when the model looks reasonable on paper but only feels wrong once pushed through real cases: "handles X-then-Y?", "can this shape even represent that?", "what should the API be before I write it?" (For "what should it look like" — wrong mode; use the screen path.)

The point is to expose bugs in the **idea**, not the code. The interesting moments are "wait, that shouldn't be possible" and "huh, I assumed X would be different" — design bugs, caught before a line of UI exists.

### Process

1. **State the question in a top-of-file comment** — the state model and the one question, same discipline as Step 0. A logic prototype that answers the wrong question is pure waste; make it checkable later, whether you're watching now or returning AFK.
2. **Isolate the logic behind a pure interface.** Pick the shape the *question* needs, not the one easiest to wire to a terminal:
   - a **reducer** `(state, action) => state` — discrete events, state is a single value;
   - an **explicit state machine** — when "which actions are even legal right now" is part of the question;
   - a **small set of pure functions** over a plain type — no implicit current state, just transformations.
   No I/O, no terminal codes, no `console.log` for control flow. This module is the one part that outlives the prototype — when the question's answered, it lifts into the real codebase on its own.
3. **Build the smallest TUI that exposes state.** On every keystroke, clear the screen and re-render the whole frame — replace, never append to scrollback, so there's always one stable view. Two parts, top to bottom: (a) current state, one field per line or formatted JSON, **bold** field names, dim derived values/IDs; (b) shortcuts at the bottom: `[a] add  [d] delete  [t] tick clock  [q] quit`. Native ANSI is fine (`\x1b[1m` bold, `\x1b[2m` dim, `\x1b[0m` reset) — no styling library unless the project already has one. The whole frame fits one screen.
4. **One command to run** — wire it into the project's existing task runner (`package.json` script, `Makefile`, `justfile`, `pyproject.toml`). The user runs `pnpm <name>` or equivalent, never remembers a path. Add no new runtime or package manager just for the prototype.
5. **Hand it over.** They drive it; add actions when they ask ("can I also expire a session mid-flow?"). Prototypes evolve.
6. **Disposition** — the validated reducer/machine lifts into the real module (the decision, absorbed); the throwaway TUI shell rides to the discard branch. See the next section.

**Keep the logic and the shell separate.** The moment the reducer references a prompt, a keystroke, or an escape code, it stops being portable and this mode has failed its one job. The shell is a thin driver over a pure module; nothing flows the other way, and the shell never ships to production.

| Don't (logic mode) | Do |
|---|---|
| Open a UI out of muscle memory | Terminal first when the question is state, not looks |
| Blur reducer and TUI (escape codes inside the reducer) | Pure module + thin shell; only the module survives |
| Wire it to the real database | In-memory store, unless persistence IS the question |
| Add tests to a prototype | A prototype that needs tests is no longer a prototype |
| Generalize "what if we support X later" | Answer the one question; delete the rest |
| Promote the TUI shell into production | Lift only the validated module; rewrite it properly |

## Disposition — main keeps decisions, not artifacts

A prototype exists to settle a question. Once it has, the throwaway code has done its job — and code written under prototype constraints (no tests, minimal error handling, faked sources) rots fast and lies to the next reader if it lingers in `main`. Close the loop in three moves, and this holds for *both* modes:

1. **Fold the validated finding into production.** The winning variant, the settled reducer, the confirmed layout — that decision gets rebuilt properly in the real code (production standards; prototype code is a sketch, not a foundation — this is `build-frontend-interfaces` territory). What lands in `main` is the *decision*, not the artifact that produced it.
2. **Write the answer down.** One line: the question and the verdict it settled — e.g. "Q: does the cart survive a mid-session sign-in? A: no — the machine drops the anonymous cart on auth; fix by keying cart to device, not session." Put it on the implementation issue or the fold-in commit. Read the verdict honestly: you built the thing hoping for a yes, which is exactly the confirmation bias `name-and-control-bias` names — the artifact answered a question, it did not ratify your hope. The verdict itself is a `craft-critique` judgment.
3. **Commit the throwaway to a discard branch, out of main.** The full prototype — losing variants, switcher, TUI shell — is a *primary source*, not garbage: branch it (`prototype/<name>`), leave a pointer to that branch on the issue, and delete it from `main`. Future-you can resurrect the exploration; present-you keeps `main` free of half-real code.

**The trap Step 7 named** — a demo-worthy sketch getting promoted whole — has two guards, not one: the honesty README (says what's fake) and the discard branch (keeps the fake code out of `main`).

## Worked example

**Ask:** "Prototype a voice shopping assistant for a smart-display demo — elderly first-time users, must feel trustworthy."

1. **Question:** "Will a first-timer trust ONE spoken recommendation when the screen shows the proof (fit reasons + peer reviews)?" Decision that follows: build the concept or kill it.
2. **Fidelity plan:** Visual **M** (big type, one hero card — enough register to judge trust; tokens later). Content **H** (real-shaped catalog with true attributes/reviews — trust is the question). Interaction **H** (real voice in/out, one question at a time, re-rank on critique — pacing is the design). Data **M** (local `catalog.json`, ~15 real-shaped items; live listings prove nothing extra). Intelligence **H for routing, WoZ for voice risk** (live model reasons over the catalog; every spoken price is a server-authored string played verbatim, because a paraphrased wrong price kills the trust question).
3. **Vehicle:** fork the existing voice engine, strip to `/api/chat` + STT/TTS endpoints; zero new deps.
4. **Ladder:** no-key → rule-based picks from the catalog; model on when key present; vendor TTS → browser TTS.
5. **Contract:** model returns product IDs + reason codes only (per `design-output-contracts`); server renders price/name/rating from the catalog; unknown IDs dropped. Safety-critical intent (medicine symptoms) routes to a deterministic deferral clip — never model-authored.
6. **Honesty labels:** "prototype catalog — representative items, not live listings" on screen; README lists the swap points (voice clips → live TTS, catalog → live API).
7. **Done when:** a dry-skin ask yields one grounded pick + named runner-up + on-screen proof; a medicine ask yields the deferral; **0 hallucinated products or prices across a 20-query eval** (eval built per `write-ai-evals`).

## Anti-patterns

| Don't | Do |
|---|---|
| One fidelity dial ("make it hi-fi") | Five dials, each justified by the question |
| Polish visuals when the question is flow | Grey boxes + working states; taste pass later |
| Placeholder copy in a trust/comprehension test | Real verified content, or obviously-fake stand-ins |
| Live LLM for a question a script answers | WoZ first; wire the model when the question is the model |
| Fake the behavior (a video of barge-in) | Fake the source; run the real interrupt/state code |
| Demo dies without wifi or keys | Degradation ladder; every tier demos something true |
| Model authors displayed facts | Model picks IDs; server renders values from the verified store |
| Iterate one concept from day 1 | 2–3 parallel directions, converge with criteria, then iterate |
| Edit the approved variant in place | New file per direction; URL-param levers; default untouched |
| Raw error strings as failure states | Every branch resolves to a designed, honest state |
| "It demos well" → ship it | Honesty README + `verify-ui-quality` + `craft-critique` before anyone external sees it |
| Debug the animation from a background-tab screenshot | Verify on a focused real browser first |
| Build a screen to answer a state-machine question | Terminal logic prototype first; pixels can't answer "handles X-then-Y" |
| Leave losing variants + switcher rotting in `main` | Fold the winner, branch the rest to `prototype/<name>`, delete from `main` |

## Output format

When asked to *plan* a prototype (not yet build it), emit this block and get agreement before coding:

```
PROTOTYPE PLAN — [name]
Question:      [the one sentence this artifact answers]
Decides:       [who looks, what decision follows]
Fidelity:      visual L/M/H · content L/M/H · interaction L/M/H · data L/M/H · intelligence L/M/H
               [one clause justifying each H]
Vehicle:       [single HTML file / zero-dep server + page / fork of X / framework — and why]
Live wiring:   [APIs used, where keys live, the ID-only rule if data renders]
Simulated:     [what's WoZ'd, and the single swap point for each]
Fallback:      [the no-key / no-network tier]
Honesty:       [on-screen labels + README items]
Done when:     [checkable criteria, incl. the eval gate if AI is involved]
```

When building, the deliverable is the running prototype + the honesty README + the recorded pick/reason for any convergence decision.

## Sources

- Goldilocks principle (just-enough fidelity): https://www.nngroup.com/videos/goldilocks-principle/
- UX prototypes: low vs high fidelity, per-dimension: https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/
- Prototypes vs wireframes: https://www.nngroup.com/videos/prototypes-vs-wireframes-ux-projects/
- Presenting low-fi prototypes to stakeholders: https://www.nngroup.com/videos/low-fi-prototypes-stakeholders/
- Wizard of Oz method: https://www.nngroup.com/articles/wizard-of-oz/
- Parallel & iterative design (+ the 70%/18% case data): https://www.nngroup.com/articles/parallel-and-iterative-design/
- Iterative design of user interfaces: https://www.nngroup.com/articles/iterative-design/
- Case study: iterative design + prototyping: https://www.nngroup.com/articles/case-study-iterative-design-prototyping/
- Parallel design: https://www.nngroup.com/articles/parallel-design/
- The Sketch Test (deliverable clarity): https://www.nngroup.com/articles/sketch-test/
- The **Logic prototype** mode (terminal-driven state machine, pure module behind a thin TUI) and the **Disposition** discipline (fold the finding, write the answer, discard-branch the artifact) are adapted from Matt Pocock's `prototype` skill — mattpocock/skills, MIT.

## Boundaries

- `build-frontend-interfaces` owns production-grade interface builds; this skill owns question-answering prototypes and hands off when the artifact becomes the product.
- `explore-divergent-concepts` owns generating and documenting the directions; this skill builds them in parallel and converges.
- `design-output-contracts` owns closed-enum routing and forced tool-call contract design; this skill wires those contracts into a running artifact.
- `write-ai-evals` owns the eval gate that measures an AI prototype's faithfulness/quality.
- `verify-ui-quality` owns mechanical verification; `craft-critique` owns judgment, verdicts, and the evidence protocol; `design-taste` owns all taste values. Reference them; never restate.
