# Information to Trust Map

**Date:** 2026-08-05  
**Question:** Can Helping Hand currently transform an input into trusted judgement through connected architecture?  
**Method:** Trace code connections across the full lifecycle. Evidence only. No design.

---

## Colour Key

```
🟢 GREEN  — Connected in code. Functions call functions. Data flows.
🟡 AMBER  — Concept exists in code but connection requires human assembly.
🔴 RED    — Described in documentation only. No code connection exists.
⬛ ABSENT — Neither code nor document connection exists.
```

---

## The Complete Lifecycle Diagram

```
INPUT
  ↓  🟡 Source typing exists; universal reception mechanism does not
OBSERVATION
  ↓  🟢 translateObservations() exists in COS
TRANSLATION  ← DC supplies professional rules via translateForFormation()
  ↓  🟢 lib/annie/formation/ + platform/cos/understanding-formation/ — MILESTONE_016
DC INTERPRETATION LAYER  (translateForFormation + assembleFormationContext + knowledgeAnswersToFormation)
  ↓  🟢 lib/annie/formation/readinessAdapter.ts — MILESTONE_019
PRE-FORMATION READINESS GATE  (validateFormationInputs + assessReadiness + seekFirstToUnderstand)
  ↓  🟢 COS: form(translations, context, knowledge)
UNDERSTANDING FORMATION  ←  document observations validated in MILESTONE_023 (Andy/HH-0000-001)
  ↓
UNDERSTANDING
  ↓  🟢 JudgementEngine.judge(understanding)
UNCERTAINTY
  ↓  🟡 disposition "insufficient" routes to "ask"; no source routing
SEEK
  ↓  🟡 manual — no protocol connects seeking to knowledge sources
KNOWLEDGE
  ↓  🟢 UnderstandingEngine(KnowledgeGraph)
JUDGEMENT
  ↓  🟢 ActionEngine.build({ judgement, authority })
ACTION
  ↓  🟢 ExecutionEngine.build({ action })
EXPERIENCE
  ↓  🟢 ReflectionEngine.reflect({ execution })
REFLECTION
  ↓  🟢 LearningEngine.build({ reflection })
LEARNING
  ↓  🟡 KnowledgeGovernanceEngine exists; approved changes not wired to KnowledgeGraph
MEMORY / KNOWLEDGE UPDATE
  ↓  ⬛ No mechanism routes memory → Trust
TRUST
```

**Updated 2026-08-05 — Milestone 017:** The pipeline is now fully connected from Observation through to Understanding. The DC Interpretation Layer supplies Formation inputs without human authorship. Remaining amber: Seek routing protocol, learning loop closure, Trust tracking.

---

## Transition-by-Transition Evidence

---

### INPUT → OBSERVATION

**Does the concept exist?**

```
Input sources are typed:
ObservationSource = "vision" | "conversation" | "document" | "sensor" | "system" | "human"
```
(`platform/cos/observation/types.ts`)

**Is the connection implemented?**  🟡 AMBER

Input sources are named. There is no universal input receiver that converts a raw signal into an `Observation` record. Annie's `beginObservation()` returns hardcoded sample observations. Sensor data, conversation text, and documents do not have general-purpose adapters that produce `Observation` structs.

**Evidence:**
```typescript
// platform/cos/observation/types.ts
export interface Observation {
  id: string;
  category: string;
  description: string;
  confidence: number;
  source: ObservationSource;  // named but not wired
}
```

```typescript
// lib/annie/observation/observe.ts — hardcoded, not sensor-driven
export function observe(): Observation[] {
  return [
    { id: "bar", description: "I can see what looks like a bar.", confidence: 0.92, source: "vision" },
  ];
}
```

The concept exists. The adapter that converts a real sensor reading or conversation turn into an Observation struct does not exist.

---

### OBSERVATION → TRANSLATION

**Does the concept exist?** Yes.

```
Translation converts observation into understanding.
Observation alone cannot produce understanding.
```
(`docs/architecture/TRANSLATION.md`, `docs/architecture/COMPANION_INTELLIGENCE.md`)

**Is the connection implemented?**  🟢 GREEN

