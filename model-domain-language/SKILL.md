---
name: model-domain-language
description: "Build the ONE shared name per concept — a ubiquitous language / domain model — used identically across client conversations, the design system, and the code. Challenge conflicting terms, sharpen fuzzy ones, scenario-test where concepts meet, and capture the resolved vocabulary in a GLOSSARY.md. Use when a term is overloaded or has rival synonyms ('does booking mean the slot or the record?', 'the client says appointment, the code says session'), when asked to 'define domain terms', 'build a glossary', 'harden the terminology', 'create a ubiquitous language', or 'this word means three things'; when a name conflict surfaces mid-build; or when another skill needs the domain vocabulary maintained. NOT for token VALUES (build-token-system) or UI-copy strings (write-ux-microcopy) — this owns the concept and its one true name; NOT for decision records (write-decision-rationale)."
license: "MIT — merges `domain-modeling` and the deprecated `ubiquitous-language` from mattpocock/skills (© Matt Pocock, 'Skills For Real Engineers'). The challenge/sharpen/scenario-test discipline, the opinionated glossary + aliases-to-avoid format, and the example-dialogue device are adopted; recast from DDD bounded-contexts to Dinesh's solo/freelance three-surface reality (client · design · code), and the anti-negation rule is rejected (Don't/Do tables kept)."
---

# Model the Domain Language

**One concept, one name — everywhere.** The name the client says in a meeting, the word on the button, the term in the type, and the label on the token are the *same word* for the *same thing*. This is the domain twin of token naming: `build-token-system` gives each role one canonical **name** (`--text-secondary`, not `--text-gray`); this gives each concept one **name** (Booking, not appointment/reservation). When they drift, "booking" means the calendar slot to the client, a DB row to the code, and a nav label in the UI — three concepts wearing one name — and every conversation quietly pays the tax.

Dinesh works mostly **solo / freelance**: the "domain expert" is usually the **client** (e.g. the salon owner), and the language must land on **three surfaces at once — client talk, the design system, the code.** This is active work — challenging and resolving terms as you design — not just reading a glossary someone else wrote.

## When to use / when NOT to use

**Use** when a domain term is overloaded, has rival synonyms, or a name conflict surfaces mid-build; when starting a glossary for an app; or when another skill needs the vocabulary sharpened.

**NOT this skill:**
- **Token/value naming** (`--text-secondary`, `space.4`) → `build-token-system` owns the visual-concept names and their values. This owns the *domain* nouns (Booking, Appointment, Customer). They share one discipline; don't restate its grammar here.
- **The UI-copy terminology table** ("Sign in," never "Login") → `document-and-govern-design-system` owns the design-system content standard. This feeds it: the domain glossary decides the concept; that table enforces the string. Point, don't duplicate.
- **Writing the strings** → `write-ux-microcopy`. **Module/interface/seam naming** (code *structure*, not domain nouns) → `codebase-design`. **Recording a decision** → `write-decision-rationale`.

## Two paths — mode-switchable

- **Scrappy (sharpen one term, inline, ~2 min):** a single fuzzy word just went by. Ask the disambiguating question, propose the canonical term, move on. **No file** — a one-line habit, not a ceremony.
- **Rigor (build/harden the glossary, default when terms keep colliding):** the full method — scan, resolve the conflicts, scenario-test the boundaries, write `GLOSSARY.md`, flag the ambiguities. Run when a name has bitten twice, at the start of a real client build, or when the app and the client have visibly diverged.

**Recommended default:** scrappy for a term in flight; rigor when the same word has caused confusion more than once or a new client engagement is starting. When unsure, scrappy — resolving one live term beats a speculative glossary nobody asked for.

## Intake gate — ask only the gaps

Discover silently: the surfaces in play (is there client-facing language? a design system? code?), the terms already in `GLOSSARY.md` if one exists, and how the code actually names things (grep the types/functions). Ask Dinesh only what you can't read — each with a recommended default:

