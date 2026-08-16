# MILESTONE_049_REPOSITORY_ANALYSIS — Judgement Authority Boundary

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 049
**Governing principle:** PD-010 — Authority Requires Context
**The Question:**
> How does Helping Hand ensure that authority decisions are informed by the judgement
> that created the proposed action?

---

## Six Direct Answers

### 1. Where does Judgement currently become Authority?

`Judgement` and `Authority` are produced by separate engines called sequentially by the caller.
There is no automatic handoff — the caller constructs `AuthorityContext` independently after
receiving `Judgement`. `ActionEngine.build({ judgement, authority })` merges them at the end.

The point where Judgement influences Authority is `ActionEngine.mergeConstraints()` —
but only indirectly, through the `JUDGEMENT_DISPOSITION_TO_ACTION` baseline. `AuthorityEngine`
makes its decision before `ActionEngine` merges. `AuthorityEngine` has never seen the Judgement.

### 2. What information survives from Understanding into Judgement?

| Signal | Survives? |
|---|---|
| `Understanding.confidence` | ✓ — drives `disposition` and `Judgement.confidence` |
| `Understanding.uncertainty[]` | ✓ — copied to `Judgement.uncertainty[]`; scanned for risk terms |
| `Understanding.completeness` | ✓ after Milestone 048 — drives `disposition: "caution"` if `"partial"` |
| `Understanding.contextSources` | ✓ after Milestone 048 — `"relationship"` drives `disposition: "caution"` |
| `Understanding.evidenceChain` | ✗ — not read by JudgementEngine |
| `Understanding.summary` | ✗ — not used in disposition logic |

### 3. What information survives from Judgement into Authority?

| Signal | Survives into AuthorityEngine? |
|---|---|
| `Judgement.disposition` | ✗ — AuthorityEngine never receives it |
| `Judgement.confidence` | ✗ |
| `Judgement.uncertainty[]` | ✗ |
| `Judgement.requiresHuman` | ✗ — reaches `Action.requiresHuman` via ActionEngine union, never via Authority |
| `Judgement.governingPrinciples` | ✗ |

**Nothing from Judgement survives into `AuthorityEngine`.** Authority is assessed entirely
from `AuthorityContext` — which the caller constructs independently.

### 4. Can Authority explain why a risk level was appropriate?

**No.**

`AuthorityAssessment.reason` is constructed from `context.action`, `level`, `decision`, and
`riskLevel`. It references the action and the profile, not the understanding.

A typical reason: `"Action 'advise' is assessed at low risk..."` — it cannot say:
`"...consistent with judgement disposition 'caution', which was derived from partial understanding."`

The authority record is disconnected from the understanding that preceded it. Per PD-010,
this means Authority is currently operating as permission, not as contextual authority.

### 5. Can a caller supply a risk level that conflicts with the quality of understanding?

**Yes — and the outcome depends on which direction the conflict runs.**

`ActionEngine.mergeConstraints()` is the safety net. It takes the more restrictive of
Authority and Judgement baselines. If the caller supplies `riskLevel: "low"` but
`Judgement.disposition` is `"caution"`, the merge produces `"execute-with-caution"` —
the cautious outcome survives even though Authority said `"allow"`.

However, `AuthorityAssessment` still records `decision: "allow"` at `riskLevel: "low"`.
The action outcome was correct; the authority record is wrong. It records a more permissive
assessment than the understanding warranted.

### 6. Where is the smallest missing connection?

A pure function `judgementToMinimumRiskLevel(Judgement)` that translates
`Judgement.disposition` into the minimum appropriate risk level for `AuthorityContext`.

```
"proceed"        → "low"
"caution"        → "medium"
"human-required" → "high"
"insufficient"   → "critical"
```

A companion `applyRiskFloor(callerLevel, judgement)` function ensures the caller cannot
supply a risk level lower than the judgement-derived minimum.

Neither function changes `AuthorityEngine`, `JudgementEngine`, or `ActionEngine`.

---

## The Chain Under Audit

```
Understanding
    ↓ JudgementEngine.judge()
Judgement { disposition, confidence, uncertainty, requiresHuman, ... }
    ↓
    [CALLER constructs AuthorityContext independently]
    ↓
AuthorityContext { actorId, authorityProfile, action, riskLevel? }
    ↓ AuthorityEngine.assess()
AuthorityAssessment { decision, authorityScore, requiresHuman }
    ↓ ActionEngine.build({ judgement, authority })
Action { disposition, state, kind }
```

