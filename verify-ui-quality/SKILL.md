---
name: verify-ui-quality
description: "Mechanical pre-ship verification of self-built UI: measures the build against design intent (spacing, type, states, interaction parity), drives every click-path with browser automation, checks cross-device/cross-browser, and runs a front-end performance pass (Core Web Vitals, jank, layout thrash, bundle size). Use when asked to 'verify this page', 'QA before ship', 'run a pre-launch check', 'test it on mobile', 'check performance', 'is it fast', 'click through everything', or after build-frontend-interfaces finishes anything external-facing. This skill runs the machines and reports measurements — it never issues verdicts; judgment and PASS/BLOCKED language belong to craft-critique."
---

# Verify UI Quality — the Machine Pass

Run every mechanical check a fresh, skeptical QA engineer would run on a self-built UI, produce a findings log of measured-vs-expected, and hand that log to `craft-critique` for judgment. Measure everything; judge nothing.

## When to use / when NOT to use

**Use when:**
- A UI built in this or a prior session is about to ship, deploy, or be shown to anyone external
- The user asks for QA, cross-device testing, a performance check, or "click through it and make sure it works"
- `build-frontend-interfaces` has finished and the artifact is external-facing (its Boundaries send you here)

**Do NOT use when:**
- The question is "is this GOOD?" — that is judgment. Load `craft-critique`; it may send you back here for the mechanical evidence.
- The check is accessibility-specific — `audit-accessibility` owns the full a11y method; this skill invokes it as one pass and does not duplicate its checks.
- The artifact is a throwaway prototype testing a hypothesis (`build-coded-prototypes`) — run only Pass 1 and Pass 2's happy path; full verification on a prototype is wasted time.
- Nothing renders yet (build errors, blank page) — that's debugging, not verification. Fix first, verify after.

## Scope decision tree (run first, 30 seconds)

```
What is the artifact?
├─ Throwaway prototype / internal demo
│    → LIGHT: Pass 1 + Pass 2 happy path only. Skip 3 and 4.
├─ Internal tool, single known browser
│    → STANDARD: Passes 1, 2, 4-cheap (console, network, CLS). Skip cross-browser.
└─ External-facing (portfolio, client work, anything a recruiter/client/user sees)
     → FULL: all four passes + invoke audit-accessibility. No exceptions.
```

If unsure which bucket, ask. Never silently downgrade an external-facing artifact to a lighter pass.

## The method — four passes, in order

Cheap checks first: passes are ordered so the fastest checks catch the most common failures before you spend time on automation and traces.

### Pass 0 — Setup (2 min)

1. Get the artifact running: dev server, deployed URL, or built artifact. Verify it loads at all.
2. Locate design intent: the spec, Figma file, token file, or the design conversation. If none exists, the intent baseline is `design-taste` plus the build's own internal consistency (a component must at least match its own other instances).
3. Open the browser automation available in the environment (Claude browser tools, Playwright MCP, or `npx playwright test` — any of them; the passes below are tool-agnostic).
4. Start the findings log (format at the end). Every check that fails becomes a row immediately — never "I'll note it later."

### Pass 1 — Fresh-eyes intent diff (measure the build against the design)

Pretend you did not build this. Load the page cold and MEASURE — do not eyeball:

| Check | How to measure | Deviation = a finding |
|---|---|---|
| Spacing | DevTools/computed styles on key gaps: section padding, card gaps, text-to-edge margins | Any value that differs from spec or from its sibling instances |
| Typography | Computed font-size, line-height, weight on each text level | Level that differs from the type scale; two "same" headings with different computed values |
| States present | For every interactive element: hover, focus-visible, active, disabled. For every data surface: empty, loading, error (spec source: `design-ui-states`) | Any state missing or identical to rest state |
| Interaction parity | Every hover-revealed affordance has a keyboard-focus and touch equivalent; every keyboard action has a pointer equivalent | Hover-only tooltips/menus; drag-only actions with no alternative |
| Asset integrity | Zoom to 100% and 200%: blurry images, stretched aspect ratios, missing favicons/og images | Any asset not crisp at display size |
| Copy mechanics | Machine-detectable only: truncated text, overflowing labels, `Lorem`, `TODO`, `undefined`, `NaN`, `[object Object]` rendered anywhere | Any occurrence |

Log deviations neutrally: "spec 32px, measured 24px" — whether 24px is acceptable is `craft-critique`'s call, not yours. Taste values (breathing room, type scale, accent discipline) come from `design-taste`; cite it as the expected-value source, never restate its numbers.

### Pass 2 — Click-path + state-consistency pass (browser automation)

