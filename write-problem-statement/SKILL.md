---
name: write-problem-statement
description: "Writes a single, solution-free problem statement and derives a scoped, timeboxed discovery plan from it (discovery goals + research questions + solution icebox). Use at the START of any project, feature, or client engagement — when the user says 'write a problem statement', 'frame this problem', 'what problem are we actually solving', 'kick off this project', 'scope the discovery', or when someone arrives holding a SOLUTION ('we need a chatbot / an app / a redesign') and the underlying problem is unstated. This is the entry gate for every project: if no problem statement exists yet, load this skill before any research, design, or build skill."
---

# Write Problem Statement

One problem, stated without a solution, that scopes and timeboxes the discovery that follows. No project starts without one.

## When to use / when NOT to use

**Use when:**
- A project, feature, or client engagement is starting and nobody has written down the problem
- A stakeholder brings a solution ("build an AI chatbot", "redesign the homepage") — reverse-engineer the problem first
- Discovery feels unbounded, or the team is researching without knowing what decision the research must enable
- Two people describe "the problem" differently — the statement is the alignment artifact

**Do NOT use when:**
- You have research data and need need-statements or How-Might-We questions → **synthesize-research-data** owns those (they are Define-stage outputs, produced AFTER research — not before)
- You need the full research plan (methods, participants, logistics) → **write-research-plan**; this skill only hands it the research questions
- You're deciding WHICH business problem deserves attention (sizing, risk-reward, feasibility) → **identify-business-problems**
- You're interviewing stakeholders to surface business goals → **conduct-stakeholder-interviews** (its output is often this skill's input)
- You're judging whether an existing statement's claims hold up → **craft-critique**

**Pipeline position:** write-problem-statement → (conduct-stakeholder-interviews / conduct-business-research feed evidence) → write-research-plan → research → synthesize-research-data (need statements, HMW) → ideation.

## The method

### Step 1 — Capture the raw ask; strip every solution into the Icebox

- Write down the request exactly as received, verbatim.
- Every solution idea in it — feature names, technologies ("AI", "app", "chatbot"), verbs like *redesign, add, build, migrate* — moves to the **Icebox**: a parked list, verbatim, with who said it and when.
- Never delete or argue with a stakeholder's solution. Deleting makes people defensive; iceboxing says "this stays on the table — after discovery." Icebox items re-enter at ideation, competing on equal footing with what discovery surfaces.

### Step 2 — Ladder from solution to problem

If the ask was a solution, ask up to five times: **"What does that solve, for whom, and how do we know?"**

- Each answer moves one level up. STOP at the first level that is an **observable problem** — something a user or the business demonstrably suffers.
- Gone too far if the answer is a platitude that fits any company ("grow revenue", "delight users"). Step back down one level.
- If nobody can answer "how do we know?" at any level, that gap is real: the problem is a **hypothesis** (see Step 3).

### Step 3 — Audit the evidence

Run every factual claim behind the problem through **craft-critique's evidence-discipline protocol** (cite it / get it / flag it) — do not restate the protocol, load that skill.

- Hard evidence exists (analytics, exported logs, support tickets, prior research findings) → status is **Evidenced**. Name each source.
- Only unverified stakeholder estimates or anecdote (e.g. "front desk thinks ~15 missed calls/day") → that is a claim, not evidence. Status is **Hypothesis (under-evidenced)**, and discovery's FIRST goal becomes "confirm the problem exists at meaningful scale." The statement must say so; note the one data pull that would confirm it.
- Never silently upgrade a hypothesis to a fact because it sounds plausible, or because a stakeholder stated it confidently.

### Step 4 — Draft with the 5 Ws (NN/g construction)

Answer all five before compressing:

| W | Question | Trap to avoid |
|---|---|---|
| **Who** | Which specific users/segment suffer this? | "Users" / "everyone" — name the segment |
| **What** | Current state vs. desired state — what's the gap? | Describing the missing feature instead of the gap |
| **Where** | Where in the journey/channel does it appear? | Naming a UI component (that smuggles in a solution) |
| **When** | When does it occur, how often, since when? | "Always" without evidence |
| **Why** | Why does it matter — user pain AND cost of doing nothing? | Only the business cost, or only the user pain |

