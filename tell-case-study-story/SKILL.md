---
name: tell-case-study-story
description: "Structure and write portfolio case studies and shipped-work narratives the way Dinesh does: one distinct claim per case, the outcome in line one, verifiable proof over process theatre, NDA-honest treatment where numbers can't be shown. Use when asked to 'write up this project,' 'write a case study,' 'is my case study strong,' build a portfolio project page, turn shipped work into a story (portfolio, LinkedIn, resume project blurb), or decide what a case should lead with or include. Structure and proof live here; sentence-level voice lives in writing-voice."
---

# Tell the Case-Study Story

Turn shipped work into a narrative a 55-second reviewer believes — problem → process → outcome, with proof that can be checked.

## When to use / when NOT to use

**Use for:** portfolio case studies, project pages, shipped-work narratives, "which project should lead," reviewing whether a case study is strong, converting a project into a LinkedIn/resume story.

**NOT for:**
- Sentence-level prose and register → **writing-voice** (Case Study register). This skill decides WHAT is said and in what order; writing-voice decides HOW it sounds.
- Verdict on a finished case ("ready to ship?") → **craft-critique**. It owns the evidence-discipline protocol and the pixel-polish gate; this skill hands off to it at step 8.
- Live walkthroughs, readouts, defending the work in a room → **present-and-defend-work**.
- The portfolio-wide positioning argument (thesis, which claims the whole site makes) → **position-product**. A case study inherits its claim from that layer; it never invents one.
- Visual/layout treatment of the case page → **design-taste** (load it before any surface decision).

## The reader (fixed reality — design for it)

From Dinesh's verified screening research (portfolio strategy, 2026):

- First pass on a resume + portfolio together: **~55 seconds** aggregate; a 6–8 second scan reads seniority/fit; the **first 5 seconds** decide whether they invest at all.
- Over 60% of applications are cut on first pass; ~3% get a unanimous yes.
- Reviewers **rarely click off-site**. Proof that lives behind a link is proof that is never seen.
- Deep-readers (hiring managers) are **skeptical of process theatre** — polished Discover→Define→Deliver diagrams read as thin. They verify seniority on trade-off narratives: what was decided, what was sacrificed, what didn't work.

Consequences, in order of force:
1. The outcome goes in **line one** of the case — not after the research section.
2. Proof must be **on the page** (embedded, rendered, quotable), not linked away.
3. Depth is for the second read; it must never delay the first-line payoff.
4. The story is decisions-under-constraint, not a methods parade.

## The method

Run these steps in order. Do not skip step 1.

### 1. Build the fact sheet before any prose (hard gate)

No fact sheet → no writing. Collect and verify:

| Field | Must be |
|---|---|
| Role line | Exact scope, e.g. "Design + front-end build" — kills the "your contribution was minimal" doubt |
| Dates / duration | Real dates, current as of today |
| Shipped status | One of: live / beta / prototype / designed-not-shipped — verified, never assumed |
| Metrics | Each number + its named source (analytics tool, ads dashboard, study) — pulled fresh from the source of truth, **never from memory**: metrics change and stale numbers are indistinguishable from fabricated ones |
| Scale anchors | Non-volatile facts of the engagement (clients, plants, users, markets) |
| NDA constraints | What may be named, what may not |
| What did NOT work | At least one real dead end or sacrifice (feeds step 6) |

Run every entry through **craft-critique's evidence protocol**. A number that fails it does not get softened — it gets cut.

### 2. Name the ONE claim

Each case proves exactly one distinct claim, stated in one sentence before writing. If two cases prove the same claim, one of them is redundant. Real slate pattern (each case = a different claim):

| Case | The one claim |
|---|---|
| Shipped AI chatbot | "I build AI products that are live and measured" |
| Enterprise engagement (a prior employer) | "The judgment scales to enterprise complexity — honestly" |
| Built portfolio artifact | "Designs AND builds — this case IS a working thing" |

### 3. Pick the proof — the proof ladder

Work down; stop at the first rung you can actually stand on:

