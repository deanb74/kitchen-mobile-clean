# Milestone 025 Candidate — Knowledge Inheritance Governance Boundary

**Date:** 2026-08-05  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 024 — Learning Governance Boundary Analysis  
**Constraint:** No code changes. No new types. No KnowledgeGraph changes.

---

## The Question

> What governance rules must protect inherited knowledge while allowing experience to improve it?

The loop cannot be closed safely without first settling these rules. This analysis defines them.

---

## Critical Finding: KnowledgeGraph Is Currently Read-Only

Before any other analysis, this must be stated.

```typescript
// lib/knowledge/KnowledgeGraph.ts — current public API
getConcept(idOrName)      → Concept | undefined
requireConcept(idOrName)  → Concept
getConcepts()             → Concept[]
search(query)             → Concept[]
getNode(idOrName)         → KnowledgeGraphNode
findPath(from, to)        → ConceptPath | undefined
getMissingReferences()    → ConceptConnection[]
```

There are no write operations. `addConcept()`, `updateConcept()`, `retireConcept()` do not exist.

The wire from `ApprovedKnowledgeChange` to `KnowledgeGraph` cannot be built without first adding write operations. This is not a governance decision — it is an architectural prerequisite.

**Implication for sequencing:** The governance rules in this document define the constraints those write operations must enforce. Governance comes first. Write operations follow.

---

## The Concept Type: Governance Fields Already Exist

`Concept` already carries the fields needed for inheritance governance:

```typescript
// lib/knowledge/Concept.ts
export type ConceptStatus =
  | "candidate" | "validated" | "core-principle" | "deprecated";

export type EvidenceLevel =
  | "candidate" | "single-source" | "multi-source" | "constitutional";

export type ConceptScope =
  | "universal" | "helping-hand" | "professional";

export type ConceptOwner =
  | "Helping Hand Constitution" | "Helping Hand Academy" | "Helping Hand"
  | "Hospitality HQ" | "Healthcare HQ" | "Construction HQ" | string;

export type ConceptInheritance =
  | "all" | "helping-hand" | "hospitality" | "healthcare" | "construction" | string;
```

These fields are the governance vocabulary. The rules below are expressed in terms of them.

---

## 1. Authority Boundaries by Knowledge Level

### Level 1 — Local Knowledge

```
ConceptScope:     "professional" (venue-specific instance)
ConceptStatus:    "candidate" or "validated"
ConceptInheritance: [venue-id]
```

Authority to modify: the DC at the venue.  
Review requirement: none — changes remain local.  
Propagation: `["digital-colleague"]` only.  
Examples: venue layout, local procedures, equipment inventory, operating hours.

---

### Level 2 — Organisational Knowledge

```
ConceptScope:     "helping-hand" (organisation-specific)
ConceptStatus:    "candidate" or "validated"
ConceptInheritance: [organisation-id]
```

Authority to modify: Organisation HQ (where present).  
Review requirement: named organisation-level reviewer required.  
Propagation: `["digital-colleague", "organisation-hq"]`.  
Examples: company procedures, menus, cross-venue operating patterns.

---

### Level 3 — Professional Knowledge

```
ConceptScope:     "professional"
ConceptStatus:    "validated"
ConceptInheritance: ["hospitality"] | ["healthcare"] | ["construction"]
ConceptOwner:     "Hospitality HQ" | "Healthcare HQ" | "Construction HQ"
```

Authority to modify: Professional HQ for this profession.  
Review requirement: human review mandatory. `reviewedBy` must name a Professional HQ authority.  
Propagation: routes through `profession-hq`.  
Examples: food safety thresholds, clinical protocols, structural safety standards.

---

### Level 4 — Universal Knowledge

```
ConceptScope:     "universal"
ConceptStatus:    "validated"
ConceptInheritance: ["all"]
ConceptOwner:     "Helping Hand" | "Helping Hand Academy"
```

Authority to modify: Helping Hand HQ.  
Review requirement: human review mandatory. Named HH authority. Recorded and traceable.  
Propagation: `["digital-colleague", "profession-hq", "helping-hand-hq"]`.  
Examples: Companion Intelligence patterns, cross-profession governance principles.

---

### Level 5 — Constitutional Knowledge: IMMUTABLE THROUGH LEARNING LOOP

```
ConceptScope:     "universal"
ConceptStatus:    "core-principle"
EvidenceLevel:    "constitutional"
ConceptOwner:     "Helping Hand Constitution"
ConceptInheritance: ["all"]
```

Authority to modify: constitutional process only. Not the learning loop.  
Review requirement: not applicable — this level is not accessible to the learning pipeline.  
Propagation: universal. Inherited by every DC.  
Examples: "Seek first to understand", People First, Trust principles.

**The immutability rule is absolute, not discretionary.** Any `ApprovedKnowledgeChange` that targets a concept with `status: "core-principle"` and `evidenceLevel: "constitutional"` must be rejected by the write operation before it reaches `KnowledgeGraph`. This is an architectural constraint.

---

## 2. Inheritance Rules

### Precision on Local Knowledge

