---
name: plan-work-tickets
description: "Slices a plan or spec into small **tracer-bullet** tickets, each declaring its **blocking edges** (what must ship before it can start), then sequences them so you always build a ready one. Use when turning a plan, spec, or PRD into buildable work — 'break this into tickets', 'slice this spec', 'turn this into tasks', 'what should I build first', 'sequence this work', 'what depends on what', 'why did this task stall halfway'. SOLO DEFAULT: writes plain text files in a local `tickets/` folder — mode-switches UP to a real tracker's native blocking-links only when Dinesh actually runs one. NOT for framing the problem itself (write-problem-statement), for work still too big to order (plan-large-work), or for a throwaway spike (build-coded-prototypes)."
license: "MIT — forked from `to-tickets` in mattpocock/skills (© Matt Pocock). Kept: tracer-bullet vertical slices, declared blocking edges, the expand–contract wide-refactor exception, and frontier-order work. Rebuilt for a solo/freelance reality — local text files by default, no tracker or team assumed."
---

# Plan Work Tickets — Tracer Bullets With Declared Edges

Part of the **SHIP wing** (production-code craft). Take a plan and cut it into **tracer-bullet** slices — each a narrow but *complete* path through every layer — and give each slice its **blocking edges**: the other slices that must land first. The enemy is the *hidden* edge: a ticket that looks ready, gets started, and stalls mid-build on something no one declared.

## When to use / when NOT to use

**Use** when a plan, spec, PRD, or approved concept needs to become an ordered set of buildable tickets — for the booking app, the portfolio agent, any Next/React surface, or a client feature.

**Do NOT use** when:
- The *problem* isn't framed yet — no spec, just a raw ask → **write-problem-statement** owns the seam map and scope; slicing an unframed problem invents work.
- The work is too big to order — you can't yet see the build sequence because unknowns still gate it → **plan-large-work** charts and resolves the unknowns into an order first; slice only once that order is clear.
- It's a throwaway spike to answer one question → **build-coded-prototypes** owns that; a prototype isn't a ticket, it's a probe you delete.
- You're *implementing* the tickets you carved → **implement-spec** conducts the SHIP-wing build (it wires **test-shipped-code** and **review-shipped-code**, routing breakage to **diagnose-bugs**). This skill stops at published, ready-to-grab tickets.

## The one law

**Every ticket declares its blocking edges, and every input a ticket consumes traces to a producing ticket.** A ticket with no blockers can start immediately; a ticket whose inputs come from nowhere is a stall wearing a "ready" label. Declaring the edge is cheap; discovering it mid-build — an agent grabbed the ticket, wrote half of it, then found the query it reads was never built — costs a whole context window.

The blind spot this fights is a named one. Assuming your slices are independent is **planning/optimism bias** (`name-and-control-bias` catalogs it — "it'll just wire up"); the input-trace audit is the *control*. The inverse also holds, straight from that skill's principle: **a dependency that can't actually gate the ticket is noise** — don't over-couple slices into a false chain just because they touch nearby code. Declare the edges that gate; delete the ones that don't.

## Two paths — mode-switchable

- **Scrappy (~10 min):** a small feature, 2–4 obvious slices, low branching. Cut the slices, name the one or two real edges, write the files, go. Skip the formal input-trace audit only when the whole thing fits in your head.
- **Rigor (default for anything real):** the full method below — vertical-slice rules, the hidden-dependency audit, the quiz-and-iterate loop. Any plan that spans more than ~3 slices, crosses a data contract, or you'll build over multiple sessions is rigor.

**Recommended default:** rigor whenever the work outlives one sitting; scrappy only for a quick 2–3 ticket carve you'll finish today.

## Destination — situational (SOLO default, tracker UP)

The tickets are identical; only the shape of the edges changes.

