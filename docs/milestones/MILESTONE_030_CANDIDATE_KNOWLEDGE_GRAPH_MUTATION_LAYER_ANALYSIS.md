# Milestone 030 Candidate — KnowledgeGraph Mutation Layer Analysis

**Date:** 2026-08-06  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 029 — KnowledgeGraphWriteGuard Implementation  
**Constraint:** No code changes. Analysis only.

---

## The Question

> How does an approved, constitutionally valid change become part of governed knowledge without losing provenance, history, or trust?

---

## Critical Finding: Write Capability Already Exists at ConceptIndex Level

The `KnowledgeGraph` public API is read-only. But the internal `ConceptIndex` already has write methods:

```typescript
// lib/knowledge/ConceptIndex.ts

add(concept: Concept): void {
  const key = normalise(concept.id);
  if (this.concepts.has(key)) {
    throw new Error(`Concept already exists: ${concept.id}`);
  }
  this.concepts.set(key, concept);
}

upsert(concept: Concept): void {
  this.concepts.set(normalise(concept.id), concept);
}
```

`add()` enforces uniqueness. `upsert()` replaces without checking.

`KnowledgeGraph` wraps these but exposes none of them. The mutation layer does not need to invent write capability — it needs to expose `ConceptIndex.add()` and `ConceptIndex.upsert()` through a governed interface on `KnowledgeGraph`.

**What this means:** The write operations require no new internal mechanism. They require governance-controlled wrappers around existing `ConceptIndex` methods.

---

## Critical Finding: Concept Has No History

`Concept` has `createdAt` and `updatedAt` timestamps. It does not carry a history of previous states.

```typescript
// lib/knowledge/Concept.ts
export interface Concept {
  id: string;
  name: string;
  definition: string;
  status: ConceptStatus;
  evidenceLevel: EvidenceLevel;
  scope: ConceptScope;
  // ...
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  confidence?: number;
}
```

No `previousStates` array. No `changeHistory`. No `provenanceId`.

When `ConceptIndex.upsert()` is called, the previous concept state is silently overwritten. This violates the governance constitution: **previous belief must be preserved**.

**What this means:** The mutation layer cannot rely on `Concept` alone to preserve history. A separate provenance record alongside the concept is required.

---

## The Mutation Layer's One Responsibility

> Apply a permitted change.

It does not:
- Decide whether the learning was valuable
- Decide whether authority was sufficient  
- Interpret professional meaning
- Judge consequences
- Approve knowledge

All of those happened in earlier steps. The mutation layer receives a `GuardResult { permitted: true }` and acts on it.

```
Caller calls guard first
        ↓
Guard: permitted
        ↓
Caller invokes mutation
        ↓
Mutation applies change + records provenance
        ↓
KnowledgeGraph updated
```

**The mutation layer never calls the guard internally.** The caller is responsible for sequencing. If a mutation is called without guard permission, it must reject. But it does not re-run the guard — it checks the `guardResult` it received.

---

## The Core Principle: Governed Memory

### Knowledge Is Not Changed. Understanding Evolves.

The mutation layer does not change truth. It updates the current justified model of the world.

Consider the example:

```
Previous understanding:  "This process typically takes 20 minutes."
New evidence:            "Across multiple venues it consistently takes 30 minutes."
Updated understanding:   "This process typically takes 30 minutes."
```

The previous understanding was not false. It was the best available model given the evidence at the time. The new understanding is not a correction of an error — it is the growth of a more complete picture.

This distinction matters enormously:

- A database stores values. Values are replaced when they are wrong.
- A governed knowledge graph stores justified beliefs. Beliefs evolve as evidence accumulates.

The `KnowledgeGraph` is not a history of mistakes. It is a history of evolving understanding.

Therefore: the mutation layer's purpose is not to fix the graph. It is to record growth. The provenance attached to every mutation is not a correction log — it is evidence of how understanding developed.

**What this means for the three operations:**

`addConcept()` — new growth: something is now understood that was not before.  
`updateConcept()` — refined growth: something is understood more completely.  
`retireConcept()` — dormant growth: something is no longer active but its history remains part of the understanding of how Helping Hand arrived at its current model.

---