A refinement to the principle stated in Milestone 024:

> "Local knowledge stays at the venue layer."

This is correct but incomplete. The more precise statement:

> Local knowledge can **inform** higher layers. It cannot **become** higher-layer authority without passing through governance.

The distinction matters:

```
What is not permitted:

  Local experience  →  Professional knowledge
                        (no governance boundary)

What is permitted:

  Local experience
        ↓
  Learning candidate
        ↓
  Governed review
        ↓
  Professional knowledge  (only if governance approves at professional level)
```

The governance boundary is the transition point, not the origin. Where a learning originated does not permanently limit where it can arrive — but it must earn each layer of authority through the review process at that layer.

---

### What May Remain Local

A concept remains local when:

- Its `ConceptInheritance` contains only a venue ID
- It contains personal or relationship-specific context
- Its `evidenceLevel` is `"candidate"` or `"single-source"` — insufficient breadth to justify sharing
- `LearningDisposition: "observe"` — not yet ready to propose
- `LearningDisposition: "reject"` — explicitly not retained
- `PollinationCandidate.reusable: false` — not transferable beyond origin context

---

### What May Become a Learning Candidate

A concept may become a candidate when:

1. `LearningDisposition: "propose"` or `"reinforce"` — a proposal exists
2. `PollinationCandidate.reusable: true` — applies beyond origin
3. `confidence ≥ 0.9`
4. All eight pollination gate conditions pass
5. **The target concept scope does not exceed the source's authority level without explicit governance approval at the target level**

The key inheritance rule:

```
Venue experience         → may become a professional-scope candidate
                           only with professional-level governance review
Professional experience  → may become a universal-scope candidate
                           only with universal-level governance review
Universal experience     → may not reach constitutional level
                           through the learning loop at all
```


### What May Affect Future Digital Colleagues

Changes that propagate to future DCs must satisfy:

1. Governance approval at the appropriate layer
2. Human review (mandatory at professional and universal levels)
3. `changeIntent` is `"create"`, `"update"`, `"reinforce"`, `"supersede"`, or `"merge"`
4. Source authority level matches or exceeds target concept scope
5. Provenance chain is complete: experience → execution → reflection → learning → governance

---

### What May Never Be Changed Through the Learning Loop

Any concept where both:
```
status: "core-principle"
evidenceLevel: "constitutional"
```

These are the foundation from which all Understanding derives. A mistaken or corrupted learning that reached this level would affect every future DC. The risk is not acceptable. The protection must be architectural.

---

## 3. Review Authority

### Who May Approve Changes at Each Level

| Level | Change target | Required reviewer |
|---|---|---|
| Local | `inheritsTo: [venue-id]` | DC itself (no external review) |
| Organisational | `inheritsTo: [org-id]` | Named organisation authority |
| Professional | `inheritsTo: [profession-id]` | Named Professional HQ authority |
| Universal | `inheritsTo: ["all"]` (validated) | Named HH HQ authority |
| Constitutional | `evidenceLevel: "constitutional"` | **Not accessible via learning loop** |

`KnowledgeGovernanceEngine.build()` already accepts `reviewedBy?: string`. The gap: currently any string value is accepted. The governance framework must define what values are valid for `reviewedBy` at each level.

### When Human Review Is Mandatory

Human review is mandatory when:

- `Learning.requiresHuman: true` — set by `LearningEngine` when safety signals present
- `PollinationCandidate.safetyCritical: true` — always requires human
- Change targets `ConceptScope: "professional"` — affects other DCs
- Change targets `ConceptScope: "universal"` — affects all DCs
- `changeIntent` is `"supersede"` or `"retire"` — replacing or withdrawing knowledge

Human review is not required when:

- Change is local-only (`inheritsTo: [venue-id]`)
- `Learning.requiresHuman: false`
- `safetyCritical: false`
- `LearningDisposition: "reinforce"` with `confidence ≥ 0.9` (reinforcing locally)

---

## 4. Provenance Requirements

An `ApprovedKnowledgeChange` may not enter `KnowledgeGraph` without a complete provenance chain. The chain already exists in the type structure:

```
ApprovedKnowledgeChange
  ├── sourceLearningId       → Learning.id
  ├── context.reflectionId   → Reflection.id
  ├── context.actionId       → Action.id
  ├── context.executionId    → Execution.id
  ├── context.executionCreatedAt  → when the experience occurred
  └── (if human-reviewed)
       ├── reviewedBy         → named authority
       └── reviewedAt         → when the review occurred
```

**Minimum provenance by level:**

| Level | Minimum provenance |
|---|---|
| Local | `learningId` + `executionId` |
| Organisational | + `reflectionId` + `reviewedBy` (org authority) |
| Professional | + all above + `reviewedBy` (HQ authority) + `reviewedAt` |
| Universal | + full chain + named HH HQ authority + explicit `conditions[]` |
| Constitutional | Not accessible |

The `conditions` field in `KnowledgeGovernanceEngine.build()` allows reviewers to attach conditions to an approval (e.g., "approved pending one additional evidence point"). Conditions must be met before the change enters `KnowledgeGraph`.

