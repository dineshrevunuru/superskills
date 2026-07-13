---
name: design-ui-states
description: "Designs every state a screen can be in — empty, loading, error, partial, ideal — plus forms, validation, and confirmation dialogs, per NN/g guidelines. Use when designing or reviewing any screen ('what does this look like with no data?', 'design the empty state', 'add a loading state', 'write the error handling', 'design this form', 'should this be a toast or inline error?', 'do we need a confirmation dialog?'), when a mockup only shows the happy path, or when choosing between indicator, validation, and notification feedback. Deterministic UI only — AI/model failure states belong to design-ai-trust-and-failure-states."
---

# Design UI States

Every screen is five screens. A design that only shows the ideal state is 20% designed — this skill produces the other 80%: empty, loading, error, and partial states, plus the feedback mechanics (validation, indicators, notifications, confirmations) and form behavior that make them work.

Load `design-taste` first for all visual decisions in this skill (spacing, type scale, accent use, motion values).

## When to use / when NOT to use

**Use when:**
- Designing or building any screen — run the five-state pass before calling it done
- A mockup, prototype, or PR shows only the happy path
- Choosing how to tell the user something (inline error vs. toast vs. badge vs. dialog)
- Designing any form, its validation timing, or its error reporting
- Deciding whether an action needs a confirmation dialog

**NOT for:**
- AI/generative output failures (hallucination, low confidence, model errors, streaming interruptions) → `design-ai-trust-and-failure-states`
- Flow-level edge cases across screens (what happens when the user abandons step 2 of 4) → `design-interaction-flows` owns edge-case enumeration at the flow level; this skill owns states within one screen
- The exact wording of error messages, empty-state copy, button labels → `write-ux-microcopy` (this skill defines what each message must contain; that one voices it)
- WCAG-level verification of the states you design → `audit-accessibility`
- Judging whether the finished states are good enough to ship → `craft-critique` (its ship gate requires "every state designed" — this skill is how you satisfy it)

## The method — the five-state pass

For every screen, in this order:

1. **Ideal** — design it last-polished but first-sketched: it sets the layout the other states inherit.
2. **Empty** — what shows before any data exists, after the user clears it, and when a search/filter returns nothing. Three different empties.
3. **Loading** — what shows while data is on the way. Choose the indicator by expected wait time.
4. **Error** — what shows when the data can't come or the action fails. Every error names what happened + why + the next step.
5. **Partial** — what shows with 1–2 items, truncated data, or degraded content. The state everyone forgets.

Deliverable: a five-row state spec per screen (see worked example). No screen ships with a blank row.

### 1 · Empty states — never default to blank

A blank screen reads as broken. NN/g's three guidelines for every empty state:

| Guideline | What it means concretely |
|---|---|
| **Teach** | Say what this screen is for and why it's empty right now — one sentence, not a tutorial |
| **Guide** | Point at the single action that fills it (one CTA, not a menu of options) |
| **Start tasks** | Let the user begin the core task right there — starter content, sample data, or an inline first-step |

There are three distinct empties — design each, they are not interchangeable:

| Empty type | Trigger | Right response |
|---|---|---|
| **First-use** | New user, nothing created yet | Teach + guide + start: the onboarding moment |
| **User-cleared** | User finished everything (inbox zero, tasks done) | Acknowledge completion — do NOT show the first-use pitch to a power user |
| **No-results** | Search/filter matched nothing | Recovery: show the query, suggest loosening filters, offer alternatives. Never a dead end |

Red flag: "Failed to load" rendered as an empty state. That is an **error state** — it needs cause + retry, not a friendly illustration.

### 2 · Loading states — choose by wait time

Nielsen's response-time limits decide the indicator. Estimate the realistic (not best-case) wait:

| Expected wait | User perception | Indicator |
|---|---|---|
| < 0.1 s | Instant | Nothing. An indicator here is noise |
| 0.1–1 s | Noticeable, flow intact | Nothing, or button-level busy state only |
| 1–10 s | Flow broken, attention held | Looped indicator (spinner) or skeleton screen |
| > 10 s | Attention gone | Determinate progress (percent / steps / time left) + let them do something else |