### Step 5 — Compress to 2–4 sentences

Shape: **[Who] experiences [gap between current and desired state] [where/when]. Evidence: [source or "hypothesis"]. If unaddressed, [consequence for user and business].**

Then run the lint checklist below. Fix every failure before moving on.

### Step 6 — Derive the discovery scope from the statement

The statement is not the deliverable — the scoped discovery is. Derive, in order:

1. **Discovery goals (2–4).** What must be TRUE or KNOWN at the end. If status is Hypothesis, goal #1 is always "confirm/refute that the problem exists and matters."
2. **Research questions (3–5).** Questions the TEAM must answer — they are NOT interview questions you'd ask a participant. ("Why do first-time bookers abandon?" is a research question; "Why did you abandon?" is an interview question — that translation belongs to **write-research-plan**.)
3. **Timebox.** Set an end date BEFORE starting. Guidance: known product, one feature area → 1–2 weeks; new problem space or new user segment → 3–6 weeks. A discovery without an end date is a research hobby. At the deadline, decide with what you have or explicitly re-scope — never silently extend.
4. **The exit decision.** Name the single decision discovery must enable ("go/no-go on entering this problem space", "which of the three journey stages to design for"). Discovery that enables no decision is theater.
5. **Out of scope.** One line naming what this discovery will NOT investigate. Prevents scope creep on day 3.

### Step 7 — When the problem feeds a spec you'll build: map seams, name what's out (situational)

Skip this if you're only framing a problem for others to research. Run it when the statement becomes the front of a spec you will build yourself (your own product specs) — it turns the problem into a scoped, testable surface without baking in a solution.

- **Map the seams.** List the product surfaces any solution would have to touch — existing screens, flows, channels, data contracts, integrations. A **seam** is a boundary where a change plugs in and gets tested. Derive seams from the **Where/When** Ws, never from a chosen solution.
- **Prefer existing seams; count the new ones.** The fewer NEW seams a solution must open, the smaller its blast radius and the easier it is to test — ideal is one. Extend a surface that already exists before inventing one. A problem solvable only by opening many new seams is mis-scoped, or is several problems — send it back to the Goldilocks test.
- **This is an annex, not the statement.** Seams name the SURFACE the problem lives on, never the solution. If naming a seam forces a feature name ("the chatbot"), you've drifted — pull back to the surface ("the booking channel"). The statement itself stays solution-free.
- **Write the problem-level out-of-scope LIST.** Distinct from Step 6's discovery out-of-scope line (what research won't investigate), this names what the PROBLEM/spec itself does NOT include: adjacent problems, user groups, surfaces, channels deliberately held out. Naming a seam you will NOT touch is the cheapest scope-creep insurance there is — the discipline `name-and-control-bias` runs on claims ("a bias that can't touch the claim is noise"), applied here to surfaces: a surface the problem can't reach is out of scope, so state it.

## Altitude check (Goldilocks test)

Run before finalizing:

- **Too broad** if it contains more than one user group + problem pair, or could headline any company's kickoff ("the experience is confusing"). → Split it: one statement per problem; pick ONE for this discovery (send the ranking question to **identify-business-problems**).
- **Too narrow / solution-shaped** if it names a screen, component, feature, or technology ("the booking form has too many fields"). → Ladder up one level (Step 2): what does the user fail to accomplish?
- **Just right** if a team could imagine 5+ different solutions to it, yet one discovery could investigate it end-to-end within the timebox.

## Lint checklist (every box, every time)

- [ ] Exactly ONE problem — no "and also", no compound sentences hiding a second problem
- [ ] Zero solution words — no feature names, no technologies, no *redesign/add/build/integrate*
- [ ] Zero assumed causes — "because the nav is confusing" is a cause claim; either it carries evidence or it moves to the research questions
- [ ] Who is affected is named specifically — a segment, not "users"
- [ ] Consequence states BOTH the user pain and the cost of doing nothing
- [ ] Status labeled: **Evidenced** (sources named) or **Hypothesis (under-evidenced)** — per craft-critique's protocol
- [ ] Passes the Goldilocks test above
- [ ] Icebox exists and holds every solution idea mentioned so far, verbatim
- [ ] Discovery has goals, research questions, a timebox with an end date, an exit decision, and an out-of-scope line
- [ ] A stakeholder with zero context could read the statement and describe the problem back correctly
- [ ] If it feeds a spec you'll build: seams mapped from Where/When (not from a solution), NEW-seam count named and minimized
- [ ] Problem-level out-of-scope LIST exists (adjacent problems / user groups / surfaces held out) — separate from the discovery out-of-scope line

