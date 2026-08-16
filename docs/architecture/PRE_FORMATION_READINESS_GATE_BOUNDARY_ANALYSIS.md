# Pre-Formation Readiness Gate — Boundary Analysis

**Date:** 2026-08-05  
**Status:** Analysis — Milestone 019 Prerequisite  
**Constraint:** Analysis only. No implementation. No new types. No refactoring.

---

## Opening Statement

Milestone 018 identified that the pre-formation readiness decision has no current owner. This analysis determines where the gate belongs, what contract it requires, and how it relates to existing components.

The gate answers one question:

> Should the DC invoke `form()` now, or first observe, ask, recall, or research?

---

## 1. Structural Readiness — Where Does It Belong?

### The Question

Should `validateFormationInputs()` live:

- Inside `platform/cos/understanding-formation/`
- Alongside COS contracts, as a companion utility
- As a separate COS capability

### The Evidence

**What structural validation requires:**

Structural readiness checks only whether the Formation input types are sufficiently populated. It requires no professional knowledge — only knowledge of the `FormationInput` contract:

```typescript
// Questions it must answer:
translations.length > 0?                    // has anything been translated?
translations.every(t => t.confidence >= N)? // are translations healthy?
context.situational has urgency or risk?    // is the situation contextualised?
knowledge.length > 0?                       // is applicable knowledge present?
```

None of these questions require domain expertise. They are structural checks on Formation types.

**What already exists in the Formation module:**

`invariants.ts` (inside `platform/cos/understanding-formation/`) already exports post-formation check functions that operate on `FormationInput`:

```typescript
// invariants.ts — already in COS, already operates on FormationInput
export function checkNoMeaningWithoutEvidence(input: FormationInput, output: Understanding)
export function checkUncertaintyNotHidden(input: FormationInput, output: Understanding)
export function checkEvidenceChainPresent(input: FormationInput, output: Understanding)
export function checkConfidenceNotSupplied(input: FormationInput)
export function checkCompletenessNotSupplied(input: FormationInput)
```

These are post-formation checkers. A pre-formation structural validator would be their mirror — it checks the same `FormationInput` type before `form()` is called.

The `assessCompleteness()` function inside `formation.ts` already evaluates structural completeness — but post-hoc, after inputs have been received. A pre-formation version would answer the same question before the call.

**Precedent within Formation:**

`checkAllInvariants()` is a utility that callers invoke voluntarily. It is exported alongside `form()` without being inside `form()`. The structural readiness check follows the same pattern: a utility in the same module, callable before `form()`, without altering `form()`'s behaviour.

### Ownership Decision

`validateFormationInputs()` belongs in `platform/cos/understanding-formation/` as a companion utility to `form()`, exported from `index.ts`.

**Reason:** Structural validation is about the Formation type contract. That contract is defined in this module. COS owns the contract. COS owns the structural validator for that contract.

**What it does not do:** Gate `form()` itself. Formation still accepts any inputs and produces the most honest Understanding possible from them. The validator is a caller-side utility — it is the DC's check before deciding to call, not Formation's check before accepting a call.

**Diagram:**

```
DC has Formation inputs
        ↓
validateFormationInputs(input)   ← COS utility, DC calls voluntarily
        ↓
ReadinessDecision { ready, nextStep, gaps }
        ↓
if ready → form(input) → Understanding
if not   → take nextStep (observe/ask/research/remember/wait)
```

---

## 2. Professional Readiness — Where Does It Belong?

### The Question

Should `assessProfessionalReadiness()` be:

- DC-specific
- Profession HQ supplied
- Part of the DC cognitive layer

### The Evidence

**`AnnieThought` is already DC-layer professional readiness:**

```typescript
// lib/annie/thinking.ts
export function think(stimulus: string): AnnieThought {
  return {
    stimulus,
    confidence: 0.3,             // DC's self-assessed certainty
    needsClarification: true,    // DC's own professional judgment
    suggestedNextStep: "Gather enough context...",
  };
}
```

