# Pre-Formation Readiness Output Boundary Analysis

**Date:** 2026-08-05  
**Status:** Analysis — Milestone 019 Pre-Implementation  
**Constraint:** Analysis only. No code. No new types. No refactoring.

---

## Opening Statement

Before implementing the Pre-Formation Readiness Gate, the nature of its output must be precisely understood. The analysis in Milestone 019 Prerequisite proposed `ReadinessDecision`. This document examines whether that type is correctly conceived, what it actually is, and who owns each of its parts.

---

## 1. Is `ReadinessDecision` a Judgement?

### The Evidence

From `docs/theory/004-THEORY-OF-JUDGEMENT.md`:

> Judgement emerges when understanding is evaluated within context.
>
> **First Judgement Theorem:** Judgement cannot exist without understanding.

From `lib/judgement/Judgement.ts`:

```typescript
export interface Judgement {
  understanding: Understanding;  // ← Judgement requires formed Understanding
  candidates: JudgementCandidateResponse[];
  selected: JudgementCandidateResponse;
  disposition: JudgementDisposition;
  ...
}
```

Helping Hand `Judgement` requires `Understanding` as a structural input. Understanding is produced by Formation. Readiness assessment happens *before* Formation is invoked. Therefore `ReadinessDecision` cannot be a `Judgement` in the Helping Hand sense — the required input does not yet exist.

### What `ReadinessDecision` Actually Is

Testing against four options:

**A. Cognitive judgement** — No. Judgement requires Understanding. Readiness precedes Understanding.

**B. Structural assessment** — Partially. The structural component checks whether FormationInput types are sufficiently populated. This is a threshold check, not reasoning.

**C. Routing recommendation** — Partially. The output routes to a seeking action. This is a navigation decision, not a judgement.

**D. Combination requiring separation** — Yes. `ReadinessDecision` contains two distinct concerns that have different owners:

```
Component 1: Structural Assessment
  "Are the Formation input types minimally populated?"
  → Belongs to COS (checks COS types)
  → No professional knowledge required
  → Deterministic threshold evaluation

Component 2: Routing Recommendation
  "Given the current state, what should the DC do next?"
  → Routes through seekFirstToUnderstand()
  → Universal routing protocol
  → Not professional, not a judgement
```

**Finding:** `ReadinessDecision` is a **pre-Understanding threshold assessment + routing recommendation**. It is not a judgement. It does not evaluate consequences, weigh alternatives against principles, or require Understanding. It checks facts against thresholds and recommends a path.

The conceptual error to avoid: calling it a "judgement" (even informally) would place it in the wrong governance layer and invite the wrong kind of implementation.

---

## 2. Does "Ready" Mean the Same Thing as "Understanding"?

### The Distinction

```
Ready to form Understanding   ≠   Having Understanding
```

**Ready to form** means:

> "The minimum Formation inputs are present and above threshold. If `form()` is called now, it will produce *something meaningful* rather than just a structural placeholder."

**Having Understanding** means:

> "Formation has been run. COS has synthesised inputs into a `summary`, `confidence`, `uncertainty[]`, and `completeness`."

### The Gap Between Them

Even with `ready: true`:
- Understanding may still be `completeness: "partial"`
- Understanding may have `confidence: 0.55` (moderate, not strong)
- Understanding may carry uncertainty items

Being ready is *permission to attempt* Understanding formation. It is not assurance of *good* Understanding.

This mirrors an important distinction from the Theory of Understanding:

> "Complete certainty is not evidence of complete understanding."

Similarly: readiness is not evidence of sufficient understanding. Readiness only means: "the inputs are there; let Formation do its work; whatever Understanding emerges will be honest."

### What the Gate Must Not Claim

The gate must not claim that `ready: true` implies:
- Good Understanding will result
- JudgementEngine will find it sufficient
- No uncertainty will remain

The gate makes a narrow claim: "Formation can proceed responsibly with these inputs." Nothing more.

---

## 3. Where Do Gaps Originate?

### Two Gap Types With Different Owners

**Structural gaps** — COS derives from `FormationInput`:

These describe what Formation type fields are absent or underpopulated. They require no professional knowledge. Examples:

