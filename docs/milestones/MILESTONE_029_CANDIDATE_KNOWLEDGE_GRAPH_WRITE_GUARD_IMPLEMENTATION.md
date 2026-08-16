# Milestone 029 Candidate — KnowledgeGraphWriteGuard Implementation

**Date:** 2026-08-05  
**Status:** Candidate — Ready for Implementation  
**Depends on:** Milestone 028 — KnowledgeGraph Write Boundary Analysis  
**Constraint:** Guard only. No KnowledgeGraph mutation. No graph writes.

---

## The Principle

> Prove the boundary before building the capability.

The guard is the constitutional boundary for the learning loop. It deserves its own proof before any graph mutation exists. A guard that has been tested in isolation is more trustworthy than a guard embedded inside write operations.

---

## Scope

Build and test:

```
GuardInput
        ↓
KnowledgeGraphWriteGuard
        ↓
GuardResult
```

Nothing else. No `addConcept()`. No `updateConcept()`. No `retireConcept()`. No graph mutation. The graph remains read-only after this milestone.

---

## Location

```
lib/knowledge-governance/writeGuard.ts
lib/knowledge-governance/__tests__/writeGuard.test.ts
```

The write guard lives adjacent to `KnowledgeGovernanceEngine` — they are both governance layer components. COS does not own the guard; the guard enforces rules about governed knowledge, which is a governance concern.

---

## The Contract (from Milestone 028)

### Input

```typescript
interface GuardInput {
  // The change being proposed
  changeId:               string;
  changeIntent:           KnowledgeChangeIntent;
  sourceLearningId:       string;
  sourceReflectionId:     string;
  sourceExecutionId:      string;
  reviewedBy?:            string;
  reviewedAt?:            string;
  confidence:             number;

  // Current concept state — retrieved from KnowledgeGraph before guard runs
  targetConcept?: {
    id:            string;
    status:        ConceptStatus;
    evidenceLevel: EvidenceLevel;
    scope:         ConceptScope;
    owner:         ConceptOwner;
    inheritsTo:    ConceptInheritance[];
  };

  // Proposed new state — for addConcept and updateConcept
  proposedConcept?: {
    status:        ConceptStatus;
    evidenceLevel: EvidenceLevel;
    scope:         ConceptScope;
    inheritsTo:    ConceptInheritance[];
  };

  // Pollination origin
  originatesFromPollination:  boolean;
  privacyChecked?:            boolean;
  safetyChecked?:             boolean;
  contextValidated?:          boolean;
}
```

### Output

```typescript
interface GuardResult {
  permitted:  boolean;
  action:     "permit" | "reject" | "deprecate";
  reason?:    string;    // names the violated invariant when not permitted
  invariant?: number;    // which of the eight invariants was violated
}
```

---

## The Eight Invariant Checks (in enforcement order)

**Check 1 — Constitutional immutability**

```
IF targetConcept.status == "core-principle"
   AND targetConcept.evidenceLevel == "constitutional"
→ REJECT
   reason: "Constitutional concepts are not modifiable through the learning loop."
   invariant: 1
```

This check runs first. No other condition can override it.

---

**Check 2 — Provenance chain completeness**

```
IF changeId is absent OR empty
   OR sourceLearningId is absent OR empty
   OR sourceReflectionId is absent OR empty
   OR sourceExecutionId is absent OR empty
→ REJECT
   reason: "Provenance chain is incomplete. All links required."
   invariant: 3
```

---

**Check 3 — Authority for professional scope**

```
IF targetConcept.scope == "professional"
   AND (reviewedBy is absent OR reviewedBy == "")
→ REJECT
   reason: "Professional-scope changes require a named external authority."
   invariant: 2
```

---

**Check 4 — Evidence level ceiling**

```
IF proposedConcept.evidenceLevel == "constitutional"
→ REJECT
   reason: "Learning loop cannot elevate evidenceLevel to constitutional."
   invariant: 5
```

---

**Check 5 — Minimum evidence for inheritance**

```
IF proposedConcept.inheritsTo contains more than one venue-id
   AND proposedConcept.evidenceLevel is "candidate" OR "single-source"
→ REJECT
   reason: "Inherited knowledge requires multi-source evidence minimum."
   invariant: 6
```

---

**Check 6 — Pollination sign-offs**

```
IF originatesFromPollination == true
   AND (privacyChecked !== true
        OR safetyChecked !== true
        OR contextValidated !== true)
→ REJECT
   reason: "Pollination changes require explicit human sign-off on privacy, safety, and context."
   invariant: 7
```

