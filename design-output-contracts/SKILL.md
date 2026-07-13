---
name: design-output-contracts
description: "Designs structural output contracts for AI features so the model can ONLY produce designed UI — never a prose reply, never a fabricated fact. Use when building or reviewing an intent router, forced tool call (tool_choice), closed-enum classifier, generative-UI system, or any surface where 'the model must respond with UI/JSON only'; when someone says 'the model keeps replying in text', 'how do I stop it hallucinating a number', 'constrain the output', 'structured output', 'route the utterance to a component', or 'what happens on an unmatched input'. Owns the guarantee layer: schema, enum, fallback routing, verified-store data. Distilled from Dinesh's shipped routers (the Boo portfolio router, the Saathi commerce loop)."
---

# Design Output Contracts

Make "always UI, never prose" and "no hallucination" the same structural guarantee: remove the model's ability to talk to the user, and remove its ability to author facts.

## When to use / when NOT to use

**Use when:**
- An AI feature must render designed components, not chat text (stage interfaces, generative UI, voice-driven screens)
- You're wiring an intent router, a forced tool call, or a tool-calling loop that feeds a renderer
- Reviewing an AI surface for prose leaks or fabrication paths ("can any input reach the screen as raw model text?")

**NOT for:**
- What the failure state looks and sounds like to the user → `design-ai-trust-and-failure-states` (this skill guarantees failure *resolves to a recipe*; that skill designs the recipe)
- Behavior inside an intentional conversation (turn design, repair, persona) → `design-conversational-interfaces`
- The decision between conversation and GUI → `design-stage-interfaces`
- Writing/versioning the system prompt itself → `engineer-production-prompts`
- Measuring whether the contract holds (golden sets, adversarial suites) → `write-ai-evals`

Load `design-taste` before designing any recipe the contract routes to.

## The core reframe: constrain, don't tune

Tuning (prompting "respond only in JSON", few-shot examples) buys a **tendency** — usually UI, occasionally a stray paragraph. Constraining buys a **guarantee** — the model *physically cannot* emit prose. Any external-facing surface (recruiter, customer, elder) needs the guarantee. You get it by removing the model's output channels, not by asking nicely.

Test to pick which you need: **what does one leak cost?** One stray paragraph on a recruiter surface, one wrong spoken price in a commerce demo = credibility kill → guarantee. Internal tool where a leak is a shrug → tendency is fine, skip this skill.

## Step 0 — pick the contract level

```
Does the model need to author ANY user-facing words?
├── NO — it only picks which designed thing renders
│     → LEVEL 1: CLASSIFIER CONTRACT
│       One tool (route_intent), closed enum, renderer owns the screen,
│       narration pre-authored. Model vocabulary toward the user = zero words.
│
├── ARRANGES components, maybe short captions
│     → LEVEL 2: RENDER-TOOLS CONTRACT
│       The tool set = the component library (RenderMetricTile, RenderCaseBlock…).
│       Forced tool call, no free-text tool. Words live ONLY inside designed
│       caption fields; every data prop hydrates from the verified store.
│
└── YES — live conversation IS the product (a genuinely live agent)
      → LEVEL 3: TOOL-LOOP + FAITHFULNESS RULE
        Model converses, but selects fact IDs ONLY (product id, source id);
        the server hydrates every rendered price/name/spec/metric.
        Validate every ID against the store post-generation; drop unknowns.
        Safety-critical and fact-bearing lines are server-authored verbatim.
```

At every level the same law holds: **the model routes or arranges verified content; it never authors it.**

## The method — five structural layers (Levels 1–2)

Build all five. Each is enforced in code, not in the prompt.

1. **Force the tool call.** `tool_choice: { type: 'tool', name: 'route_intent' }`. A forced tool choice means the model MUST return a tool-use JSON block — it cannot return an assistant text message. This is the API-level lock.
2. **Give the schema no prose field.** Input schema = `{ intent: enum, confidence: number, entities: object }`. No `message`, no `reply`, no `text`, no `explanation`. There is nowhere to put a sentence; the model can only pick and fill.
3. **Close the enum and make it total.** `intent` must be one of a finite, hand-authored recipe set — AND the residual branch (`fallback`) is itself a member of the enum, a first-class designed flow. Every possible input, including gibberish and off-limits topics, lands on a recipe. There is no "else: error" branch.
4. **Make the renderer the only screen-touching layer.** Pipeline: `utterance → model → intent id → deterministic recipe → UI (+ pre-authored voice)`. The model's raw output never leaves the server. The renderer only knows how to draw recipes; there is no code path that prints a raw string.
5. **Feed components from the verified store only.** Every metric tile, price, quote, and source chip draws from a hand-verified data file keyed by ID. The model can name *which* verified fact renders, never *what it says*. Fabricating a fourth metric when the store holds three is structurally impossible.

Then add the **reliability spine** (what keeps the guarantee up when the model or network is down):