```
1. Current belief   — what the concept now says
2. Previous belief  — what the concept previously said
3. Reason           — the provenance record linking to ApprovedKnowledgeChange
```

```
KnowledgeGraph
    +
Provenance
    +
History
    =
Governed Memory
```

---

## The Three Operations

### addConcept(concept, provenance)

Introduces new knowledge that has earned permission to exist.

**Preconditions (checked by the guard, confirmed by the mutation layer):**
- The concept does not already exist (same id)
- `guardResult.permitted === true`
- Provenance record is attached

**Starting state:**
New concepts added through the learning loop begin as `status: "candidate"` unless the `ApprovedKnowledgeChange` explicitly authorises `"validated"`.

**Why `"candidate"` as default?** Existence does not equal validation. A concept can be added to the graph while still requiring further evidence before it governs future DCs' Understanding.

**What happens:**
1. `ConceptIndex.add(concept)` — adds to the index
2. A `ConceptProvenanceRecord` is created linking `concept.id` to `change.id`
3. No previous state exists (this is creation)

---

### updateConcept(id, proposedConcept, provenance)

Adjusts or improves existing knowledge.

**Example:**

```
Previous: "This process typically takes 20 minutes."
Evidence: "Across multiple venues it consistently takes 30 minutes."
Update:   "This process typically takes 30 minutes."
```

The graph changes. The history does not disappear. The previous state was not wrong — it was correct given previous understanding. The update records what changed, why it changed, and what it replaced.

**What happens:**
1. Current concept retrieved from `ConceptIndex` — stored as previous state
2. `ConceptIndex.upsert(proposedConcept)` — replaces current with proposed
3. A `ConceptProvenanceRecord` is created linking:
   - `concept.id`
   - `change.id`
   - `previousState` (snapshot of the concept before update)
   - `updatedAt` timestamp

The previous state is preserved in the provenance record, not in `Concept` itself.

---

### retireConcept(id, provenance)

Removes a concept from active inheritance without destroying its memory.

Never:
```
DELETE concept
```

Always:
```
SET concept.status = "deprecated"
PRESERVE all fields
RECORD retiredAt, retiredBy, replacedBy? in provenance
```

**Why this matters:** Future DCs may need to understand what changed, why it changed, when it changed, and what replaced it. A forgotten mistake is more dangerous than a recorded mistake.

**What happens:**
1. Current concept retrieved from `ConceptIndex`
2. `ConceptIndex.upsert({ ...concept, status: "deprecated", updatedAt: now })`
3. A `ConceptProvenanceRecord` is created with `changeIntent: "retire"`, previous active state preserved

---

## The History Gap: What Concept Cannot Hold Alone

`Concept.updatedAt` records when it was last changed. It does not record what it was before. `ConceptIndex.upsert()` silently replaces — the old state is gone.

The mutation layer needs a companion data structure: `ConceptProvenanceRecord`.

This is not a new type for the `Concept` itself — that would bloat every concept with history it may never need. It is a separate store, keyed by `concept.id`, that accumulates provenance entries over time.

**Conceptual shape (not a type proposal — a design direction):**

```
ConceptProvenanceRecord {
  conceptId:      string
  changeId:       string        // ApprovedKnowledgeChange.id
  changeIntent:   KnowledgeChangeIntent
  changedAt:      string
  changedBy:      string        // reviewedBy from ApprovedKnowledgeChange
  previousState?: Concept       // absent for addConcept
  notes?:         string        // from governance conditions
}
```

A query on this store for a given `conceptId` produces the complete change history: every change, the authority that approved it, the previous state it replaced, and the timestamp. This is what makes the provenance chain queryable — not just "what do we believe" but "why do we believe this and what did we believe before."

---

## The Mutation Contract

```
MutationInput {
  guardResult:      GuardResult           // must have permitted: true
  approvedChange:   ApprovedKnowledgeChange
  targetConceptId?: string                // for update and retire
  proposedConcept?: Concept               // for add and update
}

MutationResult {
  applied:    boolean
  conceptId:  string
  changeId:   string
  action:     "added" | "updated" | "deprecated" | "rejected"
  reason?:    string    // present only when applied: false
}
```