`translateObservations()` is implemented in COS and called in Annie's pipeline.

**Evidence:**
```typescript
// platform/cos/translation/translator.ts
export function translateObservations(
  observations: Observation[],
  rules: TranslationRule[]
): Translation[] {
  return observations.flatMap((observation) =>
    rules.filter((rule) => rule.matches(observation))
         .map((rule) => rule.translate(observation))
  );
}
```

```typescript
// lib/annie/brain/index.ts — called in code
const translations = translateHospitalityObservations(observations.observations);
```

**Qualification:** Green for Annie's hospitality pipeline. The universal COS mechanism exists. No other DC has wired translation rules.

---

### TRANSLATION → CONTEXT

**Does the concept exist?** Yes.

Context is the surrounding circumstance that governs how understanding should be interpreted.  
(`docs/theory/007-THEORY-OF-CONTEXT.md`)

**Is the connection implemented?**  🟡 AMBER

`ContextStore` exists with 7 categories. `OnboardingEngine` calls `storeObservationAsContext()` — this is the only code that connects observations to context storage. It is scoped to onboarding.

**Evidence:**
```typescript
// lib/onboarding/onboardingEngine.ts — only during onboarding
const contextEntry = this.storeObservationAsContext(observation);
```

```typescript
// lib/onboarding/contextStore.ts
export type ContextCategory = "business" | "venue" | "team" | "systems" | "communication" | "knowledge" | "memory";
```

Outside onboarding, there is no code that routes a translation result into a context store. Annie's `brain/index.ts` runs translations but does not call `ContextStore`.

---

### CONTEXT → UNDERSTANDING

**Does the concept exist?** Yes.

```
Understanding Lifecycle: Defines the governed lifecycle by which observations
become understanding, understanding becomes memory, and memory becomes wisdom.
```
(`docs/philosophy/UNDERSTANDING_LIFECYCLE.md`)

**Is the connection implemented?**  🔴 RED

This is the most significant broken link.

`UnderstandingEngine` takes a `KnowledgeGraph`, not a context store:

```typescript
// lib/understanding/UnderstandingEngine.ts
export class UnderstandingEngine {
  constructor(private readonly knowledgeGraph: KnowledgeGraph) {}

  understandConcept(idOrName: string): ConceptUnderstanding { ... }
  understandPath(fromIdOrName: string, toIdOrName: string): PathUnderstanding { ... }
}
```

The `Understanding` struct used by `JudgementEngine` requires human authorship:

```typescript
// scripts/test-companion-intelligence-cycle.ts
function buildFridgeSafetyUnderstanding(): Understanding {
  return {
    summary: "Fridge temperature reading is 10.2C...",   // written by a human
    confidence: 0.52,
    uncertainty: [...],
  };
}
```

There is no code that takes translated observations + context and produces an `Understanding` record automatically. This transformation is performed by humans in every current test and demo.

**Documented as required:** `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md`:
```
Receive observations → Form context → Recall relevant memory → Build understanding
```

**Implemented in code:** No.

---

### UNDERSTANDING → UNCERTAINTY

**Does the concept exist?** Yes, formally.

```typescript
// lib/understanding/Understanding.ts
export interface Understanding {
  summary: string;
  confidence: number;
  uncertainty: string[];   // ← part of the Understanding struct
}
```

**Is the connection implemented?**  🟢 GREEN

Uncertainty is a first-class property of every Understanding object. `JudgementEngine` reads it directly.

```typescript
// lib/judgement/JudgementEngine.ts
private determineDisposition(understanding: Understanding): JudgementDisposition {
  if (understanding.confidence < 0.25) return "insufficient";
  if (this.hasHighRiskUncertainty(understanding)) return "human-required";
  if (understanding.uncertainty.length > 0) return "caution";
  return "proceed";
}
```

---

### UNCERTAINTY → SEEK

**Does the concept exist?** Yes. Seek is Article II of the Constitution.

**Is the connection implemented?**  🟡 AMBER

When `disposition === "insufficient"`, the JudgementEngine routes to `"ask"` as first candidate. This is a code connection.