`needsClarification` is the DC asking itself: "In my professional domain, do I know enough about this situation to proceed?" This is inherently profession-specific.

**`chooseWisdomSource()` is also DC-layer professional routing:**

```typescript
// lib/annie/wisdom.ts
export function chooseWisdomSource(confidence, hasObservation, hasMemory): WisdomDecision {
  // Annie decides which source to consult next — this is professional judgment
  // "I should look first" / "A quick question will help" / "Ask Annie HQ"
}
```

This is Annie's professional prioritisation of where understanding comes from. It is DC-specific because it reflects Annie's professional practice.

**Why not Profession HQ supplied?**

Profession HQ supplies governed knowledge (thresholds, standards, regulations). Whether Annie has *enough* knowledge to form Understanding is a judgment Annie makes at runtime, based on the current situation. If professional readiness depended on a live HQ query, offline DCs could not assess their own readiness. The readiness decision must be local.

**Why not COS?**

COS cannot assess whether a DC has sufficient professional knowledge for a specific domain situation. "Is this enough food-safety knowledge?" requires hospitality expertise. COS does not know what hospitality is.

### Ownership Decision

Professional readiness belongs in the **DC cognitive layer** — it is an extension of `AnnieThought`.

Specifically, it is the DC asking:

1. "Have I translated the observations that matter for this professional situation?" (translation adequacy)
2. "Do I understand the situational context well enough?" (context adequacy)
3. "Have I retrieved the professional knowledge that governs this situation?" (knowledge adequacy)

These three questions require professional judgment. Each DC answers them differently.

**Diagram:**

```
DC receives stimulus
        ↓
AnnieThought = think(stimulus)
  → confidence: 0.3
  → needsClarification: true
        ↓
DC evaluates Formation inputs:
  → "Do I have hospitality translations for these observations?"
  → "Do I have food-safety thresholds?"
  → "Do I know the urgency?"
        ↓
professionalReadiness = {
  translationsAdequate: boolean  (DC professional judgment)
  contextAdequate: boolean       (DC situational awareness)
  knowledgeAdequate: boolean     (DC domain knowledge assessment)
}
```

This assessment does not require Profession HQ queries. It uses what the DC already has.

---

## 3. `seekFirstToUnderstand()` — Analysis

### What It Is

```typescript
// platform/core/companion/understanding.ts
export function seekFirstToUnderstand(input: CompanionInput): CompanionUnderstanding {
  // Routes to: observe | remember | ask | research | reflect | wait
}
```

`CompanionInput` contains:
```typescript
interface CompanionInput {
  stimulus: string;
  confidence: number;
  hasObservation: boolean;
  hasMemory: boolean;
  requiresClarification: boolean;
}
```

### Is It the Correct Protocol?

**Yes.** The routing logic is exactly right:

| `CompanionInput` state | `nextStep` | Readiness meaning |
|---|---|---|
| `hasObservation: true` | `"observe"` | Observe before interpreting |
| `requiresClarification: true` | `"ask"` | Ask before forming |
| `confidence < 0.7` | `"research"` | Research knowledge before forming |
| `hasMemory && confidence >= 0.9` | `"remember"` | Recall from memory — ready |
| `confidence >= 0.7` | `"reflect"` | Reflect, then form |

These five routes map directly to the five seeking paths identified in Milestone 018.

The routing is sound. The input type is the issue.

### The Input Type Problem

`CompanionInput` uses pre-assessed booleans (`hasObservation`, `hasMemory`, `requiresClarification`). These must be set externally before calling `seekFirstToUnderstand()`. They are not derived from actual Formation input availability.

What the DC would actually need to supply:
- `hasObservation` ← derived from `translations.length > 0`
- `hasMemory` ← derived from `context.institutional.length > 0` + memory recall state
- `requiresClarification` ← derived from `AnnieThought.needsClarification`
- `confidence` ← derived from `AnnieThought.confidence`

