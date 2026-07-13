---
name: write-ux-microcopy
description: "Write or review the words inside an interface — button/CTA labels, link labels, error messages, empty states, confirmation dialogs, field labels, helper text, tooltips, loading strings, notifications. Use when asked 'what should this button say?', 'write copy for this screen', 'review this error message', 'fill this empty state', 'name this CTA', or whenever a design/prototype needs its strings written or fixed. Grounded in NN/g microcopy frameworks (3 C's, 3 I's, 4Ss link labels, error-message guidelines). NOT for long-form writing (case studies, articles → writing-voice) or AI conversation behavior (→ design-conversational-interfaces)."
---

# Write UX Microcopy

Write interface strings that are clear first, concise second, and in-character last — never generic, never cute at the user's expense.

## When to use / when NOT to use

**Use when:** any interface string needs writing or reviewing — labels, CTAs, links, errors, empty states, confirmations, helper text, tooltips, loading states, notifications, page titles.

**Do NOT use when:**
- Long-form content (case studies, articles, emails, docs) → `writing-voice`
- Deciding WHICH states a screen needs (empty/loading/error/partial) and their layout → `design-ui-states`; this skill writes the words once the state exists
- AI conversation turns, chatbot dialog behavior → `design-conversational-interfaces`
- AI failure/refusal state design (named cause + recovery path per failure) → `design-ai-trust-and-failure-states`; call this skill back for the sentence itself

## The method

1. **Identify the string type** (decision tree below) — each type has its own pattern. Never write a "general" string.
2. **Establish the voice source before writing a word.** Copy tone is NEVER generic:
   - Product has a VOICE-DNA / voice-and-tone guide → that is law.
   - Product speaks as Dinesh (his portfolio, his agents) → load `writing-voice`.
   - Neither exists → derive a 3-adjective mini voice spec from the product's existing shipped copy and confirm it with the owner. Never default to "friendly tech-startup voice."
3. **Write to the type's pattern** (sections below).
4. **Run the lint checklist** on every string.
5. **Deliver a recommendation, not a menu.** Alternatives are fine; one must be marked recommended with a reason (per `craft-critique` — "here are some options" without a pick is banned).

### Decision tree — what am I writing?

```
Is it a control the user activates?
├── Button that performs an action ────────→ CTA rules
├── Link that navigates somewhere ─────────→ 4Ss link-label rules
└── No — is it the system talking?
    ├── Something went wrong ──────────────→ Error-message rules
    ├── Nothing here yet / no results ─────→ Empty-state rules
    ├── "Really do this?" ─────────────────→ Confirmation-dialog rules
    ├── Working on it ─────────────────────→ Loading-state rules
    └── Explaining a field or feature ─────→ Label / helper-text rules
```

## The three NN/g frameworks (apply to every string)

**3 sizes of UX copy** — micro (labels, buttons: 1–5 words), short (errors, empty states, tooltips: 1–2 sentences), long (onboarding flows, docs). This skill owns micro and short. If a string is drifting to long, it is the wrong solution — fix the design, not the paragraph.

**3 I's** — every string does exactly ONE job: **Inform** (explain state or fact), **Influence** (nudge a decision), or **Interact** (label an action). Decide which before writing. A string trying to do all three does none.

**3 C's, in strict priority order** — **Clear > Concise > Character.** Never trade clarity for brevity, never trade either for personality. Character comes last and comes only from the voice source in step 2. Personality dials to near-zero as stakes rise: errors, payments, deletions, security get plain language; success and empty states may carry more character.

## CTA & button labels

- **Verb first, specific object:** "Create account", "Save changes", "Book appointment" — never "Submit", "OK", "Continue" for consequential actions.
- **Label = exactly what happens next.** If the button charges a card, the label says so ("Pay $40"), not "Next".
- One primary CTA per screen (element count and emphasis defer to `design-taste`).
- Never "Yes" / "No" as button labels — repeat the action: "Delete files" / "Keep files".
- Match the product's case convention (sentence case vs title case) everywhere — mixed casing reads as broken.

## Link labels — the 4Ss (kill "Learn More")

Every link label passes all four (NN/g "Better Link Labels"):

| S | Test |
|---|---|
| **Specific** | Says exactly what the destination delivers ("See pricing plans", not "Learn more") |
| **Sincere** | The page actually delivers what the label promises — no bait |
| **Substantial** | Works read out of context. Screen-reader users pull a links-only list; ten "Learn more"s are indistinguishable — this is an accessibility failure, not a style nit |
| **Succinct** | Front-load the keyword; ~1–5 words |

