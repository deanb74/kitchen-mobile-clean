# Milestone 026 Candidate — Learning Governance Constitution

**Date:** 2026-08-05  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 025 — Knowledge Inheritance Governance Boundary  
**Constraint:** No code. No KnowledgeGraph changes. Rules only.

---

## Why This Comes Before Implementation

The learning loop infrastructure already exists: `ReflectionEngine`, `LearningEngine`, `KnowledgeGovernanceEngine`, `Pollination`. `KnowledgeGraph` is read-only.

Before write operations are designed, the rules they must enforce must be settled. This document is those rules.

> Authority is earned through governance.  
> The write layer enforces the constitution. The constitution comes first.

---

## 1. The Learning Principle

**Foundation statement:**

> Authority is earned through governance.

Supporting principles — in order, each dependent on the one before:

1. **Experience provides evidence.** A DC acts. An outcome occurs. Evidence is recorded.
2. **Reflection identifies significance.** From evidence, reflection determines whether anything should change.
3. **Learning proposes change.** Reflection produces a specific proposal: what should change and why.
4. **Governance determines authority.** Whether the proposal has sufficient evidence, appropriate review, and correct provenance.
5. **Inheritance requires permission.** No change reaches future DCs without explicit approval at the appropriate layer.

**The corollary principle:**

> Learning does not bypass Understanding.

A DC cannot learn from an action it did not understand. `LearningEngine` takes `Reflection` as input. `Reflection` takes `Execution`. `Execution` takes `Action`. `Action` takes `Judgement`. `Judgement` takes `Understanding`.

The full chain must exist. Learning cannot shortcut to the beginning.

---

## 2. The Complete Learning Lifecycle

```
Experience (something happened in the world)
        ↓
Observation (COS — what was perceived)
        ↓
Translation + Context + Knowledge (DC — professional interpretation)
        ↓
Understanding (COS — what does this mean?)
        ↓
Judgement (what should happen?)
        ↓
Action (what did the DC do?)
        ↓
Execution (what actually happened?)
        ↓
Reflection (was this good? should anything change?)
        ↓
Learning (what specifically should change, and why?)
        ↓
Governance (does this change have sufficient authority to proceed?)
        ↓
ApprovedKnowledgeChange (a specific, traceable, governed change record)
        ↓
KnowledgeGraph write (the change enters the knowledge store)
        ↓
Future Understanding (future DCs inherit improved knowledge)
```

Every step in this chain is either proven (Milestones 013–023) or governed (this document). No step may be bypassed.

---

## 3. The Authority Model

Five levels. Each level is more protected than the one below it.

```
Level 5: Constitutional
         ↓ (unreachable via learning loop)
Level 4: Universal
         ↓ (HH HQ review required)
Level 3: Professional
         ↓ (Professional HQ review required)
Level 2: Organisational
         ↓ (Org-level review required)
Level 1: Local
         (no external review; remains at DC)
```

### What Each Level Owns

**Level 1 — Local**

Owns: venue-specific operational knowledge (layouts, procedures, equipment, local patterns).  
Who may approve: the DC at the venue.  
Who inherits: no one — stays local.

**Level 2 — Organisational**

Owns: company-wide procedures, shared standards, cross-venue patterns.  
Who may approve: named organisation authority.  
Who inherits: DCs within the same organisation.

**Level 3 — Professional**

Owns: industry thresholds, professional standards, regulatory knowledge, field best practice.  
Who may approve: named Professional HQ authority. Human review mandatory.  
Who inherits: all DCs in this profession.

**Level 4 — Universal**

Owns: cross-profession principles, governance frameworks, Companion Intelligence patterns.  
Who may approve: named HH HQ authority. Human review mandatory.  
Who inherits: all DCs regardless of profession.

**Level 5 — Constitutional**

Owns: the founding principles from which all understanding derives ("Seek first to understand", People First, Trust principles).  
Who may approve: constitutional process only. Not the learning loop.  
Who inherits: all DCs. Cannot be changed through the learning pipeline.

---

## 4. The Change Rules

### The Core Governance Table

| Source evidence | Possible destination | Conditions |
|---|---|---|
| Local experience | Local knowledge | Evidence + Reflection — no external review |
| Local experience | Organisational knowledge | Org-level governance review |
| Local experience | Professional knowledge | Professional HQ review — human mandatory |
| Local experience | Universal knowledge | HH HQ review — human mandatory |
| Professional learning | Professional knowledge | Professional HQ review — human mandatory |
| Professional learning | Universal knowledge | HH HQ review — human mandatory |
| Universal learning | Universal knowledge | HH HQ review — human mandatory |
| Any learning | Constitutional knowledge | **Not permitted via learning loop** |

**The refined principle applied:**

> Origin influences consideration. Governance determines authority.

