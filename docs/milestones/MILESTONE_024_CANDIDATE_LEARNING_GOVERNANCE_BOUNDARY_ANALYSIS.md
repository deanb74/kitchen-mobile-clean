# Milestone 024 Candidate — Learning Governance Boundary Analysis

**Date:** 2026-08-05  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 023 — Andy Formation Validation Established  
**Constraint:** No code changes. No implementation. Evidence only.

---

## The Question

> How does a Digital Colleague transform experience into governed learning without corrupting inherited understanding?

The full lifecycle includes a loop that is not yet closed:

```
Experience
    ↓  proven: ReflectionEngine
Reflection
    ↓  proven: LearningEngine
Learning
    ↓  proven: KnowledgeGovernanceEngine
Governed Knowledge
    ↓  NOT YET CONNECTED
KnowledgeGraph
    ↓
Better future Understanding
```

This analysis maps what already exists, what is missing, and what governance decisions must be made before the loop can be closed safely.

---

## 1. What Already Exists

### ReflectionEngine

```typescript
// lib/reflection/Reflection.ts

export type ReflectionDisposition = "affirm" | "adjust" | "escalate" | "defer";

export interface ReflectionFinding {
  category: "safety" | "quality" | "communication" | "timing" | "governance" | "evidence";
  detail: string;
  severity: "low" | "medium" | "high" | "critical";
}

export interface Reflection {
  id: string;
  context: ReflectionContext;  // action + execution snapshot
  summary: string;
  findings: ReflectionFinding[];
  evidence: ExecutionEvidence[];
  disposition: ReflectionDisposition;
  requiresHuman: boolean;
  uncertainty: string[];
  confidence: number;
}
```

**Status:** Active. Connected to `ExecutionEngine`. Produces `Reflection` from execution evidence.

`ReflectionDisposition` governs whether learning is possible:
- `"affirm"` — evidence supports the current approach (learning: reinforce)
- `"adjust"` — improvement is advisable (learning: propose)
- `"escalate"` — human attention required (learning: escalate)
- `"defer"` — evidence insufficient (learning: observe or reject)

---

### LearningEngine

```typescript
// lib/learning/Learning.ts

export type LearningDisposition = "reject" | "observe" | "propose" | "reinforce";
export type LearningValidationState = "pending" | "validated" | "rejected" | "superseded";

export interface LearningProposal {
  knowledgeTargetId?: string;
  whatShouldChange: string;
  supportingEvidence: LearningEvidence[];
}

export interface Learning {
  id: string;
  context: LearningContext;      // copied from Reflection
  evidence: LearningEvidence[];
  proposal?: LearningProposal;   // present only when disposition is "propose" or "reinforce"
  disposition: LearningDisposition;
  validation: { state: LearningValidationState };
  requiresHuman: boolean;
  confidence: number;
}
```

**Status:** Active. Connected to `ReflectionEngine`. Produces `Learning` from `Reflection`.

`LearningDisposition` governs what happens to the learning:
- `"reject"` — not worth persisting
- `"observe"` — signal noted; insufficient evidence yet
- `"propose"` — suggests new or adjusted knowledge item
- `"reinforce"` — existing knowledge appears supported by new evidence

`"propose"` and `"reinforce"` are the two dispositions that produce a `LearningProposal` and proceed to governance review.

---

### KnowledgeGovernanceEngine

```typescript
// lib/knowledge-governance/KnowledgeGovernance.ts

export type KnowledgeGovernanceDecision = "approve" | "reject" | "defer" | "supersede";

export type KnowledgeChangeIntent =
  | "create" | "update" | "reinforce" | "merge"
  | "supersede" | "retire" | "none";

export type ApprovedKnowledgeChange = ...  // three variants: base + human-reviewed + unreviewed
```

**Status:** Active. Connected to `LearningEngine`. Produces `KnowledgeGovernance` and, if approved, `ApprovedKnowledgeChange`.

`KnowledgeGovernanceDecision` governs whether the change proceeds:
- `"approve"` — change may be applied
- `"reject"` — change must not be applied
- `"defer"` — change requires more evidence before decision
- `"supersede"` — existing knowledge should be replaced

`ApprovedKnowledgeChange` contains: `changeIntent`, provenance chain (learning → reflection → action → execution), `reviewedBy` (if human-reviewed).

**The gap:** `KnowledgeGovernanceEngine` produces `ApprovedKnowledgeChange` but nothing applies it to `KnowledgeGraph`.

---

### Pollination

```typescript
// platform/cos/pollination/types.ts

export interface PollinationCandidate {
  source: string;
  confidence: number;
  reusable: boolean;
  professionSpecific: boolean;
  safetyCritical: boolean;
  evidenceProvided: boolean;
  reflectionComplete: boolean;
  privacyChecked: boolean;
  safetyChecked: boolean;
  contextValidated: boolean;
  current: boolean;
}

export type PollinationDestination = "forest" | "profession" | "local";
```