```typescript
// lib/judgement/JudgementEngine.ts
RESPONSE_PRIORITY = {
  insufficient: ["ask", "admit-uncertainty", "wait", ...],
}
```

What is not connected:
- "ask" produces no structured record of what is being sought
- "ask" does not specify which source type can provide the observation
- "ask" does not route to documents, conversation, or mentor differently
- There is no code path from "I am asking" to "the answer has been received"

The mechanism says "seek." The protocol for how seeking produces new observations, and how those observations re-enter the pipeline, does not exist in code.

---

### SEEK → KNOWLEDGE

**Does the concept exist?** Partially. The routing concept is described.

```
Where understanding can be found. Who should be asked.
```
(`docs/architecture/PROFESSIONAL_COMPETENCE.md`)

**Is the connection implemented?**  🔴 RED

There is no code that:
- Routes a `"ask"` judgement to a specific knowledge source
- Converts the source's response back into an `Observation`
- Re-enters that observation into the pipeline

The `MissingCogQueue` in onboarding stores open questions but does not route them or resume a pipeline.

---

### KNOWLEDGE → UNDERSTANDING

**Does the concept exist?** Yes.

`UnderstandingEngine` takes `KnowledgeGraph` and produces `ConceptUnderstanding`.

**Is the connection implemented?**  🟢 GREEN (for concept-level understanding)

```typescript
// lib/understanding/UnderstandingEngine.ts
export class UnderstandingEngine {
  constructor(private readonly knowledgeGraph: KnowledgeGraph) {}
  understandConcept(idOrName: string): ConceptUnderstanding { ... }
}
```

**Qualification:** This produces understanding of *concepts in the knowledge graph*. It does not produce understanding of *observations in a specific situation*. The operational `Understanding` struct used by `JudgementEngine` is structurally identical but semantically different — it requires a human summary of the situation, not a concept lookup.

Two `Understanding` types coexist without being connected:
1. `ConceptUnderstanding` — derived from `KnowledgeGraph` via code
2. Operational `Understanding` — authored by human or agent for a specific situation

---

### UNDERSTANDING → JUDGEMENT

**Does the concept exist?** Yes.

```
Judgement cannot exist without understanding.
```
(`docs/theory/004-THEORY-OF-JUDGEMENT.md`)

**Is the connection implemented?**  🟢 GREEN

```typescript
// lib/judgement/JudgementEngine.ts
judge(input: BuildJudgementInput): Judgement {
  const { understanding } = input;
  const disposition = this.determineDisposition(understanding);
  ...
}
```

`JudgementEngine.judge()` takes `Understanding` directly. The connection is real, implemented, and tested.

---

### JUDGEMENT → ACTION

**Does the concept exist?** Yes.

**Is the connection implemented?**  🟢 GREEN

```typescript
// lib/action/ActionEngine.ts
build(input: BuildActionInput): Action {
  const { judgement, authority } = input;
  ...
}
```

`ActionEngine.build()` takes `Judgement` + `AuthorityAssessment` directly.

---

### ACTION → EXPERIENCE (EXECUTION)

**Does the concept exist?** Yes. Execution is the record of what happened when action was attempted.

**Is the connection implemented?**  🟢 GREEN

```typescript
// lib/execution/ExecutionEngine.ts
build(input: BuildExecutionInput): Execution {
  const action = this.copyActionSnapshot(input.action);
  const permitted = this.isPermitted(action);
  ...
}
```

Evidence: `scripts/test-companion-intelligence-cycle.ts` runs this end-to-end with a fridge temperature scenario.

---

### EXPERIENCE → REFLECTION

**Does the concept exist?** Yes.

```
Reflection turns experience into learning.
```
(`platform/cos/registry/capabilities.ts`)

**Is the connection implemented?**  🟢 GREEN

```typescript
// lib/reflection/ReflectionEngine.ts
reflect(input: BuildReflectionInput): Reflection {
  ...
  const context = this.copyContext(input.execution);
  ...
}
```

`ReflectionEngine.reflect()` takes `Execution` directly. The connection is real.

---

### REFLECTION → LEARNING

**Does the concept exist?** Yes.

```
Learning is the reflective process through which experience improves future judgement.
```
(`docs/theory/005-THEORY-OF-LEARNING.md`)

