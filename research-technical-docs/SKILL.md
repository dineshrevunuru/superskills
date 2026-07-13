---
name: research-technical-docs
description: "Investigate a TECHNICAL question against high-trust PRIMARY sources — official docs, source code, specs, first-party API references — trace every load-bearing assertion back to the authority that owns it, version-pin each citation, and save the findings as one cited Markdown file. Use when researching how a library/framework/API actually behaves before building on it, checking an API signature or config default, resolving 'does X support Y', 'is this deprecated', 'what changed in version N', 'how does Next.js / React / Framer Motion / GSAP / the Anthropic / ElevenLabs API do Z', or when an agent states a technical fact from memory and it needs sourcing. Researches DOCS and APIs — not markets (conduct-business-research), not users (the UX-research wing), not your own repo (codebase-design). Every assertion follows craft-critique's evidence protocol; the saved file files into build-research-repository."
license: "MIT — forked from `research` in mattpocock/skills (© Matt Pocock). Primary-source discipline and save-findings-as-one-cited-Markdown-file output adopted; personalized to Dinesh's stack + wired to craft-critique / build-research-repository."
---

# Research Technical Docs

Answer a technical question by tracing every load-bearing assertion back to the **primary source** that owns it — the authority itself, not a write-up of it — and save the result as one **version-pinned**, cited Markdown file. A fact stated from memory is a guess wearing a lab coat.

## When to use / when NOT to use

**Use when:**
- Researching how a library, framework, or API actually behaves *before* you build on it.
- Checking a concrete fact: an API signature, a config default, a deprecation, "what changed in version N."
- Reconciling docs that disagree with each other, with the source code, or with observed behavior.
- Producing a cited technical reference that another skill — or future-you — will trust without re-reading everything.

