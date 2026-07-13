---
name: qa-to-issues
description: "Conversational bug intake: Dinesh describes what's wrong in plain language (or hands over a `verify-ui-quality` findings log) and you file durable, domain-worded issues — many thin issues over one thick vibe. Use when running a QA pass on a self-built app, when a client/beta tester reports something in a rambling message, or on 'it feels broken', 'let's do a QA session', 'file this as an issue', 'log these bugs', 'turn this findings log into issues', 'write up what's wrong'. SOLO DEFAULT: a local `ISSUES.md` punch list, no tracker; mode-switches UP to `gh issue create` only when he runs a shared GitHub repo. Captures + files only — it does NOT verify reproduction (triage-issues) or hunt the bug (diagnose-bugs)."
license: "MIT — forked from `qa` (deprecated upstream) in mattpocock/skills (© Matt Pocock, 'Skills For Real Engineers'). The method was taken, not the deprecated status; Don't/Do tables kept over the anti-negation rule. Full kept/personalized breakdown in ## Sources."
---

# QA to Issues — Capture the Vibe, File Thin Durable Issues

Part of the **SHIP wing** (production-code craft). The intake mouth of the delivery pipeline: Dinesh talks, you **file**. The governing idea — **many thin issues over one thick vibe.** The failure this exists to prevent: taking a rambling "it feels broken" and either filing it as one unactionable mega-issue *or* discarding the vibe because it wasn't crisp. You do neither — you decompose the vibe into discrete, domain-worded, separately-filable issues, and file only what the reporter can actually stand behind.

## When to use / when NOT to use

- **Use** to capture bugs *as they're described* — a live QA pass on his own Next/React build, a client/beta text ("the booking's acting up"), or a `verify-ui-quality` findings log that needs turning into filed issues.
- **NOT the verify.** This files the raw report; it does **not** reproduce it. Confirming the claim holds, categorizing, and writing an agent-ready brief is **`triage-issues`** — downstream of what this produces.
- **NOT the hunt.** Reproduce → minimize → hypothesize → fix → regress is **`diagnose-bugs`**. This never touches a fix.
- **NOT the measuring.** Driving click-paths and reading computed styles is **`verify-ui-quality`**; it produces the findings log this skill *files from*.
- **NOT framing a new project.** A "bug report" that's really an unstated feature ("we should add loyalty points") is not an issue — route it to **`write-problem-statement`**.

## Two paths — mode-switchable

Same capture discipline; only the destination and ceremony differ.

- **Solo local list (default):** append thin entries to an **`ISSUES.md`** punch list (repo root, or the active workpack). No tracker, no `gh`, no provenance note — it's his own list. This is the default because he mostly works solo/freelance.
- **Tracker (mode-switch UP — only when a shared repo exists):** `gh issue create`, one issue per concern. *Then* the ceremony earns its keep: file in dependency order so `Blocked by #N` references real numbers, note blocking honestly, and open every body you (not he) wrote with `> *Filed by AI during a QA pass.*` so a human reader knows its provenance.

**Recommended default:** solo `ISSUES.md`. Don't stand up a tracker for a QA session on his own portfolio.

## Intake gate — listen, then lightly clarify

Let the reporter describe it in their own words first. Then ask **at most 2–3 short questions**, and only for what *only they* know. Everything else you go get. **Do not over-interview — if it's already clear enough to file, file it.**

| Need | Ask only if missing (with a default) | Discover yourself — do NOT ask |
|---|---|---|
| Expected vs actual | "What did you expect, and what happened instead?" | — |
| Which surface + steps | "Which screen, and what did you tap? (default: the last thing you touched)" | Try the obvious path; read recent commits |
| Consistent or intermittent | "Every time, or only sometimes?" | — |
| Domain wording | — | Read `GLOSSARY.md` / grep the types so the issue uses domain terms, not module names (`model-domain-language`) |

The over-interview is the anti-pattern here: three sharp questions beat ten. A report so vague even the default won't fill it isn't a filed issue — it's a one-line open question at the bottom of the list.

## Single issue or breakdown? (the situational heart)

Before filing, make the one real decision — **many thin over few thick.**

| Break it down when… | Keep it single when… |
|---|---|
| The fix spans independent areas (layout **and** a failed submit **and** the email) | One behavior is wrong in one place |
| There are separable concerns a different person/agent could grab in parallel | Every symptom traces to one root behavior |
| The report has multiple distinct failure modes or symptoms | The symptoms are one bug wearing several faces |

