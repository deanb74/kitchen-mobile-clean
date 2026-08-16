# MILESTONE_048_CANDIDATE — Understanding Trustworthiness Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- MILESTONE_048_REPOSITORY_ANALYSIS.md — audit complete ✓
- PD-009 — Context Has Authority ✓
- Milestone 047 — Source Authority proven ✓

**Constraint:** No code changes. Boundary definition only.

---

## The Question

> What makes understanding trustworthy enough to act upon?

This is not the same question as "what makes understanding correct?"

Understanding can be correct but incomplete.
Understanding can be complete but derived from the wrong source.
Understanding can be high-confidence but missing its provenance.

The trustworthiness question is not a single number.

It is a combination of three things:
1. How confident is the synthesis? (`confidence`)
2. Were the inputs adequate? (`completeness`)
3. Is the understanding grounded in appropriate authority? (`contextSources`)

---

## What Makes Understanding Trustworthy Enough to Act Upon

### The current mechanism

`JudgementEngine.determineDisposition()` currently uses two signals:

```
understanding.confidence < 0.25     → "insufficient"
hasHighRiskUncertainty(uncertainty) → "human-required"
confidence < 0.6 OR uncertainty > 0 → "caution"
else                                 → "proceed"
```

This is sound. It correctly handles:
- Low confidence → caution or insufficiency
- High-risk terms in uncertainty → human required

### What it misses

**Signal 1 — `understanding.completeness`**

Formation produces a `completeness` verdict using its own knowledge of whether the inputs were adequate:

```
"sufficient"   — all translations healthy and situational context present
"partial"      — some translations or context present but not all
"insufficient" — no translations (confidence will also be 0 in this case)
```

`JudgementEngine` does not read this.

A DC can proceed with action on an understanding that formation itself assessed as `"partial"`.

Formation knew. Judgement did not listen.

**Signal 2 — `understanding.contextSources`**

Milestone 047 proved that context source authority is preserved from adapter through to `Understanding.contextSources[]`.

`JudgementEngine` does not read this.

A DC can proceed with action based on relationship context — a person's consent-gated, session-scoped preference — treating it with the same authority as professional knowledge.

The rings exist. Judgement does not read them.

---

## The Relationship Between Confidence and Completeness

These measure different things. Neither alone is sufficient.

**Confidence** answers: "How certain is the synthesis, given the inputs received?"

A DC might have `confidence: 0.75` from two strong observations — but if the situational context was missing (`completeness: "partial"`), the synthesis was formed from a narrower picture than the situation required.

**Completeness** answers: "Were the inputs themselves adequate for this situation?"

A DC could have `completeness: "partial"` and `confidence: 0.75` — and currently proceed. The confidence looks healthy. The underlying adequacy was not.

**The governing relationship:**

```
completeness: "sufficient"    + confidence ≥ 0.6  → proceed is permitted
completeness: "partial"       + any confidence    → caution at minimum
completeness: "insufficient"  + any confidence    → already caught (confidence → 0)
```

`"partial"` means formation made the best synthesis it could from inadequate inputs.
Making decisions based on an acknowledged partial picture requires caution — not permission.

---

## How Context Authority Affects Judgement

Milestone 047 established three context authorities:

| Authority | Source | Persistence | Transferability |
|---|---|---|---|
| Professional | `KnowledgeGraph` | Permanent if true | Inherits by profession |
| Venue | `ContextStore` / `VenueKnowledgeProfile` | Operational | Venue-scoped |
| Relational | `PersonContextStore` | Session-scoped by default | Person-scoped, consent-gated |

When `contextSources` contains `"relationship"`, the DC's understanding was partially formed from relational authority.

Relational authority is legitimate context for understanding.

It is not a sufficient basis for action without explicit caution.

The difference:

> "Sarah told me she prefers written instructions, so I will **understand** her communication style." ← appropriate
>
> "Sarah told me she prefers written instructions, so I will **advise the whole team** to change their approach." ← requires caution and de-identification

Acting on relationship context as if it were professional authority is the action equivalent of the learning contamination that Milestone 047 guards against.

Judgement must acknowledge the origin of the understanding it is acting on.

---