**Is the connection implemented?**  🟢 GREEN

```typescript
// lib/learning/LearningEngine.ts
build(input: BuildLearningInput): Learning {
  const reflection = input.reflection;
  const context = this.copyContext(reflection);
  const evidence = this.buildAuditEvidence(reflection);
  const disposition = this.selectDisposition(reflection);
  ...
}
```

`LearningEngine.build()` takes `Reflection` directly.

---

### LEARNING → MEMORY / KNOWLEDGE UPDATE

**Does the concept exist?** Yes.

`KnowledgeGovernanceEngine` reviews Learning proposals and can approve `ApprovedKnowledgeChange` records.

**Is the connection implemented?**  🟡 AMBER

```typescript
// lib/knowledge-governance/KnowledgeGovernanceEngine.ts
review(input: BuildKnowledgeGovernanceInput): KnowledgeGovernance {
  const learning = this.copyLearning(input.learning);
  ...
  // produces ApprovedKnowledgeChange if approved
}
```

The governance review step exists and produces approved change records. However, no code was found that takes an `ApprovedKnowledgeChange` and applies it to a `KnowledgeGraph`. The loop between governance approval and knowledge update is not closed in code.

---

### MEMORY / KNOWLEDGE → TRUST

**Does the concept exist?** In documentation only.

```
Trust is justified confidence earned through the consistent 
demonstration of sound judgement over time.
```
(`docs/theory/008-THEORY-OF-TRUST.md`)

**Is the connection implemented?**  ⬛ ABSENT

There is no `TrustEngine`, no trust score, no trust tracking data structure, and no code that observes consistency of judgement over time and records it as trust.

Trust exists as:
- Character trait: `lib/annie/identity/character.ts` — `trustworthy: true` (static declaration)
- Oath: `lib/annie/identity/oath.ts` — "I will protect trust" (declaration)
- Principle: mentioned in governance reasoning (`lib/academy/AndyDigitalColleague.ts`)

Trust is described. It is not implemented.

---

## Three Scenario Tests

---

### Scenario A: Sensor Input — "Fridge temperature = 8°C"

**Trace against code:**

```
Sensor produces reading (8°C)
    ↓ 🔴 No sensor adapter converts reading to Observation struct
Observation (hardcoded or manual)
    ↓ 🟢 translateObservations() — rules would match temperature observations
Translation ("8°C is above/below the safe boundary")
    ↓ 🔴 No code routes translation to Understanding
Understanding (manually authored: "Fridge may need attention")
    ↓ 🟢 JudgementEngine.judge(understanding)
Judgement (caution or human-required)
    ↓ 🟢 ActionEngine.build({ judgement, authority })
Action (escalate / ask)
    ↓ 🟢 ExecutionEngine.build({ action })
Execution (record of what happened)
    ↓ 🟢 ReflectionEngine.reflect({ execution })
Reflection (was this the right response?)
    ↓ 🟢 LearningEngine.build({ reflection })
Learning (proposed update: temperature threshold was correct / incorrect)
```

**At which point does "8°C" become "the fridge may need attention"?**

Nowhere in code. A human or a future translation rule with domain knowledge produces that meaning. The translation engine mechanism exists, but no hospitality temperature translation rule is wired.

`scripts/test-companion-intelligence-cycle.ts` demonstrates the full pipeline — but the Understanding that enters it is:
```typescript
summary: "Fridge temperature reading is 10.2C, above governed safe boundary..."
```
Written by a person. Not derived from a sensor reading.

**Broken links:** INPUT → OBSERVATION (no sensor adapter), TRANSLATION → CONTEXT, CONTEXT → UNDERSTANDING.

---

### Scenario B: Human Input — "We have a COS Boundary Problem"

**Trace against code:**

```
Manager speaks
    ↓ 🔴 No conversation-to-Observation adapter
Observation ("Conversation received: 'There is a COS Boundary Problem'")
    ↓ 🟡 Could pass through COS observation mechanism if manually structured
Translation ("This is a statement about architecture; it is ambiguous")
    ↓ 🔴 No code routes to Understanding
Understanding — BLOCKED
    ↓
Cannot reach Judgement because Understanding is missing
```

