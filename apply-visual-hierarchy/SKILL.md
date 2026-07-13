---
name: apply-visual-hierarchy
description: "Directs attention on a screen using NN/g visual-design principles — scale, contrast, position, Gestalt grouping — plus legibility floors (line length, text contrast, limited palette). Use when laying out any screen, section, page, slide, or component; when deciding what users should see first; when grouping related elements; or when work is described as 'cluttered', 'busy', 'flat', 'nothing stands out', 'nothing pops', 'where do I look first', 'hard to scan', or 'make this scannable'. This is generic craft — Dinesh's taste values live in design-taste, which OVERRIDES this skill; load design-taste first."
---

# Apply Visual Hierarchy

Make the right thing seen first, related things read as groups, and all text effortless to read — using scale, contrast, position, and whitespace, in that order of preference.

## When to use / when NOT to use

**Use when:**
- Laying out a screen, section, hero, card, form, slide, or email
- Someone can't tell where to look first, or everything competes
- Grouping decisions: which elements belong together, boxes vs whitespace
- Setting type sizes, line lengths, gray levels, or a color budget

**NOT this skill:**
- Taste calls (element budget, breathing-room scale, accent budget, density-vs-air fights) → **design-taste** owns them; it overrides every generic default below. Load it FIRST, always.
- Rendering a verdict on someone's finished design → **craft-critique** (this skill feeds its hierarchy dimension)
- WCAG audit / launch gate → **audit-accessibility** (this skill sets design-time floors only)
- Empty/loading/error states and form behavior → **design-ui-states**
- Site/app-level structure and navigation → **structure-information-architecture**
- Attention via animation → **craft-motion** (and expect design-taste to shrink it)

## The method

Run steps in order. Do not skip step 0.

### Step 0 — Load `design-taste`
Every default below is generic NN/g craft. Wherever design-taste is stricter (it usually is), design-taste wins. If a conflict surfaces, name it — never silently pick.

### Step 1 — Inventory and rank
List EVERY element on the screen. Assign each a priority level:

| Level | Meaning | Rule |
|---|---|---|
| 1 | The one thing this screen exists for | **Exactly one per screen.** Two level-1s = one is wrong. |
| 2 | Supports or acts on the level-1 | 2–4 elements |
| 3 | Available but quiet | Everything else |
| — | Can't justify a level | Cut candidate → run design-taste's decision procedure |

If you cannot name the level-1 in one sentence, the problem is content strategy, not hierarchy — stop and resolve that first (see `write-problem-statement` for framing).

### Step 2 — Direct attention (cheapest tool first)
NN/g's five principles of visual design: **scale, visual hierarchy, balance, contrast, Gestalt.** Hierarchy is the goal; scale, contrast, balance, and Gestalt are the tools. Apply in this order and stop at the first tool that makes the squint test (Step 5) pass:

1. **Scale** — the level-1 element is meaningfully larger. Size difference must be obvious, not 10%.
2. **Value/weight contrast** — a black→gray text ladder (near-black for level 1–2 text, grays for level 3) and font weight. This is the workhorse for text hierarchy: **vary weight and gray level before adding sizes or colors.**
3. **Position** — first in reading order wins. Top and left get seen; users scan in an F-pattern on text-heavy pages. Put the level-1 where the eye lands, not where it "balances."
4. **Color** — the accent, spent ONLY on level-1 or the primary action. Color budget: NN/g's ceiling is a 3–4 color palette; design-taste sets a stricter budget — **the stricter source wins.**
5. **Whitespace isolation** — surround the level-1 with more empty space than anything else gets. Isolation is emphasis with zero added ink.

**Balance check:** after emphasis is set, confirm the visual weight isn't all piled in one corner (unless deliberately asymmetric to direct the eye). Balance never justifies weakening the level-1.

**Demote, don't inflate:** when two elements compete, the fix is almost always to quiet the lesser one (smaller, grayer, lighter), not to shout the winner louder. If demoting isn't enough, the element is a cut candidate — design-taste decides.