- `"translations.length is 0 — no observations have been translated"`
- `"context.situational.urgency is absent"`
- `"knowledge.length is 0 — no applicable principles provided"`

COS can derive these from the `FormationInput` contract. The same gap detection applies to every DC regardless of profession.

**Professional gaps** — DC derives from domain knowledge:

These describe what professional content the DC knows it needs but hasn't yet retrieved. They require professional judgment. Examples:

- `"Food safety temperature threshold not retrieved from Professional HQ"`
- `"Equipment type not yet established for this venue"`
- `"Risk level not assessed for this category of observation"`

COS cannot name these. COS does not know what food safety is, what constitutes adequate knowledge for a temperature breach, or what venue context matters for this situation. Only the DC knows.

### The Boundary

```
COS names:  structural gaps (what FormationInput types are missing)
DC names:   professional gaps (what domain content the DC knows it lacks)

Both flow into:  gaps[]
```

This follows the same pattern as Formation itself:
- COS provides the `FormationInput` type contract
- DC provides the content
- COS synthesises them

For gaps:
- COS provides structural gap detection
- DC provides professional gap naming
- Both contribute to `gaps[]`

### Evidence for This Boundary

From `invariants.ts` (structural, COS-owned):

```typescript
export function checkEvidenceChainPresent(input, output): InvariantViolation | null {
  if (input.translations.length === 0) return null;
  if (!output.evidenceChain || output.evidenceChain.length === 0) {
    return { description: "Translations were provided but evidence chain is empty." };
  }
  ...
}
```

This is a structural check — it knows about `translations.length` but nothing about whether those translations contain the *right* professional content.

The professional gap equivalent would be Annie saying: "I have translations, but none of them apply the food safety threshold rule that governs fridge temperature." COS cannot generate this gap description. Annie can.

---

## 4. Should Readiness Be Allowed to Say "Ask"?

### The Three "Ask"s in the System

`"ask"` appears at three distinct lifecycle stages with different meanings:

**Ask 1 — Curiosity (Observation Phase)**

```typescript
// platform/cos/observation/types.ts
export interface ObservationQuestion {
  observationId: string;
  question: string;       // "How many people can sit at these tables?"
  reason: string;
  priority: ObservationPriority;
}
```

- Origin: COS mechanism (`createCuriosityQuestions()`), DC rules (hospitality curiosity rules)
- Trigger: An observation was made and the DC wants to know more about it
- Purpose: Produce additional observations through follow-up questions
- Feeds back into: More observations → more translations → Formation inputs
- **Scope:** Observation-driven asking

**Ask 2 — Readiness (Pre-Formation Phase)**

- Origin: DC readiness assessment (Formation inputs are incomplete)
- Trigger: A specific Formation input is missing (context, knowledge, or translations insufficient)
- Purpose: Fill a specific gap in Formation inputs before invoking `form()`
- Example: "I need to ask what the urgency of this situation is before I attempt to understand it"
- **Scope:** Input-directed asking

**Ask 3 — Judgement (Post-Formation Phase)**

```typescript
// lib/judgement/Judgement.ts
type JudgementResponseKind = "ask" | ...
// From JudgementEngine when disposition: "insufficient"
```

- Origin: JudgementEngine (Understanding confidence < 0.25)
- Trigger: Understanding was formed but is insufficient for responsible judgement
- Purpose: Seek more context after Understanding was found wanting
- **Scope:** Understanding-directed asking

### Are These The Same?

They share a word. They are not the same act.

| Ask type | Trigger | Purpose | Feeds back to |
|---|---|---|---|
| Curiosity ask | Observation made | Learn more about what was observed | Observation → Translation |
| Readiness ask | Formation input missing | Fill specific input gap | DC Interpretation → Formation |
| Judgement ask | Understanding insufficient | Improve post-formation context | Understanding re-formation |

### Should Readiness Say "Ask"?

**Yes — with precision.** When `nextStep: "ask"`, the readiness gate means:

> "A specific Formation input is missing. Ask a targeted question to fill it before invoking `form()`."

This is NOT a curiosity ask (it is not about a specific observation). It is NOT a judgement ask (Understanding has not been formed yet). It is an **input-directed targeted ask**.

