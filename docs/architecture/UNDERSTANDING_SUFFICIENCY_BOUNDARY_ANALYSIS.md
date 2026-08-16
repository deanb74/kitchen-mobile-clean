# Understanding Sufficiency Boundary Analysis

**Date:** 2026-08-05  
**Status:** Analysis — Milestone 018  
**Constraint:** No code. No new types. No new engines.  
**Question:** Who owns the decision "I am not ready to form Understanding yet"?

---

## Opening Observation

This analysis investigates whether any existing component answers the pre-formation readiness question.

The question is not: "Did I form Understanding well?"  
The question is: "Should I call `form()` now, or first learn more?"

These are different questions requiring different mechanisms.

---

## 1. Formation Completeness — What It Actually Answers

### The Code

```typescript
// platform/cos/understanding-formation/formation.ts
function assessCompleteness(translations, context): UnderstandingCompleteness {
  if (translations.length === 0) return "insufficient";

  const allTranslationsHealthy = translations.every((t) => t.confidence >= 0.7);
  const hasSituationalContext = !!context.situational.urgency && !!context.situational.risk;

  if (allTranslationsHealthy && hasSituationalContext) return "sufficient";
  if (hasAnyTranslation && hasAnyContext) return "partial";
  return "insufficient";
}
```

`completeness` is computed **inside** `form()`. It is an output of formation, produced from inputs that have already been received.

### What It Answers

> "Did Formation receive enough information, given what it was called with?"

### What It Does Not Answer

> "Does the DC have enough information to justify calling Formation?"

**Finding:** `completeness` is a **post-formation quality assessment**. It cannot signal pre-formation readiness because it does not exist until after `form()` is invoked. A DC can invoke `form()` with empty translations; Formation will produce `completeness: "insufficient"` — but the call already happened.

`completeness` tells a story about the past. The readiness question is about the present.

---

## 2. Formation Uncertainty — What It Represents

### The Code

```typescript
// platform/cos/understanding-formation/formation.ts
function deriveUncertainty(translations, context): string[] {
  const items: string[] = [];

  for (const translation of translations) {
    if (translation.confidence < 0.7) {
      items.push(`Low confidence in interpretation: "..."`)
    }
  }

  if (!context.situational.urgency) { items.push("Urgency is unknown."); }
  if (!context.situational.risk)    { items.push("Risk level has not been assessed."); }
  if (!context.situational.what)    { items.push("The subject of the observation is unclear."); }

  if (context.situational.risk) {
    items.push(`Risk context: ${context.situational.risk}.`);
  }

  return items;
}
```

### What It Represents

`uncertainty[]` represents **gaps in the inputs that were provided** — translated into the output. It is derived from the quality of what was received, not from what was absent before the call.

It answers: "Given what Formation received, what remains unresolved?"

It does not answer: "What should the DC have gathered before calling Formation?"

### The Distinction

`uncertainty` is reactive. It names the gaps that exist in what Formation was given. It cannot name the gaps in what the DC has not yet sought.

**Example:**

- A DC calls `form()` with no knowledge of food safety thresholds.
- Formation produces `uncertainty: ["Risk level has not been assessed."]`
- Formation does not produce: "You should have retrieved a KnowledgeAnswer about food safety thresholds before calling me."

The uncertainty tells the JudgementEngine what to do next. It does not tell the DC what to gather.

**Finding:** `uncertainty[]` is a **post-formation signal for downstream consumption** (JudgementEngine). It is not a pre-formation readiness signal for the DC.

---

## 3. AnnieThought — Pre-Formation Readiness Signal?

### The Code

```typescript
// lib/annie/thinking.ts
export function think(stimulus: string): AnnieThought {
  return {
    stimulus,
    confidence: 0.3,             // deliberately low — not yet contextualised
    needsClarification: true,    // default: assume clarification is needed
    suggestedNextStep: "Gather enough context to choose the most helpful response.",
  };
}
```

The default state of `think(stimulus)` is:
- Low confidence (0.3)
- Clarification needed
- Suggested next step: gather more context

