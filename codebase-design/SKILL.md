---
name: codebase-design
description: "The deep-module vocabulary and heuristics for structuring the React/Next/TypeScript code Dinesh ships — a lot of behavior behind a small interface, placed at a clean seam, tested through that interface — so an ARIA sub-agent (or future-him) can navigate and safely edit a shipped app fast. Use when designing or restructuring a component/hook/module's interface, deciding where a seam goes, asking 'is this module too shallow?', 'should this be one module or three?', 'how do I make this testable / AI-navigable?', 'this wrapper adds nothing', or when another SHIP skill needs the deep-module language. Names things exactly — module, interface, depth, seam, adapter, leverage, locality — and runs the deletion test + the two-adapter rule. NOT for prototypes (throwaway code needs no seams — `build-coded-prototypes`); NOT a diff review (`review-shipped-code` flags a shallow module, this reshapes it)."
license: "MIT — forked from `codebase-design` in mattpocock/skills (© Matt Pocock). Vocabulary (module/interface/depth/seam/adapter/leverage/locality), the deletion test, the two-adapter rule, and the deepening/design-it-twice moves are adopted; the TypeScript-backend/DDD framing is re-cast for React/Next/TS front-end and AI-navigability."
---

# Codebase Design — Deep Modules for AI-Navigable Code

Design **deep modules**: a lot of behavior behind a small interface, placed at a clean seam, tested through that interface. Part of the **SHIP wing** (production-code craft). The payoff is threefold — **leverage** for callers, **locality** for maintainers, and, the one that matters most here, **AI-navigability**: the interface is the context an agent loads before it edits. A small interface means an ARIA sub-agent (or future-you) reads less, understands faster, and breaks less.

## When to use / when NOT to use

**Use** when structuring or restructuring the code inside a shipped Next/React/TS app — a hook, a component, a data module, a server action, a context provider — or when another SHIP skill needs the deep-module vocabulary.

**NOT this skill:**
- **Prototypes** → `build-coded-prototypes`. Throwaway code needs no seams; deepening a demo is polishing sunk cost. If you can't answer "what happens when this ships to a user?", it's out of scope here.
- **Reviewing a diff** → `review-shipped-code`. It *flags* a shallow wrapper as a smell; this skill *reshapes* it. Review finds it, this fixes the shape.
- **Hunting a specific bug** → `diagnose-bugs`. Deep modules give a bug one place to live (locality); they don't replace the hunt.
- **Finding *where* to refactor across a whole app** (scan → rank → pick) → `improve-code-architecture`. It zooms out and scopes the fix; this skill takes the *one* cluster it hands you and reshapes it into deep modules. Scan there, reshape here.
- **The rendered UI itself** (layout, states, motion) → `build-frontend-interfaces` / `design-taste`. This owns the code structure *behind* the pixels.

## The vocabulary (use these words exactly)

