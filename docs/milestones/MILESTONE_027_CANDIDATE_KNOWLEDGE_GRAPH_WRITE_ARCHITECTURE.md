# Milestone 027 Candidate — KnowledgeGraph Write Architecture

**Date:** 2026-08-05  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 026 — Learning Governance Constitution  
**Constraint:** No code. Analysis only.

---

## The Question

> How does the system enforce the Learning Governance Constitution when knowledge changes are applied?

---

## Why the Guard Comes Before the Writes

The temptation is to add `addConcept()`, wire `ApprovedKnowledgeChange`, and close the loop.

But writing to `KnowledgeGraph` without a guard would make trust enforcement dependent on every caller being correct. The guard ensures the constitution is enforced at the boundary — regardless of what calls it.

```
ApprovedKnowledgeChange
        ↓
KnowledgeGraphWriteGuard      ← enforces constitution
        ↓
          Pass?
         ↓     ↓
      PERMIT  REJECT
         ↓
  KnowledgeGraph mutation
```

The guard does not think. It enforces. The intelligence stays in the DC, the reflection, the learning proposal, and the governance decision. The guard protects what they produced.

---

## What the Guard Must Check

Each of the eight invariants from Milestone 026 maps to a guard rule.

### Invariant 1 — Constitutional concepts are immutable

```
IF concept.status == "core-principle"
   AND concept.evidenceLevel == "constitutional"
THEN REJECT
     reason: "Constitutional concepts are not modifiable through the learning loop."
```

This is the hardest boundary. No confidence score, no human review, no provenance chain makes this change permissible. The guard rejects unconditionally.

---

### Invariant 2 — Professional changes require external named authority

```
IF target concept.scope == "professional"
   AND (change.reviewedBy is absent
        OR change.reviewedBy == change.sourceDcId)
THEN REJECT
     reason: "Professional-scope changes require an external named authority."
```

Self-review is structurally invalid. The guard checks that `reviewedBy` is present and is not the DC proposing the change.

---

### Invariant 3 — Provenance chain must be unbroken

```
IF change.context.executionId is absent
   OR change.context.reflectionId is absent
   OR change.context.learningId is absent
   OR change.id is absent
THEN REJECT
     reason: "Incomplete provenance chain. All links required before KnowledgeGraph write."
```

The chain: `executionId → reflectionId → learningId → changeId`. Every link must be present. A missing link means the change cannot be traced to real experience.

---

### Invariant 4 — Retirement is deprecation, not deletion

```
IF changeIntent == "retire"
THEN SET concept.status = "deprecated"
     PRESERVE all existing fields
     RECORD retiredAt + retiredBy in provenance
     DO NOT DELETE
```

The guard converts a retirement request into a deprecation. Deletion is never permitted.

---

### Invariant 5 — Evidence ceiling: no constitutional elevation via learning

```
IF proposed concept.evidenceLevel == "constitutional"
   AND changeSource != "constitutional-process"
THEN REJECT
     reason: "Learning loop cannot elevate evidenceLevel to constitutional."
```

`"multi-source"` is the maximum elevation the learning loop may grant. `"constitutional"` requires the constitutional process.

---

### Invariant 6 — Minimum evidence for inheritance

```
IF concept.inheritsTo contains more than [venue-id]
   AND change.evidenceLevel == "candidate" OR "single-source"
THEN REJECT
     reason: "Inherited knowledge requires multi-source evidence minimum."
```

A single experience — however high-confidence — cannot become knowledge that other DCs inherit.

---

### Invariant 7 — Three pollination fields require human sign-off

This invariant governs the Pollination path, not the direct KnowledgeGraph write. But the guard should verify that any change originating from a PollinationDecision carries explicit human sign-off on the three conditions.

```
IF change.originatesFromPollination == true
   AND (privacyChecked !== true
        OR safetyChecked !== true
        OR contextValidated !== true)
THEN REJECT
     reason: "Pollination changes require explicit human sign-off on privacy, safety, and context."
```

---

### Invariant 8 — Rollback requires same authority as original

```
IF changeIntent == "supersede" targeting an existing change
   AND rollback.reviewAuthority < original.reviewAuthority
THEN REJECT
     reason: "Rollback requires authority at least equal to the original change."
```

A professional-scope change can only be rolled back by professional-scope authority.

---

## The Guard as a Decision Table

```
Condition                                    Action
──────────────────────────────────────────────────────────────────────────────
Target is constitutional (core-principle)    REJECT unconditionally
Missing provenance chain                     REJECT
Professional target + missing reviewer       REJECT
Professional target + self-review            REJECT
evidenceLevel: "constitutional" proposed     REJECT
Single-source → inherited concept            REJECT
Rollback + insufficient authority            REJECT
Pollination source + missing sign-offs       REJECT
changeIntent: "retire"                       CONVERT to deprecation
All checks pass                              PERMIT
```

---

## The Write Operations

The guard gates three operations. Here is the conceptual design — not implementation.

### `addConcept(change, provenance)`

Adds a new governed concept to the graph.