Bias hard toward thin: each issue independently fixable *and* verifiable, so multiple agents can grab different ones at once. Splitting a distinction that changes nothing filable is noise (the rule `name-and-control-bias` owns — a split that can't be acted on separately isn't a real split).

## The moves (situational menu, one default)

1. **"Let's QA / I'll report bugs"** *(default)* → per item: listen → clarify (≤3 Qs) → domain-word it → single-or-breakdown → file thin → "Next, or are we done?" One item at a time; don't batch.
2. **"File these findings"** (a `verify-ui-quality` log) → one thin issue per finding row. It's already measured — skip clarify, keep the neutral wording, and assign **no severity** (that's `craft-critique`'s call, not yours).
3. **"It feels broken"** (a vibe dump) → the breakdown move below. Decompose the vibe; file each concrete piece thin; anything the reporter can't actually stand behind becomes a flagged open question, not an asserted bug.

## The one control — the vibe is an anchor

"Everything is broken / it feels cheap" is an **anchor** (`name-and-control-bias` names it). Two controls, applied together:

- **Decompose** the vibe into discrete, concretely-worded failure modes and file each on its own. The mega-issue never gets written.
- **Never assert past what was observed.** You did not reproduce anything — this skill captures, it doesn't verify. An "if the email even comes" doubt is *not* filed as "emails don't send"; it's an open question for `triage-issues` to verify. Faithful capture over confident claim.

## Write the issue (Output format)

Durable = it still makes sense after a major refactor. Behavioral = it describes what the user saw, not the code.

```markdown
### [short domain-worded title — the symptom, not a guess at the cause]
**What happened:** the actual behavior, plain language, the reporter's account
**Expected:** what should have happened instead
**Steps to reproduce:** 1. … 2. … 3. — the reporter's steps, in domain terms
**Context:** what helps frame it — surface, device, "only on mobile", "only after signing in"
```

Rules for every issue body:
- **No file paths or line numbers** — they go stale; describe the behavior at the seam ("the Confirm step fails," not `confirmBooking() throws`).
- **Domain language, not internal names** — pull the word from `GLOSSARY.md` (`model-domain-language`); "the slot picker," not "the SlotGrid component."
- **Repro steps are the reporter's** — you recorded them, you did not verify them. Verification is `triage-issues`.
- **No severity, no verdict** — 🔴/🟡/🟢 and PASS/BLOCKED belong to `craft-critique`. Before filing, run its AI-inflation scan on your own wording (strip "seamlessly," "significantly degraded" — an issue is a report, not a pitch).
- **30-second read.** If it takes longer, it's probably two issues.

Tracker mode only: prepend the provenance note, add a `Blocked by: #N` line (or "None — can start immediately"), and file blockers first.

## Worked example — "it feels broken" → 3 crisp filed issues

**Incoming (a salon booking app in beta, a text — solo, `ISSUES.md`):** *"Honestly the whole booking thing feels broken and cheap right now. Tried it on my phone and nothing lined up, then when I actually went to book it did something weird and I gave up, and the confirmation email — if it even comes — looks like spam."*

**The anchor to reject:** filing `### Booking is broken and cheap` — one thick vibe-issue no agent can act on or verify. Under many-thin-over-few-thick, **it does not get written.** Decompose instead.

**Light clarify (≤3 Qs, only what she knows):** "Which screen looked off on mobile?" → the slot picker; the time chips overlap. "What did you tap when it did something weird?" → hit Confirm, got a spinner that never resolved. Domain wording pulled from `GLOSSARY.md` (Booking, slot picker, Confirm, confirmation email) — not asked, read.

**Three distinct failure modes → three thin issues:**

```markdown
### Slot-picker time chips overlap on mobile
**What happened:** On a phone-width screen the time chips in the slot picker overlap and misalign; the layout looks unfinished.
**Expected:** Chips wrap cleanly with even spacing, matching the desktop slot picker.
**Steps to reproduce:** 1. Open the booking flow on a phone-width viewport. 2. Reach the slot picker. 3. Observe the time chips.
**Context:** Mobile only; desktop looks fine. Visual only — no error.

### Booking Confirm hangs with no result and no error
**What happened:** Tapping Confirm shows a spinner that never resolves — no booking, no error message. The user gives up.
**Expected:** Confirm either completes the Booking or surfaces a recoverable error; it never hangs indefinitely.
**Steps to reproduce:** 1. Pick a slot. 2. Tap Confirm. 3. Wait — the spinner persists.
**Context:** Reporter hit this on mobile. Consistency unknown (she tried once) — flagged for triage to verify.

### Confirmation email is unbranded and reads as spam
**What happened:** The confirmation email looks generic and untrustworthy — no salon branding, spam-like styling.
**Expected:** A branded, trustworthy confirmation consistent with the booking UI.
**Steps to reproduce:** 1. Complete a Booking. 2. Open the confirmation email.
**Context:** Content/brand, not function. See open question below on whether it always arrives.
```

