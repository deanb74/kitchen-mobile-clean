# MILESTONE_047_CANDIDATE — Context Source Authority Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- MILESTONE_047_REPOSITORY_ANALYSIS.md — audit complete ✓
- MILESTONE_046 — PersonContextStore proven ✓
- PD-007 — Human Memory Boundary ✓
- PD-008 — Human Trust Boundary ✓
- PD-009 — Context Has Authority ✓

**Constraint:** No implementation. Boundary definition only.
No changes to KnowledgeGraph, governance chain, PersonContextStore, or formation logic behaviour.

---

## The Question

> How does Helping Hand ensure that understanding remembers not only what it knows,
> but where that understanding came from?

---

## The Problem

Context currently loses its source authority at `FormationInstitutionalContext`.

Every institutional context source — venue facts from `ContextStore`, venue profile facts
from `VenueKnowledgeProfile`, and future relationship memory from `PersonContextStore` —
passes through the same adapter boundary and arrives at `form()` as:

```typescript
FormationInstitutionalContext { category: string; key: string; value: string; }
```

The `source` field that exists on each originating type is stripped before formation.

From that point, `Understanding` carries no record of where its institutional context came from.

`LearningEngine` cannot detect that a proposal was informed by relationship memory.

`KnowledgeGovernanceEngine` cannot flag that de-identification is required.

The contamination path is open.

---

## The Risk

Relationship memory can become professional knowledge without governance knowing its origin.

The contamination trace:

```
RelationshipMemoryEntry { personId: "sarah-001", value: "Sarah prefers written instructions." }
    ↓ adapter (source stripped)
FormationInstitutionalContext { value: "Sarah prefers written instructions." }
    ↓ form()
Understanding.summary: "...written instructions reduce clarification needs..."
    ↓ ReflectionEngine
Reflection: "written instruction approach was effective"
    ↓ LearningEngine
LearningProposal.whatShouldChange: "Introduce written instruction approach."
    ↓ KnowledgeGovernanceEngine (no source flag — approves)
    ↓ applyApprovedChange()
KnowledgeGraph: Concept { definition: "Written instructions reduce clarification needs." }
```

Sarah's consent-gated preference has become a professional concept.

The contamination is silent. Not malicious. Not detectable. The source was lost at the adapter.

---

## Frozen Principles

These are not implementation choices. They are permanent constraints.

**Principle 1 — Source authority must survive formation.**

Context that enters formation with a source label must carry that label through to `Understanding`.
A fact's origin is part of its meaning. Stripping it is not simplification — it is information loss.

**Principle 2 — Relationship memory is not professional knowledge.**

`RelationshipMemoryEntry` has `relational authority` — granted by a person's consent,
scoped to a session, specific to a relationship.

`KnowledgeGraph` concepts have `professional authority` — earned through governed experience,
de-identified, inherited by profession.

These are different authorities. They must never be conflated.

**Principle 3 — Venue context is not relationship context.**

`ContextStore` and `VenueKnowledgeProfile` capture venue-level operational facts.
`PersonContextStore` captures person-level relational facts.

A venue fact discovered through conversation is different from a personal preference shared in conversation.
The same `source: "conversation"` label currently describes both — the distinction must be made explicit.

**Principle 4 — Observations are not facts about people.**

When a DC observes "this person appears to be under pressure", that is an `Observation`.
It requires translation, context, formation, and the person's own meaning before it becomes understanding.

It is never directly a `RelationshipMemoryEntry`. It is never directly a `FormationInstitutionalContext`.
The observation pipeline governs its transformation.

**Principle 5 — De-identification requires awareness of origin.**

A `LearningProposal` informed by relationship memory cannot be governed into professional knowledge
without an explicit human decision to de-identify it.

That decision requires the system to know the proposal was informed by relationship memory in the first place.

---

## The Proposed Architecture

### Change 1 — `source?` on `FormationInstitutionalContext`

```typescript
// platform/cos/understanding-formation/types.ts
interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
  source?: "venue-context" | "venue-profile" | "relationship" | "system";   // ADD
}
```

Additive. `form()` does not change. Adapters populate it. Downstream reads it.

Each adapter takes responsibility for its source label:
- `contextEntriesToInstitutional()` → `source: "venue-context"`
- `venueProfileToInstitutional()` → `source: "venue-profile"`
- `relationshipEntriesToFormation()` (future) → `source: "relationship"`

