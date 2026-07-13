---
name: build-personas
description: "Builds honest user models from research: picks proto vs qualitative vs statistical personas and states what each type cannot claim, clusters synthesized attributes into 2–4 personas with design-relevant detail only, and writes Jobs-to-be-Done statements when outcomes matter more than segments. Use when the ask is 'create personas', 'build personas from these interviews', 'who are our users', 'define user segments', 'proto-personas', 'write JTBD', 'jobs to be done', or 'should we use personas or JTBD?'. NOT for turning raw data into themes, need statements, or HMWs (synthesize-research-data) and NOT for journey or empathy maps (map-customer-journey)."
---

# Build Personas & Jobs-to-be-Done

Turn synthesized research into user models a team will actually use — and never claim more certainty than the data supports.

## When to use / when NOT to use

| Situation | Skill |
|---|---|
| Themes/attributes from research → personas | **This skill** |
| Deciding personas vs JTBD vs both | **This skill** |
| Writing job statements with success criteria | **This skill** |
| Raw transcripts/notes → themes, need statements, HMWs | `synthesize-research-data` (run it FIRST — this skill consumes its output) |
| Journey maps, empathy maps | `map-customer-journey` |
| Designing the survey for statistical personas | `write-survey` |
| Planning validation research for proto personas | `write-research-plan` |
| Judging whether a persona claim is evidenced | `craft-critique` (this skill applies its protocol) |

**Gate:** if the input is raw data (transcripts, notes), stop and run `synthesize-research-data` first. Personas built straight from raw data skip the coding discipline and inherit the researcher's first impressions.

## The method

### Step 1 — Choose the artifact: personas, JTBD, or both

| Signal in the project | Artifact |
|---|---|
| Multiple genuinely different user groups whose needs conflict | Personas |
| One user type, many contexts and desired outcomes | JTBD |
| Team fixates on demographics or designs for themselves | JTBD first (forces outcome focus), personas later |
| Prioritization fights: "which users do we serve first?" | Personas |
| Feature debates: "what should this actually accomplish?" | JTBD |
| Segments AND outcomes both matter | Personas that reference jobs (they combine cleanly — each persona card lists the job IDs it hires the product for) |

Default when torn: qualitative personas + a short job list. They are compatible, not rivals (NN/g).

### Step 2 — Choose the persona type honestly

```
Do you have ANY primary research data for this product?
├─ NO → PROTO personas.
│   • Build in a 2–4h team workshop from existing beliefs.
│   • Stamp every card: "ASSUMPTION-BASED — unvalidated."
│   • Immediately plan validation research (write-research-plan).
│   • Never show externally or cite as findings.
└─ YES → Qualitative data only (interviews, field studies, 5–30 sessions)?
    ├─ YES → QUALITATIVE personas — NN/g's recommended default for most teams.
    └─ Also have survey/analytics data at n ≥ 100?
        └─ Do you NEED segment sizes (pricing, roadmap bets, exec buy-in
           that demands numbers)?
            ├─ YES → STATISTICAL personas: qual-informed survey of 100–500+,
            │        cluster analysis. Weeks of work — budget for it.
            └─ NO → Stay QUALITATIVE. The statistical upgrade rarely pays
                     for itself when nobody is asking "how many."
```

### The honesty table (state this in the deliverable, verbatim per type)

| Type | Built from | Cost | CAN claim | CANNOT claim |
|---|---|---|---|---|
| **Proto** | Team assumptions, no research | 2–4 h workshop | "This is our shared hypothesis about our users" | Any research grounding; that any real user matches the card |
| **Qualitative** | 5–30 interviews / field studies | Days–weeks | These goals, behaviors, and pains were directly observed in real users | Segment size ("X% of users are like this"); statistical representativeness |
| **Statistical** | Qual-informed survey, n = 100–500+, cluster analysis | Weeks–months | Data-backed clusters AND their relative sizes | Causality; anything the survey didn't ask (it only measures what qual research told you to ask) |

Every persona card carries its type and its CANNOT line. A card without one is a rule violation, not a formatting choice.

### Step 3 — Cluster (qualitative and statistical)