**Open question (NOT filed as a bug):** *"Confirmation email — does it always send? Reporter wasn't sure it arrives."* → she couldn't stand behind "it never sends," and this skill doesn't reproduce. It goes to `triage-issues` to verify before it becomes an asserted issue.

**What this caught:** it refused the one thick vibe-issue, split it into three independently-fixable slices (a layout dev, a state bug, and a content pass can each grab one), worded each in domain terms with no file paths, and — the discipline that mattered — declined to over-assert the email-delivery doubt, leaving verification to triage instead of filing a claim the reporter never actually confirmed.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| File "the booking is broken" as one thick issue | Decompose the vibe into thin, independently-fixable issues |
| Over-interview with ten clarifying questions | Ask ≤3, only what the reporter alone knows; then file |
| Assert "emails don't send" the reporter never confirmed | Capture only what was observed; unverified doubt → open question for `triage-issues` |
| Reproduce and start fixing inside intake | Capture and file; the hunt is `diagnose-bugs`, the verify is `triage-issues` |
| Write `SlotGrid.tsx:42 overflows` | Word it behaviorally in domain terms — "the slot picker chips overlap on mobile" |
| Reference file paths / line numbers | Describe the seam and behavior — they survive a refactor |
| Assign 🔴/severity or write "PASS/BLOCKED" | No verdict here; that's `craft-critique` |
| Stand up a GitHub tracker for a solo QA pass | Solo `ISSUES.md` by default; escalate only for a shared repo |
| Batch five bugs into one filing sweep | One issue at a time; "Next, or done?" after each |
| Invent a domain term on the spot | Pull the word from `GLOSSARY.md` (`model-domain-language`) |

## Boundaries

- **`triage-issues`** owns verify + the categorize→verify→brief state machine + the agent-ready brief. This skill files the *raw* report; triage confirms it's real and turns it into a buildable spec. Filing is strictly upstream of triage.
- **`diagnose-bugs`** owns the hunt (reproduce → minimize → hypothesize → fix → regress). This never reproduces or fixes.
- **`verify-ui-quality`** produces the measured findings log; this skill files its rows as issues (the pairing). Verify runs the machines; this writes them up — and keeps verify's neutral, verdict-free wording.
- **`craft-critique`** owns severity, verdict language (🔴/🟡/🟢, PASS/BLOCKED), and the AI-inflation scan you run on your own wording. This skill assigns none of it.
- **`model-domain-language`** owns `GLOSSARY.md` and the one-name-per-concept discipline. This consumes it to word issues; it never invents terms or restates the glossary.
- **`design-taste`** owns what "broken / off / cheap" means for a visual report (breathing room, one dominant element, the locked motion curves). Load it before wording a UI issue; never eyeball taste from memory.
- **`name-and-control-bias`** owns the anchor (the reporter's vibe) and the controls this applies — decomposition, and not asserting past what was observed.
- **`write-problem-statement`** owns a vague ask that's really an unstated new project, not a bug.

## Sources

- Forked from **`qa`** (in `deprecated/`, upstream) — mattpocock/skills, MIT (© Matt Pocock, "Skills For Real Engineers"). Deprecated there; the method was taken, not the status. Kept: the conversational listen-and-lightly-clarify intake (≤2–3 questions, don't over-interview), the background codebase read for domain language, the single-issue-vs-breakdown scope assessment, **many thin issues over few thick**, durable/behavioral issue bodies (no file paths or line numbers, domain language over internal names), and the What-happened / Expected / Steps-to-reproduce / Context template.
- **Personalized:** solo local `ISSUES.md` is the default, with `gh issue create` / dependency-ordered filing / AI-provenance comments demoted to a mode-switch-up taken only for a shared repo; scoped **capture-only** with all verification handed to `triage-issues`; wired to `verify-ui-quality` (findings log → filed issues), `model-domain-language` (`GLOSSARY.md`), `craft-critique`, `design-taste`, and `name-and-control-bias`. The anti-negation rule is rejected — the Don't/Do table is a load-bearing guardrail for smaller models.
