# MILESTONE_050_CANDIDATE — Reflection Learning Improvement Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- MILESTONE_050_REPOSITORY_ANALYSIS.md — audit complete ✓
- PD-011 — Learning Requires Causation ✓
- Milestone 047 — Source Authority (carrier pattern proven) ✓
- Milestone 048 — Understanding Trustworthiness ✓
- Milestone 049 — Authority Context Boundary ✓

**Constraint:** No implementation. Boundary definition only.

---

## The Question

> Can the DC distinguish between different reasons for poor outcomes,
> and learn from the consequence of acting — rather than just from the consequence itself?

---

## The Four Cases This Milestone Must Enable

| Case | Prior understanding | Outcome | Correct learning response |
|---|---|---|---|
| A | Confident + sufficient | Succeeded | Reinforce |
| B | Confident + sufficient | Failed | Propose — knowledge or process gap |
| C | Cautious or partial | Failed | Propose — formation quality gap |
| D | Confident + sufficient | Failed (high confidence) | Observe — require human review |

Case D is the most important new detection. A high-confidence failure is not necessarily
a signal to propose change. It may be a signal that the situation was exceptional.
Proposing learning from exceptional situations produces over-fitted knowledge.

---

## The Three Fields Required

Per PD-011 and the repository audit, three optional fields must survive from the
formation/judgement chain through to reflection and learning:

### Field 1 — `priorJudgementDisposition`

**Source:** `Judgement.disposition`
**Type:** `JudgementDisposition` — `"proceed" | "caution" | "human-required" | "insufficient"`
**Purpose:** Tells reflection whether the DC was confident or cautious when it acted.

```
"proceed"        → DC was confident — failure is Case B or D
"caution"        → DC was already uncertain — failure is Case C (expected)
"human-required" → DC required human involvement — failure should escalate, not propose
"insufficient"   → DC should not have acted — failure is a governance concern
```

### Field 2 — `priorUnderstandingConfidence`

**Source:** `Understanding.confidence`
**Type:** `number` (0–1)
**Purpose:** The numerical confidence in the synthesis before action.

Case D detection requires this: `confidence ≥ 0.75` + `outcome: "failed"` →
high-confidence failure → `LearningDisposition: "observe"` rather than `"propose"`.

### Field 3 — `priorUnderstandingCompleteness`

**Source:** `Understanding.completeness`
**Type:** `UnderstandingCompleteness` — `"sufficient" | "partial" | "insufficient"`
**Purpose:** Formation's own verdict on whether its inputs were adequate.

**This is different from confidence.**

A DC may be `confidence: 0.85, completeness: "partial"` — highly confident in what it
knew, while missing information it needed.

When `completeness: "partial"` + `outcome: "failed"`:
- The cause may be formation-level (Case C), not knowledge-level (Case B)
- The governance question is "were the observations adequate?" not "was the knowledge correct?"

This distinction cannot be recovered from `priorUnderstandingConfidence` alone.

---

## The Carrier Pattern

All three fields follow the pattern established by `understandingContextSources` in Milestone 047:

```
Caller supplies to BuildReflectionInput
    ↓ ReflectionEngine.copyContext() carries forward
ReflectionContext (three new optional fields)
    ↓ LearningEngine.copyContext() carries forward
LearningContext (three new optional fields)
```

No engine logic changes for the carrier step alone.
The detection logic is what changes behaviour.

---

## The Detection Logic

### High-confidence failure → `"observe"` not `"propose"` (Case D)

In `LearningEngine.selectDisposition()`, before the existing `canProposeFromAdjust()` check:

```typescript
if (
  reflection.context.priorJudgementDisposition === "proceed" &&
  (reflection.context.priorUnderstandingConfidence ?? 0) >= 0.75 &&
  reflection.context.executionOutcome === "failed"
) {
  return "observe";  // high-confidence failure — require human review first
}
```

This is the most important new detection. It prevents the system from producing
learning proposals from outcomes that may be exceptional rather than systematic.

### Formation-gap indicator on the proposal (Case C)

When `priorJudgementDisposition === "caution"` or `priorUnderstandingCompleteness === "partial"`,
`LearningProposal.whatShouldChange` should indicate the formation layer as the improvement
target rather than the knowledge layer.

This is carried in `LearningProposal.causationCategory` (new field):

```typescript
type ProposalCausationCategory =
  | "knowledge-gap"    // adequate understanding, missing professional knowledge
  | "formation-gap"    // incomplete inputs caused the failure
  | "situational"      // circumstances changed — human review required
  | "unknown";         // insufficient evidence to determine
```

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — carrier: `priorJudgementDisposition` survives `BuildReflectionInput` → `ReflectionContext` | The disposition ring travels |
| PC2 — carrier: `priorUnderstandingConfidence` survives | The confidence ring travels |
| PC3 — carrier: `priorUnderstandingCompleteness` survives | The completeness ring travels |
| PC4 — carrier: all three survive `ReflectionContext` → `LearningContext` | Rings survive the full chain |
| PC5 — Case D: confidence ≥ 0.75 + proceed + failed → `LearningDisposition: "observe"` | High-confidence failure does not auto-propose |
| PC6 — Case C: caution + partial + failed → `causationCategory: "formation-gap"` | Incomplete formation is distinguished from knowledge gap |
| PC7 — Case B: proceed + sufficient + failed → `causationCategory: "knowledge-gap"` | Reasonable judgement failure produces knowledge-level proposal |
| PC8 — Case A: proceed + succeeded → `LearningDisposition: "reinforce"` (unchanged) | Existing behaviour preserved |
| PC9 — All 254 existing tests pass | No regressions |

---

## What Must Not Be Modified

| Component | Reason |
|---|---|
| `ReflectionEngine.selectDisposition()` logic | No change — disposition from outcome is unchanged |
| `LearningEngine.canProposeFromAdjust()` | No change — existing threshold logic preserved |
| `KnowledgeGraph` | No change |
| `evaluateGuard()` | No change |
| `applyApprovedChange()` | No change |
| `PersonContextStore` | No change |
| `AuthorityEngine` | No change |
| `JudgementEngine` | No change |

---

## Files to Create or Modify

| File | Change |
|---|---|
| `lib/reflection/Reflection.ts` | Add three optional fields to `ReflectionContext` |
| `lib/reflection/ReflectionEngine.ts` | Add three fields to `BuildReflectionInput`; populate in `copyContext()` |
| `lib/learning/Learning.ts` | Add three fields to `LearningContext`; add `ProposalCausationCategory`; add `causationCategory?` to `LearningProposal` |
| `lib/learning/LearningEngine.ts` | Add Case D detection; set `causationCategory` on proposals |
| Tests | Prove all nine proof conditions |

---

## What This Milestone Proves

After Milestone 050:

```
Confidence: 0.85, Completeness: "partial"
Judgement: "proceed"
Outcome: "failed"
→ Reflection carries priorJudgementDisposition, priorUnderstandingConfidence, priorUnderstandingCompleteness
→ Learning: disposition "observe" (high confidence + proceed + failed → require human review)
→ LearningProposal.causationCategory: "situational" or pending human assessment
```

The DC does not immediately propose "fix the knowledge."

It says: "I was confident and I was wrong. I need a human to help me understand why before I propose a change."

That is not humility as a limitation.

That is wisdom as a capability.

---

## The Principle Proven

> Without causation, a DC accumulates responses to consequences.
> With causation, a DC develops understanding of its own growth.

The architecture is now moving from memory of facts to memory of reasons.
