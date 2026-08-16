# MILESTONE_050_REPOSITORY_ANALYSIS — Reflection Learning Improvement Boundary

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 050
**The Question:**
> Can the DC distinguish between different reasons for poor outcomes,
> and can it learn from the consequence of acting?

---

## The Four Outcome Types

The user identified four distinct cases that a mature DC must distinguish:

| Case | Meaning | Correct Learning Response |
|---|---|---|
| A | Judgement correct, outcome good | Reinforce the approach |
| B | Judgement reasonable, outcome poor | Propose adjustment to knowledge or process |
| C | Judgement wrong — understanding was incomplete | Improve formation quality, not just knowledge |
| D | Action correct, circumstances changed | Observe; do not propose (no persistent learning) |

The question is whether `ReflectionEngine` and `LearningEngine` currently make these distinctions.

---

## Part 1 — What the Reflection Engine Currently Produces

`ReflectionEngine.selectDisposition()` produces one of four dispositions:

```
"escalate" — safety-critical or high-severity governance finding
"defer"    — confidence < 0.45, uncertainty > 1, or not-attempted-permitted
"adjust"   — outcome: "failed" or outcome: "cancelled" + evidence
"affirm"   — outcome: "succeeded" + adequate evidence + confidence ≥ 0.65
```

**What drives each:**

| Disposition | Driven by |
|---|---|
| `"escalate"` | Findings: safety-critical or governance-breach terms in execution text |
| `"defer"` | Low reflection confidence or insufficient evidence |
| `"adjust"` | `execution.outcome === "failed"` |
| `"affirm"` | `execution.outcome === "succeeded"` + confidence + evidence |

**Critical finding:** `ReflectionEngine` operates entirely on `Execution` data.

It does not know:
- What `Understanding.confidence` was before the action
- What `Understanding.completeness` was before the action
- What `Judgement.disposition` was before the action
- Whether the DC was confident or cautious when it acted

`execution.outcome === "failed"` always produces `disposition: "adjust"`.
The engine cannot distinguish Case B (reasonable judgement, poor outcome)
from Case C (weak understanding caused the failure)
from Case D (circumstances changed after a correct decision).

---

## Part 2 — What Survives from Understanding into Reflection

`ReflectionContext` currently carries (after Milestone 047):
```typescript
ReflectionContext {
  actionId: string;
  executionId: string;
  executionCreatedAt: string;
  executionCompletedAt?: string;
  actionState: ActionState;
  actionDisposition: ActionDisposition;
  executionOutcome: ExecutionOutcome;
  executionEffect: ExecutionEffect;
  understandingContextSources?: string[];   // Milestone 047
}
```

**What does NOT survive from Understanding/Judgement into Reflection:**
- `Understanding.confidence` — not on `ReflectionContext`, not on `Execution`
- `Understanding.completeness` — not on `ReflectionContext`, not on `Execution`
- `Judgement.disposition` — not on `ReflectionContext`, not on `Execution`
- `Judgement.confidence` — not carried

`actionDisposition` (`execute` | `execute-with-caution` | `await-human` | `do-not-execute`) is
carried via `ExecutionActionSnapshot.disposition`. This is the closest proxy for judgement quality
— `"execute-with-caution"` implies caution was applied. But:

- `"execute-with-caution"` could result from `Judgement.disposition: "caution"` OR from
  `AuthorityEngine` returning `"allow-with-caution"` (high risk, regardless of understanding).
- The reflection cannot determine whether caution originated from the DC's own understanding
  assessment or from an authority constraint.

---

## Part 3 — What the Learning Engine Currently Produces

`LearningEngine.selectDisposition()`:

```
"reject"    — empty signal (no findings, evidence, recommendations, or uncertainty)
"observe"   — critical/high governance, escalate, defer, or cannot propose
"propose"   — reflection.disposition === "adjust" + canProposeFromAdjust
"reinforce" — reflection.disposition === "affirm" + canReinforceFromAffirm
```