### Step 3 — Group with Gestalt
Users perceive grouping before they read. Choose the cheapest principle that communicates the relationship:

| Principle | What the eye concludes | Use when | Implementation |
|---|---|---|---|
| **Proximity** | Near things are related | Default for ALL grouping: label+field, icon+text, heading+body, items in a list | Whitespace only. Gap between groups ≥ 2× the gap within a group. |
| **Similarity** | Same-styled things are the same kind / behave the same | All secondary actions share one style; all links look like links; interactive things share one consistent treatment | One style per role, applied uniformly |
| **Common region** | Things inside one boundary belong together | Only when proximity alone fails — e.g., repeating cards in a grid, or a group that must read as one unit against a busy neighbor | Shared background tint or single border — never both, and never plus a divider |
| **Closure** | The mind completes the cut-off shape | Signaling continuation: a partially visible next card tells users a carousel/list scrolls | Deliberately crop the edge item |

**Grouping ladder:** whitespace → alignment → shared background → border. Each rung adds ink; climb only when the rung below fails. If you reach for a divider line, first ask whether more space between the groups does the same job (it usually does).

**Alignment is silent grouping:** elements on a shared edge read as related. Every element aligns to something; count your alignment lines — more than ~3 vertical alignment lines per screen region reads as disorder.

### Step 4 — Set legibility floors
Legibility (can they decode the letters), readability (how easily passages flow), and comprehension (did they understand) are **three distinct tests** — passing one does not pass the others.

- [ ] Body line length **50–75 characters** (readability collapses beyond ~90; very short lines fatigue too)
- [ ] Default type sizes large — never make users lean in; for glanceable text (labels, stats, nav) **bigger is better**. Design-taste sets the actual scale.
- [ ] Font choice is measured, not assumed: NN/g found up to a **35% reading-speed spread between fonts** — pick proven-legible faces at the sizes you'll actually use
- [ ] Text sits on plain, high-contrast backgrounds — no text over busy imagery without a treatment (scrim, solid panel)
- [ ] Text ladder uses at most **3–4 gray levels**; the lightest gray still passes contrast (audit-accessibility owns the formal gate)
- [ ] Plain language throughout — plain language is for everyone, **even experts**; jargon is a comprehension tax, not a credibility signal
- [ ] No ALL-CAPS body text; no centered multi-line paragraphs

### Step 5 — Verify
1. **Squint test:** blur your eyes (or apply a 6–8px gaussian blur to a screenshot). What survives the blur must be the level-1. If a level-3 element survives, demote it.
2. **Grayscale test:** desaturate the screen. Hierarchy must survive without color — if it collapses, you leaned on color (tool 4) before exhausting tools 1–3.
3. **Reading-order test:** does the DOM/tab order match the visual order? Mismatch is both a hierarchy bug and an accessibility bug (hand the formal check to audit-accessibility).
4. If this is external-facing, run **craft-critique** for the verdict — the squint test is a self-check, not a ship gate.

## Worked example — booking-confirmation screen (salon client's native booking app)

**Brief:** confirmation screen after a client books an appointment.

**Step 1 — inventory and rank:**

| Element | Job | Level | Action |
|---|---|---|---|
| "You're booked" + date/time | The one thing — proof the booking worked, when to show up | **1** | Keep |
| Add-to-calendar button | The one action that prevents no-shows | 2 | Keep |
| Location + directions link | Needed to arrive | 2 | Keep |
| Service, stylist, price summary | Reassurance details | 3 | Keep, quiet |
| Reschedule link / cancel link | Escape hatches | 3 | Keep, quiet |
| Promo banner ("20% off next visit") | Marketing want, not user need on THIS screen | — | Cut candidate → design-taste procedure → cut |
| Full footer nav | Redundant with tab bar | — | Cut |

**Step 2 — attention:** date/time gets the largest type on screen (scale) in near-black; "You're booked" one step down. Add-to-calendar is the ONLY filled/accent button (color spent once). Everything else is text.

