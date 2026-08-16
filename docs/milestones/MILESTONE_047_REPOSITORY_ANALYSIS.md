# MILESTONE_047_REPOSITORY_ANALYSIS — Source Authority and Provenance

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 047 — Context Assembly Boundary
**Supersedes:** Earlier draft of this document.

---

## The Question

> Can a Digital Colleague understand a situation using multiple sources of context
> while keeping each source's purpose, authority, and boundaries intact?

**The key test:**

Can the system currently distinguish:

> "Sarah prefers written instructions."

from:

> "Hospitality staff prefer written instructions."

...before either reaches governance?

---

## The Three Paths Under Audit

### Path A — Relationship

```
Person speaks
    ↓ humanSpeechToObservation()
Observation { source: "human" }
    ↓ hospitalityConversationRules
Translation { observationId, meaning, confidence }
    ↓ form()
Understanding { summary, evidenceChain }
    ↓ ReflectionEngine
Reflection
    ↓ LearningEngine
Learning { proposal }
    ↓ KnowledgeGovernanceEngine
ApprovedKnowledgeGovernanceRecord
    ↓ applyApprovedChange()
KnowledgeGraph
```

### Path B — Venue Context

```
ContextStore / VenueKnowledgeProfile
    ↓ assembleFormationContext()
FormationContext.institutional[]
    ↓ form()
Understanding
    ↓ (same downstream as Path A)
```

### Path C — Professional Knowledge

```
KnowledgeGraph.search()
    ↓ governedConceptsToFormation()
FormationKnowledge[]
    ↓ form()
Understanding
```

---

## Part 1 — Source Metadata: What Enters, What Survives, What Is Lost

### 1.1 Observation → Translation

**Source metadata that enters:**
```typescript
Observation {
  source: "vision" | "conversation" | "document" | "sensor" | "system" | "human";
  // ↑ present
}
```

**After `translateObservations()`:**
```typescript
Translation {
  observationId: string;   // ✓ traces back to originating Observation
  meaning: string;
  confidence: number;
  // source: NOT present — observation's source is not carried into Translation
}
```

**What is lost:** `Observation.source`.
A human utterance translation and a sensor translation are identical in shape.

**What survives into `form()`:** `observationId` → `Understanding.evidenceChain[]`

---

### 1.2 `ContextStore` → `FormationContext.institutional`

**Source metadata that enters:**
```typescript
ContextEntry {
  category: "business" | "venue" | "team" | "systems" | "communication" | "knowledge" | "memory";
  key: string;
  value: string;
  source: "conversation" | "photo" | "document" | "system" | "manual";   // ← PRESENT
  createdAt: string;
}
```

**After `contextEntriesToInstitutional()`:**
```typescript
FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
  // source: STRIPPED
  // createdAt: STRIPPED
}
```

**What is lost:** Everything except `category`, `key`, `value`.

---

### 1.3 `VenueKnowledgeProfile` → `FormationContext.institutional`

**Source metadata that enters:**
```typescript
VenueProfileFact {
  source: "annie-observation" | "annie-conversation" | "manager-confirmation" | ...;  // ← PRESENT
  confidence: "observed" | "reported" | "confirmed";   // ← PRESENT
  observedAt: string;
  confirmedAt?: string;
  active: boolean;
}
```

**After `venueProfileToInstitutional()`:**
```typescript
FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
  // source: STRIPPED
  // confidence: STRIPPED
  // observedAt: STRIPPED
}
```

**What is lost:** `source`, `confidence`, `observedAt`, `active`.
A `confidence: "confirmed"` manager fact and a `confidence: "observed"` Annie estimate
arrive at formation as identical entries.

---

### 1.4 `PersonContextStore` → Formation

**No adapter exists.**

`assembleFormationContext()` accepts `ContextEntry[]` and `VenueKnowledgeProfile`.
`RelationshipMemoryEntry` has no path into formation today.

**The risk:** If a future developer routes `RelationshipMemoryEntry` values through
`ContextStore.category === "memory"`, they enter formation with all source metadata stripped —
indistinguishable from venue facts.

---

### 1.5 `KnowledgeAnswer` (OS routing) → `FormationKnowledge`

**After `knowledgeAnswerToFormation()`:**
```typescript
FormationKnowledge {
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
  // sourceLevel collapsed: "profession" and "organisation" both become "professional"
  // sourceType: NOT present — OS-routed vs locally governed knowledge are indistinguishable
}
```

---

### 1.6 `KnowledgeGraph` concept → `FormationKnowledge`

