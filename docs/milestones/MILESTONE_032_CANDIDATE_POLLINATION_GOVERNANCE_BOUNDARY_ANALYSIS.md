# Milestone 032 Candidate — Knowledge Pollination Governance Boundary Analysis

**Date:** 2026-08-06  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 030 — KnowledgeGraph Mutation Layer  
**Constraint:** No code changes. Analysis only.

---

## The Question

> Can Andy accidentally teach everyone else the wrong lesson?

The mutation layer (Milestone 030) governs how knowledge enters a local KnowledgeGraph. Pollination governs how knowledge travels from one DC's graph to every DC in a profession or the entire forest.

The danger shifts: from "incorrect knowledge stored locally" to "incorrect knowledge inherited by everyone."

---

## 1. The Relationship Between the Four Components

### Evidence

```typescript
// platform/cos/pollination/pollinationEngine.ts
export function pollinate(candidate: PollinationCandidate) {
  const governance = evaluateGovernance(candidate);   // eight conditions
  if (!governance.approved) return { message: "Knowledge remains local." };
  if (governance.reviewRequired) return { message: "Requires human review." };
  const decision = evaluateCandidate(candidate);       // destination
  return { decision, distribution: distributeKnowledge(decision) };
}
```

```
// From Pollination README
Forest Pollination depends on:
  - Living Memory, Reflection, Learning, Wisdom,
    Knowledge Governance, Context
Pollination does not replace those systems.
It connects their local learning to the wider forest.
```

### The Relationship: Parallel Decisions From a Shared Source

`KnowledgeGovernanceEngine` and Pollination are **parallel decisions**, not sequential.

```
Learning
  │
  ├── KnowledgeGovernanceEngine
  │         → ApprovedKnowledgeChange
  │         → KnowledgeGraph.addConcept()      ← local adoption
  │
  └── PollinationCandidate
            → evaluateGovernance()
            → evaluateCandidate()
            → PollinationDecision               ← shared travel
```

Both start from `Learning`. Neither requires the other to have completed first.

`KnowledgeGraph` is downstream of local governance. It is not an input to pollination — pollination takes `PollinationCandidate`, which has no reference to `KnowledgeGraph`.

`PollinationDecision` governs where learning should travel. `KnowledgeGraph` is where learning has already been applied locally.

**Finding:** The four components form two parallel paths from one learning record. They are not a pipeline. They are independent governance decisions with a shared upstream.

---

## 2. Conditions for Local Concept to Become a PollinationCandidate

From `evaluateGovernance()` and `PollinationCandidate`:

### Eight Required Conditions

```
confidence >= 0.9              — evidence quality threshold
evidenceProvided: true         — supporting evidence exists
reflectionComplete: true       — reflection has been completed
privacyChecked: true           — personal information assessed and removed
safetyChecked: true            — no harm from sharing
contextValidated: true         — learning applies beyond its origin context
current: true                  — knowledge has not become outdated
reusable: true                 — not tied to a single instance
```

If any of the eight fails: `approved: false`, `message: "Knowledge remains local."`.

If `safetyCritical: true`: additionally `reviewRequired: true` — human review gates further sharing.

### Destination Selection (from `evaluateCandidate()`)

```
confidence >= 0.9 AND reusable: true
        ↓
professionSpecific: true → destination: "profession"
otherwise               → destination: "forest"
```

The destination determines who receives the learning. The profession/forest distinction is the DC's responsibility to set — `professionSpecific` is a DC-supplied flag, not computed from the knowledge content.

**Unknown:** Whether `professionSpecific` should be derived from the concept's `ConceptInheritance` field rather than supplied as a flag. Currently it is not.

---

## 3. Can Pollination Happen Without Local Adoption?

### Evidence

`PollinationCandidate` has no field referencing `KnowledgeGraph`. `pollinate()` does not check whether a local concept exists. The two systems are architecturally independent.

### Answer: Yes — with conditions

Pollination can proceed from `Learning` regardless of whether `KnowledgeGovernanceEngine` has approved a local graph update.

