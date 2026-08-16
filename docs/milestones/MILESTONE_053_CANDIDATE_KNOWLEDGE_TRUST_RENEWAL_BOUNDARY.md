# MILESTONE_053_CANDIDATE — Knowledge Trust Renewal Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- MILESTONE_052_REPOSITORY_ANALYSIS.md — audit complete ✓
- PD-013 — Knowledge Trust Requires Renewal ✓
- PD-014 — Trust Is Evidenced, Not Scored ✓
- Milestone 043 — Governance chain proven ✓
- Milestone 051 — Inheritance scope proven ✓

**The Governing Question:**
> How does Helping Hand know when existing knowledge should continue to be trusted,
> challenged, updated, or retired?

**The Governing Constraint:**
No trust score. The system retains reasons, not numbers.

---

## The Distinction This Milestone Must Preserve

```
Information:   "This concept exists."
Knowledge:     "This concept has evidence."
Understanding: "This concept explains something."
Wisdom:        "This concept has survived challenge and remains appropriate."
```

Milestone 052 proved that every approved concept currently sits between
Information and Knowledge on this ladder. Nothing in the architecture surfaces
where it stands. This milestone defines what is needed to answer that question
without collapsing the answer into a score.

---

## 1. The Reinforcement Lifecycle — Current and Missing

### What the system currently knows

`ConceptProvenanceStore.getHistory(id)` returns all provenance records.
Filtering for `changeIntent === "reinforce"` gives:
- The count of reinforcements
- The timestamp of each
- The governance record ID of each
- The `approvedBy` value for each

This data exists. It is not surfaced on the `Concept` directly.

### What the system cannot currently distinguish

**Five independent venues confirmed this** versus **the same venue confirmed this five times.**

Both produce five `"reinforce"` records in the provenance store with the same structure.

The `approvedBy` field records the reviewer (e.g. `"Hospitality HQ"`) — not the originating
DC, venue, or operational context.

The `provenance` array carries `"execution:...", "reflection:..., "learning:..."` IDs.
It does not carry venue ID or DC identity at the execution that produced the reinforcing learning.

**To distinguish independent confirmation from repeated confirmation, the provenance chain
would need to carry the originating context (DC identity, venue ID) through from
`Execution` to `ConceptProvenanceRecord`.**

This is not a Milestone 053 implementation target — it is a boundary the milestone
must acknowledge and explicitly defer. For now, independence is a reviewer responsibility,
not a system verification.

### The smallest reinforcement addition

`Concept.lastReinforcedAt?` — set by `KnowledgeGraphMutation.updateConcept()` only when
`provenance.changeIntent === "reinforce"`. Additive. All other intents leave it unchanged.

This surfaces on the concept what was already computable from provenance history.

---

## 2. The Contradiction Lifecycle — Current and Missing

### How contradiction currently enters the system

A DC experiences a situation that contradicts an existing concept. The learning cycle runs.
`LearningEngine` produces `LearningProposal { whatShouldChange: "..." }`.
`KnowledgeGovernanceEngine` approves it with `changeIntent: "create"` or `"supersede"`.
`applyApprovedChange()` calls `addConcept()` or `updateConcept()`.

**At no point does the system check whether the new proposal conflicts with an existing concept.**

The caller decides whether to use `"supersede"` (which requires `targetKnowledgeId`).
If the caller uses `"create"` for a concept that contradicts an existing one, both
coexist in `KnowledgeGraph` with no structural link between them.

### What contradiction types exist

| Type | Current handling | Gap |
|---|---|---|
| **Supersession** — new concept explicitly replaces old | `changeIntent: "supersede"` + `targetKnowledgeId` | ✓ supported; requires caller awareness |
| **Contradiction** — new evidence conflicts; old may still hold in some contexts | No specific intent | ✗ — falls through as `"create"` or `"update"` |
| **Refinement** — new evidence narrows the scope of existing concept | No specific intent | ✗ — falls through as `"update"` |
| **Context exception** — existing concept holds generally; new experience is an exception | No mechanism | ✗ — not representable |

### The smallest contradiction addition

`Concept.challengedBy?: string[]` — governance record IDs of proposals that were
identified (by the reviewer) as conflicting with this concept.

This requires a corresponding input: `ConceptProvenanceInput.conflictsWithConceptId?` —
an optional field the reviewer can set when approving a change that challenges an
existing concept. When set, `KnowledgeGraphMutation` adds the governance record ID
to the target concept's `challengedBy`.

This is reviewer-initiated. The system does not detect contradiction automatically.
Per PD-014: the system retains reasons; the reviewer provides judgement.

---

## 3. Knowledge Decay — What Evidence Triggers Review

Do not assume age equals invalidity.

A concept may go years without reinforcement because it describes something stable.
A concept may be reinforced last week but be wrong because conditions changed.

Age is not the signal. **Absence of reinforcement in the context of new experience is the signal.**

The question is: has the environment produced new experiences that should have touched this concept — and didn't?

The system cannot currently answer this. It would require knowing:
- Which concepts should have been reinforced when a DC operated in a relevant context
- Whether those DCs actually reinforced those concepts

This is future capability. The milestone must acknowledge the boundary.

### What the system can currently detect for decay

| Signal | Detectable now? | How |
|---|---|---|
| Time since last reinforcement | Partially | Query provenance for last `"reinforce"` record |
| Number of governance cycles since last reinforcement | Partially | Count governance records since last `"reinforce"` |
| Whether the concept has been reinforced at all | Yes | `getHistory(id).filter(r => r.changeIntent === "reinforce").length` |
| Whether environmental conditions have changed | No | `VenueKnowledgeProfile` not connected to concept validation |

