---
name: map-customer-journey
description: "Builds research-time experience maps: NN/g 5-component journey maps (evidence-fed lanes + emotion line) and Says/Thinks/Does/Feels empathy maps, plus the cheat-sheet decision for choosing between journey map, experience map, service blueprint, and user story map. Use when asked to 'map the customer journey', 'make a journey map', 'build an empathy map', 'map the experience end to end', 'where do users struggle across the journey', or 'which mapping method do we need'. NOT for user flows, task flows, or screen-to-screen paths — that is design-interaction-flows."
---

# Map Customer Journey

Turn synthesized research into a journey map or empathy map whose every cell traces to evidence — a decision tool with an opportunities row, not wall art.

## When to use / when NOT to use

**Use when:**
- Research is synthesized (themes exist) and the team needs a shared picture of the experience over time
- Stakeholders disagree about where the experience breaks — the map adjudicates with evidence
- You need to prioritize where to invest next across phases/touchpoints
- You need a fast empathy snapshot of one user type before, during, or after a study

**Do NOT use when:**
- You're mapping steps/decisions through a feature you're building → `design-interaction-flows` (design-time). Rule of thumb: emotion lane = this skill; decision diamonds = that skill.
- Raw notes aren't synthesized yet → `synthesize-research-data` first; its themes feed these lanes.
- You need the actor definition itself → `build-personas`; a journey map consumes a persona, it doesn't create one.
- You're planning an Agile backlog by feature slices → user story map; that's sprint planning, not this skill.

## Step 0 — Choose the right artifact (UX Mapping Cheat Sheet)

```
What are you actually mapping?
├── One user type's head — says/thinks/does/feels, NO timeline
│   └── EMPATHY MAP (method B below)
├── A specific actor pursuing a goal WITH your product, over time
│   └── JOURNEY MAP (method A below)
├── General human behavior in a domain, product-agnostic
│   └── EXPERIENCE MAP — use method A with a generic actor; title it honestly
├── The business machinery BEHIND the touchpoints (staff, systems, handoffs)
│   └── SERVICE BLUEPRINT — journey map's backstage counterpart; same phases,
│       lanes become frontstage/backstage/support processes
├── Features to build, sliced into releases
│   └── USER STORY MAP → out of scope (Agile planning artifact)
└── Screens, steps, branches inside one feature
    └── STOP → design-interaction-flows
```

| Artifact | Actor | Timeline | Product-specific | Cheapest moment |
|---|---|---|---|---|
| Empathy map | One user type | No | Either | Early discovery, or live during sessions |
| Journey map | One persona | Yes (phases) | Yes | After synthesis |
| Experience map | Generic human | Yes | No | Before you have a product/persona |
| Service blueprint | The organization | Yes | Yes | After a journey map exposes broken touchpoints |

If two artifacts seem right, build the cheaper one first (empathy map < journey map < service blueprint).

## Method A — Journey map (NN/g 5 components)

### A0. Two pre-decisions (make them out loud, before drawing)

1. **Current-state or future-state?** Current-state = how it is today (diagnose pain). Future-state = how it should be (align on a vision). Never mix on one map.
2. **Research-first or assumption-first?** Assumption-first is legitimate as a hypothesis workshop — but the artifact is an **assumption map** until validated. Title it "ASSUMPTION MAP — unvalidated" and treat every cell per `craft-critique`'s evidence protocol (flag, then get the data).

### A1. Run the 5-step process

1. **Aspiration & allies** — write the business question the map must answer (one sentence) and recruit the stakeholders who own the touchpoints. A map nobody asked for changes nothing.
2. **Internal investigation** — inventory existing evidence: interview transcripts, analytics, support tickets, chat logs, reviews, prior studies. Most lanes fill from data you already have.
3. **Assumption formulation** — draft the hypothesis map fast. Its job is to expose what you don't know.
4. **External research** — fill only the gaps the draft exposed. Match method to lane (table in A3).
5. **Narrative visualization** — build the final artifact using the 5 components below.

(Running step 3 as a room-of-stakeholders session → `facilitate-design-workshop` owns the facilitation.)

### A2. Assemble the 5 components, in this order

1. **Actor** — ONE persona/user type per map. Two actors = two maps. Pull from `build-personas`; name them at the top left.
2. **Scenario + expectations** — one concrete goal-driven situation ("first-time visitor books a consultation"), plus what the actor expects at each phase. Expectations are what the emotion line gets measured against.
3. **Journey phases** — 3–7 stages derived from the actor's experience, NOT from your org chart or funnel (Awareness/Consideration/Conversion is marketing's frame, not the user's). Name phases in the actor's language.
4. **Actions / Mindsets / Emotions lanes** — the evidence-fed core. Per phase: what they do, what they think/ask, how they feel. **Emotion is a single line** plotted across all phases; every peak and valley gets an annotation naming its cause and its evidence source.
5. **Opportunities** — the payoff row. Each opportunity: insight + owner + metric to move. A map without an opportunities row is decoration.

