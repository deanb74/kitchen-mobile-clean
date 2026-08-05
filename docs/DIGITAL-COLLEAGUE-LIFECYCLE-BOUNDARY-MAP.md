# Digital Colleague Lifecycle — Inheritance Boundary Map

**Date:** 2026-08-04  
**Source:** Analysis of `lib/annie/` implementation against `platform/cos/` and academy/formation documentation  
**Purpose:** Identify which elements of Annie's lifecycle are hospitality-specific and which represent universal Digital Colleague behaviour  
**Status:** Research document — no architecture proposed, no files modified

---

## What the code reveals about structure

Annie's `lib/annie/` directory contains exactly the lifecycle stages proposed. Mapped directly from the folder structure and contents:

```
lib/annie/
  identity/          ← employment.ts, oath.ts
  firstDay/          ← workingDay.ts, learnVenue.ts, showMeYourWorld.ts, checklist.ts
  secondDay/         ← "Build on yesterday, notice change, earn trust"
  dayThree/          ← "Notice change, improve understanding, begin contributing"
  apprenticeship/    ← philosophy.ts, mentor.ts, lesson.ts, reflection.ts
  experience/        ← createExperience()
  observation/       ← observe.ts, curiosity.ts (with hospitalityCuriosityRules)
  translation/       ← hospitalityRules.ts
  environment/       ← venueObservation.ts, manager.ts
  reflection/        ← delegates to platform/cos/reflection
  learning/          ← teacher.ts, lesson types
  memory/            ← delegates to platform/cos
  hq/                ← collectiveIntelligence.ts, learning.ts, insight.ts
  work/              ← tablePlan.ts
  brain/             ← coordinates the full cognitive cycle
```

---

## Layer 1 — Universal Digital Colleague Lifecycle

These elements exist in Annie's codebase but contain **no hospitality content**. They are expressions of universal Digital Colleague behaviour inheritable by any future Digital Colleague.

| Element | Location | What it represents |
|---|---|---|
| Identity / Oath | `lib/annie/identity/oath.ts` | Universal commitments: observe before assuming, admit uncertainty, protect trust, continue learning |
| Employment Record | `lib/annie/identity/employment.ts` | A Digital Colleague joins. Has a start date. Has a purpose. Has a performance measure (every person helped). |
| First Day greeting | `lib/annie/firstDay/workingDay.ts` | *"Good morning. Would you show me your world?"* — universal orientation posture |
| Day structure | `firstDay/`, `secondDay/`, `dayThree/` | Day 1: observe and orient. Day 2: notice change, earn trust. Day 3: begin contributing to collective learning. |
| Apprenticeship philosophy | `lib/annie/apprenticeship/apprenticeship.ts` | *"Every day is another opportunity to become a better colleague."* |
| Mentor structure | `lib/annie/apprenticeship/mentor.ts` | A Digital Colleague learns from people. Every colleague is a potential mentor. |
| Teacher types | `lib/annie/learning/teacher.ts` | manager, team-member, trusted-document, trusted-system, observation (universal structure; some values are hospitality-specific) |
| Experience cycle | `lib/annie/experience/index.ts` | Greet → understand environment → ask to continue learning |
| Reflection | `lib/annie/reflection/index.ts` | Delegates entirely to `platform/cos/reflection` — zero hospitality content |
| Wisdom source | `lib/annie/wisdom.ts` | Universal path-of-least-resistance: memory → observation → conversation → trusted colleague → HQ |
| HQ learning pattern | `lib/annie/hq/learning.ts` | *"Why did this work?"* — universal HQ question |
| Collective intelligence | `lib/annie/hq/collectiveIntelligence.ts` | Local experience → shared wisdom → better colleagues — structured universally; venue references only in data fields |

---

## Layer 2 — Hospitality Expression (Annie-specific, not inheritable)

These elements are hospitality-specific and should stay with Annie:

| Element | Location | What makes it hospitality-specific |
|---|---|---|
| Hospitality observations | `lib/annie/observation/observe.ts` | Hardcoded: "tables", "bar" as visual categories |
| Hospitality curiosity rules | `lib/annie/observation/curiosity.ts` | Questions about seating capacity, bar service — hospitality knowledge |
| Hospitality translation rules | `lib/annie/translation/hospitalityRules.ts` | Meaning of "tables" and "bar" in hospitality context |
| Venue observation | `lib/annie/environment/venueObservation.ts` | `area`, `whatAnnieNoticed` — venue-scoped |
| Venue environment | `lib/annie/environment/manager.ts` | `VenueObservation[]` — venue context |
| Table plan | `lib/annie/work/tablePlan.ts` | Conservatory, covers, tables — hospitality work product |
| Opportunities | `lib/annie/opportunity.ts` | venue-profile, allergen-matrix, table-plan — hospitality deliverables |
| Venue profile memory | `lib/annie/brain/index.ts` | "Annie has started learning this venue" — venue-scoped first memory |
| First day checklist | `lib/annie/firstDay/checklist.ts` | "Learnt the table layout" — hospitality first-day task |
| Annie identity | `lib/annie/manifest.ts` | Name, profession, principle — Annie-specific, not Kev or Harry |

