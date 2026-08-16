# MILESTONE_049_IMPLEMENTATION_PLAN — Authority Context Boundary

**Date:** 2026-08-06
**Status:** Implementation Plan — Ready to Execute
**Depends on:**
- MILESTONE_049_CANDIDATE_AUTHORITY_CONTEXT_BOUNDARY.md ✓
- MILESTONE_049_REPOSITORY_ANALYSIS.md ✓
- PD-010 — Authority Requires Context ✓

**Goal:**
Judgement quality → minimum authority risk → explainable `AuthorityAssessment`.

**Not the goal:** Changing how authority decisions are made. Not changing the outcome
of any existing scenario. Providing the governed translation that makes authority records
explainable.

---

## Pre-Implementation Confirmation

All of the following must remain unchanged after implementation:

| Component | File | Unchanged |
|---|---|---|
| `JudgementEngine` | `lib/judgement/JudgementEngine.ts` | ✓ No changes |
| `AuthorityEngine` | `lib/authority/AuthorityEngine.ts` | ✓ No changes |
| `ActionEngine` | `lib/action/ActionEngine.ts` | ✓ No changes |
| `KnowledgeGraph` | `lib/knowledge/KnowledgeGraph.ts` | ✓ No changes |
| Any governance, reflection, or learning component | `lib/knowledge-governance/` | ✓ No changes |
| `PersonContextStore` | `lib/annie/relationship/PersonContextStore.ts` | ✓ No changes |

Existing safety behaviour is preserved. `ActionEngine.mergeConstraints()` remains the
structural safety net. This plan adds explanation — not additional gating.

All existing tests must pass after implementation.

---

## Step 1 — Create `lib/authority/authorityFromJudgement.ts`

**File:** `lib/authority/authorityFromJudgement.ts` *(new file)*

**Exports:**
- `judgementToMinimumRiskLevel(judgement: Judgement): "low" | "medium" | "high" | "critical"`
- `applyRiskFloor(callerRiskLevel: string | undefined, judgement: Judgement): "low" | "medium" | "high" | "critical"`

### `judgementToMinimumRiskLevel()`

Translates `Judgement.disposition` into the minimum risk level the authority assessment
should apply. The mapping is deterministic and reflects the quality of the underlying understanding.

```
"proceed"        → "low"       — understanding sufficient and complete
"caution"        → "medium"    — understanding partial, uncertain, or restricted-source
"human-required" → "high"      — high-risk signals present
"insufficient"   → "critical"  — understanding too weak to act from
```

**Why:** Per PD-010, the risk level is not only a property of the action — it is partially
a property of the understanding. A DC that assessed its own understanding as warranting
caution is not operating at low risk, regardless of what the action looks like externally.

### `applyRiskFloor()`

Takes the higher severity of the caller-supplied risk level and the judgement-derived minimum.
The caller may escalate beyond the minimum; the caller may not understate it.

Risk level severity order: `"low" < "medium" < "high" < "critical"`

**Why:** Callers retain the ability to declare elevated risk (e.g. a known safety-critical
venue). They lose the ability to silently understate the risk implied by the judgement.

---

## Step 2 — Create `lib/authority/__tests__/authorityFromJudgement.test.ts`

**File:** `lib/authority/__tests__/authorityFromJudgement.test.ts` *(new file)*

Tests for all seven proof conditions.

---

## Step 3 — No other files to modify

`AuthorityEngine`, `JudgementEngine`, and `ActionEngine` are unchanged.

Callers adopt `applyRiskFloor()` voluntarily when constructing `AuthorityContext.riskLevel`.
This milestone does not enforce adoption — it provides the governed function and proves it works.

The existing Milestone 045 conversation boundary tests already supply `riskLevel: "low"` directly.
Those tests remain valid — they are testing the authority engine in isolation, not a full
governed judgement-to-authority chain.

---

## Proof Conditions

| PC | Test | What it proves |
|---|---|---|
| PC1 | `disposition: "proceed"` → `"low"` | Proceed does not inflate risk |
| PC2 | `disposition: "caution"` → `"medium"` | Caution is never understated as low |
| PC3 | `disposition: "human-required"` → `"high"` | Human-required cannot be assessed below high |
| PC4 | `disposition: "insufficient"` → `"critical"` | Insufficient understanding produces critical risk |
| PC5 | `applyRiskFloor("low", caution-judgement)` → `"medium"` | Floor is applied — caller cannot understate |
| PC6 | `applyRiskFloor("high", proceed-judgement)` → `"high"` | Caller can escalate beyond minimum |
| PC7 | `applyRiskFloor(undefined, caution-judgement)` → `"medium"` | Absent caller risk defaults to judgement floor |

---

## Execution Order

1. Create `lib/authority/authorityFromJudgement.ts` (Step 1)
2. Run `npx jest lib/authority` — should produce 0 tests (file exists, test file not yet created)
3. Create `lib/authority/__tests__/authorityFromJudgement.test.ts` (Step 2)
4. Run `npx jest lib/authority` — all proof conditions must pass
5. Run full suite — all 241 existing tests must remain green

---

## Definition of Done

- `judgementToMinimumRiskLevel()` maps all four dispositions correctly
- `applyRiskFloor()` cannot return a level lower than `judgementToMinimumRiskLevel()`
- All 7 proof conditions pass as automated tests
- All 241 existing tests still pass
- No engine was modified

A caller using `applyRiskFloor()` when constructing `AuthorityContext.riskLevel`
produces an authority record that can explain:

> "This action was assessed at medium risk because judgement disposition was 'caution',
> which was derived from partial understanding."

The authority record carries its rings.
