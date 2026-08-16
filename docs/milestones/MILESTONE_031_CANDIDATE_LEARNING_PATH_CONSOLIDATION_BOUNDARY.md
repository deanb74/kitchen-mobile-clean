# Milestone 031 — Learning Path Consolidation Boundary

**Date:** 2026-08-06  
**Status:** Achieved — Decision Recorded  
**Depends on:** Milestone 030 — KnowledgeGraph Mutation Layer Analysis  
**Constraint:** No code changes. Decision and documentation only.

---

## The Question

Two learning pathways exist in `lib/knowledge/`. Only one can govern the mutation layer. This analysis determines which.

---

## Evidence: The Two Pathways

### Pathway A — CandidateLearning + ValidationQueue (older)

```typescript
// lib/knowledge/CandidateLearning.ts
interface CandidateLearning {
  id: string;
  observation: string;             // free-text description
  proposedConceptName: string;     // DC invents the name
  proposedDefinition: string;      // DC writes the definition
  evidence: CandidateEvidence[];   // free-text with sourceType
  confidence: number;
  status: "pending" | "validated" | "rejected";
  proposedRelatedConceptIds: string[];
  reviewedAt?: string;
  reviewedBy?: string;
  reviewReason?: string;
}
```

```typescript
// lib/knowledge/ValidationQueue.ts
class ValidationQueue {
  add(candidate): void
  getById(id): CandidateLearning | undefined
  getAll(): CandidateLearning[]
  getByStatus(status): CandidateLearning[]
  validate(id, reviewedBy, reason): CandidateLearning   // → status: "validated"
  reject(id, reviewedBy, reason): CandidateLearning     // → status: "rejected"
}
```

**Provenance chain:** None. `CandidateLearning` contains no link to `Reflection`, `Execution`, or `Action`.

**Connection to `KnowledgeGraph`:** None. After `ValidationQueue.validate()` returns a `CandidateLearning`, no code path leads to `KnowledgeGraph` or `ConceptIndex`.

**Imports:** `CandidateLearning` is imported only by `ValidationQueue`. `ValidationQueue` is imported by nothing except `lib/knowledge/index.ts` (the export barrel). No tests exist for either.

---

### Pathway B — LearningEngine → KnowledgeGovernanceEngine (governed chain)

```typescript
// lib/learning/Learning.ts
interface Learning {
  id: string;
  context: LearningContext;      // reflectionId + actionId + executionId — full provenance
  evidence: LearningEvidence[];  // derived from Reflection — systematic, not free-text
  proposal?: LearningProposal;   // whatShouldChange + supportingEvidence
  disposition: LearningDisposition;  // reject | observe | propose | reinforce
  validation: { state: LearningValidationState };
  requiresHuman: boolean;
  confidence: number;
}
```

**Provenance chain:** Complete. `LearningContext` carries `reflectionId`, `actionId`, `executionId`, and `executionCreatedAt`. Every `Learning` record traces to a real Execution.

**Connection to KnowledgeGovernanceEngine:** Direct. `KnowledgeGovernanceEngine.review({ learning })` takes `Learning` and produces `KnowledgeGovernance` → `ApprovedKnowledgeChange`.

**Connection to mutation layer (planned):** `ApprovedKnowledgeChange` → `WriteGuard` → `KnowledgeGraphMutation`.

---

## Question 1: Can CandidateLearning Reach KnowledgeGraph Without Passing Learning → Governance → Guard?

**Finding: CandidateLearning cannot currently reach KnowledgeGraph through any code path.**

Tracing the pathway:

```
CandidateLearning
        ↓
ValidationQueue.validate()
        ↓
CandidateLearning { status: "validated" }
        ↓
[DEAD END — nothing imports or processes this]
```

`ValidationQueue.validate()` returns a `CandidateLearning` with `status: "validated"`. No code then takes that result and writes it to `KnowledgeGraph` or `ConceptIndex`. The pathway terminates after validation.

A developer could manually extract the `proposedConceptName` and `proposedDefinition`, construct a `Concept`, and call `ConceptIndex.add()` directly — but no current code does this, and the write guard (Milestone 029) would prevent any future code from doing so without governance approval.

