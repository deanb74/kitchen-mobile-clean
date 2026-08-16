# MILESTONE_052_CANDIDATE — Concept Trust Lifecycle Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- PD-013 — Knowledge Trust Requires Renewal ✓
- PD-012 — Knowledge Inheritance Boundary ✓
- Milestone 051 — Inheritance scope proven ✓
- Milestone 043 — Governance chain proven ✓

**The Question:**
> How does Helping Hand know that inherited knowledge continues to deserve trust?

---

## What the Architecture Currently Has

| Component | Exists | Status |
|---|---|---|
| `Concept.status: "candidate" \| "validated" \| "core-principle" \| "deprecated"` | ✓ | Lifecycle states exist |
| `changeIntent: "reinforce"` | ✓ | Strengthening mechanism exists |
| `changeIntent: "retire"` | ✓ | Retirement mechanism exists |
| `changeIntent: "supersede"` | ✓ | Replacement mechanism exists |
| `ConceptProvenanceRecord` | ✓ | Full history per concept |
| `KnowledgeGraph.getConceptHistory()` | ✓ | History is accessible |
| `Concept.createdAt` / `updatedAt` | ✓ | Basic timestamps |
| `Concept.lastReinforcedAt` | ✗ | Not present |
| `Concept.challengedBy` | ✗ | Not present |
| Promotion path: `"candidate"` → `"validated"` | ✗ | Status exists; governance does not |
| Contradiction detection | ✗ | Not present |
| Staleness flag / review trigger | ✗ | Not present |

---

## The Four Lifecycle Transitions That Need Governing

### Transition 1 — Candidate → Validated

**Current state:** `Concept.status === "candidate"` after initial governance approval.
`"validated"` exists as a status but nothing promotes to it.

**What promotion should require:**
- Minimum independent reinforcement count (e.g., 3 separate `"reinforce"` governance records)
- Minimum source diversity (different DCs, different venues, different contexts)
- Named authority sign-off on the promotion decision

**Currently missing:** A `promoteToValidated()` path in the governance chain.
The concept status field exists; the governed trigger does not.

---

### Transition 2 — Reinforcement Record

**Current state:** `changeIntent: "reinforce"` creates a new `ApprovedKnowledgeGovernanceRecord`
and calls `applyApprovedChange()` which calls `updateConcept()`.

`updateConcept()` sets `updatedAt` on the concept. But `updatedAt` changes on every
governance operation — reinforce, update, supersede. It does not distinguish "this concept
was independently confirmed again" from "this concept's text was edited."

**What reinforcement should record:**
`lastReinforcedAt` — updated only when `changeIntent === "reinforce"`.
Not on update, not on supersede. Only on independent confirmation.

**Currently missing:** The `lastReinforcedAt` field on `Concept` and the mutation logic
to set it selectively on `"reinforce"` intent.

---

### Transition 3 — Contradiction Challenge

**Current state:** Nothing connects a new learning to an existing concept it may contradict.
A reviewer approving a `"create"` intent for a concept with similar scope and profession
to an existing concept has no structural signal that a conflict may exist.

**What contradiction detection should provide:**
When a new `ApprovedKnowledgeChange` is governed with `intent: "create"` or `intent: "update"`,
and the proposed content has semantic overlap with an existing concept's definition,
the governance record should note `potentialConflictWith?: string[]` — concept IDs.

This is not an automated decision. It is information for the reviewer.

**What challenged concepts should carry:**
`challengedBy?: string[]` — governance record IDs of proposals assessed as conflicting.
This allows future reviewers and DCs to know that this concept has been questioned.

**Currently missing:** Both the detection mechanism and the `challengedBy` field.

---

### Transition 4 — Staleness and Retirement Review

**Current state:** `changeIntent: "retire"` can be proposed and approved. `status: "deprecated"`
exists. Nothing in the system proactively identifies concepts at risk of staleness.

**What review triggers should detect:**
- `lastReinforcedAt` is more than N governance cycles ago
- `challengedBy` is non-empty and unresolved
- The concept's `inheritsTo` scopes have concepts with newer `createdAt` covering the same ground
- Environmental conditions tracked at `validatedInContexts` no longer match current venue profiles

**Currently missing:** `lastReinforcedAt`, `challengedBy`, and a review-trigger mechanism.

---

## The Smallest Implementation

Per the established pattern: carrier fields first, detection logic second.

### Step 1 — Add `lastReinforcedAt` to `Concept`

