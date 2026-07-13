---
name: build-token-system
description: "Builds a primitive → semantic → component design-token system with Figma variables and code (CSS custom properties / JSON) synced from day one — tier architecture, naming grammar, theming and dark-mode structure, and the canonical token files. Use when starting the styles for a new product or site, when asked to 'set up design tokens', 'create CSS variables', 'tokenize this', 'add dark mode', 'theme this', 'sync Figma variables with code', or 'name these tokens' — and whenever hex codes, px values, or font sizes are being hardcoded into components and need a system. Produces the canonical token files that apply-personal-brand and every UI-building skill consume."
---

# Build Token System

Produce ONE canonical set of design tokens — three tiers, one source of truth, Figma and code in sync from the first commit — so every later design decision is a reference, not a re-decision.

## When to use / when NOT to use

**Use when:**
- Starting a new product, site, or prototype — before the first component is styled
- An existing UI is full of hardcoded hex/px values and needs tokenizing
- Adding a theme (dark mode, brand variant, high-contrast) to an existing system
- Setting up or repairing Figma-variables ↔ code sync
- Reviewing a token PR for naming, tier placement, or scale violations

**Do NOT use when:**
- Choosing the actual taste values for Dinesh's own work → load **`design-taste`** (single source of all taste values, including motion curves/durations). This skill gives values a home and a name; it never decides what they are.
- Applying Dinesh's brand as a theme onto a surface (slides, dataviz, artifact) → **`apply-personal-brand`**, which consumes the files this skill produces.
- Governance, contribution model, adoption, docs site → **`document-and-govern-design-system`**.
- Building the actual screens/components → **`build-frontend-interfaces`** (it reads these tokens).

## The three tiers (the architecture)

| Tier | Question it answers | Example | Who may reference it |
|---|---|---|---|
| **1. Primitive** | "What values exist?" — raw, meaningless options | `blue-600: #2E7CD6` · `space-4: 16px` · `size-500: 22px` | Semantic tokens ONLY |
| **2. Semantic** | "What is this value FOR?" — role/intent | `color-action` · `surface-raised` · `text-secondary` · `space-stack-md` | Components, screens, component tokens |
| **3. Component** | "What does this one part use?" — scoped exception | `button-primary-bg` · `tile-radius` | That component only |

**Reference direction is one-way, downward:** component → semantic → primitive. Never sideways, never up.

Three laws that make the tiers work:

1. **Screens and components never touch primitives.** If a component references `blue-600` directly, theming is already broken — you just can't see it yet.
2. **Themes remap the semantic tier only.** Primitives never change per theme; components never know a theme exists.
3. **Component tokens are exceptions, not defaults.** Create one only when a component must deviate from the semantic value or is documented/published on its own. If every component gets its own tokens, you built a phone book, not a system.

## The method (day one, in this order)