Consistent language is the whole point — a shared glossary is what lets a sub-agent and future-you mean the same thing. Naming a module is craft the same way naming a design token is: one concept, one name, used exactly (the token-naming discipline lives in `design-taste` / `build-token-system` — load those for the visual layer; don't restate their values here).

| Term | Means | Don't say |
|---|---|---|
| **Module** | Anything with an interface + an implementation — scale-agnostic: a function, a hook, a component, a route handler, a feature slice | unit, component, service |
| **Interface** | *Everything* a caller must know to use it correctly — the props/param types **plus** invariants, ordering, error modes, required config, perf characteristics | API, signature (too narrow) |
| **Implementation** | The body inside the module | — |
| **Depth** | Leverage at the interface: behavior exercised per unit of interface learned. **Deep** = lots of behavior, small interface. **Shallow** = interface nearly as complex as the implementation | — |
| **Seam** *(Feathers)* | A place you can alter behavior *without editing in that place* — where the interface lives (`'use client'`, a server-action boundary, an injected port). Where to put it is its own decision | boundary (overloaded with DDD) |
| **Adapter** | A concrete thing satisfying an interface at a seam (an HTTP fetch impl, an in-memory fake) — describes the *slot it fills*, not what's inside | — |
| **Leverage / Locality** | What callers get (capability per unit of interface) / what maintainers get (change + bugs concentrate in one place — fix once, fixed everywhere) | — |

## Deep vs shallow — the core test

```
DEEP  ┌─ small interface ─┐      SHALLOW ┌──── large interface ────┐
      │  lots of behavior │              │   thin pass-through      │
      └───────────────────┘              └──────────────────────────┘
```

**The deletion test.** Imagine deleting the module. If complexity *vanishes*, it was a pass-through — delete it for real, or make it earn its place. If complexity *reappears across N callers*, it was earning its keep. This is the single fastest read on depth.

Then ask three things of any interface: can I **reduce the methods**, **simplify the params**, **hide more complexity inside**? Every "yes" makes it deeper and cheaper to navigate.

## Two paths — mode-switchable

- **Scrappy (one module, ~5 min):** you're mid-build and one hook/component feels off. Run the deletion test, ask the three questions, decide deep-or-delete. Don't spin up a cluster audit for a single module.
- **Rigor (a cluster, default when an area rots):** an ARIA sub-agent keeps getting lost in one feature, or edits there keep breaking things at a distance. Inventory the shallow modules, classify dependencies, redesign the interface, replace-don't-layer the tests.

**Recommended default:** scrappy for a single module in flight; rigor when a whole area is hard for an agent to navigate or a change in one file keeps rippling into others. When unsure, scrappy — a single deep module is cheaper than a speculative re-architecture.

## Intake gate — ask only the gaps

Discover silently from the code: which module/cluster, its call sites (grep the imports), its dependencies and their category (below). Ask Dinesh only what you can't read — each with a recommended default:

| Gap | Recommended default |
|---|---|
| Is this shipped code or a prototype? | Shipped → proceed; prototype → route to `build-coded-prototypes` |
| Deepen the module, or delete it as a pass-through? | If the deletion test finds real leaked complexity → deepen; if nothing reappears → delete |
| One module or split at a seam? | Introduce a seam only if the two-adapter rule (below) is satisfied |

## The method (rigor path — situational menu, not a march)

Run only the steps this cluster needs. A module that is *genuinely* a one-line pass-through at a real boundary can be correct — don't deepen what isn't leaking.

1. **Inventory the shallow modules.** For each, run the deletion test. Separate "delete — true pass-through" from "deepen — complexity leaked to callers."
2. **Classify each dependency** (table below) — the category decides the test strategy and whether a seam needs a port.
3. **Redesign the interface** toward small-surface + hidden-complexity. To weigh several genuinely different interface shapes before committing, use the **parallel-divergent-then-compare** move — see the next section; don't re-derive it here.
4. **Move the tests to the new interface — replace, don't layer.** Old unit tests on the shallow parts become waste; delete them. Write new tests at the deep module's interface (it *is* the test surface). Assert on observable outcomes through the interface, never on internal state — tests that survive an internal refactor describe behavior; tests that break on refactor were testing past the interface.

## Designing for testability (React/Next idioms)

A deep interface makes tests natural. Three rules, all with a React shape:

1. **Accept dependencies, don't create them.** A hook/module that takes its data source is testable; one that calls `fetch` (or `new StripeClient()`) inside is not.
   ```ts
   function useBookings(salonId: string, port: BookingsPort) {}  // testable — inject a fake port
   function useBookings(salonId: string) { fetch(/*...*/) }       // hard — seam is buried
   ```
2. **Return results, derive don't mutate.** Prefer a value the caller reads over a side effect. Derive state during render; a `useState` that just mirrors props/other state is a shallow tell (same smell `review-shipped-code` flags).
3. **Small surface.** Fewer methods = fewer tests; fewer params = simpler setup. A `<Field name label />` that hides label + error + `aria-describedby` wiring is deep; a `<Field>` that makes every caller wire a11y by hand is shallow.

Test through the interface with the stack's tools: `renderHook` / Testing Library render for the behavior, an in-memory adapter for the seam, Playwright only for the cross-boundary flow — never reach into internals. (Writing those tests red→green is `test-shipped-code`'s discipline; this skill owns the module *shape* that makes them possible, and — at step 4 — which tests survive the reshape.)