### A3. Evidence-feed the lanes (which data fills which lane)

| Lane | Best evidence | Acceptable | Never |
|---|---|---|---|
| Actions | Analytics, field observation, contextual inquiry, logs | Interview recall | Team brainstorm presented as data |
| Mindsets | Interview quotes, diary entries, support/chat transcripts | Survey open-ends | Invented inner monologue |
| Emotions | Diary studies, interviews (feelings named + context), satisfaction data per touchpoint | Session recordings (tone, hesitation) | A smooth wave drawn to look dynamic |

**Hard rule:** every cell carries a source tag — `[P3 interview]`, `[chat logs]`, `[analytics]` — or the assumption flag `[⚠ assume]`. Claims handling is per `craft-critique`'s evidence protocol; do not restate it, apply it. Three or more `⚠` in one lane = you have a research gap, not a map.

## Method B — Empathy map (Says / Thinks / Does / Feels)

**One user per map.** Aggregate only after individual maps exist and cluster.

Quadrant rules:
- **Says** — verbatim quotes only. No paraphrase. Quote marks mandatory.
- **Thinks** — unvoiced thoughts. These are inferences; tag each `[inferred from …]`.
- **Does** — observed actions only (from recordings, field notes, logs). Not what they said they do.
- **Feels** — emotion as **adjective + context**: "anxious — first time discussing a sensitive personal concern," never just "anxious."

The 6-step build:
1. Define scope + goal — which user, which situation, what decision the map serves
2. Gather materials — whiteboard/FigJam template, the research artifacts
3. Collect research — transcripts, recordings, notes for THIS user
4. Individual sticky generation — each contributor fills quadrants alone (prevents anchoring)
5. Converge and cluster — merge duplicates, name clusters inside each quadrant
6. Polish and plan use — date it, source it, state what decision it feeds

Choose the timing mode: **before** research (surface team assumptions — label the map as assumptions), **during** (live capture in sessions), **after** (communicate findings).

**Read the map, don't just make it:**
- Empty or thin quadrant = research gap. Name it and feed it into the next study plan.
- **Says vs. Does contradiction = a finding**, often the most valuable one on the map (say-vs-do gap). Write it down explicitly.

## Worked example — journey map (current-state, research-first)

Context: a salon booking app with a live AI chatbot and a booking flow in beta. The salon offers a sensitive, appearance-related service where first-time clients care deeply about discretion. Evidence tags reference example study data.

```
JOURNEY MAP — current-state
Business question: Where do first-time clients stall before their first consultation?
ACTOR: "First-time client" persona (30s, researching the service for months, high privacy concern)
SCENARIO: Decides they finally want to address the concern; wants a consultation without anyone knowing.
EXPECTATION: Discreet, judgment-free, fast answers about cost and how natural the result looks.
```

| | Realize | Research | First contact | Consultation | Decide |
|---|---|---|---|---|---|
| **Actions** | Photographs the area of concern; googles "the service vs alternatives" [P1,P4 interviews] | Watches videos; lurks forums; compares salons [P2,P5] | Opens site chatbot at 11pm; asks price + "will it look natural" [chat logs] | Visits salon; sees a live result up close [field obs] | Compares quote vs the alternative's cost; asks partner [P4] |
| **Mindsets** | "Is this bad enough to do something?" [P1] | "Everyone online looks like an ad — who's real?" [P5] | "I don't want to give my name yet" [chat logs — 3 of 5 declined contact form] | "Will maintenance own my schedule?" [P2, field obs] | "If it fails I've told people for nothing" [P4] |
| **Emotions** | anxious ↓ [P1,P4] | skeptical ↓↓ trust bottom — no credible before/afters [P2,P5] | relieved ↑ — instant anonymous answers [chat logs] | hopeful ↑↑ after seeing a live result [field obs] | torn → [⚠ assume — no post-quote interviews yet] |
| **Opportunities** | — | Real-client proof gallery. Owner: salon owner. Metric: research→contact rate | Keep chat anonymous until user offers contact. Owner: product team (chatbot). Metric: chat→booking rate | Maintenance-cost one-pager at consult. Owner: salon staff. Metric: consult→quote acceptance | Follow-up study first: interview 5 post-quote non-buyers [research gap] |