1. **Pick the source of truth** (one, forever):
   - Solo designer-engineer or design-engineer-led team (Dinesh's default mode) → **code-first**: one `tokens.json` in the repo; Figma variables are generated/imported FROM it.
   - Designers live in Figma and outnumber engineers → **Figma-first**: variables are the source; export (Figma REST API or Tokens Studio) → transform (Style Dictionary) → code, on every merge.
   - **Never both.** Two editable sources = guaranteed drift. The non-source tool is read-only by policy.

2. **Seed the primitives.** Where values come from:
   - Dinesh's own systems → load **`design-taste`** and derive primitives from its laws (accent count, surface register, type scale-up, spacing generosity, locked motion curves). Pull at build time; never copy its values into a skill or a doc — the token file cites `design-taste` as origin.
   - Client systems → the client's brand assets + an audit of any existing UI: harvest every hex, px, font-size, radius, and shadow in use; cluster near-duplicates; force each cluster to one primitive. (A 14-blues audit result becoming 3 primitives is the job working.)

3. **Force every category into a fixed scale.** No orphan values:
   - Spacing: one rhythm (4/8 grid: `4 8 12 16 24 32 48 64`) — a gap not on the scale is a bug
   - Type: one scale with named steps; sizes err larger (NN/g: default sizes should be large; glanceable text — "bigger is better")
   - Radius: a fixed set of 3–4 (e.g. `sm md lg pill`), never ad-hoc
   - Color: keep the palette small — NN/g's guidance is 3–4 colors; text hierarchy comes from weight and gray levels, not more hues
   - Motion: durations + easings are tokens too; for Dinesh's systems their values live in `design-taste`

4. **Name the semantic tier from the product's real roles.** Walk the actual screens and ask "what job does this value do?" — action, identity, surface, text rank, feedback (good/warn/danger), focus. Calibration from Dinesh's design practice (Saathi on Echo Show): identity color and action color are SEPARATE semantic tokens (`--accent` = the assistant's voice/glow/focus; `--active` = on/toggled/selected) — because "brand" and "interactive" are different jobs even when one hue could do both. Name the job, get theming for free.

5. **Wire themes as semantic remaps** (structure below). Ship light + dark shells on day one even if dark ships later — retrofitting the seam is 10× the cost.

6. **Add component tokens only on demand** — first time a component genuinely deviates, not before.

7. **Generate outputs + set the sync loop** (section below). Generated files get a `/* GENERATED — do not edit */` header.

8. **Lint against the checklists** in this file before calling it done.

## Naming grammar

Canonical pattern (drop segments you don't need, never reorder):

```
[tier].[category].[role/concept].[variant].[state]
color.action.hover        space.stack.md        text.secondary
button.primary.bg         radius.pill           duration.quick
```

One name, three casings — the transform is mechanical and lossless:

| Tool | Form | Example |
|---|---|---|
| JSON source | dot path | `color.action.hover` |
| CSS output | kebab custom property | `--color-action-hover` |
| Figma variable | slash groups | `color/action/hover` |

**Lint rules:**

| Rule | ❌ Fails | ✅ Passes |
|---|---|---|
| Semantic names describe the JOB, never the appearance | `--text-gray`, `--light-blue-bg` | `--text-secondary`, `--surface-raised` |
| Primitive names describe the value family + step, never a use | `--sidebar-blue` | `blue-600` |
| States are a fixed enum | `--btn-bg-mouseover` | `…-hover` (`hover active focus disabled selected`) |
| Scale style matches step count | 12 t-shirt sizes (`xxxxl`) | ≤5 steps → `sm md lg`; more → numeric `100–900` |
| Numeric steps leave gaps | `blue-1, blue-2, blue-3` | `blue-200, blue-400, blue-600` (room to insert) |
| No value baked into a semantic name | `--space-16` used for card padding | `--space-inset-md` |

## Theming & dark-mode structure

A theme is **one file/mode that remaps semantic → different primitives.** Nothing else changes.

```
primitives (theme-blind)  →  semantic: light mode | dark mode  →  components (theme-blind)
```

**The leak test:** adding a theme required touching component code or component tokens? The semantic layer leaked — fix the tier violation, don't patch the theme.

Dark-mode rules (each maps to a semantic remap, never a component edit):

- **Don't invert — remap.** Dark mode is not `filter: invert()`; each semantic token gets a deliberate dark value.
- **Elevation flips medium:** light theme = shadow; dark theme = lighter surface (`surface-raised` goes lighter, shadows fade). That's why elevation must be semantic, not baked into components.
- **Primary text is not pure white on dark** — near-white reduces glare/halation.
- **The accent keeps its JOB, adjusts its value** — desaturated/lightened variant so contrast still passes.
- **Re-run contrast on every text/surface pair per theme.** Passing in light says nothing about dark. (For Dinesh's own work the home register is defined in `design-taste` — dark is the exception that needs a reason.)

## Figma variables ↔ code sync

Map structures 1:1 so the same mental model exists in both tools:

| Token JSON | Figma | Notes |
|---|---|---|
| Primitive tier | Collection "Primitives", 1 mode | Hidden from publishing — designers shouldn't pick primitives |
| Semantic tier | Collection "Semantic", modes = `Light` / `Dark` / … | Aliases into Primitives; the only collection designers use |
| Component tier | Collection "Component" (only if it exists) | Aliases into Semantic |
| Theme | A **mode** on the Semantic collection | Never a separate file or duplicated collection |

**Sync rules (day one, non-negotiable):**

1. The non-source side is generated, never hand-edited. Hand edits to generated files are reverted on sight.
2. A token change is a change to the source + regenerate — reviewed like code (it IS code).
3. Names are identical across tools modulo the casing transform above. If `color/action` in Figma can't be found as `--color-action` in CSS, sync is already broken.
4. Transform with a tool (Style Dictionary, Tokens Studio sync), not by hand — hand-transforms skip steps.
5. Verify the loop before building UI: change one primitive at the source → confirm it lands in both a Figma variable and the CSS output. If that round-trip fails on day one, fix it on day one.

## Worked example — small booking app, light + dark

**Source (`tokens.json`, DTCG-style, code-first):**

```json
{
  "primitive": {
    "color": {
      "blue-600":  { "$value": "#2E7CD6" },
      "blue-300":  { "$value": "#7FB2EA" },
      "gray-900":  { "$value": "#171B21" },
      "gray-600":  { "$value": "#5B6470" },
      "gray-50":   { "$value": "#F7F8FA" },
      "white":     { "$value": "#FFFFFF" },
      "offwhite":  { "$value": "#FAFAFA" }
    },
    "space": { "2": {"$value": "8px"}, "4": {"$value": "16px"}, "6": {"$value": "32px"} },
    "size":  { "400": {"$value": "18px"}, "600": {"$value": "24px"}, "900": {"$value": "44px"} },
    "radius": { "md": {"$value": "12px"}, "pill": {"$value": "999px"} }
  },
  "semantic": {
    "light": {
      "color-action":     { "$value": "{primitive.color.blue-600}" },
      "surface-page":     { "$value": "{primitive.color.white}" },
      "surface-raised":   { "$value": "{primitive.color.gray-50}" },
      "text-primary":     { "$value": "{primitive.color.gray-900}" },
      "text-secondary":   { "$value": "{primitive.color.gray-600}" }
    },
    "dark": {
      "color-action":     { "$value": "{primitive.color.blue-300}" },
      "surface-page":     { "$value": "{primitive.color.gray-900}" },
      "surface-raised":   { "$value": "#232933" },
      "text-primary":     { "$value": "{primitive.color.offwhite}" },
      "text-secondary":   { "$value": "#AEB8C4" }
    }
  },
  "component": {
    "button-primary-bg": { "$value": "{semantic.color-action}" }
  }
}
```

**Generated CSS (`tokens.css` — do not edit):**

```css
/* GENERATED from tokens.json — do not edit */
:root {
  --color-action: #2E7CD6;   --surface-page: #FFFFFF;
  --surface-raised: #F7F8FA; --text-primary: #171B21;
  --text-secondary: #5B6470; --radius-md: 12px; --space-4: 16px;
}
[data-theme="dark"] {
  --color-action: #7FB2EA;   --surface-page: #171B21;
  --surface-raised: #232933; --text-primary: #FAFAFA;
  --text-secondary: #AEB8C4;
}
.button-primary { background: var(--color-action); border-radius: var(--radius-md); }
```

**Figma:** collection *Primitives* (1 mode) holds `color/blue-600` etc.; collection *Semantic* has modes *Light*/*Dark* with `color/action` aliasing `color/blue-600` in Light and `color/blue-300` in Dark. Note what the structure bought: dark mode never mentions a component, `button-primary` never mentions a theme, and the dark raised-surface is LIGHTER than the page (elevation rule) — all three tiers doing their one job.

## Add-a-token decision tree

Someone needs a value that doesn't exist yet:

1. **Is it on an existing scale?** → Use the nearest scale step. "It needs to be 14px, not 12 or 16" is almost always a design problem, not a token gap.
2. **Genuinely new value?** → Add a primitive at the right scale step (leave numeric gaps). STOP — do not use it directly.
3. **New role/job in the product?** → Add a semantic token aliasing a primitive; define it in EVERY theme mode at the same time (a token defined in light only is a dark-mode bug scheduled for later).
4. **One component must deviate from the semantic value?** → Component token aliasing semantic, plus one line in the token file saying WHY.
5. **Can't say which tier it belongs to?** → It's not ready to be a token. Name the job first.

## Anti-patterns / red flags

| Red flag | Why it kills the system | Fix |
|---|---|---|
| Component references a primitive (`var(--blue-600)`) | Theming silently broken | Insert the semantic token it skipped |
| Semantic token named by appearance (`--text-gray`) | Wrong the moment a theme changes the value | Rename to the job (`--text-secondary`) |
| Two editable sources (Figma vars AND CSS both hand-edited) | Drift within a week; nobody trusts either | One source; other side generated, read-only |
| Hand-editing generated output "just this once" | Next regenerate erases it; values fork | Change the source, regenerate |
| Theme built by find-replacing hex in components | N components × M themes = unmaintainable | Themes remap semantic tier only |
| Token explosion (every component gets its own set "for safety") | Phone book, not system; nobody can pick | Component tokens on documented deviation only |
| Orphan values (`gap: 18px` "close enough") | Scale stops meaning anything | Nearest step, or a design conversation |
| Palette grows a hue per feature | Violates the 3–4 color limit; hierarchy dissolves | Vary weight/tint of existing roles (one accent needs a reason to gain a sibling — `design-taste`) |
| "We'll tokenize after the MVP" | Retrofit costs 10× and never gets scheduled | This skill runs before the first styled component |
| Dark mode as decoration pass at the end | Contrast failures, inverted shadows, leaked tiers | Dark shell exists from day one, values filled deliberately |

## Output format (what this skill delivers)

A canonical token package — this is THE source other skills consume:

1. `tokens.json` — the single source (all three tiers, all theme modes)
2. Generated platform outputs — at minimum `tokens.css`; others (TS, Tailwind config, APL) as the project needs
3. Figma variable collections matching the mapping table (or an import file for them)
4. `TOKENS-README.md` — source-of-truth declaration, naming grammar, the add-a-token tree, regenerate command, and value provenance (for Dinesh's systems: "primitives derived from `design-taste`")

## Sources

- Design Systems 101 — standards + reusable components at scale: https://www.nngroup.com/articles/design-systems-101/
- Design systems vs. style guides (tokens are the standards layer, not a pattern library): https://www.nngroup.com/articles/design-systems-vs-style-guides/
- Design-system maturity (6-dimension framework; infrastructure/sync is a scored dimension): https://www.nngroup.com/articles/design-system-maturity/
- "Your design system needs an enforcer" — clear yes/no criteria drive adoption (the lint tables above are those criteria for tokens): https://www.nngroup.com/articles/design-system-enforcer/
- Visual design principles — contrast, 3–4 color palette limit, text hierarchy via weight/gray: https://www.nngroup.com/articles/principles-visual-design/ · https://www.nngroup.com/articles/visual-design-cheat-sheet/
- Type-size grounding — legibility vs readability; glanceable type ("bigger is better"): https://www.nngroup.com/articles/legibility-readability-comprehension/ · https://www.nngroup.com/articles/glanceable-fonts/

## Boundaries

- **build-token-system ↔ apply-personal-brand:** tokens are canonical values, produced ONCE, here. `apply-personal-brand` consumes them as themes and never re-encodes a value. If brand work needs a value that isn't a token, the request comes back here.
- **design-taste** is the single source of all taste values (including motion curves/durations). This skill structures and names values; for Dinesh's own systems it loads `design-taste` to obtain them — it never restates them.
- **document-and-govern-design-system** owns governance, contribution, adoption, and docs beyond `TOKENS-README.md`.
- **build-frontend-interfaces / craft-motion / visualize-data** consume the generated outputs; dataviz palettes come from these token files via `apply-personal-brand`, never from ad-hoc values.
