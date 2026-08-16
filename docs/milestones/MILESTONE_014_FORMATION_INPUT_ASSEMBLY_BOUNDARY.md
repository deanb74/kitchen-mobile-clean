# Milestone 014 — Formation Input Assembly Boundary

**Date:** 2026-08-05  
**Status:** Analysis  
**Question:** Can the three formation inputs be assembled from existing capabilities without creating new intelligence?  
**Constraint:** No code changes. Evidence only.

---

## Central Question

Milestone 013 proved that `form(translations, context, knowledge)` works.

Milestone 014 must prove:

> Can a DC gather those three inputs automatically using what already exists — without COS becoming professional and without the DC becoming a reasoning engine?

The answer is: **Yes. Three mapping functions are sufficient. No new intelligence is required.**

---

## Bridge 1 — Rule Selector

**Question:** Can existing TranslationRules be selected from observations and context?

### What Already Exists

The `TranslationRule` interface already contains a selector:

```typescript
// platform/cos/translation/types.ts
export interface TranslationRule {
  matches: (observation: Observation) => boolean;  // ← this IS the selector
  translate: (observation: Observation) => Translation;
}
```

`matches()` takes an observation and returns whether this rule applies to it. The selector mechanism exists. It is used today.

The `Observation` struct already carries the information needed to make situational decisions:

```typescript
// platform/cos/observation/types.ts
export interface Observation {
  id: string;
  category: string;  // ← the situational dimension
  description: string;
  confidence: number;
  source: ObservationSource;  // vision | conversation | document | sensor | system | human
}
```

### What the Current Rules Match On

Annie's current hospitality rules match on `observation.id`:

```typescript
// lib/annie/translation/hospitalityRules.ts
matches: (observation) => observation.id === "tables"
matches: (observation) => observation.id === "bar"
```

This is venue-specific matching — it only works if the observation ID is exactly known.

### What Would Make Rules Situationally Selectable — Without New Intelligence

A rule that matches on `observation.category` instead of `observation.id` is situationally general and does not require new intelligence. It requires richer rule content, not a new mechanism.

```typescript
// Conceptual — not implementation
matches: (observation) =>
  observation.category === "equipment" &&
  observation.description.toLowerCase().includes("temperature")
```

**Finding:** The rule selection mechanism already exists as `matches()`. What it currently matches on is too narrow. Making it category-aware is a content improvement, not a new capability.

**No new intelligence required for Bridge 1.**

---

## Bridge 2 — Context Assembler

**Question:** Can `AnnieThought` + `VenueKnowledgeProfile` + `ContextStore` become `FormationContext`?

### The Target Type

```typescript
// platform/cos/understanding-formation/types.ts
interface FormationContext {
  situational: FormationSituationalContext;   // live moment
  institutional: FormationInstitutionalContext[];  // background knowledge
}

interface FormationSituationalContext {
  urgency?: FormationUrgency;
  risk?: string;
  who?: string;
  what?: string;
  where?: string;
  purpose?: string;
}

interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
}
```

### Source 1: `AnnieThought` → `FormationSituationalContext`

```typescript
// lib/annie/thinking.ts
interface AnnieThought {
  stimulus: string;
  who?: string;    → FormationSituationalContext.who    ✓ direct
  what?: string;   → FormationSituationalContext.what   ✓ direct
  where?: string;  → FormationSituationalContext.where  ✓ direct
  when?: string;   (timing — not in FormationContext)
  why?: string;    → FormationSituationalContext.purpose ✓ direct
  confidence: number;
  needsClarification: boolean;
}
```

**Gap — `urgency` is not in `AnnieThought`.**

Urgency is derivable from the fields that are present:
- `confidence >= 0.8` → urgency `"low"`
- `confidence >= 0.5` && not `needsClarification` → urgency `"medium"`
- `confidence < 0.5` || `needsClarification` → urgency `"high"`
- Risk keywords in `what` or `why` → urgency `"critical"`

This is a derivation rule, not intelligence. It is a deterministic function of existing fields.

### Source 2: `ContextStore` → `FormationContext.institutional[]`

```typescript
// lib/onboarding/contextStore.ts
interface ContextEntry {
  category: ContextCategory;  // "business" | "venue" | "team" | "systems" | ...
  key: string;
  value: string;
}
```