```
Is there a live, operable artifact?
├─ YES → embed or run it ON the page. Operable proof beats every
│         description. (0 of 61–73 studied competitor portfolios
│         hosted a live AI demo on-page — scarcity is evidenced.)
└─ NO → Is there a verified metric with a named source?
    ├─ YES → metric in line one, source named where a reader can see it.
    └─ NO → Is there honesty-by-construction? (an architectural
        │    guarantee, e.g. a closed-enum router that CANNOT emit
        │    unverified data — the guarantee is inspectable in code)
        ├─ YES → state the guarantee + link the public repo.
        └─ NO → NDA / no numbers exist?
            ├─ YES → NDA-honest pattern (next section).
            └─ NO → nothing verifiable = it is a concept.
                     Label it "concept" explicitly, or cut the case.
                     Never dress a concept as shipped work.
```

### 4. Write line one — the metric strike

Formula: **[outcome number or scale anchor] + [what shipped] + [whose hands it's in]**.

- Line one is the single highest-leverage line in the case: it is where reviewer demand ("put the number in the first line") and competitor weakness (almost nobody does it) converge.
- Line one carries a number or a scale anchor — never a method, never "I led the design of…".
- If the number is early or small-n, qualify it honestly *in the same line* ("first 5 days, early signal"). An honest qualifier strengthens; an unqualified early number reads as inflation on the second look.

### 5. Assemble the skeleton

Order is fixed; depth flexes:

1. **Tag strip** — role, stack, duration, status (live/beta/prototype).
2. **Line-one outcome** (step 4) — above the fold.
3. **Problem** — one paragraph, the ambiguous starting state, whose problem, stakes.
4. **Solution** — what shipped, shown (screens, embed, live demo), minimal narration.
5. **Impact up top of the detail** — the metrics/scale block with sources, before any process.
6. **Iteration ladder** — dated versions with the delta each produced ("v2 → +X after Y change"). Deltas, not milestones.
7. **Trade-off narrative** (step 6) — the seniority section.
8. **Explicit role line repeated** — "Design + front-end build," scope named.
9. **Link block** — repo, live URL, resume. Public repo turns a build claim from assertion into inspectable evidence.

### 6. Write the trade-off narrative (500–800 words)

This is what hiring managers actually deep-read. Rules:

- Trace choices from ambiguous start → outcome. Name the constraint each decision answered.
- Include **at least one thing that didn't work** and **one thing sacrificed** — a narrative with no casualties reads as fiction.
- One decision per paragraph: situation → options considered → what was chosen → what it cost → what it produced.
- No process-framework names doing the work of thought ("we then moved into the Define phase" = filler).

### 7. Prose pass

Load **writing-voice**, Case Study register, and rewrite the assembled content through it. Calibration test from that skill applies: reads like a practitioner explaining something real to a smart peer, not a brochure.

### 8. Ship gate

Hand the finished case to **craft-critique**: full claims audit + pixel-polish gate + verdict. A case study ships on PASS, not on "looks done."

## The NDA-honest pattern

When real numbers exist but cannot be shown, or never existed (design/prototype work that did not ship):

**The pattern: names + scale, no fabricated numbers, absence-as-discipline.**

| Do | Don't |
|---|---|
| Name the client and the scale of the system ("a 7-cluster, 34-plant industrial dashboard") | Invent percentage improvements to fill the impact slot |
| Say plainly what did NOT happen: "designed and prototyped; the work did not ship to production" | Write "shipped to production" or "in production at enterprise scale" when it wasn't |
| Render scale quietly — a static anchor, no count-up animation on a number that isn't a measured outcome | Animate/celebrate an unverified figure (motion confers credibility the number didn't earn) |
| Let the absence speak: one line like "No usage metrics are shown here because none were measured — the numbers elsewhere on this site are real for the same reason" | Pad with vague impact language ("significantly improved workflows") |

**Why this is a strategy, not a concession:** credibility compounds. A portfolio scrupulously accurate about what did *not* ship makes every number that *did* ship instantly believable. One inflated NDA claim poisons the real metrics.

