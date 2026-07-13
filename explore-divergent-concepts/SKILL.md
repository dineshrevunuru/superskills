---
name: explore-divergent-concepts
description: "Generates genuinely different design directions in parallel, documents the exploration, and converges on one with explicit criteria — Dinesh's research → 3 concepts → pick → build loop. Use when starting any design/product/feature where more than one approach is plausible, when asked to 'explore concepts', 'show me directions', 'give me options', 'which approach should we take', 'ideate on this', or when you catch yourself elaborating the first idea that came to mind instead of comparing alternatives. Also use when a favorite direction must be killed and its remains harvested."
---

# Explore Divergent Concepts

Run parallel directions before committing — because the first idea is a sample size of one, and NN/g's parallel-design evidence says comparing independent alternatives beats polishing a single guess.

## When to use / when NOT to use

**Use when:**
- A new product, feature, screen, or interaction is about to be designed and >1 approach is plausible
- Research synthesis is done and the question is now "what do we build?"
- You notice solution tunnel-vision: elaborating idea #1 instead of generating idea #2 and #3
- A direction everyone loves needs a fair execution — or a fair death

**NOT this skill:**
- Problem not framed yet → `write-problem-statement` first (the entry gate for every project)
- Research not synthesized → `synthesize-research-data` (it owns need statements + HMW — the *inputs* to divergence)
- Running a group ideation session with humans in a room → `facilitate-design-workshop`
- Already converged, now refining the winner → iterate and review via `craft-critique`
- Detailing the picked concept into flows/screens → `design-interaction-flows`, then `build-coded-prototypes`

## The loop

```
research → 3 concepts → pick → build
   │            │          │       │
synthesize-  THIS SKILL  THIS   design-interaction-flows
research-    (diverge +  SKILL  → build-coded-prototypes
data         document)  (converge) → iterate on the winner
```

NN/g's finding behind the shape: **parallel design, then iterative refinement.** In NN/g case data, parallel design (independent alternatives merged after comparison) improved usability ~70% vs. ~18% for iterating a single design. Diverge first; iteration is for after the pick, not instead of it.

### Step 0 — Preconditions gate (do not skip)

- [ ] Problem statement exists (one problem, no embedded solution)
- [ ] Research is synthesized — insights, needs, constraints on paper
- [ ] Binding constraints are listed (platform, accessibility floor, legal/safety, scope)
- [ ] The decision-maker is named (for Dinesh's projects: Dinesh picks; you recommend)

Any box unchecked → stop, go do that first. Diverging without these produces three decorated guesses.

### Step 1 — Name the crux

Write **one sentence**: the question every concept must answer *differently*. It comes straight from the problem statement + the sharpest research tension.

> Real example (Echo Show conversational shopping): *"How does the agent make the basis of its choice visible, correctable, and grounded — so a first-time buyer who trusts humans over institutions can trust this pick?"*

If you cannot name the crux, you are not ready to diverge. The crux is the axis of divergence; without it you'll generate three skins of one idea.

### Step 2 — Generate exactly 3 concepts

Why 3: two collapses into a binary (A vs. not-A); four or more spreads analysis too thin to take each seriously. Three forces real alternatives while keeping each one deep.

Each concept is a **different bet**, not a different skin. State the bet explicitly: *"Bet: trust comes from people"* vs. *"Bet: trust comes from verifiable reasoning + control"* vs. *"Bet: trust comes from effortlessness + safety."*

**The opposing-constraint move (generate bets that diverge *structurally*, not cosmetically):** don't wait for three different bets to surface — *force* them. Hand each concept a genuinely **opposing product priority** and let the bet fall out of the constraint: minimalism vs. flexibility vs. optimize-the-common-case; guidance vs. control vs. effortlessness; safety-first vs. speed-first vs. transparency-first. Directions constrained by *opposing* priorities cannot collapse into the same shape; directions constrained by the *same* priority always will. Keep the priority at product-concept altitude — what the *experience* optimizes for, not an API knob. This is the generative complement to the swap test below: the opposing constraint makes divergence structural (different skeleton), the swap test catches divergence that stayed cosmetic (same skeleton, new paint). *(Technique adapted from Pocock's "Design It Twice" — assign each parallel direction an opposing constraint; deprecated upstream, see Sources.)*