## Worked example (fictional client scenario)

**Raw ask (verbatim):** "My competitor has an AI chatbot on their site. I want one too — can you build it?" — salon owner, kickoff call.

**Step 1 — Icebox:** `AI chatbot on website (owner, kickoff call)`.

**Step 2 — Ladder:** *What would the chatbot solve?* → "People call to book and we miss calls." → *What does that solve?* → "Missed calls are missed bookings — front desk estimates ~15 missed calls a day, most during service hours." → *What does that solve?* → "Revenue." ← platitude; step back down. **Observable problem found at level 2:** prospective clients who try to book during service hours often can't reach anyone, and there is no other way to book.

**Step 3 — Evidence audit:** "~15 missed calls/day" = stakeholder-reported, unverified → flag: *under-evidenced — call log export would confirm.* "Most callers want to book" = assumption → research question. Status: **Hypothesis (under-evidenced)** with one confirmable data pull.

**Step 4 — 5 Ws:** Who: prospective clients booking a first appointment by phone. What: want to book; can't reach anyone; no alternative channel. Where: phone, during service hours. When: daily, worst at peak hours. Why: client books elsewhere the same day (user pain: blocked task; business pain: lost booking to a competitor).

**Step 5 — Statement (v1, fails lint):** ~~"The salon needs an automated booking channel because the front desk can't answer calls."~~ → "needs an automated channel" embeds a solution; "because the front desk can't" assumes the cause.

**Statement (final):**
> Prospective clients who phone the salon during service hours frequently reach no one and have no other way to book, so many book elsewhere the same day. Evidence: front-desk reports of ~15 missed calls/day (under-evidenced — call logs pending). If unaddressed, first-time clients are lost at the moment of highest intent, directly to competitors.

**Step 6 — Discovery scope:**
- **Goals:** (1) Confirm missed-call volume and what share are booking attempts. (2) Understand how prospective clients currently try to book and where they give up. (3) Map which alternatives (competitors, walk-ins) capture the lost bookings.
- **Research questions:** Why do prospective clients choose phone over other channels? What do callers do after an unanswered call? At which times/segments is the loss concentrated? What would make a non-phone booking path trustworthy to this clientele?
- **Timebox:** 2 weeks (known business, one journey stage). **Exit decision:** whether the problem justifies building a new booking channel at all — and if so, which journey moment it must serve. **Out of scope:** retention of existing clients; pricing.
- **Icebox carried forward:** AI chatbot (owner). Competing on equal terms at ideation.
- **Seams & scope (spec mode).** If this fronted a build spec, the seams a solution would touch: the salon's existing Google Business listing and the existing phone line (both existing), plus at most one NEW seam for booking confirmation. Prefer a booking link on the existing listing (zero new seams) over a chatbot (a new seam) — exactly what the icebox note below plays out. **Out of scope (problem-level):** existing-client rebooking, staff scheduling, the payment flow — named now so the spec can't quietly grow a second problem.