**After `governedConceptsToFormation()`:**
```typescript
FormationKnowledge {
  principle: string;     // = concept.definition — text only; concept ID not carried
  evidenceLevel: "constitutional" | "professional" | "local";
  // concept.id: STRIPPED
  // governanceId: NEVER accessible from this path
  // sourceType: NOT present — same shape as OS-routed knowledge
}
```

---

### 1.7 `form()` — What Understanding Carries

```typescript
Understanding {
  summary: string;          // assembled from all sources — sources NOT individually tagged
  confidence: number;       // from translation confidence + context completeness only
  uncertainty: string[];
  completeness: UnderstandingCompleteness;
  evidenceChain: string[];  // translation.observationId values ONLY
  createdAt: string;
  updatedAt: string;
}
```

**What `Understanding` cannot answer:**
- Which institutional context entries contributed to this summary?
- Was any `FormationKnowledge` derived from a person-scoped source?
- Was any context confirmed or merely observed?
- Did any part of this understanding originate from relationship memory?

`evidenceChain` contains `observationId` values only. Institutional context and knowledge
sources leave no trace in `Understanding`.

---

### 1.8 `LearningEvidence` — What Learning Carries

```typescript
LearningEvidence {
  sourceType: "reflection-summary" | "reflection-finding" | "reflection-evidence" | "reflection-uncertainty";
  // ↑ covers reflection stages only — NOT original context sources
}

LearningProposal {
  whatShouldChange: string;  // text derived from reflection, which was derived from Understanding
  // No flag for: "this proposal was informed by person-scoped context"
}
```

---

### 1.9 `KnowledgeGovernanceEngine` — What Governance Carries

The engine takes `Learning` as input. It does not inspect:
- Whether `Learning.proposal` was informed by person-scoped context
- Whether `Understanding.summary` contained relationship memory
- Whether any institutional context had `source: "relationship"`

The governance chain protects the write path. It does not inspect content origin.

---

### 1.10 `ConceptProvenanceRecord` — What Governance Remembers

```typescript
ConceptProvenanceRecord {
  governanceId: string;
  provenance: ReadonlyArray<string>;  // ["learning:...", "reflection:...", "execution:..."]
  // ↑ traces the governance chain — NOT the original context sources
}
```

`provenance` traces backwards to the execution that produced the learning.
It does not trace to the `FormationInstitutionalContext` entries or `FormationKnowledge`
items that shaped the understanding that drove the execution.

---

## Part 2 — The Contamination Question

### Can the system distinguish "Sarah prefers written instructions" from "Hospitality staff prefer written instructions"?

**Answer: No.**

**Trace of "Sarah prefers written instructions":**

```
Step 1 — RelationshipMemoryEntry (if an adapter existed):
  { personId: "sarah-001", key: "communication-style", value: "Sarah prefers written instructions." }

Step 2 — FormationInstitutionalContext (source stripped):
  { category: "communication", key: "communication-style", value: "Sarah prefers written instructions." }

Step 3 — Understanding.summary contains:
  "... Sarah prefers written instructions. ..."
  evidenceChain: ["obs-001"]   ← observation IDs only; no source tag

Step 4 — Reflection.summary contains:
  "... Sarah prefers written instructions. ..."
  (or abstracted: "written instruction approach was preferred")

Step 5 — LearningProposal.whatShouldChange:
  "Introduce written instruction approach to improve clarity."
  (personal name may be abstracted; personal origin is not flagged)

Step 6 — ApprovedKnowledgeChange.proposedContent:
  "Written instructions reduce repeated clarification needs."

Step 7 — KnowledgeGraph.addConcept:
  { id: "written-instructions-reduce-clarification",
    definition: "Written instructions reduce repeated clarification needs.",
    evidenceLevel: "single-source", scope: "professional" }
```

At step 6–7, "Sarah's preference" has become a professional concept.
The governance reviewer receives a proposal text that reads as a professional insight.
Nothing in the governance record identifies its origin as a single person's consent-gated
preference.

**The contamination is silent.** Not malicious. Not detectable. The source was lost at step 2.

---

## Part 3 — Provenance Survival Table

