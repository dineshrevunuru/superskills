---
name: make-setup-wizard
description: "Generate an interactive bash WIZARD that walks a human step by step through a manual setup procedure — opening each URL, saying exactly what to click and copy, capturing values into `.env`, confirming at every stage, and blocking on a skipped step. Use when a repeated manual setup is tedious to re-explain — third-party service config, a one-off migration, an A→B state transition — or asked to 'turn these setup steps into a wizard', 'script this onboarding', 'make a guided setup', 'walk me through this env setup', 'automate this manual procedure', or 'generate a setup script'. The bash UX is already solved in `template.sh`; your job is to scope the procedure and author its stages. Defaults to a local `.env` + scratch path for solo work and wires GitHub Actions secrets only when the repo has real CI. A wizard is a CONTROL against a skipped step, not a reminder."
license: "MIT — forked from `wizard` in mattpocock/skills (© Matt Pocock). template.sh library kept verbatim; scoping method, mode gate, solo-default framing, and worked example re-cast."
---

# Make Setup Wizard

A **wizard** is a bash script that walks a human through a manual procedure that's tedious to do by hand and tedious to re-explain to an AI every time — opening each URL, saying exactly what to click and copy, capturing the values, writing them where they belong, and confirming at every stage. The delightful terminal UX is **already solved** by [template.sh](template.sh) (progress + time-remaining, hidden secret entry, cross-platform URL opening, idempotent `.env` upserts, a closing summary). **Your only job is to scope the procedure and author its stages.** The library above the `STAGES` marker is identical in every wizard — never hand-edit it.

*Forked from `wizard` in mattpocock/skills (MIT, © Matt Pocock).*

## When to use / when NOT to use

- **Use** when a manual, multi-step procedure will be run more than once or explained to more than one person — third-party service setup, a one-off DB migration, moving a repo from one state to another — and each step is "open this, copy that, paste here."
- **NOT for a procedure that already has a dedicated skill.** Installing a pre-commit gate is `setup-pre-commit`, not a hand-rolled wizard. A wizard is the *generic* scaffolder for procedures with no skill of their own.
- **NOT for discovering the steps.** When you don't know a service's current UI or the exact command, `research-technical-docs` owns finding out — the wizard *consumes* verified steps, it never invents them.
- **NOT a prose handoff.** `handoff-context` captures "here's the state and why" for a person to read; a wizard is executable — "run this to reach the state." If the next person needs understanding, not a runbook, route there.

## Two modes — mode-switchable

Pick one; state which.

- **Ephemeral (scrappy):** a one-off wizard for a single run — saved to a scratch path or `scripts/`, deleted when the job's done. The default for a migration, a personal-machine setup, anything run once.
- **Committed (rigor):** a repeatable setup path that lives in the repo (`scripts/setup.sh`), linked from the README so the next person runs the script instead of asking an AI. Verify it fully (below) before it ships.

**Recommended default:** ephemeral. Promote to committed only when the same procedure will onboard the next contributor or future-Dinesh — then it earns a spot in the repo.

## Solo reality — local `.env` is the target; CI secrets mode-switch UP

Dinesh mostly works solo/freelance with no team CI to feed. So:

- **Default target:** `write_env` into `.env` (plus a scratch/`scripts/` path for the wizard itself). That is the whole job for a solo repo — `.env` runs the app locally.
- **Only wire `set_secret`/`set_var` (GitHub Actions) when the repo actually has CI** — i.e. `.github/workflows/*` contains `secrets.*` / `vars.*` references. Each such reference is a value CI needs; those, and only those, get `set_secret`. **Never assume a CI/enterprise setup.** No workflows → no `set_secret` calls; the template still degrades gracefully (records a SKIPPED note) if `gh` is missing.

## Intake gate — ask only the gaps