**NOT for (distinct object each time):**
- Market / industry / competitor facts → **`conduct-business-research`** (its object is the *market*; its tier ladder grades market claims, not docs).
- User behavior, needs, or preferences → the UX-research wing (`choose-research-method`, `conduct-user-interview`, …); their object is *users*.
- Understanding *your own* codebase → **`codebase-design`**; a defect in *your* code → **`diagnose-bugs`**. This skill researches **external** authorities — the docs, specs, and source of the dependencies you build on.
- Judging whether a claim inside a design/case study is evidenced → **`craft-critique`** (you *apply* its protocol here; you don't re-run its review).

## Two paths — mode-switchable

- **Scrappy (one-fact lookup, ~10 min):** a single signature, one config default, "is X deprecated?", "what's the enum for this prop?" Trace the one assertion to its owning source, version-pin it, done. Don't spin up the full ladder for a fact nothing downstream depends on.
- **Rigor (default when the answer gates code you'll ship or an architecture choice):** full source ladder + trace every load-bearing assertion + reconcile conflicts + save the cited file.

**Recommended default:** rigor when the answer will shape code you ship or a decision you'll defend; scrappy for a throwaway signature check. When unsure, rigor — an untraced technical fact fails silently, months later, in production.

## The method (rigor path)

**Step 0 — Load `craft-critique`.** Every assertion this skill emits is handled per its evidence protocol: **cite it / get it / flag it under-evidenced.** That protocol lives there and only there — do not improvise a local copy.

**Step 1 — Frame the question and pin the context (intake gate).** Write one sentence naming the exact fact *and the version/environment it's for*: "Does Next.js 15 App Router cache `fetch()` by default?" — not "how does Next caching work?" A doc fact is version-scoped; an unversioned question invites a version-wrong answer. **Discover the version silently** — read it from `package.json` / the lockfile / the runtime, don't ask. Ask Dinesh **only the true gap** — and offer a recommended default: if the target version is genuinely ambiguous, ask "the version you ship (`<the one in the lockfile>`), or the latest?" rather than making him restate the whole question. If nothing is ambiguous, pin the version and proceed.

**Step 2 — Pick the path** (scrappy vs rigor, above). State which you took.

**Step 3 — Descend the source-of-record ladder.** Start at Tier 1; only drop a tier when the one above is exhausted for *this* question. **The thing that runs beats the thing that describes it.**

**Step 4 — Trace every load-bearing assertion to the authority that owns it.** This is the core discipline. Each finding = *assertion + primary source (permalinked, version-pinned) + date checked.* An assertion you cannot trace is either (a) verified against the running artifact — a REPL, an actual API call, the source — and cited as such, or (b) flagged under-evidenced per `craft-critique`. **No load-bearing assertion ships from memory.**

**Step 5 — Reconcile conflicts, don't silently pick.** When docs, source, a maintainer's issue comment, and your own test disagree, resolve by the ladder (running artifact > current versioned reference > official guide > version-pinned maintainer statement > everything else). Record the disagreement *as a finding* — "the v13 guide still says X; the v15 source does Y" — not a silent choice.

**Step 6 — Save the cited Markdown file.** One file, every assertion carrying its citation, saved where the repo already keeps such notes (match the convention; if none, put it somewhere sensible and say where). This is a written record → file it per **`build-research-repository`** (Gate 2: research isn't done until it's filed), tagged by area + dependency + version so a future build query finds it. Reuse-before-you-research (its Gate 1) applies to docs too: before researching, check whether a prior cited file already answers it — *and* whether the version it pinned is still the one you ship.

**Step 7 — Verdict + recommendation.** State what's confirmed against a primary source, what's still under-evidenced, and one recommended next action ("safe to build on"; or "verify with a 20-line spike before relying on it"). Findings without a recommendation are not finished (`craft-critique`).

## The source-of-record ladder

| Tier | Source | Trust | In the output |
|---|---|---|---|
| **1** | The thing that runs: **source code** of the dependency, an **actual API response/REPL result**, the language/spec text (ECMA / W3C / WHATWG / RFC), the **versioned official reference** | Authoritative | Cite directly, commit- or version-pinned |
| **2** | Official first-party **guides, tutorials, examples, changelogs / release notes**, first-party engineering posts | High | Cite with version + date |
| **3** | **Maintainer statements** in issues / PRs / discussions / RFC threads / official forum answers | Contextual | Cite pinned to version + date + permalink; label it a maintainer statement, not reference docs |
| **4** | Stack Overflow, third-party blogs/tutorials, another AI's answer, Wikipedia, or an **older version's** docs read as if current | Leads only | **Never a citation.** Use it to find the Tier 1–2 origin, then cite *that* |

*His stack, as Tier-1/2 examples:* the Next.js App Router reference, the React docs, Framer Motion's API reference, GSAP's docs, the Anthropic Messages API reference, the ElevenLabs API reference. For Anthropic specifics, the built-in **`claude-api`** skill mirrors the first-party reference — consult it before answering from memory.

**Docs lag the code.** When the reference and the source (or a real call) disagree, the running artifact wins — cite it and note the doc is stale. This is the technical-docs analog of chasing a claim to its origin.

## The trace-gate — lint before an assertion ships

Run this at the moment you write a finding. An assertion that fails any line isn't ready:

- [ ] **Load-bearing** — something you build or decide actually depends on it. A throwaway explanation ("React is a UI library") needs no citation; don't over-cite. Spend citations on the facts your code rests on.
- [ ] **Traced to a Tier 1–2 authority** — not memory, not a Tier-4 lead.
- [ ] **Version-pinned** — the exact version / commit / date the fact is true for, as a **permalink** (a commit-pinned GitHub URL, not `main`/`HEAD`; a versioned docs path, not the `latest` alias that silently moves). "The docs say" with no version is a fact with an invisible expiry.
- [ ] **Checked, not assumed** — where cheap, verified against the running thing (a REPL line, one real API call, the source), not only read.
- [ ] **Conflicts recorded** — if sources disagreed, the disagreement is written down as a finding.
- [ ] **Under-evidenced items flagged** per `craft-critique` — if it couldn't be traced, it's *marked*, never stated with false confidence.

**Situational, not a checklist to complete.** An assertion nothing downstream depends on doesn't earn a trace — the way a bias that can't touch your claim earns no control (`name-and-control-bias`). Completing the gate on every sentence is theater; surviving "which of these facts, if wrong, breaks the build?" is the point.

## Worked example — the trace-gate catches an untraced assertion

**Question (Step 1):** "To force Boo's router to always emit a routing tool call and never free prose, what exactly do I pass as `tool_choice` in the Anthropic Messages API — and did the shape change across versions?" *Stack pinned: Anthropic Messages API, current version.* Path: **rigor** (the whole closed-enum router in his live voice agent depends on the forced call).

**Draft finding, as first written (from memory):**
> `tool_choice: "routeIntent"` forces the model to call the `routeIntent` tool.

**Run the trace-gate — it catches it:**
1. **Load-bearing?** Yes — the forced tool call *is* the router's guarantee against prose leakage. So it must be traced, not recalled.
2. **Traced?** No — that's memory, and the *shape* is wrong. → Go to Tier 1: the Anthropic Messages API reference for `tool_choice` (and cross-check the `claude-api` skill).
3. **Trace result (corrected assertion + citation):**
   > `tool_choice` is an **object**, not a string. To force one named tool: `{"type": "tool", "name": "routeIntent"}`. `{"type": "any"}` forces *some* tool; `{"type": "auto"}` lets the model choose; `{"type": "none"}` was added later. — Anthropic Messages API reference, `tool_choice` · checked 2026-07-12 · [versioned permalink].
4. **Version-pinned?** Yes — reference version + checked-date recorded; the "`none` added later" note is itself a version fact, so it carries the release-note citation.
5. **Checked, not assumed?** Confirmed with one real Messages call returning a forced `tool_use` block — the running artifact, Tier 1.

**The situational half — an assertion correctly *not* deep-traced.** The same file also notes "the endpoint supports streaming." Nothing in Boo's router path depends on streaming for *this* question, so it stays a one-line aside with a link, not a fully verified finding. Naming a fact and declining to spend a trace where nothing rests on it is the discipline — the same move as declining a control for a bias that can't reach the claim.

**Save + file (Step 6):** written record → filed per `build-research-repository`, home = Docs/Markdown, tagged `area:voice-router · dep:anthropic-messages-api · version:<pinned>` so the next router build hits Gate 1 instead of re-researching.

**Verdict:** confirmed against a Tier-1 authority and a live call — safe to build the router on. The memory-draft would have shipped a wrong `tool_choice` shape that fails only at runtime.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| State an API signature or default from memory | Trace it to the versioned reference or the source; verify with one real call where cheap |
| Cite Stack Overflow, a blog, or another AI as the authority | Use them as leads to the Tier 1–2 origin, then cite that |
| Link `main` / `HEAD` / the `latest` docs alias | Permalink a pinned commit or a versioned docs path — the alias moves and rots your citation |
| Answer an unversioned question ("how does Next caching work?") | Pin the version first ("Next.js 15 App Router `fetch` default") — the fact is version-scoped |
| Trust the reference doc when the code does something else | Prefer the running artifact; record the doc as stale — docs lag code |
| Silently pick one side when sources disagree | Record the disagreement as a finding, resolved by the ladder |
| Trace every sentence including throwaways | Trace only load-bearing facts; an assertion nothing rests on needs no citation |
| Leave an untraceable fact stated confidently | Flag it under-evidenced per `craft-critique` and say what would confirm it |
| Deliver the reading and stop | Save one cited file and file it per `build-research-repository` — unfiled research is a sunk cost |

## Output format

```markdown
## Tech research — [the exact question, version-pinned]

**Question:** [one sentence, stack + version named]
**Path:** scrappy / rigor · **Checked:** [date]

### Findings
| # | Assertion (load-bearing) | Primary source (permalinked) | Tier | Version / commit | Status |
|---|--------------------------|------------------------------|------|------------------|--------|
| 1 | one specific, checkable statement | the authority that owns it | 1–3 | pinned | CITED / UNDER-EVIDENCED |

### Conflicts (only if sources disagreed)
- [source A @ version] says X; [source B @ version] says Y → resolved to Z because [ladder rule].

### Verdict
[Confirmed against primary sources: … | Still under-evidenced: … per craft-critique]
**Recommendation:** [safe to build on / verify with a spike first / needs a maintainer confirm]
```

## Boundaries

- **`craft-critique`** is the single source of the evidence-discipline protocol (cite / get / flag, claim calibration). This skill applies it to technical assertions; it never restates it.
- **`build-research-repository`** owns storage and reuse governance. This skill's cited file is a *written* record filed under its Gate 2; its Gate 1 (reuse-before-you-research, freshness check) applies to docs findings too — with **version** as the freshness axis a doc nugget goes `Superseded` on.
- **`conduct-business-research`** owns market/desk research and its own source-tier ladder for *market* claims. Different object (the market vs. the docs); different ladder. When a technical question turns out to hinge on market context, hand off.
- **`name-and-control-bias`** owns the situational discipline this skill borrows ("a threat that can't touch your claim earns no control" ≙ "a fact nothing rests on earns no trace") — referenced, not restated.
- **`codebase-design` / `diagnose-bugs`** own *your own* repo — its architecture and its defects. This skill owns *external* authorities. Researching how your dependency behaves is here; understanding how your code behaves is there.

## Sources

- Forked from **`research`** — mattpocock/skills, MIT (© Matt Pocock). Adopted: the primary-source discipline ("investigate against primary sources, not a secondary write-up; follow every claim back to the source that owns it") and the save-findings-as-one-cited-Markdown-file output. Personalized: his stack as the Tier-1/2 examples, the version-pin rule as the technical-docs recency axis, and the wiring into `craft-critique` (evidence protocol) and `build-research-repository` (storage + reuse). Pocock's anti-negation rule is rejected per house style — the Don't/Do table above is load-bearing.
- Example primary sources named in the worked example (Anthropic Messages API reference; the built-in `claude-api` skill) illustrate the method — they are not this skill's provenance.