**The swap test:** if you could swap the visual treatment between two concepts and both ideas survive intact, they are different skins of the same bet — kill one and generate a genuinely different bet.

**Constraint rule:** ALL concepts honor ALL binding constraints. Divergence lives in the bet, never in which constraints a concept ignores. A concept that "wins" by dropping the accessibility floor is not a concept; it's a bug.

**Fidelity rule (Goldilocks):** concepts are compared as written bets + behavior sketches — a paragraph of voice/interaction feel, not polished comps. Just enough fidelity to answer "which bet?" Polish is post-pick; pre-pick polish is sunk cost being manufactured.

### Step 3 — Document the exploration (the concept sheet)

The exploration itself is a deliverable — "show the exploration" is part of the job, for portfolio, client, and future-you. Write one sheet (format below) with, per concept:

1. **Name + emoji + one-line bet** — memorable handle, explicit bet
2. **Behavior sketch** — how it talks/acts, in a concrete sample line or moment
3. **Why it might win** — the honest best case
4. **Risk** — mandatory. A concept with no named risk is under-analyzed, not risk-free
5. **Best if the goal is…** — which goal makes this the right pick

Then a **"How they relate"** section: are the concepts exclusive or combinable? Often one concept is the *soul* (primary bet), and the losers contribute *layers* — one supplies the engine (mechanics), another the constraint (delivery discipline). Naming this before the pick makes killing favorites cheaper: losing ≠ vanishing.

### Step 4 — Set convergence criteria BEFORE comparing

Write the criteria **before** you let yourself rank anything. Criteria written after you've fallen for a concept are rationalization wearing a rubric.

- 3–5 criteria, pulled from the problem statement + the milestone this work serves
- Mark the ONE criterion that dominates (e.g., "persona-faithfulness beats portfolio-thesis-sharpness" — or the reverse; that single ordering usually decides the pick)
- External-reality claims inside criteria ("users prefer X", "market rewards Y") are subject to `craft-critique`'s evidence protocol — load it and apply that protocol; never wave an unevidenced claim into the rubric
- If the goal itself is ambiguous (prototype-for-users vs. portfolio-piece?), surface that as **the decision** — don't silently pick a goal

### Step 5 — Pick: recommend one, human decides

Score against the criteria, then output **one recommendation with reasoning** — never a menu.

**Convergence has two legal moves — name which you're running:**

- **Select the winner** — one candidate's bet dominates the criteria. Take it whole and harvest the losers as layers (the soul + layers move). The *verdict* that anoints a winner is a `craft-critique` judgment — run it through that skill's evidence protocol; don't re-litigate the ranking here.
- **Synthesize across candidates** — no single candidate dominates. The strongest design is A's soul + B's mechanic + C's constraint fused into *one* design. Do not just select a winner: combine the sharpest insight from each option. Synthesis is neither a menu ("here are three, you pick") nor a mushy average — it is one named design carrying an explicit lineage of which part came from where.

**Selection logic:** synthesize when the criteria *split* the candidates (A tops one criterion, B tops another) AND the bets are combinable per "How they relate"; select-whole when one bet dominates or the bets are mutually exclusive. Either move ends the same way — ONE recommendation, ONE reasoning, the human decides. *(The synthesize-don't-only-select move is adapted from Pocock's deprecated design-an-interface — see Sources.)*

If the pick flips depending on an unresolved goal, say exactly that:

> *"Concept A as the soul, carrying B's mechanics and C's discipline. BUT if the real goal tilts toward a portfolio differentiator, B is the sharper thesis. Your call: persona-warmth or thesis-sharpness."*

Record the decision via `write-decision-rationale` (including what-would-change-this). Then hand the winner to `design-interaction-flows` and build.

## Killing your favorite gracefully

The favorite dies more often than you'd like — sometimes after it's fully built. Dinesh's two canonical kills (a widget that tested perfectly and a flawless set-piece, both spec'd by him and killed on sight) are documented in `design-taste` — read them there; do not restate them. The posture this skill takes from them: **a kill is data, not a loss.** Whether a concept *deserves* to die is a `design-taste` / `craft-critique` judgment — defer that verdict, don't restate it here.

The graceful-kill protocol:

1. **Give the favorite the harshest review, not the kindest.** The pull to collect evidence *for* your pet concept is confirmation bias — `name-and-control-bias` owns that bias and its control; load it and apply the control to the favorite. Argue against your pick before you defend it.
2. **Sunk cost is not evidence.** Hours spent building a concept add zero points to its score. "But it works perfectly" answers a question nobody asked if the bet is wrong.
3. **Name what dies in one sentence.** "The draggable widget dies because user-operated cleverness shifts the register" — specific, so the lesson is portable.
4. **Harvest before burying.** What layer of the loser survives into the winner? (Mechanics, a constraint, a single interaction, a phrase.) Most kills are partial.
5. **Write the lesson where taste lives.** If the kill reveals a durable taste rule, it belongs in `design-taste`'s calibration cases — that's how the library learns.
6. **No silent resurrection.** A killed concept returns only with *new evidence*, argued explicitly — and expect no.

## Divergence quality lint

Run before presenting concepts:

- [ ] Crux stated in one sentence
- [ ] Exactly 3 concepts, each a distinct bet (passes the swap test)
- [ ] Each concept carries an *opposing* product priority, not just a different label — divergence is structural, not cosmetic
- [ ] Every concept honors every binding constraint
- [ ] Every concept has a named risk and a "best if the goal is…"
- [ ] No strawman — you could genuinely defend a pick of any of the three
- [ ] Fidelity is Goldilocks-low (bets + behavior sketches, not comps)
- [ ] Convergence criteria written down BEFORE any ranking happened
- [ ] Output ends with ONE recommendation + the open decision, not a menu
- [ ] Convergence move named (select-whole vs. synthesize); if synthesized, the lineage is explicit — which part came from A / B / C
- [ ] "How they relate" names what losers contribute (soul / engine / constraint)

## Worked example (condensed from a real exploration)

Project: conversational shopping on a smart display for first-time online buyers in India. Research synthesized; problem brief done. Binding constraints: voice-first-not-only · one dominant element per screen, readable from 10 feet · error-prevention + undo · a safety gate for risky categories · structural honesty about sponsored items.

**Crux:** how does the agent make the basis of its choice visible, correctable, and grounded — so a buyer who trusts humans over institutions can trust this pick?

**First pass — the failure this catches:** the reflex produced three "friendly AI shopping assistant" variants differing only in mascot and accent color — all silently optimizing *helpfulness*. Swap the visuals between any two and both survive intact: three skins, one bet. The opposing-constraint move forced the repair — hand each concept a genuinely different product priority (people-trust vs. verifiable-reasoning-and-control vs. effortlessness-and-safety) and the structurally distinct bets below fell out. That is the divergence the naive draft never had.

| | Concept A — "Honest Shopkeeper" | Concept B — "Because You Said" | Concept C — "One Thing, One Screen" |
|---|---|---|---|
| **Bet** | Trust comes from *people* | Trust comes from *verifiable reasoning + control* | Trust comes from *effortlessness + safety* |
| **Behavior** | Warm shopkeeper voice; sometimes talks you OUT of a purchase; screen shows real customer voices | Every pick visibly tied to the user's own words (need→attribute chips); say "cheaper" → it re-ranks, not restarts | One question at a time, one confident pick, one plain reason; runner-up offered only sequentially |
| **Why it might win** | Hits the dominant trust mechanism head-on; warmest for elderly first-timers | Most defensible against the persuasion trap; sharpest thesis | Most faithful to accessibility reality; lowest cognitive load |
| **Risk** | Peer proof is the easiest surface to fake; herds to popular-but-wrong items | Chips + re-rank are a literacy burden for a first-timer | Simplicity and transparency are in tension — one unexplained pick is where a persuasion engine hides |
| **Best if goal is** | Most persona-faithful, emotionally resonant prototype | Strongest portfolio thesis on honest AI commerce | Most accessible, humane, "wow that was easy" prototype |

**How they relate:** combinable, not exclusive — B's mechanics are the strongest honesty *engine*, A's peer-voice the strongest emotional *layer*, C's discipline the strongest *delivery constraint*. Picking = choosing the soul.

**Convergence + pick:** *"For this persona, trust is human before it is logical — so Concept A as the soul, carrying B's mechanics and C's simplicity. BUT if the goal tilts toward a portfolio differentiator, B is the sharper thesis. Your call: persona-warmth or thesis-sharpness."* One recommendation, the unresolved goal surfaced as the decision, losers harvested as layers.

## Anti-patterns