The gap is between `Judgement` and `AuthorityContext`. The caller constructs them
separately. Nothing obligates the caller to inform the authority risk level from
what judgement concluded about the understanding.

---

## Part 1 — What Judgement Produces

`JudgementEngine.judge()` returns a `Judgement` with:

```typescript
Judgement {
  understanding: Understanding;          // full Understanding — carries confidence, completeness, contextSources
  disposition: JudgementDisposition;     // "proceed" | "caution" | "human-required" | "insufficient"
  selected: JudgementCandidateResponse;  // the chosen response kind
  confidence: number;                    // understanding.confidence × disposition weight × response weight
  uncertainty: string[];                 // copied from understanding.uncertainty
  requiresHuman: boolean;               // true when disposition is "human-required" or "insufficient"
  reason: string;
  governingPrinciples: Concept[];
}
```

The `disposition` encodes the trustworthiness verdict:
- `"proceed"` — understanding is sufficient and complete enough to act
- `"caution"` — understanding is partial, uncertain, or from restricted-authority context
- `"human-required"` — understanding contains high-risk signals requiring human judgment
- `"insufficient"` — understanding is too weak to act from at all

---

## Part 2 — What Authority Currently Receives

`AuthorityEngine.assess()` receives:

```typescript
AuthorityContext {
  actorId: string;
  authorityProfile: "observer" | "contributor" | "responsible" | "accountable";
  action: string;         // what the DC wants to do — caller-supplied string
  subject?: string;       // what the action is about — optional, caller-supplied
  riskLevel?: "low" | "medium" | "high" | "critical";   // defaults to "medium" if absent
}
```

`riskLevel` defaults to `"medium"` when absent:
```typescript
const riskLevel = context.riskLevel ?? "medium";
```

**What Authority does NOT receive:**
- `Judgement.disposition` — Authority does not know what Judgement concluded
- `Judgement.confidence` — Authority does not know the understanding quality
- `Understanding.completeness` — Authority does not know if formation was partial
- `Understanding.contextSources` — Authority does not know the source authority
- `Judgement.requiresHuman` — reaches `Action.requiresHuman` via union, but not via Authority

---

## Part 3 — Where Risk Is Currently Determined

Risk level originates entirely from the caller's `AuthorityContext.riskLevel`.

The caller decides:
- what the `riskLevel` is
- whether it reflects the quality of the understanding
- whether it reflects what Judgement concluded

`AuthorityEngine` does not verify these decisions.

`ActionEngine.mergeConstraints()` takes the most restrictive of Authority's and Judgement's baselines — but it uses `authority.decision` (from `AuthorityEngine`) and `judgement.disposition` (from `JudgementEngine`) independently. The authority decision was made without knowing the judgement disposition.

---

## Part 4 — Can Caller-Provided Risk Override Understanding Limitations?

**Yes. The evidence:**

**Scenario A — Judgement caution, authority allow:**
```
Understanding: confidence=0.5, completeness="partial"
JudgementEngine → disposition: "caution"
Caller → AuthorityContext { riskLevel: "low", authorityProfile: "contributor" }
AuthorityEngine:
  levelWeight = 1 (contributor)
  riskWeight  = 1 (low)
  riskWeight NOT > levelWeight + 1 → not "require-human"
  riskWeight NOT > levelWeight     → not "allow-with-caution"
  → decision: "allow"
ActionEngine.mergeConstraints():
  authority baseline: "execute"      (from "allow")
  judgement baseline: "execute-with-caution" (from "caution")
  max weight: "execute-with-caution" wins
  → Action.disposition: "execute-with-caution"
```

In this case, `ActionEngine` saves it — the caution from Judgement survives because
`mergeConstraints()` takes the most restrictive. The caller's `riskLevel: "low"` did
not override the cautious action outcome.

**However — Scenario B — caller understates risk on "proceed" judgement:**
```
Understanding: confidence=0.65, completeness="sufficient", contextSources=["relationship"]
(Before Milestone 048: disposition → "proceed")
Caller → AuthorityContext { riskLevel: "low" }
AuthorityEngine → decision: "allow"
ActionEngine → disposition: "execute"
Action taken on relationship context as if it were professional authority.
```

After Milestone 048, `contextSources: ["relationship"]` → `disposition: "caution"` →
`ActionEngine` → `"execute-with-caution"`. The merge saves it again.

**Scenario C — The unguarded case that neither Milestone 048 nor ActionEngine covers:**
```
Understanding: confidence=0.65, completeness="sufficient", contextSources=["venue-context"]
JudgementEngine → disposition: "proceed"
Caller → AuthorityContext { riskLevel: "low" }
AuthorityEngine → decision: "allow"
ActionEngine:
  authority: "execute"
  judgement: "execute"
  → Action.disposition: "execute"
```