- **SOLO DEFAULT — local files.** One file per ticket under `tickets/<feature-slug>/NN-<slug>.md`, numbered from `01` in dependency order (blockers first). "Blocked by" lists the file numbers. This is the default because Dinesh works solo/freelance with no shared tracker — a folder in the repo *is* the board.
- **Mode-switch UP — a real tracker.** Only when he actually runs one (a client's Linear, a GitHub Issues repo). Publish one issue per ticket in dependency order so edges reference real IDs; use the platform's native blocking / sub-issue link where it has one. Never assume this — ask, or default to local.

## Intake gate — ask only the gaps

Fill what the plan already gives you; ask **only** what's missing, each with a recommended default so Dinesh confirms instead of composes.

| # | Need | If missing, ask (with a default) | Discover myself |
|---|------|----------------------------------|-----------------|
| 1 | **The plan/spec** | "Point me at the spec / plan — or is it the concept we just approved?" | Yes — read the conversation, the workpack, the PRD |
| 2 | **Destination** | "Local `tickets/` folder, or a tracker you actually run? (default: local)" | Partly — check for a tracker in the repo |
| 3 | **Granularity** | "One-sitting slices, or coarser milestones? (default: one fresh context window each)" | No — his call |
| 4 | **Done-signal per slice** | "What makes a slice demoable — a screen, a passing test, a curl? (default: infer per layer)" | Partly — from the spec's acceptance criteria |

One batched round. If every gap has a safe default, state the defaults and proceed.

## The method (rigor path)

1. **Gather the plan.** Work from the spec / approved concept in context. If it references a workpack or PRD, read the full body first — a slice built off a half-read plan inherits its gaps.
2. **Explore + prefactor.** Skim the code the slices will touch; use its real vocabulary in titles. Look for a **prefactor** — "make the change easy, then make the easy change." If one mechanical cleanup makes three later slices trivial, it becomes ticket `01`, blocking them.
3. **Cut tracer-bullet slices.** Apply the rules below. Each is a vertical path, demoable on its own, sized to one fresh context window.
4. **Declare edges + run the input-trace audit.** For every slice, list its blockers — *then* trace each input it consumes (data it reads, a component it renders, a route it calls) to the ticket that *produces* that input. An input with no producer = a missing edge or a missing ticket. This step is the whole skill; it's what catches the hidden dependency.
5. **Quiz + iterate.** Present the numbered breakdown (title · blocked-by · what it delivers). Ask: granularity right (too coarse / too fine)? Edges correct — does each only depend on what genuinely gates it? Anything to merge or split? Iterate until Dinesh approves.
6. **Write the tickets.** Local template below, or the tracker. One ticket per file — never a combined file. Avoid file paths and code snippets; they rot. *Exception:* a prototype that produced a decision-encoding snippet (a state machine, a reducer, a schema/type shape) — inline just the decision-rich part and note it came from a prototype.
7. **Hand off the frontier.** The frontier is any ticket whose blockers are all done; **implement-spec** builds them one at a time, clearing context between tickets (**handoff-context** owns the between-ticket carry). A purely linear chain is worked top to bottom.

**Vertical-slice rules:**
- Cut a *narrow but complete* path through every layer the feature needs (schema, action, UI, state, tests) — never a horizontal slice of one layer ("all the schema," "all the styling").
- A finished slice is demoable or verifiable on its own — a screen you can click, a test that passes, a route you can curl.
- Sized to fit one fresh context window. Bigger → split. Trivial → merge up.
- Prefactors land first, blocking the slices they simplify.

**Wide-refactor exception — expand–contract.** A *wide refactor* is one mechanical change (rename a shared type, retype a column) whose blast radius fans across the codebase so no vertical slice can land green alone. Don't force it into a tracer bullet. Sequence it: **expand** (add the new form beside the old — ticket, no blocker) → **migrate** the call sites in batches sized by blast radius (per directory/module — each batch a ticket blocked by expand, CI green because the old form still exists) → **contract** (delete the old form — one ticket blocked by *every* migrate batch).

## Worked example — 4 slices, catches a hidden dependency

**Plan (Next.js app):** "Add *Saved venues* — a signed-in user can favorite a venue and see a Favorites page." Naive cut:

| # | Ticket | Blocked by | Delivers |
|---|--------|-----------|----------|
| 01 | Persist a saved venue | none | Save/unsave a venue; it persists (server action + table) |
| 02 | Save toggle on the venue card | 01 | Heart toggle on each card reflects + writes saved state |
| 03 | Favorites page at `/saved` | 01 | Lists the current user's saved venues |
| 04 | Empty / loading / error states for `/saved` | 03 | The non-happy states, done right |

Looks clean — 02 and 03 both hang off 01, so they read as parallel. **Run Step 4's input-trace audit:**

- **03 reads a *list* of saved venues.** Trace that input to its producer. Ticket 01, as scoped, built only the *write* (save/unsave mutation) — there is no *read* query that returns the list. **03's core input has no producer.** The declared edge `01 → 03` is a lie: 01 doesn't produce what 03 consumes.
- **The stall it prevents:** without the audit, the moment 01 lands, 03 is on the frontier (its only declared blocker is done). It gets grabbed, half-built, then dead-ends discovering there's no read query — a whole context window burned. That's precisely the hidden dependency "declare your edges" exists to catch: the edge was *declared but not sufficient*.
- **The fix:** expand 01 to own *both sides of its persistence seam* — the write mutation **and** the read query. Now `01 → 03` is real and sufficient, and 01 is the tracer bullet for the whole data contract, not half of it.
- **Second, softer catch:** 04 lets a user unfavorite from the list, reusing the toggle built in 02 → a real `02 → 04` edge the naive cut also missed. Its acceptance criteria for the visual states defer to **design-taste** — the ticket names *which* states must exist; it does not restate pixel values.

Corrected edges: `01 → 02`, `01 → 03`, `02 → 04`, `03 → 04`. Frontier order: 01, then 02 and 03 in parallel, then 04. The audit turned a plan that would stall on ticket 03 into one that always has a truly-ready ticket.

## Anti-patterns / red flags

- **Horizontal slices.** "Ticket 1: all the schema. Ticket 2: all the UI." Nothing is demoable until the end; integration risk piles up at the finish.
- **Declared-but-insufficient edge.** The blocker is named but doesn't produce what the ticket reads — the worked-example trap. Trace inputs to producers, every time.
- **Over-coupled chain.** Forcing a linear A→B→C because the tickets touch nearby files, when B doesn't actually need A. A dependency that can't gate the ticket is noise (`name-and-control-bias`).
- **Slice too big to hold.** A "ticket" that won't fit one context window is a plan, not a ticket — split it.
- **File paths / code in the ticket.** They go stale before you build. Describe behavior; inline only a decision-encoding snippet from a prototype.
- **Wide refactor jammed into a tracer bullet.** It can't land green alone — sequence it expand → migrate → contract instead.
- **Skipping the quiz.** Publishing before Dinesh confirms granularity and edges. The audit catches missing edges; only he catches wrong granularity.

## Don't / Do

| Don't | Do |
|---|---|
| Slice by layer (all schema, then all UI) | Cut vertical tracer bullets — one narrow path through every layer |
| Trust an edge because it's written down | Trace each input to a producing ticket; an untraced input is a missing edge |
| Chain tickets because they touch the same files | Declare only edges that genuinely gate; delete false couplings |
| Size a ticket by feature area | Size it to one fresh context window; split what won't fit |
| Bake file paths / snippets into a ticket | Describe end-to-end behavior; inline only a prototype's decision-encoding bit |
| Force a wide refactor into one green slice | Sequence expand → migrate-in-batches → contract |
| Assume a tracker and a team | Default to local `tickets/` files; switch up only when he runs one |

## Output format — local ticket (`tickets/<feature-slug>/NN-<slug>.md`)

```markdown
# NN — <ticket title>

**What it delivers:** the end-to-end behavior this ticket makes work, from the user's
perspective — not a layer-by-layer implementation list.

**Blocked by:** NN, NN — or "None — ready now".

**Status:** ready

## Acceptance criteria
- [ ] <specific, verifiable — a demoable behavior or a passing check>
- [ ] <UI slices: defer visual correctness to design-taste; name the states, not pixel values>
```

Acceptance criteria are claims about "done" — when a ticket carries an external or numeric claim, it follows **craft-critique**'s evidence discipline (cite it / get it / flag it), never a confident guess.

## Boundaries

- **write-problem-statement** owns framing and scoping the problem and mapping its seams (upstream). This skill consumes that spec; it never re-frames the problem or invents scope.
- **build-coded-prototypes** owns throwaway spikes. A prototype answers a question and gets deleted; it is never a ticket. Its decision-encoding snippet may be *quoted* into a ticket (Step 6).
- **plan-large-work** owns work too big for one sitting or gated by unresolved unknowns — it charts the unknowns and resolves them into a build order (upstream). This skill consumes a *clear* order and slices it; it never charts unknowns.
- **implement-spec** conducts *building* the tickets — it wires **test-shipped-code · review-shipped-code · diagnose-bugs** through the SHIP rigor path. This skill stops at published, frontier-ordered, ready-to-grab tickets; implement-spec picks them up.
- **handoff-context** owns the carry *between* tickets — clearing context per slice is its job, referenced in Step 7.
- **name-and-control-bias** owns the planning/optimism bias the input-trace audit controls for, and the "a dependency that can't gate is noise" principle. Referenced, never restated.
- **craft-critique** owns the evidence discipline any claim-carrying acceptance criterion follows, and **design-taste** owns the visual correctness a UI slice's criteria defer to. Named, never restated.

## Sources

- Forked from **Matt Pocock — `to-tickets`** (github.com/mattpocock/skills, MIT © Matt Pocock, "Skills For Real Engineers"). Kept: tracer-bullet vertical slices (narrow-but-complete, demoable, one-context-window), declared blocking edges + frontier-order work, the expand–contract sequencing for wide refactors, and "make the change easy, then make the easy change." Personalized: solo-first — local `tickets/` files as the default destination with a tracker as the mode-switch-up, not the assumption; added the input-trace hidden-dependency audit as the core discipline; wired to Next/React and the SHIP-wing siblings; dropped the tracker/triage-label pipeline his setup doesn't have.