**Calibration case:** An early version of an enterprise case for a prior employer carried three polished improvement percentages and an "in production at enterprise scale" line. A verification pass found the percentages fabricated and the production claim false — all four were cut, and the case was rebuilt on names + scale. The rebuilt version is *stronger*: the discipline is visible. Default assumption for any inherited number: presumed invented until traced to a source.

## Honesty patterns for AI-work cases

AI cases attract inflation. Patterns from Dinesh's shipped practice:

- **Label recreations.** If a shown exchange is staged, say so on the artifact itself: "a typical exchange, recreated · the deployment is real." Honest labeling of the demo protects the truth of the deployment.
- **Early-signal qualifiers travel with the number**, not in a footnote: "first 5 days, early signal."
- **Claim guarantees as architecture, not behavior.** "The router is a closed enum with a forced tool call — it cannot emit free text, so it cannot fabricate" is checkable in the repo; "the AI is accurate" is not.
- **Only verified-store data renders.** If the case includes a live or simulated UI, every number it displays comes from a verified data file — the demo must be as honest as the prose.
- **Strip AI-flattering adjectives.** "Seamless," "delightful," "magical" — evidence or delete (craft-critique's inflation scan applies).

## Worked example — opening rewrite

**Before (process-first — the common failure):**

> For a salon I led an end-to-end design process for a conversational booking assistant. Starting with stakeholder interviews and competitive analysis, I moved through several rounds of prototyping before developing the final chatbot experience, focusing on a seamless and delightful user journey.

Failures: no outcome in line one; "led a process" not "shipped a thing"; framework parade; two inflation adjectives; nothing checkable; the 5-second scan finds no reason to stay.

**After (this skill applied):**

> **[N]% of engaged visitors convert to bookings** through an AI booking assistant I designed and built for a salon — live since [month/year], measured in [named analytics source]. *(first [n] weeks — early signal)*
>
> Tag strip: AI Product Designer · Design + front-end build · React Native / Next.js / n8n · Live

`[N]` is pulled fresh from the verified fact source at write time — never hardcoded from a previous draft and never from memory. Every element of line one is checkable: the number has a source, "live" has a URL, the role line names the build scope.

**NDA-honest sibling opening (no metrics exist):**

> **Seven industrial clusters, thirty-four plants, one dashboard.** At a prior employer I designed the monitoring UX for an enterprise operations platform — design and prototype work; it did not ship to production, and no usage numbers are claimed here.

## Worked example — the full case, assembled

The booking-assistant case with every section of the step-5 skeleton in place. Prose is real-shaped; `[…]` marks what you pull from the fact sheet at write time — never ship a bracket unfilled, and never replace one with a number you didn't trace to a source.

**Tag strip** — AI Product Designer · Design + front-end build · React Native / Next.js / n8n · Live

**Line one** — **[N]% of engaged visitors book through the AI assistant** I designed and built for a salon — live since [month/year], measured in [named analytics source]. *(first [n] weeks — early signal)*

**Problem** (one paragraph) — the ambiguous starting state ("convert more of the people already talking to us," no spec for how), whose problem it was, and the stakes ([bookings lost in the gap between an interested visitor and a booked chair]).

**Solution** (shown, minimal narration) — the assistant answers product and eligibility questions in the visitor's own words and hands off a booking. [Embed the real exchange, or a recreated one labeled "a typical exchange, recreated · the deployment is real."]

**Impact block** (before any process) — [N]% conversion · [N]% answer-satisfaction · [N]% lower cost per booking. Each figure names its source inline — [chatbot analytics] · [Google Ads] · [Google Analytics]. No figure appears without one.

**Iteration ladder** — dated deltas, not milestones: v[n] [what changed] → [+delta]. Show the change that moved the number, not the calendar.

**Trade-off narrative** (500–800 words, the deep-read) — one real beat in full: the assistant shipped as text, not voice; the cloned-voice conversational layer was scoped and deliberately deferred, because a text MVP could be live and measured in days while voice added weeks before a single booking — the sacrifice was novelty at launch, chosen for evidence at launch. Add ≥1 real dead end here — an approach tried and dropped — never a manufactured one; a narrative with no casualties reads as fiction.

**Role line** — Design + front-end build; owned the product's digital UX end to end.

**Link block** — [live URL] · [public repo, if any] · [resume].

## Pre-ship checklist

- [ ] Fact sheet exists and every entry passed the evidence protocol
- [ ] The case's one claim is stated in one sentence and differs from every sibling case
- [ ] Line one carries the outcome (number or scale anchor) + honest qualifier if early
- [ ] Proof is on-page (embed, render, repo link) — not off-site-only
- [ ] Role line explicit, twice (tag strip + body)
- [ ] Shipped status accurate: live / beta / prototype / designed-not-shipped
- [ ] Trade-off narrative includes ≥1 failure and ≥1 sacrifice
- [ ] Zero fabricated or unsourced numbers; NDA cases use names + scale only
- [ ] No count-up or celebratory motion on unverified numbers
- [ ] Recreated demos labeled as recreated
- [ ] Prose passed through writing-voice; verdict from craft-critique is PASS

## Anti-patterns / red flags

| Red flag | Why it kills the case |
|---|---|
| Process theatre (Discover→Define→Deliver diagrams) | Deep-readers read it as thin; trade-offs beat frameworks |
| Outcome buried below the research section | The 55-second reviewer never reaches it |
| Concept dressed as shipped | ~75 of 93 studied JDs demand shipped/owned; discovered inflation ends the candidacy |
| Two cases proving the same claim | "Three similar case studies" is a named screen-out pattern — each case earns its slot with a distinct claim |
| Inflating NDA work with invented numbers | One false number poisons every true one on the site |
| Off-site-only proof | Reviewers rarely click; the proof effectively doesn't exist |
| Stale numbers copied from an old draft | Indistinguishable from fabrication; always re-pull from source |
| "I was part of a team that…" with no role line | Reads as minimal contribution; name the exact scope instead |
| Loud surface compensating for thin substance | Backwards. Over-prove the architecture (metrics, repo, operable demo); keep the skin restrained — surface treatment per design-taste |

## Output format

Produce the case as: tag strip → line-one outcome → problem → solution (shown) → impact block with sources → iteration ladder → trade-off narrative (500–800 words) → role line → link block. Deliver with a one-line header stating the case's single claim, so reviewers of the draft can check every section against it.

## Boundaries

- **writing-voice** owns prose register (this skill invokes it at step 7; never restyle prose here).
- **craft-critique** owns the evidence-discipline protocol and the ship verdict (invoked at steps 1 and 8; never restate its protocol).
- **design-taste** owns all visual/motion values for the case page, including how metrics may animate.
- **present-and-defend-work** owns presenting the finished case live; **position-product** owns the portfolio-level thesis the case inherits; **write-decision-rationale** owns standalone decision records (the trade-off narrative may cite them).

## Sources

- **Method + the reader model** — Dinesh's own screening research (portfolio strategy, 2026); not a fork, not NN/g-grounded. The load-bearing figures are real from that corpus: the ~55-second aggregate first pass and reviewers rarely clicking off-site, and the 0-of-61–73 live-AI-demo portfolio scan (competitor-weakness evidence for the line-one strike). The shipped/owned JD demand and first-pass cut rates come from the same JD and hiring-screening research.
- **The calibration cases are real** — the booking-assistant opening (metrics pulled fresh, never hardcoded) and the prior-employer NDA-honest rebuild (three fabricated improvement percentages + a false "in production at enterprise scale" line, all four cut, rebuilt on client name + scale anchor) are drawn from real, verified portfolio work.
- **`craft-critique`** — single source of truth for the evidence-discipline protocol; this skill applies it at steps 1 and 8 and never restates it.
- **`design-taste`** — owner of "quiet surface, loud proof" and every visual/motion value (including how a verified metric may animate); reused here by reference only.
- **`writing-voice`** — owner of the Case Study register applied at step 7.
