---
name: git-guardrails
description: "Install a Claude Code PreToolUse hook that BLOCKS irreversible git commands before an agent runs them — hard reset, clean -f, force-push, branch -D, checkout/restore ., history rewrites. The software enforcement of ARIA's Tier-3 'never auto': no destructive, un-undoable git op self-authorized by the agent. Use when setting up a new repo or machine, when 'add a git guard / git safety hook', 'block dangerous git', 'stop the agent from force-pushing / hard-resetting', 'prevent destructive git', or after an agent nukes uncommitted work. Infra: install once, on by default everywhere."
license: "MIT — forked from `git-guardrails-claude-code` in mattpocock/skills (© Matt Pocock), 'Skills For Real Engineers.' Hook mechanism and script structure adopted as-is; the blocked-command list is re-cast to ARIA's Tier-3 irreversible-action rule."
---

# Git Guardrails

A `PreToolUse` hook that intercepts Bash calls and **blocks irreversible git commands before they execute**. This is a *control* in the `name-and-control-bias` sense — a concrete mechanism, not vigilance. "Be careful with git" is awareness; a hook that exits non-zero on `git reset --hard` is the control. Awareness fails the one time it matters; the guard does not.

It is the software form of ARIA's **Tier-3 "never auto"**: an agent may never self-authorize an action that cannot be undone. Dinesh runs those himself, or instructs them explicitly.

## When to use / when NOT to use

- **Use** when setting up a repo or a new machine, hardening an existing project, or right after an agent destroyed uncommitted work. It is safety infra — install it once, globally, and leave it on.
- **NOT** for reviewing whether code is *correct* before it ships (`review-shipped-code`) or diagnosing a bug (`diagnose-bugs`). This blocks a class of *commands*; it judges nothing about the diff.
- **NOT** a substitute for commit discipline. The guard is the floor, not the plan — it stops catastrophe, it does not decide when to push.

## Two paths — mode-switchable

- **Scrappy (recommended default, ~5 min):** drop in the default Tier-3 list at **global** scope, verify one pattern, done. Safety infra should be on everywhere by default — that is the whole point of a guard.
- **Rigor:** tune the blocked list to a specific repo, decide project-vs-global, and test each pattern individually. Reach for it only when a repo has a genuine special case (below) — otherwise the default list already maps to Tier-3.

**Default:** scrappy, global. When unsure, install global.

## Intake gate — ask only the gaps

Discover silently: this is a fork (keep the MIT line); it writes to `settings.json` + a hook script (so it has install steps); its siblings are `review-shipped-code`, `diagnose-bugs`, `build-coded-prototypes`. Then ask Dinesh, each with a default:

- **Scope — this project or all projects?** *(Recommend: all projects / `~/.claude/settings.json`. A guard that only covers one repo is a guard that isn't there the day it matters.)*
- **Does an existing `PreToolUse` Bash hook already run?** *(Discover by reading the settings file; if one exists, MERGE into the array — never overwrite. Confirm before editing.)*
- **Any repo that legitimately needs a blocked op** (a solo scratch repo where force-push is fine)? *(Recommend: none. Use the escape hatch — Dinesh runs the one command himself — never weaken the global guard for one repo's convenience.)*

## The blocked list (mapped to Tier-3)

Two bands. **Band A** is irreversible — the agent may never run it (Tier-3). **Band B** is external publish — confirm first (ARIA Tier-2; Claude Code's own rule: push only when asked).

| Command | Why blocked | Recover instead by |
|---|---|---|
| `git reset --hard` | Discards all uncommitted work — gone | `git stash` first, or commit a WIP |
| `git checkout .` / `git restore .` / `checkout --force` / `switch --force` / `switch --discard-changes` | Discards the whole working tree (a force-switch overwrites uncommitted changes too) | stash; single-file discards are left to the agent. Only the word-boundaried long `--force` forms are blocked — short `-f` is avoided because `git checkout my-feature` would false-match |
| `git clean -f` / `-fd` / `--force` | Deletes untracked files — unrecoverable, may hit files outside the tracked set (Tier-3 "deleting files"). Both the short `-f…` and long `--force` forms are blocked | `git clean -n` (dry-run) is allowed; review, then Dinesh runs it |
| `git stash clear` / `stash drop` | Deletes stashed work | `git stash list` and keep it |
| `git push --force` / `--force-with-lease` / `-f` | Rewrites remote history — irreversible for anyone who pulled | open a PR; never rewrite shared history |
| `git branch -D` (and long form `--delete --force`) | Force-deletes an unmerged branch — loses its commits (reflog-recoverable ~90d, so lower severity than working-tree loss) | `git branch -d` (safe) merges-check; else Dinesh confirms |
| `git filter-branch` / `filter-repo`, `reflog expire`, `gc --prune`, `rm -rf .git` | Rewrites or destroys history AND the reflog recovery net | never auto; Dinesh runs deliberately |
| `git push` (any other) | External publish | ARIA Tier-2 — confirm, then push when asked |

The reflog is git's usual escape hatch — most "irreversible" ops are quietly recoverable for ~90 days. The commands that also nuke the reflog (`reflog expire`, `gc --prune`, `filter-*`, `rm -rf .git`) are the truly Tier-3 ones; they are in the list for exactly that reason.

## Install steps

**1. Write the hook script** to `~/.claude/hooks/block-dangerous-git.sh` (global) or `.claude/hooks/block-dangerous-git.sh` (project), then `chmod +x` it:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')
[ -z "$COMMAND" ] || [ "$COMMAND" = "null" ] && exit 0

# Band A — irreversible (ARIA Tier-3: agent may never self-authorize)
# Band B — external publish (ARIA Tier-2: confirm first)
DANGEROUS_PATTERNS=(
  "git reset --hard"
  "git checkout \."
  "git restore \."
  "git checkout --force"
  "git switch --force"
  "git switch --discard-changes"
  "git clean .*(-[a-z]*f|--force)"
  "git stash (clear|drop)"
  "push --force"
  "push -f"
  "git branch -D"
  "git branch --delete --force"
  "git push .*--delete"
  "git filter-branch"
  "filter-repo"
  "reflog expire"
  "gc --prune"
  "rm -rf .*\.git(/|$|[^a-zA-Z0-9])"
  "git push"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches '$pattern'. This is an ARIA Tier-3/Tier-2 git op — an agent may not run it. Ask Dinesh to run it himself, or propose a reversible alternative (stash, WIP commit, PR)." >&2
    exit 2
  fi
done
exit 0
```

**2. Register the hook** in the matching `settings.json`. If a `PreToolUse` block exists, merge this entry into the array — do not overwrite:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "~/.claude/hooks/block-dangerous-git.sh" }
        ]
      }
    ]
  }
}
```

For project scope use `"\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh"`.

**3. Verify** one Band-A and one Band-B pattern. Each must exit `2` and print `BLOCKED` to stderr:

```bash
echo '{"tool_input":{"command":"git reset --hard HEAD"}}' | ~/.claude/hooks/block-dangerous-git.sh; echo "exit=$?"
```

Exit code `2` is the Claude Code convention that blocks the tool call and feeds stderr back to the agent as the reason. If the test exits `0` instead, the guard is **failing open** — almost always `jq` is missing from `PATH` (the script parses the command with `jq`; without it every command falls through unblocked). Install `jq` and re-run until it exits `2`. This verify step is not optional: an un-tested guard that silently allows everything is worse than none.

## Worked example — the guard catches a hard reset on live work

Mid-refactor on the portfolio, uncommitted changes across three files, the agent decides the cleanest recovery is to start over:

**Agent attempts:** `git reset --hard HEAD`
**Hook receives:** `{"tool_input":{"command":"git reset --hard HEAD"}}`
**Hook matches** `git reset --hard`, exits `2`, prints to stderr:

```
BLOCKED: 'git reset --hard HEAD' matches 'git reset --hard'. This is an ARIA
Tier-3/Tier-2 git op — an agent may not run it. Ask Dinesh to run it himself,
or propose a reversible alternative (stash, WIP commit, PR).
```

**Agent recovers correctly:** it never ran the reset. The three files of uncommitted work survive. It surfaces the situation to Dinesh and proposes the reversible path — `git stash` to shelve the refactor, or a `wip:` commit — so nothing is lost whichever way he decides. Without the guard, the reset succeeds silently and the work is gone with no reflog entry to recover it (uncommitted changes were never in the object store). That is the exact failure this skill exists to prevent.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Trust a prompt instruction ("please don't force-push") to hold | Install the hook — a control, not vigilance (`name-and-control-bias`) |
| Overwrite an existing `PreToolUse` block | Merge into the array; preserve other hooks |
| Install per-repo and forget the next machine | Install global; safety infra is on everywhere by default |
| Weaken the global list because one repo needs force-push | Keep the guard; Dinesh runs that one command himself |
| Block dry-runs (`git clean -n`, `git branch -d`) | Block only the irreversible variants; leave safe forms usable |
| Silently swallow the block | Surface it and propose the reversible alternative |

## Boundaries

- **`review-shipped-code`** / **`diagnose-bugs`** — judge whether a *change* is correct; this guard blocks a class of *commands* and judges nothing about the diff. Siblings in the same infra/dev-hygiene family.
- **`build-coded-prototypes`** owns the throwaway-disposition ritual (commit the prototype to a discard branch). The guard blocks the automatic `git branch -D` that ritual might reach for — deleting a discard branch is a deliberate act Dinesh authorizes, not one the agent self-runs.
- **No UI or external-claims surface here**, so `design-taste` and `craft-critique` are not loaded for this skill — forcing either would be a no-op.
- **Registration (maintenance law):** this skill needs a row in **SKILL-MAP.md** (family: Infra / dev-hygiene) and an entry in the **`ask-dinesh`** router. Wire both when the skill lands so the map and router don't lie about the roster.

## Sources

- Forked from **`git-guardrails-claude-code`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: the `PreToolUse` Bash-hook mechanism, the stdin-JSON → `grep` → exit-2 script structure, and the settings-merge install flow. Re-cast for Dinesh: the blocked-command list is mapped to ARIA's Tier-3 "cannot be undone" / Tier-2 "confirm first" rule, with the reflog-destroying commands added as the truly-irreversible band.
- **ARIA Hub CLAUDE.md** — Operational Capability Tiers (Tier-3 "never auto," Tier-2 "confirm first") that the blocked list enforces.
