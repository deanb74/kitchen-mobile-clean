# MILESTONE_049_CANDIDATE — Authority Context Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- MILESTONE_049_REPOSITORY_ANALYSIS.md — audit complete ✓
- MILESTONE_048_CANDIDATE_UNDERSTANDING_TRUSTWORTHINESS_BOUNDARY.md ✓
- PD-010 — Authority Requires Context ✓

**Constraint:** No implementation. Boundary definition only.

---

## The Question

> How does Helping Hand ensure that authority decisions are informed by the judgement
> that created the proposed action?

---

## What the Audit Confirmed

`ActionEngine.mergeConstraints()` already produces correct outcomes. A cautious judgement
cannot be overridden by a permissive authority decision at the action level — the merge
always takes the most restrictive disposition.

The structural safety net works.

The gap is not in the outcome. It is in the explanation.

---

## The Gap

`AuthorityContext.riskLevel` is caller-supplied. There is no governed translation from
`Judgement.disposition` to a minimum appropriate risk level.

A caller can construct:
```typescript
AuthorityContext { riskLevel: "low" }
```

...on the basis of a judgement that identified caution, without the authority system
knowing that the risk level understates the quality of the underlying understanding.

The `AuthorityAssessment.reason` that results explains its decision in terms of
`riskLevel` and `authorityProfile`. It cannot explain why that risk level was
appropriate to the understanding that preceded it.

An authority decision without this explanation is a decision without rings.

---

## How Judgement Should Inform Authority

Judgement produces a `disposition` that encodes the DC's trustworthiness verdict
on its own understanding:

| `Judgement.disposition` | What it means | Minimum risk level |
|---|---|---|
| `"proceed"` | Understanding is sufficient and complete | `"low"` |
| `"caution"` | Understanding is partial, uncertain, or from restricted context | `"medium"` |
| `"human-required"` | High-risk signals require human involvement | `"high"` |
| `"insufficient"` | Understanding is too weak to act from | `"critical"` |

This mapping is deterministic. It does not require new logic. It translates an existing
signal into the vocabulary that `AuthorityEngine` already uses.

**The governing rule:**

> The authority risk level must not be lower than the minimum implied by
> the judgement disposition.

A DC whose understanding produced `disposition: "caution"` is not operating at
`riskLevel: "low"` — regardless of what the action itself looks like from the outside.
The risk is in the basis for the action, not only in the action.

---

## How Risk Should Be Derived from Understanding

The three Understanding signals that Milestone 048 will wire into JudgementEngine
each have natural authority implications:

**`confidence < 0.6`** → judgement returns `"caution"` → minimum risk: `"medium"`

**`completeness === "partial"`** → judgement returns `"caution"` (Milestone 048) → minimum risk: `"medium"`

**`contextSources` contains `"relationship"`** → judgement returns `"caution"` (Milestone 048) → minimum risk: `"medium"`

**`hasHighRiskUncertainty`** → judgement returns `"human-required"` → minimum risk: `"high"`

**`confidence < 0.25`** → judgement returns `"insufficient"` → minimum risk: `"critical"`

None of these require new signals. They are already encoded in `Judgement.disposition`.
The only missing step is the translation.

---

## What Authority Decisions Must Be Able to Explain

An `AuthorityAssessment` must be able to answer two questions:

**Question 1:** "Was this action permitted?"
Currently answered — `decision: "allow" | "allow-with-caution" | "require-human" | "deny"`

**Question 2:** "Was the risk level appropriate to the quality of understanding that preceded this action?"
Currently not answerable. The `reason` string references `riskLevel` and `authorityProfile`
but has no reference to the judgement that informed the risk level choice.

The `AuthorityAssessment.reason` should be capable of stating:

> "Action X is assessed at medium risk, consistent with judgement disposition 'caution',
> which was derived from partial understanding of the current situation."

This requires:
1. The authority assessment to know the `Judgement.disposition` that informed the `riskLevel`
2. The `reason` to reference it

---

## What Information Must Survive into the Authority Record

