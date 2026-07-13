---
name: engineer-production-prompts
description: "Writes, structures, versions, and regression-guards system prompts as production artifacts — architecture, few-shot examples, register constraints, model pinning, and change discipline. Use when writing or reviewing a system prompt for a shipped AI feature; when someone says 'tweak the prompt', 'the model keeps saying X', 'add an example to the prompt', 'change the wording', 'switch the model', 'why did the behavior change', or 'is this prompt good'; when encoding voice/safety/tie-break rules into prompt text; or when a prompt change is about to ship without a regression run. Distilled from Dinesh's shipped prompts (the Boo router, the Saathi shopkeeper turn)."
---

# Engineer Production Prompts

A prompt that ships is code: it lives in the repo, has one source of truth for shared facts, pins its model like a dependency, and never merges without a regression run. This skill turns model instructions into an enforceable design artifact instead of a magic paragraph someone edits and hopes.

## When to use / when NOT to use

**Use when:**
- Writing a system prompt for any model call that reaches users (router, composer, live agent)
- Reviewing a prompt someone else wrote ("is this production-grade?")
- Adding or auditing few-shot examples
- Changing prompt wording, switching models, or diagnosing "the behavior changed and nobody changed the code"
- Encoding a product's voice rules, safety rules, or disambiguation rules into prompt text

**NOT for:**
- The structural output guarantee — forced `tool_choice`, schema with no prose field, closed enum, verified-store hydration → `design-output-contracts`. That skill owns the cage; this skill writes the words inside it.
- Building the eval suite itself (golden sets, rubrics, LLM-as-judge) → `write-ai-evals`. This skill mandates *when* evals gate a change; that one owns *how* to build them.
- Deciding conversation behavior (turn design, repair, persona) → `design-conversational-interfaces`. This skill encodes those decisions as prompt text once made.
- What failure looks like to the user → `design-ai-trust-and-failure-states`.

## First law: structure guarantees, prompts calibrate

Before writing any prompt rule, run this gate:

```
Can code enforce this behavior?
├── YES → it does NOT belong in the prompt.
│   "Never reply in prose"        → forced tool_choice + no-prose schema
│   "Never invent a price"        → model picks IDs; server hydrates values
│   "Never answer medical asks"   → deterministic safety gate BEFORE the model
│   "Never exceed the intent set" → closed enum in the schema
│   (all owned by design-output-contracts)
│
└── NO → it belongs in the prompt, stated as a testable rule.
    Tone/register, tie-breaks between adjacent intents, question pacing,
    what to do with the runner-up, when to call which tool, refusal manner.
```

A prompt rule buys a **tendency**; a structural constraint buys a **guarantee**. Never spend prompt space asking for something the schema can lock — and never trust the prompt alone for anything a leak would make expensive. The shipped systems still validate forced output server-side. Write the prompt as the *last* line of defense, and design it knowing it is.

## System prompt anatomy (the seven sections, in order)

Every production system prompt Dinesh ships has this shape. Write the sections in this order — the order is load-bearing (identity and prohibitions before capabilities; facts before rules that use them).

1. **Role + audience + surface — one sentence, first line.** Who the model is, who it serves, where the output lands. Real examples: *"You are the deterministic intent ROUTER for [the] voice-first portfolio. You do NOT talk to the visitor."* / *"You are Saathi — a warm, honest neighbourhood shopkeeper on an Amazon Echo Show, helping a first-time online shopper in India who may be elderly or new to the internet. They speak to you; a screen beside you shows the proof."* Note both name the *surface* — voice + screen changes every downstream rule.

2. **The negative charter — what the model NEVER does, stated early.** Before capabilities. "You do NOT talk to the visitor. You classify… then stop." / "You never oversell." Models drift toward helpfulness; the charter is the counterweight. Include the explicit anti-helpfulness line where it matters: *"Never invent an intent to be helpful."*

3. **The closed world — facts injected, never hand-typed.** Everything the model may treat as true goes in as a serialized data structure, generated from the same source the rest of the system uses: the router prompt's intent list is built from the `INTENTS` map (`${ENUM.map(k => `- ${k}: ${INTENTS[k]}`).join('\n')}`); the shopkeeper prompt ends with `CATALOG (the only products that exist):\n${JSON.stringify(catalogForModel)}`. If a fact appears in the prompt AND in a schema enum AND in keyword rules, all three must derive from ONE map — otherwise they drift, and drift is a silent routing bug.

