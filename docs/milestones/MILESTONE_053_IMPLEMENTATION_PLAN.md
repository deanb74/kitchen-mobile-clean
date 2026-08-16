# MILESTONE_053_IMPLEMENTATION_PLAN — Knowledge Trust Renewal

**Date:** 2026-08-06
**Status:** Implementation Plan — Ready to Execute
**Depends on:**
- PD-014 — Trust Is Evidenced, Not Scored ✓
- MILESTONE_053_CANDIDATE_KNOWLEDGE_TRUST_RENEWAL_BOUNDARY.md ✓
- MILESTONE_052_REPOSITORY_ANALYSIS.md ✓

**Goal:**
Make Helping Hand able to explain why knowledge deserves trust.

**Not the goal:**
Making knowledge trusted. No trust score. No automated promotion or retirement.

---

## Pre-Implementation Report

### Files to change

| File | Change |
|---|---|
| `lib/knowledge/Concept.ts` | Add `lastReinforcedAt?` and `challengedBy?` fields |
| `lib/knowledge/KnowledgeGraphMutation.ts` | Set `lastReinforcedAt` selectively on `"reinforce"` intent; populate `challengedBy` when input carries a conflict |
| `lib/knowledge/ConceptProvenanceRecord.ts` | Add `conflictsWithConceptId?` to `ConceptProvenanceInput` |
| `lib/knowledge/KnowledgeGraph.ts` | Add `getTrustSummary(conceptId)` read-only method |

### New types required

