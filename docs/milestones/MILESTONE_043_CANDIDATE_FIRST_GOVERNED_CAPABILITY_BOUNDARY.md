# Milestone 043 Candidate — First Governed Capability Implementation Boundary

**Date:** 2026-08-06  
**Status:** Candidate — Implementation Boundary Analysis  
**Depends on:**
- Milestone 030 — KnowledgeGraph Mutation Layer ✓
- Milestone 042 (029) — KnowledgeGraphWriteGuard ✓

**Constraint:** No new principles. No new governance. No shortcuts.  
Prove the existing architecture can carry a real capability.

---

## The Question

> Can Helping Hand allow a useful capability to grow from experience to inherited understanding while every root remains protected?

---

## What Has Been Proven

The trunk is built:

```
Experience → Execution → Reflection → Learning → Governance
    → ApprovedKnowledgeChange (chain proven: scripts/test-companion-intelligence-cycle.ts)

ApprovedKnowledgeChange → GuardInput → evaluateGuard() → GuardResult
    → (proven: Milestone 042, 27 tests)

GuardResult → KnowledgeGraph.addConcept() → ConceptProvenanceRecord
    → (proven: Milestone 030, 26 tests)
```

**The gap:** Nothing connects these three proven chains into one continuous path.

---

## The Missing Bridge

The governance chain produces `ApprovedKnowledgeGovernanceRecord`. The mutation layer accepts `GuardResult` and `Concept`. Between them, two things are needed:

**1. `GovernanceRecord → GuardInput` conversion**

`ApprovedKnowledgeGovernanceRecord` carries everything `GuardInput` needs:

| `GuardInput` field | Source in `ApprovedKnowledgeGovernanceRecord` |
|---|---|
| `changeId` | `record.id` (governance record ID) |
| `changeIntent` | `record.approvedChange.intent` |
| `sourceLearningId` | `record.approvedChange.sourceLearningId` |
| `sourceReflectionId` | `record.context.reflectionId` |
| `sourceExecutionId` | `record.context.executionId` |
| `reviewedBy` | `record.review.reviewedBy` |
| `reviewedAt` | `record.review.reviewedAt` |
| `confidence` | `record.approvedChange.confidence` |
| `targetConcept` | looked up from `KnowledgeGraph` via `record.approvedChange.targetKnowledgeId` |
| `proposedConcept` | **supplied by caller** — see below |
| `originatesFromPollination` | `false` for local growth |

This conversion is a pure mapping function. No intelligence. No inference.

**2. The proposedConcept separation**

`ApprovedKnowledgeChange.proposedContent` is a human-readable string: "what should change and why." The guard requires a structured `Concept` to evaluate evidence level, scope, and inheritance.

This separation is intentional and correct:

```
ApprovedKnowledgeChange.proposedContent:
  "Shared situational context reduces repeated clarification during operations."
  ← human-readable proposal from governance

proposedConcept: Concept
  {
    id: "shared-situational-context-reduces-clarification",
    definition: "Shared situational context reduces repeated clarification during operations.",
    evidenceLevel: "multi-source",
    scope: "professional",
    inheritsTo: ["hospitality"],
    ...
  }
  ← structured concept constructed from the proposal (caller's responsibility)
```

The governance process approved the proposal's intent. The caller implements it as a concept. The guard validates the concept's governance properties. This is Creator ≠ Approver ≠ Enforcer applied to the concept definition itself.

---

## The Integration Function

One new function connects the three chains:

```typescript
// lib/knowledge-governance/applyApprovedChange.ts

function applyApprovedChange(
  record: ApprovedKnowledgeGovernanceRecord,
  proposedConcept: Concept,
  graph: KnowledgeGraph,
): MutationResult
```

It does exactly:
1. Convert `record` to `GuardInput` (pure mapping)
2. Look up `targetConcept` from `graph` if `targetKnowledgeId` is present
3. Call `evaluateGuard(guardInput)` → `GuardResult`
4. Call the appropriate `graph` mutation method with `guardResult` + provenance
5. Return `MutationResult`

Nothing else. No intelligence. No governance decision. Those happened earlier.

---

## The Full Chain — All Connections

```
Scripts/tests (existing ✓):
  Understanding → JudgementEngine → ActionEngine → ExecutionEngine
    → ReflectionEngine → LearningEngine → KnowledgeGovernanceEngine
    → ApprovedKnowledgeGovernanceRecord

New (Milestone 043):
  ApprovedKnowledgeGovernanceRecord + proposedConcept
    → applyApprovedChange()
    → guardInput (converted from record)
    → evaluateGuard() → GuardResult
    → KnowledgeGraph.addConcept() or updateConcept() or retireConcept()
    → MutationResult + ConceptProvenanceRecord

Existing (proven ✓):
  KnowledgeGraph.getConcept() ← future DCs retrieve improved understanding
```

---

## Files Required

**New:**
```
lib/knowledge-governance/applyApprovedChange.ts     — the integration function
lib/knowledge-governance/__tests__/applyApprovedChange.test.ts — integration tests
```

**Unchanged:**
```
lib/knowledge-governance/writeGuard.ts              — guard (complete ✓)
lib/knowledge/KnowledgeGraph.ts                     — mutation methods (complete ✓)
lib/knowledge/KnowledgeGraphMutation.ts             — operations (complete ✓)
lib/knowledge-governance/KnowledgeGovernanceEngine.ts — produces record (complete ✓)
lib/reflection/ReflectionEngine.ts                  — upstream (complete ✓)
lib/learning/LearningEngine.ts                      — upstream (complete ✓)
```

---

## The Eight Tests

| Test | What it proves |
|---|---|
| Valid learning enters graph | Full chain from record to concept in KnowledgeGraph |
| Missing provenance rejected | Guard catches broken chain before mutation |
| Self-approval rejected | Creator ≠ Approver — reviewedBy absent on professional scope |
| Constitutional modification rejected | Invariant 1 — unconditional |
| Human review preserved | Record carries reviewedBy; provenance records it |
| Previous understanding preserved | updateConcept preserves previous state in provenance |
| New understanding available to DC | getConcept() returns the new concept |
| Reflection trace recoverable | getConceptHistory() links back to governance record |

---

## The Scenario (from Milestone 043 Proposal)

The first governed capability proves the trunk, not the branches. The scenario uses the **repeated questions pattern** from the living demonstration:

```
Learning proposal: "Shared situational context reduces repeated clarification."
Source: ReflectionEngine findings from a repeated-question execution
Governance: Hospitality HQ approves
Guard: all invariants pass
Mutation: concept added to KnowledgeGraph as "candidate"
Result: future Annie can form Understanding informed by this concept
```

The test does not simulate Annie improving. It proves the concept is in the graph with correct provenance, and can be retrieved.

---

## What This Milestone Does Not Include

- Annie's formation pipeline integration
- Real venue execution records (tests use representative fixtures)
- Pollination
- Multiple-venue evidence accumulation
- Status elevation from "candidate" to "validated"

One goal: prove the trunk. A governed learning can grow a branch. Every root holds.

---

## Success Condition

> The concept `"shared-situational-context-reduces-clarification"` exists in KnowledgeGraph after a governed `ApprovedKnowledgeGovernanceRecord` is applied. The provenance chain is unbroken from execution to concept. The Write Guard confirmed all invariants. No root was compromised.

---

**Status:** Bridge identified | Integration function scoped | Eight tests defined | Files listed | Success condition clear | Implementation ready