The booleans are correct. The derivation from Formation inputs is missing.

### Does It Need Moving?

`seekFirstToUnderstand()` lives in `platform/core/companion/` — the disconnected parallel architecture. The routing logic is correct but isolated.

**Does it need to move to COS?** Ideally yes — routing the pre-formation readiness decision is a universal DC behaviour, not a companion-specific loop. Moving it to COS would unify the architecture.

**Does it need to move before it can be used?** No. The DC layer can call `platform/core/companion/understanding.seekFirstToUnderstand()` directly without moving it. The architectural debt (it's in the wrong place) is real but not blocking.

**Conclusion:** `seekFirstToUnderstand()` is the correct routing destination. The DC pre-formation gate assembles `CompanionInput` from Formation inputs and `AnnieThought`, then routes to it. Moving it to COS is a subsequent architectural cleanup, not a prerequisite.

---

## 4. The Minimum Contract

### What the Gate Must Know

The pre-formation readiness gate requires two types of information:

**Structural state** — derived from Formation input availability (COS types):

```
hasTranslations:        translations.length > 0
translationsHealthy:    translations.every(t => t.confidence >= 0.7)
hasSituationalContext:  urgency or risk or what is present
hasInstitutionalContext: institutional.length > 0
hasKnowledge:           knowledge.length > 0
```

**Professional state** — derived from DC cognition (DC types):

```
dcConfidence:           AnnieThought.confidence
needsClarification:     AnnieThought.needsClarification
hasMemory:              institutional.length > 0 (proxy for recalled context)
```

### What the Gate Must Produce

```
ReadinessDecision:
  ready:    boolean          — "call form() now" or "don't yet"
  nextStep: "form"           — proceed to formation
           | "observe"       — gather more observations first
           | "ask"           — ask a clarifying question first
           | "research"      — retrieve applicable knowledge first
           | "remember"      — recall from memory/context first
           | "wait"          — nothing to process yet
  reason:   string           — why this decision was made
  gaps:     string[]         — specific named inputs that are missing
```

The `gaps[]` field is the key addition not present in `seekFirstToUnderstand()`. It tells the DC not just *what to do* but *what specifically to get*. Without named gaps, the DC knows to "ask" but not *what question to ask*.

### Is This Contract Sufficient?

Testing against the five readiness questions from Milestone 018:

| Readiness question | Contract field that answers it |
|---|---|
| Do I understand enough? | `dcConfidence` + `translationsHealthy` |
| What don't I know? | `gaps[]` — specific named missing inputs |
| What information is missing? | `gaps[]` — field-level description |
| Should I ask, observe, or research? | `nextStep` — the routing decision |
| Should I involve a human? | **Out of scope for this gate** — this belongs to JudgementEngine post-formation |

**Finding:** The contract is sufficient for pre-formation readiness. Human involvement is not a pre-formation decision — it is a post-judgement decision. The gate should not pre-empt JudgementEngine's authority by deciding human involvement before Understanding is even formed.

### Minimum Contract — Validated

```
GATE INPUT

  Formation structural state (derived from FormationInput):
    hasTranslations         boolean
    translationsHealthy     boolean
    hasSituationalContext   boolean
    hasKnowledge            boolean

  DC professional state (from AnnieThought):
    confidence              number   (0–1)
    needsClarification      boolean
    hasMemory               boolean

GATE OUTPUT

  ReadinessDecision {
    ready:    boolean
    nextStep: "form" | "observe" | "ask" | "research" | "remember" | "wait"
    reason:   string
    gaps:     string[]
  }
```

---

## 5. Relationship to COS Formation

### What Changes

Nothing inside `form()` changes. Formation continues to:
- Accept any `FormationInput`
- Return the best possible Understanding from those inputs
- Signal its own completeness via `Understanding.completeness`

The gate is a *pre-flight check*, not a *gating mechanism*. `form()` remains unconditional.

### Where the Gate Sits

```
Formation module exports:

  form(input) → Understanding                  ← existing, unchanged
  checkAllInvariants(input, output)            ← existing post-formation check
  validateFormationInputs(input)   NEW ←       ← pre-formation structural check
```

`validateFormationInputs()` answers: "Is this `FormationInput` structurally ready to produce useful Understanding?"

It is the pre-formation counterpart to `assessCompleteness()` — same knowledge (the Formation type contract), applied before the call rather than after.

### What Is Not Duplicated

`validateFormationInputs()` does not reimplement `assessCompleteness()`. It asks a simpler question: "Is the minimum structure present?" not "How complete is the synthesis?" The former is a structural check. The latter is a quality assessment.

---

## 6. Relationship to DC Cognition

### Where the Gate Fits in the DC Cognitive Cycle

From `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md`:

```
Receive observations
        ↓
Form context               ← AnnieThought (DC cognitive layer)
        ↓
Recall relevant memory
        ↓
[PRE-FORMATION GATE]  ← the gap this analysis addresses
        ↓
Build understanding        ← form() in COS
        ↓
Identify uncertainty
        ↓
Apply judgement
```

The cognitive architecture explicitly names "Form context → Build understanding" as a sequence. The pre-formation gate is the missing step between them: the DC evaluating whether its context-forming has been sufficient before it attempts to build Understanding.

### DC Cognitive Layer Responsibility

The DC pre-formation professional check is a natural extension of `AnnieThought`. The DC already asks contextual questions (who, what, where, why). The gate adds: "given what I know, am I ready?"

This is not a new cognitive act. It is the natural completion of `think()`:

```typescript
// Current
function think(stimulus): AnnieThought {
  return { confidence: 0.3, needsClarification: true, ... };
}

// What the gate adds (not inside think(), but called after it)
function assessReadiness(thought, formationInputs): ReadinessDecision {
  // Uses thought.needsClarification + thought.confidence
  // Uses formationInputs structural state
  // Returns: ready? nextStep? gaps?
}
```

The DC layer owns this function because it combines DC cognition (`AnnieThought`) with Formation structural state (COS types). Neither alone is sufficient.

---

## 7. Recommended Next Milestone

### Milestone 019 — Pre-Formation Readiness Gate

**Scope:** Implement the pre-formation readiness gate using existing components.

**What gets built (three pieces):**

**1. COS: `validateFormationInputs()` in `platform/cos/understanding-formation/`**

A structural check exported alongside `form()`. Takes `FormationInput` (a partial/candidate input). Returns a structural readiness signal with named gaps for missing fields.

This is the COS-owned portion of the gate: structural, not professional.

**2. DC Layer: `assessReadiness()` in `lib/annie/formation/`**

Assembles `CompanionInput` from:
- Formation structural state (from `validateFormationInputs()`)
- `AnnieThought` fields (DC professional assessment)

Routes to `seekFirstToUnderstand()`. Returns `ReadinessDecision`.

This is the DC-owned portion of the gate: professional judgment + structural bridge.

**3. Integration test in `lib/annie/formation/__tests__/`**

Proves that a DC with insufficient inputs takes the correct seeking path instead of calling `form()` prematurely.

**What does NOT change:**

- `form()` — unchanged
- JudgementEngine — unchanged
- `AnnieThought` — unchanged
- `seekFirstToUnderstand()` — unchanged (called, not moved)
- HQ routing — unchanged

**Success criterion:**

> A DC that receives a stimulus without translations does not call `form()`. It receives `nextStep: "observe"` and `gaps: ["No observations have been translated"]`. The same fridge scenario from Milestone 016, but triggered by a sensor observation before translations exist, routes to "observe" rather than producing empty Understanding.

---

**Status:** Analysis complete | No code changes | Ownership boundaries defined | Minimum contract validated | Milestone 019 scoped
