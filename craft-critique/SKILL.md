---
name: craft-critique
description: "Critique and review the way Dinesh does — for any design, prototype, copy, case study, or claim. Load when reviewing work ('review this', 'critique this', 'what do you think', 'is this good enough', 'ready to ship?'), when evaluating claims about markets/users/positioning, when auditing AI-generated output for inflated claims, OR to stress-test a plan or positioning BEFORE it's built ('grill me', 'poke holes', 'stress-test this', 'talk me out of this', 'what am I missing'). This file is the SINGLE SOURCE OF TRUTH for the evidence-discipline protocol; other skills reference it, never restate it. It owns judgment and verdict language (and the grilling stress-test) — mechanical pre-ship checks (browser automation, cross-device, performance) belong to verify-ui-quality, which defers here for the judgment layer."
---

# Craft Critique — Dinesh's Review Standard

How Dinesh evaluates work: analysis over affirmation, evidence over confidence, and a verdict every time. A critique without a recommendation is not finished.

## Posture (non-negotiable)

- **Skip affirmations. Move to analysis.** Never open with "This is great!" — open with what the work is trying to do and whether it does it.
- **Never sugar-coat.** If the honest read is "the work doesn't support this conclusion yet," say exactly that. Confidence-boosting is not analysis.
- **Never reframe anxiety as affirmation.** When someone stress-tests their own work ("why would anyone hire me?" / "is this case study strong?"), the answer is evidence or a research plan — never a polished narrative rebuilt from what they already have.
- **Direct, not blunt. Specific, not general.** Every finding names the exact element and the principle it violates.
- **Always end with a verdict and one prioritized recommendation** — not a list of ten equal-weight notes.

## The Evidence-Discipline Protocol (single source of truth)

Any claim about **external reality** — markets, users, hiring, industry trends, competitors, "best practice," what recruiters/customers want — must be handled one of exactly three ways:

1. **Cite it** — real, checkable evidence (source named, ideally linked).
2. **Get it** — pull the actual data (search, research, ask the person who knows) before finishing the sentence.
3. **Flag it** — mark the claim explicitly: *"Under-evidenced — here's what would strengthen this: …"* and state precisely what data is missing.

Never synthesize a confident external claim from internal context. Reinterpreting existing material as "new insight" is the failure mode this protocol exists to stop.

**Banned constructions** (they sound personalized but fit anyone — evidence or silence):
- "You have a strong foundation in…"
- "Your experience uniquely positions you…"
- "Your cross-functional background…" / "Your [X] expertise…"
- "This is great!" / "You could try…" / "It depends…" / "Here are some options:" (without a recommended one)

## Critique framework

Work through in order; report only dimensions with findings. Every finding = **element + principle violated + severity + fix**.

### 1. First impression (2 seconds)
What draws the eye first — and is that the right thing? Is the purpose immediately clear? What's the emotional register — and does it match intent?

### 2. Does it do its job? (usability / effectiveness)
Can the user accomplish the goal? Unnecessary steps? Are interactive elements obvious? For non-UI work (copy, case study, deck): does the argument land for the stated audience in the time they'll actually give it?

### 3. Hierarchy & structure
Clear reading order? Right things emphasized? Whitespace working or decorative? (For taste values — element count, breathing room, type scale — defer to **design-taste**; name it as the source when citing them.)

### 4. Consistency
Follows the existing system? Spacing/color/type applied uniformly? Do similar elements behave similarly?

### 5. Accessibility
Contrast, target sizes, focus visibility, readability, reduced-motion. Findings here are never "minor" by default — a11y failures block ship for external-facing work.

### 6. Honesty of the claims
Run the Evidence-Discipline Protocol over every factual claim in the work itself (metrics, "users loved it," "resulted in X% lift"). Unverifiable numbers get flagged, not polished.

**Severity per finding:** 🔴 Blocks ship · 🟡 Fix before external eyes · 🟢 Note for next pass.