## Dependency categories → test strategy (condensed)

| Category | Example (his stack) | Strategy |
|---|---|---|
| **In-process** | Pure computation, in-memory state — date math, a pricing calc, a reducer | Merge the modules, test through the new interface directly. No adapter. |
| **Local-substitutable** | A local stand-in exists — Supabase local, MSW, an in-memory store | Deepen; test with the stand-in in the suite. Seam is internal, no port at the public interface. |
| **Remote-but-owned** | Your own Next API routes / server actions across the wire | Define a **port** at the seam; logic lives in the deep module, transport injected as an adapter. In-memory adapter for tests, fetch adapter in prod. |
| **True external** | Third-party you don't control — model API (OpenAI/Anthropic), TTS, Stripe, Twilio | Inject the dependency as a port; tests provide a **mock** adapter. |

**The two-adapter rule (situational).** One adapter means a *hypothetical* seam; two means a *real* one. Don't introduce a port unless at least two adapters justify it (usually production + test). A seam nothing varies across is just indirection — the code twin of `name-and-control-bias`'s rule that a bias which can't touch your claim is noise. And keep **internal seams** (private, used by the module's own tests) out of the public interface just because tests use them.

## Exploring alternative interfaces — the divergent move (don't re-teach it here)

Your first interface is a sample size of one. To compare several genuinely different interface shapes before committing, this is the **same parallel-divergent-then-compare primitive** you already run for concepts and prototypes — **`explore-divergent-concepts`** owns it (distinct bets → criteria before ranking → recommend one), and it's the code-side twin of the prototype variant switcher in `build-coded-prototypes`. Apply that loop, don't rebuild it: spawn N interface designs, each under a different constraint —

- *minimize the surface* — 1–3 entry points, max leverage each
- *maximize flexibility* — many callers, extensible
- *optimize the common caller* — the default case is trivial

— then compare on **depth** (leverage at the interface), **locality** (where change concentrates), and **seam placement**, and recommend one (or a hybrid). Be opinionated; the human decides.

## Worked example — a shallow wrapper refactored deep

The target failure: a "wrapper" that adds a *layer* without hiding *complexity*. Reads like abstraction; leaks all the real work to every caller.

**Before — shallow.** `getJSON` wraps `fetch` and hides almost nothing:
```ts
// lib/api.ts
export async function getJSON<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, opts)
  return res.json() as Promise<T>
}

// EVERY caller reassembles the real work, everywhere:
const bookings = await getJSON<Booking[]>(
  `/api/salons/${salonId}/bookings?from=${from}&to=${to}`,
  { headers: { authorization: `Bearer ${token}` } },
)
// ...and each caller also does: the URL, the auth header, the date range,
//    the error shape, the empty case, the cache key + revalidation — duplicated.
```
**Deletion test:** delete `getJSON` and almost no complexity vanishes — it's ~one line of `fetch`. The *actual* complexity (URL building, auth, date serialization, error modeling, caching) lives duplicated across N call sites. Large interface (`url`, `opts`, `T`), thin implementation. Shallow. And un-navigable: an agent asked to "add a status filter to bookings" has to find and edit that logic in every screen.

**After — deep.** A small interface; everything real behind the seam:
```ts
// features/bookings/bookings.port.ts
export interface BookingsPort {
  list(salonId: string, range: DateRange): Promise<Result<Booking[]>>
}
// Interface = the caller must know ONLY: salonId + range → Result.
// Behind the seam (hidden): URL construction, the auth header, date
// serialization, error → Result mapping, the cache key + revalidation.
```
Two adapters justify the seam — an HTTP adapter for production, an in-memory adapter for tests. Test through the interface: `port.list('s1', march)` asserts on the returned `Result`, not on how `fetch` was called, so the test survives an internal refactor.

**Deletion test now:** delete the module and the URL/auth/date/error/cache logic reappears across every call site. It earns its keep. **Locality:** change the auth header once, fixed everywhere. **AI-navigability:** the "add a status filter" edit now touches one interface and one adapter — the whole context an agent must load is a few lines, not a scattered hunt.

