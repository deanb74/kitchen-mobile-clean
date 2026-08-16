# MILESTONE_052_REPOSITORY_ANALYSIS — Concept Trust Lifecycle

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 052
**The Question:**
> How does Helping Hand know that knowledge has earned continued trust,
> and when it requires review?

---

## Part 1 — What States a Concept Currently Has

`ConceptStatus` in `lib/knowledge/Concept.ts`:

```typescript
type ConceptStatus =
  | "candidate"
  | "validated"
  | "core-principle"
  | "deprecated";
```

**What each state means today:**

| Status | Meaning | Set by |
|---|---|---|
| `"candidate"` | Newly governed — not yet validated | `addConcept()` (default) |
| `"validated"` | Declared trusted — no governed promotion path | Caller of `addConcept()` or `updateConcept()` |
| `"core-principle"` | Foundational — immutable by write guard | Initial data / constitution |
| `"deprecated"` | Retired — not deleted; history preserved | `retireConcept()` |

**Critical finding:** `"validated"` is a caller-supplied value.

`addConcept()` enforces that new concepts start as `"candidate"` unless the caller
explicitly sets `status: "validated"`:

```typescript
// KnowledgeGraphMutation.addConcept()
const toAdd: Concept =
  concept.status === "validated" || concept.status === "deprecated"
    ? concept
    : { ...concept, status: "candidate" };
```

`updateConcept()` accepts whatever `status` the caller supplies in the `proposed` concept.
It does not validate whether the promotion from `"candidate"` to `"validated"` is warranted.

**The `"candidate"` → `"validated"` transition is ungoverned.**

A caller can pass a concept with `status: "validated"` to `updateConcept()` and the mutation
layer will accept it. There is no check that minimum evidence, independent reinforcement,
or authority review occurred before the promotion.

---

## Part 2 — What Currently Causes Concept State Changes

### `KnowledgeChangeIntent` values

```typescript
type KnowledgeChangeIntent =
  | "create"     // → addConcept()
  | "update"     // → updateConcept()
  | "reinforce"  // → updateConcept()
  | "merge"      // → addConcept()
  | "supersede"  // → updateConcept()
  | "retire"     // → retireConcept()
  | "none";      // not approved
```

### Routing in `applyApprovedChange()`

```
"create" | "merge"                    → graph.addConcept()
"update" | "reinforce" | "supersede"  → graph.updateConcept()
"retire"                              → graph.retireConcept()
```

**Critical finding:** `"reinforce"`, `"update"`, and `"supersede"` all call the same
`updateConcept()` method. At the mutation layer, they are indistinguishable:

```typescript
// KnowledgeGraphMutation.updateConcept()
const updated: Concept = {
  ...proposed,
  id,
  createdAt: previous.createdAt,
  createdBy: previous.createdBy,
  updatedAt: new Date().toISOString(),   // ← set for ALL intents equally
};
```

Both "this concept was edited" and "this concept was independently confirmed again"
produce the same `updatedAt` change on the concept. The distinction is not preserved
in the `Concept` type itself.

The distinction IS preserved in `ConceptProvenanceRecord.changeIntent` — but this
requires querying the provenance store, not reading the concept directly.

---

## Part 3 — What Evidence Currently Survives into Concept Provenance

### `ConceptProvenanceRecord`

```typescript
interface ConceptProvenanceRecord {
  conceptId: string;
  governanceId: string;
  changeIntent: ApprovedKnowledgeChangeIntent;  // ✓ reinforce vs update is preserved here
  changedAt: string;
  approvedBy: string;
  provenance: ReadonlyArray<string>;            // ["learning:...", "reflection:...", "execution:..."]
  previousState?: Concept;                      // ✓ full state before change
}
```

**What the provenance store CAN answer (via queries):**

| Question | How | Available |
|---|---|---|
| How many times was this concept reinforced? | `getHistory(id).filter(r => r.changeIntent === "reinforce").length` | ✓ computable |
| When was this concept last reinforced? | Most recent `"reinforce"` record's `changedAt` | ✓ computable |
| Who approved each change? | `approvedBy` on each record | ✓ available |
| What was the state before each change? | `previousState` on each record | ✓ available |
| What learning cycle produced each change? | `provenance` array (`"learning:..."` entries) | ✓ available |

**What the provenance store CANNOT answer:**