The mutation layer trusts one thing: `guardResult.permitted === true`. If not, `applied: false`, no mutation, no exception, no workaround.

---

## Invariant Coverage at the Mutation Layer

The guard enforces all eight invariants. The mutation layer confirms `permitted === true` before acting. It also enforces Invariant 4 (retirement = deprecation) as a structural rule — even if the guard has already converted the intent, the mutation layer must not delete.

| Invariant | Guard enforces | Mutation layer also enforces |
|---|---|---|
| 1 — Constitutional immutability | ✓ | ✗ (trusts guard) |
| 2 — Professional authority | ✓ | ✗ (trusts guard) |
| 3 — Provenance chain | ✓ | ✓ (attaches provenance record) |
| 4 — Retire = deprecate | ✓ (converts intent) | ✓ (never deletes) |
| 5 — Evidence ceiling | ✓ | ✗ (trusts guard) |
| 6 — Evidence minimum | ✓ | ✗ (trusts guard) |
| 7 — Pollination sign-offs | ✓ | ✗ (trusts guard) |
| 8 — Rollback authority | ✓ | ✗ (trusts guard) |

Invariant 3 and 4 are the two where the mutation layer adds enforcement on top of the guard. Both are about what the mutation layer physically produces (provenance record, deprecation state) — things the guard cannot verify in advance.

---

## Location

```
lib/knowledge/KnowledgeGraphMutation.ts    — the three operations
lib/knowledge/__tests__/mutation.test.ts  — tests before implementation
```

`KnowledgeGraph` itself gains three new public methods that delegate to `KnowledgeGraphMutation` functions after guard verification.

---

## Test Groups Before Implementation

### Test Group 1 — Approved addition

Prove:
- Valid guard permit + valid provenance → concept exists in graph
- Starting status is `"candidate"` unless explicitly `"validated"` in change
- Provenance record created with `changeId`

### Test Group 2 — Approved update

Prove:
- Existing concept + approved change → new state in graph
- Previous state preserved in provenance record
- `updatedAt` timestamp recorded

### Test Group 3 — Retirement

Prove:
- Retirement request → concept `status: "deprecated"`
- All concept fields preserved
- Previous active state preserved in provenance
- History remains queryable

### Test Group 4 — Rejection: unpermitted mutation

Prove:
- `guardResult.permitted: false` → `applied: false`, no graph change
- Mutation operations called without guard result → `applied: false`

### Test Group 5 — The architectural test

Prove the full chain from experience to governed knowledge:
```
Experience (test execution record)
    ↓ ReflectionEngine
Reflection
    ↓ LearningEngine
Learning
    ↓ KnowledgeGovernanceEngine
ApprovedKnowledgeChange
    ↓ KnowledgeGraphWriteGuard
guardResult { permitted: true }
    ↓ KnowledgeGraphMutation.addConcept()
Concept exists in graph
    ↓ UnderstandingEngine
Concept accessible for future Understanding
```

Andy contributed. Andy did not control inheritance.

---

## The Architectural Test: The Final Proof

> Can Andy learn something useful, receive approval, and improve future Understanding — without Andy ever writing directly to knowledge?

```
Andy                              ← creator of learning
        ↓
Learning (proposes change)
        ↓
Governance (Helping Hand HQ approves)    ← approver
        ↓
ApprovedKnowledgeChange
        ↓
Write Guard (constitution enforced)      ← enforcer
        ↓
KnowledgeGraph mutation                  ← mechanism
        ↓
Future Understanding
```

Andy contributes. Andy does not control inheritance.

The creator, the approver, and the enforcer are three separate identities in three separate layers. This is what makes the system trustworthy rather than merely functional.

---

## What This Milestone Does Not Include

- Persistence layer (KnowledgeGraph is in-memory; persistence is a future concern)
- Distribution to other DCs (Pollination connects here eventually)
- Andy runtime integration
- Changes to the `Concept` type itself

---

**Status:** Write capability identified (ConceptIndex already has `add` and `upsert`) | History gap identified (Concept has no previous state storage) | ConceptProvenanceRecord design direction established | Three operations defined | Five test groups specified | Constitutional principle confirmed: creator ≠ approver ≠ enforcer | Core principle recorded: knowledge is not changed, understanding evolves
