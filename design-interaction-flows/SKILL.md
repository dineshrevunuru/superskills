---
name: design-interaction-flows
description: "Design-time interaction design: feature flows, task flows, user flows, and wireflows, plus PRD-to-scenario translation and systematic edge-case + failure-path enumeration. Use when asked to 'map the flow', 'design the user flow / task flow', 'design this feature end-to-end', 'translate this PRD into screens/scenarios', 'what are the edge cases', 'what happens if X fails', or before any high-fidelity screen work on a new feature. NOT for research-time experience maps (journey/empathy maps — that is map-customer-journey) and NOT for designing the content of each state (that is design-ui-states)."
---

# Design Interaction Flows

Turn a requirement into a complete interaction pathway — happy path, every branch, every failure with a named cause and a recovery — before a single high-fidelity screen exists.

## When to use / when NOT to use

**Use when:**
- A feature needs its end-to-end flow designed (trigger → goal, all paths).
- A PRD, brief, or client ask must become scenarios, screens, and edge cases.
- Someone asks "what happens if…" and there's no documented answer.
- High-fidelity work is about to start and the flow has never been drawn.

**Do NOT use when:**
- You're mapping what users experience across channels over time, with emotions and phases → `map-customer-journey` (research-time). This skill is **design-time**: pathways through a feature you are building.
- You're designing what each empty/loading/error screen actually contains → `design-ui-states`. This skill enumerates *which* states and paths must exist; that skill designs each one.
- You're writing tasks for a usability test → `write-task-scenarios`. Test scenarios evaluate a design; flows *are* the design.
- The failure is AI-specific (refusal, hallucination, rate limit, context overflow) → hand that branch to `design-ai-trust-and-failure-states`; keep the branch point in your flow.

Before any wireflow (screen-level) decision, load `design-taste` first.

## Pick the artifact (decision tree)

```
Need emotions/phases/cross-channel over time?
├── YES → journey or empathy map → STOP, use map-customer-journey
└── NO → Is there branching (decisions, user types, failures)?
    ├── NO, one linear path every user takes → TASK FLOW (numbered steps, no diamonds)
    └── YES → Are the screens designed or sketched yet?
        ├── NO → USER FLOW (boxes + decision diamonds; logic only, no UI)
        └── YES → WIREFLOW (wireframes as the nodes, arrows as the logic)
```

Per NN/g: user journeys are the macro cross-channel experience; user flows are the discrete interaction pathway. Wireflows (wireframe + flowchart hybrid) fit apps best, where one screen changes in place instead of navigating page-to-page — annotate the state change on the screen, don't fake a new page.

## The method

### Step 1 — Anchor the flow (one sentence, three slots)

Write: **"[Actor], triggered by [event], wants [outcome]."**
No actor/trigger/outcome = no flow. If the PRD doesn't say who or why, that's an open question for the PM — ask, don't invent.

Then list **every entry point**, minimum four candidates: primary navigation, deep link / shared URL, notification tap, and resume-after-interruption. A flow that starts at "Screen 1" has already failed — users arrive sideways.

### Step 2 — Translate the PRD into scenarios

Requirements describe **system capabilities**; scenarios describe **user paths**. Convert every requirement with this table:

| PRD line | Actor | Trigger | Happy-path scenario | Open questions |
|---|---|---|---|---|

Mechanical rules:
- Every "should / must / can" sentence spawns **at least one scenario**.
- Every "when / if / unless" clause spawns **a branch** (log it now, draw it in Step 4).
- Every noun with a lifecycle (account, booking, draft, payment) spawns **state-variance questions**: what if it doesn't exist yet / already exists / expired / was deleted?
- Anything the PRD is silent on goes in **Open questions** — never fill the gap with an assumption. Claims about external reality are handled per `craft-critique`'s evidence protocol.

### Step 3 — Draw the happy path first

The shortest successful path from trigger to goal. Numbered steps, **one user verb per step** ("Pick a time slot", not "Pick a time slot and confirm"). No branches yet — branching before the spine exists produces spaghetti.

### Step 4 — Branch systematically at EVERY step

This is the core value of the skill. At each numbered step, run all eight probes. Write down every branch they surface — even ones you'll cut later.

| # | Probe | Ask at this step |
|---|---|---|
| 1 | **User decision** | Can they legitimately choose something else here? Skip? Choose "none"? |
| 2 | **Input variance** | Empty, invalid, too long, duplicate, pasted, autofilled, wrong format? |
| 3 | **System failure** | Network drop, timeout, server error, stale/partial data on load? |
| 4 | **State variance** | First-time vs returning? Logged out? Session expired? Permission missing? Empty account? |
| 5 | **Interruption** | App backgrounded, tab closed, back button, refresh, device switch — mid-step. What's saved? Where do they resume? |
| 6 | **Concurrency** | Two tabs open? Another user changed the same data? Selected item taken before confirm? |
| 7 | **Reversal** | Can they cancel, undo, go back, or edit from here without losing everything? |
| 8 | **Slips vs mistakes** (NN/g) | Slip = right goal, wrong action (typo, misclick) → prevent with constraints, forgiving formats, good defaults. Mistake = wrong goal from a wrong mental model → prevent with clear signifiers, status visibility, confirmation only where consequences are severe. |