**Discover silently (read the repo first — don't ask cold):**
- For setup: `.env`, `.env.example`, `.env.*`, `README`, `docker-compose*`, framework config, and `.github/workflows/*` — every `secrets.*` / `vars.*` is a value the wizard must produce, and its presence answers the local-vs-CI question above.
- For a migration/transition: the current state, the target state, and the irreversible actions between them.
- Which values are secret (→ `ask_secret`, hidden) vs public (→ `ask`).

**Ask Dinesh (decisions only) — each with a default:**
| Gap | Recommended default |
|---|---|
| Ephemeral or committed | Ephemeral unless it onboards the next person |
| Local `.env` only, or CI too | Local only unless `.github/workflows/*` references `secrets.*` |
| Stage order / any step to add or drop | The order you inferred from the repo; confirm, don't assume |

One batched round. If every gap has a safe default, state them and proceed.

## The method (situational — a menu, not a march)

1. **Scope the procedure.** From the repo (not cold questions), list every manual step and every value captured. Show Dinesh the **ordered stage list + the value each produces**, and confirm — he may add, drop, or reorder. *Done when* every stage is named in order and each value's source, destination (`.env` / CI secret / both / nowhere — some stages are pure actions), and secrecy are known.
2. **Map each stage's journey.** For each stage write the concrete path: "Dashboard → Developers → API keys → Reveal test key → copy." Where you don't actually know the current UI or exact command, **say so and verify via `research-technical-docs` or ask — never invent steps that may not exist** (fabricated instructions are an evidence failure; hold the line `craft-critique` draws). *Done when* every stage traces to instructions a stranger could follow.
3. **Author the wizard.** Copy `template.sh` to the target path. Replace the example stage with **one `stage()` per step, in dependency order**. Set `TOTAL_STAGES` and `TOTAL_MINUTES` to honest estimates (they drive the time-remaining display). Hold the template's bar: `open_url` *before* asking for its value · `ask_secret` for anything secret · `write_env` every persisted value · `set_secret` only what CI actually needs · `confirm` before any irreversible action. Keep each stage to **one focused task** — it clears the screen, so nothing the human needs should scroll away. Don't touch the library above the marker; adding decoration to a clean stage is the same restraint failure `design-taste` names — the UX is already right.
4. **Verify + hand off.** `bash -n <script>`; run `shellcheck` if available; `chmod +x`. **Don't run it end-to-end yourself** — it opens browsers and blocks on human input. Trace it statically instead: every value from step 1 is captured and lands where step 1 said, and every `set_secret` name exactly matches a `secrets.*` reference in CI. Tell Dinesh how to run it; commit + link from README only in committed mode.

## The library helpers (what to call — never redefine)

| Helper | Does |
|---|---|
| `banner "Title"` | Opening frame + total stages/minutes; call once |
| `stage "Name" <min>` | Clears screen, announces stage, shows progress + time left |
| `say` / `step` / `note` / `warn` | Instruction lines (plain / bulleted action / dim / caution) |
| `open_url URL` | Cross-platform browser open (incl. WSL) — call before asking for the value |
| `ask KEY "Prompt"` | Read a visible value into `$KEY`; Enter keeps the existing `.env` value on re-run |
| `ask_secret KEY "Prompt"` | Same, hidden input — for every secret |
| `write_env KEY "$VAL"` | Idempotent upsert into `.env` |
| `set_secret` / `set_var NAME "$VAL"` | GitHub Actions secret/variable via `gh`; degrades to a SKIPPED note if `gh` isn't ready — **CI only** |
| `pause "msg"` / `confirm "q?"` | Wait for the human / y-N gate before an irreversible action |
| `finish` | Closing summary of everything written + what's still manual |

## Worked example — a 6-step README setup becomes a wizard that catches a skipped step

**The procedure (a Next.js + Supabase app's README "Local setup"):**

```
1. Create a Supabase project, copy the Project URL → NEXT_PUBLIC_SUPABASE_URL
2. Copy the anon public key                        → NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Copy the service_role key (secret)              → SUPABASE_SERVICE_ROLE_KEY
4. Run supabase/schema.sql in the SQL editor       → (no value — a pure action)
5. Create an OpenAI key, paste it (secret)         → OPENAI_API_KEY
6. Copy .env.example to .env, fill it, run `npm run dev`
```

**The failure this catches:** a human eyeballing the list skips **step 4** — it produces no value to paste, so it *feels* optional. `.env` looks complete, the app boots, and the first query fails with a confusing `relation "profiles" does not exist`. Trusting a human to remember an action-only step is vigilance; a wizard is a structural **control** that can't advance past it (`name-and-control-bias` — awareness is not a control).

**The wizard makes step 4 a blocking gate — no value, but not skippable:**

```bash
TOTAL_STAGES=5
TOTAL_MINUTES=8
banner "Local dev setup"

stage "Supabase — project URL & anon key" 3
open_url "https://supabase.com/dashboard/project/_/settings/api"
step "Copy the Project URL, then the anon public key."
ask NEXT_PUBLIC_SUPABASE_URL       "Paste the Project URL:"
ask NEXT_PUBLIC_SUPABASE_ANON_KEY  "Paste the anon key:"
write_env NEXT_PUBLIC_SUPABASE_URL      "$NEXT_PUBLIC_SUPABASE_URL"
write_env NEXT_PUBLIC_SUPABASE_ANON_KEY "$NEXT_PUBLIC_SUPABASE_ANON_KEY"

stage "Supabase — service role key" 1
step "On the same page, reveal and copy the service_role key."
ask_secret SUPABASE_SERVICE_ROLE_KEY "Paste the service_role key:"
write_env  SUPABASE_SERVICE_ROLE_KEY "$SUPABASE_SERVICE_ROLE_KEY"

stage "Database schema — the step everyone skips" 2   # pure action, no value
open_url "https://supabase.com/dashboard/project/_/sql/new"
step "Paste the contents of supabase/schema.sql and click RUN."
say  "This creates the 'profiles' table the app queries on first load."
until confirm "Did the SQL run WITHOUT errors?"; do
  warn "The app will 500 until the schema exists — run it before continuing."
done
# ... stage 4: OPENAI_API_KEY (ask_secret + write_env) ... stage 5: verify + npm run dev
finish
```

The `until confirm` loop is the whole point: the procedure **cannot reach the OpenAI step until step 4 is done** — the exact skip the flat README list invites. Solo default holds throughout: everything lands in `.env`, zero `set_secret` calls, because this app has no CI feeding those values.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Invent a service's UI path or command you haven't verified | Trace real steps via `research-technical-docs` / ask; hold `craft-critique`'s evidence line |
| Hand-edit the library above the `STAGES` marker | Author stages only; the UX is already solved in `template.sh` |
| `set_secret` everything "to be safe" | Local `.env` by default; `set_secret` only values a `.github/workflows/*` actually reads |
| Assume a CI/enterprise setup | No workflows referencing `secrets.*` → no `gh` calls at all |
| Ask for a value before opening its page | `open_url` first, then `ask` — the human is looking at the right screen |
| Use `ask` for a secret | `ask_secret` for anything sensitive — hidden entry |
| Cram several actions into one `stage` | One focused task per stage — it clears the screen; nothing needed should scroll away |
| Leave an action-only step as a passive `say` | Gate it with `confirm` (loop until yes) — that's the control against a skipped step |
| Run the wizard end-to-end to "test" it | Static-trace it; it opens browsers and blocks on input — verify with `bash -n` + `shellcheck` |
| Commit every one-off wizard | Ephemeral by default; commit + link from README only when it onboards the next person |

## Boundaries

- **`setup-pre-commit`** owns the one specific automation (the Husky gate); this skill is the generic scaffolder for procedures with no dedicated skill. If a skill already owns the procedure, use it — don't wrap it in a wizard.
- **`research-technical-docs`** owns discovering a service's real UI and commands; the wizard consumes those verified steps and never fabricates them.
- **`handoff-context`** owns prose "state + why" for a reader; a wizard is executable "run this to reach the state." Pick by whether the next person needs to *understand* or to *run*.
- **`name-and-control-bias`** owns the control-vs-vigilance framing this skill leans on (the skipped-step gate); referenced, not restated.
- **`design-taste`** owns visual/interaction restraint — invoked only as the reason not to decorate an already-solved terminal UX; no taste values live here.

## Sources

- Forked from **`wizard`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Kept verbatim: the `template.sh` library (progress/time-remaining, `open_url`, `ask`/`ask_secret`, idempotent `write_env`, `set_secret`/`set_var`, `confirm`, `finish`). Re-cast: made it model-invoked (dropped `disable-model-invocation`, added trigger-rich description), added the ephemeral/committed mode gate, the solo-default local-`.env`-vs-CI framing, and the skipped-step worked example.
- **`name-and-control-bias`** — the "a gate is a control, not vigilance" framing behind the `confirm`-loop on action-only steps.