`canProposeFromAdjust()` requires: `confidence ≥ 0.6`, `evidence.length > 0`, `direction`.

**The single proposal template:**

```typescript
{
  whatShouldChange:
    this.pickWhatShouldChange(reflection) ??
    "Introduce a targeted process adjustment based on reflection findings.",
  expectedBenefit:
    "Reduce recurrence of the observed issue while improving outcome consistency.",
}
```

`pickWhatShouldChange()` returns `reflection.recommendations[0]` or
`"Address finding: ${reflection.findings[0].detail}"`.

**What is not distinguished:**

For Case B (reasonable judgement, poor outcome) and Case C (weak understanding):

Both produce `reflection.disposition: "adjust"` (from `execution.outcome === "failed"`).
Both produce `Learning.disposition: "propose"` (if canProposeFromAdjust).
Both produce the same `whatShouldChange` template.

`LearningEngine` cannot say: "The failure occurred despite adequate understanding — propose
a process change" (Case B) versus "The failure occurred because understanding was incomplete
— propose formation improvement" (Case C).

---

## Part 4 — The Distinction the System Cannot Currently Make

### Case B vs Case C

**Case B — Reasonable judgement, poor outcome:**
```
Understanding.confidence: 0.75, completeness: "sufficient"
Judgement.disposition: "proceed"
Execution.outcome: "failed"
→ Reflection.disposition: "adjust"
→ Learning.proposal: "Introduce a targeted process adjustment..."
```

**Case C — Incomplete understanding caused the failure:**
```
Understanding.confidence: 0.55, completeness: "partial"
Judgement.disposition: "caution"
Execution.outcome: "failed"
→ Reflection.disposition: "adjust"  ← identical
→ Learning.proposal: "Introduce a targeted process adjustment..."  ← identical
```

Both produce the same reflection and the same learning proposal.

But they warrant different governance responses:

- Case B: governance should ask "what professional knowledge was missing?"
- Case C: governance should ask "was formation given adequate inputs?" — the fix may
  be in the observation or translation layer, not in `KnowledgeGraph`.

### Case D — Circumstances changed

**Case D — Action was correct, circumstances changed:**
```
Understanding.confidence: 0.8, completeness: "sufficient"
Judgement.disposition: "proceed"
Execution.outcome: "failed"
(reason: situation changed after the action was taken)
→ Reflection.disposition: "adjust"  ← same as Case B
→ Learning.proposal: "Introduce a targeted process adjustment..."  ← same
```

In this case, no learning should be proposed — the DC's understanding and judgement were
correct. The failure was situational, not epistemic.

The reflection cannot detect this because it has no reference to the prior understanding
quality. It only sees the execution outcome.

---

## Part 5 — What Needs to Survive

To enable the four-case distinction, `ReflectionContext` needs two additional fields:

| Field | Source | Used by |
|---|---|---|
| `priorJudgementDisposition?` | `Judgement.disposition` — from caller | `ReflectionEngine` → distinguish Case B from C |
| `priorUnderstandingConfidence?` | `Understanding.confidence` — from caller | `ReflectionEngine` + `LearningEngine` |

These follow exactly the same pattern as `understandingContextSources` added in Milestone 047:
the caller passes them into `BuildReflectionInput`, and `ReflectionEngine.copyContext()` carries
them into `ReflectionContext`.

---

## Part 6 — How the Four Cases Would Then Be Distinguished

With `priorJudgementDisposition` and `priorUnderstandingConfidence` on `ReflectionContext`:

**Case A (proceed + succeeded):**
Already handled by `disposition: "affirm"`.

**Case B (proceed + failed):**
`priorJudgementDisposition === "proceed"` + `execution.outcome === "failed"`
→ Reflection: something went wrong despite adequate understanding
→ Learning: `propose` — but flag as "process or knowledge gap, not formation gap"

