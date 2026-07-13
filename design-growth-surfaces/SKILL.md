---
name: design-growth-surfaces
description: "Design the surfaces whose job is conversion — onboarding flows, signup, first-run experiences, upgrade prompts, paywalls, trial flows, pricing pages, and launch/landing pages — as designed strategy with pricing awareness, activation metrics, and a mandatory ethical-persuasion filter (no dark patterns). Use when the ask involves 'onboarding', 'first-run', 'signup flow', 'paywall', 'upgrade flow', 'pricing page', 'free trial', 'landing page', 'launch page', 'activation', 'improve conversion', 'more signups/bookings', or diagnosing funnel drop-off that ends in a design change. Growth is designer-owned here, not a marketing handoff."
---

# Design Growth Surfaces

Growth surfaces are product surfaces: the same HCI standards that govern the app govern the screens that sell it — plus an ethics bar conversion pressure will constantly test.

## When to use / when NOT to use

**Use for:**
- Designing or reviewing onboarding, signup, first-run experiences
- Upgrade prompts, paywalls, trial flows, pricing pages
- Launch/landing pages as strategy: message, funnel, proof, one conversion event
- Diagnosing funnel drop-off when the fix is a design change
- Screening ANY persuasion tactic for dark patterns before it ships

**NOT for — name the owner:**
- Metric framework selection (HEART, goals→signals→metrics) → `define-ux-success-metrics`
- Designing or judging the A/B test itself → `use-quantitative-evidence`
- Copy craft on the surface (labels, CTAs, errors) → `write-ux-microcopy`
- Form mechanics and empty/loading/error state design → `design-ui-states`
- Building the actual page → `build-frontend-interfaces`
- The differentiation story a launch page tells → `position-product`
- Competitor paywall/onboarding teardown → `run-competitive-analysis`

## Utilities: invoke, then re-filter (never ship raw)

The installed `marketing-skills` plugins are utilities, not peers: invoke `marketing-skills:cro` for page-level conversion audits, `marketing-skills:onboarding` for flow-pattern breadth, `marketing-skills:copywriting` for copy variants (also `paywalls`, `pricing`, `signup`, `launch` where useful). Treat their output as raw material. They optimize conversion; they do not know the taste bar or the ethics bar. **Everything they produce re-enters this skill at Step 5 (ethics filter) and gets checked against `design-taste` and `craft-critique` before shipping.**

## The method

0. **Load `design-taste` first.** Growth surfaces have the strongest gravity toward spectacle and clutter of anything in the portfolio — the taste file governs, especially here.
1. **Name the ONE conversion event this surface exists to cause.** Visitor→signup, signup→first value, free→trial, trial→paid, prompt→upgrade, visit→booking. One surface, one event. A surface serving two events is two surfaces.
2. **Answer the five pricing/context questions** (below). If any answer is unknown, ask Dinesh or the client — never assume a pricing model or funnel position.
3. **Define the activation metric and guardrail metrics BEFORE sketching.** If you can't name the event that proves the surface worked, you're not ready to design it.
4. **Design the shortest honest path** to the conversion event using the surface checklist below. Count steps and fields; every one must earn its place.
5. **Run the ethical-persuasion filter** over every tactic on the surface. All five tests or the tactic dies. "It converts better" is never a defense.
6. **Invoke utilities for breadth** (variants, patterns, copy) → re-filter their output through Step 5 + `design-taste`.
7. **Ship instrumentation WITH the surface** — day one, not retrofitted. Name the events; hand framework derivation to `define-ux-success-metrics` and experiment design to `use-quantitative-evidence`.
8. **Claims audit:** every number, testimonial, and promise on the surface is handled per `craft-critique`'s evidence protocol. Unverifiable claims get cut, not softened.

## Five questions before designing (ask, don't assume)

1. **Pricing model?** Free / trial / freemium / tiers / one-time / service booking. The model dictates which surfaces exist at all.
2. **Which event is the money event** — and which upstream event is THIS surface's job? (A landing page's job may be signups; the money is bookings. Don't make one surface do both.)
3. **What does the user already know at arrival?** Traffic source, the promise upstream copy made, prior exposure. Design from their state, not from zero.
4. **What is the "aha"?** The earliest moment the product proves its value. Onboarding's entire job is minimizing distance to it.
5. **What happens after conversion?** Charge timing, renewal, emails, data use. The user must be able to learn ALL of it before committing — if you can't state it, you can't design an honest surface for it.

## Surface checklists

### Onboarding / first-run
- [ ] Activation event defined before any screen is sketched
- [ ] Steps + fields between signup and activation counted; everything not required for the aha is cut, deferred, or defaulted (progressive disclosure — reveal complexity only when needed)
- [ ] Setup questions only if the answer visibly changes the first-run experience; otherwise infer or default
- [ ] "Skip" actually skips — no fake skip that re-asks next session
- [ ] First screen after signup never blank: teach, guide, or start a task (NN/g empty-state rule)
- [ ] Signup form follows NN/g form rules: minimal fields, labels outside fields (no placeholder-as-label), single column
- [ ] Permission requests (notifications, contacts) asked at the moment they have obvious user value, never at first launch
- [ ] AI products: first-run sets ACCURATE capability expectations — over-promising is trust debt (`design-ai-trust-and-failure-states` owns the failure UX)

