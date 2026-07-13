---
name: document-and-govern-design-system
description: "Documents design-system components (variants, states, props, usage rules, content standards) and runs system governance — NN/g 6-dimension maturity assessment to pick the highest-leverage gap, contribution rules, review cycles with yes/no criteria, versioning and deprecation. Use when asked to 'document this component', 'write usage guidelines', 'audit our design system', 'set up a contribution process', 'people keep building one-offs', 'the system is drifting', or 'where should we invest in the design system next'. NOT for creating token values (build-token-system) or designing new component states (design-ui-states)."
---

# Document & Govern a Design System

Turn a pile of components into a system people actually use: documentation that answers "which one, when, and how," plus governance that keeps the system trustworthy as it grows.

*Documentation templates adapted from Anthropic's design-system plugin skill; maturity and governance layers grounded in NN/g research (see Sources).*

## When to use / when NOT to use

**Use when:**
- A component exists (in code or Figma) but has no written variants/states/usage doc
- Teams or future sessions keep rebuilding one-offs instead of using the system
- Someone asks where to invest next in the system, or whether a new pattern should enter it
- The system needs contribution rules, review cadence, or a deprecation policy
- Content rules (terminology, casing, error tone) need to live in the system

**NOT for:**
- Producing token values or token architecture → `build-token-system` owns canonical values, produced once. This skill references tokens **by name only** and never re-encodes a value.
- Designing what a state looks like (empty/loading/error behavior) → `design-ui-states`. This skill documents states that are already designed.
- Writing the actual UI copy → `write-ux-microcopy`. This skill owns the content **standards** the copy must follow.
- Judging whether a contribution is good craft → `craft-critique` owns verdict language; this skill's gate is mechanical yes/no criteria.

## The method — route the ask first

```
What's the ask?
├─ "Where does the system stand?" / "what next?"  → Step 1: Maturity scan → Step 2: pick the gap
├─ "Document component X"                          → Step 3: Documentation standard
├─ "One-offs everywhere / drift / detaching"       → Step 4: Governance
├─ "What words / casing / tone in the system?"     → Step 5: Content standards
└─ "Should this new pattern enter the system?"     → Step 4: Acceptance criteria gate
```

First check: is this a **design system or a style guide**? A style guide is a static visual reference; a design system = standards + reusable components + a process that keeps them alive (NN/g distinction). If there's no reusable component library and no process, say so — documenting a style guide as if it were a system hides the real gap.

### Step 1 — Maturity scan (NN/g 6 dimensions)

Score each dimension 0–3 using the signal questions. 15 minutes, honest answers, evidence per score — no aspirational scoring.

| Dimension (NN/g) | Signal questions | 0 looks like | 3 looks like |
|---|---|---|---|
| **Organizational alignment** | Is the system funded/mandated? Tied to a stated goal? | "Side project nobody asked for" | Leadership names it in planning |
| **Team effectiveness** | Named owner? Allocated time, or side-of-desk? | No owner | Owner with protected hours |
| **Infrastructure** | Tokens in code AND design tool? Versioned releases? Searchable docs? Changelog? | Values scattered, no docs | One source of truth, versioned, documented |
| **Governance** | Written contribution process? Yes/no acceptance criteria? Review SLA? | "Ask whoever built it" | Published criteria, decisions in days |
| **Support** | Onboarding path? Migration help? A channel that answers? | Silence | Office hours + fast answers |
| **Adoption** | What share of NEW UI uses the system? Are teams detaching/overriding? | Everyone forks | Default choice; overrides are rare and reported |

### Step 2 — Pick the highest-leverage gap (one, not five)

1. **Lowest score wins by default** — but apply the overrides below.
2. **Low adoption + decent infrastructure → the gap is governance or support, not more components.** Teams detach when reviews are slow or criteria are fuzzy (NN/g enforcer finding: fast reviews + clear yes/no criteria are what drive adoption).
3. **Solo or two-person system** (a freelance product, a portfolio): skip organizational-alignment ceremony. Leverage lives in **infrastructure** (docs + named tokens) and **self-governance** (a changelog and acceptance criteria you actually follow) — that's what lets a future session or collaborator continue the work.
4. **Never pick "build more components" as the gap.** Coverage is an output, not a maturity dimension. An undocumented, ungoverned library of 60 components is less mature than 12 documented, governed ones.

Output one sentence: *"Highest-leverage gap: [dimension] — because [evidence]. First move: [specific action, sized]."*

### Step 3 — Documentation standard (per component)

Fixed section order. A component is **not in the system** until this doc exists — undocumented components are one-offs with good intentions.

