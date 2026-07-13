---
name: audit-accessibility
description: "Run a WCAG-grounded accessibility audit on a design, prototype, or live page, severity-rate every finding, and enforce the hard accessibility launch gate. Use when asked to 'audit accessibility', 'check a11y', 'is this accessible?', 'run the accessibility gate', 'check contrast / keyboard / screen reader / focus states / target sizes', or before ANY external-facing launch or handoff — nothing Dinesh ships skips this gate. Also use to decide whether assistive-tech user testing is needed on top of the audit."
---

# Audit Accessibility

Run a five-pass WCAG 2.2 AA audit, severity-rate findings, issue a gate verdict — and always state the residual risk: **a WCAG pass is not proof of real assistive-technology usability** (NN/g).

Load `design-taste` first — accessibility-first is one of its taste tokens, and that token is the reason this gate is HARD, not advisory.

## When to use / when NOT to use

**Use when:**
- Anything external-facing is about to ship (portfolio, client work, a prototype shared for review) — this gate is mandatory, not optional
- Reviewing a design or build specifically for contrast, keyboard reach, focus, screen-reader behavior, target sizes, motion safety
- Deciding whether the project also needs usability testing WITH assistive-tech users

**Do NOT use for:**
- General usability violations (confusing flow, bad labels for sighted users) → `run-heuristic-evaluation`
- Overall design judgment and ship verdicts beyond a11y → `craft-critique` (it owns verdict language; this skill applies it to the a11y dimension)
- Full mechanical pre-ship QA (cross-device, performance, click-paths) → `verify-ui-quality`, which invokes THIS skill for its accessibility section
- Planning or moderating sessions with disabled participants → `plan-usability-test` + `moderate-usability-session` (this skill only tells you when that testing is required)

## Step 0 — Scope before you scan

1. List the page templates and the 2–4 **core task flows** (e.g., browse → select → book → confirm). Audit flows, not a random page list.
2. Include non-happy-path states: errors, empty, loading, modals, toasts. A11y failures cluster in states nobody designed.
3. Identify fidelity — it decides which passes you can run:

| Artifact | Passes you can run | Passes you must defer |
|---|---|---|
| Static design (Figma, mock) | Pass A (visual/static) only — plus check that alt text, labels, focus states, and reading order are *specified* | B–E need working code; log "unverified" not "pass" |
| Coded prototype / staging | All passes A–E | — |
| Live product | All passes A–E | — |

**Never report a criterion as "pass" that the fidelity didn't let you test.** Untested = unverified, and it says so in the report.

## The method — five passes, then rate, then gate

Run an automated scan first (axe DevTools, Lighthouse, or equivalent) — it catches roughly 30% of issues and is **never the audit by itself**. Everything below is the other 70%.

### Pass A — Static & visual (works at any fidelity)

