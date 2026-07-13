---
name: identify-business-problems
description: "Ranks candidate business problems and decides which ONE deserves work now — bottom-up opportunity sizing, risk-reward quadrant placement, milestone anchoring (nothing floats), and an explicit feasibility/capacity check before anything enters a roadmap. Use when the user says 'identify business problems', 'which problem should we solve first', 'is this worth doing', 'size this opportunity', 'prioritize these ideas/problems', 'what should we work on next quarter', or whenever multiple problems, asks, or projects compete for limited time or budget and someone must choose. Runs BEFORE write-problem-statement: this skill picks the problem; that skill frames it."
---

# Identify Business Problems

Decide which business problem deserves work now — sized honestly, risk-named specifically, anchored to a milestone, and checked against real capacity before it touches a roadmap.

## When to use / when NOT to use

**Use when:**
- Several problems, stakeholder asks, or project ideas compete for limited time or budget and one must win
- Someone asks "is this worth doing?" or "what should we work on next?"
- A stakeholder is pushing a project nobody has sized ("we need a new website")
- A discovery or stakeholder round surfaced multiple problems and the team must pick one
- Anything is about to enter a roadmap, quarter plan, or proposal — this skill is the gate

**Do NOT use when:**
- The problem is already chosen and needs solution-free framing → **write-problem-statement** (hand it the winner)
- You need the evidence gathered (desk research, market data, internal data pulls) → **conduct-business-research**; this skill consumes its outputs
- You're choosing among solution concepts for the SAME problem → **explore-divergent-concepts**
- You're judging whether a claim or deliverable holds up → **craft-critique**
- It's pure calendar triage with no business problem behind it — just schedule it

**Pipeline position:** conduct-stakeholder-interviews / conduct-business-research → **identify-business-problems** → write-problem-statement → discovery → design.

## The method

Run all eight steps in order. Skipping the feasibility check (Step 7) is the most common — and most expensive — failure.

### Step 1 — Build the candidate inventory (problem cards)

One card per candidate, one line each. Capture:

```
[who suffers] + [what breaks or leaks] + [signal that says so] + [how often, first guess]
```

- Pull candidates from every available source: stakeholder interviews, support complaints, analytics, billing/ops data, the owner's pet asks. Write the pet asks down verbatim too — they compete, they don't get vetoed.
- If a candidate arrives as a solution ("redesign the site"), ladder it to the problem it claims to solve before carding it (the laddering technique lives in **write-problem-statement**, Step 2 — borrow it, then return here).
- Merge cards that are symptoms of one root problem. Cap the inventory at ~7; more than that means candidates weren't merged or the scope is a whole strategy review, not a ranking.

### Step 2 — Audit the evidence per card

Run every card's signal through **craft-critique's evidence-discipline protocol** (cite it / get it / flag it) — load that skill, do not restate it. Then label each card:

- **Evidenced** — a checkable source backs the frequency and the pain (export, log, report, research finding)
- **Hypothesis (under-evidenced)** — someone's impression; name exactly what one cheap pull would confirm

**Rule:** if one cheap data pull (≤ 1–2 hours: an export, a one-week tally, an analytics filter) would materially change a card's rank — do the pull BEFORE ranking. Queue pulls that cost more.

**Bias check on the signal itself:** when a card's evidence is a study, survey, complaint stream, or analytics cut, its trustworthiness is a bias question — a handful of walk-in complaints is a self-selected sample; a retention export can hide survivorship. Audit sampling and interpretation threats per **name-and-control-bias** (the canonical bias→control catalog) before you trust the number; load it, don't restate it.

### Step 3 — Size each opportunity (bottom-up only)

Top-down sizing ("1% of a $10B market") is banned. Size from counts you can defend:

```
value at stake per period = (people or events affected per period)
                          × (share that actually hit the problem)
                          × (value lost per hit — revenue, hours × rate, or retained-customer value)
```

- Express every size as a **range** (low–high), with each input either sourced or flagged under-evidenced.
- Add the **cost-of-doing-nothing trajectory**: `Stable` (leaks at the same rate) / `Compounding` (worsens each period) / `Deadline-shaped` (step change on a named date). Compounding and deadline-shaped problems rank above a stable problem of equal size.
- Classify size relative to THIS business, not in absolute dollars:
  - **S** — noise; wouldn't change any decision the business faces this year
  - **M** — material; a line item leadership would notice
  - **L** — moves a named milestone by itself