1. **One-line description** — what it is + the job it does. Not its visual appearance.
2. **Use when / DON'T use when** — the *don't* row must NAME the sibling component that owns the adjacent case ("For blocking confirmation, use `Modal`"). This is the single highest-value line in the doc; it's the question people actually have.
3. **Variants table** — each variant with a distinct "use when." **If you can't write a distinct use-when, the variant shouldn't exist — cut it** (load `design-taste` first; the cut-vs-keep call defers to it).
4. **States table** — every state the component renders: default, hover, focus, active, disabled, plus loading/error/empty where applicable. **A missing focus-state row is an accessibility failure, not an omission.** (Designing the states belongs to `design-ui-states`; here you record the decisions.)
5. **Props/API table** — name, type, default, description. Defaults are load-bearing: they encode the recommended usage.
6. **Accessibility block** — ARIA role, full keyboard map, what the screen reader announces. Never "TBD."
7. **Content rules inline** — label casing, max length, error-message pattern for THIS component (see Step 5 for system-wide rules).
8. **Tokens by name only** — `color.action.primary`, `space.4`. A raw hex or px value in a doc is a bug; values live in `build-token-system`'s output.
9. **One code example** — current API, copy-paste runnable, no deprecated props.
10. **Do/don't table** — from real misuses you've seen or the likeliest ones. Generic rows ("do use it correctly") are filler; cut them.

Prioritize coverage over polish: a shallow doc (sections 1–2, 4, 6) for every component beats perfect docs for three. Mark shallow docs `status: draft` and log them as debt.

### Step 4 — Governance

**4a. Pick a contribution model by team size:**

| Model | Who approves | Right when |
|---|---|---|
| Centralized | One owner approves everything | Solo–5 designers/engineers. Default for freelance/portfolio systems. |
| Federated | Trained contributors across teams share approval | Multiple product teams, dedicated system team |
| Hybrid | Core team approves; contributors propose + co-build | In between; system team is a bottleneck |

**4b. Publish yes/no acceptance criteria** for anything entering the system. All must pass — no judgment calls at the gate (judgment happens later, in review, per `craft-critique`):

- [ ] Needed in ≥3 places (or ≥2 products) — link them
- [ ] Cannot be achieved with an existing component + props (checked against the docs, not memory)
- [ ] All states specified, including focus, loading, error where applicable
- [ ] Accessibility block complete (role, keyboard, announcement)
- [ ] Uses tokens only — zero raw values
- [ ] Documentation (Step 3) written BEFORE merge, not after
- [ ] Changelog entry drafted

**4c. Run a review cycle with an SLA.** Intake via a template (what, where needed, which criteria it meets) → check against criteria → decision within a stated window (days, not weeks) → merge with changelog entry, or reject **naming the specific criterion that failed**. Slow or ambiguous review is the primary reason teams detach from a system — a fast "no with a reason" preserves trust better than a slow "maybe" (NN/g enforcer research).

**4d. Name the enforcer.** One person reviews new UI against the system — not to police style, but to catch one-offs early and route them: use existing / extend existing / propose new. If nobody holds this role, the acceptance criteria are decoration.

**4e. Version and deprecate — never silently delete.**
- Semver: breaking API/visual change = major; new variant/prop = minor; fix = patch.
- Every breaking change ships with a migration note (old → new, effort estimate).
- Deprecation = mark in docs with the replacement + removal date. Deleting a component someone still uses converts adoption into resentment.

### Step 5 — Content standards (they live IN the system)

Content rules are system components too (NN/g: content design systems). Capture as decided rules, not suggestions:

- **Terminology table** — one term per concept, enforced ("Sign in," never "Login"; "Remove," never "Delete" — whatever THIS product decided). Include the banned synonyms.
- **Casing** — one rule for buttons/labels/headings (e.g., sentence case everywhere) stated once, referenced by every component doc.
- **Error-message pattern** — what happened + how to fix it, no blame, no codes-only. Each component's doc points here and adds only its specifics.
- **Formats** — dates, numbers, currency, truncation rules.
- Writing the actual strings → `write-ux-microcopy`. This section is the contract those strings must satisfy.

## Worked example 1 — maturity scan of a small two-product system

| Dimension | Score | Evidence |
|---|---|---|
| Organizational alignment | 2 | Client expects consistent UI across booking app + admin app; no formal mandate |
| Team effectiveness | 2 | One owner (the designer-engineer); time exists but unprotected |
| Infrastructure | 2 | Tokens in code and Figma; docs partial; no changelog |
| Governance | 0 | No written criteria; "new component whenever it feels needed" |
| Support | 1 | Owner answers own questions; nothing written for a collaborator or future session |
| Adoption | 1 | Admin app detached: 14 hardcoded colors, 3 duplicate button variants |