| Gap | Recommended default |
|---|---|
| Which meaning is canonical when two collide? | Recommend the one the **client** already uses out loud — the language should match how the domain expert thinks, not the schema |
| One glossary, or one per product? | One `GLOSSARY.md` at repo root. Split only if two products genuinely mean different things by the same word (below) |
| Is this distinction worth drawing at all? | If splitting the term changes nothing that gets built → **don't** — it's noise (see below) |

One batched round. If every gap has a safe default, state them and proceed.

## The method — situational menu, route the ask

Run only the moves this moment needs. The goal is a shared language that changes behavior, never a "complete" glossary.

- **Challenge against the glossary.** A term conflicts with what `GLOSSARY.md` already fixed → call it immediately: *"The glossary defines Cancellation as the customer withdrawing; you seem to mean the salon declining — which is it? If both are real, they need two names."*
- **Sharpen fuzzy language.** A vague or overloaded word → propose one precise canonical term and the synonyms to retire: *"You said 'account' — do you mean the paying **Customer** or the login **User**? Those are different things."*
- **Scenario-test the boundary.** When two concepts touch, invent the specific case that forces precision — the **grilling** stress-test (owned by `craft-critique`) aimed at *language* instead of a plan: *"A client pays for a package of 5 sessions and books 2 — is that one Booking or two? What exists in the system before they pick a time?"* The edge case is where the true boundary shows.
- **Cross-reference all three surfaces.** Check the resolved name against what the **client says**, what the **UI shows**, and what the **code names**. A contradiction is the finding: *"The code cancels a whole Order, but you just told the client partial cancellation is allowed — one of them is wrong."* Same word, three surfaces: reconcile them or the drift is permanent.
- **Draw the line only when it pays.** A distinction that changes nothing you build or say is **noise** — the language twin of `name-and-control-bias`'s rule that a lever which can't touch your claim is noise. Split Customer from User because they behave differently; do **not** split "client" from "customer" if they never diverge in this domain. Be opinionated: fewer, sharper terms beat an exhaustive taxonomy.
- **Capture inline, immediately.** The moment a term resolves, write it to `GLOSSARY.md` — don't batch. An unresolved conflict left in the head reopens next session.

Domain decisions that are hard to reverse and surprising (why Package and Booking are separate tables, why a Session is never stored without its Booking) get a record — that's `write-decision-rationale`, not this file. The glossary holds *what a word means*; the decision record holds *why the model is shaped that way*.

## The glossary file

Default: one **`GLOSSARY.md`** at the repo root, created lazily on the first resolved term. Keep it a **glossary and nothing else** — no implementation details, no spec, no scratchpad. One or two sentences per term; define what it **is**, not what it does. Be opinionated: pick the winning word, list the losers under *Avoid*.

```md
# Glossary — Salon Booking App

## Booking lifecycle
| Term | Definition | Avoid |
|---|---|---|
| **Booking** | A customer's confirmed reservation of one time slot with a stylist | Appointment, reservation, session |
| **Session** | A single completed service delivered during a Booking | Visit, sitting |
| **Package** | A prepaid set of Sessions a customer draws down over time | Bundle, plan, subscription |

## People
| Term | Definition | Avoid |
|---|---|---|
| **Customer** | A person who books and pays for services | Client, guest, account |
| **User** | An authenticated login identity in the admin app | Account, staff-login |

## Relationships
- A **Package** entitles a Customer to N **Sessions**; each Session is delivered inside one **Booking**.
- A **Booking** belongs to exactly one **Customer**; a Customer may hold many Bookings.

## Flagged ambiguities
- "appointment" was used for both a **Booking** (the reservation) and a **Session** (the service) — kept **Booking** for the slot, **Session** for the delivery.
```

**One glossary vs many.** Stay with one file until two products genuinely mean *different things* by the same word — e.g. the booking app and the admin app diverge on "User." Only then split into a glossary per surface with a short note on how the shared terms relate. Don't reach for multi-context ceremony on a one-app freelance build; that's enterprise cosplay.

## Worked example — "booking" disambiguated across the client and the app

**The target failure this catches:** one fuzzy word, three surfaces, silent divergence.