This is **before any Formation inputs exist**. It is Annie's initial cognitive response to a stimulus.

### What `AnnieThought` Represents

`AnnieThought` is the DC's contextual interrogation layer — the act of recognising a stimulus and asking what is known about the situation.

- `needsClarification: true` = "I should not form Understanding yet"
- `confidence: 0.3` = "I have low certainty about what is happening"
- `suggestedNextStep` = "Gather more context" (pre-formation recommendation)

### Is It a Readiness Signal?

**Yes, partially.** `AnnieThought` is the nearest existing pre-formation readiness indicator. It signals "not ready yet" through its default state.

**But it is incomplete as a readiness protocol:**

1. It is binary: "need clarification" or "don't." It does not say which of the three Formation inputs is insufficient.
2. It does not distinguish between: "I need to observe more", "I need to ask a question", "I need to retrieve knowledge", "I need to recall memory."
3. It does not connect to Formation input assembly — it doesn't reference `translations`, `context`, or `knowledge` completeness.
4. It is in the DC professional layer (`lib/annie/`) — not a COS capability.

**Finding:** `AnnieThought.needsClarification + confidence` is the DC's existing readiness signal. It is correctly positioned. It is structurally incomplete as a protocol. It names the readiness problem without naming the path through it.

---

## 4. JudgementEngine — Is It the Right Owner of "Stop and Seek"?

### The Code

```typescript
// lib/judgement/JudgementEngine.ts
private determineDisposition(understanding: Understanding): JudgementDisposition {
  if (understanding.confidence < 0.25) {
    return "insufficient";
  }
  // ...
}
```

```typescript
insufficient: [
  "ask",
  "admit-uncertainty",
  "wait",
  "remain-silent",
  "seek-consent",
  "escalate",
  ...
]
```

When `disposition: "insufficient"`, JudgementEngine selects `"ask"` as the first available response — signalling that more information is needed.

### What JudgementEngine Owns

JudgementEngine owns the decision: "This Understanding is insufficient to support responsible judgement. The DC should seek before acting."

This is the **post-formation readiness check** — it evaluates whether the Understanding that was produced is fit for judgement.

### Is It the Correct Place for "Stop and Seek"?

**For post-formation seeking: Yes.** JudgementEngine correctly governs "this Understanding is not good enough — ask."

**For pre-formation seeking: No.** JudgementEngine cannot prevent premature invocation of `form()`. It operates downstream. By the time it returns `"insufficient"`, the DC has already:
1. Called `form()`
2. Received an Understanding with `confidence: 0`
3. Passed that Understanding to JudgementEngine

The DC can then ask a question — but it does not know which specific Formation input was missing, which source to consult, or how to improve its inputs before calling `form()` again.

**Finding:** JudgementEngine is the correct owner of **post-formation sufficiency** ("this Understanding cannot support judgement"). It is not the owner of **pre-formation readiness** ("I should gather more before forming"). The pre-formation decision has no current owner.

---

## 5. The Curiosity Loop

### What Exists

**Phase 1 — Observation → Questions (COS mechanism, DC content):**

```typescript
// platform/cos/observation/curiosity.ts
export function createCuriosityQuestions(
  observations: Observation[],
  rules: CuriosityRule[]
): ObservationQuestion[] {
  return observations.flatMap((observation) =>
    rules.map((rule) => rule(observation)).filter(Boolean)
  );
}
```

```typescript
// lib/annie/observation/curiosity.ts — DC supplies hospitality rules
export const hospitalityCuriosityRule: CuriosityRule = (observation) => {
  if (observation.id === "tables") {
    return { question: "How many people can sit here?", priority: "high" };
  }
  return null;
};
```

The COS `beginObservationSession()` returns an `ObservationSession` with both `observations[]` and `questions[]`. The questions represent what the DC should ask next to deepen understanding of the observation.

**Phase 2 — Questions → Answers → New Observations: Missing**

