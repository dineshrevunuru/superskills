---
name: plan-large-work
description: "Plan work too big for one agent session as a running MAP of investigation tickets — name the destination, chart the unknowns, resolve them ONE ticket per session until the build order is clear — instead of charging at a linear plan that collapses on the first unknown. SOLO DEFAULT: a local markdown investigation log, not a team tracker; mode-switch UP to GitHub Issues / Linear only when a real tracker already exists. Use for a big migration, refactor, or spec that won't fit one session, or when 'this is too big to plan', 'I don't know where to start', 'map out this migration', 'break down this epic', 'what do we need to figure out first', or a decision hangs on unknowns that must be resolved before committing an order. NOT for slicing an already-committed plan/spec into buildable build tickets — that is `plan-work-tickets`, the downstream step (a map produces the order; it slices the order). Cousin of `handoff-context`: the map persists across sessions; each session ends with a handoff."
license: "MIT — forked from `wayfinder` in mattpocock/skills (© Matt Pocock). Kept: destination-first charting, map-as-index, fog-of-war, out-of-scope, the ticket types, the frontier, one-ticket-per-session. Re-cast for solo: a local MAP.md replaces the issue tracker as the default; tracker/claiming is the mode-switch-UP path."
---

# Plan Large Work — Map the Frontier

A loose, too-big idea arrives wrapped in fog: the way from here to the **destination** isn't visible yet. Don't charge at it with a linear plan — chart the unknowns as a **map of investigation tickets** and resolve them **one per session** until the build order is clear. Planning, not doing: the map produces decisions, not deliverables.

## When to use / when NOT to use

- **Use** when the work won't fit one agent session AND the path is foggy — a migration, a big refactor, a spec whose order depends on unknowns you must resolve before committing.
- **NOT** when the whole journey fits one or two sessions with no real fog → plan inline, or hand off with **`handoff-context`**. A map for small work is overhead.
- **NOT** to frame the *problem* itself (one solution-free problem + scoped discovery) → **`write-problem-statement`**, the project-start gate; its discovery scope is upstream of a map.
- **NOT** to slice an *already-committed* plan/spec into buildable build tickets → **`plan-work-tickets`**, the downstream step. A map ends where the build order is committed; that committed spec is exactly what `plan-work-tickets` then slices (see Boundaries — they pipeline).
- **NOT** to scan a shipped app and rank where to refactor → **`improve-code-architecture`** (zoom out → pick a fix, within one session's reach). A map is for work you can't yet see end to end.
- **NOT** the per-session baton → **`handoff-context`**. The map persists; a handoff carries one session to the next (see Boundaries — they compose).

## Two paths — mode-switchable

- **Scrappy (no map):** if a breadth-first sketch surfaces **no fog** — the way is already clear, the whole thing fits ~1–2 sessions — you don't need a map. Plan inline and stop. Don't chart what you can already see.
- **Rigor (chart the map, default for genuinely multi-session foggy work):** name the destination, sketch the fog, cut the first tickets, then work one per session.

**Recommended default:** rigor when the work is clearly multi-session and unknowns gate the order; scrappy when the breadth-first pass finds the path already clear. When unsure, sketch breadth-first first — the fog tells you which.

## Intake gate — ask only the gaps

Discover silently: the effort's domain and workpack (from cwd + context), whether a real tracker exists (a client repo's Issues / a Linear project → mode-switch UP; else solo `MAP.md`), and what fog a breadth-first sketch already surfaces. Ask Dinesh only what you can't infer, each with a recommended default:

| Gap | Recommended default |
|---|---|
| What is the destination — a spec, a locked decision, or a change made in place? | Name the one that fixes scope; confirm before charting |
| Plan-only, or carry execution into the map? | Plan-only (produce decisions); note in the map if execution rides along |
| Is this genuinely multi-session? | If the breadth-first sketch finds no fog → scrappy, no map |

One batched round. If every gap has a safe default, state them and chart.

## Where the map lives — SOLO default

- **Solo (default):** a single markdown file — `data/workpacks/<effort>/MAP.md`. Tickets are entries in it; blocking is a `Blocked by:` line naming the blocker **by title**; the frontier is every open ticket whose blockers are all closed. No tracker, no assignees.
- **Mode-switch UP (only when a real tracker already exists):** the map is one issue labelled `map`, tickets are child issues, blocking uses the tracker's native dependency edge (it renders the frontier visually), and a session **claims** a ticket by assigning it before any work so parallel sessions skip it. Never assume this — most of Dinesh's work is solo.