| Question | Why not |
|---|---|
| Did reinforcements come from independent sources? | `approvedBy` records the reviewer, not the originating DC or venue |
| Did reinforcements come from different venues or contexts? | Not tracked in provenance |
| Has any new learning emerged that contradicts this concept? | No contradiction link exists |

---

## Part 4 — Can the Architecture Distinguish Edit from Confirmation?

**Answer: Partially — in provenance history only, not on the Concept itself.**

`ConceptProvenanceRecord.changeIntent` distinguishes `"reinforce"` from `"update"` — this
information is in the store.

But `Concept.updatedAt` changes on every governance operation. It does not distinguish:

```
A) "This concept was edited"           → changeIntent: "update"   → updatedAt changes
B) "This concept was independently confirmed again" → changeIntent: "reinforce" → updatedAt changes
```

Both produce identical effects on the `Concept` object. The only way to determine whether
the most recent change was a reinforcement or an edit is to query
`ConceptProvenanceStore.getHistory(id)` and read `changeIntent` from the latest record.

**This is a query-time computation, not a concept-level property.**

A caller reading a `Concept` from `KnowledgeGraph.getConcept()` cannot tell from the concept
itself when it was last reinforced. They would need to also call `KnowledgeGraph.getConceptHistory()`
and filter records.

---

## Part 5 — Audit of Existing Fields

### `Concept.createdAt`
- **What it proves:** When this concept first entered the graph
- **What it cannot prove:** How long it has been trusted; whether it remains current

### `Concept.updatedAt`
- **What it proves:** When any governance operation last touched this concept
- **What it cannot prove:** Whether that operation was a confirmation or a revision

### `Concept.evidenceLevel`
- **What it proves:** The declared breadth of evidence at last governance
- **What it cannot prove:** Whether the evidence level was independently verified;
  whether the evidence level has been superseded by contradicting evidence

### `Concept.status`
- **What it proves:** The declared lifecycle state
- **What it cannot prove:** Whether `"validated"` was earned through a governed promotion
  path or assigned directly by a caller; when it was last confirmed

### `ConceptProvenanceRecord.changeIntent`
- **What it proves:** The intent of each specific governance operation
- **What it cannot prove:** How many independent sources contributed across all records;
  whether the same source reinforced multiple times

### `ConceptProvenanceRecord.provenance[]`
- **What it proves:** The learning/reflection/execution chain for each governance operation
- **What it cannot prove:** Whether the learning cycles came from different DCs or venues

### `Concept.inheritsTo`
- **What it proves:** The current declared scope of inheritance
- **What it cannot prove:** Whether the evidence justifies that scope; whether the scope
  has been reviewed since environmental conditions changed

### `Concept.confidence`
- **What it proves:** A point-in-time confidence value
- **What it cannot prove:** Whether that confidence reflects current conditions

---

## Part 6 — Can the System Currently Detect Trust Signals?

### Reinforcement

**Detection:** Partially possible via provenance query.
`ConceptProvenanceStore.getHistory(id).filter(r => r.changeIntent === "reinforce")`
gives reinforcement count and timing.

**Gap:** This is a query, not a surfaced property. `Concept.lastReinforcedAt` does not exist.
The mutation layer sets `updatedAt` for all intents equally.

---

### Contradiction

**Detection:** Not currently possible.

Nothing in the architecture connects a new learning proposal to an existing concept it may
contradict. A governance reviewer approving `intent: "create"` for a concept that conflicts
with an existing `"validated"` concept receives no structural signal about the conflict.

`Concept.challengedBy` does not exist. There is no field, no link, no trigger.

---

### Decay / Staleness

**Detection:** Not currently possible.

`Concept.lastReinforcedAt` does not exist. The most recent reinforcement can be computed
from provenance history but is not surfaced directly. No mechanism flags concepts that
have not been confirmed in recent governance cycles.

---

### Retirement Triggers

**Detection:** Not currently possible.

`retireConcept()` exists and works. But it is triggered only by human proposal —
nothing in the system proactively identifies that a concept is overdue for retirement review.

---

## Part 7 — The Four Lifecycle Transitions and What Is Missing

### Candidate → Validated

**Current state:** No governed promotion path. The caller sets `status: "validated"` directly.

**What is missing:**
- A minimum reinforcement threshold before promotion
- A check that reinforcements came from independent sources
- A named authority sign-off on the promotion itself