**Where does uncertainty live?**

In `Uncertainty.unknowns: string[]` — if a human creates the Understanding object.  
There is no code that automatically extracts "what is not known" from a conversation turn.

**Where does seeking happen?**

`JudgementResponseKind: "ask"` — if a human creates the Understanding object and it has low confidence.  
There is no code that routes the seeking act to Talk.Get OS or any external source.

**Broken links:** Every link from INPUT through to UNDERSTANDING.

---

### Scenario C: Document Input — "New architecture document added"

**Trace against code:**

```
New document added to repository
    ↓ 🔴 No document-change-to-Observation adapter
Observation (document is a source: "document" in ObservationSource — typed but not wired)
    ↓ 🔴 No universal document translation rules
Translation (what does this document mean for current understanding?)
    ↓ 🔴 No code routes to Understanding
Understanding (how does this change what we know?)
    ↓ 🔴 No impact assessment mechanism
Learning (what needs to be updated?)
```

**How does a DC know whether a document changes understanding?**

It does not know. Andy's `RepositoryKnowledgeService` can *retrieve* documents. It cannot assess whether a new document creates a contradiction with, or an extension to, existing understanding.

The `UnderstandingEngine.understandPath()` can trace whether two concepts are connected in the knowledge graph. It does not detect whether a new document changes those connections.

**Broken links:** All of them.

---

## Special Focus: The Connecting Dots

---

### Observation → Context

**Can a DC understand an observation without context?**

From Theory of Context:
> Context changes interpretation. Without context, information remains disconnected from purpose.

**What exists:** `OnboardingEngine.storeObservationAsContext()` — one code path that stores an observation as a context entry.  
**What is missing:** A general-purpose mechanism that contextualises any observation against existing context, including detecting whether the observation changes the context.

---

### Context → Understanding

**Where does raw information become meaning?**

**Architecturally:** Translation is the documented mechanism. `translateObservations()` converts observations into meaning.  
**Operationally:** There is no code that takes the output of translation and feeds it into `UnderstandingEngine`. The `Understanding` struct at the judgement layer is built independently of both `ContextStore` and `translateObservations()`.

This is the deepest disconnect in the system.

---

### Understanding → Judgement

**How does confidence affect decision making?**

This link is **fully implemented in code**:

```typescript
if (understanding.confidence < 0.25) return "insufficient";
if (understanding.uncertainty.length > 0) return "caution";
return "proceed";
```

The quality of judgement degrades gracefully with understanding quality. This is correct design. The problem is that the Understanding entering this engine is manually authored rather than derived from observations.

---

### Judgement → Experience

**How does the system know whether judgement was correct?**

`ExecutionEngine` records `outcome: "succeeded" | "failed" | "partial"` and `effect: "internal" | "external" | "none"`.  
`ReflectionEngine` reads this and produces findings.

**The system does know.** But it only knows because a human provides the `outcome` value to `ExecutionEngine.build()`. There is no sensor that observes whether an action produced the expected result. Outcome is self-reported.

---

### Experience → Learning

**How does experience improve future decisions?**

`LearningEngine.build({ reflection })` derives a learning proposal from reflection.  
`KnowledgeGovernanceEngine.review({ learning })` can approve an `ApprovedKnowledgeChange`.

**Broken:** No code applies the approved change to `KnowledgeGraph`. The learning loop is not closed.

---

### Learning → Shared Knowledge

**How does one DC's learning benefit others?**

`platform/cos/pollination/` — **experimental** status — describes the concept of sharing learning between DCs. It has a governance gate (confidence ≥ 0.9, evidence required, reflection complete).

```typescript
// platform/cos/pollination/governance.ts
if (candidate.confidence < 0.9) reasons.push("Confidence is below the required threshold.");
```

The governance gate is implemented. The mechanism that moves approved learning from a DC's local context to shared knowledge does not exist.

---

### Demonstrated Behaviour → Trust

**Where is consistency recognised?**

**Answer: Nowhere in code.**