A local experience may inform a professional-level change — but it cannot become professional knowledge without professional-level review. The governance boundary is the transition point, not a permanent ceiling.

---

## 5. Forbidden Transitions

These must be enforced architecturally — not reliant on reviewer judgment.

### Forbidden 1: Venue learning directly to professional threshold

```
Venue learning
        ↓
Professional threshold
        ❌ without Professional HQ review
```

A DC observing that fridge temperature did not cause food safety issues in one venue cannot propose relaxing the 5°C threshold without Professional HQ review. One venue, one experience, is insufficient evidence for a professional standard.

---

### Forbidden 2: Any learning to constitutional knowledge

```
Experience of any kind
        ↓
Constitutional concept
        ❌ Impossible via learning loop
```

Constitutional knowledge is the foundation. It cannot be eroded by any accumulated experience, however well-evidenced. The constitutional process exists outside the learning loop by design.

---

### Forbidden 3: Single observation to inherited knowledge

```
Single observation (evidenceLevel: "candidate" or "single-source")
        ↓
Inherited knowledge
        ❌ Insufficient evidence
```

`EvidenceLevel: "multi-source"` is the minimum for any change that will be inherited by other DCs. A single experience cannot produce inherited knowledge regardless of confidence score.

---

### Forbidden 4: Self-review of safety-critical or professional changes

```
DC reviews its own professional learning
        ❌ Not valid — reviewer must be external
```

`reviewedBy` must name an authority external to the DC proposing the change. A DC cannot approve changes to knowledge it will inherit.

---

### Forbidden 5: Silent knowledge deprecation

```
ApprovedKnowledgeChange with changeIntent: "retire"
        ↓
Concept removed from KnowledgeGraph
        ❌ Not permitted — deprecated, never deleted
```

All knowledge has history. Retired concepts are preserved as `status: "deprecated"`. The record of what was previously inherited must remain accessible for audit and rollback.

---

## 6. The Provenance Contract

Before any `ApprovedKnowledgeChange` enters `KnowledgeGraph`, the following chain must be unbroken and traceable:

```
Experience ID      (an event occurred)
      ↓
Execution ID       (the action and its outcome were recorded)
      ↓
Reflection ID      (reflection concluded something should change)
      ↓
Learning ID        (a specific proposal was formed)
      ↓
Governance ID      (the proposal was reviewed and approved)
      ↓
Knowledge Change ID (the approved change is traceable)
```

**No chain = no inheritance.**

If any link in this chain is missing, the `ApprovedKnowledgeChange` must not be applied to `KnowledgeGraph`. This is not a soft requirement — it is a write-layer precondition.

### Minimum Provenance by Level

| Level | Minimum links required |
|---|---|
| Local | Execution ID + Learning ID |
| Organisational | + Reflection ID + `reviewedBy` (org authority) |
| Professional | + all above + `reviewedBy` (HQ authority) + `reviewedAt` |
| Universal | + full chain + named HH HQ authority + explicit `conditions[]` met |
| Constitutional | Not accessible |

---

## 7. Human Review Boundaries

### Where Human Review Is Not Required

- Local operational learning (`ConceptInheritance: [venue-id]`)
- Reinforcement of existing local practice (`LearningDisposition: "reinforce"`, local only)
- Observation-state learning (`LearningDisposition: "observe"`) — not yet a proposal

### Where Human Review Is Mandatory

- Safety signal present (`ReflectionFinding.category: "safety"` with any severity)
- `PollinationCandidate.safetyCritical: true`
- Change targets `ConceptScope: "professional"` — affects other DCs in this profession
- Change targets `ConceptScope: "universal"` — affects all DCs
- `changeIntent: "supersede"` or `"retire"` — removing or replacing inherited knowledge
- `LearningValidationState: "superseded"` — the DC's own prior learning is being replaced

### The Three Pollination Fields That Always Require Human Sign-Off

Three `PollinationCandidate` conditions cannot be derived from data:

```
privacyChecked:    Has personal or sensitive information been assessed and removed?
safetyChecked:     Could this learning cause harm if incorrectly applied?
contextValidated:  Does this learning apply beyond its origin context?
```

These require explicit human acknowledgment. The system cannot assess them autonomously. They exist as a deliberate gate against automatic sharing of learning that could harm people.

---

## 8. The Pollination Boundary

Two separate governance decisions must not be conflated.

**Knowledge Governance asks:**

> "May this change exist here — in this DC's local KnowledgeGraph?"

If approved: `ApprovedKnowledgeChange` may be applied locally.

**Pollination asks:**

> "Should this change travel — to other DCs in this profession, or to all DCs?"

If approved: `PollinationDecision` routes to profession or forest.

A local improvement can be approved locally but not shared. A change that is valuable to share can be pollenated without first being applied locally. These are independent decisions with independent governance gates.