This is correct — no issue here. The system proceeds.

**The real unguarded case — Scenario D:**
```
Understanding: confidence=0.65, completeness="sufficient", uncertainty=[]
JudgementEngine → disposition: "proceed"
Action is "advise about compliance procedure"
Caller → AuthorityContext { riskLevel: "low", authorityProfile: "observer" }
AuthorityEngine:
  levelWeight = 0 (observer → "none")
  → decision: "deny"
ActionEngine:
  authority: "do-not-execute"
  judgement: "execute"
  "do-not-execute" has higher weight → Action.disposition: "do-not-execute"
```

Also handled correctly.

**Scenario E — The genuine gap:**
```
Understanding: confidence=0.25 (barely above threshold), completeness="partial"
JudgementEngine:
  confidence 0.25 is NOT < 0.25 (boundary case)
  uncertainty=[] (no strings)
  completeness="partial" → (after Milestone 048) → "caution"
Caller → AuthorityContext { riskLevel: "low", authorityProfile: "contributor" }
AuthorityEngine → decision: "allow"
ActionEngine:
  authority: "execute" (from "allow")
  judgement: "execute-with-caution" (from "caution")
  → "execute-with-caution"
```

Again, the merge works. `"execute-with-caution"` is the result.

**Finding:** `ActionEngine.mergeConstraints()` is already the safety net. It takes the most restrictive disposition from either Authority or Judgement. The caller supplying `riskLevel: "low"` does not override `JudgementEngine`'s caution signal — because the caution is preserved independently through `Judgement.disposition`.

---

## Part 5 — Where Uncertainty, Completeness and Context Authority Are Lost

| Signal | In Judgement | Reaches Authority | Used by ActionEngine |
|---|---|---|---|
| `Judgement.disposition` | ✓ | ✗ | ✓ (via `JUDGEMENT_DISPOSITION_TO_ACTION`) |
| `Judgement.confidence` | ✓ | ✗ | ✓ (used in `scoreActionConfidence()`) |
| `Judgement.uncertainty[]` | ✓ | ✗ | ✓ (copied to `Action.uncertainty[]`) |
| `Judgement.requiresHuman` | ✓ | ✗ | ✓ (unioned into `Action.requiresHuman`) |
| `Understanding.completeness` | ✓ (on nested understanding) | ✗ | ✗ — not accessed |
| `Understanding.contextSources` | ✓ (on nested understanding) | ✗ | ✗ — not accessed |
| `AuthorityContext.riskLevel` | ✗ | ✓ | ✗ — already resolved by Authority |
| `AuthorityAssessment.decision` | ✗ | ✓ | ✓ (via `AUTHORITY_DECISION_TO_ACTION`) |

**Finding:** The significant signals are not lost by the time `ActionEngine` produces the `Action`. `JudgementDisposition` and `AuthorityDecision` both contribute to the final `Action.disposition` via independent paths that are merged correctly.

---

## Part 6 — The Actual Architectural Gap

The gap is not that Judgement cannot override a lenient Authority decision — `ActionEngine` already handles that.

The gap is that **`AuthorityEngine` makes its decision in isolation from `Judgement`**.

This has two consequences:

### Consequence 1 — `riskLevel` has no governed derivation from Understanding

`AuthorityContext.riskLevel` is caller-supplied. There is no governed function that derives the appropriate minimum risk level from `Judgement.disposition`. Different callers may supply different `riskLevel` values for the same underlying judgement quality.

This means the authority record (`AuthorityAssessment`) cannot explain its risk assessment in terms of what the DC understood. The `reason` string says `"Action X is assessed at low risk"` — but it cannot say `"Action X was based on judgement at disposition caution, which implies medium risk at minimum"`.

### Consequence 2 — The `AuthorityAssessment.reason` is disconnected from Understanding

`AuthorityAssessment.reason` is built from `context.action`, `level`, `decision`, and `riskLevel`. It does not reference `Judgement.disposition` or `Understanding.confidence`.

The audit trail that an authority decision produces (`reason`, `decision`, `authorityScore`) is independent of the understanding quality that preceded it.

---

## Part 7 — The Smallest Missing Connection

**A helper function: `judgementToMinimumRiskLevel()`**

This does not change `AuthorityEngine`, `JudgementEngine`, or `ActionEngine`.

It provides the governed translation layer between Judgement and Authority that currently does not exist:

```typescript
// lib/authority/authorityFromJudgement.ts
function judgementToMinimumRiskLevel(
  judgement: Judgement,
): NonNullable<AuthorityContext["riskLevel"]> {
  switch (judgement.disposition) {
    case "proceed":        return "low";
    case "caution":        return "medium";
    case "human-required": return "high";
    case "insufficient":   return "critical";
  }
}
```

A caller using this function cannot supply a `riskLevel` lower than what
Judgement concluded about the understanding quality. The authority record
then reflects the governed minimum, not just the caller's preference.

---

## Part 8 — Existing Test Coverage

| Scenario | Tested | File |
|---|---|---|
| `AuthorityEngine` with `riskLevel: "low"` / `"contributor"` → `"allow"` | ✓ | `lib/os/__tests__/judgementEngine.test.ts` |
| `ActionEngine` merges `"execute"` + `"execute-with-caution"` → `"execute-with-caution"` | ✗ | **Gap** |
| `judgementToMinimumRiskLevel()` derivation | ✗ | **Gap** — function does not yet exist |
| Caller cannot supply `riskLevel: "low"` when `Judgement.disposition === "caution"` | ✗ | **Gap** |

---

## Part 9 — Execution Record Audit

`Execution` is the factual record of what happened after an action was governed.

```typescript
Execution {
  id: string;
  action: ExecutionActionSnapshot;   // carries judgement and authority context
  permitted: boolean;
  attempted: boolean;
  outcome: ExecutionOutcome;
  summary: string;
  effect: ExecutionEffect;
  evidence: ExecutionEvidence[];
  createdAt: string;
  updatedAt: string;
}
```

`ExecutionActionSnapshot` carries:
```typescript
ExecutionActionSnapshot {
  id: string;
  kind: JudgementResponseKind;
  disposition: ActionDisposition;
  state: ActionState;
  instruction: string;
  boundaries: AuthorityBoundary[];
}
```

**What the execution record can answer:**
- What kind of action was taken (`kind`)
- What disposition governed it (`disposition: "execute-with-caution"`)
- Whether execution was permitted (`permitted`)
- What happened (`outcome`, `summary`, `effect`)
- What authority boundaries applied (`boundaries`)

**What the execution record cannot answer:**
- What `Judgement.disposition` was — only `ActionDisposition` survives, not the original judgement disposition
- What `Understanding.confidence` was — not carried into the action snapshot
- What `Understanding.completeness` was — not carried
- What `Understanding.contextSources` were — not carried
- Why the specific risk level was applied to the authority assessment

**Implication for PD-010:**

An execution record can explain *what* the DC did and *whether* it was permitted.
It cannot explain *why the authority assessment was appropriate to the understanding quality
at the time of action.*

The `AuthorityBoundary[]` on the action snapshot records what constraints applied —
but the record has no field linking the authority decision to the `Judgement.disposition`
that should have informed the risk level.

A future audit of execution records cannot determine whether authority was exercised
appropriately relative to the DC's understanding — only whether the action was within
the profile's permission scope.

This is the execution-layer expression of the same gap: the authority record does not carry its rings.

---


## Summary

### What currently works correctly

`ActionEngine.mergeConstraints()` already takes the most restrictive disposition from
Authority and Judgement independently. A cautious judgement cannot be overridden by
a permissive authority decision at the action level.

### What is missing

1. **A governed derivation of `riskLevel` from `Judgement.disposition`** — there is no function
   that translates the quality of understanding into a minimum authority risk level.
   Callers decide independently. The authority record cannot explain its risk in terms
   of the underlying understanding.

2. **`AuthorityAssessment.reason` does not reference the judgement that preceded it** —
   the audit trail is incomplete. An authority decision cannot explain why a particular
   risk level was applied in relation to what the DC understood.

### The smallest missing component

```typescript
// lib/authority/authorityFromJudgement.ts
function judgementToMinimumRiskLevel(judgement: Judgement): "low" | "medium" | "high" | "critical"
```

One function. One file. Tests proving the four disposition mappings.

This does not change `AuthorityEngine`, `JudgementEngine`, or `ActionEngine`.

It gives callers a governed translation they can use — and test — rather than
supplying `riskLevel` from implicit knowledge.

### What this audit confirms about the current architecture

The architecture is structurally sound. `ActionEngine` already produces the most
restrictive outcome when Judgement and Authority disagree. The gap is not in the
outcome — it is in the **explanation and auditability** of the authority decision.

A tree that grows has growth rings.

An authority decision that cannot explain its risk level in terms of the understanding
that preceded it is a decision without rings.