**Dead on sight:** "Learn more", "Click here", "Read more", "More info", "Details", "Here". Replace with the noun of the destination: "Learn more" → "Compare plans" · "Click here to download" → "Download the report (PDF)".

## Error messages — NN/g guidelines

Structure every error: **what happened + why (only if it helps the user) + the constructive next step.**

Checklist (from NN/g Error-Message Guidelines):
- [ ] **Visible and adjacent** — inline next to the field/element, signaled with icon + color + text (never color alone)
- [ ] **Human-readable** — no bare error codes, no jargon. "Error 422: Unprocessable entity" fails; "That date is in the past — pick a future date" passes. Keep the code in small print only if support needs it
- [ ] **Precise** — names the exact problem. "Invalid input" is not an error message
- [ ] **Constructive** — tells the user what to do next, or does it for them (offer the fix as an action when possible)
- [ ] **Blame-free** — no "you failed", no ALL CAPS, no "illegal/forbidden/fatal"
- [ ] **Preserves work** — recovery never destroys what the user typed
- [ ] **Timed right** — validate when the user finishes the field, not on the first keystroke. Premature errors train users to ignore red
- [ ] **No humor in failure moments** — the user is frustrated; "Oops!" spends goodwill they don't have

**Prevention beats wording — slips vs. mistakes (NN/g):**
- **Slip** = right intention, wrong execution (typo, mis-tap) → prevent with constraints, forgiving input formats, undo. Don't write an error for what a date-picker prevents.
- **Mistake** = wrong mental model → prevent with clear signifiers, previews, and confirmations before the act.
Before polishing an error's words, ask: should this error exist at all?

**Auditing an existing product's errors:** grade them with the NN/g Error-Messages Scoring Rubric first, fix the worst-scoring high-traffic ones first — don't rewrite alphabetically.

## Empty states

Never leave a state blank or "No data." An empty state has three jobs (NN/g): **teach** what this space is, **guide** the next action, and where possible **start the task** (starter content or a direct CTA).

Structure: **what this is + why it's empty + one action to fill it** (CTA follows CTA rules).

Three different empty states need three different strings:
- **First use:** "No projects yet. Create your first project to start collaborating." — teach + start
- **Cleared / zero items:** "All caught up — nothing needs review." — confirm, don't alarm
- **No search/filter results:** "No results for 'X'. Check the spelling or clear filters." — always include a recovery path

## Confirmation dialogs

- **Title = the specific action as a question:** "Delete 3 files?" — never "Are you sure?"
- **Body = the consequence:** "This can't be undone."
- **Buttons = the action verbs:** "Delete files" / "Keep files" — never "OK" / "Cancel"
- **Reserve for destructive, irreversible, or costly actions.** Confirming everything trains click-through blindness (NN/g), which defeats the one confirmation that matters. For reversible actions, prefer undo over confirmation.

## Field labels, helper text, placeholders

- **Labels live outside the field, always visible.** Placeholders are not labels — they vanish on typing, tax memory, and fail contrast (NN/g: placeholders in form fields are harmful).
- **Helper text prevents the error before it happens** — put format requirements ("MM/DD/YYYY") next to the label, not inside an error after failure.
- **One term per concept, everywhere.** "Sign in" on one screen and "Log in" on another reads as two features. Keep a mini-glossary for the product and enforce it.
- Tooltips: only for genuinely secondary info; never hide required information behind hover (unreachable on touch).
- Loading strings: say what's happening and set expectation ("Generating your report — about 20 seconds"), not "Please wait…". Progress states and their design belong to `design-ui-states`.
- Headlines / page titles / notifications: front-load the keyword; must survive truncation and out-of-context reading (tab bars, push previews, subject lines).

## Worked example — booking-app payment failure screen (before → after)