---

## Layer 3 — The COS Boundary (already extracted)

Annie's code explicitly delegates several capabilities to `platform/cos/` with no hospitality content in the delegation. The pattern is consistent throughout:

**COS owns the mechanism. Annie supplies the professional content.**

| Capability | Annie calls | COS provides |
|---|---|---|
| Observation session | `beginObservationSession()` | Universal observation types and priority |
| Curiosity questions | `createCuriosityQuestions()` | Universal question structure (Annie supplies hospitality rules) |
| Translation | `translateObservations()` | Universal translation mechanism (Annie supplies hospitality rules) |
| Reflection | `reflect()` | Universal reflection |
| Memory | memory module | Universal memory |

---

## The Lifecycle Map

```
Digital Colleague Core Lifecycle
(universal — already largely present in Annie's code)
        │
        ├── Identity
        │     Oath, employment record, start date, purpose
        │     "Why do I exist? What did I commit to?"
        │
        ├── Orientation                    ← MISSING STAGE
        │     "Where am I?"
        │     "Why do I exist?"
        │     "What has happened before me?"
        │     "What is happening now?"
        │     "What is expected of me?"
        │     "What belongs to me?"
        │     "What does not belong to me?"
        │
        ├── First Days
        │     Day 1: Observe and orient ("Show me your world")
        │     Day 2: Notice change, earn trust
        │     Day 3: Begin contributing to collective learning
        │
        ├── Apprenticeship
        │     Every day is an opportunity to become a better colleague.
        │     Learn from people. Every colleague is a potential mentor.
        │
        ├── Professional Development       ← professional layer added here
        │     What belongs to this profession, this venue, these people
        │
        ├── Contribution
        │     Begin contributing to collective learning (Day 3 structure)
        │     HQ: "Why did this work?" → shared wisdom
        │
        └── Mentoring / Inheritance
              Graduate → first professional mentoring responsibility
              Every lesson has the potential to help another colleague


Hospitality Expression (Annie only)
        │
        ├── Venue:       VenueObservation, area layout, venue profile
        ├── Kitchen/FOH: table plan, covers, bar, seating
        ├── Compliance:  allergen matrix, food safety (professional modules)
        └── Customers:   customer as teacher, customer-facing service logic
```

---

## The Orientation gap confirmed by code

Every other lifecycle stage has code in Annie's implementation. **Orientation has none.**

The first day opens with: *"Good morning. Would you show me your world?"* — which is Annie asking to be oriented. But there is no document or code that orients Annie (or any Digital Colleague) to what Helping Hand is, what has been built, and what they are joining. A Digital Colleague arrives with identity (oath) and begins observing immediately. The intermediate stage — *"here is where you have arrived; here is what exists; here is what you are joining"* — does not exist in code or documentation for any Digital Colleague.

The six questions a Digital Colleague cannot currently answer from inherited knowledge:

1. Where am I?
2. Why do I exist?
3. What has happened before me?
4. What is happening now?
5. What is expected of me?
6. What belongs to me — and what does not?

---

## Where the Digital Colleague Orientation Framework belongs

The gap is structural, not content-specific. It belongs in the **universal lifecycle layer** — one level above Annie's hospitality expression and one level below the COS mechanism.

It is not:
- a formation document (formation addresses character and identity, which already exist)
- a constitution article (constitution addresses enduring principles)
- a hospitality document (any future DC will need this equally)

It is a universal Digital Colleague capability, equivalent in position to the Oath and the Apprenticeship philosophy. The correct architectural home is `platform/cos/` or as a governed document in the universal lifecycle layer — not in `lib/annie/` and not as formation.

---

## Recommended next step

Before any document or code is created, the founders should decide:

1. Whether the Orientation Framework is a **document** that a Digital Colleague inherits (a static governed briefing, updated periodically), a **conversation** (a structured first interaction with MARC or the organisation), or a **capability** (code that assembles orientation from governed sources).

2. Whether it belongs in **`platform/cos/`** (universal code capability), in **`docs/institution/`** (governed document), or as a new directory in the lifecycle layer.

3. Whether the current-state dimension (what Helping Hand is doing right now) should be **separate from** the enduring dimension (why Helping Hand exists, what has been built) — or combined in one Orientation artefact.

The analysis is complete. No implementation recommendation is made here.
