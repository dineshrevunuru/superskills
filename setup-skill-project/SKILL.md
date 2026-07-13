---
name: setup-skill-project
description: "Configure a repo ONCE for the engineering/SHIP skills — decide where work items and specs live (issue tracker) and where domain/decision docs live (doc layout), then record it in one block the downstream skills read. Use before first use of the work-pipeline or SHIP skills on a repo, or when asked 'set up this project for the skills', 'where do tickets/issues live here', 'configure the issue tracker', 'set up CONTEXT.md / doc layout', 'wire up the engineering workflow', 'new repo before I start shipping', or 'run the project setup'. Run-once infra. SOLO DEFAULT = local markdown files; it mode-switches UP to a team tracker only when a team actually uses one — never assume an enterprise setup. The config is a CONTROL that stops each downstream skill from guessing where work lives."
license: "MIT — forked from `setup-matt-pocock-skills` in mattpocock/skills (© Matt Pocock). The explore→present→confirm→write flow and section-skipping adopted; solo/local default, mode-switch-up, one-block output, and Dinesh's stack re-cast."
---

# Setup Skill Project

Configure, **once**, the two things every engineering/SHIP skill has to assume about a repo — **where work lives** (issues/specs) and **where docs live** (context + decisions) — and record it so no downstream skill has to guess. Deciding it once in a file the skills read is a **control**; a convention you carry in your head is not (`name-and-control-bias`). This is a prompt-driven gate, not a script: explore, present what you found with a recommended default, confirm, then write.

## When to use / when NOT to use

- **Use** on a repo Dinesh will *work in with the engineering skills* — before the first ticket/spec/triage or SHIP run — so the work-pipeline (`plan-work-tickets`, `triage-issues`, `implement-spec`, `qa-to-issues`) reads where work lives and `codebase-design` / `improve-code-architecture` / `review-shipped-code` read where docs live — instead of each inventing its own answer.
- **Run-once.** After the block exists, don't re-run mid-work. Re-run only to switch where work lives (solo → team) or to restart config from scratch.
- **NOT on a prototype.** A throwaway HTML file or a Wizard-of-Oz demo tracks nothing and has no domain docs — configuring it is ceremony. Route prototypes to `build-coded-prototypes`; they get no gate.
- **NOT the hygiene hook.** Installing lint-staged/Prettier/typecheck before commit is `setup-pre-commit`. This skill wires *workflow + doc* config, not the pre-commit gate — run both when standing up a maintained repo.

## Two modes — mode-switchable

Pick one; state which. The solo path is the scrappy one — most of Dinesh's repos live here.

- **Solo / local (default, ~2 min):** work lives as local markdown, no shared tracker — planned tickets in `tickets/<feature-slug>/` (`NN-<slug>.md`, dependency-ordered, `Status:` line for state — exactly what `plan-work-tickets` writes and `implement-spec` reads) and bug intake in an `ISSUES.md` punch list (`qa-to-issues` / `triage-issues`); docs are a single `CONTEXT.md` + `docs/decisions/` at the repo root; no triage-label taxonomy. Output is **one block** in the project's `CLAUDE.md` — no separate config files. This fits a solo build, the portfolio, or a freelance repo he tracks himself.
- **Team / tracker (mode-switch UP):** work lives in a real tracker a team uses — GitHub Issues (`gh` CLI), or a client's Jira/Linear recorded as prose. Adds `docs/agents/issue-tracker.md` (and `docs/agents/triage-labels.md` only when a triage skill is installed). Use **only** when a team or client genuinely runs that tracker.

**Recommended default:** solo/local unless exploration finds a GitHub remote *and* Dinesh confirms a team/client actually files issues there. A GitHub remote alone is not a team — his personal repos have remotes too. When unsure, solo.

## Intake gate — ask only the gaps