Must verify before writing:
- Invariant 1 (constitutional check — no new constitutional concepts via this path)
- Invariant 3 (provenance chain complete)
- Invariant 5 (evidence level ceiling)
- Invariant 6 (evidence minimum for inheritance)

Post-write: concept is added with `status: "candidate"` initially. Promotion to `"validated"` requires a subsequent governance review.

---

### `updateConcept(id, changes, provenance)`

Updates an existing governed concept.

Must verify before writing:
- Invariant 1 (constitutional immutability)
- Invariant 2 (professional change authority)
- Invariant 3 (provenance chain)

The original concept state is preserved in provenance before any update is applied.

---

### `retireConcept(id, provenance)`

Retires a concept from active use.

Must verify before writing:
- Invariant 4 enforcement (convert to deprecated — guard handles this)
- Invariant 8 (rollback authority)

The concept is never removed. All fields are preserved. `status` is set to `"deprecated"`. A `retiredAt` timestamp and `retiredBy` authority are recorded.

---

## Source of Truth vs Repository of Governed Truth

From Milestone 026:

> KnowledgeGraph is the **repository of governed truth** — not the source of truth.

The write architecture must preserve this distinction. Every write operation carries its provenance. The graph stores the outcome. The provenance chain stores the reason.

**What this means for the write design:**

Each write operation does not merely update the graph. It records:
1. The new concept state (the outcome)
2. The `ApprovedKnowledgeChange.id` that authorised it (the governance record)
3. The previous concept state, if updated (the history)

The graph becomes queryable not only for "What do we believe?" but eventually for "What authorised this belief and when?"

---

## What the Guard Is Not

**It is not an intelligence layer.** It does not evaluate whether the change is good. That judgment was made by the DC, the reflection, the learning proposal, and the governance review.

**It is not a policy engine.** It enforces specific, settled rules from the Learning Governance Constitution. It does not interpret them.

**It is not a validation service.** It is a boundary. It sits at the only point where governed truth can be modified. Its job is to be the last line of the constitution before the graph changes.

**It does not know about LearningEngine, ReflectionEngine, or DC identity.** It receives the finished governance artefact — `ApprovedKnowledgeChange` — and asks exactly four questions:

1. Is this authorised? (provenance chain complete, authority present)
2. Is the authority sufficient? (matches target concept scope)
3. Does this violate an invariant? (constitutional, evidence ceiling, self-review, etc.)
4. Is the intent valid? (retire → deprecate, not delete)

Nothing else. Any broader awareness turns the guard into a hidden intelligence layer — which would erode the architecture by putting reasoning where enforcement should be.

---

## The Guard Protects Trust, Not Knowledge

One final principle before implementation.

Knowledge can change. The governance constitution exists precisely because knowledge *should* change when experience warrants it.

What must not change is *how* it changes. Trust depends on the process, not the outcome.

A future Digital Colleague should be able to say:

> "This knowledge changed on this date because this experience occurred, this reflection identified a learning, this governance authority approved it, and these invariants were satisfied."

That is fundamentally different from:

> "The graph says this is true."

The provenance chain is what makes the second statement unacceptable and the first statement possible. The guard is what ensures the chain is never broken. The graph is what stores the result. All three together are what make knowledge trustworthy rather than merely present.

```
                HUMAN RESPONSIBILITY
                       │
                       ▼
              Governance Decision
                       │
                       ▼
               ApprovedKnowledgeChange
                       │
                       ▼
              ┌─────────────────┐
              │  Write Guard    │
              │  (constitution) │
              └─────────────────┘
                       │
                       ▼
              KnowledgeGraph
              (governed memory)
                       │
                       ▼
              Future Understanding
```

Each layer has one job. None reasons on behalf of another.

---

## Relationship to What Has Been Proven

```
Milestones 013–023  A Digital Colleague can understand.
Milestone 026       A Digital Colleague can learn safely.
Milestone 027       A Digital Colleague can improve itself without compromising trust.
```

The write guard is the architectural expression of that third statement. It is what makes improvement trustworthy — not by making change impossible, but by making every change traceable, reversible, and governed.

---

## What Comes After Milestone 027

Once the write guard and write operations exist, two paths open:

**Path A — Learning loop closure**

```
ApprovedKnowledgeChange
        ↓
KnowledgeGraphWriteGuard
        ↓
KnowledgeGraph.updateConcept()
        ↓
UnderstandingEngine sees improved knowledge
        ↓
Future DCs form better Understanding
```

**Path B — Pollination connection**

```
Learning (validated)
        ↓
PollinationCandidate (human sign-offs)
        ↓
evaluateGovernance() + evaluateCandidate()
        ↓
PollinationDecision
        ↓
Professional HQ or Forest
        ↓
Future DCs inherit improved knowledge via HQ
```

Both paths require Milestone 027. Neither requires anything beyond it.

---

**Status:** Architecture defined | Guard rules specified | Eight invariants mapped to enforcement logic | Write operations conceptually designed | Source-of-truth principle recorded | Two post-implementation paths identified