| Source | Source metadata present | Survives adapter | Survives into Understanding |
|---|---|---|---|
| `Observation.source` | ✓ | ✗ lost in Translation type | ✗ |
| `Translation.observationId` | ✓ | ✓ | ✓ in `evidenceChain[]` |
| `ContextEntry.source` | ✓ | ✗ stripped by `contextEntriesToInstitutional()` | ✗ |
| `VenueProfileFact.confidence` | ✓ | ✗ stripped by `venueProfileToInstitutional()` | ✗ |
| `KnowledgeAnswer.sourceLevel` | ✓ | ✓ as `evidenceLevel` | ✗ not individually tracked |
| `Concept.evidenceLevel` | ✓ | ✓ as `evidenceLevel` | ✗ not individually tracked |
| `Concept.id` / `governanceId` | ✓ | ✗ not carried by adapter | ✗ |
| `RelationshipMemoryEntry.personId` | ✓ | ✗ no adapter exists | ✗ |
| `RelationshipMemoryEntry.consentedAt` | ✓ | ✗ no adapter exists | ✗ |

---

## Part 4 — The Smallest Change That Closes the Contamination Path

Three additive changes. No existing logic changes. No existing tests break.

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

`form()` ignores it. Adapters populate it. Downstream reads it.

### Change 2 — `contextSources?` on `Understanding`

```typescript
// lib/understanding/Understanding.ts
interface Understanding {
  // ...existing fields...
  contextSources?: string[];   // ADD — deduplicated source values from institutional context
}
```

`form()` populates this from `context.institutional[].source` values (deduplicated).
`evidenceChain` remains observation IDs only.
`contextSources` carries institutional source labels: `["venue-context", "relationship"]`.

### Change 3 — `informedByPersonContext?` on `LearningProposal`

```typescript
// lib/learning/Learning.ts
interface LearningProposal {
  // ...existing fields...
  informedByPersonContext?: boolean;   // ADD — triggers de-identification review
}
```

`LearningEngine` sets this to `true` when `Understanding.contextSources` contains `"relationship"`.
`KnowledgeGovernanceEngine` treats it as equivalent to `requiresHuman: true` —
explicit de-identification rationale required before approval.

### Why all three are necessary

Without Change 1: source enters formation but is immediately lost.
Without Change 2: source survives formation but Learning cannot see it.
Without Change 3: Learning can see it but governance cannot act on it.

Together they form a continuous chain:

```
FormationInstitutionalContext.source = "relationship"
    ↓ form() → Understanding.contextSources = ["relationship"]
    ↓ LearningEngine detects "relationship" → LearningProposal.informedByPersonContext = true
    ↓ KnowledgeGovernanceEngine: requires explicit de-identification rationale
    ↓ Governance reviewer must confirm: "Sarah's preference" → "Hospitality pattern"
```

---

## Part 5 — Impact Assessment

| File | Change | Nature |
|---|---|---|
| `platform/cos/understanding-formation/types.ts` | `source?` on `FormationInstitutionalContext`; `sourceType?` on `FormationKnowledge` | Additive — zero breaking |
| `lib/understanding/Understanding.ts` | `contextSources?` on `Understanding` | Additive — zero breaking |
| `lib/learning/Learning.ts` | `informedByPersonContext?` on `LearningProposal` | Additive — zero breaking |
| `lib/annie/formation/contextAdapter.ts` | Populate `source` in both conversion functions | Behaviour addition |
| `lib/annie/formation/governedKnowledgeAdapter.ts` | Add `sourceType: "knowledge-graph"` | Additive |
| `lib/annie/formation/knowledgeAdapter.ts` | Add `sourceType: "os-routing"` | Additive |
| `platform/cos/understanding-formation/formation.ts` | Populate `contextSources` from `institutional[].source` | Additive |
| `lib/learning/LearningEngine.ts` | Set `informedByPersonContext` when `contextSources` contains `"relationship"` | New behaviour |

**Must not be modified:** `KnowledgeGraph`, `evaluateGuard()`, `applyApprovedChange()`, `PersonContextStore`, `KnowledgeGovernanceEngine`.

---

## Summary

### The gap in one sentence

Every institutional context source loses its origin at the `FormationInstitutionalContext`
type boundary. `form()` assembles understanding from unlabelled inputs. Downstream stages
cannot distinguish where understanding came from.

### The proof that contamination is possible today

"Sarah prefers written instructions" can travel from `RelationshipMemoryEntry` to
`KnowledgeGraph` concept without any stage detecting the person-scoped origin —
because at every stage the source label has been stripped.

### The smallest change that closes the path

One optional field on `FormationInstitutionalContext`.
One optional field on `Understanding`.
One optional flag on `LearningProposal`.

All additive. Zero behaviour changes to existing code. Zero existing tests break.

The source authority travels with the context.

The Oak stays clean.

The person stays respected.