## Rejected framings

- **Depth as implementation-lines ÷ interface-lines** (Ousterhout's ratio): rewards padding the body. Use **depth-as-leverage** — behavior per unit of interface.
- **"Interface" = the TS `interface` keyword / a component's public props alone:** too narrow. Interface here is *every fact a caller must know* — including error modes and ordering.
- **"Boundary":** overloaded with DDD's bounded context. Say **seam** or **interface**.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Ship a wrapper that renames but hides nothing | Run the deletion test; deepen it or delete it |
| Add a `useState` that mirrors props/other state | Derive during render — stored-derived state is a shallow tell |
| Call `fetch` / `new SdkClient()` inside the module | Accept the dependency; inject a fake at the seam in tests |
| Introduce a port with one adapter | Two-adapter rule — one adapter is just indirection |
| Deepen a prototype's modules | Route prototypes to `build-coded-prototypes`; throwaway needs no seams |
| Keep old unit tests *and* add interface tests | Replace, don't layer — delete tests that tested past the interface |
| Assert on internal state in a test | Assert on observable outcomes through the interface |
| Design one interface and commit | Run the divergent move (`explore-divergent-concepts`) when >1 shape is plausible |
| Substitute "component/service/API/boundary" for the glossary terms | Use module/interface/seam/adapter exactly — the shared name is the point |

## Boundaries

- **`review-shipped-code`** flags a shallow module / leaked complexity as a Standards smell; this skill owns *reshaping* it into a deep module. Review finds, this fixes.
- **`diagnose-bugs`** hunts a specific bug; this skill shapes modules so a bug has one place to live. Complementary, not the same.
- **`improve-code-architecture`** zooms OUT — scans a whole app, ranks the rotting areas, scopes the fix; this skill zooms IN and reshapes the one cluster it hands off. Scan+scope there, deep-module reshape here (it shares this file's depth vocabulary + deletion test on purpose).
- **`setup-deep-modules`** *enforces* the seams this skill *designs* — a dependency-cruiser lint that makes reaching past a module's entry point a hard error, so a seam can't erode into a shallow cross-layer import under deadline. Design here, enforce there; it loads this file's vocabulary rather than restating it.
- **`test-shipped-code`** owns writing the red→green tests themselves; this skill owns the interface *shape* that makes a module testable (the interface *is* the test surface) and which tests survive a reshape. Shape here, author there.
- **`build-coded-prototypes`** owns prototypes — explicitly out of scope; deepening throwaway code is anti-pattern.
- **`build-frontend-interfaces`** / **`design-taste`** own the rendered UI (layout, states, motion, taste values); this owns the code structure behind the pixels — never restate taste values here.
- **`build-token-system`** owns token naming; the module-naming discipline here is its code-side twin, referenced not restated.
- **`explore-divergent-concepts`** owns the parallel-divergent-then-compare primitive this skill applies to interfaces without re-teaching.
- **`name-and-control-bias`** owns the "a lever that can't touch your claim is noise" discipline echoed by the two-adapter rule.
- **`craft-critique`** owns verdict + the evidence-discipline protocol; any claim that a refactor made code "faster" or "more navigable" obeys it — cite or measure, don't assert.

## Sources

- Forked from **`codebase-design`, mattpocock/skills** — MIT, © Matt Pocock ("Skills For Real Engineers"). Adopted: the module/interface/depth/seam/adapter/leverage/locality vocabulary, the deletion test, the interface-is-the-test-surface rule, the two-adapter rule, the dependency-category → test-strategy mapping (his `DEEPENING.md`), and the design-it-twice parallel-interface move (his `DESIGN-IT-TWICE.md`). Re-cast from TypeScript-backend/DDD to React/Next/TypeScript front-end, with AI-navigability added as the primary payoff.
- Michael Feathers — *seam* (a place to alter behavior without editing there). John Ousterhout — deep modules (depth reframed here as leverage, not a line ratio).
- Idiom authority for the React/Next examples: the official React and Next.js docs; testability shapes assume Vitest/Jest + Testing Library + Playwright.
