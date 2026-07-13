---
name: run-competitive-analysis
description: "Runs an NN/g-style competitive analysis: competitive usability evaluation (holistic or focused, competitors treated as free prototypes) plus a business-model/positioning teardown, producing a decision-ready matrix with design implications — never a feature checklist. Use when Dinesh says 'competitive analysis', 'competitor teardown', 'how do competitors handle X', 'who else does this', 'benchmark us against the market', 'what's the landscape', or before designing any flow competitors already ship. Also use at project kickoff — it is often the right FIRST research activity."
---

# Run Competitive Analysis

Turn competitors' shipped products into evidence — usability evidence and positioning evidence — that changes a specific design or product decision.

## When to use / when NOT to use

**Use when:**
- Starting a project and you need the landscape before designing (often the correct first research activity — NN/g)
- About to design a flow (booking, checkout, onboarding, AI chat) that competitors have already shipped — their live products are free prototypes
- A stakeholder asks "why don't we just do what X does?" and the answer needs evidence
- A redesign is planned and you want to test alternative directions without building them

**Do NOT use when:**
- The question is about the domain/market in general, not specific competitors → `conduct-business-research` (desk research + gap list)
- You need a deep expert review of ONE product against usability principles → `run-heuristic-evaluation`
- You already have teardown evidence and need the differentiation story → `position-product`
- You need to decide what to DO about a found opportunity (sizing, feasibility, risk-reward) → `identify-business-problems`

**Evidence rule:** every claim about competitors, users, or the market in this analysis is handled per `craft-critique`'s evidence-discipline protocol. Load `craft-critique` before writing conclusions — its protocol governs how each external claim is sourced or flagged.

## The method

### Step 1 — Anchor to a decision (or stop)

Write one sentence: *"This analysis exists so we can decide ______."*

- Good: "…decide whether our booking flow should require account creation before showing available times."
- Good: "…decide which of 3 concept directions to build for the conversational shopping screen."
- Bad: "…understand the competitive landscape." That is not a decision. If no decision exists, this is desk research — hand it to `conduct-business-research`.

Everything downstream is filtered by this sentence. A finding that cannot change the decision does not go in the report.

### Step 2 — Choose the mode (decision tree)

```
What does the decision need?
│
├─ Overall standing: "how good are we vs. them, broadly?"
│   → HOLISTIC evaluation
│     Same core tasks on every product, rank on overall UX
│     quality per dimension. Best at kickoff or annual checkpoint.
│
├─ One flow/feature: "how do others handle X?"
│   → FOCUSED evaluation
│     One flow, decomposed into steps, compared step-by-step
│     across products. Best when a specific design is imminent.
│
└─ A redesign with real users available?
    → COMPETITIVE USABILITY TESTING
      Put real users on competitors' LIVE products — they are
      free, fully-built prototypes of alternative design ideas.
      Use `plan-usability-test` for sessions/logistics; this
      skill defines what to compare and how to report it.
```

If unsure: focused. Holistic analyses sprawl; focused ones ship implications.

### Step 3 — Pick 3–5 competitors across three rings

| Ring | What it is | Why it must be included |
|---|---|---|
| **Direct** | Same product, same audience | The obvious comparison — but studying only these breeds convergence |
| **Indirect / analogous** | Different product, same job (e.g. a restaurant-reservation app when studying salon booking) | Where the actually-new patterns come from |
| **Status quo / non-consumption** | The workaround: phone call, WhatsApp message, spreadsheet, "do nothing" | The real competitor for most products — if you can't beat the phone call, the UI doesn't matter |

Hard rules: 3–5 total (fewer = anecdote, more = never finishes). At least one non-direct ring represented. Name why each was chosen in one line.

### Step 4 — Define dimensions and tasks BEFORE touching any product