**Discover silently (don't ask):**
- `git remote -v` / `.git/config` — is there a remote, and is it GitHub / GitLab / a client host? (informs the *proposal*, not the default).
- `CLAUDE.md` and `AGENTS.md` at root — which exists; is there already an `## Engineering skills` block to update in place.
- `tickets/` or `ISSUES.md` — the local-markdown convention (`plan-work-tickets` / `qa-to-issues`) is already in use → propose solo.
- `CONTEXT.md` / `CONTEXT-MAP.md`, `docs/decisions/` or `docs/adr/` — existing doc layout; reuse it, don't reshape.
- Monorepo signals — `pnpm-workspace.yaml`, a `workspaces` field, or a populated `packages/*` each with its own `src/`. Absent in almost every repo; their absence means single-context.
- Is a triage-type skill installed? This alone decides whether the triage section runs.
- Is this a prototype? → out (see above).

**Ask Dinesh (decisions only he owns) — each with a default:**
| Gap | Recommended default |
|---|---|
| Solo/local or team/tracker | Solo/local — unless a team/client actually files issues in a tracker |
| If a GitHub remote exists: track in GitHub Issues or keep local? | Local, unless he confirms a team uses the issues tab |
| Single- vs multi-context docs | Single-context — multi only on real monorepo signals |

One batched round. If every gap has a safe default (the common case: solo, single-context, no triage), state the defaults and proceed — don't stall for confirmation on the obvious.

## The method (situational — skip any section exploration already settled)

1. **Prototype check.** Prototype → stop; route to `build-coded-prototypes`.
2. **Explore** the repo (the discover-silently list above). Read what exists; assume nothing.
3. **Present findings, then walk the three decisions in order — leading with the recommended default so a one-word "yes" accepts it.** Skip a decision outright when exploration settled it: no triage skill → skip triage; no monorepo → single-context without asking.
   - **A · Where work lives.** Solo default: local markdown, no tracker — `tickets/<feature-slug>/NN-<slug>.md` for planned work (what `plan-work-tickets` writes), an `ISSUES.md` punch list for bug intake, `Status:` line for state. Team: GitHub Issues (`gh`), or a client tracker described in one paragraph and recorded as prose.
   - **B · Triage vocabulary.** *Skip entirely unless a triage skill is installed.* If installed, solo default is local `Status:` lines (`needs-triage` / `needs-info` / `ready` / `wontfix`) in the files — not a label taxonomy. Only wire real labels when a team tracker already uses them.
   - **C · Doc layout.** Single-context default: one `CONTEXT.md` + `docs/decisions/` at root. Multi-context (a root `CONTEXT-MAP.md` pointing at per-package `CONTEXT.md`s) only on monorepo signals.
4. **Confirm.** Show the draft `## Engineering skills` block (and, team mode only, the `docs/agents/*.md` contents). Let him edit before writing.
5. **Write.** Edit `CLAUDE.md` if it exists; else `AGENTS.md`; if neither exists, ask which to create — never pick, never create the other kind when one is already there. If the block already exists, update it in place — don't append a duplicate, don't touch surrounding sections. Solo = the block only. Team = block + the config files.
6. **Done.** Name who now reads it — the work-pipeline (`plan-work-tickets` / `triage-issues` / `implement-spec` / `qa-to-issues`) reads the issue-tracker line; `codebase-design`, `improve-code-architecture`, and `review-shipped-code` read the doc layout. Note he can edit the block directly later; re-running is only for switching trackers.

## The block to write

```markdown
## Engineering skills

- **Issue tracker:** [Local markdown, no shared tracker — `tickets/<feature-slug>/` for planned work (`Status:` line), `ISSUES.md` punch list for bug intake]
- **Doc layout:** [Single-context — `CONTEXT.md` + `docs/decisions/` at root]
- **Triage:** [Local `Status:` lines — no label taxonomy]  ← omit this line entirely if no triage skill is installed
```

Team mode swaps the bracketed values (e.g. `Issue tracker: GitHub Issues via gh — see docs/agents/issue-tracker.md`) and adds the seed config files; solo mode is the three lines above and nothing else.

## Worked example — a solo repo gets the enterprise scaffold (the trap)

**Repo:** a fresh Next/TS project Dinesh will build and maintain solo, about to start using the SHIP skills. Exploration finds a GitHub remote (his personal account).

**The naive setup (and why it lies):** "GitHub remote → wire GitHub Issues." It writes `gh issue create` as the tracker, seeds the five triage labels, and — seeing `src/` — reaches for a multi-context `CONTEXT-MAP`. Three config files, a label taxonomy no solo dev applies, and a CONTEXT-MAP pointing at one context. Now every downstream skill expects `gh issue create` on a repo where he never opens the issues tab — so it errors or he ignores it, and the config advertises a workflow nobody runs.

**The honest solo gate:**

```markdown
## Engineering skills

- **Issue tracker:** Local markdown, no shared tracker — `tickets/<feature-slug>/` for planned work (`Status:` line), `ISSUES.md` punch list for bug intake
- **Doc layout:** Single-context — `CONTEXT.md` + `docs/decisions/` at root
```

One edited file (`CLAUDE.md`). No `gh`, no labels, no CONTEXT-MAP. When he later lands a *client* repo whose team files GitHub issues, he re-runs in team mode and it wires `gh` then. **The failure this catches:** not "no tracker," but an *enterprise* tracker assumed on a solo repo — a GitHub-Issues config on a repo he tracks in his head is a fiction, not a control (`name-and-control-bias`: a control has to match how work actually flows).

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Assume GitHub Issues + triage labels because a remote exists | Default solo/local; wire a tracker only when a team actually files there |
| Scaffold three config files for a solo repo | Solo mode is one block in `CLAUDE.md` — no extra files |
| Create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) | Edit the one that's there; ask only if neither exists |
| Append a second `## Engineering skills` block | Update the existing block in place; leave surrounding sections alone |
| Wire a multi-context `CONTEXT-MAP` on a normal repo | Single-context default; multi only on real monorepo signals |
| Run the triage section when no triage skill is installed | Skip it entirely — an uninstalled skill needs no labels |
| Configure a prototype | Skip it — prototypes go to `build-coded-prototypes` |
| Leave "I'll just remember where issues go" as the plan | Write the block — the record is the control, memory is not (`name-and-control-bias`) |