## The map file (solo skeleton)

```markdown
# Map: <effort>
## Destination
<the spec / decision / change this is finding its way to — 1–2 lines. Every session orients here first.>
## Notes
<domain · skills each session should load · standing preferences>
## Frontier   (open — resolve ONE per session)
- [ ] <ticket title> · <type> · Blocked by: <title | none>
## Decisions so far   (the index — one line per closed ticket; detail lives in the ticket)
- <closed title> → <one-line gist> (detail: <path/link>)
## Not yet specified   (fog — in-scope questions too dim to ticket yet)
- <suspected question / area to revisit>
## Out of scope   (ruled past the destination — never graduates)
- <gist> — <why out>
```

Refer to every ticket by its **title**, never a bare id — a wall of `#42, #43` is illegible; names read at a glance. The map is an **index**: a decision lives in exactly one place (its ticket), so the map gists and links, never restates.

## Ticket types (each sized to one session)

| Type | Mode | What it is | Route to |
|---|---|---|---|
| **Research** | AFK | Read docs/source/APIs to answer a knowledge question; save a cited summary | `research-technical-docs` (findings carry evidence per `craft-critique`) |
| **Prototype** | HITL | A cheap, rough artifact to react to when "how should it look / behave" is the question | `build-coded-prototypes`; UI ones load `design-taste` first |
| **Decision** | HITL | A focused, one-question-at-a-time exchange to pin a choice — the default type | record durable ones per `write-decision-rationale` |
| **Task** | HITL/AFK | The one type that *does* not decides — provisioning, moving data — to **unblock** a decision | — |

