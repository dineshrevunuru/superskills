---
name: build-knowledge-base
description: "Capture reusable learnings, decisions, and patterns into a findable personal knowledge base — right home, tagged, linked — so future-him retrieves instead of re-deriving. Use when Dinesh says 'note this down', 'save this for later', 'where do I keep this', 'I'll forget this', 'did I solve this before', 'knowledge base', 'second brain', 'my notes', 'capture this learning', or when a hard-won fix / decision / pattern would otherwise die in a chat log. Owns personal knowledge (capture → link → retrieve); research findings live in build-research-repository."
license: "MIT — generalizes `obsidian-vault` from mattpocock/skills (© Matt Pocock). Its unit-of-learning + wikilink + index-note discipline is kept and made storage-agnostic; Matt's hardcoded Obsidian vault path and setup are not carried over."
---

# Build Knowledge Base

Turn each hard-won learning, decision, and pattern into a **findable** note in the right home — so future-him retrieves it in ten seconds instead of re-deriving it in an hour. The enemy is the re-solve: you already cracked this once, and the answer died in a chat log or a scratch file nobody searches.

## When to use / when NOT to use

- **Use** when a fix, decision, pattern, or reference you'll want again would otherwise be lost; when Dinesh asks *where do I keep this*; or *before* rebuilding something you may have already solved (the retrieve gate).
- **NOT** for research findings sourced to participants / studies → **`build-research-repository`** (rule of thumb: sourced-to-a-participant = research repo; sourced-to-a-commit / thread / your-own-head = knowledge base).
- **NOT** for a full formal decision record with alternatives and "what would change this" → **`write-decision-rationale`**. The KB stores the *distilled* learning from that decision and links to the full record; it doesn't replace it.
- **NOT** for packaging context to hand to the next session or another person → **`handoff-context`** (a handoff is outbound and time-bound; the KB is durable and queryable).

## Intake gate — ask only the gaps

Discover silently, don't ask: the **home** (content type decides it — see the storage table); the **tags** (read them off the content, 4-axis); whether an **index note already exists** (search first, before proposing a new one).