Emotion-line annotations: valley at **Research** (evidence: P2, P5 — "couldn't tell real results from marketing"); peak at **Consultation** (field obs: seeing a live result up close). The **Decide** cell stays `⚠` — so the final opportunity is a study, not a redesign. That is the honest move.

## Pre-ship lint (run before showing the map)

- [ ] One actor, one scenario, one state (current OR future) per map
- [ ] 3–7 phases, named in the actor's language, not funnel-speak
- [ ] Every cell has a source tag or `[⚠ assume]` — zero untagged cells
- [ ] Emotion line: every peak/valley annotated with cause + evidence
- [ ] Opportunities row exists; every opportunity has owner + metric
- [ ] ≥3 `⚠` in a lane → output includes the research plan to close the gap
- [ ] Assumption-first map is titled "ASSUMPTION MAP — unvalidated"
- [ ] No screens, wireframes, or decision diamonds anywhere on it
- [ ] Empathy map: quotes verbatim in Says; inferences tagged in Thinks; Says-vs-Does contradictions called out

## Anti-patterns

| Don't | Why it fails | Do instead |
|---|---|---|
| "The customer" as actor doing everything | Averaged actor = no real person's journey; lanes contradict | One persona per map; split into multiple maps |
| Phases named Awareness/Consideration/Conversion | That's the org's funnel, not the user's experience | Derive phases from what the actor is doing/feeling |
| Workshop opinions shipped as research | Assumption map wearing a research costume | Title it as assumptions; validate before decisions ride on it |
| Smooth decorative emotion wave | Emotion line is data, not styling | Plot only evidenced points; annotate cause per point |
| Beautiful map, no opportunities row | Wall art; changes nothing | Opportunity = insight + owner + metric, every time |
| Wireframes/user flows embedded in the map | Wrong altitude — design-time content in a research artifact | Route flows to `design-interaction-flows` |
| Aggregated empathy map from the start | Averages erase the contradictions that ARE the findings | Individual maps first; aggregate what clusters |
| Mapping internal handoffs on a journey map | Wrong artifact for backstage machinery | Service blueprint |
| One mega-map, current + future state combined | Diagnosis and vision blur; neither is decidable | Two maps, explicitly labeled |
| Map made once, never revisited | Journeys drift; stale map misleads with authority | Date it; re-validate when the product or market shifts |

## Output format

Produce a markdown artifact with:

1. **Header block** — map type + state (e.g. "Journey map — current-state, research-first"), business question, date, evidence corpus listed (what studies/data fed it)
2. **Actor + scenario + expectations** — 3 lines
3. **The lane table** — phases as columns; Actions / Mindsets / Emotions / Opportunities as rows; source tag in every cell
4. **Emotion-line annotations** — bullet per peak/valley: phase, direction, cause, evidence
5. **Opportunities list** — expanded: insight → owner → metric → supporting evidence
6. **Research gaps** — every `⚠` cell rolled into next-study recommendations

For empathy maps: four quadrant lists around a named user, timing mode stated, gaps + Says-vs-Does contradictions as a closing "Findings" section.

## Sources

- Journey mapping 101 (5 components) — https://www.nngroup.com/articles/journey-mapping-101/
- The 5-step journey-mapping process — https://www.nngroup.com/articles/customer-journey-mapping-process/
- Journey-mapping approaches (2 pre-decisions) — https://www.nngroup.com/articles/journey-mapping-approaches/
- Research methods for journey mapping (which data feeds which lane) — https://www.nngroup.com/articles/research-journey-mapping/
- UX mapping methods cheat sheet — https://www.nngroup.com/articles/ux-mapping-cheat-sheet/
- Empathy mapping (4 quadrants, 6 steps) — https://www.nngroup.com/articles/empathy-mapping/
- Using empathy maps (timing modes, reading gaps) — https://www.nngroup.com/articles/using-empathy-maps/

## Boundaries

- **`design-interaction-flows`** owns design-time feature/task flows, wireflows, and edge-case enumeration. This skill owns research-time experience mapping (journey/empathy maps: phases, emotions, cross-channel). If the artifact has an emotion lane, it belongs here; if it has decision diamonds, it belongs there.
- **`synthesize-research-data`** owns themes and coded data; this skill consumes them as lane evidence.
- **`build-personas`** owns the actor; this skill consumes a persona, never invents one mid-map.
- **`craft-critique`** owns the evidence-discipline protocol; the `[⚠ assume]` flag applies it here without restating it.
- **`facilitate-design-workshop`** owns running a journey-mapping workshop session; this skill owns the artifact and its rules.