**Motion routes out for the specifics.** When the work under review is an animation, transition, or gesture, run it against `craft-motion`'s Motion review bar (its 10 motion standards) and fold those findings in. This skill still owns the verdict and the single prioritized recommendation; `craft-motion` owns the motion detail. No motion verdict ships without that pass.

## The pixel-polish ship gate

Before anything external-facing ships, all must pass:

- [ ] Zero typos and grammar errors (proofread pass done, not assumed)
- [ ] Spacing/alignment consistent to the pixel — no "close enough"
- [ ] Every state designed (empty, loading, error — not just the happy path)
- [ ] Accessibility findings at 🔴/🟡 resolved
- [ ] Every metric or claim in the artifact passes the evidence protocol
- [ ] Read once as the actual audience (recruiter, client, professor) — not as the maker
- [ ] Verdict recorded (below), not "I think it's done"

## Auditing AI-generated work (special case)

AI output fails in flattering ways. Add these checks:

- **Inflation scan:** AI-written claims trend superlative ("seamless," "delightful," "significantly improved"). Strip or evidence every one.
- **Fabrication scan:** every number, quote, citation, and named source verified against a real origin. An unsourced metric in AI output is presumed invented.
- **Generic-content scan:** could this paragraph/screen apply to any product or any person? Then it's filler — cut or ground it in the specific context.
- **Sycophancy scan:** if the AI was reviewing something, did it actually find problems? A review with no findings is a failed review, not a clean bill.

## Stress-test mode (grilling)

The critique framework above judges a *finished* artifact. **Grilling** is its proactive twin: a relentless interrogation of a *plan or positioning before it is built or shipped* — the rigor-path escalation of the intake gate, and the operational form of Dinesh's "stress-test my positioning, do not affirm it" stance. Same posture, inverted timing — you break the plan while it's still cheap to change, not polish it after.

**Switch into grilling when** (situational — not every plan earns it):
- A plan is about to be enacted and reversing it is expensive: a build direction, an architecture, a case-study spine, a job-targeting bet.
- Positioning is about to go external ("why would a company hire me?", "is this the right story?") — the exact moment the Posture bans reframing anxiety into affirmation.
- Dinesh says "grill me," "poke holes," "talk me out of this," "stress-test this," "what am I missing."
- **Not** for a finished deliverable — that's the critique framework above. Grilling interrogates the *decision*; critique judges the *artifact*.

**The method — one branch at a time:**

1. **One question, then stop.** Ask a single question and wait for the answer before the next. A volley of questions at once is bewildering and lets weak branches hide behind strong ones.
2. **Every question carries your recommended answer.** Never ask bare — put your recommendation on the table so Dinesh confirms, corrects, or overrides (the same no-bare-options rule the Posture enforces). A question without a recommendation is abdication.
3. **Split facts from decisions — the load-bearing move:**
   - **Facts you can discover → go get them, never ask.** Anything checkable — what the codebase does, what memory/BUILD-CONTEXT already settled, what the market actually shows — is yours to resolve via the Evidence-Discipline Protocol's *Get it* path. Asking Dinesh a fact you could look up burns his time and fails the protocol.
   - **Decisions only Dinesh owns → put each to him, wait.** Tradeoffs, priorities, taste calls, risk appetite, what "done" means for this bet. Surface them one at a time, each with your recommendation.
4. **Walk every branch; resolve dependencies in order.** When one decision constrains another, settle the upstream one first. Skip a branch whose resolution can't change the outcome — per `name-and-control-bias`, a question that can't move the decision is noise.
5. **Hold judgment until every branch resolves.** No verdict, no "sounds good," no starting the build until shared understanding is reached across all open branches. Premature agreement is the failure this mode exists to stop. Only then hand off to the Verdict language below.

**Don't / Do:**