- [ ] **1.4.3** Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large: ≥24px, or ≥18.5px bold) — measure, don't eyeball
- [ ] **1.4.11** UI components & meaningful graphics ≥ 3:1 against adjacent colors (includes focus rings, input borders, icons)
- [ ] **1.4.1** Color is never the only signal (error = red *and* icon/text; link = color *and* underline or weight)
- [ ] **2.5.8** Targets ≥ 24×24 CSS px (WCAG 2.2 AA minimum). Design target: 44×44 — the 24px floor is a legal minimum, not a goal. (44×44 is WCAG 2.5.5, an AAA criterion — don't cite it as AA.)
- [ ] **3.3.2** Every input has a visible label (placeholder ≠ label — it vanishes on input)
- [ ] **2.4.6** Headings and labels describe content; **2.4.4** link text makes sense out of context (no bare "click here")
- [ ] **1.1.1** Meaningful images have alt text specified; decorative images explicitly marked decorative (`alt=""`)
- [ ] **3.2.3 / 3.2.4** Navigation and recurring components consistent across screens

### Pass B — Keyboard only (unplug the mouse)

Tab through every core flow, start to finish:

- [ ] **2.1.1** Every action reachable and operable by keyboard (Enter/Space activate; Esc dismisses)
- [ ] **2.1.2** No traps — you can tab INTO and OUT of every widget, including modals and embedded players
- [ ] **2.4.3** Focus order follows visual/reading order — no jumps across the page
- [ ] **2.4.7** Focus is always visible; **2.4.11** and never hidden behind sticky headers/footers
- [ ] **2.4.1** Skip link past repeated nav on content pages
- [ ] **3.2.1** Focusing an element never triggers a context change (no auto-submit, no surprise navigation)
- [ ] **2.5.7** Anything drag-operated has a click/keyboard alternative

### Pass C — Screen reader (VoiceOver on macOS/iOS, NVDA on Windows, TalkBack on Android)

Drive the same flows eyes-closed, screen off or curtained:

- [ ] **4.1.2** Every control announces name + role + state ("Book appointment, button" — not "clickable")
- [ ] **1.3.1** Semantics are real: heading levels, lists, table headers, `label`↔input association — structure announced, not just styled
- [ ] **2.4.2** Page title describes the page; **3.1.1** page language set
- [ ] **2.5.3** Accessible name contains the visible label (voice-control users speak what they see)
- [ ] **4.1.3** Dynamic updates announced (form errors, "added to cart", async results) via live regions — silence after an action is a failure
- [ ] **3.3.1 / 3.3.3** Errors identified in text, associated with their field, with a suggested fix

### Pass D — Zoom & reflow

- [ ] **1.4.4** 200% browser zoom: no lost content or function
- [ ] **1.4.10** 320px-wide viewport (≈400% zoom): content reflows to one column, no two-axis scrolling
- [ ] **1.4.12** Survives user text-spacing overrides (no clipped/overlapping text)
- [ ] **1.4.13** Hover/focus-revealed content (tooltips, menus) is dismissible, hoverable, persistent

### Pass E — Motion, time, forms

- [ ] `prefers-reduced-motion` honored — animation gates on it (this is also a `design-taste` motion law; cite that file, don't restate its values)
- [ ] **2.2.2** Anything auto-moving/updating > 5s can be paused, stopped, or hidden
- [ ] **2.3.1** Nothing flashes more than 3×/second
- [ ] **2.2.1** Time limits adjustable or off (session timeouts warn and extend)
- [ ] **1.3.5** Common fields carry `autocomplete`; **3.3.7** users never re-enter info the flow already has
- [ ] **3.3.8** Login never requires transcription or memory tests (paste allowed in code fields)
- [ ] **3.3.4** Legal/financial/booking submissions are reversible, checked, or confirmed before commit

## Severity rating (a11y-tuned)

Rate every finding using Nielsen's three factors — **frequency × impact × persistence** (full 0–4 method lives in `analyze-usability-data`; don't re-derive it here). Map to:

| Rating | Definition | Examples |
|---|---|---|
| 🔴 Blocker | A user group **cannot complete a core task at all** | Keyboard trap in checkout; unlabeled required field; primary CTA text below 4.5:1; control invisible to screen reader |
| 🟡 Serious | Task completable but with heavy extra burden or partial exclusion | Illogical focus order; no skip link on long nav; error message not associated with field; 24px targets packed edge-to-edge on mobile |
| 🟢 Minor | Friction, not exclusion | Decorative image announced; verbose alt text; heading level skips in a footer |

Two hard rules govern a11y severity: findings are **never "minor" by default** (`craft-critique`'s accessibility rule), and when torn between two ratings, **rate up**. Never demote a finding because the fix is ugly or expensive — cost of fix is a planning input, not a severity input.

## The HARD launch gate

Verdict words per `craft-critique` (PASS / PASS WITH NOTES / BLOCKED):

```
Any 🔴 open?            → BLOCKED. Nothing external ships. No exceptions,
                          no "we'll patch it post-launch" — an inaccessible
                          launch IS the launch.
🔴 = 0, 🟡 open?         → PASS WITH NOTES only if every 🟡 has a named owner
                          and a date. Otherwise BLOCKED.
🔴 = 0, 🟡 = 0?          → PASS. 🟢 items go to the next pass.
Untested criteria exist? → Cap the verdict at PASS WITH NOTES and list them —
                          "couldn't test" never silently upgrades to "passed."
```

This gate cannot be waived — not by deadline pressure, not by "it's just a beta," not by the maker. Accessibility-first is Dinesh DNA (`design-taste`); waiving the gate is a taste violation, not a scheduling decision.

## The NN/g caveat — a WCAG pass is not accessibility

NN/g's controlled studies with assistive-technology users (blind, low-vision, and sighted control groups) found the web roughly **3× harder** to use for screen-reader users — including on sites that were nominally compliant. Their 75 accessible-design guidelines came from watching real AT users struggle, not from the spec. So:

1. **Every report carries a residual-risk line** — even at PASS: "WCAG 2.2 AA verified. Real assistive-tech usability not yet tested with AT users."
2. **Escalate to AT-user testing** when ANY of: the product is high-stakes for the user (money, health, booking, legal); the audience skews toward AT use; the UI is interaction-heavy (drag, canvas, voice, live regions everywhere); or this is a flagship external launch. Plan it via `plan-usability-test` — recruit AT users, run on **their own devices and settings**, on-site or observed remote.
3. **Never write "fully accessible"** in any deliverable. Write "WCAG 2.2 AA audited" plus the residual-risk line. The stronger claim needs AT-user evidence — that's the evidence protocol from `craft-critique`.

## Worked example — booking flow audit (3 screens: service → time slot → confirm)

**Fidelity:** staging build → all passes run. Automated scan: 4 hits. Manual passes: 5 more.

| # | Finding | Where | WCAG | Severity | Fix |
|---|---|---|---|---|---|
| 1 | Date-picker unreachable by keyboard; focus skips from "Service" straight to "Confirm" | Time slot | 2.1.1 | 🔴 | Native `<input type="date">` or grid with arrow-key nav + documented keys |
| 2 | Error "Please fix the errors above" not linked to the failing field; SR users hear it with no location | Confirm | 3.3.1 | 🔴 | Inline per-field error, `aria-describedby` to the input, focus moves to first error |
| 3 | Slot-selected state shown by color only (grey → light blue, 1.6:1 between states) | Time slot | 1.4.1, 1.4.11 | 🔴 | Add checkmark + border; selected/unselected difference ≥ 3:1 |
| 4 | "Booking confirmed" toast never announced; SR users act blind after submit | Confirm | 4.1.3 | 🟡 | `role="status"` live region; keep toast ≥ 5s or until dismissed |
| 5 | Focus ring on white buttons is 1.9:1 against background | All | 1.4.11 | 🟡 | 2px ring at ≥ 3:1 (use the accent color per `design-taste`) |
| 6 | Stylist portrait announced as "IMG_2041.jpg" | Service | 1.1.1 | 🟢 | Alt = stylist name; mark decorative duplicates `alt=""` |

**Verdict: BLOCKED** — findings 1–3 exclude keyboard and screen-reader users from booking at all. Shortest path to unblock: fix 1–3 (est. one focused day), re-run Passes B and C on the flow only, re-issue verdict.
**Residual risk:** WCAG 2.2 AA scope audited; not yet tested with assistive-tech users. Booking = high-stakes → recommend a 3-user VoiceOver/NVDA test before public launch (`plan-usability-test`).

## Anti-patterns

| Don't | Do |
|---|---|
| Ship on a clean automated scan | Scans catch ~30%; run all five manual passes |
| `outline: none` to "clean up" focus styles | Style the focus ring; never remove it |
| Bolt ARIA onto divs (`<div role="button">`) | Native elements first — `<button>`, `<a>`, `<label>`; ARIA only where HTML can't |
| Install an "accessibility overlay" widget | Fix the markup — overlays mask failures and break real AT setups |
| Disable pinch-zoom / set `maximum-scale=1` | Zoom is a right; test 200% and reflow instead |
| Rate a checkout blocker 🟡 because the fix is hard | Severity measures user impact only; rate up when torn |
| Declare "fully accessible" after a WCAG pass | "WCAG 2.2 AA audited" + residual-risk line; the stronger claim needs AT-user evidence |
| Mark untestable criteria as passed (static mock, "looks fine") | Log them as unverified; cap the verdict |
| Save the audit for the day before launch | Run Pass A at design time, full audit per build — accessibility-first means from the start |

## Output format

```markdown
## Accessibility Audit: [what was audited]
**Standard:** WCAG 2.2 AA · **Fidelity:** [static / staging / live] · **Passes run:** [A–E] · **Date:** [date]

**Verdict: PASS / PASS WITH NOTES / BLOCKED**
**The one thing:** [single highest-leverage fix, one sentence]

### Findings
| # | Finding | Where | WCAG | Severity | Fix |
|---|---------|-------|------|----------|-----|

### Contrast measurements
| Element | FG | BG | Ratio | Required | Pass? |
|---------|----|----|-------|----------|-------|

### Unverified at this fidelity
[criteria the artifact couldn't support testing — or "none"]

### Residual risk (mandatory, even at PASS)
WCAG 2.2 AA [verified / partially verified]. Real assistive-technology usability
not yet tested with AT users. [Escalation recommendation if triggered.]

### Priority fixes
1. [🔴 first — who it excludes, from what task]
```

## Sources

- NN/g, Beyond Accessibility: Treating Users with Disabilities as People — https://www.nngroup.com/articles/beyond-accessibility-treating-users-with-disabilities-as-people/
- NN/g, Usability Guidelines for Accessible Web Design (75 guidelines from AT-user studies) — https://www.nngroup.com/reports/usability-guidelines-accessible-web-design/
- NN/g, How to Conduct Usability Studies for Accessibility — https://www.nngroup.com/reports/how-to-conduct-usability-studies-accessibility/
- NN/g, Mobile Accessibility Research (VoiceOver/TalkBack protocol) — https://www.nngroup.com/articles/mobile-accessibility-research/
- NN/g, Visual Treatments that Improve Accessibility — https://www.nngroup.com/articles/visual-treatments-accessibility/
- NN/g, How to Rate the Severity of Usability Problems (frequency × impact × persistence) — https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
- WCAG 2.2 (W3C Recommendation) — https://www.w3.org/TR/WCAG22/

Adapted from Anthropic's design-plugin `accessibility-review` skill (WCAG quick-reference and report skeleton), extended with WCAG 2.2, the NN/g assistive-tech caveat, and the hard gate.

## Boundaries

- `design-taste` owns accessibility-first as a taste law and all motion/reduced-motion values — cite it, never restate.
- `craft-critique` owns verdict language (PASS / PASS WITH NOTES / BLOCKED) and the evidence protocol; this skill applies both to the a11y dimension.
- `analyze-usability-data` owns the general Nielsen 0–4 severity method; this skill carries only the a11y mapping.
- `verify-ui-quality` owns broader mechanical QA (cross-device, click-paths, performance) and invokes this skill as its accessibility section.
- `plan-usability-test` / `moderate-usability-session` own designing and running studies with assistive-tech users; this skill decides when that testing is required.
- `run-heuristic-evaluation` owns general usability inspection; a finding that harms everyone equally belongs there.
