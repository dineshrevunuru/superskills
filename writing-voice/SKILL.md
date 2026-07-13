---
name: writing-voice
description: "Write any content in Dinesh Reddy Revunuru's voice — automatically choosing the right register. Trigger this skill for ANY writing task Dinesh asks for — case studies, portfolio narratives, articles, blog posts, LinkedIn posts, stakeholder memos, research reports, email drafts, cover letters, or general writing help. Also trigger when he says 'write this in my style,' 'help me write,' 'draft,' 'rewrite this,' or any variant involving producing written content. Auto-selects the best register unless Dinesh specifies one. When in doubt, trigger this skill."
---

# Writing Style — Dinesh Reddy Revunuru

This skill writes content in Dinesh's voice across three distinct registers. Auto-detect the right one from context, or use whichever register Dinesh specifies.

---

## Step 1: Select the Register

| Register | Use When | Key Tone |
|---|---|---|
| **Case Study / Process Narrative** | Portfolio pieces, project walkthroughs, design documentation | Conversational, phase-structured, "we"-led, method-named |
| **Professional / Strategic** | Articles, reports, LinkedIn posts, memos, research summaries | Precise, evidence-backed, structured prose |
| **General** | Emails, quick writes, rewrites, anything that doesn't fit above | Warm, clear, grounded — Dinesh's natural voice without formal structure |

**Auto-detection logic:**
- Mentions a project, client, design process, or UX work → **Case Study**
- Mentions an article, report, memo, LinkedIn, research summary, or strategic communication → **Professional / Strategic**
- Everything else, or short/informal writing → **General**

**If Dinesh specifies a register explicitly, always use that one regardless.**

---

## Step 2: Load the Reference

Read the relevant reference file before writing:

- Case Study work → `references/case-study.md`
- Professional / Strategic → `references/professional.md`
- General writing → `references/general.md`

All three registers share the same core voice. Read `references/core-voice.md` first if this is the first piece of writing in the session.

---

## Step 3: Gather Context

Before writing, collect what's needed for the register:

**Case Study:** Project name, client, problem, role, duration, methods, key decisions, outcomes/metrics, NDA constraints
**Professional:** Topic, audience, goal, key argument or data points, desired length/format
**General:** What needs to be written, who it's for, any specific tone notes

If context is missing and it matters, ask. Never fabricate details.

---

## Step 4: Write

Follow the register-specific instructions from the reference file.

After writing, do a quick calibration check:
> "Does this read like Dinesh explaining something real to a smart peer — not performing for an audience?"

If it sounds like a brochure or press release → rewrite it.
If it sounds like a grounded practitioner thinking out loud with evidence → it's right.

---

## Optional: Drafting Mechanics

The register files above govern what the piece sounds like — voice comes first. But when the hard part is *assembling the words* rather than choosing them (a long case study, an essay, an article that won't come out in a straight first draft), reach for the lower-level prose moves:

- **Optional drafting mechanics → `references/drafting-mechanics.md`** — mine raw fragments before structure (EXPLORE), assemble them into a journey of beats or shape them into paragraphs (EXPLOIT), and ground every term before a sentence leans on it.

Situational, not mandatory: short pieces — emails, LinkedIn posts, quick rewrites — skip this entirely and draft straight from the register file. Escalate to the mechanics only when a straight draft stalls. These moves sit under the voice; they never override it.

---

## Register Override

If Dinesh says any of the following, use that register regardless of content type:
- "Write this as a case study" → Case Study register
- "Write this as an article / report / LinkedIn post" → Professional register  
- "Just write it naturally / keep it simple" → General register

---

## Worked Example — the calibration check catches brochure voice

**Draft (Professional register, LinkedIn post):**
> "I'm thrilled to share that we leveraged cutting-edge AI to deliver a seamless, delightful experience that disrupted the salon booking space. The results speak for themselves!"

**Run Step 4's check** — *does this read like Dinesh explaining something real to a smart peer?* No. It performs for an audience: "thrilled to share," "leveraged cutting-edge," "seamless, delightful," "disrupted," "results speak for themselves." Every one is a buzzword the register bans (see professional.md) with nothing grounding it, and "the results speak for themselves" asserts an outcome with no evidence behind it.

**Rewrite (grounded):**
> "We rebuilt the salon's booking flow around one question: why do people abandon it halfway? The interviews pointed at a specific friction, and removing it changed where people dropped off. I'll show what moved once the numbers are confirmed."

**Why it passes:** a specific observation instead of a hook, no un-earned buzzwords, the claim scoped to what's actually evidenced, and the number withheld until `craft-critique`'s evidence protocol clears it. Voice over performance — the happy-path draft read fine at a glance and still failed.

---

## Anti-patterns / red flags

| Don't | Do |
|---|---|
| Skip register selection and default to one house style | Pick the register in Step 1; state which one |
| Write like a brochure or press release ("thrilled to share," "seamless," "results speak for themselves") | Explain something real to a smart peer; run Step 4's calibration check |
| Reuse a stock metric as boilerplate, or cite a number you can't stand behind | Pull the real figure from the project; route external claims through `craft-critique` |
| Fabricate a project, quote, client, or outcome to fill a gap | Name the gap and ask Dinesh; never invent a fact (full Never-Do list in core-voice.md) |
| Reach for the drafting mechanics on a short email or quick rewrite | Draft straight from the register file; escalate only when a straight draft stalls |
| Restate how the piece should look (spacing, type scale) | Leave rendering to `design-taste`; decide the words here |

---

## Boundaries

- **`writing-voice` is the DNA voice engine.** It owns sentence-level voice; every sibling below owns structure, proof, or strings and renders through this.
- **`tell-case-study-story`** owns case-study structure, the single claim, and verifiable proof; this skill's Case Study register renders those sentences. Structure there, voice here.
- **`write-ux-microcopy`** owns interface strings (button labels, errors, empty states); this skill owns long-form (case studies, articles, posts, emails).
- **`present-and-defend-work`** owns readout, defense, and status-update structure; this skill supplies the voice they're written in.
- **`craft-critique`** owns whether an external claim is evidenced; this skill never ships a market or result claim without routing it there.
- **`design-taste`** owns the visual rendering of any written artifact (spacing, type scale, breathing room); this skill decides the words, never the pixels.

---

## Sources

- Ported and personalized from **anthropic-skills `writing-style`** — the fork this library's other voice skills emulate. All register content, the 5 non-negotiable beliefs, and the DNA in `references/core-voice.md` are grounded in Dinesh's real work, not generic templates.
- **`references/drafting-mechanics.md`** forks **`writing-fragments` / `writing-beats` / `writing-shape`** (mattpocock/skills, MIT, © Matt Pocock); attribution and the adopted moves are carried in that file.
- Metric and market claims follow **`craft-critique`**'s evidence protocol — pull real, confirmed figures from the project; never carry an unverified number as vocabulary.