**Case C (caution + failed):**
`priorJudgementDisposition === "caution"` + `execution.outcome === "failed"`
→ Reflection: failure consistent with acknowledged uncertainty
→ Learning: `propose` — flag as "formation quality may need improvement"

**Case D (proceed + failed + high prior confidence):**
`priorJudgementDisposition === "proceed"` + `priorUnderstandingConfidence ≥ 0.8` + `execution.outcome === "failed"`
→ Reflection: caution recommended despite high prior confidence (circumstances may have changed)
→ Learning: `observe` rather than `propose` — flag for human review before proposing

This last case is the most important: high-confidence failure should not automatically
produce a learning proposal. It should produce human review.

---

## Part 7 — Existing Signal: `actionDisposition`

`ReflectionContext.actionDisposition` already carries `"execute-with-caution"`.

This is a partial proxy — it tells the reflection that caution was applied, but not why.

As noted in Part 2, `"execute-with-caution"` could arise from:
1. `Judgement.disposition: "caution"` (understanding was weak)
2. `AuthorityEngine` returning `"allow-with-caution"` (authority risk was elevated, regardless of understanding)

The `actionDisposition` is not sufficient to distinguish these. `priorJudgementDisposition`
is the direct signal.

---

## Part 8 — What Survives into Learning (Summary Table)

| Signal | Survives from Execution into Reflection? | Survives from Reflection into Learning? |
|---|---|---|
| `executionOutcome` | ✓ via `ReflectionContext` | ✓ via `LearningContext` |
| `actionDisposition` | ✓ via `ReflectionContext` | ✓ via `LearningContext` |
| `understandingContextSources` | ✓ Milestone 047 | ✓ Milestone 047 |
| `priorJudgementDisposition` | ✗ not carried | ✗ not carried |
| `priorUnderstandingConfidence` | ✗ not carried | ✗ not carried |
| `priorUnderstandingCompleteness` | ✗ not carried | ✗ not carried |

---

## Part 9 — The Smallest Missing Connection

Two additive optional fields on `ReflectionContext` — the same pattern as Milestone 047.

**On `BuildReflectionInput`:**
```typescript
priorJudgementDisposition?: JudgementDisposition;
priorUnderstandingConfidence?: number;
```

**On `ReflectionContext`:**
```typescript
priorJudgementDisposition?: JudgementDisposition;
priorUnderstandingConfidence?: number;
```

**On `LearningContext`** (carried from Reflection):
```typescript
priorJudgementDisposition?: JudgementDisposition;
priorUnderstandingConfidence?: number;
```

With these fields, `ReflectionEngine` and `LearningEngine` can detect Case D (high-confidence
failure → observe, not propose) and distinguish Case B from Case C in the proposal text.

---

## Summary

### What currently works

`ReflectionEngine` correctly classifies outcomes based on execution results.
`LearningEngine` correctly produces proposals from `"adjust"` reflections.
The safety net (escalate on critical findings) works.

### What is missing

`ReflectionEngine` cannot distinguish between four types of failure because it has no
reference to the understanding quality that preceded the action.

An `outcome: "failed"` always produces `disposition: "adjust"`.
The learning proposal that follows is generic, regardless of whether the failure was:
- Case B: reasonable judgement, unexpected outcome
- Case C: weak understanding caused the failure
- Case D: correct decision, changed circumstances

### The smallest missing connection

Two optional fields — `priorJudgementDisposition` and `priorUnderstandingConfidence` —
carried from caller through `BuildReflectionInput` → `ReflectionContext` → `LearningContext`.

The same pattern as Milestone 047's `understandingContextSources`.

Zero engine logic changes for the carrier step.

`LearningEngine` gains one detection path: high-confidence failure (`priorUnderstandingConfidence ≥ 0.75` + `priorJudgementDisposition === "proceed"` + `outcome: "failed"`) → `"observe"` rather than `"propose"`.

The tree can examine the fruit it produces — and begin to ask why some fruit did not form.