**Current risk: low — no connection exists. Future risk: medium — the pathway structure implies an intention to connect, and without deprecation, a future developer might attempt to complete it unsafely.**

---

## Question 2: Does ValidationQueue Provide Any Capability Not in the Governed Chain?

### What Pathway A can do that Pathway B currently cannot

`CandidateLearning` allows a DC to **propose an entirely new concept** with a chosen name and definition:

```
proposedConceptName: "Walk-in chiller temperature compliance"
proposedDefinition:  "The practice of maintaining fridge temperature within food safety limits."
```

The governed `Learning` + `LearningProposal` describes *what should change* in prose:

```
whatShouldChange: "Add a concept representing the practice of maintaining fridge temperature..."
```

Pathway A has structured concept construction. Pathway B has unstructured prose proposals.

This difference is real. But it is not a justification for retaining Pathway A.

**Why:** The ability to propose new concepts with custom names and definitions is exactly the kind of unguarded capability the Learning Governance Constitution was designed to prevent. A DC that can freely name and define concepts and have them validated without provenance can shape inherited knowledge outside the governance chain. This is not a feature gap in the governed chain. It is a gap in governance that Pathway A exposes.

### What Pathway B provides that Pathway A does not

1. **Full provenance chain** — `reflectionId → actionId → executionId` linking to real executed actions
2. **Systematic evidence derivation** — evidence is copied from `Reflection.findings` and `Reflection.evidence`, not free-text
3. **Governed disposition** — `reject | observe | propose | reinforce` with specific meanings
4. **Human review flag** — `requiresHuman: boolean` propagated from reflection
5. **Eight governance gate checks** — all from `KnowledgeGovernanceEngine`
6. **Complete traceability** — every learning record can trace back to the experience that produced it

Pathway A has none of these.

### Summary comparison

| Capability | Pathway A | Pathway B |
|---|---|---|
| Provenance to Execution | ❌ None | ✓ Required |
| Evidence from Reflection | ❌ Free-text | ✓ Systematic |
| Governance gate | ❌ None (two-step: add + validate) | ✓ Eight conditions |
| Human review flag | ❌ None | ✓ Propagated from reflection |
| Concept name proposal | ✓ Structured | ✗ Prose only |
| Connected to KnowledgeGraph | ❌ Not connected | 🔴 Not yet, but governed path exists |
| Tests | ❌ None | ✓ Tested |

The single capability Pathway A has that Pathway B lacks — structured concept name proposal — is not a governance virtue. It is an ungoverned capability.

---

## Question 3: If Retained, What Is Its Role?

Testing against the three options:

**Option A — Deprecated historical pathway**

Evidence for: no provenance, no tests, no connection to the graph, no imports outside its own module. It matches every characteristic of a prototype that was superseded before it was wired up.

Evidence against: it is exported from `lib/knowledge/index.ts` — which suggests intentional public exposure. But inspection shows it is not imported by anything outside `lib/knowledge/`. The export is vestigial.

**Option B — Specialised pathway with a defined boundary**

Evidence for: the structured concept proposal (name + definition) is a legitimate use case — a DC observing something genuinely new might need to propose a concept that doesn't exist yet.

Evidence against: that use case should be served by extending `LearningProposal` in the governed chain to support structured concept proposals, not by maintaining a parallel ungoverned pathway. The capability belongs in the governed chain; the current implementation belongs to an earlier time.

**Option C — Merged into governed learning architecture**

This would mean extending `LearningProposal` to support structured concept name and definition proposals, then deprecating `CandidateLearning` and `ValidationQueue`. The valuable structural idea (propose a concept by name) migrates to the governed chain; the ungoverned pathway is retired.

---

## Recommendation: Option A with pathway toward Option C

**Immediate action (no code change): Document `CandidateLearning` and `ValidationQueue` as deprecated.**

They should be marked clearly as superseded by the governed chain. The documentation should record:
- What they were intended to do
- Why they were superseded
- What replaces them
- That they are preserved per Invariant 4 (history is immutable — deprecated, not deleted)

**Future action (not now): Option C — extend `LearningProposal`**

