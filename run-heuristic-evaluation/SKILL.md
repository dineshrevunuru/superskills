---
name: run-heuristic-evaluation
description: "Runs an expert usability inspection without users: Nielsen's 10 heuristics operationalized with per-heuristic violation questions, a multi-evaluator two-pass protocol with aggregation, and a cognitive walkthrough for learnability. Produces a prioritized expert-review deliverable. Use when someone says 'run a heuristic evaluation', 'expert review this UI', 'inspect this against the heuristics', 'cognitive walkthrough', 'find usability problems without testing users', or when there is no time/budget/access for a usability test. NOT for severity rating (analyze-usability-data owns the 0–4 scale), WCAG audits (audit-accessibility), or testing with real users (plan-usability-test)."
---

# Run Heuristic Evaluation

Predict usability problems by systematic inspection — named heuristic, exact location, evidence, recommendation — before (or instead of) putting the design in front of users.

## When to use / when NOT to use

**Use when:**
- A design or live product needs a usability check and user testing isn't feasible yet (budget, time, access, confidentiality)
- A pre-test sweep will clear obvious problems so a usability test spends its sessions on the hard ones
- Learnability of a specific first-run task is in question → run the cognitive walkthrough section
- A client or stakeholder asks for an "expert review" or "UX audit"

**NOT when:**
- You need to know what real users actually do → `plan-usability-test` + `moderate-usability-session`. Inspection **predicts** problems; testing **observes** them. Never present inspection findings as user behavior.
- The question is accessibility compliance → `audit-accessibility` (WCAG-grounded). Hand any a11y finding surfaced here to that skill.
- Findings need severity ratings → rate them via `analyze-usability-data` (canonical home of Nielsen's 0–4 scale). This skill never restates the scale.
- The work is Dinesh's own design and the ask is a judgment call / ship verdict → `craft-critique` owns verdict language.

## Choose the inspection method (decision tree)

```
What's the question?
├─ "Where does this UI violate usability principles?" (broad sweep)
│    → HEURISTIC EVALUATION (Method A)
├─ "Can a first-time user figure out THIS task?" (learnability, one flow)
│    → COGNITIVE WALKTHROUGH (Method B)
├─ "Client wants one prioritized audit of the product"
│    → EXPERT REVIEW (Method C) — heuristics + walkthrough on the core task + domain knowledge
└─ "Is it accessible?" → STOP. Load audit-accessibility.
```

Methods combine: an expert review typically = Method A across key screens + Method B on the single most critical task.

## Method A — Heuristic evaluation

### The 10 heuristics, operationalized

For each screen or flow step, run down this table. A "yes" to any violation question = capture a finding (format below). Do not treat the table as a compliance checklist — heuristics are broad rules of thumb; the questions exist to focus judgment, not replace it.

| # | Heuristic | Violation questions (a "yes" = finding) | Canonical violation |
|---|---|---|---|
| H1 | Visibility of system status | Does any action lack feedback within ~1s (or a progress state if longer)? Is the current state/location ever ambiguous? Are background operations (saving, syncing) invisible? | Tap "Submit" → nothing visibly happens for 3s |
| H2 | Match between system and real world | Does any label use internal/system jargon where a user word exists? Does any icon or metaphor break real-world convention? Is information ordered by the system's logic instead of the user's? | "Ingestion queue" instead of "Uploads" |
| H3 | User control and freedom | Is any action missing a clearly marked exit, cancel, or undo? Can a user lose work by leaving a multi-step flow? Is any destructive action neither reversible nor confirm-gated? | Modal with no close affordance; back loses form data |
| H4 | Consistency and standards | Does the same word/icon/action mean different things in different places (internal)? Does it defy platform or web convention (external)? Do similar things look different, or different things look alike? | "Delete" here, "Remove" there, for the same operation |
| H5 | Error prevention | Could a constraint or better default prevent a likely slip (free-text date vs picker)? Is any high-consequence action unguarded by confirmation with a meaningful preview? Are errors caught only at submit instead of at entry? | Free-text date field that rejects at submit |
| H6 | Recognition rather than recall | Must the user remember anything from a previous screen or step? Are needed options, history, or format requirements hidden at the moment of use? | Password rules revealed only in the error message |
| H7 | Flexibility and efficiency of use | Do experts have zero accelerators (shortcuts, recents, bulk actions, defaults from history)? Must frequent actions repeat the full novice path every time? | Re-entering the same shipping address every order |
| H8 | Aesthetic and minimalist design | Does any element carry no information the user needs right now? Does visual noise compete with the primary content or action? Could something be removed with zero loss? | Promo banner competing with the checkout button |
| H9 | Help users recognize, diagnose, and recover from errors | Does any error message omit what happened, why, or what to do next? Any raw error codes, blame-toned copy, or destroyed work on error? | "Error 422" with the form wiped |
| H10 | Help and documentation | Is help absent at the moment of need (in-context hints, examples)? Is documentation organized by feature instead of by user task? Does a core task *require* documentation at all? | Tooltip-less pricing tiers explained only in a PDF |

Note on H8: on Dinesh's own work, H8 sets the floor — `design-taste` sets the (stricter) bar. Flag against both, cite each source.

### Two-pass protocol (per evaluator, independent)

**Setup:** 3–5 evaluators. A single evaluator finds only ~35% of problems, and different evaluators find *different* problems — that is the whole reason for multiples. No discussion between evaluators until aggregation. Timebox: 1–2 hours per evaluator.

1. **Pass 1 — Familiarize (15–20 min).** Walk the flows as a user would, end to end. Note first impressions and where you stumbled. Do NOT hunt violations yet — you need the system's feel and vocabulary first.
2. **Pass 2 — Hunt (rest of timebox).** Screen by screen, run the violation-question table. Capture every violation separately, even small ones, even duplicates of "probably obvious" ones. One finding = one capture:

```
[Screen/step] · H# · [one-line issue] · [evidence: screenshot or exact observation] 
```

3. **Compulsory sweep before finishing:** confirm you checked all 10 heuristics at least once. Uninspected ≠ passing.

### Aggregation (after all evaluators finish)

1. **Merge** all captures into one deduplicated issue list (same issue, different words → one entry; keep the clearest phrasing, note how many evaluators found it).
2. **Rate:** every evaluator independently severity-rates EVERY issue — including ones they didn't find — using the 0–4 scale in `analyze-usability-data`. Average the ratings.
3. **Order** by mean severity, ties broken by effort-to-fix (cheap first).
4. Only now discuss: resolve rating spreads > 2 points by talking through frequency/impact/persistence, per `analyze-usability-data`.

### Solo-evaluator variant (realistic freelance case)

When it's genuinely just you:
- State the ~35% coverage caveat **in the deliverable**, not just verbally.
- Split the two passes across two days if at all possible — fresh eyes recover some of the multi-evaluator effect.
- Add Method B on the most critical task as a second, different lens.
- Never call the output "a heuristic evaluation found all…" — call it a first-pass inspection.

## Method B — Cognitive walkthrough (learnability)

Use for: "will a new user succeed at this task on first try?" — onboarding, first booking, first upload, any flow where users won't get training.

1. **Define up front (before looking at the UI):**
   - Target user + what they know walking in (one sentence)
   - The task, phrased as the user's goal
   - The CORRECT action sequence, step by step, as the designer intends it
2. **For EACH step**, ask the four questions:
   - **Q1** — Will the user try to achieve the right sub-goal here? (Do they even know this step is needed?)
   - **Q2** — Will the user notice the correct control is available? (Visible? Above the fold? Recognizable as interactive?)
   - **Q3** — Will the user connect the control to their goal? (Does the label/icon mean what they're trying to do, in their words?)
   - **Q4** — After acting, will the user see progress toward the goal? (Feedback confirms the right thing happened?)
3. **Any "no" or "probably not" → write a failure story:** "At step N, the user fails because [Q# fails: reason]." Failure stories are the output — not fixes, not debate.
4. **Workshop format (group):** facilitator holds the step sequence, evaluators answer the four questions aloud, note-taker captures failure stories verbatim. Hard rule: **no designing fixes during the walkthrough** — park them. Timebox ~10 min per step.

Failure stories feed the same aggregated findings list as Method A (tag them `CW-Q#` instead of `H#`).

## Method C — Expert review (the client deliverable)

An expert review is the packaged, prioritized combination: Method A across the scoped screens + Method B on the core task + comparative/domain knowledge ("competitor checkouts all put X here" — such claims follow `craft-critique`'s evidence-discipline protocol, loaded from that skill, not restated here).

Non-negotiables for the deliverable:
- Every finding: **issue + location + evidence (screenshot) + violated principle + recommendation**. A finding missing any of these is not a finding.
- Findings phrased as predictions ("users are likely to miss…"), never as observed behavior ("users can't find…") — no users were present.
- A "what passed" section — scoped inspection with clean areas named is credible; a pure defect list reads as a hit job.
- Prioritized by severity via `analyze-usability-data`; recommendations are specific changes, not "improve the navigation."

## Worked example (aggregation snippet)

Scope: salon-booking app, "book first appointment" flow, 3 evaluators, 90 min each.

Raw captures (evaluators A, B, C — independent):

```
A: [Time-slot grid] · H1 · Tapped slot gives no selected state · screenshot-04
B: [Slot picker] · H1 · Can't tell which slot I picked; no highlight · screenshot-04
C: [Stylist row] · H2+H6 · Stylists shown as unlabeled avatars — must recall who's who · screenshot-02
A: [Confirm screen] · H3 · No way back to edit time without restarting flow · screenshot-06
```

After merge + independent 0–4 rating by all three (scale per `analyze-usability-data`):

| # | Issue | Location | Principle | Found by | Mean sev | Recommendation |
|---|---|---|---|---|---|---|
| 1 | No back/edit from confirm screen; users restart the flow | Confirm screen | H3 | 1/3 | 3.3 | Add "Edit time" link returning to the picker with state preserved |
| 2 | Selected time slot has no visible selected state | Slot picker | H1 | 2/3 | 3.0 | Filled accent state + confirmation text ("Tue 2:30 selected") |
| 3 | Stylists are unlabeled avatars; choosing requires recall | Stylist step | H2, H6 | 1/3 | 2.3 | Name + specialty label under each avatar |

Walkthrough check on the same flow, step 3 (choose stylist): Q2 fails — avatar row doesn't read as interactive. Failure story: "At step 3, a first-time user fails because the stylist avatars look decorative (CW-Q2)." Corroborates finding #3 → note the corroboration, keep one entry.

Note issue #1: found by only one evaluator, rated most severe by all three. This is normal — it is why everyone rates everything.

## Anti-patterns / red flags

| Red flag | Why it fails | Instead |
|---|---|---|
| Heuristics used as a compliance checklist ("has help docs ✓") | H10 satisfied by a bad PDF is still a violation; heuristics need judgment | Run the violation questions against real task moments |
| Evaluators comparing notes mid-evaluation | Findings converge; you pay for 3 evaluators and get 1.2 | Fully independent until aggregation |
| "The navigation is confusing" | No location, no principle, no evidence — unactionable | Element + H# + screenshot + specific fix |
| Solution-first findings ("add a hamburger menu") | Skips the problem; team can't evaluate alternatives | State violation first, recommendation second |
| Reporting predictions as user behavior | Inspection has n=0 users; overclaiming burns trust | "Likely to" language + recommend testing for contested findings |
| Only the evaluator who found an issue rates it | Finders overrate their own findings | Everyone rates everything, then average |
| Evaluating your own same-day design | You'll walk the intended path blind to violations | Different evaluator, or minimum a cold-eyes gap |
| Selling heuristic evaluation as a replacement for testing | It finds different problems than testing, not the same ones cheaper | Position as pre-test sweep or no-access fallback |
| Fix debate inside the cognitive walkthrough | Kills the timebox; unfinished walkthrough | Park fixes; failure stories only |
| Severity invented inline ("this feels like a 4") | Scale drift across reports | Rate via `analyze-usability-data`'s tree, show the reasoning line |

## Output format

```markdown
# Expert Review — [product · flows] · [date]

**Method:** [heuristic evaluation / cognitive walkthrough / combined]
**Evaluators:** [names, N] [if solo: "Single evaluator — finds ~35% of problems; treat as first pass."]
**Scope:** [screens/flows inspected] · **Excluded:** [what was not inspected]

## Top findings (by severity — scale per analyze-usability-data)
| # | Issue | Location | Principle | Severity (0–4) | Recommendation |

## Finding N — [one line] · [H# / CW-Q#] · Severity [X]
- **Evidence:** [screenshot ref + exact observation]
- **Why it's a problem:** [heuristic/question violated, one line]
- **Recommendation:** [specific change] · **Effort:** [S/M/L]

## Walkthrough failure stories (if Method B ran)
- Step N: [failure story + failed question]

## What passed
[Heuristics/areas inspected and clean — named, not implied]

## Limitations
[No users observed — predictions only; coverage caveats; what testing should verify]
```

## Sources

- 10 Usability Heuristics for User Interface Design — https://www.nngroup.com/articles/ten-usability-heuristics/
- How to Conduct a Heuristic Evaluation (3–5 evaluators, two passes, ~35% single-evaluator coverage) — https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/
- Theory: heuristics are rules of thumb, not a spec checklist — https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/theory-heuristic-evaluations/
- Usability Problems Found by Heuristic Evaluation — https://www.nngroup.com/articles/usability-problems-found-by-heuristic-evaluation/
- Usability Heuristics Applied to Complex Applications — https://www.nngroup.com/articles/usability-heuristics-complex-applications/
- Cognitive Walkthroughs (four questions, learnability) — https://www.nngroup.com/articles/cognitive-walkthroughs/
- Cognitive Walkthrough Workshop format — https://www.nngroup.com/articles/cognitive-walkthrough-workshop/
- UX Expert Reviews (prioritized deliverable) — https://www.nngroup.com/articles/ux-expert-reviews/
- Summary of Usability Inspection Methods (where each method sits) — https://www.nngroup.com/articles/summary-of-usability-inspection-methods/

## Boundaries

- **analyze-usability-data** is the canonical home of Nielsen's 0–4 severity scale (frequency × impact × persistence). All findings here are rated THERE — this skill never restates the scale.
- **plan-usability-test / moderate-usability-session** own evaluation with real users. Inspection predicts; testing observes. Contested or high-severity predictions get verified by testing.
- **audit-accessibility** owns WCAG-grounded accessibility evaluation. A11y findings surfaced during inspection are handed there, not adjudicated here.
- **craft-critique** owns verdict language (PASS/BLOCKED) and the evidence-discipline protocol; comparative or market claims inside an expert review follow that protocol.
- **design-taste** owns aesthetic judgment on Dinesh's own work — H8 is the industry floor, design-taste is his bar.
