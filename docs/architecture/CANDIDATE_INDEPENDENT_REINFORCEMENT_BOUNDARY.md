# CANDIDATE — Independent Reinforcement Boundary

**Date:** 2026-08-06
**Status:** Candidate — Governance Analysis
**Depends on:** PD-013 — Knowledge Trust Requires Renewal; MILESTONE_053_IMPLEMENTATION_PLAN.md (Step 4, explicitly deferred)

---

## The Question Being Governed

> Is reinforcement from one source, repeated multiple times,
> equivalent to reinforcement from multiple independent sources?

This question must be answered before the `"candidate"` → `"validated"` promotion path
can be implemented.

---

## Why This Matters

`Concept.lastReinforcedAt` records when a concept was last confirmed.
`ConceptProvenanceRecord` stores each reinforcement record.

But neither records whether reinforcements came from independent sources.

Five reinforcements from the same venue, the same DC, and the same reviewer is
structurally identical to five reinforcements from five different venues, DCs,
and reviewers — in the current data model.

If "multi-source" evidence level means anything, it must mean confirmed by more
than one independent source. Otherwise a single DC at a single venue could
promote a concept to `"validated"` with five self-referential confirmations.

---

## Existing Architecture Affected

| Component | Current state | Gap |
|---|---|---|
| `Concept.evidenceLevel: "multi-source"` | Declared by caller; not verified | Does not check source count or independence |
| `ConceptProvenanceRecord.approvedBy` | Records the reviewer name | Not guaranteed to be distinct across records |
| `ConceptProvenanceRecord.provenance[]` | Carries `"learning:...", "execution:..."` IDs | Does not carry DC identity or venue ID |
| `evaluateGuard()` Invariant 6 | Blocks single-source from profession inheritance | Does not verify multi-source claim |
| `Concept.lastReinforcedAt` | Records most recent reinforcement | Does not record source of reinforcement |

---

## The Four Source Independence Questions

### Question 1 — What counts as an independent source?

Options (from most to least stringent):

a) Different venue AND different DC AND different operational context
b) Different venue OR different DC (either sufficient)
c) Different named reviewer (regardless of venue or DC)
d) Different governance record ID (regardless of anything else)

Option (d) is the current de facto standard — every governance record counts as one
reinforcement regardless of source.

**Assessment:** Option (c) — different named reviewer — is likely the minimum viable
independence check. Multiple reviewers from the same Profession HQ reviewing the same
concept from the same DC is still meaningfully less independent than two DCs at different
venues independently producing the same learning.

However, tracking reviewer independence is achievable with current data.
Tracking DC/venue independence requires additional provenance fields not yet implemented.

**Recommended initial standard:** A minimum of N distinct `approvedBy` values across
reinforcement records, where `approvedBy` is not the concept's original `createdBy` value.

---

### Question 2 — Does venue context matter?

A concept validated only during busy service periods at large urban venues may not apply
during quiet periods at rural venues.

Context breadth is not currently tracked in provenance. Adding it would require carrying
operational context (venue type, service period, staffing conditions) through the learning
chain — currently absent from `ReflectionContext` and `ConceptProvenanceRecord`.

**Recommendation:** Venue/context independence is deferred. The initial promotion threshold
should use reviewer independence as a practical proxy. A future milestone should add
operational context to provenance when the governance architecture is ready.

---

### Question 3 — What is the minimum reinforcement count?

This is a governance configuration question, not a code question.

Candidates:
- **N = 3:** Three independent confirmations from distinct reviewers before promotion
- **N = 5:** Higher confidence threshold, appropriate for profession-wide inheritance
- **N = profession-defined:** Hospitality HQ sets a different threshold than Healthcare HQ

**Recommendation:** The threshold should be governance-configurable, not hardcoded.
The initial implementation should accept a `minimumReinforcementCount` parameter
rather than an embedded constant. The governance authority for each profession sets the value.

---

### Question 4 — Does the original creator count as a reinforcement source?

**Recommendation:** No. The concept's `createdBy` value should be excluded from
the independent reinforcement count. Self-reinforcement is not independence.

---

## Decisions That Must Not Become Developer Assumptions

| Decision | Belongs to |
|---|---|
| What counts as an independent source | Governance — before implementation |
| What the minimum reinforcement count is | Governance configuration — profession-specific |
| Whether the original creator can reinforce | Governance — recommendation: no |
| Whether context breadth is required | Governance — deferred to future milestone |

---

## What Should Remain Human Judgement

**The promotion decision itself.** Even when the minimum reinforcement threshold is met,
a named authority reviews the promotion request. The system surfaces the evidence:
- `reinforcementCount`
- distinct `approvedBy` values
- `lastReinforcedAt`
- `challengedBy`

The reviewer decides. The threshold is a minimum gate, not an automatic promotion.

---

## Future Implementation Boundaries

When implementation proceeds:

1. A `promoteConceptToValidated()` method on `KnowledgeGraph` (or `KnowledgeGraphMutation`)
2. The method checks `reinforcementCount >= configuredThreshold`
3. The method checks that at least N distinct `approvedBy` values exist in reinforcement records
4. The method checks that `createdBy` is not the sole source of reinforcements
5. A named authority must provide `reviewedBy` for the promotion record
6. The promotion is recorded as a `ConceptProvenanceRecord` with a new `"validate"` or `"promote"` intent
7. The `minimumReinforcementCount` and threshold logic are governance-configurable, not hardcoded

**Must not be implemented until governance defines:**
- The minimum reinforcement count per scope
- The independence standard to be applied
- The named authorities eligible to approve promotions at each scope level
