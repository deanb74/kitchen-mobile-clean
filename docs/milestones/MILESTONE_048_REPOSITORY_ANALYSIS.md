# MILESTONE_048_REPOSITORY_ANALYSIS — Understanding Trustworthiness

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 048
**The Question:**
> How does Helping Hand decide what understanding is trustworthy enough to act upon?

---

## The Chain Under Audit

```
Understanding
    ↓ JudgementEngine.judge()
Judgement { disposition, confidence, selected.kind }
    ↓ AuthorityEngine.assess()
AuthorityAssessment { decision, authorityScore }
    ↓ ActionEngine.build()
Action { disposition, state, kind }
```

The audit traces what signals reach each stage, what is lost, and where the smallest gap exists.

---

## Part 1 — Where Confidence Currently Exists

| Stage | Confidence type | How it is derived |
|---|---|---|
| `Translation.confidence` | per-observation (0–1) | Observation confidence carried through |
| `Understanding.confidence` | formation confidence (0–1) | Average of translation confidences × context multiplier × knowledge availability |
| `Understanding.completeness` | `"sufficient" \| "partial" \| "insufficient"` | Translation health + situational context coverage |
| `Judgement.confidence` | judgement confidence (0–1) | `understanding.confidence × disposition weight × response weight` |
| `AuthorityAssessment.authorityScore` | authority score (0–1) | Profile level vs risk level |

**None of these values communicate to each other** — each stage computes independently.
`JudgementEngine` reads `understanding.confidence` but not `understanding.completeness`.
`AuthorityEngine` has no awareness of `Understanding` at all.

---

## Part 2 — Where Uncertainty Is Carried

| Stage | Uncertainty field | Content |
|---|---|---|
| `Understanding.uncertainty[]` | `string[]` — named gaps | Derived from missing context dimensions, low-confidence translations |
| `Judgement.uncertainty[]` | `string[]` — copied from Understanding | Identical to `understanding.uncertainty` |
| `Understanding.contextSources[]` | `string[]` — source labels (Milestone 047) | `"venue-context"`, `"venue-profile"`, `"relationship"` |

**What is not carried:**
- `Understanding.completeness` reaches `JudgementEngine` only if the caller explicitly passes it — it is on the `Understanding` object but `JudgementEngine.determineDisposition()` does not read it
- `Understanding.contextSources` exists but `JudgementEngine` does not read it
- `Understanding.evidenceChain` exists but `JudgementEngine` does not read it

---

## Part 3 — Where Judgement Decides Action

`JudgementEngine.determineDisposition()`:

```typescript
if (understanding.confidence < 0.25) return "insufficient";
if (hasHighRiskUncertainty(understanding)) return "human-required";
if (understanding.confidence < 0.6 || understanding.uncertainty.length > 0) return "caution";
return "proceed";
```

**What this reads:**
- `understanding.confidence` ✓
- `understanding.uncertainty[]` — scanned for 9 high-risk terms ✓

**What this does NOT read:**
- `understanding.completeness` — not in `determineDisposition()`
- `understanding.contextSources` — not in `determineDisposition()`
- `understanding.evidenceChain` — not in `determineDisposition()`

**Disposition drives response selection via `RESPONSE_PRIORITY`:**
- `"proceed"` → first available from: `["advise", "speak", "listen", "ask", ...]`
- `"caution"` → first available from: `["ask", "seek-consent", "admit-uncertainty", ...]`
- `"human-required"` → first available from: `["escalate", "seek-consent", ...]`
- `"insufficient"` → first available from: `["ask", "admit-uncertainty", "wait", ...]`

---

## Part 4 — Where Authority Is Checked

`AuthorityEngine.resolveDecision()`:

```typescript
if (level === "none") return "deny";
if (riskLevel === "critical") return "require-human";
if (riskWeight > levelWeight + 1) return "require-human";
if (riskWeight > levelWeight) return "allow-with-caution";
return "allow";
```

**What this reads:**
- `AuthorityContext.authorityProfile` → level (`"observer" | "contributor" | "responsible" | "accountable"`)
- `AuthorityContext.riskLevel` → caller-supplied (`"low" | "medium" | "high" | "critical"`)

**Critical finding: `riskLevel` is supplied by the caller, not derived from `Understanding`.**

The caller decides whether an action is `riskLevel: "critical"`. Nothing in the pipeline automatically derives risk level from `Understanding.confidence`, `Understanding.uncertainty`, `Understanding.completeness`, or `Understanding.contextSources`.

If a caller supplies `riskLevel: "low"` for an action based on `completeness: "partial"` understanding, `AuthorityEngine` has no way to challenge it.

---

## Part 5 — Where Provenance Is Considered

| Stage | Reads provenance? | What |
|---|---|---|
| `JudgementEngine` | ✗ | Does not read `contextSources`, `evidenceChain`, or `completeness` |
| `AuthorityEngine` | ✗ | Has no awareness of `Understanding` |
| `ActionEngine` | ✗ | Merges Judgement + Authority; no provenance input |
| `ExecutionEngine` | ✗ | Records outcome; no provenance input |
| `ReflectionEngine` | ✓ (partial) | Carries `understandingContextSources` if caller supplies it (Milestone 047) |
| `LearningEngine` | ✓ (partial) | Sets `informedByPersonContext` from `understandingContextSources` |
| `KnowledgeGovernanceEngine` | ✓ | Enforces reviewer requirement when `requiresHuman` or `informedByPersonContext` |

**The gap:** Provenance is preserved through the learning chain (Milestones 043–047) but is entirely absent from the action chain (Judgement → Authority → Action).