The `gaps[]` field is what makes this ask meaningful: "Ask about X, because X is in gaps[]." Without `gaps[]`, `"ask"` is just a direction without a destination. With `gaps[]`, it is a specific instruction: "Ask this, to fill this gap, so that Formation can proceed."

### Overlap and Separation

The three asks operate at different stages and are therefore not in conflict:

```
Observation phase → Curiosity asks (ObservationQuestion[])
                         ↓
DC Interpretation
                         ↓
Readiness gate → Readiness asks (nextStep: "ask" + gaps[])
                         ↓
Formation → Understanding
                         ↓
JudgementEngine → Judgement asks (JudgementResponseKind: "ask")
```

The readiness ask does not overlap with Talk.Get OS in any problematic way. Talk.Get OS (when it exists) would be the channel through which readiness asks are fulfilled — the DC saying "I need to ask X" and Talk.Get OS providing the conversational mechanism to do so. The readiness gate determines *what* to ask; Talk.Get OS (when built) would determine *how* to ask it.

---

## 5. The Validated Lifecycle

```
STIMULUS
   ↓
OBSERVATION
   COS: beginObservationSession(observations, curiosityRules)
   → ObservationSession { observations[], questions[] }
   → ObservationQuestion[]: Curiosity asks (observation-directed)

   ↓
DC INTERPRETATION LAYER
   DC: translateForFormation(observations)     → Translation[]
   DC: assembleFormationContext(thought, ctx)  → FormationContext
   DC: knowledgeAnswersToFormation(answers)    → FormationKnowledge[]

   ↓
PRE-FORMATION READINESS GATE
   COS: validateFormationInputs(input)     structural gaps
   DC:  assessReadiness(thought, report)   professional gaps + routing
   ↓
   │
   ├─ NOT READY
   │   nextStep: "observe"   → gather more observations
   │                           → loops back to OBSERVATION
   │   nextStep: "ask"       → ask targeted question (fills Formation input)
   │                           → loops back to DC INTERPRETATION LAYER
   │   nextStep: "research"  → retrieve applicable knowledge
   │                           → loops back to DC INTERPRETATION LAYER
   │   nextStep: "remember"  → recall from context/memory store
   │                           → loops back to DC INTERPRETATION LAYER
   │   nextStep: "wait"      → nothing to process yet
   │
   └─ READY
       ↓
      COS: form(translations, context, knowledge)
       ↓
      Understanding { summary, confidence, uncertainty[], completeness, evidenceChain }
       ↓
      JudgementEngine.judge(understanding)
       ↓
      Judgement { disposition, selected, ... }
       ↓
      ActionEngine → Action
       ↓
      ExecutionEngine → Execution/Experience
       ↓
      ReflectionEngine → Reflection
       ↓
      LearningEngine → Learning
       ↓
      Governed Knowledge Update
```

### The Seeking Loop

The lifecycle contains a pre-formation seeking loop. When not ready:

1. The DC receives `nextStep + gaps[]`
2. The DC performs the indicated seeking action
3. The seeking action produces new content (more observations / filled context / retrieved knowledge)
4. The DC re-enters the Interpretation Layer with the new content
5. The DC re-runs the Readiness Gate
6. If now ready → Formation proceeds

This loop may run multiple times. Each iteration should reduce the gaps list. A DC that cannot reduce gaps (offline, no available sources) may decide to invoke `form()` with partial inputs anyway — Formation will produce an honest partial Understanding, and JudgementEngine will route appropriately.

The gate does not prevent calling `form()`. It recommends against it. The DC retains the decision.

---

## 6. Relationship to Curiosity

### How They Connect, Not Overlap

The Curiosity mechanism and the Readiness gate serve complementary purposes:

**Curiosity** asks about what *was* observed to produce more observations.  
**Readiness** asks about what *is missing* from Formation inputs.

The output of a Curiosity ask (an answered `ObservationQuestion`) flows into the DC Interpretation layer as new observations, which become new translations, which may fill Readiness gaps.

```
Curiosity ask → ObservationQuestion → Answer → New Observation
                                                     ↓
                                           DC Interpretation (translation)
                                                     ↓
                                           Readiness check (gap reduced)
```