Trust requires observing consistency of judgement over time. Nothing in the current architecture:
- Records the history of judgements by a specific DC
- Measures whether those judgements were consistent with governing principles
- Accumulates that consistency into a trust score or trust record
- Makes that trust record available to other DCs or to human observers

Trust is a concept. It is not a capability.

---

## The Two Parallel Architectures

The investigation reveals two separate architectures that do not connect to each other.

**Architecture 1: `platform/core/companion/`**

```typescript
// platform/core/companion/companionLoop.ts
export function runCompanionLoop(input: CompanionInput): CompanionRootResult {
  const understanding = seekFirstToUnderstand(input);
  const reflection = reflectBeforeAction(understanding);
  const decision = decideNextAction(understanding, reflection);
  const intent = decideIntent(decision);
  const communication = communicateIntent(intent);
  return { understanding, reflection, decision, intent, communication };
}
```

This is a **complete loop** — Input → Understanding → Reflection → Decision → Communication.  
But it takes `CompanionInput` with pre-assessed booleans (`hasObservation: boolean`, `confidence: number`).  
It does not use `lib/understanding/Understanding.ts`, `lib/judgement/JudgementEngine.ts`, or `lib/reflection/ReflectionEngine.ts`.

**Architecture 2: `lib/` engines**

```
Understanding → JudgementEngine → AuthorityEngine → ActionEngine → 
ExecutionEngine → ReflectionEngine → LearningEngine → KnowledgeGovernanceEngine
```

This is a **complete lower pipeline** — proven by `scripts/test-companion-intelligence-cycle.ts`.  
But it accepts manually authored `Understanding`.  
It does not connect to `platform/core/companion/`.

**The two architectures are not wired to each other.**

---

## The `lib/annie/brain/index.ts` Architecture

Annie's Brain represents a third, partial pipeline:

```typescript
const observations = beginObservation();          // COS observation
const translations = translateHospitalityObservations(observations.observations);  // COS translation
const navigation = chooseNextRoute({ ... });      // CI routing
const memory = createLivingMemory({ ... });       // hardcoded fact
const opportunities = discoverOpportunities();    // hardcoded opportunities
const decision = decide({ understandsSituation, hasEnoughInformation, confidence });
const reflection = reflect("First venue observation", ...);
```

This pipeline: Observation → Translation → CI Navigation → Memory → Decision → Reflection.

It does **not** connect to:
- `lib/understanding/UnderstandingEngine`
- `lib/judgement/JudgementEngine`
- `lib/reflection/ReflectionEngine` (uses `platform/cos/reflection` instead)
- `lib/learning/LearningEngine`

Annie's Brain is a demonstration. It is not the same architecture as the governed lifecycle in `lib/`.

---

## Existing Connections — Summary

| Connection | Status | Evidence |
|---|---|---|
| Input source types | 🟡 Named | `ObservationSource` in COS |
| Observation → Translation | 🟢 Code | `translateObservations()` in COS + Annie |
| Observation → Context (onboarding) | 🟡 Partial | `storeObservationAsContext()` in OnboardingEngine |
| Observation → Context (operational) | 🔴 Doc only | Architecture doc describes; no general-purpose code |
| Context → Understanding | 🔴 Doc only | `UNDERSTANDING_LIFECYCLE.md`; no code connection |
| Knowledge → Understanding | 🟢 Code | `UnderstandingEngine(KnowledgeGraph)` |
| Understanding → Uncertainty | 🟢 Code | `Understanding.uncertainty: string[]` |
| Uncertainty → Seek | 🟡 Partial | `disposition "insufficient"` → `"ask"`; no routing |
| Seek → Source | 🔴 Doc only | No code routes seeking to source |
| Understanding → Judgement | 🟢 Code | `JudgementEngine.judge(understanding)` |
| Judgement → Action | 🟢 Code | `ActionEngine.build({ judgement, authority })` |
| Action → Execution | 🟢 Code | `ExecutionEngine.build({ action })` |
| Execution → Reflection | 🟢 Code | `ReflectionEngine.reflect({ execution })` |
| Reflection → Learning | 🟢 Code | `LearningEngine.build({ reflection })` |
| Learning → KnowledgeGovernance | 🟡 Partial | `KnowledgeGovernanceEngine.review()` exists; wiring to KnowledgeGraph missing |
| Learning → Shared Knowledge | 🟡 Partial | `platform/cos/pollination/` experimental; transfer not wired |
| Behaviour → Trust | ⬛ Absent | No trust tracking in any code |