If a card's size cannot be estimated even as a range (no count, no value link), its honest size is **"unknown"** — write that, never invent a number. Unknown-size cards can only earn a cheap evidence pull, never a project.

### Step 4 — Name the risk — specifically

The word "risky" alone is banned. Translate every risk into a named type, in BOTH directions:

| Risk of ACTING | Risk of NOT acting |
|---|---|
| **Time burn** — weeks spent that a higher-leverage problem needed | **Deadline miss** — a dated commitment breaks |
| **Spend without ROI** — money out, no measurable return | **Client/customer drop** — a revenue relationship lost |
| **Wrong-problem risk** — the build succeeds, nothing changes (acting on a hypothesis) | **Reputation damage** — trust lost; a door closes that may not reopen |
| **Opportunity lock-in** — irreversible commitment before the first signal | **Compounding loss** — the leak grows every period it's ignored |

### Step 5 — Place every candidate on the quadrant

Never present a candidate without a quadrant cell.

```
                LOW REWARD              HIGH REWARD
LOW RISK    →   Do fast or skip         Protect time for it
HIGH RISK   →   Flag + deprioritize     Present with full tradeoffs
```

**Placement tests:**
- **Reward is HIGH** when size class is L — or M with a compounding/deadline-shaped trajectory — or solving it directly unblocks a named milestone. Everything else is LOW. Force the split: if every card lands HIGH, the bar is wrong.
- **Risk (of acting) is HIGH** when ANY of: evidence status is Hypothesis; irreversible or large spend before the first signal; build time is a large fraction of the runway to the milestone; success depends on an external party you don't control.

**Cell actions:**
- **Do fast or skip** — if it costs ≤ a day (including cheap evidence pulls), do it in the cracks; otherwise skip without guilt.
- **Protect time for it** — the default winner. Calendar time gets blocked for it before anything else.
- **Flag + deprioritize** — stays visible on the list with the named risk attached; state why it isn't cut outright.
- **Present with full tradeoffs** — never green-light directly. First try to **shrink the risk**: a cheap evidence pull or a thin slice that produces a signal early. A de-risked big bet usually migrates to protect-time; one that can't be de-risked cheaply usually shouldn't be bet on.

### Step 6 — Anchor to a milestone (nothing floats)

A milestone is a **named outcome + a number + a date** ("break-even at 140 members before the December lease decision"). "Grow revenue" and "improve the experience" are platitudes, not milestones.

- Every surviving candidate names the milestone it serves and how solving it moves that milestone.
- No milestone → the card needs an explicit written reason to exist. No reason → **cut**. Floating work is what crowds out anchored work.
- If the business has no articulated milestones, that IS the finding — stop and get one from the owner (**conduct-stakeholder-interviews** owns surfacing business goals) before ranking further.

### Step 7 — Run the feasibility & capacity check (BEFORE the roadmap)

A plan that cannot be completed on time is not a plan — it is a liability. Check before recommending, not after committing:

1. **Estimate realistically, not optimistically.** Use actuals from similar past work if any exist. First-of-kind work: multiply the gut estimate ×1.5.
2. **Count real capacity.** Hours actually available per week after standing commitments — not theoretical hours.
3. **Apply the buffer.** Plan to at most **80% of available capacity** — minimum 20% breathing room, always.
4. **Compare:** does `estimate ≤ available hrs/week × weeks of runway × 0.8` hold? If **NO**, the recommendation must change — shrink the scope, defer it, or name exactly what it displaces. Presenting it anyway is a fail.
5. **Freeze the estimate** before work begins; log actuals at completion. Never revise the estimate mid-work to "stay on plan" — the gap between estimate and actual is the calibration data for next quarter's ranking.

**Hard rule:** nothing enters a roadmap without naming what it displaces. Capacity is zero-sum; a recommendation that only adds is not a recommendation.

### Step 8 — Recommend ONE; record the decision

- Recommend exactly **one** problem to pursue now. "Top three priorities" means nobody chose and the capacity check was dodged.
- Present it in decision-support shape — every option carries its quadrant cell, named risk, and time estimate; the recommendation carries specific reasoning:

```
DECISION: which problem gets this quarter's protected time
Option A: [problem] → Risk: [named] | Reward: [size class + milestone] | Time: [est.]
Option B: …
Recommended: [A] — because [specific, grounded in this business's milestone and capacity]
```