## What Information Judgement Must Never Ignore

**1. `understanding.completeness`**

Formation's own assessment of input adequacy is not optional information for judgement.

If formation acknowledged the inputs were partial, judgement must acknowledge it too.

A branch does not grow because confidence is adequate.

It grows because the roots can support it.

---

**2. `understanding.contextSources` when containing `"relationship"`**

Acting on person-scoped context as if it were professional authority violates PD-007 and PD-008 at the action boundary — not only at the learning boundary.

The gate that Milestone 047 placed before governance must have an equivalent gate before action.

---

**3. `understanding.evidenceChain` — future concern, not this milestone**

An empty `evidenceChain` when translations exist would indicate formation bypassed source tracking. This is a structural integrity check — important but a future milestone concern. It is documented here for completeness only.

---

## The Smallest Implementation Boundary

Two additive conditions in one method. One test file.

### Change — `JudgementEngine.determineDisposition()`

**File:** `lib/judgement/JudgementEngine.ts`

```typescript
private determineDisposition(understanding: Understanding): JudgementDisposition {
  if (understanding.confidence < 0.25) return "insufficient";

  if (this.hasHighRiskUncertainty(understanding)) return "human-required";

  // Formation acknowledged partial inputs — caution is required.
  // A DC must not proceed based on understanding that formation itself assessed as partial.
  if (understanding.completeness === "partial") return "caution";         // ADD

  // Relationship context was used — action must not treat it as professional authority.
  if (understanding.contextSources?.includes("relationship")) return "caution";  // ADD

  if (
    understanding.confidence < 0.6 ||
    understanding.uncertainty.length > 0
  ) return "caution";

  return "proceed";
}
```

Both additions:
- Are additive — no existing logic path changes
- Use fields already present on `Understanding`
- Do not change the method signature
- Do not change the return type

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — `completeness: "partial"` → at least `"caution"` | Formation's partial verdict is respected |
| PC2 — `completeness: "sufficient"` with `confidence ≥ 0.6` → `"proceed"` still possible | Existing proceed path is not broken |
| PC3 — `contextSources: ["relationship"]` → at least `"caution"` | Relationship authority does not silently become professional authority at action |
| PC4 — `contextSources: ["venue-context"]` alone → unaffected | Venue context does not trigger caution |
| PC5 — `contextSources: ["knowledge-graph"]` alone → unaffected | Professional knowledge does not trigger caution |
| PC6 — All existing `JudgementEngine` tests still pass | No existing behaviour broken |

---

## What Must Not Be Modified

| Component | Reason |
|---|---|
| `form()` | No change — `completeness` and `contextSources` are already produced correctly |
| `Understanding` type | No change — fields already added in Milestones 013 and 047 |
| `AuthorityEngine` | No change — authority boundary is a separate concern |
| `ActionEngine` | No change — action merging logic is unchanged |
| Any governance or learning component | No change |
| `KnowledgeGraph` | No change |

---

## The Next Branch

If Judgement now understands the limits of Understanding, the next question is:

> "How does Authority decide whether a Digital Colleague is allowed to act on that judgement?"

Currently `AuthorityEngine` receives `riskLevel` from the caller. The caller decides.

The caller's decision is not informed by the judgement it just received.

A `Judgement` with `disposition: "caution"` and a caller-supplied `riskLevel: "low"` produces `AuthorityAssessment { decision: "allow" }`. Authority never saw the caution.

The next boundary is the connection between Judgement and Authority:

> Judgement's disposition should inform the authority risk assessment,
> not be overridden by a caller-supplied risk level that ignores it.

That is Milestone 049.

---

## Summary

Understanding is trustworthy enough to act upon when:

1. **Confidence** is sufficient — the synthesis is not guesswork
2. **Completeness** is sufficient — formation had adequate inputs to synthesise from
3. **Context authority** is appropriate — the DC is not acting on person-scoped context as if it were professional guidance

Currently, only condition 1 is explicitly enforced by `JudgementEngine`.

Condition 2 is partially covered by the uncertainty mechanism.

Condition 3 is not enforced at all before action.

Two additive conditions close both remaining gaps.

The formation engine already knew.

The judgement engine must now listen.