6. **Keyword-rules backstop.** A deterministic regex pre-classifier over the same enum. Three jobs: (a) canonical/obvious triggers (chip taps, "show me your work") skip the model round-trip entirely; (b) no API key → keyword-only mode still works; (c) any API error degrades to the keyword route, never to a blank screen. **The rules and the enum must never drift** — derive the LLM prompt's intent list and the tool enum from ONE source-of-truth map, and update the regex rules in the same commit as any enum change.
7. **Validate even the forced output.** Server-side, after the call: tool_use block present? `intent` actually in the enum? If not → treat as error → keyword route. `confidence` below threshold (the shipped router uses 0.45) → route to `fallback` deterministically. Trust the mechanism, verify the output anyway.
8. **Put disambiguation in the prompt as hard rules, not vibes.** Where two intents are adjacent, write the tie-break explicitly: *"a results/number ask about [flagship] → metric intent; a scale/enterprise ask → scale intent, NEVER metric — it has no shippable number and the absence is the point."* The router is where honesty policy executes.

## The two failure intents — guide vs fallback (do not collapse)

Unmatched input is not one bucket. Split it by user *intent state*:

| Intent | Who lands here | Signals | The recipe's job |
|---|---|---|---|
| `guide` | **Willing but lost** | "I didn't get that", "what do you mean", "say that again", "what can I ask", "I'm confused" | Warm re-orientation: "Let's find it." + the 3–4 strongest real doors. Never reads as a failure. |
| `fallback` | **Off-limits / off-catalog / noise** | salary, visa specifics, projects that don't exist, skills not shipped, real questions outside the content set, gibberish | Honest decline: owns the gap ("Not wired up. No bluffing."), offers the closest real intents as chips. Never invents an answer to be helpful. |

Collapsing them punishes a confused user with a "no" they didn't earn, or tempts the system to bluff an off-limits topic. Both recipes are designed widgets — headline + redirect chips + open input — never a prose apology. Even the miss demonstrates the guardrail discipline.