Deciding what to compare after browsing competitors invites cherry-picking (confirmation bias — you'll "find" support for the direction you already like; name and control it per `name-and-control-bias`).

- **Holistic:** 4–7 dimensions tied to the decision (e.g. first-run experience, core-task efficiency, error recovery, trust signals, accessibility, mobile parity). Plus 2–3 core tasks executed identically on every product.
- **Focused:** one flow, decomposed into its steps (entry → … → confirmation). Each step is a row.
- **Per dimension, write the evidence you'll capture:** step count, taps to complete, forced pre-work (account? payment?), error/empty states encountered, recovery paths, load feel, copy tone. For AI products add: how uncertainty is shown, fallback behavior when the model fails, latency masking.

**Scoring:** use behavior-anchored marks, not star ratings from feel:
`✓` works without friction · `~` works but with named friction · `✗` fails or blocks · `—` absent. Every mark must have an observation attached. Never average marks into a single number — the tradeoffs ARE the finding.

### Step 5 — Run the UX pass

Execute the same tasks on every product, in the same order, capturing as you go:

- [ ] Screenshot every step of the flow (dated — products change)
- [ ] Count steps/taps from entry to goal
- [ ] Note every point of friction verbatim ("forced signup before showing prices")
- [ ] Deliberately trigger one error (bad input, back button mid-flow) and record recovery
- [ ] Check the flow on mobile if the decision touches mobile
- [ ] Note what each product does NOT have — absence is data, but never conclude absence = opportunity without asking why it's absent (Step 7)

### Step 6 — Run the positioning teardown

For each competitor, answer five questions from public evidence (homepage, pricing page, app-store listing, public reviews):

1. **Who is it for?** — the audience the homepage headline actually addresses
2. **What is the promise?** — the differentiation claim in their own words (quote it)
3. **How does it monetize?** — pricing model: subscription / commission / freemium / ads; who pays, per what
4. **What is the moat claim?** — network, data, integrations, brand, price
5. **Where do they push growth?** — which surfaces carry upgrade/expansion pressure (onboarding, paywalls, share loops)

This layer explains WHY their UX is shaped the way it is. A marketplace that monetizes per-booking will bury direct-contact info; that is a business constraint, not a UX oversight — and copying the pattern without the business model copies the cost without the benefit.

### Step 7 — Interrogate every pattern before adopting it

For each notable competitor pattern, ask in order:

1. **Does it actually work?** Observed evidence or public signal (reviews complaining about it?) — or unknown → flag under-evidenced.
2. **Why does it exist?** Genuine user value / their business model / legacy debt / regulation. Only the first is a reason to adopt.
3. **Does it transfer?** Their audience, scale, and model vs. ours.
4. **If everyone does it the same way** — is it a convention users now expect (follow it), or a shared blind spot (the opportunity)? State which, with reasoning.

### Step 8 — Build the decision-ready matrix

Rows = dimensions/steps. Columns = competitors + own product (always include your own product as a column — the analysis is comparative, not touristic). Every cell = mark + observed evidence. **Every row ends in a design implication:** "so for us, ______."

A row with no implication gets cut. A matrix where any implication row is empty is a feature checklist wearing a costume.

### Step 9 — Extract the bets and end with a verdict

- Maximum **3 opportunities**, each traceable to specific matrix rows.
- Each opportunity states what evidence supports it and what's still under-evidenced.
- End with ONE recommendation against the Step-1 decision — not a list of options. Sizing and feasibility of the opportunities belong to `identify-business-problems`.
- **Date the analysis and stamp an expiry** (default: 90 days). Competitor products change; an undated matrix becomes misinformation.

## Worked example (focused mode, condensed)

**Decision:** "Decide whether our salon booking flow should require account creation before showing available slots."
**Mode:** Focused — booking flow, entry → confirmed appointment.
**Competitors:** A = marketplace booking app (direct) · B = vertical salon SaaS (direct) · C = restaurant-reservation app (analogous) · Status quo = phone call to the front desk.

| Step | A (marketplace) | B (salon SaaS) | C (reservations) | Phone call | → Implication for us |
|---|---|---|---|---|---|
| See availability | `~` visible, but only after location + service picker (4 taps) | `✗` demands signup first — availability hidden | `✓` calendar on screen 1, zero pre-work | `✓` "does 3pm work?" — instant | Show slots first; every gate before availability loses to the phone call |
| Identify yourself | `~` full account (email+password) | `✗` account + salon code | `✓` name + phone only, at confirm step | `✓` "it's Priya" | Identity comes AFTER slot choice; phone-number-only clears the bar |
| Confirm + recover | `✓` confirm screen, easy cancel link | `~` confirm buried in email | `✓` SMS confirm + one-tap cancel | `~` no artifact — misremembered bookings happen | SMS confirmation is the convention users now expect (all digital players ship it) |

**Positioning teardown (one line each):** A monetizes per-booking commission → hides the salon's phone number (model-driven, don't copy). B charges the salon a subscription → gates everything behind accounts because its buyer is the owner, not the client. C monetizes seat volume → optimizes for zero-friction entry; its audience overlaps ours in expectation.