**This is intentional for one case:** safety-critical learning. If a DC discovers that a process is dangerous, the profession should know immediately — before the DC's own local graph is formally updated. Requiring local adoption first would delay sharing safety improvements.

**This is a risk for all other cases:** a learning that has not been locally adopted and validated in practice has less evidence of its effects than one that has been applied and observed. Sharing broadly before local validation propagates less-proven knowledge.

### The Principle (from README)

> Knowledge should live at the lowest sensible level.

This implies: local before profession, profession before forest. But it is a principle, not an enforced architectural rule.

**Finding:** Pollination CAN happen without local adoption. Whether it SHOULD is a governance decision. The architecture does not currently enforce the ordering. The governance constitution (Milestone 026) should address this.

**Recommendation for Milestone 033:** Establish whether pollination requires prior local governance approval for non-safety-critical changes. For safety-critical changes, parallel or precedent pollination may be justified.

---

## 4. Destination Authority

| Destination | Who owns | Who inherits |
|---|---|---|
| `"local"` | DC / Venue Intelligence | This DC only |
| `"profession"` | Professional HQ (Hospitality HQ, Construction HQ, etc.) | All DCs in this profession |
| `"forest"` | Helping Hand HQ | All DCs regardless of profession |

**Evidence:**
- `platform/hq/types.ts`: `KnowledgeLevel = "digital-colleague" | "organisation-hq" | "profession-hq" | "helping-hand-hq"`
- `platform/hq/knowledgeFlow.ts`: routing rules determine which levels receive knowledge

**Destination/authority mapping:**

```
"local"      ← DC decides (no governance review required)
"profession" ← Professional HQ receives; Professional HQ governs acceptance
"forest"     ← Helping Hand HQ receives; HH HQ governs acceptance
```

**Critical gap:** `distributeKnowledge()` currently returns a string. It does not actually transmit to Professional HQ or forest. Distribution is described but not connected.

---

## 5. Conflict With Existing Knowledge

### The Scenario

```
Hospitality DC learns:   "Process X is safer this way."
Existing HQ knowledge:   "Process X is the preferred approach."
```

These may not contradict — "safer" and "preferred" can coexist. But they may also conflict: "this way" could be incompatible with "the preferred approach."

### What Currently Exists

`evaluateCandidate()` checks whether knowledge should travel. It does not check what is already at the destination.

`distributeKnowledge()` returns a string. It does not query the destination's existing knowledge.

**There is no conflict resolution mechanism.** The pollination system sends; the receiving HQ is expected to resolve.

### What Conflict Resolution Requires

1. The destination (Professional HQ) must maintain its own governed `KnowledgeGraph`
2. When receiving a pollinated concept, it must check whether the concept conflicts with existing knowledge
3. If it conflicts, human review is mandatory — the destination authority decides

**Finding:** Conflict resolution is the most significant missing governance piece in the pollination system. The architecture implies it should be handled at the destination, but no mechanism exists. This must be designed before Milestone 034.

**Who decides?** Destination authority (Professional HQ for profession, HH HQ for forest). The originating DC does not decide. The pollination system presents the conflict; the appropriate authority resolves it.

---

## 6. Minimum Provenance Before Knowledge Can Travel

### From `PollinationCandidate`

The candidate requires `evidenceProvided: true` and `reflectionComplete: true`. It does not require:
- `executionId`
- `ApprovedKnowledgeChange`
- Multiple independent sources

The current architecture accepts a `PollinationCandidate` constructed with any evidence, as long as `evidenceProvided: true`.

### From the Governance Constitution (Milestone 026)

Invariant 6: "Single-source evidence cannot become inherited knowledge."

This means `evidenceLevel: "single-source"` should not reach profession or forest. The minimum for inheritance is `"multi-source"`.

**But:** `PollinationCandidate` has no `evidenceLevel` field. It has `confidence` and `evidenceProvided`. It cannot currently enforce the Invariant 6 minimum.

### What Should Be Required

For learning to travel to profession or forest:

| Minimum requirement | Justification |
|---|---|
| `reflectionComplete: true` | Reflection identifies significance — required |
| `evidenceProvided: true` | Evidence supports the claim — required |
| Evidence from multiple independent sources | Invariant 6: "multi-source" minimum for inheritance |
| `ApprovedKnowledgeChange` or equivalent | Confirms local governance reviewed it (recommended, not currently required) |

**Finding:** The current minimum (reflection + evidence) is insufficient to satisfy Invariant 6. Pollination candidates that will travel to profession/forest should require `evidenceLevel: "multi-source"` equivalent evidence. This is a missing governance check.

---

## 7. Which Checks Are Permanently Human?

### Confirmed (already in `PollinationCandidate`)

```
privacyChecked       — Has personal/sensitive information been assessed and removed?
safetyChecked        — Could this learning cause harm if incorrectly applied?
contextValidated     — Does this learning apply beyond its origin context?
```

These three require human judgment. They cannot be derived from data alone.

### Additionally Permanently Human

**Conflict resolution with existing knowledge**  
When pollinated learning conflicts with existing HQ knowledge, the decision cannot be automated. The appropriate authority must compare evidence, assess impact, and decide. This is not reducible to a confidence threshold.

**Safety-critical human review**  
`evaluateGovernance()` sets `reviewRequired: true` when `safetyCritical: true`. This is already present and correct.

**Cross-profession travel**  
When `destination: "forest"` means learning will affect DCs across professions that have different risk thresholds, human review should be mandatory. A safety improvement in construction may not translate safely to healthcare without expert judgment.

### What Can Be Algorithmic

```
confidence threshold   → computed from confidence field
reusable assessment    → determined by the DC (not fully computable)
currentness check      → could potentially be time-based
evidenceProvided check → structural (evidence list not empty)
reflectionComplete     → structural (reflection disposition ≠ defer)
```

---

## Relationship Summary: Four Components

```
Learning
  │
  ├── KnowledgeGovernanceEngine  → local governance decision
  │         ↓
  │   ApprovedKnowledgeChange
  │         ↓
  │   KnowledgeGraphWriteGuard
  │         ↓
  │   KnowledgeGraph.addConcept()    ← local adoption
  │
  └── PollinationCandidate       → sharing governance decision
            ↓
      evaluateGovernance() — eight conditions
            ↓
      evaluateCandidate()  — destination routing
            ↓
      PollinationDecision { destination: local | profession | forest }
            ↓
      distributeKnowledge()  ← currently returns a string, not connected
```

---

## Outstanding Gaps Identified

| Gap | Risk | Required in |
|---|---|---|
| Conflict resolution mechanism | High — pollination could overwrite or contradict existing HQ knowledge | Milestone 033 design |
| `professionSpecific` should derive from concept scope | Medium — DC-supplied flag could be wrong | Milestone 033 design |
| `PollinationCandidate` lacks `evidenceLevel` field | Medium — Invariant 6 cannot be checked | Milestone 033 design |
| Local adoption before travel (non-safety) | Medium — principle not enforced | Governance decision |
| `distributeKnowledge()` not connected to HQ | High — the system describes but does not share | Milestone 034 implementation |
| Cross-profession travel requires human review | Medium — not currently enforced | Milestone 033 design |

---

## Recommended Sequence

```
032 (this)  — Pollination Governance Boundary Analysis
        ↓
033         — Pollination Adapter Design
              (bridge Learning → PollinationCandidate)
              (conflict resolution protocol)
              (evidence level minimum check)
        ↓
034         — Pollination Distribution Implementation
              (connect distributeKnowledge to HQ layers)
        ↓
035         — End-to-end ecosystem learning test
              "Andy learns, governance approves, forest inherits"
```

---

**Status:** Seven questions answered | Relationship confirmed (parallel, not sequential) | Conflict resolution gap identified | Evidence level gap identified | Human review boundaries confirmed | Three permanently human checks confirmed plus two additional | Milestone 033 scope defined
