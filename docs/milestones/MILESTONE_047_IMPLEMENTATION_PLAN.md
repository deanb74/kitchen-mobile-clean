# MILESTONE_047_IMPLEMENTATION_PLAN — Context Source Authority

**Date:** 2026-08-06
**Status:** Implementation Plan — Ready to Execute
**Depends on:**
- PD-009 — Context Has Authority ✓
- MILESTONE_047_CANDIDATE_CONTEXT_SOURCE_AUTHORITY_BOUNDARY.md ✓
- MILESTONE_047_REPOSITORY_ANALYSIS.md ✓

**Goal:**
Prove that Helping Hand can carry the origin and authority of understanding
from source to governance without losing context.

**Not the goal:** Adding intelligence. Changing formation behaviour. Improving outcomes.

---

## Pre-Implementation Confirmation

All of the following must remain unchanged after implementation:

| Component | File | Unchanged |
|---|---|---|
| `form()` logic | `platform/cos/understanding-formation/formation.ts` | ✓ No logic changes |
| `evaluateGuard()` | `lib/knowledge-governance/writeGuard.ts` | ✓ No changes |
| `applyApprovedChange()` | `lib/knowledge-governance/applyApprovedChange.ts` | ✓ No changes |
| `KnowledgeGraph` | `lib/knowledge/KnowledgeGraph.ts` | ✓ No changes |
| `PersonContextStore` | `lib/annie/relationship/PersonContextStore.ts` | ✓ No changes |
| `JudgementEngine` | `lib/judgement/JudgementEngine.ts` | ✓ No changes |
| `AuthorityEngine` | `lib/authority/AuthorityEngine.ts` | ✓ No changes |

The existing 170 tests must all pass after implementation.

---

## Step 1 — Add `source?` to `FormationInstitutionalContext`

**File:** `platform/cos/understanding-formation/types.ts`

**Change:** Add one optional field to `FormationInstitutionalContext`.

```typescript
// Before
export interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
}

// After
export interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
  source?: "venue-context" | "venue-profile" | "relationship" | "system";
}
```

**Also add:** `sourceType?` to `FormationKnowledge`.

```typescript
// Before
export interface FormationKnowledge {
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
}

// After
export interface FormationKnowledge {
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
  sourceType?: "os-routing" | "knowledge-graph";
}
```

**Why:** These are the entry points for source authority into the formation contract.
Both fields are optional — all existing callsites continue to compile and pass without modification.

---

## Step 2 — Add `contextSources?` to `Understanding`

**File:** `lib/understanding/Understanding.ts`

**Change:** Add one optional field.

```typescript
// Before
export interface Understanding {
  summary: string;
  confidence: number;
  uncertainty: string[];
  completeness?: UnderstandingCompleteness;
  evidenceChain?: string[];
  createdAt: string;
  updatedAt: string;
}

// After
export interface Understanding {
  summary: string;
  confidence: number;
  uncertainty: string[];
  completeness?: UnderstandingCompleteness;
  evidenceChain?: string[];
  contextSources?: string[];   // deduplicated source values from institutional context
  createdAt: string;
  updatedAt: string;
}
```

**Why:** `contextSources` is the carrier that allows `LearningEngine` to detect whether
a proposal was informed by relationship memory. Without it, the source label dies at `form()`.

---

## Step 3 — Populate `contextSources` in `form()`

**File:** `platform/cos/understanding-formation/formation.ts`

**Change:** Add one line to the `form()` return value. No logic change.

```typescript
// In form(), the return statement gains one field:
return {
  summary,
  confidence,
  uncertainty,
  completeness,
  evidenceChain,
  contextSources: buildContextSources(context),   // ADD
  createdAt: now,
  updatedAt: now,
};
```

**Add the helper (pure function — no logic):**

```typescript
// Collects unique source values from institutional context. Never empty-string entries.
function buildContextSources(context: FormationContext): string[] {
  const sources = context.institutional
    .map((entry) => entry.source)
    .filter((s): s is string => typeof s === "string" && s.length > 0);
  return [...new Set(sources)];
}
```

**Formation invariants are unchanged.** `contextSources` is a read-only aggregation of
existing input fields. It does not influence `summary`, `confidence`, `uncertainty`,
`completeness`, or `evidenceChain`.