---

## Missing Connections — Summary

| Missing Connection | Risk Level | What it blocks |
|---|---|---|
| Sensor/Conversation/Document → Observation adapter | High | All three input scenarios. Nothing enters the pipeline from real sources. |
| Context → Understanding (general-purpose) | High | Understanding is permanently hand-authored; cannot be derived |
| Seek → Source routing | High | Seeking acts produce no structured response pathway |
| Observations → KnowledgeGraph update | High | New learning never updates the graph; understanding cannot improve from experience |
| KnowledgeGovernance → KnowledgeGraph | Medium | The learning loop is not closed; approved changes are not applied |
| Execution outcome ← external observation | Medium | Outcome is self-reported; the system cannot observe its own effect |
| `platform/core/` ↔ `lib/` connection | Medium | Two parallel architectures with no bridge |
| Trust tracking | Low (now) | No measurement of consistency over time |

---

## Highest-Risk Broken Links

### 1. Context → Understanding (RED)

**Why this is the most critical gap:**

Documentation defines the full chain. Code implements both ends but not the connection:
- ✓ `ContextStore` exists with 7 categories
- ✓ `UnderstandingEngine` exists
- ✗ No code takes `ContextStore` output and produces `Understanding`

Every test and every demo requires a human to write the `Understanding` object. The architecture is correct in design and absent in execution.

---

### 2. No Input Adapters (AMBER → RED in practice)

**Why this is practically critical:**

The observation source types are named: vision, conversation, document, sensor, system, human.

None of these sources has a production adapter. `observe()` returns hardcoded sample data. Conversation is not converted to observations. Documents are retrieved but their meaning is not processed into observations.

The pipeline has typed inputs but no actual input receivers.

---

### 3. Learning Loop Not Closed (AMBER)

**Why this matters:**

`LearningEngine` → `KnowledgeGovernanceEngine` produces `ApprovedKnowledgeChange`.  
That change is never applied.

The architecture can learn but not grow. The KnowledgeGraph that feeds UnderstandingEngine never changes from experience.

---

## Unknowns Requiring Further Investigation

1. **Is there an intended connection between `platform/core/companion/` and `lib/`?**  
   They appear to be parallel architectures. Which is canonical? Are they intended to merge?

2. **Is `lib/annie/brain/index.ts` a prototype or the intended production design?**  
   It uses different engines from the governed `lib/` pipeline. Its relationship to `lib/` is unclear.

3. **How is `Understanding` intended to be produced in production?**  
   All current evidence shows hand-authored Understanding. Is there an intended engine or adapter that has not been built?

4. **Does `src/companion/CompanionOrchestrator.ts` represent a third architecture?**  
   It imports `ReflectionEngine` from `./ReflectionEngine` (local, not `lib/`). This is a fourth pipeline that was not fully explored.

5. **What is the intended relationship between `KnowledgeGraph` and operational context?**  
   `KnowledgeGraph` contains governed concepts. `ContextStore` contains situation-specific knowledge. How are they intended to interact?

---

## The Central Finding

**The user's hypothesis is confirmed:**

> "The mechanisms already exist, but they are not connected as one continuous understanding system."

The repository contains:
- All the vocabulary of understanding (types, interfaces, concepts)
- A well-connected lower pipeline (Understanding → Trust: five consecutive green links)
- A partially-connected observation layer (Input → Translation: green)
- A completely disconnected middle (Translation → Understanding: red)

The architecture speaks the vocabulary of understanding.  
It does not yet speak the language.

The most important unbuilt connection is the translation-to-understanding bridge — the mechanism that converts what has been observed and translated into the Understanding struct that the Judgement engine can reason about.

Everything downstream of Understanding works.  
Everything upstream of Understanding is disconnected.

---

**Status:** Connectivity audit complete | No architecture changes proposed | Evidence-based | Unknowns preserved