| Don't | Do |
|---|---|
| Elaborate the first idea into a "concept" | Force three distinct bets before deepening any |
| Three skins of one idea (same bet, different chrome) | Run the swap test; regenerate until bets differ |
| Hope three distinct bets appear on their own | Force them: hand each concept an opposing product priority up front |
| Two real concepts + one strawman for padding | Every concept must be genuinely pickable |
| Write criteria after seeing which concept you love | Criteria on paper before any ranking |
| Polish concepts to high fidelity before the pick | Goldilocks: written bets + behavior sketches |
| Diverge on constraint compliance ("C skips a11y to be simple") | Constraints bind all concepts equally |
| Present a menu — "here are some options:" | One recommendation + reasoning; the human decides |
| Force one candidate to win whole when the criteria split the field | Synthesize A's soul + B's mechanic + C's constraint into one named design with explicit lineage |
| Defend the favorite with hours-invested ("but it's built and it works") | Sunk cost scores zero; harshest review goes to the favorite |
| Quietly resurrect a killed concept next sprint | Resurrection requires new evidence, argued out loud |
| Explore forever, never converge | Criteria + a named decision-maker + a pick, every time |
| Bury the exploration once the pick is made | The concept sheet IS a deliverable — keep it, show it |

## Output format

```markdown
# 3 Concept Hypotheses — pick one to build
**Process:** research → [you are here: pick 1 of 3] → build. Grounded in <problem brief> + <research>.
**The crux each concept answers differently:** <one sentence>
All three honor the binding constraints: <list them once>.

## Concept A — "<Name>" <emoji>
**Bet: <where the win comes from>.**
- **Behavior:** <one concrete sample line or moment>
- **Why it might win:** <honest best case>
- **Risk:** <named, specific>
- **Best if the goal is:** <goal>

## Concept B — … (same fields)
## Concept C — … (same fields)

## How they relate
<exclusive or combinable; which is soul / engine / constraint>

## Convergence criteria (written before ranking)
1. <criterion — dominant one marked>  2. …  3. …

## Recommendation
<ONE pick + reasoning; if the pick hinges on an unresolved goal, name the fork>
**Decision needed:** <the exact question for the decision-maker>
```

## Sources

- Parallel & iterative design (the 70%-vs-18% case data): https://www.nngroup.com/articles/parallel-and-iterative-design/
- Parallel design: https://www.nngroup.com/articles/parallel-design/
- Iterative design (Nielsen's classic — iteration is post-pick): https://www.nngroup.com/articles/iterative-design/
- Iterative design + prototyping case study: https://www.nngroup.com/articles/case-study-iterative-design-prototyping/
- UX ideation (quantity yields quality; diverge-converge): https://www.nngroup.com/articles/ux-ideation/
- Confirmation bias (the favorite-concept failure mode): owned + cited by `name-and-control-bias` — see its Sources for the NN/g article; not re-cited here, to keep the single source of truth.
- Goldilocks principle (just-enough fidelity to compare): https://www.nngroup.com/videos/goldilocks-principle/
- **Grafted technique — opposing-constraint divergence + synthesize-across-candidates convergence:** adapted from `design-an-interface` ("Design It Twice," *A Philosophy of Software Design*) in **mattpocock/skills**, MIT (© Matt Pocock). **Deprecated upstream.** Original scope was API/interface signatures (assign each sub-agent an opposing constraint; "the best design often combines insights from multiple options"); lifted here to product-concept altitude.

## Boundaries

- `write-problem-statement` owns the entry gate — no divergence before a solution-free problem statement exists.
- `synthesize-research-data` owns need statements + HMW questions — the inputs this skill consumes, never re-derives.
- `facilitate-design-workshop` owns group ideation with humans (design studio, Crazy 8's, dot voting); this skill is the solo/agent-driven concept loop.
- `design-interaction-flows` owns detailing the picked concept into flows and edge cases; `build-coded-prototypes` owns building it.
- `craft-critique` owns the evidence protocol and verdict language used when evaluating concept claims — reference it, never restate it.
- `name-and-control-bias` owns every named bias and its control (confirmation bias included) — the graceful-kill's harsh-review step points there; load it, never restate the bias or its control here.
- `write-decision-rationale` owns the decision record for the pick (including what-would-change-this).
- `design-taste` owns all taste values and the canonical kill stories — load it before any concept with a visual/interaction surface.
