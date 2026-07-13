---
name: visualize-data
description: "Thin layer that makes every chart Dinesh's: invoke the built-in `dataviz` skill first, then swap its placeholder palette for his tokens and run his restraint pass. Use when creating ANY chart, graph, plot, sparkline, stat tile, KPI row, heatmap, or dashboard in any medium — triggers: 'chart this', 'graph', 'plot', 'visualize the data', 'make a dashboard', 'show the numbers'. NOT for computing/querying the data itself (escalate to the data plugin) or judging whether numbers support a claim (use-quantitative-evidence)."
---

# Visualize Data — Dinesh's Chart Layer

Every chart = the built-in `dataviz` method + Dinesh's palette + his restraint. This skill is glue on top of `dataviz`; it never replaces it.

## When to use / when NOT to use

- **Use:** any chart, graph, plot, stat tile, sparkline, or dashboard, in any medium (HTML artifact, inline SVG, matplotlib/plotly/Recharts/d3, exported PNG).
- **NOT:** exploring, aggregating, or querying data first → escalate (step 5). Deciding whether the numbers support a claim → `use-quantitative-evidence`. Verdict on the finished visual → `craft-critique`.

## The method

1. **Load `design-taste`.** The register governs charts exactly as it governs screens.
2. **Invoke the built-in `dataviz` skill BEFORE the first line of chart code.** Its form heuristic (which chart type), color formula + validator, mark specs, and interaction rules apply unchanged. Never skip it because the chart "looks simple."
3. **Swap the palette.** `dataviz` ships a brand-neutral placeholder palette (its `references/palette.md`) and expects a swap:
   - Token file from `build-token-system` or theme from `apply-personal-brand` exists in the project → use its data-viz/accent tokens. Never copy hex values into this skill or into chart comments — point at the token file.
   - No tokens available → apply `design-taste`'s accent-and-surface rules to the chart: the single accent carries the finding, every other series drops to a neutral tint.
   - Either way, **re-run dataviz's color validator** on the swapped palette. Swapping does not exempt you.
4. **Run the restraint pass** (checklist below) before shipping.
5. **Escalate when the work isn't chart presentation** (decision tree below).

## Restraint pass (after dataviz, before shipping)

- [ ] One message per chart — the title states the finding ("Task 3 fails most"), not the topic ("Completion Rates")
- [ ] Minimal marks: direct-label instead of legend where possible; gridlines/borders/tick clutter cut unless they carry data
- [ ] Breathing room and type scale per `design-taste`, applied to chart margins, axis labels, and titles
- [ ] Too many series → **cut or aggregate** (top 5 + "other"), never thinner lines or smaller fonts
- [ ] Any draw-in motion follows `design-taste`'s motion law and honors reduced-motion; no chart spectacle
- [ ] dataviz's accessibility rules (contrast, colorblind-safe encoding) still pass after the palette swap

## Escalation decision tree

- Data needs computing/joining/querying first? → `data:analyze` / `data:sql-queries` plugin, **then return here** for presentation.
- Multi-view interactive dashboard product? → `data:build-dashboard` for scaffolding; this skill still owns palette + restraint pass on its output.
- Claim involves significance, confidence, or sample-size judgment? → `use-quantitative-evidence` owns the claim; this skill only draws what survives it.
- Single chart or stat row? → stay here.

## Worked example

Ask: *"Chart the usability test completion rates by task."*

1. `design-taste` loaded; `dataviz` invoked → form heuristic says bar chart (categorical comparison, few items).
2. No token file in this project → derive: the one failing task gets the accent; the other four bars get a neutral tint. Validator run on the pair — passes.
3. Restraint pass: legend cut (bars direct-labeled), y-gridlines cut (values labeled on bars), title rewritten from "Completion Rates by Task" to "Task 3: only task under the benchmark."
4. No motion — a static finding needs none.

Result: five bars, one accent, finding-first title, air around everything.

## Anti-patterns

| Don't | Do |
|---|---|
| Skip `dataviz` because it's "just a bar chart" | Invoke it first, every time, any medium |
| Rainbow categorical palette | One accent + neutral tints from tokens/`design-taste` |
| Hardcode palette hexes in this skill or chart code comments | Reference the token file — values live once |
| Legend + gridlines + border + axis titles all on | Direct-label; keep only marks that carry data |
| Shrink fonts to fit 8 series | Cut or aggregate series — cut, don't shrink |
| Animated chart-draw set-piece | Small, content-shaped draw per `design-taste`, or none |
| Dashboard-density energy: 6 charts per screen | One finding per view, generous air; paginate or cut |

## Boundaries

- **Built-in `dataviz`** owns the method (chart form, color formula, mark specs, interaction). This skill layers palette + register on top — it never claims to replace it.
- **`build-token-system`** owns canonical values; **`apply-personal-brand`** supplies them as themes. This skill consumes tokens, never re-encodes them.
- **`design-taste`** is the single source of all taste values — load it first, cite it, never restate it.
- **`use-quantitative-evidence`** owns whether the numbers support the claim; **`craft-critique`** judges the finished visual; **`verify-ui-quality`** mechanically checks it.

## Sources

- **Method source: the built-in `dataviz` skill** (Claude binary) — chart-form heuristic, color formula + validator, mark specs, and interaction rules. This skill is a palette-and-restraint layer over that method, never a replacement.
- Not NN/g-grounded and not a fork — a presentation-layer skill, so it points at `design-taste` for taste values and at the token skills for palette in place of nngroup.com citations.