---

## Step 4 — Add `informedByPersonContext?` to `LearningProposal`

**File:** `lib/learning/Learning.ts`

**Change:** Add one optional boolean field.

```typescript
// Before
export interface LearningProposal {
  knowledgeTargetId?: string;
  whatShouldChange: string;
  why: string;
  expectedBenefit: string;
  confidence: number;
  supportingEvidence: ReadonlyArray<LearningEvidence>;
}

// After
export interface LearningProposal {
  knowledgeTargetId?: string;
  whatShouldChange: string;
  why: string;
  expectedBenefit: string;
  confidence: number;
  supportingEvidence: ReadonlyArray<LearningEvidence>;
  informedByPersonContext?: boolean;   // true when contextSources contains "relationship"
}
```

---

## Step 5 — Set `informedByPersonContext` in `LearningEngine`

**File:** `lib/learning/LearningEngine.ts`

**Change:** In `buildProposal()`, set the flag when the understanding carried relationship context.

The `LearningEngine` currently derives proposals from `Reflection`. `Reflection` is derived
from `Execution`. `Execution` carries `Understanding` indirectly through the action it executed.

`Understanding.contextSources` must be carried through `Execution` → `Reflection` → `Learning`
for `LearningEngine` to read it.

**The carry-through chain:**

`Execution.understanding` does not currently exist on the `Execution` type. The simplest path
is to add `contextSources?` to `Reflection` — populated from the `Understanding` that produced
the action — so `LearningEngine` can read it.

**File:** `lib/reflection/Reflection.ts`

**Change:** Add one optional field to `ReflectionContext`.

```typescript
// Before
export interface ReflectionContext {
  actionId: string;
  executionId: string;
  executionCreatedAt: string;
  executionCompletedAt?: string;
  actionState: ActionState;
  actionDisposition: ActionDisposition;
  executionOutcome: ExecutionOutcome;
  executionEffect: ExecutionEffect;
}

// After
export interface ReflectionContext {
  actionId: string;
  executionId: string;
  executionCreatedAt: string;
  executionCompletedAt?: string;
  actionState: ActionState;
  actionDisposition: ActionDisposition;
  executionOutcome: ExecutionOutcome;
  executionEffect: ExecutionEffect;
  understandingContextSources?: string[];   // carries Understanding.contextSources forward
}
```

**File:** `lib/reflection/ReflectionEngine.ts`

**Change:** In `copyContext()`, pass through `understandingContextSources` when it exists on
the input. Add `understandingContextSources?` to `BuildReflectionInput`:

```typescript
export interface BuildReflectionInput {
  execution: Execution;
  reflectionId?: string;
  now?: string;
  understandingContextSources?: string[];   // ADD — caller supplies when available
}
```

In `copyContext()`:
```typescript
private copyContext(
  execution: Execution,
  input: BuildReflectionInput,
): ReflectionContext {
  return {
    actionId: execution.action.id,
    executionId: execution.id,
    executionCreatedAt: execution.createdAt,
    executionCompletedAt: execution.completedAt,
    actionState: execution.action.state,
    actionDisposition: execution.action.disposition,
    executionOutcome: execution.outcome,
    executionEffect: execution.effect,
    understandingContextSources: input.understandingContextSources,   // ADD
  };
}
```

**File:** `lib/learning/LearningEngine.ts`

**Change:** In `buildProposal()`, set `informedByPersonContext` when context sources indicate
relationship origin.

```typescript
private buildProposal(
  reflection: Reflection,
  disposition: LearningDisposition,
  confidence: number,
  auditEvidence: LearningEvidence[],
): LearningProposal | undefined {
  // ...existing logic...
  const informedByPersonContext =
    reflection.context.understandingContextSources?.includes("relationship") ?? false;

  if (disposition === "propose") {
    return {
      // ...existing fields...
      informedByPersonContext: informedByPersonContext || undefined,
    };
  }
  // ...
}
```

---

## Step 6 — Populate adapters with source labels

**File:** `lib/annie/formation/contextAdapter.ts`

**Change:** Populate `source` in the two conversion functions.

