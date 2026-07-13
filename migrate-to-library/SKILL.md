---
name: migrate-to-library
description: "Move code from one library or API to a chosen replacement SAFELY — safety net first, migrate incrementally, green between each. Use when 'migrate off X to Y', 'replace this library', 'swap axios for fetch', 'move from lodash to native', 'port this to the new SDK', 'deprecate this dependency', 'we're switching from X to Y', 'codemod this', or a dependency is EOL/deprecated and callers must move. Mode-switches: scrappy compiler-checked rename for a pure API swap; rigor characterization-net-first the moment runtime behavior can drift (data-fetch, dates, validation, state). Solo by default — tracks remaining call sites in a local grep-driven checklist, not a team tracker; mode-switches UP to issues only when one actually exists. NOT for restructuring internal code without swapping a dependency (`improve-code-architecture`) or building new from a spec (`implement-spec`)."
license: "MIT — forked from `migrate-to-shoehorn` in mattpocock/skills (© Matt Pocock). Its grep-and-replace-per-pattern workflow generalized from shoehorn to any library/API, then hardened with a characterization-net-first safety discipline (via `test-shipped-code`) — full adoption ledger in `## Sources`."
---

# Migrate to a Chosen Library — Safety Net First, Then Swap

Part of the **SHIP wing** (production-code craft). A migration is a bet that the new API behaves like the old one. The typecheck proves the *shapes* line up; it says nothing about whether a 500 still throws, a null still short-circuits, or a retry still fires. The whole skill is one refusal: **no behavior-drifting swap without a characterization net that would catch the drift.**

## When to use / when NOT to use

- **Use** when replacing one library/API with another behind stable behavior — a fetch client, a date lib, a validation lib, a state or query lib, an SDK version bump with breaking calls — in a React/Next/TypeScript tree.
- **NOT** for restructuring internal code that keeps its dependencies → **`improve-code-architecture`** (zooms out over whole-codebase rot). Migrate swaps *what a call binds to*; architecture reshapes *how your own code is arranged*.
- **NOT** for building a new feature from a spec → **`implement-spec`**. That conducts new work red-green; this ports existing work onto a new backend.
- **NOT** for hunting a bug the migration introduced → **`diagnose-bugs`** (reproduce → fix → regress).

## Two paths — mode-switchable

The swap's *behavioral risk* picks the path; state which you took.

| The swap is… | Tightest signal | Path |
|---|---|---|
| **Pure API rename** — import-path change, method rename, argument reorder the compiler fully checks (`lodash`→`lodash-es` import move, a renamed SDK export) | The **typecheck** — a broken shape won't compile | **Scrappy — codemod + typecheck, spot-verify** |
| **Behavior can drift** — different defaults, error semantics, null handling, timing, caching (axios→fetch, a validation lib, a query client) | A **characterization test** — the compiler is blind to a 500 that no longer throws | **Rigor — net first ↓** |
| **Large blast radius / can't do atomically** | An **adapter** both sides call through, migrated caller-by-caller | **Strangler — shim, migrate behind it, remove shim last** |

**Recommended default:** rigor the moment runtime behavior can change. Data-fetch, date, money, validation, and state libs almost always change *something* (error shape, retries, coercion) — treat them as rigor unless you can prove the swap is a pure compiler-checked rename.

## Intake gate — ask only the gaps