The structured concept proposal capability — a DC proposing a new concept with a name and definition — is architecturally valid. It belongs in `LearningProposal`, not in a separate ungoverned type. When this is needed, `LearningProposal` should be extended to carry optional `proposedConceptName` and `proposedDefinition` fields, governed by the full chain.

This is a future enhancement. It does not block Milestone 030.

---

## What This Resolves for Milestone 030

**The mutation layer connects only to Pathway B.** `KnowledgeGraphMutation` receives `ApprovedKnowledgeChange` from `KnowledgeGovernanceEngine`. It has no connection to `CandidateLearning` or `ValidationQueue`.

With this recommendation:

| Component | Status for Milestone 030 |
|---|---|
| `LearningEngine` → `KnowledgeGovernanceEngine` | Active — the only governed path to mutation |
| `ApprovedKnowledgeChange` | The mutation layer's single input |
| `CandidateLearning` | Deprecated — not connected to mutation |
| `ValidationQueue` | Deprecated — not connected to mutation |

Milestone 030 implementation is now unambiguous.

---

## The Bigger Point

`CandidateLearning` and `ValidationQueue` were built when the question was:

> "How does a DC propose what it has learned?"

The governed chain answered a harder question:

> "How does a DC contribute to what others will inherit — without the chain of trust being broken?"

The first question produced a useful prototype. The second question produced an architecture. The prototype served its purpose: it identified the need. The architecture replaced it.

Deprecating Pathway A is not a correction of a mistake. It is the natural conclusion of architectural maturity.

---

**Status:** Question 1 answered — CandidateLearning cannot reach KnowledgeGraph | Question 2 answered — Pathway A has no ungoverned capability worth retaining | Question 3 answered — Recommendation: Option A (deprecate) with Option C (migrate) as future work | Milestone 030 implementation unblocked

---

## Learning Path Consolidation Decision

### Decision

`CandidateLearning` and `ValidationQueue` are deprecated as an active learning pathway. They are retained as historical architecture per Invariant 4 of the Learning Governance Constitution.

They do not participate in:

```
Learning
→ KnowledgeGovernance
→ ApprovedKnowledgeChange
→ KnowledgeGraphWriteGuard
→ KnowledgeGraph
```

### Why

The previous pathway answered:

> "How can a DC suggest a concept?"

The governed pathway answers:

> "How can a DC contribute knowledge that others may inherit while preserving trust?"

The second question requires provenance, evidence chain, governance authority, human review boundaries, and constitutional protection. The governed pathway provides all of these. The previous pathway provided none. Therefore the governed pathway becomes the only route to inherited knowledge.

### Future Migration

The one structurally valuable capability from `CandidateLearning` survives — proposing a concept by name and definition — but the pathway changes:

```
Not this:

CandidateLearning
        ↓
(KnowledgeGraph — never connected)

But this:

LearningProposal (extended)
  optional: proposedConceptName
  optional: proposedDefinition
        ↓
KnowledgeGovernance
        ↓
Write Guard
        ↓
KnowledgeGraph
```

The capability is inherited. The ungoverned pathway is not.

### Andy Is the Creator, Not the Owner

The temptation: "Andy understands Helping Hand, therefore Andy improves Helping Hand."

The architecture:

```
Andy creates insight
        ↓
LearningProposal asks for authority
        ↓
Governance earns permission
        ↓
ApprovedKnowledgeChange satisfies the constitution
        ↓
Write Guard permits the change
        ↓
KnowledgeGraph updated
```

Andy is the **creator of insight**. He is not the **owner of inheritance**. That separation — between creating learning and controlling what the future inherits — is one of the most important things this architecture establishes.

### Milestone 030 Implementation Boundary — Now Clean

**Inputs:**
```
ApprovedKnowledgeChange
+
GuardResult { permitted: true }
```

**Outputs:**
```
KnowledgeGraph updated
+
ConceptProvenanceRecord created
```

**No involvement from:**
- `CandidateLearning` — deprecated
- `ValidationQueue` — deprecated
- `LearningEngine` internals — upstream, not consulted
- `ReflectionEngine` internals — upstream, not consulted
- DC identity — the mutation layer does not know who proposed

The mutation layer remains exactly as boring as a trusted foundation should be.