**As overheard (rigor pass triggered — "booking" bit twice):**
> **Client (salon owner):** "When someone books a package, that's a booking, right? And each visit is also a booking in the calendar."
> **Code today:** a single `bookings` table row is created at package purchase, reused per visit.
> **UI today:** the button says "Book Appointment"; the account screen lists "Your Sessions."

Four names — *booking · package · appointment · session* — smeared across two concepts. Scenario-test forces it: *"A customer buys a 5-pack and schedules 2 dates. How many rows exist? What does the calendar show? What does the confirmation email call each one?"* The client's answer — "the 5-pack is one thing they paid for; each date is a separate slot on the calendar" — reveals **two distinct concepts**, not one.

**Resolved:**
| Fuzzy input | Canonical concept | Retired aliases |
|---|---|---|
| "booking" (the 5-pack) | **Package** — prepaid entitlement | bundle, plan, subscription |
| "booking" (a calendar slot) | **Booking** — one reserved time slot | appointment, reservation |
| "visit / session" | **Session** — the service delivered in a Booking | visit, sitting |

**Fix on all three surfaces:** UI button → "Book a Session" (or "Book"); code → `packages` and `bookings` as separate tables, `booking.package_id` nullable for pay-as-you-go; client-facing email → "Package purchased" vs "Booking confirmed." The word "appointment" is retired everywhere. Written to `GLOSSARY.md` before the next line of code — so the next session, and any ARIA sub-agent, inherits the resolution instead of re-litigating it.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Let "booking" mean the slot in code, the package to the client, the button in the UI | Fix one name per concept across all three surfaces; retire the rest |
| Model every noun into a distinct term | Split only when the distinction changes what gets built — else it's noise |
| Adopt the schema's word because it's already typed | Prefer the word the client says out loud; the domain expert's language wins |
| Batch resolved terms "to write up later" | Capture to `GLOSSARY.md` the instant a term resolves |
| Put implementation details / decisions in the glossary | Glossary = concept + one name; the *why* goes to `write-decision-rationale` |
| List synonyms as equals ("Booking / Appointment / Reservation") | Be opinionated — pick one, list the others under *Avoid* |
| Spin up a multi-context map for a one-app freelance build | One `GLOSSARY.md`; split only when two products truly diverge |
| Restate token-naming grammar or the content-terminology table here | Point to `build-token-system` / `document-and-govern-design-system` |

## Boundaries

- **`build-token-system`** owns visual-concept names and their **values**; this owns **domain** nouns. Same one-name-per-concept discipline, different layer — referenced, never restated.
- **`document-and-govern-design-system`** owns the design-system **terminology table** (the enforced UI-copy word). This skill decides the *concept*; that table enforces the *string*. The glossary is the upstream source; don't duplicate it downstream.
- **`write-ux-microcopy`** writes the actual strings using the canonical terms; this fixes the *concept* behind the label, not the wording of the string or the pixel.
- **`codebase-design`** owns code-*structure* naming (module/interface/seam/adapter); this owns domain nouns. Both name things exactly — structural glossary there, domain glossary here.
- **`craft-critique`** owns the grilling/evidence discipline; scenario-testing a term is that stress-test aimed at language. **`name-and-control-bias`** owns the "a lever that can't touch the claim is noise" rule this skill applies to term distinctions.
- **`write-decision-rationale`** owns recording *why* the model is shaped a certain way (the ARIA decision record + What-Would-Change-This). This owns *what the words mean*.

## Sources

- Merged fork of **`domain-modeling`** and the deprecated **`ubiquitous-language`** — mattpocock/skills, MIT (© Matt Pocock, "Skills For Real Engineers"). Adopted: challenge-against-the-glossary, sharpen-fuzzy-language, scenario-testing boundaries, cross-reference-with-code, capture-inline, the opinionated glossary + *Avoid* aliases format, and the dev↔domain-expert example-dialogue device. **Recast** from DDD bounded-contexts to Dinesh's solo/freelance three-surface reality (client · design · code), with the multi-context map demoted to a mode-switch-up. **Rejected:** the source's anti-negation rule — the Don't/Do table is kept as a load-bearing guardrail for smaller models.