The `AuthorityAssessment` currently carries:
```typescript
{
  context: AuthorityContext;       // includes riskLevel — but not its derivation
  decision: AuthorityDecision;
  level: AuthorityLevel;
  authorityScore: number;
  reason: string;                  // references riskLevel and profile — not judgement
  boundaries: AuthorityBoundary[];
  requiresHuman: boolean;
}
```

What must additionally survive:

| Field | How | Why |
|---|---|---|
| The `Judgement.disposition` that informed risk | Via `judgementToMinimumRiskLevel()` call site | Authority decision can explain its risk basis |
| The minimum risk floor derived from judgement | Via `judgementToMinimumRiskLevel()` return value | Caller cannot silently understate risk |

These do not require new fields on `AuthorityAssessment`. They require that:
1. A governed translation function exists and is used
2. The `AuthorityContext.riskLevel` passed to `AuthorityEngine` reflects this floor

---

## The Smallest Implementation Boundary

### One file, one function, one test suite

**File:** `lib/authority/authorityFromJudgement.ts`

**Function:**
```typescript
function judgementToMinimumRiskLevel(
  judgement: Judgement,
): NonNullable<AuthorityContext["riskLevel"]>
```

**Mapping:**
```
"proceed"        → "low"
"caution"        → "medium"
"human-required" → "high"
"insufficient"   → "critical"
```

This is the governing translation. It is deterministic, pure, and testable.

**Helper (same file):**
```typescript
function applyRiskFloor(
  callerRiskLevel: NonNullable<AuthorityContext["riskLevel"]> | undefined,
  judgement: Judgement,
): NonNullable<AuthorityContext["riskLevel"]>
```

Takes the higher severity of the caller-supplied level and the judgement-derived minimum.
The caller uses this when constructing `AuthorityContext.riskLevel`.

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — `disposition: "proceed"` → minimum `"low"` | Proceed does not inflate risk |
| PC2 — `disposition: "caution"` → minimum `"medium"` | Caution is never understated as low |
| PC3 — `disposition: "human-required"` → minimum `"high"` | Human-required is never assessed as medium or low |
| PC4 — `disposition: "insufficient"` → minimum `"critical"` | Insufficient understanding produces critical authority risk |
| PC5 — `applyRiskFloor()` takes the higher severity | Caller cannot supply lower than judgement implies |
| PC6 — `applyRiskFloor("critical", proceed-judgement)` → `"critical"` | Caller can escalate beyond judgement minimum |
| PC7 — existing `AuthorityEngine` tests unchanged | No engine changes required |

---

## What Must Not Be Modified

| Component | Reason |
|---|---|
| `AuthorityEngine` | No change — it continues to use `AuthorityContext.riskLevel` as supplied |
| `JudgementEngine` | No change — this comes after Milestone 048 in the sequence |
| `ActionEngine` | No change — merge logic is already correct |
| `AuthorityContext` type | No change — `riskLevel` field is already typed correctly |
| `AuthorityAssessment` type | No change — the record does not need new fields for this milestone |

---

## The Position in the Sequence

```
Milestone 043 — Knowledge enters safely
Milestone 044 — Knowledge improves future understanding
Milestone 045 — The DC can listen
Milestone 046 — The DC can remember people respectfully
Milestone 047 — The DC can remember why it knows something
Milestone 048 — The DC's understanding is self-aware
Milestone 049 — The DC's authority decision explains itself
```

Milestone 048 wires `completeness` and `contextSources` into Judgement.
Milestone 049 wires `Judgement.disposition` into the authority risk floor.

After both milestones, the chain carries meaning all the way from formation inputs
through to the authority decision record:

```
Understanding.completeness: "partial"
    ↓ Milestone 048
Judgement.disposition: "caution"
    ↓ Milestone 049
AuthorityContext.riskLevel: "medium" (minimum)
    ↓
AuthorityAssessment.decision: "allow-with-caution"
    ↓
Action.disposition: "execute-with-caution"
```

Every step can explain the one before it.

That is a governed decision chain.

The tree has rings.