**Prevention beats handling.** For each branch, prefer in this order: (1) constrain the input so the branch can't occur, (2) undo after the action, (3) confirmation dialog (only for severe + infrequent actions — overuse trains click-through), (4) error message as last resort.

### Step 5 — Give every failure path a named cause and a re-entry

Every branch must terminate in exactly one of three ways:

1. **Goal reached** (rejoins the happy path)
2. **Deliberate exit** (user chose to leave; their progress is saved or clearly discarded)
3. **Designed failure** — with a **named cause** ("that slot was just booked", never "something went wrong") and a **recovery re-entry point** (which step the user returns to, with which selections preserved)

A generic "Error" node is a design debt marker, not a design. Fill in the failure-path table (see Output format) before calling the flow done.

### Step 6 — Cost the flow, then cut

- Count happy-path steps. Compare to the current product or a competitor doing the same job. If yours is longer, justify every extra step or cut it.
- Cost = **interaction cost** per NN/g: mental + physical effort, not click count. A 3-click flow with a 12-option decision at step 2 costs more than a 5-click flow of obvious choices.
- Cap choices per step (Hick's Law: decision time grows with option count). More than ~5 meaningful options at one decision point → group, default, or split the step.
- Defer optional complexity with **progressive disclosure**: advanced options live behind a secondary action, never in the main path.
- Match the user's **mental model** of the task order (people book "service → person → time", not "time → person → service" — verify order against research, not intuition).

### Step 7 — Convert to wireflow when screens matter

Load `design-taste` first. Replace boxes with low-fi wireframes; keep arrows as logic. For in-place screen changes (common in apps), draw the same screen twice with the changed region annotated — arrows between states of one screen are legitimate wireflow edges.

### Step 8 — Lint, then hand to critique

Run the flow-lint checklist below. Then submit the artifact to `craft-critique` for the judgment layer and verdict.

## Flow-lint checklist (run before calling any flow done)

- [ ] Actor + trigger + outcome written as one sentence at the top
- [ ] All entry points mapped (nav, deep link, notification, resume — minimum considered)
- [ ] Every step has an exit (back/cancel) that states what happens to progress
- [ ] Zero dead ends: every terminal is goal / deliberate exit / designed failure
- [ ] Every decision diamond has ALL outcomes labeled — if there are three outcomes, "yes/no" is a lie
- [ ] Every async step has a waiting state and a timeout branch
- [ ] Every destructive action has undo (preferred) or a confirmation (severe + infrequent only)
- [ ] Every failure names its cause in user language and its re-entry step
- [ ] First-time AND returning user both traced end-to-end
- [ ] Interruption probed at every step: what's saved, where they resume
- [ ] Concurrency probed on every shared or time-sensitive resource
- [ ] Happy path step count compared against current/competitor — shorter or justified
- [ ] AI-specific failure branches (if any) handed to `design-ai-trust-and-failure-states`
- [ ] Open questions listed with owners — none silently resolved by assumption

## Worked example — "Book an appointment" (salon booking app)

**PRD line:** "Users can book an appointment with a stylist of their choice at an available time slot. Returning users should be able to rebook their usual service quickly."

**Step 1 anchor:** *A salon client, triggered by needing a haircut, wants a confirmed appointment at a time that fits their week.*
Entry points: home-screen CTA · "Rebook" on a past appointment · reminder notification · deep link from the salon's site chatbot.

**Step 2 — PRD → scenarios:**

| PRD line | Actor | Trigger | Happy-path scenario | Open questions |
|---|---|---|---|---|
| "book … stylist of their choice at an available slot" | New client | Wants first appointment | Pick service → pick stylist → pick slot → confirm → confirmed | Deposit required? Cancellation policy shown when? |
| "returning users … rebook quickly" | Returning client | Reminder notification | Tap Rebook → last service+stylist prefilled → pick slot → confirm | What if their usual stylist left? |
| *(implied by "available")* | Any | Slot inventory changes | — | Who owns slot-hold duration during checkout? |

**Step 3 — happy path:** 1. Enter flow → 2. Pick service → 3. Pick stylist (or "first available") → 4. Pick date + time from open slots → 5. Review + confirm → 6. Confirmed (screen + notification).

**Step 4 — branch probes at step 4 alone (pick slot):**
- *State variance:* no open slots this week → show next available date up front + waitlist option (prevention: never render an empty calendar).
- *Concurrency:* slot taken between selection and confirm → designed failure, see table.
- *System failure:* slot fetch fails → cached last-known slots marked "may be stale" + retry.
- *User decision:* wants a stylist with zero availability → offer that stylist's next open date OR "first available" swap — both, labeled.
- *Interruption:* app killed after picking slot → selections persist as draft; resume prompt at next open.
- *Reversal:* back to step 3 keeps the chosen date sticky.

**Step 5 — failure-path table (excerpt):**

| Path | Named cause (user language) | User sees | Re-entry (state preserved) |
|---|---|---|---|
| Slot conflict at confirm | "That 2:00 slot was just booked." | Nearest 3 alternatives with same stylist | Step 4; service + stylist kept |
| Session expired at confirm | "You were signed out for security." | Sign-in, then straight back to review | Step 5; all selections kept |
| Usual stylist departed (rebook) | "Priya is no longer at this salon." | Two similar stylists + "first available" | Step 3; service kept |
| Payment/deposit fails | "Your card was declined." | Retry or different method; slot held N min | Step 5; slot hold timer visible |

**Step 6 — cost:** Rebook path = 3 steps (tap, slot, confirm) vs 5 for new clients — the PRD's "quickly" is now a measurable claim. Step 3 lists stylists with photo + next-available time (one decision, scannable), not a 20-cell grid.

**Deliberately out of scope here:** what the empty calendar, loading skeleton, or declined-payment screens contain → `design-ui-states`.

## Anti-patterns / red flags

| Red flag | Why it fails | Fix |
|---|---|---|
| Happy-path-only diagram ("the demo flow") | The PRD demo path is ~1 of many real paths; failures ship undesigned | Run all 8 probes at every step |
| One generic "Error" node | Failures without named causes can't be recovered from | Failure-path table, every row filled |
| Flow starts at the feature's first screen | Users arrive via links, notifications, resume | Map entry points in Step 1 |
| Decision diamond with missing outcomes | The unlabeled branch is where users get lost | Label ALL outcomes, even "closes app" |
| Emotions/phases lanes in a task flow | Journey-map cosplay — wrong artifact, wrong stage | Route to `map-customer-journey` |
| Confirmation dialog on every action | Trains click-through; real warnings get ignored | Constrain > undo > confirm (severe only) |
| Click-counting as the cost metric | A short flow of hard decisions costs more | Interaction cost: mental + physical |
| Designing screen content inside the flow doc | Scope bleed; the flow stalls on visual debates | Enumerate states here; design them in `design-ui-states` |
| Handling edge cases by adding steps for everyone | Punishes the 95% for the 5% | Prevent via constraints/defaults; branch only when unavoidable |
| Resolving PRD silence with assumptions | Invented requirements ship as bugs | Open-questions list with owners; ask |

## Output format

Deliver a **flow spec** — one markdown file (portable, diffable):

```markdown
# Flow: [feature name]
**Anchor:** [Actor], triggered by [event], wants [outcome].
**Entry points:** [list]

## Happy path
1. [step — one verb] …

## Flow diagram
[Mermaid flowchart: rectangles = screens/steps, diamonds = decisions
 (all outcomes labeled), rounded = terminals typed as goal/exit/failure]

## Branch inventory
| Step | Probe | Branch | Resolution (prevented / undo / confirm / designed failure) |

## Failure paths
| Path | Named cause (user language) | User sees | Re-entry (state preserved) |

## Cost
Happy-path steps: N (vs current/competitor: M). Largest decision point: [step, option count].

## Open questions
| Question | Owner | Blocks which branch |
```

Use Mermaid for the diagram (`flowchart TD`) so the spec stays text. Escalate to a wireflow (Figma or coded) only once screens exist — the spec file remains the source of truth for the logic.

## Sources

- User journeys vs. user flows — https://www.nngroup.com/articles/user-journeys-vs-user-flows/
- Wireflows: a UX deliverable for workflows and apps — https://www.nngroup.com/articles/wireflows/
- UX mapping methods cheat sheet — https://www.nngroup.com/articles/ux-mapping-cheat-sheet/
- Journey mapping 101 (the boundary artifact) — https://www.nngroup.com/articles/journey-mapping-101/
- Interaction cost — https://www.nngroup.com/articles/interaction-cost-definition/
- Progressive disclosure — https://www.nngroup.com/articles/progressive-disclosure/
- Slips vs. mistakes (user error taxonomy) — https://www.nngroup.com/articles/user-mistakes/
- Mental models — https://www.nngroup.com/articles/mental-models/
- Confirmation dialogs — https://www.nngroup.com/articles/confirmation-dialog/

## Boundaries

- **`map-customer-journey`** owns research-time experience mapping (journey maps, empathy maps: phases, emotions, cross-channel). This skill owns **design-time** feature/task flows, wireflows, and edge-case enumeration. If the artifact has an emotion lane, it belongs there; if it has decision diamonds, it belongs here.
- **`design-ui-states`** designs the content of each state (empty/loading/error/partial/ideal screens). This skill only enumerates which states and paths must exist and hands the list over.
- **`write-task-scenarios`** owns usability-test task writing (evaluation). Flows are the thing being tested, not the test.
- **`design-ai-trust-and-failure-states`** owns AI-specific failure UX (refusal, hallucination, rate limit, timeout on model calls). Keep the branch point in your flow; hand the branch's design there.
- **`design-taste`** is loaded before any wireflow/screen-level decision; **`craft-critique`** owns the judgment layer, verdict language, and the evidence protocol for unresolved claims.