Context: a salon booking app, payment step. Voice spec (from the product's voice guide): *warm, plain-spoken, unhurried.*

| Element | Before (fails) | After (passes) | Why |
|---|---|---|---|
| Error banner | "Oops! Something went wrong :(" | "Payment didn't go through. Your bank declined the card — no charge was made." | What + why + blame-free; humor cut in a failure moment |
| Recovery line | "Please try again later." | "Try another card, or call your bank if it happens again." | Constructive next step, not a shrug |
| Primary button | "Submit" | "Retry payment" | Verb + specific object; label = what happens |
| Secondary link | "Learn more" | "Why cards get declined" | 4Ss: specific, substantial out of context |
| Field error (card no.) | "INVALID INPUT" | "That card number is one digit short — it needs 16." | Precise, human, no caps; appears after the field loses focus, not mid-typing |
| Empty state (no saved cards) | "No data" | "No saved cards yet. Add one now and future bookings take one tap." | Teach + guide + start; carries warmth because stakes here are low |

Voice check: every "after" string is warm and plain-spoken; the error strings dial character to near-zero, the empty state carries a little more. None of it could belong to a random SaaS product — that's the test.

## Anti-patterns / red flags

| Red flag | Why it fails | Fix |
|---|---|---|
| "Learn more" / "Click here" | Fails all 4Ss; screen-reader link lists become noise | Name the destination noun |
| "Are you sure?" + OK/Cancel | User must re-derive what OK does | Action-as-question + action-verb buttons |
| "Oops! Something went wrong" | Cute, vague, no next step | What + why + next step |
| "Submit" | Says nothing about the outcome | Verb + object of the real action |
| Placeholder used as the label | Vanishes on typing; memory tax; contrast fail | Label outside, always visible |
| Error fires while user is still typing | Premature validation trains error-blindness | Validate on field completion |
| Error code shown raw to humans | Machine language at a human moment | Translate; keep code in fine print |
| "No data" empty state | Wastes the teach/guide/start moment | What this is + why empty + one action |
| Two names for one concept | Reads as two different features | One term everywhere; keep a glossary |
| Personality in a failure/payment/delete moment | Character bought with the user's patience | 3 C's order: clear > concise > character |
| Copy that would fit any product | Generic voice = no voice | Rewrite from the product's VOICE-DNA |
| A wall of options with no pick | Analysis without a recommendation | Mark one recommended, say why |

## Output format

```markdown
## UX Copy: [screen / flow / element]

**Voice source:** [VOICE-DNA doc / writing-voice / derived 3-adjective spec — name it]

### Recommended copy
**[Element]:** [string]   ← one per element, this is the answer

### Alternatives (if genuinely useful)
| Option | Copy | Trade-off |
|---|---|---|
| Recommended | [string] | [why it wins] |
| B | [string] | [what it trades] |

### Rationale
[2–4 sentences: which pattern applied, which 3-I job each string does, voice-fit]
```

When **reviewing** existing copy, use the `craft-critique` output format and verdict language instead; this skill supplies the per-type rules as the principles cited in findings.

## Sources

NN/g grounding (frameworks named above):
- 3 sizes of UX copy — https://www.nngroup.com/articles/ux-copy-sizes/
- The 3 I's of microcopy — https://www.nngroup.com/articles/3-is-of-microcopy/
- The 3 C's of microcopy — https://www.nngroup.com/articles/3-cs-microcopy/
- Better link labels (4Ss) — https://www.nngroup.com/articles/better-link-labels/
- Microcontent: headlines, titles, subject lines — https://www.nngroup.com/articles/microcontent-how-to-write-headlines-page-titles-and-subject-lines/
- Error-message guidelines — https://www.nngroup.com/articles/error-message-guidelines/
- Error-messages scoring rubric — https://www.nngroup.com/articles/error-messages-scoring-rubric/
- Slips vs. mistakes — https://www.nngroup.com/articles/user-mistakes/
- Empty-state design — https://www.nngroup.com/articles/empty-state-interface-design/
- Placeholders are harmful — https://www.nngroup.com/articles/form-design-placeholders/
- Confirmation dialogs — https://www.nngroup.com/articles/confirmation-dialog/

Adapted in part from Anthropic's design-plugin `ux-copy` skill (fork), extended with the NN/g frameworks above.

## Boundaries

- **`design-ui-states`** owns which states exist and their layout/behavior (empty, loading, error, partial, forms); this skill owns the words inside those states.
- **`design-conversational-interfaces`** owns AI dialog behavior once in conversation; **`design-ai-trust-and-failure-states`** owns AI failure/refusal state design (named cause + recovery). Both call this skill for sentence-level craft.
- **`writing-voice`** owns Dinesh's personal voice and all long-form writing; this skill defers to it when the product speaks as Dinesh.
- **`craft-critique`** owns verdict language and the evidence protocol — any factual claim inside copy ("fastest checkout", "trusted by thousands") is handled per its evidence protocol, never asserted bare.
- **`design-taste`** owns visual/taste values (type scale, element count, emphasis); load it before deciding how copy sits on the screen.