- Sort the rest into exactly one of: **Scheduled** (with a date), **Deferred** (with a revisit trigger), or **Cut** (with the reason).
- Record the choice as a decision record — **write-decision-rationale** owns the format, including the mandatory **What Would Change This** section. Every ranking is built on assumptions that can expire; write down which.
- Hand the winner to **write-problem-statement** for solution-free framing.

## Sizing & ranking lint (every box, every time)

- [ ] Every card names who suffers and what breaks — no "the business has issues with X"
- [ ] Every size is bottom-up, a range, with each input sourced or flagged under-evidenced
- [ ] Zero top-down market-share math anywhere
- [ ] Cost-of-doing-nothing trajectory labeled on every card (Stable / Compounding / Deadline-shaped)
- [ ] Every risk is a named type from the Step 4 table — the bare word "risky" appears nowhere
- [ ] Every candidate has a quadrant cell; not all candidates are HIGH reward
- [ ] Every survivor names a milestone (outcome + number + date); floaters are cut or carry a written reason
- [ ] Feasibility math shown: estimate vs. capacity × 0.8, and what the winner displaces
- [ ] Exactly ONE recommendation; the rest are Scheduled / Deferred / Cut — none left in limbo
- [ ] Decision recorded with What Would Change This (via write-decision-rationale)

## Worked example (fictional boutique fitness studio)

**Context:** ~120 active members; break-even at 140; lease-renewal decision in December (the milestone: **"140 members before the December lease decision"**). Owner capacity: ~5 focused hrs/week; budget for one freelance project this quarter (12 weeks). Runway math: 5 × 12 × 0.8 = **48 hrs usable**.

**Step 1–2 — Cards + evidence:**

| # | Card (who + what breaks + signal) | Evidence |
|---|---|---|
| A | Prospective members on mobile can't read the class schedule — owner's ask arrived as "redesign the website"; laddered. Signal: 2 walk-in complaints | Hypothesis — mobile analytics filter would confirm (cheap pull, ~1 hr) |
| B | New members cancel in their first 60 days — billing export: ~10 joiners/month, ~40% gone by day 60 | Evidenced (billing export, last 6 months) |
| C | Booked class spots go unused while waitlists exist — front-desk impression, no data | Hypothesis — one-week paper tally confirms (cheap pull, ~0 hrs) |
| D | Instagram follower growth is flat — owner mentions it often | No link from followers to bookings exists → size unknown |

**Step 3 — Sizing (B):** 10 joiners/mo × 40% early-cancel = 4 lost/mo × ~$90/mo × ~10-month expected stay ≈ **$2.5k–4.5k/month at stake** (range; stay-length under-evidenced). Trajectory: Stable. Size class: **L** — retaining ~4/month for 5 months ≈ the entire 20-member gap to break-even. C: unknown until the tally. A: unknown until the analytics pull. D: unknown, and no cheap pull can link followers to members → honest size "unknown."

**Steps 4–5 — Risk + quadrant:**

| Card | Risk (named) | Quadrant → action |
|---|---|---|
| B | Acting: time burn if the fix is wrong. Not acting: compounding gap to milestone | LOW risk / HIGH reward → **protect time** |
| C | Not acting: possible client drop (waitlisted members walk) | Unknown reward, ~zero-cost pull → **do fast** (run the tally) |
| A | Acting: spend without ROI (freelance budget on an unsized problem) + wrong-problem risk | HIGH risk / unknown reward → **flag + deprioritize**; shrink-risk move = the 1-hr analytics pull |
| D | Acting: time burn on a vanity metric | LOW/LOW → **skip** as a project; reframe as a channel, not a problem |

**Steps 6–7 — Anchor + feasibility:** B and C anchor to "140 by December." A floats until evidenced. D names no milestone → cut. B's thin slice — a structured first-30-day contact sequence + exit survey for cancellers — estimated 20 hrs; first-of-kind → ×1.5 = **30 hrs ≤ 48 hrs usable**. Passes with buffer. The website redesign (~60+ hrs + spend) cannot coexist with B in 48 hrs → explicitly deferred, and that displacement is stated.