---

**Check 7 — Rollback authority**

```
IF changeIntent == "supersede"
   AND targetConcept exists (this is a rollback, not a new supersession)
   AND rollback.reviewedBy authority < original.reviewedBy authority
→ REJECT
   reason: "Rollback requires authority at least equal to the original change."
   invariant: 8
```

---

**Check 8 — Retirement conversion**

```
IF changeIntent == "retire"
→ action: "deprecate"
   permitted: true
   (the retirement request is converted — the write layer sets status: "deprecated")
```

This is not a rejection — it is a conversion. The guard permits the operation but changes how it will be applied.

---

**All checks pass:**

```
→ action: "permit"
   permitted: true
```

---

## Required Tests

### Test group 1: Constitutional rejection

- Input: `targetConcept.status == "core-principle"` + `evidenceLevel == "constitutional"`
- Expected: `permitted: false`, `action: "reject"`, `invariant: 1`
- Regardless of confidence, reviewedBy, provenance — all other checks irrelevant once Invariant 1 fires

---

### Test group 2: Provenance rejection

- Input: missing `sourceExecutionId`
- Expected: `permitted: false`, `action: "reject"`, `invariant: 3`
- Input: missing `sourceLearningId`
- Expected: same
- Input: missing `changeId`
- Expected: same

---

### Test group 3: Authority rejection

- Input: `targetConcept.scope == "professional"`, `reviewedBy` absent
- Expected: `permitted: false`, `action: "reject"`, `invariant: 2`

---

### Test group 4: Evidence ceiling rejection

- Input: `proposedConcept.evidenceLevel == "constitutional"`
- Expected: `permitted: false`, `action: "reject"`, `invariant: 5`

---

### Test group 5: Pollination sign-off rejection

- Input: `originatesFromPollination: true`, `privacyChecked: false`
- Expected: `permitted: false`, `action: "reject"`, `invariant: 7`
- Input: same, `safetyChecked` absent
- Expected: same

---

### Test group 6: Retirement conversion

- Input: `changeIntent: "retire"`, valid provenance, appropriate authority
- Expected: `permitted: true`, `action: "deprecate"`

---

### Test group 7: Valid approval

- Input: full provenance, appropriate authority, no invariant violations
- Expected: `permitted: true`, `action: "permit"`

---

### Test group 8: Invariant ordering

- Input: multiple violations simultaneously (constitutional + missing provenance)
- Expected: invariant 1 fires first (constitutional check is not bypassable)

---

## What the Guard Does Not Do After This Milestone

- It does not call any KnowledgeGraph method
- It does not call `addConcept()`, `updateConcept()`, or `retireConcept()`
- It does not read from `LearningEngine` or `ReflectionEngine`
- It does not know which DC originated the learning
- It does not persist the `GuardResult`

The guard is a pure function: `GuardInput → GuardResult`. Stateless. No side effects. This makes it fully testable in isolation.

---

## What Comes After Milestone 029

**Milestone 030 — KnowledgeGraph Mutation Layer**

```
GuardResult { permitted: true }
        ↓
addConcept(concept, provenance)
updateConcept(id, changes, provenance)
retireConcept(id, provenance)  ← converts to deprecation
        ↓
KnowledgeGraph
```

Milestone 030 builds on a tested guard. Every write operation calls the guard first. If the guard rejects, the write does not happen. The graph never receives an unauthorised change.

---

## The Architecture Pattern Being Established

```
Observation boundary    ← COS: beginObservationSession()
        ↓
Interpretation boundary ← DC: translation rules
        ↓
Understanding boundary  ← COS: form()
        ↓
Judgement boundary      ← lib: JudgementEngine
        ↓
Learning boundary       ← lib: LearningEngine
        ↓
Governance boundary     ← lib: KnowledgeGovernanceEngine
        ↓
Write boundary          ← lib: KnowledgeGraphWriteGuard  ← this milestone
        ↓
Knowledge update        ← lib: KnowledgeGraph mutations  ← Milestone 030
```

Every major capability has a "you may proceed, but only if..." moment.

The next question for Helping Hand is not "can Andy learn?" He can. The question is: "can Andy contribute to the future without accidentally changing what the future should believe?"

Milestones 026–030 answer that.

---

**Status:** Guard scope defined | Contract specified | Eight test groups identified | No graph mutation | Milestone 030 prerequisite met by this milestone's tests**
