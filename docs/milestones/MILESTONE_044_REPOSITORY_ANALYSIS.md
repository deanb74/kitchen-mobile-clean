# MILESTONE_044_REPOSITORY_ANALYSIS — Digital Colleague Learning Loop

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 044 — Digital Colleague Learning Loop Demonstration
**Purpose:** Identify the smallest missing connection to prove: Memory → Better Future Understanding

---

## Objective

Prove:

> A Digital Colleague can experience, form understanding, reflect, learn, pass governance, retain memory, and use that understanding to improve future judgement.

This document records what exists, what is missing, and what the demonstration requires.

No implementation is contained here.

---

## Part 1 — Existing Components That Support Milestone 044

### 1.1 Formation Chain

| Component | File | Status |
|---|---|---|
| `form()` — Understanding Formation | `platform/cos/understanding-formation/formation.ts` | Active |
| `FormationInput` type | `platform/cos/understanding-formation/types.ts` | Active |
| `FormationKnowledge[]` input slot | `platform/cos/understanding-formation/types.ts` | Active — awaits governed concepts |
| `Translation` type and rules | `platform/cos/translation/` | Active |
| Readiness Gate | `platform/cos/understanding-formation/readiness.ts` | Active |
| Annie context adapter | `lib/annie/formation/contextAdapter.ts` | Active |
| Annie knowledge adapter (OS→Formation) | `lib/annie/formation/knowledgeAdapter.ts` | Active — wired to OS; not yet to KnowledgeGraph |

### 1.2 Execution, Reflection, Learning

| Component | File | Status |
|---|---|---|
| `Execution` type | `lib/execution/Execution.ts` | Active |
| `ExecutionEngine` | `lib/execution/ExecutionEngine.ts` | Active |
| `ReflectionEngine.reflect()` | `lib/reflection/ReflectionEngine.ts` | Active |
| `Reflection` type | `lib/reflection/Reflection.ts` | Active |
| `LearningEngine.build()` | `lib/learning/LearningEngine.ts` | Active |
| `Learning` type with proposal | `lib/learning/Learning.ts` | Active |

### 1.3 Governance Chain

| Component | File | Status |
|---|---|---|
| `KnowledgeGovernanceEngine.build()` | `lib/knowledge-governance/KnowledgeGovernanceEngine.ts` | Active |
| `ApprovedKnowledgeGovernanceRecord` type | `lib/knowledge-governance/KnowledgeGovernance.ts` | Active |
| `evaluateGuard()` — Write Guard | `lib/knowledge-governance/writeGuard.ts` | Active — 27 tests |
| `applyApprovedChange()` — bridge | `lib/knowledge-governance/applyApprovedChange.ts` | Active — 12 tests |

### 1.4 Memory (KnowledgeGraph)

| Component | File | Status |
|---|---|---|
| `KnowledgeGraph` — governed store | `lib/knowledge/KnowledgeGraph.ts` | Active |
| `KnowledgeGraph.getConcept()` | `lib/knowledge/KnowledgeGraph.ts` | Active |
| `KnowledgeGraph.search()` | `lib/knowledge/KnowledgeGraph.ts` | Active |
| `KnowledgeGraph.getConceptHistory()` | `lib/knowledge/KnowledgeGraph.ts` | Active |
| `ConceptProvenanceStore` | `lib/knowledge/ConceptProvenanceRecord.ts` | Active |
| `UnderstandingEngine.understandConcept()` | `lib/understanding/UnderstandingEngine.ts` | Active — reads KnowledgeGraph |

### 1.5 Judgement

| Component | File | Status |
|---|---|---|
| `JudgementEngine.build()` | `lib/judgement/JudgementEngine.ts` | Active |
| `Judgement` type | `lib/judgement/Judgement.ts` | Active |

### 1.6 OS Knowledge Routing (separate track — not governing formation)