```typescript
// lib/knowledge/Concept.ts
interface Concept {
  // ...existing fields...
  lastReinforcedAt?: string;   // set by KnowledgeGraphMutation on "reinforce" intent only
}
```

`KnowledgeGraphMutation.updateConcept()` sets this only when `provenance.changeIntent === "reinforce"`.
All other intents leave it unchanged.

---

### Step 2 — Add `challengedBy` to `Concept`

```typescript
// lib/knowledge/Concept.ts
interface Concept {
  // ...existing fields...
  challengedBy?: string[];     // governance record IDs of proposals that conflict with this concept
}
```

`KnowledgeGraphMutation` adds to `challengedBy` when a governance record carries
`conflictsWithConceptId` pointing to this concept.

---

### Step 3 — Selective `lastReinforcedAt` update in `KnowledgeGraphMutation`

In `updateConcept()`:
```typescript
if (provenance.changeIntent === "reinforce") {
  updated.lastReinforcedAt = new Date().toISOString();
}
```

---

### Step 4 — `ConceptTrustSummary` query on `KnowledgeGraph`

A read-only method that returns trust metadata for a concept:

```typescript
// lib/knowledge/KnowledgeGraph.ts
getTrustSummary(conceptId: string): ConceptTrustSummary

interface ConceptTrustSummary {
  conceptId: string;
  status: ConceptStatus;
  evidenceLevel: EvidenceLevel;
  reinforcementCount: number;          // count from ConceptProvenanceRecord
  lastReinforcedAt?: string;
  challengedBy: string[];
  daysSinceLastReinforcement?: number;
  requiresReview: boolean;             // true when challenged or stale
}
```

This is read-only. It does not modify the concept. It surfaces the trust picture.

---

## Frozen Boundaries

**Boundary 1 — No concept automatically loses `"validated"` status.**

Status transitions require human review. The system flags; the reviewer decides.

**Boundary 2 — `"core-principle"` + `"constitutional"` concepts are exempt.**

Per `evaluateGuard()` Invariant 1 — these are immutable. They do not require renewal
because they are foundational to all DC operation.

**Boundary 3 — `challengedBy` is informational, not automatic rejection.**

A challenged concept continues to inform formation until a reviewer decides otherwise.
The flag enables informed review; it does not override trust.

**Boundary 4 — `lastReinforcedAt` tracks independent confirmation only.**

Updates, supersessions, and edits do not count. Only `changeIntent: "reinforce"`.
The distinction between "this concept was edited" and "this concept was independently
confirmed again" is architecturally significant.

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — `lastReinforcedAt` updated on `"reinforce"` intent | Reinforcement is tracked distinctly |
| PC2 — `lastReinforcedAt` NOT updated on `"update"` intent | Edit ≠ confirmation |
| PC3 — `challengedBy` receives a governance record ID when flagged | Contradiction is recorded |
| PC4 — `getTrustSummary()` returns correct `reinforcementCount` | History is queryable |
| PC5 — `getTrustSummary()` returns `requiresReview: true` when challenged | Trust flags surface |
| PC6 — `evaluateGuard()` Invariant 1 still exempts constitutional concepts | Existing safety net unchanged |
| PC7 — All existing tests pass | No regressions |

---

## What Must Not Be Modified

| Component | Reason |
|---|---|
| `evaluateGuard()` | No change — existing invariants preserved |
| `applyApprovedChange()` | No change — governance chain unchanged |
| `KnowledgeGovernanceEngine` | No change — approval flow unchanged |
| `form()` | No change — formation receives concepts as before |
| Any DC-specific component | No change |

---

## The Sequence

```
Milestone 043 — Knowledge enters safely
Milestone 044 — Knowledge improves future understanding
Milestone 045 — The DC can listen
Milestone 046 — The DC remembers people respectfully
Milestone 047 — The DC carries why it knows something
Milestone 048 — Understanding is self-aware
Milestone 049 — Authority is grounded in judgement
Milestone 050 — Learning carries why it changed
Milestone 051 — Learning proposes where it should travel
Milestone 052 — Knowledge carries how long it has been trusted
```

After Milestone 052, a concept in `KnowledgeGraph` can answer:

> "I was last independently confirmed on this date. These governance records have challenged
> me. I have been reinforced N times by independent sources. My trust status is current."

A concept that cannot answer these questions is not governed knowledge.

It is institutional memory — which is a different thing entirely.

The Oak knows which rings are recent and which are old.

The new question is whether the old ones still hold.