Rules:
- **Skeleton over spinner** when the layout is known — it sets shape expectations and feels faster. Spinner only for small, unshaped regions.
- **Never fake progress** — a bar that crawls to 90% then stalls destroys trust faster than a spinner.
- **One indicator per event.** A skeleton page plus a global spinner plus a busy button = three claims of the same fact.
- Keep loading motion inside `design-taste`'s motion law (quiet, no spectacle); `craft-motion` owns the animation itself.
- Disable the triggering control while its action is in flight — prevents double-submits (see slips, below).

### 3 · Error states — what happened, why, what next

Every error message must carry three parts. If a part is missing, the message is unfinished:

1. **What happened** — precise, specific to this failure ("Couldn't save your booking"), never generic ("Something went wrong", "Error 500").
2. **Why / what it means** — in the user's language, no codes, no blame ("You appear to be offline").
3. **The constructive next step** — retry, edit, alternative path, or "we saved a draft" ("Check your connection — your details are kept below").

NN/g error-message guidelines, as a lint:

- [ ] Visible and noticeable — adjacent to the problem, not hidden in a corner or console
- [ ] Human-readable — plain language; no jargon, codes as primary content, or ALL-CAPS
- [ ] Precise — describes the exact problem, not a category of problems
- [ ] Constructive — tells the user what to do, or does it for them (offer the fix as an action)
- [ ] Polite — never blames the user ("invalid input" → "we need a date in the future")
- [ ] Preserves work — the user's input/data survives the error, always
- [ ] Not premature — errors appear after the user has had the chance to act, never while they're still acting

**Slips vs. mistakes — prevent by type.** Diagnose which one you're designing against; the fixes differ:

| Type | Definition | Prevent with |
|---|---|---|
| **Slip** | Right goal, wrong execution (typo, tap the wrong button, double-submit) | Constraints, forgiving formats, good defaults, disabled in-flight buttons, undo |
| **Mistake** | Wrong mental model — the user intended the wrong thing | Clear signifiers, previews of consequences, confirmation for the destructive case, undo |

Undo beats both a confirmation and an apology. Design undo first; confirm only when undo is impossible.

### 4 · Partial states — the forgotten one

The screen with 1 item, 2 rows, or half-loaded content. Checklist:

- [ ] Layout doesn't look broken at n=1 (no lonely card floating in a grid built for 12)
- [ ] Sparse ≠ empty: don't show the empty-state CTA on top of real content
- [ ] A nudge toward more content is present but quiet (one line, not a banner)
- [ ] Truncated/stale data is labeled as such ("showing cached results from 10:42") — silent staleness is a trust bug
- [ ] Pagination/infinite-scroll end state exists ("that's all 3") so partial doesn't read as still-loading

### 5 · Ideal state

The happy path — with real-shaped data, not lorem ipsum and not the flattering demo dataset. Test it with the longest name, the 40-item list, the 2-line title. Per `design-taste`: if it only works when full, cut elements rather than shrink them.

## Choosing the feedback channel — indicator vs. validation vs. notification

Three different mechanisms; picking the wrong one is a category error, not a style choice:

```
Is the message a direct response to input the user JUST gave?
├─ YES → VALIDATION — appears adjacent to the input, at the right time
│         (after the field is completed, not per-keystroke; see form rules below)
└─ NO → Is it an ongoing attribute or status of a specific element?
    ├─ YES → INDICATOR — passive, always visible while true, attached to
    │         the element (unread badge, required asterisk, sync icon, beta tag)
    └─ NO → It's about a system event decoupled from the current task
        → NOTIFICATION — decide interruption level by urgency:
           needs action now → modal/alert (rare — see confirmation rules)
           should know soon → toast/banner (auto-dismiss, non-blocking)
           can find out later → badge/count on the relevant entry point
```

Misuse table:

| Symptom | Diagnosis |
|---|---|
| Toast announcing a field error | Validation dressed as notification — user looks at the field, message is elsewhere and gone in 4s |
| Modal for "settings saved" | Notification promoted to interruption it didn't earn |
| Red text appearing while the user is still typing | Premature validation — wait for field completion |
| Status conveyed by color alone | Indicator failing accessibility — pair color with icon/text, always |

## Confirmation dialogs — earned interruptions