`contextEntriesToInstitutional()`:
```typescript
export function contextEntriesToInstitutional(
  entries: ContextEntry[],
): FormationInstitutionalContext[] {
  return entries.map((entry) => ({
    category: entry.category,
    key: entry.key,
    value: entry.value,
    source: "venue-context" as const,   // ADD
  }));
}
```

`venueProfileToInstitutional()`:
```typescript
// Each push gains source: "venue-profile"
items.push({ category: "equipment", key: item, value: item, source: "venue-profile" as const });
// (same for departments, venueTypes, region)
```

**File:** `lib/annie/formation/governedKnowledgeAdapter.ts`

**Change:** Populate `sourceType` in `governedConceptsToFormation()`.
```typescript
return [{ principle: c.definition, evidenceLevel, sourceType: "knowledge-graph" as const }];
```

**File:** `lib/annie/formation/knowledgeAdapter.ts`

**Change:** Populate `sourceType` in `knowledgeAnswerToFormation()`.
```typescript
return {
  principle: answer.answer,
  evidenceLevel: sourceLevelToEvidenceLevel(answer.sourceLevel),
  sourceType: "os-routing" as const,
};
```

---

## Step 7 — Tests

### 7.1 Unit Tests — `contextAdapter.test.ts`

**File:** `lib/annie/formation/__tests__/contextAdapter.test.ts` (new file)

| Test | Proof Condition |
|---|---|
| `contextEntriesToInstitutional()` sets `source: "venue-context"` | PC1 |
| `venueProfileToInstitutional()` sets `source: "venue-profile"` on all entries | PC2 |
| Existing callers with no `source` still work (optional field) | Regression |

### 7.2 Unit Tests — `formation.test.ts` additions

**File:** `platform/cos/understanding-formation/__tests__/formation.test.ts` (existing — add cases)

| Test | Proof Condition |
|---|---|
| `form()` with `source: "venue-context"` entries → `contextSources: ["venue-context"]` | PC3 |
| `form()` with `source: "relationship"` entries → `contextSources: ["relationship"]` | PC4 |
| `form()` with mixed sources → `contextSources` deduplicated | PC3 |
| `form()` with no source fields → `contextSources: []` or absent | Regression |
| Existing formation tests unaffected | Regression |

### 7.3 Integration Tests — `milestone-047-context-source-authority.test.ts`

**File:** `lib/annie/formation/__tests__/milestone-047-context-source-authority.test.ts` (new)

| Test | Proof Condition |
|---|---|
| Venue context retains `source: "venue-context"` through `assembleFormationContext()` | PC1 |
| `Understanding.contextSources` contains `"venue-context"` after venue formation | PC3 |
| `Understanding.contextSources` contains `"relationship"` when relationship entry present | PC4 |
| `LearningProposal.informedByPersonContext` is `true` when `contextSources` contains `"relationship"` | PC5 |
| `KnowledgeGovernanceEngine.build()` throws without `reviewedBy` when `informedByPersonContext` is `true` | PC6, PC7 |
| Professional knowledge `sourceType: "knowledge-graph"` survives into `FormationKnowledge` | PC1 |
| Existing 170 tests still pass | Regression |

---

## Execution Order

1. Step 1 — type additions (no logic, zero risk)
2. Step 2 — `Understanding` field (no logic, zero risk)
3. Step 4 — `LearningProposal` field (no logic, zero risk)
4. Step 5 — `ReflectionContext` field + `BuildReflectionInput` (minimal, additive)
5. Step 3 — `form()` `contextSources` population (pure aggregation, no logic change)
6. Step 5b — `LearningEngine` `informedByPersonContext` detection (new behaviour, small)
7. Step 6 — adapter `source`/`sourceType` population (additive)
8. Step 7 — tests

Run `npx jest` after each step. All 170 existing tests must remain green throughout.

---

## Definition of Done

- All 7 proof conditions covered by automated tests
- All 170 existing tests still pass
- `informedByPersonContext: true` causes `KnowledgeGovernanceEngine` to require `reviewedBy`
- No change to `form()` logic, `evaluateGuard()`, `KnowledgeGraph`, `PersonContextStore`

The rings travel with the context.