This means the Curiosity mechanism is a source of Formation inputs — but it is observation-driven, not gap-driven. The DC decides when to pursue Curiosity questions separately from when to pursue Readiness-directed asks.

### They Are Not Substitutes

A Curiosity question arises from an observation already made. A Readiness ask arises from a gap in Formation inputs. These can coincide but do not always:

- A DC may have all Formation inputs ready without any unanswered Curiosity questions.
- A DC may have unanswered Curiosity questions while still being ready for Formation (if the unanswered questions are lower priority).
- A DC may need a Readiness-directed ask (e.g., "what is the urgency?") without any pending Curiosity questions.

---

## 7. Relationship to JudgementEngine

### They Operate at Different Stages

The Pre-Formation Readiness Gate and JudgementEngine are not in conflict because they operate at different points in the lifecycle:

```
Gate: pre-formation (before Understanding exists)
JudgementEngine: post-formation (after Understanding exists)
```

JudgementEngine's `disposition: "insufficient"` fires when `understanding.confidence < 0.25`. This is the *post-formation* signal that Understanding is too weak to judge.

The Readiness Gate fires *before* Formation is called. It prevents the case where Formation is invoked with no inputs — but it does not prevent Formation from producing weak Understanding. That is JudgementEngine's domain.

### What Each Owns

```
Gate:           "Should I call form() now?"     — pre-formation threshold check
Formation:      "Given what I have, what does this mean?"  — synthesis
JudgementEngine: "Is this Understanding fit for judgement?"  — post-formation sufficiency
```

There is no ownership conflict. They are sequential, not competing.

---

## Recommended Milestone 019 Implementation Boundary

### What Gets Built

**COS piece — `validateFormationInputs()` in `platform/cos/understanding-formation/`:**

A structural check — takes a (possibly partial) `FormationInput`, returns a structural readiness signal. Produces:
- A boolean `structurallyReady`
- A `structuralGaps: string[]` of missing or underpopulated Formation type fields

It does not take `AnnieThought`. It does not know professional gaps. It knows only the Formation type contract.

Exported alongside `form()` and `checkAllInvariants()` from `index.ts`.

---

**DC piece — `assessReadiness()` in `lib/annie/formation/`:**

Takes:
- `AnnieThought` — DC's self-assessment
- The structural report from `validateFormationInputs()`

Produces a `ReadinessDecision`:
- `ready: boolean`
- `nextStep: "form" | "observe" | "ask" | "research" | "remember" | "wait"`
- `reason: string`
- `gaps: string[]` — structural gaps + professional gaps combined

Bridges `AnnieThought` + structural state to `seekFirstToUnderstand()` from `platform/core/companion/`.

---

**Test piece — `__tests__/milestone-019-readiness.test.ts` in `lib/annie/formation/__tests__/`:**

Proves:

1. A DC with no translations receives `nextStep: "observe"` and named gaps.
2. A DC with translations but no knowledge receives `nextStep: "research"` and named gaps.
3. A DC with sufficient inputs receives `nextStep: "form"` and empty gaps.
4. The fridge scenario: a sensor observation arrives before translations — the gate routes to "observe", not to Formation.
5. After seeking fills the gap — translations exist — the gate routes to "form".

---

### What Does NOT Change

- `form()` — unchanged and unconditional
- `JudgementEngine` — unchanged
- `AnnieThought` — unchanged (the DC's cognitive state)
- `seekFirstToUnderstand()` — unchanged (called but not modified)
- HQ routing — unchanged
- Formation invariants — unchanged

---

### What the Gate Is Not

It is not a reasoning engine. It does not evaluate whether Understanding will be *good*. It checks whether Formation can proceed *responsibly*.

It is not a replacement for JudgementEngine's post-formation sufficiency check. Both are necessary at different stages.

It is not a curiosity engine. It does not ask about observations. It asks about missing Formation inputs.

It makes `"I don't know yet"` the normal, comfortable starting state — not an error condition, not a failure, but the expected position from which every DC begins.

---

**Status:** Analysis complete | No code changes | Output type clarified | Ownership of gaps defined | Lifecycle validated | Milestone 019 implementation boundary confirmed