The `ObservationQuestion[]` array is produced. There is no mechanism that:
- Presents the question to a person or system
- Receives an answer
- Converts the answer into a new `Observation`
- Routes that observation back through translation into Formation inputs

The curiosity loop has the first half (observation → questions) but not the second half (answers → new observations → formation inputs).

### What This Reveals

The COS Curiosity mechanism is correctly designed as a universal capability. The missing part is the connection from `ObservationQuestion[]` to "answered observations" back into the Formation input pipeline.

This is exactly where **Talk.Get OS** was identified as necessary in earlier analysis: the mechanism through which answered questions become new observations that enrich Formation inputs.

### Ownership of the Curiosity Loop

```
Phase 1: Observation → Questions
  COS owns: createCuriosityQuestions() mechanism
  DC owns: CuriosityRule[] content (what to ask about hospitality observations)
  Status: ✓ Implemented

Phase 2: Questions → Answers → New Observations
  COS would own: receiving and structuring answered questions as Observations
  DC would own: knowing which questions are professionally important
  Status: ❌ Not implemented
  Related to: Talk.Get OS (conversational observation layer)
```

---

## 6. The Existing Readiness Architecture

### `seekFirstToUnderstand()` — The Closest Prototype

```typescript
// platform/core/companion/understanding.ts
export function seekFirstToUnderstand(input: CompanionInput): CompanionUnderstanding {
  if (input.hasMemory && input.confidence >= 0.9) {
    return { understood: true, nextStep: "remember", ... };
  }
  if (input.hasObservation) {
    return { understood: false, nextStep: "observe", ... };
  }
  if (input.requiresClarification) {
    return { understood: false, nextStep: "ask", ... };
  }
  if (input.confidence < 0.7) {
    return { understood: false, nextStep: "research", ... };
  }
  return { understood: true, nextStep: "reflect", ... };
}
```

This function answers exactly the readiness question:

> "I am not ready to form Understanding yet — here is what I should do first."

It routes to: `observe | remember | ask | research | reflect | wait`.

**But:** it takes `CompanionInput` with pre-assessed booleans — not actual Formation inputs. It does not evaluate whether `translations`, `context`, or `knowledge` are complete. It is in the disconnected `platform/core/companion/` parallel architecture.

**Finding:** `seekFirstToUnderstand()` is the correct conceptual owner and the correct routing protocol. It is architecturally disconnected from the DC Interpretation Layer and Formation inputs.

---

## Summary of Existing Signals

| Signal | Phase | What it answers | Owner | Gap |
|---|---|---|---|---|
| `AnnieThought.needsClarification` | Pre-formation | "Should I gather more?" (binary) | DC | Doesn't name what is missing |
| `AnnieThought.confidence` | Pre-formation | "How certain am I?" | DC | Not connected to Formation input quality |
| `ObservationQuestion[]` | Pre-formation | "What should I ask next?" | COS mechanism + DC content | Answers not routed back to Formation |
| `seekFirstToUnderstand()` | Pre-formation | "What should I do before acting?" | `platform/core/companion/` | Disconnected from DC/Formation layer |
| `Understanding.completeness` | Post-formation | "Was Formation called with sufficient inputs?" | COS | Post-hoc — too late to prevent premature call |
| `Understanding.uncertainty[]` | Post-formation | "What gaps exist in the formed Understanding?" | COS | Named for JudgementEngine, not for DC |
| `JudgementDisposition: "insufficient"` | Post-judgement | "Is this Understanding fit for judgement?" | JudgementEngine | Too far downstream for pre-formation guidance |

---

## The Ownership Answer

**Option C: Shared boundary.**

The evidence supports neither A (COS owns readiness alone) nor B (DC owns readiness alone).

### What COS Should Own

COS should own the **structural readiness check**: "Given the Formation input types, are the required fields present and of sufficient quality for Formation to produce useful Understanding?"

This is analogous to `assessCompleteness()` — but inverted. Instead of evaluating completeness after the fact, a pre-formation check would evaluate whether the inputs the DC is about to provide are structurally adequate.

