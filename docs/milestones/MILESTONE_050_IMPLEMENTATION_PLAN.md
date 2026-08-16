# MILESTONE_050_IMPLEMENTATION_PLAN — Reflection Learning Improvement Boundary

**Date:** 2026-08-06
**Status:** Implementation Plan — Ready to Execute
**Depends on:**
- MILESTONE_050_CANDIDATE_REFLECTION_LEARNING_IMPROVEMENT_BOUNDARY.md ✓
- PD-011 — Learning Requires Causation ✓

**Goal:**
Carry the causation context (prior judgement disposition, understanding confidence,
understanding completeness) from formation through reflection into learning, and
use it to distinguish the four outcome types.

**Not the goal:** Rewriting engines. Changing knowledge governance. Changing what
`ReflectionEngine.selectDisposition()` produces from execution data.

---

## Pre-Implementation Confirmation

All of the following must remain unchanged after implementation:

| Component | File | Unchanged |
|---|---|---|
| `ReflectionEngine.selectDisposition()` logic | `lib/reflection/ReflectionEngine.ts` | ✓ No logic change |
| `LearningEngine.canProposeFromAdjust()` | `lib/learning/LearningEngine.ts` | ✓ No threshold change |
| `KnowledgeGraph` | `lib/knowledge/KnowledgeGraph.ts` | ✓ No changes |
| `evaluateGuard()` | `lib/knowledge-governance/writeGuard.ts` | ✓ No changes |
| `applyApprovedChange()` | `lib/knowledge-governance/applyApprovedChange.ts` | ✓ No changes |
| `PersonContextStore` | `lib/annie/relationship/PersonContextStore.ts` | ✓ No changes |
| `AuthorityEngine` | `lib/authority/AuthorityEngine.ts` | ✓ No changes |
| `JudgementEngine` | `lib/judgement/JudgementEngine.ts` | ✓ No changes |

All 254 existing tests must pass after every step.

---

## The Propagation Path

```
Caller supplies:
  priorJudgementDisposition?     (from Judgement.disposition)
  priorUnderstandingConfidence?  (from Understanding.confidence)
  priorUnderstandingCompleteness? (from Understanding.completeness)
        ↓
BuildReflectionInput (Step 1)
        ↓ ReflectionEngine.copyContext()
ReflectionContext (Step 2)
        ↓ LearningEngine.copyContext()
LearningContext (Step 3)
        ↓ LearningEngine.buildProposal()
LearningProposal.causationCategory (Step 4 + 5)
```

---

## Step 1 — `BuildReflectionInput` — three new optional fields

**File:** `lib/reflection/ReflectionEngine.ts`

**Add to `BuildReflectionInput`:**
```typescript
priorJudgementDisposition?: JudgementDisposition;
priorUnderstandingConfidence?: number;
priorUnderstandingCompleteness?: UnderstandingCompleteness;
```

Import `JudgementDisposition` from `"../judgement/Judgement"` and
`UnderstandingCompleteness` from `"../understanding/Understanding"`.

---

## Step 2 — `ReflectionContext` — carry the three fields

**File:** `lib/reflection/Reflection.ts`

**Add to `ReflectionContext`:**
```typescript
priorJudgementDisposition?: JudgementDisposition;
priorUnderstandingConfidence?: number;
priorUnderstandingCompleteness?: UnderstandingCompleteness;
```

**File:** `lib/reflection/ReflectionEngine.ts`

**Update `copyContext()` to carry all three fields from `input`:**
```typescript
priorJudgementDisposition: input.priorJudgementDisposition,
priorUnderstandingConfidence: input.priorUnderstandingConfidence,
priorUnderstandingCompleteness: input.priorUnderstandingCompleteness,
```

---

## Step 3 — `LearningContext` — carry the three fields

**File:** `lib/learning/Learning.ts`

**Add to `LearningContext`:**
```typescript
priorJudgementDisposition?: JudgementDisposition;
priorUnderstandingConfidence?: number;
priorUnderstandingCompleteness?: UnderstandingCompleteness;
```

Import `JudgementDisposition` and `UnderstandingCompleteness`.

**File:** `lib/learning/LearningEngine.ts`

**Update `copyContext()` to carry all three fields from `reflection.context`:**
```typescript
priorJudgementDisposition: reflection.context.priorJudgementDisposition,
priorUnderstandingConfidence: reflection.context.priorUnderstandingConfidence,
priorUnderstandingCompleteness: reflection.context.priorUnderstandingCompleteness,
```

