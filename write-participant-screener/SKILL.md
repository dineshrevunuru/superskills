---
name: write-participant-screener
description: "Writes a complete participant-recruiting screener plus the recruiting plan around it: behavioral (not demographic) qualifying criteria, intent-masking questions with plausible distractors, exclusion-first ordering, accept/reject/quota logic per question, professional-participant red-flag checks, and channels/incentives/over-recruit buffers. Use when recruiting for ANY study: 'write a screener', 'recruit participants', 'find people for this study', 'who qualifies', 'set up recruiting', 'screener survey', 'panel setup', 'how much incentive', 'people keep no-showing'. NOT for setting the participant profile or sample size (write-research-plan / plan-usability-test do that) and NOT for surveys that collect research data (write-survey)."
---

# Write a Participant Screener

Turn a participant profile into a screener that finds real target users, filters out professional participants, and never reveals what the study is about.

## When to use / when NOT to use

**Use when:** a research plan or test plan names a participant profile and N, and you now need to actually find those people — screener questions, recruiting channel, incentive, schedule.

**Do NOT use for:**
- Deciding WHO the participants should be or HOW MANY — `write-research-plan` (general studies) and `plan-usability-test` (usability tests) own profile + N. If no profile exists, go there first; a screener without a profile is guessing.
- Writing a survey that collects research data — `write-survey`. A screener is a gate, not an instrument: screener answers decide who gets in; they are never analyzed as findings.
- The questions asked INSIDE the session — `write-interview-guide` / `write-task-scenarios`.

## The core principle (NN/g)

A screener must **elicit specific information about the respondent while concealing the study's purpose.** Every question is a tension between those two goals. If a respondent can tell what answer gets them the incentive, some will give that answer — and your study runs on impostors. Every rule below serves one of the two goals.

## The method

1. **Pull the profile.** From the research plan: target behaviors, exclusions, quota splits, N. Copy them verbatim — do not reinterpret.
2. **Translate every criterion into behavior.** Demographics are proxies; behaviors are the thing itself (conversion table below). Keep a demographic criterion only when the study genuinely requires it (e.g. a quota for assistive-tech users, a legal age floor).
3. **Draft questions using the type tree** (below). One criterion per question — never two.
4. **Mask intent on every question**: lift each question one level of abstraction above the study topic and surround the target option with plausible distractors (rules below).
5. **Order exclusion-first** (ordering section below): cheapest, most-exclusionary knockouts at the top.
6. **Write accept/reject/quota logic per question.** Every question carries explicit logic: `TERMINATE if…`, `MUST include…`, `QUOTA: n per cell`. A question with no logic attached is decoration — cut it.
7. **Add the professional-participant traps** (red-flag section below).
8. **Plan the recruiting mechanics**: channel, incentive, over-recruit buffer, scheduling (logistics section below).
9. **Pilot on 2–3 people** who should obviously pass and one who should obviously fail. If the fail-case passes, or a passer can name the study topic, revise before launch.

## Behavioral, not demographic

The question is never "who are they" — it's "what have they done, how recently, how often."

