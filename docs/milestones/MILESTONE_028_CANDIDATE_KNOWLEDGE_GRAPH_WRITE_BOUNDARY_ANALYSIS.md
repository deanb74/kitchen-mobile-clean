# Milestone 028 Candidate — KnowledgeGraph Write Boundary Analysis

**Date:** 2026-08-05  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 027 — KnowledgeGraph Write Architecture  
**Constraint:** No code. Analysis only.

---

## The Question

> What is the minimum information the Write Guard requires to enforce the Learning Governance Constitution?

The purpose: define the contract between `ApprovedKnowledgeChange` and `KnowledgeGraphWriteGuard`.

The guard must be able to enforce all eight invariants using only what is in the contract. If it needs to reach outside the contract — into `LearningEngine`, `ReflectionEngine`, or DC identity — it has become an intelligence layer.

---

## What the Guard Must Know

From Milestone 027, the guard asks exactly four questions:

1. Is this authorised? (provenance chain complete, authority present)
2. Is the authority sufficient? (matches target concept scope)
3. Does this violate an invariant? (constitutional immutability, evidence ceiling, self-review, etc.)
4. Is the intent valid? (retire → deprecate, not delete)

Each question requires specific information. The contract must supply that information and nothing more.

---

## 1. The Target Concept's Governance Fields

The guard must know what it is writing to before deciding whether the write is permissible.

**Required fields from the existing `Concept` type:**

```typescript
// lib/knowledge/Concept.ts — already exists

id:            string          // which concept is being changed
status:        ConceptStatus   // "candidate" | "validated" | "core-principle" | "deprecated"
evidenceLevel: EvidenceLevel   // "candidate" | "single-source" | "multi-source" | "constitutional"
scope:         ConceptScope    // "universal" | "helping-hand" | "professional"
owner:         ConceptOwner    // "Helping Hand Constitution" | "Hospitality HQ" | etc.
inheritsTo:    ConceptInheritance[]  // who inherits this concept
```

For Invariant 1 (constitutional immutability): the guard reads `status` and `evidenceLevel`.  
For Invariant 2 (professional authority): the guard reads `scope` and `owner`.  
For Invariant 6 (evidence minimum for inheritance): the guard reads `inheritsTo` and `evidenceLevel`.

**For a new concept (`changeIntent: "create"`), the target concept is the proposed concept itself — supplied in the change record.**

**For updates and retirements, the target concept must be retrieved from `KnowledgeGraph` before the guard runs.** The guard cannot assess Invariant 1 without knowing the current state of the concept it is changing.

---

## 2. The Change Record's Authority Fields

The guard must know what authority is present in the change request.

**Required fields from `ApprovedKnowledgeChange`:**

```typescript
// lib/knowledge-governance/KnowledgeGovernance.ts — already exists

id:             string          // unique change identifier
changeIntent:   KnowledgeChangeIntent  // "create" | "update" | "reinforce" | "merge" | "supersede" | "retire" | "none"
sourceLearningId: string        // links to Learning (provenance: link 3)
context: {
  reflectionId:        string   // links to Reflection (provenance: link 2)
  actionId:            string   // links to Action (provenance: supporting)
  executionId:         string   // links to Execution (provenance: link 1)
  executionCreatedAt:  string   // when the experience occurred
}
reviewedBy?:    string          // named authority (present if human-reviewed)
reviewedAt?:    string          // when the review occurred (present if human-reviewed)
confidence:     number          // 0–1
```

For Invariant 3 (provenance chain): the guard checks that `executionId`, `reflectionId`, `sourceLearningId`, and `id` are all present.  
For Invariant 2 and 8 (authority sufficiency): the guard checks that `reviewedBy` is present and appropriate for the target concept's scope.  
For Invariant 7 (rollback authority): the guard checks that the rollback's authority matches the original change's authority.

---

## 3. The Concept's Proposed New State

For `addConcept` and `updateConcept`, the guard must know what the proposed concept will look like after the write.

**Required fields (subset of `Concept`):**

```
proposedEvidenceLevel:  EvidenceLevel   // what level is being proposed?
proposedInheritsTo:     ConceptInheritance[]  // who will inherit this?
proposedStatus:         ConceptStatus   // what status is being set?
```

For Invariant 5 (evidence ceiling): the guard checks that `proposedEvidenceLevel` is not `"constitutional"`.  
For Invariant 6 (evidence minimum for inheritance): if `proposedInheritsTo` includes more than a venue, `proposedEvidenceLevel` must be `"multi-source"` minimum.

---

## 4. The Pollination Origin Flag

For Invariant 7 (pollination sign-offs), the guard needs to know whether this change originated from the pollination pathway.

**Required field:**

```
originatesFromPollination:  boolean
privacyChecked?:            boolean   // required if originatesFromPollination = true
safetyChecked?:             boolean   // required if originatesFromPollination = true
contextValidated?:          boolean   // required if originatesFromPollination = true
```

If `originatesFromPollination: true`, the guard checks that all three sign-off fields are explicitly `true`. Not absent, not false — explicitly `true`.

---

## The Minimum Contract

Combining the above, the minimum information the guard requires is:

```
GuardInput {
  // The change being proposed
  changeId:               string
  changeIntent:           KnowledgeChangeIntent
  sourceLearningId:       string
  sourceReflectionId:     string
  sourceExecutionId:      string
  reviewedBy?:            string
  reviewedAt?:            string
  confidence:             number

  // The current concept state (retrieved from KnowledgeGraph before guard runs)
  targetConcept?: {
    id:             string
    status:         ConceptStatus
    evidenceLevel:  EvidenceLevel
    scope:          ConceptScope
    owner:          ConceptOwner
    inheritsTo:     ConceptInheritance[]
  }

  // The proposed new state (for create and update)
  proposedConcept?: {
    status:         ConceptStatus
    evidenceLevel:  EvidenceLevel
    scope:          ConceptScope
    inheritsTo:     ConceptInheritance[]
  }

  // Pollination origin (for Invariant 7)
  originatesFromPollination:  boolean
  privacyChecked?:            boolean
  safetyChecked?:             boolean
  contextValidated?:          boolean
}
```

**The guard returns:**

```
GuardResult {
  permitted:  boolean
  reason?:    string    // present when not permitted; names the violated invariant
  action:     "permit" | "reject" | "deprecate"
                        // deprecate = retirement request converted to deprecation
}
```

---

## What the Guard Does Not Receive

The following are deliberately absent from the guard's input. Providing them would turn the guard into an intelligence layer.

| Absent from input | Why |
|---|---|
| `Learning` object | The guard trusts the governance decision, not the learning that produced it |
| `Reflection` object | Reflection reasoning is not the guard's concern |
| **DC identity (who proposed)** | The guard does not care who the learner was |
| `KnowledgeAnswer` or formation inputs | Formation is upstream; the guard acts on its outputs |
| `PollinationDecision` detail | The guard receives the sign-off results, not the routing decision |
| Historical change records | Except for rollback authority check — only the original change's `reviewedBy` is needed |

### The Creator ≠ Approver ≠ Enforcer Distinction

One principle makes the absence of DC identity explicit.

The guard does not know who is **proposing** the change. But the guard does need to know who **authorised** it. These are different identities, and separating them is the correct governance pattern.

```
Annie experiences something            ← Creator: the learner
        ↓
Annie learns something
        ↓
Hospitality HQ reviews it             ← Approver: the authority
        ↓
Write Guard permits it                 ← Enforcer: the constitution
        ↓
Future hospitality DCs inherit it
```

The learner (Annie) does not authorise the change. The authority (Hospitality HQ) does. The guard enforces the invariants against the authority's record — not against the learner's identity.

`reviewedBy` in `ApprovedKnowledgeChange` carries the approver's identity. The guard reads this to verify that the authority is sufficient for the target concept's scope. It never needs to know which DC originated the learning.

---

## Invariant Coverage Check

| Invariant | Satisfied by |
|---|---|
| 1 — Constitutional immutability | `targetConcept.status` + `targetConcept.evidenceLevel` |
| 2 — Professional authority | `targetConcept.scope` + `reviewedBy` (present + external) |
| 3 — Provenance chain | `sourceExecutionId` + `sourceReflectionId` + `sourceLearningId` + `changeId` |
| 4 — Retire = deprecate | `changeIntent == "retire"` → `action: "deprecate"` |
| 5 — Evidence ceiling | `proposedConcept.evidenceLevel ≠ "constitutional"` |
| 6 — Evidence minimum for inheritance | `proposedConcept.inheritsTo` breadth + `proposedConcept.evidenceLevel` |
| 7 — Pollination sign-offs | `originatesFromPollination` + all three explicit `true` flags |
| 8 — Rollback authority | `changeIntent == "supersede"` + original change's `reviewedBy` authority level |

All eight invariants are satisfiable from the minimum contract. No additional information is needed.

---

## One Architectural Boundary

The guard runs after `KnowledgeGovernanceEngine`. The governance engine decides *whether* to approve. The guard decides *whether the approved change meets the constitution*.

These are different questions. The governance engine may approve a change that still violates an invariant — for example, a governance review that approves a constitutional concept modification. The guard catches this at the write boundary.

```
KnowledgeGovernanceEngine
  "Is this learning worthy of becoming knowledge?"
        ↓
  ApprovedKnowledgeChange
        ↓
KnowledgeGraphWriteGuard
  "Does this change satisfy the constitution?"
        ↓
  PERMIT or REJECT
        ↓
  KnowledgeGraph mutation (if permitted)
```

The governance engine exercises judgment. The guard enforces rules. Both are necessary. Neither replaces the other.

---

## What Comes After Milestone 028

With the guard contract defined, Milestone 029 can implement:

1. `KnowledgeGraphWriteGuard` — the enforcement function
2. `KnowledgeGraph.addConcept()` — calls guard before writing
3. `KnowledgeGraph.updateConcept()` — calls guard before writing
4. `KnowledgeGraph.retireConcept()` — calls guard, converts to deprecation

Tests:
- Each invariant has a test that proves the guard rejects violations
- A well-formed `ApprovedKnowledgeChange` passes the guard and reaches the graph
- Retirement produces deprecation, not deletion

---

**Status:** Minimum contract defined | All eight invariants covered | Guard inputs and absences specified | Governance engine boundary clarified | Milestone 029 scope ready
