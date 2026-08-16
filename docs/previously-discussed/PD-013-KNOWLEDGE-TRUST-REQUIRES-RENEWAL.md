# PD-013 — Knowledge Trust Requires Renewal

**ID:** PD-013
**Date:** 2026-08-06
**Topic:** The Lifecycle of Trust in Governed Knowledge
**Status:** Preserved Architectural Principle — Protects against concepts that outlive the conditions that validated them

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-009 — Context Has Authority | Understanding must carry its origin |
| PD-010 — Authority Requires Context | Authority must be grounded in understanding |
| PD-011 — Learning Requires Causation | Learning must carry why it changed |
| PD-012 — Knowledge Inheritance Boundary | Inheritance must be proportional to evidence breadth |
| **PD-013 — Knowledge Trust Requires Renewal** | **Trust must be renewed through continued evidence — or withdrawn through contradiction** |

---

## Core Principle

> A concept that has never been challenged has never been proven.
>
> Trust is not granted once. It is renewed through continued evidence,
> or withdrawn through contradiction.

---

## The Problem

A concept enters `KnowledgeGraph` as `status: "candidate"` after its first governance approval.

Over time, it may be reinforced until it reaches `status: "validated"`.

But `"validated"` is not a permanent state. It is a current assessment.

The world changes. Professions change. Venues change. Technologies change.

A food safety threshold that was `"validated"` before a regulatory update may still
show as `"validated"` in `KnowledgeGraph` after the regulation changes — because
nothing in the system detected the change.

A communication pattern that held during a specific phase of a venue's operation
may have been superseded by new procedures. The concept does not know this.

`status: "validated"` currently means: "this was approved and nothing has contradicted it."

That is not validation. That is silence.

---

## The Four Forces Acting on Trust

### Reinforcement

New learning cycles independently produce the same pattern.
The concept earns additional evidence rings.

`changeIntent: "reinforce"` already exists. But:
- There is no tracking of *when* the last reinforcement occurred
- There is no threshold for how long a concept can go without reinforcement
- There is no signal that a concept has not been confirmed in recent experience

A concept reinforced ten times in one month and then never confirmed again is not
more trustworthy than a concept reinforced steadily over time.
Recency matters. The architecture does not yet record it.

### Contradiction

A new learning emerges that is inconsistent with an existing concept.

The governance chain can `"supersede"` an existing concept. But:
- The proposal must explicitly identify the target concept by ID
- Nothing connects a new learning that contradicts an existing concept to that concept
- A reviewer could approve a contradictory concept without knowing the existing one exists

Contradiction currently requires the caller to notice it. The architecture does not detect it.

### Decay

The conditions that validated a concept have changed, but the concept has not.

Regulatory changes. New equipment. New professional standards. New venue profiles.
`KnowledgeGraph` has no mechanism for temporal context on a concept's validity.

A concept has `createdAt` and `updatedAt`. It does not have:
- `validUntil?` — an explicit expiry if one is known
- `environmentalScope?` — the conditions under which this concept was validated
- `lastReinforcedAt` — when this was last independently confirmed

### Retirement

`changeIntent: "retire"` exists. `Concept.status: "deprecated"` exists.

The mechanism for retirement is built. What is missing is the trigger:
- What should cause a retirement review to be flagged?
- Who receives the flag?
- What constitutes sufficient grounds for retirement without replacement?

Currently, retirement happens when someone chooses to propose it.
No signal in the system proactively identifies concepts at risk of becoming stale.

---

## What Trusted Knowledge Must Be Able to Answer

A concept in `KnowledgeGraph` should be able to answer these questions at any moment:

**1. When was this last confirmed by an independent learning cycle?**
`lastReinforcedAt` — a timestamp updated each time a `"reinforce"` governance record is applied.

**2. Has any learning cycle produced evidence that contradicts this?**
`challengedBy: string[]` — governance record IDs of proposals that conflict with this concept.

**3. Under what conditions was this validated?**
`validatedInContexts: string[]` — venue types, regions, or operational contexts where validation occurred.

**4. Is this concept still being observed in recent experience?**
A concept not reinforced within a defined period should be flagged for review,
not automatically retired — but not silently trusted either.

---

## What This Principle Requires of the Architecture

**1. `lastReinforcedAt` on `Concept`**

Updated whenever a `"reinforce"` intent governance record is applied to this concept.
Enables: identification of concepts that have not been confirmed recently.

**2. `challengedBy` on `Concept`**

A list of governance record IDs from proposals that were assessed as contradicting this concept.
Enables: detection of contested concepts; flagging for human review.

**3. Contradiction detection in the governance chain**

When a new `LearningProposal` proposes content that may conflict with an existing `"validated"` concept,
the governance reviewer should be informed of the potential conflict.
This is not an automatic rejection — it is a flag for the reviewer.

**4. Review triggers**

Concepts that have not been reinforced within a defined window, or that carry unresolved
challenges, should be surfaced for human review. Not retired automatically — but not
trusted silently.

---

## What This Principle Does Not Mean

It does not mean:
- Concepts automatically expire
- Governance must constantly re-validate every concept
- Contradiction always leads to retirement

It means:
- The system carries enough metadata to identify concepts at risk
- Human reviewers have the information they need to make informed trust decisions
- `"validated"` status is a current assessment, not a permanent declaration

---

## The Relationship to the Existing Architecture

`evaluateGuard()` Invariant 1 already protects `"core-principle"` + `"constitutional"` concepts from modification.

These are the only concepts that genuinely do not require renewal — because they are
foundational to all DC operation and are governed constitutionally.

Everything below `"constitutional"` evidenceLevel should be subject to renewal.

A `"validated"` concept with `evidenceLevel: "multi-source"` and `scope: "professional"`
must be capable of being challenged, reinforced, or retired as the profession evolves.

The constitution is permanent. Professional wisdom is provisional.

---

## The Tree Metaphor

The Oak's rings record growth. Old rings do not disappear.

But a ring grown under drought conditions tells a different story than one grown with good rain.

A ring grown when the soil was rich may be thinner now that conditions have changed.

The Oak does not pretend old rings are current conditions.

It carries the history — and continues to respond to the present.

---

## Preserved Insight

> Knowledge does not earn permanent trust.
> It earns continued trust — through continued evidence.

The moment a concept stops being tested is the moment it begins to age.

The system must know when that happened.

A concept that cannot say when it was last confirmed is a concept asking to be trusted on memory alone.

That is not governed intelligence.

That is institutional habit.