**Highest-leverage gap: Governance (0)** — adoption is low *while infrastructure is decent*, which per Step 2 rule 2 points at governance, not more components. First move: publish the 7 acceptance criteria + start a changelog; run a 30-minute self-review before any new component enters. Sized: 2 hours.

## Worked example 2 — component doc (condensed)

```markdown
## Toast

Transient, non-blocking confirmation of a completed action. Auto-dismisses.

**Use when:** confirming success/failure of an action the user just took, no response required.
**DON'T use when:** the user must act or acknowledge → use `Modal`. Persistent status → use `Banner`.

| Variant | Use when |
|---|---|
| success | Action completed as requested |
| error   | Action failed; message says what to do next |
(No "info" toast: unprompted info is a Banner. Variant cut 2026-05.)

| State | Notes |
|---|---|
| Entering / visible / exiting | Durations + curves: see `design-taste` motion law |
| Focus (on action link)       | Visible ring, token `focus.ring`; toast pauses auto-dismiss while focused |

| Prop | Type | Default | Description |
|---|---|---|---|
| variant  | 'success' \| 'error' | — (required) | Semantic variant |
| duration | number (ms) | 5000 | Auto-dismiss; error variant ignores it and persists |

**Accessibility:** role="status" (success) / role="alert" (error); dismissible via Esc;
announced once, not on re-render. **Content:** ≤ 90 chars, sentence case, verb-first
("Booking saved"), error follows the system error pattern (what happened + fix).
**Tokens:** `surface.raised`, `space.4`, `radius.md` — names only.

| ✅ Do | ❌ Don't |
|---|---|
| One toast at a time; queue the rest | Stack three toasts and cover the nav |
| Persist errors until dismissed | Auto-dismiss an error the user needed to read |
```

## Anti-patterns

| Red flag | Why it fails | Instead |
|---|---|---|
| Happy-path-only docs (no focus/error/loading rows) | The gaps get invented differently by every consumer | States table is mandatory; focus row is an a11y gate |
| Polishing 3 perfect docs while 30 components have none | Undocumented components are one-offs; drift wins | Shallow-doc everything, mark `draft`, deepen by usage |
| Style guide labeled "design system" | Static rules without components + process can't be adopted | Name it honestly; the gap is the system, not the docs |
| Governance doc with no enforcer | Criteria nobody applies are decoration | Name one person; route one-offs early |
| Slow/ambiguous contribution reviews | The #1 driver of teams detaching | SLA in days; reject fast, naming the failed criterion |
| Raw hex/px values in docs | Duplicates and drifts from the token source | Token names only; values live in `build-token-system` output |
| Variant sprawl ("secondary-alt-2") | No distinct use-when = no reason to exist | Cut the variant; record the cut in the changelog |
| Silent deletion of a used component | Breaks consumers, burns trust | Deprecate: replacement + removal date, then remove |
| Docs that restate the props file | Zero judgment added; nobody reads them | Lead with use-when/don't-use-when and the sibling pointer |

## Output formats

**Maturity audit** → the 6-row scorecard (dimension, score 0–3, evidence) + one highest-leverage-gap sentence + one sized first move. Never a five-item improvement plan.

**Component doc** → the 10-section standard from Step 3, in that order.

**Governance one-pager** → contribution model + the yes/no criteria checklist + review SLA + enforcer name + versioning/deprecation rules. One page; if it's longer, it won't be followed.

## Sources

- Design Systems 101 — https://www.nngroup.com/articles/design-systems-101/
- Design-System Maturity (6-dimension framework) — https://www.nngroup.com/articles/design-system-maturity/
- Your Design System Needs an Enforcer — https://www.nngroup.com/articles/design-system-enforcer/
- Design Systems vs. Style Guides — https://www.nngroup.com/articles/design-systems-vs-style-guides/
- Content Standards in Design Systems — https://www.nngroup.com/articles/content-design-systems/

## Boundaries

- **build-token-system** produces canonical token values and architecture, once. This skill documents and governs the system that consumes them — token **names** appear here, values never do. (`apply-personal-brand` likewise consumes tokens as themes and never re-encodes values.)
- **design-ui-states** designs empty/loading/error/partial states; this skill records the decisions in the states table.
- **write-ux-microcopy** writes the strings; this skill owns the content standards the strings must satisfy.
- **craft-critique** owns judgment and verdict language when reviewing a contribution's quality; this skill's acceptance gate is strictly mechanical yes/no.
- **design-taste** is loaded first whenever a new pattern is proposed for the system — variants and motion decisions defer to it.