### Upgrade paths
- [ ] Prompt triggers on demonstrated need — limit reached, premium feature attempted, Nth use — contextual beats interruptive
- [ ] Shows value already received + what upgrading adds; never presents the free tier as broken or crippled
- [ ] Declining returns the user exactly where they were, nothing lost, no guilt copy
- [ ] Explicit "no" suppresses the prompt for a defined period — repeat prompting after refusal is nagging (blacklisted)

### Paywalls & trials
- [ ] Hard vs. soft vs. metered chosen deliberately: hard when value is already proven upstream; metered when value needs demonstration; soft (dismissible) when reach matters more than immediate revenue
- [ ] Full price, billing period, renewal terms, and cancel method visible BEFORE commit — not behind a link, not in ToS
- [ ] Trial: exact charge date shown at start; reminder sent before charging; canceling takes no more steps than subscribing
- [ ] Decline/close affordance visible at normal contrast — a gray-on-gray "no thanks" fails accessibility AND the symmetry test

### Launch / landing pages
- [ ] One conversion event per page; every section either advances it or gets cut
- [ ] Headline states the user outcome and works out of context (NN/g microcontent rules)
- [ ] CTA labels pass the 4Ss — Specific, Sincere, Substantial, Succinct; "Learn More" is banned
- [ ] Proof carries the page: live demo, real metric, named testimonial. Adjectives ("seamless", "powerful") are filler — cut or evidence them
- [ ] Every claim passes `craft-critique`'s evidence protocol; the register and hierarchy come from `design-taste` (this is the "highest-polish surface" — and the strongest temptation to break taste; resist)

## The ethical-persuasion filter (every tactic, all five tests)

| Test | Question | Auto-fail example |
|---|---|---|
| **Symmetry** | Is declining as easy, visible, and fast as accepting? | Accept = 1 tap; cancel = phone call |
| **Honesty** | Is every stated fact true, current, and complete? | Countdown timer that resets on reload |
| **Reversibility** | Can the user undo the commitment as easily as they made it? | Subscribe online, cancel by mail |
| **Informed** | Does the user know cost, timing, and consequences before the click? | Charge date buried in terms |
| **Portfolio** | Would Dinesh present this exact screen, with his name on it, in a case study? | You'd crop it out of the shot |

### Dark-pattern blacklist (auto-fail by name)