**Status:** Experimental. Governance gate checks eight conditions. Routes to local/profession/forest. Connected to nothing upstream yet.

The pollination governance gate:
```
confidence ≥ 0.9
evidenceProvided: true
reflectionComplete: true
privacyChecked: true
safetyChecked: true
contextValidated: true
current: true
reusable: true
```

All eight must pass. Safety-critical additionally requires human review.

The destination logic:
```
confidence < 0.9  OR  reusable: false  →  local
professionSpecific: true                →  profession
otherwise                               →  forest
```

**The gap:** Pollination operates on `PollinationCandidate` — a type it owns. It is not connected to `Learning` or `KnowledgeGovernance`. The two governance systems (KnowledgeGovernanceEngine and Pollination) exist in parallel without a bridge.

---

### The Full Connected Chain

```
Execution (outcome + effect)
        ↓  ReflectionEngine.reflect({ execution })
Reflection (disposition + findings + confidence)
        ↓  LearningEngine.build({ reflection })
Learning (disposition + proposal? + requiresHuman)
        ↓  KnowledgeGovernanceEngine.review({ learning })
KnowledgeGovernance
        ↓  if approved:
ApprovedKnowledgeChange (intent + provenance + reviewedBy?)
        ↓  ← WIRE MISSING
KnowledgeGraph
        ↓
UnderstandingEngine
        ↓
Better future Understanding
```

Additionally:

```
Learning (validated, propose or reinforce)
        ↓  ← BRIDGE MISSING
PollinationCandidate
        ↓  pollinate()
PollinationDecision (destination: local/profession/forest)
        ↓  ← DISTRIBUTION NOT CONNECTED
Professional HQ or Forest
```

---

## 2. What Is Missing

### Missing: The KnowledgeGraph Wire

`ApprovedKnowledgeChange` is produced by `KnowledgeGovernanceEngine`. It is never applied to `KnowledgeGraph`. This is the final connection in the learning loop.

The wire must:
1. Take `ApprovedKnowledgeChange` and determine which `KnowledgeGraph` nodes to create, update, or retire
2. Apply the change without corrupting existing governed knowledge
3. Preserve the provenance trail from change back to original experience

**Unknown:** Whether `KnowledgeGraph` currently supports the required operations (`create`, `update`, `reinforce`, `merge`, `supersede`, `retire`). This needs investigation before the wire is built.

---

### Missing: The Learning → Pollination Bridge

`KnowledgeGovernanceEngine` and `platform/cos/pollination/` are parallel systems. They share the governance intent but do not communicate. A validated Learning record needs a path to become a `PollinationCandidate`.

The bridge must:
1. Convert `Learning` with disposition `"propose"` or `"reinforce"` to `PollinationCandidate`
2. Derive the eight pollination gate conditions from `Learning` evidence
3. Determine destination: local (venue-specific), profession, or forest

---

### Missing: Governance Criteria for Candidates

Currently: `LearningEngine` decides disposition based on reflection quality (statistically, from confidence thresholds). It does not evaluate *what* is being learned against *what may be changed*.

**What is not governed:**
- Whether a proposed change to professional knowledge requires profession-level review
- Whether a proposed change to constitutional knowledge is permissible at all
- What happens when a DC's learning contradicts existing governed knowledge
- Who has authority to approve changes at each layer (venue/organisation/profession/universal)

These are governance design decisions, not technical problems.

---

### Missing: Approval Authority by Layer

```
Layer          Current authority   Missing definition
──────────────────────────────────────────────────────
venue          undefined           Who approves venue-level learning?
organisation   undefined           Who approves org-level learning?
profession     undefined           Who approves professional HQ updates?
universal      undefined           Who approves changes to constitutional knowledge?
```

The existing types support `reviewedBy: string` in human-reviewed governance records. The governance framework does not yet define who may be `reviewedBy` at each layer.

---

### Missing: Inheritance Rules

When `ApprovedKnowledgeChange` has `changeIntent: "create"` or `"update"`, it implies a change to something future DCs will inherit. There are no rules that govern:
- Which changes can affect universal inheritance
- Which changes remain scoped to a profession or organisation
- How changes propagate (immediately? after next DC initialisation? on next formation?)

---

### Missing: Rollback and Change Control

`KnowledgeChangeIntent` includes `"supersede"` and `"retire"` — indicating existing knowledge can be replaced or withdrawn. There are no rules for:
- Under what circumstances a change may be rolled back
- What provenance is required for a rollback
- Whether rollback requires the same authority as approval

---

## 3. Ownership Boundaries

### What Remains Local

Local knowledge stays at the DC's venue layer. It does not travel.

**Evidence:** `platform/hq/knowledgeFlow.ts`
```typescript
case "local": return ["digital-colleague"];
```