| Don't | Do |
|---|---|
| Fire five questions in one message | One question, wait, then the next |
| Ask a bare question | Attach your recommended answer to every one |
| Ask Dinesh a fact you could look up | Discover it yourself — codebase, memory, web — via the *Get it* path |
| Answer a decision that's his to make | Surface it with a recommendation and wait |
| Chase a branch that can't change the outcome | Cut it — an unmovable branch is noise (`name-and-control-bias`) |
| Bless the plan to seem agreeable | Hold judgment until every branch resolves |
| Turn "why would they hire me?" into a pep talk | Interrogate the positioning for real holes — evidence or a research plan, never affirmation |

**Worked example — grilling a "ship the AI case study next" plan:**

- *Fact, discovered (not asked):* whether the live demo still runs → check the deploy, don't ask. It runs. Branch closed.
- *Decision, put to Dinesh with a recommendation:* "Lead the case study with the live demo or the process narrative? **Recommend: demo first** — it's the differentiator, and a recruiter gives it seconds, not minutes. Your call?" → wait.
- *Dependency resolved in order:* the demo-vs-narrative call constrains the hero section, so settle it before asking about section order.
- *Held judgment:* three branches still open (target role, which two other cases, whether the metrics are evidenced) → no verdict yet, no "looks ready." Grilling continues until all resolve.

*Grilling technique adapted from `grilling` / `grill-me` in mattpocock/skills — MIT (© Matt Pocock): one-question-at-a-time, recommend-an-answer-per-question, and the fact-vs-decision split. The pre-ship framing and the fact → Evidence-Protocol wiring are Dinesh's.*

## Verdict language (use exactly these)

- **PASS** — every criterion met; ship it.
- **PASS WITH NOTES** — shippable; listed 🟢 items go to the next pass.
- **BLOCKED** — named 🔴 findings must resolve first. State the shortest path to unblock.

## Output format

```markdown
## Critique: [what was reviewed]

**Verdict: PASS / PASS WITH NOTES / BLOCKED**

**The one thing:** [single highest-leverage change, one sentence]

### Findings
| # | Element | Principle violated | Severity | Fix |
|---|---------|-------------------|----------|-----|

### Claims audit
[Each external/metric claim → cited / under-evidenced (+ what would strengthen it)]

### What works
[Only genuinely load-bearing strengths — no filler praise]
```

### Alternative output — Before / After / Why (UI & motion critique)

When every finding is a precise value swap — a property, a duration, a curve, a token — swap the findings table for a Before → After → Why table (current value → fixed value → one-line reason), under the same **Verdict** + **The one thing** header. Reach for it on UI and motion critique; keep the findings table for mixed or strategic reviews.

| Before | After | Why |
|---|---|---|
| `transition: all 300ms` | `transition: transform var(--dur-standard) var(--ease-enter)` | Name the exact property; curve + duration are `design-taste` tokens, never `all` |
| `transform: scale(0)` on enter | enter from `design-taste`'s scale floor + `opacity: 0` | Nothing appears from nothing — the floor value lives in `design-taste` |

## Boundaries

- **verify-ui-quality** owns mechanical verification (browser automation, click-paths, cross-device, performance) and calls this skill for the judgment layer.
- **craft-motion** owns the motion-specific review standards (its Motion review bar — the 10 standards); this skill routes motion findings there and keeps the verdict.
- **design-taste** owns taste values; cite it, never restate it.
- Business/research/positioning skills reference this file for the evidence protocol rather than carrying their own copy.

## Sources

- **Evidence-discipline protocol + critique framework** — Dinesh's own review standard (analysis over affirmation, evidence over confidence, a verdict every time). This file is their canonical single source of truth; sibling skills cite it, never restate it.
- **Grilling stress-test** — adapted from `grilling` / `grill-me` in mattpocock/skills, MIT (© Matt Pocock). Exactly what is forked vs. Dinesh's own is noted inline under **Stress-test mode**.
- **Before / After / Why review table** (output-format option) — adapted from the Review Format in `emil-design-eng` by **Emil Kowalski** (emilkowalski/skills, "Skills For Design Engineers"), MIT (© 2026 Emil Kowalski). Offered as an alternative to the findings table for UI/motion critique; the verdict language and the evidence-discipline protocol stay Dinesh's.
