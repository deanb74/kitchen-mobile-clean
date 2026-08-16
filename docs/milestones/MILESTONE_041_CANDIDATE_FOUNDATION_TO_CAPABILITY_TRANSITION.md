# Milestone 041 Candidate — Foundation to Capability Transition

**Date:** 2026-08-06  
**Status:** Candidate — Governance  
**Depends on:** Milestone 040 — Foundation Demonstration Certificate  
**Constraint:** No implementation. Transition rules only.

---

## The Question

> How does Helping Hand move from proven architecture into controlled implementation without losing the boundaries that were validated?

---

## The Gardener's Moment

The most dangerous moment for a tree is not when it is small.

It is when it starts growing quickly.

A sapling can absorb a mistake. A tall tree can propagate one through every branch.

Milestone 040 certified that the roots are healthy. This milestone defines the gardener's rules before more branches are planted.

---

## The Shift

The journey started with: "Let's build Annie."

It has ended the foundation phase with: "Let's protect the conditions that allow Annie, Harry, Kev, and every future Digital Colleague to help people."

That is a completely different ambition.

An app needs features. A living system needs stewardship.

The roots are established. The rules for growth are:

---

## Part 1 — The Frozen Roots

These are the permanent foundations. They may not be redesigned, automated, or weakened by implementation decisions. Any future development that appears to require changing these must be questioned until it finds a path that does not require it.

### Frozen Root 1: Constitutional Concepts Are Immutable

`status: "core-principle"` + `evidenceLevel: "constitutional"` — unreachable by the learning loop. This is Invariant 1 from the Learning Governance Constitution. It must be enforced architecturally at the Write Guard.

### Frozen Root 2: Understanding Precedes Judgement

A DC cannot form a Judgement without Understanding. A DC cannot form Understanding without translated observations. Formation cannot produce meaning that is not in its inputs. These are structural guarantees, not guidelines.

### Frozen Root 3: Authority Is Earned Through Governance

No DC approves its own learning. No learning travels without the governance gate. No knowledge enters the graph without a permitted guard result. Creator ≠ Approver ≠ Enforcer.

### Frozen Root 4: Provenance Is Never Destroyed

History is immutable. Retired concepts become deprecated. Rejected seeds are preserved. Provenance chains are never overwritten. What happened and why it happened are always traceable.

### Frozen Root 5: Destination Authority Is Sovereign

The Oak does not govern what grows at destinations. A seed carries potential, not authority. Adoption belongs entirely to the destination. This boundary must never erode through convenience or scale.

### Frozen Root 6: Human Outcomes Are the Measure

The measure of Helping Hand is not knowledge accumulation, adoption rates, or concept counts. It is whether human lives are better. This purpose metric governs what is worth building, what is worth measuring, and what is worth preserving.

### Frozen Root 7: Five Human Decisions Are Permanently Human

These five may never be automated: privacy assessment, safety assessment, context validation, conflict resolution with existing knowledge, and cross-profession translation. They require human judgment. Building automation that replaces them is not permitted.

---

## Part 2 — The Branches That May Now Grow

These capabilities are designed and validated. Implementation may proceed in the following sequence. Each branch must be implemented with its governing boundary intact.

### Branch 1 — KnowledgeGraphWriteGuard (Milestone 029)

**Status:** Designed, not implemented.  
**Precondition:** Milestone 030 achieved ✓  
**Boundary:** Guard enforces all eight invariants structurally. It does not reason. It enforces.  
**Implementation rule:** Test each invariant independently before integrating.

---

### Branch 2 — Pollination Adapter (Learning → PollinationCandidate)

**Status:** Designed, not implemented.  
**Precondition:** Milestone 031 achieved ✓  
**Boundary:** Three fields (privacyChecked, safetyChecked, contextValidated) require explicit human sign-off. Not derived from data.  
**Implementation rule:** Adapter may compute algorithmic fields; human fields remain human.

---

### Branch 3 — Pollination Distribution (PollinationDecision → destination)

**Status:** Designed, not implemented.  
**Precondition:** Pollination Adapter complete.  
**Boundary:** Distribution creates a review opportunity. It does not create an obligation to adopt.  
**Implementation rule:** Delivery is confirmed. Adoption is not assumed.

---

### Branch 4 — Destination Receipt and Adaptation

**Status:** Designed, not implemented.  
**Precondition:** Distribution branch complete.  
**Boundary:** Destination authority owns all adaptation decisions. Conflict resolution requires human judgment.  
**Implementation rule:** The system surfaces conflicts. It does not resolve them.

---

### Branch 5 — Andy's Institutional Formation Adapters