**Step 8 — Recommendation:** Pursue **B** now (30 hrs, protected). Do fast: C's tally + A's analytics pull this week (~1 hr total). Deferred: A, revisit when the mobile data lands. Cut: D, no milestone. **What would change this:** if C's tally shows unused spots worth more per month than B's low bound, re-rank next month; if B's thin slice retains fewer than 2 of 4 monthly cancellers by week 6, revisit the approach before spending more. → Decision recorded; B handed to **write-problem-statement**.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| Top-down TAM math ("1% of a $10B market") | Proves nothing about THIS business's counts | Bottom-up: count × share × value, sources named |
| Fake precision ("$3,612.40/month at stake") | Precision implies confidence the data doesn't have | Ranges + S/M/L class; assumptions listed |
| Every candidate lands HIGH reward | Inflation makes the quadrant meaningless | Force the split; reward is relative to the milestone, not to enthusiasm |
| Loudest stakeholder = biggest problem | Mention frequency ≠ size | A repeated mention earns an evidence pull, not a rank |
| Recommending the top three | Nobody chose; the capacity check was dodged | ONE now; the rest Scheduled / Deferred / Cut |
| "It's risky" with no noun | Can't be weighed or traded off | Name it from the Step 4 table, both directions |
| Keeping a floater "just in case" | Floating work crowds out anchored work | Milestone, written reason, or cut |
| Feasibility checked after the roadmap is drafted | The plan is already a liability | Step 7 runs before anything enters the roadmap |
| Adding the winner without naming what it displaces | Capacity is zero-sum; "also" is a lie | State the displacement explicitly |
| Revising the estimate mid-work to look on-plan | Destroys the calibration loop | Freeze the estimate; log actuals; adjust next quarter's estimating |
| Green-lighting a high/high bet directly | Betting the quarter on a hypothesis | Shrink the risk first: cheap pull or thin slice, then re-place on the quadrant |
| Ranking by what's interesting to build | Builder's bias | The quadrant + milestone + capacity decide — not the fun factor |
| Sizing a hypothesis card as if evidenced | Silently upgrades a guess to a fact | Keep the flag; unknown-size cards earn pulls, not projects |

## Output format

```markdown
# Opportunity Assessment — [business / project]
**Date:** · **Candidates:** N · **Recommended:** [one problem]
**Milestone in force:** [outcome + number + date]

## Problem cards
| # | Problem (who + what breaks) | Evidence status | Size (range → S/M/L) | Trajectory | Risk (named) | Quadrant | Milestone served |
|---|---|---|---|---|---|---|---|

## Recommended: [problem]
- **Why now:** [specific — milestone + size + quadrant]
- **Time estimate (frozen):** X hrs · **Capacity check:** X ≤ [avail × 0.8]? Y/N · **Displaces:** [what]
- **First move:** [thin slice or first action]
- **What would change this:** [assumptions that would re-rank the list]

## The rest
- **Scheduled:** [card] — [date]
- **Deferred:** [card] — revisit when [trigger]
- **Cut:** [card] — [reason]

## Cheap evidence pulls queued
- [pull] — [what it would settle] — [cost]
```

## Boundaries

- **write-problem-statement** frames the ONE chosen problem, solution-free, and derives its discovery scope. This skill chooses which; hand off the winner and stop.
- **conduct-business-research** owns desk/secondary research and data pulls — it supplies this skill's sizing inputs and evidence.
- **conduct-stakeholder-interviews** surfaces candidate problems and business goals; milestones usually come from there.
- **run-competitive-analysis** owns the competitor teardown; it feeds reward context (is someone else already capturing this value?).
- **position-product** owns the differentiation story once a problem and solution exist — downstream of this skill.
- **write-decision-rationale** owns the decision-record format, including the mandatory What Would Change This section; this skill produces the decision, that skill records it.
- **craft-critique** is the single source of the evidence-discipline protocol used in Step 2 and on every sizing input — cite it, never restate it.
- **name-and-control-bias** is the single source of the bias→control catalog; Step 2 defers to it whenever a card's signal is a study, survey, or analytics finding whose sampling or interpretation could be skewed — load it, never restate it.

## Sources

**ARIA operating DNA — not NN/g-grounded, not a fork.** The method encodes frameworks Dinesh runs by, so its authority is his own operating standards and there are no external citations: the **Risk-Reward matrix** (Step 5), **Milestone Anchoring** — nothing floats (Step 6), the **Time-to-Complete vs. Impact** and **feasibility/capacity** check with the mandatory **≥20% buffer** (Step 7), and bottom-up-only sizing (Step 3). Borrowed protocols keep their owners and are referenced, never restated: evidence discipline is **craft-critique**'s, study-bias auditing is **name-and-control-bias**'s, laddering a solution back to its problem is **write-problem-statement**'s (Step 1), and the decision-record format with its mandatory *What Would Change This* is **write-decision-rationale**'s (Step 8).
