# superskills

**How I work, encoded as skills.** A curated library of **88 portable `SKILL.md` files** that hold my judgment, research method, and engineering craft as a product designer who builds — so any AI model (including small, cheap ones) performs closer to my standard. It's my personal operating system, opened up: fork it, keep what fits, swap my taste for yours.

Skills are model-agnostic instruction files. Drop a folder into any agent that reads them — Claude Code, claude.ai, the Claude Agent SDK — and the model gains that discipline on demand. This repo is what happens when you treat your own taste and process as something worth encoding, not just carrying in your head.

> Not sure which skill to use? Load [`ask-dinesh`](ask-dinesh/) — it routes a situation to the right skill(s) in the right order.

---

## Why this exists

Agents are capable but tasteless. They'll pick `ease-in` for an enter animation, generalize "3 of 6 users" into "50%", ship a plan with no decision behind it, or write copy that could belong to anyone. Each small miss compounds into work that's *fine* — and fine is invisible.

These skills are the opposite of fine. Each one names the specific mistakes a model makes in one discipline and encodes exactly how a senior practitioner avoids them: named methods, quantified thresholds, decision trees, and worked examples that show the skill *catching its target failure* — not the happy path.

Two rules keep the whole library coherent:
- **Single source of truth.** Taste values live in one file (`design-taste`); evidence discipline lives in one file (`craft-critique`). Every other skill *references* them — none restate. Restated values drift; drift is the failure this library exists to prevent.
- **Situational, not scripted.** Process is dead. Skills equip judgment — a menu of approaches plus how to pick for *this* problem — with a recommended default, never a rigid pipeline. Every producing skill is mode-switchable: a scrappy fast path and a full-rigor path.

---

## What's inside

| Wing | What it covers |
|---|---|
| **Personal DNA** | Taste, writing voice, and the evidence-disciplined critique standard the rest of the library references |
| **Research** | The full research method, atomized — planning, screeners, interview guides, interviews, synthesis, personas, journey maps — grounded in Nielsen Norman Group methodology with real citations |
| **Evaluation & rigor** | Usability testing, heuristic evaluation, accessibility, sampling authority, a canonical bias↔control reference, quantitative evidence |
| **Design craft** | Interaction flows, UI states, visual hierarchy, microcopy, motion, information architecture, divergent concept exploration |
| **Design systems** | Token architecture + governance |
| **AI product design** | Conversational & voice UX, the anti-chat "stage" pattern, output contracts, trust & failure states, agentic UX, production prompt engineering, AI evals |
| **Design engineering** | Coded prototyping, front-end craft, UI verification, data viz |
| **SHIP** | Production-code craft — source-level review, bug diagnosis, TDD, code architecture (rigor-gated, never for prototypes) |
| **Motion** | Emil-Kowalski-grade animation craft, a two-register model (restraint by default, springs for direct manipulation), an animation glossary, and a codebase-motion audit |
| **Business & strategy** | Problem framing, business & competitive research, positioning, growth surfaces |
| **Communication** | Case-study storytelling, stakeholder presentation, decision records, proposals |
| **Meta** | An authoring rubric that governs how every skill is written, and a router over the whole library |

---

## Install

Each skill is a self-contained folder — copy the ones you want, or all of them.

```bash
# All skills, globally (Claude Code / Agent SDK)
cp -R */ ~/.claude/skills/

# One skill
cp -R design-taste ~/.claude/skills/

# Project-scoped
cp -R */ .claude/skills/
```

For claude.ai, upload a skill folder in **Settings → Capabilities → Skills**. Skills load automatically by their description trigger — no manual activation.

---

## The advantage: one person, operating like a team

This library was built by a **single-owner operator** — one person who does the research, the design, the engineering, the business thinking, the marketing, and the client communication. That's the reality of freelancing, building a product, or running a studio of one.

A skill library changes the economics of that. Instead of one person context-switching across six disciplines and doing each at 70%, the operator does the *judgment* and the model does the *execution* — to a consistent, senior standard, every time:

- **Full-stack coverage without a full-stack team.** Research a market, frame the problem, run a usability study, design the flow, build the prototype, review the shipped code, write the case study, draft the client update — each backed by a skill that holds the method so nothing drops to "good enough."
- **Your standard, encoded once, applied forever.** Taste and evidence discipline live in two source-of-truth files; every project inherits them automatically. The library gets sharper as you add to it; your judgment compounds instead of resetting each engagement.
- **Small models punch up.** Because the hard-won judgment is in the file, a cheaper/faster model can execute research synthesis, a code review, or a motion audit at a level it couldn't reach on its own — which keeps a one-person operation fast *and* affordable.
- **Consistency is the moat.** A studio of one wins on taste and reliability. When every deliverable clears the same bar — the pixel-polish gate, the evidence protocol, the accessibility check — the work reads like a team's, because the standard never wavers.

The point isn't to replace expertise. It's to *amplify* one person's expertise across everything a business actually requires — and to let the operator spend their scarce hours on the decisions only they can make.

---

## Credits — inspired by, and standing on

This library is personal, but it stands on the work of people who publish their craft. Forked material keeps its original license and attribution; methodology is cited per-skill.

- **[Matt Pocock](https://github.com/mattpocock/skills)** — *Skills For Real Engineers* (MIT). The production-code craft (SHIP wing), the meta layer (authoring rubric, router), the delivery-pipeline skills, and several grafted techniques are forked and personalized from his work.
- **[Emil Kowalski](https://github.com/emilkowalski/skills)** — *Skills For Design Engineers* (MIT), and [animations.dev](https://animations.dev/). The motion craft, the animation-review bar, the fluid-interface gesture register, the animation glossary, and the codebase-motion audit come from his work.
- **[Nielsen Norman Group](https://www.nngroup.com/)** — the research and evaluation methodology. Every research/eval skill carries real nngroup.com citations; the frameworks (saturation logic, the 20-method landscape, the 10 usability heuristics, thematic analysis) are theirs.
- **[Anthropic](https://www.anthropic.com/)** — the `SKILL.md` format and skill ecosystem, and several forked/adapted skills (writing style, design critique, accessibility review, frontend design, theme systems).
- **[LottieFiles](https://lottiefiles.com/)** — the motion-design foundation (MIT) the personalized motion skill was forked from.

If your work is in here and you'd like the attribution adjusted, open an issue.

---

## License

MIT — see [`LICENSE`](LICENSE). Forked skills additionally carry the original authors' MIT notices in their `Sources` sections; please preserve those if you fork further.