| Component | File | Status |
|---|---|---|
| `HelpingHandOS.answer()` | `lib/os/helpingHandOS.ts` | Active |
| `KnowledgeRouter` | `lib/os/routing/knowledgeRouter.ts` | Active |
| `InMemoryKnowledgeStore` | `lib/os/knowledge/testing/inMemoryKnowledgeStore.ts` | Active |
| `recall()` — RecallEngine | `lib/os/recall/recallEngine.ts` | Placeholder — returns `[]` |

### 1.7 Annie's Living Memory (early prototype — not yet connected)

| Component | File | Status |
|---|---|---|
| `LivingMemory` interface | `lib/annie/memory/livingMemory.ts` | Prototype — not wired |
| `shouldReviewMemory()` | `lib/annie/memory/livingMemory.ts` | Prototype — not wired |

---

## Part 2 — The Missing Loop

### 2.1 What Exists

```
Experience
    ↓ [form()]
Understanding
    ↓ [JudgementEngine]
Judgement
    ↓ [ExecutionEngine]
Execution
    ↓ [ReflectionEngine]
Reflection
    ↓ [LearningEngine]
Learning
    ↓ [KnowledgeGovernanceEngine + applyApprovedChange()]
KnowledgeGraph (Concept stored with full provenance)
```

### 2.2 What Does Not Yet Exist

```
KnowledgeGraph
    ↓ ← THIS WIRE IS MISSING
FormationKnowledge[]
    ↓
form()
    ↓
Better Understanding on second encounter
```

### 2.3 The Exact Missing Connection

`FormationInput.knowledge` accepts `FormationKnowledge[]`:

```typescript
interface FormationKnowledge {
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
}
```

The existing `knowledgeAdapter.ts` converts OS `KnowledgeAnswer` objects into `FormationKnowledge[]`. This works for profession-level knowledge routed through `HelpingHandOS`.

Governed `Concept` objects in `KnowledgeGraph` are not yet converted into `FormationKnowledge[]`. When Annie experiences a situation similar to one she has encountered before, the governed concept in her KnowledgeGraph does not reach her `form()` call.

**The missing component is a single adapter function:**

```typescript
// Converts governed Concept[] from KnowledgeGraph into FormationKnowledge[]
// for use as the `knowledge` input to form().
function governedConceptsToFormation(concepts: Concept[]): FormationKnowledge[]
```

**Location:** `lib/annie/formation/governedKnowledgeAdapter.ts`

This mirrors the existing `lib/annie/formation/knowledgeAdapter.ts` pattern exactly.

### 2.4 Why This Is The Smallest Connection

It does not modify:
- `form()` — no change
- `KnowledgeGraph` — no change
- `applyApprovedChange()` — no change
- `evaluateGuard()` — no change
- `JudgementEngine` — no change
- Any governance chain component

It adds:
- One adapter function (parallel to existing `knowledgeAnswerToFormation`)
- One integration test demonstrating the loop closes

### 2.5 The Evidence Level Mapping

`Concept.evidenceLevel` (`EvidenceLevel`) and `FormationKnowledge.evidenceLevel` use different vocabularies:

| `EvidenceLevel` (Concept) | Maps to `FormationKnowledge.evidenceLevel` | Rationale |
|---|---|---|
| `"constitutional"` | `"constitutional"` | Direct — highest authority |
| `"multi-source"` | `"professional"` | Multi-source evidence qualifies for professional formation |
| `"single-source"` | `"local"` | Single-source is local until reinforced |
| `"candidate"` | **excluded** | Candidate understanding must not influence formation — it has not passed governance |

This mapping protects against premature understanding propagation. A concept that has not earned trust through the governance chain does not enter formation.

---

## Part 3 — The First Demonstration

### 3.1 Scenario

> Annie experiences repeated shift transition confusion at The Anne Arms.

**Encounter 1:** Annie has no prior understanding of this pattern.

```
Observation: Incoming staff report repeated confusion at shift handover
Translation: "Shift transitions are creating operational uncertainty"
Context: urgency=medium, venue=The Anne Arms, shift transition
KnowledgeGraph.search("shift transition"): []    ← nothing yet
form(translations, context, knowledge=[])
Understanding: partial confidence — no prior pattern
```