## Boundaries

- **`build-coded-prototypes`** owns prototypes — explicitly out of scope here; throwaway code needs no tracker or docs config.
- **`setup-pre-commit`** is the sibling one-time gate that installs the pre-commit hygiene hook; this skill wires the *workflow + doc* config. Different object, same "configure once" wing — run both on a maintained repo.
- **The work-pipeline + SHIP skills consume this config, never re-decide it.** `plan-work-tickets`, `triage-issues`, `implement-spec`, and `qa-to-issues` read the issue-tracker line (where work lives); `codebase-design`, `improve-code-architecture`, and `review-shipped-code` read the doc layout (`CONTEXT.md` + `docs/decisions/`). This skill produces it once.
- **`git-guardrails`** — sibling install-once infra (blocks destructive git); unrelated config, same standing-up-a-repo moment.
- **`handoff-context`** writes to the ARIA Hub schema, not to this per-repo block; the two don't overlap.
- **`design-taste` / `craft-critique`** — out of scope; this skill writes config, not UI and not claims, so neither is loaded.

## Sources

- Forked from **`setup-matt-pocock-skills`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Retained: the explore→present→confirm→write flow, leading each decision with its recommended answer, skipping a section when exploration settled it (no triage skill → skip; single-context by default), the CLAUDE.md-over-AGENTS.md edit-don't-duplicate rule, the update-block-in-place discipline, and the four tracker options. Re-cast: the **solo/local default** (his freelance/solo reality), the **mode-switch UP** to a team tracker only when one is genuinely in use, the **one-block-in-CLAUDE.md** lightweight solo output, the prototype guard, and the React/Next/TypeScript framing.
- **`name-and-control-bias`** — the "a config record is a control, a remembered convention is not" framing (and the worked example's "a control has to match how work actually flows").