```
Local approval  ≠  Permission to share
Permission to share  ≠  Local approval required first
```

The relationship is sequential in practice but logically independent:

```
Learning
  │
  ├──→ KnowledgeGovernance → local KnowledgeGraph update (if approved)
  │
  └──→ PollinationCandidate → profession / forest distribution (if gate passes)
```

---

## 9. The Rollback Protocol

Every change that enters `KnowledgeGraph` must be reversible.

**How rollback works:**

1. A rollback is a new `ApprovedKnowledgeChange` with `changeIntent: "supersede"` or `"retire"`, targeting the previous change.
2. Rollback requires the same authority level as the original change.
3. Rollback requires the same governance process — including human review if the original required it.
4. The original change is not deleted — it is preserved as `status: "deprecated"` with a reference to the rollback.

**What rollback is not:**

- Rollback is not deletion. History is immutable.
- Rollback is not automatic. It requires an active governance decision.
- Rollback does not erase from DCs that have already inherited the change. It prevents future inheritance.

---

## 10. The Eight Governance Invariants

These are the rules the write layer must enforce without exception.

**Invariant 1:** No concept with `status: "core-principle"` and `evidenceLevel: "constitutional"` may be modified through the learning loop.

**Invariant 2:** Any change to `ConceptScope: "professional"` requires a named external authority in `reviewedBy`. A DC cannot approve professional-scope changes to knowledge it will inherit.

**Invariant 3:** The full provenance chain (Experience → Execution → Reflection → Learning → Governance) must be unbroken before any change enters `KnowledgeGraph`.

**Invariant 4:** `changeIntent: "retire"` preserves as `status: "deprecated"`. Deletion is not permitted.

**Invariant 5:** No `ApprovedKnowledgeChange` may elevate `evidenceLevel` to `"constitutional"`. The ceiling via learning loop is `"multi-source"`.

**Invariant 6:** Single-observation learning (`evidenceLevel: "single-source"`) may not become inherited knowledge. Minimum for inheritance is `"multi-source"`.

**Invariant 7:** `privacyChecked`, `safetyChecked`, and `contextValidated` in `PollinationCandidate` must be explicitly set to `true` by a human reviewer. Derived values are not accepted.

**Invariant 8:** Rollback requires the same authority level as the original change. A DC cannot roll back professional-scope changes without professional-level authority.

---

## Summary: What This Constitution Establishes

**The learning loop is permissible.** Experience can improve inherited knowledge. This is how Helping Hand grows.

**The learning loop is governed.** Every change must earn its authority through the appropriate review process. Origin informs consideration; governance determines authority.

**The learning loop is bounded.** Constitutional knowledge is unreachable. Single observations cannot become inheritance. Personal information stays local. Safety requires human review.

**The learning loop is reversible.** Every change can be rolled back. History is immutable. Future inheritance can be corrected.

**The learning loop is traceable.** Every change carries its full provenance. No change may enter KnowledgeGraph without an unbroken chain from experience to approved governance record.

---

## What Comes Next

### Architectural Observation: KnowledgeGraph Is Not the Source of Truth

Before Milestone 027, one principle must be stated.

KnowledgeGraph is the **repository of governed truth** — not the source of truth.

The source of truth is the entire provenance chain:

```
Experience
→ Execution
→ Reflection
→ Learning
→ Governance
→ ApprovedKnowledgeChange
→ KnowledgeGraph
```

The graph stores the outcome.  
The provenance chain stores the reason.

This distinction matters because it defines what a future Digital Colleague should eventually be able to answer:

> "What do we believe?"  
→ answered by KnowledgeGraph

> "Why do we believe this?"  
→ answered by the provenance chain

The first is knowledge. The second is wisdom.

A write architecture that discards provenance to produce a cleaner graph has made a governance error: it has traded the reason for the result. The eight invariants in this constitution are partially designed to prevent this — Invariant 3 (unbroken provenance chain) and Invariant 4 (history is immutable) exist precisely to preserve the "why" alongside the "what."

---

**Milestone 027 — KnowledgeGraph Write Architecture**

Only after this constitution exists can the write layer be designed. Milestone 027 defines:

```
ApprovedKnowledgeChange
        ↓
KnowledgeGraphWriteGuard
        ↓
addConcept()       — enforces Invariants 1, 3, 5, 6
updateConcept()    — enforces Invariants 1, 2, 3
retireConcept()    — enforces Invariants 4, 8
```

The write guard enforces the constitution structurally. It does not reason. It does not judge. It checks invariants and either permits or rejects the change.

---

**Status:** Governance constitution defined | Eight invariants established | Authority model settled | Forbidden transitions specified | Provenance contract complete | Write architecture prerequisite met