A confirmation is an interruption tax on every future use. It must earn that:

```
Is the action destructive or costly, AND hard/impossible to undo?
├─ NO → no dialog. If consequential but reversible → act + offer UNDO.
└─ YES → Is the action frequent (part of a routine loop)?
    ├─ YES → still no dialog — habituation makes users click through
    │         blindly, so it protects nothing. Build undo/trash instead.
    └─ NO (rare + destructive + irreversible) → confirmation EARNED.
```

Rules for the earned dialog:

- **Ask a specific question** naming the object: "Delete the 'Q3 booking report'?" — never "Are you sure?"
- **Buttons name the action**: [Delete report] / [Keep report] — never [Yes] / [No] / [OK]
- **State the consequence** the user might not know: "This removes it for all 4 team members."
- **The destructive button is not the default** and not styled as the primary accent.
- If you find yourself writing a second confirmation for the same flow, the flow is wrong — redesign it.

## Forms — the compressed law

(If this section is being extended with layout patterns, multi-step logic, or input-type catalogs, move the detail to `references/forms.md` — the rules below are the non-negotiable core.)

**NN/g Website Forms Usability — top recommendations as a lint:**

- [ ] Every field justifies its existence — cut any field you can derive, default, or defer
- [ ] Single column; related fields visually grouped; logical order
- [ ] Label outside and above the field — persistent, visible after filling
- [ ] Field width matches expected input length (a 6-char ZIP doesn't get a full-width box)
- [ ] Mark the minority set — if most fields are required, mark the optional ones ("(optional)")
- [ ] Format requirements shown BEFORE input, as persistent help text near the field
- [ ] Accept forgiving formats — parse "(312) 555-0100", "312-555-0100", "3125550100"; never make the user do the computer's formatting job
- [ ] No Reset/Clear button — its only function is catastrophic slip
- [ ] Primary action visually distinct, labeled with the outcome ("Book appointment", not "Submit")

**Placeholder prohibition (hard rule).** Placeholder text as the label is banned:

- It disappears the moment the user types — pure memory load
- Filled-looking fields get skipped; users can't review answers before submit
- Screen-reader support is inconsistent; the gray fails contrast
- Error recovery is blind — the user must delete their entry to re-read what was asked

Label above the field. Help text persistent, outside the field. A placeholder may carry a redundant example at most — never the only copy of any information.

**The 10 error-reporting guidelines for forms:**

1. Validate inline where possible — catch the error at the field, before submit
2. Time it right: validate on field completion (blur), not per-keystroke, not before entry
3. Signal with multiple cues — color + icon + text; never color alone
4. Place the message adjacent to the offending field, not only in a summary
5. On submit of a long form, ALSO give an error summary at top — linking to each field
6. Keep the message visible until the error is fixed — no auto-dismissing form errors
7. Preserve every byte of user input — a cleared form is a designed insult
8. Say how to fix it, in plain language (the 3-part error anatomy above applies)
9. Use success indication sparingly — a checkmark on complex fields (password rules), not on every field
10. Prefer prevention: constraints, forgiving parsing, sensible defaults, and clear format help make most error messages unnecessary

## Worked example — "Appointments" screen, salon booking app

Five-state spec, the deliverable format of this skill:

| State | Trigger | Design |
|---|---|---|
| **Ideal** | ≥3 upcoming appointments | List sorted by date; next appointment dominant; per-item reschedule/cancel. Tested with a 3-service, 2-line appointment title |
| **Empty (first-use)** | New client, zero bookings ever | "Your appointments will live here." + one CTA: "Book your first visit" → opens booking flow directly (start-task) |
| **Empty (user-cleared)** | Had appointments; none upcoming | "No upcoming visits — your last was May 12." + quiet "Book again" (one tap re-books the usual service). No first-use pitch |
| **Empty (no-results)** | Filter "This week" matches nothing | "Nothing this week. 2 appointments later this month." + [Show all] — states the query, offers the recovery |
| **Loading** | Fetch in flight, typical 1–3 s | Skeleton of 3 list rows (layout is known). No spinner. >10 s is treated as failure → error state with retry, never an infinite skeleton |
| **Error** | Fetch fails / offline | "Couldn't load appointments — you appear to be offline. Showing your last synced list from 10:42." + [Retry]. Cached data preserved, staleness labeled |
| **Partial** | Exactly 1 appointment | Single card at full width and full size (cut the grid, don't shrink the card); one quiet line beneath: "Book your next visit" |

Form moment on the same flow — phone field, before/after:

| | Before (fails the lint) | After |
|---|---|---|
| Label | Placeholder "Phone number" inside the field | "Phone" label above; help text "For appointment reminders" |
| Timing | Red border on first keystroke | Validates on blur |
| Message | "Invalid input" in red, color only | ⚠ "That's 9 digits — a US phone number has 10." Icon + text + color, adjacent, stays until fixed |
| Input | Cleared on error | Preserved; cursor returned to the field |
| Confirmation | "Are you sure you want to book?" dialog | None — booking is reversible; success toast + "Cancel or reschedule anytime" |

Cancellation, by contrast, inside 2 hours of the slot (fee applies, irreversible) earns its dialog: "Cancel your 3:00 PM appointment? Inside 2 hours, a $25 fee applies." [Cancel appointment] / [Keep appointment].

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Ship the mockup that only shows 12 perfect items | Deliver the five-row state spec; each row designed |
| Blank screen while deciding what empty looks like | Teach + guide + start-task, per empty type |
| One generic empty state reused for first-use, cleared, and no-results | Three empties — they answer different user questions |
| Spinner for everything, forever | Indicator chosen by wait-time threshold; >10 s gets determinate progress or becomes an error |
| "Something went wrong. OK" | What happened + why + next step; input preserved |
| "Are you sure?" [Yes] [No] on every delete | Undo for the frequent case; specific, consequence-stating dialog only for rare + irreversible |
| Placeholder-as-label | Label above, persistent help text outside the field |
| Per-keystroke red validation | Validate on field completion; premature errors are a guideline violation |
| Error toast that vanishes before it's read | Form errors persist until fixed |
| Color-only error/status signaling | Color + icon + text, every time |
| Treating "failed to load" as an empty state | It's an error state: cause + retry |

## Sources

- Empty states: https://www.nngroup.com/articles/empty-state-interface-design/
- Button states: https://www.nngroup.com/articles/button-states-communicate-interaction/
- Indicators vs. validations vs. notifications: https://www.nngroup.com/articles/indicators-validations-notifications/
- Confirmation dialogs: https://www.nngroup.com/articles/confirmation-dialog/
- Response-time limits (0.1 s / 1 s / 10 s): https://www.nngroup.com/articles/response-times-3-important-limits/
- Progress indicators: https://www.nngroup.com/articles/progress-indicators/
- Error-message guidelines: https://www.nngroup.com/articles/error-message-guidelines/
- Error-message scoring rubric (for auditing existing messages): https://www.nngroup.com/articles/error-messages-scoring-rubric/
- Mistakes (wrong mental model): https://www.nngroup.com/articles/user-mistakes/
- Slips (right goal, wrong execution): https://www.nngroup.com/articles/slips/
- Web form design (top recommendations): https://www.nngroup.com/articles/web-form-design/
- Placeholders are harmful: https://www.nngroup.com/articles/form-design-placeholders/
- Reducing cognitive load: https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/
- Error reporting in forms: https://www.nngroup.com/articles/errors-forms-design-guidelines/

## Boundaries

- **design-ai-trust-and-failure-states** owns user-facing failure UX for AI output (uncertainty, provenance, hallucination, model errors). This skill owns deterministic UI states; when a screen contains generative output, run both.
- **design-interaction-flows** owns edge-case and failure-path enumeration across a flow; this skill owns the states within each screen of that flow.
- **write-ux-microcopy** owns the final wording of every message this skill specifies; this skill defines what each message must contain (the 3-part error anatomy, the empty-state teach/guide/start).
- **design-taste** owns all visual and motion values used in these states; **craft-motion** owns loading/transition animation construction.
- **craft-critique** owns the ship verdict; its pixel-polish gate ("every state designed") is satisfied by this skill's five-row spec.
- **audit-accessibility** owns WCAG verification of the states (contrast on error text, focus return after dialogs, live-region announcements).