Governance approves learning. `applyApprovedChange()` enters concept into `KnowledgeGraph`:

```
Concept {
  id: "shared-situational-context-reduces-clarification"
  evidenceLevel: "multi-source"
  scope: "professional"
  inheritsTo: ["hospitality"]
}
```

**Encounter 2:** A similar shift transition situation arises at the same venue.

```
Observation: New incoming staff member reports confusion at handover
Translation: "Shift transition context unclear"
Context: urgency=medium, venue=The Anne Arms, shift transition
KnowledgeGraph.search("shift transition"): [Concept above]
governedConceptsToFormation([concept]): [{ principle: "...", evidenceLevel: "professional" }]
form(translations, context, knowledge=[governed principle])
Understanding: higher confidence — prior governed pattern informs synthesis
```

**What changes between Encounter 1 and Encounter 2:**
- `form()` is called identically — no change to formation mechanism
- `KnowledgeGraph.search()` returns a concept on Encounter 2 that did not exist on Encounter 1
- `FormationKnowledge[]` is no longer empty
- Formation synthesises with informed context

Annie does not retrieve an answer. She retrieves context that improves her understanding.

### 3.2 Measurable Difference

The demonstration passes when:

1. Encounter 1 `Understanding.confidence` is lower than Encounter 2 `Understanding.confidence`
2. Encounter 1 `Understanding.completeness` is `"partial"` or `"insufficient"`
3. Encounter 2 `Understanding.completeness` is `"sufficient"` or `"partial"` — but with lower uncertainty
4. Encounter 2 `FormationKnowledge[]` contains the concept governed from Encounter 1
5. Provenance chain from Encounter 2 Understanding traces back through governance to Encounter 1 execution

---

## Part 4 — Recommended File Locations

| File | Purpose |
|---|---|
| `lib/annie/formation/governedKnowledgeAdapter.ts` | Converts `Concept[]` → `FormationKnowledge[]` |
| `lib/annie/formation/__tests__/governedKnowledgeAdapter.test.ts` | Unit tests for the adapter mapping |
| `lib/annie/formation/__tests__/milestone-044-learning-loop.test.ts` | Integration test — Encounter 1 → Governance → Encounter 2 |

No new directories. No new frameworks. All three files follow existing patterns.

---

## Part 5 — Proposed Tests

### 5.1 Unit Tests — `governedKnowledgeAdapter.test.ts`

| Test | Purpose |
|---|---|
| `"constitutional"` concept maps to `"constitutional"` formation knowledge | Direct mapping |
| `"multi-source"` concept maps to `"professional"` formation knowledge | Evidence promotion |
| `"single-source"` concept maps to `"local"` formation knowledge | Conservative mapping |
| `"candidate"` concept is excluded | Premature understanding is blocked |
| Multiple concepts produce multiple `FormationKnowledge` entries | Array handling |
| Empty concept list returns empty `FormationKnowledge[]` | Edge case |
| Concept `definition` becomes `FormationKnowledge.principle` | Content mapping |

### 5.2 Integration Test — `milestone-044-learning-loop.test.ts`

| Test | Purpose |
|---|---|
| Encounter 1 formation has empty governed knowledge | Baseline |
| Governance approves concept from Encounter 1 reflection | Loop produces memory |
| KnowledgeGraph contains concept after governance | Memory persists |
| `governedConceptsToFormation()` retrieves applicable concepts | Retrieval works |
| Encounter 2 formation knowledge includes governed concept | Memory reaches formation |
| Encounter 2 understanding has higher confidence than Encounter 1 | Loop improves judgement |
| Provenance chain links Encounter 2 back to Encounter 1 execution | Traceability intact |

---

## Part 6 — Architectural Risks

### Risk 1: Evidence Level Mismatch

