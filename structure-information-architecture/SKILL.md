---
name: structure-information-architecture
description: "Designs and validates information architecture — organization schemes, hierarchy, labels, polyhierarchy — then proves it with card sorts and tree tests as one generate→evaluate loop. Use when organizing content or features into categories, naming navigation labels, building a sitemap, planning or analyzing a card sort or tree test, reading a dendrogram or similarity matrix, or when users 'can't find' things ('users can't find X', 'how should we organize the nav', 'run a card sort', 'is this hierarchy right', 'interpret these tree test results', 'fix our IA')."
---

# Structure Information Architecture

Design where content lives and what it's called, then prove findability with card sorts (generate) and tree tests (evaluate) — one loop, never ship the structure untested.

## When to use / when NOT to use

**Use when:**
- Organizing a product's content or features into categories and levels
- Naming or renaming navigation categories and section labels
- Producing a sitemap or content hierarchy deliverable
- Planning, running, or analyzing a card sort or tree test
- Diagnosing "users can't find X" complaints

**NOT for:**
- Movement through screens to complete a task → `design-interaction-flows` owns task/feature flows and wireflows
- The visual navigation surface (menu component, mega menu, breadcrumbs styling) → `build-frontend-interfaces` + `design-taste`; IA is the structure beneath that surface
- Full usability testing of a live UI → `plan-usability-test` / `moderate-usability-session` / `analyze-usability-data`
- Body microcopy, buttons, errors → `write-ux-microcopy`; this skill owns only category and navigation labels
- Turning raw research into themes → `synthesize-research-data` (its outputs feed this skill's content inventory)

## The loop (never run only half)

Card sorting is **generative** (discovers users' mental model). Tree testing is **evaluative** (measures whether your hierarchy works). NN/g pairs them explicitly — a sort without a tree test is an untested guess; a tree test without a sort iterates on your own assumptions.

```
1. INVENTORY   → list every content item / feature (the raw material)
2. GENERATE    → open card sort → read dendrogram + similarity matrix → draft hierarchy + labels
3. EVALUATE    → tree test the draft (text-only, no visuals)
4. DIAGNOSE    → per-task: label failure vs. structure failure
5. FIX + RETEST→ revise, re-run failed tasks; ship when targets hold
```

**Which method, when (decision tree):**

- No existing structure, or redesigning from scratch → **open card sort**, then tree test
- Existing categories, question is "do items fit them?" → **closed card sort**
- Some categories fixed (brand/legal), rest open → **hybrid card sort**
- Have a draft hierarchy, question is "can users find things?" → **tree test**
- Live site, question is "where do users click first on a real page?" → first-click test (visual layer — runs on rendered pages, not this skill's text-only tree)
- Live site, question is "can users complete whole tasks?" → usability test (`plan-usability-test`)

The last two complete NN/g's four findability-diagnosis methods; this skill executes the first two and hands off the rest.

## Part 1 — Design the structure

### 1.1 IA ≠ navigation

Navigation is the tip of the iceberg on the IA. Fix the underlying structure (categories, hierarchy, labels) before touching menu design. If a nav redesign is proposed without an IA pass, flag it: repainting the tip doesn't move the iceberg.

### 1.2 Build the content inventory

List every item users need to find — pages, features, help topics, products. One row each: item, current location (if any), user-facing name candidates, traffic/importance if known. No structure decisions yet.

### 1.3 Choose an organization scheme

| Scheme | Use when | Watch out |
|---|---|---|
| **Exact — alphabetical** | Users know the item's exact name (directories, glossaries) | Useless when users don't know what it's called |
| **Exact — chronological** | Time is the natural key (releases, posts, appointments) | Old content buried |
| **Exact — geographical** | Location drives the choice (stores, regions) | Only as a facet, rarely the whole scheme |
| **Subjective — by topic** | Users think in subject areas (most content sites) | Topics must come from the sort, not the org chart |
| **Subjective — by task** | Users arrive with a verb ("book", "cancel", "compare") | Verbs must be specific — "Manage" is scent-free |
| **Subjective — by audience** | Genuinely distinct user groups with disjoint content | Fails when users don't self-identify or content overlaps |

Default: topic or task scheme validated by an open sort. Mixed schemes at the same level (some topic tabs, some audience tabs) confuse — one scheme per level.

### 1.4 Depth vs. breadth

Prefer broader-and-shallower over narrow-and-deep. Every extra level is another scent decision users can get wrong. Working defaults: 2–3 levels for most sites; a level with only 1–2 children gets collapsed into its parent; a level with 15+ siblings needs sub-grouping or a facet.

### 1.5 Information scent (the labeling law)

Users foraging for information predict what a path yields from its label — they click the strongest-smelling link and abandon trails that stop smelling right. Every category label is a promise about what's underneath.

Label lint — run every candidate label through:

- [ ] **Familiar words** — the users' terms (from research/sorts), never internal jargon or invented brand names
- [ ] **Specific over vague** — "Pricing" beats "Solutions"; "Book an appointment" beats "Get started"
- [ ] **Front-load the key term** — first 1–2 words carry the scent (users scan, not read)
- [ ] **Differentiated from siblings** — if two labels could contain the same item, users guess; rename one
- [ ] **Predicts the children** — read the label, then the child list: any surprises = weak scent

The three classic low-scent mistakes: vague umbrella labels ("Resources", "More"), sibling labels that overlap, and clever/branded terms users can't predict. NN/g traces most "confused IA" complaints to these.

### 1.6 Polyhierarchy (multiple parents)

Some items legitimately belong in two places — users split on where they look. Allow a second parent when: (a) sort/tree data shows users genuinely split between two locations, AND (b) both locations are high-traffic paths. Rules:

- Designate one **canonical parent** (owns the URL/breadcrumb); other locations cross-link or alias to it
- Keep polyhierarchy rare — if >15% of items have multiple parents, the top-level scheme is wrong; redesign instead
- Never use polyhierarchy to dodge a labeling decision ("put it both places" is not a decision)

### 1.7 Deliverable: the sitemap

A sitemap is a visualization of the IA, not the IA itself (the IA includes labels, schemes, and cross-links the diagram flattens). Produce: indented tree (levels, labels, canonical parents marked, aliases noted) + one-line rationale per top-level category naming the evidence behind it.

## Part 2 — Card sorts (generate)

### 2.1 Setup

- **Cards:** 40–60 items from the inventory. Fewer misses structure; more fatigues participants. Every card = one item, user-facing wording, no internal codes.
- **Terminology-match trap:** if card text shares distinctive words with an expected category label ("Hair system maintenance" card → "Maintenance" category), participants word-match instead of thinking. Reword cards to describe the item ("Get a loose system re-fitted") so groupings reveal mental models, not string matching. Same rule applies to tree-test tasks later.
- **Mode:** moderated + think-aloud (5–8 participants) when you need the *why*; remote unmoderated, OptimalSort-style (15+ participants) when you need quantitative cluster strength. Under 15 unmoderated participants, do not report percentages — treat results as qualitative signal.
- **Open sort:** participants group cards AND name the groups — the names are label gold; capture them verbatim.

### 2.2 Reading the results

**Similarity matrix** — grid of % of participants who paired each two cards:
- Dark blocks along the diagonal = candidate categories (read the block's cards; name the theme)
- A card dark with two different blocks = **split-brain item** → polyhierarchy candidate or a reworded label
- A card dark with nothing = orphan → question whether it belongs in the product at all, or park it in a utility area (footer), never a "Misc" nav category

**Dendrogram** — hierarchical clustering; the x-axis is agreement strength:
- Choose a cut line (e.g., 60–70% agreement, working default) and read the clusters it produces as your candidate top level
- Slide the cut line right → fewer, broader groups; left → more, tighter groups. Compare 2–3 cut positions against the depth/breadth rule before committing
- Clusters that only form at very low agreement are not real categories — participants disagreed; investigate with the think-aloud notes

**Open-sort group names** — standardize: cluster participants' names per group, pick the most frequent *user* term as the label candidate, run it through the label lint (1.5). If participants' names for one group don't converge, the group is real but unlabeled — the label needs invention plus a tree-test check.

### 2.3 Card-sort red flags

- Groupings mirror your card wording → terminology-match artifact; reword and re-run
- A giant "everything else" pile from most participants → inventory has junk or the domain needs a task scheme, not topic
- Two participants' structures share almost nothing → segment issue; check whether you recruited two different mental models (if so, switch to an audience scheme — or ship two IAs)

## Part 3 — Tree tests (evaluate)

### 3.1 Build the test

- **Tree:** text-only hierarchy — labels and levels exactly as drafted, zero visual design, search disabled. You are testing structure + scent, nothing else.
- **Tasks:** 8–12 findability tasks (working default), phrased as user goals, **never containing the label's words** (the terminology-match trap again). Bad: "Find the Maintenance page." Good: "Your hairpiece feels loose after two months — find where to get that handled."
- Randomize task order; each task has one (or more, if polyhierarchic) pre-marked correct destination.
- **Sample:** 15+ for quantitative confidence (same threshold as sorts); ~50 gives stable per-task percentages. Small-n moderated runs are legitimate but report as qualitative.

### 3.2 The three metrics, and what each diagnoses

| Metric | Definition | Healthy (working default) |
|---|---|---|
| **Success** | % reaching a correct destination | ≥ 80% per task |
| **Directness** | % of successes with no backtracking | ≥ 70% of successes |
| **First click** | Which top-level branch was chosen first | Majority on the correct branch |

### 3.3 Diagnosis table (per failed task)

| Pattern | Diagnosis | Fix |
|---|---|---|
| Low success, first clicks scattered everywhere | No branch has scent for this item | Rename the parent label, or the item is a polyhierarchy/relocation case |
| Low success, first clicks confidently on ONE wrong branch | That branch's label over-promises — a scent trap | Differentiate the two sibling labels; check what else users expect under the trap branch |
| High success, low directness | Users get there by backtracking — mid-tree labels overlap | Fix the sibling labels at the level where backtracks happen |
| First click correct, then lost deeper | Top level fine; sub-level labels or depth at fault | Re-lint sub-labels; flatten a level if the sub-tree runs deep |
| One task fails, siblings' tasks pass | Item-specific: wrong location or wrong item label | Move item (test both locations if split) or rename it |
| Most tasks fail | Structure-level failure | Back to Part 2 — re-sort; don't polish labels on a broken scheme |

### 3.4 Retest rule

Fix, then re-run at minimum the failed tasks on the revised tree (fresh participants). A fix that isn't retested is a hypothesis, not a fix. Two loop iterations resolve most IAs; a third failing round means the inventory or scheme is wrong, not the labels.

## Worked example — salon services site (~40 items)

**Inventory (excerpt):** consultation booking, hair-system fitting, re-fit/adjustment service, aftercare guides, adhesive products, pricing, stylist bios, FAQ, coloring, cancellation policy.

**Open sort,** 16 remote participants, 42 cards. Similarity matrix shows three dark blocks: *getting started* (consultation, fitting, pricing), *ongoing care* (adjustment, aftercare guides, adhesives), *salon info* (bios, FAQ, policies). Dendrogram at a 65% cut yields those three + coloring floating alone. **Split-brain:** "re-fit/adjustment" pairs 55% with *ongoing care*, 48% with *getting started*'s services — polyhierarchy candidate. **Terminology finding:** 13 of 16 participants named groups with "hair system"; zero used the site's internal term "hair replacement solutions" — label adopts the users' term.

**Draft tree:** `Hair Systems (New clients | Pricing) · Care & Maintenance (Adjustments | Aftercare | Products) · Book · About (Stylists | FAQ | Policies)` — adjustment's canonical parent = Care & Maintenance, cross-linked from Hair Systems.

**Tree test,** 18 participants, 9 tasks. Task 4 — "Your hairpiece feels loose after two months; find where to get that handled" (note: avoids the words *care*, *maintenance*, *adjustment*): success 61%, directness 45%, first clicks split 50/44 between *Care & Maintenance* and *Hair Systems*. Diagnosis row 1 of 3.3 doesn't apply (clicks aren't scattered — they're split two ways, matching the sort's split-brain) → structure confirmed as polyhierarchic, but the cross-link back from *Hair Systems* was missing in the tested tree. Fix: alias "Adjustments & re-fits" under *Hair Systems*. Retest of task 4: success 94%, directness 82%. Remaining 8 tasks ≥ 83% success first pass. **Ship the tree.**

## Anti-patterns

| Don't | Do |
|---|---|
| Organize by org chart or internal team names | Organize by the mental model the sort revealed |
| Skip the sort because "we know our users" | Run at least a small open sort — assumptions are what tree tests kill |
| Card text sharing words with expected category labels | Describe the item; let grouping reveal thinking |
| Tree-test tasks quoting the label under test | Phrase tasks as goals in different words |
| Test the hierarchy inside the live site's styled nav | Text-only tree — visuals contaminate the structure signal |
| Ship a "Misc"/"Other"/"Resources" nav category | Orphans go to footer/utility or get cut; vague umbrellas are scent-free |
| Report "73% success" from n=6 | Under 15 participants, findings are qualitative signal only |
| Fix labels and ship without retesting | Re-run failed tasks on the revised tree |
| Polyhierarchy for every ambiguous item | Rare, evidence-backed, one canonical parent each |
| Iterate labels on a scheme where most tasks failed | Structure-level failure → back to the sort |

## Output format

Deliver the IA package as one document:

```markdown
# IA — [product] — [date]
## Sitemap (indented tree; canonical parents marked; aliases noted as →)
## Scheme + rationale (one line per top-level category, naming its evidence)
## Label decisions (label → user term source → lint result)
## Validation report
- Card sort: mode, n, matrix/dendrogram findings, split-brain items
- Tree test round(s): per-task success/directness/first-click + diagnosis + fix
## Open risks (untested branches, deferred polyhierarchy calls)
```

Claims in the rationale (e.g., "users think in tasks here") are handled per `craft-critique`'s evidence protocol — cite the sort/tree data or flag under-evidenced.

## Sources

- IA study guide: https://www.nngroup.com/articles/ia-study-guide/
- IA vs. navigation (the iceberg): https://www.nngroup.com/articles/ia-vs-navigation/
- Information scent / foraging: https://www.nngroup.com/articles/information-scent/
- Polyhierarchy: https://www.nngroup.com/articles/polyhierarchy/
- Fixing confused IA: https://www.nngroup.com/articles/fixing-information-architecture/
- Card sorting definition: https://www.nngroup.com/articles/card-sorting-definition/
- Open vs. closed sorts: https://www.nngroup.com/videos/open-vs-closed-card-sorting/
- Terminology-match trap: https://www.nngroup.com/articles/card-sorting-terminology-matches/
- Sort vs. tree test (generate/evaluate pairing): https://www.nngroup.com/articles/card-sorting-tree-testing-differences/
- Reading dendrograms: https://www.nngroup.com/videos/ia-dendrogram/
- Tree testing: https://www.nngroup.com/articles/tree-testing/
- Interpreting tree tests: https://www.nngroup.com/articles/interpreting-tree-test-results/
- Four findability test methods: https://www.nngroup.com/articles/navigation-ia-tests/

Numbers labeled "working default" (cut-line %, task counts, success thresholds) are practical calibrations, not NN/g-published figures.

## Boundaries

- `design-interaction-flows` owns movement through screens (task flows, wireflows, edge cases); this skill owns where content lives and what it's called.
- `plan-usability-test` / `moderate-usability-session` / `analyze-usability-data` own live-UI usability testing — the fourth findability method; hand off there when the question outgrows the text-only tree.
- `write-ux-microcopy` owns copy beyond category/navigation labels.
- `build-frontend-interfaces` + `design-taste` own the rendered navigation surface (menus, breadcrumbs, visual treatment).
- `synthesize-research-data` owns research synthesis; its themes and user vocabulary feed this skill's inventory and label candidates.
- `craft-critique` owns the evidence-discipline protocol referenced above.
