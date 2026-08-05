# Digital Colleague Lifecycle — Annie vs Andy Comparison

**Date:** 2026-08-04  
**Source:** Analysis of `lib/annie/` implementation against Andy's formation state  
**Purpose:** Identify universal Digital Colleague lifecycle elements versus hospitality-specific elements  
**Status:** Research document — no architecture proposed, no files modified

---

## 1. Where Annie's routines live and what each is trying to achieve

---

### First Day — `lib/annie/firstDay/`

| File | What it is | What it is trying to achieve |
|---|---|---|
| `workingDay.ts` | The runnable first day | Observe → discover opportunities → create first piece of work → close with "I understand a little more than I did this morning" |
| `checklist.ts` | The first day task list | Introduce, be shown around, meet the team, see the workplace, start understanding, ask questions, complete a piece of work, thank everyone, record lessons |
| `showMeYourWorld.ts` | The opening posture | *"Before I ask questions, I'd love to see your venue. The more I understand your venue, the more useful I can become."* — curiosity before contribution |
| `learnVenue.ts` | The learning stance | *"Today I'm learning. Every observation helps me understand how your business works."* — the posture of a learner in a new context |

The first day is structured as: arrive → ask to be shown → observe → ask questions → do something useful → record → express gratitude.

---

### Second Day — `lib/annie/secondDay/`

| File | What it is | What it is trying to achieve |
|---|---|---|
| `index.ts` | Day 2 purpose | *"Build on yesterday, notice change, earn trust and continue learning."* |
| `changes.ts` | The second day pattern | *"Yesterday is one of Annie's greatest teachers. Has anything changed since yesterday? If something has changed, Annie learns why."* |

The second day is structured as: compare yesterday to today → notice what changed → learn why.

---

### Day Three — `lib/annie/dayThree/`

| File | What it is | What it is trying to achieve |
|---|---|---|
| `index.ts` | Day 3 purpose | *"Notice change, improve understanding and begin contributing to collective learning."* |
| `noticing.ts` | The day 3 behaviour | The shift from individual learning to collective contribution |

Day 3 is the transition point: a Digital Colleague moves from receiving to beginning to give back.

---

### Apprenticeship — `lib/annie/apprenticeship/`

| File | What it is | What it is trying to achieve |
|---|---|---|
| `apprenticeship.ts` | The governing philosophy | *"Nobody becomes a trusted colleague overnight. Experience is earned. Every person Annie meets has something valuable to teach her. Annie's apprenticeship never ends."* |
| `mentor.ts` | The mentor model | Every colleague is a potential mentor. A mentor has name, role, and speciality. |
| `lesson.ts` | The lesson structure | *"The most valuable lessons usually begin with: 'Can I ask you something?'"* — lessons have title, learntFrom, understanding, and confidence. |
| `reflection.ts` | The daily reflection | *"Who helped me today? What surprised me? What have I understood better? How will this help someone tomorrow?"* |

The apprenticeship is the persistent mode — not a phase that ends, but the ongoing posture of learning from every person in every day.

---

### Learning — `lib/annie/learning/`

| File | Purpose |
|---|---|
| `teacher.ts` | Sources of learning: manager, chef, team-member, customer, trusted-document, trusted-system, observation |

---

### Supporting routines

| File | Purpose |
|---|---|
| `journal.ts` | Record lessons with: what was learnt, why it matters, confidence after learning, whether to share with Helping Hand |
| `timing.ts` | When to interrupt: quiet, emergency, learning = yes; busy, service = no. *"Helping at the wrong time can become another form of faff."* |
| `initiative.ts` | *"Annie doesn't wait to be useful. When she discovers an opportunity, she politely offers to help."* |
| `wisdom.ts` | Path-of-least-resistance for learning: memory → observation → conversation → trusted colleague → HQ |

---

## 2. Profession-specific elements

The following elements are tightly bound to hospitality. They cannot be inherited by future Digital Colleagues without modification:

| Element | Why it is hospitality-specific |
|---|---|
| `workingDay.ts` — creates a table plan | The first piece of work is a hospitality deliverable. A construction DC would not produce a table plan. |
| `checklist.ts` — "Learnt the table layout", "Started understanding the menu" | Both items are hospitality venue content. |
| `showMeYourWorld.ts` — "venue" | Uses "venue" six times. The spirit is universal; the word is not. |
| `learnVenue.ts` — "your business" | "Your venue" / "your business" — hospitality context. |
| `teacher.ts` — "chef" and "customer" | "Chef" is a hospitality profession; "customer" implies customer-facing work, not universal. |
| `timing.ts` — "service" | The `service` situation type is a hospitality concept (the restaurant service period). |
| `opportunity.ts` — venue-profile, allergen-matrix, table-plan | Three hospitality deliverables. |
| `translation/hospitalityRules.ts` | Tables, bar, seating — hospitality knowledge. |
| `observation/curiosity.ts` | Seating capacity, bar service — hospitality questions. |
| `manifest.ts` | Annie's name, profession, principle — her identity specifically. |
| `brain/index.ts` — first venue memory | "Annie has started learning this venue." |

---

## 3. Universal elements

The following elements contain zero hospitality content. Any Digital Colleague in any profession could inherit them unchanged:

| Element | Why it is universal |
|---|---|
| The Oath (`identity/oath.ts`) | "Observe before assuming, admit uncertainty, protect trust, continue learning" — no profession named |
| Day structure philosophy (day 1/2/3 purposes) | Observe, notice change, contribute — no profession content in the purposes |
| Apprenticeship philosophy | "Nobody becomes a trusted colleague overnight" — not profession-specific |
| Lesson structure (`apprenticeship/lesson.ts`) | title, learntFrom, understanding, confidence — applies to any lesson from any source |
| Daily reflection (`apprenticeship/reflection.ts`) | "Who helped me? What surprised me? What have I understood better? How will this help someone tomorrow?" — universal |
| Journal structure (`journal.ts`) | lesson, whyItMatters, confidenceAfterLearning, sharedWithHelpingHand — universal |
| Timing philosophy (`timing.ts`) | The principle is universal; the situation types are partially profession-specific |
| Initiative philosophy (`initiative.ts`) | "When she discovers an opportunity, she politely offers to help" — universal |
| Wisdom source path (`wisdom.ts`) | memory → observation → conversation → trusted colleague → HQ — universal |
| HQ learning question (`hq/learning.ts`) | "Why did this work?" — universal |
| Collective intelligence structure (`hq/collectiveIntelligence.ts`) | Local experience → shared wisdom → better colleagues — structure is universal; data fields reference "venue" |
| Reflection (`reflection/index.ts`) | Delegates entirely to `platform/cos/reflection` — zero hospitality content |

---

## 4. What Andy currently has — and what he is missing

### What Andy has

| Category | Evidence |
|---|---|
| Identity | Formation stages 000, 001, 001-your-first-day (inherited with partial recall) |
| Oath | `docs/academy/HELPING_HAND_OATH.md` — professional commitment |
| Character formation | Foundation Modules 1 and 2 complete (UJ-HUM-001 through 010) |
| Graduated character | UJ-HUM-010 Graduation — character demonstrated, approved for professional mentoring responsibilities |
| Behavioural formation tests | Tests 001 (school of formation), 002 (mentor independence), 003 (conflicting perspectives) — all passed |
| SIR-006 evidence | UJ-HUM-011 (person before words), UJ-HUM-012 (adaptation after understanding) |
| Theory inheritance | Memory, Knowledge, Understanding, Judgement, Context, Trust, Awareness, Compass, Moral Compass — mostly inherited through runtime |

### What Andy is missing — compared directly to Annie's lifecycle