| Demographic proxy (don't) | Behavioral criterion (do) |
|---|---|
| "Age 25–40, tech-savvy" | "Completed an online booking or purchase on their phone in the past month" |
| "Small-business owners" | "Personally approves invoices or payroll at a company of <50 people" |
| "Fitness enthusiasts" | "Tracked a workout with any app or device 3+ times in the past 2 weeks" |
| "Frequent travelers" | "Booked 3+ trips with an overnight stay in the past 12 months" |
| "Our target persona: busy parent" | "Schedules appointments for at least one other household member" |

Recency windows matter: "have you ever" recruits people working from stale memory. Default to the window the study needs — usually 1–3 months for routine behavior, 12 months for rare events.

## Question type tree

```
What does this criterion need?
├─ Verify a target behavior happened
│    → Multiple-choice, SELECT ALL THAT APPLY, target hidden among distractors
├─ Verify frequency/recency of that behavior
│    → Single-select with graduated bands; accept band defined in logic
├─ Split accepted people into quota cells (segment, channel, device)
│    → Single-select, mutually exclusive + exhaustive options
├─ Check articulateness (interviews & think-aloud studies only)
│    → One open-ended question: "Walk me through the last time you…"
│      (2+ specific sentences = pass; blank, one word, or generic = reject)
└─ Logistics (availability, device, recording consent)
     → Closed questions, LAST in the screener
```

Never yes/no on the target behavior ("Do you book salon appointments online?") — it telegraphs the desired answer. NN/g's canonical form: ask "what activities do you do online?" — not "do you play online games?"

## Distractor rules (masking done right)

- **Same specificity** as the target: if the target is "scheduled a personal-care appointment online," a distractor is "ordered groceries online" — not "used the internet."
- **Same plausibility and social value.** No option should feel like the impressive answer or the throwaway.
- **4–6 distractors** per select-all question; more hides the target better but tires respondents.
- **Always include "None of the above."** Without it, respondents are forced to pick something and you can't detect non-qualifiers.
- **The screener's public title masks too.** "Short survey about everyday scheduling habits" — never "Booking-app study." Name the incentive in the invite, not the topic.
- **Distractors are free red-flag detectors:** anyone who selects EVERY option in a select-all list is over-eager — terminate (NN/g red-flag rule).

## Exclusion-first ordering

Cheapest, most-exclusionary questions first — respondents who will never qualify exit in 30 seconds, panel costs stay down, and knockouts fire before later questions can leak the topic.

```
1. Conflict-of-interest knockout   — works in UX/market research, the client's
                                     industry, or a direct competitor (self or household)
2. Past-participation knockout     — paid research study in the last 3–6 months
3. Behavioral qualifiers            — masked select-all + frequency bands
4. Articulateness check             — open-ended (interviews only)
5. Quota / segmentation             — only among people already qualified
6. Logistics + consent              — device, availability, recording OK
7. Contact details                  — last, only from qualifiers
```

Never open with demographics or quota questions — you'd pay to classify people you're about to reject, and lead with the least masked content.

## Professional-participant red flags

Professional participants are people who do studies for income. They are articulate, agreeable, experienced — and not your user. Traps to build in:

- [ ] **Selects every option** in any select-all list → terminate.
- [ ] **Past-participation question is masked**: "When did you last take part in a paid research study or focus group?" with graduated bands — not "Are you a professional participant?"
- [ ] **Consistency trap**: ask the same fact twice in different forms (frequency band early, "last time you…" open-ended later). Contradiction → reject.
- [ ] **Open-ended answer reads like marketing copy** — polished, generic, no concrete detail ("I love exploring innovative solutions") → reject. Real users name specifics.
- [ ] **Implausibly broad experience** — qualifies for every quota cell at once → reject.
- [ ] **Incentive calibration**: an incentive far above market rate for the effort actively attracts professionals. Generous, not jackpot.

## Recruiting logistics

**Channels** — pick for representativeness, not convenience (a convenient sample answers a different question than the one in the plan). Each channel below carries a sampling bias; name and control it per `name-and-control-bias` — a bias that cannot touch the study's conclusion is noise, one that can needs a mitigation or a stated caveat. Convenience is a bias, not a plan:

| Channel | Best for | Bias to flag |
|---|---|---|
| Own customer/user list | Existing-product studies, high authenticity | Misses non-users and churned users |
| Research panels (e.g. User Interviews, Respondent, Prolific) | Speed, niche B2B profiles | Highest professional-participant risk — traps mandatory |
| Live-site / in-app intercept | Catching behavior in the moment | Skews to heavy users |
| Community / social posts | Niche interest groups | Self-selection of the enthusiastic |
| Snowball (referrals from qualified participants) | Hard-to-reach populations | Network homogeneity |
| Friends, family, coworkers | Pilots ONLY | Never for real sessions — relationship + sample bias |

**Incentives** — scale with session length, effort, and profile rarity. Specialist/expert profiles command multiples of general-population rates — check the current rate card of your panel rather than guessing a number. Gift cards travel better than cash across clients and schools. State amount and payment timing in the invite. Employees of the client get no cash incentive (use goodwill/swag) — cash from their employer distorts behavior.

**Over-recruit buffer** — no-shows are certain, not possible:
- Minimum **+1 recruit per 5 sessions (20%)** for moderated remote.
- In-person: recruit a **floater** (paid full incentive to wait on standby).
- Unmoderated remote: over-recruit **30–50%** — dropout and unusable sessions are both higher.
- Confirm twice: at scheduling and 24h before. Send calendar invites with the join link.

## Worked example — screener for a salon booking app usability test

Context: moderated remote usability test (60 min) of his client's salon booking app (in beta). Plan says: N=5, target = people who book personal-care appointments and manage them recurringly; quota mix of online-bookers and phone/walk-in bookers. Recruit 6 (5 + 20% buffer). Public title: **"Short survey about everyday scheduling habits."**

```
Q1. Do you, or does anyone in your household, work in any of these fields?
    (Select all that apply)
    ☐ Marketing or market research   ☐ Software or app design
    ☐ Hair, beauty, or personal-care services   ☐ Journalism
    ☐ None of the above
    LOGIC: TERMINATE if any box except "None of the above".

Q2. When did you last take part in a paid research study or focus group?
    ○ Within the past 3 months  ○ 3–12 months ago  ○ More than a year ago  ○ Never
    LOGIC: TERMINATE if "Within the past 3 months".

Q3. Which of the following have you done in the past 3 months?
    (Select all that apply)
    ☐ Ordered groceries online          ☐ Booked travel with an overnight stay
    ☐ Scheduled a personal-care appointment (haircut, salon, barber, spa)
    ☐ Sold an item on a resale marketplace
    ☐ Attended a live online class      ☐ Renewed a subscription service
    ☐ None of the above
    LOGIC: MUST include "Scheduled a personal-care appointment".
           TERMINATE if ALL options selected (red flag).

Q4. About how often do you get a haircut or other personal-care service?
    ○ Every 2–4 weeks  ○ Every 1–2 months  ○ A few times a year  ○ Rarely or never
    LOGIC: ACCEPT "Every 2–4 weeks" or "Every 1–2 months". TERMINATE otherwise.

Q5. Thinking of your most recent appointment — how did you book it?
    ○ Phone call  ○ Walked in  ○ Business's website or app
    ○ Someone else booked for me
    LOGIC: QUOTA — 3 × "website or app", 3 × "phone/walk-in".
           TERMINATE if "Someone else booked for me".
           CONSISTENCY: an online booking here with no online activity in Q3 → reject.

Q6. Briefly, walk us through the last time you booked an appointment for a
    personal service — how did you decide where and when?
    [open text]
    LOGIC: PASS = 2+ sentences with concrete detail (a place, a day, a reason).
           REJECT = blank, one word, or generic filler.

Q7. Sessions are 60-minute video calls on a phone. Are you able to join from a
    smartphone, share your screen, and be recorded for research purposes only?
    ○ Yes  ○ No        LOGIC: TERMINATE if "No".

Q8. Availability next week (select all that work): [slots]  → Contact details.
```

Recruiting plan: primary channel = client's customer list (invite via email); backup = one consumer panel with Q1–Q2 traps mandatory. Incentive: gift card, sized to 60 min general-population rate on the panel's current card. Recruit 6 for 5 sessions; confirm at booking and 24h out.

## Anti-patterns

| Don't | Do |
|---|---|
| Yes/no on the target behavior ("Do you use booking apps?") | Masked select-all with plausible distractors |
| Screener or invite names the product or topic | Neutral public title; topic revealed only in-session |
| "Would you use a feature that…?" | Past behavior only — screeners never ask predictions |
| Demographics as proxy ("25–40, tech-savvy") | The behavior itself, with a recency window |
| Distractors nobody would pick ("Wrote a novel online") | Distractors as ordinary as the target |
| No "None of the above" | Always include it — forced choice hides non-qualifiers |
| Questions with no accept/reject logic attached | Every question carries LOGIC or gets cut |
| Quota and demographics before knockouts | Exclusion-first ordering, always |
| Recruit exactly N | N + buffer (20% moderated, 30–50% unmoderated) + floater in person |
| Jackpot incentive to fill fast | Market-rate incentive + red-flag traps |
| Analyzing screener answers as research findings | Screener data gates entry only — findings come from the study |
| Recruiting coworkers/friends because it's Friday | Named channel with its bias flagged; convenience is a bias, not a plan |

## Output format

Deliver two blocks in one document:

```markdown
# Screener — [neutral public title]
Study (internal): [real study name] · Profile source: [research/test plan link]
Recruit: [N + buffer] for [N] sessions · Quotas: [cells]

Q1…Qn — each as: question text, options, LOGIC line (TERMINATE / MUST / QUOTA / PASS-REJECT)

# Recruiting plan
Channel(s): [primary + backup, each with its bias flag]
Incentive: [form + basis for amount]
Buffer: [count + floater if in-person]
Schedule: [slots, confirmation cadence]
Pilot: [2–3 pass-cases + 1 fail-case, run before launch]
```

## Sources

- NN/g — Screening Questions to Select the Right Research Participants: https://www.nngroup.com/articles/screening-questions-select-research-participants/
- NN/g — Screening Participants: https://www.nngroup.com/articles/screening-participants/
- NN/g — Recruiting and Screening Research Candidates: https://www.nngroup.com/articles/recruiting-screening-research-candidates/
- NN/g — Screen Your Research Participants to Avoid Bias (video): https://www.nngroup.com/videos/screen-your-research-participants-avoid-bias-user-research/

## Boundaries

- **write-research-plan** owns the participant profile, inclusion/exclusion criteria, and sample size — they arrive here as input. If they don't exist, go there first.
- **plan-usability-test** sets profile and N for usability tests; this skill turns that into the screener and recruiting mechanics.
- **write-interview-guide** consumes screener answers as participant vocabulary for session questions; this skill ends when qualified participants are scheduled and confirmed.
- **write-survey** owns self-administered research instruments and the general per-question bias audit; a screener is a gatekeeping questionnaire — its answers are never analyzed as findings.
- **name-and-control-bias** owns the canonical bias→control catalog; this skill only *flags* per-channel sampling bias and the professional-participant red flags as local instances of it. When a flagged bias could actually reach the study's conclusion, control it per that reference — don't just note it.
- Claims about who the target users are trace to the research plan's evidence, handled per `craft-critique`'s evidence protocol — a screener cannot repair an unevidenced profile.
