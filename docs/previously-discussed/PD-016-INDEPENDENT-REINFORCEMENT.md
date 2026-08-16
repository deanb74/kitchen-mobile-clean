# PD-016 — Independent Reinforcement

**ID:** PD-016
**Date:** 2026-08-06
**Topic:** What Evidence Knowledge Needs Before It Is Allowed to Travel Further
**Status:** Preserved Architectural Principle — Governs the boundary between candidate knowledge and trusted knowledge

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-012 — Knowledge Inheritance Boundary | Inheritance proportional to evidence breadth |
| PD-013 — Knowledge Trust Requires Renewal | Trust renewed through continued evidence |
| PD-014 — Trust Is Evidenced, Not Scored | Trust remembered through reasons, not numbers |
| **PD-016 — Independent Reinforcement** | **Evidence of reinforcement must come from genuinely independent sources** |

---

## Core Principle

> Validation is never automatic.
>
> Evidence opens the door.
>
> A human authority decides whether to walk through it.

---

## The Question This Principle Governs

A concept can be reinforced five times by the same reviewer at the same venue, in five separate governance records.

This is structurally identical to five reinforcements from five venues, five DCs, and five reviewers.

The system currently cannot distinguish these cases.

**This principle governs what independence means in the context of reinforcement.**

---

## What Is an Independent Source?

Independence has three dimensions. Not all three need to be satisfied for every scope,
but all three must be understood before thresholds are set.

### Dimension 1 — Reviewer Independence

The simplest check. Did different named people approve the reinforcements?

A concept reinforced five times with `approvedBy: "Hospitality HQ"` is less independently
confirmed than one reinforced with five different named reviewers.

**Minimum viable independence check:** Multiple distinct `approvedBy` values across
reinforcement records, where no single reviewer accounts for more than one reinforcement.

**Limitation:** Reviewer independence does not guarantee context independence.
Five colleagues at the same Hospitality HQ may all be validating the same concept
from the same DC at the same venue.

---

### Dimension 2 — DC and Venue Independence

A concept confirmed by five DCs at five different venues carries different evidence
than five confirmations from one DC at one venue.

**This requires carrying DC identity and venue identity through the learning chain.**

Currently, `ConceptProvenanceRecord.provenance[]` carries:
```
["learning:...", "reflection:...", "action:...", "execution:..."]
```

It does not carry DC ID or venue ID. These cannot be verified at the provenance level today.

**This dimension is deferred until provenance carries originating context.**

---

### Dimension 3 — Context Independence

A concept confirmed during busy service at large urban venues is less broadly validated
than one confirmed across busy service, quiet periods, rural venues, and small teams.

Context independence requires tracking operational conditions at confirmation time.
Not currently tracked. A future concern.

---

## What Does Not Count as Independent Reinforcement

**The original creator of a concept may not count as an independent reinforcement source.**

A concept's `createdBy` value should be excluded from the independent reinforcement count.
The person who proposed the concept has an inherent confirmation bias toward it.

Self-reinforcement is not independence.

**The original governance reviewer of a concept may not count as independent reinforcement.**

If the person who approved `changeIntent: "create"` is the same person who later approves
`changeIntent: "reinforce"` — without evidence from another source — this is a single
opinion expressed twice. Not two independent opinions.

**Note:** These are recommendations, not invariants. A governance authority may decide
that a repeat reviewer is acceptable given sufficient other evidence. But the default
assumption is: the same named reviewer does not constitute independent confirmation.

---

## Are Thresholds Different by Inheritance Scope?

Yes. The further knowledge travels, the broader the evidence should be.

| Scope | Threshold guidance |
|---|---|
| Session | No reinforcement required — ephemeral |
| Venue | Minimum 1 reinforcement from a reviewer other than the creator |
| Profession | Minimum N reinforcements from N distinct reviewers (N is profession-defined) |
| Universal | Constitutional review — independent of profession-level governance |

**These thresholds are not hardcoded.** They are governance configuration decisions
made by the relevant authority at each scope level. The principle governs the shape;
the authority governs the specific numbers.

---

## Is Validation Ever Automatic?

**No.**

When the minimum reinforcement threshold is met, the system:
- Surfaces the evidence (`getTrustSummary()`)
- Flags that promotion criteria may be met
- Does not promote automatically

A named authority reviews the evidence and decides whether to approve promotion.

This is consistent with the architecture throughout:
- `evaluateGuard()` checks conditions; a human caller decides whether to apply
- `KnowledgeGovernanceEngine` requires explicit `reviewedBy` and `reviewedAt`
- `getTrustSummary()` surfaces evidence; it does not act

The threshold is a gate, not a trigger.

---

## The Minimum Implementation Required

When implementation of the governed promotion path begins:

1. A `promoteConceptToValidated()` path — separate from the general update path
2. The path checks reinforcement count against configured threshold
3. The path checks that distinct `approvedBy` values meet the independence requirement
4. The path checks that `createdBy` is not the sole source of reinforcements
5. A named authority provides `reviewedBy` and `reviewedAt` for the promotion
6. The promotion is recorded as a `ConceptProvenanceRecord` with explicit promotion intent

The specific threshold values are governance configuration — not developer constants.

---

## Preserved Insight

> Evidence of reinforcement must come from sources that could, in principle,
> have reached a different conclusion.

A source that cannot disagree is not independent.

A reviewer who has every reason to confirm a concept — because they proposed it —
is not independent.

The value of independence is not in the count. It is in the possibility of contradiction.

Five independent reviewers who could have said "no" but said "yes" is worth
more than fifty confirmations from a single unchallenged source.