1. **Extract attributes** from the synthesis themes: goals, behaviors, pain points, context of use, attitudes, skill levels. One attribute per sticky/row, tagged with participant IDs.
2. **Cluster** attributes that co-occur in the same participants — cluster by shared behavior and goal, never by demographic.
3. **Merge or eliminate**: clusters that would drive identical design decisions → merge. Clusters irrelevant to the product's decisions → cut. (NN/g: merge/eliminate similar or irrelevant groups.)
4. **Stop at 2–4 personas.** More than 4 means clusters that don't change design decisions survived step 3 — go back and cut. One persona usually means you needed JTBD, not personas.

### Step 4 — Scope and budget

- **Scope** ("just-right personas"): decide whether the set covers one feature, one product, or the whole org — say so on the deliverable. A product-scoped set misused org-wide breeds false confidence.
- **Budget**: match investment to decision stakes. A feature decision deserves a lean one-pager set; a year of roadmap bets can justify the statistical tier. Don't gold-plate a proto set.

### Step 5 — Write with design-relevant detail ONLY

The lint: **"Would any design decision change if this detail changed?" No → cut it.**

| Keep (earns its place) | Cut (decoration) |
|---|---|
| Goals that drive product use | Hobbies, pets, favorite coffee |
| Observed behaviors and workarounds | Invented biography paragraphs |
| Pain points, each tagged with evidence (`[P3, P7]`) | Untagged "pain points" from nowhere |
| Context of use: device, place, time pressure, interruptions | Lifestyle stock-photo vibes |
| Tech comfort, assistive tech, language | Exact age when age changes nothing |
| Verbatim quotes from real sessions (with session ID) | Made-up quotes "in their voice" |
| Segment-relevant constraints (budget authority, privacy sensitivity) | Salary, unless a pricing decision hinges on it |

Build with the team, not for the team — team-based creation is what produces buy-in (NN/g). A persona set authored solo gets admired once and never opened again.

### Step 6 — Write JTBD statements (when outcomes matter)

The drill/hole framing: users don't want a drill, they want a hole. Write the hole.

```
J[n]. When [situation/context], [user] wants to [core task — an outcome verb],
      so they can [why / higher goal].
      Functional success: [checkable outcome — what is true when the job is done]
      Emotional success:  [how they want to feel or be perceived while doing it]
```

Rules:
- **Outcomes, never methods.** No UI, feature, or channel words in a job ("wants to use a mobile app to…" is task analysis wearing a JTBD costume).
- **What + why + both success criteria** — a job missing its emotional criterion is half a job; emotional stakes decide adoption as often as function does.
- **Separate main jobs from related jobs.** The main job is why they hire the product; related jobs are adjacent (keep the list honest and short).
- Jobs are stable over years; solutions churn. If a "job" would expire with the next redesign, it was a task, not a job.

### Step 7 — Label, ship, and keep alive

- Stamp type + CANNOT line on every card (Step 2 table).
- Run every factual claim on the cards through `craft-critique`'s evidence protocol — cite, get, or flag. No exceptions for "it's just a persona."
- Put the set to work: in design reviews, decisions name which persona/job they serve. A persona never cited in a decision within a month is dead weight — cut it or fix it.

## Worked example — booking app for a hair-replacement salon

Input: 9 interviews synthesized via `synthesize-research-data` into themes around privacy, first-visit anxiety, and repeat-visit efficiency. Two clusters survived merge/eliminate (a third, "walk-in bargain hunters," was cut — it drove zero distinct design decisions).

```markdown
## Persona 1 of 2 — The Discreet First-Timer
**Type:** Qualitative — built from n=9 interviews.
CANNOT claim segment size; we do not know what share of clients this is.

**Goal:** Get a consultation booked without anyone in his life finding out
he's considering a hair system.
**Behaviors:** Researches late at night on his phone [P2, P5, P8]; abandons
forms that ask for a phone number before showing prices [P5, P8]; books only
when a private consultation room is explicitly mentioned [P2].
**Pain points:** Fear of a receptionist calling back while he's at work
[P5, P8]; photos of other clients on booking pages read as a privacy
threat, not social proof [P2, P8].
**Context of use:** Mobile, at home, after 10pm; single session, no saved
account wanted.
**Jobs hired:** J1.
**Quote (P8):** "I closed the tab the second it asked to text me."

## Jobs
J1. When exploring a sensitive personal service for the first time, the
    prospective client wants to reach a booked consultation while revealing
    as little identifying information as possible, so he can decide in
    private whether this is for him.
    Functional success: consultation booked with only the minimum contact
    detail he chooses.
    Emotional success: feels in control of who knows; never feels exposed.

J2. When his replacement schedule comes due, the returning client wants to
    rebook his usual service in under a minute, so he can keep the routine
    invisible in a busy week.
    Functional success: rebooked without re-entering known details.
    Emotional success: feels like a regular, not a new customer.
```

