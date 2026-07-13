---
name: conduct-stakeholder-interviews
description: "Plans and runs stakeholder interviews for a new project or client engagement: identifies who to interview, builds a business-goals discussion guide (success metrics, definitions of failure, political context), maps stakeholders on a Mendelow power-interest matrix with an attitude overlay, and produces a communication plan. Use when starting a discovery or freelance client engagement — 'kick off with the client', 'who should I talk to before designing', 'interview the stakeholders', 'what does the business actually want', 'map the stakeholders', 'the client and their team want different things', or before writing any research plan or proposal. NOT for interviewing users (conduct-user-interview) or writing user-facing question guides (write-interview-guide)."
---

# Conduct Stakeholder Interviews

Enter any project knowing what the business wants, how success and failure are defined, who holds power, and who will block you — before a single screen is designed.

## When to use / when NOT to use

**Use when:**
- Starting a discovery phase or a freelance client engagement — this is the entry point, before user research
- A new stakeholder appears mid-project and you need to place them
- Stakeholders visibly disagree and you need the conflict on paper
- Building the update/communication plan for a multi-stakeholder project

**NOT for:**
- Interviewing users or customers → `conduct-user-interview` (live technique) and `write-interview-guide` (question craft)
- Desk research on the market or competitors → `conduct-business-research`
- Turning what you learn into the framed problem → `write-problem-statement`
- Scoping and pricing the engagement afterward → `write-client-proposal`

Per NN/g, stakeholder interviews are the most common discovery activity alongside user interviews. If you skipped them, the project is running on assumptions about the business, not just about users.

## The four goals (every interview serves all four)

1. **Understand context** — how the business works, how this project came to exist
2. **Surface business goals and success criteria** — what "worked" and "failed" mean, in their words
3. **Gauge problem scale and solution viability** — how big this really is, what constraints kill which solutions
4. **Build support** — a stakeholder who was heard early defends the work later. The interview IS a relationship move, not just data collection.

## The method (NN/g stakeholder-analysis process)

Run in this order: **identify → provisional power-interest map → interviews → attitude overlay → communication plan → keep updated.**

### Step 1 — Identify stakeholders

List every person who can affect or is affected by the project. Check each role; for a small client, several roles collapse into one or two people — name them anyway:

- [ ] Economic buyer / sponsor (signs off, pays)
- [ ] Day-to-day decision maker (approves designs)
- [ ] Whoever owns the current process your work will replace (most likely critic — find them)
- [ ] Frontline staff who touch customers (reception, support, sales)
- [ ] Technical owner (whoever maintains what you ship)
- [ ] Marketing / growth owner
- [ ] Legal, compliance, brand — anyone with veto power
- [ ] The person who killed or survived the last attempt at this ("what happened last time?")

Then ask every interviewee: **"Who else should I talk to?"** Stop adding when names repeat.

### Step 2 — Provisional power-interest map (Mendelow matrix)

Place each stakeholder BEFORE interviewing — it sets interview priority. You will re-place them after.