Confirmshaming ("No thanks, I like wasting money") · roach motel (easy in, hard out) · drip pricing / hidden fees at checkout · fake urgency or scarcity (untrue "2 left", resetting timers) · forced continuity (silent trial→paid, no reminder) · preselected add-ons / sneak-into-basket · nagging after an explicit no · trick wording and double negatives ("uncheck to not opt out") · visual interference (decline styled to disappear) · fake social proof or invented testimonials (also fails `craft-critique`'s fabrication scan).

### Persuasion that passes

True scarcity bound to real data (live inventory, real calendar availability) · real social proof with a checkable source · defaults that favor the user · price anchoring with real tiers · loss framing only when the loss is real · urgency from an actual deadline. Honest persuasion is design; dishonest persuasion is debt — it surfaces later as refunds, chargebacks, support tickets, and churn.

## Activation metrics: what to instrument

| Surface | Primary metric | Guardrail metric (dark patterns hide here) |
|---|---|---|
| Onboarding | Signup→activation rate; time-to-first-value; per-step drop-off | Early churn; support tickets; permission opt-out |
| Upgrade prompt | Prompt→conversion | Dismiss rate; feature abandonment after prompt |
| Paywall / trial | View→trial; trial→paid | Refunds; first-cycle cancellations |
| Launch page | Visitor→conversion event | Bounce; scroll-depth to proof section |

- Report **primary + guardrail together, always**. Good conversion with degrading guardrails is the metric signature of a dark pattern.
- Framework derivation (goals→signals→metrics, HEART) → `define-ux-success-metrics`. Test design and significance → `use-quantitative-evidence`. This skill's job is naming the events and shipping the instrumentation with the surface.

## Worked example — a salon booking app, first-run onboarding

Context: a native booking app for a salon, in beta, entered from the salon's site or a live chat assistant. The baseline flow below is an illustrative realistic shape, not any shipped app's exact flow.

**Conversion event:** first confirmed booking (the money event and the activation event coincide — service business).

**Arrival state:** user already chose the salon; often arrives from the chat assistant mid-intent with a service in mind. They do not need convincing — they need the fastest honest path to a slot.

**Baseline (illustrative):** splash → create account (6 fields) → phone verification → notification permission → preselected "promotional SMS" checkbox → browse services → book.

**Applied method:**
- **Cut list (Step 4):** splash removed; booking-first flow — pick service and slot BEFORE account creation (account = name + phone at confirm step, 6 fields → 2); notification permission moved to post-booking where it has obvious value ("get reminders for this appointment").
- **Ethics catch 1:** preselected promo-SMS checkbox fails **Informed** and **Symmetry** → unchecked by default, plainly labeled, opt-out one tap.
- **Ethics catch 2:** "Only 2 slots left today" allowed ONLY bound to the live calendar — real availability passes **Honesty**; a hardcoded scarcity string is blacklisted.
- **Utilities (Step 6):** `marketing-skills:onboarding` invoked for pattern breadth; its streak/gamification suggestion rejected on taste (gimmick register — per `design-taste`), its "delay account creation" pattern kept.
- **Instrumentation (Step 7):** install→first-booking rate, time-to-first-booking, per-step drop-off; guardrails: booking cancellation rate, SMS opt-out rate, review sentiment.
- **Claims audit (Step 8):** app-store copy promising "instant booking" verified against the real flow before ship.

## Anti-patterns

| Don't | Do |
|---|---|
| Design the surface, then decide what to measure | Metric named before the first sketch |
| Front-load setup ("tell us about yourself", 8 questions) | Default and infer; ask at the moment of relevance |
| Treat the paywall as an obstacle to hide | An honest paywall is UX: it answers "what does this cost me" clearly |
| Ship whatever the CRO utility suggests | Re-filter every suggestion — utilities don't know the ethics or taste bar |
| Persuade with adjectives ("seamless", "revolutionary") | Persuade with proof; claims per `craft-critique`'s evidence protocol |
| Bury or gray-out the decline | Symmetry test: decline as visible and easy as accept |
| Celebrate a conversion lift while guardrails degrade | Report primary + guardrail together, every time |
| Copy a competitor's paywall wholesale | `run-competitive-analysis` to learn, then design from YOUR user's arrival state |
| Make one page serve two conversion events | Split the surface — one event each |

## Output format

```markdown
## Growth Surface Spec: [surface name]

**Conversion event:** [one event]
**User state at arrival:** [source, knowledge, intent level]
**Pricing context:** [model + where this surface sits in the funnel]
**Activation metric:** [primary] · **Guardrails:** [2-3]
**Flow:** [numbered steps — with the cut list: what was removed/deferred and why]
**Ethics filter:** [each persuasion tactic → PASS / FAIL + which test]
**Utilities invoked:** [which marketing-skills + what was kept/rejected]
**Experiment plan:** [hypotheses handed to use-quantitative-evidence]
```

## Sources

NN/g grounding (from the design-strategy research corpus):
- Empty states — never blank; teach, guide, start: https://www.nngroup.com/articles/empty-state-interface-design/
- Form usability top 10 (signup flows): https://www.nngroup.com/articles/web-form-design/
- Placeholders as labels are harmful: https://www.nngroup.com/articles/form-design-placeholders/
- 4 principles to reduce cognitive load: https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/
- Progressive disclosure (staged onboarding complexity): https://www.nngroup.com/articles/progressive-disclosure/
- Interaction cost (step/field counting rationale): https://www.nngroup.com/articles/interaction-cost-definition/
- Better link labels — the 4Ss, no "Learn More": https://www.nngroup.com/articles/better-link-labels/
- Microcontent: headlines that work out of context: https://www.nngroup.com/articles/microcontent-how-to-write-headlines-page-titles-and-subject-lines/
- Translating UX goals into analytics measurement plans: https://www.nngroup.com/articles/ux-goals-analytics/
- Reporting business outcomes, not UX activity: https://www.nngroup.com/articles/reporting-ux-business-outcomes/
- Benchmarking product UX across releases: https://www.nngroup.com/articles/product-ux-benchmarks/
- Confirmation dialogs (when interruption is earned): https://www.nngroup.com/articles/confirmation-dialog/
- Prioritization methods (choosing which growth fix first): https://www.nngroup.com/articles/prioritization-methods/

## Boundaries

- `design-taste` owns all taste values — load first; cite it, never restate it.
- `craft-critique` owns the evidence-discipline protocol — every on-surface claim runs through it; this file never carries its own copy.
- `define-ux-success-metrics` owns metric frameworks; this skill only names surface events + guardrails.
- `use-quantitative-evidence` owns experiment design, sample sizes, and significance.
- `write-ux-microcopy` owns copy craft; `design-ui-states` owns form mechanics and state design; `build-frontend-interfaces` owns the build.
- `position-product` owns the differentiation story a launch page tells; this skill owns the page-as-funnel.
- `marketing-skills` plugins (cro, onboarding, copywriting, paywalls, pricing, signup, launch) are utilities: invoked for breadth, always re-filtered here before anything ships.