4. **Output-channel spec — a register rule per field.** Name the single tool ("Output ONLY via the route_intent tool" / "your only output") and give every field the model fills a *design spec*, not just a type. The Saathi `say` field spec is the model: *"Keep 'say' to ONE or at most TWO short sentences. The screen already shows the price, rating, reviews and the reasons — do NOT repeat those at length… point to the screen."* Voice and screen have a division of labor; the prompt is where it's enforced.

5. **Behavior flow — numbered modes, one path each.** Not prose guidance; a numbered decision list the model walks: *"1) If you don't yet know enough… set mode='ask', ask ONE simple question… 2) When you know enough, set mode='recommend': choose ONE best-fit product and name a second as an honest tradeoff… 4) If they want something you don't carry, say so honestly. Never invent a product."*

6. **Tie-breaks — explicit hard rules for every adjacent-intent pair.** Where two intents can both plausibly claim an utterance, write the disambiguation as policy, with the *reason* when the reason is honesty: *"a results/number ask about [the flagship] → metric intent; a scale/enterprise ask → scale intent, NEVER metric — it has no shippable number and the absence is the point."* / *"'is it real / can I try it' → live demo if they want to operate it; receipts if they want evidence to forward."* Tie-breaks are where product honesty policy executes — treat them as design decisions, not prompt tuning.

7. **Off-limits — enumerated by name, with the designed exit.** Never "avoid sensitive topics." List them: *"salary, visa/sponsorship specifics, projects that do not exist, skills not shipped"* → route to the designed fallback. Safety-critical language is never left to the model's phrasing: the prompt commands verbatim playback of a server-owned string — *"say its 'say_verbatim' line word-for-word and do NOT recommend a product."*

## Register constraints — output guidelines as a design artifact

The prompt is where a product's voice becomes enforceable. Write register rules so a lint script could check the output:

| Vague (unenforceable) | Production (testable) |
|---|---|
| "Be concise" | "≤ 2 short sentences in `say`" / "≤ 55 words spoken" |
| "Don't overwhelm the user" | "ONE question at a time — never two questions in one breath" |
| "Stay in your lane" | Allow/deny lexicon: "'helps with dry skin' ✅ / 'treats', 'cures' ❌" |
| "Be helpful with next steps" | "Offer 2–3 short suggestions they could tap or say" |
| "Sound natural" | "Never tell the customer what to say. Let them use their own words." |
| "Don't be repetitive" | "Never read aloud what the screen already shows" |

These are model output guidelines — a designer-owned artifact reviewed like copy. When the product has a voice system (say-field pacing, cue markers, refusal tone), the prompt rules must cite the same budgets that system uses, from the same file.

## Few-shot examples — when they earn their place

Few-shot is expensive context and a fabrication vector. Rules:

1. **Add examples only for what schema + rules can't pin:** register calibration (what "warm, brief" sounds like), near-miss disambiguation (an utterance that *almost* matches the wrong intent, labeled correctly), and format subtleties inside free-text fields.
2. **Always include one refusal and one fallback example.** Models learn the happy path from anything; they learn to decline gracefully only from a demonstration.
3. **Examples obey every honesty rule live output obeys.** No invented products, metrics, or capabilities in an example — the model will parrot them as real. Build examples from the actual catalog/verified store.
4. **Real-shaped, not toy.** "asdfgh" → fallback is a real test; "example question" → "example answer" teaches nothing.
5. **Examples live in the same versioned file as the prompt** and are covered by the same regression set. An example is a prompt change.
6. **Few-shot buys tendency, never guarantee.** If an example exists to prevent an expensive failure, that failure needs a structural fix too (`design-output-contracts`).

## Versioning like code (non-negotiable)

1. **The prompt lives in source control, next to the code that sends it.** No dashboard-only prompts, no prompt in a Notion doc that "someone pastes in." If it isn't in the diff, it didn't happen.
2. **One source of truth for shared facts.** The `INTENTS` map feeds the prompt's intent list, the tool schema's enum, AND documents the keyword backstop rules. Add an intent → all three update in the *same commit*. Same for catalogs, lexicons, and word budgets.
3. **Pin the model like a dependency.** Env-driven with a safe pinned default: `const MODEL = process.env.ARIA_MODEL || 'claude-haiku-4-5-20251001'` — a dated snapshot, never a floating "latest" alias. Revert = one env var (`ARIA_MODEL=claude-sonnet-5`), no deploy.
4. **Every prompt change is a reviewed diff with a stated reason.** "Tightened the tie-break between metric and scale asks because X misrouted" — reviewable, revertible, blame-able. A prompt diff with no reason is a red flag in review.
5. **Ship A/B levers dormant, defaults untouched.** The shipped pattern: a candidate model/voice is reachable via an opt-in query param (whitelisted server-side), while the default stays pinned. You can demo the candidate live to the decision-maker without shipping it. When the candidate is rejected, the lever stays as a dormant test harness — the default does not move without an explicit call.
6. **Model switches are measured, not vibed.** Time the candidate against the incumbent on the *same* fuzzy utterances before switching — a voice surface lives or dies on latency, so a model that merely reads "smarter" has not earned the swap. In the shipped stack the higher-quality TTS voice is deliberately held back in favor of the faster tier, and the recommendation on a wholesale speech-to-speech swap was to decline it — partly because its added latency and lost price-faithfulness would break the interface feel. Record the measurement and the revert lever in the commit.