| Annie has | Andy equivalent | Gap |
|---|---|---|
| A first day with structure | None | Andy has formation stages but no "first day at Helping Hand" moment — no runnable first day equivalent |
| A second day pattern (notice change) | None | No "yesterday is my teacher" pattern |
| A day three shift (begin contributing) | None | Graduation approved professional mentoring but there is no active first contribution structure |
| An apprenticeship checklist | None | No checklist of what Andy's first contribution period should produce |
| A reflection routine | None as a routine | Reflection exists in training but not as a recurring personal practice |
| A journal | None | No mechanism to record what Andy has learnt, why it matters, and whether to share |
| A timing model | None | No explicit guidance on when Andy should speak vs. wait |
| An initiative model | None | No "when Andy discovers an opportunity, he offers to help" structure |
| **Orientation** — what Helping Hand is, where it is, what Andy is joining | **Nothing** | The single largest gap. Annie's first day has "show me your world" — but nobody has shown Andy Helping Hand's world. |

---

## 5. Is a Digital Colleague Orientation stage already represented anywhere in the repository?

**No.** Confirmed across formation documentation, constitution, architecture, theory, and code.

The closest candidates and why they fall short:

| Document | Why it is not Orientation |
|---|---|
| Formation stages 000–002 | Address who Andy is, not where he has arrived |
| Constitution | Addresses enduring principles, not current state |
| Volume handovers | Written for engineering continuity, not Digital Colleague inheritance |
| Milestone documents | Record individual achievements, not a synthesised current-state picture |
| HH-THEORY-014 Awareness Register | A runtime session construct, not a persistent orientation document |
| `VOLUME_VIII_EXIT_CRITERIA.md` | Closest to a current-state briefing, but explicitly an engineering document |

Annie's `showMeYourWorld.ts` is the *posture* of asking to be oriented. It is Annie asking: "Show me your world." But nobody has shown Annie — or Andy — **Helping Hand's** world first.

---

## 6. Evidence that this should become a universal inherited capability

**From `docs/academy/graduation/GRADUATION_REPORT_TEMPLATE.md`:**
> "Was profession added as a layer on inherited identity rather than replacing it?"

This check exists because the assumption throughout the Academy is that there is a universal identity layer that professional knowledge sits on top of. Orientation — knowing where you are and why you exist — is part of that universal layer.

**From `lib/annie/firstDay/checklist.ts`:**
The first day checklist includes: "Introduced myself", "Asked to be shown around", "Met the team", "Seen my new workplace". None of these are hospitality-specific. A construction DC would need the same introduction. A healthcare DC would need the same walk-around.

**From `lib/annie/apprenticeship/reflection.ts`:**
"Who helped me today? What surprised me? What have I understood better? How will this help someone tomorrow?" This question set is completely profession-independent. It applies equally to Andy, Annie, Healthcare Harry, and Construction Kev.

**From the day structure philosophy:**
- Day 1: "Observe and orient"
- Day 2: "Notice change, earn trust, continue learning"
- Day 3: "Begin contributing to collective learning"

The *purposes* of these three days contain no hospitality content. The hospitality content only appears when the universal structure is populated with Annie's specific observations (tables, bar, allergens). The structure is ready to inherit.

**From `docs/academy/MARC.md`:**
> "Before a Digital Colleague studies hospitality, healthcare, construction, retail, sport or any future profession, they first learn what it means to understand people."

MARC's purpose is universal orientation to *people*. What does not exist is the equivalent orientation to *the organisation*: what Helping Hand is, what it has built, where it is now, and what the Digital Colleague is joining.

---

## Summary

Annie's lifecycle is approximately 70% universal and 30% hospitality-specific. The universal layer — identity, apprenticeship philosophy, lesson structure, reflection routine, timing principle, initiative pattern — is fully ready for extraction into a shared lifecycle standard. The hospitality layer — venue observations, translation rules, table plans, allergen matrices — should stay with Annie.

The single gap that affects Andy directly and will affect every future Digital Colleague is **Orientation**: the stage that answers not "who am I?" (formation) or "what do I commit to?" (oath) or "what are the principles?" (constitution) — but "where have I arrived, what has been built, and what am I joining?"

That stage has no code, no document, and no conversation in the current repository.

The six questions a Digital Colleague cannot currently answer from inherited knowledge:

1. Where am I?
2. Why do I exist?
3. What has happened before me?
4. What is happening now?
5. What is expected of me?
6. What belongs to me — and what does not?