Specific examples:
- Named personal observations ("Lucy sick three Mondays") — `kind: "local"`
- Today's temperature readings — `kind: "local"`, ephemeral
- Execution-specific facts — captured in `Execution.evidence`, not in `KnowledgeGraph`
- `LearningDisposition: "observe"` — held locally pending more evidence
- `LearningDisposition: "reject"` — discarded
- `PollinationCandidate.reusable: false` — stays local

**Boundary rule:** Local knowledge becomes a candidate only when abstracted from the specific instance. "Lucy is often absent on Mondays" is personal and stays local. "Some venues experience higher Monday absence; rota resilience may be worth checking" is abstracted and may become a candidate — with all personal detail removed.

---

### What Can Become a Learning Candidate

A local experience becomes a candidate when:

1. Reflection produces `disposition: "adjust"` (improvement needed) or `"affirm"` (approach validated)
2. Learning produces `disposition: "propose"` or `"reinforce"` with a `LearningProposal`
3. The learning is `reusable: true` — not tied to one instance
4. Privacy has been assessed and personal identifying information removed
5. Safety has been assessed — no harm from sharing
6. Context has been validated — the learning applies beyond its origin context
7. Confidence ≥ 0.9

The governance gate then reviews the candidate. If the eight conditions pass AND the change does not affect higher-authority knowledge, it may proceed.

---

### What Can Become Inherited Knowledge

Only governance-approved, human-reviewed changes may affect inherited knowledge at profession or universal level.

```
Venue-level change:
  → Local KnowledgeGraph update only
  → Does not affect Professional HQ

Profession-level change:
  → Requires Professional HQ review
  → Must not contradict Theory or Constitution
  → Affects future DCs of this profession

Universal-level change:
  → Requires HH HQ review
  → Must not contradict Constitution
  → Affects all future DCs regardless of profession
```

**Inviolable protection:** No learning from a single DC's experience may modify constitutional knowledge. Constitutional knowledge is changed only through the constitutional governance process. This is the guardrail against the learning loop corrupting what was already proven.

---

## 4. The Core Risk

### Risk: Learning that Corrupts Inheritance

The learning loop is valuable because it allows DCs to improve over time. It is dangerous if a DC's mistaken experience propagates as inherited knowledge.

**Scenario:** A DC incorrectly concludes that a food safety threshold can be relaxed based on a specific venue's practices. If that learning reaches Professional HQ, future hospitality DCs would inherit incorrect knowledge.

**Protection already present:** The eight-condition pollination gate. Safety-critical content requires human review. `KnowledgeGovernanceEngine` supports `"reject"` and `"defer"` decisions. The chain is not automatic.

**Protection not yet present:** An explicit rule that prevents venue-level learning from affecting profession-level thresholds. The current governance structure allows the `changeIntent` to be `"update"` at any level — including professional thresholds — as long as the governance conditions are met. There is no architectural rule that says "venue learning cannot modify professional thresholds."

This is the most significant missing governance decision.

---

## 5. Deferred Items Confirmed

| Item | Decision |
|---|---|
| `ApprovedKnowledgeChange` → `KnowledgeGraph` wire | Deferred — requires governance decisions below first |
| Learning → Pollination bridge | Deferred — requires `Learning` → `PollinationCandidate` mapping |
| Approval authority definitions | Deferred — governance design decisions |
| Inheritance rules | Deferred — requires authority definitions first |
| Rollback / change control | Deferred — requires inheritance rules first |

---

## 6. Recommended Sequencing

Before any code changes:

**Step 1: Governance decisions (analysis, not code)**

Decide:
- Which changes require human review at each layer?
- Can venue-level learning ever affect professional thresholds?
- What is the minimum provenance required for an approved change?

**Step 2: Learning → Pollination bridge (small)**

Map `Learning` to `PollinationCandidate`. This is a type adapter — similar in scale to `knowledgeAnswerToFormation()`. Derives the eight conditions from `Learning` evidence.

**Step 3: `ApprovedKnowledgeChange` → `KnowledgeGraph` (medium)**

Apply approved changes to `KnowledgeGraph`. Requires understanding what operations `KnowledgeGraph` supports. Requires the governance decision that venue changes cannot escalate to profession level without explicit routing.

**Step 4: Inheritance propagation (larger)**

How changes flow from local approval through profession and universal levels. Requires pollination distribution to connect to HQ layers.

---

## What This Milestone Does Not Include

- Implementation of any step above
- Connecting `ApprovedKnowledgeChange` to `KnowledgeGraph`
- Changes to `KnowledgeGraph`
- Changes to `KnowledgeGovernanceEngine`
- Changes to Pollination
- New governance authority types

---

**Status:** Analysis complete | Chain mapped | Missing pieces named | Governance decisions required before implementation | Sequencing recorded