## Regression checks on prompt changes

**The rule: no prompt diff merges without re-running the regression set.** A prompt change has the blast radius of a code change with none of the compiler's help — one softened sentence can reopen an off-limits route.

What the gate contains (build the suites per `write-ai-evals`; this skill only fixes the gate):

- **Golden routing/behavior set** — the canonical utterances and their required intents/modes, including every tie-break pair. Must stay green.
- **Off-limits suite at 100%, always.** Every enumerated dangerous ask (money, legal-status, nonexistent projects, unshipped skills, medical) must still land on the designed refusal. 99% is a failing grade here.
- **Register lint** — mechanical checks over sampled outputs: word count of budgeted fields, deny-lexicon scan, one-question check. Cheap, scriptable, catches tone drift the golden set misses.
- **Latency measurement** when the model or a major prompt block changes — voice surfaces live or die on it.

Decision tree for any requested behavior change:

```
"The model did X wrong — fix the prompt?"
├── X is expensive if it EVER happens  → structural fix first (design-output-contracts),
│                                        prompt rule second, regression case always
├── X is a routing miss between two    → add/tighten the explicit tie-break rule
│   valid intents                        + add that utterance to the golden set
├── X is tone/verbosity/register       → tighten the numeric budget or lexicon
│                                        + add a register-lint check
└── X is the model refusing something  → NEVER fix by softening off-limits rules.
    it should answer                     Add the missing intent/fact to the closed
                                         world properly, then re-run the full gate.
```

## Worked example — a production prompt, annotated

Condensed from the shipped shopkeeper turn (Claude + forced `compose_turn` tool; catalog and IDs validated server-side per `design-output-contracts`):

```
[1 ROLE+SURFACE]  You are Saathi — a warm, honest neighbourhood shopkeeper on an
                  Amazon Echo Show, helping a first-time online shopper in India
                  who may be elderly or new to the internet. They speak to you;
                  a screen beside you shows the proof.

[2 CHARTER]       YOUR SOUL: trust comes from people, and you earn it by being
                  honest — sometimes by talking a customer OUT of spending more.
                  You never oversell.

[4 FIELD SPEC]    HOW YOU SPEAK (the "say" field — this is spoken aloud):
                  - Warm, plain, brief. ONE question at a time — never two in one breath.
                  - ONE or at most TWO short sentences. The screen already shows the
                    price, rating, reviews — do NOT repeat those; point to the screen.
                  - Never tell the customer what to say.

[5 FLOW]          THE FLOW:
                  1) Not enough to pick well → mode="ask", ONE simple question,
                     2–3 tappable suggestions.
                  2) Enough → mode="recommend": ONE best-fit pickId + runnerUpId
                     as an honest tradeoff; fitChips tie each attribute to the
                     customer's OWN words. If cheaper is genuinely enough, say so.
                  4) Don't carry it / off-topic → mode="message", say so honestly.
                     Never invent a product.

[6+7 LIMITS]      HONESTY RULES (non-negotiable):
                  - ONLY product ids from the CATALOG below. Never invent products,
                    prices, specs, ratings, or reviews.
                  - Cosmetic language only ("helps with dry skin"), never medical
                    ("treats", "cures").
                  - You do NOT sell medicine or advise on symptoms — handled elsewhere.

[3 CLOSED WORLD]  CATALOG (the only products that exist):
                  ${JSON.stringify(catalogForModel)}
```

Why this passes review: role and surface in line one; the charter counterweights sales pressure; every free-text field has a numeric budget and a division-of-labor rule; the flow is numbered modes matching the schema enum; claims are lexicon-bounded; medicine is *also* gated in code before the model ever runs (the prompt is the second wall, not the only one); and the catalog is injected from the same `catalog.json` the server hydrates from — the prompt cannot disagree with the screen.