---

## Step 4 — `ProposalCausationCategory` and `LearningProposal.causationCategory`

**File:** `lib/learning/Learning.ts`

**Add type:**
```typescript
export type ProposalCausationCategory =
  | "knowledge-gap"   // adequate understanding, failed due to missing professional knowledge
  | "formation-gap"   // incomplete inputs caused the failure
  | "situational"     // high-confidence failure — circumstances may have changed
  | "unknown";        // insufficient prior context to determine
```

**Add field to `LearningProposal`:**
```typescript
/** Governed hypothesis about why this outcome warranted a learning proposal. */
causationCategory?: ProposalCausationCategory;
```

---

## Step 5 — `LearningEngine` — Case D detection and causation assignment

**File:** `lib/learning/LearningEngine.ts`

### 5a — Case D: high-confidence failure → `"observe"` not `"propose"`

In `selectDisposition()`, add before the existing `canProposeFromAdjust` check:

```typescript
if (
  reflection.context.priorJudgementDisposition === "proceed" &&
  (reflection.context.priorUnderstandingConfidence ?? 0) >= 0.75 &&
  reflection.context.executionOutcome === "failed"
) {
  return "observe";  // high-confidence failure — require human review before proposing
}
```

This is the only logic change. It produces `"observe"` where `"propose"` would otherwise
be returned for a specific combination of prior context + outcome.

### 5b — Causation category assignment in `buildProposal()`

Set `causationCategory` based on the prior context:

```typescript
function deriveCausationCategory(reflection: Reflection): ProposalCausationCategory {
  const priorDisposition = reflection.context.priorJudgementDisposition;
  const priorConfidence  = reflection.context.priorUnderstandingConfidence;
  const priorCompleteness = reflection.context.priorUnderstandingCompleteness;

  if (!priorDisposition) return "unknown";

  if (
    priorDisposition === "proceed" &&
    (priorConfidence ?? 0) >= 0.75 &&
    reflection.context.executionOutcome === "failed"
  ) return "situational";

  if (
    priorDisposition === "caution" ||
    priorCompleteness === "partial"
  ) return "formation-gap";

  return "knowledge-gap";
}
```

Add `causationCategory: deriveCausationCategory(reflection)` to both proposal return paths
in `buildProposal()`.

---

## Tests

**File:** `lib/learning/__tests__/milestone-050-causation.test.ts` *(new)*

| Test | Proof Condition |
|---|---|
| `priorJudgementDisposition` survives `BuildReflectionInput` → `ReflectionContext` | PC1 |
| `priorUnderstandingConfidence` survives | PC2 |
| `priorUnderstandingCompleteness` survives | PC3 |
| All three survive `ReflectionContext` → `LearningContext` | PC4 |
| confidence ≥ 0.75 + proceed + failed → `LearningDisposition: "observe"` | PC5 — Case D |
| caution + partial + failed → `causationCategory: "formation-gap"` | PC6 — Case C |
| proceed + sufficient + failed → `causationCategory: "knowledge-gap"` | PC7 — Case B |
| proceed + succeeded → `LearningDisposition: "reinforce"` (unchanged) | PC8 — Case A |
| All 254 existing tests pass | PC9 |

---

## Execution Order

1. Step 1 — `BuildReflectionInput` fields → run `npx jest`
2. Step 2 — `ReflectionContext` fields + `copyContext()` → run `npx jest`
3. Step 3 — `LearningContext` fields + `copyContext()` → run `npx jest`
4. Step 4 — `ProposalCausationCategory` type + `LearningProposal.causationCategory` → run `npx jest`
5. Step 5a — Case D detection in `selectDisposition()` → run `npx jest`
6. Step 5b — causation assignment in `buildProposal()` → run `npx jest`
7. Tests → run `npx jest`

---

## Definition of Done

- All nine proof conditions pass as automated tests
- All 254 existing tests still pass
- `LearningProposal.causationCategory` is populated for all `"propose"` proposals
- A high-confidence-proceed-failed sequence produces `LearningDisposition: "observe"`
- No engine was rewritten; no governance chain was changed

> A learning proposal is not a conclusion about what changed.
> It is a governed hypothesis about why change may be warranted.