---

## 5. The Pollination Relationship

Three systems exist. They serve different purposes and must not be conflated.

**KnowledgeGovernanceEngine** — reviews a specific learning proposal and decides whether to apply it to the local `KnowledgeGraph`. Scope: one DC. Timing: after each significant learning event.

**Pollination** — determines whether a learning should be shared with other DCs. Scope: cross-DC. Timing: after governance review confirms sharing value.

**KnowledgeGraph** — stores governed concepts. Scope: per-DC (future DCs inherit an initial state). Current state: read-only.

### How They Relate

```
Execution outcome
        ↓
Reflection → Learning
        ↓
        ├── KnowledgeGovernance
        │     ApprovedKnowledgeChange
        │         ↓
        │   [write to local KnowledgeGraph]  ← NOT YET IMPLEMENTED
        │
        └── Pollination
              PollinationCandidate
                  ↓
              evaluateGovernance() + evaluateCandidate()
                  ↓
              PollinationDecision (local / profession / forest)
                  ↓
              [distribution to HQ]  ← NOT YET CONNECTED
```

These are independent decisions. Governance approval for local application does not automatically mean the learning should be shared. Pollination requires its own gate evaluation.

### The Bridge Fields

The bridge from `Learning` to `PollinationCandidate` maps as follows:

| `PollinationCandidate` field | Derived from |
|---|---|
| `source` | `learning.id` or DC id |
| `confidence` | `learning.confidence` |
| `reusable` | `proposal` exists AND `concept.scope ≠ "venue"` |
| `professionSpecific` | `concept.inheritsTo` contains profession but not `"all"` |
| `safetyCritical` | `reflection.findings` contains `category: "safety"` |
| `evidenceProvided` | `learning.evidence.length > 0` |
| `reflectionComplete` | `reflection.disposition ≠ "defer"` |
| `privacyChecked` | **Human sign-off required — cannot be derived** |
| `safetyChecked` | **Human sign-off required — cannot be derived** |
| `contextValidated` | **Human sign-off required — cannot be derived** |
| `current` | `concept.status ≠ "deprecated"` |

Three fields require explicit human acknowledgment. This is intentional — the pollination gate prevents automatic sharing by requiring sign-off on privacy, safety, and contextual applicability.

---

## 6. Write Operations Required

`KnowledgeGraph` needs write operations before the loop can close. This analysis defines what those operations must enforce, not how they should be built.

**`addConcept(concept, provenance)`**
- Reject if concept with same `id` already exists
- Reject if `evidenceLevel: "constitutional"` (not added through learning loop)
- Record `ApprovedKnowledgeChange` provenance

**`updateConcept(id, changes, provenance)`**
- Reject if `status: "core-principle"` AND `evidenceLevel: "constitutional"`
- Reject if source authority level is below concept scope
- Preserve original value in provenance record

**`retireConcept(id, provenance)`**
- Set `status: "deprecated"` — never delete
- Require `reviewedBy` at concept's authority level
- Preserve full history

---

## 7. Five Governance Invariants

These must be enforceable before any write operations are built.

**Invariant 1 — Constitutional concepts are immutable**  
No concept with `status: "core-principle"` and `evidenceLevel: "constitutional"` may be modified through the learning loop. This is architectural, not discretionary.

**Invariant 2 — Professional changes require named authority**  
A change to a `ConceptScope: "professional"` concept requires a named Professional HQ authority in `reviewedBy`. Self-review is not valid.

**Invariant 3 — Provenance chain must be unbroken**  
An `ApprovedKnowledgeChange` without a complete chain from `executionId` to `learningId` may not enter `KnowledgeGraph`.

**Invariant 4 — Retirement preserves history**  
`changeIntent: "retire"` sets `status: "deprecated"`. Deletion is not permitted. History is immutable.

**Invariant 5 — Evidence level ceiling**  
Changes through the learning loop may not elevate a concept's `evidenceLevel` beyond `"multi-source"`. Elevation to `"constitutional"` requires the constitutional process.

---

## Summary: Settled Decisions

| Question | Decision |
|---|---|
| Who approves local changes? | DC itself — no external review |
| Who approves org changes? | Named org authority |
| Who approves professional changes? | Named Professional HQ authority — human review mandatory |
| Who approves universal changes? | Named HH HQ authority — human review mandatory |
| Can learning change constitutional concepts? | No. Architectural constraint. |
| What provenance is required? | Full chain: Execution → Reflection → Learning → ApprovedKnowledgeChange |
| Can KnowledgeGraph be written to now? | No. Write operations must be designed first. |
| Are Learning and Pollination the same system? | No. Local change governance and cross-DC sharing are independent. |
| Do privacy/safety/context checks require human sign-off? | Yes — three pollination fields cannot be derived from data alone. |
| Can retired concepts be deleted? | No. Deprecated, never deleted. |

---

**Status:** Authority boundaries defined | Inheritance rules settled | Five governance invariants established | KnowledgeGraph write prerequisite identified | Implementation sequencing clear