## Prompt review checklist (run before merge)

- [ ] Role + audience + surface stated in the first two lines
- [ ] Negative charter present, before capabilities
- [ ] Zero hand-typed facts — every fact/list injected from the shared data structure
- [ ] Every schema field the model fills has a register spec (budget, tone, division of labor)
- [ ] Every adjacent-intent pair has an explicit tie-break rule
- [ ] Off-limits topics enumerated by name; refusal behavior designed, safety lines verbatim
- [ ] All numeric budgets actually numeric ("≤2 sentences", not "brief")
- [ ] Few-shot examples (if any): real-shaped, include refusal + fallback, obey honesty rules
- [ ] Model pinned to a dated snapshot; env lever for revert documented
- [ ] Prompt, schema enum, and keyword rules changed in the same commit
- [ ] Regression set re-run and green; off-limits suite at 100%
- [ ] Change reason stated in the commit; measurement attached if the model changed

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| "Always respond in JSON" as a prompt rule | Force `tool_choice`; the prompt never carries what code can lock |
| Prompt edited in a dashboard, no history | Prompt in the repo, diffed, reviewed |
| `model: "latest"` or an undated alias | Dated snapshot + env override lever |
| Catalog/intent list typed into prompt prose | Injected from the single source-of-truth structure |
| Prompt enum drifts from schema enum | Both generated from ONE map, same commit |
| Tweak wording, eyeball one good reply, ship | Full regression gate on every prompt diff |
| Few-shot example with an invented product/metric | Examples drawn from the real store; the model parrots examples |
| "Be concise / be helpful / be safe" | Numeric budgets, enumerated off-limits, designed refusals |
| Fix a false refusal by softening off-limits rules | Extend the closed world properly; off-limits stays 100% |
| Let the model phrase the safety/price line | Server-authored string, prompt commands "word-for-word" |
| One mega-prompt handling canonical cases | Keyword/deterministic pre-route for obvious triggers; the model handles the fuzzy residue |
| Switching models because the new one "feels smarter" | Measure latency + regression pass on the same utterances first |

Red flags in review: a prompt whose facts you can't trace to a data file; a behavior rule that duplicates something the schema already enforces (dead weight — cut it); a diff that changes the prompt and nothing else with no stated reason; "we'll eval it after launch."

## Output format (when this skill produces the artifact)

Deliver: (1) the prompt file with the seven sections in order, shared facts injected; (2) the register spec table for every model-filled field; (3) the change record — version, diff reason, regression result, model pin, revert lever. Claims about model behavior ("this phrasing fixes X") are handled per `craft-critique`'s evidence protocol: show the regression run, or flag as under-evidenced.

## Boundaries

- **design-output-contracts** owns the structural guarantee (forced tool call, no-prose schema, closed enum, verified-store hydration, fallback routing). It dictates the contract-bearing prompt lines (closed intent list, tie-breaks, "you do not talk to the user"); this skill owns crafting, versioning, and regression-guarding the full prompt around them.
- **write-ai-evals** owns building golden sets, adversarial suites, rubrics, and judges; this skill fixes *when* they gate (every prompt diff) and what the gate must include.
- **design-conversational-interfaces** decides turn behavior and persona; **design-voice-interactions** owns barge-in/turn-taking mechanics; this skill encodes their decisions as enforceable prompt text.
- **design-ai-trust-and-failure-states** designs what refusal and failure look/sound like; this skill makes the prompt route to those designed states verbatim.
- **design-taste** governs any UI the prompt's output composes; load it before writing screen-field specs.

## Sources

Distilled from Dinesh's shipped prompts and their source control — not NN/g-grounded, and not a fork (no external license to carry):

- **Boo / portfolio voice router** (`aria-portfolio/server.js`) — the `INTENTS`-map-driven intent list, forced `tool_choice → route_intent`, closed enum with no prose field, the keyword pre-route backstop, and the `MODEL = process.env.ARIA_MODEL || 'claude-haiku-4-5-20251001'` dated-snapshot pin with an env revert lever.
- **Saathi honest-shopkeeper turn** (`saathi/server.js`) — the `compose_turn` tool with the `ask / recommend / compare / message` mode enum, the per-field register spec on `say`, the server-owned `safety_check` gate that runs *before* the model, the `say_verbatim` deterministic refusal lines, and the catalog injected via `${JSON.stringify(catalogForModel)}` from the same file the server hydrates from.