---

### Change 2 — `contextSources?` on `Understanding`

```typescript
// lib/understanding/Understanding.ts
interface Understanding {
  summary: string;
  confidence: number;
  uncertainty: string[];
  completeness?: UnderstandingCompleteness;
  evidenceChain?: string[];
  contextSources?: string[];   // ADD — deduplicated source values from institutional context
  createdAt: string;
  updatedAt: string;
}
```

`form()` populates `contextSources` by collecting and deduplicating `source` values from
`context.institutional[]`. No formation logic changes.

`evidenceChain` remains observation IDs. `contextSources` carries institutional source labels.

---

### Change 3 — `informedByPersonContext?` on `LearningProposal`

```typescript
// lib/learning/Learning.ts
interface LearningProposal {
  whatShouldChange: string;
  why: string;
  expectedBenefit: string;
  confidence: number;
  supportingEvidence: ReadonlyArray<LearningEvidence>;
  knowledgeTargetId?: string;
  informedByPersonContext?: boolean;   // ADD — triggers de-identification requirement
}
```

`LearningEngine` sets `informedByPersonContext: true` when `Understanding.contextSources`
contains `"relationship"`.

`KnowledgeGovernanceEngine` treats `informedByPersonContext: true` identically to
`requiresHuman: true` — a named reviewer must provide explicit de-identification rationale
before approval.

---

## Why All Three Changes Are Necessary

Without Change 1: source enters formation but is stripped immediately.
Without Change 2: source survives the adapter but `Understanding` cannot carry it forward.
Without Change 3: `Understanding` carries the source label but `LearningEngine` ignores it.

Together they form an unbroken chain:

```
RelationshipMemoryEntry
    ↓ relationshipEntriesToFormation()
FormationInstitutionalContext { source: "relationship" }
    ↓ form()
Understanding { contextSources: ["relationship"] }
    ↓ ReflectionEngine (passes Understanding.contextSources forward)
    ↓ LearningEngine
LearningProposal { informedByPersonContext: true }
    ↓ KnowledgeGovernanceEngine
requires explicit de-identification rationale before approval
    ↓ Human reviewer confirms: "Sarah's preference" → de-identified professional insight
    ↓ applyApprovedChange()
KnowledgeGraph (clean — rings intact)
```

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — `source` survives `contextEntriesToInstitutional()` | Venue context retains origin |
| PC2 — `source` survives `venueProfileToInstitutional()` | Venue profile retains origin |
| PC3 — `Understanding.contextSources` is populated by `form()` | Origin survives formation |
| PC4 — `Understanding.contextSources` contains `"relationship"` when relationship context was used | The ring is recorded |
| PC5 — `LearningProposal.informedByPersonContext` is `true` when `contextSources` contains `"relationship"` | Learning detects origin |
| PC6 — `KnowledgeGovernanceEngine` requires reviewer when `informedByPersonContext` is `true` | Governance acts on origin |
| PC7 — A proposal from relationship context cannot be approved without `reviewedBy` | The gate holds |

---

## What Must Not Be Modified

| Component | Reason |
|---|---|
| `form()` logic | No formation behaviour changes — `contextSources` is populated as a read-only aggregation |
| `KnowledgeGraph` | No change — the guard and mutation layer are unchanged |
| `evaluateGuard()` | No new invariants in this milestone |
| `applyApprovedChange()` | No change |
| `PersonContextStore` | No change — it already enforces consent correctly |
| `KnowledgeGovernanceEngine` | No new logic — `informedByPersonContext` is handled the same way as `requiresHuman` |

---

## What This Milestone Is Not

This milestone is not about adding intelligence.

It is not about making Annie smarter, faster, or more capable.

It is about ensuring that when Annie forms understanding, the rings are intact.

A tree that grows fast but has no rings is not a healthy tree.

It is a tree that cannot explain itself.

---

## The Connection to PD-009

PD-009 established:

> A Digital Colleague must remember not only what it knows, but why it is allowed to know it.

Milestone 047 is the engineering proof of PD-009.

The three changes are the mechanism by which "why it is allowed to know it" travels from
context source through formation through learning to governance.

Without these three fields, PD-009 is a principle without an architecture.

With them, the principle has rings.