**Step 3 — grouping:** service/stylist/price grouped by proximity alone — tight internal spacing, double that above and below the group; no card, no divider. Reschedule and cancel styled identically (similarity: both quiet text links, side by side) so neither reads as recommended.

**Step 4 — legibility:** labels ("Stylist", "Service") in gray, values in near-black — two gray levels total plus the accent. No text over the stylist photo.

**Step 5 — squint test:** blurred, the screen shows one big dark block (date/time) and one accent shape (button). Pass. Grayscale: button still wins by weight and isolation. Pass.

**Result:** 5 content groups, one action, zero boxes. The hierarchy IS the layout.

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Emphasize by inflating (bigger, bolder, redder) while everything else stays loud | Demote the competition — gray it, shrink it, or cut it |
| Two "most important" elements | Force-rank. Exactly one level-1 per screen |
| Everything bold / everything accent | If everything is emphasized, nothing is; emphasis is a budget |
| Boxes, cards, and dividers as the default grouping | Whitespace and alignment first; ink only when space fails |
| Card inside a card inside a bordered section | One common-region device per group, maximum |
| Full-width text columns (120+ chars/line) | 50–75 characters per line |
| Light-gray-on-white "aesthetic" body text | Text ladder stays inside contrast floors; grays are for level-3, not for style |
| Hierarchy that only exists in color | Must survive the grayscale test — scale/weight/position first |
| Solving "too cluttered" by shrinking elements to fit | Never resolved here — load design-taste and run its decision procedure |
| Signaling "important" with motion or a badge pulse | Attention is a layout job; if motion seems needed, load craft-motion and expect it to shrink |
| Centered long-form text, ALL-CAPS paragraphs | Left-aligned, mixed case, plain language |

**Red-flag phrases that mean hierarchy is broken:** "can you make the logo bigger too", "let's just highlight all three", "add a box around it so it stands out", "users aren't seeing the button" (almost always a demotion problem, not a button problem).

## Sources

- 5 principles of visual design (scale, hierarchy, balance, contrast, Gestalt): https://www.nngroup.com/articles/principles-visual-design/
- Visual-design cheat sheet (shared vocabulary): https://www.nngroup.com/articles/visual-design-cheat-sheet/
- F-shaped reading pattern (top/left get seen on text-heavy pages): https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- Gestalt principles for UI: https://www.nngroup.com/videos/the-gestalt-principles-intro/
- Contrast as a usability tool (palette limits, gray ladders): https://www.nngroup.com/videos/visual-principle-contrast/
- Legibility vs readability vs comprehension (three distinct tests): https://www.nngroup.com/articles/legibility-readability-comprehension/
- Glanceable fonts ("bigger is better"; ~35% reading-speed spread between fonts): https://www.nngroup.com/articles/glanceable-fonts/
- Plain language is for everyone, even experts: https://www.nngroup.com/articles/plain-language-experts/

## Boundaries

- **design-taste** is the override layer and single source of ALL taste values (element budgets, breathing-room scale, type scale-up, accent budget, density-vs-air rulings). This skill supplies the generic NN/g craft underneath; wherever the two differ, design-taste wins. Load it before Step 1, and route every cut-vs-demote judgment call through its decision procedure.
- **craft-critique** owns judgment and verdict language when reviewing existing work; this skill is the constructive counterpart and feeds critique's hierarchy dimension. Claims about what "users see first" in a specific shipped design are handled per craft-critique's evidence protocol.
- **audit-accessibility** owns the formal contrast/WCAG audit and the launch gate; the legibility floors here are design-time defaults, not the gate.
- **design-ui-states** owns which elements exist in empty/loading/error/partial states and form behavior; this skill arranges whatever elements it defines.
- **build-token-system** owns canonical type-scale, spacing, and color token values; this skill decides which hierarchy level an element gets — tokens supply the numbers.
- **craft-motion** owns any motion used for emphasis; **structure-information-architecture** owns cross-screen structure and navigation.