Note what the icebox did: the owner's chatbot idea survived intact, but discovery may surface that an online booking link in the Google listing solves the same problem — a solution the statement left room for and "build me a chatbot" would have foreclosed.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| Solution baked into the statement ("users need a dashboard") | Forecloses every other solution before discovery | Ladder up to what the user can't accomplish; park the dashboard in the icebox |
| Two problems glued with "and" | Discovery can't scope; research questions sprawl | Split; run ONE; rank the rest via identify-business-problems |
| Assumed cause stated as fact ("because onboarding is confusing") | Discovery becomes confirmation of a guess | Move the cause to a research question |
| Statement written AFTER the solution was chosen | Retro-fitting: the statement is decoration, not a gate | Refuse to backfill; write it honestly and re-open the icebox |
| Discovery run to validate the pet solution | Confirmation bias — NN/g's countermeasure is multiple data sources and actively seeking disconfirming evidence | Goal #1 becomes "refute", not "confirm"; the exit decision must allow "no" |
| No timebox / "we'll research until we understand" | Unbounded discovery burns weeks with no decision | End date before day 1; decide or explicitly re-scope at the deadline |
| Research questions written as interview questions | Team-level unknowns get skipped; guides go leading | Keep them team-facing; translation is write-research-plan's job |
| "Users" / "everyone" as the who | Unfalsifiable and unscopable | Name the segment; if you can't, that's research question #1 |
| Stakeholder solutions dismissed in the meeting | Defensive stakeholders relitigate the problem forever | Icebox verbatim with attribution; guarantee re-entry at ideation |
| Seam map names a feature ("add a chatbot seam") | Smuggles a solution back into a solution-free frame | Name the SURFACE ("the booking channel"), never the feature |
| No out-of-scope list — "we'll handle the edges later" | Scope creeps on day 3; the spec grows a second problem | Write the problem-level out-of-scope list up front; name what's held out |

## Output format

```markdown
# Problem Statement — [project name]
**Date:** · **Author:** · **Status:** Evidenced | Hypothesis (under-evidenced)

## Statement
[2–4 sentences: who + gap + where/when + evidence status + consequence]

## Evidence
- [Claim] → [source, date] | under-evidenced — [what would confirm it]

## Icebox (solutions parked, verbatim)
- "[idea]" — [who, when]

## Discovery scope
- **Goals (2–4):**
- **Research questions (3–5)** (team-facing — NOT interview questions):
- **Timebox:** [start → end date]
- **Exit decision:** [the one decision this discovery enables]
- **Out of scope:**

## Seams & scope (only when this feeds a spec you'll build)
- **Seams touched** (prefer existing; count NEW): [surface] — existing | NEW
- **Out of scope (problem-level):** [adjacent problems / user groups / surfaces / channels excluded]
```

## Sources

- Problem Statements in UX Discovery — https://www.nngroup.com/articles/problem-statements/ (one problem, no embedded solution, scopes the discovery; 5 Ws construction)
- The Discovery Phase in UX Projects — https://www.nngroup.com/articles/discovery-phase/ (discovery mindset: validate AND discard assumptions; clear problem statement as precondition)
- Confirmation Bias in UX — https://www.nngroup.com/articles/confirmation-bias-ux/ (multiple data sources vs. a pet hypothesis; seek disconfirming evidence)
- User Need Statements — https://www.nngroup.com/articles/user-need-statements/ (the Define-stage sibling artifact — owned by synthesize-research-data)
- How-Might-We Questions — https://www.nngroup.com/articles/how-might-we-questions/ (post-research ideation framing — owned by synthesize-research-data)
- **Seam-minimization + explicit out-of-scope discipline** (Step 7) grafted from **`to-spec`** — mattpocock/skills, MIT (© Matt Pocock). Adopted: prefer existing seams, minimize new ones (ideal is one), and an explicit Out-of-Scope section. Not adopted: its issue-tracker publish step and interview-free spec synthesis — this skill stays a solution-free problem gate.

## Boundaries

- **synthesize-research-data** owns need statements and How-Might-We questions — those are Define-stage outputs built FROM research data. This skill runs BEFORE research and never produces them.
- **write-research-plan** owns the research plan (methods, participants, guides). This skill hands it discovery goals + research questions and stops.
- **identify-business-problems** owns choosing and sizing WHICH problem to pursue (opportunity, risk-reward, feasibility). This skill frames one already-chosen problem.
- **conduct-stakeholder-interviews** and **conduct-business-research** feed this skill's evidence step; they own how that evidence is gathered.
- **craft-critique** is the single source of the evidence-discipline protocol referenced in Step 3 — cite it, never restate it.
- The **seam map + problem-level out-of-scope** (Step 7) is a scoping annex at problem altitude — it names surfaces, never designs the solution or writes the technical spec. The full build spec and test implementation live downstream in the engineering work, not in this skill.