**Off-limits routing is the integrity-critical path.** List the dangerous asks explicitly in the prompt (money questions, legal-status specifics, anything the person/product hasn't actually shipped) and verify in evals that ALL of them reach `fallback` — none may reach a content flow that could fabricate.

## Worked example — the real shipped router (condensed)

Level 1 contract from Dinesh's live portfolio router (zero-dep Node, Claude Haiku, keys server-side):

```js
// ONE source of truth: feeds the LLM prompt AND the tool enum.
// The keyword RULES below are hand-written but change in the SAME COMMIT as this map.
const INTENTS = {
  cold_open:  'greeting / who are you / first arrival',
  flagship_case: 'show me your work / best project / walk me through the case',
  metric_strike: 'results / impact / the numbers',
  scale_anchor:  'enterprise / at scale / the big-company work',
  // …11 more content intents (live_tara, receipts, under_the_hood, resume, contact, …)…
  guide:    'visitor is WILLING but lost: what do you mean, say that again, what can I ask',
  fallback: 'off-limits (salary, visa specifics, nonexistent projects, unshipped skills) OR off-catalog OR gibberish',
};
const ENUM = Object.keys(INTENTS);

// Deterministic backstop — same enum, zero model calls
const RULES = [
  ['metric_strike', /\b(results?|impact|the numbers?|metrics?|how (did|does) it (do|perform))\b/],
  ['guide',         /\b(what do you mean|say (that )?again|i'?m (lost|confused)|what (can|should) i ask)\b/],
  // …one row per intent, kept in sync with ENUM…
];
function keywordRoute(u) {
  const s = (u || '').toLowerCase().trim();
  for (const [intent, re] of RULES) if (re.test(s)) return { intent, confidence: 0.9 };
  return { intent: 'fallback', confidence: 0.3 };           // total: no input escapes
}

// The forced tool call — the model has NO prose channel
const tools = [{
  name: 'route_intent',
  description: 'Route the visitor utterance to exactly one flow. This is your only output.',
  input_schema: {
    type: 'object',
    properties: {
      intent:     { type: 'string', enum: ENUM },            // closed enum
      confidence: { type: 'number' },
      entities:   { type: 'object', additionalProperties: true },
    },
    required: ['intent', 'confidence'],                      // note: NO text/message field
  },
}];
// body: { model, max_tokens: 256, system, tools,
//         tool_choice: { type: 'tool', name: 'route_intent' },   ← the lock
//         messages: [{ role: 'user', content: utterance }] }
// system prompt: "You do NOT talk to the visitor. Classify into exactly ONE intent, then stop."
//   + the INTENTS list + explicit tie-breaks + "Never invent an intent to be helpful."

// The cascade — every path ends in a designed recipe
async function route(utterance) {
  const kw = keywordRoute(utterance);
  if (kw.confidence >= 0.9) return kw;                       // canonical → skip the model
  if (!KEY) return kw;                                       // no key → backstop still works
  try {
    const r = await claudeRoute(utterance);                  // throws if no valid tool_use
    if (!ENUM.includes(r.intent)) throw new Error('bad intent');  // validate anyway
    if (r.confidence < 0.45) return { intent: 'fallback', confidence: r.confidence };
    return r;
  } catch { return kw; }                                     // API error → backstop, never blank
}
```

Verified behavior of this exact design: "can you actually code" → the builder-proof flow; "what's your salary expectation?" → `fallback` (honest decline widget); API key missing → keyword-only mode, full experience intact.

## Extending the contract to voice

Spoken output is part of the contract. Two rules from the shipped systems:

- **Levels 1–2:** narration is pre-authored (baked TTS clips or server-authored `say` strings). The model picks which clip plays; it writes zero spoken words.
- **Level 3 / speech-to-speech models:** S2S audio *cannot be made deterministic* — the screen stays faithful (server-rendered) but any model-spoken fact is a paraphrase risk. Therefore: any fact-bearing line (a price, a metric, a safety deferral like "for that, see a doctor") is a **server-authored string played verbatim**, never model-authored; run an independent guardrail that cancels the response on a fact mismatch in the live transcript.

If a live embed (the one genuinely-live AI on a page) errors or is unreachable, that failure routes to the designed fallback recipe with the real external link — make it an explicit code path, never an assumption, and never a scripted impostor reply.

## Contract lint (run before ship)

- [ ] `tool_choice` forces a named tool — the model cannot return an assistant text block
- [ ] Schema has zero prose-shaped fields (`message`/`reply`/`text`/`explanation`/`answer`)
- [ ] Enum is closed AND total — `fallback` is in the enum, and no code path errors into raw text
- [ ] `guide` and `fallback` are separate intents with separate designed recipes
- [ ] Off-limits topics are enumerated in the prompt and eval-verified to hit `fallback`
- [ ] Renderer draws recipes only; grep the client for any path that prints a model string
- [ ] Every rendered fact hydrates from the verified store by ID; unknown IDs are dropped server-side
- [ ] Keyword backstop covers the whole enum; no-key and API-error paths tested
- [ ] Server validates tool output (tool_use present, intent ∈ enum, confidence threshold)
- [ ] Fact-bearing spoken lines are pre-authored/verbatim, not model-generated
- [ ] Live-embed failure has an explicit designed code path
- [ ] Enum, prompt intent list, keyword rules, and renderer recipe map all derive from or sync with ONE map

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Prompt "respond only with JSON" and hope | Force `tool_choice` — a lock, not a request |
| Add a `message` field "for flexibility" | No prose field, ever; captions are designed component props |
| `intent: { type: 'string' }` open string | Closed `enum` — the model picks, never coins |
| `else: show "Sorry, I didn't understand"` | `fallback` is a designed recipe inside the enum |
| One bucket for confusion + off-limits + gibberish | Split `guide` (willing-but-lost) from `fallback` (decline) |
| Model writes the number/price/metric into the UI | Model selects the ID; verified store supplies the value |
| Skip validation because the call is forced | Validate tool_use + enum membership + confidence anyway |
| Add an intent to the enum, forget the regex rules | Enum and keyword RULES change in the same commit |
| Let S2S voice speak a price/safety line | Server-authored verbatim clip + mismatch guardrail |
| Invent an intent "to be helpful" on a near-miss | Low confidence routes to `fallback` — honesty over coverage |
| Imply the deterministic compositor is live AI | Name what's live and what's choreography; honesty is the brand |

Red flags in review: any user-visible string whose origin you can't trace to a recipe file or the verified store; a demo that has never been fed gibberish, an off-limits ask, or a killed API key; a "temporary" debug path that renders raw model output.

## Output format (when this skill produces a contract spec)

Deliver four artifacts: (1) the intent map (id → trigger description → recipe, incl. `guide` + `fallback`); (2) the tool schema(s) with the no-prose-field rule stated; (3) the routing cascade (backstop → model → validation → thresholds → tie-break rules); (4) the verified-store shape (what facts exist, keyed how, who is allowed to edit). Claims about model behavior in the spec are handled per `craft-critique`'s evidence protocol.

## Sources

Dinesh-practice grounding — distilled from his own routers, not theory. The **Boo portfolio router**: his live voice-first portfolio agent, the Level 1 closed-enum classifier the worked example condenses (forced `tool_choice`, no-prose schema, keyword backstop, guide-vs-fallback split, verified-store hydration). The **Saathi commerce loop**: the Echo Show conversational-commerce prototype — Level 3 fact-ID selection with server-side hydration and verbatim fact-bearing spoken lines. Not NN/g-grounded; a build-practice pattern, so no nngroup citations apply.

## Boundaries

- **design-ai-trust-and-failure-states** designs what failure looks/sounds like to the user; this skill guarantees every failure structurally resolves to one of those designed states.
- **write-ai-evals** owns measuring the contract (golden sets, adversarial off-limits suites, faithfulness evals); this skill defines what must be measured.
- **engineer-production-prompts** owns system-prompt craft and versioning; this skill dictates only the contract-bearing parts (closed intent list, tie-breaks, "you do not talk to the user").
- **design-stage-interfaces** owns the conversation-vs-GUI decision; **design-conversational-interfaces** owns behavior once IN conversation (Level 3 turn design); **design-voice-interactions** owns barge-in/turn-taking mechanics around the contract.
- **design-taste** governs every recipe the router resolves to; load it first.