**Pattern interrogation:** "Account before availability" exists in A and B — driven by their monetization/CRM needs, not user value; public reviews of B complain about it (cite the review source in the real report). Convention vs. blind spot: blind spot → our opportunity.

**Opportunities (max 3):**
1. Availability-first flow — beats the phone call at its own game. Evidence: rows 1–2. Under-evidenced: whether OUR clients abandon at signup — pull product analytics or test before betting.
2. Phone-number-only identity — evidence: row 2, C's pattern transfers (same expectation register).
3. SMS confirm — convention, table stakes, follow it. Evidence: row 3.

**Recommendation:** Do not require account creation before showing slots; collect phone number at confirmation. **Analysis dated 2026-07-11 · expires 2026-10-09.**

## Anti-patterns / red flags

| Red flag | Why it fails | Instead |
|---|---|---|
| Feature checklist ("they have X, we lack X") | Parity racing copies costs, not outcomes; features ≠ usability | Compare task performance and evidence, end each row in an implication |
| Only direct competitors | Guarantees convergent, me-too design | Three rings: direct, analogous, status quo (Step 3) |
| Skipping the non-consumption competitor | Most users' alternative is the workaround, not another app | Always evaluate the phone call / spreadsheet / WhatsApp |
| "Competitor does it, so it works" | Their pattern may exist for their business model or legacy reasons | Interrogate: works? why exists? transfers? (Step 7) |
| Star ratings from feel / averaged scores | Hides tradeoffs, unfalsifiable | Behavior-anchored marks + evidence per cell; never average |
| Choosing dimensions after browsing competitors | Cherry-picking to confirm the pet direction | Lock dimensions and tasks before touching any product (Step 4) |
| No own-product column | Tourism, not comparison | Your product runs the same tasks, same marks |
| Undated analysis reused for months | Competitors ship weekly; stale matrix = confident misinformation | Date + expiry stamp, default 90 days |
| Confident market claims with no source | Violates the evidence protocol | Handle per `craft-critique`'s evidence protocol; load it before concluding |
| Analysis with no recommendation | Data without a verdict is unfinished work | One recommendation against the Step-1 decision |

## Output format

```markdown
# Competitive Analysis — [product/flow]
**Decision this serves:** [one sentence]
**Mode:** holistic / focused / competitive usability testing
**Competitors:** [3–5, with ring + one-line why each]
**Date:** YYYY-MM-DD · **Expires:** YYYY-MM-DD

## Matrix
| Dimension/Step | Comp A | Comp B | Comp C | Us | → Implication |
(✓ / ~ / ✗ / — + observed evidence in every cell)

## Positioning teardown
| | Audience | Promise (quoted) | Monetization | Moat claim | Growth surfaces |

## Pattern interrogation
[Notable patterns → works? / why exists? / transfers? / convention or blind spot]

## Opportunities (max 3)
[Each: matrix rows it traces to + what's still under-evidenced]

## Recommendation
[ONE — answers the decision sentence]
```

## Sources

- Competitive usability evaluations (holistic vs. focused): https://www.nngroup.com/articles/competitive-usability-evaluations/
- Competitors as free prototypes in redesigns: https://www.nngroup.com/articles/redesign-competitive-testing/
- Conducting a competitive usability evaluation: https://www.nngroup.com/videos/conduct-competitive-usability-evaluation/
- Secondary/desk research before primary research: https://www.nngroup.com/articles/secondary-research-in-ux/
- Confirmation-bias countermeasures (lock criteria before looking): https://www.nngroup.com/articles/confirmation-bias-ux/
- UX strategy (research-based, market-viable positioning): https://www.nngroup.com/articles/ux-strategy/

## Boundaries

- **conduct-business-research** owns desk/secondary research and the gap list for a domain; this skill owns hands-on evaluation of specific competitor products. Run desk research first when the domain itself is unfamiliar.
- **position-product** consumes this skill's teardown as evidence for the differentiation story; this skill produces evidence, never the story.
- **identify-business-problems** owns opportunity sizing, risk-reward quadrant, and feasibility for what to do about the findings.
- **run-heuristic-evaluation** owns deep single-product expert review; invoke it per-competitor only if one product needs principle-level depth.
- **plan-usability-test** owns sessions and logistics when real users test competitor products (competitive usability testing mode).
- **craft-critique** owns the evidence-discipline protocol and verdict language; every external claim here follows it.