**What the first draft got wrong (each caught before ship):**
- `~60% of clients are privacy-driven` → deleted: n=9 qualitative cannot size a segment — that number is exactly what the CANNOT line forbids.
- `Mark, 34, enjoys weekend cycling` → cut: age and hobby change no design decision (Step 5 lint).
- `J1: wants a discreet booking app` → rewritten to an outcome: "an app" is a solution; the job is reaching a booked consultation while revealing minimal identity.

What survived: type + CANNOT line up top, every pain point evidence-tagged, no biography filler, jobs written as outcomes (no "app," no "form"), emotional criteria present, and the cut cluster documented instead of silently dropped.

## Anti-patterns / red flags

| Red flag | Why it fails | Fix |
|---|---|---|
| The persona wall (5, 7, 12 personas) | Nobody can hold them; none get used | Merge/eliminate back to 2–4 |
| "Millennial Mary" demographic buckets | Demographics rarely predict behavior; goals and behaviors segment users | Re-cluster on behavior + goal |
| Proto persona laundering | Assumption cards presented as research findings — the worst honesty failure this skill guards against | Stamp ASSUMPTION-BASED; plan validation |
| "60% of our users are like this" from n=8 | Qualitative data cannot quantify | Statistical tier or delete the number |
| Decorative biography | Details that change no decision train the team to ignore the card | Run the Step 5 lint |
| Invented quotes | Fabricated evidence; fails the evidence protocol | Verbatim from sessions, with ID — or no quote |
| Personas as deliverable theater | Created, laminated, never cited again | Decisions name the persona/job they serve (Step 7) |
| Solution-shaped jobs ("wants a dashboard to…") | Prescribes method; expires with the redesign | Rewrite as outcome; check for feature words |
| Solo-authored persona set | No team buy-in; rejected on contact | Build in a team workshop |
| Skipping synthesis, building from memory of the interviews | First impressions ≠ coded findings | `synthesize-research-data` first, always |

## Output format

Deliverable: one markdown doc per persona set.

```markdown
# [Product] — User Models ([date])
**Type:** Proto / Qualitative / Statistical — [data basis, n=X]
**This set CAN claim:** [from honesty table]
**This set CANNOT claim:** [from honesty table]
**Scope:** [feature / product / org]

## Persona 1..N of [2–4]   (cards per the worked example)
## Jobs (J1..Jn, main vs related separated)
## Cut clusters — [name] cut because [drove no distinct design decision]
## Validation plan — [proto only: link to research plan]
```

## Sources

- Persona types (proto / qualitative / statistical): https://www.nngroup.com/articles/persona-types/
- Personas — creation process: https://www.nngroup.com/articles/persona/
- Persona scope ("just-right personas"): https://www.nngroup.com/articles/persona-scope/
- Persona budgets: https://www.nngroup.com/articles/persona-budgets/
- Personas study guide: https://www.nngroup.com/articles/personas-study-guide/
- Personas vs Jobs-to-be-Done: https://www.nngroup.com/articles/personas-jobs-be-done/
- JTBD vs personas (video): https://www.nngroup.com/videos/jobs-be-done-vs-personas/

## Boundaries

- **Upstream:** `synthesize-research-data` owns raw-data → themes, need statements, and HMWs. This skill consumes its themes/attributes and owns the persona + JTBD artifacts.
- **`map-customer-journey`** owns journey and empathy maps. A persona can anchor a journey map, but the map lives there.
- **Evidence claims are handled per `craft-critique`'s evidence protocol** — cite, get, or flag; this skill never restates the protocol.
- **`write-survey`** owns the survey instrument for the statistical tier; **`use-quantitative-evidence`** owns the statistics discipline behind any "X% of users" claim.
- **`write-research-plan`** owns the validation study a proto set must schedule.