| | **Low interest** | **High interest** |
|---|---|---|
| **High power** | **Keep Satisfied** ("latents" — dormant until provoked; brief, don't spam) | **Manage Closely** (interview first, involve in decisions, no surprises) |
| **Low power** | **Monitor** (minimal effort; watch for movement) | **Keep Informed** (regular updates; often your best information source) |

- Power = can they kill, fund, or redirect the project? Interest = does the outcome change their daily life?
- Interview everyone in the top half plus every high-interest person. Monitor-quadrant people get interviewed only if named by others.
- **The map is a private working document.** Never show it to stakeholders — it says who you consider unimportant.

### Step 3 — The interviews

**Format rules (non-negotiable):**
- **1:1, never group.** In a group, juniors defer, politics silence dissent, and you record the official story instead of the real one.
- Semi-structured, 30–45 min, with the discussion guide below. Follow interesting threads; return to uncovered blocks.
- Order: start with Manage Closely, end with the sponsor if possible — you'll ask the sponsor sharper questions once you know where accounts differ.
- Live technique (probing, silence, recovery) transfers directly from `conduct-user-interview`. Question-bias lint (leading, double-barreled, closed openers) is governed by `write-interview-guide`'s lint catalog — run your guide through it.

**Discussion guide — five blocks (adapt wording, keep coverage):**

**Block A — Role & context (warmup, 5 min)**
- "Walk me through your role and where this project touches it."
- "How did this project come to exist? Whose idea was it?"

**Block B — Business goals (10 min)**
- "What does this project need to accomplish for the business?"
- "If it goes perfectly, what's different a year from now?"
- "How does this connect to what the business is trying to do overall?"

**Block C — Success metrics AND definitions of failure (10 min)**
- "How will you personally judge whether this succeeded?"
- "What number or signal would you check?" (If none exists, note it — that's a finding.)
- "What would make this a failure in your eyes, even if it launches?"
- "What's been tried before? What happened to it?"

**Block D — Users & assumptions (5 min)**
- "Who do you believe the users are, and what do they struggle with?"
- Record every answer here as a **hypothesis to verify with user research, never as user data**. Stakeholder claims about users and the market are external claims — apply `craft-critique`'s evidence-discipline protocol (load it), never absorb them as fact.

**Block E — Political context & engagement close (10 min)**
- "Who has to be happy with the outcome?"
- "Where do you expect disagreement about this project?"
- "What would make this fail that has nothing to do with the design?"
- "How do you want to be involved — and how often do you want updates, through what channel?"
- "Who else should I talk to?"

Political information arrives through these indirect questions. Never ask "what are the politics here?" — you'll get a denial and lose rapport.

### Step 4 — Attitude overlay

After the interviews, add a third dimension to the matrix. Mark each stakeholder:

- **Champion (+)** — actively wants this to succeed, will spend capital on it
- **Supporter (~)** — favorable but passive
- **Critic (−)** — skeptical or threatened; their objection is data, not noise

Priority alarm: **high-power critic** = biggest project risk; schedule recurring 1:1s and address their stated failure-definition explicitly in the work. **Low-power, high-interest critic** = tomorrow's blocker; keep informed and heard. A champion in Keep Satisfied is an asset — one good briefing can move them to active sponsorship.

### Step 5 — Communication plan

One row per stakeholder. This is the deliverable that prevents "why wasn't I told" ambushes:

| Stakeholder | Quadrant | Attitude | What they care about | Channel | Cadence | First send |
|---|---|---|---|---|---|---|

Rules: Manage Closely = involved in decisions, not just informed. Keep Satisfied = short, outcome-level briefs on their schedule, never process detail. Keep Informed = regular working-level updates. Monitor = nothing scheduled; re-check the map monthly. Never send everyone the same update.

### Step 6 — Synthesize and keep updated

- Produce the **findings summary** (format below): goal alignment/conflicts, success metrics, failure definitions, constraints, user-hypotheses list, risks.
- Surface goal conflicts explicitly and early — a conflict named in week 1 is a workshop topic; the same conflict discovered at delivery is a crisis.
- Re-place stakeholders on the map at every project phase change. Reorgs, new hires, and one bad demo all move people between quadrants.

## Worked example (fictional client, realistic shape)

Engagement: a two-location physical-therapy clinic wants online booking to replace phone scheduling. Freelance discovery, week 1.

**Identified:** Owner (sponsor/economic buyer) · Office manager (owns the paper scheduling book today) · Lead therapist · Part-time marketing contractor.

**Provisional map → interview order:** Owner and office manager = Manage Closely (owner has power+interest; manager has high interest and de-facto veto — nothing ships without her cooperation). Lead therapist = Keep Satisfied (high informal power, low interest). Marketing = Keep Informed.

**Interview findings (excerpts):**
- Owner, Block C: success = "front desk stops spending half the day on the phone." Failure = "patients double-booked and blaming us."
- Office manager, Block C: failure = "the system books over my blocked slots — I hold slots for post-surgery patients the software can't know about." **Goal conflict found:** owner optimizes for fewer calls; manager needs manual override authority. Named in the summary as decision needed: override + hold-slot capability is scope, not polish.
- Office manager, Block D: "our patients are older, they won't book online." → Logged as hypothesis H1, to be tested in user interviews — not accepted, not dismissed.
- Lead therapist, Block E: "The last software attempt died because nobody trained the front desk." → Risk R1: adoption/training plan required, owner unaware of this history.

**Attitude overlay:** Owner + champion · Office manager − critic (threatened, high interest — top risk AND best informant) · Therapist ~ supporter · Marketing ~ supporter.

**Communication plan (excerpt):**

| Stakeholder | Quadrant | Attitude | Cares about | Channel | Cadence |
|---|---|---|---|---|---|
| Owner | Manage Closely | + | Phone-time reduction, no double-books | Call | Weekly |
| Office manager | Manage Closely | − | Override control, hold slots | In person | Weekly + co-design session |
| Lead therapist | Keep Satisfied | ~ | Schedule accuracy, training | Email brief | At milestones |
| Marketing | Keep Informed | ~ | Launch timing, booking link | Email | Biweekly |

The office manager gets a co-design seat: converting the high-interest critic is worth more than any feature.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Group kickoff as the only "stakeholder research" | 1:1 interviews; the kickoff is ceremony, not data |
| Treat stakeholder claims about users as user research | Log as hypotheses; verify per `craft-critique`'s evidence protocol |
| Interview only the sponsor | Interview whoever owns the process being replaced — the likely critic |
| Ask "what should the design look like?" | Ask for goals, metrics, failure definitions; solutions are your job |
| Show the power-interest map to stakeholders | Keep it private; share the communication plan instead |
| Same status email to everyone | Per-quadrant channel, cadence, and altitude |
| Skip low-power critics | Keep them informed; unheard critics become blockers at launch |
| Promise features mid-interview to build rapport | "That's a strong candidate — I'll bring it into scoping" |
| Bury goal conflicts to keep the project pleasant | Name conflicts in the findings summary; force the decision early |

**Red flags during interviews (each one is a finding, write it down):**
- Two stakeholders give incompatible success metrics → goal conflict; escalate to a decision
- Nobody can name a metric or signal → the project has no definition of success; define one before designing
- "Everyone's aligned on this" → they aren't; probe Block E harder with the next interviewee
- A stakeholder can't describe what failure looks like → they haven't thought about the project or won't say; both matter
- The same past-failure story from multiple people with different villains → the political fault line; map it, don't join it

## Output format

Produce three artifacts:

```markdown
# Stakeholder Findings — [project]

## Goals & alignment
- Shared goals: …
- CONFLICTS (decision needed): [who] wants X vs [who] needs Y → recommended resolution + who decides

## Success metrics / definitions of failure
| Stakeholder | Success = | Failure = | Metric exists? |

## Constraints (budget, tech, legal, timeline, history)
## User hypotheses to verify (H1…Hn — feed into write-research-plan)
## Risks (R1…Rn, each with owner + mitigation)
## Who else to talk to (open names)
```

Plus: the **power-interest map with attitude overlay** (private) and the **communication plan table** (shareable). Findings feed `write-problem-statement` and `write-research-plan` as direct inputs.

## Sources

- Stakeholder interviews 101 (goals, semi-structured format): https://www.nngroup.com/articles/stakeholder-interviews/
- Stakeholder analysis — Mendelow power-interest matrix, attitude mapping, process: https://www.nngroup.com/articles/stakeholder-analysis/
- Stakeholder interviews 101 (video): https://www.nngroup.com/videos/stakeholder-interviews-101/
- Discovery in industry — stakeholder interviews as most common discovery activity: https://www.nngroup.com/articles/discoveries-in-industry-revealed/

## Boundaries

- **conduct-user-interview** owns live interview mechanics (probes, silence, recovery) for USER sessions; borrow its technique here, but users vs. stakeholders never mix in one guide.
- **write-interview-guide** owns user-facing discussion guides and the question-bias lint catalog; run this skill's guide through that lint, don't duplicate it.
- **write-research-plan** consumes this skill's user-hypotheses list as research questions input.
- **write-problem-statement** owns turning findings into the framed problem; this skill supplies the evidence.
- **synthesize-research-data** owns cross-interview thematic synthesis at scale; this skill's stakeholder-specific outputs (goal conflicts, map, comm plan) stay here.
- **conduct-business-research** owns desk/secondary research; **write-client-proposal** owns scope and pricing after discovery.
- **craft-critique** is the single source of the evidence-discipline protocol — this skill applies it to stakeholder claims, never restates it.
