---
name: write-client-proposal
description: "Writes freelance client proposals with tiered scope, value-anchored pricing, feasibility-checked timelines, and explicit assumptions + change control. Use when the user says 'write a proposal', 'scope this project', 'how much should I charge for this', 'the client asked for a quote', 'draft an SOW / statement of work', 'they want a price by Friday', or whenever a prospective or existing client needs a written offer of work for money. Also use to review a proposal before it goes out. Runs AFTER the problem is understood — if the client's problem is unsized or undefined, this skill routes to a paid discovery proposal instead."
---

# Write Client Proposal

Turn an understood client problem into a written offer the client can say yes to — priced on value, scoped in tiers, with a timeline that survives the feasibility check and a change process that protects the work.

## When to use / when NOT to use

**Use when:**
- A client or prospect asks for a price, quote, proposal, or statement of work
- Scoping any paid engagement — new client, new phase, or expansion of existing work
- The client's ask is vague ("we need a new website") and you must respond with something priced — this skill's Step 0 decides between a full proposal and a paid discovery proposal
- Reviewing a drafted proposal before it goes to the client

**Do NOT use when:**
- Deciding whether the client's problem is worth solving at all, or sizing it → **identify-business-problems** (this skill consumes its sizing and feasibility outputs)
- The client hasn't articulated goals yet and you have access to them → **conduct-stakeholder-interviews** first; proposals written without discovery are guesses with a price tag
- Writing the differentiation story ("why me over others") → **position-product** supplies it; this skill only places it
- Sending a routine status update to an existing client → that's an email, not a proposal (BLUF rules still apply via **writing-voice**)
- Pricing a product (subscriptions, paywalls) rather than your own services → **design-growth-surfaces**

**Pipeline position:** conduct-stakeholder-interviews → identify-business-problems (size + feasibility) → **write-client-proposal** → signed scope → work → tell-case-study-story (afterward, with permission).

## The method

### Step 0 — Qualify the bid (before writing a word)

Not every request deserves a proposal. Place the engagement on the quadrant first:

```
                LOW REWARD                HIGH REWARD
LOW RISK    →   Small fixed quote, fast   Full tiered proposal — protect time for it
HIGH RISK   →   Decline or refer          Paid discovery first, then re-propose
```

- **Reward** = fee + relationship/portfolio value, honestly weighed. A tiny fee with a genuinely reusable case study can still be HIGH; "exposure" alone is LOW.
- **Risk is HIGH** when ANY of: the problem is unsized (nobody knows what it's worth to the client), scope is undiscoverable from the outside, the client wants a price before defining the problem, payment terms are resisted, or delivery would collide with existing committed capacity.
- **Unsized problem + client wants a number anyway** → propose a small **fixed-price discovery engagement** (interviews, data pull, sized findings, written recommendation). Discovery is real deliverable work, never free pre-sales labor. Its output feeds **identify-business-problems**, and the follow-on proposal cites its findings.
- **Capacity fails** (see Step 3) → decline, refer, or offer a later start date. Never bid on time that doesn't exist.

### Step 1 — Anchor the value before the scope

The proposal sells an outcome, not deliverables. Before listing anything you'd build:

1. Name the client's **milestone** — outcome + number + date, in their words from discovery ("fully booked chairs by the January location opening", not "grow the business"). No milestone surfaced → get one (**conduct-stakeholder-interviews**) or propose discovery. A proposal anchored to nothing is decoration.
2. State the **value at stake** — the bottom-up sizing from **identify-business-problems** (count × share × value, as a range, sources named). This number is the pricing anchor in Step 3 and the opening line of the proposal.
3. Run every external claim you plan to make through **craft-critique's evidence-discipline protocol** (it owns the cite/get/flag disposition — apply it, don't restate it). A proposal is external-facing; under-evidenced claims either get evidenced before sending or get cut.

### Step 2 — Build three scope tiers

One take-it-or-leave-it scope turns the conversation into yes/no on price. Three tiers turn it into *which one* — and let the client self-select on budget without negotiating your rate.

Rules for tiers:

- **Each tier is a complete outcome**, not a crippled version of the one above. The smallest tier must still move the client's milestone on its own. If it can't, it isn't a tier — cut it.
- **Name tiers by outcome**, never Bronze/Silver/Gold ("Booking flow, live" / "Booking flow + intake automation" / "Full front-door rebuild").
- **Differentiate on scope, not quality.** Every tier gets the same craft. What varies: how much of the problem gets solved, how fast, and how much ongoing support follows.
- **Three is the number.** Two reads as cheap-vs-expensive; four+ forces the client to do your scoping work.
- **Recommend exactly one** — decision-support shape: options presented, one recommended, with specific reasoning tied to their milestone. A proposal that presents tiers without a recommendation makes the client do the analysis they're paying for.