**Smallest missing connection:** A `promoteToValidated()` path that checks
`getHistory(id).filter(r => r.changeIntent === "reinforce").length >= N` before accepting
the promotion. The threshold `N` is a governance configuration question, not a code question.

---

### Validated → Trusted (across contexts)

**Current state:** `"validated"` is a static label. There is no distinction between
a concept validated once and a concept validated repeatedly across diverse contexts.

**What is missing:**
- `lastReinforcedAt` on `Concept` — set by mutation layer only on `"reinforce"` intent
- A trust summary query that computes reinforcement count, recency, and source diversity

**Smallest missing connection:** `Concept.lastReinforcedAt` — one field, selectively
updated in `updateConcept()` when `provenance.changeIntent === "reinforce"`.

---

### Trusted → Challenged

**Current state:** No contradiction detection. A new concept contradicting an existing
`"validated"` concept enters `KnowledgeGraph` without any link to the concept it contradicts.

**What is missing:**
- `challengedBy?: string[]` on `Concept` — governance record IDs of proposals identified
  as contradicting this concept
- A mechanism for the governance reviewer to flag a new proposal as contradicting an
  existing concept (a `conflictsWithConceptId?` field on `ApprovedKnowledgeChange`)

**Smallest missing connection:** `Concept.challengedBy` and `ConceptProvenanceInput.conflictsWithConceptId?`.

---

### Challenged → Reinforced / Modified / Superseded / Retired

**Current state:** All four paths already exist as `changeIntent` values.
The mechanism is present; the trigger is absent.

**What is missing:** A `getTrustSummary()` query on `KnowledgeGraph` that surfaces the
current trust picture — reinforcement count, last reinforced, challenged-by, staleness
signal — so the governance reviewer has the information needed to choose the right path.

---

## Part 8 — The Constitutional Boundary

`evaluateGuard()` Invariant 1 enforces:

```
status === "core-principle" AND evidenceLevel === "constitutional"
→ immutable — any update is rejected
```

This is structurally enforced in `KnowledgeGraphMutation.updateConcept()`:

```typescript
if (previous.status === "core-principle" && previous.evidenceLevel === "constitutional") {
  return this.rejected(..., "Constitutional core-principle concepts are immutable.");
}
```

**The boundary holds:** Constitutional knowledge is structurally protected from modification.
Professional wisdom (`evidenceLevel: "multi-source"`, `scope: "professional"`) has no
equivalent protection — it can be updated, reinforced, superseded, or retired.

**What is not yet enforced:** The positive requirement that professional wisdom
MUST be capable of challenge, reinforcement, and retirement. There is no mechanism
that flags a `"validated"` + `"multi-source"` concept that has received no reinforcement
in N governance cycles.

The constitutional protection is in code.
The professional wisdom renewal requirement is in PD-013 only.

---

## Summary

### What the architecture already does well

| Capability | Status |
|---|---|
| Immutable protection for constitutional concepts | ✓ — `evaluateGuard()` Invariant 1 |
| Full provenance history per concept | ✓ — `ConceptProvenanceStore` |
| `changeIntent` preserved in provenance | ✓ — distinguishable by query |
| Previous state preserved on every change | ✓ — `previousState` in record |
| Retirement mechanism | ✓ — `retireConcept()` + `"deprecated"` status |
| Reinforcement mechanism | ✓ — `changeIntent: "reinforce"` routes to `updateConcept()` |

### What is missing

| Gap | Smallest connection |
|---|---|
| `"candidate"` → `"validated"` is ungoverned | Promotion check on reinforcement count |
| Edit ≠ confirmation not surfaced on Concept | `Concept.lastReinforcedAt` — selectively set on `"reinforce"` |
| No contradiction detection | `Concept.challengedBy` + `conflictsWithConceptId?` input |
| No staleness signal | `getTrustSummary()` — read-only query composing provenance data |
| No review trigger | Derived from `lastReinforcedAt` threshold and `challengedBy` presence |

### The three smallest additions

```
1. Concept.lastReinforcedAt?   — one field; one selective mutation; provenance already has the data
2. Concept.challengedBy?       — one field; populated when a governance record flags conflict
3. KnowledgeGraph.getTrustSummary(id) — read-only; composes existing provenance data
```

All three are additive. None changes how concepts enter the graph. None changes how
governance approves changes. None changes `evaluateGuard()`.

They give the system the ability to answer:

> "I was last independently confirmed on this date.
> These governance records have challenged me.
> My trust status is current — or it requires review."