---

## Part 6 — What Information Is Lost Before Action

### Lost 1: `Understanding.completeness`

`Understanding.completeness` is assessed by `form()` and available on every `Understanding` object. `JudgementEngine.determineDisposition()` does not read it.

**The risk:** An understanding with `completeness: "partial"` and `confidence: 0.65` produces `disposition: "proceed"` if no high-risk uncertainty terms are present. The DC proceeds based on formation that itself acknowledged it was only partially informed.

**Partial mitigation:** When `completeness` is `"partial"`, the uncertainty mechanism often adds items to `Understanding.uncertainty[]` (missing urgency, risk, etc.), which triggers `"caution"`. But this is indirect — there is no explicit path from `completeness: "partial"` to `disposition: "caution"`.

**Edge case:** A formation with `completeness: "partial"` but no uncertainty strings and `confidence: 0.65`:
```
understanding.confidence = 0.65  → NOT < 0.25, NOT < 0.6
uncertainty = []                  → length === 0
completeness = "partial"          → NOT READ
→ disposition: "proceed"
```
The DC proceeds. Formation knew the inputs were partial. Judgement did not.

---

### Lost 2: `Understanding.contextSources` — relationship context not flagged at action time

`Understanding.contextSources` (Milestone 047) carries the source labels through to `LearningEngine`. But `JudgementEngine` does not read it.

**The risk:** An understanding informed by relationship context (`contextSources: ["relationship"]`) produces the same `disposition` as one informed by professional knowledge. The DC takes an action based on a person's consent-gated preference — using it as if it were professional guidance.

This is different from the learning contamination risk (which Milestone 047 addressed). This is the action contamination risk: the DC acts on relationship context without flagging that the action's basis is person-scoped.

---

### Lost 3: `AuthorityContext.riskLevel` is caller-derived, not Understanding-derived

The caller supplies `riskLevel` to `AuthorityEngine`. There is no mechanism for Judgement's output to inform the authority risk assessment.

**The risk:** Judgement selects `"caution"` because confidence is low. Authority is given `riskLevel: "low"`. Authority returns `"allow"`. ActionEngine merges these — `"execute-with-caution"` — but the underlying concern (low confidence) is not surfaced as a risk signal in the authority assessment.

---

## Part 7 — The Smallest Missing Connection

### The gap that matters most

`JudgementEngine.determineDisposition()` reads confidence and uncertainty strings. It does not read `completeness` or `contextSources`.

Two additive inputs to `determineDisposition()` would close both gaps:

**Addition 1 — `completeness: "partial"` → enforce at least `"caution"`**

```typescript
private determineDisposition(understanding: Understanding): JudgementDisposition {
  if (understanding.confidence < 0.25) return "insufficient";
  if (this.hasHighRiskUncertainty(understanding)) return "human-required";
  if (understanding.completeness === "insufficient") return "insufficient";   // ADD
  if (
    understanding.confidence < 0.6 ||
    understanding.uncertainty.length > 0 ||
    understanding.completeness === "partial"            // ADD
  ) return "caution";
  return "proceed";
}
```

This closes the edge case where formation acknowledged partial inputs but judgement proceeded anyway.

**Addition 2 — `contextSources` containing `"relationship"` → enforce at least `"caution"`**

```typescript
if (understanding.contextSources?.includes("relationship")) return "caution";   // ADD
```

This closes the action contamination risk — acting on person-scoped context without flagging provenance at the action boundary.

Both are two-line additions to one method. They do not change the method's purpose. They do not change any existing test outcome. They make the existing logic more honest about what it knows.

---

## Part 8 — Existing Tests and Coverage

| What is tested | File | Status |
|---|---|---|
| `disposition: "insufficient"` when `confidence < 0.25` | `lib/os/__tests__/judgementEngine.test.ts` | Covered |
| `disposition: "human-required"` when high-risk uncertainty | `lib/os/__tests__/judgementEngine.test.ts` | Covered |
| `disposition: "caution"` when `confidence < 0.6` | `lib/os/__tests__/judgementEngine.test.ts` | Covered |
| `disposition: "proceed"` when `confidence ≥ 0.6` and no uncertainty | `lib/os/__tests__/judgementEngine.test.ts` | Covered |
| `completeness: "partial"` → `disposition` | Not tested | **Gap** |
| `contextSources: ["relationship"]` → `disposition` | Not tested | **Gap** |
| `riskLevel` derivation from Understanding | Not tested | **Gap** |

---

## Summary

### What currently decides trustworthiness

`JudgementEngine` makes the trustworthiness decision using two signals:
1. `understanding.confidence` (numerical threshold)
2. `understanding.uncertainty[]` (text scan for risk terms)

### What is available but unused

1. `understanding.completeness` — formation's own assessment of input adequacy
2. `understanding.contextSources` — the origin of the institutional context
3. `understanding.evidenceChain` — provenance of the observation chain

### The smallest missing connection

Two additive conditions in `JudgementEngine.determineDisposition()`:

1. `completeness === "partial"` → at minimum `"caution"`
2. `contextSources?.includes("relationship")` → at minimum `"caution"`

Neither requires a new concept. Both use fields already present on `Understanding`. Both are additive — no existing test breaks.

### What this milestone proves

That the DC's trustworthiness decision uses the full picture of what it knows, not just the confidence number.

A DC should not proceed with action based on partial understanding when formation itself said the inputs were partial.

A DC should not act on relationship context as if it were professional guidance.

The formation engine already knew. The judgement engine did not yet listen.