This does not require professional knowledge. It requires only: "Are translations non-empty? Is situational context present? Is knowledge provided?" These are structural questions answerable without domain understanding.

### What the DC Should Own

The DC should own the **professional readiness check**: "Are these inputs professionally adequate for this situation?"

A DC knows whether:
- "I've translated the temperature observation but I haven't retrieved the food safety threshold" — professional gap
- "I know the urgency but I don't know how long the breach has been occurring" — situational gap
- "I have venue context but no applicable knowledge principles" — knowledge gap

These gaps require professional judgment. COS cannot assess them. The DC must.

### The Shared Protocol That Does Not Exist

The missing component is a **pre-formation readiness gate** that:
1. DC evaluates: "Are my Formation inputs professionally complete enough to submit?"
2. COS validates: "Are the Formation input types structurally sufficient for formation to proceed?"
3. If either fails: route to `seekFirstToUnderstand()` to determine the correct next action

`seekFirstToUnderstand()` already provides the routing logic (observe/ask/research/wait). The gate connecting DC professional evaluation + COS structural validation to that routing does not exist.

---

## The Critical Boundary Distinction

```
Post-formation sufficiency (currently governed):
  form() → Understanding.completeness + uncertainty
  Understanding → JudgementEngine.disposition = "insufficient"
  → DC is told to seek after the fact

Pre-formation readiness (not yet governed):
  DC has stimulus + some inputs
  → Should the DC call form() now, or gather more first?
  → Nothing currently answers this
```

A DC that always calls `form()` before checking readiness will:
- Always produce some Understanding (even `completeness: "insufficient"`)
- Reach JudgementEngine with low-confidence Understanding
- Be told to seek after the fact

A DC with governed readiness would:
- Evaluate whether it has enough before calling `form()`
- Seek proactively when inputs are below threshold
- Call `form()` only when professionally and structurally ready

The second DC is what "Companion Intelligence" means.

---

## Risks of Premature Implementation

### Risk 1: Creating a Reasoning Engine

If a sufficiency engine evaluates "do I have enough to understand?" — it is performing understanding-like reasoning about its own inputs. This creates an infinite regress: who judges the sufficiency judge?

The correct approach: sufficiency is a threshold check, not a reasoning act. Binary tests against defined thresholds, not inferences about adequacy.

### Risk 2: Duplicating Formation

A sufficiency check that computes "how confident would Formation be if I called it with these inputs?" is just Formation applied to Formation inputs. This is circular.

The correct approach: pre-formation readiness is about presence and completeness of inputs, not about the quality of the Understanding that would emerge.

### Risk 3: Making "I Don't Know" a Failure State

The most important risk. If a sufficiency check fails in a way that triggers error handling, the architecture treats incomplete understanding as an exception. It should be an ordinary and expected state.

> "I don't know yet" is a valid state. The architecture should make this state comfortable to occupy.

The correct approach: the pre-formation readiness check should return a natural next step (observe/ask/research/wait), not an error or failure signal.

---

## Recommendation for the Next Milestone

**Milestone 019 Candidate: Pre-Formation Readiness Gate**

Scope: Implement the missing pre-formation readiness boundary using existing components.

The three required pieces are already present:

1. **DC professional evaluation** — `AnnieThought.needsClarification + confidence` already exists in the DC layer. It needs to be connected to Formation input availability.

2. **COS structural validation** — a simple check: are `translations.length > 0`, `context.situational` partially populated, and `knowledge.length > 0`? This does not require professional knowledge and belongs in COS or adjacent to Formation.

3. **Routing** — `seekFirstToUnderstand()` in `platform/core/companion/` already provides the `observe | ask | research | remember | wait | reflect` routing. It needs to be connected to the DC/Formation layer rather than operating in isolation.

**What Milestone 019 does not include:**
- A new reasoning engine
- Changes to `form()`
- Changes to JudgementEngine
- Any new intelligence

The readiness gate is a **threshold check + routing call**, not a new cognitive capability.

---

**Status:** Analysis complete | No code changes | Ownership boundary identified | Risks recorded | Next milestone candidate documented