**Status:** Partially implemented.  
**Precondition:** Milestone 021 achieved ✓  
**Boundary:** Andy uses the same `form()` mechanism as all Digital Colleagues. No privileged pathway.  
**Implementation rule:** The missing adapter (`repositoryDocumentToKnowledgeAnswer` enrichment) must pass the same invariant tests as Annie's adapters.

---

### Branch 6 — ContextStore Migration

**Status:** Boundary decided, migration not executed.  
**Precondition:** None — can proceed in parallel.  
**Boundary:** ContextStore moves to `lib/os/context/`. It is Venue Intelligence, not COS.  
**Implementation rule:** No functional change; no breaking change to callers. Mechanical migration only.

---

## Part 3 — What Every Future Implementation Must Prove

Before any new capability is shipped, it must be demonstrated against these questions. These are not aspirations — they are gate conditions.

**1. Does it respect the frozen roots?**  
Specifically: does it preserve provenance, respect destination authority, keep human decisions human, and measure against human outcomes?

**2. Does it introduce a new dependency that bypasses governance?**  
If a shortcut exists that achieves the result without the governance chain, the shortcut is the design flaw to be removed, not the governance chain.

**3. Does it make the system more surveillant of destinations?**  
If the implementation requires reading destination KnowledgeGraphs, monitoring adoption, or collecting outcome metrics across the forest — it is growing in the wrong direction.

**4. Can it be rolled back?**  
Every mutation must be reversible. Every governance decision must be re-openable. Implementations that create irreversible states require constitutional-level approval.

**5. Does it make understanding travel more safely, or merely faster?**  
Speed without governance is risk accumulation. The measure of a good implementation is not that it moves learning more quickly. It is that it moves learning more trustworthily.

---

## Part 4 — What Remains Intentionally Human

These are not gaps in the architecture. They are design decisions that must be honoured in perpetuity.

| Decision | Why it remains human |
|---|---|
| Privacy assessment of learning candidates | Humans understand social and contextual harm in ways algorithms cannot |
| Safety assessment of learning candidates | Safety thresholds differ by domain and change over time |
| Context validation for cross-profession travel | Human experts at the destination confirm translatability |
| Conflict resolution with existing knowledge | Contradiction may be truth in different contexts — only a person can evaluate |
| Cross-profession translation validity | Professional expertise cannot be derived from text alone |
| Rollback authorisation at professional/universal scope | High-stakes reversals require the same authority as the original decision |

---

## Part 5 — What Must Never Become Automated

The temptation as Helping Hand scales is to automate what was human to increase throughput. These automations are prohibited:

**Prohibited Automation 1:** Automatic adoption of pollenated seeds based on confidence score.  
The eight conditions pass → delivery is created. Adoption requires destination human review regardless of confidence.

**Prohibited Automation 2:** Automatic conflict resolution when a seed contradicts existing knowledge.  
Contradiction must be surfaced to human authority. The resolution is never a highest-confidence-wins algorithm.

**Prohibited Automation 3:** Modification of constitutional concepts through any learning pathway.  
The constitutional boundary is not a suggestion. No weight of evidence, no governance approval, and no human instruction may change a `core-principle` / `constitutional` concept through the learning loop.

**Prohibited Automation 4:** Self-approval by originating DCs.  
A DC may not appear in the `reviewedBy` field of its own ApprovedKnowledgeChange.

**Prohibited Automation 5:** Surveillance of destination growth.  
The Oak does not query destination KnowledgeGraphs to measure what took root.

---

## The Implementation Sequence

Given the branches above and the prohibitions, the recommended sequence:

```
Phase A — Foundation (complete ✓)
  Milestones 013–040: Understanding, Governance, Mutation, Pollination Boundaries

Phase B — Guard (immediate next)
  Milestone 029: KnowledgeGraphWriteGuard
  Proves the constitution is enforced at the write boundary

Phase C — Pollination Adapter
  Learning → PollinationCandidate bridge
  Three human fields confirmed as ungovernable by algorithm

Phase D — Distribution
  Pollenated seeds reach destination authorities
  Review opportunities created, not adoptions imposed

Phase E — Destination + Adaptation
  Destinations receive, evaluate, adapt
  Conflict resolution protocol in practice

Phase F — Full Ecosystem Demonstration
  Milestone 039 story runs as an end-to-end integration test
  Every boundary confirmed in code, not just narrative
```

---

## The Transition Statement

The foundation phase asked: "What must be true for a Digital Colleague to help people trustworthily?"

The capability phase asks: "Given what must be true, what can now be built?"

The answer to the second question is bounded by the answer to the first. Every capability that respects the boundaries is permitted. Every capability that requires weakening a boundary is not permitted — no matter how convenient it would be.

The Oak now has roots.  
The gardener knows the rules.  
Growth can begin.

---

**Status:** Frozen roots identified | Branches sequenced | Gate conditions defined | Human permanences listed | Automations prohibited | Transition rules established | Growth may begin