1. **Enumerate paths.** List every path a user can take: the happy path, each branch, each form's submit/cancel/error, each nav destination. Write the list BEFORE clicking — clicking first means you only test what you remember building.
2. **Drive each path** with automation. At every step: screenshot, check console for new errors, check network panel for non-200s.
3. **State-consistency checks on every path:**
   - Same component, different screen → identical appearance and behavior
   - Browser **Back** at every step → app state and UI agree (no stale views, no broken layouts)
   - **Refresh mid-flow** → page recovers or fails with a designed error state, never a blank screen
   - **Double-submit**: click every submit twice fast → no duplicate action, button disables or debounces
   - **Slow network** (throttle to Slow 3G/Fast 3G): loading states actually appear; nothing renders broken while waiting
   - **Empty data**: drive the UI with zero items where lists render → designed empty state, not a bare void
4. **Console-zero rule:** the console must be clean on every path. Every error and warning is a finding — including third-party ones (log them; `craft-critique` decides if they're acceptable).
5. **Network-clean rule:** no 404s, no failed requests, no requests to localhost/dev endpoints in a production build.

### Pass 3 — Cross-device / cross-browser matrix

Minimum matrix for FULL scope (add real devices when the user has them):

| Surface | How | Must check |
|---|---|---|
| Mobile ~375px | Automation viewport resize or device emulation | No horizontal scroll; touch targets reachable; nothing hover-gated |
| Tablet ~768px | Same | Layout breakpoint behaves; no orphaned columns |
| Desktop ~1280px+ | Native | The reference experience |
| Chrome | Native run | Baseline |
| Safari/WebKit | Real Safari, or Playwright WebKit | Fonts, `backdrop-filter`, sticky positioning, date inputs, scroll behavior — the classic Safari divergences |
| Firefox | Playwright Firefox if available | Focus outlines, form controls |

Per surface: reload the page, re-run the Pass 2 happy path (full path list only on the primary surface), screenshot, and diff against the desktop reference. Also check both **light and dark** color schemes if the artifact supports them, and **`prefers-reduced-motion: reduce`** — motion must actually gate (the requirement is `design-taste` law; here you only verify the mechanism fires).

### Pass 4 — Front-end performance pass

Run against a **production build** (`next build && next start`, or the deployed URL) — dev-server numbers are noise. Throttle: Lighthouse mobile defaults (4x CPU, Slow 4G) for the mobile row.

1. **Core Web Vitals + load timing** — run Lighthouse (`npx lighthouse <url> --preset=desktop` and default mobile) or DevTools Performance panel. Record, don't grade:
   - LCP — threshold ≤ 2.5s (Good) / > 4.0s (Poor)
   - INP — ≤ 200ms / > 500ms
   - CLS — ≤ 0.1 / > 0.25
   - TBT (lab proxy for INP) — ≤ 200ms
   - TTI (Time to Interactive) — when the page is reliably usable, not just painted. Lighthouse dropped it from the v10 report; read it from the trace JSON or an older Lighthouse run (or approximate as TBT + LCP). Record it as the "when does this stop being a picture" number.
   Log the number AND the named culprit (Lighthouse tells you: the LCP element, the shifting node, the long task source).
2. **Jank** — record a Performance trace while scrolling the full page and while every animation runs. Findings: frames > 16.7ms during animation, long tasks > 50ms, animation of layout properties (`top`, `left`, `width`, `height`, `margin`) instead of `transform`/`opacity`.
3. **Layout thrash** — in the trace, look for purple layout blocks in loops (forced synchronous reflow: JS reads layout then writes styles repeatedly). DevTools flags these as "Forced reflow." Each source location is a finding.
4. **Bundle size** — read the build output (Next.js prints per-route JS; otherwise `npx source-map-explorer 'dist/**/*.js'`). Findings: any route's first-load JS grossly out of proportion to what the page does; any single dependency dominating the bundle; images shipped unoptimized (>200KB above the fold, no modern format, no `srcset`).
5. **Cheap hygiene** (always, even STANDARD scope): console clean on load, no render-blocking third-party scripts, fonts loaded with `font-display: swap` or preloaded (font swap is a top CLS culprit), images have explicit dimensions (the other top CLS culprit).

### Hand-off

Compile the findings log and pass it to `craft-critique` for severity, verdict, and the one prioritized recommendation. If the run is part of a task with a quality gate, the log is the evidence the gate consumes. Do not write "PASS" anywhere in this skill's output.

## Worked example — portfolio case-study page, FULL scope

Scope tree → external-facing → FULL. Setup: `npm run build && npm run start`, spec = the page's Figma frame + design-taste.

```markdown
## Verification log: /work/atlas-case-study — 2026-07-11

Scope: FULL · Build: production, localhost:3000 · Paths driven: 6/6 · Surfaces: mobile/tablet/desktop × Chrome/Safari

| # | Pass | Location | Expected (source) | Measured | Evidence |
|---|------|----------|-------------------|----------|----------|
| 1 | 1-spacing | Metrics section top padding | 96px (Figma frame) | 64px | screenshot-03, computed style |
| 2 | 1-states | Nav links | visible focus-visible state (design-ui-states spec) | none — outline suppressed, no replacement | tab-through recording |
| 3 | 1-parity | Project card "view live" affordance | touch/keyboard equivalent required | hover-only reveal; unreachable on mobile | mobile screenshot-07 |
| 4 | 2-console | /work/atlas-case-study on load | zero errors | 1 error: 404 /og-image.png | console log |
| 5 | 2-state | Back from lightbox | page scroll position preserved | jumps to top | path-4 recording |
| 6 | 3-safari | Hero metric chips | match Chrome reference | backdrop-filter unsupported fallback missing — chips unreadable | safari screenshot-11 |
| 7 | 4-CWV | LCP (mobile, throttled) | ≤ 2.5s | 3.4s — culprit: hero.png 1.1MB, no priority hint | lighthouse-mobile.json |
| 8 | 4-CWV | CLS | ≤ 0.1 | 0.18 — culprit: webfont swap on H1 | lighthouse trace |
| 9 | 4-jank | Chart draw-in animation | frames ≤ 16.7ms | 3 frames at 41ms — animating `height` not `transform` | perf trace |
| 10 | 4-bundle | First-load JS, this route | proportionate to a static page | 289KB — chart lib imported page-wide, used once below fold | build output |

Clean: paths 1–3,5–6 console/network · tablet layout · Firefox · reduced-motion gates fire · dark scheme n/a
audit-accessibility: invoked separately — see its report.
→ Handed to craft-critique for severity + verdict.
```

Note what the log does NOT contain: no "this is bad," no severity emoji, no verdict. Rows 1–10 are measurements with named culprits. `craft-critique` decides that #2/#3 block ship and #10 is a next-pass note.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Eyeball spacing/type ("looks about right") | Read computed styles; log numbers against the spec |
| Test only the paths you remember building | Enumerate paths BEFORE clicking; drive the list |
| Verify on the dev server ("prod will be similar") | Production build only for Pass 4 — dev numbers are fiction |
| Check performance once, unthrottled, on an M-series laptop | Lighthouse mobile throttling is the honest baseline |
| Write "PASS — everything works" | This skill has no verdict vocabulary; hand the log to craft-critique |
| Skip Safari because automation only had Chromium | WebKit divergence is where self-built UI actually breaks; use Playwright WebKit at minimum |
| Fix findings mid-pass and re-verify only that spot | Finish the pass, fix in batch, re-run the affected pass in full — spot re-checks miss regressions |
| Treat console warnings as noise | Log every one; acceptability is a judgment call, and judgment isn't yours |
| Declare a11y covered because Pass 1 checked focus states | Invoke audit-accessibility — Pass 1's state check is not an a11y audit |
| Ship the log with "minor issues" pre-softened | Neutral measurements only; softening is sugar-coating by another name |

## Output format

Produce exactly the worked-example shape:

```markdown
## Verification log: [artifact] — [date]
Scope: LIGHT/STANDARD/FULL · Build: [prod/dev + URL] · Paths driven: n/n · Surfaces: [matrix]

| # | Pass | Location | Expected (source) | Measured | Evidence |

Clean: [what was checked and found clean — one line, so absence of findings is provably absence of problems, not absence of checking]
→ Handed to craft-critique for severity + verdict.
```

Every row: a named location, an expected value WITH its source (spec / design-taste / design-ui-states / CWV threshold), a measured value, and evidence (screenshot, trace, log). A row without a measured value is an opinion — delete it or measure it.

## Boundaries

- **`craft-critique`** owns judgment, severity, verdict language (PASS / PASS WITH NOTES / BLOCKED), and the evidence protocol. This skill produces the mechanical findings log craft-critique consumes; it never grades.
- **`audit-accessibility`** owns the accessibility method; FULL scope invokes it as a separate pass and links its report — no duplication here.
- **`design-taste`** owns all taste values (spacing register, type scale, motion curves, reduced-motion law). Pass 1 cites it as an expected-value source; this file restates none of it.
- **`design-ui-states`** owns which states must exist per screen; Pass 1 checks presence against that spec.
- **`build-frontend-interfaces` / `build-coded-prototypes`** own construction; they route external-facing work here after building. Prototypes get LIGHT scope by default.

## Sources

The external thresholds Pass 4 measures against — cited so the numbers are auditable, not house values to restate:

- Core Web Vitals Good/Poor cutoffs (LCP ≤ 2.5s / > 4.0s · INP ≤ 200ms / > 500ms · CLS ≤ 0.1 / > 0.25) — web.dev, "Defining the Core Web Vitals metrics thresholds" (https://web.dev/articles/defining-core-web-vitals-thresholds); overview at https://web.dev/articles/vitals.
- TBT as the lab proxy for INP, and TTI removed from the Lighthouse v10 report — Chrome for Developers Lighthouse docs: TBT (https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time) and TTI (https://developer.chrome.com/docs/lighthouse/performance/interactive).
- Taste values, state inventory, severity scoring, and accessibility criteria are deliberately NOT sourced here — they live in `design-taste`, `design-ui-states`, `craft-critique`, and `audit-accessibility`. Cite those skills, never re-derive their numbers.