### The smallest decay addition

`lastReinforcedAt` (from reinforcement addition above) enables a read-only query:
`getTrustSummary(id)` can compute `daysSinceLastReinforcement` and set
`requiresReview: true` when:
- `lastReinforcedAt` is more than a threshold period ago, AND
- `challengedBy` is non-empty, OR
- The concept has `status: "validated"` but `reinforcementCount === 0`
  (validated without independent confirmation)

---

## 4. The Retirement Boundary — Trigger vs Mechanism

### What currently exists

`retireConcept()` → `status: "deprecated"`. The mechanism works.
`changeIntent: "retire"` routes correctly. History is preserved.

### What is missing

**The trigger.** Nothing in the system proactively identifies concepts that should be
reviewed for retirement. Retirement currently happens only when a human decides to propose it.

`getTrustSummary(id).requiresReview` (above) is the bridge. It does not retire the concept.
It surfaces the signal that prompts a reviewer to consider whether retirement is appropriate.

**Retirement is always a human decision.** Per PD-010 — authority requires context.
No system-derived signal should trigger automatic retirement.

---

## 5. Two Trust Questions — Kept Separate

### A — Concept Trust

> "Should this knowledge be trusted today?"

The minimum evidence the system must retain:

```typescript
interface ConceptTrustEvidence {
  lastReinforcedAt?: string;            // when this was independently confirmed
  reinforcementCount: number;           // how many reinforcement cycles
  challengedBy: string[];               // governance IDs of conflicting proposals
  challengeResolutions: string[];       // governance IDs of how challenges were resolved
  status: ConceptStatus;                // current lifecycle state
  evidenceLevel: EvidenceLevel;         // breadth of evidence declared
}
```

No score. The reviewer reads the evidence and decides.

### B — Helping Hand Trust

> "Should people trust Helping Hand?"

Evidence that belongs to **relationship history**, not `KnowledgeGraph`:

- Continued usage and return
- Willingness to share context (signal of relationship depth)
- DC admitting uncertainty when it does not know
- Successful outcomes over time
- Avoided harm
- Transparency in explaining understanding

**This does not belong in `Concept`, `KnowledgeGraph`, or any knowledge governance type.**

It belongs in `PersonContextStore` (relationship memory) and future
outcome tracking that has not yet been designed.

The two questions must never share a data structure.
Conflating them would mean a DC with rich professional knowledge but poor human relationship
behaviour would appear "trusted" — which is precisely wrong.

---

## 6. The Smallest Architectural Boundary

The minimum Helping Hand must retain to answer "why should I trust this understanding today?"
without collapsing to a score:

### Immediate (Milestone 053)

**`Concept.lastReinforcedAt?`**
One field. One selective mutation. Surfaces what provenance already contains.

**`Concept.challengedBy?: string[]`**
One field. Populated by reviewer-initiated input. Records that a challenge exists.

**`KnowledgeGraph.getTrustSummary(conceptId)`**
One read-only method. No new data. Composes existing provenance + the two new fields
into a structured picture:

```typescript
interface ConceptTrustSummary {
  conceptId: string;
  status: ConceptStatus;
  evidenceLevel: EvidenceLevel;
  reinforcementCount: number;
  lastReinforcedAt?: string;
  daysSinceLastReinforcement?: number;
  challengedBy: string[];
  requiresReview: boolean;
}
```

### Deferred (future milestones)

- Source independence tracking (requires DC/venue context in provenance)
- Context breadth (requires operational context carried through learning chain)
- Outcome history (requires connection from concept usage back to execution outcomes)
- HH trust tracking (belongs in relationship layer, not knowledge layer)

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — `lastReinforcedAt` updated on `"reinforce"`, unchanged on `"update"` | Edit ≠ confirmation |
| PC2 — `lastReinforcedAt` not updated on `"supersede"` or `"retire"` | Only reinforcement counts |
| PC3 — `challengedBy` receives a governance ID when reviewer flags conflict | Contradiction is recorded |
| PC4 — `challengedBy` is not modified by non-conflicting operations | Only challenges are recorded |
| PC5 — `getTrustSummary()` returns correct `reinforcementCount` from history | Data composes correctly |
| PC6 — `getTrustSummary()` returns `requiresReview: true` when challenged | Trust signals surface |
| PC7 — `getTrustSummary()` returns `requiresReview: true` for zero-reinforcement `"validated"` | Ungoverned promotion is flagged |
| PC8 — `evaluateGuard()` Invariant 1 still exempts constitutional concepts | Existing protection unchanged |
| PC9 — All existing tests pass | No regressions |

---

## What Must Not Be Modified

| Component | Reason |
|---|---|
| `evaluateGuard()` | Existing invariants unchanged |
| `applyApprovedChange()` | Governance approval flow unchanged |
| `KnowledgeGovernanceEngine` | No change to approval logic |
| `form()` | Formation receives concepts as before |
| `LearningEngine` | No change |
| `PersonContextStore` | HH trust evidence lives here; not in KnowledgeGraph |

---

## Summary

The system already contains most of what it needs. The provenance store has the history.
The mutation layer has the intents. The retirement mechanism exists.

What it lacks is:

1. **A surface.** `Concept.lastReinforcedAt` surfaces what provenance already knows.
2. **A link.** `Concept.challengedBy` links conflicting proposals to the concepts they challenge.
3. **A window.** `KnowledgeGraph.getTrustSummary()` composes both into a readable trust picture.

No trust score. No automated decisions. No retirement without human review.

The system remembers the reasons. The reviewer decides.

> Trust, like character, is not a number.
> It is a record of how something has behaved under pressure.