### Step 3 — Price each tier

Run this decision tree:

```
Is the scope defined well enough that YOU control execution?
├── YES → FIXED PRICE per tier (default — you keep efficiency gains)
└── NO  → Is discovery the missing piece?
          ├── YES → small fixed-price DISCOVERY engagement first (Step 0)
          └── NO (genuinely open-ended, e.g. ongoing advisory)
                → weekly/monthly RETAINER with a defined capacity
                  (hourly billing is the last resort — it prices
                   your time, caps your upside, and invites
                   line-item auditing of your invoices)
```

Then set each fixed price between a floor and an anchor:

1. **Floor** = realistic hours (Step 4's estimate, buffer included) × the minimum rate that makes the work worth taking over other uses of the same hours (other paid work, portfolio time — the opportunity cost is real even when unbilled). **Never price below floor.** A prestige project priced below floor is a Spend-without-ROI decision — make it consciously and record it (**write-decision-rationale**), don't drift into it.
2. **Anchor** = the value at stake from Step 1. A fix that recovers a recurring monthly leak comfortably supports a price of one to a few months of that leak; a deadline-shaped problem (their launch, their lease decision) supports more. If the defensible price barely clears the floor, the problem is too small for the engagement — shrink the scope or decline.
3. **State one number per tier.** Ranges in a proposal read as "the real price is the bottom of the range." Do range-thinking privately; print a number.
4. **Discount = remove scope, never cut the price of the same scope.** "Same work, less money" reprices all future work in one sentence. If budget is the blocker, the smaller tier IS the discount.
5. **Third-party costs** (hosting, API usage, fonts, stock, plugins) pass through at cost, named in Assumptions — never silently absorbed into the fee.

### Step 4 — Feasibility-check the timeline (before promising anything)

A promised date that fails the math is a client-drop risk waiting to fire. Run the feasibility check from **identify-business-problems** (Step 7) on every tier — estimate realistically from actuals, ×1.5 for first-of-kind work, count real weekly capacity after standing commitments, and confirm:

```
estimate ≤ available hrs/week × weeks × 0.8   (minimum 20% buffer, always)
```

- **Fails?** The proposal changes — longer timeline, later start, or smaller tier. Sending it anyway is the failure.
- **Name what it displaces.** Capacity is zero-sum; a signed proposal that only *adds* work is a lie you told yourself first.
- Quote **calendar dates from client-dependency zero** — the clock starts when their inputs arrive (content, access, approvals), not when the contract signs. Say so in the proposal.
- **Freeze the estimate** at send time; log actuals at the end. The gap is your calibration data for the next proposal — never revise mid-project to look on-plan.

### Step 5 — Assumptions, exclusions, and the revision allowance

Every dispute in a fixed-price engagement traces back to something one side assumed and nobody wrote down. Write down:

- **Assumptions** — what must be true for the price and dates to hold: client delivers content/access/credentials by named dates; feedback returned within N business days (late feedback slips the timeline day-for-day — say this sentence verbatim); one named decision-maker consolidates feedback; third-party services keep working as documented.
- **Exclusions** — the adjacent work a client will predictably assume is included: content writing, logo/brand design, ongoing maintenance, SEO, staff training, other pages/flows "while you're in there." Name the nearest ones explicitly.
- **Revision allowance** — a number, per tier (e.g., two consolidated revision rounds per deliverable). "Revisions until you're happy" is unlimited scope wearing a friendly face.

### Step 6 — Change control and payment terms

**Change control** (put this in every proposal, run it without apology):

```
Client asks for anything outside the written scope
  → acknowledge same day, log it
  → send a written change order: what it adds, price delta, timeline delta
  → nothing outside scope gets built until the change order is approved
```

Absorbing "one small thing" silently doesn't buy goodwill — it teaches the client that scope is soft. The change order is a 10-minute document, not a confrontation.

**Payment terms:**
- Deposit before any work starts — 50/50 for short engagements, thirds (start / midpoint / delivery) for longer ones. **Never 100% on completion** — that makes you the client's lender.
- Final deliverables (handoff, credentials, source) transfer on final payment.
- A **pause/kill clause**: if the client pauses beyond N weeks or cancels, work completed is billed at the tier's effective rate and the restart gets rescheduled around then-current capacity — a pause is not a free reservation.
- **Proposal expiry**: price and dates valid for 14 days. Capacity moves; an un-expired proposal is an option contract you gave away free.

### Step 7 — Write it (BLUF, two pages, their words)

Load **writing-voice** (Professional register) and write in this order — the recommendation and price appear on page one, never buried:

```markdown
# Proposal — [outcome, in the client's words] · [date] · valid until [date]

## The outcome                       ← BLUF: what changes for their business,
[2–3 sentences: their milestone,       anchored to the milestone + value at stake]
what this engagement moves, and the recommended option + its price]

## The problem as we discussed it    ← their words from discovery, played back;
[3–5 sentences + the sizing]           this is where they decide you listened

## Options
### [Tier 1 name — outcome] — $X · [duration]
[What's included — outcomes first, deliverables under them]
### [Tier 2 name] — $Y · [duration]   ★ Recommended — [one sentence why,
### [Tier 3 name] — $Z · [duration]      tied to THEIR milestone]

## Timeline
[Phases with calendar dates, clock starting from client-dependency zero]

## Investment & payment
[Chosen tier's price · payment schedule · pass-through costs]

## Assumptions & what's not included
[Step 5 output — bulleted, unambiguous]

## Changes
[Step 6 change-control paragraph]

## Relevant work
[1–2 shipped, checkable proofs relevant to THIS problem — pull current
numbers at send time, never reuse figures from an old proposal;
positioning language comes from position-product]

## Next step
[One action: reply picking an option / 20-min call — with a date]
```

- Under ~2 pages for typical freelance scope. The proposal's length signals the project's weight — a 12-page proposal for a 3-week build reads as insecurity.
- Their words beat your taxonomy: if discovery said "patients give up on the phone," the proposal says that — not "suboptimal conversion funnel."

### Step 8 — Gate it, then record it

1. Run **craft-critique's** pixel-polish ship gate — a proposal is external-facing work; typos and misaligned tables price you down before the number is read. Every metric in "Relevant work" passes the evidence protocol.
2. Read it once **as the client** — a busy owner giving it 90 seconds. Does page one alone let them say yes?
3. Record the pricing/scope decision via **write-decision-rationale**, including **What Would Change This** (e.g., "priced assuming 10 hrs/wk freelance capacity — re-quote if your available capacity changes").
4. Proposal is Tier 3 in ARIA terms: **Dinesh reviews and sends it himself.** Drafts never go out unreviewed.

## Proposal lint (every proposal, before send)

- [ ] Milestone named in the client's words (outcome + number + date) in the first section
- [ ] Value at stake stated, bottom-up, sourced or flagged (from identify-business-problems)
- [ ] Exactly three tiers; each a complete outcome; exactly one recommended, with milestone-tied reasoning
- [ ] One number per tier — no ranges, no "TBD", no "starting at"
- [ ] Every tier's price ≥ floor; anchor logic checked against value at stake
- [ ] Feasibility math run and passed for the recommended tier; displacement named (privately)
- [ ] Timeline in calendar dates, clock pinned to client-dependency zero
- [ ] Assumptions, exclusions, and a numeric revision allowance present
- [ ] Change-control process and payment schedule (deposit ≥ first third) present
- [ ] Pause/kill clause + 14-day expiry present
- [ ] Proof claims current and checkable — no stale numbers carried over
- [ ] ≤ ~2 pages; BLUF holds — option + price on page one
- [ ] craft-critique ship gate passed; decision recorded; Dinesh sends it himself

## Worked example (fictional — a two-location physiotherapy clinic)

**The ask:** "We need a new website." **Step 0:** problem unsized → HIGH risk. Owner is reachable → ran discovery instead of quoting. Discovery found: new-patient intake happens by phone; front desk misses calls during sessions; the owner's real milestone is **"both locations at full schedule before the March associate hire."** Sizing (via identify-business-problems, from their call log): ~30 missed intake calls/month × ~40% never call back × ~$700 first-treatment-plan value ≈ **$6–10k/month leaking** (range; call-back share under-evidenced, flagged).

**Tiers built:**

| Tier | Outcome | Price | Duration |
|---|---|---|---|
| Online intake, live | Booking + intake form replacing phone-only intake, both locations | $4,800 | 3 wks |
| ★ Intake + follow-up automation | Above + automated reminders and missed-call text-back | $7,900 | 5 wks |
| Full front-door rebuild | Above + site rebuild + on-site conversion pass | $14,500 | 9 wks |

**Pricing logic (middle tier):** realistic estimate 38 hrs; missed-call text-back is first-of-kind for this stack → ×1.5 → 57 hrs. Floor at a $90/hr opportunity-cost rate ≈ $5,100. Anchor: recovering even the low bound ($6k/mo) pays the fee back inside month two — $7,900 sits defensibly between floor and anchor. **Feasibility:** 10 freelance hrs/wk × 8 wks × 0.8 = 64 usable hrs ≥ 57 → passes; quoted 5 calendar weeks of build across an 8-week window, clock starting when the clinic delivers scheduling-system access. Displaces: the portfolio's next case study slips two weeks — accepted consciously, recorded.

**Recommended tier 2** in the proposal: *"Recovering missed intake calls is what moves you toward full schedules by March; the site rebuild can follow once the leak is closed."* Assumptions included: clinic provides scheduling-system access by day 1, consolidated feedback within 3 business days (late feedback slips day-for-day), two revision rounds per deliverable; SMS costs pass through at cost. Excluded by name: content writing, brand refresh, ongoing maintenance (offered separately as a retainer after launch). Payment: 50% to start, 50% at delivery; 14-day expiry. **What would change this** (recorded): if their call log shows the call-back share is actually >80%, the leak shrinks below the anchor — re-scope before signing.

## Anti-patterns / red flags

| Red flag | Why it fails | Do instead |
|---|---|---|
| Quoting a price before the problem is sized | You're pricing blind; the number is a guess with your name on it | Step 0: paid discovery first, or size it via identify-business-problems |
| Hours × rate as the price ceiling | Prices your time, not the outcome; punishes your own efficiency | Floor from hours, price from value at stake |
| One take-it-or-leave-it scope | Turns the decision into yes/no on price | Three complete-outcome tiers, one recommended |
| Tiers without a recommendation | Client does the analysis they're paying you for | Recommend one, reasoning tied to their milestone |
| A price range or "starting at…" | Client hears the bottom number, budgets the bottom number | One number per tier |
| Optimistic timeline to win the bid | Deadline miss + client drop later costs more than losing the bid | Feasibility math first; the date survives or the proposal changes |
| Timeline clock starts at signature | Client delays become your lateness | Pin dates to client-dependency zero, in writing |
| "Unlimited revisions" / no revision number | Unbounded scope wearing a friendly face | Numeric revision allowance per tier |
| Absorbing "one small thing" off-scope | Teaches the client scope is soft; creep compounds | Same-day change order, every time |
| Discounting the same scope | Reprices all your future work in one sentence | The smaller tier IS the discount |
| 100% payment on completion | You become the client's lender | Deposit up front; deliverables transfer on final payment |
| No expiry date | A free option on your future capacity | Valid 14 days |
| Proposal written in your taxonomy | Client can't see themselves in it | Their discovery words, played back |
| Reusing last year's proof metrics | Stale numbers fail the evidence protocol — and can fail in the room | Pull current numbers at send time, every time |
| 12 pages for a 3-week build | Length reads as insecurity, not rigor | ~2 pages, BLUF, page-one decision |

## Boundaries

- **identify-business-problems** owns opportunity sizing, the risk-reward quadrant mechanics, and the feasibility/capacity check (its Step 7) — this skill applies them to bids and timelines, citing that skill rather than restating the full procedure.
- **conduct-stakeholder-interviews** owns discovery — the milestone and the client's words come from there.
- **position-product** owns the differentiation story placed in "Relevant work"; **tell-case-study-story** owns the long-form proof used after the work ships.
- **writing-voice** owns register and prose (Professional register for proposals); **craft-critique** owns the evidence-discipline protocol and the pre-send ship gate — reference both, never restate.
- **write-decision-rationale** owns the decision-record format (including What Would Change This) for pricing and scope calls.
- **design-growth-surfaces** owns pricing of products/offers inside a client's business; this skill prices only Dinesh's own services.

## Sources

- **ARIA operating DNA — not a fork, not NN/g-grounded.** The method encodes frameworks Dinesh runs by, so its authority is his own operating standards, not external citations: the **Risk-Reward quadrant** (Step 0), **Milestone Anchoring** — nothing floats (Step 1), **value-anchored pricing** and the **decision-support tier shape** — options presented, exactly one recommended (Steps 2–3), and the **feasibility/capacity** check with the mandatory **≥20% buffer** (Step 4).
- **Borrowed protocols keep their owners and are referenced, never restated:** opportunity sizing + the quadrant mechanics + the feasibility/capacity math are **identify-business-problems**' (its Step 7); discovery, the milestone, and the client's own words are **conduct-stakeholder-interviews**'; the evidence-discipline protocol (cite / get / flag) and the pre-send pixel-polish ship gate are **craft-critique**'s; the differentiation story is **position-product**'s and the long-form proof is **tell-case-study-story**'s; the decision-record format with its mandatory *What Would Change This* is **write-decision-rationale**'s; register and prose are **writing-voice**'s (Professional).
- **The worked example is fictional** — the two-location physiotherapy clinic and every figure in it are illustrative, not a real Dinesh client or engagement.