```typescript
// platform/cos/understanding-formation/types.ts
interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
}
```

**The structure is identical.** `ContextStore.getEntries()` can be mapped to `FormationContext.institutional[]` with a direct spread or array copy. No transformation is required — only an import and call.

### Source 3: `VenueKnowledgeProfile` → supplements `FormationContext.institutional[]`

```typescript
// lib/os/knowledge/applicability/venueKnowledgeProfile.ts
interface VenueKnowledgeProfile {
  equipment: string[];    → [{category: "equipment", key: item, value: item}]
  departments: string[];  → [{category: "department", key: item, value: item}]
  venueTypes: string[];   → [{category: "venue-type", key: item, value: item}]
}
```

Mapping is a `flatMap` over each array. No reasoning required.

**Finding:** All three fields of `FormationSituationalContext` are directly present in `AnnieThought`. The one missing field (`urgency`) is derivable from a deterministic rule on existing fields. `FormationContext.institutional[]` is structurally identical to `ContextStore` entries. `VenueKnowledgeProfile` dimensions are a simple transform.

**No new intelligence required for Bridge 2.**

---

## Bridge 3 — Knowledge Assembler

**Question:** Can HQ knowledge responses become `FormationKnowledge`?

### The Target Type

```typescript
// platform/cos/understanding-formation/types.ts
interface FormationKnowledge {
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
}
```

### The Source Type

```typescript
// lib/os/types.ts
type KnowledgeAnswer = {
  questionId: string;
  answer: string;           // ← this becomes FormationKnowledge.principle
  sourceLevel: KnowledgeLevel;  // "venue" | "organisation" | "profession" | "helping-hand"
  confidence?: number;
  approvedAt?: string;
};
```

**Evidence of answer content from tests** (`lib/os/__tests__/knowledgeRoundTrip.test.ts`):

```typescript
// HQ returns a principle as an answer string
answer: "refrigerate chilled food at 8°C or below, with 5°C or below commonly used as the operating target."
sourceLevel: "profession"
```

### The Mapping

| `KnowledgeAnswer.sourceLevel` | `FormationKnowledge.evidenceLevel` |
|---|---|
| `"helping-hand"` | `"constitutional"` |
| `"profession"` | `"professional"` |
| `"organisation"` | `"professional"` |
| `"venue"` | `"local"` |

This is a four-entry lookup table. It requires no reasoning — only a `switch` or object map on the source level.

### The `TaggedKnowledgePackage` path

For knowledge retrieved through applicability matching (rather than question-answer), `TaggedKnowledgePackage` carries `approvedBy` and `tags.professions`. The evidence level is directly determinable:

```typescript
approvedBy === "Helping Hand HQ" → "constitutional"
tags.professions.length > 0      → "professional"
source === "venue"               → "local"
```

**Finding:** `KnowledgeAnswer.answer` is `FormationKnowledge.principle`. `KnowledgeAnswer.sourceLevel` maps to `FormationKnowledge.evidenceLevel` through a four-entry lookup table. No reasoning required.

**No new intelligence required for Bridge 3.**

---

## Bridge 4 — Boundary Validation

**Question:** Does knowledge stay at the correct level?

All four boundaries are already enforced by existing code.

### Venue knowledge stays local

**Evidence:** `platform/hq/knowledgeFlow.ts`

```typescript
case "local":
  return ["digital-colleague"];
```

A DC with only `kind: "local"` knowledge routes exclusively to itself. `organisationId` is optional — absent for independents.

### Organisation knowledge stays optional

**Evidence:** `platform/hq/types.ts`

```typescript
interface KnowledgeOrigin {
  organisationId?: string;  // absent for independent operators
}
```

**Evidence:** `platform/hq/knowledgeFlow.ts`

```typescript
case "organisational":
  return candidate.origin.organisationId
    ? ["digital-colleague", "organisation-hq"]
    : ["digital-colleague"];  // independent — stays local
```

An independent operator's knowledge never touches Organisation HQ.

### Professional knowledge stays professional

**Evidence:** `KnowledgeAnswer.sourceLevel === "profession"` maps to `evidenceLevel: "professional"`. Professional HQ knowledge does not become constitutional. The lookup table enforces this.