Ask Dinesh only these, each with a recommended default:
- Durable knowledge (→ KB) or a one-off for a specific handoff/session (→ `handoff-context`)? *(Default: KB if future-him will want it more than once.)*
- Join an existing index/topic, or start a new one? *(Default: join the nearest existing index; create one only if none fits.)*
- Solo homes (Figma + Docs), or is a team wiki actually in play? *(Default: solo — he's freelance with no team wiki. Escalate only if he names a shared tool.)*

Batch it; proceed on defaults if the answers are obvious.

## The unit — the knowledge nugget

Same **nugget model and 4-axis tag taxonomy as `build-research-repository`** (load it — the taxonomy and the controlled-vocabulary rule are defined there, not restated here). A knowledge nugget adapts the fields for non-research knowledge:

```
NUGGET
  Learning:    the one self-contained thing future-him needs to know
  Tags:        the same 4 axes (build-research-repository) — for personal knowledge read them as
               theme · context/project · tech-area/feature-area · job-future-him-is-doing
  Provenance:  where it came from + when + link (commit/PR/thread/doc)  ← traceability, non-negotiable
  [Confidence] High / Med / Low — per craft-critique's evidence protocol (verified vs "I think")
  [Links]      related notes + the index/hub note it belongs under
  [Status]     Active / Superseded / Retired (default Active; flip when the thing it describes changes)
```

A learning with no provenance is a rumor, not knowledge — the same traceability `name-and-control-bias` requires as the control against cherry-picking. Where + when + link, or it doesn't go in.

## Situational storage — route by content type

**Same split as `build-research-repository`** — the medium follows the content, and the tag taxonomy is **identical across both homes** so one query returns both.

| Content type | Home | Shape |
|-------------|------|-------|
| **Visual / spatial** — teardowns, pattern boards, flow annotations, reusable layouts | **Figma / FigJam** | Boarded nuggets; tags as labels/sections; a board cover as the index |
| **Written** — fixes, decisions, snippets, how-tos, references, meeting takeaways | **Docs / Markdown (in-repo)** | One nugget per record; tags in a table/frontmatter; provenance line mandatory |

## The three disciplines — capture · link · retrieve

These fire at **different moments, not in sequence** — capture when you learn, retrieve when you're about to build. Run the one the moment calls for; don't march all three every time.

1. **Capture** (at learning-time) — the instant a fix lands, a decision is made, or a pattern clicks, file the nugget in the right home. Capture cost must be near-zero or it won't happen: **one appendable running home beats a perfect taxonomy you skip.**
2. **Link** (so it's reachable) — connect it to where future-him will actually look: (a) tag on the 4 axes; (b) cross-link related notes with a **named link** — `[[Name]]` here is notation for whatever the home renders (a Docs/Markdown link, a Figma connector), not literally Obsidian syntax; (c) surface it under an **index/hub note** per topic — Docs MOC, Figma board cover — the obsidian index-note discipline, generalized. A note with no inbound path is a note you'll never find again.
3. **Retrieve** (the gate, at problem-time) — **search before you rebuild.** Before solving a problem, making a decision, or starting a build, query the KB across the 4 axes + full-text.
   - **Hit** — reuse/cite it; don't re-derive.
   - **Partial** — extend the existing note with the delta.
   - **Miss** — do the work, then capture back on the way out.
   A hit only counts if it's **still fresh**: if the flow/pattern/API it describes has since changed, it's `Superseded`, not gospel. Flip the status — never delete (the audit trail is the point). This gate is the entire ROI; skipping it is how you pay twice to learn once.

## Mode-switchable

- **Scrappy (solo default):** one appendable "Learnings" doc + one FigJam "Patterns" board, both tagged on the 4 axes, each topic getting a lightweight heading/index. This is the default — solo/freelance, no team wiki. Even one well-tagged doc makes the retrieve gate possible next time.
- **Full:** a maintained tag vocabulary, per-topic index/MOC notes, a periodic dedup + Superseded sweep, and — *only if a shared team wiki actually exists* (Notion/Confluence) — promote to it with the taxonomy kept identical. Never assume the team setup; mode-switch up to it only when he names one.

## Worked example — a learning captured, then retrieved (catches the re-solve)

**Building a Next.js App Router page**, he hits a hydration mismatch from reading a client-only value (`window`/`localStorage`) during render, and fixes it. Capture it:

```
NUGGET  kb-2026-07-hydration-guard
  Learning: In Next App Router, reading window/localStorage during render triggers a
            hydration mismatch — gate behind a mounted flag / useEffect, or read server-side.
  Tags: theme:hydration · context:portfolio · area:next-app-router ·
        job:ship-a-hydration-safe-page
  Provenance: fixed in commit <sha> · portfolio repo · 2026-07 · linked PR
  Confidence: High (verified — the mismatch cleared)
  Links: [[Next App Router Notes]] (index) · [[Client-only Values]]
  Status: Active
```

Filed in **Docs/Markdown** (written), surfaced under the `[[Next App Router Notes]]` index. (A visual teardown would instead live on a FigJam "Patterns" board — same tags.)

**Two months later**, before wiring a theme toggle into a new client build, the retrieve gate query `job:ship-a-hydration-safe-page` / "hydration" returns this nugget. He applies the guard immediately instead of re-debugging the white-flash for an hour.

The failure it caught: without capture **and** the index link, he either re-derives the same fix at full cost, or the note exists but un-linked and search never surfaces it — the write-only graveyard. Capture without link is not knowledge; it's landfill.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Dump into a scratch file with no tags or links | Tag on the 4 axes + link into an index the moment you file |
| Skip the retrieve gate and re-solve from scratch | Search before you rebuild — query across axes + full-text first |
| Let the KB grow its own copy of taste values / breakpoints | Link to `design-taste`; store only context/rationale — a copy drifts (sediment) |
| Store a learning with no provenance ("I read somewhere…") | Provenance line: where + when + link, or it's a rumor (`name-and-control-bias`) |
| Keep a stale note as if still true after the thing changed | Flip Status → Superseded; never delete (audit trail) |
| Tag differently in Figma vs Docs | One taxonomy across both homes so cross-content search returns both |
| Build an elaborate PKM system before you have notes | Start with one appendable doc + one board; escalate only when it strains |

Red flags: *"I definitely solved this before but can't find it"* · a notes folder nobody ever searches · a decision re-litigated because its rationale was never captured.

## Boundaries

- **`build-research-repository`** owns research findings sourced to participants/studies, plus the canonical nugget model + 4-axis taxonomy (referenced here, never restated). This skill owns non-research personal knowledge using the same discipline.
- **`write-decision-rationale`** owns the full formal decision record (alternatives, "what would change this"); the KB stores the distilled learning + a link to it.
- **`handoff-context`** owns outbound, time-bound context for the next session/person; a handoff may deposit a nugget into the KB on its way out.
- **`design-taste`** owns canonical taste values; a KB design note links to it, never re-encodes its values.
- **`craft-critique`** owns confidence/evidence discipline; nuggets carry the confidence it assigns.
- **`name-and-control-bias`** owns traceability as the control; the KB's mandatory provenance line is where it physically lives.

## Sources

- Generalizes **`obsidian-vault`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." **Kept:** unit-of-learning notes, `[[wikilinks]]`, index/hub notes, links-at-the-bottom, search-by-content retrieval. **Dropped:** the hardcoded vault path and Obsidian-specific tooling (made storage-agnostic to his Figma + Docs homes).
- **`build-research-repository`** (this library) — the nugget model, 4-axis taxonomy, storage split, and reuse-gate this skill generalizes from research to personal knowledge.
- PKM lineage — Luhmann's Zettelkasten (atomic, linked notes you can find again); Maps of Content / MOC (Nick Milo) as the index-note pattern; "Building a Second Brain" (Tiago Forte) for capture-first discipline.