**Risk:** `Concept.evidenceLevel` values (`"candidate"`, `"single-source"`, `"multi-source"`, `"constitutional"`) do not map cleanly to `FormationKnowledge.evidenceLevel` (`"constitutional"`, `"professional"`, `"local"`).

**Mitigation:** The mapping table in Part 2.5 is the governing rule. `"candidate"` concepts are excluded. The mapping must be implemented as a lookup, not inference.

**Verdict:** Known and handled. Not a blocker.

---

### Risk 2: RecallEngine Is a Placeholder

**Risk:** `lib/os/recall/recallEngine.ts` returns `[]` — it has no implementation. The Milestone 044 demonstration must not depend on it.

**Mitigation:** The loop closes through `KnowledgeGraph.search()` directly, not through `RecallEngine`. The demonstration uses `search()` because the concept was just governed into the same graph instance. `RecallEngine` is a separate concern for distributed recall — not required for Milestone 044.

**Verdict:** Not a blocker for this milestone. RecallEngine is out of scope.

---

### Risk 3: LivingMemory Is a Prototype

**Risk:** `lib/annie/memory/livingMemory.ts` has its own `LivingMemory` interface that is not connected to `KnowledgeGraph` or `ConceptProvenanceStore`. A future developer might treat it as the canonical memory mechanism.

**Mitigation:** `LivingMemory` is an early architectural prototype predating the governed knowledge architecture. It is not deprecated but it is not the Milestone 044 mechanism. The demonstration goes through `KnowledgeGraph`, not `LivingMemory`. `LivingMemory` captures the intent; `KnowledgeGraph` with `ConceptProvenanceStore` is the governed implementation.

**Verdict:** Document the distinction. Do not deprecate — the intent is correct. Do not use it in the demonstration.

---

### Risk 4: KnowledgeGraph Scope

**Risk:** The Milestone 044 demonstration uses a single `KnowledgeGraph` instance for both encounters. In production, graph instances may be per-session or per-colleague.

**Mitigation:** The test is valid as an architectural proof even with a shared in-memory instance. The scope question (how long does a KnowledgeGraph live? per DC? per venue?) is a production concern, not a loop closure concern. The test should document this assumption explicitly.

**Verdict:** Document assumption. Not a blocker.

---

### Risk 5: Scope Boundary — Hospitality Only

**Risk:** `Concept.inheritsTo: ["hospitality"]` means the governed concept should only reach Annie and other hospitality DCs. If `governedConceptsToFormation()` ignores scope, Harry (healthcare) could receive hospitality concepts.

**Mitigation:** The adapter must accept a `scope` or `profession` parameter and filter concepts by `inheritsTo`. Annie's adapter should filter for `"hospitality"` (or `"all"`). This is not a new constraint — it mirrors how `KnowledgeRouter` routes by `colleague.profession`.

**Verdict:** The adapter must include scope filtering. This is a required constraint, not an optional enhancement.

---

## Part 7 — Implementation Boundary

When Milestone 044 implementation begins, these are the constraints:

**Implement only:**
- `governedConceptsToFormation(concepts: Concept[], forProfession: string): FormationKnowledge[]`
- Its unit tests
- The loop integration test

**Do not modify:**
- `form()` — no change
- `KnowledgeGraph` — no change
- `applyApprovedChange()` — no change
- `evaluateGuard()` — no change
- `JudgementEngine` — no change
- Any governance, reflection, or learning component

**The purpose is to prove the loop closes — not to improve intelligence.**

---

## Summary

### The Missing Wire

```typescript
// This function does not yet exist.
// It is the only thing needed to close the loop.
function governedConceptsToFormation(
  concepts: Concept[],
  forProfession: string,
): FormationKnowledge[]
```

### What It Proves

When this function exists and the loop integration test passes:

> A Digital Colleague can experience, form understanding, reflect, learn, pass governance, retain memory, and use that understanding to improve future judgement.

Not through intelligence.

Through governed understanding that travels safely between experiences.

The leaf learns from sunlight.