### Helping Hand knowledge stays universal

**Evidence:** `platform/hq/knowledgeFlow.ts`

```typescript
case "cross-profession":
  return candidate.origin.organisationId
    ? ["digital-colleague", "organisation-hq", "profession-hq", "helping-hand-hq"]
    : ["digital-colleague", "profession-hq", "helping-hand-hq"];
```

HH HQ is only reached for cross-profession understanding. A DC cannot bypass Professional HQ to reach it directly.

**Finding: All four boundaries already hold in code. No changes required to maintain them.**

---

## The Minimum Missing

Three adapter functions. Each is a pure mapping — no AI, no reasoning, no inference beyond deterministic rules.

### Adapter 1: `thoughtToSituationalContext`

```
Input:   AnnieThought
Output:  FormationSituationalContext

Mapping:
  who → who               (direct)
  what → what             (direct)
  where → where           (direct)
  why → purpose           (direct)
  confidence + needsClarification → urgency  (deterministic rule)
```

Approximately 15 lines. No intelligence.

---

### Adapter 2: `contextStoreToInstitutionalContext`

```
Input:   ContextEntry[]  (from ContextStore.getEntries())
Output:  FormationInstitutionalContext[]

Mapping:
  entry.category → category  (direct)
  entry.key → key            (direct)
  entry.value → value        (direct)
```

Approximately 5 lines. Identical types. No intelligence.

---

### Adapter 3: `knowledgeAnswerToFormationKnowledge`

```
Input:   KnowledgeAnswer
Output:  FormationKnowledge

Mapping:
  answer → principle  (direct)
  sourceLevel → evidenceLevel  (lookup table, 4 entries)
```

Approximately 10 lines. No intelligence.

---

## What Is NOT Missing

These do not need to be built:

- `AnnieUnderstandingFormation()` — milestone 013 evidence has killed this path
- `KevUnderstandingFormation()` — same
- `HarryUnderstandingFormation()` — same
- Any intelligence layer between DC and COS
- Any modification to the COS `form()` function
- Any changes to HQ routing

---

## Confirming the Boundary

The three adapters do not cross any architectural boundary. They live in the DC layer:

```
HH
 │  principles / governance
COS
 │  form() — universal mechanism — UNCHANGED
DC layer
 │
 ├── Adapter 1: thoughtToSituationalContext    (AnnieThought → FormationSituationalContext)
 ├── Adapter 2: contextStoreToInstitutionalContext (ContextStore → institutional[])
 └── Adapter 3: knowledgeAnswerToFormationKnowledge (KnowledgeAnswer → FormationKnowledge)
 │
 │  professional translation rules — UNCHANGED
HQs
 │  governed knowledge — UNCHANGED
Venue
 │  lived experience
People
```

COS does not know what a pub is. It does not know what a fridge temperature means. It does not know what a patient is.

The adapters sit in the DC layer and convert professional content into the types COS expects. COS remains universal.

---

## Pre-conditions Confirmed

Before adapters can be implemented:

| Pre-condition | Status |
|---|---|
| `ContextStore` accessible outside onboarding | ⚠️ Must move — currently in `lib/onboarding/` |
| Translation rules match on `category` not just `id` | ⚠️ Rules need to be enriched — existing mechanism is correct |
| `VenueKnowledgeProfile` built before formation is invoked | ✓ Already built incrementally from observations |
| `KnowledgeRouter` returns answer before formation | ✓ Already returns `KnowledgeAnswer` |

---

## Answer to the Central Question

**Yes.** The three formation inputs can be assembled from existing capabilities without creating new intelligence.

What is needed:
- Three mapping functions (~30 lines combined)
- Richer translation rule `matches()` predicates (content, not mechanism)
- `ContextStore` accessible outside onboarding (migration, not intelligence)

What is not needed:
- Any new reasoning capability
- Any modification to COS
- Any new DC-specific formation variant
- Any new HQ layer

The DC gathers professional content. COS forms understanding. The boundary is clear. The architecture is clean.

---

**Status:** Analysis complete | No code changes | Evidence-based | Three adapters identified | Pre-conditions confirmed