A **Task** earns its place only by unblocking a decision, never by delivering the destination (plan-don't-do).

## The method (situational menu — run only what the case needs)

**Chart (one session):**
1. **Name the destination** first — it fixes the scope, so every ticket and the whole fog line hang off it. Pin it down (HITL) before charting.
2. **Sketch the fog breadth-first** — fan across the whole space, not deep on one thread; surface the open unknowns and the first steps takeable now. No fog → scrappy path, stop.
3. **Write the map file** — Destination + Notes, Decisions-so-far empty, fog in Not-yet-specified.
4. **Cut the tickets you can specify now**, then wire `Blocked by:` edges in a second pass. What you can't phrase sharply stays fog.
5. Stop — charting is one session's work; do not also resolve tickets.

**Work (one session each):**
1. Load the map (the low-res view), orient to the Destination.
2. Take the first **frontier** ticket (open, all blockers closed). Solo: just start; on a tracker, claim it first.
3. Resolve it — invoke the skill its type routes to; if in doubt, a focused HITL decision pass.
4. Record: gist the answer into **Decisions so far**, mark the ticket closed, link any artifact by path (never paste it in).
5. **Graduate the fog** the answer sharpened into fresh tickets (create-then-wire), clearing each from Not-yet-specified. If the answer exposes a ticket sitting past the destination, **rule it out of scope** — don't resolve it on the route.
6. End with a **`handoff-context`** handoff. **Never resolve more than one ticket per session.**

## Fog vs ticket vs out-of-scope

- **Ticket** when the question is already sharp — even if blocked and unactionable now.
- **Fog (Not yet specified)** when you can't phrase it sharply yet; don't pre-slice the fog into ticket-sized pieces — one patch may graduate into several tickets, or none.
- **Out of scope** when it sits *past* the destination. Scope, not sharpness, lands it here, and it never graduates. The test mirrors `name-and-control-bias`: a question that can't reach the destination is noise to this map — rule it out, don't hoard it as fog.

## Worked example — a Pages→App Router migration as 5 tickets (catches the target failure)

**The failure this catches:** the naive plan is a linear "migrate route A, then B, then C…" — it **commits a build order before the keystone unknowns are resolved.** If auth turns out not to support the chosen data-loading pattern, the whole order is wrong and half the work is thrown away.

**Destination:** *A committed, ordered route-migration plan (which routes move in what sequence, on what shared layout/data pattern) — a spec to hand to the build, not the migrated code.*

**Map (charted in session 1):**

| Ticket (by title) | Type | Blocked by |
|---|---|---|
| Does our auth work with App Router middleware + Server Components? | research | none |
| Inventory data-fetching per route (SSR / SSG / client SWR) | research | none |
| Shared layout & data pattern: RSC-first, or client-fetch islands? | decision | the two research tickets |
| Migrate the simplest static route as the reference implementation | prototype | the pattern decision |
| Commit the route-migration order + rollout behind a flag | decision | reference route + pattern |

- **Not yet specified (fog):** SEO/redirect strategy; which third-party widgets survive the layout decision (can't ticket until the pattern is chosen); analytics re-instrumentation.
- **Out of scope:** redesigning any route (this is a migration, not a redesign); changing the CMS.

**Why it works:** the order-committing ticket is *last* and *blocked* — you physically can't guess the build order until auth, the route inventory, the keystone pattern decision, and one proven reference route are closed. Resolve ticket 1 and the third-party-widget fog sharpens into its own ticket (graduation). The linear plan skipped straight to the order and would have collapsed on ticket 1's answer.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Write a linear top-to-bottom plan for foggy multi-session work | Chart the unknowns as tickets; resolve keystones before committing an order |
| Pre-slice the whole fog into tickets up front | Ticket only what's sharp now; leave the rest as Not-yet-specified until the frontier reaches it |
| Resolve several tickets in one session | One ticket per session; end with a `handoff-context` handoff |
| Restate a resolved decision in the map body | Gist + link — a decision lives in exactly one place (its ticket); the map only indexes |
| Reach for GitHub Issues / a team tracker by default | Solo default is a local `MAP.md`; mode-switch UP only when a real tracker exists |
| Hoard a past-the-destination question as "fog" | Rule it out of scope — it never graduates |
| Hand a research finding forward as settled fact | Carry findings at real confidence, per `craft-critique`'s evidence protocol |
| Do the deliverable because you're impatient | The pull to just build is the signal you've hit the map's edge — hand off |
| Refer to tickets by bare id / number | Refer by title; names read at a glance |

## Boundaries

- **`handoff-context`** owns the per-session baton (compact one session → resumable next action); this owns the multi-session **map** that outlives every handoff. They compose: each work-session resolves one ticket and ends with a handoff; the map's Decisions-so-far is the durable cross-session index. Cousin, not duplicate.
- **`write-problem-statement`** owns framing one solution-free problem + scoping discovery at project start; a map is charted *after* the destination is a known build/migration/spec. Its discovery scope is upstream.
- **`plan-work-tickets`** slices a *committed* plan/spec into buildable tracer-bullet tickets with declared blocking edges; a map resolves the *unknowns that gate the order* before any committed spec exists. Same words — ticket, blocking, frontier — opposite jobs: its tickets ship code, a map's tickets produce decisions. They **pipeline**: the map's committed destination is `plan-work-tickets`' input.
- **`improve-code-architecture`** scans a shipped app and ranks where to refactor within one session's reach; a map is for work you can't yet see end to end. Scan-and-scope there, chart-and-resolve here.
- **`explore-divergent-concepts`** owns resolving ONE foggy decision by parallel bets → compare → recommend; a single decision ticket may invoke it. The map sequences many such decisions.
- **`research-technical-docs`** / **`build-coded-prototypes`** / **`write-decision-rationale`** own how research / prototype / decision tickets are worked and recorded; the map only routes to them.
- **`craft-critique`** owns the evidence-discipline protocol every research finding obeys; **`name-and-control-bias`** owns the "can't touch the claim → noise" test the out-of-scope rule mirrors; **`design-taste`** owns taste values any UI prototype ticket loads. Reference, never restate.

## Sources

- Forked from **`wayfinder`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: destination-first charting, the map-as-index (a decision lives in one place), fog-of-war / not-yet-specified, out-of-scope-never-graduates, the research/prototype/task/decision ticket types, the frontier (open + unblocked), and one-ticket-per-session. **Re-cast for solo:** a local `MAP.md` investigation log replaces the issue tracker as the default (blocking = a `Blocked by:` title line, no assignees); tracker + native blocking + claiming is the mode-switch-UP path, not the assumption. Grilling/domain-modeling replaced by the library's HITL decision pass + `write-decision-rationale`; suggested-skills routing folded into the ticket-type table.