**Discover silently (don't ask):**
- The library being replaced and its version — `package.json`, the lockfile. Pin both old and new; a migration guide is version-specific.
- Every call site — `grep`/`rg` for the import and the call shapes. This count IS the migration's done-condition.
- The test runner and existing coverage at the seam — `package.json` (Vitest/Jest/Playwright), the `*.test.ts` files. The net is built with **`test-shipped-code`**'s discipline; this skill does not re-teach it.

**Ask Dinesh (decisions only he owns) — each with a default:**

| Gap | Recommended default |
|---|---|
| Which replacement library | The audited/community-standard one named in the driver; if none named, recommend one and cite why (maintenance, size, native support) |
| Why migrate (the driver) | Name it — deprecation, perf, bundle, DX. It decides how far to go and whether partial migration is acceptable |
| Strict parity vs an intentional behavior delta | **Strict parity** unless he names a delta — the net locks in old behavior; a wanted change is a new characterization test, written on purpose |
| Is there a tracker for call sites | **Assume solo** — a local checklist + `grep` is the source of truth. Reach for issues only if one actually exists; never assume a team pipeline |

One batched round. If every gap has a safe default, state them and start the net.

## The safety net comes first (the law)

**On any behavior-drifting swap, write the characterization tests BEFORE touching the call site — and watch them pass against the OLD library.** They pin the behavior contract you must preserve: what the old call does on success, on a non-2xx, on null, on an empty result. Only a net that is green *before* the swap can go red *after* it.

Writing the tests after the swap is the tautology trap from **`test-shipped-code`**: they encode the new library's behavior, agree with the code you just wrote, and catch zero drift — an echo, not a check. This is the **`name-and-control-bias`** control, not awareness: "migrate carefully" fails the one time a default silently changed; "net green on old, red on new" is the mechanism that doesn't. "The new lib behaves the same" is a **claim** — evidence it with a passing characterization test and the changelog (`craft-critique`), never assert it from a plausible read of the docs.

## Pick the move per swap class (situational)

| Swap class | The move (not a coin-flip) |
|---|---|
| **Pure rename, compiler-checked** | Codemod / find-replace, lean on the typecheck, spot-verify a couple of sites. No net needed — a wrong shape won't compile. |
| **Same behavior, different call shape** (options object, reordered args) | Build a **before→after correspondence table** for each call form, migrate per-site, typecheck between batches. |
| **Behavior can drift** (defaults, errors, nulls, timing) | **Net first**, then migrate one seam at a time, green between each. The default case below. |
| **Big / non-atomic** | **Strangler:** wrap both old and new behind one adapter interface, migrate callers through it one at a time, delete the shim only when zero callers use the old path. |
| **Visual / component library** (UI kit, styling lib) | "Correct" = the side matching the token/taste spec, not the newer API. Load **`design-taste`**; verify the rendered result, don't unit-test pixels. |

## The method (rigor path)

1. **Map the surface.** `grep` every call site and every distinct call *shape*. Read the migration guide for the exact version pair; write the before→after correspondence for each shape. Note every changed default, error behavior, and null/empty semantic — those are what the net must pin.
2. **Net first.** At each seam, write characterization tests (per `test-shipped-code`: behavior at the public interface, hand-verified literals, a break-it proof) covering success *and* the drift-prone edges — non-2xx, null, empty, timeout. Run them green against the OLD library.
3. **Install + pin.** Add the new dependency at a pinned version. Keep the old one installed until the last caller moves.
4. **Migrate incrementally.** One seam / one slice at a time, never big-bang. After each: typecheck + the seam's characterization suite. A red here is the net doing its job — fix behavior parity before the next slice.
5. **Verify + remove.** When `grep` shows **zero** references to the old API and the full suite is green, remove the old dependency from `package.json` and the lockfile. A dead dependency left "just in case" is bundle weight and a future footgun.
6. **Track solo.** Keep the remaining-call-site checklist in a local scratch file or TODO — `grep` count is the ground truth. Escalate to issues only if a real tracker exists.

## Worked example — axios→fetch, the net catches a swallowed 500

**Shipped seam** (a salon booking app): a data-fetch. axios's contract: **rejects on any non-2xx**, auto-parses JSON, unwraps `.data`.

```ts
// apiClient.ts — before
import axios from "axios";
export async function getBookings(salonId: string): Promise<Booking[]> {
  const { data } = await axios.get(`/api/salons/${salonId}/bookings`);
  return data;
}
```

**Net first (green against axios):**

```ts
test("rejects when the server returns 500", async () => {
  server.use(http.get("/api/salons/:id/bookings", () => new Response(null, { status: 500 })));
  await expect(getBookings("s1")).rejects.toThrow(); // axios throws on non-2xx
});
```

**Naive swap — types line up, behavior does not:**

```ts
// after — compiles clean; res.json() is Promise<any>, assignable to Promise<Booking[]>
export async function getBookings(salonId: string): Promise<Booking[]> {
  const res = await fetch(`/api/salons/${salonId}/bookings`);
  return res.json(); // fetch does NOT reject on 500 — it resolves with res.ok === false
}
```

Typecheck is **green**. The characterization test goes **red**: `fetch` resolves on a 500, so the promise no longer rejects — the parsed error body would have shipped as an empty "no bookings" screen instead of an error state. The compiler could never see this drift; the net caught it in one run.

**The fix, then green again:**

```ts
const res = await fetch(`/api/salons/${salonId}/bookings`);
if (!res.ok) throw new Error(`bookings fetch failed: ${res.status}`);
return res.json();
```

Net green. Move to the next call site. Had the test been written *after* the swap, it would have asserted fetch's resolve-on-500 behavior — agreed with the bug, and shipped it.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Write the migration tests after swapping | Net first — green on the OLD lib, so it can go red on the new one |
| Trust a passing typecheck as behavior parity | Typecheck proves shape; a characterization test proves runtime behavior (the swallowed 500) |
| Big-bang swap every call site, then run tests | Migrate one seam at a time, green between each |
| Grep-and-replace blind across call shapes | Read each call's behavior contract; build the before→after table first |
| Assume the new lib's defaults match the old | Pin versions, read the changelog for changed errors/nulls/defaults; pin them in the net |
| Leave the old dependency in `package.json` "just in case" | Remove it once `grep` shows zero references and the suite is green |
| Assert "behaves the same" from the docs | Evidence it with the passing net + changelog (`craft-critique`) |
| Assume a team tracker to log progress | Default to a local `grep`-driven checklist; escalate to issues only if one exists |

## Boundaries

- **`test-shipped-code`** owns the red-green discipline the net is built with — behavior at a seam, hand-verified literals, the break-it proof, mock-at-boundaries. This skill *uses* that net to guard a swap; it doesn't re-teach TDD.
- **`improve-code-architecture`** zooms OUT over whole-codebase rot; this executes one targeted dependency swap. Architecture finds where to improve, migrate performs a specific from→to move.
- **`implement-spec`** builds new work from a spec; this ports existing work onto a new backend behind stable behavior.
- **`diagnose-bugs`** owns a runtime bug the net didn't cover (reproduce → fix → regress); its regression test obeys `test-shipped-code`.
- **`review-shipped-code`** judges the migrated diff post-hoc on Standards + Spec; this produces it.
- **`craft-critique`** owns the evidence verdict — "the new library is behavior-equivalent" is a claim, proven by the net, not the docs.
- **`name-and-control-bias`** supplies the control framing — net-first is the mechanism; "migrate carefully" is mere awareness.
- **`design-taste`** owns every taste value a migrated component/UI library is checked against — never restated here.
- **Registration (maintenance law):** add a row to **SKILL-MAP.md** (family: SHIP / infra dev-hygiene, Pocock Wave 4) and an entry to the **`ask-dinesh`** router when this lands, so the roster doesn't lie.

## Sources

- Forked from **`migrate-to-shoehorn`** — mattpocock/skills, MIT (© Matt Pocock), "Skills For Real Engineers." Adopted: the gather-requirements → install → grep-for-patterns → replace-pattern-by-pattern → typecheck workflow and the before/after correspondence-table format. GENERALIZED to any library/API (all shoehorn-specific content dropped); hardened with the characterization-net-first safety discipline, incremental / strangler migration, the swap-class menu, the scrappy/rigor mode switch, and solo-reality call-site tracking.
- **`test-shipped-code`**, **`craft-critique`**, **`name-and-control-bias`**, **`design-taste`**, **`improve-code-architecture`**, **`implement-spec`**, **`diagnose-bugs`**, **`review-shipped-code`** — referenced by name, never restated.