```typescript
// lib/knowledge/KnowledgeGraph.ts
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

No trust score. No numeric trust value. Evidence only.

### Existing architecture reused

- `ConceptProvenanceStore.getHistory(id)` — reinforcement count and last reinforcement
  are already computable from existing records. This implementation surfaces them.
- `KnowledgeGraphMutation.updateConcept()` — the selective `lastReinforcedAt` update
  is one conditional inside the existing method.
- `KnowledgeGraph.getConceptHistory()` — already exposed; `getTrustSummary()` builds on it.

### Intentionally deferred

- **Candidate → Validated promotion path** — see Step 4. This requires governance
  design decisions that are not code decisions. Deferred explicitly.
- **Source independence tracking** — distinguishing "five venues confirmed this" from
  "one venue confirmed this five times" requires DC/venue context in provenance records.
  Not in scope for this milestone.
- **Context breadth** — operational conditions at confirmation time.
  Not tracked in current provenance. Future milestone.
- **Outcome history** — connecting concept usage back to execution outcomes.
  Architecturally possible but requires a new tracing mechanism. Future milestone.
- **Helping Hand trust** — lives in the relationship layer / `PersonContextStore`.
  Must not enter `KnowledgeGraph`. Not in scope.

---

## Pre-Implementation Confirmation

All of the following must remain unchanged after implementation:

| Component | File | Unchanged |
|---|---|---|
| `evaluateGuard()` | `lib/knowledge-governance/writeGuard.ts` | ✓ No changes |
| `applyApprovedChange()` | `lib/knowledge-governance/applyApprovedChange.ts` | ✓ No changes |
| `KnowledgeGovernanceEngine` | `lib/knowledge-governance/KnowledgeGovernanceEngine.ts` | ✓ No changes |
| `form()` | `platform/cos/understanding-formation/formation.ts` | ✓ No changes |
| `LearningEngine` | `lib/learning/LearningEngine.ts` | ✓ No changes |
| `PersonContextStore` | `lib/annie/relationship/PersonContextStore.ts` | ✓ No changes |

All 268 existing tests must pass after every step.

---

## Step 1 — `Concept.lastReinforcedAt`

**File:** `lib/knowledge/Concept.ts`

**Add one optional field:**
```typescript
interface Concept {
  // ... existing fields ...
  lastReinforcedAt?: string;   // set only when changeIntent is "reinforce" — not on update/supersede/retire
}
```

**File:** `lib/knowledge/KnowledgeGraphMutation.ts`

**In `updateConcept()`, add one conditional:**
```typescript
const updated: Concept = {
  ...proposed,
  id,
  createdAt: previous.createdAt,
  createdBy: previous.createdBy,
  updatedAt: new Date().toISOString(),
  // Preserve existing lastReinforcedAt unless this is a reinforce operation.
  lastReinforcedAt:
    provenance.changeIntent === "reinforce"
      ? new Date().toISOString()
      : previous.lastReinforcedAt,
};
```

**Why this matters:**
`updatedAt` changes on every governance operation. `lastReinforcedAt` changes only
when another DC independently confirmed the same pattern. These are different events.
"Edited" and "independently confirmed" must not look the same on a Concept.

---

## Step 2 — `Concept.challengedBy` and `ConceptProvenanceInput.conflictsWithConceptId`

**File:** `lib/knowledge/Concept.ts`

**Add one optional field:**
```typescript
interface Concept {
  // ... existing fields ...
  lastReinforcedAt?: string;
  challengedBy?: string[];     // governance record IDs of proposals that questioned this concept
}
```

**File:** `lib/knowledge/ConceptProvenanceRecord.ts`

**Add one optional field to `ConceptProvenanceInput`:**
```typescript
interface ConceptProvenanceInput {
  governanceId: string;
  changeIntent: ApprovedKnowledgeChangeIntent;
  approvedBy: string;
  provenance: ReadonlyArray<string>;
  conflictsWithConceptId?: string;   // optional: set by reviewer when this proposal challenges an existing concept
}
```

**File:** `lib/knowledge/KnowledgeGraphMutation.ts`

**In `addConcept()` and `updateConcept()`, after the main mutation:**
```typescript
if (provenance.conflictsWithConceptId) {
  const challenged = this.getFromIndex(provenance.conflictsWithConceptId);
  if (challenged) {
    const existing = challenged.challengedBy ?? [];
    // Prevent duplicate IDs.
    if (!existing.includes(provenance.governanceId)) {
      this.upsertToIndex({
        ...challenged,
        challengedBy: [...existing, provenance.governanceId],
      });
    }
  }
}
```

**What a challenge means:**
A challenge records "this governance decision questioned this concept."
It does not mean "this concept is wrong."
A concept with challenges requires review. It does not require deletion.
The reviewer decides.

---

## Step 3 — `KnowledgeGraph.getTrustSummary()`

**File:** `lib/knowledge/KnowledgeGraph.ts`

**Add `ConceptTrustSummary` type:**
```typescript
export interface ConceptTrustSummary {
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

**Add read-only method:**
```typescript
getTrustSummary(conceptId: string): ConceptTrustSummary {
  const concept = this.requireConcept(conceptId);
  const history = this.getConceptHistory(conceptId);

  const reinforcementCount = history.filter(
    (r) => r.changeIntent === "reinforce"
  ).length;

  const daysSinceLastReinforcement =
    concept.lastReinforcedAt
      ? Math.floor(
          (Date.now() - new Date(concept.lastReinforcedAt).getTime()) /
          (1000 * 60 * 60 * 24)
        )
      : undefined;

  const challenged = concept.challengedBy ?? [];

  const requiresReview =
    challenged.length > 0 ||
    (concept.status === "validated" && reinforcementCount === 0);

  return {
    conceptId,
    status: concept.status,
    evidenceLevel: concept.evidenceLevel,
    reinforcementCount,
    lastReinforcedAt: concept.lastReinforcedAt,
    daysSinceLastReinforcement,
    challengedBy: challenged,
    requiresReview,
  };
}
```

**What `requiresReview: true` means:**
A signal for the reviewer, not an instruction to the system.
The system never acts on this automatically.

---

## Step 4 — Candidate → Validated Boundary

**This step is intentionally deferred. No implementation.**

The audit confirmed that `"candidate"` → `"validated"` is currently caller-supplied and ungoverned.

Governing this promotion requires decisions that are not code decisions:

- **What is the minimum reinforcement count?** (e.g. 3? 5? profession-dependent?)
- **Must reinforcements come from independent sources?** (requires source-independence tracking, which is deferred)
- **What context breadth is required?** (not yet tracked)
- **Which authority signs off on promotion?** (profession HQ? Helping Hand HQ? DC + venue manager?)

These are governance design questions. They belong in a future candidate document, not this implementation.

**What this plan records for future implementers:**

When a `"validate"` promotion path is built, it should:
1. Check `getTrustSummary(id).reinforcementCount >= minimumThreshold`
2. Require a named authority in `reviewedBy` distinct from all previous `approvedBy` on the concept
3. Not accept a promotion from the same source that originally created the concept
4. Record the promotion as a `ConceptProvenanceRecord` with a new `"promote"` or `"validate"` intent

---

## Execution Order

1. Step 1 — Add `lastReinforcedAt` to `Concept` → run `npx jest`
2. Step 1b — Update `KnowledgeGraphMutation.updateConcept()` → run `npx jest`
3. Step 2a — Add `challengedBy` to `Concept` → run `npx jest`
4. Step 2b — Add `conflictsWithConceptId` to `ConceptProvenanceInput` → run `npx jest`
5. Step 2c — Wire conflict detection in mutation layer → run `npx jest`
6. Step 3a — Add `ConceptTrustSummary` type to `KnowledgeGraph.ts` → run `npx jest`
7. Step 3b — Implement `getTrustSummary()` → run `npx jest`
8. Tests — write and run proof conditions → run full suite

---

## Proof Conditions

| PC | Test | What it proves |
|---|---|---|
| PC1 | `"reinforce"` intent → `lastReinforcedAt` is set | Confirmation is tracked |
| PC2 | `"update"` intent → `lastReinforcedAt` unchanged | Edit ≠ confirmation |
| PC3 | `"retire"` intent → `lastReinforcedAt` unchanged | Retirement ≠ confirmation |
| PC4 | `conflictsWithConceptId` → `challengedBy` on target concept | Challenge relationship recorded |
| PC5 | `getTrustSummary()` returns correct `reinforcementCount` from provenance | Evidence composes correctly |
| PC6 | Challenged concept → `requiresReview: true` | Trust signals surface |
| PC7 | `"validated"` with zero reinforcements → `requiresReview: true` | Ungoverned promotion is visible |
| PC8 | Constitutional concept → `getTrustSummary()` works; `evaluateGuard()` still blocks updates | Existing protection unchanged |
| PC9 | All 268 existing tests pass | No regressions |

---

## Definition of Done

- All nine proof conditions pass as automated tests
- All 268 existing tests still pass
- `Concept.lastReinforcedAt` is only set on `"reinforce"` intent
- `Concept.challengedBy` is populated when reviewer-supplied `conflictsWithConceptId` is present
- `getTrustSummary()` returns structured evidence without any numeric trust value
- No engine was modified
- Candidate → Validated promotion is explicitly deferred with documented requirements

> The objective is not to make knowledge trusted.
> The objective is to make Helping Hand able to explain why knowledge deserves trust.
